kendo_module({
    id: "dataviz.canvas",
    name: "Output: Canvas",
    description: "Support for Canvas rendering and image export",
    category: "dataviz",
    depends: [ "dataviz.core" ]
});

(function () {

    // Imports ================================================================
    var $ = jQuery,
        doc = document,
        math = Math,

        kendo = window.kendo,
        dataviz = kendo.dataviz,
        Color = dataviz.Color,
        Point2D = dataviz.Point2D,
        ViewBase = dataviz.ViewBase,
        ViewElement = dataviz.ViewElement,
        deepExtend = kendo.deepExtend,
        defined = dataviz.defined,
        round = dataviz.round,
        renderTemplate = dataviz.renderTemplate;

    // Constants ==============================================================
    var BUTT = "butt",
        COORD_PRECISION = dataviz.COORD_PRECISION,
        DASH_ARRAYS = dataviz.DASH_ARRAYS,
        DEFAULT_WIDTH = dataviz.DEFAULT_WIDTH,
        DEFAULT_HEIGHT = dataviz.DEFAULT_HEIGHT,
        DEFAULT_FONT = dataviz.DEFAULT_FONT,
        DEG_TO_RAD = math.PI / 180,
        TWO_PI = math.PI * 2,
        NONE = "none",
        RADIAL = "radial",
        SOLID = "solid",
        SQUARE = "square";

    var CANVAS_TEMPLATE = renderTemplate(
        "<canvas width='#= d.options.width #px' height='#= d.options.height #px' " +
        "style='position: relative; display: #= d.display #;'></canvas>"
    );

    window.rects = 0;

    // View ===================================================================
    var CanvasView = ViewBase.extend({
        init: function(options) {
            var view = this;

            ViewBase.fn.init.call(view, options);

            view.decorators.push(
                new CanvasOverlayDecorator(view),
                new CanvasGradientDecorator(view)
            );

            view.display = view.options.inline ? "inline" : "block";
        },

        options: {
            width: DEFAULT_WIDTH,
            height: DEFAULT_HEIGHT
        },

        renderTo: function(container) {
            var view = this,
                options = view.options,
                canvas,
                ctx;

            canvas = container.firstElementChild;
            if (!canvas || canvas.tagName.toLowerCase() !== "canvas") {
                container.innerHTML = CANVAS_TEMPLATE(this);
                canvas = container.firstElementChild;
            } else {
                $(canvas).siblings().remove();
                canvas.width = options.width;
                canvas.height = options.height;
            }

            ctx = canvas.getContext("2d");
            view.renderContent(ctx);

            return canvas;
        },

        // TODO: Sort by zIndex in append
        renderContent: function(context) {
            var element = this,
                sortedChildren = element.sortChildren(),
                childrenCount = sortedChildren.length,
                i;

            for (i = 0; i < childrenCount; i++) {
                sortedChildren[i].render(context);
            }
        },

        createGroup: function(options) {
            return new CanvasGroup(options);
        },

        createText: function(content, options) {
            return new CanvasText(content, options);
        },

        createRect: function(box, style) {
            if (style && style.overlay) {
                style.overlay.bbox = box;
            }
            return this.decorate(
                new CanvasLine(box.points(), true, this.setDefaults(style))
            );
        },

        createLine: function(x1, y1, x2, y2, options) {
            return new CanvasLine([new Point2D(x1, y1), new Point2D(x2, y2)],
                false, this.setDefaults(options));
        },

        createPolyline: function(points, closed, options) {
            return new CanvasLine(points, closed, this.setDefaults(options));
        },

        createCircle: function(center, radius, options) {
            return this.decorate(
                new CanvasCircle(center, radius, options)
            );
        },

        // TODO: Obsolete across all views?
        createSector: function(sector, options) {
            return this.decorate(
                new CanvasRing(sector, options)
            );
        },

        createRing: function(ring, options) {
            return this.decorate(
                new CanvasRing(ring, options)
            );
        },

        createPin: function(pin, options) {
            return this.decorate(
                new CanvasPin(pin, options)
            );
        },

        createGradient: function(options) {
            if (options.type === RADIAL) {
                return new CanvasRadialGradient(options);
            } else {
                return new CanvasLinearGradient(options);
            }
        }
    });

    var CanvasGroup = ViewElement.extend({
        render: function(context) {
            this.renderContent(context);
        },

        renderContent: CanvasView.fn.renderContent
    });

    var CanvasPath = ViewElement.extend({
        options: {
            fill: "",
            fillOpacity: 1,
            strokeOpacity: 1,
            strokeLineCap: SQUARE
        },

        render: function(ctx) {
            var path = this,
                options = path.options;

            ctx.save();

            ctx.beginPath();
            path.renderPoints(ctx);

            path.setLineDash(ctx);
            path.setLineCap(ctx);

            if (options.fill) {
                path.setFill(ctx);
                ctx.globalAlpha = options.fillOpacity;
                ctx.fill();
            }

            if (options.stroke && options.strokeWidth) {
                ctx.strokeStyle = options.stroke;
                ctx.lineWidth = options.strokeWidth;
                ctx.lineJoin = "round";
                ctx.globalAlpha = options.strokeOpacity;
                ctx.stroke();
            }

            ctx.restore();
        },

        renderPoints: $.noop,

        setLineDash: function(ctx) {
            var dashType = this.options.dashType,
                dashArray;

            // TODO: Manual dash rendering for IE
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
            var options = this.options,
                dashType = options.dashType;

            ctx.lineCap = (dashType && dashType !== SOLID) ?
                BUTT : options.strokeLineCap;
        },

        setFill: function(ctx) {
            var options = this.options,
                fill = options.fill;

            if (fill.bindToContext) {
                fill = fill.bindToContext(ctx, options.overlay);
            }

            ctx.fillStyle = fill;
        }
    });

    var CanvasLine = CanvasPath.extend({
        init: function(points, closed, options) {
            var line = this;
            CanvasPath.fn.init.call(line, options);

            line.points = points;
            line.closed = closed;
        },

        options: {
            // TODO: Remove and do the rotation in the model
            rotation: [0, 0, 0]
        },

        renderPoints: function(ctx) {
            var line = this,
                points = line.points,
                rotation = line.options.rotation,
                rCenter = new Point2D(rotation[1], rotation[2]),
                rAmount = -rotation[0],
                i,
                options = line.options,
                strokeWidth = options.strokeWidth,
                shouldAlign = options.align !== false && strokeWidth && strokeWidth % 2 !== 0,
                align = shouldAlign ? alignToPixel : round;

            if (points.length === 0 || !(options.fill || options.stroke)) {
                return;
            }

            var p = points[0].clone().rotate(rCenter, rAmount);
            ctx.moveTo(align(p.x, COORD_PRECISION), align(p.y, COORD_PRECISION));

            for (i = 1; i < points.length; i++) {
                p = points[i].clone().rotate(rCenter, rAmount);
                ctx.lineTo(align(p.x, COORD_PRECISION), align(p.y, COORD_PRECISION));
            }

            if (line.closed) {
                ctx.closePath();
            }
        }
    });

    var CanvasCircle = CanvasPath.extend({
        init: function(c, r, options) {
            var circle = this;
            CanvasPath.fn.init.call(circle, options);

            circle.c = c;
            circle.r = r;
        },

        renderPoints: function(context) {
            var c = this.c;

            context.arc(c.x, c.y, this.r, 0, TWO_PI, false);
        }
    });

    var CanvasText = ViewElement.extend({
        init: function(content, options) {
            var text = this;
            ViewElement.fn.init.call(text, options);

            text.content = content;
        },

        options: {
            x: 0,
            y: 0,
            baseline: 0,
            font: DEFAULT_FONT,
            size: {
                width: 0,
                height: 0
            },
            fillOpacity: 1
        },

        render: function(context) {
            var text = this,
                options = text.options,
                content = text.content,
                x = options.x,
                y = options.y + options.baseline;

            context.save();

            text.setRotation(context);

            context.font = options.font;
            context.fillStyle = options.color;
            context.globalAlpha = options.fillOpacity;

            context.fillText(content, x, y);

            context.restore();
        },

        setRotation: function(context) {
            var text = this,
                options = text.options,
                size = options.size,
                cx = options.x + size.normalWidth / 2,
                cy = options.y + size.normalHeight / 2,
                rcx = options.x + size.width / 2,
                rcy = options.y + size.height / 2,
                offsetX = rcx - cx,
                offsetY = rcy - cy;

            context.translate(cx, cy);
            context.rotate(options.rotation * DEG_TO_RAD);
            context.translate(-cx, -cy);
            context.translate(offsetX, offsetY);
        }
    });

    var CanvasRing = CanvasPath.extend({
        init: function(config, options) {
            var ring = this;

            CanvasPath.fn.init.call(ring, options);

            ring.config = config || {};
        },

        options: {
            fill: "",
            fillOpacity: 1,
            strokeOpacity: 1,
            strokeLineCap: SQUARE
        },

        renderPoints: function(context) {
            var ring = this,
                ringConfig = ring.config,
                startAngle = ringConfig.startAngle,
                endAngle = ringConfig.angle + startAngle,
                r = math.max(ringConfig.r, 0),
                ir = math.max(ringConfig.ir, 0),
                center = ringConfig.c,
                startRadians = toRadians(startAngle),
                endRadians = toRadians(endAngle);

            if (startRadians === endRadians) {
                startAngle = 0;
                endAngle = 360;
                startRadians = 0;
                endRadians = 2 * Math.PI;
            }

            var firstOuterPoint = ringConfig.point(startAngle),
                secondInnerPoint = ringConfig.point(endAngle, true);

            context.moveTo(firstOuterPoint.x, firstOuterPoint.y);
            context.arc(center.x, center.y, r, startRadians, endRadians);

            if (ir > 0) {
                context.lineTo(secondInnerPoint.x, secondInnerPoint.y);
                context.arc(center.x, center.y, ir, endRadians, startRadians, true);
            } else {
                context.lineTo(center.x, center.y);
            }
        },

        clone: function() {
            var ring = this;
            return new CanvasRing(
                deepExtend({}, ring.config),
                deepExtend({}, ring.options)
            );
        }
    });

    function toRadians(degrees) {
        return ((degrees + 540) % 360) * DEG_TO_RAD;
    }

    var CanvasPin = CanvasPath.extend({
        init: function(config, options) {
            var pin = this;

            CanvasPath.fn.init.call(pin, options);

            pin.config = config;
        },

        renderPoints: function(context) {
            var pin = this,
                config = pin.config,
                r = config.radius,
                degrees = math.PI / 180,
                arcAngle = config.arcAngle,
                height = config.height - r * (1 - math.cos(arcAngle * degrees / 2)),
                origin = config.origin;

            var rotation = pin.options.rotation;
            context.translate(rotation[1], rotation[2]);
            context.rotate(toRadians(rotation[0]));
            context.translate(rotation[1] - origin.x, rotation[2] - origin.y);
            context.rotate(toRadians(-pin.config.rotation));

            context.moveTo(0, 0);
            context.arc(0, -height, r, toRadians(90 - arcAngle / 2), toRadians(90 + arcAngle / 2));
            context.lineTo(0, 0);
            context.closePath();
        }
    });

    // Gradients ==============================================================
    var CanvasGradient = ViewElement.extend({
        options: {
            id: ""
        },

        addStops: function(target) {
            var gradient = this,
                stops = gradient.options.stops,
                i,
                length = stops.length,
                currentStop;

            for (i = 0; i < length; i++) {
                currentStop = stops[i];
                var color = new Color(currentStop.color);
                target.addColorStop(currentStop.offset,
                    "rgba(" + color.r + "," + color.g + "," + color.b + "," + currentStop.opacity + ")");
            }
        }
    });

    var CanvasLinearGradient = CanvasGradient.extend({
        options: {
            rotation: 0
        },

        bindToContext: function(context, options) {
            var rotation = options.rotation,
                bbox = options.bbox,
                x = bbox.x2,
                y = bbox.y1;

            if (rotation === 90) {
                x = bbox.x1;
                y = bbox.y2;
            }

            var result = context.createLinearGradient(bbox.x1, bbox.y1, x, y);
            this.addStops(result);

            return result;
        }
    });

    var CanvasRadialGradient = CanvasGradient.extend({
        bindToContext: function(context, options) {
            var gradient = context.createRadialGradient(
                options.cx, options.cy, options.ir,
                options.cx, options.cy, options.r);

            this.addStops(gradient, options);

            return gradient;
        }
    });

    // Decorators =============================================================
    function CanvasOverlayDecorator(view) {
        this.view = view;
    }

    CanvasOverlayDecorator.prototype = {
        decorate: function(element) {
            var decorator = this,
                view = decorator.view,
                options = element.options,
                group,
                overlay;

            if (options.overlay) {
                group = view.createGroup();
                overlay = element.clone();

                group.children.push(element, overlay);

                overlay.options.fill = options.overlay;

                return group;
            } else {
                return element;
            }
        }
    };

    function CanvasGradientDecorator(view) {
        this.view = view;
    }

    CanvasGradientDecorator.prototype = {
        decorate: function(element) {
            var decorator = this,
                options = element.options;

            options.fill = decorator.getPaint(options.fill);

            return element;
        },

        getPaint: function(paint) {
            var decorator = this,
                view = decorator.view,
                definitions = view.definitions,
                overlay,
                overlayId,
                gradient;

            if (paint && defined(paint.gradient)) {
                overlay = view.buildGradient(paint);
                if (overlay) {
                    overlayId = overlay.id;
                    gradient = definitions[overlayId];
                    if (!gradient) {
                        gradient = view.createGradient(overlay);
                        definitions[overlayId] = gradient;
                    }

                    return gradient;
                } else {
                    return NONE;
                }
            } else {
                return paint;
            }
        }
    };

    // Helpers ================================================================
    function alignToPixel(coord) {
        return math.round(coord) + 0.5;
    }

    function supportsCanvas() {
        return !!doc.createElement("canvas").getContext;
    }

    // Exports ================================================================
    if (supportsCanvas) {
        //dataviz.ViewFactory.current.register("canvas", CanvasView, 30);
        dataviz.ViewFactory.current.register("canvas", CanvasView, 0);
    }

    deepExtend(dataviz, {
        CanvasCircle: CanvasCircle,
        CanvasLinearGradient: CanvasLinearGradient,
        CanvasGroup: CanvasGroup,
        CanvasLine: CanvasLine,
        CanvasPath: CanvasPath,
        CanvasRing: CanvasRing,
        CanvasText: CanvasText,
        CanvasView: CanvasView,

        supportsCanvas: supportsCanvas
    });

})(window.kendo.jQuery);
