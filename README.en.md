# toolbox — one hundred and seven small tools that open and work

> One hundred and seven tiny tools in one static site: JSON formatter, text tidier, SQL formatter, JSON to types, number checker, symbol palette, timestamp converter, regex lab, text diff, encoders, hash checker, cron explainer, date calculator, naming converter, random generator, RMB uppercase, unit converter, percentage calculator, colour toolbox, QR generator, QR reader, image compressor, WebP converter, Data URI converter, CSV table, CJK spacing, word count, URL splitter, CIDR calculator, mojibake fixer, Markdown preview, text redaction, regex replace, YAML/JSON, base converter, SQL formatting, type generation, curl to code, HTTP status codes, .gitignore generator, loan calculator, favicon maker, HTML to Markdown, mock data, timezone table, whitespace detective, table aligner, shadow generator, JSON tree, income tax and take-home, JSON to table, BMI and calories, pomodoro timer. CSS gradient, image cropper, JSON diff, SVG minifier, subtitle timeline, image watermark, photo metadata, barcode generator, text splitter, character inspector, print size calculator, git rescue manual, regex cookbook, IPv6 address toolkit, recipe scaler, TOTP codes, code beautifier, punctuation converter, nginx reverse-proxy generator, age calculator, image stitcher, Chinese numerals, image comparison, images to PDF, nine-grid splitter, JSON to schema, GPA converter, unit price comparison, SVG to PNG, ZIP inspector, holiday countdown, XML tidy, TOML to JSON, anniversary to ICS, screenshot masking, CSS unit converter, name grouper, storage and bandwidth converter, running pace, compound interest, easing curves, WiFi QR, screenshot beautifier, city weather, table to SQL, timezone meeting planner, instalment APR, Docker cheat sheet, systemd service generator, renovation quantities. No backend, no ports.

English | [中文](README.md)

## What it is

Every tool computes in the browser; no server is involved. `scripts/build_toolbox.py` reads each tool template, rewrites asset paths, injects the back-to-index capsule, and assembles a grouped home page; theme.css and base.js exist once. The output is a plain static directory.

This round (2026-11-26) reaches one hundred and seven: instalment APR, Docker cheat sheet, systemd service generator, renovation quantities.

- **Instalment APR**: give principal, terms and the monthly fee rate; you get both the advertised figure (fee × 12) and the real annualised rate solved from cash flows. Fees are charged on the original principal while the balance shrinks, so 0.6% over 12 months is really 13.84% — a 1.92x gap, with a per-period breakdown and a rate comparison table.
- **Docker cheat sheet**: 45 commands grouped by task (daily, logs, images, cleanup, Compose, networks and volumes), each with a scenario title and a one-line note; type to filter, click to copy.
- **systemd service generator**: fill in the exec command, working directory, user and environment and get a ready-to-use .service — plus a matching .timer when the scheduled box is ticked, with the full deploy commands and a day-to-day command list.
- **Renovation quantities**: room dimensions give wall, ceiling and floor areas; paint comes out in litres and buckets, flooring in pieces with a waste allowance, skirting in metres.


## Features

- Instalment APR: monthly fee rate to real annualised rate (0.6% x 12 = 13.84%), incl. upfront fee and per-period schedule
- Docker cheat sheet: 45 commands by task, instant filter, click to copy
- systemd generator: .service plus .timer, with the three deploy commands and a daily command list
- Renovation quantities: paint buckets, flooring pieces with waste, skirting length and rough cost
- One hundred and seven tools in a single static site, system-aware theme, works on narrow screens
- Everything computes in the browser; nothing is uploaded and no backend endpoint exists

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
