(function($, undefined) {

    var CssRgbaRegExp = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,?\s*([\.\d]+?)?\s*\)/i,
        CssHexRegExp = /^#(([0-9a-f]{3})|([0-9a-f]{6}))$/i;

    window.Color = kendo.Observable.extend({
        init: function(color) {
            this.value = this.css2rgba(color);
        },

        toHex: function () {
            return this.rgb2hex(this.value);
        },

        toRgb: function () {
            var value = this.value;
            return "rgb(" + value.red + "," + value.green + "," + value.blue + ")";
        },

        toRgba: function () {
            var value = this.value;
            return "rgba(" + value.red + "," + value.green + "," + value.blue + "," + value.alpha.toString().replace("0.", ".") + ")";
        },

        add: function (color) {
            //var diff = this.difference(this.value, color);
            //return this;
        },

        subtract: function (color) {
            //var diff = this.difference(this.value, color);
            //return this;
        },

        isHex: function(testee) {
            return (CssHexRegExp.test(testee));
        },

        isRgba: function(testee) {
            return (CssRgbaRegExp.test(testee));
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
            if (red[0] == red[1]) {
                red = red[0];
            }
            result[result.length] = red;

            if (green.length < 2) {
                green = "0" + green;
            }
            if (green[0] == green[1]) {
                green = green[0];
            }
            result[result.length] = green;

            if (blue.length < 2) {
                blue = "0" + blue;
            }
            if (blue[0] == blue[1]) {
                blue = blue[0];
            }
            result[result.length] = blue;

            return result.join('');
        },

        css2rgba: function(cssColor) {
            var that = this;

            if (that.isHex(cssColor)) {
                return that.hex2rgb(cssColor);
            } else if (that.isRgba(cssColor)) {
                var tmp = CssRgbaRegExp.exec(cssColor),
                    result = {
                        red: parseInt(tmp[1], 10),
                        green: parseInt(tmp[2], 10),
                        blue: parseInt(tmp[3], 10)
                    };

                if (typeof tmp[4] != "undefined") {
                    result.alpha = parseFloat(tmp[4]);
                } else {
                    result.alpha = 1;
                }

                return result;
            } else {
                if (cssColor == "transparent") {
                    return { red: 0, green: 0, blue: 0, alpha: 0 };
                }
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

        complementary: function(color) {
            var that = this;

            color = that.css2rgba(color);

            return that.rgb2hex({
                       red: 255 - color.red,
                       green: 255 - color.green,
                       blue: 255 - color.blue
                   });
        },

        // blatantly ported from ImageMagick
        rgb2hsl: function(r, g, b) {
            var max = Math.max(r, Math.max(g, b));
            var min = Math.min(r, Math.min(g, b));
            var delta = max - min;

            var result = {
                l: ((min + max) / 2.0)
            };

            if (Math.abs(delta) < 0.001) {
                result.h = 0.0;
                result.s = 0.0;
                return result;
            }

            if (result.l < 0.5) {
                result.s = (delta / (min + max));
            } else {
                result.s = (delta / (2.0 - max - min));
            }

            if (r == max) {
                result.h = ((((max - b) / 6.0) + (delta / 2.0)) - (((max - g) / 6.0) + (delta / 2.0))) / delta;
            } else if (g == max) {
                result.h = (1.0 / 3.0) + ((((max - r) / 6.0) + (delta / 2.0)) - (((max - b) / 6.0) + (delta / 2.0))) / delta;
            } else if (b == max) {
                result.h = (2.0 / 3.0) + ((((max - g) / 6.0) + (delta / 2.0)) - (((max - r) / 6.0) + (delta / 2.0))) / delta;
            }

            if (result.h < 0.0) {
                result.h += 1.0;
            }

            if (result.h > 1.0) {
                result.h -= 1.0;
            }

            return result;
        },

        hsl2rgb: function(h, s, l) {
            var ConvertHueToRGB = function(m1, m2, hue) {
                if (hue < 0.0) {
                    hue += 1.0;
                }

                if (hue > 1.0) {
                    hue -= 1.0;
                }

                if ((6.0 * hue) < 1.0) {
                    return (m1 + 6.0 * (m2 - m1) * hue);
                }

                if ((2.0 * hue) < 1.0) {
                    return (m2);
                }

                if ((3.0 * hue) < 2.0) {
                    return (m1 + 6.0 * (m2 - m1) * (2.0 / 3.0 - hue));
                }

                return (m1);
            };

            if (s === 0) {
                return { r: l, g: l, b: l };
            }

            var m2;

            if (l <= 0.5) {
                m2 = l * (s + 1.0);
            } else {
                m2 = (l + s) - (l * s);
            }

            var m1 = 2.0 * l - m2;

            return {
                red: ConvertHueToRGB(m1, m2, h + 1.0 / 3.0),
                green: ConvertHueToRGB(m1, m2, h),
                blue: ConvertHueToRGB(m1, m2, h - 1.0 / 3.0)
            };
        }
    });

})(jQuery);
