(function () {

    // Imports ================================================================
    var $ = jQuery,
        doc = document,

        kendo = window.kendo,
        Observable = kendo.Observable,
        getter = kendo.getter,
        deepExtend = kendo.deepExtend,

        dataviz = kendo.dataviz,
        round = dataviz.round,
        renderTemplate = dataviz.renderTemplate,

        drawing = dataviz.drawing,
        BaseNode = drawing.BaseNode,
        Group = drawing.Group,
        Path = drawing.Path,

        util = dataviz.util,
        renderAttr = util.renderAttr;

    // Constants ==============================================================
    var BUTT = "butt",
        CHANGE = "change",
        CLIP = dataviz.CLIP,
        COORD_PRECISION = dataviz.COORD_PRECISION,
        DASH_ARRAYS = dataviz.DASH_ARRAYS,
        DEFAULT_WIDTH = dataviz.DEFAULT_WIDTH,
        DEFAULT_HEIGHT = dataviz.DEFAULT_HEIGHT,
        DEFAULT_FONT = dataviz.DEFAULT_FONT,
        NONE = "none",
        RADIAL = "radial",
        SOLID = "solid",
        SQUARE = "square",
        SVG_NS = "http://www.w3.org/2000/svg",
        TRANSPARENT = "transparent",
        UNDEFINED = "undefined";

    // SVG Stage =============================================================
    var Stage = Observable.extend({
        init: function(wrap, options) {
            var stage = this;

            Observable.fn.init.call();

            stage.rootNode = new RootNode();
            stage._appendTo(wrap);
        },

        options: {
            width: "100%",
            height: "100%"
        },

        events: [
            "click"
        ],

        append: function() {
            this.rootNode.load(arguments);
        },

        clear: function() {
            this.rootNode.childNodes.empty();
        },

        _template: renderTemplate(
            "<?xml version='1.0' ?>" +
            "<svg xmlns='" + SVG_NS + "' version='1.1' " +
            "width='#= kendo.dataviz.util.renderSize(d.options.width) #' " +
            "height='#= kendo.dataviz.util.renderSize(d.options.height) #' " +
            "style='position: relative; display: #= d.display #;'></svg>"
        ),

        _appendTo: function(wrap) {
            var stage = this;

            renderSVG(wrap, stage._template(stage));
            stage.element = wrap.firstElementChild;
            stage.rootNode.attachTo(stage.element);
        }
    });

    // SVG Node ================================================================
    var Node = BaseNode.extend({
        attachTo: function(domElement) {
            if (!this.element) {
                var container = doc.createElement("div");
                renderSVG(container,
                    "<?xml version='1.0' ?>" +
                    "<svg xmlns='" + SVG_NS + "' version='1.1'>" +
                    this.render() +
                    "</svg>"
                );

                this.element = container.firstElementChild.lastChild;
                if (this.element) {
                    domElement.appendChild(this.element);
                }
            }
        },

        detach: function() {
            var element = this.element;

            if (element) {
                element.parentNode.removeChild(element);
                this.element = null;
            }
        },

        load: function(elements) {
            var node = this,
                childNode,
                srcElement,
                children,
                i;

            for (i = 0; i < elements.length; i++) {
                srcElement = elements[i];
                children = srcElement.children;

                if (srcElement instanceof Group) {
                    childNode = new GroupNode(srcElement);
                } else if (srcElement instanceof Path) {
                    childNode = new PathNode(srcElement);
                }

                if (children && children.length > 0) {
                    childNode.load(children);
                }

                node.childNodes.push(childNode);
            }
        },

        render: function() {
            return this._template(this);
        },

        _template: renderTemplate(
            "#= d._renderChildren() #"
        ),

        _renderChildren: function() {
            var nodes = this.childNodes,
                output = "",
                i;

            for (i = 0; i < nodes.length; i++) {
                output += nodes[i].render();
            }

            return output;
        },

        _childNodesChange: function(e) {
            if (e.action === "itemchange") {
                return;
            }

            for (var i = 0; i < e.items.length; i++) {
                var node = e.items[i];

                if (e.action === "add" && this.element) {
                    node.attachTo(this.element);
                } else if (e.action === "remove") {
                    node.detach();
                }
            }
        }
    });

    var RootNode = Node.extend({
        attachTo: function(domElement) {
            this.element = domElement;
        }
    });

    var GroupNode = Node.extend({
        attachTo: function(domElement) {
            var nodes = this.childNodes,
                i;

            Node.fn.attachTo.call(this, domElement);

            for (i = 0; i < nodes.length; i++) {
                nodes[i].element = this.element.childNodes[i];
            }
        },

        _template: renderTemplate(
            "<g>#= d._renderChildren() #</g>"
        )
    });

    var PathNode = Node.extend({
        init: function(srcElement) {
            var node = this;

            Node.fn.init.call(node, srcElement);

            node.srcElement.segments.bind(CHANGE, function(){
                node._syncSegments();
            });
        },

        attributeMap: {
            "fill.color": "fill",
            "stroke.color": "stroke"
        },

        renderId: function() {
            var node = this,
                options = node.srcElement.options,
                result = "";

            if (options.id) {
                result = renderAttr("id", options.id);
            }

            return result;
        },

        renderPoints: function() {
            var path = this,
                segments = path.srcElement.segments,
                i,
                result = [];

            for (i = 0; i < segments.length; i++) {
                result.push(segments[i].anchor.toString());
            }

            return "M" + result.join(" ");
        },

        renderStroke: function() {
            var path = this,
                stroke = path.srcElement.options.stroke;

            if (stroke) {
                return renderAttr("stroke", stroke.color) +
                       renderAttr("stroke-width", stroke.width);
            }
        },

        _template: renderTemplate(
            "<path #= d.renderId() #" +
            //"style='display: #= d.renderDisplay() #; " +
            //"#= d.renderCursor() #' " +
            //"#= d.renderDataAttributes() # " +
            "d='#= d.renderPoints() #' " +
            "#= d.renderStroke() # " +
            //"#= d.renderDashType() # " +
            //"stroke-linecap='#= d.renderLinecap() #' " +
            //"stroke-linejoin='round' " +
            //"fill-opacity='#= d.options.fillOpacity #' " +
            //"stroke-opacity='#= d.options.strokeOpacity #' " +
            //"fill='#= d.renderFill() #'> " +
            "></path>"
        ),

        _syncSegments: function(e) {
            if (this.element) {
                $(this.element).attr({
                    d: this.renderPoints()
                });
            }
        },

        _syncOptions: function(e) {
            var element = this.element,
                options = this.srcElement.options,
                name = this.attributeMap[e.field];

            if (element && name) {
                $(element).attr(
                    name, getter(e.field)(options)
                );
            }
        }
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

    // Exports ================================================================
    deepExtend(dataviz, {
        svg: {
            Stage: Stage,
            Node: Node,
            GroupNode: GroupNode,
            PathNode: PathNode
        }
    });

})(window.kendo.jQuery);
