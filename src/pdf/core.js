(function(f, define){
    define([ "../kendo.core" ], f);
})(function(){

(function(global, undefined){

    "use strict";

    /* jshint eqnull:true */
    /* global console,require */ // temporary

    var NL = "\n";

    var FONT_RESOURCE_COUNTER = 0;
    var GS_RESOURCE_COUNTER = 0;
    var X_RESOURCE_COUNTER = 0;

    var STANDARD_FONTS = [
        "Times-Roman",
        "Times-Bold",
        "Times-Italic",
        "Times-BoldItalic",
        "Helvetica",
        "Helvetica-Bold",
        "Helvetica-Oblique",
        "Helvetica-BoldOblique",
        "Courier",
        "Courier-Bold",
        "Courier-Oblique",
        "Courier-BoldOblique",
        "Symbol",
        "ZapfDingbats"
    ];

    PDF.TEXT_RENDERING_MODE = {
        fill           : 0,
        stroke         : 1,
        fillAndStroke  : 2,
        invisible      : 3,
        fillAndClip    : 4,
        strokeAndClip  : 5,
        fillStrokeClip : 6,
        clip           : 7
    };

    function makeOutput() {
        var offset = 0, indentLevel = 0, output = "";
        function out() {
            for (var i = 0; i < arguments.length; ++i) {
                var x = arguments[i];
                if (x === undefined) {
                    throw new Error("Cannot output undefined to PDF");
                }
                else if (x instanceof PDFValue) {
                    x.beforeRender(out);
                    x.render(out);
                }
                else if (isArray(x)) {
                    renderArray(x, out);
                }
                else if (isDate(x)) {
                    renderDate(x, out);
                }
                else {
                    if (typeof x == "number") {
                        if (isNaN(x)) {
                            throw new Error("Cannot output NaN to PDF");
                        }
                        // make sure it doesn't end up in exponent notation.
                        if (x != Math.floor(x)) {
                            x = x.toFixed(7).replace(/0+$/, "");
                        }
                    }
                    x += "";
                    output += x;
                    offset += x.length;
                }
            }
            return output;
        }
        out.withIndent = function(f) {
            ++indentLevel;
            f(out);
            --indentLevel;
        };
        out.indent = function() {
            if (offset > 0) out(NL);
            out(pad("", indentLevel * 2, " "));
            out.apply(null, arguments);
        };
        out.offset = function() {
            return offset;
        };
        out.toString = function() {
            return output;
        };
        return out;
    }

    function wrapObject(value, id) {
        var beforeRender = value.beforeRender;
        var renderValue = value.render;

        value.beforeRender = function(){};

        value.render = function(out) {
            out(id, " 0 R");
        };

        value.renderFull = function(out) {
            value._offset = out.offset();
            out(id, " 0 obj ");
            beforeRender.call(value, out);
            renderValue.call(value, out);
            out(" endobj");
        };
    }

    function PDF() {
        var self = this;
        var out = makeOutput();
        var objcount = 0;
        var objects = [];

        self.attach = function(value) {
            if (objects.indexOf(value) < 0) {
                wrapObject(value, ++objcount);
                objects.push(value);
            }
            return value;
        };

        self.FONTS = {};
        self.IMAGES = {};

        var catalog = self.attach(new PDFCatalog());
        var pageTree = self.attach(new PDFPageTree());
        catalog.setPages(pageTree);

        self.addPage = function() {
            var content = new PDFStream(makeOutput());
            var page = new PDFPage(self, {
                Contents : self.attach(content),
                Parent   : pageTree
            });
            page._content = content;
            pageTree.addPage(self.attach(page));

            // canvas-like coord. system.  (0,0) is upper-left.
            // text must be vertically mirorred before drawing.
            // XXX: configurable page size.
            page.transform(1, 0, 0, -1, 0, mm2pt(297));

            return page;
        };

        self.render = function() {
            var i;
            /// file header
            out("%PDF-1.4", NL);

            // the spec recommends outputting 4 bytes >= 128
            // so that various apps recognize it as a binary file.
            out("%\x80\x81\x82\x83", NL);

            /// file body
            for (i = 0; i < objects.length; ++i) {
                objects[i].renderFull(out);
                out(NL, NL);
            }

            /// cross-reference table
            var xrefOffset = out.offset();
            out("xref", NL, 0, " ", objects.length, NL);
            out("0000000000 65535 f ", NL);
            for (i = 0; i < objects.length; ++i) {
                out(zeropad(objects[i]._offset, 10), " 00000 n ", NL);
            }
            out(NL);

            /// trailer
            out("trailer", NL);
            out(new PDFDictionary({
                Size: objects.length,
                Root: catalog
            }), NL, NL);

            /// end
            out("startxref", NL, xrefOffset, NL);
            out("%%EOF", NL);

            return out+"";
        };
    }

    var FONT_CACHE = {};
    STANDARD_FONTS.forEach(function(name){
        FONT_CACHE[name] = true;
    });

    function loadBinary(url, cont) {
        if (global.process) { // XXX: temporary
            require("fs").readFile(url, { encoding: "binary" }, function(err, data){
                data = data.toString("binary");
                cont(data);
            });
            return;
        }
        var req = new XMLHttpRequest();
        req.open('GET', url, true);
        req.overrideMimeType("text/plain; charset=x-user-defined");
        req.onload = function() {
            cont(req.responseText);
        };
        req.send(null);
    }

    function loadFont(url, cont) {
        var font = FONT_CACHE[url];
        if (font) {
            cont(font);
        } else {
            loadBinary(url, function(data){
                var font = new PDF.TTFFont(data);
                FONT_CACHE[url] = font;
                cont(font);
            });
        }
    }

    var IMAGE_CACHE = {};

    function loadImage(url, cont) {
        var img = IMAGE_CACHE[url];
        if (img) {
            cont(img);
        } else {
            loadBinary(url, function(data){
                data = BinaryStream(data);
                data.offset(0);
                if (data.readShort() == 0xFFD8 && data.readShort() == 0xFFE0 &&
                    (data.skip(2), data.readString(4)) == "JFIF")
                {
                    var img = new PDF.JPEG(data);
                    IMAGE_CACHE[url] = img;
                    cont(img);
                }
            });
        }
    }

    function manyLoader(loadOne) {
        return function(urls, callback) {
            var n = urls.length, i = n;
            if (n == 0) {
                return callback();
            }
            while (i-- > 0) {
                loadOne(urls[i], function(){
                    if (--n == 0) {
                        callback();
                    }
                });
            }
        };
    }

    PDF.loadFonts = manyLoader(loadFont);
    PDF.loadImages = manyLoader(loadImage);

    PDF.prototype = {
        loadFonts: PDF.loadFonts,
        loadImages: PDF.loadImages,

        getFont: function(url) {
            var font = this.FONTS[url];
            if (!font) {
                if (STANDARD_FONTS.indexOf(url) >= 0) {
                    font = this.attach(new PDFStandardFont(url));
                } else {
                    font = FONT_CACHE[url];
                    if (!font) {
                        throw new Error("Font " + url + " has not been loaded");
                    }
                    font = this.attach(new PDFFont(this, font));
                }
                this.FONTS[url] = font;
            }
            return font;
        },

        getImage: function(url) {
            var img = this.IMAGES[url];
            if (!img) {
                img = IMAGE_CACHE[url];
                if (!img) {
                    throw new Error("Image " + url + " has not been loaded");
                }
                img = this.IMAGES[url] = this.attach(new PDFImage(img));
            }
            return img;
        },

        getOpacityGS: function(opacity, forStroke) {
            var id = parseFloat(opacity).toFixed(3);
            opacity = parseFloat(id);
            id += forStroke ? "S" : "F";
            var cache = this._opacityGSCache || (this._opacityGSCache = {});
            var gs = cache[id];
            if (!gs) {
                var props = {
                    Type: PDFName.get("ExtGState")
                };
                if (forStroke) {
                    props.CA = opacity;
                } else {
                    props.ca = opacity;
                }
                gs = this.attach(new PDFDictionary(props));
                gs._resourceName = PDFName.get("GS" + (++GS_RESOURCE_COUNTER));
                cache[id] = gs;
            }
            return gs;
        }
    };

    /* -----[ utils ]----- */

    function pad(str, len, ch) {
        while (str.length < len) {
            str = ch + str;
        }
        return str;
    }

    function zeropad(n, len) {
        return pad(n+"", len, "0");
    }

    function hasOwnProperty(obj, key) {
        return Object.prototype.hasOwnProperty.call(obj, key);
    }

    function mmul(a, b) {
        var a1 = a[0], b1 = a[1], c1 = a[2], d1 = a[3], e1 = a[4], f1 = a[5];
        var a2 = b[0], b2 = b[1], c2 = b[2], d2 = b[3], e2 = b[4], f2 = b[5];
        return [
            a1*a2 + b1*c2,          a1*b2 + b1*d2,
            c1*a2 + d1*c2,          c1*b2 + d1*d2,
            e1*a2 + f1*c2 + e2,     e1*b2 + f1*d2 + f2
        ];
    }

    function utf16_be_encode(string) {
        var i = string.length, k = 0, c, ret = "";
        function add(c) {
            ret += String.fromCharCode(c >> 8) + String.fromCharCode(c & 0xFF);
        }
        while (--i >= 0) {
            c = string.charCodeAt(k++);
            if (c <= 0xFFFF) {
                add(c);
            } else {
                add( ((c - 0x10000) >> 10) + 0xD800 );
                add( ((c - 0x10000) & 0x3FF) + 0xD800 );
            }
        }
        return ret;
    }

    var isArray = Array.isArray || function(obj) {
        return obj instanceof Array;
    };

    function isDate(obj) {
        return obj instanceof Date;
    }

    function renderArray(a, out) {
        out("[");
        if (a.length > 0) {
            out.withIndent(function(){
                for (var i = 0; i < a.length; ++i) {
                    out.indent(a[i]);
                }
            });
            out.indent();
        }
        out("]");
    }

    function renderDate(date, out) {
        out("(D:",
            zeropad(date.getUTCFullYear(), 4),
            zeropad(date.getUTCMonth() + 1, 2),
            zeropad(date.getUTCDate(), 2),
            zeropad(date.getUTCHours(), 2),
            zeropad(date.getUTCMinutes(), 2),
            zeropad(date.getUTCSeconds(), 2),
            "Z)");
    }

    function mm2pt(mm) {
        return mm * (72/25.4);
    }

    /* -----[ PDF basic objects ]----- */

    function PDFValue(){}

    PDFValue.prototype.beforeRender = function(){};

    function defclass(Ctor, proto, Base) {
        if (!Base) {
            Base = PDFValue;
        }
        Ctor.prototype = new Base();
        for (var i in proto) {
            if (hasOwnProperty(proto, i)) {
                Ctor.prototype[i] = proto[i];
            }
        }
        return Ctor;
    }

    /// strings

    var PDFString = defclass(function PDFString(value){
        this.value = value;
    }, {
        render: function(out) {
            //out("(\xFE\xFF", utf16_be_encode(this.escape()), ")");
            var txt = "";
            for (var i = 0; i < this.value.length; ++i) {
                txt += String.fromCharCode(this.value.charCodeAt(i) & 0xFF);
            }
            out("(", txt, ")");
        },
        escape: function() {
            return this.value.replace(/([\(\)\\])/g, "\\$1");
        },
        toString: function() {
            return this.value;
        }
    });

    var PDFHexString = defclass(function PDFHexString(value){
        this.value = value;
    }, {
        render: function(out) {
            out("<");
            for (var i = 0; i < this.value.length; ++i) {
                out(zeropad(this.value.charCodeAt(i).toString(16), 4));
            }
            out(">");
        }
    }, PDFString);

    /// names

    var PDFName = defclass(function PDFName(name) {
        this.name = name;
    }, {
        render: function(out) {
            out("/" + this.escape());
        },
        escape: function() {
            return this.name.replace(/[^\x21-\x7E]/g, function(c){
                return "#" + zeropad(c.charCodeAt(0).toString(16), 2);
            });
        },
        toString: function() {
            return this.name;
        }
    });

    PDFName.cache = {};
    PDFName.get = function(name) {
        if (hasOwnProperty(PDFName.cache, name)) {
            return PDFName.cache[name];
        }
        return (PDFName.cache[name] = new PDFName(name));
    };

    /// dictionary

    var PDFDictionary = defclass(function PDFDictionary(props) {
        this.props = props;
    }, {
        render: function(out) {
            var props = this.props, empty = true;
            out("<<");
            out.withIndent(function(){
                for (var i in props) {
                    if (hasOwnProperty(props, i) && !/^_/.test(i)) {
                        empty = false;
                        out.indent(PDFName.get(i), " ", props[i]);
                    }
                }
            });
            if (!empty) out.indent();
            out(">>");
        }
    });

    /// streams

    var PDFStream = defclass(function PDFStream(data, props) {
        this.data = data || "";
        this.props = props || {};
    }, {
        render: function(out) {
            this.data += "";
            if (this.props.Length == null) {
                this.props.Length = this.data.length;
            }
            out(new PDFDictionary(this.props),
                " stream", NL,
                this.data, NL,
                "endstream");
        }
    });

    /// catalog

    var PDFCatalog = defclass(function PDFCatalog(props){
        props = this.props = props || {};
        props.Type = PDFName.get("Catalog");
    }, {
        setPages: function(pagesObj) {
            this.props.Pages = pagesObj;
        }
    }, PDFDictionary);

    /// page tree

    var PDFPageTree = defclass(function PDFPageTree(){
        this.props = {
            Type  : PDFName.get("Pages"),
            Kids  : [],
            Count : 0,

            MediaBox : [ 0, 0, mm2pt(210), mm2pt(297) ]
        };
    }, {
        addPage: function(pageObj) {
            this.props.Kids.push(pageObj);
            this.props.Count++;
        }
    }, PDFDictionary);

    /// images

    var PDFImage = defclass(function PDFImage(img){
        this.data = img.data;
        this.props = {
            Type             : PDFName.get("XObject"),
            Subtype          : PDFName.get("Image"),
            BitsPerComponent : img.bits,
            Height           : img.height,
            Width            : img.width,
            Filter           : PDFName.get("DCTDecode"),
            ColorSpace       : PDFName.get({
                1: "DeviceGray",
                3: "DeviceRGB",
                4: "DeviceCMYK"
            }[img.channels])
        };
        this._resourceName = PDFName.get("I" + (++X_RESOURCE_COUNTER));
    }, {}, PDFStream);

    /// standard fonts

    var PDFStandardFont = defclass(function PDFStandardFont(name){
        this.props = {
            Type     : PDFName.get("Font"),
            Subtype  : PDFName.get("Type1"),
            BaseFont : PDFName.get(name)
        };
        this._resourceName = PDFName.get("F" + (++FONT_RESOURCE_COUNTER));
    }, {
        encodeText: function(str) {
            return new PDFString(str+"");
        }
    }, PDFDictionary);

    /// TTF fonts

    var PDFFont = defclass(function PDFFont(pdf, font, props){
        props = this.props = props || {};
        props.Type = PDFName.get("Font");
        props.Subtype = PDFName.get("Type0");
        props.Encoding = PDFName.get("Identity-H");

        this._pdf = pdf;
        this._font = font;
        this._sub = font.makeSubset();
        this._resourceName = PDFName.get("F" + (++FONT_RESOURCE_COUNTER));

        var head = font.head;

        this.name = font.psName;
        var scale = this.scale = font.scale;
        this.bbox = [
            head.xMin * scale,
            head.yMin * scale,
            head.xMax * scale,
            head.yMax * scale
        ];

        this.italicAngle = font.post.italicAngle;
        this.ascent = font.ascent * scale;
        this.descent = font.descent * scale;
        this.lineGap = font.lineGap * scale;
        this.capHeight = font.os2.capHeight || this.ascent;
        this.xHeight = font.os2.xHeight || 0;
        this.stemV = 0;

        this.familyClass = (font.os2.familyClass || 0) >> 8;
        this.isSerif = this.familyClass >= 1 && this.familyClass <= 7;
        this.isScript = this.familyClass == 10;

        this.flags = ((font.post.isFixedPitch ? 1 : 0) |
                      (this.isSerif ? 1 << 1 : 0) |
                      (this.isScript ? 1 << 3 : 0) |
                      (this.italicAngle != 0 ? 1 << 6 : 0) |
                      (1 << 5));
    }, {
        encodeText: function(text) {
            return new PDFHexString(this._sub.encodeText(text+""));
        },
        beforeRender: function() {
            var self = this;
            var font = self._font;
            var sub = self._sub;

            // write the TTF data
            var data = sub.render();
            var fontStream = new PDFStream(data, {
                Length1: data.length
            });

            if (global.process) { // XXX: temporary
                require("fs").writeFileSync("/tmp/x.ttf", data, { encoding: "binary" });
            }

            var descriptor = self._pdf.attach(new PDFDictionary({
                Type         : PDFName.get("FontDescriptor"),
                FontName     : PDFName.get(self._sub.psName),
                FontBBox     : self.bbox,
                Flags        : self.flags,
                StemV        : self.stemV,
                ItalicAngle  : self.italicAngle,
                Ascent       : self.ascent,
                Descent      : self.descent,
                CapHeight    : self.capHeight,
                XHeight      : self.xHeight,
                FontFile2    : self._pdf.attach(fontStream)
            }));

            var cmap = sub.ncid2ogid;
            var firstChar = sub.firstChar;
            var lastChar = sub.lastChar;
            var charWidths = [];
            (function loop(i, chunk){
                if (i <= lastChar) {
                    var gid = cmap[i];
                    if (gid == null) {
                        loop(i + 1);
                    } else {
                        if (!chunk) charWidths.push(i, chunk = []);
                        chunk.push(self._font.widthOfGlyph(gid));
                        loop(i + 1, chunk);
                    }
                }
            })(firstChar);

            // As if two dictionaries weren't enough, we need another
            // one, the "descendant font".  Only that one can be of
            // Subtype CIDFontType2.  PDF is the X11 of document
            // formats: portable but full of legacy that nobody cares
            // about anymore.

            var descendant = new PDFDictionary({
                Type: PDFName.get("Font"),
                Subtype: PDFName.get("CIDFontType2"),
                BaseFont: PDFName.get(self._sub.psName),
                CIDSystemInfo: new PDFDictionary({
                    Registry   : new PDFString("Adobe"),
                    Ordering   : new PDFString("Identity"),
                    Supplement : 0
                }),
                FontDescriptor: descriptor,
                FirstChar: firstChar,
                LastChar: lastChar,
                DW: Math.round(self._font.widthOfGlyph(0)),
                W: charWidths,
                CIDToGIDMap: self._pdf.attach(self._makeCidToGidMap())
            });

            var dict = self.props;
            dict.BaseFont = PDFName.get(self._sub.psName);
            dict.DescendantFonts = [ self._pdf.attach(descendant) ];

            // Compute the ToUnicode map so that apps can extract
            // meaningful text from the PDF.
            var unimap = new PDFToUnicodeCmap(firstChar, lastChar, sub.subset);
            var unimapStream = new PDFStream(makeOutput());
            unimapStream.data(unimap);
            dict.ToUnicode = self._pdf.attach(unimapStream);
        },
        _makeCidToGidMap: function() {
            return new PDFStream(this._sub.cidToGidMap());
        }
    }, PDFDictionary);

    var PDFToUnicodeCmap = defclass(function PDFUnicodeCMap(firstChar, lastChar, map){
        this.firstChar = firstChar;
        this.lastChar = lastChar;
        this.map = map;
    }, {
        render: function(out) {
            out.indent("/CIDInit /ProcSet findresource begin");
            out.indent("12 dict begin");
            out.indent("begincmap");
            out.indent("/CIDSystemInfo <<");
            out.indent("  /Registry (Adobe)");
            out.indent("  /Ordering (UCS)");
            out.indent("  /Supplement 0");
            out.indent(">> def");
            out.indent("/CMapName /Adobe-Identity-UCS def");
            out.indent("/CMapType 2 def");
            out.indent("1 begincodespacerange");
            out.indent("  <0000><ffff>");
            out.indent("endcodespacerange");

            var self = this;
            out.indent(self.lastChar - self.firstChar + 1, " beginbfchar");
            out.withIndent(function(){
                for (var code = self.firstChar; code <= self.lastChar; ++code) {
                    var unicode = self.map[code];
                    out.indent("<", zeropad(code.toString(16), 4), ">",
                               "<", zeropad(unicode.toString(16), 4), ">");
                }
            });
            out.indent("endbfchar");

            out.indent("endcmap");
            out.indent("CMapName currentdict /CMap defineresource pop");
            out.indent("end");
            out.indent("end");
        }
    });

    /// page object

    var PDFPage = defclass(function PDFPage(pdf, props){
        this._pdf = pdf;
        this._rcount = 0;
        this._textMode = false;
        this._fontResources = {};
        this._gsResources = {};
        this._xResources = {};

        this._font = null;
        this._fontSize = null;

        props = this.props = props || {};
        props.Type = PDFName.get("Page");
        props.ProcSet = [
            PDFName.get("PDF"),
            PDFName.get("Text"),
            PDFName.get("ImageB"),
            PDFName.get("ImageC"),
            PDFName.get("ImageI")
        ];
        props.Resources = new PDFDictionary({
            Font      : new PDFDictionary(this._fontResources),
            ExtGState : new PDFDictionary(this._gsResources),
            XObject   : new PDFDictionary(this._xResources)
        });
    }, {
        _out: function() {
            this._content.data.apply(null, arguments);
        },
        transform: function(a, b, c, d, e, f) {
            this._out(a, " ", b, " ", c, " ", d, " ", e, " ", f, " cm", NL);
        },
        translate: function(dx, dy) {
            this.transform(1, 0, 0, 1, dx, dy);
        },
        scale: function(sx, sy) {
            this.transform(sx, 0, 0, sy, 0, 0);
        },
        rotate: function(angle) {
            var cos = Math.cos(angle), sin = Math.sin(angle);
            this.transform(cos, sin, -sin, cos, 0, 0);
        },
        beginText: function() {
            this._textMode = true;
            this._out("BT", NL);
        },
        endText: function() {
            this._textMode = false;
            this._out(NL, "ET", NL);
        },
        _requireTextMode: function() {
            if (!this._textMode) {
                throw new Error("Text mode required; call page.beginText() first");
            }
        },
        _requireFont: function() {
            if (!this._font) {
                throw new Error("No font selected; call page.setFont() first");
            }
        },
        setFont: function(font, size) {
            this._requireTextMode();
            if (font == null) {
                font = this._font;
            } else if (!(font instanceof PDFFont)) {
                font = this._pdf.getFont(font);
            }
            if (size == null) {
                size = this._fontSize;
            }
            this._fontResources[font._resourceName] = font;
            this._font = font;
            this._fontSize = size;
            this._out(font._resourceName, " ", size, " Tf", NL);
        },
        setTextLeading: function(size) {
            this._requireTextMode();
            this._out(size, " TL", NL);
        },
        setTextRenderingMode: function(mode) {
            this._requireTextMode();
            this._out(mode, " Tr", NL);
        },
        showText: function(text) {
            this._requireFont();
            this._out(this._font.encodeText(text), " Tj", NL);
        },
        showTextNL: function(text) {
            this._requireFont();
            this._out(this._font.encodeText(text), " '", NL);
        },
        setStrokeColor: function(r, g, b) {
            this._out(r, " ", g, " ", b, " RG", NL);
        },
        setStrokeOpacity: function(opacity) {
            var gs = this._pdf.getOpacityGS(opacity, true);
            this._gsResources[gs._resourceName] = gs;
            this._out(gs._resourceName, " gs", NL);
        },
        setFillColor: function(r, g, b) {
            this._out(r, " ", g, " ", b, " rg", NL);
        },
        setFillOpacity: function(opacity) {
            var gs = this._pdf.getOpacityGS(opacity, false);
            this._gsResources[gs._resourceName] = gs;
            this._out(gs._resourceName, " gs", NL);
        },
        setDashPattern: function(dashArray, dashPhase) {
            this._out(dashArray, " ", dashPhase, " d", NL);
        },
        setLineWidth: function(width) {
            this._out(width, " w", NL);
        },
        setLineCap: function(lineCap) {
            this._out(lineCap, " J", NL);
        },
        setLineJoin: function(lineJoin) {
            this._out(lineJoin, " j", NL);
        },
        setMitterLimit: function(mitterLimit) {
            this._out(mitterLimit, " M", NL);
        },
        save: function() {
            this._out("q", NL);
        },
        restore: function() {
            this._out("Q", NL);
        },

        // paths
        moveTo: function(x, y) {
            this._out(x, " ", y, " m", NL);
        },
        lineTo: function(x, y) {
            this._out(x, " ", y, " l", NL);
        },
        bezier: function(x1, y1, x2, y2, x3, y3) {
            this._out(x1, " ", y1, " ", x2, " ", y2, " ", x3, " ", y3, " c", NL);
        },
        bezier1: function(x1, y1, x3, y3) {
            this._out(x1, " ", y1, " ", x3, " ", y3, " y", NL);
        },
        bezier2: function(x2, y2, x3, y3) {
            this._out(x2, " ", y2, " ", x3, " ", y3, " v", NL);
        },
        close: function() {
            this._out("h", NL);
        },
        rect: function(x, y, w, h) {
            this._out(x, " ", y, " ", w, " ", h, " re", NL);
        },
        ellipse: function(x, y, rx, ry) {
            function X(v) { return x + v; }
            function Y(v) { return y + v; }

            // how to get to the "magic number" is explained here:
            // http://www.whizkidtech.redprince.net/bezier/circle/kappa/
            var k = 0.5522847498307936;

            this.moveTo(X(0), Y(ry));
            this.bezier(
                X(rx * k) , Y(ry),
                X(rx)     , Y(ry * k),
                X(rx)     , Y(0)
            );
            this.bezier(
                X(rx)     , Y(-ry * k),
                X(rx * k) , Y(-ry),
                X(0)      , Y(-ry)
            );
            this.bezier(
                X(-rx * k) , Y(-ry),
                X(-rx)     , Y(-ry * k),
                X(-rx)     , Y(0)
            );
            this.bezier(
                X(-rx)     , Y(ry * k),
                X(-rx * k) , Y(ry),
                X(0)       , Y(ry)
            );
        },
        circle: function(x, y, r) {
            this.ellipse(x, y, r, r);
        },
        stroke: function() {
            this._out("S", NL);
        },
        clip: function() {
            this._out("W", NL);
        },
        closeStroke: function() {
            this._out("s", NL);
        },
        fill: function() {
            this._out("f", NL);
        },
        fillStroke: function() {
            this._out("B", NL);
        },
        drawImage: function(url) {
            var img = this._pdf.getImage(url);
            this._xResources[img._resourceName] = img;
            this._out(img._resourceName, " Do", NL);
        }
    }, PDFDictionary);

    function BinaryStream(data) {
        var offset = 0;
        if (data == null) data = "";

        function eof() {
            return !data.charAt(offset);
        }
        function readByte() {
            return data.charCodeAt(offset++) & 0xFF;
        }
        function writeByte(b) {
            var ch = String.fromCharCode(b & 0xFF);
            if (offset < data.length) {
                // overwrite
                data = data.substr(0, offset) + ch + data.substr(offset + 1);
            } else {
                data += ch;
            }
            offset++;
        }
        function readShort() {
            return (readByte() << 8) | readByte();
        }
        function writeShort(w) {
            writeByte(w >> 8);
            writeByte(w);
        }
        function readShort_() {
            var w = readShort();
            return w >= 0x8000 ? w - 0x10000 : w;
        }
        function writeShort_(w) {
            writeShort(w < 0 ? w + 0x10000 : w);
        }
        function readLong() {
            return (readShort() * 0x10000) + readShort();
        }
        function writeLong(w) {
            writeShort((w >>> 16) & 0xFFFF);
            writeShort(w & 0xFFFF);
        }
        function readLong_() {
            var w = readLong();
            return w >= 0x80000000 ? w - 0x100000000 : w;
        }
        function writeLong_(w) {
            writeLong(w < 0 ? w + 0x100000000 : w);
        }
        function readFixed() {
            return readLong() / 0x10000;
        }
        function writeFixed(f) {
            writeLong(Math.round(f * 0x10000));
        }
        function readFixed_() {
            return readLong_() / 0x10000;
        }
        function writeFixed_(f) {
            writeLong_(Math.round(f * 0x10000));
        }
        function read(len) {
            var ret = [];
            while (len-- > 0)
                ret.push(readByte());
            return ret;
        }
        function write(bytes) {
            if (typeof bytes == "string")
                return writeString(bytes);
            for (var i = 0; i < bytes.length; ++i) {
                writeByte(bytes[i]);
            }
        }
        function readString(len) {
            var ret = "";
            while (len-- > 0) {
                ret += String.fromCharCode(readByte());
            }
            return ret;
        }
        function writeString(str) {
            for (var i = 0; i < str.length; ++i) {
                writeByte(str.charCodeAt(i));
            }
        }
        return {
            eof         : eof,
            readByte    : readByte,
            writeByte   : writeByte,
            readShort   : readShort,
            writeShort  : writeShort,
            readLong    : readLong,
            writeLong   : writeLong,
            readFixed   : readFixed,
            writeFixed  : writeFixed,

            // signed numbers.
            readShort_  : readShort_,
            writeShort_ : writeShort_,
            readLong_   : readLong_,
            writeLong_  : writeLong_,
            readFixed_  : readFixed_,
            writeFixed_ : writeFixed_,

            read        : read,
            write       : write,
            readString  : readString,
            writeString : writeString,

            offset: function(pos) {
                if (pos != null) offset = pos;
                return offset;
            },

            skip: function(nbytes) {
                offset += nbytes;
            },

            get: function() { return data },

            toString: function() { return data },

            length: function() { return data.length },

            slice: function(start, length) {
                return data.substr(start, length);
            },

            times: function(n, reader) {
                for (var ret = []; n > 0; --n)
                    ret.push(reader());
                return ret;
            },

            saveExcursion: function(f) {
                var pos = offset;
                try {
                    return f();
                } finally {
                    offset = pos;
                }
            }
        };
    }

    function parseFontDef(fontdef) {
        // XXX: this is very crude for now.  Proper parsing is quite involved.
        var rx = /^\s*((normal|italic)\s+)?((normal|small-caps)\s+)?((normal|bold)\s+)?(([0-9.]+)(px|pt))(\/(([0-9.]+)(px|pt)))?\s+(.*?)\s*$/i;
        var m = rx.exec(fontdef);
        if (!m) {
            return { fontSize: 12, fontFamily: "sans-serif" };
        }
        return {
            italic     : m[2] && m[2].toLowerCase() == "italic",
            variant    : m[4],
            bold       : m[6] && m[6].toLowerCase() == "bold",
            fontSize   : m[8] ? parseInt(m[8], 10) : 12,
            lineHeight : m[12] ? parseInt(m[12], 10) : null,
            fontFamily : m[14].split(/\s*,\s*/g)
        };
    }

    function getFontURL(style) {
        function mkFamily(name) {
            if (style.bold) name += "|bold";
            if (style.italic) name += "|italic";
            return name.toLowerCase();
        }
        var fontFamily = style.fontFamily;
        var name, url;
        if (fontFamily instanceof Array) {
            for (var i = 0; i < fontFamily.length; ++i) {
                name = mkFamily(fontFamily[i]);
                url = FONT_MAPPINGS[name];
                if (url) return url;
            }
        } else {
            url = FONT_MAPPINGS[fontFamily.toLowerCase()];
        }
        if (!url) url = "Times-Roman";
        return url;
    }

    var FONT_MAPPINGS = {
        "serif"                  : "Times-Roman",
        "serif|bold"             : "Times-Bold",
        "serif|italic"           : "Times-Italic",
        "serif|bold|italic"      : "Times-BoldItalic",
        "sans-serif"             : "Helvetica",
        "sans-serif|bold"        : "Helvetica-Bold",
        "sans-serif|italic"      : "Helvetica-Oblique",
        "sans-serif|bold|italic" : "Helvetica-BoldOblique",
        "monospace"              : "Courier",
        "monospace|bold"         : "Courier-Bold",
        "monospace|italic"       : "Courier-Oblique",
        "monospace|bold|italic"  : "Courier-BoldOblique",
    };

    function defineFont(name, url) {
        if (arguments.length == 1) {
            for (var i in name) {
                defineFont(i, name[i]);
            }
        } else {
            name = name.toLowerCase();
            FONT_MAPPINGS[name] = url;
        }
    }

    /// exports.

    PDF.BinaryStream = BinaryStream;
    PDF.defineFont = defineFont;
    PDF.parseFontDef = parseFontDef;
    PDF.getFontURL = getFontURL;

    global.kendo.PDF = PDF;

})(Function("return this")());

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
