# toolbox — one hundred and one small tools that open and work

> One hundred and one tiny tools in one static site: JSON formatter, text tidier, SQL formatter, JSON to types, number checker, symbol palette, timestamp converter, regex lab, text diff, encoders, hash checker, cron explainer, date calculator, naming converter, random generator, RMB uppercase, unit converter, percentage calculator, colour toolbox, QR generator, QR reader, image compressor, WebP converter, Data URI converter, CSV table, CJK spacing, word count, URL splitter, CIDR calculator, mojibake fixer, Markdown preview, text redaction, regex replace, YAML/JSON, base converter, SQL formatting, type generation, curl to code, HTTP status codes, .gitignore generator, loan calculator, favicon maker, HTML to Markdown, mock data, timezone table, whitespace detective, table aligner, shadow generator, JSON tree, income tax and take-home, JSON to table, BMI and calories, pomodoro timer. CSS gradient, image cropper, JSON diff, SVG minifier, subtitle timeline, image watermark, photo metadata, barcode generator, text splitter, character inspector, print size calculator, git rescue manual, regex cookbook, IPv6 address toolkit, recipe scaler, TOTP codes, code beautifier, punctuation converter, nginx reverse-proxy generator, age calculator, image stitcher, Chinese numerals, image comparison, images to PDF, nine-grid splitter, JSON to schema, GPA converter, unit price comparison, SVG to PNG, ZIP inspector, holiday countdown, XML tidy, TOML to JSON, anniversary to ICS, screenshot masking, CSS unit converter, name grouper, storage and bandwidth converter, running pace, compound interest, easing curves, WiFi QR, screenshot beautifier, city weather. No backend, no ports.

English | [中文](README.md)

## What it is

Every tool computes in the browser; no server is involved. `scripts/build_toolbox.py` reads each tool template, rewrites asset paths, injects the back-to-index capsule, and assembles a grouped home page; theme.css and base.js exist once. The output is a plain static directory.

This round (2026-11-25) reaches one hundred and one, adding a city weather tool and a new "life" group:

- **City weather**: type a city name or its 9-digit weather code to get the current temperature, feels-like, humidity, wind, pressure, sunrise/sunset and PM2.5 / PM10, plus a seven-day forecast with temperature-range bars.
- **City codes bundled**: a 2,500-entry table mapping Chinese city names to China Weather's 9-digit codes ships with the page, so lookup works offline and doubles as autocomplete.
- **Recent cities remembered**: up to eight visited cities are kept in localStorage as one-tap chips, with cached coordinates so a repeat lookup skips geocoding entirely.
- **No middleman**: weather and air quality are fetched directly from Open-Meteo's public endpoints.


## Features

- City weather: temperature, feels-like, humidity, wind, pressure, sunrise/sunset, seven-day forecast
- Accepts a city name or 9-digit code; 2,500+ entry code table bundled for offline autocomplete
- Recent cities kept locally (max 8) as one-tap chips; opens on the last one next time
- PM2.5 / PM10 graded on one consistent scale; seven-day rows carry range bars
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
