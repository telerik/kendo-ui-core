(function(undefined){

    "use strict";

    var NL = "\n";

    function PDF() {
        var offset = 0;
        var output = "";
        var objcount = 0;
        var self = this;
        var objects = [];

        function out() {
            for (var i = 0; i < arguments.length; ++i) {
                var txt = arguments[i];
                if (txt === undefined) {
                    throw new Error("Cannot output undefined to PDF");
                }
                else if (txt instanceof PDFValue) {
                    txt.offset = offset;
                    txt.render(out);
                }
                else if (isArray(txt)) {
                    renderArray(txt, out);
                }
                else if (isDate(txt)) {
                    renderDate(txt, out);
                }
                else {
                    txt += "";
                    output += txt;
                    offset += txt.length;
                }
            }
            return output;
        }

        self.makeString = function(str) {
            return new PDFString(str);
        };
        self.makeName = function(name) {
            return PDFName.get(name);
        };
        self.makeDictionary = function(props) {
            return new PDFDictionary(props);
        };
        self.makeObject = function(value) {
            var obj = new PDFObject(value, ++objcount);
            objects.push(obj);
            return obj;
        };
        self.makeStream = function(data, props) {
            return new PDFStream(data, props);
        };
        self.endDocument = function() {
            return out("%%EOF");
        };
        self.offset = function() {
            return offset;
        };
        self.render = function() {
            /// file header
            out("%PDF-1.4", NL);

            // the spec recommends outputting 4 bytes >= 128
            // so that various apps recognize it as a binary file.
            out("%\x80\x81\x82\x83", NL);

            /// file body
            for (var i = 0; i < objects.length; ++i) {
                out(objects[i], NL, NL);
            }

            /// cross-reference table
            var xrefOffset = offset;
            out("xref", NL, 0, " ", objects.length, NL);
            out("0000000000 65535 f ", NL);
            for (var i = 0; i < objects.length; ++i) {
                out(zeropad(objects[i].offset, 10), " 00000 n ", NL);
            }
            out(NL);

            /// trailer
            out("trailer", NL);
            out(new PDFDictionary({
                Size: objects.length,
                Root: catalog.makeRef()
            }), NL, NL);

            /// end
            out("startxref", NL, xrefOffset, NL);
            out("%%EOF", NL);

            return output;
        };

        var catalog = self.makeObject(new PDFCatalog());
        var pageTree = self.makeObject(new PDFPageTree());
        catalog.value.setPages(pageTree);

        self.addPage = function() {
            var content = new PDFStream();
            var page = new PDFPage({
                Contents: self.makeObject(content).makeRef()
            });
            page._content = content;
            page._pdf = self;
            pageTree.value.addPage(self.makeObject(page));
            return page;
        };

        var fonts = {};
        for (var i in self.FONTS) {
            if (hasOwnProperty(self.FONTS, i)) {
                fonts[i] = self.makeObject(self.FONTS[i]);
            }
        }
        self.FONTS = fonts;
    }

    function pad(str, len, ch) {
        while (str.length < len)
            str = ch + str;
        return str;
    }

    function zeropad(n, len) {
        return pad(n+"", len, "0");
    }

    function hasOwnProperty(obj, key) {
        return Object.prototype.hasOwnProperty.call(obj, key);
    }

    var isArray = Array.isArray || function(obj) {
        return obj instanceof Array;
    };

    function isDate(obj) {
        return obj instanceof Date;
    }

    function renderArray(a, out) {
        out("[");
        for (var i = 0; i < a.length; ++i) {
            out(" ", a[i]);
        }
        out(" ]");
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

    function defclass(ctor, proto, base) {
        if (base == null) {
            base = PDFValue;
        }
        ctor.prototype = new base;
        for (var i in proto) {
            if (hasOwnProperty(proto, i)) {
                ctor.prototype[i] = proto[i];
            }
        }
        return ctor;
    }

    /// strings

    var PDFString = defclass(function PDFString(value){
        this.value = value;
    }, {
        render: function(out) {
            out("(", this.escape(), ")");
        },
        escape: function() {
            return this.value.replace(/([\(\)\\])/g, "\\$1");
        }
    });

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
        if (hasOwnProperty(PDFName.cache, name))
            return PDFName.cache[name];
        return PDFName.cache[name] = new PDFName(name);
    };

    /// dictionary

    var PDFDictionary = defclass(function PDFDictionary(props) {
        this.props = props;
    }, {
        render: function(out) {
            out("<<");
            for (var i in this.props) {
                if (hasOwnProperty(this.props, i)) {
                    out(" ", PDFName.get(i), " ", this.props[i]);
                }
            }
            out(" >>");
        }
    });

    /// objects

    var PDFObject = defclass(function PDFObject(value, id) {
        this.value = value;
        this.id = id;
    }, {
        render: function(out) {
            out(this.id, " 0 obj", NL, this.value, NL, "endobj");
        },
        makeRef: function() {
            return new PDFObjectRef(this);
        }
    });

    /// object references

    var PDFObjectRef = defclass(function PDFObjectRef(target) {
        this.target = target;
    }, {
        render: function(out) {
            out(this.target.id, " 0 R");
        }
    });

    /// streams

    var PDFStream = defclass(function PDFStream(data, props) {
        this.data = data || "";
        this.props = props || {};
    }, {
        render: function(out) {
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
            this.props.Pages = pagesObj.makeRef();
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
            this.props.Kids.push(pageObj.makeRef());
            this.props.Count++;
        }
    }, PDFDictionary);

    /// font object

    var PDFFont = defclass(function PDFFont(props){
        props = this.props = props || {};
        props.Type = PDFName.get("Font");
    }, {

    }, PDFDictionary);

    // standard fonts
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
        FONTS[name] = new PDFFont({
            Subtype: PDFName.get("Type1"),
            BaseFont: PDFName.get(name)
        });
    });

    /// page object

    var PDFPage = defclass(function PDFPage(props){
        this._rcount = 0;
        this._textMode = false;
        this._fontResources = {};
        this._fontsByName = {};

        props = this.props = props || {};
        props.Type = PDFName.get("Page");
        props.Resources = new PDFDictionary({
            Font: new PDFDictionary(this._fontResources)
        });
    }, {
        _out: function() {
            var content = this._content;
            (function out() {
                for (var i = 0; i < arguments.length; ++i) {
                    var txt = arguments[i];
                    if (txt === undefined) {
                        throw new Error("Cannot output undefined to PDF");
                    }
                    else if (txt instanceof PDFValue) {
                        txt.render(out);
                    }
                    else if (isArray(txt)) {
                        renderArray(txt, out);
                    }
                    else if (isDate(txt)) {
                        renderDate(txt, out);
                    }
                    else {
                        txt += "";
                        content.data += txt;
                    }
                }
            }).apply(null, arguments);
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
        _getFontResource: function(fontName) {
            var name = this._fontsByName[fontName];
            if (!name) {
                name = this._fontsByName[fontName] = "F" + this._rcount++;
                this._fontResources[name] = this._pdf.FONTS[fontName].makeRef();
            }
            return PDFName.get(name);
        },
    }, PDFDictionary);











    ///// DEBUG

    var pdf = new PDF();
    var page1 = pdf.addPage();
    page1._beginText();
    page1._out("70 50 TD", NL);
    page1._out(page1._getFontResource("Times-BoldItalic"), " 24 Tf", NL);
    page1._out(pdf.makeString("Hello WORLD!"), " Tj", NL);
    page1._endText();

    var page2 = pdf.addPage();
    page2._transform(1, 0, 0, 1, 0, mm2pt(297));
    page2._transform(1, 0, 0, -1, 0, 0);

    page2._beginText();
    page2._out(mm2pt(105), " ", mm2pt(148.5), " TD", NL);
    page2._out(page2._getFontResource("Times-BoldItalic"), " 24 Tf", NL);
    page2._out(pdf.makeString("Hello world!"), " Tj", NL);
    page2._endText();

    page2._beginText();
    page2._out(page2._getFontResource("Helvetica"), " 24 Tf", NL);
    page2._out(mm2pt(20), " ", mm2pt(20), " TD 1 Tr 1 w", NL);
    page2._out(pdf.makeString("Second line"), " Tj", NL);
    page2._endText();

    page2._out(mm2pt(105), " ", mm2pt(0), " m", NL);
    page2._out(mm2pt(105), " ", mm2pt(297), " l", NL);
    page2._out("s", NL, NL);

    page2._out(mm2pt(0), " ", mm2pt(148), " m", NL);
    page2._out(mm2pt(210), " ", mm2pt(148), " l", NL);
    page2._out("s", NL, NL);

    var page3 = pdf.addPage();
    page3._transform(mm2pt(1), 0, 0, mm2pt(1), 0, 0);
    page3._transform(1, 0, 0, 1, 105, 148.5);
    page3._beginText();
    page3._out(page3._getFontResource("Courier-Bold"), " 10 Tf", NL);
    page3._out(pdf.makeString("Courier-Bold"), " Tj", NL);
    page3._endText();

    page3._out("-105 0 m 105 0 l s ", NL);
    page3._out("0 -148.5 m 0 148.5 l s ", NL);

    console.log("%s", pdf.render());


})(undefined);
