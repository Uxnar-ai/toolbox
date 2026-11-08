/* 校验码：身份证、银行卡 Luhn、统一社会信用代码、ISBN / 商品条码。
   纯计算，不联网。 */
(function (root) {
  'use strict';

  var ID_W = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  var ID_C = '10X98765432';

  var PROV = {
    11: '北京', 12: '天津', 13: '河北', 14: '山西', 15: '内蒙古',
    21: '辽宁', 22: '吉林', 23: '黑龙江',
    31: '上海', 32: '江苏', 33: '浙江', 34: '安徽', 35: '福建', 36: '江西', 37: '山东',
    41: '河南', 42: '湖北', 43: '湖南', 44: '广东', 45: '广西', 46: '海南',
    50: '重庆', 51: '四川', 52: '贵州', 53: '云南', 54: '西藏',
    61: '陕西', 62: '甘肃', 63: '青海', 64: '宁夏', 65: '新疆',
    71: '台湾', 81: '香港', 82: '澳门'
  };

  var USCC_SET = '0123456789ABCDEFGHJKLMNPQRTUWXY';
  var USCC_W = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28];

  // ---------- 身份证 ----------
  function id15to18(s) {
    if (!/^\d{15}$/.test(s)) return null;
    var base = s.slice(0, 6) + '19' + s.slice(6);
    return base + idCheckDigit(base);
  }

  function idCheckDigit(first17) {
    var sum = 0;
    for (var i = 0; i < 17; i++) sum += (first17.charCodeAt(i) - 48) * ID_W[i];
    return ID_C.charAt(sum % 11);
  }

  function idInfo(s) {
    s = s.toUpperCase();
    var res = { valid: false, rows: [] };
    if (!/^\d{17}[\dX]$/.test(s)) return { valid: false, rows: [['格式', '18 位里含非数字字符', 'bad']] };

    var expect = idCheckDigit(s.slice(0, 17));
    var ok = expect === s.charAt(17);
    res.valid = ok;
    res.rows.push(['校验位', ok ? s.charAt(17) + '（正确）' : s.charAt(17) + '，应为 ' + expect, ok ? 'ok' : 'bad']);

    var y = +s.slice(6, 10), m = +s.slice(10, 12), d = +s.slice(12, 14);
    var dt = new Date(y, m - 1, d);
    var dateOk = dt.getFullYear() === y && dt.getMonth() === m - 1 && dt.getDate() === d && y >= 1900 && y <= 2100;
    res.rows.push(['出生日期', y + '-' + pad(m) + '-' + pad(d) + (dateOk ? '' : '（这个日期不存在）'), dateOk ? 'ok' : 'bad']);

    if (dateOk) {
      var now = new Date();
      var age = now.getFullYear() - y - ((now.getMonth() + 1 < m || (now.getMonth() + 1 === m && now.getDate() < d)) ? 1 : 0);
      res.rows.push(['年龄', age + ' 岁', '']);
      res.birthday = y + '-' + pad(m) + '-' + pad(d);
      res.age = age;
    }

    var seq = +s.charAt(16);
    res.rows.push(['性别', seq % 2 ? '男' : '女', '']);
    var p = PROV[s.slice(0, 2)];
    res.rows.push(['地区码', s.slice(0, 2) + (p ? '（' + p + '）' : '（不认识的省级代码）'), p ? '' : 'bad']);
    res.rows.push(['顺序码 / 校验位', s.slice(14, 17) + ' / ' + s.charAt(17), '']);
    return res;
  }

  // ---------- 银行卡 Luhn ----------
  function luhnSum(digits) {
    var sum = 0, dbl = false;
    for (var i = digits.length - 1; i >= 0; i--) {
      var d = digits.charCodeAt(i) - 48;
      if (dbl) { d *= 2; if (d > 9) d -= 9; }
      sum += d;
      dbl = !dbl;
    }
    return sum;
  }

  function luhnExpect(firstN) {
    // 给前 n-1 位算最后一位
    for (var d = 0; d < 10; d++) {
      if (luhnSum(firstN + d) % 10 === 0) return String(d);
    }
    return '0';
  }

  function cardBrand(s) {
    if (/^4/.test(s)) return 'Visa';
    if (/^(5[1-5]|2(2[2-9]|[3-6]\d|7[01]|720))/.test(s)) return 'Mastercard';
    if (/^3[47]/.test(s)) return 'American Express';
    if (/^35/.test(s)) return 'JCB';
    if (/^(6011|65|64[4-9])/.test(s)) return 'Discover';
    if (/^62/.test(s)) return '银联';
    if (/^9\d/.test(s)) return '可能是各地城商行 / 内部卡';
    return '认不出卡组织';
  }

  function cardInfo(s) {
    var res = { valid: false, rows: [] };
    if (!/^\d{12,19}$/.test(s)) return { valid: false, rows: [['格式', '银行卡号是 12–19 位数字', 'bad']] };
    var sum = luhnSum(s);
    var ok = sum % 10 === 0;
    res.valid = ok;
    res.rows.push(['Luhn 校验', ok ? '通过（' + sum + ' 是 10 的倍数）' : '不通过（和为 ' + sum + '，差 ' + (sum % 10) + '）', ok ? 'ok' : 'bad']);
    res.rows.push(['长度', s.length + ' 位', '']);
    res.rows.push(['卡组织', cardBrand(s), '']);
    if (!ok) res.rows.push(['正确末位', '把最后一位改成 ' + luhnExpect(s.slice(0, -1)) + ' 就能过', '']);
    return res;
  }

  // ---------- 统一社会信用代码 ----------
  function usccInfo(s) {
    var res = { valid: false, rows: [] };
    s = s.toUpperCase();
    if (!/^[0-9A-Z]{18}$/.test(s)) return { valid: false, rows: [['格式', '18 位数字或大写字母', 'bad']] };
    for (var i = 0; i < 18; i++) {
      if (USCC_SET.indexOf(s.charAt(i)) < 0) {
        return { valid: false, rows: [['字符', '第 ' + (i + 1) + ' 位是「' + s.charAt(i) + '」，这类代码不用 I / O / S / V / Z', 'bad']] };
      }
    }
    var sum = 0;
    for (var j = 0; j < 17; j++) sum += USCC_SET.indexOf(s.charAt(j)) * USCC_W[j];
    var r = sum % 31;
    var code = r === 0 ? 0 : 31 - r;
    var expect = USCC_SET.charAt(code);
    var ok = expect === s.charAt(17);
    res.valid = ok;
    res.rows.push(['校验位', ok ? expect + '（正确）' : s.charAt(17) + '，应为 ' + expect, ok ? 'ok' : 'bad']);
    res.rows.push(['登记管理部门', s.charAt(0) + '（' + (
      { '1': '机构编制', '2': '外交', '3': '司法行政', '4': '文化', '5': '民政', '6': '旅游', '7': '宗教', '8': '工会', '9': '工商（市场监管）',
        'A': '中央军委改革和编制办公室', 'N': '农业', 'Y': '其他' }[s.charAt(0)] || '未定义') + '）', '']);
    res.rows.push(['机构类别', s.charAt(1), '']);
    res.rows.push(['登记机关地区码', s.slice(2, 8), '']);
    return res;
  }

  // ---------- 条码 / ISBN ----------
  function eanCheck(firstN) {
    var sum = 0, w = 1;
    for (var i = firstN.length - 1; i >= 0; i--) {
      sum += (firstN.charCodeAt(i) - 48) * (w === 1 ? 3 : 1);
      w = w === 1 ? 3 : 1;
    }
    return String((10 - sum % 10) % 10);
  }

  function eanInfo(s) {
    var res = { valid: false, rows: [] };
    if (!/^\d{13}$/.test(s)) return { valid: false, rows: [['格式', '13 位数字', 'bad']] };
    var expect = eanCheck(s.slice(0, 12));
    var ok = expect === s.charAt(12);
    res.valid = ok;
    res.rows.push(['校验位', ok ? expect + '（正确）' : s.charAt(12) + '，应为 ' + expect, ok ? 'ok' : 'bad']);
    res.rows.push(['前缀', s.slice(0, 3) + (/^(690|691|692|693|694|695|696|697|698|699|69)/.test(s.slice(0, 3)) ? '（中国大陆）' : ''), '']);
    if (/^97[89]/.test(s)) res.rows.push(['类型', '图书（ISBN-13）', '']);
    return res;
  }

  function isbn10Info(s) {
    var res = { valid: false, rows: [] };
    s = s.toUpperCase();
    if (!/^\d{9}[\dX]$/.test(s)) return { valid: false, rows: [['格式', '10 位（含末位 X）', 'bad']] };
    var sum = 0;
    for (var i = 0; i < 10; i++) {
      var d = s.charAt(i) === 'X' ? 10 : s.charCodeAt(i) - 48;
      sum += (10 - i) * d;
    }
    var ok = sum % 11 === 0;
    res.valid = ok;
    res.rows.push(['校验', ok ? '通过（加权和 ' + sum + '）' : '不通过（加权和 ' + sum + '，对 11 取余 ' + (sum % 11) + '）', ok ? 'ok' : 'bad']);
    var isbn13 = '978' + s.slice(0, 9);
    res.rows.push(['转 ISBN-13', isbn13 + eanCheck(isbn13), '']);
    return res;
  }

  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  // ---------- 总入口 ----------
  function analyze(raw) {
    var s = String(raw || '').replace(/[\s\-]/g, '').toUpperCase();
    if (!s) return null;

    if (/^\d{17}[\dX]$/.test(s)) return { kind: 'id', title: '身份证（18 位）', data: idInfo(s) };
    if (/^\d{17}$/.test(s)) {
      var full = s + idCheckDigit(s);
      return { kind: 'id', title: '身份证（17 位，已补校验位）', data: idInfo(full), filled: full };
    }
    if (/^\d{15}$/.test(s)) {
      var w = id15to18(s);
      return { kind: 'id', title: '身份证（15 位老号，已转 18 位）', data: idInfo(w), filled: w };
    }
    if (/^[0-9A-Z]{18}$/.test(s) && /[A-Z]/.test(s)) return { kind: 'uscc', title: '统一社会信用代码', data: usccInfo(s) };
    if (/^\d{13}$/.test(s)) return { kind: 'ean', title: '商品条码（EAN-13）', data: eanInfo(s) };
    if (/^\d{9}[\dX]$/.test(s)) return { kind: 'isbn10', title: 'ISBN-10', data: isbn10Info(s) };
    if (/^\d{12}$/.test(s)) return { kind: 'ean', title: 'EAN-13（12 位，已补校验位）', data: eanInfo(s + eanCheck(s)), filled: s + eanCheck(s) };
    if (/^\d{12,19}$/.test(s)) return { kind: 'card', title: '银行卡', data: cardInfo(s) };
    return { kind: 'unknown', title: '认不出这是什么号码', data: { valid: false, rows: [['提示', '目前认：身份证（15/17/18 位）、统一社会信用代码（18 位含字母）、银行卡（12–19 位）、EAN-13（13 位）、ISBN-10', 'bad']] } };
  }

  var api = {
    analyze: analyze, idCheckDigit: idCheckDigit, idInfo: idInfo, id15to18: id15to18,
    luhnSum: luhnSum, luhnExpect: luhnExpect, cardInfo: cardInfo, cardBrand: cardBrand,
    usccInfo: usccInfo, eanCheck: eanCheck, eanInfo: eanInfo, isbn10Info: isbn10Info
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.Chk = api;
})(typeof window !== 'undefined' ? window : globalThis);
