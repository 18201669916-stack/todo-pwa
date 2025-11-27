#!/usr/bin/env bash
# Generate PNG icons from SVG placeholders.
# Usage: bash scripts/generate_icons.sh
set -eu
SVG_DIR="public/icons"
OUT_DIR="$SVG_DIR"
mkdir -p "$OUT_DIR"

if command -v magick >/dev/null 2>&1; then
  magick convert "$SVG_DIR/icon-192.svg" -resize 192x192 "$OUT_DIR/icon-192.png"
  magick convert "$SVG_DIR/icon-512.svg" -resize 512x512 "$OUT_DIR/icon-512.png"
  echo "Generated PNG icons using ImageMagick"
  exit 0
fi

if command -v rsvg-convert >/dev/null 2>&1; then
  rsvg-convert -w 192 -h 192 -o "$OUT_DIR/icon-192.png" "$SVG_DIR/icon-192.svg"
  rsvg-convert -w 512 -h 512 -o "$OUT_DIR/icon-512.png" "$SVG_DIR/icon-512.svg"
  echo "Generated PNG icons using rsvg-convert"
  exit 0
fi

cat <<EOF
No SVG renderer found. Install one of the following on macOS:
  brew install imagemagick    # provides 'magick'
  or
  brew install librsvg       # provides 'rsvg-convert'

After installing, re-run:
  bash scripts/generate_icons.sh

EOF
exit 1
