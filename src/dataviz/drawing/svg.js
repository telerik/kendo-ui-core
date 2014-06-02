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

        g = dataviz.geometry,

        d = dataviz.drawing,
        BaseNode = d.BaseNode,

        util = dataviz.util,
        renderAttr = util.renderAttr,
        renderAllAttr = util.renderAllAttr,
        renderSize = util.renderSize;

    // Constants ==============================================================
    var BUTT = "butt",
        DASH_ARRAYS = dataviz.DASH_ARRAYS,
        NONE = "none",
        SOLID = "solid",
        SPACE = " ",
        SQUARE = "square",
        SVG_NS = "http://www.w3.org/2000/svg",
        TRANSFORM = "transform",
        TRANSPARENT = "transparent",
        UNDEFINED = "undefined";

    // SVG rendering surface ==================================================
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

        translate: function(offset) {
            var viewBox = kendo.format(
                "{0} {1} {2} {3}",
                offset.x, offset.y,
                this._size.width, this._size.height);

            this._offset = offset;
            this.element.setAttribute("viewBox", viewBox);
        },

        draw: function(element) {
            this._root.load([element]);
        },

        clear: function() {
            this._root.clear();
        },

        svg: function() {
            return this._template(this);
        },

        setSize: function(size) {
            this.element.setAttribute("width", renderSize(size.width));
            this.element.setAttribute("height", renderSize(size.height));
            this.resize();
        },

        _resize: function() {
            if (this._offset) {
                this.translate(this._offset);
            }
        },

        _template: renderTemplate(
            // TODO: Append XML prefix only during export
            "<?xml version='1.0' ?>" +
            "<svg xmlns='" + SVG_NS + "' version='1.1' " +
            "width='#= kendo.dataviz.util.renderSize(d.options.width) #' " +
            "height='#= kendo.dataviz.util.renderSize(d.options.height) #' " +
            "style='position: absolute;'>#= d._root.render() #</svg>"
        ),

        _appendTo: function(container) {
            renderSVG(container, this._template(this));
            this.element = container.firstElementChild;
            alignToScreen(this.element);

            this._root.attachTo(this.element);

            var element = $(this.element);

            element.on("click", this._click);
            element.on("mouseover", this._mouseenter);
            element.on("mouseout", this._mouseleave);

            this.resize();
        }
    });

    // SVG Node ================================================================
    var Node = BaseNode.extend({
        load: function(elements) {
            var node = this,
                element = node.element,
                childNode,
                srcElement,
                children,
                i;

            for (i = 0; i < elements.length; i++) {
                srcElement = elements[i];
                children = srcElement.children;

                if (srcElement instanceof d.Text) {
                    childNode = new TextNode(srcElement);
                } else if (srcElement instanceof d.Group) {
                    childNode = new GroupNode(srcElement);
                } else if (srcElement instanceof d.Path) {
                    childNode = new PathNode(srcElement);
                } else if (srcElement instanceof d.MultiPath) {
                    childNode = new MultiPathNode(srcElement);
                } else if (srcElement instanceof d.Circle) {
                    childNode = new CircleNode(srcElement);
                } else if (srcElement instanceof d.Arc) {
                    childNode = new ArcNode(srcElement);
                } else if (srcElement instanceof d.Image) {
                    childNode = new ImageNode(srcElement);
                }

                if (children && children.length > 0) {
                    childNode.load(children);
                }

                node.append(childNode);

                if (element) {
                    childNode.attachTo(element);
                }
            }
        },

        attachTo: function(domElement) {
            var container = doc.createElement("div");
            renderSVG(container,
                "<svg xmlns='" + SVG_NS + "' version='1.1'>" +
                this.render() +
                "</svg>"
            );

            var element = container.firstChild.firstChild;
            if (element) {
                domElement.appendChild(element);
                this.setElement(element);
            }
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

        optionsChange: function(e) {
            if (e.field === "visible") {
                this.css("display", e.value ? "" : "none");
            }

            BaseNode.fn.optionsChange.call(this, e);
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
                this.element.setAttribute(name, value);
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

        removeAttr: function(name) {
            if (this.element) {
                this.element.removeAttribute(name);
            }
        },

        mapTransform: function(transform) {
            var attrs = [];
            if (transform) {
                attrs.push([
                   TRANSFORM,
                   "matrix(" + transform.matrix().toString(6) + ")"
                ]);
            }

            return attrs;
        },

        renderTransform: function() {
            return renderAllAttr(
                this.mapTransform(this.srcElement.transform())
            );
        },

        transformChange: function(value) {
            if (value) {
                this.allAttr(this.mapTransform(value));
            } else {
                this.removeAttr(TRANSFORM);
            }
        },

        mapStyle: function() {
            var style = [["cursor", this.srcElement.options.cursor]];

            if (this.srcElement.options.visible === false) {
                style.push(["display", "none"]);
            }

            return style;
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
            "<g#= d.renderTransform() + d.renderStyle() #>#= d.renderChildren() #</g>"
        ),

        optionsChange: function(e) {
            if (e.field == TRANSFORM) {
                this.transformChange(e.value);
            }

            Node.fn.optionsChange.call(this, e);
        }
    });

    var PathNode = Node.extend({
        geometryChange: function() {
            this.attr("d", this.renderData());
            this.invalidate();
        },

        optionsChange: function(e) {
            switch(e.field) {
                case "fill":
                    this.allAttr(this.mapFill(e.value));
                    break;

                case "fill.color":
                    this.allAttr(this.mapFill({ color: e.value }));
                    break;

                case "stroke":
                    this.allAttr(this.mapStroke(e.value));
                    break;

                case TRANSFORM:
                    this.transformChange(e.value);
                    break;

                default:
                    var name = this.attributeMap[e.field];
                    if (name) {
                        this.attr(name, e.value);
                    }
                    break;
            }

            Node.fn.optionsChange.call(this, e);
        },

        attributeMap: {
            "fill.opacity": "fill-opacity",
            "stroke.color": "stroke",
            "stroke.width": "stroke-width",
            "stroke.opacity": "stroke-opacity"
        },

        content: function(value) {
            if (this.element) {
                this.element.textContent = this.srcElement.content();
            }
        },

        renderData: function() {
            return this.printPath(this.srcElement);
        },

        printPath: function(path) {
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

                    if (segmentType === "L") {
                        parts.push(this.printPoints(segments[i].anchor));
                    } else {
                        parts.push(this.printPoints(segments[i - 1].controlOut, segments[i].controlIn, segments[i].anchor));
                    }
                }

                output = "M" + this.printPoints(segments[0].anchor) + SPACE + parts.join(SPACE);
                if (path.options.closed) {
                    output += "Z";
                }

                return output;
            }
        },

        printPoints: function() {
            var points = arguments,
                length = points.length,
                i, result = [];

            for (i = 0; i < length; i++) {
                result.push(points[i].toString(3));
            }

            return result.join(SPACE);
        },

        segmentType: function(segmentStart, segmentEnd) {
            return segmentStart.controlOut && segmentEnd.controlIn ? "C" : "L";
        },

        mapStroke: function(stroke) {
            var attrs = [];

            if (stroke) {
                attrs.push(["stroke", stroke.color]);
                attrs.push(["stroke-width", stroke.width]);
                attrs.push(["stroke-linecap", this.renderLinecap(stroke)]);

                if (defined(stroke.opacity)) {
                    attrs.push(["stroke-opacity", stroke.opacity]);
                }

                if (defined(stroke.dashType)) {
                    attrs.push(["stroke-dasharray", this.renderDashType(stroke)]);
                }
            }

            return attrs;
        },

        renderStroke: function() {
            return renderAllAttr(
                this.mapStroke(this.srcElement.options.stroke)
            );
        },

        renderDashType: function (stroke) {
            var width = stroke.width || 1,
                dashType = stroke.dashType;

            if (dashType && dashType != SOLID) {
                var dashArray = DASH_ARRAYS[dashType.toLowerCase()],
                    result = [],
                    i;

                for (i = 0; i < dashArray.length; i++) {
                    result.push(dashArray[i] * width);
                }

                return result.join(" ");
            }
        },

        renderLinecap: function(stroke) {
            var dashType = stroke.dashType,
                lineCap = stroke.lineCap || SQUARE;

            return (dashType && dashType != SOLID) ? BUTT : lineCap;
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

        renderFill: function() {
            return renderAllAttr(
                this.mapFill(this.srcElement.options.fill)
            );
        },

        template: renderTemplate(
            "<path #= d.renderStyle() # " +
            "#= kendo.dataviz.util.renderAttr('d', d.renderData()) # " +
            "#= d.renderStroke() # " +
            "#= d.renderFill() # " +
            "#= d.renderTransform() #" +
            "stroke-linejoin='round'></path>"
        )
    });

    var ArcNode = PathNode.extend({
        renderData: function() {
            return this.printPath(this.srcElement.toPath());
        }
    });

    var MultiPathNode = PathNode .extend({
        renderData: function() {
            var paths = this.srcElement.paths;

            if (paths.length > 0) {
                var result = [],
                    i;

                for (i = 0; i < paths.length; i++) {
                    result.push(this.printPath(paths[i]));
                }

                return result.join(" ");
            }
        }
    });

    var CircleNode = PathNode.extend({
        geometryChange: function() {
            var geometry = this.srcElement.geometry;
            this.attr("cx", geometry.center.x);
            this.attr("cy", geometry.center.y);
            this.attr("r", geometry.radius);
            this.invalidate();
        },

        template: renderTemplate(
            "<circle #= d.renderStyle() # " +
            "cx='#= this.srcElement.geometry.center.x #' cy='#= this.srcElement.geometry.center.y #' " +
            "r='#= this.srcElement.geometry.radius #' " +
            "#= d.renderStroke() # " +
            "#= d.renderFill() # " +
            "#= d.renderTransform() # ></circle>"
        )
    });

    var TextNode = PathNode.extend({
        geometryChange: function() {
            var pos = this.pos();
            this.attr("x", pos.x);
            this.attr("y", pos.y);
            this.invalidate();
        },

        optionsChange: function(e) {
            if(e.field == "font") {
                this.attr("style", util.renderStyle(this.mapStyle()));
                this.geometryChange();
            }

            PathNode.fn.optionsChange.call(this, e);
        },

        contentChange: function() {
            this.content(this.srcElement.content());
            this.invalidate();
        },

        mapStyle: function() {
            var style = PathNode.fn.mapStyle.call(this);
            style.push(["font", this.srcElement.options.font]);

            return style;
        },

        pos: function() {
            var origin = this.srcElement.origin;
            var size = this.srcElement.measure();
            return origin.clone().set("y", origin.y + size.baseline);
        },

        template: renderTemplate(
            "<text #= d.renderStyle() # " +
            "x='#= this.pos().x #' y='#= this.pos().y #' " +
            "#= d.renderStroke() # " +
            "#=  d.renderTransform() # " +
            "#= d.renderFill() #><tspan>#= this.srcElement.content() #</tspan></text>"
        )
    });

    var ImageNode = PathNode.extend({
        geometryChange: function() {
            this.allAttr(this.mapPosition());
            this.invalidate();
        },

        contentChange: function() {
            this.allAttr(this.mapSource());
            this.invalidate();
        },

        mapPosition: function() {
            var rect = this.srcElement.rect();
            var tl = rect.topLeft();

            return [
                ["x", tl.x],
                ["y", tl.y],
                ["width", rect.width() + "px"],
                ["height", rect.height() + "px"]
            ];
        },

        renderPosition: function() {
            return renderAllAttr(this.mapPosition());
        },

        mapSource: function() {
            return [["xlink:href", this.srcElement.src()]];
        },

        renderSource: function() {
            return renderAllAttr(this.mapSource());
        },

        template: renderTemplate(
            "<image #= d.renderStyle() # #= d.renderTransform()# " +
            "#= d.renderPosition() # #= d.renderSource() #>" +
            "</image>"
        )
    });

    // Helpers ================================================================
    var renderSVG = function(container, svg) {
        container.innerHTML = svg;
    };

    (function() {
        var testFragment = "<svg xmlns='" + SVG_NS + "'></svg>",
            testContainer = doc.createElement("div"),
            hasParser = typeof DOMParser != UNDEFINED;

        testContainer.innerHTML = testFragment;

        if (hasParser && testContainer.firstChild.namespaceURI != SVG_NS) {
            renderSVG = function(container, svg) {
                var parser = new DOMParser(),
                    chartDoc = parser.parseFromString(svg, "text/xml"),
                    importedDoc = doc.adoptNode(chartDoc.documentElement);

                container.innerHTML = "";
                container.appendChild(importedDoc);
            };
        }
    })();

    function alignToScreen(element) {
        var ctm;

        try {
            ctm = element.getScreenCTM ? element.getScreenCTM() : null;
        } catch (e) { }

        if (ctm) {
            var left = - ctm.e % 1,
                top = - ctm.f % 1,
                style = element.style;

            if (left !== 0 || top !== 0) {
                style.left = left + "px";
                style.top = top + "px";
            }
        }
    }

    // Exports ================================================================
    if (kendo.support.svg) {
        d.SurfaceFactory.current.register("svg", Surface, 10);
    }

    deepExtend(d, {
        svg: {
            ArcNode: ArcNode,
            CircleNode: CircleNode,
            GroupNode: GroupNode,
            ImageNode: ImageNode,
            MultiPathNode: MultiPathNode,
            Node: Node,
            PathNode: PathNode,
            RootNode: RootNode,
            Surface: Surface,
            TextNode: TextNode
        }
    });

})(window.kendo.jQuery);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
