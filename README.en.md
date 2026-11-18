# toolbox — seventy-three small tools that open and work

> Seventy-three tiny tools in one static site: JSON formatter, text tidier, SQL formatter, JSON to types, number checker, symbol palette, timestamp converter, regex lab, text diff, encoders, hash checker, cron explainer, date calculator, naming converter, random generator, RMB uppercase, unit converter, percentage calculator, colour toolbox, QR generator, QR reader, image compressor, WebP converter, Data URI converter, CSV table, CJK spacing, word count, URL splitter, CIDR calculator, mojibake fixer, Markdown preview, text redaction, regex replace, YAML/JSON, base converter, SQL formatting, type generation, curl to code, HTTP status codes, .gitignore generator, loan calculator, favicon maker, HTML to Markdown, mock data, timezone table, whitespace detective, table aligner, shadow generator, JSON tree, income tax and take-home, JSON to table, BMI and calories, pomodoro timer. CSS gradient, image cropper, JSON diff, SVG minifier, subtitle timeline, image watermark, photo metadata, barcode generator, text splitter, character inspector, print size calculator, git rescue manual, regex cookbook, IPv6 address toolkit, recipe scaler, TOTP codes, code beautifier, punctuation converter, nginx reverse-proxy generator, age calculator, image stitcher, Chinese numerals. No backend, no ports.

English | [中文](README.md)

## What it is

Every tool computes in the browser; no server is involved. `scripts/build_toolbox.py` reads each tool template, rewrites asset paths, injects the back-to-index capsule, and assembles a grouped home page; theme.css and base.js exist once. The output is a plain static directory.

This round (2026-11-19) brings it to seventy-three, with five new tools:

- **Punctuation converter**: Chinese to ASCII punctuation, ASCII to Chinese, full-width and half-width, four directions. URLs, e-mails, decimals, times, thousands separators, file names and inline code are lifted out with placeholders before conversion, so links in the text survive intact.
- **Nginx reverse proxy**: type a hostname and a local port, get a ready-to-paste `server` block with 80-to-443 redirect, TLS paths, proxy headers, WebSocket upgrade, timeouts, body size and gzip, plus an optional `/_fonts/` alias block.
- **Age calculator**: exact years/months/days by calendar arithmetic, plus nominal age, zodiac, star sign, days lived, next birthday countdown and the next round-thousandth day.
- **Image stitcher**: stack screenshots into one long image, place images side by side for comparison, or build a grid; adjustable gap and background, PNG/JPG export, all local.
- **Chinese numerals**: two-way conversion. `1234567.89` becomes 一百二十三万四千五百六十七点八九, and 三千零五 comes back as 3005.

## Features

- Punctuation converter: four directions between Chinese and ASCII punctuation, full and half width, with URLs and 3.14 / 9:30 / 1,000 protected
- Nginx reverse proxy: hostname plus port produces a complete server block with 80-to-443 redirect, WebSocket, body size and a /_fonts/ alias
- Age calculator: exact years/months/days, nominal age, zodiac, star sign, days lived, next birthday countdown, copyable sentence
- Image stitcher: vertical long image, side-by-side comparison or grid, adjustable gap and background, PNG/JPG export
- Chinese numerals: two-way conversion, understands 两 / 壹贰叁 / 点 / 负, rejects mixed input instead of guessing
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
