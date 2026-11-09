/* curl2code.js —— 把一条 curl 命令拆开，生成四种语言的等价请求代码
   纯函数，浏览器与 node 都能跑（node 里 require 出来可直接测） */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.Curl2Code = factory();
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  var VALUE_LONG = {
    '--request': 'method', '--header': 'header', '--data': 'data', '--data-raw': 'data',
    '--data-binary': 'data', '--data-ascii': 'data', '--data-urlencode': 'data',
    '--json': 'json', '--form': 'form', '--form-string': 'form',
    '--user': 'user', '--cookie': 'cookie', '--user-agent': 'ua', '--referer': 'referer',
    '--url': 'url', '--output': 'skip', '--max-time': 'skip', '--connect-timeout': 'skip',
    '--retry': 'skip', '--proxy': 'skip', '--cert': 'skip', '--key': 'skip',
    '--resolve': 'skip', '--upload-file': 'skip', '--range': 'skip', '--write-out': 'skip',
    '--interface': 'skip', '--limit-rate': 'skip', '--cacert': 'skip', '--cipher': 'skip'
  };
  var FLAG_LONG = {
    '--location': 'follow', '--compressed': 'compressed', '--insecure': 'insecure',
    '--silent': 'silent', '--show-error': 'silent', '--include': 'include',
    '--head': 'head', '--verbose': 'verbose', '--fail': 'fail', '--globoff': 'skip',
    '--no-buffer': 'skip', '--http1.1': 'skip', '--http2': 'skip', '--tlsv1.2': 'skip'
  };
  // 短选项里需要跟一个值的：-X -H -d -F -u -b -A -e -o -E -m -T -w -x -r -U
  var SHORT_VALUE = 'XHdFubAeoEmTwxrU';
  var SHORT_FLAG = {
    'L': 'follow', 'k': 'insecure', 's': 'silent', 'S': 'silent', 'i': 'include',
    'I': 'head', 'v': 'verbose', 'f': 'fail', 'g': 'skip', 'N': 'skip', '#': 'skip'
  };

  function tokenize(cmd) {
    var s = String(cmd || '')
      .replace(/\r\n?/g, '\n')
      .replace(/\\\n/g, ' ')     // bash 续行
      .replace(/\^\n/g, ' ')     // cmd 续行
      .replace(/`\n/g, ' ')      // powershell 续行
      .replace(/\n/g, ' ')
      .trim()
      .replace(/^\$\s*/, '')
      .replace(/^(sudo\s+)?/, '');
    var out = [], cur = '', q = null, i = 0, c, n;
    while (i < s.length) {
      c = s[i];
      if (q) {
        if (c === q) { q = null; i++; continue; }
        if (c === '\\' && q === '"' && i + 1 < s.length) {
          n = s[i + 1];
          if (n === '"' || n === '\\' || n === '$' || n === '`') { cur += n; i += 2; continue; }
        }
        cur += c; i++; continue;
      }
      if (c === '"' || c === "'") { q = c; i++; continue; }
      if (c === ' ' || c === '\t') { if (cur !== '') { out.push(cur); cur = ''; } i++; continue; }
      cur += c; i++;
    }
    if (cur !== '') out.push(cur);
    return out;
  }

  // 去掉引号外的反斜杠转义（"a\\\"b" 已被 tokenize 处理，这里只管裸词）
  function unescapeBare(s) {
    return s.replace(/\\(.)/g, '$1');
  }

  function parse(cmd) {
    var t = tokenize(cmd);
    var r = {
      url: '', method: '', headers: [], data: [], form: [], user: '', cookie: '',
      ua: '', referer: '', flags: {}, warnings: [], raw: String(cmd || '')
    };
    if (!t.length) { r.warnings.push('命令是空的'); return r; }
    var i = 0;
    if (/curl(\.exe)?$/i.test(t[0])) i = 1;
    var unknown = [];

    function take() { i++; return t[i] !== undefined ? t[i] : ''; }

    for (; i < t.length; i++) {
      var tok = t[i];
      if (tok === '') continue;
      if (tok.slice(0, 2) === '--') {
        var eq = tok.indexOf('=');
        var key = eq > -1 ? tok.slice(0, eq) : tok;
        var inline = eq > -1 ? tok.slice(eq + 1) : null;
        var role = VALUE_LONG[key];
        if (role) {
          var val = inline !== null ? inline : take();
          if (role === 'method') r.method = val.toUpperCase();
          else if (role === 'header') r.headers.push(splitHeader(val));
          else if (role === 'data') { r.data.push(val); }
          else if (role === 'json') { r.data.push(val); r.jsonFlag = true; }
          else if (role === 'form') r.form.push(splitHeader(val, '='));
          else if (role === 'user') r.user = val;
          else if (role === 'cookie') r.cookie = val;
          else if (role === 'ua') r.ua = val;
          else if (role === 'referer') r.referer = val;
          else if (role === 'url') r.url = val;
          continue;
        }
        if (FLAG_LONG[key]) { r.flags[FLAG_LONG[key]] = true; continue; }
        unknown.push(key);
        continue;
      }
      if (tok[0] === '-') {
        var rest = tok.slice(1), used = false;
        for (var k = 0; k < rest.length; k++) {
          var ch = rest[k];
          if (SHORT_VALUE.indexOf(ch) > -1) {
            var tail = rest.slice(k + 1).replace(/^=/, '');
            var v = tail !== '' ? tail : take();
            if (ch === 'X') r.method = v.toUpperCase();
            else if (ch === 'H') r.headers.push(splitHeader(v));
            else if (ch === 'd') r.data.push(v);
            else if (ch === 'F') r.form.push(splitHeader(v, '='));
            else if (ch === 'u') r.user = v;
            else if (ch === 'b') r.cookie = v;
            else if (ch === 'A') r.ua = v;
            else if (ch === 'e') r.referer = v;
            used = true;
            break;
          }
          if (SHORT_FLAG[ch]) { r.flags[SHORT_FLAG[ch]] = true; continue; }
          unknown.push('-' + ch);
        }
        if (used) continue;
        continue;
      }
      if (!r.url) r.url = tok;
    }

    r.url = unescapeBare(r.url);
    if (!r.url) r.warnings.push('没找到网址，检查命令里是不是带了 http(s)://');
    if (!/^https?:\/\//i.test(r.url) && r.url) r.warnings.push('网址不是 http(s) 开头，生成的代码可能跑不通');
    if (unknown.length) r.warnings.push('这些参数没被处理：' + unique(unknown).join(' '));
    if (r.form.length) r.warnings.push('这是 -F 表单上传，生成的代码把字段拼成普通表单，文件要自己换成 multipart 写法');
    if (r.flags.insecure) r.warnings.push('-k 表示不校验证书，生成的代码里没有这一项（默认应当校验）');
    if (r.user) r.headers.push(['Authorization', 'Basic <base64(用户名:密码)>']);

    // 合成 body
    var body = r.data.length ? r.data.join('&') : '';
    if (r.form.length) {
      body = r.form.map(function (p) { return encodePair(p); }).join('&');
      r.bodyKind = 'form';
    } else if (!body) {
      r.bodyKind = '';
    } else if (r.jsonFlag || looksJson(body)) {
      r.bodyKind = 'json';
    } else if (/^[^=&\s]+=[^&]*(&[^=&\s]+=[^&]*)*$/.test(body)) {
      r.bodyKind = 'form';
    } else {
      r.bodyKind = 'raw';
    }
    r.body = body;

    if (r.ua) r.headers.push(['User-Agent', r.ua]);
    if (r.referer) r.headers.push(['Referer', r.referer]);
    if (r.cookie) r.headers.push(['Cookie', r.cookie]);
    if (r.bodyKind === 'json' && !hasHeader(r.headers, 'content-type')) {
      r.headers.push(['Content-Type', 'application/json']);
    }
    if (r.bodyKind === 'form' && !hasHeader(r.headers, 'content-type')) {
      r.headers.push(['Content-Type', 'application/x-www-form-urlencoded']);
    }

    r.method = r.method || (body ? 'POST' : 'GET');
    r.headers = dedupeHeaders(r.headers);
    return r;
  }

  function unique(a) { return a.filter(function (x, i) { return a.indexOf(x) === i; }); }

  function splitHeader(s, sep) {
    s = String(s);
    var i = s.indexOf(sep || ':');
    if (i < 0) return [s.trim(), ''];
    var k = s.slice(0, i).trim();
    var v = s.slice(i + 1).trim();
    if ((sep || ':') === '=' && v === '' && s.indexOf('=') > -1) v = '';
    return [k, v];
  }

  function hasHeader(list, name) {
    return list.some(function (h) { return h[0].toLowerCase() === name; });
  }

  function dedupeHeaders(list) {
    var seen = {}, out = [];
    list.forEach(function (h) {
      var k = h[0].toLowerCase();
      if (seen[k] === undefined) { seen[k] = out.length; out.push(h); }
      else { out[seen[k]] = h; }
    });
    return out;
  }

  function looksJson(s) {
    var t = s.trim();
    if (!/^[\[{]/.test(t)) return false;
    try { JSON.parse(t); return true; } catch (e) { return false; }
  }

  function encodePair(p) {
    return encodeURIComponent(p[0]) + '=' + encodeURIComponent(p[1]);
  }

  function pad(s) { return s; }

  // ---------- 各语言字面量 ----------
  function jsStr(s) { return JSON.stringify(String(s)); }
  function pyStr(s) { return JSON.stringify(String(s)); }

  function goRaw(s) {
    if (s.indexOf('`') === -1) return '`' + s + '`';
    return '"' + s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"';
  }

  function psStr(s) { return "'" + String(s).replace(/'/g, "''") + "'"; }

  function psKey(k) { return "'" + String(k).replace(/'/g, "''") + "'"; }

  function bodyJson(r) {
    try { return JSON.parse(r.body); } catch (e) { return null; }
  }

  function formPairs(r) {
    return r.body.split('&').filter(Boolean).map(function (kv) {
      var i = kv.indexOf('=');
      var k = i < 0 ? kv : kv.slice(0, i);
      var v = i < 0 ? '' : kv.slice(i + 1);
      return [safeDecode(k), safeDecode(v)];
    });
  }

  function safeDecode(s) {
    try { return decodeURIComponent(String(s).replace(/\+/g, ' ')); } catch (e) { return s; }
  }

  // ---------- 生成 ----------
  function toFetch(r) {
    var L = [];
    var opts = [];
    if (r.method !== 'GET' || r.body) opts.push('method: ' + jsStr(r.method));
    if (r.headers.length) {
      opts.push('headers: {\n' + r.headers.map(function (h) {
        return '    ' + jsStr(h[0]) + ': ' + jsStr(h[1]);
      }).join(',\n') + '\n  }');
    }
    if (r.body) {
      if (r.bodyKind === 'json') {
        var j = bodyJson(r);
        var printed = j === null ? null : JSON.stringify(j, null, 2);
        if (printed === null) {
          opts.push('body: ' + jsStr(r.body));
        } else {
          opts.push('body: JSON.stringify(' + printed.replace(/\n/g, '\n  ') + ')');
        }
      } else if (r.bodyKind === 'form') {
        opts.push('body: new URLSearchParams({\n' + formPairs(r).map(function (p) {
          return '    ' + jsStr(p[0]) + ': ' + jsStr(p[1]);
        }).join(',\n') + '\n  })');
      } else {
        opts.push('body: ' + jsStr(r.body));
      }
    }
    L.push('const res = await fetch(' + jsStr(r.url) + (opts.length ? ', {\n  ' + opts.join(',\n  ') + '\n}' : '') + ');');
    L.push('');
    if (r.bodyKind === 'json') {
      L.push('const data = await res.json();');
      L.push('if (!res.ok) throw new Error(res.status + " " + res.statusText);');
      L.push('console.log(data);');
    } else {
      L.push('const text = await res.text();');
      L.push('console.log(res.status, text);');
    }
    return L.join('\n');
  }

  function toPython(r) {
    var L = ['import requests', ''];
    L.push('url = ' + pyStr(r.url));
    if (r.headers.length) {
      L.push('headers = {');
      r.headers.forEach(function (h) { L.push('    ' + pyStr(h[0]) + ': ' + pyStr(h[1]) + ','); });
      L.push('}');
    }
    var kw = [];
    if (r.headers.length) kw.push('headers=headers');
    if (r.body) {
      if (r.bodyKind === 'json') {
        var j = bodyJson(r);
        if (j !== null) {
          var lines = JSON.stringify(j, null, 4).split('\n');
          L.push('payload = ' + lines[0]);
          for (var i = 1; i < lines.length; i++) L.push(lines[i]);
          kw.push('json=payload');
        } else {
          L.push('payload = ' + pyStr(r.body));
          kw.push('data=payload');
        }
      } else if (r.bodyKind === 'form') {
        L.push('payload = {');
        formPairs(r).forEach(function (p) { L.push('    ' + pyStr(p[0]) + ': ' + pyStr(p[1]) + ','); });
        L.push('}');
        kw.push('data=payload');
      } else {
        L.push('payload = ' + pyStr(r.body));
        kw.push('data=payload');
      }
    }
    kw.push('timeout=30');
    L.push('');
    L.push('r = requests.' + r.method.toLowerCase() + '(url, ' + kw.join(', ') + ')');
    L.push('print(r.status_code)');
    L.push('print(r.text)');
    return L.join('\n');
  }

  function toGo(r) {
    var bodyExpr = 'nil';
    if (r.body) bodyExpr = 'strings.NewReader(' + goRaw(r.body) + ')';
    var imps = ['fmt', 'io', 'net/http'];
    if (r.body) imps.push('strings');
    imps.sort();
    var L = ['package main', '', 'import ('];
    imps.forEach(function (p) { L.push('\t"' + p + '"'); });
    L.push(')', '');
    L.push('func main() {');
    L.push('\treq, err := http.NewRequest(' + JSON.stringify(r.method) + ', ' + goRaw(r.url) + ', ' + bodyExpr + ')');
    L.push('\tif err != nil {', '\t\tpanic(err)', '\t}');
    r.headers.forEach(function (h) {
      L.push('\treq.Header.Set(' + JSON.stringify(h[0]) + ', ' + goRaw(h[1]) + ')');
    });
    L.push('');
    L.push('\tres, err := http.DefaultClient.Do(req)');
    L.push('\tif err != nil {', '\t\tpanic(err)', '\t}');
    L.push('\tdefer res.Body.Close()');
    L.push('');
    L.push('\tbody, _ := io.ReadAll(res.Body)');
    L.push('\tfmt.Println(res.Status)');
    L.push('\tfmt.Println(string(body))');
    L.push('}');
    return L.join('\n');
  }

  function toPowershell(r) {
    var L = [];
    if (r.headers.length) {
      L.push('$headers = @{');
      r.headers.forEach(function (h) { L.push('  ' + psKey(h[0]) + ' = ' + psStr(h[1])); });
      L.push('}');
    }
    if (r.body) {
      L.push('$body = @\'');
      L.push(r.body);
      L.push('\'@');
    }
    var args = ['-Uri ' + psStr(r.url), '-Method ' + r.method.charAt(0) + r.method.slice(1).toLowerCase()];
    if (r.headers.length) args.push('-Headers $headers');
    if (r.body) args.push('-Body $body');
    if (r.bodyKind === 'json') args.push('-ContentType ' + psStr('application/json; charset=utf-8'));
    L.push('');
    L.push('$r = Invoke-RestMethod ' + args.join(' '));
    L.push('$r | ConvertTo-Json -Depth 8');
    return L.join('\n');
  }

  function generate(r, lang) {
    if (lang === 'python') return toPython(r);
    if (lang === 'go') return toGo(r);
    if (lang === 'powershell') return toPowershell(r);
    return toFetch(r);
  }

  function convert(cmd, lang) {
    var r = parse(cmd);
    if (!r.url) return { code: '', warnings: r.warnings, meta: null };
    return {
      code: generate(r, lang || 'fetch'),
      warnings: r.warnings,
      meta: {
        method: r.method, url: r.url, headers: r.headers.length,
        body: r.body ? r.bodyKind : '', follow: !!r.flags.follow
      }
    };
  }

  return { tokenize: tokenize, parse: parse, generate: generate, convert: convert };
});
