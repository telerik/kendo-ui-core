(function(f, define){
    define([ "./shapes" ], f);
})(function(){

(function ($) {

    var kendo = window.kendo,
        dataviz = kendo.dataviz,
        drawing = dataviz.drawing,
        geometry = dataviz.geometry,

        Class = kendo.Class,
        Point = geometry.Point,
        deepExtend = kendo.deepExtend,
        deg = dataviz.util.deg,
        round = dataviz.round,
        trim = $.trim,
        math = Math,
        pow = math.pow;

    var SEGMENT_REGEX = /([a-z]{1})([^a-z]*)(z)?/gi,
        SPLIT_REGEX = /[,\s]?(-?(?:\d+\.)?\d+)/g,
        MOVE = "m",
        CLOSE = "z";

    var PathParser = Class.extend({
        parse: function(str, options) {
            var parser = this;
            var multiPath = new drawing.MultiPath(options);
            var position = new Point();

            str.replace(SEGMENT_REGEX, function(match, element, params, closePath) {
                var command = element.toLowerCase();
                var isRelative = command === element;
                var parameters = parseParameters(trim(params));
                var length = parameters.length;

                for (var i = 0; i < length; i++) {
                    parameters[i] = parseFloat(parameters[i]);
                }

                if (command === MOVE) {
                    if (isRelative) {
                        position.x += parameters[0];
                        position.y += parameters[1];
                    } else {
                        position.x = parameters[0];
                        position.y = parameters[1];
                    }

                    multiPath.moveTo(position.x, position.y);
                } else if (ShapeMap[command]) {
                    ShapeMap[command](
                        multiPath,
                        parameters,
                        position,
                        isRelative
                    );

                    if (closePath && closePath.toLowerCase() === CLOSE) {
                        multiPath.close();
                    }
                } else {
                    throw new Error("Unsupported command: " + command);
                }
            });

            return multiPath;
        }
    });

    var ShapeMap = {
        l: function(path, parameters, position, isRelative) {
            for (var i = 0; i < parameters.length; i+=2){
                var point = new Point(parameters[i], parameters[i + 1]);

                if (isRelative) {
                    point.add(position);
                }

                path.lineTo(point.x, point.y);

                position.x = point.x;
                position.y = point.y;
            }
        },

        c: function(path, parameters, position, isRelative) {
            for (var i = 0; i < parameters.length; i += 6) {
                var controlOut = new Point(parameters[i], parameters[i + 1]);
                var controlIn = new Point(parameters[i + 2], parameters[i + 3]);
                var point = new Point(parameters[i + 4], parameters[i + 5]);
                if (isRelative) {
                    controlIn.add(position);
                    controlOut.add(position);
                    point.add(position);
                }

                path.curveTo(controlOut, controlIn, point);

                position.x = point.x;
                position.y = point.y;
            }
        },

        v: function(path, parameters, position, isRelative) {
            var value = isRelative ? 0 : position.x;

            toLineParamaters(parameters, true, value);
            this.l(path, parameters, position, isRelative);
        },

        h: function(path, parameters, position, isRelative) {
            var value = isRelative ? 0 : position.y;

            toLineParamaters(parameters, false, value);
            this.l(path, parameters, position, isRelative);
        },

        a: function(path, parameters, position, isRelative) {
            for (var i = 0; i < parameters.length; i += 7) {
                var radiusX = parameters[i];
                var radiusY = parameters[i + 1];
                var largeArc = parameters[i + 3];
                var swipe = parameters[i + 4];
                var endPoint = new Point(parameters[i + 5], parameters[i + 6]);

                if (isRelative) {
                    endPoint.add(position);
                }

                var arcParameters = normalizeArcParameters(
                    radiusX, radiusY, position.x, position.y,
                    endPoint.x, endPoint.y, largeArc, swipe
                );

                var arc = new geometry.Arc(arcParameters.center, {
                    startAngle: arcParameters.startAngle,
                    endAngle: arcParameters.endAngle,
                    radiusX: radiusX,
                    radiusY: radiusY,
                    counterClockwise: swipe === 0
                });

                var curvePoints = arc.curvePoints();
                for (var j = 1; j < curvePoints.length; j+=3) {
                    path.curveTo(curvePoints[j], curvePoints[j + 1], curvePoints[j + 2]);
                }

                position.x = endPoint.x;
                position.y = endPoint.y;
            }
        }
    };

    // Helper functions =======================================================

    function parseParameters(str) {
        var parameters = [];
        str.replace(SPLIT_REGEX, function(match, number) {
            parameters.push(parseFloat(number));
        });
        return parameters;
    }

    function toLineParamaters(parameters, isVertical, value) {
        var insertPosition = isVertical ? 0 : 1;

        for (var i = 0; i < parameters.length; i+=2) {
            parameters.splice(i + insertPosition, 0, value);
        }
    }

    function elipseAngle(start, end, swipe) {
        if (start > end) {
            end += 360;
        }

        var alpha = math.abs(end - start);
        if (!swipe) {
            alpha = 360 - alpha;
        }

        return alpha;
    }

    function calculateAngle(cx, cy, rx, ry, x, y) {
        var cos = round((x - cx) / rx, 3);
        var sin = round((y - cy) / ry, 3);

        return round(deg(math.atan2(sin, cos)));
    }

    function normalizeArcParameters(rx, ry, x1, y1, x2, y2, largeArc, swipe) {
        var cx, cy;
        var cx1, cy1;
        var a, b, c, sqrt;

        if  (y1 !== y2) {
            var x21 = x2 - x1;
            var y21 = y2 - y1;
            var rx2 = pow(rx, 2), ry2 = pow(ry, 2);
            var k = (ry2 * x21 * (x1 + x2) + rx2 * y21 * (y1 + y2)) / (2 * rx2 * y21);
            var yk2 = k - y2;
            var l = -(x21 * ry2) / (rx2 * y21);

            a = 1 / rx2 + pow(l, 2) / ry2;
            b = 2 * ((l * yk2) / ry2 - x2 / rx2);
            c = pow(x2, 2) / rx2 + pow(yk2, 2) / ry2 - 1;
            sqrt = math.sqrt(pow(b, 2) - 4 * a * c);

            cx = (-b - sqrt) / (2 * a);
            cy = k + l * cx;
            cx1 = (-b + sqrt) / (2 * a);
            cy1 = k + l * cx1;
        } else if (x1 !== x2) {
            b = - 2 * y2;
            c = pow(((x2 - x1) * ry) / (2 * rx), 2) + pow(y2, 2) - pow(ry, 2);
            sqrt = math.sqrt(pow(b, 2) - 4 * c);

            cx = cx1 = (x1 + x2) / 2;
            cy = (-b - sqrt) / 2;
            cy1 = (-b + sqrt) / 2;
        } else {
            return false;
        }

        var start = calculateAngle(cx, cy, rx, ry, x1, y1);
        var end = calculateAngle(cx, cy, rx, ry, x2, y2);
        var alpha = elipseAngle(start, end, swipe);

        if ((largeArc && alpha <= 180) || (!largeArc && alpha > 180)) {
           cx = cx1; cy = cy1;
           start = calculateAngle(cx, cy, rx, ry, x1, y1);
           end = calculateAngle(cx, cy, rx, ry, x2, y2);
        }

        return {
            center: new Point(cx, cy),
            startAngle: start,
            endAngle: end
        };
    }

    // Exports ================================================================
    PathParser.current = new PathParser();

    drawing.Path.parse = function(str, options) {
        return PathParser.current.parse(str, options);
    };

    deepExtend(drawing, {
        PathParser: PathParser
    });

})(window.kendo.jQuery);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
