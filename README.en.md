# toolbox — sixty-eight small tools that open and work

> Sixty-eight tiny tools in one static site: JSON formatter, text tidier, SQL formatter, JSON to types, number checker, symbol palette, timestamp converter, regex lab, text diff, encoders, hash checker, cron explainer, date calculator, naming converter, random generator, RMB uppercase, unit converter, percentage calculator, colour toolbox, QR generator, QR reader, image compressor, WebP converter, Data URI converter, CSV table, CJK spacing, word count, URL splitter, CIDR calculator, mojibake fixer, Markdown preview, text redaction, regex replace, YAML/JSON, base converter, SQL formatting, type generation, curl to code, HTTP status codes, .gitignore generator, loan calculator, favicon maker, HTML to Markdown, mock data, timezone table, whitespace detective, table aligner, shadow generator, JSON tree, income tax and take-home, JSON to table, BMI and calories, pomodoro timer. CSS gradient, image cropper, JSON diff, SVG minifier, subtitle timeline, image watermark, photo metadata, barcode generator, text splitter, character inspector, print size calculator, git rescue manual, regex cookbook, IPv6 address toolkit, recipe scaler, TOTP codes, code beautifier. No backend, no ports.

English | [中文](README.md)

## What it is

Every tool computes in the browser; no server is involved. `scripts/build_toolbox.py` reads each tool template, rewrites asset paths, injects the back-to-index capsule, and assembles a grouped home page; theme.css and base.js exist once. The output is a plain static directory.

This round (2026-11-18) brings it to sixty-eight, with four new tools:

- **IPv6 address**: paste an address or prefix (`2408:8207::1/64`, `fe80::1`, `::ffff:198.51.100.10`, even `ff02::1%eth0`) and get the RFC 5952 short form, the full form, network and first/last usable addresses, how many addresses the block holds, and the address class (global unicast, link-local, unique-local, multicast, documentation, NAT64). Two reverse helpers: test whether an address falls inside the parsed block, and derive the `fe80::` link-local address from a MAC (EUI-64 with the U/L bit flipped).
- **Recipe scaler**: paste a whole recipe, give the original and target serving counts, and every gram, millilitre, spoon and count is rescaled. Ranges like `100-150 g` scale at both ends; fractions like `1/2 cup` are understood; oven temperatures, minutes and step numbers are left alone. Changed numbers are highlighted in the result, and a spoon-to-gram table covers flour, sugar, salt, rice and oil.
- **TOTP codes**: paste the Base32 backup secret or a whole `otpauth://` URI and get the current code; 6 or 8 digits, 30 or 60 seconds, SHA-1 / SHA-256 / SHA-512. Countdown bar and next-code preview included. Hashing runs in WebCrypto — the secret is never stored or sent anywhere.
- **Code beautifier**: minified HTML, CSS or JS from a page or a build artefact is re-indented; HTML and CSS can also be collapsed back to one line. Only whitespace changes — strings, template literals, regexes and comments in JS are preserved, and line breaks are only inserted after `;`, `{` and `}` (semicolons inside `for(;;)` excepted), so automatic semicolon insertion is never triggered. JS minification is deliberately left out.

## Features

- IPv6 address: short and full forms, network and usable range, address count, class detection, MAC to fe80:: link-local in one click
- Recipe scaler: rescales a whole recipe by serving count, understands ranges and fractions, leaves oven temperature and timing alone
- TOTP codes: Base32 secret or otpauth URI, 6 or 8 digits, three algorithms, countdown, computed locally with WebCrypto
- Code beautifier: re-indents HTML / CSS / JS and can collapse HTML and CSS back to one line, changing whitespace only
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
