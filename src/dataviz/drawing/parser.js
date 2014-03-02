(function(f, define){
    define([ "./shapes" ], f);
})(function(){

(function ($) {

    var kendo = window.kendo,
        dataviz = kendo.dataviz,
        drawing = dataviz.drawing,
        geometry = dataviz.geometry,
        Point = geometry.Point,
        SEGMENT_REGEX = /([a-z]{1})([^a-z]*)(z)?/gi,
        SPLIT_REGEX = /,|\s/g,
        trim = $.trim,
        round = dataviz.round,
        deg = dataviz.util.deg,
        math = Math,

        MOVE = "m",
        CLOSE = "z";

    function toLineParamaters(parameters, isVertical) {
        var insertPosition = isVertical ? 0 : 1,
            i;

        for (i = 0; i < parameters.length; i+=2) {
            parameters.splice(i + insertPosition, 0, 0);
        }
    }

    function elipseAngle(start, end, swipe) {
        var alpha;
        if (start > end) {
            end+= 360;
        }
        alpha = math.abs(end - start);
        if (!swipe) {
            alpha = 360 - alpha;
        }
        return alpha;
    }

    function calculateAngle(cx, cy, rx, ry, x, y) {
        var cos = round((x - cx) / rx, 3),
            sin = round((y - cy) / ry, 3);

        return round(deg(math.atan2(sin, cos)));
    }

    //TO DO: normalize radiuses when they are not correct
    function normalizeArcParameters(rx, ry, x1, y1, x2, y2, largeArc, swipe) {
        var cx, cy, cx1, cy1,
            a, b, c, sqrt,
            start, end, alpha;

        if  (y1 !== y2) {
            var x21 = x2 - x1, y21 = y2 - y1,
                rx2 = math.pow(rx, 2), ry2 = math.pow(ry, 2),
                k = (ry2 * x21 * (x1 + x2) + rx2 * y21 * (y1 + y2)) / (2 * rx2 * y21),
                yk2 = k - y2,
                l = - (x21 * ry2) / (rx2 * y21);

            a = 1 / rx2 + math.pow(l, 2) / ry2;
            b = 2 * ((l * yk2) / ry2 - x2 / rx2);
            c = math.pow(x2, 2) / rx2 + math.pow(yk2, 2) / ry2 - 1;
            sqrt = math.sqrt(math.pow(b, 2) - 4 * a * c);

            cx = (-b - sqrt) / (2 * a);
            cy = k + l * cx;
            cx1 = (-b + sqrt) / (2 * a);
            cy1 = k + l * cx1;
        } else if (x1 !== x2) {
            b = - 2 * y2;
            c = math.pow(((x2 - x1) * ry) / (2 * rx), 2) + math.pow(y2, 2) - math.pow(ry, 2);
            sqrt = math.sqrt(math.pow(b, 2) - 4 * c);

            cx = cx1 = (x1 + x2) / 2;
            cy = (-b - sqrt) / 2;
            cy1 = (-b + sqrt) / 2;
        } else {
            return false;
        }

        start = calculateAngle(cx, cy, rx, ry, x1, y1);
        end = calculateAngle(cx, cy, rx, ry, x2, y2);
        alpha = elipseAngle(start, end, swipe);

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

    var SvgPathParser = function() {};

    SvgPathParser.fn = SvgPathParser.prototype =  {
        parse: function(str, options) {
            var parser = this,
                multiPath = new drawing.MultiPath(options),
                command,
                isRelative,
                parameters,
                i, length,
                position = new Point();

            str.replace(SEGMENT_REGEX, function(match, element, params, closePath) {
                command = element.toLowerCase();
                isRelative = command === element;
                parameters =  trim(params).split(SPLIT_REGEX);
                length = parameters.length;

                for (i = 0; i < length; i++) {
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
                } else if (parser.shapeMap[command]) {
                    parser.shapeMap[command](
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
        },

        shapeMap: {
            l: function(path, parameters, position, isRelative) {
                var length = parameters.length,
                    i, point;

                for (i = 0; i < length; i+=2){
                    point = new Point(parameters[i], parameters[i + 1]);
                    if (isRelative) {
                        point.add(position);
                    }
                    path.lineTo(point.x, point.y);

                    position.x = point.x;
                    position.y = point.y;
                }
            },

            c: function(path, parameters, position, isRelative) {
                var length = parameters.length,
                    controlIn, controlOut, point,
                    i;

                for (i = 0; i < length; i+= 6) {
                    controlOut = new Point(parameters[i], parameters[i + 1]);
                    controlIn = new Point(parameters[i + 2], parameters[i + 3]);
                    point = new Point(parameters[i + 4], parameters[i + 5]);
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
                toLineParamaters(parameters, true);
                this.l(path, parameters, position, isRelative);
            },

            h: function(path, parameters, position, isRelative) {
                toLineParamaters(parameters, false);
                this.l(path, parameters, position, isRelative);
            },

            a: function(path, parameters, position, isRelative) {
                var length = parameters.length,
                    endPoint,
                    radiusX,
                    radiusY,
                    swipe, largeArc,
                    arcParameters,
                    i, j, arc,
                    curvePoints;

                for (i = 0; i < length; i+=7) {
                    radiusX = parameters[i];
                    radiusY = parameters[i + 1];
                    largeArc = parameters[i + 3];
                    swipe = parameters[i + 4];
                    endPoint = new Point(parameters[i + 5], parameters[i + 6]);

                    if (isRelative) {
                        endPoint.add(position);
                    }

                    arcParameters = normalizeArcParameters(radiusX, radiusY, position.x, position.y,
                        endPoint.x, endPoint.y, largeArc, swipe);

                    arc = new geometry.Arc(arcParameters.center, {
                        startAngle: arcParameters.startAngle,
                        endAngle: arcParameters.endAngle,
                        radiusX: radiusX,
                        radiusY: radiusY,
                        counterClockwise: swipe === 0
                    });

                    curvePoints = arc.curvePoints();
                    for (j = 1; j < curvePoints.length; j+=3) {
                        path.curveTo(curvePoints[j], curvePoints[j + 1], curvePoints[j + 2]);
                    }

                    position.x = endPoint.x;
                    position.y = endPoint.y;
                }
            }
        }
    };

    SvgPathParser.current = new SvgPathParser();

    // Exports ================================================================
    kendo.deepExtend(dataviz, {
        drawing: {
            SvgPathParser: SvgPathParser
        }
    });

})(window.kendo.jQuery);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });