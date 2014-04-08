"use strict";

var TMPL = (function(){

    var WHITESPACE_CHARS = " \u00a0\n\r\t\f\u000b\u200b\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000";

    var NAME_START_CHAR = [
        ":",
        "A-Z",
        "_",
        "a-z",
        "\\u00C0-\\u00D6",
        "\\u00D8-\\u00F6",
        "\\u00F8-\\u02FF",
        "\\u0370-\\u037D",
        "\\u037F-\\u1FFF",
        "\\u200C-\\u200D",
        "\\u2070-\\u218F",
        "\\u2C00-\\u2FEF",
        "\\u3001-\\uD7FF",
        "\\uF900-\\uFDCF",
        "\\uFDF0-\\uFFFD",
    ];

    var NAME_CHAR = NAME_START_CHAR.concat([ "\\-", ".", "0-9", "\\u00B7", "\\u0300-\\u036F", "\\u203F-\\u2040" ]);

    var RX_NAME_START_CHAR = new RegExp("[" + NAME_START_CHAR.join("") + "]", "i");
    var RX_NAME_CHAR = new RegExp("[" + NAME_CHAR.join("") + "]", "i");

    var RX_NAME = new RegExp("^([" + NAME_START_CHAR.join("") + "][" + NAME_CHAR.join("") + "]*)");
    var RX_OPENTAG = new RegExp("^<([" + NAME_START_CHAR.join("") + "][" + NAME_CHAR.join("") + "]*)");
    var RX_CLOSETAG = new RegExp("^</([" + NAME_START_CHAR.join("") + "][" + NAME_CHAR.join("") + "]*)");
    var RX_CLOSETAG_SKIP_WS = new RegExp("^[" + WHITESPACE_CHARS + "]*</([" + NAME_START_CHAR.join("") + "][" + NAME_CHAR.join("") + "]*)");
    var RX_CHAR_REF = /^&#([0-9]+|x[0-9a-fA-F]+);/;
    var RX_ENTITY_REF = new RegExp("^&([" + NAME_START_CHAR.join("") + "][" + NAME_CHAR.join("") + "]*);", "i");

    var NO_CONTENT_TAGS = ",area,base,br,col,command,embed,hr,img,input,keygen,link,meta,param,source,track,wbr,";

    function emptyTag(tagname) {
        return NO_CONTENT_TAGS.indexOf("," + tagname.toLowerCase() + ",") >= 0;
    }

    function isWhitespace(ch) {
        return WHITESPACE_CHARS.indexOf(ch) >= 0;
    }

    function defaults(args, defs) {
        if (!args) args = {};
        Object.keys(defs).forEach(function(key){
            if (args[key] === undefined)
                args[key] = defs[key];
        });
        return args;
    }

    function InputStream(text) {
        this.pos = 0;
        this.line = 1;
        this.col = 0;
        this.text = text;
        this.len = text.length;
    };

    InputStream.prototype = {
        peek: function() {
            return this.text.charAt(this.pos);
        },
        next: function() {
            if (this.pos < this.len) {
                var ch = this.text.charAt(this.pos++);
                if (ch == "\n") {
                    ++this.line;
                    this.col = 0;
                } else {
                    ++this.col;
                }
                return ch;
            }
            return null;
        },
        eof: function() {
            return this.peek() == "";
        },
        get: function(rx) {
            var m = this.lookingAt(rx);
            if (m) {
                this.forward(m[0].length);
                return m;
            }
        },
        forward: function(n) {
            while (n-- > 0) this.next();
        },
        lookingAt: function(rx) {
            if (typeof rx == "string") {
                return this.text.substr(this.pos, rx.length) == rx ? [ rx ] : null;
            }
            return rx.exec(this.text.substr(this.pos));
        },
        save: function() {
            return {
                line: this.line,
                col: this.col,
                pos: this.pos,
            };
        },
        restore: function(state) {
            this.pos = state.pos;
            this.line = state.line;
            this.col = state.col;
        },
        readWhile: function(pred) {
            var ret = "";
            while (!this.eof() && pred(this.peek()))
                ret += this.next();
            return ret;
        },
        skipWhitespace: function() {
            return this.readWhile(isWhitespace);
        }
    };

    function OutputStream() {
        this.code = "";
    }
    OutputStream.prototype = {
        get: function(){ return this.code },
        stat: function(stat) {
            this.code += stat + ";\n";
        },
        raw: function(expr) {
            return "this.raw((" + expr + "))";
        },
        esc: function(expr) {
            return "this.esc((" + expr + "))";
        },
        tag: function(tagName, attrs, closed) {
            var ret = "this.tag(" + JSON.stringify(tagName) + ", {", first = true;
            for (var i in attrs) if (attrs.hasOwnProperty(i)) {
                if (first) first = false;
                else ret += ", ";
                ret += JSON.stringify(i) + " : " + attrs[i];
            }
            ret += "}, " + (!!closed) + ")";
            return ret;
        },
        gat: function(tagName) {
            return "this.gat(" + JSON.stringify(tagName) + ")";
        }
    };

    function parse(input, options) {
        if (typeof input == "string") {
            input = new InputStream(input);
        }
        options = defaults(options, {
            noWhitespace  : true,
        });
        var output = new OutputStream();
        html();
        return output.get();

        function croak(msg) {
            msg += " [" + input.line + ":" + input.col + "]";
            throw new Error(msg);
        }

        function html() {
            var str = "", m;
            function dump(nextParser, arg) {
                if (str) {
                    output.stat(output.raw(JSON.stringify(str)));
                }
                if (nextParser) {
                    var stat = nextParser(arg);
                    if (stat) {
                        output.stat(stat);
                    }
                }
                str = "";
            }
            while (!input.eof()) {
                if (input.lookingAt("#:")) {
                    dump(escaped1, true);
                } else if (input.lookingAt("${")) {
                    dump(escaped2, true);
                } else if (input.lookingAt("#=")) {
                    dump(literal1, true);
                } else if (input.lookingAt("#")) {
                    dump(code);
                } else if ((m = input.lookingAt(RX_OPENTAG))) {
                    dump(openTag, m);
                } else if ((m = input.lookingAt(options.noWhitespace ? RX_CLOSETAG_SKIP_WS : RX_CLOSETAG))) {
                    dump(closeTag, m);
                } else {
                    str += input.next();
                }
            }
            dump();
        }

        function closeTag(m) {
            var tagName = m[1];
            input.forward(m[0].length);
            input.readWhile(function(ch){
                return ch != ">";
            });
            input.next();
            if (!emptyTag(tagName))
                return output.gat(tagName);
        }

        function openTag(m) {
            var tagName = m[1];
            input.forward(m[0].length);
            var attrs = {}, closed = emptyTag(tagName);
            while (!input.eof()) {
                input.skipWhitespace();
                if ((m = input.lookingAt(/^\/?>/))) {
                    input.next();
                    if (m[0].length == 2) {
                        closed = true;
                        input.next();
                    }
                    if (options.noWhitespace)
                        input.skipWhitespace();
                    break;
                }
                attribute(attrs);
            }
            output.stat(output.tag(tagName, attrs, closed));
        }

        function attribute(attrs) {
            var attr = input.readWhile(function(ch){
                if (ch == "#")
                    croak("Code not supported in attribute names");
                return !isWhitespace(ch) && "<>'\"/=".indexOf(ch) < 0;
            }), val = "";
            input.skipWhitespace();
            if (input.lookingAt("=")) {
                input.next();
                input.skipWhitespace();
                if (input.lookingAt("'")) val = valueQuoted("'");
                else if (input.lookingAt('"')) val = valueQuoted('"');
                else val = valueUnquoted();
            }
            if (!val) val = '""';
            attrs[attr] = "(" + val + ")";
        }

        function valueQuoted(quote) {
            var str = "", ret = [];
            function dump(nextParser, arg) {
                if (str) {
                    ret.push(JSON.stringify(str));
                }
                if (nextParser) {
                    ret.push("(" + nextParser(arg) + ")");
                }
                str = "";
            }
            input.next();
            while (!input.eof()) {
                if (input.lookingAt(quote)) {
                    input.next();
                    break;
                }
                if (input.lookingAt("#:")) {
                    dump(escaped1, false);
                } else if (input.lookingAt("${")) {
                    dump(escaped2, false);
                } else if (input.lookingAt("#=")) {
                    dump(literal1, false);
                } else if (input.lookingAt("#")) {
                    croak("Statement # block # not allowed in attribute value");
                } else {
                    str += input.next();
                }
            }
            dump();
            return ret.join(" + ");
        }

        function valueUnquoted() {
            return JSON.stringify(input.readWhile(function(ch){
                if (ch == "#")
                    croak("Code not supported in unquoted attribute value");
                return !isWhitespace(ch) && "<>'\"/=".indexOf(ch) < 0;
            }));
        }

        function readUntil(end) {
            var esc = "\\" + end, ret = "";
            input.readWhile(function(ch){
                if (input.lookingAt(esc)) {
                    ret += end;
                    input.forward(end.length);
                    return true;
                }
                if (input.lookingAt(end)) {
                    input.forward(end.length);
                    return false;
                }
                ret += ch;
                return true;
            });
            return ret;
        }

        function escaped1(forStat) {
            input.forward(2);
            var expr = readUntil("#");
            return forStat ? output.esc(expr) : expr;
        }

        function escaped2(forStat) {
            input.forward(2);
            var expr = readUntil("}");
            return forStat ? output.esc(expr) : expr;
        }

        function literal1(forStat) {
            input.forward(2);
            var expr = readUntil("#");
            return forStat ? output.raw(expr) : expr;
        }

        function code() {
            input.forward(1);
            return readUntil("#");
        }
    }

    function TreeMaker() {
        this.root = {
            tag      : "HTML",
            attrs    : {},
            children : []
        };
        this.stack = [ this.root ];
    };
    TreeMaker.prototype = {
        top: function() {
            return this.stack[this.stack.length - 1];
        },
        push: function(thing) {
            var tag = this.top();
            if (!tag.children)
                tag.children = [];
            tag.children.push(thing);
        },
        raw: function(txt) {
            txt = new String(txt);
            txt.$trusted = true;
            this.push(txt);
        },
        esc: function(txt) {
            this.push(txt);
        },
        tag: function(tagName, attrs, closed) {
            var tag = {
                tag: tagName,
                attrs: attrs
            };
            this.push(tag);
            if (!closed)
                this.stack.push(tag);
        },
        gat: function(tagName) {
            // XXX: tagName is kinda pointless, but we could throw some
            // errors on mismatch.
            this.stack.pop();
        }
    };

    return {
        parse     : parse,
        TreeMaker : TreeMaker,
        compile   : function(html, options) {
            var code = parse(html, options);
            code = "with(data){" + code + "}";
            var f = new Function("data", code);
            return function(data) {
                var tm = new TreeMaker();
                try {
                    f.call(tm, data);
                } catch(ex) {
                    console.log(ex);
                    console.log(ex.stack);
                }
                return tm.root;
            };
        }
    };

})();
