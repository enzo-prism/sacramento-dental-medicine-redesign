import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { imagery, officePhotos } from "./site.ts";

describe("office photos", () => {
  it("lists eight real Elverta Road photos with files on disk", () => {
    assert.equal(officePhotos.length, 8);
    const srcs = officePhotos.map((photo) => photo.src);
    assert.equal(new Set(srcs).size, srcs.length);

    for (const photo of officePhotos) {
      assert.match(photo.src, /^\/images\/office-[a-z]+\.webp$/);
      assert.ok(photo.alt.length > 20);
      assert.doesNotMatch(photo.alt, /patient|atmospheric|stock/i);
      assert.ok(
        existsSync(join(process.cwd(), "public", photo.src.replace(/^\//, ""))),
        `missing ${photo.src}`,
      );
    }
  });

  it("does not replace portraits or the logo", () => {
    assert.equal(imagery.logo, "/images/logo-mark.png");
    assert.equal(imagery.logoFull, "/images/logo-full-on-dark.png");
    assert.equal(imagery.narodovich, "/images/dr-narodovich.webp");
    assert.equal(imagery.sheppard, "/images/dr-sheppard-portrait.webp");
    assert.equal(imagery.hero, "/images/hero.webp");
    assert.equal(imagery.care, "/images/waiting.webp");
    assert.equal(imagery.stillLife, "/images/still-life.webp");
  });
});
