(function(f, define){
    define([ "./shapes" ], f);
})(function(){

(function () {

    // Imports ================================================================
    var $ = jQuery,
        noop = $.noop,
        proxy = $.proxy,
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
        alignToPixel = dataviz.util.alignToPixel,
        append = dataviz.append,
        defined = dataviz.defined,
        round = dataviz.round,
        renderTemplate = dataviz.renderTemplate,

        util = dataviz.util,
        valueOrDefault = util.valueOrDefault,

        d = dataviz.drawing,
        BaseNode = d.BaseNode,
        Group = d.Group,
        Box2D = dataviz.Box2D,
        Color = dataviz.Color,
        Path = d.Path;

    // Constants ==============================================================
    var BUTT = "butt",
        DASH_ARRAYS = dataviz.DASH_ARRAYS,
        LINEAR = "linear",
        SOLID = "solid";

    // Canvas Surface ==========================================================
    var Surface = d.Surface.extend({
        init: function(container, options) {
            d.Surface.fn.init.call(this);

            this.options = deepExtend({}, this.options, options);

            this._appendTo(container);
        },

        options: {
            width: "100%",
            height: "100%"
        },

        events: [],

        draw: function(element) {
            this._root.load([element]);
        },

        clear: function() {
            this._root.clear();
        },

        setSize: function(size) {
            this.element.width = size.width;
            this.element.height = size.height;

            d.Surface.fn.setSize.call(this, size);
        },

        _template: renderTemplate(
            "<canvas style='position: absolute; " +
            "width: #= kendo.dataviz.util.renderSize(d.options.width) #; " +
            "height: #= kendo.dataviz.util.renderSize(d.options.height) #;'></canvas>"
        ),

        _appendTo: function(container) {
            var options = this.options,
                canvas = container.firstElementChild;

            if (!canvas || canvas.tagName.toLowerCase() !== "canvas") {
                container.innerHTML = this._template(this);
                canvas = container.firstElementChild;
            } else {
                $(canvas).css({
                    width: options.width,
                    height: options.height
                });
            }

            canvas.width = $(canvas).width();
            canvas.height = $(canvas).height();

            this.element = canvas;

            this._root = new RootNode(canvas);
            this._root.invalidate();
        }
    });

    // Nodes ===================================================================
    var Node = BaseNode.extend({
        renderTo: function(ctx) {
            var childNodes = this.childNodes,
                i;

            for (i = 0; i < childNodes.length; i++) {
                childNodes[i].renderTo(ctx);
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

                if (srcElement instanceof Path) {
                    childNode = new PathNode(srcElement);
                } else if (srcElement instanceof d.Text) {
                    childNode = new TextNode(srcElement);
                } else {
                    childNode = new Node(srcElement);
                }

                if (children && children.length > 0) {
                    childNode.load(children);
                }

                node.append(childNode);
            }
        }
    });

    var RootNode = Node.extend({
        init: function(canvas) {
            Node.fn.init.call(this);

            this.canvas = canvas;
            this.ctx = canvas.getContext("2d");
        },

        invalidate: function() {
            this.canvas.width = this.canvas.width;
            this.renderTo(this.ctx);
        }
    });

    var PathNode = Node.extend({
        renderTo: function(ctx) {
            ctx.save();

            ctx.beginPath();

            this.setTransform(ctx);
            this.renderPoints(ctx);

            this.setLineDash(ctx);
            this.setLineCap(ctx);

            this.setFill(ctx);
            this.setStroke(ctx);

            this.renderOverlay(ctx);

            ctx.restore();
        },

        setFill: function(ctx) {
            var fill = this.srcElement.options.fill;
            if (fill && fill.color !== "transparent") {
                ctx.fillStyle = fill.color;
                ctx.globalAlpha = fill.opacity;
                ctx.fill();
            }
        },

        setStroke: function(ctx) {
            var stroke = this.srcElement.options.stroke;
            if (stroke) {
                ctx.strokeStyle = stroke.color;
                ctx.lineWidth = valueOrDefault(stroke.width, 1);
                ctx.lineJoin = "round";
                ctx.globalAlpha = stroke.opacity;
                ctx.stroke();
            }
        },

        dashType: function() {
            var stroke = this.srcElement.options.stroke;
            if (stroke && stroke.dashType) {
                return stroke.dashType.toLowerCase();
            }
        },

        setLineDash: function(ctx) {
            var dashType = this.dashType();
            if (dashType && dashType != SOLID) {
                var dashArray = DASH_ARRAYS[dashType];
                if (ctx.setLineDash) {
                    ctx.setLineDash(dashArray);
                } else {
                    ctx.mozDash = dashArray;
                    ctx.webkitLineDash = dashArray;
                }
            }
        },

        setLineCap: function(ctx) {
            var dashType = this.dashType();
            if (dashType && dashType !== SOLID) {
                ctx.lineCap = BUTT;
            } else {
                var stroke = this.srcElement.options.stroke;
                ctx.lineCap = valueOrDefault(stroke.lineCap, "square");
            }
        },

        setTransform: function(ctx) {
            var transform = this.srcElement.transform();
            if (transform) {
                ctx.transform.apply(ctx, transform.matrix().toArray(6));
            }
        },

        renderPoints: function(ctx) {
            var src = this.srcElement;
            var segments = src.segments;

            if (segments.length === 0) {
                return;
            }

            var s = segments[0];
            ctx.moveTo(s.anchor.x, s.anchor.y);

            for (var i = 1; i < segments.length; i++) {
                var ps = segments[i - 1];
                s = segments[i];
                if (ps.controlOut && s.controlIn) {
                    ctx.bezierCurveTo(ps.controlOut.x, ps.controlOut.y,
                                      s.controlIn.x, s.controlIn.y,
                                      s.anchor.x, s.anchor.y);
                } else {
                    ctx.lineTo(s.anchor.x, s.anchor.y);
                }
            }

            if (src.options.closed) {
                ctx.closePath();
            }
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

    var TextNode = PathNode.extend({
        renderTo: function(ctx) {
            var text = this.srcElement;
            var origin = text.origin;
            var size = text.measure();

            ctx.save();

            this.setFill(ctx);
            this.setTransform(ctx);

            ctx.font = text.options.font;
            ctx.fillText(text.content(), origin.x, origin.y + size.baseline);

            ctx.restore();
        },

        contentChange: function() {
            this.invalidate();
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
    if (kendo.support.canvas) {
        d.SurfaceFactory.current.register("canvas", Surface, 20);
    }

    deepExtend(dataviz.drawing, {
        canvas: {
            Surface: Surface,
            Node: Node,
            PathNode: PathNode,
            TextNode: TextNode
        }
    });

})(window.kendo.jQuery);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
