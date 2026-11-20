# toolbox — eighty-five small tools that open and work

> Eighty-five tiny tools in one static site: JSON formatter, text tidier, SQL formatter, JSON to types, number checker, symbol palette, timestamp converter, regex lab, text diff, encoders, hash checker, cron explainer, date calculator, naming converter, random generator, RMB uppercase, unit converter, percentage calculator, colour toolbox, QR generator, QR reader, image compressor, WebP converter, Data URI converter, CSV table, CJK spacing, word count, URL splitter, CIDR calculator, mojibake fixer, Markdown preview, text redaction, regex replace, YAML/JSON, base converter, SQL formatting, type generation, curl to code, HTTP status codes, .gitignore generator, loan calculator, favicon maker, HTML to Markdown, mock data, timezone table, whitespace detective, table aligner, shadow generator, JSON tree, income tax and take-home, JSON to table, BMI and calories, pomodoro timer. CSS gradient, image cropper, JSON diff, SVG minifier, subtitle timeline, image watermark, photo metadata, barcode generator, text splitter, character inspector, print size calculator, git rescue manual, regex cookbook, IPv6 address toolkit, recipe scaler, TOTP codes, code beautifier, punctuation converter, nginx reverse-proxy generator, age calculator, image stitcher, Chinese numerals, image comparison, images to PDF, nine-grid splitter, JSON to schema, GPA converter, unit price comparison. No backend, no ports.

English | [中文](README.md)

## What it is

Every tool computes in the browser; no server is involved. `scripts/build_toolbox.py` reads each tool template, rewrites asset paths, injects the back-to-index capsule, and assembles a grouped home page; theme.css and base.js exist once. The output is a plain static directory.

This round (2026-11-21) brings it to eighty-five, with six new tools:

- **Lunar calendar**: pick a date and get the lunar month/day, the sexagenary year and the zodiac animal, plus countdowns to the next traditional festivals. The lunar side uses an embedded 1900-2099 table, so leap months are labelled and the New Year's Eve edge case is right.
- **Permission converter**: type 755 (or tick nine boxes) and see `-rwxr-xr-x` with a per-bit explanation; four-digit input recognises setuid, setgid and the sticky bit, files and directories are explained differently, and common presets are one click away.
- **Markdown TOC**: paste Markdown and get an anchored table of contents by heading level, with `#` inside code fences ignored. Slugs follow the usual rules, duplicates get -1/-2, output is a Markdown list or nested HTML, and numbers restart per level.
- **Fuel economy**: litres and kilometres in, L/100 km, cost per kilometre, distance per litre out, plus 500 km and 15,000 km projections and a plain verdict on whether the figure is thrifty or thirsty.
- **Sleep timing**: 90-minute cycles in both directions — sleep now and see the least-groggy wake times, or pick a wake time and see when to go to bed, with a settable fall-asleep delay and four to six cycles listed.
- **Bill splitter**: total, headcount, service charge and discount in, per-person amount out; split by shares, round up to yuan, jiao or fen, and see exactly how much the rounding over- or under-collects.

## Features

- Lunar calendar: 1900-2099 table, sexagenary year and zodiac, festival countdowns
- Permission converter: octal and rwx forms both ways, including setuid / setgid / sticky
- Markdown TOC: anchored outline by heading level, code fences skipped, Markdown or HTML
- Fuel economy: litres and kilometres in, L/100 km, cost per kilometre and yearly estimate
- Sleep timing: 90-minute cycles both ways, with a settable fall-asleep delay
- Bill splitter: total, headcount and service charge in, per-person amount out, by shares
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
