import "../kendo.core.js";

(function($, undefined){
    var colorpicker = kendo.ui.colorpicker,
        extend = $.extend,
        Color = kendo.Color,
        parseColor = kendo.parseColor,

        AA_CONTRAST = 4.5,
        AAA_CONTRAST = 7,
        STEP_COUNT = 16;

    // Color utils - calc contrast

    function getContrast(luminance1, luminance2) {
        var brightest = Math.max(luminance1, luminance2);
        var darkest = Math.min(luminance1, luminance2);
        return (brightest + 0.05) / (darkest + 0.05);
    }

    function getContrastFromTwoRGBAs(a, b) {
        return getContrast(
            getLuminance(getRGBFromRGBA(a, b)),
            getLuminance(getRGBFromRGBA(b, { r: 0, g: 0, b: 0, a: 1 })));
    }

    function getLuminance (rgb) {
        var a = [rgb.r, rgb.g, rgb.b].map(function (v) {
            v /= 255;
            return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
        });
        return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    }

    function getRGBFromRGBA(foregroundColor, backgroundColor) {
        var r1 = fitIntoBounds(foregroundColor.r, 0, 255);
        var g1 = fitIntoBounds(foregroundColor.g, 0, 255);
        var b1 = fitIntoBounds(foregroundColor.b, 0, 255);
        var a1 = fitIntoBounds(foregroundColor.a, 0, 1);

        var r2 = fitIntoBounds(backgroundColor.r, 0, 255);
        var g2 = fitIntoBounds(backgroundColor.g, 0, 255);
        var b2 = fitIntoBounds(backgroundColor.b, 0, 255);

        return {
            r: Math.round(((1 - a1) * r2) + (a1 * r1)),
            g: Math.round(((1 - a1) * g2) + (a1 * g1)),
            b: Math.round(((1 - a1) * b2) + (a1 * b1))
        };
    }

    function fitIntoBounds(contender, min, max) {
        if (!isPresent(contender) || isNaN(contender)) {
            return min;
        }

        return contender <= min ? min : contender >= max ? max : contender;
    }

    function isPresent(value) { return value !== null && value !== undefined; }


    // Color utils - Contrast tool SVG path

    function renderSvgCurveLine(gradientRectMetrics, hsva, backgroundColor) {
        var findValue = function (contrast, saturation, low, high, comparer) {
            var mid = (low + high) / 2;
            var currentHsva = extend({}, hsva, { s: saturation / gradientRectMetrics.width, v: 1 - mid / gradientRectMetrics.height });
            var currentContrast = getContrastFromTwoRGBAs(parseColor(getColorFromHSV(currentHsva)).toBytes(), parseColor(backgroundColor).toBytes());

            if (low + 0.5 > high) {
                if (currentContrast < contrast + 1 && currentContrast > contrast - 1) {
                    return mid;
                } else {
                    return null;
                }
            }

            if (comparer(currentContrast, contrast)) {
                return findValue(contrast, saturation, low, high - (high - low) / 2, comparer);
            }
            return findValue(contrast, saturation, low + (high - low) / 2, high, comparer);
        };

        var comparer = function (a, b) {
            return a > b;
        };

        var reversedComparer = function (a, b) {
            return a < b;
        };

        var getPaths = function (contrast, stepCount, reversed) {
            var points = [];
            for (var i = 0; i <= gradientRectMetrics.width; i += gradientRectMetrics.width/stepCount) {
               var value = findValue(contrast, i, 0, gradientRectMetrics.height, reversed ? reversedComparer : comparer);
                if (value !== null){
                    points.push([i, value]);
                }
            }
            return points;
        };

        var bezierCommandCalc = bezierCommand(controlPoint(line));
        var paths = svgPath(getPaths(AA_CONTRAST, STEP_COUNT, false), bezierCommandCalc) +
                svgPath(getPaths(AA_CONTRAST, STEP_COUNT, true), bezierCommandCalc) +
                svgPath(getPaths(AAA_CONTRAST, STEP_COUNT, false), bezierCommandCalc) +
                svgPath(getPaths(AAA_CONTRAST, STEP_COUNT, true), bezierCommandCalc);

        return '<svg xmlns="http://www.w3.org/2000/svg" style="position: absolute; overflow: visible; pointer-events: none; left: 0px; top: 0px; z-index: 3;" >' +
                    paths  + '</svg>';
    }

    function svgPath(points, command) {
        if (points.length === 0){
            return '';
        }

        var reducer = function (acc, point, i, a) {
            return i === 0 ?
                // if first point
                kendo.format("M {0},{1}", point[0], point[1]) :
                // else
                kendo.format("{0} {1}", acc, command(point, i, a));
        };

        // build the d attributes by looping over the points
        var d = points.reduce(reducer, "");

        return kendo.format('<path d="{0}" fill="none" stroke="white" stroke-width="1"/>', d);
    }

    function bezierCommand(controlPointCalc) {
        return function(point, i, a) {
            // start control point
            var cps = controlPointCalc(a[i - 1], a[i - 2], point); // [cpsX, cpsY]

            // end control point
            var cpe = controlPointCalc(point, a[i - 1], a[i + 1], true); //  [cpeX, cpeY]

            return kendo.format("C {0},{1} {2},{3} {4},{5}", cps[0], cps[1], cpe[0], cpe[1], point[0], point[1]);
        };
    }

    function controlPoint(lineCalc) {
        return function (current, previous, next, reverse) {
            // when 'current' is the first or last point of the array
            // 'previous' and 'next' are undefined
            // replace with 'current'
                var p = previous || current;
                var n = next || current;
                var smooth = 0.1;

                // properties of the line between previous and next
                var l = lineCalc(p, n);

                // If is end-control-point, add PI to the angle to go backward
                var angle = l.angle + (reverse ? Math.PI : 0);
                var length = l.length * smooth;

                // The control point position is relative to the current point
                var x = current[0] + Math.cos(angle) * length;
                var y = current[1] + Math.sin(angle) * length;

                return [x, y];
        };
    }

    function line (pointA, pointB) {
        var lengthX = pointB[0] - pointA[0];
        var lengthY = pointB[1] - pointA[1];

        return {
            length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
            angle: Math.atan2(lengthY, lengthX)
        };
    }

    function getColorFromHSV (hsva) {
        var hue = fitIntoBounds(hsva.h, 0, 359.9);
        var saturation = fitIntoBounds(hsva.s, 0, 1);
        var value = fitIntoBounds(hsva.v, 0, 1);
        var alpha = fitIntoBounds(hsva.a, 0, 1);

        return Color.fromHSV(hue, saturation, value, alpha).toCssRgba();
    }

    extend(colorpicker, {
        contrastToolUtils: {
            getContrastFromTwoRGBAs: getContrastFromTwoRGBAs,
            renderSvgCurveLine: renderSvgCurveLine
        }
    });

})(window.kendo.jQuery);

