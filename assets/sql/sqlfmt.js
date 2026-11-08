/* SQL 排版：把一段 SQL 重新断行缩进，或压成一行。
   只动空白，不动语义；字符串、注释、标识符里的内容原样保留。 */
(function (root) {
  'use strict';

  var KW = {};
  ('SELECT DISTINCT ALL FROM WHERE GROUP BY ORDER HAVING LIMIT OFFSET FETCH FIRST NEXT ROWS ROW ONLY ' +
   'UNION EXCEPT INTERSECT INSERT INTO VALUES UPDATE SET DELETE RETURNING WITH AS ON USING JOIN LEFT RIGHT ' +
   'FULL OUTER INNER CROSS NATURAL AND OR NOT NULL IS IN BETWEEN LIKE ILIKE EXISTS CASE WHEN THEN ELSE END ' +
   'ASC DESC CREATE TABLE VIEW INDEX ALTER DROP TRUNCATE PRIMARY KEY FOREIGN REFERENCES UNIQUE DEFAULT CHECK ' +
   'CONSTRAINT ADD COLUMN RENAME TO IF CAST OVER PARTITION WINDOW LATERAL APPLY ' +
   'INT INTEGER BIGINT SMALLINT TINYINT DECIMAL NUMERIC FLOAT DOUBLE REAL VARCHAR CHAR TEXT DATE TIME ' +
   'DATETIME TIMESTAMP BOOLEAN BOOL JSON JSONB UUID BLOB SERIAL BIGSERIAL ' +
   'COUNT SUM AVG MIN MAX COALESCE NULLIF GREATEST LEAST NOW CONCAT SUBSTRING TRIM UPPER LOWER ROUND ABS ' +
   'INTERVAL EXTRACT TRUE FALSE UNKNOWN BEGIN COMMIT ROLLBACK TRANSACTION GRANT REVOKE EXPLAIN ANALYZE ' +
   'DESCRIBE SHOW USE DATABASE SCHEMA SEQUENCE FUNCTION PROCEDURE TRIGGER CASCADE RESTRICT REPLACE ' +
   'OFFSET ROWS RANGE GROUPS PRECEDING FOLLOWING UNBOUNDED CURRENT').split(/\s+/).forEach(function (k) {
    if (k) KW[k] = true;
  });

  // 两三个词合一个关键字
  var PAIRS = {
    'GROUP|BY': 'GROUP BY', 'ORDER|BY': 'ORDER BY', 'PARTITION|BY': 'PARTITION BY',
    'LEFT|JOIN': 'LEFT JOIN', 'RIGHT|JOIN': 'RIGHT JOIN', 'FULL|JOIN': 'FULL JOIN',
    'INNER|JOIN': 'INNER JOIN', 'CROSS|JOIN': 'CROSS JOIN', 'OUTER|JOIN': 'OUTER JOIN',
    'LEFT|OUTER': 'LEFT OUTER', 'RIGHT|OUTER': 'RIGHT OUTER', 'FULL|OUTER': 'FULL OUTER',
    'UNION|ALL': 'UNION ALL', 'UNION|DISTINCT': 'UNION DISTINCT',
    'INSERT|INTO': 'INSERT INTO', 'DELETE|FROM': 'DELETE FROM',
    'IS|NOT': 'IS NOT', 'NOT|IN': 'NOT IN', 'NOT|LIKE': 'NOT LIKE', 'NOT|EXISTS': 'NOT EXISTS',
    'NOT|BETWEEN': 'NOT BETWEEN',
    'PRIMARY|KEY': 'PRIMARY KEY', 'FOREIGN|KEY': 'FOREIGN KEY',
    'CREATE|TABLE': 'CREATE TABLE', 'CREATE|INDEX': 'CREATE INDEX', 'CREATE|VIEW': 'CREATE VIEW',
    'ALTER|TABLE': 'ALTER TABLE', 'DROP|TABLE': 'DROP TABLE',
    'SELECT|DISTINCT': 'SELECT DISTINCT'
  };

  // 后面紧跟括号、不留空格的（函数名与类型名）
  var FUNC = {};
  ('COUNT SUM AVG MIN MAX COALESCE NULLIF GREATEST LEAST NOW CONCAT SUBSTRING TRIM UPPER LOWER ROUND ABS ' +
   'CAST INTERVAL EXTRACT VARCHAR CHAR DECIMAL NUMERIC FLOAT DOUBLE REAL INT INTEGER BIGINT SMALLINT TINYINT ' +
   'DATE TIME DATETIME TIMESTAMP BOOLEAN JSON JSONB ROW ROWS').split(/\s+/).forEach(function (k) { FUNC[k] = true; });

  var OPS3 = ['->>', '<=>'];
  var OPS2 = ['<=', '>=', '<>', '!=', '||', '::', '->', ':=', '=>', '&&'];

  function tokenize(s) {
    var out = [], i = 0, n = s.length, c, j, v, ws = false;
    function emit(o) { o.sp = ws; out.push(o); ws = false; }
    while (i < n) {
      c = s.charAt(i);
      if (/\s/.test(c)) { ws = true; i++; continue; }

      if ((c === '-' && s.charAt(i + 1) === '-') || c === '#') {
        j = s.indexOf('\n', i); if (j < 0) j = n;
        emit({ t: 'cmt', v: s.slice(i, j) }); i = j; continue;
      }
      if (c === '/' && s.charAt(i + 1) === '*') {
        j = s.indexOf('*/', i + 2); j = j < 0 ? n : j + 2;
        emit({ t: 'cmt', v: s.slice(i, j) }); i = j; continue;
      }
      if (c === "'" || c === '"' || c === '`') {
        j = i + 1;
        while (j < n) {
          if (s.charAt(j) === c) {
            if (s.charAt(j + 1) === c) { j += 2; continue; }
            j++; break;
          }
          j++;
        }
        emit({ t: 'str', v: s.slice(i, j) }); i = j; continue;
      }
      if (/[0-9]/.test(c) || (c === '.' && /[0-9]/.test(s.charAt(i + 1)))) {
        j = i;
        if (c === '0' && /[xX]/.test(s.charAt(i + 1))) {
          j = i + 2; while (j < n && /[0-9a-fA-F]/.test(s.charAt(j))) j++;
        } else {
          while (j < n && /[0-9]/.test(s.charAt(j))) j++;
          if (s.charAt(j) === '.') { j++; while (j < n && /[0-9]/.test(s.charAt(j))) j++; }
          if (/[eE]/.test(s.charAt(j)) && /[0-9+-]/.test(s.charAt(j + 1))) {
            j += 2; while (j < n && /[0-9]/.test(s.charAt(j))) j++;
          }
        }
        emit({ t: 'num', v: s.slice(i, j) }); i = j; continue;
      }
      if (/[A-Za-z_$\u00c0-\uffff]/.test(c)) {
        j = i;
        while (j < n && /[A-Za-z0-9_$\u00c0-\uffff]/.test(s.charAt(j))) j++;
        v = s.slice(i, j);
        emit({ t: KW[v.toUpperCase()] ? 'kw' : 'id', v: v }); i = j; continue;
      }
      if (c === '?' || c === '@' || c === ':' || c === '$') {
        if (c === ':' && s.charAt(i + 1) === ':') { emit({ t: 'op', v: '::' }); i += 2; continue; }
        j = i + 1;
        while (j < n && /[A-Za-z0-9_$]/.test(s.charAt(j))) j++;
        emit({ t: 'id', v: s.slice(i, j) }); i = j; continue;
      }
      var op = null;
      for (var a = 0; a < OPS3.length; a++) if (!op && s.substr(i, 3) === OPS3[a]) op = OPS3[a];
      if (!op) for (var b = 0; b < OPS2.length; b++) if (!op && s.substr(i, 2) === OPS2[b]) op = OPS2[b];
      if (!op) op = c;
      emit({ t: 'op', v: op }); i += op.length;
    }
    return out;
  }

  function merge(toks) {
    var out = [], i = 0, a, b, c, key, hit;
    while (i < toks.length) {
      a = toks[i]; b = toks[i + 1];
      if (a.t === 'kw' && b && b.t === 'kw') {
        key = a.v.toUpperCase() + '|' + b.v.toUpperCase();
        hit = PAIRS[key];
        if (hit) {
          c = toks[i + 2];
          if (c && c.t === 'kw' && / OUTER$/.test(hit)) {
            if (c.v.toUpperCase() === 'JOIN') { out.push({ t: 'kw', v: hit + ' JOIN' }); i += 3; continue; }
            if (c.v.toUpperCase() === 'APPLY') { out.push({ t: 'kw', v: hit + ' APPLY' }); i += 3; continue; }
          }
          out.push({ t: 'kw', v: hit }); i += 2; continue;
        }
      }
      out.push(a); i++;
    }
    return out;
  }

  var NL_SOLO = { WHERE: 1, HAVING: 1, LIMIT: 1, OFFSET: 1, FETCH: 1, VALUES: 1, SET: 1, RETURNING: 1,
                  UNION: 1, 'UNION ALL': 1, 'UNION DISTINCT': 1, EXCEPT: 1, INTERSECT: 1,
                  SELECT: 1, 'SELECT DISTINCT': 1, FROM: 1, 'GROUP BY': 1, 'ORDER BY': 1,
                  INSERT: 1, 'INSERT INTO': 1, UPDATE: 1, DELETE: 1, 'DELETE FROM': 1, WITH: 1,
                  CREATE: 1, 'CREATE TABLE': 1, 'CREATE INDEX': 1, 'CREATE VIEW': 1,
                  ALTER: 1, 'ALTER TABLE': 1, DROP: 1, 'DROP TABLE': 1, TRUNCATE: 1,
                  EXPLAIN: 1, GRANT: 1, REVOKE: 1 };
  // 这些子句后面的内容另起一行并缩进一级
  var LIST_BODY = { SELECT: 1, 'SELECT DISTINCT': 1, 'GROUP BY': 1, 'ORDER BY': 1, SET: 1, VALUES: 1, RETURNING: 1 };

  function fmt(sql, opt) {
    opt = opt || {};
    var up = opt.upper !== false;
    var tab = opt.indent === 0 ? 0 : (opt.indent || 2);
    var toks = merge(tokenize(sql));

    var lines = [], line = '', want = 0, level = 0, paren = 0;
    var listMode = false, prevSig = null, prevNoSpace = false, createTable = false, colList = false, inBetween = false, listInd = 0;

    function finish() {
      if (line !== '') { lines.push(pad(want) + line); line = ''; }
    }
    function brk(cols) { finish(); want = cols < 0 ? 0 : cols; }
    function add(text, noBefore, noAfter) {
      if (line === '') line = text;
      else if (noBefore || prevNoSpace) line += text;
      else line += ' ' + text;
      prevNoSpace = !!noAfter;
    }
    function pad(k) { return k > 0 ? new Array(k + 1).join(' ') : ''; }

    var stack = [];   // ')' 配对用：block | plain

    for (var i = 0; i < toks.length; i++) {
      var tk = toks[i], t = tk.t, v = tk.v, U = v.toUpperCase();

      if (t === 'cmt') {
        finish();
        lines.push(pad(level) + v);
        want = level;
        prevSig = 'cmt';
        continue;
      }

      if (t === 'kw' && /JOIN$/.test(U) || (t === 'kw' && (U === 'ON' || U === 'USING'))) {
        if (U === 'ON' || U === 'USING') { brk(level + tab); add(U); }
        else { brk(level); add(U); }
        listMode = false; prevSig = U; continue;
      }

      if (t === 'kw' && NL_SOLO[U]) {
        brk(level);
        add(up ? U : v);
        if (LIST_BODY[U]) { listMode = true; listInd = level + tab; brk(listInd); }
        else { listMode = false; want = level; }
        if (U === 'CREATE TABLE') createTable = true;
        prevSig = U;
        continue;
      }

      if (t === 'kw' && (U === 'AND' || U === 'OR')) {
        if (U === 'AND' && inBetween) { add(U); inBetween = false; prevSig = U; continue; }
        if (paren === 0) brk(level + tab);
        add(U);
        prevSig = U; continue;
      }

      if (t === 'op' && v === ',') {
        add(',', true);
        if (paren === 0 && listMode) brk(listInd || (level + tab));
        prevSig = ','; continue;
      }

      if (t === 'op' && v === '(') {
        var prev = toks[i - 1];
        var tightBefore = tk.sp === false && !!prev && (prev.t === 'id' ||
          (prev.t === 'kw' && FUNC[prev.v.toUpperCase()]) || (prev.t === 'op' && prev.v === ')'));
        var block = false, d = 0;
        for (var k = i + 1; k < toks.length; k++) {
          var q = toks[k];
          if (q.t === 'op' && q.v === '(') d++;
          else if (q.t === 'op' && q.v === ')') { if (d === 0) break; d--; }
          else if (q.t === 'kw' && d === 0 && /^SELECT/.test(q.v.toUpperCase())) { block = true; break; }
        }
        add('(', tightBefore, true);
        if (block) { level += tab; listMode = true; brk(level); stack.push('block'); }
        else if (createTable && !colList && paren === 0) { level += tab; listMode = true; colList = true; listInd = level; brk(level); stack.push('block'); }
        else { paren++; stack.push('plain'); }
        prevSig = '('; prevNoSpace = true; continue;
      }

      if (t === 'op' && v === ')') {
        var kind = stack.pop();
        if (kind === 'block') {
          level -= tab; listMode = false;
          if (colList && createTable) colList = false;
          brk(level);
          add(')', true);
          // 子查询结束后通常接别名，保持同一行
        } else {
          paren--;
          add(')', true);
        }
        prevSig = ')'; continue;
      }

      if (t === 'op' && v === ';') { add(';', true); finish(); want = 0; level = 0; paren = 0; listMode = false; prevSig = ';'; continue; }
      if (t === 'op' && v === '.') { add('.', true, true); prevSig = '.'; continue; }
      if (t === 'op' && v === '::') { add('::', true, true); prevSig = '::'; continue; }

      if (t === 'kw') { add(up ? U : v); if (U === 'BETWEEN' || U === 'NOT BETWEEN') inBetween = true; prevSig = U; continue; }

      add(v);
      prevSig = t === 'id' ? v : v;
    }
    finish();
    return lines.join('\n');
  }

  function minify(sql) {
    var toks = merge(tokenize(sql)), out = '', i, tk, v, noBefore;
    for (i = 0; i < toks.length; i++) {
      tk = toks[i];
      if (tk.t === 'cmt') continue;
      v = tk.v;
      var pv = toks[i - 1];
      noBefore = tk.t === 'op' && /^[,;.)\[\]]$/.test(v);
      // 函数名 / 类型名后面紧跟括号不留空格
      if (v === '(' && pv && (pv.t === 'id' || (pv.t === 'kw' && FUNC[pv.v.toUpperCase()]) || (pv.t === 'op' && pv.v === ')'))) noBefore = true;
      if (!out) out = v;
      else if (noBefore || /[(.[]$/.test(out)) out += v;
      else out += ' ' + v;
    }
    return out;
  }

  var api = { fmt: fmt, minify: minify, tokenize: tokenize };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.SqlFmt = api;
})(typeof window !== 'undefined' ? window : globalThis);
