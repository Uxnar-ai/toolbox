# toolbox — fifty-five small tools that open and work

> Fifty-five tiny tools in one static site: JSON formatter, text tidier, SQL formatter, JSON to types, number checker, symbol palette, timestamp converter, regex lab, text diff, encoders, hash checker, cron explainer, date calculator, naming converter, random generator, RMB uppercase, unit converter, percentage calculator, colour toolbox, QR generator, QR reader, image compressor, WebP converter, Data URI converter, CSV table, CJK spacing, word count, URL splitter, CIDR calculator, mojibake fixer, Markdown preview, text redaction, regex replace, YAML/JSON, base converter, SQL formatting, type generation, curl to code, HTTP status codes, .gitignore generator, loan calculator, favicon maker, HTML to Markdown, mock data, timezone table, whitespace detective, table aligner, shadow generator, JSON tree, income tax and take-home, JSON to table, BMI and calories, pomodoro timer. CSS gradient, image cropper, JSON diff, SVG minifier. No backend, no ports.

English | [中文](README.md)

## What it is

Every tool computes in the browser; no server is involved. `scripts/build_toolbox.py` reads each tool template, rewrites asset paths, injects a shared back-to-index chip and assembles a grouped landing page; theme.css and base.js are deduplicated. The output is a plain static directory any static server can host.

This round (2026-11-15) brings the count to fifty-five, with four new ones:

- **CSS gradient**: colour stops positioned by sliders (up to eight), linear or radial, angle 0–360. Live preview, one-click `background: linear-gradient(...)`, and a 1200×630 PNG export using the same maths as CSS (0deg points up).
- **Image cropper**: drop an image, drag a box on the canvas, lock 1:1 / 4:3 / 16:9 / 3:4 / wide; the selection is expressed in source pixels, exported as PNG / JPEG / WebP with an optional size cap. Dimmed mask, rule-of-thirds guides, and a sensible 70% default selection.
- **JSON diff**: paste two API responses, comparison runs automatically and lists added / removed / changed fields by path such as `$.data.items[0].stock`. Filter to differences only, copy the list. Arrays are compared by index — no guessing.
- **SVG minifier**: strips comments, metadata, inkscape / sodipodi attributes and redundant whitespace, rounds coordinate decimals to 0–2 places, previews instantly and reports before/after size (1.04 KB to 430 B on the bundled sample). Text nodes are left untouched.

## Features

- CSS gradient: slider-positioned colour stops (up to eight), linear or radial, 0–360 angle, live preview, one-click CSS copy and a 1200×630 PNG export
- Image cropper: drag a box on the canvas with six ratio locks; export the selection at source-pixel fidelity as PNG / JPEG / WebP, optionally capped at 512 / 1024 / 2048
- JSON diff: automatic comparison of two payloads, added / removed / changed fields listed by path, differences-only filter, copyable change list
- SVG minifier: drops comments, metadata, editor attributes and extra whitespace, rounds coordinates to 0–2 decimals, live preview with before/after size
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
