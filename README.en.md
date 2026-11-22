# toolbox — ninety-five small tools that open and work

> Ninety-five tiny tools in one static site: JSON formatter, text tidier, SQL formatter, JSON to types, number checker, symbol palette, timestamp converter, regex lab, text diff, encoders, hash checker, cron explainer, date calculator, naming converter, random generator, RMB uppercase, unit converter, percentage calculator, colour toolbox, QR generator, QR reader, image compressor, WebP converter, Data URI converter, CSV table, CJK spacing, word count, URL splitter, CIDR calculator, mojibake fixer, Markdown preview, text redaction, regex replace, YAML/JSON, base converter, SQL formatting, type generation, curl to code, HTTP status codes, .gitignore generator, loan calculator, favicon maker, HTML to Markdown, mock data, timezone table, whitespace detective, table aligner, shadow generator, JSON tree, income tax and take-home, JSON to table, BMI and calories, pomodoro timer. CSS gradient, image cropper, JSON diff, SVG minifier, subtitle timeline, image watermark, photo metadata, barcode generator, text splitter, character inspector, print size calculator, git rescue manual, regex cookbook, IPv6 address toolkit, recipe scaler, TOTP codes, code beautifier, punctuation converter, nginx reverse-proxy generator, age calculator, image stitcher, Chinese numerals, image comparison, images to PDF, nine-grid splitter, JSON to schema, GPA converter, unit price comparison, SVG to PNG, ZIP inspector, holiday countdown, XML tidy, TOML to JSON, anniversary to ICS, screenshot masking, CSS unit converter, name grouper, storage and bandwidth converter. No backend, no ports.

English | [中文](README.md)

## What it is

Every tool computes in the browser; no server is involved. `scripts/build_toolbox.py` reads each tool template, rewrites asset paths, injects the back-to-index capsule, and assembles a grouped home page; theme.css and base.js exist once. The output is a plain static directory.

This round (2026-11-23) brings it to ninety-five, with four new tools:

- **Screenshot masking**: drop a screenshot, drag a box over a phone number, name or address, and it is pixelated on release. Mosaic, gaussian blur or a solid block; adjustable strength, step-by-step undo, restore the original, export PNG. Nothing leaves the browser.
- **CSS unit converter**: type a value and pick a unit, get px / rem / em / % / vw / vh / pt at once, click a row to copy. Root font size, parent font size and viewport are adjustable. Also converts design-draft pixels to vw (375 / 750 / 1440 / 1920 presets) and lists a 12-step type scale.
- **Name grouper**: paste one name per line (commas, semicolons and spaces also split; duplicates are dropped), then split into N groups or N per group as evenly as possible, or draw names without repeats. Randomness comes from the system CSPRNG with rejection sampling instead of `Math.random` modulo; results copy out as plain text.
- **Storage and bandwidth**: why a 500 GB drive shows 465.7 GiB — decimal and binary columns side by side with a one-line conclusion; 300 Mbps becomes 37.5 MB/s with a 100M to 2G reference table; and a file size plus bandwidth gives the download time at 85% efficiency.

## Features

- Screenshot masking: drag a box, pick mosaic / blur / solid, undo, export PNG
- CSS units: px, rem, em, %, vw, vh, pt at once, plus design-draft px to vw
- Name grouper: even random groups or non-repeating draws, copy as text
- Storage and bandwidth: GB vs GiB, Mbps to MB/s, download time estimate
- Everything runs in the browser: no uploads, no backend endpoints at all

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
