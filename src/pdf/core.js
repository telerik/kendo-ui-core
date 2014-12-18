(function(f, define){
    define([ "../kendo.core" ], f);
})(function(){

(function(global, parseFloat, undefined){

    "use strict";

    // WARNING: removing the following jshint declaration and turning
    // == into === to make JSHint happy will break functionality.
    /* jshint eqnull:true */
    /* jshint -W069 */
    /* jshint loopfunc:true */
    /* jshint newcap:false */
    /* global VBArray */

    var kendo = global.kendo;

    // XXX: remove this junk (assume `true`) when we no longer have to support IE < 10
    var HAS_TYPED_ARRAYS = !!global.Uint8Array;

    var NL = "\n";

    var RESOURCE_COUNTER = 0;

    var BASE64 = (function(){
        var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        return {
            decode: function(str) {
                var input = str.replace(/[^A-Za-z0-9\+\/\=]/g, ""), i = 0, n = input.length, output = [];

	        while (i < n) {
		    var enc1 = keyStr.indexOf(input.charAt(i++));
		    var enc2 = keyStr.indexOf(input.charAt(i++));
		    var enc3 = keyStr.indexOf(input.charAt(i++));
		    var enc4 = keyStr.indexOf(input.charAt(i++));

		    var chr1 = (enc1 << 2) | (enc2 >>> 4);
		    var chr2 = ((enc2 & 15) << 4) | (enc3 >>> 2);
		    var chr3 = ((enc3 & 3) << 6) | enc4;

		    output.push(chr1);
		    if (enc3 != 64) {
                        output.push(chr2);
                    }
		    if (enc4 != 64) {
                        output.push(chr3);
                    }
	        }

	        return output;
            },
            encode: function(bytes) {
                var i = 0, n = bytes.length;
                var output = "";

	        while (i < n) {
		    var chr1 = bytes[i++];
		    var chr2 = bytes[i++];
		    var chr3 = bytes[i++];

		    var enc1 = chr1 >>> 2;
		    var enc2 = ((chr1 & 3) << 4) | (chr2 >>> 4);
		    var enc3 = ((chr2 & 15) << 2) | (chr3 >>> 6);
		    var enc4 = chr3 & 63;

		    if (i - n == 2) {
			enc3 = enc4 = 64;
		    } else if (i - n == 1) {
			enc4 = 64;
		    }

		    output += keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
                }
                return output;
            }
        };
    }());

    var PAPER_SIZE = {
        a0        : [ 2383.94 , 3370.39 ],
        a1        : [ 1683.78 , 2383.94 ],
        a2        : [ 1190.55 , 1683.78 ],
        a3        : [ 841.89  , 1190.55 ],
        a4        : [ 595.28  , 841.89  ],
        a5        : [ 419.53  , 595.28  ],
        a6        : [ 297.64  , 419.53  ],
        a7        : [ 209.76  , 297.64  ],
        a8        : [ 147.40  , 209.76  ],
        a9        : [ 104.88  , 147.40  ],
        a10       : [ 73.70   , 104.88  ],
        b0        : [ 2834.65 , 4008.19 ],
        b1        : [ 2004.09 , 2834.65 ],
        b2        : [ 1417.32 , 2004.09 ],
        b3        : [ 1000.63 , 1417.32 ],
        b4        : [ 708.66  , 1000.63 ],
        b5        : [ 498.90  , 708.66  ],
        b6        : [ 354.33  , 498.90  ],
        b7        : [ 249.45  , 354.33  ],
        b8        : [ 175.75  , 249.45  ],
        b9        : [ 124.72  , 175.75  ],
        b10       : [ 87.87   , 124.72  ],
        c0        : [ 2599.37 , 3676.54 ],
        c1        : [ 1836.85 , 2599.37 ],
        c2        : [ 1298.27 , 1836.85 ],
        c3        : [ 918.43  , 1298.27 ],
        c4        : [ 649.13  , 918.43  ],
        c5        : [ 459.21  , 649.13  ],
        c6        : [ 323.15  , 459.21  ],
        c7        : [ 229.61  , 323.15  ],
        c8        : [ 161.57  , 229.61  ],
        c9        : [ 113.39  , 161.57  ],
        c10       : [ 79.37   , 113.39  ],
        executive : [ 521.86  , 756.00  ],
        folio     : [ 612.00  , 936.00  ],
        legal     : [ 612.00  , 1008.00 ],
        letter    : [ 612.00  , 792.00  ],
        tabloid   : [ 792.00  , 1224.00 ]
    };

    function makeOutput() {
        var indentLevel = 0, output = BinaryStream();
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
                else if (typeof x == "number") {
                    if (isNaN(x)) {
                        throw new Error("Cannot output NaN to PDF");
                    }
                    // make sure it doesn't end up in exponent notation
                    var num = x.toFixed(7);
                    if (num.indexOf(".") >= 0) {
                        num = num.replace(/\.?0+$/, "");
                    }
                    if (num == "-0") {
                        num = "0";
                    }
                    output.writeString(num);
                }
                else if (/string|boolean/.test(typeof x)) {
                    output.writeString(x+"");
                }
                else if (typeof x.get == "function") {
                    output.write(x.get());
                }
                else if (typeof x == "object") {
                    if (!x) {
                        output.writeString("null");
                    } else {
                        out(new PDFDictionary(x));
                    }
                }
            }
        }
        out.writeData = function(data) {
            output.write(data);
        };
        out.withIndent = function(f) {
            ++indentLevel;
            f(out);
            --indentLevel;
        };
        out.indent = function() {
            out(NL, pad("", indentLevel * 2, "  "));
            out.apply(null, arguments);
        };
        out.offset = function() {
            return output.offset();
        };
        out.toString = function() {
            throw new Error("FIX CALLER");
        };
        out.get = function() {
            return output.get();
        };
        out.stream = function() {
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

    function PDFDocument(options) {
        var self = this;
        var out = makeOutput();
        var objcount = 0;
        var objects = [];

        function getOption(name, defval) {
            return (options && options[name] != null) ? options[name] : defval;
        }

        self.getOption = getOption;

        self.attach = function(value) {
            if (objects.indexOf(value) < 0) {
                wrapObject(value, ++objcount);
                objects.push(value);
            }
            return value;
        };

        self.pages = [];

        self.FONTS = {};
        self.IMAGES = {};
        self.GRAD_COL_FUNCTIONS = {}; // cache for color gradient functions
        self.GRAD_OPC_FUNCTIONS = {}; // cache for opacity gradient functions
        self.GRAD_COL = {};     // cache for whole color gradient objects
        self.GRAD_OPC = {};     // cache for whole opacity gradient objects

        function getPaperOptions(getOption) {
            var paperSize = getOption("paperSize", PAPER_SIZE.a4);
            if (!paperSize) {
                return {};
            }
            if (typeof paperSize == "string") {
                paperSize = PAPER_SIZE[paperSize.toLowerCase()];
                if (paperSize == null) {
                    throw new Error("Unknown paper size");
                }
            }

            paperSize[0] = unitsToPoints(paperSize[0]);
            paperSize[1] = unitsToPoints(paperSize[1]);

            if (getOption("landscape", false)) {
                paperSize = [
                    Math.max(paperSize[0], paperSize[1]),
                    Math.min(paperSize[0], paperSize[1])
                ];
            }

            var margin = getOption("margin");
            if (margin) {
                if (typeof margin == "string") {
                    margin = unitsToPoints(margin, 0);
                    margin = { left: margin, top: margin, right: margin, bottom: margin };
                } else {
                    margin.left = unitsToPoints(margin.left, 0);
                    margin.top = unitsToPoints(margin.top, 0);
                    margin.right = unitsToPoints(margin.right, 0);
                    margin.bottom = unitsToPoints(margin.bottom, 0);
                }
                if (getOption("addMargin")) {
                    paperSize[0] += margin.left + margin.right;
                    paperSize[1] += margin.top + margin.bottom;
                }
            }
            return { paperSize: paperSize, margin: margin };
        }

        var catalog = self.attach(new PDFCatalog());
        var pageTree = self.attach(new PDFPageTree());
        catalog.setPages(pageTree);

        self.addPage = function(options) {
            var paperOptions  = getPaperOptions(function(name, defval){
                return (options && options[name] != null) ? options[name] : defval;
            });
            var paperSize     = paperOptions.paperSize;
            var margin        = paperOptions.margin;
            var contentWidth  = paperSize[0];
            var contentHeight = paperSize[1];
            if (margin) {
                contentWidth -= margin.left + margin.right;
                contentHeight -= margin.top + margin.bottom;
            }
            var content = new PDFStream(makeOutput(), null, true);
            var props = {
                Contents : self.attach(content),
                Parent   : pageTree,
                MediaBox : [ 0, 0, paperSize[0], paperSize[1] ]
            };
            var page = new PDFPage(self, props);
            page._content = content;
            pageTree.addPage(self.attach(page));

            // canvas-like coord. system.  (0,0) is upper-left.
            // text must be vertically mirorred before drawing.
            page.transform(1, 0, 0, -1, 0, paperSize[1]);

            if (margin) {
                page.translate(margin.left, margin.top);
                // XXX: clip to right/bottom margin.  Make this optional?
                page.rect(0, 0, contentWidth, contentHeight);
                page.clip();
            }

            self.pages.push(page);
            return page;
        };

        self.render = function() {
            var i;
            /// file header
            out("%PDF-1.4", NL, "%\xc2\xc1\xda\xcf\xce", NL, NL);

            /// file body
            for (i = 0; i < objects.length; ++i) {
                objects[i].renderFull(out);
                out(NL, NL);
            }

            /// cross-reference table
            var xrefOffset = out.offset();
            out("xref", NL, 0, " ", objects.length + 1, NL);
            out("0000000000 65535 f ", NL);
            for (i = 0; i < objects.length; ++i) {
                out(zeropad(objects[i]._offset, 10), " 00000 n ", NL);
            }
            out(NL);

            /// trailer
            out("trailer", NL);
            out(new PDFDictionary({
                Size: objects.length + 1,
                Root: catalog,
                Info: new PDFDictionary({
                    Producer     : new PDFString("Kendo UI PDF Generator"),
                    Title        : new PDFString(getOption("title", "")),
                    Author       : new PDFString(getOption("author", "")),
                    Subject      : new PDFString(getOption("subject", "")),
                    Keywords     : new PDFString(getOption("keywords", "")),
                    Creator      : new PDFString(getOption("creator", "Kendo UI PDF Generator")),
                    CreationDate : getOption("date", new Date())
                })
            }), NL, NL);

            /// end
            out("startxref", NL, xrefOffset, NL);
            out("%%EOF", NL);

            return out.stream().offset(0);
        };
    }

    var FONT_CACHE = {
        "Times-Roman"           : true,
        "Times-Bold"            : true,
        "Times-Italic"          : true,
        "Times-BoldItalic"      : true,
        "Helvetica"             : true,
        "Helvetica-Bold"        : true,
        "Helvetica-Oblique"     : true,
        "Helvetica-BoldOblique" : true,
        "Courier"               : true,
        "Courier-Bold"          : true,
        "Courier-Oblique"       : true,
        "Courier-BoldOblique"   : true,
        "Symbol"                : true,
        "ZapfDingbats"          : true
    };

    function loadBinary(url, cont) {
        function error() {
            if (global.console) {
                if (global.console.error) {
                    global.console.error("Cannot load URL: %s", url);
                } else {
                    global.console.log("Cannot load URL: %s", url);
                }
            }
            cont(null);
        }
        var req = new XMLHttpRequest();
        req.open('GET', url, true);
        if (HAS_TYPED_ARRAYS) {
            req.responseType = "arraybuffer";
        }
        req.onload = function() {
            if (req.status == 200 || req.status == 304) {
                if (HAS_TYPED_ARRAYS) {
                    cont(new Uint8Array(req.response));
                } else {
                    cont(new VBArray(req.responseBody).toArray()); // IE9 only
                }
            } else {
                error();
            }
        };
        req.onerror = error;
        req.send(null);
    }

    function loadFont(url, cont) {
        var font = FONT_CACHE[url];
        if (font) {
            cont(font);
        } else {
            loadBinary(url, function(data){
                if (data == null) {
                    throw new Error("Cannot load font from " + url);
                } else {
                    var font = new kendo.pdf.TTFFont(data);
                    FONT_CACHE[url] = font;
                    cont(font);
                }
            });
        }
    }

    var IMAGE_CACHE = {};

    function loadImage(url, cont) {
        var img = IMAGE_CACHE[url];
        if (img) {
            cont(img);
        } else {
            img = new Image();
            if (!(/^data:/i.test(url))) {
                img.crossOrigin = "Anonymous";
            }
            img.src = url;

            var onload = function() {
                var canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                var ctx = canvas.getContext("2d");

                ctx.drawImage(img, 0, 0);

                var imgdata;
                try {
                    imgdata = ctx.getImageData(0, 0, img.width, img.height);
                } catch(ex) {
                    // it tainted the canvas -- can't draw it.
                    return cont(IMAGE_CACHE[url] = "TAINTED");
                }

                // in case it contains transparency, we must separate rgb data from the alpha
                // channel and create a PDFRawImage image with opacity.  otherwise we can use a
                // PDFJpegImage.
                //
                // to do this in one step, we create the rgb and alpha streams anyway, even if
                // we might end up not using them if hasAlpha remains false.

                var hasAlpha = false, rgb = BinaryStream(), alpha = BinaryStream();
                var rawbytes = imgdata.data;
                var i = 0;
                while (i < rawbytes.length) {
                    rgb.writeByte(rawbytes[i++]);
                    rgb.writeByte(rawbytes[i++]);
                    rgb.writeByte(rawbytes[i++]);
                    var a = rawbytes[i++];
                    if (a < 255) {
                        hasAlpha = true;
                    }
                    alpha.writeByte(a);
                }

                if (hasAlpha) {
                    img = new PDFRawImage(img.width, img.height, rgb, alpha);
                } else {
                    // no transparency, encode as JPEG.
                    var data = canvas.toDataURL("image/jpeg");
                    data = data.substr(data.indexOf(";base64,") + 8);

                    var stream = BinaryStream();
                    stream.writeBase64(data);
                    stream.offset(0);
                    img = new PDFJpegImage(img.width, img.height, stream);
                }

                cont(IMAGE_CACHE[url] = img);
            };

            if (img.complete) {
                onload();
            } else {
                img.onload = onload;
                img.onerror = function(ev) {
                    cont(IMAGE_CACHE[url] = "TAINTED");
                };
            }
        }
    }

    function manyLoader(loadOne) {
        return function(urls, callback) {
            var n = urls.length, i = n;
            if (n === 0) {
                return callback();
            }
            while (i-- > 0) {
                loadOne(urls[i], function(){
                    if (--n === 0) {
                        callback();
                    }
                });
            }
        };
    }

    var loadFonts = manyLoader(loadFont);
    var loadImages = manyLoader(loadImage);

    PDFDocument.prototype = {
        loadFonts: loadFonts,
        loadImages: loadImages,

        getFont: function(url) {
            var font = this.FONTS[url];
            if (!font) {
                font = FONT_CACHE[url];
                if (!font) {
                    throw new Error("Font " + url + " has not been loaded");
                }
                if (font === true) {
                    font = this.attach(new PDFStandardFont(url));
                } else {
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
                if (img === "TAINTED") {
                    return null;
                }
                img = this.IMAGES[url] = this.attach(img.asStream(this));
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
                    Type: _("ExtGState")
                };
                if (forStroke) {
                    props.CA = opacity;
                } else {
                    props.ca = opacity;
                }
                gs = this.attach(new PDFDictionary(props));
                gs._resourceName = _("GS" + (++RESOURCE_COUNTER));
                cache[id] = gs;
            }
            return gs;
        },

        dict: function(props) {
            return new PDFDictionary(props);
        },

        name: function(str) {
            return _(str);
        },

        stream: function(props, content) {
            return new PDFStream(content, props);
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
                    if (i > 0 && i % 8 === 0) {
                        out.indent(a[i]);
                    } else {
                        out(" ", a[i]);
                    }
                }
            });
            //out.indent();
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

    function cm2pt(cm) {
        return mm2pt(cm * 10);
    }

    function in2pt(inch)  {
        return inch * 72;
    }

    function unitsToPoints(x, def) {
        if (typeof x == "number") {
            return x;
        }
        if (typeof x == "string") {
            var m;
            m = /^\s*([0-9.]+)\s*(mm|cm|in|pt)\s*$/.exec(x);
            if (m) {
                var num = parseFloat(m[1]);
                if (!isNaN(num)) {
                    if (m[2] == "pt") {
                        return num;
                    }
                    return {
                        "mm": mm2pt,
                        "cm": cm2pt,
                        "in": in2pt
                    }[m[2]](num);
                }
            }
        }
        if (def != null) {
            return def;
        }
        throw new Error("Can't parse unit: " + x);
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
            var txt = "", esc = this.escape();
            for (var i = 0; i < esc.length; ++i) {
                txt += String.fromCharCode(esc.charCodeAt(i) & 0xFF);
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

    var PDFName_cache = {};
    PDFName.get = _;

    function _(name) {
        if (hasOwnProperty(PDFName_cache, name)) {
            return PDFName_cache[name];
        }
        return (PDFName_cache[name] = new PDFName(name));
    }

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
                        out.indent(_(i), " ", props[i]);
                    }
                }
            });
            if (!empty) {
                out.indent();
            }
            out(">>");
        }
    });

    /// streams

    var PDFStream = defclass(function PDFStream(data, props, compress) {
        if (typeof data == "string") {
            var tmp = BinaryStream();
            tmp.write(data);
            data = tmp;
        }
        this.data = data;
        this.props = props || {};
        this.compress = compress;
    }, {
        render: function(out) {
            var data = this.data.get(), props = this.props;
            if (this.compress && global.pako && typeof global.pako.deflate == "function") {
                if (!props.Filter) {
                    props.Filter = [];
                } else if (!(props.Filter instanceof Array)) {
                    props.Filter = [ props.Filter ];
                }
                props.Filter.unshift(_("FlateDecode"));
                data = global.pako.deflate(data);
            }
            props.Length = data.length;
            out(new PDFDictionary(props), " stream", NL);
            out.writeData(data);
            out(NL, "endstream");
        }
    });

    /// catalog

    var PDFCatalog = defclass(function PDFCatalog(props){
        props = this.props = props || {};
        props.Type = _("Catalog");
    }, {
        setPages: function(pagesObj) {
            this.props.Pages = pagesObj;
        }
    }, PDFDictionary);

    /// page tree

    var PDFPageTree = defclass(function PDFPageTree(){
        this.props = {
            Type  : _("Pages"),
            Kids  : [],
            Count : 0
        };
    }, {
        addPage: function(pageObj) {
            this.props.Kids.push(pageObj);
            this.props.Count++;
        }
    }, PDFDictionary);

    /// images

    // JPEG

    function PDFJpegImage(width, height, data) {
        this.asStream = function() {
            var stream = new PDFStream(data, {
                Type             : _("XObject"),
                Subtype          : _("Image"),
                Width            : width,
                Height           : height,
                BitsPerComponent : 8,
                ColorSpace       : _("DeviceRGB"),
                Filter           : _("DCTDecode")
            });
            stream._resourceName = _("I" + (++RESOURCE_COUNTER));
            return stream;
        };
    }

    // PDFRawImage will be used for images with transparency (PNG)

    function PDFRawImage(width, height, rgb, alpha) {
        this.asStream = function(pdf) {
            var mask = new PDFStream(alpha, {
                Type             : _("XObject"),
                Subtype          : _("Image"),
                Width            : width,
                Height           : height,
                BitsPerComponent : 8,
                ColorSpace       : _("DeviceGray")
            }, true);
            var stream = new PDFStream(rgb, {
                Type             : _("XObject"),
                Subtype          : _("Image"),
                Width            : width,
                Height           : height,
                BitsPerComponent : 8,
                ColorSpace       : _("DeviceRGB"),
                SMask            : pdf.attach(mask)
            }, true);
            stream._resourceName = _("I" + (++RESOURCE_COUNTER));
            return stream;
        };
    }

    /// standard fonts

    var PDFStandardFont = defclass(function PDFStandardFont(name){
        this.props = {
            Type     : _("Font"),
            Subtype  : _("Type1"),
            BaseFont : _(name)
        };
        this._resourceName = _("F" + (++RESOURCE_COUNTER));
    }, {
        encodeText: function(str) {
            return new PDFString(str+"");
        }
    }, PDFDictionary);

    /// TTF fonts

    var PDFFont = defclass(function PDFFont(pdf, font, props){
        props = this.props = props || {};
        props.Type = _("Font");
        props.Subtype = _("Type0");
        props.Encoding = _("Identity-H");

        this._pdf = pdf;
        this._font = font;
        this._sub = font.makeSubset();
        this._resourceName = _("F" + (++RESOURCE_COUNTER));

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
                      (this.italicAngle !== 0 ? 1 << 6 : 0) |
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
            var fontStream = new PDFStream(BinaryStream(data), {
                Length1: data.length
            }, true);

            var descriptor = self._pdf.attach(new PDFDictionary({
                Type         : _("FontDescriptor"),
                FontName     : _(self._sub.psName),
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
                        if (!chunk) {
                            charWidths.push(i, chunk = []);
                        }
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
                Type: _("Font"),
                Subtype: _("CIDFontType2"),
                BaseFont: _(self._sub.psName),
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
            dict.BaseFont = _(self._sub.psName);
            dict.DescendantFonts = [ self._pdf.attach(descendant) ];

            // Compute the ToUnicode map so that apps can extract
            // meaningful text from the PDF.
            var unimap = new PDFToUnicodeCmap(firstChar, lastChar, sub.subset);
            var unimapStream = new PDFStream(makeOutput(), null, true);
            unimapStream.data(unimap);
            dict.ToUnicode = self._pdf.attach(unimapStream);
        },
        _makeCidToGidMap: function() {
            return new PDFStream(BinaryStream(this._sub.cidToGidMap()), null, true);
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

    /// gradients

    function makeHash(a) {
        return a.map(function(x){
            return isArray(x) ? makeHash(x)
                : typeof x == "number" ? (Math.round(x * 1000) / 1000).toFixed(3)
                : x;
        }).join(" ");
    }

    function cacheColorGradientFunction(pdf, r1, g1, b1, r2, g2, b2) {
        var hash = makeHash([ r1, g1, b1, r2, g2, b2 ]);
        var func = pdf.GRAD_COL_FUNCTIONS[hash];
        if (!func) {
            func = pdf.GRAD_COL_FUNCTIONS[hash] = pdf.attach(new PDFDictionary({
                FunctionType: 2,
                Domain: [ 0, 1 ],
                Range: [ 0, 1, 0, 1, 0, 1 ],
                N: 1,
                C0: [ r1 , g1 , b1 ],
                C1: [ r2 , g2 , b2 ]
            }));
        }
        return func;
    }

    function cacheOpacityGradientFunction(pdf, a1, a2) {
        var hash = makeHash([ a1, a2 ]);
        var func = pdf.GRAD_OPC_FUNCTIONS[hash];
        if (!func) {
            func = pdf.GRAD_OPC_FUNCTIONS[hash] = pdf.attach(new PDFDictionary({
                FunctionType: 2,
                Domain: [ 0, 1 ],
                Range: [ 0, 1 ],
                N: 1,
                C0: [ a1 ],
                C1: [ a2 ]
            }));
        }
        return func;
    }

    function makeGradientFunctions(pdf, stops) {
        var hasAlpha = false;
        var opacities = [];
        var colors = [];
        var offsets = [];
        var encode = [];
        var i, prev, cur, prevColor, curColor;
        for (i = 1; i < stops.length; ++i) {
            prev = stops[i - 1];
            cur = stops[i];
            prevColor = prev.color;
            curColor = cur.color;
            colors.push(cacheColorGradientFunction(
                pdf,
                prevColor.r, prevColor.g, prevColor.b,
                curColor.r,  curColor.g,  curColor.b
            ));
            if (prevColor.a < 1 || curColor.a < 1) {
                hasAlpha = true;
            }
            offsets.push(cur.offset);
            encode.push(0, 1);
        }
        if (hasAlpha) {
            for (i = 1; i < stops.length; ++i) {
                prev = stops[i - 1];
                cur = stops[i];
                prevColor = prev.color;
                curColor = cur.color;
                opacities.push(cacheOpacityGradientFunction(
                    pdf, prevColor.a, curColor.a
                ));
            }
        }
        offsets.pop();
        return {
            hasAlpha  : hasAlpha,
            colors    : assemble(colors),
            opacities : hasAlpha ? assemble(opacities) : null
        };
        function assemble(funcs) {
            if (funcs.length == 1) {
                return funcs[0];
            }
            return {
                FunctionType: 3,
                Functions: funcs,
                Domain: [ 0, 1 ],
                Bounds: offsets,
                Encode: encode
            };
        }
    }

    function cacheColorGradient(pdf, isRadial, stops, coords, funcs, box) {
        var shading, hash;
        // if box is given then we have user-space coordinates, which
        // means the gradient is designed for a certain position/size
        // on page.  caching won't do any good.
        if (!box) {
            var a = [ isRadial ].concat(coords);
            stops.forEach(function(x){
                a.push(x.offset, x.color.r, x.color.g, x.color.b);
            });
            hash = makeHash(a);
            shading = pdf.GRAD_COL[hash];
        }
        if (!shading) {
            shading = new PDFDictionary({
                Type: _("Shading"),
                ShadingType: isRadial ? 3 : 2,
                ColorSpace: _("DeviceRGB"),
                Coords: coords,
                Domain: [ 0, 1 ],
                Function: funcs,
                Extend: [ true, true ]
            });
            pdf.attach(shading);
            shading._resourceName = "S" + (++RESOURCE_COUNTER);
            if (hash) {
                pdf.GRAD_COL[hash] = shading;
            }
        }
        return shading;
    }

    function cacheOpacityGradient(pdf, isRadial, stops, coords, funcs, box) {
        var opacity, hash;
        // if box is given then we have user-space coordinates, which
        // means the gradient is designed for a certain position/size
        // on page.  caching won't do any good.
        if (!box) {
            var a = [ isRadial ].concat(coords);
            stops.forEach(function(x){
                a.push(x.offset, x.color.a);
            });
            hash = makeHash(a);
            opacity = pdf.GRAD_OPC[hash];
        }
        if (!opacity) {
            opacity = new PDFDictionary({
                Type: _("ExtGState"),
                AIS: false,
                CA: 1,
                ca: 1,
                SMask: {
                    Type: _("Mask"),
                    S: _("Luminosity"),
                    G: pdf.attach(new PDFStream("/a0 gs /s0 sh", {
                        Type: _("XObject"),
                        Subtype: _("Form"),
                        FormType: 1,
                        BBox: (box ? [
                            box.left, box.top + box.height, box.left + box.width, box.top
                        ] : [ 0, 1, 1, 0 ]),
                        Group: {
                            Type: _("Group"),
                            S: _("Transparency"),
                            CS: _("DeviceGray"),
                            I: true
                        },
                        Resources: {
                            ExtGState: {
                                a0: { CA: 1, ca: 1 }
                            },
                            Shading: {
                                s0: {
                                    ColorSpace: _("DeviceGray"),
                                    Coords: coords,
                                    Domain: [ 0, 1 ],
                                    ShadingType: isRadial ? 3 : 2,
                                    Function: funcs,
                                    Extend: [ true, true ]
                                }
                            }
                        }
                    }))
                }
            });
            pdf.attach(opacity);
            opacity._resourceName = "O" + (++RESOURCE_COUNTER);
            if (hash) {
                pdf.GRAD_OPC[hash] = opacity;
            }
        }
        return opacity;
    }

    function cacheGradient(pdf, gradient, box) {
        var isRadial = gradient.type == "radial";
        var funcs = makeGradientFunctions(pdf, gradient.stops);
        var coords = isRadial ? [
            gradient.start.x , gradient.start.y , gradient.start.r,
            gradient.end.x   , gradient.end.y   , gradient.end.r
        ] : [
            gradient.start.x , gradient.start.y,
            gradient.end.x   , gradient.end.y
        ];
        var shading = cacheColorGradient(
            pdf, isRadial, gradient.stops, coords, funcs.colors, gradient.userSpace && box
        );
        var opacity = funcs.hasAlpha ? cacheOpacityGradient(
            pdf, isRadial, gradient.stops, coords, funcs.opacities, gradient.userSpace && box
        ) : null;
        return {
            hasAlpha: funcs.hasAlpha,
            shading: shading,
            opacity: opacity
        };
    }

    /// page object

    var PDFPage = defclass(function PDFPage(pdf, props){
        this._pdf = pdf;
        this._rcount = 0;
        this._textMode = false;
        this._fontResources = {};
        this._gsResources = {};
        this._xResources = {};
        this._patResources = {};
        this._shResources = {};
        this._opacity = 1;
        this._matrix = [ 1, 0, 0, 1, 0, 0 ];

        this._font = null;
        this._fontSize = null;

        this._contextStack = [];

        props = this.props = props || {};
        props.Type = _("Page");
        props.ProcSet = [
            _("PDF"),
            _("Text"),
            _("ImageB"),
            _("ImageC"),
            _("ImageI")
        ];
        props.Resources = new PDFDictionary({
            Font      : new PDFDictionary(this._fontResources),
            ExtGState : new PDFDictionary(this._gsResources),
            XObject   : new PDFDictionary(this._xResources),
            Pattern   : new PDFDictionary(this._patResources),
            Shading   : new PDFDictionary(this._shResources)
        });
    }, {
        _out: function() {
            this._content.data.apply(null, arguments);
        },
        transform: function(a, b, c, d, e, f) {
            if (!isIdentityMatrix(arguments)) {
                this._matrix = mmul(this._matrix, arguments);
                this._out(a, " ", b, " ", c, " ", d, " ", e, " ", f, " cm");
                // XXX: debug
                // this._out(" % current matrix: ", this._matrix);
                this._out(NL);
            }
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
            this._out("ET", NL);
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
        setOpacity: function(opacity) {
            this.setFillOpacity(opacity);
            this.setStrokeOpacity(opacity);
            this._opacity *= opacity;
        },
        setStrokeOpacity: function(opacity) {
            if (opacity < 1) {
                var gs = this._pdf.getOpacityGS(this._opacity * opacity, true);
                this._gsResources[gs._resourceName] = gs;
                this._out(gs._resourceName, " gs", NL);
            }
        },
        setFillColor: function(r, g, b) {
            this._out(r, " ", g, " ", b, " rg", NL);
        },
        setFillOpacity: function(opacity) {
            if (opacity < 1) {
                var gs = this._pdf.getOpacityGS(this._opacity * opacity, false);
                this._gsResources[gs._resourceName] = gs;
                this._out(gs._resourceName, " gs", NL);
            }
        },
        gradient: function(gradient, box) {
            this.save();
            this.rect(box.left, box.top, box.width, box.height);
            this.clip();
            if (!gradient.userSpace) {
                this.transform(box.width, 0, 0, box.height, box.left, box.top);
            }
            var g = cacheGradient(this._pdf, gradient, box);
            var sname = g.shading._resourceName, oname;
            this._shResources[sname] = g.shading;
            if (g.hasAlpha) {
                oname = g.opacity._resourceName;
                this._gsResources[oname] = g.opacity;
                this._out("/" + oname + " gs ");
            }
            this._out("/" + sname + " sh", NL);
            this.restore();
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
            this._contextStack.push(this._context());
            this._out("q", NL);
        },
        restore: function() {
            this._out("Q", NL);
            this._context(this._contextStack.pop());
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
            function _X(v) { return x + v; }
            function _Y(v) { return y + v; }

            // how to get to the "magic number" is explained here:
            // http://www.whizkidtech.redprince.net/bezier/circle/kappa/
            var k = 0.5522847498307936;

            this.moveTo(_X(0), _Y(ry));
            this.bezier(
                _X(rx * k) , _Y(ry),
                _X(rx)     , _Y(ry * k),
                _X(rx)     , _Y(0)
            );
            this.bezier(
                _X(rx)     , _Y(-ry * k),
                _X(rx * k) , _Y(-ry),
                _X(0)      , _Y(-ry)
            );
            this.bezier(
                _X(-rx * k) , _Y(-ry),
                _X(-rx)     , _Y(-ry * k),
                _X(-rx)     , _Y(0)
            );
            this.bezier(
                _X(-rx)     , _Y(ry * k),
                _X(-rx * k) , _Y(ry),
                _X(0)       , _Y(ry)
            );
        },
        circle: function(x, y, r) {
            this.ellipse(x, y, r, r);
        },
        stroke: function() {
            this._out("S", NL);
        },
        nop: function() {
            this._out("n", NL);
        },
        clip: function() {
            this._out("W n", NL);
        },
        clipStroke: function() {
            this._out("W S", NL);
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
            if (img) { // the result can be null for a cross-domain image
                this._xResources[img._resourceName] = img;
                this._out(img._resourceName, " Do", NL);
            }
        },
        comment: function(txt) {
            var self = this;
            txt.split(/\r?\n/g).forEach(function(line){
                self._out("% ", line, NL);
            });
        },

        // internal
        _context: function(val) {
            if (val != null) {
                this._opacity = val.opacity;
                this._matrix = val.matrix;
            } else {
                return {
                    opacity: this._opacity,
                    matrix: this._matrix
                };
            }
        }
    }, PDFDictionary);

    function BinaryStream(data) {
        var offset = 0, length = 0;
        if (data == null) {
            data = HAS_TYPED_ARRAYS ? new Uint8Array(256) : [];
        } else {
            length = data.length;
        }

        var ensure = HAS_TYPED_ARRAYS ? function(len) {
            if (len >= data.length) {
                var tmp = new Uint8Array(Math.max(len + 256, data.length * 2));
                tmp.set(data, 0);
                data = tmp;
            }
        } : function() {};

        var get = HAS_TYPED_ARRAYS ? function() {
            return new Uint8Array(data.buffer, 0, length);
        } : function() {
            return data;
        };

        var write = HAS_TYPED_ARRAYS ? function(bytes) {
            if (typeof bytes == "string") {
                return writeString(bytes);
            }
            var len = bytes.length;
            ensure(offset + len);
            data.set(bytes, offset);
            offset += len;
            if (offset > length) {
                length = offset;
            }
        } : function(bytes) {
            if (typeof bytes == "string") {
                return writeString(bytes);
            }
            for (var i = 0; i < bytes.length; ++i) {
                writeByte(bytes[i]);
            }
        };

        var slice = HAS_TYPED_ARRAYS ? function(start, length) {
            if (data.buffer.slice) {
                return new Uint8Array(data.buffer.slice(start, start + length));
            } else {
                // IE10
                var x = new Uint8Array(length);
                x.set(new Uint8Array(data.buffer, start, length));
                return x;
            }
        } : function(start, length) {
            return data.slice(start, start + length);
        };

        function eof() {
            return offset >= length;
        }
        function readByte() {
            return offset < length ? data[offset++] : 0;
        }
        function writeByte(b) {
            ensure(offset);
            data[offset++] = b & 0xFF;
            if (offset > length) {
                length = offset;
            }
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
            return times(len, readByte);
        }
        function readString(len) {
            return String.fromCharCode.apply(String, read(len));
        }
        function writeString(str) {
            for (var i = 0; i < str.length; ++i) {
                writeByte(str.charCodeAt(i));
            }
        }
        function times(n, reader) {
            for (var ret = new Array(n), i = 0; i < n; ++i) {
                ret[i] = reader();
            }
            return ret;
        }

        var stream = {
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

            times       : times,
            get         : get,
            slice       : slice,

            offset: function(pos) {
                if (pos != null) {
                    offset = pos;
                    return stream;
                }
                return offset;
            },

            skip: function(nbytes) {
                offset += nbytes;
            },

            toString: function() {
                throw new Error("FIX CALLER.  BinaryStream is no longer convertible to string!");
            },

            length: function() { return length; },

            saveExcursion: function(f) {
                var pos = offset;
                try {
                    return f();
                } finally {
                    offset = pos;
                }
            },

            writeBase64: function(base64) {
                if (window.atob) {
                    writeString(window.atob(base64));
                } else {
                    write(BASE64.decode(base64));
                }
            },
            base64: function() {
                return BASE64.encode(get());
            }
        };

        return stream;
    }

    function unquote(str) {
        return str.replace(/^\s*(['"])(.*)\1\s*$/, "$2");
    }

    function parseFontDef(fontdef) {
        // XXX: this is very crude for now and buggy.  Proper parsing is quite involved.
        var rx = /^\s*((normal|italic)\s+)?((normal|small-caps)\s+)?((normal|bold|\d+)\s+)?(([0-9.]+)(px|pt))(\/(([0-9.]+)(px|pt)|normal))?\s+(.*?)\s*$/i;
        var m = rx.exec(fontdef);
        if (!m) {
            return { fontSize: 12, fontFamily: "sans-serif" };
        }
        var fontSize = m[8] ? parseInt(m[8], 10) : 12;
        return {
            italic     : m[2] && m[2].toLowerCase() == "italic",
            variant    : m[4],
            bold       : m[6] && /bold|700/i.test(m[6]),
            fontSize   : fontSize,
            lineHeight : m[12] ? m[12] == "normal" ? fontSize : parseInt(m[12], 10) : null,
            fontFamily : m[14].split(/\s*,\s*/g).map(unquote)
        };
    }

    function getFontURL(style) {
        function mkFamily(name) {
            if (style.bold) {
                name += "|bold";
            }
            if (style.italic) {
                name += "|italic";
            }
            return name.toLowerCase();
        }
        var fontFamily = style.fontFamily;
        var name, url;
        if (fontFamily instanceof Array) {
            for (var i = 0; i < fontFamily.length; ++i) {
                name = mkFamily(fontFamily[i]);
                url = FONT_MAPPINGS[name];
                if (url) {
                    break;
                }
            }
        } else {
            url = FONT_MAPPINGS[fontFamily.toLowerCase()];
        }
        while (typeof url == "function") {
            url = url();
        }
        if (!url) {
            url = "Times-Roman";
        }
        return url;
    }

    var FONT_MAPPINGS = {
        "serif"                    : "Times-Roman",
        "serif|bold"               : "Times-Bold",
        "serif|italic"             : "Times-Italic",
        "serif|bold|italic"        : "Times-BoldItalic",
        "sans-serif"               : "Helvetica",
        "sans-serif|bold"          : "Helvetica-Bold",
        "sans-serif|italic"        : "Helvetica-Oblique",
        "sans-serif|bold|italic"   : "Helvetica-BoldOblique",
        "monospace"                : "Courier",
        "monospace|bold"           : "Courier-Bold",
        "monospace|italic"         : "Courier-Oblique",
        "monospace|bold|italic"    : "Courier-BoldOblique",
        "zapfdingbats"             : "ZapfDingbats",
        "zapfdingbats|bold"        : "ZapfDingbats",
        "zapfdingbats|italic"      : "ZapfDingbats",
        "zapfdingbats|bold|italic" : "ZapfDingbats"
    };

    function fontAlias(alias, name) {
        alias = alias.toLowerCase();
        FONT_MAPPINGS[alias] = function() {
            return FONT_MAPPINGS[name];
        };
        FONT_MAPPINGS[alias + "|bold"] = function() {
            return FONT_MAPPINGS[name + "|bold"];
        };
        FONT_MAPPINGS[alias + "|italic"] = function() {
            return FONT_MAPPINGS[name + "|italic"];
        };
        FONT_MAPPINGS[alias + "|bold|italic"] = function() {
            return FONT_MAPPINGS[name + "|bold|italic"];
        };
    }

    // Let's define some common names to an appropriate replacement.
    // These are overridable via kendo.pdf.defineFont, should the user
    // want to include the proper versions.

    fontAlias("Times New Roman" , "serif");
    fontAlias("Courier New"     , "monospace");
    fontAlias("Arial"           , "sans-serif");
    fontAlias("Helvetica"       , "sans-serif");
    fontAlias("Verdana"         , "sans-serif");
    fontAlias("Tahoma"          , "sans-serif");
    fontAlias("Georgia"         , "sans-serif");
    fontAlias("Monaco"          , "monospace");
    fontAlias("Andale Mono"     , "monospace");

    function defineFont(name, url) {
        if (arguments.length == 1) {
            for (var i in name) {
                if (hasOwnProperty(name, i)) {
                    defineFont(i, name[i]);
                }
            }
        } else {
            name = name.toLowerCase();
            FONT_MAPPINGS[name] = url;

            // special handling for DejaVu fonts: if they get defined,
            // let them also replace the default families, for good
            // Unicode support out of the box.
            switch (name) {
              case "dejavu sans"               : FONT_MAPPINGS["sans-serif"]              = url; break;
              case "dejavu sans|bold"          : FONT_MAPPINGS["sans-serif|bold"]         = url; break;
              case "dejavu sans|italic"        : FONT_MAPPINGS["sans-serif|italic"]       = url; break;
              case "dejavu sans|bold|italic"   : FONT_MAPPINGS["sans-serif|bold|italic"]  = url; break;
              case "dejavu serif"              : FONT_MAPPINGS["serif"]                   = url; break;
              case "dejavu serif|bold"         : FONT_MAPPINGS["serif|bold"]              = url; break;
              case "dejavu serif|italic"       : FONT_MAPPINGS["serif|italic"]            = url; break;
              case "dejavu serif|bold|italic"  : FONT_MAPPINGS["serif|bold|italic"]       = url; break;
              case "dejavu mono"               : FONT_MAPPINGS["monospace"]               = url; break;
              case "dejavu mono|bold"          : FONT_MAPPINGS["monospace|bold"]          = url; break;
              case "dejavu mono|italic"        : FONT_MAPPINGS["monospace|italic"]        = url; break;
              case "dejavu mono|bold|italic"   : FONT_MAPPINGS["monospace|bold|italic"]   = url; break;
            }
        }
    }

    /// exports.

    kendo.pdf = {
        Document      : PDFDocument,
        BinaryStream  : BinaryStream,
        defineFont    : defineFont,
        parseFontDef  : parseFontDef,
        getFontURL    : getFontURL,
        loadFonts     : loadFonts,
        loadImages    : loadImages,

        TEXT_RENDERING_MODE : {
            fill           : 0,
            stroke         : 1,
            fillAndStroke  : 2,
            invisible      : 3,
            fillAndClip    : 4,
            strokeAndClip  : 5,
            fillStrokeClip : 6,
            clip           : 7
        }
    };

    function mmul(a, b) {
        var a1 = a[0], b1 = a[1], c1 = a[2], d1 = a[3], e1 = a[4], f1 = a[5];
        var a2 = b[0], b2 = b[1], c2 = b[2], d2 = b[3], e2 = b[4], f2 = b[5];
        return [
            a1*a2 + b1*c2,          a1*b2 + b1*d2,
            c1*a2 + d1*c2,          c1*b2 + d1*d2,
            e1*a2 + f1*c2 + e2,     e1*b2 + f1*d2 + f2
        ];
    }

    function isIdentityMatrix(m) {
        return m[0] === 1 && m[1] === 0 && m[2] === 0 && m[3] === 1 && m[4] === 0 && m[5] === 0;
    }

})(this, parseFloat);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
