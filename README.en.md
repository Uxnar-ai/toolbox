# toolbox — twenty-seven small tools that open and work

> Twenty-seven tiny tools in one static site: JSON formatter, text tidier, timestamp converter, regex lab, text diff, encoders, hash checker, cron explainer, date calculator, naming-convention converter, random generator, RMB uppercase, unit converter, percentage calculator, colour toolbox, QR codes, image compressor, image-to-WebP batch converter, base converter with bit ops, image-to-Data-URI, CSV-to-table, CJK/Latin spacing, word count, URL dissector, subnet calculator, mojibake repair and a Markdown preview. No backend, no ports.

English | [中文](README.md)

## What it is

Every tool computes in the browser; no server is involved. `scripts/build_toolbox.py` reads each tool template, rewrites asset paths, injects a shared back-to-index chip and assembles a grouped landing page; theme.css and base.js are deduplicated. The output is a plain static directory any static server can host.

This round grew the toolbox from eight tools to twelve, all of them things you actually reach for:

- **Text diff**: paste before and after. Lines are aligned with a longest-common-subsequence pass, then paired removed/added lines get a character-level comparison so only the characters that really changed are marked; long unchanged runs collapse into a single notice and the diff copies out in `+`/`-` form.
- **QR generator**: bundled encoder (MIT). Chinese goes in as UTF-8 rather than whatever the browser would guess, error correction L/M/Q/H, a fixed four-module quiet zone, and the downloaded PNG is scaled by whole modules so scanners like it.
- **Encoders**: Base64 (including URL-safe -_), URL escaping, HTML escaping, unicode escapes, JWT inspection. The JWT view converts issued/expiry timestamps to local time and says how long is left — while stating on the page that signatures are not verified.
- **Hash checker**: drop a file for MD5 / SHA-1 / SHA-256 / SHA-512. The SHA family uses the browser's crypto.subtle; MD5 is implemented in the page (checked against four vectors: empty string, abc, 1000 a's, a Chinese string). Paste the published checksum and it infers the algorithm from its length and says whether it matches.

Two long-standing bugs got fixed on the way: the favicon template reference was never rewritten by the build (so every tool page had a 404 tab icon), and the landing page restarted a group heading whenever a newly appended tool belonged to a group already rendered. Grouping now follows `GROUP_ORDER`, and every page points at the same `assets/icon.svg`.

Third round (twelve to fifteen), all of it the everyday stuff you hit while writing server code:

- **Cron explainer**: paste a crontab line, get a plain-Chinese description plus the next ten exact run times. Supports `*`, ranges, steps, lists and combos, English month/weekday names, `7` for Sunday, and the `@daily` style aliases. Finding the next run does not brute-force minutes: it matches whole days first, then scans that day's hours and minutes, so leap years and month ends stay instant. When both day-of-month and day-of-week are restricted it follows cron's old rule — either one matching is enough.
- **Naming converter**: one field name per line, eight casings at once (camel, Pascal, snake, CONSTANT, kebab, dot, spaced, title). Tokenising understands separators, camel boundaries and acronym runs, so `HTTPServer` becomes http + server rather than h-t-t-p. Batch friendly, one-click copy per style.
- **Date calculator**: days and working days between two dates, plus the calendar reading; or step forward N days / working days / months from any date. Month arithmetic clamps the day-of-month (Jan 31 + 1 month = Feb 28), and everything runs in UTC so daylight-saving transitions can't shift the answer by a day.

- **Random generator**: passwords, UUID v4, hex and plain digits, a batch at a time. Values come from the browser's CSPRNG through rejection sampling rather than a plain modulo (which would favour the leading characters), and passwords can exclude the look-alikes `0 O o 1 l I`. A meter estimates `length × log2(pool)` and says whether that is enough.

Fourth round (sixteen to twenty), all about text going in and coming out:

- **CSV to table**: comma, tab, semicolon and pipe are detected by counting occurrences per line; quoted commas, newlines and doubled quotes follow RFC 4180. You get a readable table first (sticky header, zebra rows, numeric columns right-aligned, click a header to sort), then the same data exported as Markdown / JSON / SQL INSERT / HTML / TSV. Copying from the table view yields TSV, which pastes straight into Excel or Feishu Sheets as columns.
- **CJK/Latin spacing**: inserts a single space where Chinese meets Latin or digits, removes stray spaces between Chinese characters, and optionally converts full-width letters and digits. Insertions are marked with a placeholder first and normalised afterwards, so one rule cannot eat another rule's work; a toggle highlights every CJK/Latin space in the result.
- **Word count**: Chinese characters, English words, digit runs, characters with and without spaces, lines, paragraphs, punctuation, longest sentence, plus a reading time folded from 300 chars/min and 200 words/min. A side panel lists the limits of Weibo, Xiaohongshu, WeChat digest, SMS and X, turning red when exceeded; frequent characters are counted with Chinese function words filtered out.
- **URL dissector**: protocol, host, port, path and fragment laid out separately, with query parameters as an editable table — edit a value or delete a row and the clean link below rebuilds live. One click strips utm_*, spm, gclid, from and scene; the parameter table copies out as JSON with repeated keys merged into arrays. A link without a scheme is treated as https.

The landing page also gained instant search: with twenty tools, scrolling to find one is slow — type 「表格」 or 「颜色」 and only matching cards stay, empty group headings disappear with them, `/` focuses the box and Esc clears it.

Fifth round (twenty to twenty-four), a set about converting and repairing:

- **Subnet calculator**: give it an address with `/26` or a dotted mask and it lists network, broadcast, usable range, usable host count, mask, wildcard mask and the address class (private / loopback / link-local / documentation). Dotted masks are validated for contiguity — `255.0.255.0` is rejected instead of producing a plausible lie — and `/31` counts both addresses as usable while `/32` counts one, matching what devices actually do. Below that you can split the block into N subnets and see each range, or test whether another address belongs to it, including whether that address is the network or broadcast one.
- **Percentage**: four live panels side by side — discount (price plus discount rate gives what you pay and what you save), change (old to new gives percent and multiple), share (part over whole gives percent and how far from 100%), and increase (base plus percent, negative to subtract). A zero denominator explains itself instead of printing Infinity.
- **Mojibake repair**: paste garbage and it tries UTF-8 read as Latin-1, GBK read as Latin-1, Big5 read as Latin-1 and GBK read as UTF-8, ranks the results by how much readable CJK they contain, highlights the best guess and copies it on click; URL encoding, HTML entities and backslash-u escapes are decoded too. It is honest about the hopeless case: strings containing replacement characters lost their original bytes during the bad conversion, and the page says so rather than pretending.
- **Markdown preview**: write on the left, see the page on the right — headings, bold/italic/strikethrough, inline code, fenced code (escaped as text, never rendered as tags), ordered and unordered lists with one level of nesting, quotes, tables (leading and trailing pipes optional), rules, links and images. Then copy the HTML, copy the text, or download a standalone page with inline styles.

Sixth round (twenty-four to twenty-seven):

- **Image to WebP**: drop JPG / PNG / BMP / AVIF / SVG (with explicit width and height) and every one is encoded in the browser through canvas — quality 50–100, optional maximum edge, automatic re-encode when you change either. Transparency is preserved instead of flattened to white, EXIF orientation is honoured via `imageOrientation: 'from-image'`, and the queue converts one file at a time so a 20 MP photo cannot blow up memory. Two sample images (a photo and a transparent circle) are drawn at load time so the size difference is visible immediately.
- **Base converter**: one field understands `0x` / `0b` / `0o` / `#` prefixes and stores values as BigInt, so digit count is unbounded. Decimal gets thousands separators, binary is grouped in fours, and every row copies. A bit strip highlights the ones, and a row of bitwise operations (and, or, xor, shifts, unsigned 32-bit not) reports the result in decimal, hex and binary, appending the character when the code point lands somewhere printable.
- **Image to Data URI**: small images become a string you can paste into HTML or CSS — four formats (full URI, bare base64, CSS background, img tag) with a copy button, the inflation factor spelled out and a warning past 30 KB. Going the other way, paste a data URI or bare base64 and it rebuilds the image for download, guessing JPEG / GIF / WebP / PNG from magic bytes when the prefix is missing.

## Features

- Twenty tools in one static site, no backend and no ports
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
- Instant search on the landing page across all twenty tools
- Subnet calculator: network/broadcast/host range/mask conversion, subnet splitting, membership test
- Percentage: discount, change, share and increase in four live panels
- Mojibake repair: ranks the plausible UTF-8/GBK/Big5 reinterpretations, plus URL and escape decoding
- Markdown preview: live rendering of headings, lists, tables and code, export to HTML

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
