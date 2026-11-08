/* JSON → 类型定义：把一段 JSON 推成 TypeScript / Go / Python 的结构。
   数组里的对象会按字段取并集，只在部分元素里出现的字段标成可选。 */
(function (root) {
  'use strict';

  var MAX_DEPTH = 12;

  function infer(v, depth) {
    depth = depth || 0;
    if (depth > MAX_DEPTH) return { k: 'prim', t: 'any' };
    if (v === null || v === undefined) return { k: 'prim', t: 'null' };
    var ty = typeof v;
    if (ty === 'string') return { k: 'prim', t: 'string' };
    if (ty === 'number') return { k: 'prim', t: (isFinite(v) && Math.floor(v) === v) ? 'int' : 'float' };
    if (ty === 'boolean') return { k: 'prim', t: 'bool' };
    if (Array.isArray(v)) {
      var of = null;
      for (var i = 0; i < v.length; i++) {
        var n = infer(v[i], depth + 1);
        of = of ? merge(of, n) : n;
      }
      return { k: 'array', of: of || { k: 'prim', t: 'any' } };
    }
    if (ty === 'object') {
      var fields = [];
      Object.keys(v).forEach(function (k) {
        fields.push({ name: k, type: infer(v[k], depth + 1), seen: 1, total: 1 });
      });
      return { k: 'object', fields: fields, total: 1 };
    }
    return { k: 'prim', t: 'any' };
  }

  function merge(a, b) {
    if (!a) return b;
    if (!b) return a;
    if (a.k === 'prim' && a.t === 'null') return b;
    if (b.k === 'prim' && b.t === 'null') return a;
    if (a.k === 'prim' && b.k === 'prim') {
      if (a.t === b.t) return a;
      if ((a.t === 'int' && b.t === 'float') || (a.t === 'float' && b.t === 'int')) return { k: 'prim', t: 'float' };
      return { k: 'prim', t: 'any' };
    }
    if (a.k === 'object' && b.k === 'object') {
      var map = {}, order = [];
      a.fields.forEach(function (f) { map[f.name] = { name: f.name, type: f.type, seen: f.seen || 1 }; order.push(f.name); });
      b.fields.forEach(function (f) {
        if (map[f.name]) { map[f.name].type = merge(map[f.name].type, f.type); map[f.name].seen += (f.seen || 1); }
        else { map[f.name] = { name: f.name, type: f.type, seen: f.seen || 1 }; order.push(f.name); }
      });
      var total = (a.total || 1) + (b.total || 1);
      return {
        k: 'object',
        total: total,
        fields: order.map(function (n) {
          var f = map[n];
          return { name: f.name, type: f.type, seen: f.seen, total: total };
        })
      };
    }
    if (a.k === 'array' && b.k === 'array') return { k: 'array', of: merge(a.of, b.of) };
    return { k: 'prim', t: 'any' };
  }

  function req(f) { return f.seen === undefined ? true : f.seen >= (f.total || 1) && f.seen === f.total; }

  // ---------- 名字 ----------
  function words(s) {
    return String(s).replace(/([a-z0-9])([A-Z])/g, '$1 $2').split(/[^A-Za-z0-9\u4e00-\u9fa5]+/).filter(Boolean);
  }
  function pascal(s) {
    var w = words(s);
    if (!w.length) return 'Field';
    return w.map(function (x) { return x.charAt(0).toUpperCase() + x.slice(1); }).join('');
  }
  function snake(s) {
    return words(s).map(function (x) { return x.toLowerCase(); }).join('_') || 'field';
  }
  var INIT = { id: 'ID', ids: 'IDs', url: 'URL', api: 'API', http: 'HTTP', https: 'HTTPS', json: 'JSON',
               ip: 'IP', sql: 'SQL', uuid: 'UUID', uid: 'UID', uri: 'URI', db: 'DB', cpu: 'CPU', mem: 'Mem', vip: 'VIP', os: 'OS', idcard: 'IDCard' };
  function goName(s) {
    var w = words(s);
    var n = w.map(function (x) {
      var low = x.toLowerCase();
      if (INIT[low]) return INIT[low];
      return x.charAt(0).toUpperCase() + x.slice(1);
    }).join('');
    if (!n) n = 'Field';
    if (/^[0-9]/.test(n)) n = 'F' + n;
    return n;
  }
  function safeTsName(s) { return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(s) ? s : JSON.stringify(s); }
  function safePyName(s) {
    var n = snake(s);
    if (/^[0-9]/.test(n)) n = 'f_' + n;
    return n;
  }

  // ---------- TypeScript ----------
  var TS_PRIM = { string: 'string', int: 'number', float: 'number', bool: 'boolean', null: 'null', any: 'unknown' };

  function tsType(node, ind) {
    var pad = new Array(ind + 1).join('  ');
    var pad2 = pad + '  ';
    if (node.k === 'prim') return TS_PRIM[node.t] || 'unknown';
    if (node.k === 'array') {
      var inner = tsType(node.of, ind);
      if (inner.indexOf('\n') > -1) return '(' + inner + ')[]';
      return inner + '[]';
    }
    if (!node.fields.length) return 'Record<string, unknown>';
    var lines = node.fields.map(function (f) {
      return pad2 + safeTsName(f.name) + (req(f) ? '' : '?') + ': ' + tsType(f.type, ind + 1) + ';';
    });
    return '{\n' + lines.join('\n') + '\n' + pad + '}';
  }

  function tsOut(node, name) {
    var n = pascal(name) || 'Root';
    if (node.k === 'object' && !node.fields.length) return 'export type ' + n + ' = Record<string, unknown>;';
    if (node.k === 'object') return 'export interface ' + n + ' ' + tsType(node, 0) + '\n';
    return 'export type ' + n + ' = ' + tsType(node, 0) + ';\n';
  }

  // ---------- Go ----------
  function goType(node, ind) {
    if (node.k === 'prim') {
      if (node.t === 'string') return 'string';
      if (node.t === 'int') return 'int64';
      if (node.t === 'float') return 'float64';
      if (node.t === 'bool') return 'bool';
      return 'interface{}';
    }
    if (node.k === 'array') return '[]' + goType(node.of, ind);
    if (!node.fields.length) return 'map[string]interface{}';
    return goStruct(node, ind);
  }

  function goStruct(node, ind) {
    var pad = new Array(ind + 1).join('\t');
    var pad2 = pad + '\t';
    var rows = node.fields.map(function (f) {
      return { name: goName(f.name), type: goType(f.type, ind + 1), tag: f.name + (req(f) ? '' : ',omitempty') };
    });
    var w = 0, tw = 0;
    rows.forEach(function (r) {
      if (r.name.length > w) w = r.name.length;
      if (r.type.indexOf(String.fromCharCode(10)) < 0 && r.type.length > tw) tw = r.type.length;
    });
    function sp(n) { return new Array(n + 1).join(' '); }
    var lines = rows.map(function (r) {
      var tn = r.type.indexOf(String.fromCharCode(10)) < 0 ? r.type + sp(tw - r.type.length) : r.type;
      return pad2 + r.name + sp(w - r.name.length + 1) + tn + ' `json:"' + r.tag + '"`';
    });
    return 'struct {\n' + lines.join('\n') + '\n' + pad + '}';
  }

  function goOut(node, name) {
    var n = pascal(name) || 'Root';
    if (node.k !== 'object') return 'type ' + n + ' = ' + goType(node, 0) + '\n';
    return 'type ' + n + ' ' + goStruct(node, 0) + '\n';
  }

  // ---------- Python ----------
  var PY_PRIM = { string: 'str', int: 'int', float: 'float', bool: 'bool', null: 'Any', any: 'Any' };

  function pyClasses(node, className, out, seenNames) {
    // 先把嵌套对象收集成独立类，再写当前类
    if (node.k !== 'object') return null;
    var fields = [];
    node.fields.forEach(function (f) {
      fields.push({ name: safePyName(f.name), type: pyType(f.type, className + pascal(f.name), out), req: req(f) });
    });
    var lines = ['@dataclass', 'class ' + className + ':'];
    if (!fields.length) lines.push('    pass');
    fields.forEach(function (f) {
      lines.push('    ' + f.name + ': ' + (f.req ? f.type : 'Optional[' + f.type + ']'));
    });
    // 插到最前面，保证子类先定义（有 from __future__ 其实无所谓，读起来顺）
    out.unshift(lines.join('\n'));
    return className;
  }

  function pyType(node, hint, out) {
    if (node.k === 'prim') return PY_PRIM[node.t] || 'Any';
    if (node.k === 'array') return 'List[' + pyType(node.of, hint + 'Item', out) + ']';
    if (!node.fields.length) return 'Dict[str, Any]';
    var cls = hint || 'Nested';
    pyClasses(node, cls, out, {});
    return cls;
  }

  function pyOut(node, name) {
    var n = pascal(name) || 'Root';
    var out = [];
    if (node.k === 'object') pyClasses(node, n, out, {});
    else out.push(n + ' = ' + pyType(node, n, out));
    var head = 'from __future__ import annotations\n\nfrom dataclasses import dataclass\nfrom typing import Any, Dict, List, Optional\n';
    return head + '\n' + out.join('\n\n') + '\n';
  }

  // ---------- 统计 ----------
  function stats(node) {
    var fields = 0, depth = 0, types = 0;
    (function walk(n, d) {
      if (d > depth) depth = d;
      types++;
      if (n.k === 'object') {
        fields += n.fields.length;
        n.fields.forEach(function (f) { walk(f.type, d + 2); });
      } else if (n.k === 'array') walk(n.of, d + 1);
    })(node, 1);
    return { fields: fields, depth: Math.ceil(depth / 2), types: types };
  }

  function build(json, opt) {
    opt = opt || {};
    var node = infer(json);
    return {
      node: node,
      ts: tsOut(node, opt.name || 'Root'),
      go: goOut(node, opt.name || 'Root'),
      py: pyOut(node, opt.name || 'Root'),
      stats: stats(node)
    };
  }

  var api = { build: build, infer: infer, stats: stats };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.TypeGen = api;
})(typeof window !== 'undefined' ? window : globalThis);
