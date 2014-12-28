(function(f, define){
    define([ "./shapes", "../util/main" ], f);
})(function(){

(function ($) {

    // Imports ================================================================
    var doc = document,

        kendo = window.kendo,
        deepExtend = kendo.deepExtend,

        g = kendo.geometry,
        d = kendo.drawing,
        BaseNode = d.BaseNode,

        util = kendo.util,
        defined = util.defined,
        isTransparent = util.isTransparent,
        renderAttr = util.renderAttr,
        renderAllAttr = util.renderAllAttr,
        renderSize = util.renderSize,
        renderTemplate = util.renderTemplate,
        inArray = $.inArray;

    // Constants ==============================================================
    var BUTT = "butt",
        DASH_ARRAYS = d.DASH_ARRAYS,
        GRADIENT = "gradient",
        NONE = "none",
        NS = ".kendo",
        SOLID = "solid",
        SPACE = " ",
        SQUARE = "square",
        SVG_NS = "http://www.w3.org/2000/svg",
        TRANSFORM = "transform",
        UNDEFINED = "undefined";

    // SVG rendering surface ==================================================
    var Surface = d.Surface.extend({
        init: function(element, options) {
            d.Surface.fn.init.call(this, element, options);

            this._root = new RootNode(this.options);

            renderSVG(this.element[0], this._template(this));
            this._rootElement = this.element[0].firstElementChild;
            alignToScreen(this._rootElement);

            this._root.attachTo(this._rootElement);

            this.element.on("click" + NS, this._click);
            this.element.on("mouseover" + NS, this._mouseenter);
            this.element.on("mouseout" + NS, this._mouseleave);

            this.resize();
        },

        type: "svg",

        destroy: function() {
            if (this._root) {
                this._root.destroy();
                this._root = null;
                this._rootElement = null;
                this.element.off(NS);
            }
            d.Surface.fn.destroy.call(this);
        },

        translate: function(offset) {
            var viewBox = kendo.format(
                "{0} {1} {2} {3}",
                Math.round(offset.x), Math.round(offset.y),
                this._size.width, this._size.height);

            this._offset = offset;
            this._rootElement.setAttribute("viewBox", viewBox);
        },

        draw: function(element) {
            this._root.load([element]);
        },

        clear: function() {
            this._root.clear();
        },

        svg: function() {
            return "<?xml version='1.0' ?>" + this._template(this);
        },

        _resize: function() {
            if (this._offset) {
                this.translate(this._offset);
            }
        },

        _template: renderTemplate(
            "<svg style='width: 100%; height: 100%; overflow: hidden;' " +
            "xmlns='" + SVG_NS + "' " + "xmlns:xlink='http://www.w3.org/1999/xlink' " +
            "version='1.1'>#= d._root.render() #</svg>"
        )
    });

    // SVG Node ================================================================
    var Node = BaseNode.extend({
        init: function(srcElement) {
            BaseNode.fn.init.call(this, srcElement);
            this.definitions = {};
        },

        destroy: function() {
            if (this.element) {
                this.element._kendoNode = null;
                this.element = null;
            }

            this.clearDefinitions();
            BaseNode.fn.destroy.call(this);
        },

        load: function(elements, pos) {
            var node = this,
                element = node.element,
                childNode,
                srcElement,
                children,
                i;

            for (i = 0; i < elements.length; i++) {
                srcElement = elements[i];
                children = srcElement.children;

                childNode = new nodeMap[srcElement.nodeType](srcElement);

                if (defined(pos)) {
                    node.insertAt(childNode, pos);
                } else {
                    node.append(childNode);
                }

                childNode.createDefinitions();

                if (children && children.length > 0) {
                    childNode.load(children);
                }

                if (element) {
                    childNode.attachTo(element, pos);
                }
            }
        },

        root: function() {
            var root = this;

            while (root.parent) {
                root = root.parent;
            }

            return root;
        },

        attachTo: function(domElement, pos) {
            var container = doc.createElement("div");
            renderSVG(container,
                "<svg xmlns='" + SVG_NS + "' version='1.1'>" +
                this.render() +
                "</svg>"
            );

            var element = container.firstChild.firstChild;
            if (element) {
                if (defined(pos)) {
                    domElement.insertBefore(element, domElement.childNodes[pos]);
                } else {
                    domElement.appendChild(element);
                }
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
            this.element._kendoNode = this;

            for (i = 0; i < nodes.length; i++) {
                childElement = element.childNodes[i];
                nodes[i].setElement(childElement);
            }
        },

        clear: function() {
            this.clearDefinitions();

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
            var field = e.field;
            var value = e.value;

            if (field === "visible") {
                this.css("display", value ? "" : NONE);
            } else if (DefinitionMap[field] && isDefinition(field, value)) {
                this.updateDefinition(field, value);
            } else if (field === "opacity") {
                this.attr("opacity", value);
            }

            BaseNode.fn.optionsChange.call(this, e);
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
            var options = this.srcElement.options;
            var style = [["cursor", options.cursor]];

            if (options.visible === false) {
                style.push(["display", NONE]);
            }

            return style;
        },

        renderStyle: function() {
            return renderAttr("style", util.renderStyle(this.mapStyle()));
        },

        renderOpacity: function() {
            return renderAttr("opacity", this.srcElement.options.opacity);
        },

        createDefinitions: function() {
            var srcElement = this.srcElement;
            var definitions = this.definitions;
            var definition, field, options, hasDefinitions;
            if (srcElement) {
                options = srcElement.options;

                for (field in DefinitionMap) {
                    definition = options.get(field);
                    if (definition && isDefinition(field, definition)) {
                        definitions[field] = definition;
                        hasDefinitions = true;
                    }
                }
                if (hasDefinitions) {
                    this.definitionChange({
                        action: "add",
                        definitions: definitions
                    });
                }
            }
        },

        definitionChange: function(e) {
            if (this.parent) {
                this.parent.definitionChange(e);
            }
        },

        updateDefinition: function(type, value) {
            var definitions = this.definitions;
            var current = definitions[type];
            var attr = DefinitionMap[type];
            var definition = {};
            if (current) {
                definition[type] = current;
                this.definitionChange({
                    action: "remove",
                    definitions: definition
                });
                delete definitions[type];
            }

            if (!value) {
                if (current) {
                    this.removeAttr(attr);
                }
            } else {
                definition[type] = value;
                this.definitionChange({
                    action: "add",
                    definitions: definition
                });
                definitions[type] = value;
                this.attr(attr, refUrl(value.id));
            }
        },

        clearDefinitions: function() {
            var definitions = this.definitions;
            var field;

            for (field in definitions) {
                this.definitionChange({
                    action: "remove",
                    definitions: definitions
                });
                this.definitions = {};
                break;
            }
        },

        renderDefinitions: function() {
            return renderAllAttr(this.mapDefinitions());
        },

        mapDefinitions: function() {
            var definitions = this.definitions;
            var attrs = [];
            var field;
            for (field in definitions) {
                attrs.push([DefinitionMap[field], refUrl(definitions[field].id)]);
            }

            return attrs;
        }
    });

    var RootNode = Node.extend({
        init: function(options) {
            Node.fn.init.call(this);
            this.options = options;
            this.defs = new DefinitionNode();
        },

        attachTo: function(domElement) {
            this.element = domElement;
            this.defs.attachTo(domElement.firstElementChild);
        },

        clear: function() {
            BaseNode.fn.clear.call(this);
        },

        template: renderTemplate(
            "#=d.defs.render()##= d.renderChildren() #"
        ),

        definitionChange: function(e) {
            this.defs.definitionChange(e);
        }
    });

    var DefinitionNode = Node.extend({
        init: function() {
            Node.fn.init.call(this);
            this.definitionMap = {};
        },

        attachTo: function(domElement) {
            this.element = domElement;
        },

        template: renderTemplate(
            "<defs>#= d.renderChildren()#</defs>"
        ),

        definitionChange: function(e) {
            var definitions = e.definitions;
            var action = e.action;

            if (action == "add") {
                this.addDefinitions(definitions);
            } else if (action == "remove") {
                this.removeDefinitions(definitions);
            }
        },

        createDefinition: function(type, item) {
            var nodeType;
            if (type == "clip") {
                nodeType = ClipNode;
            } else if (type == "fill") {
                if (item instanceof d.LinearGradient) {
                    nodeType = LinearGradientNode;
                } else if (item instanceof d.RadialGradient) {
                    nodeType = RadialGradientNode;
                }
            }
            return new nodeType(item);
        },

        addDefinitions: function(definitions) {
            for (var field in definitions) {
                this.addDefinition(field, definitions[field]);
            }
        },

        addDefinition: function(type, srcElement) {
            var definitionMap = this.definitionMap;
            var id = srcElement.id;
            var element = this.element;
            var node, mapItem;

            mapItem = definitionMap[id];
            if (!mapItem) {
                node = this.createDefinition(type, srcElement);
                definitionMap[id] = {
                    element: node,
                    count: 1
                };
                this.append(node);
                if (element) {
                    node.attachTo(this.element);
                }
            } else {
                mapItem.count++;
            }
        },

        removeDefinitions: function(definitions) {
            for (var field in definitions) {
                this.removeDefinition(definitions[field]);
            }
        },

        removeDefinition: function(srcElement) {
            var definitionMap = this.definitionMap;
            var id = srcElement.id;
            var mapItem;

            mapItem = definitionMap[id];
            if (mapItem) {
                mapItem.count--;
                if (mapItem.count === 0) {
                    this.remove(inArray(mapItem.element, this.childNodes), 1);
                    delete definitionMap[id];
                }
            }
        }
    });

    var ClipNode = Node.extend({
        init: function(srcElement) {
            Node.fn.init.call(this);

            this.srcElement = srcElement;
            this.id = srcElement.id;

            this.load([srcElement]);
        },

        template: renderTemplate(
            "<clipPath id='#=d.id#'>#= d.renderChildren()#</clipPath>"
        )
    });

    var GroupNode = Node.extend({
        template: renderTemplate(
            "<g#= d.renderTransform() + d.renderStyle() + d.renderOpacity() + d.renderDefinitions()#>#= d.renderChildren() #</g>"
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
                    if (e.value) {
                        this.allAttr(this.mapFill(e.value));
                    } else {
                        this.removeAttr("fill");
                    }
                    break;

                case "fill.color":
                    this.allAttr(this.mapFill({ color: e.value }));
                    break;

                case "stroke":
                    if (e.value) {
                        this.allAttr(this.mapStroke(e.value));
                    } else {
                        this.removeAttr("stroke");
                    }
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
                        parts.push(this.printPoints(segments[i].anchor()));
                    } else {
                        parts.push(this.printPoints(segments[i - 1].controlOut(), segments[i].controlIn(), segments[i].anchor()));
                    }
                }

                output = "M" + this.printPoints(segments[0].anchor()) + SPACE + parts.join(SPACE);
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
            return segmentStart.controlOut() && segmentEnd.controlIn() ? "C" : "L";
        },

        mapStroke: function(stroke) {
            var attrs = [];

            if (stroke && !isTransparent(stroke.color)) {
                attrs.push(["stroke", stroke.color]);
                attrs.push(["stroke-width", stroke.width]);
                attrs.push(["stroke-linecap", this.renderLinecap(stroke)]);
                attrs.push(["stroke-linejoin", stroke.lineJoin]);

                if (defined(stroke.opacity)) {
                    attrs.push(["stroke-opacity", stroke.opacity]);
                }

                if (defined(stroke.dashType)) {
                    attrs.push(["stroke-dasharray", this.renderDashType(stroke)]);
                }
            } else {
                attrs.push(["stroke", NONE]);
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
                lineCap = stroke.lineCap;

            return (dashType && dashType != SOLID) ? BUTT : lineCap;
        },

        mapFill: function(fill) {
            var attrs = [];
            if (!(fill && fill.nodeType == GRADIENT)) {
                if (fill && !isTransparent(fill.color)) {
                    attrs.push(["fill", fill.color]);

                    if (defined(fill.opacity)) {
                        attrs.push(["fill-opacity", fill.opacity]);
                    }
                } else {
                    attrs.push(["fill", NONE]);
                }
            }

            return attrs;
        },

        renderFill: function() {
            return renderAllAttr(
                this.mapFill(this.srcElement.options.fill)
            );
        },

        template: renderTemplate(
            "<path #= d.renderStyle() # #= d.renderOpacity() # " +
            "#= kendo.util.renderAttr('d', d.renderData()) # " +
            "#= d.renderStroke() # " +
            "#= d.renderFill() # " +
            "#= d.renderDefinitions() # " +
            "#= d.renderTransform() #></path>"
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
            var center = this.center();
            this.attr("cx", center.x);
            this.attr("cy", center.y);
            this.attr("r", this.radius());
            this.invalidate();
        },

        center: function() {
            return this.srcElement.geometry().center;
        },

        radius: function() {
            return this.srcElement.geometry().radius;
        },

        template: renderTemplate(
            "<circle #= d.renderStyle() # #= d.renderOpacity() # " +
            "cx='#= d.center().x #' cy='#= d.center().y #' " +
            "r='#= d.radius() #' " +
            "#= d.renderStroke() # " +
            "#= d.renderFill() # " +
            "#= d.renderDefinitions() # " +
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
            if (e.field === "font") {
                this.attr("style", util.renderStyle(this.mapStyle()));
                this.geometryChange();
            } else if (e.field === "content") {
                PathNode.fn.content.call(this, this.srcElement.content());
            }

            PathNode.fn.optionsChange.call(this, e);
        },

        mapStyle: function() {
            var style = PathNode.fn.mapStyle.call(this);
            var font = this.srcElement.options.font;

            style.push(["font", kendo.htmlEncode(font)]);

            return style;
        },

        pos: function() {
            var pos = this.srcElement.position();
            var size = this.srcElement.measure();
            return pos.clone().setY(pos.y + size.baseline);
        },

        content: function() {
            var content = this.srcElement.content();

            var options = this.root().options;
            if (options && options.encodeText) {
                content = decodeEntities(content);
                content = kendo.htmlEncode(content);
            }

            return content;
        },

        template: renderTemplate(
            "<text #= d.renderStyle() # #= d.renderOpacity() # " +
            "x='#= this.pos().x #' y='#= this.pos().y #' " +
            "#= d.renderStroke() # " +
            "#= d.renderTransform() # " +
            "#= d.renderDefinitions() # " +
            "#= d.renderFill() #>#= d.content() #</text>"
        )
    });

    var ImageNode = PathNode.extend({
        geometryChange: function() {
            this.allAttr(this.mapPosition());
            this.invalidate();
        },

        optionsChange: function(e) {
            if (e.field === "src") {
                this.allAttr(this.mapSource());
            }

            PathNode.fn.optionsChange.call(this, e);
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
            "<image preserveAspectRatio='none' #= d.renderStyle() # #= d.renderTransform()# #= d.renderOpacity() # " +
            "#= d.renderPosition() # #= d.renderSource() # #= d.renderDefinitions()#>" +
            "</image>"
        )
    });

    var GradientStopNode = Node.extend({
        template: renderTemplate(
            "<stop #=d.renderOffset()# #=d.renderStyle()# />"
        ),

        renderOffset: function() {
            return renderAttr("offset", this.srcElement.offset());
        },

        mapStyle: function() {
            var srcElement = this.srcElement;
            return [
                ["stop-color", srcElement.color()],
                ["stop-opacity", srcElement.opacity()]
            ];
        },

        optionsChange: function(e) {
            if (e.field == "offset") {
                this.attr(e.field, e.value);
            } else if (e.field == "color" || e.field == "opacity") {
                this.css("stop-" + e.field, e.value);
            }
        }
    });

    var GradientNode = Node.extend({
        init: function(srcElement) {
            Node.fn.init.call(this, srcElement);

            this.id = srcElement.id;

            this.loadStops();
        },

        loadStops: function() {
            var srcElement = this.srcElement;
            var stops = srcElement.stops;
            var element = this.element;
            var stopNode;
            var idx;
            for (idx = 0; idx < stops.length; idx++) {
                stopNode = new GradientStopNode(stops[idx]);
                this.append(stopNode);
                if (element) {
                    stopNode.attachTo(element);
                }
            }
        },

        optionsChange: function(e) {
            if (e.field == "gradient.stops") {
                BaseNode.fn.clear.call(this);
                this.loadStops();
            } else if (e.field == GRADIENT){
                this.allAttr(this.mapCoordinates());
            }
        },

        renderCoordinates: function() {
            return renderAllAttr(this.mapCoordinates());
        },

        mapSpace: function() {
            return ["gradientUnits", this.srcElement.userSpace() ? "userSpaceOnUse" : "objectBoundingBox"]
        }
    });

    var LinearGradientNode = GradientNode.extend({
        template: renderTemplate(
            "<linearGradient id='#=d.id#' #=d.renderCoordinates()#>" +
                "#= d.renderChildren()#" +
            "</linearGradient>"
        ),

        mapCoordinates: function() {
            var srcElement = this.srcElement;
            var start = srcElement.start();
            var end = srcElement.end();
            var attrs = [
                ["x1", start.x],
                ["y1", start.y],
                ["x2", end.x],
                ["y2", end.y],
                this.mapSpace()
            ];

            return attrs;
        }
    });

    var RadialGradientNode = GradientNode.extend({
        template: renderTemplate(
            "<radialGradient id='#=d.id#' #=d.renderCoordinates()#>" +
                "#= d.renderChildren()#" +
            "</radialGradient>"
        ),

        mapCoordinates: function() {
            var srcElement = this.srcElement;
            var center = srcElement.center();
            var radius = srcElement.radius();
            var attrs = [
                ["cx", center.x],
                ["cy", center.y],
                ["r", radius],
                this.mapSpace()
            ];
            return attrs;
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

    function baseUrl() {
        var base = document.getElementsByTagName("base")[0],
            url = "",
            href = document.location.href,
            hashIndex = href.indexOf("#");

        if (base && !kendo.support.browser.msie) {
            if (hashIndex !== -1) {
                href = href.substring(0, hashIndex);
            }

            url = href;
        }

        return url;
    }

    function refUrl(id) {
        return "url(" + baseUrl() + "#"  + id + ")";
    }

    function exportGroup(group) {
        var root = new RootNode({ encodeText: true });

        var bbox = group.clippedBBox();
        if (bbox) {
            var origin = bbox.getOrigin();
            var exportRoot = new d.Group();
            exportRoot.transform(g.transform().translate(-origin.x, -origin.y));
            exportRoot.children.push(group);
            group = exportRoot;
        }

        root.load([group]);

        var svg = "<?xml version='1.0' ?>" +
                  "<svg style='width: 100%; height: 100%; overflow: hidden;' " +
                  "xmlns='" + SVG_NS + "' " + "xmlns:xlink='http://www.w3.org/1999/xlink' " +
                  "version='1.1'>" + root.render() + "</svg>";

        root.destroy();

        return svg;
    }

    function exportSVG(group, options) {
        var svg = exportGroup(group);

        if (!options || !options.raw) {
            svg = "data:image/svg+xml;base64," + util.encodeBase64(svg);
        }

        return $.Deferred().resolve(svg).promise();
    }

    function isDefinition(type, value) {
        return type == "clip" || (type == "fill" && (!value || value.nodeType == GRADIENT));
    }

    // Mappings ===============================================================

    function decodeEntities(text) {
        if (!text || !text.indexOf || text.indexOf("&") < 0) {
            return text;
        } else {
            var element = decodeEntities._element;
            element.innerHTML = text;
            return element.textContent || element.innerText;
        }
    }

    decodeEntities._element = document.createElement("span");

    // Mappings ===============================================================
    var DefinitionMap = {
        clip: "clip-path",
        fill: "fill"
    };

    // Exports ================================================================
    kendo.support.svg = (function() {
        return doc.implementation.hasFeature(
            "http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1");
    })();

    if (kendo.support.svg) {
        d.SurfaceFactory.current.register("svg", Surface, 10);
    }

    deepExtend(d, {
        exportSVG: exportSVG,

        svg: {
            ArcNode: ArcNode,
            CircleNode: CircleNode,
            ClipNode: ClipNode,
            DefinitionNode: DefinitionNode,
            GradientStopNode: GradientStopNode,
            GroupNode: GroupNode,
            ImageNode: ImageNode,
            LinearGradientNode: LinearGradientNode,
            MultiPathNode: MultiPathNode,
            Node: Node,
            PathNode: PathNode,
            RadialGradientNode: RadialGradientNode,
            RootNode: RootNode,
            Surface: Surface,
            TextNode: TextNode,
            _exportGroup: exportGroup
        }
    });

})(window.kendo.jQuery);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
