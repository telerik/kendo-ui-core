(function(f, define){
    define([ "./kendo.core" ], f);
})(function(){

    var __meta__ = { // jshint ignore:line
        id: "color",
        name: "Color utils",
        category: "framework",
        advanced: true,
        description: "Color utilities used across components",
        depends: [ "core" ]
    };

(function ($, parseFloat, parseInt) {
    var Color = function(value) {
        var color = this,
            formats = Color.formats,
            re,
            processor,
            parts,
            i,
            channels;

        if (arguments.length === 1) {
            value = color.resolveColor(value);

            for (i = 0; i < formats.length; i++) {
                re = formats[i].re;
                processor = formats[i].process;
                parts = re.exec(value);

                if (parts) {
                    channels = processor(parts);
                    color.r = channels[0];
                    color.g = channels[1];
                    color.b = channels[2];
                }
            }
        } else {
            color.r = arguments[0];
            color.g = arguments[1];
            color.b = arguments[2];
        }

        color.r = color.normalizeByte(color.r);
        color.g = color.normalizeByte(color.g);
        color.b = color.normalizeByte(color.b);
    };

    Color.prototype = {
        toHex: function() {
            var color = this,
                pad = color.padDigit,
                r = color.r.toString(16),
                g = color.g.toString(16),
                b = color.b.toString(16);

            return "#" + pad(r) + pad(g) + pad(b);
        },

        resolveColor: function(value) {
            value = value || "black";

            if (value.charAt(0) == "#") {
                value = value.substr(1, 6);
            }

            value = value.replace(/ /g, "");
            value = value.toLowerCase();
            value = Color.namedColors[value] || value;

            return value;
        },

        normalizeByte: function(value) {
            return (value < 0 || isNaN(value)) ? 0 : ((value > 255) ? 255 : value);
        },

        padDigit: function(value) {
            return (value.length === 1) ? "0" + value : value;
        },

        brightness: function(value) {
            var color = this,
                round = Math.round;

            color.r = round(color.normalizeByte(color.r * value));
            color.g = round(color.normalizeByte(color.g * value));
            color.b = round(color.normalizeByte(color.b * value));

            return color;
        },

        percBrightness: function() {
            var color = this;

            return Math.sqrt(0.241 * color.r * color.r + 0.691 * color.g * color.g + 0.068 * color.b * color.b);
        }
    };

    Color.formats = [{
            re: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
            process: function(parts) {
                return [
                    parseInt(parts[1], 10), parseInt(parts[2], 10), parseInt(parts[3], 10)
                ];
            }
        }, {
            re: /^(\w{2})(\w{2})(\w{2})$/,
            process: function(parts) {
                return [
                    parseInt(parts[1], 16), parseInt(parts[2], 16), parseInt(parts[3], 16)
                ];
            }
        }, {
            re: /^(\w{1})(\w{1})(\w{1})$/,
            process: function(parts) {
                return [
                    parseInt(parts[1] + parts[1], 16),
                    parseInt(parts[2] + parts[2], 16),
                    parseInt(parts[3] + parts[3], 16)
                ];
            }
        }
    ];

    Color.namedColors = {
        aliceblue: "f0f8ff", antiquewhite: "faebd7", aqua: "00ffff",
        aquamarine: "7fffd4", azure: "f0ffff", beige: "f5f5dc",
        bisque: "ffe4c4", black: "000000", blanchedalmond: "ffebcd",
        blue: "0000ff", blueviolet: "8a2be2", brown: "a52a2a",
        burlywood: "deb887", cadetblue: "5f9ea0", chartreuse: "7fff00",
        chocolate: "d2691e", coral: "ff7f50", cornflowerblue: "6495ed",
        cornsilk: "fff8dc", crimson: "dc143c", cyan: "00ffff",
        darkblue: "00008b", darkcyan: "008b8b", darkgoldenrod: "b8860b",
        darkgray: "a9a9a9", darkgrey: "a9a9a9", darkgreen: "006400",
        darkkhaki: "bdb76b", darkmagenta: "8b008b", darkolivegreen: "556b2f",
        darkorange: "ff8c00", darkorchid: "9932cc", darkred: "8b0000",
        darksalmon: "e9967a", darkseagreen: "8fbc8f", darkslateblue: "483d8b",
        darkslategray: "2f4f4f", darkslategrey: "2f4f4f", darkturquoise: "00ced1",
        darkviolet: "9400d3", deeppink: "ff1493", deepskyblue: "00bfff",
        dimgray: "696969", dimgrey: "696969", dodgerblue: "1e90ff",
        firebrick: "b22222", floralwhite: "fffaf0", forestgreen: "228b22",
        fuchsia: "ff00ff", gainsboro: "dcdcdc", ghostwhite: "f8f8ff",
        gold: "ffd700", goldenrod: "daa520", gray: "808080",
        grey: "808080", green: "008000", greenyellow: "adff2f",
        honeydew: "f0fff0", hotpink: "ff69b4", indianred: "cd5c5c",
        indigo: "4b0082", ivory: "fffff0", khaki: "f0e68c",
        lavender: "e6e6fa", lavenderblush: "fff0f5", lawngreen: "7cfc00",
        lemonchiffon: "fffacd", lightblue: "add8e6", lightcoral: "f08080",
        lightcyan: "e0ffff", lightgoldenrodyellow: "fafad2", lightgray: "d3d3d3",
        lightgrey: "d3d3d3", lightgreen: "90ee90", lightpink: "ffb6c1",
        lightsalmon: "ffa07a", lightseagreen: "20b2aa", lightskyblue: "87cefa",
        lightslategray: "778899", lightslategrey: "778899", lightsteelblue: "b0c4de",
        lightyellow: "ffffe0", lime: "00ff00", limegreen: "32cd32",
        linen: "faf0e6", magenta: "ff00ff", maroon: "800000",
        mediumaquamarine: "66cdaa", mediumblue: "0000cd", mediumorchid: "ba55d3",
        mediumpurple: "9370d8", mediumseagreen: "3cb371", mediumslateblue: "7b68ee",
        mediumspringgreen: "00fa9a", mediumturquoise: "48d1cc", mediumvioletred: "c71585",
        midnightblue: "191970", mintcream: "f5fffa", mistyrose: "ffe4e1",
        moccasin: "ffe4b5", navajowhite: "ffdead", navy: "000080",
        oldlace: "fdf5e6", olive: "808000", olivedrab: "6b8e23",
        orange: "ffa500", orangered: "ff4500", orchid: "da70d6",
        palegoldenrod: "eee8aa", palegreen: "98fb98", paleturquoise: "afeeee",
        palevioletred: "d87093", papayawhip: "ffefd5", peachpuff: "ffdab9",
        peru: "cd853f", pink: "ffc0cb", plum: "dda0dd",
        powderblue: "b0e0e6", purple: "800080", red: "ff0000",
        rosybrown: "bc8f8f", royalblue: "4169e1", saddlebrown: "8b4513",
        salmon: "fa8072", sandybrown: "f4a460", seagreen: "2e8b57",
        seashell: "fff5ee", sienna: "a0522d", silver: "c0c0c0",
        skyblue: "87ceeb", slateblue: "6a5acd", slategray: "708090",
        slategrey: "708090", snow: "fffafa", springgreen: "00ff7f",
        steelblue: "4682b4", tan: "d2b48c", teal: "008080",
        thistle: "d8bfd8", tomato: "ff6347", turquoise: "40e0d0",
        violet: "ee82ee", wheat: "f5deb3", white: "ffffff",
        whitesmoke: "f5f5f5", yellow: "ffff00", yellowgreen: "9acd32"
    };

    // Tools from ColorPicker =================================================

    var namedColorRegexp = [ "transparent" ];
    for (var i in Color.namedColors) {
        if (Color.namedColors.hasOwnProperty(i)) {
            namedColorRegexp.push(i);
        }
    }
    namedColorRegexp = new RegExp("^(" + namedColorRegexp.join("|") + ")(\\W|$)", "i");

    /*jshint eqnull:true  */

    function parseColor(color, nothrow) {
        var m, ret;
        if (color == null || color == "none") {
            return null;
        }
        if (color instanceof _Color) {
            return color;
        }
        color = color.toLowerCase();
        if ((m = namedColorRegexp.exec(color))) {
            if (m[1] == "transparent") {
                color = new _RGB(1, 1, 1, 0);
            }
            else {
                color = parseColor(Color.namedColors[m[1]], nothrow);
            }
            color.match = [ m[1] ];
            return color;
        }
        if ((m = /^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})\b/i.exec(color))) {
            ret = new _Bytes(parseInt(m[1], 16),
                             parseInt(m[2], 16),
                             parseInt(m[3], 16), 1);
        }
        else if ((m = /^#?([0-9a-f])([0-9a-f])([0-9a-f])\b/i.exec(color))) {
            ret = new _Bytes(parseInt(m[1] + m[1], 16),
                             parseInt(m[2] + m[2], 16),
                             parseInt(m[3] + m[3], 16), 1);
        }
        else if ((m = /^rgb\(\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\s*\)/.exec(color))) {
            ret = new _Bytes(parseInt(m[1], 10),
                             parseInt(m[2], 10),
                             parseInt(m[3], 10), 1);
        }
        else if ((m = /^rgba\(\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9.]+)\s*\)/.exec(color))) {
            ret = new _Bytes(parseInt(m[1], 10),
                             parseInt(m[2], 10),
                             parseInt(m[3], 10), parseFloat(m[4]));
        }
        else if ((m = /^rgb\(\s*([0-9]*\.?[0-9]+)%\s*,\s*([0-9]*\.?[0-9]+)%\s*,\s*([0-9]*\.?[0-9]+)%\s*\)/.exec(color))) {
            ret = new _RGB(parseFloat(m[1]) / 100,
                           parseFloat(m[2]) / 100,
                           parseFloat(m[3]) / 100, 1);
        }
        else if ((m = /^rgba\(\s*([0-9]*\.?[0-9]+)%\s*,\s*([0-9]*\.?[0-9]+)%\s*,\s*([0-9]*\.?[0-9]+)%\s*,\s*([0-9.]+)\s*\)/.exec(color))) {
            ret = new _RGB(parseFloat(m[1]) / 100,
                           parseFloat(m[2]) / 100,
                           parseFloat(m[3]) / 100, parseFloat(m[4]));
        }
        if (ret) {
            ret.match = m;
        } else if (!nothrow) {
            throw new Error("Cannot parse color: " + color);
        }
        return ret;
    }

    function hex(n, width, pad) {
        if (!pad) { pad = "0"; }
        n = n.toString(16);
        while (width > n.length) {
            n = "0" + n;
        }
        return n;
    }

    function hue2rgb(p, q, t) {
        if (t < 0) {
            t += 1;
        }

        if (t > 1) {
            t -= 1;
        }

        if (t < 1/6) {
            return p + (q - p) * 6 * t;
        }

        if (t < 1/2) {
            return q;
        }

        if (t < 2/3) {
            return p + (q - p) * (2/3 - t) * 6;
        }

        return p;
    }

    var _Color = kendo.Class.extend({
        toHSV: function() { return this; },
        toRGB: function() { return this; },
        toHex: function() { return this.toBytes().toHex(); },
        toBytes: function() { return this; },
        toCss: function() { return "#" + this.toHex(); },
        toCssRgba: function() {
            var rgb = this.toBytes();
            return "rgba(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ", " + parseFloat((+this.a).toFixed(3)) + ")";
        },
        toDisplay: function() {
            if (kendo.support.browser.msie && kendo.support.browser.version < 9) {
                return this.toCss(); // no RGBA support; does it support any opacity in colors?
            }
            return this.toCssRgba();
        },
        equals: function(c) { return c === this || c !== null && this.toCssRgba() == parseColor(c).toCssRgba(); },
        diff: function(c2) {
            if (c2 == null) {
                return NaN;
            }
            var c1 = this.toBytes();
            c2 = c2.toBytes();
            return Math.sqrt(Math.pow((c1.r - c2.r) * 0.30, 2) +
                             Math.pow((c1.g - c2.g) * 0.59, 2) +
                             Math.pow((c1.b - c2.b) * 0.11, 2));
        },
        clone: function() {
            var c = this.toBytes();
            if (c === this) {
                c = new _Bytes(c.r, c.g, c.b, c.a);
            }
            return c;
        }
    });

    var _RGB = _Color.extend({
        init: function(r, g, b, a) {
            this.r = r; this.g = g; this.b = b; this.a = a;
        },
        toHSV: function() {
            var min, max, delta, h, s, v;
            var r = this.r, g = this.g, b = this.b;
            min = Math.min(r, g, b);
            max = Math.max(r, g, b);
            v = max;
            delta = max - min;
            if (delta === 0) {
                return new _HSV(0, 0, v, this.a);
            }
            if (max !== 0) {
                s = delta / max;
                if (r == max) {
                    h = (g - b) / delta;
                } else if (g == max) {
                    h = 2 + (b - r) / delta;
                } else {
                    h = 4 + (r - g) / delta;
                }
                h *= 60;
                if (h < 0) {
                    h += 360;
                }
            } else {
                s = 0;
                h = -1;
            }
            return new _HSV(h, s, v, this.a);
        },
        toHSL: function() {
            var r = this.r, g = this.g, b = this.b;
            var max = Math.max(r, g, b), min = Math.min(r, g, b);
            var h, s, l = (max + min) / 2;

            if(max == min) {
                h = s = 0;
            }
            else {
                var d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch(max) {
                    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                    case g: h = (b - r) / d + 2; break;
                    case b: h = (r - g) / d + 4; break;
                }

                h *= 60;
                s *= 100;
                l *= 100;
            }

            return new _HSL(h, s, l, this.a);
        },
        toBytes: function() {
            return new _Bytes(this.r * 255, this.g * 255, this.b * 255, this.a);
        }
    });

    var _Bytes = _RGB.extend({
        init: function(r, g, b, a) {
            this.r = Math.round(r); this.g = Math.round(g); this.b = Math.round(b); this.a = a;
        },
        toRGB: function() {
            return new _RGB(this.r / 255, this.g / 255, this.b / 255, this.a);
        },
        toHSV: function() {
            return this.toRGB().toHSV();
        },
        toHSL: function() {
            return this.toRGB().toHSL();
        },
        toHex: function() {
            return hex(this.r, 2) + hex(this.g, 2) + hex(this.b, 2);
        },
        toBytes: function() {
            return this;
        }
    });

    var _HSV = _Color.extend({
        init: function(h, s, v, a) {
            this.h = h; this.s = s; this.v = v; this.a = a;
        },
        toRGB: function() {
            var h = this.h, s = this.s, v = this.v;
            var i, r, g, b, f, p, q, t;
            if (s === 0) {
                r = g = b = v;
            } else {
                h /= 60;
                i = Math.floor(h);
                f = h - i;
                p = v * (1 - s);
                q = v * (1 - s * f);
                t = v * (1 - s * (1 - f));
                switch (i) {
                  case 0  : r = v; g = t; b = p; break;
                  case 1  : r = q; g = v; b = p; break;
                  case 2  : r = p; g = v; b = t; break;
                  case 3  : r = p; g = q; b = v; break;
                  case 4  : r = t; g = p; b = v; break;
                  default : r = v; g = p; b = q; break;
                }
            }
            return new _RGB(r, g, b, this.a);
        },
        toHSL: function() {
            return this.toRGB().toHSL();
        },
        toBytes: function() {
            return this.toRGB().toBytes();
        }
    });

    var _HSL = _Color.extend({
        init: function(h, s, l, a) {
            this.h = h; this.s = s; this.l = l; this.a = a;
        },
        toRGB: function() {
            var h = this.h, s = this.s, l = this.l;
            var r, g, b;

            if (s === 0) {
                r = g = b = l; // achromatic
            }
            else {
                h /= 360;
                s /= 100;
                l /= 100;

                var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                var p = 2 * l - q;
                r = hue2rgb(p, q, h + 1/3);
                g = hue2rgb(p, q, h);
                b = hue2rgb(p, q, h - 1/3);
            }

            return new _RGB(r, g, b, this.a);
        },
        toHSV: function() {
            return this.toRGB().toHSV();
        },
        toBytes: function() {
            return this.toRGB().toBytes();
        }
    });

    Color.fromBytes = function(r, g, b, a) {
        return new _Bytes(r, g, b, a != null ? a : 1);
    };

    Color.fromRGB = function(r, g, b, a) {
        return new _RGB(r, g, b, a != null ? a : 1);
    };

    Color.fromHSV = function(h, s, v, a) {
        return new _HSV(h, s, v, a != null ? a : 1);
    };

    Color.fromHSL = function(h, s, l, a) {
        return new _HSL(h, s, l, a != null ? a : 1);
    };

    // Exports ================================================================
    kendo.Color = Color;
    kendo.parseColor = parseColor;

})(window.kendo.jQuery, parseFloat, parseInt);

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
