# toolbox — ninety-one small tools that open and work

> Ninety-one tiny tools in one static site: JSON formatter, text tidier, SQL formatter, JSON to types, number checker, symbol palette, timestamp converter, regex lab, text diff, encoders, hash checker, cron explainer, date calculator, naming converter, random generator, RMB uppercase, unit converter, percentage calculator, colour toolbox, QR generator, QR reader, image compressor, WebP converter, Data URI converter, CSV table, CJK spacing, word count, URL splitter, CIDR calculator, mojibake fixer, Markdown preview, text redaction, regex replace, YAML/JSON, base converter, SQL formatting, type generation, curl to code, HTTP status codes, .gitignore generator, loan calculator, favicon maker, HTML to Markdown, mock data, timezone table, whitespace detective, table aligner, shadow generator, JSON tree, income tax and take-home, JSON to table, BMI and calories, pomodoro timer. CSS gradient, image cropper, JSON diff, SVG minifier, subtitle timeline, image watermark, photo metadata, barcode generator, text splitter, character inspector, print size calculator, git rescue manual, regex cookbook, IPv6 address toolkit, recipe scaler, TOTP codes, code beautifier, punctuation converter, nginx reverse-proxy generator, age calculator, image stitcher, Chinese numerals, image comparison, images to PDF, nine-grid splitter, JSON to schema, GPA converter, unit price comparison, SVG to PNG, ZIP inspector, holiday countdown, XML tidy, TOML to JSON, anniversary to ICS. No backend, no ports.

English | [中文](README.md)

## What it is

Every tool computes in the browser; no server is involved. `scripts/build_toolbox.py` reads each tool template, rewrites asset paths, injects the back-to-index capsule, and assembles a grouped home page; theme.css and base.js exist once. The output is a plain static directory.

This round (2026-11-22) brings it to ninety-one, with six new tools:

- **SVG to PNG**: paste SVG, get a PNG. Leave the width empty to keep the original size or set one to scale proportionally, then stack a 2x/3x/4x multiplier for hi-dpi; background can be transparent, white, black or custom. Download as PNG or copy straight to the clipboard.
- **ZIP inspector**: drop a zip to read its central directory without extracting — names, sizes and compression ratio listed, then pull out only the files you want. Names are decoded as UTF-8 with a GBK fallback; docx, jar and apk are zips too.
- **Holiday countdown**: which holiday is next, how many days away, plus the next eight lined up. Spring Festival counts from New Year's Eve, the lunar festivals use an embedded 1900-2099 table, Qingming uses the solar-term formula, and a progress bar shows how much of the year is gone.
- **XML tidy**: format, minify or convert XML to JSON (attributes as `@name`, text as `#text`, repeated siblings become arrays). Errors point at the exact line and column.
- **TOML to JSON**: paste a Cargo.toml or pyproject.toml. The parser handles nested `[a.b]` tables, `[[array of tables]]`, inline tables, multi-line arrays, dotted keys, all three string forms and comments; dates stay strings. Duplicate keys and syntax errors report the line.
- **Anniversary to ICS**: list birthdays and dates, export a .ics. Yearly entries repeat, commas and semicolons in titles are escaped per spec, and the page shows how many days until the next three.

## Features

- TOML to JSON: nested tables, arrays of tables, inline tables, multi-line arrays
- Anniversary to ICS: a few rows in, a calendar file out, yearly repeats included
- XML tidy: format, minify or convert to JSON with line/column error reporting
- SVG to PNG: paste code, pick width / scale / background, download or copy
- ZIP inspector: list the archive without extracting, pull out single files
- Holiday countdown: next holiday, eight upcoming, lunar festivals computed inline
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
