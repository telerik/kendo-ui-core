(function(f, define){
    define([ "./kendo.core" ], f);
})(function(){

    var __meta__ = {
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
        aqua: "00ffff", azure: "f0ffff", beige: "f5f5dc",
        black: "000000", blue: "0000ff", brown: "a52a2a",
        coral: "ff7f50", cyan: "00ffff", darkblue: "00008b",
        darkcyan: "008b8b", darkgray: "a9a9a9", darkgreen: "006400",
        darkorange: "ff8c00", darkred: "8b0000", dimgray: "696969",
        fuchsia: "ff00ff", gold: "ffd700", goldenrod: "daa520",
        gray: "808080", green: "008000", greenyellow: "adff2f",
        indigo: "4b0082", ivory: "fffff0", khaki: "f0e68c",
        lightblue: "add8e6", lightgrey: "d3d3d3", lightgreen: "90ee90",
        lightpink: "ffb6c1", lightyellow: "ffffe0", lime: "00ff00",
        limegreen: "32cd32", linen: "faf0e6", magenta: "ff00ff",
        maroon: "800000", mediumblue: "0000cd", navy: "000080",
        olive: "808000", orange: "ffa500", orangered: "ff4500",
        orchid: "da70d6", pink: "ffc0cb", plum: "dda0dd",
        purple: "800080", red: "ff0000", royalblue: "4169e1",
        salmon: "fa8072", silver: "c0c0c0", skyblue: "87ceeb",
        slateblue: "6a5acd", slategray: "708090", snow: "fffafa",
        steelblue: "4682b4", tan: "d2b48c", teal: "008080",
        tomato: "ff6347", turquoise: "40e0d0", violet: "ee82ee",
        wheat: "f5deb3", white: "ffffff", whitesmoke: "f5f5f5",
        yellow: "ffff00", yellowgreen: "9acd32"
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
        if ((m = /^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})/i.exec(color))) {
            ret = new _Bytes(parseInt(m[1], 16),
                             parseInt(m[2], 16),
                             parseInt(m[3], 16), 1);
        }
        else if ((m = /^#?([0-9a-f])([0-9a-f])([0-9a-f])/i.exec(color))) {
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

    // Exports ================================================================
    kendo.Color = Color;
    kendo.parseColor = parseColor;

})(window.kendo.jQuery, parseFloat, parseInt);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
