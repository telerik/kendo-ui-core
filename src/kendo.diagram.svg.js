kendo_module({
    id: "diagram.svg",
    name: "Core",
    category: "diagram",
    depends: ["diagram.math"]
});

(function ($, undefined) {
    var kendo = window.kendo,
        Observable = kendo.Observable,
        diagram = kendo.diagram,
        Class = kendo.Class,
        SVGNS = "http://www.w3.org/2000/svg",
        SVGXLINK = "http://www.w3.org/1999/xlink",
        deepExtend = kendo.deepExtend,
        dataviz = kendo.dataviz,
        Point = diagram.Point,
        Rect = diagram.Rect,
        RectAlign = diagram.RectAlign,
        Matrix = diagram.Matrix,
        MatrixVector = diagram.MatrixVector;

    var Scale = Class.extend({
        init: function (x, y) {
            this.x = x;
            this.y = y;
        },
        toMatrix: function () {
            return Matrix.scaling(this.x, this.y);
        },
        toString: function () {
            return "scale(" + this.x + "," + this.y + ")";
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
            return "translate(" + this.x + "," + this.y + ")";
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
                return "rotate(" + this.angle + "," + this.x + "," + this.y + ")";
            } else {
                return "rotate(" + this.angle + ")";
            }
        },
        toMatrix: function () {
            return Matrix.rotation(this.angle, this.x, this.y); // T*R*T^-1
        },
        center: function () {
            return new Point(this.x, this.y);
        }
    });

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
        }
    });

    var Element = Class.extend({
        init: function (native, options) {
            var element = this;
            this._visible = true;
            element.native = native;
            element.options = deepExtend({}, element.options, options);
            element.redraw();
        },
        visible: function (value) {
            if (isUndefined(value)) {
                return this._visible;
            }
            else {
                this._visible = value;
                this.native.setAttribute("visibility", (value ? "visible" : "hidden"));
            }
        },
        setAtr: function (atr, prop) {
            if (this.options[prop] !== undefined) {
                this.native.setAttribute(atr, this.options[prop]);
            }
        },
        redraw: function (options) {
            if (options) {
                this.options = deepExtend({}, this.options, options);
            }
            this.setAtr("id", "id");
            this.setAtr("class", "class");
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
            var t = new CompositeTransform(this.options.x, this.options.y);
            t.render(this.native);
            return this._pos;
        },
        rotate: function (angle, center) {
            if (angle !== undefined) {
                this._rotate = new Rotation(angle, center.x, center.y);

                var t = new CompositeTransform(this.options.x, this.options.y);
                t.rotate = this._rotate;
                t.render(this.native);
            }

            return this._rotate || new Rotation(0);
        },
        _hover: function (value) {
        }
    });

    // Visual but with no size.
    var VisualBase = Element.extend({
        init: function (native, options) {
            var that = this;
            Element.fn.init.call(that, native, options);
            if (this.options.background !== undefined) {
                this.background(this.options.background);
            }
        },
        options: {
            stroke: "gray",
            strokeWidth: 1,
            strokeThickness: 1,
            strokeDashArray: "none"
        },
        background: function (value) {
            if (value != "none") {
                var color = new dataviz.Color(value);
                this._bg = color.toHex();
            }
            else {
                this._bg = value;
            }
            this.native.setAttribute("fill", this._bg);
        },
        redraw: function (options) {
            Element.fn.redraw.call(this, options);

            this.setAtr("stroke", "stroke");
            this.setAtr("stroke-dasharray", "strokeDashArray");
            this.setAtr("stroke-width", "strokeWidth");
            this.setAtr("stroke-thickness", "strokeThickness");
        },
        _hover: function (value) {
            this.background(value ? this.options.hoveredBackground : this.options.background);
        }
    });

    var Visual = VisualBase.extend({
        init: function (native, options) {
            var that = this;
            VisualBase.fn.init.call(that, native, options);
        },
        redraw: function (options) {
            VisualBase.fn.redraw.call(this, options);

            if (this.options.x !== undefined && this.options.y !== undefined) {
                this.position(this.options.x, this.options.y);
            }
            this.size();
        },
        size: function (value) {
            if (value !== undefined) {
                this.options.width = value.width;
                this.options.height = value.height;
            }
            this._sz = { width: this.options.width, height: this.options.height };
            this.setAtr("width", "width");
            this.setAtr("height", "height");
            return this._sz;
        }
    });

    var TextBlock = Visual.extend({
        init: function (options) {
            var that = this;
            Visual.fn.init.call(that, document.createElementNS(SVGNS, "text"), options);
        },
        options: {
            stroke: "none",
            strokeWidth: 0,
            strokeThickness: 0,
            strokeDashArray: "none",
            fontSize: 15,
            fontVariant: "normal",
            fontWeight: "normal",
            anchor: "middle",
            background: "black",
            align: ""
        },
        content: function (text) {
            if (text !== undefined) {
                this.native.textContent = this.options.text = text;
                this._align();
            }

            return this.options.text;
        },
        redraw: function (options) {
            Visual.fn.redraw.call(this, options);
            this.setAtr("font-family", "fontFamily");
            this.setAtr("font-variant", "fontVariant");
            this.setAtr("font-size", "fontSize");
            this.setAtr("font-weight", "fontWeight");
            this.content(this.options.text);
        },
        textBox: function () {
            var svg = this.native;

            if (svg.parentNode)//bounding box exists only when the node is part of the DOM tree
            {
                return svg.getBoundingClientRect();
            }
            else {
                return new Rect();
            }
        },
        align: function (alignment) {
            this.options.align = alignment;
            this._align(alignment);
        },
        _align: function () {
            if (!this.options.align) {
                return;
            }

            var o = this.options;
            var containerRect = new Rect(o.x, o.y, o.width, o.height);

            var aligner = new RectAlign(containerRect);
            var contentBounds = aligner.align(this.textBox(), o.align);
            contentBounds.y += contentBounds.height;
            this.position(contentBounds.topLeft());
        }
    });

    var TextBlockEditor = Observable.extend({
        init: function (native, options) {
            Observable.fn.init.call(this);

            var element = this;
            element.native = native || this._createEditor();
            element.options = deepExtend({}, element.options, options);
            element.redraw();
        },
        visible: function (value) {
            if (value !== undefined) {
                this._isVisible = value;
                this.native.style.visibility = value ? "visible" : "hidden";
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

            var style = this.native.style;
            style.left = this._pos.x + "px";
            style.top = this._pos.y + "px";

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

                var style = this.native.style;
                style.width = this._size.width + "px";
                style.height = this._size.height + "px";
            }

            return this._size;
        },
        focus: function () {
            $(this.native).focus();
        },
        content: function (text) {
            if (!isUndefined(text)) {
                this.native.value = this.options.text = text;
            }

            return this.native.value;
        },
        redraw: function (options) {
            this.options = deepExtend(this.options, options);
            this.content(this.options.text);
        },
        _createEditor: function () {
            var that = this;

            var input = $("<input type='text' class='textEditable' />")
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
                });
            return input[0];
        }
    });

    var Rectangle = Visual.extend({
        init: function (options) {
            Visual.fn.init.call(this, document.createElementNS(SVGNS, "rect"), options);
        },
        options: {
            strokeThickness: undefined,
            strokeWidth: undefined,
            strokeDashArray: undefined,
            background: "none"
        },
        redraw: function (options) {
            Visual.fn.redraw.call(this, options);
            this.setAtr("rx", "cornerRadius");
            this.setAtr("ry", "cornerRadius");
            this.setAtr("stroke", "stroke");
            this.setAtr("stroke-dasharray", "strokeDashArray");
            this.setAtr("stroke-width", "strokeWidth");
            this.setAtr("stroke-thickness", "strokeThickness");
        }
    });

    var Path = Visual.extend({
        init: function (options) {
            var that = this;
            Visual.fn.init.call(that, document.createElementNS(SVGNS, "path"), options);
        },
        size: function () {
            if (!this.oWidth || !this.oHeight) {
                try {
                    var box = this.native.getBoundingClientRect();
                    this.oWidth = box.width;
                    this.oHeight = box.height;
                }
                catch (e) {
                }
            }
            var scaleX = this.options.width / this.oWidth,
                scaleY = this.options.height / this.oHeight,
                x = this.options.x || 0,
                y = this.options.y || 0;

            scaleX = isNumber(scaleX) ? scaleX : 1;
            scaleY = isNumber(scaleY) ? scaleY : 1;

            var transform = new CompositeTransform(x, y, scaleX, scaleY);
            this.native.setAttribute("transform", transform.toString());
        },
        redraw: function (options) {
            Visual.fn.redraw.call(this, options);
            this.setAtr("d", "data");
        }
    });

    var Marker = VisualBase.extend({
        init: function (options) {
            var that = this, childElement;
            VisualBase.fn.init.call(that, document.createElementNS(SVGNS, "marker"), options);
            var o = that.options;

            if (o.data) {
                childElement = new Path({ data: o.data, width: o.width, height: o.height, background: "black" });
            }
            else if (o.circle) {
                childElement = new Circle(o.circle);
            }
            if (childElement) {
                this.native.appendChild(childElement.native);
            }
        },
        redraw: function (options) {
            VisualBase.fn.redraw.call(this, options);
            var that = this, o = that.options;
            if (o.ref) {
                that.native.refX.baseVal.value = o.ref.x;
                that.native.refY.baseVal.value = o.ref.x;
            }
            if (o.width) {
                that.native.markerWidth.baseVal.value = o.width;
            }
            if (o.height) {
                that.native.markerHeight.baseVal.value = o.height;
            }
            this.setAtr("orient", "orientantion");
            if (o.viewBox) {
                that.native.setAttribute("viewBox", "0 0 0 0");
                that.native.viewBox.baseVal.height = o.height;
                that.native.viewBox.baseVal.width = o.viewBox.width;
                that.native.viewBox.baseVal.x = o.viewBox.x;
                that.native.viewBox.baseVal.y = o.viewBox.y;
            }
        }
    });

    var Line = VisualBase.extend({
        init: function (options) {
            this.options.from || new Point();
            this.options.to || new Point();
            VisualBase.fn.init.call(this, document.createElementNS(SVGNS, "line"), options);
        },
        redraw: function (options) {
            VisualBase.fn.redraw.call(this, options);
            if (this.options.from) {
                this.native.setAttribute("x1", this.options.from.x.toString());
                this.native.setAttribute("y1", this.options.from.y.toString());
            }
            if (this.options.to) {
                this.native.setAttribute("x2", this.options.to.x.toString());
                this.native.setAttribute("y2", this.options.to.y.toString());
            }
            if (this.options.startCap) {
                this.native.setAttribute("marker-start", "url(#" + this.options.startCap + ")");
            }
            if (this.options.endCap) {
                this.native.setAttribute("marker-end", "url(#" + this.options.endCap + ")");
            }
        }
    });

    var Polyline = VisualBase.extend({
        init: function (options) {
            var that = this, pointsString = "", i;
            VisualBase.fn.init.call(that, document.createElementNS(SVGNS, "polyline"), options);

            for (i = 0; i < that.options.points.length; i++) {
                pointsString += " " + that.options.points[i].x + "," + that.options.points[i].y;
            }
            this.native.setAttribute("points", pointsString.trim());
        },
        options: {
            stroke: "gray",
            strokeThickness: 1,
            backgrounds: "none",
            points: []
        }
    });

    var Image = Element.extend({
        init: function (options) {
            Element.fn.init.call(this, document.createElementNS(SVGNS, "image"), options);
        },
        redraw: function (options) {
            Element.fn.redraw.call(this, options);
            this.native.setAttributeNS(SVGXLINK, "href", this.options.source);
            this.setAtr("width", "width");
            this.setAtr("height", "height");
            this.setAtr("x", "x");
            this.setAtr("y", "x");
        }
    });

    var Group = Element.extend({
        init: function (options) {
            Element.fn.init.call(this, document.createElementNS(SVGNS, "g"), options);
        },
        append: function (visual) {
            this.native.appendChild(visual.native);
            visual.canvas = this.canvas;
        },
        remove: function (visual) {
            this.native.removeChild(visual.native);
        },
        bringToFront: function (visuals) {
            var visual, i;
            for (i = 0; i < visuals.length; i++) {
                visual = visuals[i];
                this.native.appendChild(visual.native);
            }
        },
        sendToBack: function (visuals) {
            var visual, i;
            for (i = 0; i < visuals.length; i++) {
                visual = visuals[i];
                this.native.insertBefore(visual.native, this.native.firstChild);
            }
        }
    });

    var Circle = VisualBase.extend({
        init: function (options) {
            var that = this;
            VisualBase.fn.init.call(that, document.createElementNS(SVGNS, "ellipse"), options);
            if (that.options.radius) {
                that.options.width = that.options.radius * 2;
                that.options.height = that.options.radius * 2;
            }
        },
        redraw: function (options) {
            VisualBase.fn.redraw.call(this, options);
            var n = this.native,
                o = this.options,
                rx = this.options.rx || o.width / 2, ry = this.options.rx || o.height / 2;

            n.rx.baseVal.value = rx;
            n.ry.baseVal.value = ry;

            if (o.center) {
                n.cx.baseVal.value = o.center.x;
                n.cy.baseVal.value = o.center.y;
            } else if (isDefined(o.x) && isDefined(o.y)) {
                n.cx.baseVal.value = o.x + rx;
                n.cy.baseVal.value = o.y + ry;
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
            this.element = element;
            $(this.native).css({
                width: this.options.width,
                height: this.options.height
            });
            this.element.appendChild(that.native);
            this.native.style.background = that.options.background;
            this.native.setAttribute('xmlns', SVGNS);
            this.native.setAttribute('xmlns:xlink', SVGXLINK);
            this.element.setAttribute("tabindex", "0"); //ensure tabindex so the the canvas receives key events
            this.focus();

            this.addMarker(new Marker({
                data: "m0,50l100,40l-30,-40l30,-40z",
                strokeThickness: 10,
                width: 10,
                height: 10,
                id: "Arrow",
                ref: new Point(50, 50),
                orientation: "auto"
            }));
            this.addMarker(new Marker({
                data: "m100,50l-100,40l30,-40l-30,-40z",
                strokeThickness: 10,
                width: 10,
                height: 10,
                id: "ArrowEnd",
                ref: new Point(50, 50),
                orientation: "auto"
            }));
            this.addMarker(new Marker({
                circle: {
                    width: 6,
                    height: 6,
                    center: new Point(5, 5),
                    strokeThickness: 1,
                    background: "black"
                },
                width: 10,
                height: 10,
                id: "FilledCircle",
                ref: new Point(5, 5),
                orientation: "auto"
            }));
        },
        options: {
            width: "100%",
            height: "100%",
            background: "none",
            id: "SVGRoot"
        },
        focus: function () {
            this.element.focus();
        },
        append: function (shape) {
            this.native.appendChild(shape.native);
            shape.canvas = this;
            this.visuals.push(shape);
            return this;
        },
        remove: function (visual) {
            if (this.visuals.indexOf(visual) >= 0) {
                this.native.removeChild(visual.native);
                visual.canvas = undefined;
                this.visuals.remove(visual);
                return this;
            }
        },
        insertBefore: function (visual, beforeVisual) {
            this.native.insertBefore(visual.native, beforeVisual.native);
            visual.canvas = this;
            this.visuals.push(visual);
            return this;
        },
        ensureDefsNode: function () {
            if (this.defsPresent) {
                return;
            }
            if (this.native.childNodes.length > 0) {
                this.native.insertBefore(this.defsNode, this.native.childNodes[0]);
            } else {
                this.native.appendChild(this.defsNode);
            }
            this.defsPresent = true;
        },
        addMarker: function (marker) {
            this.ensureDefsNode();
            this.defsNode.appendChild(marker.native);
            this.markers.push(marker);
        },
        removeMarker: function (marker) {
            if (marker && this.markers.contains(marker)) {
                this.defsNode.removeChild(marker.native);
                this.markers.remove(marker);
            }
        },
        removeGradient: function (gradient) {
            if (gradient && this.gradients.contains(gradient)) {
                this.defsNode.removeChild(gradient.native);
                this.gradients.remove(gradient);
            }
        },
        addGradient: function (gradient) {
            this.ensureDefsNode();
            this.defsNode.appendChild(gradient.native);
            this.gradients.push(gradient);
        },
        clearMarkers: function () {
            if (this.markers.length == 0) {
                return;
            }
            for (var i = 0; i < this.markers.length; i++) {
                this.defsNode.removeChild(this.markers[i].native);
            }
            this.markers = [];
        },
        clearGradients: function () {
            if (this.gradients.length === 0) {
                return;
            }
            for (var i = 0; i < this.gradients.length; i++) {
                this.defsNode.removeChild(this.gradients[i].native);
            }
            this.gradients = [];
        },
        clear: function () {
            this.clearMarkers();
            this.clearGradients();
            while (this.visuals.length) {
                this.remove(this.visuals[0]);
            }
        }
    });

    kendo.deepExtend(diagram, {
        init: function (element) {
            kendo.init(element, kendo.diagram.ui);
        },
        Scale: Scale,
        Translation: Translation,
        Rotation: Rotation,
        Circle: Circle,
        Group: Group,
        Rectangle: Rectangle,
        Marker: Marker,
        Canvas: Canvas,
        Path: Path,
        Line: Line,
        Polyline: Polyline,
        CompositeTransform: CompositeTransform,
        TextBlock: TextBlock,
        TextBlockEditor: TextBlockEditor,
        Image: Image
    });
})
    (window.kendo.jQuery);
