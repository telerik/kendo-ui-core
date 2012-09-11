(function($, undefined) {

    var CssColorRegExp = /(rgb|hsl)a?\(\s*(\d+)\s*,\s*(\d+%?)\s*,\s*(\d+%?)\s*,?\s*([\.\d]+?)?\s*\)/i,
        CssHexRegExp = /^#(([0-9a-f]{3})|([0-9a-f]{6}))$/i,
        zeroTrimRegExp = /^0+|\.?0+$/g,
        props = {
            "rgb": [ "red", "green", "blue", "alpha" ],
            "hsl": [ "h", "s", "l", "a" ]
        },
        colorwheel = {
            complement: [ 180 ],
            diad: [ 60 ],
            analogous: [ 30, -30 ],
            split: [ 150, -150 ],
            triad: [ 120, -120 ],
            double: [ 30, 180, -150 ],
            tetradic: [ 60, 180, -120 ],
            square: [ 90, 180, -90 ]
        },
        clamps = { h: 360, s: 100, l: 100, a: 1 },
        min = Math.min,
        max = Math.max,
        round = Math.round;

    function clampValue(value, minValue, maxValue) {
        return max(minValue, min(value, maxValue));
    }

    function trimZeroes(value) {
        return value.toFixed(2).replace(zeroTrimRegExp, "");
    }

    function buildPercent(percent) {
        percent = (percent || 10) / 100;
        var color = round(percent * 255);

        return "rgba(" + color + "," + color + "," + color + ",0)";
    }

    function parseColor(color) {
        var tmp = CssColorRegExp.exec(color),
            type = tmp[1],
            result = {};

        for (var i = 0, len = props[type].length; i < len - 1; i++) {
            result[props[type][i]] = parseInt(tmp[i+2], 10);
        }

        if (typeof tmp[5] != "undefined") {
            result[props[type][3]] = +(parseFloat(tmp[5]).toFixed(2));
        } else {
            result[props[type][3]] = 1;
        }

        return result;
    }

    function colorBrightness(color) {
        return ((color.red*299) + (color.green*587) + (color.blue*114)) / 1000;
    }

    function colorDifference(color1, color2) {
        return (max(color1.red, color2.red) - min(color1.red, color2.red)) +
               (max(color1.green, color2.green) - min(color1.green, color2.green)) +
               (max(color1.blue, color2.blue) - min(color1.blue, color2.blue));
    }

    function constructRgb(color, withAlpha) {
        return "rgb" + (withAlpha ? "a" : "") + "(" + color.red + "," + color.green + "," + color.blue + (withAlpha ? "," + (trimZeroes(color.alpha) || "0") : "") + ")";
    }

    window.Color = kendo.Observable.extend({
        init: function(color) {
            this.set(color);
        },

        toHex: function () {
            return this.rgb2hex(this.value);
        },

        toRgb: function () {
            return constructRgb(this.value);
        },

        toRgba: function () {
            return constructRgb(this.value, true);
        },

        get: function() {
            return this.color2css(this.value);
        },

        set: function (value) {
            return this._set(this.css2rgba(value || "#000"));
        },

        compress: function(cssColor) {
            return this.color2css(this.css2rgba(cssColor));
        },

        _set: function (value) {
            var that = this;

            that.value = value;
            that.colorValue = value;

            return this;
        },

        add: function (color) {
            return this._set(this.addition(this.toRgba(), color));
        },

        subtract: function (color) {
            return this._set(this.subtraction(this.toRgba(), color));
        },

        lighten: function (percent) {
            return this._set(this.addition(this.toRgba(), buildPercent(percent)));
        },

        darken: function (percent) {
            return this._set(this.subtraction(this.toRgba(), buildPercent(percent)));
        },

        tint: function () {
            return this._set(this.addition(this.toRgba(), "#101010"));
        },

        shade: function () {
            return this._set(this.subtraction(this.toRgba(), "rgba(16,16,16,0)"));
        },

        tone: function () {
            return this._set(this.addition(this.toRgba(), "#999"));
        },

        readable: function () {
            var color;

            if (this.lighterThan("#999")) {
                color = this.subtraction(this.toRgba(), buildPercent(100));
            } else {
                color = this.addition(this.toRgba(), buildPercent(100));
            }
            color.alpha = 1;

            return this.color2css(color);
        },

        isHex: function(testee) {
            return (CssHexRegExp.test(testee));
        },

        isRgba: function(testee) {
            var color = CssColorRegExp.exec(testee);
            return (color ? color[1] == "rgb" : false);
        },

        isHsla: function(testee) {
            var color = CssColorRegExp.exec(testee);
            return (color ? color[1] == "hsl" : false);
        },

        color2css: function(color) {
            if (!color) return undefined;

            if (color.alpha === 1) {
                return this.rgb2hex(color);
            } else {
                return constructRgb(color, true);
            }
        },

        lighterThan: function(color) {
            color = this.css2rgba(color);
            return colorBrightness(color) - colorBrightness(this.value) < 20;
        },

        darkerThan: function(color) {
            color = this.css2rgba(color);
            return colorBrightness(this.value) - colorBrightness(color) < -20;
        },

        hex2rgb: function(hex) {
            if (!this.isHex(hex)) {
                throw Error("Invalid input");
            }

            if (hex.length == 4) {
                return {
                    red: parseInt(hex.substring(1, 2) + hex.substring(1, 2), 16),
                    green: parseInt(hex.substring(2, 3) + hex.substring(2, 3), 16),
                    blue: parseInt(hex.substring(3, 4) + hex.substring(3, 4), 16),
                    alpha: 1
                };
            }
            else {
                return {
                    red: parseInt(hex.substring(1, 3), 16),
                    green: parseInt(hex.substring(3, 5), 16),
                    blue: parseInt(hex.substring(5, 7), 16),
                    alpha: 1
                };
            }
        },

        rgb2hex: function(rgb) {
            var result = ['#'],
                red = rgb.red.toString(16),
                green = rgb.green.toString(16),
                blue = rgb.blue.toString(16);

            if (red.length < 2) {
                red = "0" + red;
            }

            if (green.length < 2) {
                green = "0" + green;
            }

            if (blue.length < 2) {
                blue = "0" + blue;
            }

            if (red[0] == red[1] && green[0] == green[1] && blue[0] == blue[1]) {
                red = red[0];
                green = green[0];
                blue = blue[0];
            }
            result[result.length] = red;
            result[result.length] = green;
            result[result.length] = blue;

            return result.join('');
        },

        css2rgba: function(cssColor) {
            var that = this,
                type = that.isHex(cssColor) ? "hex" : that.isRgba(cssColor) ? "rgba" : that.isHsla(cssColor) ? "hsla" : "named";

            if (type == "hex") {
                return that.hex2rgb(cssColor);
            } else if (type == "named") {
                if (cssColor == "transparent") {
                    return { red: 0, green: 0, blue: 0, alpha: 0 };
                }
            } else {
                return type == "rgba" ? parseColor(cssColor) : that.hsl2rgb(parseColor(cssColor));
            }
        },

        css2hex: function(cssColor) {
            var that = this;

            if (!cssColor || !that.isRgba.test(cssColor)) {
                return cssColor || "#000000";
            }

            return that.rgb2hex(that.css2rgb(cssColor));
        },

        difference: function(foreground, background) {
            var that = this;

            foreground = that.css2rgba(foreground);
            background = that.css2rgba(background);

            return {
                     red: foreground.red - background.red,
                     green: foreground.green - background.green,
                     blue: foreground.blue - background.blue,
                     alpha: foreground.alpha - background.alpha
                   };
        },

        addition: function(foreground, background) {
            var that = this;

            foreground = that.css2rgba(foreground);
            background = that.css2rgba(background);

            return {
                     red: min(foreground.red + background.red, 255),
                     green: min(foreground.green + background.green, 255),
                     blue: min(foreground.blue + background.blue, 255),
                     alpha: foreground.alpha
                   };
        },

        subtraction: function(foreground, background) {
            var that = this;

            foreground = that.css2rgba(foreground);
            background = that.css2rgba(background);

            return {
                     red: max(0, foreground.red - background.red),
                     green: max(0, foreground.green - background.green),
                     blue: max(0, foreground.blue - background.blue),
                     alpha: foreground.alpha
                   };
        },

        hue: function (degree) {
            return this._rotateColor(degree, "h");
        },

        saturation: function (percent) {
            return this._rotateColor(percent, "s");
        },

        lightness: function (percent) {
            return this._rotateColor(percent, "l");
        },

        alpha: function (value) {
            var that = this;

            if (isNaN(value)) {
                return that.value.alpha;
            }

            that.value.alpha = clampValue(value, 0, 1);
            return that;
        },

        complementary: function(color) {
            var that = this;

            color = that.css2rgba(color);

            return that.rgb2hex({
                       red: 255 - color.red,
                       green: 255 - color.green,
                       blue: 255 - color.blue
                   });
        },

        complement: function (color, type) {
            var that = this,
                hsl = that.rgb2hsl(that.css2rgba(color)),
                wheel = colorwheel[type],
                colors;

            colors = $.map(wheel, function (value) {
                var temp = $.extend({}, hsl);
                temp.h = (temp.h + value) % 360;
                return that.rgb2hex(that.hsl2rgb(temp));
            });

            return colors;
        },

        rgb2hsl: function(color) {
            var r = color.red / 255, g = color.green / 255, b = color.blue / 255, a = color.alpha,
                max = Math.max(r, g, b), min = Math.min(r, g, b),
                h, s, l = (max + min) / 2, d = max - min;

            if (max === min) {
                h = s = 0;
            } else {
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

                switch (max) {
                    case r: h = (g - b) / d + (g < b ? 6 : 0);
                         break;
                    case g: h = (b - r) / d + 2;
                         break;
                    case b: h = (r - g) / d + 4;
                         break;
                }
                h /= 6;
            }

            return {
                h: round(h * 360),
                s: round(s * 100),
                l: round(l * 100),
                a: a
            };
        },

        hsl2rgb: function(hsl) {
            var h = parseInt(hsl.h, 10), s = hsl.s / 100, l = hsl.l / 100,
                hue = function (h) {
                    h = h < 0 ? h + 1 : (h > 1 ? h - 1 : h);

                    if (h * 6 < 1) {
                        return m1 + (m2 - m1) * h * 6;
                    } else if (h * 2 < 1) {
                        return m2;
                    } else if (h * 3 < 2) {
                        return m1 + (m2 - m1) * (2/3 - h) * 6;
                    } else {
                        return m1;
                    }
                };

            h = (h % 360) / 360;

            var m2 = l <= 0.5 ? l * (s + 1) : l + s - l * s;
            var m1 = l * 2 - m2;

            return {
                red: round(hue(h + 1/3) * 255),
                green: round(hue(h) * 255),
                blue: round(hue(h - 1/3) * 255),
                alpha: hsl.a
            };
        },

        _rotateColor: function (value, type) {
            var that = this,
                hsl = that.rgb2hsl(that.value),
                color = that.rgb2hsl(that.colorValue);

            hsl.h = color.h;
            hsl.s = color.s;
            if (isNaN(value)) {
                return round(hsl[type]);
            }

            hsl[type] = clampValue(value, 0, clamps[type]);
            that.value = that.hsl2rgb(hsl);

            hsl.l = 50;
            that.colorValue = that.hsl2rgb(hsl);

            return that;
        }

    });

})(jQuery);
