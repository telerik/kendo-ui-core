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
        renderTemplate = dataviz.renderTemplate;

    // Constants ==============================================================
    var BUTT = "butt",
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
            Observable.fn.init.call(this);

            this.nodes = new ObservableArray([]);
            this.nodes.bind("change", proxy(this._nodeChange, this))

            renderSVG(wrap, this._template(this));
            this.element = wrap.firstElementChild;
        },

        options: {
            width: "100%",
            height: "100%"
        },

        events: [
            "click"
        ],

        append: function() {
            append(this.nodes, Node.map(arguments));
        },

        clear: function() {
            this.nodes.empty();
        },

        _template: renderTemplate(
            "<?xml version='1.0' ?>" +
            "<svg xmlns='" + SVG_NS + "' version='1.1' " +
            "width='#= d._renderSize(d.options.width) #' height='#= d._renderSize(d.options.height) #' " +
            "style='position: relative; display: #= d.display #;'></svg>"
        ),

        _nodeChange: function(e) {
            for (var i = 0; i < e.items.length; i++) {
                var node = e.items[i];
                if (e.action === "add") {
                    node.attachTo(this.element);
                } else if (e.action === "remove") {
                    node.detach();
                }
            }
        },

        _renderSize: function(size) {
            if (typeof size !== "string") {
                size += "px";
            }

            return size;
        }
    });

    // Nodes ===================================================================
    var Node = ObservableObject.extend({
        init: function(source) {
            ObservableObject.fn.init.call(this, this);

            this.source = source;
            this.source.options.bind("change", proxy(this._setOptions, this));
        },

        render: function() {
            return this._template(this);
        },

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

                domElement.appendChild(this.element);
            }
        },

        detach: function() {
            var element = this.element;

            if (element) {
                element.parentNode.removeChild(element);
                this.element = null;
            }
        },

        _template: noop,

        _setOptions: noop
    });

    // TODO: Do we need reference to the Stage / state for special nodes like definitions?
    Node.map = function(primitives) {
        var result = [];

        for (var i = 0; i < primitives.length; i++) {
            var source = primitives[i];
            var children = source.children;
            var node;

            if (source instanceof Group) {
                node = new GroupNode(source);
            } else if (source instanceof Path) {
                node = new PathNode(source);
            }

            if (node.childNodes && children && children.length > 0) {
                append(node.childNodes, Node.map(children));
            }

            result.push(node);
        }

        return result;
    };

    var GroupNode = Node.extend({
        init: function(source) {
            this.childNodes = [];

            Node.fn.init.call(this, source);

            this.source.children.bind("change", proxy(this._childrenChange, this));
            this.childNodes.bind("change", proxy(this._childNodesChange, this));
        },

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

        // TODO: Rename
        _childrenChange: function(e) {
            var group = this;

            // TODO: Test different scenarios for synchronization
            if (e.action === "add") {
                append(group.childNodes, Node.map(e.items));
            } else if (e.action === "remove") {
                group.childNodes.splice(e.index, e.items.length);
            }
        },

        // TODO: Rename
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

    var PathNode = Node.extend({
        init: function(source) {
            Node.fn.init.call(this, source);

            this.source.points.bind("change", proxy(this._setPoints, this));
        },

        attributeMap: {
            "fill.color": "fill",
            "stroke.color": "stroke"
        },

        renderId: function() {
            var element = this,
                options = element.source.options,
                result = "";

            if (options.id) {
                result = element.renderAttr("id", options.id);
            }

            return result;
        },

        renderAttr: function (name, value) {
            return defined(value) ? " " + name + "='" + value + "' " : "";
        },

        renderPoints: function() {
            var path = this,
                points = path.source.points,
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
            "#= d.renderAttr(\"stroke\", d.source.options.stroke.color) # " +
            "#= d.renderAttr(\"stroke-width\", d.source.options.stroke.width) #" +
            //"#= d.renderDashType() # " +
            //"stroke-linecap='#= d.renderLinecap() #' " +
            //"stroke-linejoin='round' " +
            //"fill-opacity='#= d.options.fillOpacity #' " +
            //"stroke-opacity='#= d.options.strokeOpacity #' " +
            //"fill='#= d.renderFill() #'> " +
            "></path>"
        ),

        _setPoints: function(e) {
            if (this.element) {
                $(this.element).attr({
                    d: this.renderPoints()
                });
            }
        },

        _setOptions: function(e) {
            var element = this.element,
                options = this.source.options,
                name = this.attributeMap[e.field];

            if (element && name) {
                $(element).attr(
                    name, getter(e.field)(options)
                );
            }
        }
    });


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
