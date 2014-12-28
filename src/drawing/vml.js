(function(f, define){
    define([ "./shapes", "../kendo.color" ], f);
})(function(){

(function ($) {

    // Imports ================================================================
    var doc = document,
        math = Math,
        atan2 = math.atan2,
        ceil = math.ceil,
        sqrt = math.sqrt,

        kendo = window.kendo,
        deepExtend = kendo.deepExtend,
        noop = $.noop,

        d = kendo.drawing,
        BaseNode = d.BaseNode,

        g = kendo.geometry,
        toMatrix = g.toMatrix,

        Color = kendo.Color,

        util = kendo.util,
        isTransparent = util.isTransparent,
        defined = util.defined,
        deg = util.deg,
        renderTemplate = util.renderTemplate,
        round = util.round,
        valueOrDefault = util.valueOrDefault;

    // Constants ==============================================================
    var NONE = "none",
        NS = ".kendo",
        COORDINATE_MULTIPLE = 100,
        COORDINATE_SIZE = COORDINATE_MULTIPLE * COORDINATE_MULTIPLE,
        GRADIENT = "gradient",
        TRANSFORM_PRECISION = 4;

    // VML rendering surface ==================================================
    var Surface = d.Surface.extend({
        init: function(element, options) {
            d.Surface.fn.init.call(this, element, options);

            enableVML();

            this.element.empty();

            this._root = new RootNode();
            this._root.attachTo(this.element[0]);

            this.element.on("click" + NS, this._click);
            this.element.on("mouseover" + NS, this._mouseenter);
            this.element.on("mouseout" + NS, this._mouseleave);
        },

        type: "vml",

        destroy: function() {
            if (this._root) {
                this._root.destroy();
                this._root = null;

                this.element.off(NS);
            }

            d.Surface.fn.destroy.call(this);
        },

        draw: function(element) {
            this._root.load([element], undefined, null);
        },

        clear: function() {
            this._root.clear();
        }
    });

    // VML Node ================================================================
    var Node = BaseNode.extend({
        init: function(srcElement) {
            BaseNode.fn.init.call(this, srcElement);

            this.createElement();
            this.attachReference();
        },

        observe: noop,

        destroy: function() {
            if (this.element) {
                this.element._kendoNode = null;
                this.element = null;
            }

            BaseNode.fn.destroy.call(this);
        },

        clear: function() {
            if (this.element) {
                this.element.innerHTML = "";
            }

            var children = this.childNodes;
            for (var i = 0; i < children.length; i++) {
                children[i].destroy();
            }

            this.childNodes = [];
        },

        removeSelf: function() {
            if (this.element) {
                this.element.parentNode.removeChild(this.element);
                this.element = null;
            }

            BaseNode.fn.removeSelf.call(this);
        },

        createElement: function() {
            this.element = doc.createElement("div");
        },

        attachReference: function() {
            this.element._kendoNode = this;
        },

        load: function(elements, pos, transform, opacity) {
            opacity = valueOrDefault(opacity, 1);
            if (this.srcElement) {
                opacity *= valueOrDefault(this.srcElement.options.opacity, 1);
            }

            for (var i = 0; i < elements.length; i++) {
                var srcElement = elements[i];
                var children = srcElement.children;
                var combinedTransform = srcElement.currentTransform(transform);
                var currentOpacity = opacity * valueOrDefault(srcElement.options.opacity, 1);

                var childNode = new nodeMap[srcElement.nodeType](srcElement, combinedTransform, currentOpacity);

                if (children && children.length > 0) {
                    childNode.load(children, pos, combinedTransform, opacity);
                }

                if (defined(pos)) {
                    this.insertAt(childNode, pos);
                } else {
                    this.append(childNode);
                }

                childNode.attachTo(this.element, pos);
            }
        },

        attachTo: function(domElement, pos) {
            if (defined(pos)) {
                domElement.insertBefore(this.element, domElement.children[pos] || null);
            } else {
                domElement.appendChild(this.element);
            }
        },

        optionsChange: function(e) {
            if (e.field == "visible") {
                this.css("display", e.value !== false ? "" : NONE);
            }
        },

        setStyle: function() {
            this.allCss(this.mapStyle());
        },

        mapStyle: function() {
            var style = [];

            if (this.srcElement && this.srcElement.options.visible === false) {
                style.push([ "display", NONE ]);
            }

            return style;
        },

        mapOpacityTo: function(attrs, multiplier) {
            var opacity = valueOrDefault(this.opacity, 1);

            opacity *= valueOrDefault(multiplier, 1);
            attrs.push(["opacity", opacity]);
        },

        attr: function(name, value) {
            if (this.element) {
                this.element[name] = value;
            }
        },

        allAttr: function(attrs) {
            for (var i = 0; i < attrs.length; i++) {
                this.attr(attrs[i][0], attrs[i][1]);
            }
        },

        css: function(name, value) {
            if (this.element) {
                this.element.style[name] = value;
            }
        },

        allCss: function(styles) {
            for (var i = 0; i < styles.length; i++) {
                this.css(styles[i][0], styles[i][1]);
            }
        }
    });

    var RootNode = Node.extend({
        createElement: function() {
            Node.fn.createElement.call(this);

            this.allCss([
                ["width", "100%"],
                ["height", "100%"],
                ["position", "relative"],
                ["visibility", "visible"]
            ]);
        },

        attachReference: noop
    });

    var ClipObserver = kendo.Class.extend({
        init: function(srcElement, observer) {
            this.srcElement = srcElement;
            this.observer = observer;

            srcElement.addObserver(this);
        },

        geometryChange: function() {
            this.observer.optionsChange({
                field: "clip",
                value: this.srcElement
            });
        },

        clear: function() {
            this.srcElement.removeObserver(this);
        }
    });

    var ObserverNode = Node.extend({
        init: function(srcElement) {
            Node.fn.init.call(this, srcElement);

            if (srcElement) {
                this.initClip();
            }
        },

        observe: function() {
            BaseNode.fn.observe.call(this);
        },

        mapStyle: function() {
            var style = Node.fn.mapStyle.call(this);
            if (this.srcElement && this.srcElement.clip()) {
                style.push(["clip", this.clipRect()]);
            }
            return style;
        },

        optionsChange: function(e) {
            if (e.field == "clip") {
                this.clearClip();
                this.initClip();
                this.setClip();
            }

            Node.fn.optionsChange.call(this, e);
        },

        clear: function() {
            this.clearClip();

            Node.fn.clear.call(this);
        },

        initClip: function() {
            if (this.srcElement.clip()) {
                this.clip = new ClipObserver(this.srcElement.clip(), this);
                this.clip.observer = this;
            }
        },

        clearClip: function() {
            if (this.clip) {
                this.clip.clear();
                this.clip = null;
                this.css("clip", this.clipRect());
            }
        },

        setClip: function() {
            if (this.clip) {
                this.css("clip", this.clipRect());
            }
        },

        clipRect: function() {
            var clipRect = EMPTY_CLIP;
            var clip = this.srcElement.clip();
            if (clip) {
                var bbox = this.clipBBox(clip);
                var topLeft = bbox.topLeft();
                var bottomRight = bbox.bottomRight();
                clipRect = kendo.format("rect({0}px {1}px {2}px {3}px)",
                    topLeft.y,
                    bottomRight.x,
                    bottomRight.y,
                    topLeft.x);
            }
            return clipRect;
        },

        clipBBox: function(clip) {
            var topLeft = this.srcElement.rawBBox().topLeft();
            var clipBBox = clip.rawBBox();
            clipBBox.origin.translate(-topLeft.x, -topLeft.y);

            return clipBBox;
        }
    });

    var GroupNode = ObserverNode.extend({
        createElement: function() {
            Node.fn.createElement.call(this);
            this.setStyle();
        },

        attachTo: function(domElement, pos) {
            this.css("display", NONE);

            Node.fn.attachTo.call(this, domElement, pos);

            if (this.srcElement.options.visible !== false) {
                this.css("display", "");
            }
        },

        _attachTo: function(domElement) {
            var frag = document.createDocumentFragment();
            frag.appendChild(this.element);

            domElement.appendChild(frag);
        },

        mapStyle: function() {
            var style = ObserverNode.fn.mapStyle.call(this);
            style.push(["position", "absolute"]);
            style.push(["white-space", "nowrap"]);

            return style;
        },

        optionsChange: function(e) {
            if (e.field === "transform") {
                this.refreshTransform();
            }

            if (e.field === "opacity") {
                this.refreshOpacity();
            }

            ObserverNode.fn.optionsChange.call(this, e);
        },

        refreshTransform: function(transform) {
            var currentTransform = this.srcElement.currentTransform(transform),
                children = this.childNodes,
                length = children.length,
                i;

            this.setClip();
            for (i = 0; i < length; i++) {
                children[i].refreshTransform(currentTransform);
            }
        },

        currentOpacity: function() {
            var opacity = valueOrDefault(this.srcElement.options.opacity, 1);

            if (this.parent && this.parent.currentOpacity) {
                opacity *= this.parent.currentOpacity();
            }

            return opacity;
        },

        refreshOpacity: function() {
            var children = this.childNodes,
                length = children.length,
                i;

            var opacity = this.currentOpacity();
            for (i = 0; i < length; i++) {
                children[i].refreshOpacity(opacity);
            }
        },

        initClip: function() {
            ObserverNode.fn.initClip.call(this);

            if (this.clip) {
                var bbox = this.clip.srcElement.bbox(this.srcElement.currentTransform());
                if (bbox) {
                    this.css("width", bbox.width() + bbox.origin.x);
                    this.css("height", bbox.height() + bbox.origin.y);
                }
            }
        },

        clipBBox: function(clip) {
            return clip.bbox(this.srcElement.currentTransform());
        },

        clearClip: function() {
            ObserverNode.fn.clearClip.call(this);
        }
    });

    var StrokeNode = Node.extend({
        init: function(srcElement, opacity) {
            this.opacity = opacity;
            Node.fn.init.call(this, srcElement);
        },

        createElement: function() {
            this.element = createElementVML("stroke");
            this.setOpacity();
        },

        optionsChange: function(e) {
            if (e.field.indexOf("stroke") === 0) {
                this.setStroke();
            }
        },

        refreshOpacity: function(opacity) {
            this.opacity = opacity;
            this.setStroke();
        },

        setStroke: function() {
            this.allAttr(this.mapStroke());
        },

        setOpacity: function() {
            this.setStroke();
        },

        mapStroke: function() {
            var stroke = this.srcElement.options.stroke;
            var attrs = [];

            if (stroke && !isTransparent(stroke.color) && stroke.width !== 0) {
                attrs.push(["on", "true"]);
                attrs.push(["color", stroke.color]);
                attrs.push(["weight", (stroke.width || 1) + "px"]);

                this.mapOpacityTo(attrs, stroke.opacity);

                if (defined(stroke.dashType)) {
                    attrs.push(["dashstyle", stroke.dashType]);
                }

                if (defined(stroke.lineJoin)) {
                    attrs.push(["joinstyle", stroke.lineJoin]);
                }

                if (defined(stroke.lineCap)) {
                    var lineCap = stroke.lineCap.toLowerCase();
                    if (lineCap === "butt") {
                        lineCap = lineCap === "butt" ? "flat" : lineCap;
                    }
                    attrs.push(["endcap", lineCap]);
                }
            } else {
                attrs.push(["on", "false"]);
            }

            return attrs;
        }
    });

    var FillNode = Node.extend({
        init: function(srcElement, transform, opacity) {
            this.opacity = opacity;
            Node.fn.init.call(this, srcElement);
        },

        createElement: function() {
            this.element = createElementVML("fill");
            this.setFill();
        },

        optionsChange: function(e) {
            if (fillField(e.field)) {
                this.setFill();
            }
        },

        refreshOpacity: function(opacity) {
            this.opacity = opacity;
            this.setOpacity();
        },

        setFill: function() {
            this.allAttr(this.mapFill());
        },

        setOpacity: function() {
            this.setFill();
        },

        attr: function(name, value) {
            var element = this.element;
            if (element) {
                var fields = name.split(".");

                while (fields.length > 1) {
                    element = element[fields.shift()];
                }
                element[fields[0]] = value;
            }
        },

        mapFill: function() {
            var fill = this.srcElement.fill();
            var attrs = [
                ["on", "false"]
            ];

            if (fill) {
                if (fill.nodeType == GRADIENT) {
                    attrs = this.mapGradient(fill);
                } else if (!isTransparent(fill.color)) {
                    attrs = this.mapFillColor(fill);
                }
            }

            return attrs;
        },

        mapFillColor: function(fill) {
            var attrs = [
                ["on", "true"],
                ["color", fill.color]
            ];

            this.mapOpacityTo(attrs, fill.opacity);

            return attrs;
        },

        mapGradient: function(fill) {
            var options = this.srcElement.options;
            var fallbackFill = options.fallbackFill || (fill.fallbackFill && fill.fallbackFill());
            var attrs;
            if (fill instanceof d.LinearGradient) {
                attrs = this.mapLinearGradient(fill);
            } else if (fill instanceof d.RadialGradient && fill.supportVML) {
                attrs = this.mapRadialGradient(fill);
            } else if (fallbackFill) {
                attrs = this.mapFillColor(fallbackFill);
            } else {
                attrs = [["on", "false"]];
            }

            return attrs;
        },

        mapLinearGradient: function(fill) {
            var start = fill.start();
            var end = fill.end();
            var stops = fill.stops;
            var angle = util.deg(atan2(end.y - start.y, end.x - start.x));

            var attrs = [
                ["on", "true"],
                ["type", GRADIENT],
                ["focus", 0],
                ["method", "none"],
                ["angle", 270 - angle]
            ];
            this.addColors(attrs);
            return attrs;
        },

        mapRadialGradient: function(fill) {
            var bbox = this.srcElement.rawBBox();
            var center = fill.center();
            var stops = fill.stops;
            var focusx = (center.x - bbox.origin.x) / bbox.width();
            var focusy = (center.y - bbox.origin.y) / bbox.height();
            var attrs = [
                ["on", "true"],
                ["type", "gradienttitle"],
                ["focus", "100%"],
                ["focusposition", focusx + " " + focusy],
                ["method", "none"]
            ];
            this.addColors(attrs);

            return attrs;
        },

        addColors: function(attrs) {
            var options = this.srcElement.options;
            var stopColors = [];
            var stops = options.fill.stops;
            var baseColor = options.baseColor;
            var colorsField = this.element.colors ? "colors.value" : "colors";
            var color = stopColor(baseColor, stops[0]);
            var color2 = stopColor(baseColor, stops[stops.length - 1]);
            var stop;

            for (var idx = 0; idx < stops.length; idx++) {
                stop = stops[idx];

                stopColors.push(
                    math.round(stop.offset() * 100) + "% " +
                    stopColor(baseColor, stop)
                );
            }

            attrs.push([colorsField, stopColors.join(",")],
                ["color", color],
                ["color2", color2]
            );
        }
    });

    var TransformNode = Node.extend({
        init: function(srcElement, transform) {
            this.transform = transform;

            Node.fn.init.call(this, srcElement);
        },

        createElement: function() {
            this.element = createElementVML("skew");
            this.setTransform();
        },

        optionsChange: function(e) {
            if (e.field === "transform") {
                this.refresh(this.srcElement.currentTransform());
            }
        },

        refresh: function(transform) {
            this.transform = transform;
            this.setTransform();
        },

        transformOrigin: function() {
            return "-0.5,-0.5";
        },

        setTransform: function() {
            this.allAttr(this.mapTransform());
        },

        mapTransform: function() {
            var transform = this.transform;

            var attrs = [],
                a, b, c, d,
                matrix = toMatrix(transform);

            if (matrix) {
                matrix.round(TRANSFORM_PRECISION);
                attrs.push(
                    ["on", "true"],
                    ["matrix", [matrix.a, matrix.c, matrix.b, matrix.d, 0, 0].join(",")],
                    ["offset", matrix.e + "px," + matrix.f + "px"],
                    ["origin", this.transformOrigin()]
                );
            } else {
                attrs.push(["on", "false"]);
            }

            return attrs;
        }
    });

    var ShapeNode = ObserverNode.extend({
        init: function(srcElement, transform, opacity) {
            this.fill = this.createFillNode(srcElement, transform, opacity);
            this.stroke = new StrokeNode(srcElement, opacity);
            this.transform = this.createTransformNode(srcElement, transform);

            ObserverNode.fn.init.call(this, srcElement);
        },

        attachTo: function(domElement, pos) {
            this.fill.attachTo(this.element);
            this.stroke.attachTo(this.element);
            this.transform.attachTo(this.element);

            Node.fn.attachTo.call(this, domElement, pos);
        },

        createFillNode: function(srcElement, transform, opacity) {
            return new FillNode(srcElement, transform, opacity);
        },

        createTransformNode: function(srcElement, transform) {
            return new TransformNode(srcElement, transform);
        },

        createElement: function() {
            this.element = createElementVML("shape");
            this.setCoordsize();
            this.setStyle();
        },

        optionsChange: function(e) {
            if (fillField(e.field)) {
                this.fill.optionsChange(e);
            } else if (e.field.indexOf("stroke") === 0) {
                this.stroke.optionsChange(e);
            } else if (e.field === "transform") {
                this.transform.optionsChange(e);
            } else if (e.field === "opacity") {
                this.fill.setOpacity();
                this.stroke.setOpacity();
            }

            ObserverNode.fn.optionsChange.call(this, e);
        },

        refreshTransform: function(transform) {
            this.transform.refresh(this.srcElement.currentTransform(transform));
        },

        refreshOpacity: function(opacity) {
            opacity *= valueOrDefault(this.srcElement.options.opacity, 1);

            this.fill.refreshOpacity(opacity);
            this.stroke.refreshOpacity(opacity);
        },

        mapStyle: function(width, height) {
            var styles = ObserverNode.fn.mapStyle.call(this);

            if (!width || !height) {
                width = height = COORDINATE_MULTIPLE;
            }

            styles.push(
                ["position", "absolute"],
                ["width", width + "px"],
                ["height", height + "px"]
            );

            var cursor = this.srcElement.options.cursor;
            if (cursor) {
                styles.push(["cursor", cursor]);
            }

            return styles;
        },

        setCoordsize: function() {
            this.allAttr([
                ["coordorigin", "0 0"],
                ["coordsize", COORDINATE_SIZE + " " + COORDINATE_SIZE]
            ]);
        }
    });

    var PathDataNode = Node.extend({
        createElement: function() {
            this.element = createElementVML("path");
            this.setPathData();
        },

        geometryChange: function() {
            this.setPathData();
        },

        setPathData: function() {
            this.attr("v", this.renderData());
        },

        renderData: function() {
            return printPath(this.srcElement);
        }
    });

    var PathNode = ShapeNode.extend({
        init: function(srcElement, transform, opacity) {
            this.pathData = this.createDataNode(srcElement);

            ShapeNode.fn.init.call(this, srcElement, transform, opacity);
        },

        attachTo: function(domElement, pos) {
            this.pathData.attachTo(this.element);
            ShapeNode.fn.attachTo.call(this, domElement, pos);
        },

        createDataNode: function(srcElement) {
            return new PathDataNode(srcElement);
        },

        geometryChange: function() {
            this.pathData.geometryChange();
            ShapeNode.fn.geometryChange.call(this);
        }
    });

    var MultiPathDataNode = PathDataNode.extend({
        renderData: function() {
            var paths = this.srcElement.paths;

            if (paths.length > 0) {
                var result = [],
                    i,
                    open;

                for (i = 0; i < paths.length; i++) {
                    open = i < paths.length - 1;
                    result.push(printPath(paths[i], open));
                }

                return result.join(" ");
            }
        }
    });

    var MultiPathNode = PathNode.extend({
        createDataNode: function(srcElement) {
            return new MultiPathDataNode(srcElement);
        }
    });

    var CircleTransformNode = TransformNode.extend({
        transformOrigin: function() {
            var boundingBox = this.srcElement.geometry().bbox(),
                center = boundingBox.center(),
                originX = -ceil(center.x) / ceil(boundingBox.width()),
                originY = -ceil(center.y) / ceil(boundingBox.height());

            return originX + "," + originY;
        }
    });

    var CircleNode = ShapeNode.extend({
        createElement: function() {
            this.element = createElementVML("oval");
            this.setStyle();
        },

        createTransformNode: function(srcElement, transform) {
            return new CircleTransformNode(srcElement, transform);
        },

        geometryChange: function() {
            ShapeNode.fn.geometryChange.call(this);

            this.setStyle();
            this.refreshTransform();
        },

        mapStyle: function() {
            var geometry = this.srcElement.geometry();
            var radius = geometry.radius;
            var center = geometry.center;
            var diameter = ceil(radius * 2);

            var styles = ShapeNode.fn.mapStyle.call(this, diameter, diameter);
            styles.push(
                ["left", ceil(center.x - radius) + "px"],
                ["top", ceil(center.y - radius) + "px"]
            );

            return styles;
        }
    });

    var ArcDataNode = PathDataNode.extend({
        renderData: function() {
            return printPath(this.srcElement.toPath());
        }
    });

    var ArcNode = PathNode.extend({
        createDataNode: function(srcElement) {
            return new ArcDataNode(srcElement);
        }
    });

    var TextPathDataNode = PathDataNode.extend({
        createElement: function() {
            PathDataNode.fn.createElement.call(this);

            this.attr("textpathok", true);
        },

        renderData: function() {
            var rect = this.srcElement.rect();
            var center = rect.center();
            return "m " + printPoints([new g.Point(rect.topLeft().x, center.y)]) +
                   " l " + printPoints([new g.Point(rect.bottomRight().x, center.y)]);
        }
    });

    var TextPathNode = Node.extend({
        createElement: function() {
            this.element = createElementVML("textpath");

            this.attr("on", true);
            this.attr("fitpath", false);
            this.setStyle();
            this.setString();
        },

        optionsChange: function(e) {
            if (e.field === "content") {
                this.setString();
            } else {
                this.setStyle();
            }

            Node.fn.optionsChange.call(this, e);
        },

        mapStyle: function() {
            return [["font", this.srcElement.options.font]];
        },

        setString: function() {
            this.attr("string", this.srcElement.content());
        }
    });

    var TextNode = PathNode.extend({
        init: function(srcElement, transform, opacity) {
            this.path = new TextPathNode(srcElement);

            PathNode.fn.init.call(this, srcElement, transform, opacity);
        },

        createDataNode: function(srcElement) {
            return new TextPathDataNode(srcElement);
        },

        attachTo: function(domElement, pos) {
            this.path.attachTo(this.element);
            PathNode.fn.attachTo.call(this, domElement, pos);
        },

        optionsChange: function(e) {
            if(e.field === "font" || e.field === "content") {
                this.path.optionsChange(e);
                this.pathData.geometryChange(e);
            }

            PathNode.fn.optionsChange.call(this, e);
        }
    });

    var ImagePathDataNode = PathDataNode.extend({
        renderData: function() {
            var rect = this.srcElement.rect();
            var path = new d.Path().moveTo(rect.topLeft())
                                   .lineTo(rect.topRight())
                                   .lineTo(rect.bottomRight())
                                   .lineTo(rect.bottomLeft())
                                   .close();

            return printPath(path);
        }
    });

    var ImageFillNode = TransformNode.extend({
        init: function(srcElement, transform, opacity) {
            this.opacity = opacity;
            TransformNode.fn.init.call(this, srcElement, transform);
        },

        createElement: function() {
            this.element = createElementVML("fill");

            this.attr("type", "frame");
            this.attr("rotate", true);
            this.setOpacity();
            this.setSrc();
            this.setTransform();
        },

        optionsChange: function(e) {
            if (e.field === "src") {
                this.setSrc();
            }

            TransformNode.fn.optionsChange.call(this, e);
        },

        geometryChange: function() {
            this.refresh();
        },

        refreshOpacity: function(opacity) {
            this.opacity = opacity;
            this.setOpacity();
        },

        setOpacity: function() {
            var attrs = [];
            this.mapOpacityTo(attrs, this.srcElement.options.opacity);
            this.allAttr(attrs);
        },

        setSrc: function() {
            this.attr("src", this.srcElement.src());
        },

        mapTransform: function() {
            var img = this.srcElement;
            var rawbbox = img.rawBBox();
            var rawcenter = rawbbox.center();

            var fillOrigin = COORDINATE_MULTIPLE / 2;
            var fillSize = COORDINATE_MULTIPLE;

            var x;
            var y;
            var width = rawbbox.width() / fillSize;
            var height = rawbbox.height() / fillSize;
            var angle = 0;

            var transform = this.transform;
            if (transform) {
                var matrix = toMatrix(transform);
                var sx = sqrt(matrix.a * matrix.a + matrix.b * matrix.b);
                var sy = sqrt(matrix.c * matrix.c + matrix.d * matrix.d);

                width *= sx;
                height *= sy;

                var ax = deg(atan2(matrix.b, matrix.d));
                var ay = deg(atan2(-matrix.c, matrix.a));
                angle = (ax + ay) / 2;

                if (angle !== 0) {
                    var center = img.bbox().center();
                    x = (center.x - fillOrigin) / fillSize;
                    y = (center.y - fillOrigin) / fillSize;
                } else {
                    x = (rawcenter.x * sx + matrix.e - fillOrigin) / fillSize;
                    y = (rawcenter.y * sy + matrix.f - fillOrigin) / fillSize;
                }
            } else {
                x = (rawcenter.x - fillOrigin) / fillSize;
                y = (rawcenter.y - fillOrigin) / fillSize;
            }

            width = round(width, TRANSFORM_PRECISION);
            height = round(height, TRANSFORM_PRECISION);
            x = round(x, TRANSFORM_PRECISION);
            y = round(y, TRANSFORM_PRECISION);
            angle = round(angle, TRANSFORM_PRECISION);

            return [
                ["size", width + "," + height],
                ["position", x + "," + y],
                ["angle", angle]
            ];
        }
    });

    var ImageNode = PathNode.extend({
        createFillNode: function(srcElement, transform, opacity) {
            return new ImageFillNode(srcElement, transform, opacity);
        },

        createDataNode: function(srcElement) {
            return new ImagePathDataNode(srcElement);
        },

        optionsChange: function(e) {
            if (e.field === "src" || e.field === "transform") {
                this.fill.optionsChange(e);
            }

            PathNode.fn.optionsChange.call(this, e);
        },

        geometryChange: function() {
            this.fill.geometryChange();
            PathNode.fn.geometryChange.call(this);
        },

        refreshTransform: function(transform) {
            PathNode.fn.refreshTransform.call(this, transform);
            this.fill.refresh(this.srcElement.currentTransform(transform));
        }
    });

    var nodeMap = {
        Group: GroupNode,
        Text: TextNode,
        Path: PathNode,
        MultiPath: MultiPathNode,
        Circle: CircleNode,
        Arc: ArcNode,
        Image: ImageNode
    };

    // Helper functions =======================================================
    function enableVML() {
        if (doc.namespaces && !doc.namespaces.kvml) {
            doc.namespaces.add("kvml", "urn:schemas-microsoft-com:vml");

            var stylesheet = doc.styleSheets.length > 30 ? doc.styleSheets[0] : doc.createStyleSheet();
            stylesheet.addRule(".kvml", "behavior:url(#default#VML)");
        }
    }

    function createElementVML(type) {
        var element = doc.createElement("kvml:" + type);
        element.className = "kvml";

        return element;
    }

    function printPoints(points) {
        var length = points.length;
        var result = [];

        for (var i = 0; i < length; i++) {
            result.push(points[i]
                .scaleCopy(COORDINATE_MULTIPLE)
                .toString(0, ",")
           );
        }

        return result.join(" ");
    }

    function printPath(path, open) {
        var segments = path.segments,
            length = segments.length;

        if (length > 0) {
            var parts = [],
                output,
                type,
                currentType,
                i;

            for (i = 1; i < length; i++) {
                type = segmentType(segments[i - 1], segments[i]);
                if (type !== currentType) {
                    currentType = type;
                    parts.push(type);
                }

                if (type === "l") {
                    parts.push(printPoints([segments[i].anchor()]));
                } else {
                    parts.push(printPoints([
                        segments[i - 1].controlOut(),
                        segments[i].controlIn(),
                        segments[i].anchor()
                    ]));
                }
            }

            output = "m " + printPoints([segments[0].anchor()]) + " " + parts.join(" ");
            if (path.options.closed) {
                output += " x";
            }

            if (open !== true) {
                output += " e";
            }

            return output;
        }
    }

    function segmentType(segmentStart, segmentEnd) {
        return segmentStart.controlOut() && segmentEnd.controlIn() ? "c" : "l";
    }

    function fillField(field) {
        return field.indexOf("fill") === 0 || field.indexOf(GRADIENT) === 0;
    }

    function stopColor(baseColor, stop) {
        var color;
        if (baseColor) {
            color = blendColors(baseColor, stop.color(), stop.opacity());
        } else {
            color = blendColors(stop.color(), "#fff", 1 - stop.opacity());
        }
        return color;
    }

    function blendColors(base, overlay, alpha) {
        var baseColor = new Color(base),
            overlayColor = new Color(overlay),
            r = blendChannel(baseColor.r, overlayColor.r, alpha),
            g = blendChannel(baseColor.g, overlayColor.g, alpha),
            b = blendChannel(baseColor.b, overlayColor.b, alpha);

        return new Color(r, g, b).toHex();
    }

    function blendChannel(a, b, alpha) {
        return math.round(alpha * b + (1 - alpha) * a);
    }

    // Exports ================================================================
    kendo.support.vml = (function() {
        var browser = kendo.support.browser;
        return browser.msie && browser.version < 9;
    })();


    var EMPTY_CLIP = "inherit";
    if (kendo.support.browser.msie && kendo.support.browser.version < 8) {
        EMPTY_CLIP = "rect(auto auto auto auto)";
    }

    if (kendo.support.vml) {
        d.SurfaceFactory.current.register("vml", Surface, 30);
    }

    deepExtend(d, {
        vml: {
            ArcDataNode: ArcDataNode,
            ArcNode: ArcNode,
            CircleTransformNode: CircleTransformNode,
            CircleNode: CircleNode,
            FillNode: FillNode,
            GroupNode: GroupNode,
            ImageNode: ImageNode,
            ImageFillNode: ImageFillNode,
            ImagePathDataNode: ImagePathDataNode,
            MultiPathDataNode: MultiPathDataNode,
            MultiPathNode: MultiPathNode,
            Node: Node,
            PathDataNode: PathDataNode,
            PathNode: PathNode,
            RootNode: RootNode,
            StrokeNode: StrokeNode,
            Surface: Surface,
            TextNode: TextNode,
            TextPathNode: TextPathNode,
            TextPathDataNode: TextPathDataNode,
            TransformNode: TransformNode
        }
    });

})(window.kendo.jQuery);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
