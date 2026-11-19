# toolbox — seventy-nine small tools that open and work

> Seventy-nine tiny tools in one static site: JSON formatter, text tidier, SQL formatter, JSON to types, number checker, symbol palette, timestamp converter, regex lab, text diff, encoders, hash checker, cron explainer, date calculator, naming converter, random generator, RMB uppercase, unit converter, percentage calculator, colour toolbox, QR generator, QR reader, image compressor, WebP converter, Data URI converter, CSV table, CJK spacing, word count, URL splitter, CIDR calculator, mojibake fixer, Markdown preview, text redaction, regex replace, YAML/JSON, base converter, SQL formatting, type generation, curl to code, HTTP status codes, .gitignore generator, loan calculator, favicon maker, HTML to Markdown, mock data, timezone table, whitespace detective, table aligner, shadow generator, JSON tree, income tax and take-home, JSON to table, BMI and calories, pomodoro timer. CSS gradient, image cropper, JSON diff, SVG minifier, subtitle timeline, image watermark, photo metadata, barcode generator, text splitter, character inspector, print size calculator, git rescue manual, regex cookbook, IPv6 address toolkit, recipe scaler, TOTP codes, code beautifier, punctuation converter, nginx reverse-proxy generator, age calculator, image stitcher, Chinese numerals, image comparison, images to PDF, nine-grid splitter, JSON to schema, GPA converter, unit price comparison. No backend, no ports.

English | [中文](README.md)

## What it is

Every tool computes in the browser; no server is involved. `scripts/build_toolbox.py` reads each tool template, rewrites asset paths, injects the back-to-index capsule, and assembles a grouped home page; theme.css and base.js exist once. The output is a plain static directory.

This round (2026-11-20) brings it to seventy-nine, with five new tools:

- **Images to PDF**: drop a few photos or screenshots, reorder them with the arrows, get one PDF. The page writes the PDF by hand — each image is re-encoded to JPEG on a canvas and embedded as a DCTDecode stream, with A4, A5 or image-sized pages, adjustable margin and quality.
- **Nine-grid splitter**: cut one image into nine equal tiles (or 2x2, 1x3, 3x1) and download them as a single ZIP. The archive is written in stored mode — PNG is already compressed.
- **JSON to schema**: paste an API response and get inferred types, required fields and array item structure, with date, e-mail and URL formats detected. Items of the same array are merged, so fields missing from some elements are not marked required.
- **GPA converter**: enter credits and grades (numbers or 优/良/中/及格), get the weighted average plus GPA on the 4.0, 4.3 and 5.0 scales.
- **Unit price comparison**: put several pack sizes side by side, normalised to price per 100 g, 100 ml or per piece, sorted with the best value highlighted and the premium of the rest shown in percent.

## Features

- Images to PDF: reorder images into one file, PDF written by hand, A4 / A5 / image-sized pages
- Nine-grid splitter: six layouts, downloaded as one ZIP whose names follow posting order
- JSON to schema: inferred types, required fields, merged array items, detected date / e-mail / URL formats
- GPA converter: weighted average plus 4.0 / 4.3 / 5.0 scales, letter grades accepted
- Unit price comparison: per 100 g, 100 ml or per piece, sorted with the best value highlighted
- Everything computes in the browser: images, text and JSON never leave the page

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
