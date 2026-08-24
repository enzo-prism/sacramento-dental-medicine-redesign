#!/usr/bin/env python3
"""Regenerate favicon and app icons from the canonical practice mark."""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
APP = ROOT / "src" / "app"
TINT = (221, 231, 246)  # --brand-tint


def crop_transparent(im: Image.Image) -> Image.Image:
    bbox = im.getbbox()
    return im.crop(bbox) if bbox else im


def flatten_mark(size: int) -> Image.Image:
    """Place the source mark on a high-contrast tile without recursive resampling."""
    src = crop_transparent(
        Image.open(PUBLIC / "images" / "logo-mark.png").convert("RGBA")
    )
    target = round(size * 0.8)
    scale = min(target / src.width, target / src.height)
    src = src.resize(
        (round(src.width * scale), round(src.height * scale)),
        Image.Resampling.LANCZOS,
    )

    canvas = Image.new("RGBA", (size, size), (*TINT, 255))
    x = (size - src.width) // 2
    y = (size - src.height) // 2
    canvas.alpha_composite(src, (x, y))

    if size <= 48:
        canvas = canvas.filter(
            ImageFilter.UnsharpMask(radius=0.65, percent=120, threshold=1)
        )
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


def main() -> None:
    APP.mkdir(parents=True, exist_ok=True)
    mark_180 = flatten_mark(180)
    mark_512 = flatten_mark(512)

    apple = APP / "apple-icon.png"
    mark_180.convert("RGB").save(apple, "PNG", optimize=True)
    mark_180.convert("RGB").save(PUBLIC / "apple-touch-icon.png", "PNG", optimize=True)
    mark_512.convert("RGB").save(APP / "icon.png", "PNG", optimize=True)
    save_ico(mark_180, APP / "favicon.ico")

    print("wrote", apple, apple.stat().st_size)
    print("wrote", APP / "icon.png", (APP / "icon.png").stat().st_size)
    print("wrote", APP / "favicon.ico", (APP / "favicon.ico").stat().st_size)


if __name__ == "__main__":
    main()
