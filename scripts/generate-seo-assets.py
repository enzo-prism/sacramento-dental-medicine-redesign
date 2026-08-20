#!/usr/bin/env python3
"""Regenerate favicon, apple-touch icon, and Open Graph image from the practice mark."""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
APP = ROOT / "src" / "app"
FONT = Path("/tmp/og-fonts/Bricolage.ttf")

NIGHT = (10, 20, 36)  # --night
BRAND = (106, 142, 206)  # --brand
SOFT = (213, 225, 244)  # light periwinkle used on the night band


def flatten_mark(size: int) -> Image.Image:
    src = Image.open(PUBLIC / "apple-touch-icon.png").convert("RGBA")
    canvas = Image.new("RGBA", src.size, (*NIGHT, 255))
    canvas.alpha_composite(src)
    if canvas.size != (size, size):
        canvas = canvas.resize((size, size), Image.Resampling.LANCZOS)
    return canvas


def save_ico(src: Image.Image, dest: Path) -> None:
    frames = []
    for s in (16, 32, 48):
        im = src.resize((s, s), Image.Resampling.LANCZOS).convert("RGBA")
        if s == 16:
            im = im.filter(ImageFilter.UnsharpMask(radius=1, percent=140, threshold=1))
            im = im.convert("RGBA")
        frames.append(im)
    frames[-1].save(
        dest,
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48)],
        append_images=frames[:-1],
    )


def crop_transparent(im: Image.Image) -> Image.Image:
    bbox = im.getbbox()
    return im.crop(bbox) if bbox else im


def font(size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(FONT), size)


def compose_og() -> Image.Image:
    w, h = 1200, 630
    img = Image.new("RGB", (w, h), NIGHT)
    draw = ImageDraw.Draw(img)

    glow = Image.new("RGB", (w, h), NIGHT)
    gdraw = ImageDraw.Draw(glow)
    gdraw.ellipse((280, 40, 920, 590), fill=(16, 32, 56))
    img = Image.blend(img, glow, 0.55)
    draw = ImageDraw.Draw(img)

    mark = Image.open(PUBLIC / "images" / "logo-full-on-dark.png").convert("RGBA")
    mark = crop_transparent(mark)
    target_w = 520
    target_h = round(mark.size[1] * (target_w / mark.size[0]))
    mark = mark.resize((target_w, target_h), Image.Resampling.LANCZOS)

    group_h = target_h + 28 + 36 + 8 + 30
    top = (h - group_h) // 2 - 8
    img.paste(mark, ((w - target_w) // 2, top), mark)

    y = top + target_h + 28
    x0, x1 = w // 2 - 48, w // 2 + 48
    draw.line((x0, y, x1, y), fill=BRAND, width=2)

    location = "Antelope, CA"
    loc_font = font(34)
    lb = draw.textbbox((0, 0), location, font=loc_font)
    loc_w = lb[2] - lb[0]
    draw.text(((w - loc_w) / 2, y + 18), location, font=loc_font, fill=BRAND)

    phone = "(916) 727-6453"
    ph_font = font(26)
    pb = draw.textbbox((0, 0), phone, font=ph_font)
    ph_w = pb[2] - pb[0]
    draw.text(((w - ph_w) / 2, y + 18 + 42), phone, font=ph_font, fill=SOFT)

    return img


def main() -> None:
    APP.mkdir(parents=True, exist_ok=True)
    mark_180 = flatten_mark(180)
    mark_32 = flatten_mark(32)

    apple = APP / "apple-icon.png"
    mark_180.convert("RGB").save(apple, "PNG", optimize=True)
    mark_180.convert("RGB").save(PUBLIC / "apple-touch-icon.png", "PNG", optimize=True)
    mark_32.convert("RGB").save(APP / "icon.png", "PNG", optimize=True)
    save_ico(mark_180, APP / "favicon.ico")

    og = compose_og()
    og_jpg = PUBLIC / "images" / "og.jpg"
    og.save(og_jpg, "JPEG", quality=90, optimize=True, progressive=True)
    og.save(APP / "opengraph-image.jpg", "JPEG", quality=90, optimize=True, progressive=True)
    og.save(APP / "twitter-image.jpg", "JPEG", quality=90, optimize=True, progressive=True)

    alt = "Sacramento Dental Medicine — family and cosmetic dentistry in Antelope, CA"
    (APP / "opengraph-image.alt.txt").write_text(alt)
    (APP / "twitter-image.alt.txt").write_text(alt)

    print("wrote", apple, apple.stat().st_size)
    print("wrote", APP / "icon.png", (APP / "icon.png").stat().st_size)
    print("wrote", APP / "favicon.ico", (APP / "favicon.ico").stat().st_size)
    print("wrote", og_jpg, og_jpg.stat().st_size, og.size)
    print("wrote", APP / "opengraph-image.jpg")


if __name__ == "__main__":
    main()
