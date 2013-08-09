//> YAJET -- Yet Another JavaScript Emplate Tengine
//> Author: Mihai Bazon <mihai.bazon@gmail.com>
//> Distributed under the BSD license.  Visit www.yajet.net for details.
//> (c) Mihai Bazon 2010

function YAJET(yajet_args){

        yajet_args = DEF(yajet_args || {}, {
                reader_char : "$",
                filters     : {},
                directives  : {},
                with_scope  : false
        });

        var TEMPLATES = this.TEMPLATES = {};

        // special constructs:
        //
        // $foo, ${foo} -- output of variable foo
        // $foo|html, ${foo|html} -- output foo, escaping HTML characters
        // $(when (condition) ... $)
        // $(if (condition) ... $(else) ... $)
        // $(map (var => list) ... $)
        // $(maphash (key, val => obj) ... $)
        // $(let ((var1 => value1) (var2 => value2)) ... $)
        // $(continue)
        // $(break)
        //
        // The "=>" is just syntactic sugar for ","

        var GENSYM = 0;
        function gensym() {
                return "__GSY" + (++GENSYM);
        };

        function last(a) {
                return a[a.length - 1];
        };

        function map(a, f, obj) {
                var i = 0, n = a.length, b = new Array(n);
                while (--n >= 0)
                        b[i] = f.call(obj, a[i++]);
                return b;
        };

        var PARENS = {
                "(" : ")",
                "{" : "}",
                "[" : "]"
        };

        var READER_CHAR = yajet_args.reader_char;
        var READER_CHAR_STR = to_js_string(READER_CHAR);

        this.X_CONT = {};
        this.X_BREK = {};
        this.X_IMPORT = {};

        var MAIN_OPEN = "var __EXPORTS = {};";

        var MAIN_CLOSE = "return (this === YAJET.X_IMPORT) ? __EXPORTS : __BUF;";

        var FUNC_OPEN = ( "var __BUF = '', VUT = OUT;" +
                          "function OUT(str) { if (str != null) __BUF += str };" );

        var FUNC_CLOSE = "return __BUF";

        var EX_LOOP_HANDLERS = ( "} catch(ex) { " +
                                 "if (ex === YAJET.X_CONT) continue;" +
                                 "if (ex === YAJET.X_BREK) break;" +
                                 "throw ex;" +
                                 "}" );

        function MAKE_IMPORT(imp) {
                imp = trim(imp);
                return "function " + imp + "(){" +
                        "return YAJET.process(" + to_js_string(imp) + ", this, arguments)}";
        };

        function compile(THE_STRING) {
                var THE_CODE = [],
                    THE_CLOSING = [],
                    THE_INDEX = 0,
                    THE_LENGTH = THE_STRING.length,
                    THE_TEXT = "",
                    THE_SELF = this,
                    HAS_EXPORTS = [];

                /* -----[ BEGIN directives ]----- */

                var directives = {
                        "if": function() {
                                block_open("if (" + read_balanced() + ") {");
                        },
                        "aif": function() {
                                // from http://common-lisp.net/project/anaphora/
                                // "the anaphoric macro collection from hell".
                                // But here it's somewhat extended.
                                var args = read_balanced(true);
                                var sym = args.length > 1 ? args[1] : "it";
                                var cond = args.length > 2
                                        ? args[2]
                                        : ( sym + " != null && " +
                                            sym + " !== false && " +
                                            "!(" + sym + " instanceof Array && " + sym + ".length == 0) && " +
                                            "!(" + sym + " === '')" );
                                block_open("(function(" + sym + ") { if (" + cond + ") {",
                                           "}}).call(this, " + args[0] + ");");
                        },
                        "unless": function() {
                                block_open("if (!(" + read_balanced() + ")) {");
                        },
                        "else": function() {
                                out("} else {"); // shortcut, no need for block_close / block_open here
                                assert_skip(")");
                        },
                        "elsif": function() {
                                out("} else if (" + read_balanced() + ") {"); // again
                                assert_skip(")");
                        },
                        "maphash": function() {
                                var args = read_balanced(true);
                                var key = args[0], val = args[1], hash = args[2], sym = gensym();
                                block_open(
                                        // open
                                        "(function(" + sym + ") {" +
                                                "for (var " + key + " in " + sym + ") {" +
                                                "if (" + sym + ".hasOwnProperty(" + key + ")) try {" +
                                                "var " + val + " = " + sym + "[" + key + "];"
                                        ,
                                        // close
                                        EX_LOOP_HANDLERS + "}}).call(this, " + hash + ");"
                                );
                        },
                        "map": function() {
                                var args = read_balanced(true), idx, key, arr, sym = gensym(), len = gensym();
                                if (args.length == 3) {
                                        idx = args[0], key = args[1], arr = args[2];
                                } else {
                                        idx = gensym();
                                        if (args.length == 2) {
                                                key = args[0], arr = args[1];
                                        }
                                        else if (args.length == 1) {
                                                arr = args[0];
                                        }
                                }
                                block_open(
                                        // open
                                        "(function(" + sym + ") {" +
                                                "for (var " +
                                                (args.length == 1 ? "$_," : "") +
                                                len + " = " + sym + ".length," +
                                                idx + " = 0; " + idx + " < " + len + "; ++" + idx + ") try {" +
                                                (args.length == 1
                                                 ? "with ($_ = " + sym + "[" + idx + "]) {"
                                                 : "var " + key + " = " + sym + "[" + idx + "];")
                                        ,
                                        // close
                                        (args.length == 1 ? "}" : "") +
                                                EX_LOOP_HANDLERS + "}).call(this, " + arr + ");"
                                );
                        },
                        "repeat": function() {
                                var args = read_balanced(true), count, start = 1, idx, sym = gensym();
                                if (args.length == 3)
                                        start = args.shift();
                                count = args.shift();
                                idx = args.shift() || gensym();
                                block_open(
                                        // open
                                        "(function(" + sym + ") {" +
                                                "for (var " + idx + " = " + start + "; " + idx + " <= " + sym + "; ++" + idx + ") try {",
                                        // close
                                        EX_LOOP_HANDLERS + "}).call(this, " + count + ");"
                                );
                        },
                        "continue": function() {
                                out("throw YAJET.X_CONT;");
                                assert_skip(")");
                        },
                        "break": function() {
                                out("throw YAJET.X_BREK;");
                                assert_skip(")");
                        },
                        "let": function() {
                                block_open("(function(){", "}).call(this);");
                                read_valist();
                        },
                        "var": function() {
                                read_valist();
                                assert_skip(")");
                        },
                        "with": function() {
                                block_open("with (" + read_balanced() + ") {");
                        },
                        "block": function() {
                                skip_ws();
                                var name = read_simple_token();
                                var args = trim(read_balanced());
                                block_open("function " + name + "(" + args + ") {" + FUNC_OPEN,
                                           FUNC_CLOSE + "}");
                        },
                        "export": function() {
                                skip_ws();
                                var name = read_simple_token();
                                var args = trim(read_balanced());
                                block_open(name + " = __EXPORTS[" + to_js_string(name) + "] = function(" + args + ") {" + FUNC_OPEN,
                                           FUNC_CLOSE + "}; ");
                                HAS_EXPORTS.push(name);
                        },
                        "import": function() {
                                var imp = read_balanced(true);
                                assert_skip(")");
                                out(map(imp, MAKE_IMPORT).join(";\n") + ";");
                        },
                        "process": function() {
                                skip_ws();
                                var name = read_simple_token();
                                var args = read_balanced();
                                assert_skip(")");
                                out("VUT(YAJET.process(" + to_js_string(name) + ", this, [" + args + "]));");
                        },
                        "wrap": function() {
                                skip_ws();
                                var name = read_simple_token();
                                var args = trim(read_balanced());
                                if (args)
                                        args += ", ";
                                name = "(typeof " + name + " == 'function' ? " + name + " : YAJET.TEMPLATES." + name + ")";
                                block_open("VUT(" + name + ".call(this, " + args + "function(OUT, VUT){", "}));");
                        },
                        "content": function() {
                                out("if (arguments[arguments.length - 1] instanceof Function) arguments[arguments.length - 1].call(this, OUT, VUT);");
                                assert_skip(")");
                        },
                        "literal": function() {
                                var end, pos, text;
                                skip_ws();
                                end = read_string() + ")";
                                skip(/^[ \t\xA0]*\n/);
                                pos = THE_STRING.indexOf(end, THE_INDEX);
                                if (pos < 0)
                                        EX_PARSE("Unfinished LITERAL (was looking for " + end);
                                text = THE_STRING.substring(THE_INDEX, pos);
                                THE_INDEX = pos + end.length;
                                out("OUT(" + to_js_string(text) + ")");
                        },
                        "syntax": function() {
                                var save = READER_CHAR;
                                skip_ws();
                                READER_CHAR = next();
                                block_open("", function(){ READER_CHAR = save });
                        }
                };

                // aliases
                directives["when"] = directives["if"];
                directives["awhen"] = directives["aif"];
                directives["foreach"] = directives["map"];

                var context = {
                        peek              : peek,
                        next              : next,
                        rest              : rest,
                        out               : out,
                        skip_ws           : skip_ws,
                        assert            : assert,
                        assert_skip       : assert_skip,
                        skip              : skip,
                        looking_at        : looking_at,
                        block_open        : block_open,
                        block_close       : block_close,
                        read_balanced     : read_balanced,
                        read_string       : read_string,
                        read_simple_token : read_simple_token,
                        read_valist       : read_valist,
                        to_js_string      : to_js_string,
                        trim              : trim,
                        map               : map,
                        set_output        : set_output,
                        directives        : yajet_args.directives,
                        EX_PARSE          : EX_PARSE
                };

                /* -----[ END directives ]----- */

                parse();
                if (yajet_args.with_scope) {
                        THE_CODE.unshift("with (this) {");
                        THE_CODE.push("}");
                }

                if (HAS_EXPORTS.length > 0) {
                        THE_CODE.unshift("var " + HAS_EXPORTS.join(", ") + ";");
                }

                var func = makeClosure.call(this, THE_CODE.join("\n"));
                if (HAS_EXPORTS.length > 0) {
                        var exports = func(this.X_IMPORT);
                        for (var i in exports)
                                if (exports.hasOwnProperty(i))
                                        TEMPLATES[i] = exports[i];
                }
                return func;

                function peek() {
                        return THE_STRING.charAt(THE_INDEX);
                };

                function next() {
                        return THE_STRING.charAt(THE_INDEX++);
                };

                function rest(len) {
                        return THE_STRING.substr(THE_INDEX, len != null ? len : THE_LENGTH);
                };

                function out(code) {
                        THE_CODE.push(code);
                };

                function flush_text() {
                        if (THE_TEXT.length > 0)
                                out("OUT(" + to_js_string(THE_TEXT) + ");");
                        THE_TEXT = "";
                };

                function skip_ws(noComments) {
                        var skipped = false;
                        while (skip(" ") || skip("\t") || skip("\n") || skip("\xa0") ||
                               (!noComments && ( skip("//", "\n") ||
                                                 skip("/*", "*/") ||
                                                 skip("<!--", "-->"))))
                                skipped = true;
                        return skipped;
                };

                function assert(ch) {
                        var ret = looking_at(ch);
                        if (!ret)
                                EX_PARSE("Expecting " + ch + " at " + THE_INDEX);
                        return ret;
                };

                function assert_skip(ch) {
                        skip_ws();
                        THE_INDEX += assert(ch).length;
                };

                function skip(ch, end) {
                        var ret = looking_at(ch);
                        if (ret) {
                                THE_INDEX += ret.length;
                                if (end) {
                                        var pos = THE_STRING.indexOf(end, THE_INDEX);
                                        if (pos == -1)
                                                EX_PARSE('Unterminated "' + ch + '" at ' + rest());
                                        THE_INDEX = pos + end.length;
                                }
                        }
                        return ret;
                };

                function looking_at(ch) {
                        if (ch instanceof RegExp) return (ch = ch.exec(rest())) && {
                                match: ch[0],
                                length: ch[0].length,
                                groups: ch
                        };
                        return rest(ch.length) == ch ? {
                                match: ch,
                                length: ch.length
                        } : null;
                };

                function block_open(code, end) {
                        if (!end)
                                end = "}";
                        out(code);
                        THE_CLOSING.push(end);
                };

                function block_close() {
                        var end = THE_CLOSING.pop();
                        if (end instanceof Function)
                                end();
                        else
                                out(end);
                };

                function set_output(out) {
                        var old = THE_CODE;
                        THE_CODE = out;
                        return old;
                };

                function read_balanced(wantList) {
                        skip_ws();
                        var begc = peek();
                        var endc = PARENS[begc];
                        if (endc) {
                                var open = [ endc ];
                                var expr = "";
                                var ret = [];
                                ++THE_INDEX;
                                while (THE_INDEX < THE_LENGTH) {
                                        var ch = peek();
                                        if (ch == last(open)) {
                                                open.pop();
                                                ++THE_INDEX;
                                                if (open.length == 0) {
                                                        if (wantList) {
                                                                expr = trim(expr);
                                                                if (expr)
                                                                        ret.push(expr);
                                                                return ret;
                                                        }
                                                        return expr;
                                                }
                                                expr += ch;
                                        }
                                        else if (ch in PARENS) {
                                                open.push(PARENS[ch]);
                                                ++THE_INDEX;
                                                expr += ch;
                                        }
                                        else if (ch == '"' || ch == "'") {
                                                expr += to_js_string(read_string());
                                        }
                                        else if (wantList && open.length == 1 &&
                                                 ( skip(",") || skip(";") || skip("=>") || skip("..") || skip("∈") ) ) {
                                                ret.push(expr);
                                                skip_ws();
                                                expr = "";
                                        }
                                        else if (skip_ws()) {
                                                expr += " ";
                                        }
                                        else {
                                                ++THE_INDEX;
                                                expr += ch;
                                        }
                                }
                        }
                };

                function parse() {
                        while (THE_INDEX < THE_LENGTH) {
                                var pos = THE_STRING.indexOf(READER_CHAR, THE_INDEX);
                                if (pos < 0) {
                                        THE_TEXT += rest();
                                        break;
                                }
                                else {
                                        if (pos > THE_INDEX)
                                                THE_TEXT += rest(pos - THE_INDEX);
                                        THE_INDEX = pos + 1;

                                        // double reader char means insert it literally
                                        if (skip(READER_CHAR)) {
                                                THE_TEXT += READER_CHAR;
                                        }
                                        // a following sharp sign (#) means comment out the rest of the line
                                        else if (skip("#")) {
                                                if (0 == (THE_INDEX = THE_STRING.indexOf("\n", THE_INDEX) + 1))
                                                        break;
                                        }
                                        // else: code follows
                                        else {
                                                flush_text();
                                                read_code();
                                        }
                                }
                        }
                        THE_INDEX = THE_LENGTH;
                        flush_text();
                };

                function read_string() {
                        var begc = peek();
                        if (begc == "'" || begc == '"') {
                                var start = THE_INDEX;
                                var esc = false, data = "";
                                do {
                                        ++THE_INDEX;
                                        var ch = peek();
                                        if (!esc) {
                                                if (ch == "\\") {
                                                        esc = true;
                                                        continue;
                                                }
                                                if (ch == begc) {
                                                        ++THE_INDEX;
                                                        return data;
                                                }
                                        } else switch (ch) {
                                            case "b": ch = "\b"; break;
                                            case "f": ch = "\f"; break;
                                            case "n": ch = "\n"; break;
                                            case "t": ch = "\t"; break;
                                            case "r": ch = "\r"; break;
                                            case "x":
                                                ++THE_INDEX;
                                                ch = parseInt(rest(2), 16);
                                                if (isNaN(ch))
                                                        EX_PARSE("Expecting an Unicode character code at: " + THE_INDEX);
                                                ch = String.fromCharCode(ch);
                                                THE_INDEX += 2;
                                                break;
                                            case "u":
                                                ++THE_INDEX;
                                                ch = parseInt(rest(4), 16);
                                                if (isNaN(ch))
                                                        EX_PARSE("Expecting an Unicode character code at: " + THE_INDEX);
                                                ch = String.fromCharCode(ch);
                                                THE_INDEX += 4;
                                                break;
                                        }
                                        esc = false;
                                        data += ch;
                                }
                                while (THE_INDEX < THE_LENGTH);
                                EX_PARSE("Unterminated string at: " + THE_STRING.substr(start));
                        }
                };

                function read_simple_token(noDollar) {
                        var token = "", discard = 0, ch, code;
                        for (;;) {
                                ch = peek();
                                code = ch.charCodeAt(0);
                                if ((code >= 65 && code <= 90) // uppercase letter
                                    || (code >= 97 && code <= 122) // lowercase letter
                                    || (code >= 48 && code <= 57)  // digit
                                    || code == 95 // ch == "_"
                                    || (code == 36 && !noDollar) // ch == "$"
                                    || code == 124 // ch == "|"
                                    || code == 46 // ch == "."
                                   )
                                {
                                        token += ch;
                                        (code == 36 || code == 124 || code == 46) ? ++discard : (discard = 0);
                                        ++THE_INDEX;
                                } else
                                        break;
                        }
                        if (discard > 0) {
                                THE_INDEX -= discard;
                                token = token.substr(0, token.length - discard);
                        }
                        return token;
                };

                function read_valist() {
                        var bindings = [];
                        assert_skip("(");
                        while (THE_INDEX < THE_LENGTH) {
                                skip_ws();
                                if (looking_at("(")) {
                                        bindings.push(read_balanced(true));
                                }
                                else if (skip(")")) {
                                        break;
                                }
                                else {
                                        bindings.push(read_simple_token());
                                }
                        }
                        out("var " + map(bindings, function(b){
                                return b instanceof Array ? b[0] + " = " + b[1] : b;
                        }).join(", ") + ";");
                };

                function read_code() {
                        if (skip("_")) {
                                out("VUT($_);"); // perlism
                        }
                        else if (skip("-")) {
                                skip_ws(true);
                        }
                        else if (skip("(")) {
                                var m = read_simple_token();
                                if (m) {
                                        m = m.toLowerCase();
                                        var handler = yajet_args.directives[m] || directives[m];
                                        if (!handler)
                                                EX_PARSE("Unknown directive: " + m.toUpperCase());
                                        handler.call(THE_SELF, context);
                                }
                                else {
                                        --THE_INDEX;
                                        out(read_balanced() + ";");
                                }
                        }
                        else if (skip(")")) {
                                block_close();
                        }
                        else if (skip("(")) {
                                EX_PARSE("Unrecognized construct at " + rest());
                        }
                        else if (looking_at("{")) {
                                var v = read_balanced(true);
                                if (v.length > 0 && /\S/.test(v[0])) {
                                        var val = v.shift();
                                        while (v.length > 0) {
                                                var filter = trim(v.shift());
                                                // check if it has arguments
                                                var par = filter.indexOf("(");
                                                var args = null;
                                                if (par >= 0) {
                                                        args = trim(filter.substring(par + 1, filter.length - 1));
                                                        filter = filter.substring(0, par);
                                                }
                                                if (!args) {
                                                        args = val;
                                                } else {
                                                        args = val + ", " + args;
                                                }
                                                val = "YAJET.filter(" + to_js_string(filter) + ", " + args + ")";
                                        }
                                        out("VUT(" + val + ");");
                                }
                        }
                        else {
                                skip_ws();
                                var v = read_simple_token(true).split("|");
                                var val = v.shift();
                                while (v.length > 0) {
                                        val = "YAJET.filter(" + to_js_string(v.shift()) + ", " + val + ")";
                                }
                                out("VUT(" + val + ");");
                        }
                };
        };

        function to_js_string(str) {
                return '"' + str.replace(/\x5c/g, "\\\\").replace(/\r?\n/g, "\\n").replace(/\t/g, "\\t").replace(/\x22/g, "\\\"") + '"';
        };

        function EX_PARSE(error) {
                throw new Error(error);
        };

        function EX_RUNTIME(error) {
                throw new Error(error);
        };

        function makeClosure(code) {
                try {
                        code = ( MAIN_OPEN + FUNC_OPEN + code + MAIN_CLOSE );
                        var self = this,
                            compiled = new Function("YAJET", code);
                        function ret(data) { return compiled.call(data, self) };
                        ret.orig = compiled; // these serve debugging
                        ret.code = code;
                        return ret;
                } catch(ex) {
                        window.console && console.log("%s", code);
                        ex.yajetCode = code;
                        throw ex;
                }
        };

        function trim(v) {
                return v.replace(/^\s+|\s+$/g, "");
        };

        var FILTERS = YAJET.FILTERS = {
                html: function(v) {
                        return String(v).replace(/&/g, "&amp;")
                                .replace(/\x22/g, "&quot;")
                                .replace(/\x27/g, "&#x27;")
                                .replace(/</g, "&lt;")
                                .replace(/>/g, "&gt;")
                                .replace(/\u00A0/g, "&#xa0;");
                },
                upcase: function(v) {
                        return String(v).toUpperCase();
                },
                downcase: function(v) {
                        return String(v).toLowerCase();
                },
                plural: function(n, fmt) {
                        if (!(fmt instanceof Array)) {
                                if (arguments.length > 2) {
                                        fmt = Array.$(arguments, 1);
                                } else {
                                        fmt = fmt.split("|");
                                }
                        }
                        fmt = n < fmt.length ? fmt[n] : fmt[fmt.length - 1];
                        return fmt.replace(/##?/g, function(s){
			        return s.length == 2 ? "#" : n;
		        });
                },
                trim: trim
        };

        // API

        this.compile = compile;
        this.filter = function(f) {
                var args = Array$(arguments, 1);
                var filter = yajet_args.filters[f] || FILTERS[f];
                if (filter)
                        return filter.apply(this, args);
                EX_RUNTIME("No filter " + f);
        };

        this.process = function(tmpl, obj, args) {
                if (args == null)
                        args = [];
                var func = TEMPLATES[tmpl];
                if (!func)
                        EX_RUNTIME("No exported function: " + tmpl);
                return func.apply(obj, args);
        };

        this.reader_char = function() {
                return READER_CHAR;
        };

        /* -----[ utils ]----- */

        function DEF(a, d, i, r) {
                r = {};
                for (i in d) if (d.hasOwnProperty(i)) r[i] = d[i];
                for (i in a) if (a.hasOwnProperty(i)) r[i] = a[i];
                return r;
        };

        function Array$(obj, start) {
                if (start == null)
                        start = 0;
                var a, i, j;
                try {
                        a = Array.prototype.slice.call(obj, start);
                } catch (ex) {
                        a = new Array(obj.length - start);
                        for (i = start, j = 0; i < obj.length; ++i, ++j)
                                a[j] = obj[i];
                }
                return a;
        };

};

exports.YAJET = YAJET;
