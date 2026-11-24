# toolbox — one hundred and three small tools that open and work

> One hundred and three tiny tools in one static site: JSON formatter, text tidier, SQL formatter, JSON to types, number checker, symbol palette, timestamp converter, regex lab, text diff, encoders, hash checker, cron explainer, date calculator, naming converter, random generator, RMB uppercase, unit converter, percentage calculator, colour toolbox, QR generator, QR reader, image compressor, WebP converter, Data URI converter, CSV table, CJK spacing, word count, URL splitter, CIDR calculator, mojibake fixer, Markdown preview, text redaction, regex replace, YAML/JSON, base converter, SQL formatting, type generation, curl to code, HTTP status codes, .gitignore generator, loan calculator, favicon maker, HTML to Markdown, mock data, timezone table, whitespace detective, table aligner, shadow generator, JSON tree, income tax and take-home, JSON to table, BMI and calories, pomodoro timer. CSS gradient, image cropper, JSON diff, SVG minifier, subtitle timeline, image watermark, photo metadata, barcode generator, text splitter, character inspector, print size calculator, git rescue manual, regex cookbook, IPv6 address toolkit, recipe scaler, TOTP codes, code beautifier, punctuation converter, nginx reverse-proxy generator, age calculator, image stitcher, Chinese numerals, image comparison, images to PDF, nine-grid splitter, JSON to schema, GPA converter, unit price comparison, SVG to PNG, ZIP inspector, holiday countdown, XML tidy, TOML to JSON, anniversary to ICS, screenshot masking, CSS unit converter, name grouper, storage and bandwidth converter, running pace, compound interest, easing curves, WiFi QR, screenshot beautifier, city weather, table to SQL, timezone meeting planner. No backend, no ports.

English | [中文](README.md)

## What it is

Every tool computes in the browser; no server is involved. `scripts/build_toolbox.py` reads each tool template, rewrites asset paths, injects the back-to-index capsule, and assembles a grouped home page; theme.css and base.js exist once. The output is a plain static directory.

This round (2026-11-25) reaches one hundred and three: city weather, table-to-SQL, and a timezone meeting planner.

- **City weather**: a city name or its 9-digit weather code gives current temperature, feels-like, humidity, wind, pressure, sunrise/sunset and PM2.5 / PM10, plus seven daily rows with temperature-range bars. A 2,500-entry city-code table ships with the page for offline autocomplete; recent cities stay in local storage.
- **Table to SQL**: paste a spreadsheet or JSON array and get a CREATE TABLE plus batched INSERTs. Column types are inferred per column (integer, decimal, boolean, date-time); MySQL, PostgreSQL and SQLite each get their own quoting and boolean literals.
- **Timezone meeting planner**: two or three cities as 24-cell rows; dark cells are working hours (9–18). The overlapping window is printed as an explicit range, and when there is no overlap the closest hour is shown with everyone's local time. DST comes from the browser.


## Features

- City weather: temperature, feels-like, humidity, wind, pressure, sunrise/sunset, seven-day forecast, 2,500+ bundled codes
- Table to SQL: CSV/JSON in, CREATE TABLE and batched INSERTs out, inferred types, three dialects
- Timezone planner: 24-cell rows show who is at work; the overlap printed as a range, DST automatic
- Recent cities kept locally (max 8) as one-tap chips; opens on the last one next time
- Weather data fetched straight from public endpoints, no relay server
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
