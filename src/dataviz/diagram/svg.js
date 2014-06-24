(function(f, define){
    define([ "./math" ], f);
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
        MatrixVector = diagram.MatrixVector,

        g = dataviz.geometry,
        d = dataviz.drawing,

        defined = dataviz.defined;

    // Constants ==============================================================
    var SVGNS = "http://www.w3.org/2000/svg",
        SVGXLINK = "http://www.w3.org/1999/xlink",
        Markers = {
            none: "none",
            arrowStart: "ArrowStart",
            filledCircle: "FilledCircle",
            arrowEnd: "ArrowEnd"
        },
        DEFAULTWIDTH = 100,
        DEFAULTHEIGHT = 100,
        FULL_CIRCLE_ANGLE = 360;

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
            visual.setAttribute("transform", this.toString());
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

    function sizeTransform(element) {
        var scaleX = element._originWidth ? element.options.width / element._originWidth : 1,
            scaleY = element._originHeight ? element.options.height / element._originHeight : 1,
            x = element.options.x || 0,
            y = element.options.y || 0;

        element._transform.translate = new Translation(x, y);
        element._transform.scale = new Scale(scaleX, scaleY);
        element._renderTransform();
    }

    var Element = Class.extend({
        init: function (options) {
            var element = this;
            element.options = deepExtend({}, element.options, options);
            element.id = element.options.id;
            this._originSize = Rect.empty();
            this._transform = new CompositeTransform();
        },

        visible: function (value) {
            return this.drawingElement.visible(value);
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

        _renderTransform: function () {
            var matrix = this._transform.toMatrix();
            this.drawingElement.transform(new g.Matrix(matrix.a, matrix.b, matrix.c, matrix.d, matrix.e, matrix.f));
        },

        _hover: function () {},

        _measure: function (force) {
            var rect;
            if (!this._measured || force) {
                var drawingElement = this.drawingElement;
                var box = drawingElement.rawBBox();
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
        }
    });

    // Visual but with no size.
    var VisualBase = Element.extend({
        init: function(options) {
            Element.fn.init.call(this, options);
            options = this.options;
            this._fillOptions();
            this._strokeOptions();
        },

        options: {
            stroke: {
                color: "gray",
                width: 1,
                dashType: "solid"
            }
        },

        fill: function(color, opacity) {
            deepExtend(this.options, {
                fill: {
                    color: color,
                    opacity: opacity
                }
            });

            var fillOptions = this._fillOptions();
            this.drawingElement.fill(fillOptions.color, fillOptions.opacity);
        },

        _fillOptions: function() {
            var fillOptions = this.options.fill || {};
            fillOptions.color = this._getColor(fillOptions.color);
            return fillOptions;
        },

        stroke: function(color, width, opacity) {
             deepExtend(this.options, {
                stroke: {
                    color: color,
                    width: width,
                    opacity: opacity
                }
            });
            var strokeOptions = this._strokeOptions();
            this.drawingElement.stroke(strokeOptions.color, strokeOptions.width, strokeOptions.opacity);
        },

        _strokeOptions: function() {
            var strokeOptions = this.options.stroke || {};
            strokeOptions.color = this._getColor(strokeOptions.color);
            return strokeOptions;
        },

        redraw: function (options) {
            options = options || {};
            var stroke = options.stroke;
            var fill = options.fill;
            if (stroke) {
                this.stroke(stroke.color, stroke.width, stroke.opacity);
            }
            if (fill) {
                this.fill(fill.color, fill.opacity);
            }

            Element.fn.redraw.call(this, options);
        },

        _hover: function (show) {
            var drawingElement = this.drawingElement;
            var options = this.options;
            var hover = options.hover;

            if (hover && hover.fill) {
                var fill = show ? hover.fill : options.fill;
                drawingElement.fill(fill.color, fill.opacity);
            }
        },

        _getColor: function (value) {
            var bg;
            if (value != "none" && value != "transparent") {
                var color = new dataviz.Color(value);
                bg = color.toHex();
            } else {
                bg = value;
            }
            return bg;
        }
    });

    var Visual = VisualBase.extend({
        redraw: function (options) {
            options = options || {};
            if (defined(options.x) && defined(options.y)) {
                this.position(options.x, options.y);
            }

            if (this._hasSize(options)) {
                this.size(options);
            }

            VisualBase.fn.redraw.call(this, options);
        },

        _hasSize: function(options) {
            return defined(options.width) && defined(options.height);
        },

        size: function (size) {
            var options = this.options;
            if (size) {
                options.width = size.width;
                options.height = size.height;
            } else {
                return {
                    width: options.width,
                    height: options.height
                };
            }
        }
    });

    var TextBlock = Visual.extend({
        init: function (options) {
            this._textColor(options);
            Visual.fn.init.call(this, options);
            this._font();

            options = this.options;

            this.drawingElement = new d.Text(defined(options.text) ? options.text : "", new g.Point(), {
                fill: options.fill,
                stroke: options.stroke,
                font: options.font
            });

            this._size();
        },

        options: {
            stroke: {
                color: "none",
                width: 0,
                dashType: "solid"
            },
            fontSize: 15,
            fill: {
                color: "black"
            }
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
            }
        },

        content: function (text) {
            return this.drawingElement.content(text);
        },

        redraw: function (options) {
            var sizeChanged = false;
            var textOptions = this.options;
            options = options || {};
            this._textColor(options);

            Visual.fn.redraw.call(this, options);

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

            if (sizeChanged || this._hasSize(options)) {
                this._size();
            }
        },

        _size: function() {
            if (this._hasSize(this.options)) {
                this._measure(true);
                sizeTransform(this);
            }
        },

        bounds: function () {
            var options = this.options,
                rect = new Rect(0, 0, options.width, options.height);
            return rect;
        }
    });

    var TextBlockEditor = Observable.extend({
        init: function (domElement, options) {
            Observable.fn.init.call(this);

            var element = this;
            element.domElement = domElement || this._createEditor();
            element.options = deepExtend({}, element.options, options);
            element.redraw();
        },
        visible: function (value) {
            if (value !== undefined) {
                this._isVisible = value;
                this.domElement.style.visibility = value ? "visible" : "hidden";
            }
            return this._isVisible;
        },
        position: function (x, y) {
            if (y !== undefined) {
                this.options.x = x;
                this.options.y = y;
                this._pos = new Point(x, y);
            }
            else if (x instanceof Point) {
                this._pos = x;
                this.options.x = this._pos.x;
                this.options.y = this._pos.y;
            }

            $(this.domElement).css({left: this._pos.x + "px", top: this._pos.y + "px"});
            return this._pos;
        },
        size: function (w, h) {
            var isSet = false;
            if (h !== undefined) {
                this._size = { width: w, height: h };
                isSet = true;
            }
            else if (w === Object(w)) {
                this._size = { width: w.width, height: w.height };
                isSet = true;
            }

            if (isSet) {
                deepExtend(this.options, this._size);
                $(this.domElement).css({width: this._size.width + "px", height: this._size.height + "px"});
            }

            return this._size;
        },
        focus: function () {
            $(this.domElement).focus();
        },
        content: function (text) {
            if (!isUndefined(text)) {
                this.domElement.value = this.options.text = text;
            }

            return this.domElement.value;
        },
        redraw: function (options) {
            this.options = deepExtend(this.options, options);
            this.content(this.options.text);
        },
        _createEditor: function () {
            var that = this,
                input = $("<input type='text' class='textEditable' />")
                    .css({ position: "absolute", zIndex: 100, fontSize: "16px" })
                    .on("mousedown mouseup click dblclick", function (e) {
                        e.stopPropagation();
                    })
                    .on("keydown", function (e) {
                        e.stopPropagation();
                    })
                    .on("keypress", function (e) {
                        if (e.keyCode == kendo.keys.ENTER) {
                            that.trigger("finishEdit", e);
                        }
                        e.stopPropagation();
                    })
                    .on("focusout", function (e) {
                        that.trigger("finishEdit", e);
                        e.stopPropagation();
                    });
            return input[0];
        }
    });

    var Rectangle = Visual.extend({
        init: function (options) {
            Visual.fn.init.call(this, options);
        },

        options: {
            stroke: {},
            background: "none"
        },

        redraw: function (options) {
            Visual.fn.redraw.call(this, options);
            this.setAtr("rx", "cornerRadius");
            this.setAtr("ry", "cornerRadius");
            this._setStroke();
        }
    });

    var Path = VisualBase.extend({
        init: function (options) {
            var that = this;
            VisualBase.fn.init.call(that, document.createElementNS(SVGNS, "path"), options);
        },
        options: {
            autoSize: true
        },
        data: function (value) {
            if (value) {
                this.options.data = value;
            }
            else {
                return this.options.data;
            }
        },
        size: function () {
            sizeTransform(this);
        },
        redraw: function (options) {
            var that = this;
            VisualBase.fn.redraw.call(that, options);
            that.size();
            that.setAtr("d", "data");
            if (this.options.startCap && this.options.startCap !== Markers.none) {
                this.domElement.setAttribute("marker-start", "url(#" + this.options.startCap + ")");
            }
            else {
                this.domElement.removeAttribute("marker-start");
            }
            if (this.options.endCap && this.options.endCap !== Markers.none) {
                this.domElement.setAttribute("marker-end", "url(#" + this.options.endCap + ")");
            }
            else {
                this.domElement.removeAttribute("marker-end");
            }

            // SVG markers are not refreshed after the line has changed. This fixes the problem.
            if (this.domElement.parentNode && navigator.appVersion.indexOf("MSIE 10") != -1) {
                this.domElement.parentNode.insertBefore(this.domElement, this.domElement);
            }
        }
    });

    var Marker = Element.extend({
        init: function (options) {
            var that = this, childElement;
            Element.fn.init.call(that, document.createElementNS(SVGNS, "marker"), options);
            var o = that.options;

            if (o.path) {
                childElement = new Path(o.path);
            }
            else if (o.circle) {
                childElement = new Circle(o.circle);
            }
            if (childElement) {
                this.domElement.appendChild(childElement.domElement);
            }
        },
        redraw: function (options) {
            Element.fn.redraw.call(this, options);
            var that = this, o = that.options;
            if (o.ref) {
                that.domElement.refX.baseVal.value = o.ref.x;
                that.domElement.refY.baseVal.value = o.ref.y;
            }
            if (o.width) {
                that.domElement.markerWidth.baseVal.value = o.width;
            }
            if (o.height) {
                that.domElement.markerHeight.baseVal.value = o.height;
            }
            this.setAtr("orient", "orientation");
            this.setAtr("viewBox", "viewBox");
        }
    });

    var Mask = Element.extend({
        init: function (options) {
            var that = this, childElement;
            Element.fn.init.call(that, document.createElementNS(SVGNS, "mask"), options);
            var o = that.options;

            if (o.path) {
                childElement = new Path(o.path);
            }
            else if (o.circle) {
                childElement = new Circle(o.circle);
            }
            else if (o.rectangle) {
                childElement = new Rectangle(o.rectangle);
            }
            if (childElement) {
                this.domElement.appendChild(childElement.domElement);
            }
            this.setAtr("id", "id");
        },
        redraw: function (options) {
            Element.fn.redraw.call(this, options);
            var that = this, o = that.options;

            if (o.width) {
                that.domElement.width.baseVal.value = o.width;
            }
            if (o.height) {
                that.domElement.height.baseVal.value = o.height;
            }

        }
    });

    var Line = VisualBase.extend({
        init: function (options) {
            VisualBase.fn.init.call(this, document.createElementNS(SVGNS, "line"), options);
            this.options.from = this.options.from || new Point();
            this.options.to = this.options.to || new Point();
        },
        redraw: function (options) {
            VisualBase.fn.redraw.call(this, options);
            if (this.options.from) {
                this.domElement.setAttribute("x1", this.options.from.x.toString());
                this.domElement.setAttribute("y1", this.options.from.y.toString());
            }
            if (this.options.to) {
                this.domElement.setAttribute("x2", this.options.to.x.toString());
                this.domElement.setAttribute("y2", this.options.to.y.toString());
            }
            if (this.options.startCap && this.options.startCap !== Markers.none) {
                this.domElement.setAttribute("marker-start", "url(#" + this.options.startCap + ")");
            }
            else {
                this.domElement.removeAttribute("marker-start");
            }
            if (this.options.endCap && this.options.endCap !== Markers.none) {
                this.domElement.setAttribute("marker-end", "url(#" + this.options.endCap + ")");
            }
            else {
                this.domElement.removeAttribute("marker-end");
            }

            // SVG markers are not refreshed after the line has changed. This fixes the problem.
            if (this.domElement.parentNode && navigator.appVersion.indexOf("MSIE 10") != -1) {
                this.domElement.parentNode.insertBefore(this.domElement, this.domElement);
            }
        }
    });

    var Polyline = VisualBase.extend({
        init: function (options) {
            var that = this;
            VisualBase.fn.init.call(that, document.createElementNS(SVGNS, "polyline"), options);
            if (Utils.isDefined(options) && options.points !== null) {
                this.points(that.options.points);
            }

            this.background("none");

        },
        refresh: function () {
            if (this._points === null || this._points.length === 0) {
                return;
            }
            var pointsString = "", i;
            for (i = 0; i < this._points.length; i++) {
                // todo: toArray and fromArray to allow Point and Tuple
                pointsString += " " + this._points[i].x + "," + this._points[i].y;
            }
            this.domElement.setAttribute("points", pointsString.trim());
            this.domElement.setAttribute("stroke", "Orange");
            this.domElement.setAttribute("stroke-width", "5");

        },
        points: function (value) {
            if (isUndefined(value)) {
                return this._points;
            }
            else {
                this._points = value;
                this.refresh();
            }
        },
        redraw: function () {
            this.refresh();
        },
        options: {
            stroke: {
                color: "gray",
                width: 1
            },
            backgrounds: "none",
            points: []
        }
    });

    var Image = Element.extend({
        init: function (options) {
            Element.fn.init.call(this, document.createElementNS(SVGNS, "image"), options);
        },
        options: {
            autoSize: true
        },
        redraw: function (options) {
            Element.fn.redraw.call(this, options);
            this.domElement.setAttributeNS(SVGXLINK, "href", this.options.source);
            this.setAtr("width", "width");
            this.setAtr("height", "height");
            this.setAtr("x", "x");
            this.setAtr("y", "y");
        }
    });

    var Group = Element.extend({
        init: function (options) {
            Element.fn.init.call(this, document.createElementNS(SVGNS, "g"), options);
            this.width = this.options.width;
            this.height = this.options.height;
        },
        options: {
            autoSize: true
        },
        append: function (visual) {
            this.domElement.appendChild(visual.domElement);
            visual.canvas = this.canvas;
        },
        remove: function (visual) {
            if (visual.domElement) {
                this.domElement.removeChild(visual.domElement);
            }
            else {
                this.domElement.removeChild(visual);
            }
        },
        clear: function () {
            while (this.domElement.lastChild) {
                this.domElement.removeChild(this.domElement.lastChild);
            }
        },
        toFront: function (visuals) {
            var visual, i, n = this.domElement;

            for (i = 0; i < visuals.length; i++) {
                visual = visuals[i];
                n.appendChild(visual.domElement);
            }
        },
        toBack: function (visuals) {
            var visual, i;
            for (i = 0; i < visuals.length; i++) {
                visual = visuals[i];
                this.domElement.insertBefore(visual.domElement, this.domElement.firstChild);
            }
        },
        toIndex: function (visuals, indices) { // bring the items to the following index
            var visual, i, index;
            for (i = 0; i < visuals.length; i++) {
                visual = visuals[i];
                index = indices[i];
                this.domElement.insertBefore(visual.domElement, this.domElement.children[index]);
            }
        },
        size: function () {
            sizeTransform(this);
        },
        redraw: function (options) {
            Element.fn.redraw.call(this, options);
            this.size();
        }
    });

    var Circle = VisualBase.extend({
        init: function (options) {
            var that = this;
            if (options && options.radius) {
                options.width = options.radius * 2;
                options.height = options.radius * 2;
            }
            VisualBase.fn.init.call(that, document.createElementNS(SVGNS, "ellipse"), options);
        },
        redraw: function (options) {
            if (options && Utils.isNumber(options.width) && Utils.isNumber(options.height)) {
                options.center = new Point(options.width / 2, options.height / 2);
            }
            VisualBase.fn.redraw.call(this, options);
            var n = this.domElement,
                o = this.options,
                rx = o.width / 2 || o.rx, ry = o.height / 2 || o.rx;

            if (rx && ry) {
                n.rx.baseVal.value = rx;
                n.ry.baseVal.value = ry;
            }

            if (o.center) {
                n.cx.baseVal.value = o.center.x;
                n.cy.baseVal.value = o.center.y;
            } else if (Utils.isDefined(o.x) && Utils.isDefined(o.y)) {
                n.cx.baseVal.value = o.x + rx;
                n.cy.baseVal.value = o.y + ry;
            } else {
                n.cx.baseVal.value = rx;
                n.cy.baseVal.value = ry;
            }
        }
    });

    var Canvas = Visual.extend({
        init: function (element, options) {
            var that = this;
            Visual.fn.init.call(that, document.createElementNS(SVGNS, "svg"), options);
            this.markers = [];
            this.gradients = [];
            this.visuals = [];
            this.defsNode = document.createElementNS(SVGNS, "defs");
            this.domElement.appendChild(this.defsNode);
            if (element.context) {
                this.element = element.context; // kendo wrapped object
            }
            else {
                this.element = element;
            }
            $(this.domElement).css({
                width: this.options.width,
                height: this.options.height
            });
            this.element.appendChild(that.domElement);
            this.domElement.style.background = that.options.background;
            this.domElement.setAttribute('xmlns', SVGNS);
            this.domElement.setAttribute('xmlns:xlink', SVGXLINK);
            this.element.setAttribute("tabindex", "0"); //ensure tabindex so the the canvas receives key events
            this._markers();
            this.masks = [];
        },
        options: {
            width: "100%",
            height: "100%",
            background: "none",
            id: "SVGRoot"
        },
        bounds: function () {
            var box = this.domElement.getBBox();
            return new Rect(0, 0, box.width, box.height);
        },
        focus: function () {
            this.element.focus();
        },
        size: function () {
            var canvas = this,
                size = Visual.fn.size.apply(canvas, arguments),
                viewBox = this.viewBox();

            this._styledSize(canvas.domElement);

            viewBox.width = size.width;
            viewBox.height = size.height;
            this.viewBox(viewBox);

            return size;
        },
        _styledSize: function (node) {
            var size = this._sz;
            $(node).css(size);
        },
        viewBox: function (rect) {
            var canvas = this;

            if (isUndefined(rect)) {
                return canvas.domElement.viewBox.baseVal ? Rect.toRect(canvas.domElement.viewBox.baseVal) : Rect.empty();
            }

            rect = Rect.toRect(rect);
            if (!isNaN(rect.width) && !isNaN(rect.height)) {
                this.domElement.setAttribute("viewBox", rect.toString(","));
            }
        },
        append: function (shape) {
            this.domElement.appendChild(shape.domElement);
            shape.canvas = this;
            this.visuals.push(shape);
            return this;
        },
        remove: function (visual) {
            if (Utils.indexOf(this.visuals, visual) >= 0) {
                this.domElement.removeChild(visual.domElement);
                visual.canvas = undefined;
                Utils.remove(this.visuals, visual);
                return this;
            }
        },
        insertBefore: function (visual, beforeVisual) {
            this.domElement.insertBefore(visual.domElement, beforeVisual.domElement);
            visual.canvas = this;
            this.visuals.push(visual);
            return this;
        },
        addMarker: function (marker) {
            this.defsNode.appendChild(marker.domElement);
            this.markers.push(marker);
        },
        removeMarker: function (marker) {
            if (marker && Utils.contains.contains(this.markers, marker)) {
                this.defsNode.removeChild(marker.domElement);
                Utils.remove(this.markers, marker);
            }
        },
        addMask: function (mask) {
            this.defsNode.appendChild(mask.domElement);
            this.masks.push(mask);
        },
        removeMask: function (mask) {
            if (mask && Utils.contains(this.masks, mask)) {
                this.defsNode.removeChild(mask.domElement);
                Utils.remove(this.masks, mask);
            }
        },
        removeGradient: function (gradient) {
            if (gradient && Utils.contains(this.gradients, gradient)) {
                this.defsNode.removeChild(gradient.domElement);
                Utils.remove(this.gradients, gradient);
            }
        },
        addGradient: function (gradient) {
            this.defsNode.appendChild(gradient.domElement);
            this.gradients.push(gradient);
        },
        clearMarkers: function () {
            var i;
            if (this.markers.length === 0) {
                return;
            }
            for (i = 0; i < this.markers.length; i++) {
                this.defsNode.removeChild(this.markers[i].domElement);
            }
            this.markers = [];
        },
        clear: function () {
            while (this.visuals.length) {
                this.remove(this.visuals[0]);
            }
        },
        mask: function (mask) {
            if (mask === null) {
                this.domElement.removeAttribute("mask");
            }
            else {
                this.domElement.setAttribute("mask", "url(#" + mask.domElement.id + ")");
            }

        },
        _markers: function () {
            this.addMarker(new Marker({
                path: {
                    data: "M 0 0 L 10 5 L 0 10 L 3 5 z",
                    background: "Black"
                },
                id: Markers.arrowEnd,
                orientation: "auto",
                width: 10,
                height: 10,
                ref: new Point(10, 5)
            }));
            this.addMarker(new Marker({
                path: {
                    data: "M 0 5 L 10 0 L 7 5 L 10 10 z",
                    background: "Black"
                },
                id: Markers.arrowStart,
                orientation: "auto",
                width: 10,
                height: 10,
                ref: new Point(0, 5)
            }));
            this.addMarker(new Marker({
                circle: {
                    width: 6,
                    height: 6,
                    center: new Point(5, 5),
                    stroke: {
                        width: 1
                    },
                    background: "black"
                },
                width: 10,
                height: 10,
                id: Markers.filledCircle,
                ref: new Point(5, 5),
                orientation: "auto"
            }));
        },
        destroy: function(clearHtml) {
            if(clearHtml) {
                $(this.element).remove();
            }
        }
    });

    kendo.deepExtend(diagram, {
        init: function (element) {
            kendo.init(element, diagram.ui);
        },
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
        Marker: Marker,
        Polyline: Polyline,
        CompositeTransform: CompositeTransform,
        TextBlock: TextBlock,
        TextBlockEditor: TextBlockEditor,
        Image: Image,
        Mask: Mask,
        Visual: Visual,
        VisualBase: VisualBase
    });
})(window.kendo.jQuery);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
