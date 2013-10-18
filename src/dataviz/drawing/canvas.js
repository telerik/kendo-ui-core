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
        Group = dataviz.Group,
        Path = dataviz.Path,
        alignToPixel = dataviz.util.alignToPixel,
        append = dataviz.append,
        defined = dataviz.defined,
        round = dataviz.round,
        renderTemplate = dataviz.renderTemplate,

        drawing = dataviz.drawing,
        BaseNode = drawing.BaseNode,
        Group = drawing.Group,
        Path = drawing.Path;

    // Constants ==============================================================
    var BUTT = "butt",
        CHANGE = "change",
        CLIP = dataviz.CLIP,
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

    // Canvas Surface ==========================================================
    var Surface = Observable.extend({
        init: function(wrap, options) {
            var surface = this;

            Observable.fn.init.call(surface);

            surface._display = surface.options.inline ? "inline" : "block";

            surface._root = new Node();
            surface._root.observer = this;

            surface._appendTo(wrap);
        },

        options: {
            width: "100%",
            height: "100%"
        },

        events: [
            "click"
        ],

        append: function() {
            this._root.load(arguments);
        },

        clear: function() {
            this._root.empty();
        },

        _template: renderTemplate(
            "<canvas style='position: relative; display: #= d._display #; " +
            "width: #= kendo.dataviz.util.renderSize(d.options.width) #; " +
            "height: #= kendo.dataviz.util.renderSize(d.options.width) #;'></canvas>"
        ),

        _appendTo: function(wrap) {
            var surface = this,
                options = surface.options,
                canvas = wrap.firstElementChild;

            if (!canvas || canvas.tagName.toLowerCase() !== "canvas") {
                wrap.innerHTML = surface._template(surface);
                canvas = wrap.firstElementChild;
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

            surface.notify();
        },

        notify: function() {
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
                } else {
                    childNode = new Node(srcElement);
                }

                if (children && children.length > 0) {
                    childNode.load(children);
                }

                node.childNodes.push(childNode);
                childNode.observer = this;
            }
        },

        unload: function(index, count) {
            for (var i = index; i < count; i++) {
                this.childNodes[i].observer = null;
            }

            this.childNodes.splice(index, count);
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
            Surface: Surface,
            Node: Node,
            PathNode: PathNode
        }
    });

})(window.kendo.jQuery);
