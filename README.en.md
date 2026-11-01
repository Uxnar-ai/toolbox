# toolbox — twelve small tools that open and work

> Twelve tiny tools in one static site: JSON formatter, text tidier, timestamp converter, regex lab, text diff, encoders, hash checker, RMB uppercase, unit converter, colour toolbox, QR codes and image compressor. No backend, no ports.

English | [中文](README.md)

## What it is

Every tool computes in the browser; no server is involved. `scripts/build_toolbox.py` reads each tool template, rewrites asset paths, injects a shared back-to-index chip and assembles a grouped landing page; theme.css and base.js are deduplicated. The output is a plain static directory any static server can host.

This round grew the toolbox from eight tools to twelve, all of them things you actually reach for:

- **Text diff**: paste before and after. Lines are aligned with a longest-common-subsequence pass, then paired removed/added lines get a character-level comparison so only the characters that really changed are marked; long unchanged runs collapse into a single notice and the diff copies out in `+`/`-` form.
- **QR generator**: bundled encoder (MIT). Chinese goes in as UTF-8 rather than whatever the browser would guess, error correction L/M/Q/H, a fixed four-module quiet zone, and the downloaded PNG is scaled by whole modules so scanners like it.
- **Encoders**: Base64 (including URL-safe -_), URL escaping, HTML escaping, unicode escapes, JWT inspection. The JWT view converts issued/expiry timestamps to local time and says how long is left — while stating on the page that signatures are not verified.
- **Hash checker**: drop a file for MD5 / SHA-1 / SHA-256 / SHA-512. The SHA family uses the browser's crypto.subtle; MD5 is implemented in the page (checked against four vectors: empty string, abc, 1000 a's, a Chinese string). Paste the published checksum and it infers the algorithm from its length and says whether it matches.

Two long-standing bugs got fixed on the way: the favicon template reference was never rewritten by the build (so every tool page had a 404 tab icon), and the landing page restarted a group heading whenever a newly appended tool belonged to a group already rendered. Grouping now follows `GROUP_ORDER`, and every page points at the same `assets/icon.svg`.

## Features

- Twelve tools in one static site, no backend and no ports
- One build script generates every page from its template
- Text diff: line alignment, in-line character highlighting, foldable unchanged runs, copyable patch
- QR: UTF-8 Chinese, L/M/Q/H correction, adjustable size, PNG download, fixed quiet zone
- Encoders: Base64 (URL-safe), URL, HTML, unicode escapes, JWT with expiry in local time
- Hashing: MD5/SHA-1/SHA-256/SHA-512 with checksum paste-and-compare
- Shared theme with twelve variables, three-state light/dark/system toggle, one site icon
- Single column on narrow screens, no horizontal overflow at 390px

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
