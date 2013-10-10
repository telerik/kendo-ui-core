(function () {

    // Imports ================================================================
    var $ = jQuery,
        noop = $.noop,
        proxy = $.proxy;
        doc = document,
        math = Math,

        kendo = window.kendo,
        Class = kendo.Class,
        Observable = kendo.Observable,
        ObservableArray = kendo.data.ObservableArray,
        ObservableObject = kendo.data.ObservableObject,
        getter = kendo.getter,
        deepExtend = kendo.deepExtend,

        dataviz = kendo.dataviz,
        Point = dataviz.Point,
        append = dataviz.append,
        defined = dataviz.defined,
        round = dataviz.round,
        renderTemplate = dataviz.renderTemplate,

        output = dataviz.output,
        BaseNode = output.BaseNode;

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

            stage.rootNode = new Node();
            stage.rootNode.bind(CHANGE, proxy(stage._nodeChange, stage));

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

            renderSVG(wrap, this._template(this));
            this.element = wrap.firstElementChild;

            this.rootNode.attachTo(this.element);
        },

        _nodeChange: function(e) {
            for (var i = 0; i < e.items.length; i++) {
                var node = e.items[i];
                if (e.action === "add") {
                    node.attachTo(this.element);
                } else if (e.action === "remove") {
                    node.detach();
                }
            }
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
            "# if (d.childNodes.length > 0) { #" +
                "<g>#= d._renderChildren() #</g>" +
            "# } #"
        )
    });

    var PathNode = Node.extend({
        init: function(srcElement) {
            var node = this;

            Node.fn.init.call(node, srcElement);

            node.srcElement.points.bind(CHANGE, proxy(node._syncPoints, node));
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
                result = node.renderAttr("id", options.id);
            }

            return result;
        },

        renderAttr: function (name, value) {
            return defined(value) ? " " + name + "='" + value + "' " : "";
        },

        renderPoints: function() {
            var path = this,
                points = path.srcElement.points,
                i,
                result = [];

            for (i = 0; i < points.length; i++) {
                result.push(points[i].x + " " + points[i].y);
            }

            return "M" + result.join(" ");
        },

        _template: renderTemplate(
            "<path #= d.renderId() #" +
            //"style='display: #= d.renderDisplay() #; " +
            //"#= d.renderCursor() #' " +
            //"#= d.renderDataAttributes() # " +
            "d='#= d.renderPoints() #' " +
            "#= d.renderAttr(\"stroke\", d.srcElement.options.stroke.color) # " +
            "#= d.renderAttr(\"stroke-width\", d.srcElement.options.stroke.width) #" +
            //"#= d.renderDashType() # " +
            //"stroke-linecap='#= d.renderLinecap() #' " +
            //"stroke-linejoin='round' " +
            //"fill-opacity='#= d.options.fillOpacity #' " +
            //"stroke-opacity='#= d.options.strokeOpacity #' " +
            //"fill='#= d.renderFill() #'> " +
            "></path>"
        ),

        _syncPoints: function(e) {
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
