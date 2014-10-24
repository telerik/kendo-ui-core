(function(f, define){
    define([ "./kendo.dataviz.core", "./kendo.dataviz.svg", "./kendo.dataviz.themes" ], f);
})(function(){

var __meta__ = {
    id: "dataviz.gauge",
    name: "Gauge",
    category: "dataviz",
    description: "Radial gauge.",
    depends: [ "dataviz.core", "dataviz.svg", "dataviz.themes" ]
};

(function ($, undefined) {
    
    var math = Math,
        kendo = window.kendo,
        Widget = kendo.ui.Widget,
        deepExtend = kendo.deepExtend,

        dataviz = kendo.dataviz,
        autoMajorUnit = dataviz.autoMajorUnit,
        ChartElement = dataviz.ChartElement,
        NumericAxis = dataviz.NumericAxis,
        Axis = dataviz.Axis,
        Class = kendo.Class,
        defined = dataviz.defined,
        isArray = $.isArray,
        interpolateValue = dataviz.interpolateValue,

        getSpacing = dataviz.getSpacing,
        round = dataviz.round,
        uniqueId = dataviz.uniqueId,
        geo = dataviz.geometry,
        draw = dataviz.drawing,
        Point = geo.Point,
        Circle = draw.Circle,
        Group = draw.Group,
        Path = draw.Path,
        Rect = geo.Rect,
        Text = draw.Text
        Surface = draw.Surface;

    // Constants ==============================================================
    var ANGULAR_SPEED = 150,
        ARROW = "arrow",
        ARROW_POINTER = "arrowPointer",
        BAR_INDICATOR = "barIndicator",
        BLACK = "#000",
        CAP_SIZE = 0.05,
        COORD_PRECISION = dataviz.COORD_PRECISION,
        MAX_VALUE = Number.MAX_VALUE,
        MIN_VALUE = -Number.MAX_VALUE,
        DEFAULT_HEIGHT = 200,
        DEFAULT_LINE_WIDTH = 0.5,
        DEFAULT_WIDTH = 200,
        DEFAULT_MIN_WIDTH = 60,
        DEFAULT_MIN_HEIGHT = 60,
        DEFAULT_MARGIN = 5,
        DEGREE = math.PI / 180,
        INSIDE = "inside",
        LINEAR = "linear",
        NEEDLE = "needle",
        OUTSIDE = "outside",
        RADIAL_POINTER = "radialPointer",
        ROTATION_ORIGIN = 90,
        GEO_ARC_ADJUST_ANGLE = 180;

    var Pointer = Class.extend({
        init: function(scale, options) {  
            var pointer = this;
            var scaleOptions = scale.options;

            ChartElement.fn.init.call(pointer, options);

            options = pointer.options;

            if (!options.id) {
                options.id = uniqueId();
            }

            options.fill = options.color;

            pointer.scale = scale;

            if (defined(options.value)){
                options.value = math.min(math.max(options.value, scaleOptions.min), scaleOptions.max);
            } else {
                options.value = scaleOptions.min;
            }
        },

        options: { 
            color: BLACK
        },

        value: function(newValue) {
            var that = this;
            var options = that.options;
            var value = options.value;
            var scaleOptions = that.scale.options;

            if (arguments.length === 0) {
                return value;
            }

            options._oldValue = (options._oldValue !== undefined)? options.value : scaleOptions.min;
            options.value = math.min(math.max(newValue, scaleOptions.min), scaleOptions.max);

            if (that.elements) {
                that.repaint();
            }
        }
    });

    var RadialPointer = Pointer.extend({
        options: {
            shape: NEEDLE,
            cap: {
                size: CAP_SIZE
            },
            arrow: {
                width: 16,
                height: 14
            },
            animation: {
                type: RADIAL_POINTER,
                speed: ANGULAR_SPEED
            }
        },

        setRadius: function(radius) {
            var that = this;

            if (radius) {
                that.elements.clear();
                that.render(that.parent, that.center, radius);
            }
        },

        setAngle: function(angle) {
            var that = this;
            angle += GEO_ARC_ADJUST_ANGLE;

            that.elements.transform(geo.transform().rotate(angle, that.center))
        },

        repaint: function() {
            var that = this;
            var scale = that.scale;
            var options = that.options;
            var oldAngle = scale.slotAngle(options._oldValue);
            var newAngle = scale.slotAngle(options.value);

            new RadialPointerAnimation(that.elements, deepExtend(options.animation, {
                oldAngle: oldAngle,
                newAngle: newAngle
            })).play();
        },

        render: function() {
            var that = this;
            var scale = that.scale;
            var center = scale.arc.center;
            var options = that.options;
            var minAngle = scale.slotAngle(scale.options.min);
            var elements = new Group();

            if (options.animation !== false) {
                deepExtend(options.animation, {
                    startAngle: 0,
                    center: center,
                    reverse: scale.options.reverse
                });
            }

            //TODO check if needed
            deepExtend(options, {
                rotation: [
                    scale.slotAngle(options.value) - minAngle,
                    center.x, center.y
                ]
            });

            if (options.shape === NEEDLE) {
                elements.append(
                    that._renderNeedle(),
                    that._renderCap()
                );
            } else {
                elements.append(that._renderArrow());
            }

            that.elements = elements;
            
            that.setAngle(0);

            return elements;
        },

        reflow: function(arc) {
            var that = this;
            var center = that.center = arc.center;
            var radius = that.radius = arc.getRadiusX();
            var capSize = that.capSize = radius * that.options.cap.size;

            that.bbox = Rect.fromPoints(new Point(center.x - capSize, center.y - capSize),
                                        new Point(center.x + capSize, center.y + capSize));
        },

        _renderNeedle: function() {
            var that = this;
            var options = that.options;
            var minorTickSize = that.scale.options.minorTicks.size;
            var center = that.center;
            var needleColor = options.color;

            var needlePath = new draw.Path({
                fill: { color: needleColor },
                stroke: { color: needleColor, width: 0.5 }
            });

            needlePath.moveTo(center.x + that.radius - minorTickSize, center.y)
                      .lineTo(center.x, center.y - (that.capSize / 2))
                      .lineTo(center.x, center.y + (that.capSize / 2))
                      .close();

            return needlePath;
        },

        _renderCap: function() {
            var that = this;
            var options = that.options;
            var capColor = options.cap.color || options.color;
            var circle = new geo.Circle(that.center, that.capSize);

            var cap = new draw.Circle(circle, {
               fill: { color: capColor },
               stroke: { color: capColor }
            });

            return cap;
        }
    });

    var RadialScale = NumericAxis.extend({
        init: function(options) {
            var scale = this;

            scale.options = deepExtend({}, scale.options, options);
            scale.options.majorUnit = scale.options.majorUnit || autoMajorUnit(scale.options.min, scale.options.max);

            scale.options.minorUnit = scale.options.minorUnit || scale.options.majorUnit / 10;

            Axis.fn.init.call(scale, scale.options);
        },

        options: {
            min: 0,
            max: 100,

            majorTicks: {
                size: 15,
                align: INSIDE,
                color: BLACK,
                width: DEFAULT_LINE_WIDTH,
                visible: true
            },

            minorTicks: {
                size: 10,
                align: INSIDE,
                color: BLACK,
                width: DEFAULT_LINE_WIDTH,
                visible: true
            },

            startAngle: -30,
            endAngle: 210,

            labels: {
                position: INSIDE,
                padding: 2
            }
        },

        render: function(center, radius) {
            var that = this;
            var options = that.options;
            var group = that.elements = new Group();
            var arc = that.renderArc(center, radius);

            that.bbox = arc.bbox();
            that.labelElements = that.renderLabels();
            that.ticks = that.renderTicks();
            that.ranges = that.renderRanges();
            //group.append(new Arc(arc).stroke(BLACK, 1)); //TODO remove. for testing only
            
            group.append(that.labelElements, that.ticks, that.ranges);

            return group;
        },

        reflow: function(bbox) {
            var that = this;
            var options = that.options;
            var center = bbox.center();
            var radius = math.min(bbox.height(), bbox.width()) / 2;

            if (that.elements !== undefined) {
                that.bbox = that.arc.bbox();
                that.radius(that.arc.getRadiusX());
                that.repositionRanges();
                that.renderLabels();
            } else {
                return that.render(center, radius);
            }
        },

        slotAngle: function(value) {
            var options = this.options;
            var startAngle = options.startAngle;
            var reverse = options.reverse;
            var angle = options.endAngle - startAngle;
            var min = options.min;
            var max = options.max;
            var result;

            if (reverse) {
                result = options.endAngle - (value - min) / (max - min) * angle;
            } else {
                result = ((value - min) / (max - min) * angle) + startAngle;
            }

            return result + GEO_ARC_ADJUST_ANGLE;
        },

        renderLabels: function() {
            var that = this;
            var options = that.options;
            var majorTickSize = options.majorTicks.size;
            var arc = that.arc.clone();
            var radius = arc.getRadiusX();
            var tickAngles = that.tickAngles(arc, options.majorUnit);
            var labels = that.labels;
            var count = labels.length;
            var labelsOptions = options.labels;
            var padding = labelsOptions.padding;
            var rangeDistance = radius * 0.05;
            var rangeSize = options.rangeSize = options.rangeSize || radius * 0.1;
            var ranges = options.ranges || [];
            var halfWidth, halfHeight, labelAngle;
            var angle, label, lp, i, cx, cy, isInside;
            var labelsGroup = new Group();
            var lbl, labelPos, prevLabelPos, labelTransform;

            if (that.options.rangeDistance !== undefined) {
                rangeDistance = that.options.rangeDistance;
            } else {
                that.options.rangeDistance = rangeDistance;
            }

            if (labelsOptions.position === INSIDE) {
                radius -= majorTickSize;

                if (ranges.length && that.labelElements === undefined) {
                    radius -= rangeSize + rangeDistance;
                }
                arc.setRadiusX(radius).setRadiusY(radius);
            }

            for (i = 0; i < count; i++) {
                label = labels[i];
                halfWidth = label.box.width() / 2;
                halfHeight = label.box.height() / 2;
                angle = tickAngles[i];
                labelAngle = (angle - GEO_ARC_ADJUST_ANGLE) * DEGREE;
                isInside = labelsOptions.position === INSIDE;
                lp = arc.pointAt(angle);
                cx = lp.x + (math.cos(labelAngle) * (halfWidth + padding) * (isInside ? 1 : -1));
                cy = lp.y + (math.sin(labelAngle) * (halfHeight + padding) * (isInside ? 1 : -1));

                label.reflow(new dataviz.Box2D(cx - halfWidth, cy - halfHeight,
                                               cx + halfWidth, cy + halfHeight));
                labelPos = new Point(label.box.x1, label.box.y1);

                if (that.labelElements === undefined) {
                    lbl = that.buildLabel(label);
                    labelsGroup.append(lbl);
                } else {
                    lbl = that.labelElements.children[i];
                    prevLabelPos = lbl.bbox().origin;

                    labelTransform = lbl.transform() || geo.transform();
                    labelTransform.translate(labelPos.x - prevLabelPos.x, labelPos.y - prevLabelPos.y);
                    lbl.transform(labelTransform);
                }

                that.bbox = Rect.union(that.bbox, lbl.bbox());
            }

            return labelsGroup;
        },

        buildLabel: function(label) {
            var that = this;
            var options = that.options.labels;
            var labelBox = label.box;
            var textBox = label.children[0].box;
            var border = options.border || {};
            var background = options.background || "";
            var elements = new Group();
            var styleBox, styleGeometry, wrapper;

            wrapper = Path.fromRect(new geo.Rect([labelBox.x1, labelBox.y1], [labelBox.width(), labelBox.height()]), {
                stroke: {}
            });

            var text = new Text(label.text, new Point(textBox.x1, textBox.y1), {
                font: options.font,
                fill: { color: options.color }
            });

            styleGeometry = _pad(text.bbox().clone(), options.padding);

            styleBox = Path.fromRect(styleGeometry, {
                stroke: {
                    color: border.width ? border.color : "",
                    width: border.width,
                    dashType: border.dashType,
                    lineJoin: "round",
                    lineCap: "round"
                },
                fill: {
                    color: background
                }
            });

            elements.append(wrapper);
            elements.append(styleBox);
            elements.append(text);

            return elements;
        },

        repositionRanges: function() {
            var that = this;
            var arc = that.arc;
            var ranges = that.ranges.children;
            var rangeSize = that.options.rangeSize;
            var rangeDistance = that.options.rangeDistance;
            var rangeRadius, newRadius;

            if (ranges.length > 0) {
                rangeRadius = that.getRangeRadius();

                if (that.options.labels.position === INSIDE) {
                    rangeRadius += rangeSize + rangeDistance;
                }

                newRadius = rangeRadius + (rangeSize / 2);

                for (var i = 0; i < ranges.length; i++) {
                    ranges[i]._geometry.setRadiusX(newRadius).setRadiusY(newRadius);
                }

                that.bbox = Rect.union(that.bbox, that.ranges.bbox());
            }
        },

        renderRanges: function() {
            var that = this;
            var arc = that.arc;
            var result = new Group();
            var from, to;
            var segments = that.rangeSegments();
            var segmentsCount = segments.length;
            var reverse = that.options.reverse;
            var radius = that.radius();
            var rangeSize = that.options.rangeSize;
            var rangeDistance = options.rangeDistance;
            var segment, rangeRadius, rangeGeom, i;

            if (segmentsCount) {
                rangeRadius = that.getRangeRadius();

                // move the ticks with a range distance and a range size
                that.radius(that.radius() - rangeSize - rangeDistance);

                for (i = 0; i < segmentsCount; i++) {
                    segment = segments[i];
                    from = that.slotAngle(segment[reverse ? "to": "from"]);
                    to = that.slotAngle(segment[!reverse ? "to": "from"]);

                    if (to - from !== 0) {
                        rangeGeom = new geo.Arc(arc.center, {
                            radiusX: rangeRadius + (rangeSize / 2),
                            radiusY: rangeRadius + (rangeSize / 2),
                            startAngle: from,
                            endAngle: to
                        });

                        result.append(new draw.Arc(rangeGeom, {
                                stroke: {
                                    width: rangeSize,
                                    color: segment.color,
                                    opacity: segment.opacity
                                }
                            })
                        );
                    }
                }
            }

            return result;
        },

        rangeSegments: function() {
            var gauge = this;
            var options = gauge.options;
            var ranges = options.ranges || [];
            var count = ranges.length;
            var range;
            var segmentsCount;
            var defaultColor = options.rangePlaceholderColor;
            var segments = [];
            var segment;
            var min = options.min;
            var max = options.max;
            var i, j;

            function rangeSegment(from, to, color, opacity) {
                return { from: from, to: to, color: color, opacity: opacity };
            }

            if (count) {
                segments.push(rangeSegment(min, max, defaultColor));

                for (i = 0; i < count; i++) {
                    range = getRange(ranges[i], min, max);
                    segmentsCount = segments.length;
                    for (j = 0; j < segmentsCount; j++) {
                        segment = segments[j];
                        if (segment.from <= range.from && range.from <= segment.to) {
                            segments.push(rangeSegment(range.from, range.to, range.color, range.opacity));
                            if (segment.from <= range.to && range.to <= segment.to) {
                                segments.push(rangeSegment(range.to, segment.to, defaultColor, range.opacity));
                            }
                            segment.to = range.from;
                            break;
                        }
                    }
                }
            }

            return segments;
        },

        getRangeRadius: function() {
            var that = this;
            var options = that.options;
            var majorTickSize = options.majorTicks.size;
            var rangeSize = options.rangeSize;
            var rangeDistance = options.rangeDistance;
            var arc = that.arc;
            var r;

            if (options.labels.position === OUTSIDE) {
                r = arc.getRadiusX() - majorTickSize - rangeDistance - rangeSize;
            } else {
                r = arc.getRadiusX() - rangeSize;
            }

            return r;
        },

        renderArc: function(center, radius) {
            var that = this;
            var options = that.options;

            var arc = that.arc = new geo.Arc(center, {
                    radiusX: radius,
                    radiusY: radius,
                    startAngle: options.startAngle + GEO_ARC_ADJUST_ANGLE,
                    endAngle: options.endAngle + GEO_ARC_ADJUST_ANGLE
                });

            return arc;
        },

        renderTicks: function() {
            var that = this;
            var arc = that.arc;
            var options = that.options;
            var labelsPosition = options.labels.position;
            var allTicks = new Group();
            var majorTickSize = options.majorTicks.size;
            var minorTickSize = options.minorTicks.size;
            var tickArc = arc.clone();
            var radius = tickArc.getRadiusX();

            function drawTicks(arc, tickAngles, unit, tickOptions) {
                var ticks = new Group(),
                    center = arc.center,
                    radius = arc.getRadiusX(),
                    i, tickStart, tickEnd,
                    tickSize = unit.size,
                    visible = tickOptions.visible;

                if (visible) {
                    for (i = 0; i < tickAngles.length; i++) {
                        tickStart = arc.pointAt(tickAngles[i]);
                        tickEnd = new Point(center.x + radius - tickOptions.size, center.y).rotate(tickAngles[i], center);

                        ticks.append(new Path({
                            stroke: {
                                color: tickOptions.color,
                                width: tickOptions.width
                            }
                        }).moveTo(tickStart).lineTo(tickEnd));
                    }
                }

                return ticks;
            }

            that.majorTickAngles = that.tickAngles(arc, options.majorUnit);
            that.majorTicks = drawTicks(tickArc, that.majorTickAngles, options.majorUnit, options.majorTicks);
            allTicks.append(that.majorTicks);

            that._tickDifference = majorTickSize - minorTickSize;
            if (labelsPosition === OUTSIDE) {
                tickArc.setRadiusX(radius - majorTickSize + minorTickSize)
                       .setRadiusY(radius - majorTickSize + minorTickSize);    
            }

            that.minorTickAngles = that.normalizeTickAngles(that.tickAngles(arc, options.minorUnit));
            that.minorTicks = drawTicks(tickArc, that.minorTickAngles, options.minorUnit, options.minorTicks, options.majorUnit)
            allTicks.append(that.minorTicks);

            return allTicks;
        },

        normalizeTickAngles: function(angles) {
            var that = this
                options = that.options
                skip = options.majorUnit / options.minorUnit;

            for (var i = angles.length - 1; i >= 0; i--) {
                if (i % skip === 0) {
                    angles.splice(i, 1);
                }
            }

            return angles;
        },

        tickAngles: function(ring, stepValue) {
            var scale = this;
            var options = scale.options;
            var reverse = options.reverse;
            var range = options.max - options.min;
            var angle = ring.endAngle - ring.startAngle;
            var pos = ring.startAngle;
            var tickCount = range / stepValue;
            var step = angle / tickCount;
            var positions = [];
            var i;

            if (reverse) {
                pos += angle;
                step = -step;
            }

            for (i = 0; i < tickCount ; i++) {
                positions.push(round(pos, COORD_PRECISION));
                pos += step;
            }

            if (round(pos) <= ring.endAngle) {
                positions.push(pos);
            }

            return positions;
        },

        radius: function(radius) {
            var that = this;
            var parent = that.parent;
            var center = that.arc.center;

            if(radius) {
                that.arc.setRadiusX(radius).setRadiusY(radius);
                that.repositionTicks(that.majorTicks.children, that.majorTickAngles);
                that.repositionTicks(that.minorTicks.children, that.minorTickAngles, true);
            } else {
                return that.arc.getRadiusX();
            }
        },

        repositionTicks: function(ticks, tickAngles, minor) {
            var that = this;
            var diff = minor ? (that._tickDifference || 0) : 0;
            var tickArc = that.arc;
            var radius = tickArc.getRadiusX();

            if (minor && that.options.labels.position === OUTSIDE && diff !== 0) {
                tickArc = that.arc.clone();
                tickArc.setRadiusX(radius - diff).setRadiusY(radius - diff);
            }

            for (var i = 0; i < ticks.length; i++) { //tickAngles.length
                var newPoint = tickArc.pointAt(tickAngles[i]);
                var segments = ticks[i].segments;
                var xDiff = newPoint.x - segments[0].anchor().x;
                var yDiff = newPoint.y - segments[0].anchor().y;

                ticks[i].transform(new geo.Transformation().translate(xDiff, yDiff));
            };
        }
    });

    var Gauge = Widget.extend({
        init: function(element, userOptions) {
            var gauge = this;
            var options;
            var themeOptions;
            var themeName;
            var themes = dataviz.ui.themes || {};
            var theme;

            Widget.fn.init.call(gauge, element);

            gauge.wrapper = gauge.element;

            gauge._originalOptions = deepExtend({}, userOptions);
            options = deepExtend({}, gauge.options, userOptions);

            themeName = options.theme;
            theme = themes[themeName] || themes[themeName.toLowerCase()];
            themeOptions = themeName && theme ? theme.gauge : {};

            gauge.options = deepExtend({}, themeOptions, options);

            gauge.element.addClass("k-gauge");

            gauge.redraw();
        },

        options: {
            plotArea: {},
            theme: "default",
            renderAs: "",
            pointer: {},
            scale: {},
            gaugeArea: {}
        },

        value: function(value) {
            var that = this;
            var pointer = that.pointers[0];

            if (arguments.length === 0) {
                return pointer.value();
            }

            gauge.options.pointer.value = value;

            pointer.value(value);
        },

        _resize: function() {
            var that = this;
            var t = that.options.transitions;

            that.options.transitions = false;
            that.redraw();
            that.options.transitions = t;
        },

        redraw: function() {
            var that = this;

            that.surface = that._createSurface();
            that.gaugeArea = that._createGaugeArea();
            that._createModel();
            that.reflow();
        },

        _createGaugeArea: function() {
            var that = this;
            var options = that.options.gaugeArea;
            var size = that.surface.size();
            var margin = that._gaugeAreaMargin = options.margin || DEFAULT_MARGIN;
            var border = options.border || {};
            var areaGeometry =  new geo.Rect([0, 0], [size.width, size.height]);

            if (border.width > 0) {
                areaGeometry = _unpad(areaGeometry, border.width);
            }

            var gaugeArea = Path.fromRect(areaGeometry, {
                stroke: {
                    color: border.width ? border.color : "",
                    width: border.width,
                    dashType: border.dashType,
                    lineJoin: "round",
                    lineCap: "round"
                },
                fill: {
                    color: options.background
                }
            });

            return gaugeArea;
        },

        _createSurface: function() {
            var that = this;
            var options = that.options;
            var size = that._getSize();
            size = options.gaugeArea ? deepExtend(size, options.gaugeArea) : size;

            return new draw.Surface.create(that.element, {
                type: options.renderAs,
                width: size.width,
                height: size.height
            });
        },

        getSize: function() {
            return this._getSize();
        },

        _getSize: function() {
            var that = this;
            var element = that.element;
            var width = element.width();
            var height = element.height();

            if (!width) {
                width = DEFAULT_WIDTH;
            }

            if (!height) {
                height = DEFAULT_HEIGHT;
            }

            return { width: width, height: height };
        }
    });

    var RadialGauge = Gauge.extend({
        init: function(element, options) {
            var radialGauge = this;

            Gauge.fn.init.call(radialGauge, element, options);

            kendo.notify(radialGauge, dataviz.ui);
        },

        options: {
            name: "RadialGauge2",
            transitions: true,
            gaugeArea: {
                background: ""
            }
        },

        reflow: function() {
            var that = this;
            var surface = that.surface;
            var pointers = that.pointers;
            var size = that._getSize();
            var wrapper = new geo.Rect([0, 0], [size.width, size.height]);
            var bbox = _unpad(wrapper.bbox(), that._gaugeAreaMargin);
            var scaleElements = that.scale.reflow(bbox);
            that._initialPlotArea = that.scale.bbox;

            //Todo testing only
            surface.draw(scaleElements);

            for (var i = 0; i < pointers.length; i++) {
                //Todo testing only
                var pointerElement = pointers[i].reflow(that.scale.arc);
                //surface.draw(pointerElement);

                that._initialPlotArea = Rect.union(that._initialPlotArea, pointers[i].bbox);
            };

            that.fitScale(bbox);
            that.alignScale(bbox);

            surface.clear();
            surface.draw(that.gaugeArea);

            for (var i = 0; i < pointers.length; i++) {
                pointers[i].render();
                surface.draw(pointers[i].elements);
                pointers[i].value(pointers[i].options.value);
            };

            surface.draw(scaleElements);
        },

        fitScale: function(bbox) {
            var that = this;
            var scale = that.scale;
            var arc = scale.arc;
            var plotAreaBox = that._initialPlotArea;
            var step = math.abs(that.getDiff(plotAreaBox, bbox));
            var min = round(step, COORD_PRECISION);
            var max = round(-step, COORD_PRECISION);
            var minDiff, midDiff, maxDiff, mid;
            var i = 0;

            while (i < 100) {
                i++;
                if (min != mid) {
                    minDiff = that.getPlotBox(min, bbox, arc);
                    if (0 <= minDiff && minDiff <= 2) {
                        break;
                    }
                }

                if (max != mid) {
                    maxDiff = that.getPlotBox(max, bbox, arc);
                    if (0 <= maxDiff && maxDiff <= 2) {
                        break;
                    }
                }

                if (minDiff > 0 && maxDiff > 0) {
                    mid = min * 2;
                } else if (minDiff < 0 && maxDiff < 0) {
                    mid = max * 2;
                } else {
                    mid = round(((min + max) / 2) || 1, COORD_PRECISION);
                }

                midDiff = that.getPlotBox(mid, bbox, arc);
                if (0 <= midDiff && midDiff <= 2) {
                    break;
                }

                if (midDiff > 0) {
                    max = mid;
                    maxDiff = midDiff;
                } else {
                    min = mid;
                    minDiff = midDiff;
                }
            }
        },

        getPlotBox: function(step, bbox, arc) {
            var that = this;
            var scale = that.scale;
            var pointers = that.pointers;
            var radius = arc.getRadiusX();

            arc = arc.clone();
            arc.setRadiusX(radius + step).setRadiusY(radius + step);

            scale.arc = arc;
            scale.reflow(bbox);
            that.plotBbox = scale.bbox;

            for (var i = 0; i < pointers.length; i++) {
                pointers[i].reflow(arc);
                that.plotBbox = Rect.union(that.plotBbox, pointers[i].bbox);
            }

            return that.getDiff(that.plotBbox, bbox);
        },

        getDiff: function(plotBox, box) {
            return math.min(box.width() - plotBox.width(), box.height() - plotBox.height());
        },

        alignScale: function(bbox) {
            var that = this;
            var plotBoxCenter = that.plotBbox.center();
            var boxCenter = bbox.center();
            var paddingX = plotBoxCenter.x - boxCenter.x;
            var paddingY = plotBoxCenter.y - boxCenter.y;
            var scale = that.scale;
            var pointers = that.pointers;

            scale.arc.center.x -= paddingX;
            scale.arc.center.y -= paddingY;

            scale.reflow(bbox);
            
            for (var i = 0; i < pointers.length; i++) {
                pointers[i].reflow(scale.arc);
                that.plotBbox = Rect.union(scale.bbox, pointers[i].bbox);
            }
        },

        _createModel: function() {
            var that = this;
            var options = that.options;
            var pointers = options.pointer;
            var scale = that.scale = new RadialScale(options.scale);
            var current;

            that.pointers = [];

            pointers = $.isArray(pointers) ? pointers : [pointers];
            for (var i = 0; i < pointers.length; i++) {
                current = new RadialPointer(scale, 
                    deepExtend({}, pointers[i], {
                        animation: {
                            transitions: options.transitions
                        }
                }));
                that.pointers.push(current);
            }
        }
    });

    var RadialPointerAnimation = draw.Animation.extend({
        init: function(element, options){
            draw.Animation.fn.init.call(this, element, options);

            options = this.options;

            options.duration = math.max((math.abs(options.newAngle - options.oldAngle) / options.speed) * 1000, 1);
        },

        options: {
            easing: LINEAR,
            speed: ANGULAR_SPEED
        },

        step: function(pos) {
            var anim = this;
            var options = anim.options;
            var angle = interpolateValue(options.oldAngle, options.newAngle, pos);

            anim.element.transform(geo.transform().rotate(angle, options.center));
        }
    });
    draw.AnimationFactory.current.register(RADIAL_POINTER, RadialPointerAnimation);

    var LinearGauge = Gauge.extend({
        init: function(element, options) {
            var linearGauge = this;
            Gauge.fn.init.call(linearGauge, element, options);
            kendo.notify(linearGauge, dataviz.ui);
        },

        options: {
            name: "LinearGauge",
            transitions: true,
            gaugeArea: {
                background: ""
            },
            scale: {
                vertical: true
            }
        },

        _getSize: function() {
            var gauge = this;
            var element = gauge.element;
            var width = element.width();
            var height = element.height();
            var vertical = gauge.options.scale.vertical;

            if (!width) {
                width = vertical ? DEFAULT_MIN_WIDTH : DEFAULT_WIDTH;
            }

            if (!height) {
                height = vertical ? DEFAULT_HEIGHT : DEFAULT_MIN_HEIGHT;
            }

            return { width: width, height: height };
        }
    });

    var LinearPointer = Pointer.extend({
        options: {

        }
    });

    function getRange(range, min, max) {
        var from = defined(range.from) ? range.from : MIN_VALUE;
        var to = defined(range.to) ? range.to : MAX_VALUE;

        range.from = math.max(math.min(to, from), min);
        range.to = math.min(math.max(to, from), max);

        return range;
    }

    function _pad(bbox, value) {
        var origin = bbox.getOrigin();
        var size = bbox.getSize();
        var spacing = getSpacing(value);

        bbox.setOrigin([origin.x - spacing.left, origin.y - spacing.top]);
        bbox.setSize([size.width + (spacing.left + spacing.right),
                      size.height + (spacing.top + spacing.bottom)]);

        return bbox;
    }

    function _unpad(bbox, value) {
        var spacing = getSpacing(value);

        spacing.left = -spacing.left; spacing.top = -spacing.top;
        spacing.right = -spacing.right; spacing.bottom = -spacing.bottom;

        return _pad(bbox, spacing);
    }

    // function _unpad(bbox, value) {
    //     var origin = bbox.getOrigin();
    //     var size = bbox.getSize();

    //     bbox.setOrigin([origin.x + value, origin.y + value]);
    //     bbox.setSize([size.width - (2 * value), size.height - (2 * value)]);

    //     return bbox;
    // }

    dataviz.ui.plugin(RadialGauge);

    deepExtend(dataviz, {
        newGauge: {
            Gauge: Gauge,
            RadialPointer: RadialPointer,
            LinearPointer: LinearPointer,
            //LinearScale: LinearScale,
            RadialScale: RadialScale,
            RadialGauge: RadialGauge,
            LinearGauge: LinearGauge
        }
    });

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });