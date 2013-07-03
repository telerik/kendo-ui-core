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
                // TODO: Introduce "stage" wrapper to avoid messy cleanup
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
                new CanvasRing(ring, options)
            );
        },

        createPin: function(pin, options) {
            return this.decorate(
                new DummyElement(options)
            );
        },

        createGradient: function(options) {
            if (false && options.type === RADIAL) {
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
        },

        clone: function() {
            return new DummyElement();
        }
    });

    var CanvasPath = ViewElement.extend({
        init: function(options) {
            var path = this;
            ViewElement.fn.init.call(path, options);
        },

        options: {
            fill: "",
            fillOpacity: 1,
            strokeOpacity: 1,
            strokeLineCap: SQUARE
        },

        render: function(context) {
            var path = this,
                options = path.options;

            context.save();

            context.beginPath();

            this.renderPoints(context);

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

            path.setLineCap(context);

            if (options.fill) {
                path.setFill(context);
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

        renderPoints: $.noop,

        setLineCap: function(context) {
            var options = this.options,
                dashType = options.dashType,
                strokeLineCap = options.strokeLineCap;

            context.lineCap = (dashType && dashType != SOLID) ?
                BUTT : strokeLineCap;
        },

        setFill: function(context) {
            var fill = this.options.fill;

            if (fill.bindToContext) {
                fill = fill.bindToContext(context, this.options.overlay);
            }

            context.fillStyle = fill;
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
            rotation: [0,0,0]
        },

        renderPoints: function(context) {
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

            var p = points[0];
            context.moveTo(align(p.x, COORD_PRECISION), align(p.y, COORD_PRECISION));

            for (i = 0; i < points.length; i++) {
                p = points[i].clone().rotate(rCenter, rAmount);
                context.lineTo(align(p.x, COORD_PRECISION), align(p.y, COORD_PRECISION));
            }

            if (line.closed) {
                context.closePath();
            }
        },

        clone: function() {
            var line = this;
            return new CanvasLine(
                deepExtend([], line.points), line.closed,
                deepExtend({}, line.options)
            );
        }
    });

    var CanvasCircle = CanvasPath.extend({
        init: function(c, r, options) {
            var circle = this;
            CanvasPath.fn.init.call(circle, options);

            circle.c = c;
            circle.r = r;
        },

        options: {
            fill: "",
            fillOpacity: 1,
            strokeOpacity: 1
        },

        renderPoints: function(context) {
            var circle = this,
                options = circle.options,
                c = circle.c;

            context.arc(c.x, c.y, circle.r, 0, 2 * Math.PI, false);
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

    var CanvasRing = CanvasPath.extend({
        init: function(config, options) {
            var ring = this;

            CanvasPath.fn.init.call(ring, options);

            ring.config = config || {};
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
            context.lineTo(secondInnerPoint.x, secondInnerPoint.y);
            context.arc(center.x, center.y, ir, endRadians, startRadians, true);

            context.closePath();
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

            pin.pathTemplate = CanvasPin.pathTemplate;
            if (!pin.pathTemplate) {
                pin.pathTemplate = CanvasPin.pathTemplate = renderTemplate(
                    "M #= d.origin.x # #= d.origin.y # " +
                    "#= d.as.x # #= d.as.y # " +
                    "A#= d.r # #= d.r # " +
                    "0 #= d.isReflexAngle ? '1' : '0' #,0 " +
                    "#= d.ae.x # #= d.ae.y # " +
                    "z"
                );
            }

            pin.config = config || new dataviz.Pin();
        },

        renderPoints: function() {
            var pin = this,
                config = pin.config,
                r = config.radius,
                degrees = math.PI / 180,
                arcAngle = config.arcAngle,
                halfChordLength = r * math.sin(arcAngle * degrees / 2),
                height = config.height - r * (1 - math.cos(arcAngle * degrees / 2)),
                origin = config.origin,
                arcStart = { x: origin.x + halfChordLength, y: origin.y - height },
                arcEnd = { x: origin.x - halfChordLength, y: origin.y - height },
                rotate = function(point, inclinedPoint) {
                    var rotation = pin.options.rotation,
                        inclination = config.rotation;

                    point = rotatePoint(point.x, point.y, rotation[1], rotation[2], -rotation[0]);

                    if (inclinedPoint) {
                        point = rotatePoint(point.x, point.y, origin.x, origin.y, inclination);
                    }

                    return point;
                };

            origin = rotate(origin);

            return pin.pathTemplate({
                origin: origin,
                as: rotate(arcStart, true),
                ae: rotate(arcEnd, true),
                r: r,
                isReflexAngle: arcAngle > 180
            });
        }
    });

    var CanvasSector = CanvasRing.extend({
        init: function(config, options) {
            var sector = this;
            CanvasRing.fn.init.call(sector, config, options);

            sector.pathTemplate = CanvasSector.pathTemplate;
            if (!sector.pathTemplate) {
                sector.pathTemplate = CanvasSector.pathTemplate = renderTemplate(
                    "M #= d.firstOuterPoint.x # #= d.firstOuterPoint.y # " +
                    "A#= d.r # #= d.r # " +
                    "0 #= d.isReflexAngle ? '1' : '0' #,1 " +
                    "#= d.secondOuterPoint.x # #= d.secondOuterPoint.y # " +
                    "L #= d.cx # #= d.cy # z"
                );
            }
        },

        options: {
            fill: "",
            fillOpacity: 1,
            strokeOpacity: 1,
            strokeLineCap: SQUARE
        },

        clone: function() {
            var sector = this;
            return new CanvasSector(
                deepExtend({}, sector.config),
                deepExtend({}, sector.options)
            );
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
        bindToContext: function(context) {
            var options = this.options;

            var gradient = context.createRadialGradient(
                options.cx, options.cy, 0,
                options.cx, options.cy, options.r);

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
                usedSpace = (options.ir / options.r),
                i,
                length = stops.length,
                currentStop;

            currentStop = deepExtend({}, stops[0]);
            currentStop.offset = usedSpace;
            target.addColorStop(currentStop.offset, currentStop.color);

            for (i = 1; i < length; i++) {
                currentStop = deepExtend({}, stops[i]);
                currentStop.offset = currentStop.offset * usedSpace;

                var color = new Color(currentStop.color);
                target.addColorStop(currentStop.offset,
                    "rgba(" + color.r + "," + color.g + "," + color.b + "," + currentStop.opacity + ")");
            }
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
