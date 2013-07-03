kendo_module({
    id: "dataviz.canvas",
    name: "Output: Canvas",
    description: "Support for Canvas rendering",
    category: "dataviz",
    depends: [ "dataviz.core" ]
});

(function () {

    // Imports ================================================================
    var $ = jQuery,
        doc = document,
        math = Math,

        kendo = window.kendo,
        Class = kendo.Class,
        dataviz = kendo.dataviz,
        Box2D = dataviz.Box2D,
        Color = dataviz.Color,
        Point2D = dataviz.Point2D,
        ViewBase = dataviz.ViewBase,
        ViewElement = dataviz.ViewElement,
        deepExtend = kendo.deepExtend,
        defined = dataviz.defined,
        round = dataviz.round,
        renderTemplate = dataviz.renderTemplate,
        rotatePoint = dataviz.rotatePoint,
        uniqueId = dataviz.uniqueId;

    // Constants ==============================================================
    var COORD_PRECISION = dataviz.COORD_PRECISION,
        DEFAULT_WIDTH = dataviz.DEFAULT_WIDTH,
        DEFAULT_HEIGHT = dataviz.DEFAULT_HEIGHT,
        DEFAULT_FONT = dataviz.DEFAULT_FONT,
        DEG_TO_RAD = math.PI / 180,
        NONE = "none",
        RADIAL = "radial",
        SOLID = "solid",
        SQUARE = "square",
        TRANSPARENT = "transparent",
        UNDEFINED = "undefined";

    // TODO: Extract in core if shared with SVG
    var DASH_ARRAYS = {
            dot: [1.5, 3.5],
            dash: [4, 3.5],
            longdash: [8, 3.5],
            dashdot: [3.5, 3.5, 1.5, 3.5],
            longdashdot: [8, 3.5, 1.5, 3.5],
            longdashdotdot: [8, 3.5, 1.5, 3.5, 1.5, 3.5]
        };

    var CANVAS_TEMPLATE = renderTemplate(
        "<canvas width='#= d.options.width #px' height='#= d.options.height #px' " +
        "style='position: relative; display: #= d.display #;'></canvas>"
    );

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
                canvas;

            canvas = container.firstElementChild;
            if (!canvas || canvas.tagName.toLowerCase() !== "canvas") {
                var canvas = $(CANVAS_TEMPLATE(this));
                $(container).empty().append(canvas);

                canvas = container.firstElementChild;
            } else {
                $(canvas)
                    .attr({
                        width: view.options.width,
                        height: view.options.height
                    })
                    .siblings().remove();
            }

            canvas.width = canvas.width;

            var context = canvas.getContext("2d");
            view.renderContent(context);

            return canvas;
        },

        render: function() {
        },

        renderContent: function(context) {
            var element = this,
                sortedChildren = element.sortChildren(),
                childrenCount = sortedChildren.length,
                i;

            for (i = 0; i < childrenCount; i++) {
                sortedChildren[i].render(context);
            }
        },

        renderElement: function(element) {
            return $("<div />")[0];
        },

        createGroup: function(options) {
            return this.decorate(
                new DummyElement(options)
            );
        },

        createText: function(content, options) {
            return this.decorate(
                new CanvasText(content, options)
            );
        },

        createRect: function(box, style) {
            if (style.overlay) {
                style.overlay.bbox = box;
            }
            return this.decorate(
                new CanvasLine(box.points(), true, style)
            );
        },

        // TODO: Refactor to (p1, p2, options)
        createLine: function(x1, y1, x2, y2, options) {
            return this.decorate(
                new CanvasLine([new Point2D(x1, y1),
                             new Point2D(x2, y2)], false, options)
            );
        },

        createPolyline: function(points, closed, options) {
            return this.decorate(
                new CanvasLine(points, false, options)
            );
        },

        createCircle: function(center, radius, options) {
            return this.decorate(
                new CanvasCircle(center, radius, options)
            );
        },

        createSector: function(sector, options) {
            return this.decorate(
                new DummyElement(options)
            );
        },

        createRing: function(ring, options) {
            return this.decorate(
                new DummyElement(options)
            );
        },

        createPin: function(pin, options) {
            return this.decorate(
                new DummyElement(options)
            );
        },

        createGradient: function(options) {
            if (options.type === RADIAL) {
                if (defined(options.ir)){
                    return new CanvasDonutGradient(options);
                } else {
                    return new CanvasRadialGradient(options);
                }
            } else {
                return new CanvasLinearGradient(options);
            }
        }
    });

    CanvasView.fromModel = function(model) {
        var view = new CanvasView(model.options);
        [].push.apply(view.children, model.getViewElements(view));

        return view;
    };

    CanvasView.available = dataviz.supportsCanvas;
    CanvasView.preference = 1000 /*25*/;

    dataviz.ui.registerView(CanvasView);

    var DummyElement = ViewElement.extend({
        render: function(context) {
            this.renderContent(context);
        },

        renderContent: function(context) {
            var element = this,
                sortedChildren = element.sortChildren(),
                childrenCount = sortedChildren.length,
                i;

            for (i = 0; i < childrenCount; i++) {
                sortedChildren[i].render(context);
            }
        }
    });

    var CanvasViewElement = ViewElement.extend({
        setFill: function(context) {
            var fill = this.options.fill;

            if (fill.bindToContext) {
                fill = fill.bindToContext(context, this.options.overlay);
            }

            context.fillStyle = fill;
        }
    });

    var CanvasPath = CanvasViewElement.extend({
        init: function(options) {
            var path = this;
            ViewElement.fn.init.call(path, options);
        },

        options: {
            fill: "",
            fillOpacity: 1,
            strokeOpacity: 1,
            rotation: [0,0,0],
            strokeLineCap: SQUARE
        },

        render: $.noop,

        setLineCap: function(context) {
            var options = this.options,
                dashType = options.dashType,
                strokeLineCap = options.strokeLineCap;

            context.lineCap = (dashType && dashType != SOLID) ?
                BUTT : strokeLineCap;
        }
    });

    var CanvasLine = CanvasPath.extend({
        init: function(points, closed, options) {
            var line = this;
            CanvasPath.fn.init.call(line, options);

            line.points = points;
            line.closed = closed;
        },

        render: function(context) {
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

            context.save();

            context.beginPath();
            var p = points[0];
            context.moveTo(align(p.x, COORD_PRECISION), align(p.y, COORD_PRECISION));

            for (i = 0; i < points.length; i++) {
                p = points[i].clone().rotate(rCenter, rAmount);
                context.lineTo(align(p.x, COORD_PRECISION), align(p.y, COORD_PRECISION));
            }

            if (line.closed) {
                context.closePath();
            }

            // TODO: Manual dash rendering for IE
            var dashType = dashType ? dashType.toLowerCase() : null;
            if (dashType && dashType != SOLID) {
                var dashArray = DASH_ARRAYS[dashType];
                if (context.setLineDash) {
                    context.setLineDash(dashArray);
                } else {
                    context.mozDash = dashArray;
                    context.webkitLineDash = dashArray;
                }
            }

            line.setLineCap(context);

            if (options.fill) {
                line.setFill(context);
                context.globalAlpha = options.fillOpacity;
                context.fill();
            }

            if (options.stroke) {
                context.strokeStyle = options.stroke;
                context.lineWidth = options.strokeWidth;
                context.lineJoin = "round";
                context.globalAlpha = options.strokeOpacity;
                context.stroke();
            }

            context.restore();
        },

        clone: function() {
            var line = this;
            return new CanvasLine(
                deepExtend([], line.points), line.closed,
                deepExtend({}, line.options)
            );
        }
    });

    var CanvasCircle = CanvasViewElement.extend({
        init: function(c, r, options) {
            var circle = this;
            CanvasViewElement.fn.init.call(circle, options);

            circle.c = c;
            circle.r = r;
        },

        options: {
            fill: "",
            fillOpacity: 1,
            strokeOpacity: 1
        },

        render: function(context) {
            var circle = this,
                options = circle.options,
                c = circle.c;

            context.save();

            context.beginPath();
            context.arc(c.x, c.y, circle.r, 0, 2 * Math.PI, false);

            context.fillStyle = options.fill;
            context.globalAlpha = options.fillOpacity;
            context.fill();

            context.strokeStyle = options.stroke;
            context.lineWidth = options.strokeWidth;
            context.globalAlpha = options.strokeOpacity;

            context.stroke();

            context.restore();
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
            fillOpacity: 1,
            cursor: {}
        },

        render: function(context) {
            var text = this,
                options = text.options,
                content = text.content,
                x = Math.round(options.x),
                y = Math.round(options.y + options.baseline);

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
                cx = round(options.x + size.normalWidth / 2, COORD_PRECISION),
                cy = round(options.y + size.normalHeight / 2, COORD_PRECISION),
                rcx = round(options.x + size.width / 2, COORD_PRECISION),
                rcy = round(options.y + size.height / 2, COORD_PRECISION),
                offsetX = round(rcx - cx, COORD_PRECISION),
                offsetY = round(rcy - cy, COORD_PRECISION);

            context.translate(cx, cy);
            context.rotate(options.rotation * DEG_TO_RAD);
            context.translate(-cx, -cy);
            context.translate(offsetX, offsetY);
        }
    });

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
        bindToContext: function(context) {
            var options = this.options;

            var gradient = context.createRadialGradient(
                options.cx, options.cy, 0,
                options.cx, options.cy, r);

            this.addStops(gradient);

            return gradient;
        }
    });

    var CanvasDonutGradient = CanvasRadialGradient.extend({
        addStops: function(target) {
            var gradient = this,
                options = gradient.options,
                stops = options.stops,
                stopTemplate = gradient.stopTemplate,
                usedSpace = ((options.ir / options.r) * 100),
                i,
                length = stops.length,
                currentStop;

            currentStop = deepExtend({}, stops[0]);
            currentStop.offset = usedSpace;
            output += stopTemplate(currentStop);

            for (i = 1; i < length; i++) {
                currentStop = deepExtend({}, stops[i]);
                currentStop.offset = currentStop.offset * (100 -  usedSpace) + usedSpace;

                // TODO: Opacity (rgba)
                target.addColorStop(currentStop.offset, currentStop.color);
            }

            return output;
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

    // Exports ================================================================
    deepExtend(dataviz, {
        CanvasView: CanvasView
    });

})(window.kendo.jQuery);
