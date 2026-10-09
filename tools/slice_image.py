"""Cut a very tall screenshot into readable slices.

Usage: python tools/slice_image.py <image> <out_dir> [slice_height]
"""
import sys
from pathlib import Path

from PIL import Image

Image.MAX_IMAGE_PIXELS = None


def main() -> None:
    src, out_dir = Path(sys.argv[1]), Path(sys.argv[2])
    height = int(sys.argv[3]) if len(sys.argv) > 3 else 2000
    overlap = 60
    out_dir.mkdir(parents=True, exist_ok=True)
    img = Image.open(src).convert("RGB")
    top, n = 0, 0
    while top < img.height:
        n += 1
        box = (0, top, img.width, min(top + height, img.height))
        img.crop(box).save(out_dir / f"{n:02d}.jpg", quality=80)
        top += height - overlap
    print(f"{src.name}: {img.width}x{img.height} -> {n} slices in {out_dir}")


if __name__ == "__main__":
    main()
