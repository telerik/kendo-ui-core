(function () {

    // Imports ================================================================
    var $ = jQuery,
        doc = document,
        math = Math,

        kendo = window.kendo,
        Class = kendo.Class,
        deepExtend = kendo.deepExtend,

        dataviz = kendo.dataviz,
        Color = dataviz.Color,
        Box2D = dataviz.Box2D,
        Point2D = dataviz.Point2D,
        ExpandAnimation = dataviz.ExpandAnimation,
        ViewBase = dataviz.ViewBase,
        ViewElement = dataviz.ViewElement,
        defined = dataviz.defined,
        renderTemplate = dataviz.renderTemplate,
        uniqueId = dataviz.uniqueId,
        rotatePoint = dataviz.rotatePoint,
        round = dataviz.round,
        supportsSVG = dataviz.supportsSVG;

    // Constants ==============================================================
    var BLACK = "#000",
        CLIP = dataviz.CLIP,
        COORD_PRECISION = dataviz.COORD_PRECISION,
        DEFAULT_WIDTH = dataviz.DEFAULT_WIDTH,
        DEFAULT_HEIGHT = dataviz.DEFAULT_HEIGHT,
        DEFAULT_FONT = dataviz.DEFAULT_FONT,
        OBJECT = "object",
        LINEAR = "linear",
        RADIAL = "radial",
        TRANSPARENT = "transparent";

    // View ===================================================================
    var VMLView = ViewBase.extend({
        init: function(options) {
            var view = this;
            ViewBase.fn.init.call(view, options);

            view.decorators.push(
                new VMLOverlayDecorator(view),
                new VMLGradientDecorator(view)
            );

            if (dataviz.ui.Chart) {
                view.decorators.push(
                    new dataviz.BarAnimationDecorator(view),
                    new dataviz.PieAnimationDecorator(view),
                    new dataviz.BubbleAnimationDecorator(view)
                );
            }

            view.decorators.push(
                new VMLClipAnimationDecorator(view)
            );

            if (!isIE9CompatibilityView()) {
                // Setting opacity on VML elements is broken in
                // IE9 Compatibility View
                view.decorators.push(
                    new dataviz.FadeAnimationDecorator(view)
                );
            }

            if (dataviz.Gauge) {
                view.decorators.push(
                    new dataviz.RadialPointerAnimationDecorator(view),
                    new dataviz.ArrowPointerAnimationDecorator(view),
                    new dataviz.BarIndicatorAnimationDecorator(view)
                );
            }

            view.template = VMLView.template;
            if (!view.template) {
                view.template = VMLView.template = renderTemplate(
                    "<div style='width:#= d.options.width #px; " +
                    "height:#= d.options.height #px; " +
                    "position: relative;'>" +
                    "#= d.renderContent() #</div>"
                );
            }
        },

        options: {
            width: DEFAULT_WIDTH,
            height: DEFAULT_HEIGHT
        },

        renderTo: function(container) {
            var view = this;

            if (doc.namespaces) {
                doc.namespaces.add("kvml", "urn:schemas-microsoft-com:vml", "#default#VML");
            }

            view.setupAnimations();
            container.innerHTML = view.render();
            view.playAnimations();

            return container.firstChild;
        },

        renderElement: function(element) {
            var container = doc.createElement("div"),
                domElement;

            container.style.display = "none";
            doc.body.appendChild(container);
            container.innerHTML = element.render();

            domElement = container.firstChild;
            doc.body.removeChild(container);

            return domElement;
        },

        createText: function(content, options) {
            return this.decorate(
                (options && options.rotation) ?
                    new VMLRotatedText(content, options) :
                    new VMLText(content, options)
            );
        },

        createRect: function(box, style) {
            return this.decorate(
                new VMLLine(box.points(), true, style)
            );
        },

        createLine: function(x1, y1, x2, y2, options) {
            return this.decorate(
                new VMLLine([new Point2D(x1, y1),
                    new Point2D(x2, y2)], false, options)
            );
        },

        createPolyline: function(points, closed, options) {
            return this.decorate(
                new VMLLine(points, closed, options)
            );
        },

        createCircle: function(center, radius, options) {
            return this.decorate(
                new VMLCircle(center, radius, options)
            );
        },

        createSector: function(sector, options) {
            return this.decorate(
                new VMLSector(sector, options)
            );
        },

        createRing: function(ring, options) {
            return this.decorate(
                new VMLRing(ring, options)
            );
        },

        createGroup: function(options) {
            return this.decorate(
                new VMLGroup(options)
            );
        },

        createGradient: function(options) {
            var validRadial = defined(options.cx) && defined(options.cy) && defined(options.bbox);

            if (options.type === RADIAL && validRadial) {
                return new VMLRadialGradient(options);
            } else if (options.type === LINEAR) {
                return new VMLLinearGradient(options);
            } else {
                return BLACK;
            }
        }
    });

    VMLView.fromModel = function(model) {
        var view = new VMLView(model.options);
        [].push.apply(view.children, model.getViewElements(view));

        return view;
    };

    VMLView.available = function() {
        return kendo.support.browser.msie;
    };

    VMLView.preference = 50;

    dataviz.ui.registerView(VMLView);

    // Primitives =============================================================
    var VMLText = ViewElement.extend({
        init: function(content, options) {
            var text = this;
            ViewElement.fn.init.call(text, options);

            text.content = content;
            text.template = VMLText.template;
            if (!text.template) {
                text.template = VMLText.template = renderTemplate(
                    "<kvml:textbox #= d.renderAttr(\"id\", d.options.id) # " +
                    "#= d.renderDataAttributes() #" +
                    "style='position: absolute; " +
                    "left: #= d.options.x #px; top: #= d.options.y #px; " +
                    "font: #= d.options.font #; color: #= d.options.color #; " +
                    "visibility: #= d.renderVisibility() #; white-space: nowrap;'>" +
                    "#= d.content #</kvml:textbox>"
                );
            }
        },

        options: {
            x: 0,
            y: 0,
            font: DEFAULT_FONT,
            color: BLACK,
            fillOpacity: 1
        },

        refresh: function(domElement) {
            $(domElement).css("visibility", this.renderVisibility());
        },

        clone: function() {
            var text = this;
            return new VMLText(text.content, deepExtend({}, text.options));
        },

        renderVisibility: function() {
            return this.options.fillOpacity > 0 ? "visible" : "hidden";
        }
    });

    var VMLRotatedText = ViewElement.extend({
        init: function(content, options) {
            var text = this;
            ViewElement.fn.init.call(text, options);

            text.content = content;
            text.template = VMLRotatedText.template;
            if (!text.template) {
                text.template = VMLRotatedText.template = renderTemplate(
                    "<kvml:shape #= d.renderAttr(\"id\", d.options.id) # " +
                    "#= d.renderDataAttributes() #" +
                    "style='position: absolute; top: 0px; left: 0px; " +
                    "width: 1px; height: 1px;' stroked='false' coordsize='1,1'>" +
                    "#= d.renderPath() #" +
                    "<kvml:fill color='#= d.options.color #' />" +
                    "<kvml:textpath on='true' style='font: #= d.options.font #;' " +
                    "fitpath='false' string='#= d.content #' /></kvml:shape>"
                );
            }
        },

        options: {
            x: 0,
            y: 0,
            font: DEFAULT_FONT,
            color: BLACK,
            size: {
                width: 0,
                height: 0
            }
        },

        renderPath: function() {
            var text = this,
                options = text.options,
                width = options.size.width,
                height = options.size.height,
                cx = options.x + width / 2,
                cy = options.y + height / 2,
                angle = -options.rotation,
                r1 = rotatePoint(options.x, cy, cx, cy, angle),
                r2 = rotatePoint(options.x + width, cy, cx, cy, angle);

            return "<kvml:path textpathok='true' " +
                   "v='m " + round(r1.x) + "," + round(r1.y) +
                   " l " + round(r2.x) + "," + round(r2.y) +
                   "' />";
        }
    });

    var VMLStroke = ViewElement.extend({
        init: function(options) {
            var stroke = this;
            ViewElement.fn.init.call(stroke, options);

            stroke.template = VMLStroke.template;
            if (!stroke.template) {
                stroke.template = VMLStroke.template = renderTemplate(
                    "<kvml:stroke on='#= !!d.options.stroke #' " +
                    "#= d.renderAttr(\"color\", d.options.stroke) #" +
                    "#= d.renderAttr(\"weight\", d.options.strokeWidth) #" +
                    "#= d.renderAttr(\"dashstyle\", d.options.dashType) #" +
                    "#= d.renderAttr(\"opacity\", d.options.strokeOpacity) # />"
                );
            }
        },

        refresh: function(domElement) {
            try {
              domElement.opacity = this.options.strokeOpacity;
            } catch(e) {
              // Random exceptions in IE 8 Compatibility View
            }
        }
    });

    var VMLFill = ViewElement.extend({
        init: function(options) {
            var stroke = this;
            ViewElement.fn.init.call(stroke, options);

            stroke.template = VMLFill.template;
            if (!stroke.template) {
                stroke.template = VMLFill.template = renderTemplate(
                    "<kvml:fill on='#= d.isEnabled() #' " +
                    "#= d.renderAttr(\"color\", d.options.fill) #" +
                    "#= d.renderAttr(\"weight\", d.options.fillWidth) #" +
                    "#= d.renderAttr(\"opacity\", d.options.fillOpacity) # />"
                );
            }
        },

        isEnabled: function() {
            var fill = this.options.fill;
            return !!fill && fill.toLowerCase() !== TRANSPARENT;
        },

        refresh: function(domElement) {
            try {
              domElement.opacity = this.options.fillOpacity;
            } catch(e) {
              // Random exceptions in IE 8 Compatibility View
            }
        }
    });

    var VMLPath = ViewElement.extend({
        init: function(options) {
            var path = this;
            ViewElement.fn.init.call(path, options);

            path.template = VMLPath.template;
            if (!path.template) {
                path.template = VMLPath.template = renderTemplate(
                    "<kvml:shape #= d.renderAttr(\"id\", d.options.id) # " +
                    "#= d.renderDataAttributes() #" +
                    "style='position:absolute; #= d.renderSize() #' " +
                    "coordorigin='0 0' #= d.renderCoordsize() # >" +
                        "<kvml:path v='#= d.renderPoints() # e' />" +
                        "#= d.fill.render() + d.stroke.render() #" +
                    "</kvml:shape>"
                );
            }

            path.stroke = new VMLStroke(path.options);
            path.fill = new VMLFill(path.options);
        },

        options: {
            fill: "",
            fillOpacity: 1,
            strokeOpacity: 1,
            rotation: [0,0,0]
        },

        renderCoordsize: function() {
            var scale = this.options.align === false ?  10000 : 1;
            return "coordsize='" + scale + " " + scale + "'";
        },

        renderSize: function() {
            var scale = this.options.align === false ?  100 : 1;
            return "width:" + scale + "px; height:" + scale + "px;";
        },

        render: function() {
            var path = this;
            path.fill.options.fillOpacity = path.options.fillOpacity;
            path.stroke.options.strokeOpacity = path.options.strokeOpacity;

            return ViewElement.fn.render.call(path);
        },

        renderPoints: function() {
            // Overriden by inheritors
        },

        refresh: function(domElement) {
            if (!domElement) {
                return;
            }

            var path = this,
                element = $(domElement),
                parentNode = element[0].parentNode,
                fill = path.fill,
                stroke = path.stroke;

            if (parentNode) {
                element.find("path")[0].v = this.renderPoints();

                fill.options = stroke.options = path.options;
                fill.refresh(element.find("fill")[0]);
                stroke.refresh(element.find("stroke")[0]);

                // Force redraw in order to remove artifacts in IE < 7
                parentNode.style.cssText = parentNode.style.cssText;
            }
        }
    });

    var VMLLine = VMLPath.extend({
        init: function(points, closed, options) {
            var line = this;
            VMLPath.fn.init.call(line, options);

            line.points = points;
            line.closed = closed;
        },

        renderPoints: function() {
            var line = this,
                points = line.points,
                i,
                count = points.length,
                rotate = function(point) {
                    var rotation = line.options.rotation;
                    return rotatePoint(point.x, point.y, rotation[1], rotation[2], -rotation[0]);
                },
                result = "m " + line._print(rotate(points[0]));

            if (count > 1) {
                result += " l ";

                for (i = 1; i < count; i++) {
                    result += line._print(rotate(points[i]));

                    if (i < count - 1) {
                        result += ", ";
                    }
                }
            }

            if (line.closed) {
                result += " x";
            }

            return result;
        },

        clone: function() {
            var line = this;
            return new VMLLine(
                deepExtend([], line.points), line.closed,
                deepExtend({}, line.options)
            );
        },

        _print: function(point) {
            var scale = this.options.align === false ?  100 : 1;
            return math.round(point.x * scale) + "," + math.round(point.y * scale);
        }
    });

    var VMLRing = VMLPath.extend({
        init: function(config, options) {
            var ring = this;
            VMLPath.fn.init.call(ring, options);

            ring.pathTemplate = VMLRing.pathTemplate;
            if (!ring.pathTemplate) {
                ring.pathTemplate = VMLRing.pathTemplate = renderTemplate(
                   "M #= d.osp.x #,#= d.osp.y # " +
                   "WA #= d.obb.l #,#= d.obb.t # #= d.obb.r #,#= d.obb.b # " +
                      "#= d.osp.x #,#= d.osp.y # #= d.oep.x #,#= d.oep.y # " +
                   "L #= d.iep.x #,#= d.iep.y # " +
                   "AT #= d.ibb.l #,#= d.ibb.t # #= d.ibb.r #,#= d.ibb.b # " +
                      "#= d.iep.x #,#= d.iep.y # #= d.isp.x #,#= d.isp.y # " +
                   "X E"
                );
            }

            ring.config = config;
        },

        renderPoints: function() {
            var ring = this,
                config = ring.config,
                r = math.max(round(config.r), 0),
                ir = math.max(round(config.ir), 0),
                cx = round(config.c.x),
                cy = round(config.c.y),
                startAngle = config.startAngle,
                endAngle = config.angle + startAngle,
                angle = endAngle - startAngle,
                outerBBox = {
                    l: cx - r,
                    t: cy - r,
                    r: cx + r,
                    b: cy + r
                },
                innerBBox = {
                    l: cx - ir,
                    t: cy - ir,
                    r: cx + ir,
                    b: cy + ir
                },
                outerStartPoint, innerStartPoint,
                innerEndPoint, outerEndPoint;

            function roundPointCoordinates(point) {
                return new Point2D(round(point.x), round(point.y));
            }

            if (angle <= 1) {
                endAngle += 1 - angle;
            } else if (angle > 359) {
                endAngle -= 1 - angle;
            }

            outerStartPoint = roundPointCoordinates(config.point(startAngle)),
            innerStartPoint = roundPointCoordinates(config.point(startAngle, true)),
            outerEndPoint = roundPointCoordinates(config.point(endAngle));
            innerEndPoint = roundPointCoordinates(config.point(endAngle, true));

            return ring.pathTemplate({
                obb: outerBBox,
                ibb: innerBBox,
                osp: outerStartPoint,
                isp: innerStartPoint,
                oep: outerEndPoint,
                iep: innerEndPoint,
                cx: cx,
                cy: cy
            });
        },

        clone: function() {
            var sector = this;
            return new VMLRing(
                deepExtend({}, sector.config),
                deepExtend({}, sector.options)
            );
        }
    });

    var VMLSector = VMLRing.extend({
        init: function(config, options) {
            var sector = this;
            VMLRing.fn.init.call(sector, config, options);

            sector.pathTemplate = VMLSector.pathTemplate;
            if (!sector.pathTemplate) {
                sector.pathTemplate = VMLSector.pathTemplate = renderTemplate(
                   "M #= d.osp.x #,#= d.osp.y # " +
                   "WA #= d.obb.l #,#= d.obb.t # #= d.obb.r #,#= d.obb.b # " +
                      "#= d.osp.x #,#= d.osp.y # #= d.oep.x #,#= d.oep.y # " +
                   "L #= d.cx #,#= d.cy # " +
                   "X E"
                );
            }
        },

        clone: function() {
            var sector = this;
            return new VMLSector(
                deepExtend({}, sector.config),
                deepExtend({}, sector.options)
            );
        }
    });

    var VMLCircle = ViewElement.extend({
        init: function(c, r, options) {
            var circle = this;
            ViewElement.fn.init.call(circle, options);

            circle.c = c;
            circle.r = r;

            circle.template = VMLCircle.template;
            if (!circle.template) {
                circle.template = VMLCircle.template = renderTemplate(
                    "<kvml:oval #= d.renderAttr(\"id\", d.options.id) # " +
                            "#= d.renderDataAttributes() #" +
                            "style='position:absolute; " +
                            "width:#= d.r * 2 #px; height:#= d.r * 2 #px; " +
                            "top:#= d.c.y - d.r #px; " +
                            "left:#= d.c.x - d.r #px;'>" +
                        "#= d.fill.render() + d.stroke.render() #" +
                    "</kvml:oval>"
                );
            }

            circle.stroke = new VMLStroke(circle.options);
            circle.fill = new VMLFill(circle.options);
        },

        options: {
            fill: ""
        },

        refresh: function(domElement) {
            var circle = this,
                c = circle.c,
                r = math.max(0, circle.r),
                size = r * 2,
                element = $(domElement);

            element.css({
                "width": size,
                "height": size,
                "top": c.y - r,
                "left": c.x - r
            });

            circle.fill.options = circle.options;
            circle.fill.refresh(element.find("fill")[0]);
        },

        clone: function() {
            var circle = this;
            return new VMLCircle(
                deepExtend({}, circle.c),
                circle.r,
                deepExtend({}, circle.options)
            );
        }
    });

    var VMLGroup = ViewElement.extend({
        init: function(options) {
            var group = this;
            ViewElement.fn.init.call(group, options);

            group.template = VMLGroup.template;
            if (!group.template) {
                group.template = VMLGroup.template = renderTemplate(
                    "<div #= d.renderAttr(\"id\", d.options.id) #" +
                    "#= d.renderDataAttributes() #" +
                    "style='position: absolute; white-space: nowrap;'>" +
                    "#= d.renderContent() #</div>"
                );
            }
        }
    });

    var VMLClipRect = ViewElement.extend({
        init: function(box, options) {
            var clipRect = this;
            ViewElement.fn.init.call(clipRect, options);

            clipRect.template = VMLClipRect.template;
            clipRect.clipTemplate = VMLClipRect.clipTemplate;
            if (!clipRect.template) {
                clipRect.template = VMLClipRect.template = renderTemplate(
                    "<div #= d.renderAttr(\"id\", d.options.id) #" +
                        "style='position:absolute; " +
                        "width:#= d.box.width() #px; height:#= d.box.height() #px; " +
                        "top:#= d.box.y1 #px; " +
                        "left:#= d.box.x1 #px; " +
                        "clip:#= d._renderClip() #;' >" +
                    "#= d.renderContent() #</div>"
                );

                clipRect.clipTemplate = VMLClipRect.clipTemplate = renderTemplate(
                    "rect(#= d.points[0].y #px #= d.points[1].x #px " +
                         "#= d.points[2].y #px #= d.points[0].x #px)"
                );
            }

            clipRect.box = box;

            // Points defining the clipping rectangle
            clipRect.points = box.points();
        },

        clone: function() {
            var clipRect = this;
            return new VMLClipRect(
                clipRect.box, deepExtend({}, clipRect.options)
            );
        },

        refresh: function(domElement) {
            domElement.style.clip = this._renderClip();
        },

        _renderClip: function() {
            return this.clipTemplate(this);
        },

        destroy: function() {
            $("#" + this.options.id + ">*").unwrap();
        }
    });

    var VMLGradient = ViewElement.extend({
        init: function(options) {
            var gradient = this;
            ViewElement.fn.init.call(gradient, options);
        },

        options: {
            opacity: 1
        },

        renderColors: function() {
            var gradient = this,
                options = gradient.options,
                stops = options.stops,
                currentStop,
                i,
                length = stops.length,
                output = [],
                round = math.round;

            for (i = 0; i < length; i++) {
                currentStop = stops[i];
                output.push(
                    round(currentStop.offset * 100) + "% " +
                    currentStop.color
                );
            }

            return output.join(",");
        }
    });

    var VMLLinearGradient = VMLGradient.extend({
        init: function(options) {
            var gradient = this;
            VMLGradient.fn.init.call(gradient, options);

            gradient.template = VMLLinearGradient.template;
            if (!gradient.template) {
                gradient.template = VMLLinearGradient.template = renderTemplate(
                    "<kvml:fill type='gradient' angle='#= 270 - d.options.rotation #' " +
                    "colors='#= d.renderColors() #' opacity='#= d.options.opacity #' />"
                );
            }
        },

        options: {
            rotation: 0
        }
    });

    var VMLRadialGradient = VMLGradient.extend({
        init: function(options) {
            var gradient = this;
            VMLGradient.fn.init.call(gradient, options);

            gradient.template = VMLRadialGradient.template;
            if (!gradient.template) {
                gradient.template = VMLRadialGradient.template = renderTemplate(
                    "<kvml:fill type='gradienttitle' focus='100%' focusposition='#= d.focusPosition() #'" +
                    "colors='#= d.renderColors() #' color='#= d.firstColor() #' color2='#= d.lastColor() #' opacity='#= d.options.opacity #' />"
                );
            }
        },

        focusPosition: function() {
            var options = this.options,
                bbox = options.bbox,
                cx = options.cx,
                cy = options.cy,
                focusx = Math.max(0, Math.min(1, (cx - bbox.x1) / bbox.width())),
                focusy = Math.max(0, Math.min(1, (cy - bbox.y1) / bbox.height()));

            return round(focusx, COORD_PRECISION) + " " +
                   round(focusy, COORD_PRECISION);
        },

        firstColor: function() {
            var stops = this.options.stops;
            return stops[0].color;
        },

        lastColor: function() {
            var stops = this.options.stops;
            return stops[stops.length - 1].color;
        }
    });

    // Decorators =============================================================
    function VMLOverlayDecorator(view) {
        this.view = view;
    }

    VMLOverlayDecorator.prototype = {
        decorate: function(element) {
            var options = element.options,
                view = this.view,
                overlay,
                bbox;

            if (options.overlay) {
                bbox = options.overlay.bbox;
                overlay = view.buildGradient(
                    deepExtend({}, options.overlay, {
                        // Make the gradient definition unique for this color
                        _overlayFill: options.fill,
                        // and for the radial gradient bounding box, if specified
                        _bboxHash: defined(bbox) ? bbox.getHash() : ""
                    })
                );
            }

            if (!overlay) {
                return element;
            }

            delete options.overlay;
            options.fill = deepExtend(
                blendGradient(options.fill, overlay),
                { opacity: options.fillOpacity }
            );

            return element;
        }
    };

    function VMLGradientDecorator(view) {
        this.view = view;
    }

    VMLGradientDecorator.prototype = {
        decorate: function(element) {
            var decorator = this,
                view = decorator.view,
                options = element.options,
                fill = options.fill;

            if (fill && fill.supportVML !== false) {
                if (fill.gradient) {
                    fill = view.buildGradient(fill);
                }

                if (typeof fill === OBJECT) {
                    element.fill = view.createGradient(fill);
                }
            }

            return element;
        }
    };

    var VMLClipAnimationDecorator = Class.extend({
        init: function(view) {
            this.view = view;
        },

        decorate: function(element) {
            var decorator = this,
                view = decorator.view,
                options = view.options,
                animation = element.options.animation,
                clipRect;

            if (animation && animation.type === CLIP && options.transitions) {
                clipRect = new VMLClipRect(
                    new Box2D(0, 0, options.width, options.height),
                    { id: uniqueId() }
                );

                view.animations.push(
                    new ExpandAnimation(clipRect, { size: options.width })
                );

                clipRect.children.push(element);

                return clipRect;
            } else {
                return element;
            }
        }
    });

    // Helpers ================================================================
    function isIE9CompatibilityView() {
        return kendo.support.browser.msie && !supportsSVG() && typeof window.performance !== "undefined";
    }

    function blendColors(base, overlay, alpha) {
        var baseColor = new Color(base),
            overlayColor = new Color(overlay),
            r = blendChannel(baseColor.r, overlayColor.r, alpha),
            g = blendChannel(baseColor.g, overlayColor.g, alpha),
            b = blendChannel(baseColor.b, overlayColor.b, alpha);

        return new Color(r, g, b).toHex();
    }

    function blendChannel(a, b, alpha) {
        return math.round(alpha * b + (1 - alpha) * a);
    }

    function blendGradient(color, gradient) {
        var srcStops = gradient.stops,
            stopsLength = srcStops.length,
            result = deepExtend({}, gradient),
            i,
            stop,
            resultStop;

        result.stops = [];

        for (i = 0; i < stopsLength; i++) {
            stop = srcStops[i];
            resultStop = result.stops[i] = deepExtend({}, srcStops[i]);
            resultStop.color = blendColors(color, stop.color, stop.opacity);
            resultStop.opacity = 0;
        }

        return result;
    }

    // Exports ================================================================
    deepExtend(dataviz, {
        VMLCircle: VMLCircle,
        VMLClipAnimationDecorator: VMLClipAnimationDecorator,
        VMLClipRect: VMLClipRect,
        VMLFill: VMLFill,
        VMLGroup: VMLGroup,
        VMLLine: VMLLine,
        VMLLinearGradient: VMLLinearGradient,
        VMLOverlayDecorator: VMLOverlayDecorator,
        VMLPath: VMLPath,
        VMLRadialGradient: VMLRadialGradient,
        VMLRing: VMLRing,
        VMLRotatedText: VMLRotatedText,
        VMLSector: VMLSector,
        VMLStroke: VMLStroke,
        VMLText: VMLText,
        VMLView: VMLView,

        blendColors: blendColors,
        blendGradient: blendGradient
    });

})(window.kendo.jQuery);
