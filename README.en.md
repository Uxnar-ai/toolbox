# toolbox — fifty-one small tools that open and work

> Fifty-one tiny tools in one static site: JSON formatter, text tidier, SQL formatter, JSON to types, number checker, symbol palette, timestamp converter, regex lab, text diff, encoders, hash checker, cron explainer, date calculator, naming converter, random generator, RMB uppercase, unit converter, percentage calculator, colour toolbox, QR generator, QR reader, image compressor, WebP converter, Data URI converter, CSV table, CJK spacing, word count, URL splitter, CIDR calculator, mojibake fixer, Markdown preview, text redaction, regex replace, YAML/JSON, base converter, SQL formatting, type generation, curl to code, HTTP status codes, .gitignore generator, loan calculator, favicon maker, HTML to Markdown, mock data, timezone table, whitespace detective, table aligner, shadow generator, JSON tree, income tax and take-home, JSON to table, BMI and calories, pomodoro timer. No backend, no ports.

English | [中文](README.md)

## What it is

Every tool computes in the browser; no server is involved. `scripts/build_toolbox.py` reads each tool template, rewrites asset paths, injects a shared back-to-index chip and assembles a grouped landing page; theme.css and base.js are deduplicated. The output is a plain static directory any static server can host.

This round (2026-11-14) brings the count to fifty-one, with four new ones:

- **Income tax and take-home**: monthly withholding computed the cumulative way payroll does it. Salary, social insurance (estimated by rate or typed from a real payslip) and extra deductions go in; twelve months of taxable income, tax paid and take-home come out. A year-end bonus is priced both standalone (divided by twelve to find the bracket) and merged into annual income, with the cheaper option called out.
- **JSON to table**: object arrays, single objects and JSON Lines all parse. Nested objects flatten to `user.name` columns, arrays join with commas; export as CSV (with BOM for Excel), TSV, a Markdown table or SQL inserts where numbers stay unquoted.
- **BMI and calories**: Chinese BMI bands, Mifflin-St Jeor basal rate times an activity factor for daily burn, then cut / maintain / bulk targets with protein at 1.6-1.8 g/kg and fat at 25% of calories.
- **Pomodoro timer**: 25 / 45 minute focus, 5 / 15 minute breaks or any custom length. The ring shrinks with the remaining share, a beep and a locally stored session mark the end, and the tab title mirrors the countdown without drift.


## Features

- Income tax and take-home: monthly withholding computed cumulatively; year-end bonus compared solo vs merged, with the saving spelled out
- JSON to table: object arrays, single objects and JSON Lines; nested keys flattened to user.name; CSV / TSV / Markdown / SQL output
- BMI and calories: Chinese BMI bands, Mifflin-St Jeor BMR times an activity factor, plus cut / maintain / bulk calories and macros
- Pomodoro timer: ring countdown, a beep and a logged session at the end, remaining time mirrored in the tab title, no drift after switching tabs
- Whitespace detective: zero-width, BOM, NBSP, ideographic spaces and tabs marked per character, one click to clean
- Table aligner: pads by display width, right-aligns numeric columns automatically, TSV to Markdown table
- Shadow generator: live box-shadow and border-radius from sliders, dark-background preview, copy two CSS lines
- JSON tree: fold big payloads, search a key and ancestors expand, click a key to copy its $.a.b[0] path
- curl to code: four languages, line continuations, grouped short flags, JSON inlined as an object
- HTTP status codes: 54 entries with plain-language causes, including nginx and Cloudflare codes
- .gitignore generator: 24 stacks merged without duplicates, negations preserved, copy or download
- Loan calculator: equal-payment vs equal-principal, monthly payment, total interest, full schedule
- Fifty-one tools in one static site, no backend and no ports
- One build script generates every page from its template
- Text diff: line alignment, in-line character highlighting, foldable unchanged runs, copyable patch
- QR: UTF-8 Chinese, L/M/Q/H correction, adjustable size, PNG download, fixed quiet zone
- Encoders: Base64 (URL-safe), URL, HTML, unicode escapes, JWT with expiry in local time
- Hashing: MD5/SHA-1/SHA-256/SHA-512 with checksum paste-and-compare
- Shared theme with twelve variables, three-state light/dark/system toggle, one site icon
- Single column on narrow screens, no horizontal overflow at 390px
- Cron explainer: plain-language meaning, next ten runs, full five-field syntax, aliases, per-field errors
- Naming converter: eight casings at once, acronym-aware tokenising, batch input, per-style copy
- Date calculator: day and working-day gaps, calendar breakdown, add days/workdays/months/years
- Random generator: passwords/UUID/hex/digits, CSPRNG with a strength estimate
- CSV to table: delimiter detection, quoted commas, header sorting, six export formats
- CJK/Latin spacing: insert spaces, full-width to half-width, highlight the changes
- Word count: Chinese characters, English words, paragraphs, reading time, five platform limits
- URL dissector: live param edits, one-click tracking removal, params to JSON
- Instant search on the landing page across all tools
- Subnet calculator: network/broadcast/host range/mask conversion, subnet splitting, membership test
- Percentage: discount, change, share and increase in four live panels
- Mojibake repair: ranks the plausible UTF-8/GBK/Big5 reinterpretations, plus URL and escape decoding
- Markdown preview: live rendering of headings, lists, tables and code, export to HTML
- QR reader: drag a screenshot or paste it, decode text and links locally
- Text redaction: six rule types, toggle each, keep head/tail or mask whole
- Regex replace: live preview, group references, five presets, matches-only view
- YAML / JSON both directions with line/column errors and downloadable output
- Recently used tools pinned on the landing page, stored locally
- WebP quality comparison: size at 60/75/85/95 side by side, one click to apply

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
