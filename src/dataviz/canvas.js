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
        alignToPixel = dataviz.util.alignToPixel,
        append = dataviz.append,
        defined = dataviz.defined,
        round = dataviz.round,
        renderTemplate = dataviz.renderTemplate;

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

    // Canvas Stage ==========================================================
    var Stage = Observable.extend({
        init: function(wrap, options) {
            var stage = this;

            Observable.fn.init.call(stage);

            stage._display = stage.options.inline ? "inline" : "block";

            stage._root = new Node();
            stage._root.bind(CHANGE, proxy(stage._invalidate, stage));

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
            append(this._root.childNodes, Node.map(arguments));
        },

        clear: function() {
            this._root.childNodes.empty();
        },

        _template: renderTemplate(
            "<canvas style='position: relative; display: #= d._display #; " +
            "width: #= kendo.dataviz.util.renderSize(d.options.width) #; " +
            "height: #= kendo.dataviz.util.renderSize(d.options.width) #;'></canvas>"
        ),

        _appendTo: function(wrap) {
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

            stage._root.renderTo(stage.ctx);
        }
    });

    // Nodes ===================================================================
    var Node = ObservableObject.extend({
        init: function(srcElement) {
            var node = this,
                invalidate = proxy(node.invalidate, node);

            node.childNodes = [];
            ObservableObject.fn.init.call(node, node);

            node.childNodes.bind(CHANGE, invalidate);

            if (srcElement) {
                node.srcElement = srcElement;
                srcElement.options.bind(CHANGE, invalidate);

                if (srcElement.children) {
                    srcElement.children.bind(CHANGE, proxy(node._syncChildren, node));
                }
            }
        },

        renderTo: function(ctx) {
            var childNodes = this.childNodes,
                i;

            for (i = 0; i < childNodes.length; i++) {
                childNodes[i].renderTo(ctx);
            }
        },

        invalidate: function() {
            this.trigger(CHANGE);
        },

        _syncChildren: function(e) {
            var group = this;

            // TODO: Test different scenarios for synchronization
            if (e.action === "add") {
                append(group.childNodes, Node.map(e.items));
            } else if (e.action === "remove") {
                group.childNodes.splice(e.index, e.items.length);
            }

            this.trigger(CHANGE);
        }
    });

    Node.map = function(primitives) {
        var result = [];

        for (var i = 0; i < primitives.length; i++) {
            var source = primitives[i];
            var children = source.children;
            var node;

            if (source instanceof Path) {
                node = new PathNode(source);
            } else {
                node = new Node(source);
            }

            if (children && children.length > 0) {
                append(node.childNodes, Node.map(children));
            }

            result.push(node);
        }

        return result;
    };

    var PathNode = Node.extend({
        init: function(srcElement) {
            Node.fn.init.call(this, srcElement);

            this.srcElement.points.bind(CHANGE, proxy(this.invalidate, this));
        },

        renderTo: function(ctx) {
            var path = this,
                options = path.srcElement.options;

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
            var dashType = this.srcElement.options.dashType,
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
            var options = this.srcElement.options,
                dashType = options.dashType;

            ctx.lineCap = (dashType && dashType !== SOLID) ?
                BUTT : options.strokeLineCap;
        },

        setFill: function(ctx) {
            var options = this.srcElement.options,
                fill = options.fill;

            ctx.fillStyle = fill;
        },

        renderOverlay: function(ctx) {
            var options = this.srcElement.options,
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
                points = path.srcElement.points,
                i,
                p,
                options = path.srcElement.options,
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
                rotation = this.srcElement.options.overlay.rotation,
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
            PathNode: PathNode
        }
    });

})(window.kendo.jQuery);
