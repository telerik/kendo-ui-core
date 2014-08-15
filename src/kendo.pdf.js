(function(undefined, global){

    "use strict";

    var kendo = global.kendo || (global.kendo = {});

    /* jshint eqnull:true */
    /* global console,require */ // temporary

    var NL = "\n";

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

    function PDF() {
        var self = this;
        var out = makeOutput();
        var objcount = 0;
        var objects = [];

        self.attach = function(value) {
            var obj = new PDFObject(value, ++objcount);
            objects.push(obj);
            return obj;
        };

        var fonts = {};
        for (var i in self.FONTS) {
            if (hasOwnProperty(self.FONTS, i)) {
                fonts[i] = self.attach(self.FONTS[i]);
            }
        }
        self.FONTS = fonts;

        var catalog = self.attach(new PDFCatalog());
        var pageTree = self.attach(new PDFPageTree());
        catalog.value.setPages(pageTree);

        self.addPage = function() {
            var content = new PDFStream(makeOutput());
            var page = new PDFPage(self, {
                Contents : self.attach(content),
                Parent   : pageTree
            });
            page._content = content;
            pageTree.value.addPage(self.attach(page));
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
                out(zeropad(objects[i].offset, 10), " 00000 n ", NL);
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

    PDF.prototype = {

        /* -----[ TTF fonts ]----- */

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

    function utf8_encode(string) {
        var i = string.length, k = 0, c, ret = "";
        while (--i >= 0) {
            c = string.charCodeAt(k++);
            // unicode support
            if (c < 0x80) {
                // one byte - ASCII
                ret += String.fromCharCode(c);
            } else if (c < 0x800) {
                // two bytes
                ret += String.fromCharCode(0xC0 | ((c >>> 6) & 0x1F));
                ret += String.fromCharCode(0x80 | (c & 0x3F));
            } else if (c < 0x10000) {
                // three bytes
                ret += String.fromCharCode(0xE0 | ((c >>> 12) & 0x0F));
                ret += String.fromCharCode(0x80 | ((c >>> 6) & 0x3F));
                ret += String.fromCharCode(0x80 | (c & 0x3F));
            } else if (c < 0x110000) {
                // four bytes
                ret += String.fromCharCode(0xF0 | ((c >>> 18) & 0x03));
                ret += String.fromCharCode(0x80 | ((c >>> 12) & 0x3F));
                ret += String.fromCharCode(0x80 | ((c >>> 6) & 0x3F));
                ret += String.fromCharCode(0x80 | (c & 0x3F));
            }
        }
        return ret;
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
            out("(\xFE\xFF", utf16_be_encode(this.escape()), ")");
        },
        escape: function() {
            return this.value.replace(/([\(\)\\])/g, "\\$1");
        }
    });

    var PDFHexString = defclass(function PDFHexString(value){
        this.value = value;
    }, {
        render: function(out) {
            out("<");
            for (var i = 0; i < this.value.length; ++i) {
                out(" ", zeropad(this.value.charCodeAt(i).toString(16), 4));
            }
            out(" >");
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

    /// objects

    var PDFObject = defclass(function PDFObject(value, id) {
        this.value = value;
        this.id = id;
        this.offset = null;
    }, {
        render: function(out) {
            out(this.id, " 0 R");
        },
        renderFull: function(out) {
            this.offset = out.offset();
            out(this.id, " 0 obj ", this.value, " endobj");
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

    /// standard fonts

    var FONTS = PDF.prototype.FONTS = {};
    [
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
    ].forEach(function(name, i){
        FONTS[name] = new PDFDictionary({
            Type     : PDFName.get("Font"),
            Subtype  : PDFName.get("Type1"),
            BaseFont : PDFName.get(name)
        });
    });

    /// TTF fonts

    var PDFFont = defclass(function PDFFont(pdf, props){
        this._pdf = pdf;
        props = this.props = props || {};
        props.Type = PDFName.get("Font");
        props.Subtype = PDFName.get("Type0");
        props.Encoding = PDFName.get("Identity-H");
    }, {
        loadTTF: function(data) {
            var font = this._font = new PDF.TTFFont(data);
            this._sub = font.makeSubset();

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

            this.descriptor = this._pdf.attach(new PDFDictionary({
                Type         : PDFName.get("FontDescriptor"),
                FontName     : PDFName.get(this._sub.psName),
                FontBBox     : this.bbox,
                Flags        : this.flags,
                StemV        : this.stemV,
                ItalicAngle  : this.italicAngle,
                Ascent       : this.ascent,
                Descent      : this.descent,
                CapHeight    : this.capHeight,
                XHeight      : this.xHeight
            }));

            this.stream = this._pdf.attach(new PDFStream(makeOutput()));
            this.descriptor.value.props.FontFile2 = this.stream;
        },
        encodeText: function(text) {
            return this._sub.encodeText(text);
        },
        beforeRender: function() {
            // write the TTF data
            var self = this;
            var sub = self._sub;
            var data = sub.render();
            self.stream.value.data(data);
            self.stream.value.props.Length1 = data.length;

            var cmap = sub.cmap;
            var ids = Object.keys(cmap).sort(function(a, b){ return a - b }).map(parseFloat);
            var charWidths = ids.map(function(charId){
                return self._font.widthOfGlyph(cmap[charId]);
            });
            var firstChar = ids[0];
            var lastChar = ids[ids.length - 1];

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
                FontDescriptor: self.descriptor,
                FirstChar: firstChar,
                LastChar: lastChar,
                W: [ 1, charWidths ],
                CIDToGIDMap: PDFName.get("Identity")
            });

            var dict = self.props;
            dict.BaseFont = PDFName.get(self._sub.psName);
            dict.DescendantFonts = [ self._pdf.attach(descendant) ];

            // Compute the ToUnicode map so that apps can extract
            // meaningful text from the PDF.
            var unimap = new PDFToUnicodeCmap(ids, sub.subset);
            var unimapStream = new PDFStream(makeOutput());
            unimapStream.data(unimap);
            dict.ToUnicode = this._pdf.attach(unimapStream);
        }
    }, PDFDictionary);

    var PDFToUnicodeCmap = defclass(function PDFUnicodeCMap(ids, map){
        this.ids = ids;
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

            var ids = this.ids, map = this.map;
            out.indent(ids.length, " beginbfchar");
            out.withIndent(function(){
                ids.forEach(function(code){
                    var unicode = map[code];
                    out.indent("<", zeropad(code.toString(16), 4), ">",
                               "<", zeropad(unicode.toString(16), 4), ">");
                });
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
        this._fontsByName = {};

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
            Font: new PDFDictionary(this._fontResources),
            ExtGState: new PDFDictionary(this._gsResources)
        });
    }, {
        _out: function() {
            this._content.data.apply(null, arguments);
        },
        _transform: function(a, b, c, d, e, f) {
            this._out(a, " ", b, " ", c, " ", d, " ", e, " ", f, " cm", NL);
        },
        _beginText: function() {
            this._textMode = true;
            this._out("BT", NL);
        },
        _endText: function() {
            this._textMode = false;
            this._out(NL, "ET", NL);
        },
        _setStrokeColor: function(r, g, b) {
            this._out(r, " ", g, " ", b, " RG", NL);
        },
        _setFillColor: function(r, g, b) {
            this._out(r, " ", g, " ", b, " rg", NL);
        },
        _setDashPattern: function(dashArray, dashPhase) {
            this._out(dashArray, " ", dashPhase, " d", NL);
        },
        _setLineWidth: function(width) {
            this._out(width, " w", NL);
        },
        _setLineCap: function(lineCap) {
            this._out(lineCap, " J", NL);
        },
        _setLineJoin: function(lineJoin) {
            this._out(lineJoin, " j", NL);
        },
        _setMitterLimit: function(mitterLimit) {
            this._out(mitterLimit, " M", NL);
        },
        _saveContext: function() {
            this._out("q", NL);
        },
        _restoreContext: function() {
            this._out("Q", NL);
        },
        _getFontResource: function(fontName) {
            var name = this._fontsByName[fontName];
            if (!name) {
                name = this._fontsByName[fontName] = "F" + this._rcount++;
                this._fontResources[name] = this._pdf.FONTS[fontName];
            }
            return PDFName.get(name);
        },
        _getGSResource: function(props) {
            props.Type = "ExtGState";
            var gs = new PDFDictionary(props);
            var name = "GS" + this._rcount++;
            this._gsResources[name] = this._pdf.attach(gs);
            return PDFName.get(name);
        }
    }, PDFDictionary);

    /// exports.

    kendo.PDF = PDF;






    ///// DEBUG

    require("./kendo.pdf.ttf.js");

    var pdf = new PDF();

    var cyrillic = "Румы́нская кири́ллица использовалась для записи румынского языка до официальной замены латиницей в начале 1860-х годов. Варианты кириллического алфавита, употреблявшиеся для молдавского языка в Молдавской АССР в 1924—1932 и в 1938—1940 гг. (между 1932 и 1938 гг. официально использовалась латиница) и с 1940 по 1989 в Молдавской ССР (см. Молдавский алфавит), значительно отличаются от традиционной кириллицы, использовавшейся в Валахии, Трансильвании и Молдове и по сути представляют собой адаптацию русского алфавита для молдавского языка. Перевод румынской письменности на латиницу был двухступенчатым: сначала применялся так называемый «переходный алфавит», включавший как кириллические, так и латинские знаки, и лишь через несколько лет была введена собственно латиница.";

    {
        var fs = require("fs");
        var font = new PDFFont(pdf);
        var fontObj = pdf.attach(font);
        var fontdata = fs.readFileSync("/usr/share/fonts/truetype/msttcorefonts/timesi.ttf", { encoding: "binary" });
        fontdata = fontdata.toString("binary");
        font.loadTTF(fontdata);

        var fontName = font._sub.psName;
        pdf.FONTS[fontName] = fontObj;

        var page = pdf.addPage();
        page._beginText();
        page._out(mm2pt(10), " ", mm2pt(250), " TD", NL);
        page._out(page._getFontResource(fontName), " 20 Tf", NL);
        //page._out(new PDFHexString(font.encodeText("©… §™ …®ăşţîâĂŞŢÎÂαβπλΛ♥←↓→↑☺")), " Tj", NL);
        page._out(new PDFHexString(font.encodeText("abcdefghijklmnopqrstuvxyz (0123456789)")), " Tj", NL);
        page._out(mm2pt(0), " ", mm2pt(-10), " TD", NL);
        page._out(new PDFHexString(font.encodeText("ABCDEFGHIJKLMNOPQRSTUVXYZ @#$%^&*-=_+—≠±–")), " Tj", NL);
        page._out(mm2pt(0), " ", mm2pt(-10), " TD", NL);
        page._out(new PDFHexString(font.encodeText("©… §™ …®ăşţîâĂŞŢÎÂαβπλΛ♥←↓→↑☺")), " Tj", NL);
        page._out(mm2pt(0), " ", mm2pt(-10), " TD", NL);
        page._out(new PDFHexString(font.encodeText(cyrillic)), " Tj", NL);
        page._endText();
    }

    // var page1 = pdf.addPage();
    // page1._beginText();
    // page1._out("70 50 TD", NL);
    // page1._out(page1._getFontResource(fontName), " 20 Tf", NL);
    // page1._out(new PDFHexString(font.encodeText("Check this out")), " Tj", NL);
    // page1._endText();

    // var page2 = pdf.addPage();
    // page2._transform(1, 0, 0, -1, 0, mm2pt(297));

    // page2._saveContext();
    // page2._setLineWidth(0.2);
    // for (var y = 0; y <= 297; y += 10) {
    //     page2._out(mm2pt(0), " ", mm2pt(y), " m ",
    //                mm2pt(210), " ", mm2pt(297 - y), " l s", NL);
    // }
    // for (var x = 0; x <= 210; x += 10) {
    //     page2._out(mm2pt(x), " ", mm2pt(0), " m ",
    //                mm2pt(210 - x), " ", mm2pt(297), " l s", NL);
    // }
    // page2._restoreContext();

    // var opacity_half = page2._getGSResource({ ca: 0.5, CA: 0.5 });

    // page2._saveContext();
    // page2._transform(1, 0, 0, -1, mm2pt(105), mm2pt(148.5));
    // page2._beginText();
    // page2._out(page2._getFontResource("Times-Roman"), " 50 Tf", NL);
    // page2._setFillColor(0.5, 0.5, 0.5);
    // page2._out(opacity_half, " gs", NL);
    // page2._setLineWidth(1);
    // page2._setStrokeColor(1, 0, 0);
    // page2._out("2 Tr", NL);
    // page2._out(new PDFString("Hello world!"), " Tj", NL);
    // page2._endText();
    // page2._restoreContext();

    // page2._saveContext();
    // page2._transform(1, 0, 0, -1, mm2pt(10), mm2pt(10));
    // page2._beginText();
    // page2._out(page2._getFontResource("Times-BoldItalic"), " 24 Tf", NL);
    // page2._out("2 Tr", NL);
    // page2._setLineWidth(0.1);
    // page2._setStrokeColor(0.9, 0.2, 0.1);
    // page2._setFillColor(0.9, 0.9, 0.2);
    // page2._setDashPattern([ 1.5, 0.5 ], 0);
    // page2._out(opacity_half, " gs", NL);
    // page2._out(new PDFString("Second line"), " Tj", NL);
    // page2._endText();
    // page2._restoreContext();

    // page2._setStrokeColor(0, 0.8, 0);

    // page2._out(mm2pt(105), " ", mm2pt(0), " m", NL);
    // page2._out(mm2pt(105), " ", mm2pt(297), " l", NL);
    // page2._out("s", NL, NL);

    // page2._out(mm2pt(0), " ", mm2pt(148.5), " m", NL);
    // page2._out(mm2pt(210), " ", mm2pt(148.5), " l", NL);
    // page2._out("s", NL, NL);

    // var page3 = pdf.addPage();
    // page3._transform(mm2pt(1), 0, 0, mm2pt(1), mm2pt(105), mm2pt(148.5));
    // page3._beginText();
    // page3._out(page3._getFontResource("Courier-Bold"), " 10 Tf", NL);
    // page3._out(new PDFString("Courier-Bold"), " Tj", NL);
    // page3._endText();

    // page3._out("-105 0 m 105 0 l s ", NL);
    // page3._out("0 -148.5 m 0 148.5 l s ", NL);

    //console.log("%s", pdf.render());
    //require("util").puts(pdf.render());
    var fs = require("fs");
    fs.writeFileSync("/tmp/pdf.txt", pdf.render(), { encoding: "binary" });

})(undefined, Function("return this")());
