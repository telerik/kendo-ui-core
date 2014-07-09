(function(f, define){
    define([ "./shapes" ], f);
})(function(){

(function ($) {

    // Imports ================================================================
    var doc = document,
        max = Math.max,

        kendo = window.kendo,
        deepExtend = kendo.deepExtend,

        dataviz = kendo.dataviz,
        defined = dataviz.defined,
        renderTemplate = dataviz.renderTemplate,

        d = dataviz.drawing,
        BaseNode = d.BaseNode,

        g = dataviz.geometry,
        Matrix = g.Matrix,
        toMatrix = g.toMatrix,

        util = dataviz.util,
        renderAttr = util.renderAttr,
        renderAllAttr = util.renderAllAttr,
        round = util.round;

    // Constants ==============================================================
    var NONE = "none",
        TRANSPARENT = "transparent",
        COORDINATE_MULTIPLE = 100,
        TRANSFORM_PRECISION = 4;

    // VML rendering surface ==================================================
    var Surface = d.Surface.extend({
        init: function(element, options) {
            d.Surface.fn.init.call(this, element, options);

            if (doc.namespaces) {
                doc.namespaces.add("kvml", "urn:schemas-microsoft-com:vml", "#default#VML");
            }

            this._root = new RootNode();
            this.element[0].innerHTML = this._template(this);

            this._rootElement = this.element[0].firstChild;
            this._clip(kendo.dimensions(this.element));
            this._root.attachTo(this._rootElement);

            this.element.on("click", this._click);
            this.element.on("mouseover", this._mouseenter);
            this.element.on("mouseout", this._mouseleave);
        },

        draw: function(element) {
            var surface = this;
            surface._root.load([element], null);

            if (kendo.support.browser.version < 8) {
                setTimeout(function() {
                    surface.element.style.display = "block";
                }, 0);
            }
        },

        clear: function() {
            this._root.clear();

            if (kendo.support.browser.version < 8) {
                this._rootElement.style.display = "none";
            }
        },

        _clip: function(size) {
            var rect = kendo.format("rect(0, {0}px, {1}px, 0)", size.width, size.height);
            $(this._rootElement).css("clip", rect);
        },

        _resize: function() {
            this._clip(this._size);
        },

        _template: renderTemplate(
            "<div style='position: absolute;'><#= d._root.render() #/div>"
        )
    });

    // VML Node ================================================================
    var Node = BaseNode.extend({
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

                if (element) {
                    childNode.attachTo(element);
                }
            }
        },

        attachTo: function(domElement) {
            var container = doc.createElement("div");

            container.style.display = "none";
            doc.body.appendChild(container);
            container.innerHTML = this.render();

            var element = container.firstChild;
            if (element) {
                domElement.appendChild(element);
                this.setElement(element);
            }

            doc.body.removeChild(container);
        },

        setElement: function(element) {
            var nodes = this.childNodes,
                childElement,
                i;

            if (this.element) {
                this.element._kendoNode = null;
            }

            this.element = element;
            element._kendoNode = this;

            for (i = 0; i < nodes.length; i++) {
                childElement = element.childNodes[i];
                nodes[i].setElement(childElement);
            }
        },

        template: renderTemplate(
            "#= d.renderChildren() #"
        ),

        render: function() {
            return this.template(this);
        },

        renderChildren: function() {
            var nodes = this.childNodes,
                output = "",
                i;

            for (i = 0; i < nodes.length; i++) {
                output += nodes[i].render();
            }

            return output;
        },

        clear: function() {
            var element = this.element;

            if (element) {
                element.parentNode.removeChild(element);
                this.element = null;
            }

            BaseNode.fn.clear.call(this);
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
        },

        renderStyle: function() {
            return renderAttr("style", util.renderStyle(this.mapStyle()));
        }
    });

    var RootNode = Node.extend({
        attachTo: function(domElement) {
            this.element = domElement;
        },

        clear: BaseNode.fn.clear
    });

    var GroupNode = Node.extend({
        template: renderTemplate(
            "<div#= d.renderStyle() #>#= d.renderChildren() #</div>"
        ),

        mapStyle: function() {
            var style = [];
            if (this.srcElement && this.srcElement.options.visible === false) {
                style.push([
                    "display", "none"
                ]);
            }

            return style;
        },

        optionsChange: function(e) {
            if (e.field === "transform") {
                this.refreshTransform();
            } else if (e.field == "visible"){
                this.css("display", e.value !== false ? "" : "none");
            }

            this.invalidate();
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
        optionsChange: function(e) {
            if (e.field === "stroke") {
                this.allAttr(this.mapStroke(e.value));
            } else {
                var name = this.attributeMap[e.field];
                if (name) {
                    this.attr(name, e.value);
                }
            }

            this.invalidate();
        },

        attributeMap: {
            "stroke.color": "color",
            "stroke.width": "weight",
            "stroke.opacity": "opacity",
            "stroke.dashType": "dashstyle"
        },

        mapStroke: function(stroke) {
            var attrs = [];

            if (stroke) {
                attrs.push(["on", "true"]);
                attrs.push(["color", stroke.color]);
                attrs.push(["weight", stroke.width + "px"]);

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
        },

        renderStroke: function() {
            return renderAllAttr(
                this.mapStroke(this.srcElement.options.stroke)
            );
        },

        template: renderTemplate(
            "<kvml:stroke #= d.renderStroke() #></kvml:stroke>"
        )
    });

    var FillNode = Node.extend({
        optionsChange: function(e) {
            switch(e.field) {
                case "fill":
                    this.allAttr(this.mapFill(e.value));
                    break;

                case "fill.color":
                    this.allAttr(this.mapFill({ color: e.value }));
                    break;

                default:
                    var name = this.attributeMap[e.field];
                    if (name) {
                        this.attr(name, e.value);
                    }
                    break;
            }

            this.invalidate();
        },

        attributeMap: {
            "fill.opacity": "opacity"
        },

        mapFill: function(fill) {
            var attrs = [];

            if (fill && fill.color !== TRANSPARENT) {
                attrs.push(["on", "true"]);
                attrs.push(["color", fill.color]);

                if (defined(fill.opacity)) {
                    attrs.push(["opacity", fill.opacity]);
                }
            } else {
                attrs.push(["on", "false"]);
            }

            return attrs;
        },

        renderFill: function() {
            return renderAllAttr(
                this.mapFill(this.srcElement.options.fill)
            );
        },

        template: renderTemplate(
            "<kvml:fill #= d.renderFill() #></kvml:fill>"
        )
    });

    var TransformNode = Node.extend({
        init: function(srcElement, transform) {
            Node.fn.init.call(this, srcElement);
            this.transform = transform;
        },

        optionsChange: function(e) {
            if (e.field == "transform") {
                this.refresh(this.srcElement.currentTransform());
            }
            this.invalidate();
        },

        refresh: function(transform) {
            this.transform = transform;
            this.allAttr(this.mapTransform(transform));
        },

        transformOrigin: function() {
            return "-0.5,-0.5";
        },

        mapTransform: function(transform) {
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
        },

        renderTranform: function() {
            return renderAllAttr(this.mapTransform(this.transform));
        },

        template: renderTemplate(
            "<kvml:skew #=d.renderTranform()# ></kvml:skew>"
        )
    });

    var ShapeNode = Node.extend({
        init: function(srcElement, transform) {
            this.fill = new FillNode(srcElement);
            this.stroke = new StrokeNode(srcElement);
            this.transform = this.createTransformNode(srcElement, transform);

            Node.fn.init.call(this, srcElement);

            this.append(this.fill);
            this.append(this.stroke);
            this.append(this.transform);
        },

        createTransformNode: function(srcElement, transform) {
            return new TransformNode(srcElement, transform);
        },

        optionsChange: function(e) {
            if (e.field === "visible") {
                this.css("display", e.value ? "" : "none");
            } else if (e.field.indexOf("fill") === 0) {
                this.fill.optionsChange(e);
            } else if (e.field.indexOf("stroke") === 0) {
                this.stroke.optionsChange(e);
            } else if (e.field === "transform") {
                this.transform.optionsChange(e);
            }

            this.invalidate();
        },

        refreshTransform: function(transform) {
            this.transform.refresh(this.srcElement.currentTransform(transform));
        },

        mapFill: function(fill) {
            var attrs = [];

            if (fill && fill.color !== TRANSPARENT) {
                attrs.push(["fill", fill.color]);

                if (defined(fill.opacity)) {
                    attrs.push(["fill-opacity", fill.opacity]);
                }
            } else {
                attrs.push(["fill", NONE]);
            }

            return attrs;
        },

        mapStyle: function() {
            var style = [
                ["position", "absolute"],
                ["width", COORDINATE_MULTIPLE + "px"],
                ["height", COORDINATE_MULTIPLE + "px"],
                ["cursor", this.srcElement.options.cursor]
            ];

            if (this.srcElement.options.visible === false) {
                style.push(["display", "none"]);
            }

            return style;
        },

        renderCursor: function() {
            var cursor = this.srcElement.options.cursor;

            if (cursor) {
                return "cursor:" + cursor + ";";
            }

            return "";
        },

        renderVisibility: function() {
            if (this.srcElement.options.visible === false) {
                return "display:none;";
            }

            return "";
        },

        renderCoordsize: function() {
            var scale = COORDINATE_MULTIPLE * COORDINATE_MULTIPLE;
            return "coordsize='" + scale + " " + scale + "'";
        },

        template: renderTemplate(
            "<kvml:shape " +
            "#= d.renderStyle() # " +
            "coordorigin='0 0' #= d.renderCoordsize() #>" +
                "#= d.renderChildren() #" +
            "</kvml:shape>"
        )
    });

    var PathDataNode = Node.extend({
        renderData: function() {
            return printPath(this.srcElement);
        },

        geometryChange: function() {
            this.attr("v", this.renderData());
            Node.fn.geometryChange.call(this);
        },

        template: renderTemplate(
            "<kvml:path #= kendo.dataviz.util.renderAttr('v', d.renderData()) #></kvml:path>"
        )
    });

    var PathNode = ShapeNode.extend({
        init: function(srcElement, transform) {
            this.pathData = this.createDataNode(srcElement);

            ShapeNode.fn.init.call(this, srcElement, transform);

            this.append(this.pathData);
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
        createTransformNode: function(srcElement, transform) {
            return new CircleTransformNode(srcElement, transform);
        },

        geometryChange: function() {
            var radius = this.radius();
            var center = this.center();
            var diameter = radius * 2;

            this.css("left", center.x - radius + "px");
            this.css("top", center.y - radius + "px");
            this.css("width", diameter + "px");
            this.css("height", diameter + "px");
            this.invalidate();
        },

        center: function() {
            return this.srcElement.geometry().center;
        },

        radius: function() {
            return this.srcElement.geometry().radius;
        },

        template: renderTemplate(
            "<kvml:oval " +
            "style='position:absolute;" +
            "#= d.renderVisibility() #" +
            "#= d.renderCursor() #" +
            "width:#= d.radius() * 2 #px;height:#= d.radius() * 2 #px;" +
            "top:#= d.center().y - d.radius() #px;" +
            "left:#= d.center().x - d.radius() #px;'>" +
                "#= d.renderChildren() #" +
            "</kvml:oval>"
        )
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

    var TextPathDataNode = Node.extend({
        geometryChange: function() {
            this.attr("v", this.renderData());
        },

        renderData: function() {
            var rect = this.srcElement.rect();
            var center = rect.center();
            return "m " + printPoints([new g.Point(rect.topLeft().x, center.y)]) +
                   " l " + printPoints([new g.Point(rect.bottomRight().x, center.y)]);
        },

        template: renderTemplate(
            "<kvml:path textpathok='true' v='#= d.renderData() #' />"
        )
    });

    var TextPathNode = Node.extend({
        optionsChange: function(e) {
            if (e.field === "font") {
                this.allCss(this.mapStyle());
                this.geometryChange();
            } if (e.field === "content") {
                this.attr("string", this.srcElement.content());
            }

            Node.fn.optionsChange.call(this, e);
        },

        mapStyle: function() {
            return [["font", this.srcElement.options.font]];
        },

        renderStyle: function() {
            return renderAttr("style", util.renderStyle(this.mapStyle()));
        },

        template: renderTemplate(
            "<kvml:textpath on='true' #= d.renderStyle() # " +
            "fitpath='false' string='#= d.srcElement.content() #' />"
        )
    });

    var TextNode = PathNode.extend({
        init: function(srcElement, transform) {
            this.path = new TextPathNode(srcElement);

            PathNode.fn.init.call(this, srcElement, transform);

            this.append(this.path);
        },

        createDataNode: function(srcElement) {
            return new TextPathDataNode(srcElement);
        },

        optionsChange: function(e) {
            if(e.field === "font" || e.field === "content") {
                this.path.optionsChange(e);
                this.pathData.geometryChange(e);
            }

            PathNode.fn.optionsChange.call(this, e);
        }
    });

    var ImageNode = Node.extend({
        init: function(srcElement, transform) {
            Node.fn.init.call(this, srcElement);
            this.transform = transform;
        },

        geometryChange: function() {
            this.allCss(this.mapStyle());
            this.invalidate();
        },

        optionsChange: function(e) {
            if (e.field === "src") {
                this.attr("src", this.srcElement.src());
            } else if (e.field === "visible") {
                this.css("display", e.value ? "" : "none");
            } else if (e.field === "transform") {
                this.refreshTransform(this.srcElement.currentTransform());
            }

            Node.fn.optionsChange.call(this, e);
        },

        mapStyle: function() {
            var image = this.srcElement;
            var rect = image.rect();

            var pos = rect.topLeft();
            var style = [
                ["position", "absolute"],
                ["top", "0px"],
                ["left", "0px"],
                ["padding-left", pos.x + "px"],
                ["padding-top", pos.y + "px"],
                ["width", rect.width() + "px"],
                ["height", rect.height() + "px"],
                ["cursor", image.options.cursor]
            ];

            if (image.options.visible === false) {
                style.push(["display", "none"]);
            }

            if (this.transform) {
                util.append(style, this.mapTransform(this.transform));
            }

            return style;
        },

        renderStyle: function() {
            return renderAttr("style", util.renderStyle(this.mapStyle()));
        },

        refreshTransform: function(transform) {
            var currentTransform = this.srcElement.currentTransform(transform);
            this.allCss(this.mapTransform(currentTransform));

            if (this.element) {
                this.element.style.cssText = this.element.style.cssText;
            }
        },

        mapTransform: function(transform) {
            var style = [];
            var matrix = toMatrix(transform);
            if (matrix) {
                matrix.round(TRANSFORM_PRECISION);
                style.push(["filter", this.transformTemplate(matrix)]);

                var bboxEdge = this.srcElement.bbox().bottomRight();
                var edge = this.srcElement.rect().bottomRight();
                style.push(["padding-right", max(bboxEdge.x - edge.x, 0) + "px"],
                           ["padding-bottom", max(bboxEdge.y - edge.y, 0) + "px"]);
            }

            return style;
        },

        transformTemplate: renderTemplate(
            "progid:DXImageTransform.Microsoft.Matrix(" +
            "M11=${d.a}, M12=${d.c}, M21=${d.b}, M22=${d.d}, Dx=${d.e}, Dy=${d.f})"
        ),

        template: renderTemplate(
            "<img src='#= d.srcElement.src() #' " +
            "#= d.renderStyle() # />"
        )
    });

    // Helper functions =======================================================
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
    var browser = kendo.support.browser;
    if (browser.msie && browser.version < 9) {
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
