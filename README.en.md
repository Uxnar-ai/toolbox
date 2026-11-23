# toolbox — one hundred small tools that open and work

> One hundred tiny tools in one static site: JSON formatter, text tidier, SQL formatter, JSON to types, number checker, symbol palette, timestamp converter, regex lab, text diff, encoders, hash checker, cron explainer, date calculator, naming converter, random generator, RMB uppercase, unit converter, percentage calculator, colour toolbox, QR generator, QR reader, image compressor, WebP converter, Data URI converter, CSV table, CJK spacing, word count, URL splitter, CIDR calculator, mojibake fixer, Markdown preview, text redaction, regex replace, YAML/JSON, base converter, SQL formatting, type generation, curl to code, HTTP status codes, .gitignore generator, loan calculator, favicon maker, HTML to Markdown, mock data, timezone table, whitespace detective, table aligner, shadow generator, JSON tree, income tax and take-home, JSON to table, BMI and calories, pomodoro timer. CSS gradient, image cropper, JSON diff, SVG minifier, subtitle timeline, image watermark, photo metadata, barcode generator, text splitter, character inspector, print size calculator, git rescue manual, regex cookbook, IPv6 address toolkit, recipe scaler, TOTP codes, code beautifier, punctuation converter, nginx reverse-proxy generator, age calculator, image stitcher, Chinese numerals, image comparison, images to PDF, nine-grid splitter, JSON to schema, GPA converter, unit price comparison, SVG to PNG, ZIP inspector, holiday countdown, XML tidy, TOML to JSON, anniversary to ICS, screenshot masking, CSS unit converter, name grouper, storage and bandwidth converter, running pace, compound interest, easing curves, WiFi QR, screenshot beautifier. No backend, no ports.

English | [中文](README.md)

## What it is

Every tool computes in the browser; no server is involved. `scripts/build_toolbox.py` reads each tool template, rewrites asset paths, injects the back-to-index capsule, and assembles a grouped home page; theme.css and base.js exist once. The output is a plain static directory.

This round (2026-11-24) reaches one hundred, with five new tools:

- **Running pace**: enter distance and time (5K / 10K / half / full presets), get pace, speed, per-400m and per-mile splits, plus a kilometre-by-kilometre table. A Riegel estimate shows what other distances would take — doubling the distance costs about 2.06x the time, not 2x.
- **Compound interest**: principal, monthly contribution, annual return and years give the final balance, total paid in, profit and multiple; an inflation-adjusted figure shows what it would actually buy. A year-by-year table makes the crossover obvious.
- **Easing curve editor**: drag the two control points, read off `cubic-bezier(...)` and copy it. Seven presets plus a dot that really animates with the current curve.
- **WiFi QR code**: SSID, password and encryption type produce a scannable join-the-network code, downloadable as 720 / 1000 / 1600 px PNG. The exact payload string is shown so a code that will not scan can be debugged.
- **Screenshot beautifier**: drop a screenshot, add a gradient or solid backdrop, padding, rounded corners and a shadow, choose 1:1 / 4:3 / 16:9 and export 1200–2400 px PNG.

## Features

- Running pace: pace, speed, splits, plus 5K / half / full finish estimates
- Compound interest: final balance, profit, inflation-adjusted value, yearly table
- Easing editor: drag a cubic-bezier, seven presets, live demo
- WiFi QR: scan to join, download PNG, payload shown in plain text
- Screenshot beautifier: gradient backdrop, rounded corners, shadow, HD PNG export
- Everything runs in the browser: images, archives, text and JSON never leave the page

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
