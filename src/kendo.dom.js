(function(f, define){
    define([ "./kendo.core" ], f);
})(function(){

var __meta__ = {
    id: "dom",
    name: "Virtual DOM",
    category: "framework",
    depends: [ "core" ],
    hidden: true
};

(function(kendo) {
    var Node = function() {
        this.node = null;
    };

    Node.prototype = {
        remove: function() {
            this.node.parentNode.removeChild(this.node);
        }
    };

    var Element = function(nodeName, attr, children) {
        this.nodeName = nodeName;

        this.attr = attr || {};

        this.children = children || [];
    };

    Element.prototype = new Node();

    Element.prototype.clone = function() {
        var children = [];
        for (var index = 0; index < this.children.length; index ++) {
            children[index] = this.children[index].clone();
        }

        return element(this.nodeName, kendo.deepExtend({}, this.attr), children);
    }

    Element.prototype.render = function(parent, cached) {
        var node;

        var index;

        var children = this.children;

        var length = children.length;

        if (!cached || cached.nodeName !== this.nodeName) {
            if (cached) {
                cached.remove();
            }

            node = document.createElement(this.nodeName);

            for (index = 0; index < length; index++) {
                children[index].render(node, null);
            }

            parent.appendChild(node);
        } else {
            node = cached.node;

            if (cached.children.length > length) {
                length = cached.children.length;
            }

            for (index = 0; index < length; index++) {
                var child = children[index];

                if (child) {
                    child.render(node, cached.children[index]);
                } else {
                    cached.children[index].remove();
                }
            }
        }

        var attr = this.attr;
        var attrName;

        for (attrName in attr) {
            if (!cached || attr[attrName] !== cached.attr[attrName]) {
                if (node[attrName] !== undefined) {
                    if (attrName !== "style") {
                        node[attrName] = attr[attrName];
                    } else {
                        var cssText = "";

                        var style = attr[attrName];

                        for (var key in style) {
                            cssText += key;
                            cssText += ": ";
                            cssText += style[key];
                            cssText += ";";
                        }

                        if (node.style.cssText !== cssText) {
                            node.style.cssText = cssText;
                        }
                    }
                } else {
                    node.setAttribute(attrName, attr[attrName]);
                }
            }
        }

        if (cached) {
            for (attrName in cached.attr) {
                if (attr[attrName] === undefined) {
                    if (node[attrName] !== undefined) {
                        if (attrName !== "style") {
                            node[attrName] = "";
                        } else {
                            node.style.cssText = "";
                        }
                    } else {
                        node.removeAttribute(attrName);
                    }
                }
            }
        }

        this.node = node;
    };

    var TextNode = function(nodeValue) {
        this.nodeValue = nodeValue;
    };

    TextNode.prototype = new Node();
    TextNode.prototype.nodeName = "#text";

    TextNode.prototype.clone = function() {
        return text(this.nodeValue);
    };

      TextNode.prototype.render = function(parent, cached) {
        var node;

        if (!cached || cached.nodeName !== this.nodeName) {
            if (cached) {
                cached.remove();
            }
            node = document.createTextNode(this.nodeValue);

            parent.appendChild(node);
        } else {
            node = cached.node;

            if (this.nodeValue !== cached.nodeValue) {
                node.nodeValue = this.nodeValue;
            }
        }

        this.node = node;
    };

    var HtmlNode = function(html) {
        this.html = html;
    };

    HtmlNode.prototype = {
       nodeName: "#html",
       remove: function() {
           for (var index = 0; index < this.nodes.length; index++) {
               this.nodes[index].parentNode.removeChild(this.nodes[index]);
           }
       },
       render: function(parent, cached) {
           if (!cached || cached.nodeName !== this.nodeName || cached.html !== this.html) {
               if (cached) {
                   cached.remove();
               }

               var lastChild = parent.lastChild;

               parent.insertAdjacentHTML("beforeend", this.html);

               this.nodes = [];

               for (var child = lastChild ? lastChild.nextSibling : parent.firstChild; child; child = child.nextSibling) {
                   this.nodes.push(child);
               }
           }
       }
    }

    var cache = {};
    var roots = [];

    function element(nodeName, attrs, children) {
        return new Element(nodeName, attrs, children);
    }

    function text(value) {
        return new TextNode(value);
    }

    function html(value) {
        return new HtmlNode(value);
    }

    function indexOf(array, item) {
        for (var index = 0, length = array.length; index < length; index++) {
            if (array[index] === item) {
                return index;
            }
        }

        return -1;
    }

    function render(root, children) {
        var id = indexOf(roots, root);

        if (id < 0) {
            id = roots.push(root) - 1;
        }

        var cachedChildren = cache[id] || [];

        var index;
        var length;

        for (index = 0, length = children.length; index < length; index++) {
           children[index].render(root, cachedChildren[index]);
        }

        for (index = length; index < cachedChildren.length; index++) {
            cachedChildren[index].remove();
        }

        cache[id] = children;
    }

    function parse(node, callback) {
        var result;

        if (node.nodeName === "#text") {
            result = text(node.nodeValue);
        } else {
            var children = [];

            for (var childNode = node.firstChild; childNode; childNode = childNode.nextSibling) {
                if (!callback || callback(childNode)) {
                    children[children.length] = parse(childNode, callback);
                }
            }

            var attributes = {};

            for (var index = 0, length = node.attributes.length; index < length; index ++) {
                var attribute = node.attributes[index];
                if (attribute.specified) {
                    var name = attribute.name;
                    if (name === "class") {
                        name = "className";
                    }
                    attributes[name] = attribute.value;
                }
            }

            result = element(node.nodeName.toLowerCase(), attributes, children);
        }

        result.node = node;
        return result;
    }

    function attach(node, tree) {
        var id = indexOf(roots, node);

        if (id < 0) {
            id = roots.push(node) - 1;
        }

        cache[id] = tree;
    }

    kendo.dom = {
        element: element,
        text: text,
        render: render,
        parse: parse,
        attach: attach,
        html: html
    };

    // HTML template -> JS that generates virtual DOM
    (function(){

        "use strict";

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
            "\\uFDF0-\\uFFFD"
        ];

        var NAME_CHAR = NAME_START_CHAR.concat([ "\\-", ".", "0-9", "\\u00B7", "\\u0300-\\u036F", "\\u203F-\\u2040" ]);

        var RX_OPENTAG = new RegExp("^<([" + NAME_START_CHAR.join("") + "][" + NAME_CHAR.join("") + "]*)");
        var RX_CLOSETAG = new RegExp("^</([" + NAME_START_CHAR.join("") + "][" + NAME_CHAR.join("") + "]*)");
        var RX_CLOSETAG_SKIP_WS = new RegExp("^[" + WHITESPACE_CHARS + "]*</([" + NAME_START_CHAR.join("") + "][" + NAME_CHAR.join("") + "]*)");

        var NO_CONTENT_TAGS = ",area,base,br,col,command,embed,hr,img,input,keygen,link,meta,param,source,track,wbr,";

        function emptyTag(tagname) {
            return NO_CONTENT_TAGS.indexOf("," + tagname.toLowerCase() + ",") >= 0;
        }

        function isWhitespace(ch) {
            return WHITESPACE_CHARS.indexOf(ch) >= 0;
        }

        function InputStream(text) {
            this.pos = 0;
            this.line = 1;
            this.col = 0;
            this.text = text;
            this.len = text.length;
        }

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
                return this.peek() === "";
            },
            forward: function(n) {
                while (n-- > 0) {
                    this.next();
                }
            },
            lookingAt: function(rx) {
                if (typeof rx == "string") {
                    return this.text.substr(this.pos, rx.length) == rx ? [ rx ] : null;
                }
                return rx.exec(this.text.substr(this.pos));
            },
            readWhile: function(pred) {
                var ret = "";
                while (!this.eof() && pred(this.peek())) {
                    ret += this.next();
                }
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
            get: function(){ return this.code; },
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
                for (var i in attrs) {
                    if (attrs.hasOwnProperty(i)) {
                        if (first) {
                            first = false;
                        } else {
                            ret += ", ";
                        }
                        ret += JSON.stringify(i) + " : " + attrs[i];
                    }
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
            options = $.extend({}, {
                noWhitespace  : true
            }, options);
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
                if (!emptyTag(tagName)) {
                    return output.gat(tagName);
                }
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
                        if (options.noWhitespace) {
                            input.skipWhitespace();
                        }
                        break;
                    }
                    attribute(attrs);
                }
                output.stat(output.tag(tagName, attrs, closed));
            }

            function attribute(attrs) {
                var attr = input.readWhile(function(ch){
                    if (ch == "#") {
                        croak("Code not supported in attribute names");
                    }
                    return !isWhitespace(ch) && "<>'\"/=".indexOf(ch) < 0;
                }), val = "";
                input.skipWhitespace();
                if (input.lookingAt("=")) {
                    input.next();
                    input.skipWhitespace();
                    if (input.lookingAt("'")) {
                        val = valueQuoted("'");
                    } else if (input.lookingAt('"')) {
                        val = valueQuoted('"');
                    } else {
                        val = valueUnquoted();
                    }
                }
                if (!val) {
                    val = '""';
                }
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
                    if (ch == "#") {
                        croak("Code not supported in unquoted attribute value");
                    }
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
            this.root = new Element("HTML");
            this.stack = [ this.root ];
        }
        TreeMaker.prototype = {
            top: function() {
                return this.stack[this.stack.length - 1];
            },
            push: function(thing) {
                this.top().children.push(thing);
            },
            raw: function(html) {
                this.push(new HtmlNode(html));
            },
            esc: function(txt) {
                this.push(new TextNode(txt));
            },
            tag: function(tagName, attrs, closed) {
                var tag = new Element(tagName, attrs);
                this.push(tag);
                if (!closed) {
                    this.stack.push(tag);
                }
            },
            gat: function(tagName) {
                this.stack.pop();
            }
        };

        kendo.dom.template = function(html, options) {
            var code = parse(html, options);

            code = "with(data){" + code + "}";

            var f = new Function("data", code);

            return function(data) {
                var tm = new TreeMaker();
                f.call(tm, data);
                return tm.root;
            };
        };

    })();

})(window.kendo);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
