var XRegExp; if (XRegExp) throw Error("can't load XRegExp twice in the same frame"); !function (a) { function l(a, b) { if (!XRegExp.isRegExp(a)) throw TypeError("type RegExp expected"); var c = a._xregexp; return a = XRegExp(a.source, m(a) + (b || "")), c && (a._xregexp = { source: c.source, captureNames: c.captureNames ? c.captureNames.slice(0) : null }), a } function m(a) { return (a.global ? "g" : "") + (a.ignoreCase ? "i" : "") + (a.multiline ? "m" : "") + (a.extended ? "x" : "") + (a.sticky ? "y" : "") } function n(a, b, c, d) { var h, i, j, g = f.length; e = !0; try { for (; g--;) if (j = f[g], c & j.scope && (!j.trigger || j.trigger.call(d)) && (j.pattern.lastIndex = b, i = j.pattern.exec(a), i && i.index === b)) { h = { output: j.handler.call(d, i, c), match: i }; break } } catch (a) { throw a } finally { e = !1 } return h } function o(a, b, c) { if (Array.prototype.indexOf) return a.indexOf(b, c); for (var d = c || 0; d < a.length; d++) if (a[d] === b) return d; return -1 } XRegExp = function (b, d) { var j, m, o, p, q, f = [], h = XRegExp.OUTSIDE_CLASS, i = 0; if (XRegExp.isRegExp(b)) { if (d !== a) throw TypeError("can't supply flags when constructing one RegExp from another"); return l(b) } if (e) throw Error("can't call the XRegExp constructor within token definition functions"); for (d = d || "", j = { hasNamedCapture: !1, captureNames: [], hasFlag: function (a) { return d.indexOf(a) > -1 }, setFlag: function (a) { d += a } }; i < b.length;) m = n(b, i, h, j), m ? (f.push(m.output), i += m.match[0].length || 1) : (o = g.exec.call(k[h], b.slice(i))) ? (f.push(o[0]), i += o[0].length) : (p = b.charAt(i), "[" === p ? h = XRegExp.INSIDE_CLASS : "]" === p && (h = XRegExp.OUTSIDE_CLASS), f.push(p), i++); return q = RegExp(f.join(""), g.replace.call(d, c, "")), q._xregexp = { source: b, captureNames: j.hasNamedCapture ? j.captureNames : null }, q }, XRegExp.version = "1.5.1", XRegExp.INSIDE_CLASS = 1, XRegExp.OUTSIDE_CLASS = 2; var b = /\$(?:(\d\d?|[$&`'])|{([$\w]+)})/g, c = /[^gimy]+|([\s\S])(?=[\s\S]*\1)/g, d = /^(?:[?*+]|{\d+(?:,\d*)?})\??/, e = !1, f = [], g = { exec: RegExp.prototype.exec, test: RegExp.prototype.test, match: String.prototype.match, replace: String.prototype.replace, split: String.prototype.split }, h = g.exec.call(/()??/, "")[1] === a, i = function () { var a = /^/g; return g.test.call(a, ""), !a.lastIndex }(), j = RegExp.prototype.sticky !== a, k = {}; k[XRegExp.INSIDE_CLASS] = /^(?:\\(?:[0-3][0-7]{0,2}|[4-7][0-7]?|x[\dA-Fa-f]{2}|u[\dA-Fa-f]{4}|c[A-Za-z]|[\s\S]))/, k[XRegExp.OUTSIDE_CLASS] = /^(?:\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9]\d*|x[\dA-Fa-f]{2}|u[\dA-Fa-f]{4}|c[A-Za-z]|[\s\S])|\(\?[:=!]|[?*+]\?|{\d+(?:,\d*)?}\??)/, XRegExp.addToken = function (a, b, c, d) { f.push({ pattern: l(a, "g" + (j ? "y" : "")), handler: b, scope: c || XRegExp.OUTSIDE_CLASS, trigger: d || null }) }, XRegExp.cache = function (a, b) { var c = a + "/" + (b || ""); return XRegExp.cache[c] || (XRegExp.cache[c] = XRegExp(a, b)) }, XRegExp.copyAsGlobal = function (a) { return l(a, "g") }, XRegExp.escape = function (a) { return a.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&") }, XRegExp.execAt = function (a, b, c, d) { var f, e = l(b, "g" + (d && j ? "y" : "")); return e.lastIndex = c = c || 0, f = e.exec(a), d && f && f.index !== c && (f = null), b.global && (b.lastIndex = f ? e.lastIndex : 0), f }, XRegExp.freezeTokens = function () { XRegExp.addToken = function () { throw Error("can't run addToken after freezeTokens") } }, XRegExp.isRegExp = function (a) { return "[object RegExp]" === Object.prototype.toString.call(a) }, XRegExp.iterate = function (a, b, c, d) { for (var g, e = l(b, "g"), f = -1; g = e.exec(a) ;) b.global && (b.lastIndex = e.lastIndex), c.call(d, g, ++f, a, b), e.lastIndex === g.index && e.lastIndex++; b.global && (b.lastIndex = 0) }, XRegExp.matchChain = function (a, b) { return function a(c, d) { var h, e = b[d].regex ? b[d] : { regex: b[d] }, f = l(e.regex, "g"), g = []; for (h = 0; h < c.length; h++) XRegExp.iterate(c[h], f, function (a) { g.push(e.backref ? a[e.backref] || "" : a[0]) }); return d !== b.length - 1 && g.length ? a(g, d + 1) : g }([a], 0) }, RegExp.prototype.apply = function (a, b) { return this.exec(b[0]) }, RegExp.prototype.call = function (a, b) { return this.exec(b) }, RegExp.prototype.exec = function (b) { var c, d, e, f; if (this.global || (f = this.lastIndex), c = g.exec.apply(this, arguments)) { if (!h && c.length > 1 && o(c, "") > -1 && (e = RegExp(this.source, g.replace.call(m(this), "g", "")), g.replace.call((b + "").slice(c.index), e, function () { for (var b = 1; b < arguments.length - 2; b++) arguments[b] === a && (c[b] = a) })), this._xregexp && this._xregexp.captureNames) for (var j = 1; j < c.length; j++) d = this._xregexp.captureNames[j - 1], d && (c[d] = c[j]); !i && this.global && !c[0].length && this.lastIndex > c.index && this.lastIndex-- } return this.global || (this.lastIndex = f), c }, RegExp.prototype.test = function (a) { var b, c; return this.global || (c = this.lastIndex), b = g.exec.call(this, a), b && !i && this.global && !b[0].length && this.lastIndex > b.index && this.lastIndex--, this.global || (this.lastIndex = c), !!b }, String.prototype.match = function (a) { if (XRegExp.isRegExp(a) || (a = RegExp(a)), a.global) { var b = g.match.apply(this, arguments); return a.lastIndex = 0, b } return a.exec(this) }, String.prototype.replace = function (a, c) { var e, f, h, i, d = XRegExp.isRegExp(a); return d ? (a._xregexp && (e = a._xregexp.captureNames), a.global || (i = a.lastIndex)) : a += "", "[object Function]" === Object.prototype.toString.call(c) ? f = g.replace.call(this + "", a, function () { if (e) { arguments[0] = new String(arguments[0]); for (var b = 0; b < e.length; b++) e[b] && (arguments[0][e[b]] = arguments[b + 1]) } return d && a.global && (a.lastIndex = arguments[arguments.length - 2] + arguments[0].length), c.apply(null, arguments) }) : (h = this + "", f = g.replace.call(h, a, function () { var a = arguments; return g.replace.call(c + "", b, function (b, c, d) { if (!c) { var g = +d; return g <= a.length - 3 ? a[g] : (g = e ? o(e, d) : -1, g > -1 ? a[g + 1] : b) } switch (c) { case "$": return "$"; case "&": return a[0]; case "`": return a[a.length - 1].slice(0, a[a.length - 2]); case "'": return a[a.length - 1].slice(a[a.length - 2] + a[0].length); default: var f = ""; if (c = +c, !c) return b; for (; c > a.length - 3;) f = String.prototype.slice.call(c, -1) + f, c = Math.floor(c / 10); return (c ? a[c] || "" : "$") + f } }) })), d && (a.global ? a.lastIndex = 0 : a.lastIndex = i), f }, String.prototype.split = function (b, c) { if (!XRegExp.isRegExp(b)) return g.split.apply(this, arguments); var h, i, d = this + "", e = [], f = 0; if (c === a || +c < 0) c = 1 / 0; else if (c = Math.floor(+c), !c) return []; for (b = XRegExp.copyAsGlobal(b) ; (h = b.exec(d)) && !(b.lastIndex > f && (e.push(d.slice(f, h.index)), h.length > 1 && h.index < d.length && Array.prototype.push.apply(e, h.slice(1)), i = h[0].length, f = b.lastIndex, e.length >= c)) ;) b.lastIndex === h.index && b.lastIndex++; return f === d.length ? g.test.call(b, "") && !i || e.push("") : e.push(d.slice(f)), e.length > c ? e.slice(0, c) : e }, XRegExp.addToken(/\(\?#[^)]*\)/, function (a) { return g.test.call(d, a.input.slice(a.index + a[0].length)) ? "" : "(?:)" }), XRegExp.addToken(/\((?!\?)/, function () { return this.captureNames.push(null), "(" }), XRegExp.addToken(/\(\?<([$\w]+)>/, function (a) { return this.captureNames.push(a[1]), this.hasNamedCapture = !0, "(" }), XRegExp.addToken(/\\k<([\w$]+)>/, function (a) { var b = o(this.captureNames, a[1]); return b > -1 ? "\\" + (b + 1) + (isNaN(a.input.charAt(a.index + a[0].length)) ? "" : "(?:)") : a[0] }), XRegExp.addToken(/\[\^?]/, function (a) { return "[]" === a[0] ? "\\b\\B" : "[\\s\\S]" }), XRegExp.addToken(/^\(\?([imsx]+)\)/, function (a) { return this.setFlag(a[1]), "" }), XRegExp.addToken(/(?:\s+|#.*)+/, function (a) { return g.test.call(d, a.input.slice(a.index + a[0].length)) ? "" : "(?:)" }, XRegExp.OUTSIDE_CLASS, function () { return this.hasFlag("x") }), XRegExp.addToken(/\./, function () { return "[\\s\\S]" }, XRegExp.OUTSIDE_CLASS, function () { return this.hasFlag("s") }) }();