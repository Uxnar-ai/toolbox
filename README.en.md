# toolbox — sixty small tools that open and work

> Sixty tiny tools in one static site: JSON formatter, text tidier, SQL formatter, JSON to types, number checker, symbol palette, timestamp converter, regex lab, text diff, encoders, hash checker, cron explainer, date calculator, naming converter, random generator, RMB uppercase, unit converter, percentage calculator, colour toolbox, QR generator, QR reader, image compressor, WebP converter, Data URI converter, CSV table, CJK spacing, word count, URL splitter, CIDR calculator, mojibake fixer, Markdown preview, text redaction, regex replace, YAML/JSON, base converter, SQL formatting, type generation, curl to code, HTTP status codes, .gitignore generator, loan calculator, favicon maker, HTML to Markdown, mock data, timezone table, whitespace detective, table aligner, shadow generator, JSON tree, income tax and take-home, JSON to table, BMI and calories, pomodoro timer. CSS gradient, image cropper, JSON diff, SVG minifier, subtitle timeline, image watermark, photo metadata, barcode generator, text splitter. No backend, no ports.

English | [中文](README.md)

## What it is

Every tool computes in the browser; no server is involved. `scripts/build_toolbox.py` reads each tool template, rewrites asset paths, injects a shared back-to-index chip and assembles a grouped landing page; theme.css and base.js are deduplicated. The output is a plain static directory any static server can host.

This round (2026-11-16) brings the count to sixty, with five new ones:

- **Subtitle timeline**: shift a whole subtitle file forward or back by a number of seconds (clamped at zero), and convert between SRT and VTT without touching the text or the cue order. Cue counts, total duration and first/last timestamps are summarised.
- **Image watermark**: drop an image, type a line, then pick one of nine anchor positions and adjust size (percentage of image width), opacity and colour. A tiled mode covers the whole frame; exports keep the original resolution and never leave the machine.
- **Photo metadata**: parses the JPEG APP1 block directly — capture time, camera, lens, aperture/shutter, GPS — grouped and highlighted when sensitive. One click re-renders through a canvas to strip everything, and reports how much smaller the file got.
- **Barcode generator**: Code128 (set B, with checksum) and EAN-13 (check digit computed for 12 digits, validated for 13). Renders SVG with a 10-module quiet zone and merged bar runs; PNG export redraws at 3x.
- **Text splitter**: cut a long text into chunks by character budget, breaking on blank lines and sentence punctuation instead of mid-sentence. "Split into N parts" searches for the budget whose chunk count lands closest to the target.

## Features

- Subtitle timeline: shift all cues by seconds (clamped at zero), convert SRT to VTT and back without touching text or order, with cue count and total duration
- Image watermark: nine anchor positions, size as a percentage of image width, opacity and colour, optional full-frame tiling, exports at original resolution
- Photo metadata: reads capture time, camera, lens, exposure and GPS from the JPEG APP1 block, highlights the sensitive parts, and strips everything on re-export
- Barcode generator: Code128 and EAN-13 with computed / validated check digits, SVG with a 10-module quiet zone and merged bar runs, plus a 3x PNG export
- Text splitter: chunk by character budget or target part count, breaking on paragraphs and sentence punctuation, copy per chunk or export a txt
- Everything runs in the browser: images, text and JSON never leave the machine, and there is no backend at all

## Stack

HTML · CSS · 原生 JS（构建脚本 Python 3）

## Run

```bash
python scripts/build_toolbox.py
# 然后把 src/toolbox/ 丢给任意静态服务器
```

## About

Part of the **auto-lab** series — small projects written, deployed and maintained automatically by [Nix](https://github.com/Uxnar-ai) on a self-hosted server.

Placeholders such as `<SERVER_IP>` and `<LOCAL_PATH>` are sanitised values applied at publish time. This repository contains no credentials, internal addresses or personal data.

## License

MIT
