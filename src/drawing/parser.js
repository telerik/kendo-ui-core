(function(f, define){
    define([ "./shapes" ], f);
})(function(){

(function ($) {

    var kendo = window.kendo,
        drawing = kendo.drawing,
        geometry = kendo.geometry,

        Class = kendo.Class,
        Point = geometry.Point,
        deepExtend = kendo.deepExtend,
        trim = $.trim,
        util = kendo.util,
        deg = util.deg,
        last = util.last,
        round = util.round;

    var SEGMENT_REGEX = /([a-z]{1})([^a-z]*)(z)?/gi,
        SPLIT_REGEX = /[,\s]?(-?(?:\d+\.)?\d+)/g,
        MOVE = "m",
        CLOSE = "z";

    var PathParser = Class.extend({
        parse: function(str, options) {
            var parser = this;
            var multiPath = new drawing.MultiPath(options);
            var position = new Point();
            var previousCommand;

            str.replace(SEGMENT_REGEX, function(match, element, params, closePath) {
                var command = element.toLowerCase();
                var isRelative = command === element;
                var parameters = parseParameters(trim(params));

                if (command === MOVE) {
                    if (isRelative) {
                        position.x += parameters[0];
                        position.y += parameters[1];
                    } else {
                        position.x = parameters[0];
                        position.y = parameters[1];
                    }

                    multiPath.moveTo(position.x, position.y);

                    if (parameters.length > 2) {
                        command = "l";
                        parameters.splice(0, 2);
                    }
                }

                if (ShapeMap[command]) {
                    ShapeMap[command](
                        multiPath, {
                            parameters: parameters,
                            position: position,
                            isRelative: isRelative,
                            previousCommand: previousCommand
                        }
                    );

                    if (closePath && closePath.toLowerCase() === CLOSE) {
                        multiPath.close();
                    }
                } else if (command !== MOVE) {
                    throw new Error("Error while parsing SVG path. Unsupported command: " + command);
                }

                previousCommand = command;
            });

            return multiPath;
        }
    });

    var ShapeMap = {
        l: function(path, options) {
            var parameters = options.parameters;
            var position = options.position;
            for (var i = 0; i < parameters.length; i+=2){
                var point = new Point(parameters[i], parameters[i + 1]);

                if (options.isRelative) {
                    point.translateWith(position);
                }

                path.lineTo(point.x, point.y);

                position.x = point.x;
                position.y = point.y;
            }
        },

        c: function(path, options) {
            var parameters = options.parameters;
            var position = options.position;
            var controlOut, controlIn, point;

            for (var i = 0; i < parameters.length; i += 6) {
                controlOut = new Point(parameters[i], parameters[i + 1]);
                controlIn = new Point(parameters[i + 2], parameters[i + 3]);
                point = new Point(parameters[i + 4], parameters[i + 5]);
                if (options.isRelative) {
                    controlIn.translateWith(position);
                    controlOut.translateWith(position);
                    point.translateWith(position);
                }

                path.curveTo(controlOut, controlIn, point);

                position.x = point.x;
                position.y = point.y;
            }
        },

        v: function(path, options) {
            var value = options.isRelative ? 0 : options.position.x;

            toLineParamaters(options.parameters, true, value);
            this.l(path, options);
        },

        h: function(path, options) {
            var value = options.isRelative ? 0 : options.position.y;

            toLineParamaters(options.parameters, false, value);
            this.l(path, options);
        },

        a: function(path, options) {
            var parameters = options.parameters;
            var position = options.position;
            for (var i = 0; i < parameters.length; i += 7) {
                var radiusX = parameters[i];
                var radiusY = parameters[i + 1];
                var largeArc = parameters[i + 3];
                var swipe = parameters[i + 4];
                var endPoint = new Point(parameters[i + 5], parameters[i + 6]);

                if (options.isRelative) {
                    endPoint.translateWith(position);
                }

                path.arcTo(endPoint, radiusX, radiusY, largeArc, swipe);

                position.x = endPoint.x;
                position.y = endPoint.y;
            }
        },

        s: function(path, options) {
            var parameters = options.parameters;
            var position = options.position;
            var previousCommand = options.previousCommand;
            var controlOut, endPoint, controlIn, lastControlIn;

            if (previousCommand == "s" || previousCommand == "c") {
                lastControlIn = last(last(path.paths).segments).controlIn();
            }

            for (var i = 0; i < parameters.length; i += 4) {
                controlIn = new Point(parameters[i], parameters[i + 1]);
                endPoint = new Point(parameters[i + 2], parameters[i + 3]);
                if (options.isRelative) {
                    controlIn.translateWith(position);
                    endPoint.translateWith(position);
                }

                if (lastControlIn) {
                    controlOut = reflectionPoint(lastControlIn, position);
                } else {
                    controlOut = position.clone();
                }
                lastControlIn = controlIn;

                path.curveTo(controlOut, controlIn, endPoint);

                position.x = endPoint.x;
                position.y = endPoint.y;
            }
        },

        q: function(path, options) {
            var parameters = options.parameters;
            var position = options.position;
            var cubicControlPoints, endPoint, controlPoint;
            for (var i = 0; i < parameters.length; i += 4) {
                controlPoint = new Point(parameters[i], parameters[i + 1]);
                endPoint = new Point(parameters[i + 2], parameters[i + 3]);
                if (options.isRelative) {
                    controlPoint.translateWith(position);
                    endPoint.translateWith(position);
                }
                cubicControlPoints = quadraticToCubicControlPoints(position, controlPoint, endPoint);

                path.curveTo(cubicControlPoints.controlOut, cubicControlPoints.controlIn, endPoint);

                position.x = endPoint.x;
                position.y = endPoint.y;
            }
        },

        t: function(path, options) {
            var parameters = options.parameters;
            var position = options.position;
            var previousCommand = options.previousCommand;
            var cubicControlPoints, controlPoint, endPoint;

            if (previousCommand == "q" || previousCommand == "t") {
                var lastSegment = last(last(path.paths).segments);
                controlPoint = lastSegment.controlIn().clone()
                    .translateWith(position.scaleCopy(-1 / 3))
                    .scale(3 / 2);
            }

            for (var i = 0; i < parameters.length; i += 2) {
                endPoint = new Point(parameters[i], parameters[i + 1]);
                if (options.isRelative) {
                    endPoint.translateWith(position);
                }

                if (controlPoint) {
                    controlPoint = reflectionPoint(controlPoint, position);
                } else {
                    controlPoint = position.clone();
                }

                cubicControlPoints = quadraticToCubicControlPoints(position, controlPoint, endPoint);

                path.curveTo(cubicControlPoints.controlOut, cubicControlPoints.controlIn, endPoint);

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

    function reflectionPoint(point, center) {
        if (point && center) {
            return center.scaleCopy(2).translate(-point.x, -point.y);
        }
    }

    function quadraticToCubicControlPoints(position, controlPoint, endPoint) {
        var third = 1 / 3;
        controlPoint = controlPoint.clone().scale(2 / 3);
        return {
            controlOut: controlPoint.clone().translateWith(position.scaleCopy(third)),
            controlIn: controlPoint.translateWith(endPoint.scaleCopy(third))
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
