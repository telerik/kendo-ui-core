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
        BaseStage = dataviz.BaseStage,
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

    // Canvas Stage ==========================================================
    var Stage = BaseStage.extend({
        init: function(wrap, options) {
            BaseStage.fn.init.call(this);

            this.display = this.options.inline ? "inline" : "block";

            this.root = new GroupNode();
            this.root.bind("invalidate", proxy(this._invalidate, this));

            this.nodes.push(this.root);

            this._render(wrap);
        },

        options: {
            width: "100%",
            height: "100%"
        },

        events: [
            "click"
        ],

        append: function() {
            append(this.root.childNodes, Node.map(arguments));
        },

        clear: function() {
            this.root.childNodes.empty();
        },

        _template: renderTemplate(
            "<canvas style='position: relative; display: #= d.display #; " +
            "width: #= d._renderSize(d.options.width) #; " +
            "height: #= d._renderSize(d.options.width) #;'></canvas>"
        ),

        _render: function(wrap) {
            var stage = this,
                options = stage.options,
                canvas = wrap.firstElementChild;

            if (!canvas || canvas.tagName.toLowerCase() !== "canvas") {
                wrap.innerHTML = stage._template(stage);
                canvas = wrap.firstElementChild;
            } else {
                $(canvas).css({
                    width: options.width,
                    height: options.height
                });
            }

            canvas.width = $(canvas).width();
            canvas.height = $(canvas).height();

            stage.element = canvas;
            stage.ctx = canvas.getContext("2d");

            stage._invalidate();
        },

        _invalidate: function() {
            var stage = this,
                canvas = stage.element;

            canvas.width = canvas.width;

            stage.root.renderTo(stage.ctx);
        },

        _nodeChange: function(e) {
            for (var i = 0; i < e.items.length; i++) {
                var node = e.items[i];
                if (e.action === "add") {
                    node.renderTo(this.ctx);
                } else if (e.action === "remove") {
                    node.invalidate();
                }
            }
        }
    });

    // Nodes ===================================================================
    var Node = ObservableObject.extend({
        init: function(source) {
            ObservableObject.fn.init.call(this, this);

            if (source) {
                this.source = source;
                this.source.options.bind("change", proxy(this.invalidate, this));
            }
        },

        renderTo: noop,

        invalidate: function() {
            this.trigger("invalidate");
        }
    });

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

            if (source) {
                this.source.children.bind("change", proxy(this._childrenChange, this));
            }
            this.childNodes.bind("change", proxy(this._childNodesChange, this));
        },

        renderTo: function(ctx) {
            var nodes = this.childNodes,
                i;

            for (i = 0; i < nodes.length; i++) {
                nodes[i].renderTo(ctx);
            }

            Node.fn.renderTo.call(this, ctx);
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

            this.trigger("change");
            this.invalidate();
        },

        // TODO: Rename
        _childNodesChange: function(e) {
            this.invalidate();
        }
    });

    var PathNode = Node.extend({
        init: function(source) {
            Node.fn.init.call(this, source);

            this.source.points.bind("change", proxy(this.invalidate, this));
        },

        renderTo: function(ctx) {
            var path = this,
                options = path.source.options;

            ctx.save();

            ctx.beginPath();
            path.renderPoints(ctx);

            path.setLineDash(ctx);
            path.setLineCap(ctx);

            if (options.fill && options.fill !== "transparent") {
                path.setFill(ctx);
                ctx.globalAlpha = options.fillOpacity;
                ctx.fill();
            }

            if (options.stroke && options.stroke.width) {
                ctx.strokeStyle = options.stroke.color;
                ctx.lineWidth = options.stroke.width;
                ctx.lineJoin = "round";
                ctx.globalAlpha = options.stroke.opacity;
                ctx.stroke();
            }

            path.renderOverlay(ctx);

            ctx.restore();
        },

        setLineDash: function(ctx) {
            var dashType = this.source.options.dashType,
                dashArray;

            dashType = dashType ? dashType.toLowerCase() : null;
            if (dashType && dashType != SOLID) {
                dashArray = DASH_ARRAYS[dashType];
                if (ctx.setLineDash) {
                    ctx.setLineDash(dashArray);
                } else {
                    ctx.mozDash = dashArray;
                    ctx.webkitLineDash = dashArray;
                }
            }
        },

        setLineCap: function(ctx) {
            var options = this.source.options,
                dashType = options.dashType;

            ctx.lineCap = (dashType && dashType !== SOLID) ?
                BUTT : options.strokeLineCap;
        },

        setFill: function(ctx) {
            var options = this.source.options,
                fill = options.fill;

            ctx.fillStyle = fill;
        },

        renderOverlay: function(ctx) {
            var options = this.source.options,
                overlay = options.overlay,
                gradient,
                def;

            if (overlay && overlay.gradient) {
                def = dataviz.Gradients[overlay.gradient];
                gradient = this.buildGradient(ctx, def);
                if (gradient) {
                    ctx.fillStyle = gradient;
                    ctx.fill();
                }
            }
        },

        renderPoints: function(ctx) {
            var path = this,
                points = path.source.points,
                i,
                p,
                options = path.source.options,
                rotation = options.rotation,
                strokeWidth = options.stroke.width,
                shouldAlign = options.align !== false && strokeWidth && strokeWidth % 2 !== 0,
                align = shouldAlign ? alignToPixel : round;

            if (points.length === 0 || !(options.fill || options.stroke)) {
                return;
            }

            p = points[0];
            ctx.moveTo(align(p.x, COORD_PRECISION), align(p.y, COORD_PRECISION));

            for (i = 1; i < points.length; i++) {
                p = points[i];
                ctx.lineTo(align(p.x, COORD_PRECISION), align(p.y, COORD_PRECISION));
            }

            if (path.closed) {
                ctx.closePath();
            }
        },

        buildGradient: function(ctx, definition) {
            var bbox = this.bbox(),
                rotation = this.source.options.overlay.rotation,
                x = bbox.x2,
                y = bbox.y1,
                gradient;

            if (rotation === 90) {
                x = bbox.x1;
                y = bbox.y2;
            }

            if (definition && definition.type === LINEAR) {
                gradient = ctx.createLinearGradient(bbox.x1, bbox.y1, x, y);
                addGradientStops(gradient, definition.stops);
            }

            return gradient;
        },

        bbox: function() {
            var points = this.points,
                bbox = new Box2D(),
                i;

            if (points.length > 0) {
                bbox.move(points[0].x, points[0].y);
                for (i = 1; i < points.length; i++) {
                    bbox.wrapPoint(points[i]);
                }
            }

            return bbox;
        }
    });

    // Helpers ================================================================
    function toRadians(degrees) {
        return ((degrees + 540) % 360) * DEG_TO_RAD;
    }

    function alignToPixel(coord) {
        return math.round(coord) + 0.5;
    }

    function addGradientStops(gradient, stops) {
        var i,
            length = stops.length,
            currentStop,
            color;

        for (i = 0; i < length; i++) {
            currentStop = stops[i];
            color = new Color(currentStop.color);
            gradient.addColorStop(
                currentStop.offset,
                "rgba(" + color.r + "," + color.g + "," + color.b + "," + currentStop.opacity + ")"
            );
        }
    }

    // Exports ================================================================
    deepExtend(dataviz, {
        canvas: {
            Stage: Stage,
            Node: Node,
            GroupNode: GroupNode,
            PathNode: PathNode
        }
    });

})(window.kendo.jQuery);
