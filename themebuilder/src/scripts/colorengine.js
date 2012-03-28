(function($) {

    /* code can be improved tremendously if there's a Color object with enough conversion functions */

    function ColorEngine() {}

    $.extend(ColorEngine, {
        _CssRgb: /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i,
        _CssHex: /^#(([0-9a-f]{3})|([0-9a-f]{6}))$/i,

        isHex: function(testee) {
            return (ColorEngine._CssHex.test(testee));
        },

        isCssRgb: function(testee) {
            return (ColorEngine._CssRgb.test(testee));
        },

        hex2rgb: function(hex) {
            if (!ColorEngine.isHex(hex)) {
                throw Error("Invalid input");
            }

            if (hex.length == 4) {
                return {
                    red: parseInt(hex.substring(1, 2) + hex.substring(1, 2), 16),
                    green: parseInt(hex.substring(2, 3) + hex.substring(2, 3), 16),
                    blue: parseInt(hex.substring(3, 4) + hex.substring(3, 4), 16)
                };
            }
            else {
                return {
                    red: parseInt(hex.substring(1, 3), 16),
                    green: parseInt(hex.substring(3, 5), 16),
                    blue: parseInt(hex.substring(5, 7), 16)
                };
            }
        },

        rgb2hex: function(rgb) {
            var result = ['#'],
                red = rgb.red.toString(16),
                green = rgb.green.toString(16),
                blue = rgb.blue.toString(16);

            if (red.length < 2) {
                result[result.length] = "0";
            }
            result[result.length] = red;

            if (green.length < 2) {
                result[result.length] = "0";
            }
            result[result.length] = green;

            if (blue.length < 2) {
                result[result.length] = "0";
            }
            result[result.length] = blue;

            return result.join('');
        },

        css2rgb: function(cssColor) {
            if (ColorEngine.isHex(cssColor)) {
                return ColorEngine.hex2rgb(cssColor);
            } else if (ColorEngine.isCssRgb(cssColor)) {
                var tmp = ColorEngine._CssRgb.exec(cssColor),
                    result = {
                        red: parseInt(tmp[1], 10),
                        green: parseInt(tmp[2], 10),
                        blue: parseInt(tmp[3], 10)
                    };

                if (tmp[5]) {
                    result.alpha = parseFloat(tmp[5]);
                }

                return result;
            }
        },

        css2hex: function(cssColor) {
            if (!cssColor || /rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d*(\.\d+)?)\s*\)/i.test(cssColor)) {
                return cssColor || "#000000";
            }

            return ColorEngine.rgb2hex(ColorEngine.css2rgb(cssColor));
        },

        difference: function(foreground, background) {
            foreground = ColorEngine.css2rgb(foreground);
            background = ColorEngine.css2rgb(background);

            return Math.abs(foreground.red - background.red) +
                       Math.abs(foreground.green - background.green) +
                       Math.abs(foreground.blue - background.blue);
        },

        complementary: function(color) {
            color = ColorEngine.css2rgb(color);

            return ColorEngine.rgb2hex({
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

    window.ColorEngine = ColorEngine;
})(jQuery);
