(function(f, define){
    define([ "./shapes" ], f);
})(function(){

(function ($) {

    // Imports ================================================================
    var doc = document,

        kendo = window.kendo,
        deepExtend = kendo.deepExtend,

        dataviz = kendo.dataviz,
        defined = dataviz.defined,
        renderTemplate = dataviz.renderTemplate,

        d = dataviz.drawing,
        BaseNode = d.BaseNode,

        g = dataviz.geometry,
        Matrix = g.Matrix,
        transformationMatrix = g.transformationMatrix,

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
        init: function(container, options) {
            d.Surface.fn.init.call(this);

            this.options = deepExtend({}, this.options, options);
            this.bind(this.events, this.options);

            this._root = new RootNode();
            this._click = this._handler("click");
            this._mouseenter = this._handler("mouseenter");
            this._mouseleave = this._handler("mouseleave");

            this._appendTo(container);
        },

        events: [
            "click",
            "mouseenter",
            "mouseleave"
        ],

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
                this.element.style.display = "none";
            }
        },

        _template: renderTemplate(
            "<div style='" +
                "width:#= kendo.dataviz.util.renderSize(d.options.width) #; " +
                "height:#= kendo.dataviz.util.renderSize(d.options.height) #; " +
                "position: absolute;'" +
            "><#= d._root.render() #/div>"
        ),

        _appendTo: function(container) {
            if (doc.namespaces) {
                doc.namespaces.add("kvml", "urn:schemas-microsoft-com:vml", "#default#VML");
            }

            container.innerHTML = this._template(this);
            this.element = container.firstChild;

            this._root.attachTo(this.element);

            var element = $(this.element);
            element.on("click", this._click);
            element.on("mouseover", this._mouseenter);
            element.on("mouseout", this._mouseleave);
        }
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
                    childNode = new TextNode(srcElement);
                } else if (srcElement instanceof d.Path) {
                    childNode = new PathNode(srcElement, combinedTransform);
                } else if (srcElement instanceof d.MultiPath) {
                    childNode = new MultiPathNode(srcElement, combinedTransform);
                } else if (srcElement instanceof d.Circle) {
                    childNode = new CircleNode(srcElement, combinedTransform);
                } else if (srcElement instanceof d.Arc) {
                    childNode = new ArcNode(srcElement, combinedTransform);
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
            "<div>#= d.renderChildren() #</div>"
        ),

        optionsChange: function(e) {
            if (e.field === "transform") {
                this.refreshTransform();
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
                matrix = transformationMatrix(transform);

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

    var PathNode = Node.extend({
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

        geometryChange: function() {
            this.attr("v", this.renderData());
            this.invalidate();
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

        renderData: function() {
            return this.printPath(this.srcElement);
        },

        printPath: function(path, open) {
            var segments = path.segments,
                length = segments.length;
            if (length > 0) {
                var parts = [],
                    output,
                    segmentType,
                    currentType,
                    i;

                for (i = 1; i < length; i++) {
                    segmentType = this.segmentType(segments[i - 1], segments[i]);
                    if (segmentType !== currentType) {
                        currentType = segmentType;
                        parts.push(segmentType);
                    }

                    if (segmentType === "l") {
                        parts.push(printPoints([segments[i].anchor]));
                    } else {
                        parts.push(printPoints([
                            segments[i - 1].controlOut,
                            segments[i].controlIn,
                            segments[i].anchor
                        ]));
                    }
                }

                output = "m " + printPoints([segments[0].anchor]) + " " + parts.join(" ");
                if (path.options.closed) {
                    output += " x";
                }

                if (open !== true) {
                    output += " e";
                }

                return output;
            }
        },

        segmentType: function(segmentStart, segmentEnd) {
            return segmentStart.controlOut && segmentEnd.controlIn ? "c" : "l";
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

        renderStyle: function() {
            return renderAttr("style", util.renderStyle(this.mapStyle()));
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
                "<kvml:path #= kendo.dataviz.util.renderAttr('v', d.renderData()) # />" +
            "</kvml:shape>"
        )
    });

    var MultiPathNode = PathNode.extend({
        renderData: function() {
            var paths = this.srcElement.paths;

            if (paths.length > 0) {
                var result = [],
                    i,
                    open;

                for (i = 0; i < paths.length; i++) {
                    open = i < paths.length - 1;
                    result.push(this.printPath(paths[i], open));
                }

                return result.join(" ");
            }
        }
    });

    var CircleTransformNode = TransformNode.extend({
        transformOrigin: function() {
            var boundingBox = this.srcElement.geometry.bbox(),
                center = boundingBox.center(),
                originX = -center.x / boundingBox.width(),
                originY = -center.y / boundingBox.height();
            return originX + "," + originY;
        }
    });

    var CircleNode = PathNode.extend({
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
            return this.srcElement.geometry.center;
        },

        radius: function() {
            return this.srcElement.geometry.radius;
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

    var ArcNode = PathNode.extend({
        renderData: function() {
            return this.printPath(this.srcElement.toPath());
        }
    });

    var TextPathDataNode = Node.extend({
        geometryChange: function() {
            this.attr("v", this.renderData());
        },

        renderData: function() {
            var bbox = this.srcElement.bbox();
            var center = bbox.center();
            return "m " + printPoints([new g.Point(bbox.p0.x, center.y)]) +
                   " l " + printPoints([new g.Point(bbox.p1.x, center.y)]);
        },

        template: renderTemplate(
            "<kvml:path textpathok='true' v='#= d.renderData() #' />"
        )
    });

    var TextPathNode = Node.extend({
        optionsChange: function(e) {
            if(e.field == "font") {
                this.allCss(this.mapStyle());
                this.geometryChange();
            }

            this.invalidate();
        },

        contentChange: function() {
            this.attr("string", this.srcElement.content());
            this.invalidate();
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
            this.pathData = new TextPathDataNode(srcElement);
            this.path = new TextPathNode(srcElement);

            PathNode.fn.init.call(this, srcElement, transform);

            this.append(this.pathData);
            this.append(this.path);
        },

        geometryChange: function() {
            this.pathData.geometryChange();
        },

        optionsChange: function(e) {
            if(e.field == "font") {
                this.path.optionsChange(e);
                this.pathData.geometryChange(e);
            }

            PathNode.fn.optionsChange.call(this, e);
        },

        contentChange: function() {
            this.path.contentChange();
        },

        template: renderTemplate(
            "<kvml:shape " +
            "#= d.renderStyle() # " +
            "stroked='false' coordorigin='0 0' #= d.renderCoordsize() #>" +
                "#= d.renderChildren() #" +
            "</kvml:shape>"
        )
    });

    // Helper functions =======================================================
    function printPoints(points) {
        var length = points.length;
        var result = [];

        for (var i = 0; i < length; i++) {
            result.push(points[i]
                .multiplyCopy(COORDINATE_MULTIPLE)
                .toString(0, ",")
           );
        }

        return result.join(" ");
    }

    // Exports ================================================================
    if (kendo.support.browser.msie) {
        d.SurfaceFactory.current.register("vml", Surface, 30);
    }

    deepExtend(d, {
        vml: {
            ArcNode: ArcNode,
            CircleTransformNode: CircleTransformNode,
            CircleNode: CircleNode,
            FillNode: FillNode,
            GroupNode: GroupNode,
            MultiPathNode: MultiPathNode,
            Node: Node,
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
