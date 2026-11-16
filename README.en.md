# toolbox — sixty-four small tools that open and work

> Sixty-four tiny tools in one static site: JSON formatter, text tidier, SQL formatter, JSON to types, number checker, symbol palette, timestamp converter, regex lab, text diff, encoders, hash checker, cron explainer, date calculator, naming converter, random generator, RMB uppercase, unit converter, percentage calculator, colour toolbox, QR generator, QR reader, image compressor, WebP converter, Data URI converter, CSV table, CJK spacing, word count, URL splitter, CIDR calculator, mojibake fixer, Markdown preview, text redaction, regex replace, YAML/JSON, base converter, SQL formatting, type generation, curl to code, HTTP status codes, .gitignore generator, loan calculator, favicon maker, HTML to Markdown, mock data, timezone table, whitespace detective, table aligner, shadow generator, JSON tree, income tax and take-home, JSON to table, BMI and calories, pomodoro timer. CSS gradient, image cropper, JSON diff, SVG minifier, subtitle timeline, image watermark, photo metadata, barcode generator, text splitter, character inspector, print size calculator, git rescue manual, regex cookbook. No backend, no ports.

English | [中文](README.md)

## What it is

Every tool computes in the browser; no server is involved. `scripts/build_toolbox.py` reads each tool template, rewrites asset paths, injects the back-to-index capsule, and assembles a grouped home page; theme.css and base.js exist once. The output is a plain static directory.

This round (2026-11-17) brings it to sixty-four, with four new tools:

- **Character inspector**: splits text by code point and reports the code point (decimal too), UTF-8 bytes, the JS \\uXXXX escape and the HTML entity, labelled by Unicode block (CJK, full-width, punctuation, zero-width, BOM, emoji). Invisible characters get text badges (SP / NBSP / ZWSP / ZWJ / BOM) instead of tofu boxes. Reverse lookup accepts `4F60`, `U+4F60`, `20320`, `&#x4F60;`, or a pasted character.
- **Print size calculator**: pixels plus DPI give centimetres, centimetres plus DPI give the pixels you need; with the aspect lock on, changing one side updates the other. Ten common formats (A4 print, A4 home, A3 poster, 1-inch and 2-inch ID photos, 6-inch photo, social cover, square post, phone wallpaper, 1080p) apply in one click with their recommended DPI, and the page says whether that resolution actually prints well.
- **Git rescue**: 36 scenarios of undoing something, in six groups: fixing commits, branches and stashing, restoring files, push trouble, investigating, one-time config. Each has when to use it, a copyable command, and when *not* to run it (amending an already-pushed commit, `git clean -fd` deleting never-committed files).
- **Regex cookbook**: 33 patterns in six categories, each with samples that should match and samples that should not; the page runs them on load and marks ✓ / ✗, so a wrong pattern is visible immediately. A trial box highlights matches per line and counts how many lines match as a whole.

## Features

- Character inspector: code point, UTF-8 bytes, JS escape and HTML entity per character; invisible characters become text badges; reverse lookup by code point
- Print size calculator: pixels and centimetres both ways, aspect lock, ten common formats one click away
- Git rescue: 36 scenarios of how to undo something, each with the command and when not to run it; searchable and grouped
- Regex cookbook: 33 patterns with self-test samples checked live at load, plus a trial box that highlights matches per line
- Everything runs in the browser: images, text and JSON are never uploaded

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
