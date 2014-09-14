(function(f, define){
    define([ "./shapes" ], f);
})(function(){

(function ($) {

    // Imports ================================================================
    var doc = document,
        atan2 = Math.atan2,
        sqrt = Math.sqrt,

        kendo = window.kendo,
        deepExtend = kendo.deepExtend,
        noop = $.noop,

        dataviz = kendo.dataviz,

        d = dataviz.drawing,
        BaseNode = d.BaseNode,

        g = dataviz.geometry,
        toMatrix = g.toMatrix,

        util = dataviz.util,
        isTransparent = util.isTransparent,
        defined = util.defined,
        deg = util.deg,
        renderTemplate = util.renderTemplate,
        round = util.round;

    // Constants ==============================================================
    var NONE = "none",
        COORDINATE_MULTIPLE = 100,
        COORDINATE_SIZE = COORDINATE_MULTIPLE * COORDINATE_MULTIPLE,
        TRANSFORM_PRECISION = 4;

    // VML rendering surface ==================================================
    var Surface = d.Surface.extend({
        init: function(element, options) {
            d.Surface.fn.init.call(this, element, options);

            enableVML();

            this._root = new RootNode();
            this._root.attachTo(this.element[0]);

            this.element.on("click", this._click);
            this.element.on("mouseover", this._mouseenter);
            this.element.on("mouseout", this._mouseleave);
        },

        type: "vml",

        draw: function(element) {
            this._root.load([element], null);
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

        createElement: function() {
            this.element = doc.createElement("div");
        },

        attachReference: function() {
            this.element._kendoNode = this;
        },

        load: function(elements, transform) {
            var node = this,
                element = node.element,
                childNode,
                srcElement,
                children,
                combinedTransform,
                i;

            for (i = 0; i < elements.length; i++) {
                srcElement = elements[i];
                children = srcElement.children;
                combinedTransform = srcElement.currentTransform(transform);

                if (srcElement instanceof d.Group) {
                    childNode = new GroupNode(srcElement);
                } else if (srcElement instanceof d.Text) {
                    childNode = new TextNode(srcElement, combinedTransform);
                } else if (srcElement instanceof d.Path) {
                    childNode = new PathNode(srcElement, combinedTransform);
                } else if (srcElement instanceof d.MultiPath) {
                    childNode = new MultiPathNode(srcElement, combinedTransform);
                } else if (srcElement instanceof d.Circle) {
                    childNode = new CircleNode(srcElement, combinedTransform);
                } else if (srcElement instanceof d.Arc) {
                    childNode = new ArcNode(srcElement, combinedTransform);
                } else if (srcElement instanceof d.Image) {
                    childNode = new ImageNode(srcElement, combinedTransform);
                }

                if (children && children.length > 0) {
                    childNode.load(children, combinedTransform);
                }

                node.append(childNode);
                childNode.attachTo(element);
            }
        },

        attachTo: function(domElement) {
            domElement.appendChild(this.element);
        },

        clear: function() {
            BaseNode.fn.clear.call(this);

            if (this.element && this.element.parentNode) {
                this.element.parentNode.removeChild(this.element);
                this.element = null;
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

        clear: function() {
            BaseNode.fn.clear.call(this);
            this.element.innerHTML = "";
        },

        attachReference: noop
    });

    var SourceObserverNode = Node.extend({
        init: function(srcElement) {
            Node.fn.init.call(this, srcElement);
            if (srcElement) {
                srcElement.addObserver(this);
            }
        },

        clear: function() {
            var srcElement = this.srcElement;
            if (srcElement) {
                srcElement.removeObserver(this);
            }

            Node.fn.clear.call(this);
        }
    });

    var GroupNode = Node.extend({
        createElement: function() {
            Node.fn.createElement.call(this);
            this.setStyle();
        },

        attachTo: function(domElement) {
            this.css("display", NONE);

            Node.fn.attachTo.call(this, domElement);

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
            var style = Node.fn.mapStyle.call(this);
            style.push(["position", "absolute"]);
            style.push(["white-space", "nowrap"]);

            return style;
        },

        optionsChange: function(e) {
            if (e.field === "transform") {
                this.refreshTransform();
            }

            Node.fn.optionsChange.call(this, e);
        },

        refreshTransform: function(transform) {
            var currentTransform = this.srcElement.currentTransform(transform),
                children = this.childNodes,
                length = children.length,
                i;

            for (i = 0; i < length; i++) {
                children[i].refreshTransform(currentTransform);
            }
        }
    });

    var StrokeNode = Node.extend({
        createElement: function() {
            this.element = createElementVML("stroke");
            this.setStroke();
        },

        optionsChange: function(e) {
            if (e.field.indexOf("stroke") === 0) {
                this.setStroke();
            }
        },

        setStroke: function() {
            this.allAttr(this.mapStroke());
        },

        mapStroke: function() {
            var stroke = this.srcElement.options.stroke;
            var attrs = [];

            if (stroke && stroke.width !== 0) {
                attrs.push(["on", "true"]);
                attrs.push(["color", stroke.color]);
                attrs.push(["weight", (stroke.width || 1) + "px"]);

                if (defined(stroke.opacity)) {
                    attrs.push(["opacity", stroke.opacity]);
                }

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
        createElement: function() {
            this.element = createElementVML("fill");
            this.setFill();
        },

        optionsChange: function(e) {
            if (e.field.indexOf("fill") === 0) {
                this.setFill();
            }
        },

        setFill: function() {
            this.allAttr(this.mapFill());
        },

        mapFill: function() {
            var fill = this.srcElement.options.fill;
            var attrs = [];

            if (fill && !isTransparent(fill.color)) {
                attrs.push(["on", "true"]);
                attrs.push(["color", fill.color]);

                if (defined(fill.opacity)) {
                    attrs.push(["opacity", fill.opacity]);
                }
            } else {
                attrs.push(["on", "false"]);
            }

            return attrs;
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

    var ShapeNode = SourceObserverNode.extend({
        init: function(srcElement, transform) {
            this.fill = this.createFillNode(srcElement, transform);
            this.stroke = new StrokeNode(srcElement);
            this.transform = this.createTransformNode(srcElement, transform);

            SourceObserverNode.fn.init.call(this, srcElement);
        },

        attachTo: function(domElement) {
            this.fill.attachTo(this.element);
            this.stroke.attachTo(this.element);
            this.transform.attachTo(this.element);

            Node.fn.attachTo.call(this, domElement);
        },

        createFillNode: function(srcElement) {
            return new FillNode(srcElement);
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
            if (e.field.indexOf("fill") === 0) {
                this.fill.optionsChange(e);
            } else if (e.field.indexOf("stroke") === 0) {
                this.stroke.optionsChange(e);
            } else if (e.field === "transform") {
                this.transform.optionsChange(e);
            }

            Node.fn.optionsChange.call(this, e);
        },

        refreshTransform: function(transform) {
            this.transform.refresh(this.srcElement.currentTransform(transform));
        },

        mapStyle: function(width, height) {
            var styles = Node.fn.mapStyle.call(this);

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
        init: function(srcElement, transform) {
            this.pathData = this.createDataNode(srcElement);

            ShapeNode.fn.init.call(this, srcElement, transform);
        },

        attachTo: function(domElement) {
            this.pathData.attachTo(this.element);
            ShapeNode.fn.attachTo.call(this, domElement);
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
                originX = -center.x / boundingBox.width(),
                originY = -center.y / boundingBox.height();

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
            var diameter = radius * 2;

            var styles = ShapeNode.fn.mapStyle.call(this, diameter, diameter);
            styles.push(
                ["left", center.x - radius + "px"],
                ["top", center.y - radius + "px"]
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
        init: function(srcElement, transform) {
            this.path = new TextPathNode(srcElement);

            PathNode.fn.init.call(this, srcElement, transform);
        },

        createDataNode: function(srcElement) {
            return new TextPathDataNode(srcElement);
        },

        attachTo: function(domElement) {
            this.path.attachTo(this.element);
            PathNode.fn.attachTo.call(this, domElement);
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
        createElement: function() {
            this.element = createElementVML("fill");

            this.attr("type", "frame");
            this.attr("rotate", true);
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
        createFillNode: function(srcElement, transform) {
            return new ImageFillNode(srcElement, transform);
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

    // Exports ================================================================
    kendo.support.vml = (function() {
        var browser = kendo.support.browser;
        return browser.msie && browser.version < 9;
    })();

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
