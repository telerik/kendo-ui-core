(function(f, define){
    define([ "../../kendo.drawing", "./math" ], f);
})(function(){

(function ($, undefined) {
    // Imports ================================================================
    var kendo = window.kendo,
        Observable = kendo.Observable,
        diagram = kendo.dataviz.diagram,
        Class = kendo.Class,
        deepExtend = kendo.deepExtend,
        dataviz = kendo.dataviz,
        Point = diagram.Point,
        Rect = diagram.Rect,
        RectAlign = diagram.RectAlign,
        Matrix = diagram.Matrix,
        Utils = diagram.Utils,
        isUndefined = Utils.isUndefined,
        isNumber = Utils.isNumber,
        isString = Utils.isString,
        MatrixVector = diagram.MatrixVector,

        g = kendo.geometry,
        d = kendo.drawing,

        defined = kendo.util.defined,

        inArray = $.inArray;

    // Constants ==============================================================
    var TRANSPARENT = "transparent",
        Markers = {
            none: "none",
            arrowStart: "ArrowStart",
            filledCircle: "FilledCircle",
            arrowEnd: "ArrowEnd"
        },
        DEFAULTWIDTH = 100,
        DEFAULTHEIGHT = 100,
        FULL_CIRCLE_ANGLE = 360,
        START = "start",
        END = "end",
        WIDTH = "width",
        HEIGHT = "height",
        X = "x",
        Y = "y";

    diagram.Markers = Markers;

    var Scale = Class.extend({
        init: function (x, y) {
            this.x = x;
            this.y = y;
        },
        toMatrix: function () {
            return Matrix.scaling(this.x, this.y);
        },
        toString: function () {
            return kendo.format("scale({0},{1})", this.x, this.y);
        },
        invert: function() {
            return new Scale(1/this.x, 1/this.y);
        }
    });

    var Translation = Class.extend({
        init: function (x, y) {
            this.x = x;
            this.y = y;
        },
        toMatrixVector: function () {
            return new MatrixVector(0, 0, 0, 0, this.x, this.y);
        },
        toMatrix: function () {
            return Matrix.translation(this.x, this.y);
        },
        toString: function () {
            return kendo.format("translate({0},{1})", this.x, this.y);
        },
        plus: function (delta) {
            this.x += delta.x;
            this.y += delta.y;
        },
        times: function (factor) {
            this.x *= factor;
            this.y *= factor;
        },
        length: function () {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        },
        normalize: function () {
            if (this.Length === 0) {
                return;
            }
            this.times(1 / this.length());
        },
        invert: function() {
            return new Translation(-this.x, -this.y);
        }
    });

    var Rotation = Class.extend({
        init: function (angle, x, y) {
            this.x = x || 0;
            this.y = y || 0;
            this.angle = angle;
        },
        toString: function () {
            if (this.x && this.y) {
                return kendo.format("rotate({0},{1},{2})", this.angle, this.x, this.y);
            } else {
                return kendo.format("rotate({0})", this.angle);
            }
        },
        toMatrix: function () {
            return Matrix.rotation(this.angle, this.x, this.y); // T*R*T^-1
        },
        center: function () {
            return new Point(this.x, this.y);
        },
        invert: function() {
            return new Rotation(FULL_CIRCLE_ANGLE - this.angle, this.x, this.y);
        }
    });

    Rotation.create = function (rotation) {
        return new Rotation(rotation.angle, rotation.x, rotation.y);
    };

    Rotation.parse = function (str) {
        var values = str.slice(1, str.length - 1).split(","),
            angle = values[0],
            x = values[1],
            y = values[2];
        var rotation = new Rotation(angle, x, y);
        return rotation;
    };

    var CompositeTransform = Class.extend({
        init: function (x, y, scaleX, scaleY, angle, center) {
            this.translate = new Translation(x, y);
            if (scaleX !== undefined && scaleY !== undefined) {
                this.scale = new Scale(scaleX, scaleY);
            }
            if (angle !== undefined) {
                this.rotate = center ? new Rotation(angle, center.x, center.y) : new Rotation(angle);
            }
        },
        toString: function () {
            var toString = function (transform) {
                return transform ? transform.toString() : "";
            };

            return toString(this.translate) +
                toString(this.rotate) +
                toString(this.scale);
        },

        render: function (visual) {
            visual._transform = this;
            visual._renderTransform();
        },

        toMatrix: function () {
            var m = Matrix.unit();

            if (this.translate) {
                m = m.times(this.translate.toMatrix());
            }
            if (this.rotate) {
                m = m.times(this.rotate.toMatrix());
            }
            if (this.scale) {
                m = m.times(this.scale.toMatrix());
            }
            return m;
        },
        invert: function() {
            var rotate = this.rotate ? this.rotate.invert() : undefined,
                rotateMatrix = rotate ? rotate.toMatrix() : Matrix.unit(),
                scale = this.scale ? this.scale.invert() : undefined,
                scaleMatrix = scale ? scale.toMatrix() : Matrix.unit();

            var translatePoint = new Point(-this.translate.x, -this.translate.y);
            translatePoint = rotateMatrix.times(scaleMatrix).apply(translatePoint);
            var translate = new Translation(translatePoint.x, translatePoint.y);

            var transform = new CompositeTransform();
            transform.translate = translate;
            transform.rotate = rotate;
            transform.scale = scale;

            return transform;
        }
    });

    var AutoSizeableMixin = {
        _setScale: function() {
            var options = this.options;
            var originWidth = this._originWidth;
            var originHeight = this._originHeight;
            var scaleX = options.width / originWidth;
            var scaleY = options.height / originHeight;

            if (!isNumber(scaleX)) {
                scaleX = 1;
            }
            if (!isNumber(scaleY)) {
                scaleY = 1;
            }

            this._transform.scale = new Scale(scaleX, scaleY);
        },

        _setTranslate: function() {
            var options = this.options;
            var x = options.x || 0;
            var y = options.y || 0;
            this._transform.translate = new Translation(x, y);
        },

        _initSize: function() {
            var options = this.options;
            var transform = false;
            if (options.autoSize !== false && (defined(options.width) || defined(options.height))) {
                this._measure(true);
                this._setScale();
                transform = true;
            }

            if (defined(options.x) || defined(options.y)) {
                this._setTranslate();
                transform = true;
            }

            if (transform) {
                this._renderTransform();
            }
        },

        _updateSize: function(options) {
            var update = false;

            if (this.options.autoSize !== false && this._diffNumericOptions(options, [WIDTH, HEIGHT])) {
                update = true;
                this._measure(true);
                this._setScale();
            }

            if (this._diffNumericOptions(options, [X, Y])) {
                update = true;
                this._setTranslate();
            }

            if (update) {
                this._renderTransform();
            }

            return update;
        }
    };

    var Element = Class.extend({
        init: function (options) {
            var element = this;
            element.options = deepExtend({}, element.options, options);
            element.id = element.options.id;
            element._originSize = Rect.empty();
            element._transform = new CompositeTransform();
        },

        visible: function (value) {
            return this.drawingContainer().visible(value);
        },

        redraw: function (options) {
            if (options && options.id) {
                 this.id = options.id;
            }
        },

        position: function (x, y) {
            var options = this.options;
            if (!defined(x)) {
               return new Point(options.x, options.y);
            }

            if (defined(y)) {
                options.x = x;
                options.y = y;
            } else if (x instanceof Point) {
                options.x = x.x;
                options.y = x.y;
            }

            this._transform.translate = new Translation(options.x, options.y);
            this._renderTransform();
        },

        rotate: function (angle, center) {
            if (defined(angle)) {
                this._transform.rotate = new Rotation(angle, center.x, center.y);
                this._renderTransform();
            }
            return this._transform.rotate || new Rotation(0);
        },

        drawingContainer: function() {
            return this.drawingElement;
        },

        _renderTransform: function () {
            var matrix = this._transform.toMatrix();
            this.drawingContainer().transform(new g.Matrix(matrix.a, matrix.b, matrix.c, matrix.d, matrix.e, matrix.f));
        },

        _hover: function () {},

        _diffNumericOptions: diffNumericOptions,

        _measure: function (force) {
            var rect;
            if (!this._measured || force) {
                var box = this._boundingBox() || new g.Rect();
                var startPoint = box.topLeft();
                rect = new Rect(startPoint.x, startPoint.y, box.width(), box.height());
                this._originSize = rect;
                this._originWidth = rect.width;
                this._originHeight = rect.height;
                this._measured = true;
            } else {
                rect = this._originSize;
            }
            return rect;
        },

        _boundingBox: function() {
            return this.drawingElement.rawBBox();
        }
    });

    var VisualBase = Element.extend({
        init: function(options) {
            Element.fn.init.call(this, options);

            options = this.options;
            options.fill = normalizeDrawingOptions(options.fill);
            options.stroke = normalizeDrawingOptions(options.stroke);
        },

        options: {
            stroke: {
                color: "gray",
                width: 1
            },
            fill: {
                color: TRANSPARENT
            }
        },

        fill: function(color, opacity) {
            this._fill({
                color: getColor(color),
                opacity: opacity
            });
        },

        stroke: function(color, width, opacity) {
            this._stroke({
                color: getColor(color),
                width: width,
                opacity: opacity
            });
        },

        redraw: function (options) {
            if (options) {
                var stroke = options.stroke;
                var fill = options.fill;
                if (stroke) {
                    this._stroke(normalizeDrawingOptions(stroke));
                }
                if (fill) {
                    this._fill(normalizeDrawingOptions(fill));
                }

                Element.fn.redraw.call(this, options);
            }
        },

        _hover: function (show) {
            var drawingElement = this.drawingElement;
            var options = this.options;
            var hover = options.hover;

            if (hover && hover.fill) {
                var fill = show ? normalizeDrawingOptions(hover.fill) : options.fill;
                drawingElement.fill(fill.color, fill.opacity);
            }
        },

        _stroke: function(strokeOptions) {
            var options = this.options;
            deepExtend(options, {
                stroke: strokeOptions
            });

            strokeOptions = options.stroke;

            var stroke = null;
            if (strokeOptions.width > 0) {
                stroke = {
                    color: strokeOptions.color,
                    width: strokeOptions.width,
                    opacity: strokeOptions.opacity,
                    dashType: strokeOptions.dashType
                };
            }

            this.drawingElement.options.set("stroke", stroke);
        },

        _fill: function(fillOptions) {
            var options = this.options;
            deepExtend(options, {
                fill: fillOptions
            });
            var fill = options.fill;

            this.drawingElement.fill(fill.color, fill.opacity);
        }
    });

    var TextBlock = VisualBase.extend({
        init: function (options) {
            this._textColor(options);

            VisualBase.fn.init.call(this, options);

            this._font();
            this._initText();
            this._initSize();
        },

        options: {
            fontSize: 15,
            fontFamily: "sans-serif",
            stroke: {
                width: 0
            },
            fill: {
                color: "black"
            },
            autoSize: true
        },

        _initText: function() {
            var options = this.options;

            this.drawingElement = new d.Text(defined(options.text) ? options.text : "", new g.Point(), {
                fill: options.fill,
                font: options.font
            });

            this._stroke();
        },

        _textColor: function(options) {
            if (options && options.color) {
                deepExtend(options, {
                    fill: {
                        color: options.color
                    }
                });
            }
        },

        _font: function() {
            var options = this.options;
            if (options.fontFamily && defined(options.fontSize)) {
                options.font = options.fontSize + "px " + options.fontFamily;
            } else {
                delete options.font;
            }
        },

        content: function (text) {
            return this.drawingElement.content(text);
        },

        redraw: function (options) {
            if (options) {
                var sizeChanged = false;
                var textOptions = this.options;

                this._textColor(options);

                VisualBase.fn.redraw.call(this, options);

                if (options.fontFamily || defined(options.fontSize)) {
                    deepExtend(textOptions, {
                        fontFamily: options.fontFamily,
                        fontSize: options.fontSize
                    });
                    this._font();
                    this.drawingElement.options.set("font", textOptions.font);
                    sizeChanged = true;
                }

                if (options.text) {
                    this.content(options.text);
                    sizeChanged = true;
                }

                if (!this._updateSize(options) && sizeChanged) {
                    this._initSize();
                }
            }
        }
    });

    deepExtend(TextBlock.fn, AutoSizeableMixin);

    var Rectangle = VisualBase.extend({
        init: function (options) {
            VisualBase.fn.init.call(this, options);
            this._initPath();
            this._setPosition();
        },

        _setPosition: function() {
            var options = this.options;
            var x = options.x;
            var y = options.y;
            if (defined(x) || defined(y)) {
                this.position(x || 0, y || 0);
            }
        },

        redraw: function (options) {
            if (options) {
                VisualBase.fn.redraw.call(this, options);
                if (this._diffNumericOptions(options, [WIDTH, HEIGHT])) {
                    this._drawPath();
                }
                if (this._diffNumericOptions(options, [X, Y])) {
                    this._setPosition();
                }
            }
        },

        _initPath: function() {
            var options = this.options;
            var drawingElement = this.drawingElement = new d.Path({
                fill: options.fill,
                stroke: options.stroke,
                closed: true
            });
            this._drawPath();
        },

        _drawPath: function() {
            var drawingElement = this.drawingElement;
            var sizeOptions = sizeOptionsOrDefault(this.options);
            var width = sizeOptions.width;
            var height = sizeOptions.height;

            drawingElement.segments.elements([
                createSegment(0, 0),
                createSegment(width, 0),
                createSegment(width, height),
                createSegment(0, height)
            ]);
        }
    });

    var MarkerBase = VisualBase.extend({
        init: function(options) {
           VisualBase.fn.init.call(this, options);
           var anchor = this.options.anchor;
           this.anchor = new g.Point(anchor.x, anchor.y);
           this.createElement();
        },

        options: {
           stroke: {
                color: TRANSPARENT,
                width: 0
           },
           fill: {
                color: "black"
           }
        },

        _transformToPath: function(point, path) {
            var transform = path.transform();
            if (point && transform) {
                point = point.transformCopy(transform);
            }
            return point;
        },

        redraw: function(options) {
            if (options) {
                if (options.position) {
                    this.options.position = options.position;
                }

                VisualBase.fn.redraw.call(this, options);
            }
        }
    });

    var CircleMarker = MarkerBase.extend({
        options: {
            radius: 4,
            anchor: {
                x: 0,
                y: 0
            }
        },

        createElement: function() {
            var options = this.options;
            this.drawingElement = new d.Circle(new g.Circle(this.anchor, options.radius), {
                fill: options.fill,
                stroke: options.stroke
            });
        },

        positionMarker: function(path) {
            var options = this.options;
            var position = options.position;
            var segments = path.segments;
            var targetSegment;
            var point;

            if (position == START) {
                targetSegment = segments[0];
            } else {
                targetSegment = segments[segments.length - 1];
            }
            if (targetSegment) {
                point = this._transformToPath(targetSegment.anchor(), path);
                this.drawingElement.transform(g.transform().translate(point.x, point.y));
            }
        }
    });

    var ArrowMarker = MarkerBase.extend({
        options: {
            path: "M 0 0 L 10 5 L 0 10 L 3 5 z"           ,
            anchor: {
                x: 10,
                y: 5
            }
        },

        createElement: function() {
            var options = this.options;
            this.drawingElement = d.Path.parse(options.path, {
                fill: options.fill,
                stroke: options.stroke
            });
        },

        positionMarker: function(path) {
            var points = this._linePoints(path);
            var start = points.start;
            var end = points.end;
            var transform = g.transform();
            if (start) {
                transform.rotate(lineAngle(start, end), end);
            }

            if (end) {
                var anchor = this.anchor;
                var translate = end.clone().translate(-anchor.x, -anchor.y);
                transform.translate(translate.x, translate.y);
            }
            this.drawingElement.transform(transform);
        },

        _linePoints: function(path) {
            var options = this.options;
            var segments = path.segments;
            var startPoint, endPoint, targetSegment;
            if (options.position == START) {
                targetSegment = segments[0];
                if (targetSegment) {
                    endPoint = targetSegment.anchor();
                    startPoint = targetSegment.controlOut();
                    var nextSegment = segments[1];
                    if (!startPoint && nextSegment) {
                        startPoint = nextSegment.anchor();
                    }
                }
            } else {
                targetSegment = segments[segments.length - 1];
                if (targetSegment) {
                    endPoint = targetSegment.anchor();
                    startPoint = targetSegment.controlIn();
                    var prevSegment = segments[segments.length - 2];
                    if (!startPoint && prevSegment) {
                        startPoint = prevSegment.anchor();
                    }
                }
            }
            if (endPoint) {
                return {
                    start: this._transformToPath(startPoint, path),
                    end: this._transformToPath(endPoint, path)
                };
            }
        }
    });

    var MarkerPathMixin = {
        _getPath: function(position) {
            var path = this.drawingElement;
            if (path instanceof d.MultiPath) {
                if (position == START) {
                    path = path.paths[0];
                } else {
                    path = path.paths[path.paths.length - 1];
                }
            }
            if (path && path.segments.length) {
                return path;
            }
        },

        _removeMarker: function(position) {
            var marker = this._markers[position];
            if (marker) {
                this.drawingContainer().remove(marker.drawingElement);
                delete this._markers[position];
            }
        },

        _createMarkers: function() {
            var options = this.options;
            var startCap = options.startCap;
            var endCap = options.endCap;
            this._markers = {};
            this._markers[START] = this._createMarker(startCap, START);
            this._markers[END] = this._createMarker(endCap, END);
        },

        _createMarker: function(type, position) {
            var path = this._getPath(position);
            var markerType, marker;
            if (!path) {
                this._removeMarker(position);
                return;
            }

            if (type == Markers.filledCircle) {
                markerType = CircleMarker;
            } else if (type == Markers.arrowStart || type == Markers.arrowEnd){
                markerType = ArrowMarker;
            } else {
                this._removeMarker(position);
            }
            if (markerType) {
                marker = new markerType({
                    position: position
                });
                marker.positionMarker(path);
                this.drawingContainer().append(marker.drawingElement);

                return marker;
            }
        },

        _positionMarker : function(position) {
            var marker = this._markers[position];

            if (marker) {
                var path = this._getPath(position);
                if (path) {
                    marker.positionMarker(path);
                } else {
                    this._removeMarker(position);
                }
            }
        },

        _capMap: {
            start: "startCap",
            end: "endCap"
        },

        _redrawMarker: function(pathChange, position, options) {
            var pathOptions = this.options;
            var cap = this._capMap[position];
            var optionsCap = options[cap];
            var created = false;
            if (optionsCap && pathOptions[cap] != optionsCap) {
                pathOptions[cap] = optionsCap;
                this._removeMarker(position);
                this._markers[position] = this._createMarker(optionsCap, position);
                created  = true;
            } else if (pathChange && !this._markers[position] && pathOptions[cap]) {
                this._markers[position] = this._createMarker(pathOptions[cap], position);
                created = true;
            }
            return created;
        },

        _redrawMarkers: function (pathChange, options) {
            if (!this._redrawMarker(pathChange, START, options) && pathChange) {
                this._positionMarker(START);
            }
            if (!this._redrawMarker(pathChange, END, options) && pathChange) {
                this._positionMarker(END);
            }
        }
    };

    var Path = VisualBase.extend({
        init: function (options) {
            VisualBase.fn.init.call(this, options);
            this.container = new d.Group();
            this._createElements();
            this._initSize();
        },

        options: {
            autoSize: true
        },

        drawingContainer: function() {
            return this.container;
        },

        data: function (value) {
            var options = this.options;
            if (value) {
                if (options.data != value) {
                   options.data = value;
                   this._setData(value);
                   this._initSize();
                   this._redrawMarkers(true, {});
                }
            } else {
                return options.data;
            }
        },

        redraw: function (options) {
            if (options) {
                VisualBase.fn.redraw.call(this, options);

                var pathOptions = this.options;
                var data = options.data;

                if (defined(data) && pathOptions.data != data) {
                    pathOptions.data = data;
                    this._setData(data);
                    if (!this._updateSize(options)) {
                        this._initSize();
                    }
                    this._redrawMarkers(true, options);
                } else {
                    this._updateSize(options);
                    this._redrawMarkers(false, options);
                }
            }
        },

        _createElements: function() {
            var options = this.options;

            this.drawingElement = d.Path.parse(options.data || "", {
                fill: options.fill,
                stroke: options.stroke
            });
            this.container.append(this.drawingElement);
            this._createMarkers();
        },

        _setData: function(data) {
            var drawingElement = this.drawingElement;
            var multipath = d.Path.parse(data || "");
            var paths = multipath.paths.slice(0);
            multipath.paths.elements([]);
            drawingElement.paths.elements(paths);
        }
    });

    deepExtend(Path.fn, AutoSizeableMixin);
    deepExtend(Path.fn, MarkerPathMixin);

    var Line = VisualBase.extend({
        init: function (options) {
            VisualBase.fn.init.call(this, options);
            this.container = new d.Group();
            this._initPath();
            this._createMarkers();
        },

        drawingContainer: function() {
            return this.container;
        },

        redraw: function (options) {
            if (options) {
                options = options || {};
                var from = options.from;
                var to = options.to;
                if (from) {
                    this.options.from = from;
                }

                if (to) {
                    this.options.to = to;
                }

                if (from || to) {
                    this._drawPath();
                    this._redrawMarkers(true, options);
                } else {
                    this._redrawMarkers(false, options);
                }

                VisualBase.fn.redraw.call(this, options);
            }
        },

        _initPath: function() {
            var options = this.options;
            var drawingElement = this.drawingElement = new d.Path({
                fill: options.fill,
                stroke: options.stroke
            });
            this._drawPath();
            this.container.append(drawingElement);
        },

        _drawPath: function() {
            var options = this.options;
            var drawingElement = this.drawingElement;
            var from = options.from || new Point();
            var to = options.to || new Point();

            drawingElement.segments.elements([
                createSegment(from.x, from.y),
                createSegment(to.x, to.y)
            ]);
        }
    });

    deepExtend(Line.fn, MarkerPathMixin);

    var Polyline = VisualBase.extend({
        init: function (options) {
            VisualBase.fn.init.call(this, options);
            this.container = new d.Group();
            this._initPath();
            this._createMarkers();
        },

        drawingContainer: function() {
            return this.container;
        },

        points: function (points) {
            var options = this.options;
            if (points) {
                options.points = points;
                this._updatePath();
            } else {
                return options.points;
            }
        },

        redraw: function (options) {
            if (options) {
                var points = options.points;
                VisualBase.fn.redraw.call(this, options);

                if (points && this._pointsDiffer(points)) {
                    this.points(points);
                    this._redrawMarkers(true, options);
                } else {
                    this._redrawMarkers(false, options);
                }
            }
        },

        _initPath: function() {
            var options = this.options;
            this.drawingElement = new d.Path({
                fill: options.fill,
                stroke: options.stroke
            });

            this.container.append(this.drawingElement);

            if (options.points) {
                this._updatePath();
            }
        },

        _pointsDiffer: function(points) {
            var currentPoints = this.options.points;
            var differ = currentPoints.length !== points.length;
            if (!differ) {
                for (var i = 0; i < points.length; i++) {
                    if (currentPoints[i].x !== points[i].x || currentPoints[i].y !== points[i].y) {
                        differ = true;
                        break;
                    }
                }
            }

            return differ;
        },

        _updatePath: function() {
            var drawingElement = this.drawingElement;
            var options = this.options;
            var points = options.points;
            var segments = [];
            var point;
            for (var i = 0; i < points.length; i++) {
                point = points[i];
                segments.push(createSegment(point.x, point.y));
            }

            drawingElement.segments.elements(segments);
        },

        options: {
            points: []
        }
    });

    deepExtend(Polyline.fn, MarkerPathMixin);

    var Image = Element.extend({
        init: function (options) {
            Element.fn.init.call(this, options);

            this._initImage();
        },

        redraw: function (options) {
            if (options) {
                if (options.source) {
                    this.drawingElement.src(options.source);
                }

                if (this._diffNumericOptions(options, [WIDTH, HEIGHT, X, Y])) {
                    this.drawingElement.rect(this._rect());
                }

                Element.fn.redraw.call(this, options);
            }
        },

        _initImage: function() {
            var options = this.options;
            var rect = this._rect();

            this.drawingElement = new d.Image(options.source, rect, {});
        },

        _rect: function() {
            var sizeOptions = sizeOptionsOrDefault(this.options);
            var origin = new g.Point(sizeOptions.x, sizeOptions.y);
            var size = new g.Size(sizeOptions.width, sizeOptions.height);

            return new g.Rect(origin, size);
        }
    });

    var Group = Element.extend({
        init: function (options) {
            this.children = [];
            Element.fn.init.call(this, options);
            this.drawingElement = new d.Group();
            this._initSize();
        },

        options: {
            autoSize: false
        },

        append: function (visual) {
            this.drawingElement.append(visual.drawingContainer());
            this.children.push(visual);
            this._childrenChange = true;
        },

        remove: function (visual) {
            if (this._remove(visual)) {
                this._childrenChange = true;
            }
        },

        _remove: function(visual) {
            var index = inArray(visual, this.children);
            if (index >= 0) {
                this.drawingElement.removeAt(index);
                this.children.splice(index, 1);
                return true;
            }
        },

        clear: function () {
            this.drawingElement.clear();
            this.children = [];
            this._childrenChange = true;
        },

        toFront: function (visuals) {
            var visual;

            for (var i = 0; i < visuals.length; i++) {
                visual = visuals[i];
                if (this._remove(visual)) {
                    this.append(visual);
                }
            }
        },
        //TO DO: add drawing group support for moving and inserting children
        toBack: function (visuals) {
            this._reorderChildren(visuals, 0);
        },

        toIndex: function (visuals, indices) {
            this._reorderChildren(visuals, indices);
        },

        _reorderChildren: function(visuals, indices) {
            var group = this.drawingElement;
            var drawingChildren = group.children.slice(0);
            var children = this.children;
            var fixedPosition = isNumber(indices);
            var i, index, toIndex, drawingElement, visual;

            for (i = 0; i < visuals.length; i++) {
                visual = visuals[i];
                drawingElement = visual.drawingContainer();

                index = inArray(visual, children);
                if (index >= 0) {
                    drawingChildren.splice(index, 1);
                    children.splice(index, 1);

                    toIndex = fixedPosition ? indices : indices[i];

                    drawingChildren.splice(toIndex, 0, drawingElement);
                    children.splice(toIndex, 0, visual);
                }
            }
            group.clear();
            group.append.apply(group, drawingChildren);
        },

        redraw: function (options) {
            if (options) {
                if (this._childrenChange) {
                    this._childrenChange = false;
                    if (!this._updateSize(options)) {
                        this._initSize();
                    }
                } else {
                    this._updateSize(options);
                }

                Element.fn.redraw.call(this, options);
            }
        },

        _boundingBox: function() {
            var children = this.children;
            var boundingBox;
            var visual, childBoundingBox;
            for (var i = 0; i < children.length; i++) {
                visual = children[i];
                if (visual.visible() && visual._includeInBBox !== false) {
                    childBoundingBox = visual.drawingContainer().clippedBBox(null);
                    if (childBoundingBox) {
                        if (boundingBox) {
                            boundingBox = Rect.union(boundingBox, childBoundingBox);
                        } else {
                            boundingBox = childBoundingBox;
                        }
                    }
                }
            }

            return boundingBox;
        }
    });

    deepExtend(Group.fn, AutoSizeableMixin);

    var Circle = VisualBase.extend({
        init: function (options) {
            VisualBase.fn.init.call(this, options);
            this._initCircle();
            this._initSize();
        },

        redraw: function (options) {
            if (options) {
                var circleOptions = this.options;

                if (options.center) {
                    deepExtend(circleOptions, {
                        center: options.center
                    });
                    this._center.move(circleOptions.center.x, circleOptions.center.y);
                }

                if (this._diffNumericOptions(options, ["radius"])) {
                    this._circle.setRadius(circleOptions.radius);
                }

                this._updateSize(options);

                VisualBase.fn.redraw.call(this, options);
            }
        },

        _initCircle: function() {
            var options = this.options;
            var width = options.width;
            var height = options.height;
            var radius = options.radius;
            if (!defined(radius)) {
                if (!defined(width)) {
                    width = height;
                }
                if (!defined(height)) {
                    height = width;
                }
                options.radius = radius = Math.min(width, height) / 2;
            }

            var center = options.center || {x: radius, y: radius};
            this._center = new g.Point(center.x, center.y);
            this._circle = new g.Circle(this._center, radius);
            this.drawingElement = new d.Circle(this._circle, {
                fill: options.fill,
                stroke: options.stroke
            });
        }
    });
    deepExtend(Circle.fn, AutoSizeableMixin);

    var Canvas = Class.extend({
        init: function (element, options) {
            options = options || {};
            this.element = element;
            this.surface = d.Surface.create(element, options);
            if (kendo.isFunction(this.surface.translate)) {
                this.translate = this._translate;
            }

            this.drawingElement = new d.Group();
            this._viewBox = new Rect(0, 0, options.width, options.height);
            this.size(this._viewBox);
        },

        bounds: function () {
            var box = this.drawingElement.clippedBBox();
            return new Rect(0, 0, box.width(), box.height());
        },

        size: function (size) {
            var viewBox = this._viewBox;
            if (defined(size)) {
                viewBox.width = size.width;
                viewBox.height = size.height;
                this.surface.setSize(size);
            }
            return {
                width: viewBox.width,
                height: viewBox.height
            };
        },

        _translate: function (x, y) {
            var viewBox = this._viewBox;
            if (defined(x) && defined(y)) {
                viewBox.x = x;
                viewBox.y = y;
                this.surface.translate({x: x, y: y});
            }
            return {
                x: viewBox.x,
                y: viewBox.y
            };
        },

        draw: function() {
            this.surface.draw(this.drawingElement);
        },

        append: function (visual) {
            this.drawingElement.append(visual.drawingContainer());
            return this;
        },

        remove: function (visual) {
            this.drawingElement.remove(visual.drawingContainer());
        },

        insertBefore: function (visual, beforeVisual) {

        },

        clear: function () {
            this.drawingElement.clear();
        },

        destroy: function(clearHtml) {
            this.surface.destroy();
            if(clearHtml) {
                $(this.element).remove();
            }
        }
    });

    // Helper functions ===========================================

    function sizeOptionsOrDefault(options) {
        return {
            x: options.x || 0,
            y: options.y || 0,
            width: options.width || 0,
            height: options.height || 0
        };
    }

    function normalizeDrawingOptions(options) {
        if (options) {
            var drawingOptions = options;

            if (isString(drawingOptions)) {
                drawingOptions = {
                    color: drawingOptions
                };
            }

            if (drawingOptions.color) {
                drawingOptions.color = getColor(drawingOptions.color);
            }
            return drawingOptions;
        }
    }

    function getColor(value) {
        var color;
        if (value != TRANSPARENT) {
            color = new d.Color(value).toHex();
        } else {
            color = value;
        }
        return color;
    }

    function lineAngle(p1, p2) {
        var xDiff = p2.x - p1.x;
        var yDiff = p2.y - p1.y;
        var angle = kendo.util.deg(Math.atan2(yDiff, xDiff));
        return angle;
    }

    function diffNumericOptions(options, fields) {
        var elementOptions = this.options;
        var hasChanges = false;
        var value, field;
        for (var i = 0; i < fields.length; i++) {
            field = fields[i];
            value = options[field];
            if (isNumber(value) && elementOptions[field] !== value) {
                elementOptions[field] = value;
                hasChanges = true;
            }
        }

        return hasChanges;
    }

    function createSegment(x, y) {
        return new d.Segment(new g.Point(x, y));
    }

    // Exports ================================================================
    kendo.deepExtend(diagram, {
        init: function (element) {
            kendo.init(element, diagram.ui);
        },
        diffNumericOptions: diffNumericOptions,
        Element: Element,
        Scale: Scale,
        Translation: Translation,
        Rotation: Rotation,
        Circle: Circle,
        Group: Group,
        Rectangle: Rectangle,
        Canvas: Canvas,
        Path: Path,
        Line: Line,
        MarkerBase: MarkerBase,
        ArrowMarker: ArrowMarker,
        CircleMarker: CircleMarker,
        Polyline: Polyline,
        CompositeTransform: CompositeTransform,
        TextBlock: TextBlock,
        Image: Image,
        VisualBase: VisualBase
    });
})(window.kendo.jQuery);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
