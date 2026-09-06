"""Crawl a running production build; validate rendered SEO and internal links.
Usage: python3 scripts/check-seo.py [base URL] [JSON output path]
"""
import concurrent.futures
from html.parser import HTMLParser
import json
import sys
from urllib.error import HTTPError
from urllib.parse import urljoin, urlsplit
from urllib.request import Request, urlopen
import xml.etree.ElementTree as ET

BASE = (sys.argv[1] if len(sys.argv) > 1 else "http://localhost:3100").rstrip("/")
ORIGIN = "https://sacramentodentalmedicine.com"

class Page(HTMLParser):
    def __init__(self, html):
        super().__init__(convert_charrefs=True)
        self.title = ""
        self.h1 = 0
        self.meta = {}
        self.canonicals = []
        self.links = []
        self.ids = set()
        self.images = []
        self.jsonld = []
        self.text = []
        self.in_title = self.in_ld = self.in_script = False
        self.ld = ""
        self.feed(html)
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if a.get("id"): self.ids.add(a["id"])
        if tag == "title": self.in_title = True
        if tag == "h1": self.h1 += 1
        if tag == "meta": self.meta[a.get("name", a.get("property"))] = a.get("content", "")
        if tag == "link" and a.get("rel") == "canonical": self.canonicals.append(a["href"])
        if tag == "a" and a.get("href"): self.links.append(a["href"])
        if tag == "img": self.images.append(a)
        if tag == "script":
            self.in_script = True
            self.in_ld = a.get("type") == "application/ld+json"
            self.ld = ""
    def handle_endtag(self, tag):
        if tag == "title": self.in_title = False
        if tag == "script":
            if self.in_ld: self.jsonld.append(json.loads(self.ld))
            self.in_ld = self.in_script = False
    def handle_data(self, data):
        if self.in_title: self.title += data
        if self.in_ld: self.ld += data
        if not self.in_script: self.text.append(data)

def fetch(path, agent="Mozilla/5.0"):
    req = Request(BASE + path, headers={"User-Agent": agent})
    try:
        with urlopen(req, timeout=30) as response:
            return response.status, response.read().decode(), dict(response.headers), response.url
    except HTTPError as error:
        return error.code, error.read().decode(), dict(error.headers), error.url

def flatten(data):
    if isinstance(data, list): return [node for entry in data for node in flatten(entry)]
    if "@graph" in data: return flatten(data["@graph"])
    return [data]

status, sitemap, _, _ = fetch("/sitemap.xml")
assert status == 200
urls = [node.text for node in ET.fromstring(sitemap).iter() if node.tag.endswith("}loc")]
assert urls and len(set(urls)) == len(urls)
assert all(url.startswith(ORIGIN) for url in urls)
paths = [urlsplit(url).path or "/" for url in urls]
pages = {}
results = []
for path, (status, html, headers, final) in zip(paths, concurrent.futures.ThreadPoolExecutor(max_workers=6).map(fetch, paths)):
    assert status == 200, (path, status)
    assert urlsplit(final).path in (path, "" if path == "/" else path), (path, final)
    page = Page(html)
    pages[path] = page
    assert page.h1 == 1, (path, "h1", page.h1)
    assert page.title and page.meta.get("description"), (path, "missing metadata")
    assert len(page.canonicals) == 1 and page.canonicals[0].rstrip("/") == (ORIGIN + path).rstrip("/"), (path, page.canonicals)
    assert "noindex" not in page.meta.get("robots", "") + headers.get("X-Robots-Tag", ""), path
    assert page.meta.get("og:url", "").rstrip("/") == (ORIGIN + path).rstrip("/"), (path, "og:url")
    assert page.meta.get("og:image") and page.meta.get("twitter:image"), (path, "social images")
    assert all("alt" in image for image in page.images), (path, "missing image alt")
    nodes = [node for data in page.jsonld for node in flatten(data)]
    practices = [node for node in nodes if node.get("@type") == "Dentist"]
    assert len(practices) == 1 and practices[0].get("@id") == ORIGIN + "/#practice", (path, "practice")
    assert not any("aggregateRating" in node for node in nodes), (path, "self-serving rating")
    visible = " ".join(" ".join(page.text).split())
    for node in nodes:
        if node.get("@type") == "FAQPage":
            for question in node["mainEntity"]:
                assert " ".join(question["name"].split()) in visible, (path, "FAQ question missing")
                assert " ".join(question["acceptedAnswer"]["text"].split()) in visible, (path, "FAQ answer missing")
    if path == "/meet-dr-narodovich":
        assert any(node.get("@type") == "Person" for node in nodes)
        assert any(node.get("@type") == "ProfilePage" for node in nodes)
    results.append({"path": path, "status": status, "title": page.title, "descriptionLength": len(page.meta["description"]), "schemaTypes": [node.get("@type") for node in nodes]})
assert len({page.title for page in pages.values()}) == len(pages), "duplicate titles"
assert len({page.meta["description"] for page in pages.values()}) == len(pages), "duplicate descriptions"
internal = set()
for path, page in pages.items():
    for link in page.links:
        target = urlsplit(urljoin(ORIGIN + path, link))
        if target.netloc != urlsplit(ORIGIN).netloc: continue
        target_path = target.path or "/"
        internal.add(target_path)
        if target.fragment and target_path in pages:
            assert target.fragment in pages[target_path].ids, (path, link, "missing anchor")
# Reachability: all sitemap routes must be discoverable by actual links.
reachable = {"/"}
while True:
    found = set(reachable)
    for path in reachable:
        for link in pages[path].links:
            target = urlsplit(urljoin(ORIGIN + path, link))
            if target.netloc == urlsplit(ORIGIN).netloc and (target.path or "/") in pages:
                found.add(target.path or "/")
    if found == reachable: break
    reachable = found
assert reachable == set(paths), ("orphan routes", set(paths) - reachable)
for path in internal - set(paths):
    status, _, _, _ = fetch(path)
    assert status == 200, (path, "broken internal link", status)
status, robots, _, _ = fetch("/robots.txt")
assert status == 200 and "Disallow: /" not in robots and ORIGIN + "/sitemap.xml" in robots
status, _, _, _ = fetch("/definitely-not-a-real-dental-page")
assert status == 404, ("soft 404", status)
status, privacy, _, _ = fetch("/privacy-practices/")
assert status == 200 and "noindex" in Page(privacy).meta.get("robots", "")
for path in ("/", "/dental-implants", "/new-patients"):
    status, html, _, _ = fetch(path, "Googlebot")
    page = Page(html)
    assert status == 200 and page.title == pages[path].title and page.canonicals == pages[path].canonicals
summary = {"base": BASE, "pages": results, "internalDestinations": len(internal), "checks": "metadata, canonical, social metadata, H1, image alts, JSON-LD, visible FAQ parity, reachability, links, fragments, robots, 404, privacy noindex, Googlebot parity"}
if len(sys.argv) > 2:
    with open(sys.argv[2], "w") as file: json.dump(summary, file, indent=2)
print(f"PASS: {len(paths)} indexable pages, {len(internal)} internal destinations; {summary['checks']}")
