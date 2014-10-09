(function(f, define){
    define([ "../kendo.core" ], f);
})(function(){

(function(global, parseFloat, undefined){

    "use strict";

    // WARNING: removing the following jshint declaration and turning
    // == into === to make JSHint happy will break functionality.
    /* jshint eqnull:true */
    /* jshint loopfunc:true */
    /* jshint newcap:false */
    /* global VBArray */

    // XXX: remove this junk (assume `true`) when we no longer have to support IE < 10
    var HAS_TYPED_ARRAYS = !!global.Uint8Array;

    var NL = "\n";

    var RESOURCE_COUNTER = 0;

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
                    // toFixed() to make sure it doesn't end up in exponent
                    // notation, then parseFloat to remove trailing zeros.
                    output.writeString(parseFloat(x.toFixed(7))+"");
                }
                else if (typeof x == "string") {
                    output.writeString(x);
                }
                else if (typeof x.get == "function") {
                    output.write(x.get());
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
            return (options && name in options) ? options[name] : defval;
        }

        self.getOption = getOption;

        self.attach = function(value) {
            if (objects.indexOf(value) < 0) {
                wrapObject(value, ++objcount);
                objects.push(value);
            }
            return value;
        };

        self.FONTS = {};
        self.IMAGES = {};

        var paperSize = getOption("paperSize", PAPER_SIZE.a4);
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
            margin.left = unitsToPoints(margin.left, 0);
            margin.top = unitsToPoints(margin.top, 0);
            margin.right = unitsToPoints(margin.right, 0);
            margin.bottom = unitsToPoints(margin.bottom, 0);
            if (getOption("addMargin")) {
                paperSize[0] += margin.left + margin.right;
                paperSize[1] += margin.top + margin.bottom;
            }
        }

        var contentWidth = paperSize[0];
        var contentHeight = paperSize[1];

        if (margin) {
            contentWidth -= margin.left + margin.right;
            contentHeight -= margin.top + margin.bottom;
        }

        var catalog = self.attach(new PDFCatalog());
        var pageTree = self.attach(new PDFPageTree([ 0, 0, paperSize[0], paperSize[1] ]));
        catalog.setPages(pageTree);

        self.addPage = function() {
            var content = new PDFStream(makeOutput(), null, true);
            var page = new PDFPage(self, {
                Contents : self.attach(content),
                Parent   : pageTree
            });
            page._content = content;
            pageTree.addPage(self.attach(page));

            // canvas-like coord. system.  (0,0) is upper-left.
            // text must be vertically mirorred before drawing.
            // XXX: configurable page size.
            page.transform(1, 0, 0, -1, 0, paperSize[1]);

            if (margin) {
                page.transform(1, 0, 0, 1, margin.left, margin.top);
                // XXX: clip to right/bottom margin.  Make this optional?
                page.rect(0, 0, contentWidth, contentHeight);
                page.clip();
            }

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

            return out.stream();
        };
    }

    var FONT_CACHE = {};
    STANDARD_FONTS.forEach(function(name){
        FONT_CACHE[name] = true;
    });

    // XXX: error handling in loadBinary?
    var loadBinary = HAS_TYPED_ARRAYS ? function loadBinary(url, cont) {
        var req = new XMLHttpRequest();
        req.open('GET', url, true);
        req.responseType = "arraybuffer";
        req.onload = function() {
            cont(new Uint8Array(req.response));
        };
        req.send(null);
    } : function loadBinary(url, cont) {
        // these days we should only get here for IE<10, so this
        // function is IE-specific (works only on IE9 actually).
        var req = new XMLHttpRequest();
        req.open('GET', url, true);
        req.onreadystatechange = function() {
            if (req.readyState == 4) {
                if (req.status == 200 || req.status == 304) {
                    // the following line works in IE9 only.
                    var bytes = new VBArray(req.responseBody).toArray();
                    cont(bytes);
                }
            }
        };
        req.send(null);
    };

    function loadFont(url, cont) {
        var font = FONT_CACHE[url];
        if (font) {
            cont(font);
        } else {
            loadBinary(url, function(data){
                var font = new global.kendo.pdf.TTFFont(data);
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
            img = new Image();
            img.onload = function() {
                var canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                var ctx = canvas.getContext("2d");

                ctx.drawImage(img, 0, 0);

                // in case it contains transparency, we must separate rgb data from the alpha
                // channel and create a PDFRawImage image with opacity.  otherwise we can use a
                // PDFJpegImage.
                //
                // to do this in one step, we create the rgb and alpha streams anyway, even if
                // we might end up not using them if hasAlpha remains false.

                var hasAlpha = false, rgb = BinaryStream(), alpha = BinaryStream();
                var imgdata = ctx.getImageData(0, 0, img.width, img.height);
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
            img.src = url;
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
                    Type: PDFName.get("ExtGState")
                };
                if (forStroke) {
                    props.CA = opacity;
                } else {
                    props.ca = opacity;
                }
                gs = this.attach(new PDFDictionary(props));
                gs._resourceName = PDFName.get("GS" + (++RESOURCE_COUNTER));
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

    function unitsToPoints(x, def) {
        if (typeof x == "number") {
            return x;
        }
        if (typeof x == "string") {
            var m = /^\s*([0-9.]+)\s*mm$/.exec(x);
            if (m) {
                return mm2pt(parseFloat(m[1]));
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
            if (!empty) {
                out.indent();
            }
            out(">>");
        }
    });

    /// streams

    var PDFStream = defclass(function PDFStream(data, props, compress) {
        this.data = data;
        this.props = props || {};
        this.compress = compress;
    }, {
        render: function(out) {
            var data = this.data.get(), props = this.props;
            if (this.compress && global.pako) {
                if (!props.Filter) {
                    props.Filter = [];
                } else if (!(props.Filter instanceof Array)) {
                    props.Filter = [ props.Filter ];
                }
                props.Filter.unshift(PDFName.get("FlateDecode"));
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
        props.Type = PDFName.get("Catalog");
    }, {
        setPages: function(pagesObj) {
            this.props.Pages = pagesObj;
        }
    }, PDFDictionary);

    /// page tree

    var PDFPageTree = defclass(function PDFPageTree(mediabox){
        this.props = {
            Type  : PDFName.get("Pages"),
            Kids  : [],
            Count : 0,

            MediaBox : mediabox
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
                Type             : PDFName.get("XObject"),
                Subtype          : PDFName.get("Image"),
                Width            : width,
                Height           : height,
                BitsPerComponent : 8,
                ColorSpace       : PDFName.get("DeviceRGB"),
                Filter           : PDFName.get("DCTDecode")
            });
            stream._resourceName = PDFName.get("I" + (++RESOURCE_COUNTER));
            return stream;
        };
    }

    // PDFRawImage will be used for images with transparency (PNG)

    function PDFRawImage(width, height, rgb, alpha) {
        this.asStream = function(pdf) {
            var mask = new PDFStream(alpha, {
                Type             : PDFName.get("XObject"),
                Subtype          : PDFName.get("Image"),
                Width            : width,
                Height           : height,
                BitsPerComponent : 8,
                ColorSpace       : PDFName.get("DeviceGray")
            }, true);
            var stream = new PDFStream(rgb, {
                Type             : PDFName.get("XObject"),
                Subtype          : PDFName.get("Image"),
                Width            : width,
                Height           : height,
                BitsPerComponent : 8,
                ColorSpace       : PDFName.get("DeviceRGB"),
                SMask            : pdf.attach(mask)
            }, true);
            stream._resourceName = PDFName.get("I" + (++RESOURCE_COUNTER));
            return stream;
        };
    }

    /// standard fonts

    var PDFStandardFont = defclass(function PDFStandardFont(name){
        this.props = {
            Type     : PDFName.get("Font"),
            Subtype  : PDFName.get("Type1"),
            BaseFont : PDFName.get(name)
        };
        this._resourceName = PDFName.get("F" + (++RESOURCE_COUNTER));
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
        this._resourceName = PDFName.get("F" + (++RESOURCE_COUNTER));

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

    /// page object

    var PDFPage = defclass(function PDFPage(pdf, props){
        this._pdf = pdf;
        this._rcount = 0;
        this._textMode = false;
        this._fontResources = {};
        this._gsResources = {};
        this._xResources = {};
        this._opacity = 1;

        this._font = null;
        this._fontSize = null;

        this._contextStack = [];

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
            var gs = this._pdf.getOpacityGS(this._opacity * opacity, true);
            this._gsResources[gs._resourceName] = gs;
            this._out(gs._resourceName, " gs", NL);
        },
        setFillColor: function(r, g, b) {
            this._out(r, " ", g, " ", b, " rg", NL);
        },
        setFillOpacity: function(opacity) {
            var gs = this._pdf.getOpacityGS(this._opacity * opacity, false);
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
        clip: function() {
            this._out("W n", NL);
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
        },

        // internal
        _context: function(val) {
            if (val != null) {
                this._opacity = val.opacity;
            } else {
                return {
                    opacity: this._opacity
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
            return new Uint8Array(data.buffer.slice(start, start + length));
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

            times       : times,
            get         : get,
            slice       : slice,

            offset: function(pos) {
                if (pos != null) {
                    offset = pos;
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
            fontFamily : m[14].split(/\s*,\s*/g)
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
                    return url;
                }
            }
        } else {
            url = FONT_MAPPINGS[fontFamily.toLowerCase()];
        }
        if (!url) {
            url = "Times-Roman";
        }
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
        "monospace|bold|italic"  : "Courier-BoldOblique"
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

    global.kendo.pdf = {
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

})(this, parseFloat);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
