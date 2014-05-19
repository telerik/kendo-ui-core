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

        d = dataviz.drawing,
        BaseNode = d.BaseNode,
        Group = d.Group,
        Box2D = dataviz.Box2D,
        Color = dataviz.Color,
        Path = d.Path;

    // Constants ==============================================================
    var BUTT = "butt",
        CLIP = dataviz.CLIP,
        DASH_ARRAYS = dataviz.DASH_ARRAYS,
        DEFAULT_WIDTH = dataviz.DEFAULT_WIDTH,
        DEFAULT_HEIGHT = dataviz.DEFAULT_HEIGHT,
        DEFAULT_FONT = dataviz.DEFAULT_FONT,
        NONE = "none",
        LINEAR = "linear",
        RADIAL = "radial",
        SOLID = "solid",
        SQUARE = "square",
        SVG_NS = "http://www.w3.org/2000/svg",
        TRANSPARENT = "transparent",
        UNDEFINED = "undefined";

    // Canvas Surface ==========================================================
    var Surface = d.Surface.extend({
        init: function(container, options) {
            d.Surface.fn.init.call(this);

            this.options = deepExtend({}, this.options, options);

            this._root = new Node();
            this._root.parent = this;

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
            var surface = this,
                options = surface.options,
                canvas = container.firstElementChild;

            if (!canvas || canvas.tagName.toLowerCase() !== "canvas") {
                container.innerHTML = surface._template(surface);
                canvas = container.firstElementChild;
            } else {
                $(canvas).css({
                    width: options.width,
                    height: options.height
                });
            }

            canvas.width = $(canvas).width();
            canvas.height = $(canvas).height();

            surface.element = canvas;
            surface.ctx = canvas.getContext("2d");

            surface.invalidate();
        },

        invalidate: function() {
            var surface = this,
                canvas = surface.element;

            canvas.width = canvas.width;

            surface._root.renderTo(surface.ctx);
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

    var PathNode = Node.extend({
        renderTo: function(ctx) {
            var path = this,
                options = path.srcElement.options;

            ctx.save();

            ctx.beginPath();
            path.renderPoints(ctx);

            path.setLineDash(ctx);
            path.setLineCap(ctx);

            path.setFill(ctx);
            path.setStroke(ctx);

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

            if (options.fill && options.fill !== "transparent") {
                ctx.fillStyle = fill;
                ctx.globalAlpha = options.fillOpacity;
                ctx.fill();
            }
        },

        setStroke: function(ctx) {
            var stroke = this.srcElement.options.stroke;

            if (stroke && stroke.width) {
                ctx.strokeStyle = stroke.color;
                ctx.lineWidth = stroke.width;
                ctx.lineJoin = "round";
                ctx.globalAlpha = stroke.opacity;
                ctx.stroke();
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

        renderPoints: function(ctx) {
            var path = this,
                segments = path.srcElement.segments,
                i,
                s,
                options = path.srcElement.options,
                rotation = options.rotation,
                strokeWidth = options.stroke.width,
                shouldAlign = options.align !== false && strokeWidth && strokeWidth % 2 !== 0,
                align = shouldAlign ? alignToPixel : round;

            if (segments.length === 0 || !(options.fill || options.stroke)) {
                return;
            }

            s = segments[0];
            ctx.moveTo(s.anchor.x, s.anchor.y);

            for (i = 1; i < segments.length; i++) {
                s = segments[i];
                ctx.lineTo(s.anchor.x, s.anchor.y);
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

    var TextNode = PathNode.extend({
        renderTo: function(ctx) {
            var text = this.srcElement;
            var origin = text.origin;
            var size = text.measure();

            ctx.save();
            this.setFill(ctx);

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
