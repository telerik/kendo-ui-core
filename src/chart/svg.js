(function () {

    // Imports ================================================================
    var $ = jQuery,
        kendo = window.kendo,
        Class = kendo.Class,
        Chart = kendo.ui.Chart,
        BarAnimationDecorator = Chart.BarAnimationDecorator,
        PieAnimationDecorator = Chart.PieAnimationDecorator,
        FadeAnimationDecorator = Chart.FadeAnimationDecorator,
        Box2D = Chart.Box2D,
        Point2D = Chart.Point2D,
        ExpandAnimation = Chart.ExpandAnimation,
        ViewBase = Chart.ViewBase,
        ViewElement = Chart.ViewElement,
        deepExtend = Chart.deepExtend,
        template = Chart.template,
        uniqueId = Chart.uniqueId,
        round = Chart.round,
        doc = document,
        math = Math;

    // Constants ==============================================================
    var CLIP = Chart.CLIP,
        COORD_PRECISION = Chart.COORD_PRECISION,
        DEFAULT_WIDTH = Chart.DEFAULT_WIDTH,
        DEFAULT_HEIGHT = Chart.DEFAULT_HEIGHT,
        DEFAULT_FONT = Chart.DEFAULT_FONT,
        GLOBAL_CLIP = "globalClip",
        RADIAL = "radial",
        SQUARE = "square",
        SVG_NS = "http://www.w3.org/2000/svg",
        SVG_DASH_TYPE = {
            dot: [1.5, 3.5],
            dash: [4, 3.5],
            longdash: [8, 3.5],
            dashdot: [3.5, 3.5, 1.5, 3.5],
            longdashdot: [8, 3.5, 1.5, 3.5],
            longdashdotdot: [8, 3.5, 1.5, 3.5, 1.5, 3.5]
        },
        UNDEFINED = "undefined";

    // View ===================================================================
    var SVGView = ViewBase.extend({
        init: function(options) {
            var view = this;

            ViewBase.fn.init.call(view, options);

            view.decorators.push(
                new SVGOverlayDecorator(view),
                new SVGGradientDecorator(view),
                new BarAnimationDecorator(view),
                new PieAnimationDecorator(view),
                new SVGClipAnimationDecorator(view),
                new FadeAnimationDecorator(view)
            );

            view.template = SVGView.template;
            if (!view.template) {
                view.template = SVGView.template = template(
                    "<svg xmlns='" + SVG_NS + "' version='1.1' " +
                    "width='#= d.options.width #px' height='#= d.options.height #px' " +
                    "style='position: relative;'>" +
                    "#= d.renderDefinitions() #" +
                    "#= d.renderContent() #</svg>"
                );
            }
        },

        options: {
            width: DEFAULT_WIDTH,
            height: DEFAULT_HEIGHT,
            idPrefix: ""
        },

        renderTo: function(container) {
            var view = this,
                viewElement;

            view.setupAnimations();

            renderSVG(container, view.render());
            viewElement = container.firstChild;
            view.alignToScreen(viewElement);

            view.playAnimations();

            return viewElement;
        },

        renderDefinitions: function() {
            var view = this,
                output = ViewBase.fn.renderDefinitions.call(view);

            return output.length > 0 ? "<defs>" + output + "</defs>" : "";
        },

        renderElement: function(element) {
            var container = doc.createElement("div"),
                element;

            renderSVG(container,
                "<svg xmlns='" + SVG_NS + "' version='1.1'>" +
                element.render() +
                "</svg>"
            );

            element = container.firstChild.firstChild;

            return element;
        },

        createGroup: function(options) {
            return this.decorate(
                new SVGGroup(options)
            );
        },

        createText: function(content, options) {
            return this.decorate(
                new SVGText(content, options)
            );
        },

        createRect: function(box, style) {
            return this.decorate(
                new SVGLine(box.points(), true, style)
            );
        },

        createLine: function(x1, y1, x2, y2, options) {
            return this.decorate(
                new SVGLine([new Point2D(x1, y1),
                             new Point2D(x2, y2)], false, options)
            );
        },

        createPolyline: function(points, closed, options) {
            return this.decorate(
                new SVGLine(points, closed, options)
            );
        },

        createCircle: function(center, radius, options) {
            return this.decorate(
                new SVGCircle(center, radius, options)
            );
        },

        createSector: function(sector, options) {
            return this.decorate(
                new SVGSector(sector, options)
            );
        },

        createGradient: function(options) {
            if (options.type === RADIAL) {
                return new SVGRadialGradient(options);
            } else {
                return new SVGLinearGradient(options)
            }
        },

        alignToScreen: function(element) {
            try {
                var ctm = element.getScreenCTM ? element.getScreenCTM() : null;
            } catch (e) { }

            if (ctm) {
                var left = - ctm.e % 1,
                    top = - ctm.f % 1,
                    style = element.style;

                if (left !== 0 || top !== 0) {
                    style.left = left + "px";
                    style.top = top + "px";
                }
            }
        }
    });

    // Primitives =============================================================
    var SVGText = ViewElement.extend({
        init: function(content, options) {
            var text = this;
            ViewElement.fn.init.call(text, options);

            text.content = content;
            text.template = SVGText.template;
            if (!text.template) {
                text.template = SVGText.template = template(
                    "<text #= d.renderAttr(\"id\", d.options.id) # " +
                    "x='#= Math.round(d.options.x) #' " +
                    "y='#= Math.round(d.options.y + d.options.baseline) #' " +
                    "fill-opacity='#= d.options.fillOpacity #' " +
                    "#= d.options.rotation ? d.renderRotation() : '' # " +
                    "style='font: #= d.options.font #' fill='#= d.options.color #'>" +
                    "#= d.content #</text>"
                );
            }
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

        refresh: function(domElement) {
            var options = this.options;

            $(domElement).attr({
                "fill-opacity": options.fillOpacity
            });
        },

        clone: function() {
            var text = this;
            return new SVGText(text.content, deepExtend({}, text.options));
        },

        renderRotation: function() {
            var text = this,
                options = text.options,
                size = options.size,
                cx = round(options.x + size.normalWidth / 2, COORD_PRECISION),
                cy = round(options.y + size.normalHeight / 2, COORD_PRECISION),
                rcx = round(options.x + size.width / 2, COORD_PRECISION),
                rcy = round(options.y + size.height / 2, COORD_PRECISION),
                offsetX = round(rcx - cx, COORD_PRECISION),
                offsetY = round(rcy - cy, COORD_PRECISION);

            return "transform='translate(" + offsetX + "," + offsetY + ") " +
                   "rotate(" + options.rotation + "," + cx + "," + cy + ")'";
        }
    });

    var SVGPath = ViewElement.extend({
        init: function(options) {
            var path = this;
            ViewElement.fn.init.call(path, options);

            path.template = SVGPath.template;
            if (!path.template) {
                path.template = SVGPath.template = template(
                    "<path #= d.renderAttr(\"id\", d.options.id) #" +
                    "d='#= d.renderPoints() #' " +
                    "#= d.renderAttr(\"stroke\", d.options.stroke) # " +
                    "#= d.renderAttr(\"stroke-width\", d.options.strokeWidth) #" +
                    "#= d.renderDashType() # " +
                    "stroke-linecap='#= d.renderLinecap() #' " +
                    "fill-opacity='#= d.options.fillOpacity #' " +
                    "stroke-opacity='#= d.options.strokeOpacity #' " +
                    "fill='#= d.options.fill || \"none\" #'></path>"
                );
            }
        },

        options: {
            fill: "",
            fillOpacity: 1,
            strokeOpacity: 1
        },

        refresh: function(domElement) {
            var options = this.options;

            $(domElement).attr({
                "d": this.renderPoints(),
                "fill-opacity": options.fillOpacity,
                "stroke-opacity": options.strokeOpacity
            });
        },

        clone: function() {
            var path = this;
            return new SVGPath(deepExtend({}, path.options));
        },

        renderPoints: function() {
            // Overriden by inheritors
        },

        renderDashType: function () {
            var path = this,
                options = path.options;

            return renderSVGDash(options.dashType, options.strokeWidth);
        },

        renderLinecap: function() {
            var dashType = this.options.dashType;

            return (dashType && dashType != "solid") ? "butt" : "square";
        }
    });

    var SVGLine = SVGPath.extend({
        init: function(points, closed, options) {
            var line = this;
            SVGPath.fn.init.call(line, options);

            line.points = points;
            line.closed = closed;
        },

        renderPoints: function() {
            var line = this,
                points = line.points,
                i,
                count = points.length,
                first = points[0],
                result = "M" + line._print(first);

            for (i = 1; i < count; i++) {
                result += " " + line._print(points[i]);
            }

            if (line.closed) {
                result += " z";
            }

            return result;
        },

        clone: function() {
            var line = this;
            return new SVGLine(
                deepExtend([], line.points), line.closed,
                deepExtend({}, line.options)
            );
        },

        _print: function(point) {
            var line = this,
                strokeWidth = line.options.strokeWidth,
                shouldAlign = strokeWidth && strokeWidth % 2 !== 0,
                align = shouldAlign ? alignToPixel : math.round;

            return align(point.x) + " " + align(point.y);
        }
    });

    var SVGSector = SVGPath.extend({
        init: function(circleSector, options) {
            var sector = this;
            SVGPath.fn.init.call(sector, options);

            sector.pathTemplate = SVGSector.pathTemplate;
            if (!sector.pathTemplate) {
                sector.pathTemplate = SVGSector.pathTemplate = template(
                    "M #= d.firstPoint.x # #= d.firstPoint.y # " +
                    "A#= d.r # #= d.r # " +
                    "0 #= d.isReflexAngle ? '1' : '0' #,1 " +
                    "#= d.secondPoint.x # #= d.secondPoint.y # " +
                    "L #= d.cx # #= d.cy # z"
                );
            }

            sector.circleSector = circleSector || {};
        },

        options: {
            fill: "",
            fillOpacity: 1,
            strokeOpacity: 1,
            strokeLineCap: SQUARE
        },

        clone: function() {
            var sector = this;
            return new SVGSector(
                deepExtend({}, sector.circleSector),
                deepExtend({}, sector.options)
            );
        },

        renderPoints: function() {
            var sector = this,
                circleSector = sector.circleSector,
                startAngle = circleSector.startAngle,
                endAngle = circleSector.angle + startAngle,
                endAngle = (endAngle - startAngle) == 360 ? endAngle - 0.001 : endAngle,
                isReflexAngle = (endAngle - startAngle) > 180,
                r = math.max(circleSector.r, 0),
                cx = circleSector.c.x,
                cy = circleSector.c.y,
                firstPoint = circleSector.point(startAngle),
                secondPoint = circleSector.point(endAngle);

            return sector.pathTemplate({
                firstPoint: firstPoint,
                secondPoint: secondPoint,
                isReflexAngle: isReflexAngle,
                r: r,
                cx: cx,
                cy: cy
            });
        }
    });

    var SVGCircle = ViewElement.extend({
        init: function(center, radius, options) {
            var circle = this;
            ViewElement.fn.init.call(circle, options);

            circle.center = center;
            circle.radius = radius;

            circle.template = SVGCircle.template;
            if (!circle.template) {
                circle.template = SVGCircle.template = template(
                    "<circle #= d.renderAttr(\"id\", d.options.id) # " +
                    "cx='#= d.center[0] #' cy='#= d.center[1] #' " +
                    "r='#= d.radius #' " +
                    "#= d.renderAttr(\"stroke\", d.options.stroke) # " +
                    "#= d.renderAttr(\"stroke-width\", d.options.strokeWidth) #" +
                    "fill-opacity='#= d.options.fillOpacity #' " +
                    "stroke-opacity='#= d.options.strokeOpacity #'  " +
                    "fill='#= d.options.fill || \"none\" #'></circle>"
                );
            }
        },

        options: {
            fill: "",
            fillOpacity: 1,
            strokeOpacity: 1
        }
    });

    var SVGGroup = ViewElement.extend({
        init: function(options) {
            var group = this;
            ViewElement.fn.init.call(group, options);

            group.template = SVGGroup.template;
            if (!group.template) {
                group.template = SVGGroup.template =
                template("<g#= d.renderAttr(\"id\", d.options.id) #" +
                           "#= d.renderAttr(\"clip-path\", d.options.clipPath) #>" +
                         "#= d.renderContent() #</g>");
            }
        }
    });

    var SVGClipPath = ViewElement.extend({
        init: function(options) {
            var clip = this;
            ViewElement.fn.init.call(clip, options);

            clip.template = SVGClipPath.template;
            if (!clip.template) {
                clip.template = SVGClipPath.template =
                template("<clipPath#= d.renderAttr(\"id\", d.options.id) #>" +
                         "#= d.renderContent() #</clipPath>");
            }
        }
    });

    var SVGLinearGradient = ViewElement.extend({
        init: function(options) {
            var gradient = this;
            ViewElement.fn.init.call(gradient, options);

            gradient.template = SVGLinearGradient.template;
            gradient.stopTemplate = SVGLinearGradient.stopTemplate;
            if (!gradient.template) {
                gradient.template = SVGLinearGradient.template = template(
                    "<linearGradient id='#= d.options.id #' " +
                    "gradientTransform='rotate(#= d.options.rotation #)'> " +
                    "#= d.renderStops() #" +
                    "</linearGradient>"
                );

                gradient.stopTemplate = SVGLinearGradient.stopTemplate = template(
                    "<stop offset='#= Math.round(d.offset * 100) #%' " +
                    "style='stop-color:#= d.color #;stop-opacity:#= d.opacity #' />");
            }
        },

        options: {
            id: "",
            rotation: 0
        },

        renderStops: function() {
            var gradient = this,
                stops = gradient.options.stops,
                stopTemplate = gradient.stopTemplate,
                i,
                length = stops.length,
                currentStop,
                output = '';

            for (i = 0; i < length; i++) {
                currentStop = stops[i];
                output += stopTemplate(currentStop);
            }

            return output;
        }
    });

    var SVGRadialGradient = ViewElement.extend({
        init: function(options) {
            var gradient = this;

            ViewElement.fn.init.call(gradient, options);

            gradient.template = SVGRadialGradient.template;
            gradient.stopTemplate = SVGRadialGradient.stopTemplate;
            if (!gradient.template) {
                gradient.template = SVGRadialGradient.template = template(
                    "<radialGradient id='#= d.options.id #' " +
                    "cx='#= d.options.cx #' cy='#= d.options.cy #' " +
                    "fx='#= d.options.cx #' fy='#= d.options.cy #' " +
                    "r='#= d.options.r #' gradientUnits='userSpaceOnUse'>" +
                    "#= d.renderStops() #" +
                    "</radialGradient>"
                );

                gradient.stopTemplate = SVGRadialGradient.stopTemplate = template(
                    "<stop offset='#= Math.round(d.offset * 100) #%' " +
                    "style='stop-color:#= d.color #;stop-opacity:#= d.opacity #' />");
            }
        },

        options: {
            id: "",
            rotation: 0
        },

        renderStops: function() {
            var gradient = this,
                stops = gradient.options.stops,
                stopTemplate = gradient.stopTemplate,
                length = stops.length,
                currentStop,
                output = '',
                i;

            for (i = 0; i < length; i++) {
                currentStop = stops[i];
                output += stopTemplate(currentStop);
            }

            return output;
        }
    });

    // Decorators =============================================================
    function SVGOverlayDecorator(view) {
        this.view = view;
    }

    SVGOverlayDecorator.prototype = {
        decorate: function(element) {
            var decorator = this,
                view = decorator.view,
                options = element.options,
                id = options.id,
                group,
                overlay;

            if (options.overlay) {
            element.options.id = uniqueId();

                group = view.createGroup();
                overlay = element.clone();

                group.children.push(element, overlay);

                overlay.options.id = id;
                overlay.options.fill = options.overlay;

            return group;
            } else {
                return element;
        }
    }
    }

    function SVGGradientDecorator(view) {
        this.view = view;
    }

    SVGGradientDecorator.prototype = {
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

            if (paint && paint.gradient) {
                overlay = view.buildGradient(paint);
                if (overlay) {
                overlayId = overlay.id;
                gradient = definitions[overlayId];
                if (!gradient) {
                    gradient = view.createGradient(overlay);
                    definitions[overlayId] = gradient;
                }

                return "url(#" + gradient.options.id + ")";
            } else {
                    return "";
                }
            } else {
                return paint;
            }
        }
    };

    var SVGClipAnimationDecorator = Class.extend({
        init: function(view) {
            this.view = view;
        },

        decorate: function(element) {
            var decorator = this,
                view = decorator.view,
                options = view.options,
                animation = element.options.animation,
                definitions = view.definitions,
                clipPath = definitions[GLOBAL_CLIP],
                clipRect;

            if (animation && animation.type === CLIP && options.transitions) {
                if (!clipPath) {
                    clipPath = new SVGClipPath({ id: GLOBAL_CLIP });
                    clipRect = view.createRect(
                        new Box2D(0, 0, 0, options.height), { id: uniqueId() });
                    clipPath.children.push(clipRect);
                    definitions[GLOBAL_CLIP] = clipPath;

                    view.animations.push(
                        new ExpandAnimation(clipRect, { size: options.width })
                    );
                }

                element.options.clipPath = "url(#" + GLOBAL_CLIP + ")";
            }

            return element;
        }
    });

    // Helpers ================================================================
    function alignToPixel(coord) {
        return math.round(coord) + 0.5;
    }

    function renderSVGDash(dashType, strokeWidth) {
        var result = [],
            dashType = dashType ? dashType.toLowerCase() : null,
            dashTypeArray,
            i;

        if (dashType && dashType != "solid" && strokeWidth) {
            dashTypeArray = SVG_DASH_TYPE[dashType];
            for (i = 0; i < dashTypeArray.length; i++) {
                result.push(dashTypeArray[i] * strokeWidth);
            }

            return "stroke-dasharray='" + result.join(" ") + "' ";
        }

        return "";
    }

    function renderSVG(container, svg) {
        container.innerHTML = svg;
    }

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
    deepExtend(Chart, {
        SVGView: SVGView,
        SVGText: SVGText,
        SVGPath: SVGPath,
        SVGLine: SVGLine,
        SVGSector: SVGSector,
        SVGCircle: SVGCircle,
        SVGGroup: SVGGroup,
        SVGClipPath: SVGClipPath,
        SVGLinearGradient: SVGLinearGradient,
        SVGRadialGradient: SVGRadialGradient,
        SVGOverlayDecorator: SVGOverlayDecorator,
        SVGGradientDecorator: SVGGradientDecorator,
        SVGClipAnimationDecorator: SVGClipAnimationDecorator
    });

})(jQuery);
