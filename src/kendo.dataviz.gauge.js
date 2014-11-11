(function(f, define){
    define([ "./kendo.dataviz.core", "./kendo.drawing", "./kendo.dataviz.themes" ], f);
})(function(){

var __meta__ = {
    id: "dataviz.gauge",
    name: "Gauge",
    category: "dataviz",
    description: "Radial and Linear gauges.",
    depends: [ "dataviz.core", "drawing", "dataviz.themes" ]
};

(function ($, undefined) {
    
    var math = Math,
        kendo = window.kendo,
        util = kendo.util,
        Widget = kendo.ui.Widget,
        deepExtend = kendo.deepExtend,

        dataviz = kendo.dataviz,
        autoMajorUnit = dataviz.autoMajorUnit,
        ChartElement = dataviz.ChartElement,
        NumericAxis = dataviz.NumericAxis,
        Axis = dataviz.Axis,
        Box2D = dataviz.Box2D,
        Class = kendo.Class,
        defined = dataviz.defined,
        isArray = $.isArray,
        isNumber = util.isNumber,
        interpolateValue = dataviz.interpolateValue,
        valueOrDefault = dataviz.valueOrDefault,

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
        Text = draw.Text,
        Surface = draw.Surface;

    // Constants ==============================================================
    var ANGULAR_SPEED = 150,
        LINEAR_SPEED = 250,
        ARROW = "arrow",
        ARROW_POINTER = "arrowPointer",
        BAR_POINTER = "barPointer",
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
        GEO_ARC_ADJUST_ANGLE = 180,
        INSIDE = "inside",
        LINEAR = "linear",
        NEEDLE = "needle",
        OUTSIDE = "outside",
        RADIAL_POINTER = "radialPointer",
        X = "x",
        Y = "y";

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
                duration: ANGULAR_SPEED
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
            this.elements.transform(geo.transform().rotate(angle, this.center));
        },

        repaint: function() {
            var that = this;
            var scale = that.scale;
            var options = that.options;
            var oldAngle = scale.slotAngle(options._oldValue);
            var newAngle = scale.slotAngle(options.value);

            if (options.animation.transitions === false) {
                that.setAngle(newAngle);
            } else {
                new RadialPointerAnimation(that.elements, deepExtend(options.animation, {
                    oldAngle: oldAngle,
                    newAngle: newAngle
                })).play();
            }
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

            if (options.shape === NEEDLE) {
                elements.append(
                    that._renderNeedle(),
                    that._renderCap()
                );
            } else {
                elements.append(that._renderArrow());
            }

            that.elements = elements;
            that.setAngle(DEGREE);

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

            var needlePath = new Path({
                fill: { color: needleColor },
                stroke: { color: needleColor, width: DEFAULT_LINE_WIDTH }
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
            
            group.append(that.ticks, that.ranges, that.labelElements);

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
                    lbl = _buildLabel(label, options.labels);
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
            var rangeDistance = that.options.rangeDistance;
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
            that.minorTicks = drawTicks(tickArc, that.minorTickAngles, options.minorUnit, options.minorTicks, options.majorUnit);
            allTicks.append(that.minorTicks);

            return allTicks;
        },

        normalizeTickAngles: function(angles) {
            var that = this;
            var options = that.options;
            var skip = options.majorUnit / options.minorUnit;

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

            for (var i = 0; i < ticks.length; i++) {
                var newPoint = tickArc.pointAt(tickAngles[i]);
                var segments = ticks[i].segments;
                var xDiff = newPoint.x - segments[0].anchor().x;
                var yDiff = newPoint.y - segments[0].anchor().y;

                ticks[i].transform(new geo.Transformation().translate(xDiff, yDiff));
            }
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

            gauge.surface = gauge._createSurface();

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

            pointer.value(value);
        },

        allValues: function(values) {
            var that = this;
            var pointers = that.pointers;
            var allValues = [];
            var i;

            if (arguments.length === 0) {
                for (i = 0; i < pointers.length; i++) {
                    allValues.push(pointers[i].value());
                }

                return allValues;
            }

            if ($.isArray(values)) {
                for (i = 0; i < values.length; i++) {
                    if (isNumber(values[i])) {
                        pointers[i].value(values[i]);
                    }
                }
            }
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
            var size = deepExtend(that._getSize(), that.options.gaugeArea);
            var wrapper = new Rect([0, 0], [size.width, size.height]);
            var bbox;

            that.surface.clear();
            that.gaugeArea = that._createGaugeArea();
            that._createModel();

            bbox = _unpad(wrapper.bbox(), that._gaugeAreaMargin);
            that.reflow(bbox);
        },

        _createGaugeArea: function() {
            var that = this;
            var options = that.options.gaugeArea;
            var size = that.surface.size();
            var margin = that._gaugeAreaMargin = options.margin || DEFAULT_MARGIN;
            var border = options.border || {};
            var areaGeometry =  new Rect([0, 0], [size.width, size.height]);

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

            var wrap = $("<div></div>").appendTo(that.element).css({
                width: size.width,
                height: size.height
            });

            return new draw.Surface.create(wrap, {
                type: options.renderAs
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
            name: "RadialGauge",
            transitions: true,
            gaugeArea: {
                background: ""
            }
        },

        reflow: function(bbox) {
            var that = this;
            var pointers = that.pointers;
            var scaleElements = that.scale.reflow(bbox);
            that._initialPlotArea = that.scale.bbox;

            for (var i = 0; i < pointers.length; i++) {
                var pointerElement = pointers[i].reflow(that.scale.arc);
                that._initialPlotArea = Rect.union(that._initialPlotArea, pointers[i].bbox);
            }

            that.fitScale(bbox);
            that.alignScale(bbox);
            that._draw(that.gaugeArea, pointers, scaleElements);
        },

        _draw: function(gaugeArea, pointers, scale) {
            var surface = this.surface;
            var current;

            surface.clear();
            surface.draw(gaugeArea);
            surface.draw(scale.children[0]); // ticks
            surface.draw(scale.children[1]); // ranges

            for (var i = 0; i < pointers.length; i++) {
                current = pointers[i];
                current.render();
                surface.draw(current.elements);
                current.value(current.options.value);
            }
            surface.draw(scale.children[2]); // labels
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

        reflow: function(bbox) {
            var that = this;
            var surface = that.surface;
            var pointers = that.pointers;
            var bboxX = bbox.origin.x;
            var bboxY = bbox.origin.y;

            var bbox2D = new dataviz.Box2D(bboxX, bboxX,
                                           bboxX + bbox.width(), bboxY + bbox.height());

            that.scale.reflow(bbox2D);

            for (var i = 0; i < pointers.length; i++) {
                pointers[i].reflow();
            }

            that.bbox = that._getBox(bbox2D);
            that._alignElements();
            that._shrinkElements();
            that._draw();
        },

        _draw: function(){
            var that = this;
            var surface = that.surface;
            var scaleElements = that.scale.render();
            var pointers = that.pointers;
            var current;

            surface.clear();
            surface.draw(that.gaugeArea);
            surface.draw(scaleElements);

            for (var i = 0; i < pointers.length; i++) {
                current = pointers[i];
                surface.draw(current.render());
                current.value(current.options.value);
            }
        },

        _createModel: function() {
            var that = this;
            var options = that.options;
            var pointers = options.pointer;
            var scale = that.scale = new LinearScale(options.scale);
            var current, currentOptions;

            that.pointers = [];

            pointers = $.isArray(pointers) ? pointers : [pointers];
            for (var i = 0; i < pointers.length; i++) {
                currentOptions = deepExtend({}, pointers[i], {
                        animation: {
                            transitions: options.transitions
                        }
                });

                if (currentOptions.shape === ARROW) {
                    current = new ArrowLinearPointer(scale, currentOptions);
                } else {
                    current = new BarLinearPointer(scale, currentOptions);
                }

                that.pointers.push(current);
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
        },

        _getBox: function(box) {
            var that = this;
            var scale = that.scale;
            var pointers = that.pointers;
            var boxCenter = box.center();
            var plotAreaBox = pointers[0].box.clone().wrap(scale.box);
            var size;

            for (var i = 0; i < pointers.length; i++) {
                plotAreaBox.wrap(pointers[i].box.clone());
            }

            if (scale.options.vertical) {
                size = plotAreaBox.width() / 2;
                plotAreaBox = new Box2D(
                    boxCenter.x - size, box.y1,
                    boxCenter.x + size, box.y2
                );
            } else {
                size = plotAreaBox.height() / 2;
                plotAreaBox = new Box2D(
                    box.x1, boxCenter.y - size,
                    box.x2, boxCenter.y + size
                );
            }

            return plotAreaBox;
        },

        _alignElements: function() {
            var that = this;
            var scale = that.scale;
            var pointers = that.pointers;
            var scaleBox = scale.box;
            var box = pointers[0].box.clone().wrap(scale.box);
            var plotAreaBox = that.bbox;
            var diff, i;

            for (i = 0; i < pointers.length; i++) {
                box.wrap(pointers[i].box.clone());
            }

            if (scale.options.vertical) {
                diff = plotAreaBox.center().x - box.center().x;
                scale.reflow(new Box2D(
                    scaleBox.x1 + diff, plotAreaBox.y1,
                    scaleBox.x2 + diff, plotAreaBox.y2
                ));
            } else {
                diff = plotAreaBox.center().y - box.center().y;
                scale.reflow(new Box2D(
                    plotAreaBox.x1, scaleBox.y1 + diff,
                    plotAreaBox.x2, scaleBox.y2 + diff
                ));
            }

            for (i = 0; i < pointers.length; i++) {
                pointers[i].reflow(that.bbox);
            }
        },

        _shrinkElements: function () {
            var that = this;
            var scale = that.scale;
            var pointers = that.pointers;
            var scaleBox = scale.box.clone();
            var pos = scale.options.vertical ? "y" : "x";
            var pointerBox = pointers[0].box;
            var i;

            for (i = 0; i < pointers.length; i++) {
                pointerBox.wrap(pointers[i].box.clone());
            }

            scaleBox[pos + 1] += math.max(scaleBox[pos + 1] - pointerBox[pos + 1], 0);
            scaleBox[pos + 2] -= math.max(pointerBox[pos + 2] - scaleBox[pos + 2], 0);

            scale.reflow(scaleBox);

            for (i = 0; i < pointers.length; i++) {
                pointers[i].reflow(that.bbox);
            }
        }
    });

    var LinearScale = NumericAxis.extend({
        init: function (options) {
            var scale = this;

            scale.options = deepExtend({}, scale.options, options);
            scale.options = deepExtend({}, scale.options , { labels: { mirror: scale.options.mirror } });
            scale.options.majorUnit = scale.options.majorUnit || autoMajorUnit(scale.options.min, scale.options.max);

            Axis.fn.init.call(scale, scale.options);
            scale.options.minorUnit = scale.options.minorUnit || scale.options.majorUnit / 10;
        },

        options: {
            min: 0,
            max: 50,

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

            line: {
                width: DEFAULT_LINE_WIDTH
            },

            labels: {
                position: INSIDE,
                padding: 2
            },
            mirror: false,
            _alignLines: false
        },

        render: function() {
            var that = this;
            var elements = new Group();
            var labels = that.renderLabels();
            var scaleLine = that.renderLine();
            var scaleTicks = that.renderTicks();
            var ranges = that.renderRanges();

            elements.append(scaleLine, labels, scaleTicks, ranges);

            return elements;
        },

        renderRanges: function() {
            var that = this;
            var options = that.options;
            var min = options.min;
            var max = options.max;
            var ranges = options.ranges || [];
            var vertical = options.vertical;
            var mirror = options.labels.mirror;
            var elements = new Group();
            var count = ranges.length;
            var rangeSize = options.rangeSize || options.minorTicks.size / 2;
            var range, slot, slotX, slotY, i;

            if (count) {
                for (i = 0; i < count; i++) {
                    range = getRange(ranges[i], min, max);
                    slot = that.getSlot(range.from, range.to);
                    slotX = vertical ? that.lineBox() : slot;
                    slotY = vertical ? slot : that.lineBox();
                    if (vertical) {
                        slotX.x1 -= rangeSize * (mirror ? -1 : 1);
                    } else {
                        slotY.y2 += rangeSize * (mirror ? -1 : 1);
                    }

                    elements.append(Path.fromRect(new Rect([slotX.x1, slotY.y1],
                        [slotX.x2 - slotX.x1, slotY.y2 - slotY.y1]), {
                        fill: { color: range.color, opacity: range.opacity },
                        stroke: { }
                    }));
                }
            }

            return elements;
        },

        renderLabels: function() {
            var that = this;
            var options = that.options;
            var labels = that.labels;
            var elements = new Group();

            for (var i = 0; i < labels.length; i++) {
                elements.append(_buildLabel(labels[i], options.labels));
            }

            return elements;
        },

        renderLine: function() {
            var that = this;
            var options = that.options;
            var line = options.line;
            var lineBox = that.lineBox();
            var linePath;
            var elements = new Group();

            if (line.width > 0 && line.visible) {
                linePath = new Path({
                    stroke: {
                        color: line.color,
                        dashType: line.dashType,
                        width: line.width
                    }
                });

                linePath.moveTo(lineBox.x1, lineBox.y1).lineTo(lineBox.x2, lineBox.y2);
                elements.append(linePath);
            }

            return elements;
        },

        renderTicks: function() {
            var that = this;
            var ticks = new Group();
            var options = that.options;
            var lineBox = that.lineBox();
            var mirror = options.labels.mirror;
            var majorUnit = options.majorTicks.visible ? options.majorUnit : 0;
            var tickLineOptions= {
               _alignLines: options._alignLines,
               vertical: options.vertical
            };
            var start, end;

            function render(tickPositions, tickOptions) {
                var i, count = tickPositions.length;

                if (tickOptions.visible) {
                    for (i = tickOptions.skip; i < count; i += tickOptions.step) {
                        if (i % tickOptions.skipUnit === 0) {
                            continue;
                        }

                        tickLineOptions.tickX = mirror ? lineBox.x2 : lineBox.x2 - tickOptions.size;
                        tickLineOptions.tickY = mirror ? lineBox.y1 - tickOptions.size : lineBox.y1;
                        tickLineOptions.position = tickPositions[i];

                        ticks.append(that.renderAxisTick(tickLineOptions, tickOptions));
                    }
                }
            }

            render(that.getMajorTickPositions(), options.majorTicks);
            render(that.getMinorTickPositions(), deepExtend({}, {
                    skipUnit: majorUnit / options.minorUnit
                }, options.minorTicks));

            return ticks;
        },

        renderAxisTick: function(options, tickOptions) {
            var tickX = options.tickX;
            var tickY = options.tickY;
            var position = options.position;
            var start, end, tickPath;

            if (options.vertical) {
                start = new Point(tickX, position);
                end = new Point(tickX + tickOptions.size, position);
            } else {
                start = new Point(position, tickY);
                end = new Point(position, tickY + tickOptions.size);
            }

            tickPath = new Path({
                stroke: {
                    color: tickOptions.color,
                    width: tickOptions.width
                }
            }).moveTo(start).lineTo(end);

            return tickPath;
        }
    });

    var LinearPointer = Pointer.extend({
        init: function(scale, options) {
            var pointer = this;

            Pointer.fn.init.call(pointer, scale, options);

            pointer.options = deepExtend({
                track: {
                    visible: defined(options.track)
                }
            }, pointer.options);
        },

        options: {
            shape: BAR_POINTER,

            track: {
                border: {
                    width: 1
                }
            },

            color: BLACK,
            border: {
                width: 1
            },
            opacity: 1,

            margin: getSpacing(3),
            animation: {
                type: BAR_POINTER
            },
            visible: true
        },

        reflow: function() {
            var pointer = this;
            var options = pointer.options;
            var scale = pointer.scale;
            var scaleLine = scale.lineBox();
            var trackSize = options.track.size || options.size;
            var pointerHalfSize = options.size / 2;
            var mirror = scale.options.mirror;
            var margin = getSpacing(options.margin);
            var vertical = scale.options.vertical;
            var space = vertical ?
                     margin[mirror ? "left" : "right"] :
                     margin[mirror ? "bottom" : "top"];
            var pointerBox, pointerRangeBox, trackBox;

            space = mirror ? -space : space;

            if (vertical) {
                trackBox = new Box2D(
                    scaleLine.x1 + space, scaleLine.y1,
                    scaleLine.x1 + space, scaleLine.y2);

                if (mirror) {
                    trackBox.x1 -= trackSize;
                } else {
                    trackBox.x2 += trackSize;
                }

                if (options.shape !== BAR_POINTER) {
                    pointerRangeBox = new Box2D(
                        scaleLine.x2 + space, scaleLine.y1 - pointerHalfSize,
                        scaleLine.x2 + space, scaleLine.y2 + pointerHalfSize
                    );
                    pointerBox = pointerRangeBox;
                }
            } else {
                trackBox = new Box2D(
                    scaleLine.x1, scaleLine.y1 - space,
                    scaleLine.x2, scaleLine.y1 - space);

                if (mirror) {
                    trackBox.y2 += trackSize;
                } else {
                    trackBox.y1 -= trackSize;
                }

                if (options.shape !== BAR_POINTER) {
                    pointerRangeBox = new Box2D(
                        scaleLine.x1 - pointerHalfSize, scaleLine.y1 - space,
                        scaleLine.x2 + pointerHalfSize, scaleLine.y1 - space
                    );
                    pointerBox = pointerRangeBox;
                }
            }

            pointer.trackBox = trackBox;
            pointer.pointerRangeBox = pointerRangeBox;
            pointer.box = pointerBox || trackBox.clone().pad(options.border.width);
        },

        getElementOptions: function() {
            var options = this.options;
            var elements = new Group();
            var scale = this.scale;
            
            return {
                fill: {
                    color: options.color,
                    opacity: options.opacity
                },
                stroke: defined(options.border) ? {
                    color: options.border.width ? options.border.color || options.color : "",
                    width: options.border.width,
                    dashType: options.border.dashType,
                    opacity: options.opacity
                } : null
            };
        },

        _margin: function() {
            var pointer = this;
            var options = pointer.options;
            var scale = pointer.scale;
            var mirror = scale.options.mirror;
            var margin = getSpacing(options.margin);
            var vertical = scale.options.vertical;

            var space = vertical ?
                     margin[mirror ? "left" : "right"] :
                     margin[mirror ? "bottom" : "top"];

            return space;
        }
    });

    var ArrowLinearPointer = LinearPointer.extend({
        init: function(scale, options) {
            LinearPointer.fn.init.call(this, scale, options);

            if (this.options.size === undefined) {
                this.options.size = this.scale.options.majorTicks.size * 0.6;
            }
        },

        pointerShape: function(value) {
            var that = this;
            var options = that.options;
            var scale = that.scale;
            var size = options.size;
            var vertical = scale.options.vertical;
            var halfSize = size / 2;
            var sign = (scale.options.mirror ? -1 : 1);
            var reverse = scale.options.reverse;
            var pos, shape;

            if (vertical) {
                pos = reverse ? "y2" : "y1";
                shape = [
                    new Point(0, 0 - halfSize), new Point(0 - sign * size, 0), new Point(0, 0 + halfSize)
                ];
            } else {
                pos = reverse ? "x1" : "x2";
                shape = [
                    new Point(0 - halfSize, 0), new Point(0, 0 + sign * size), new Point(0 + halfSize, 0)
                ];
            }

            return shape;
        },

        repaint: function() {
            var that = this;
            var scale = that.scale;
            var options = that.options;
            var animation = new ArrowLinearPointerAnimation(that.elements, deepExtend(options.animation, {
                vertical: scale.options.vertical,
                mirror: scale.options.mirror,
                margin: that._margin(options.margin),
                from: scale.getSlot(options._oldValue),
                to: scale.getSlot(options.value)
            }));

            if (options.animation.transitions === false) {
                animation.options.duration = 0;
            }

            animation.setup();
            animation.play();
        },

        render: function() {
            var that = this;
            var options = that.options;
            var elements = new Group();
            var scale = that.scale;
            var elementOptions = that.getElementOptions();
            var shape = that.pointerShape(options.value);

            options.animation.type = ARROW_POINTER;

            elements = new Path({
                stroke: elementOptions.stroke,
                fill: elementOptions.fill
            }).moveTo(shape[0]).lineTo(shape[1]).lineTo(shape[2]).close();

            var slot = scale.getSlot(options.value);
            elements.transform(geo.transform().translate(slot.x1, slot.y1));

            that.elements = elements;

            return elements;
        }
    });

    var BarLinearPointer = LinearPointer.extend({
        init: function(scale, options) {
            LinearPointer.fn.init.call(this, scale, options);

            if (this.options.size === undefined) {
                this.options.size = this.scale.options.majorTicks.size * 0.3;
            }
        },

        pointerShape: function(value) {
            var that = this;
            var options = that.options;
            var scale = that.scale;
            var vertical = scale.options.vertical;
            var mirror = scale.options.mirror ;
            var dir = mirror == vertical  ? -1 : 1;
            var size = options.size * dir;
            var minSlot = scale.getSlot(scale.options.min);
            var slot = scale.getSlot(value);
            var axis = vertical ? Y : X;
            var sizeAxis = vertical ? X : Y;
            var margin = that._margin() * dir;

            var shape = [];
            var p1 = new Point();
            p1[axis] = minSlot[axis + "1"];
            p1[sizeAxis] = minSlot[sizeAxis + "1"];

            var p2 = new Point();
            p2[axis] = slot[axis + "1"];
            p2[sizeAxis] = slot[sizeAxis + "1"];

            if (vertical) {
                p1.translate(margin, 0);
                p2.translate(margin, 0);
            } else {
                p1.translate(0, margin);
                p2.translate(0, margin);
            }

            var p3 = p2.clone();
            var p4 = p1.clone();

            if (vertical) {
                p3.translate(size, 0);
                p4.translate(size, 0);
            } else {
                p3.translate(0, size);
                p4.translate(0, size);
            }

            return [p1, p2, p3, p4];
        },

        repaint: function() {
            var that = this;
            var scale = that.scale;
            var options = that.options;
            var shape = that.pointerShape(options.value);
            var pointerPath = that.elements.children[0];
            var oldShape = that.pointerShape(options._oldValue);

            pointerPath.moveTo(shape[0]).lineTo(shape[1]).lineTo(shape[2]).lineTo(shape[3]).close();

            var animation = new BarLinearPointerAnimation(pointerPath, deepExtend(options.animation, {
                    reverse:  scale.options.reverse,
                    vertical: scale.options.vertical,
                    oldPoints: [oldShape[1], oldShape[2]],
                    newPoints: [shape[1], shape[2]]
                }));

            if (options.animation.transitions === false) {
                animation.options.duration = 0;
            }

            animation.setup();
            animation.play();
        },

        render: function() {
            var that = this;
            var options = that.options;
            var group = new Group();
            var scale = that.scale;
            var elementOptions = that.getElementOptions();

            var pointer = new Path({
                stroke: elementOptions.stroke,
                fill: elementOptions.fill
            });

            group.append(pointer);

            that.elements = group;

            return group;
        }
    });

    var RadialPointerAnimation = draw.Animation.extend({
        init: function(element, options){
            draw.Animation.fn.init.call(this, element, options);

            options = this.options;

            options.duration = math.max((math.abs(options.newAngle - options.oldAngle) / options.duration) * 1000, 1);
        },

        options: {
            easing: LINEAR,
            duration: ANGULAR_SPEED
        },

        step: function(pos) {
            var anim = this;
            var options = anim.options;
            var angle = interpolateValue(options.oldAngle, options.newAngle, pos);

            anim.element.transform(geo.transform().rotate(angle, options.center));
        }
    });
    draw.AnimationFactory.current.register(RADIAL_POINTER, RadialPointerAnimation);

    var ArrowLinearPointerAnimation = draw.Animation.extend({
        options: {
            easing: LINEAR,
            duration: LINEAR_SPEED
        },

        setup: function() {
            var options = this.options;
            var halfSize = this.element.bbox().width() / 2;
            var margin = options.margin;
            var from = options.from;
            var to = options.to;
            var axis = options.vertical ? "x1" : "y1";

            if (options.mirror == options.vertical) {
                from[axis] -= margin; to[axis] -= margin;
            } else {
                from[axis] += margin; to[axis] += margin;
            }

            var fromScale = this.fromScale = new Point(from.x1, from.y1);
            var toScale = this.toScale = new Point(to.x1, to.y1);

            if (options.duration !== 0) {
                options.duration = math.max((fromScale.distanceTo(toScale) / options.duration) * 1000, 1);
            }
        },

        step: function(pos) {
            var translateX = interpolateValue(this.fromScale.x, this.toScale.x, pos);
            var translateY = interpolateValue(this.fromScale.y, this.toScale.y, pos);

            this.element.transform(geo.transform().translate(translateX, translateY));            
        }
    });
    draw.AnimationFactory.current.register(ARROW_POINTER, ArrowLinearPointerAnimation);

    var BarLinearPointerAnimation = draw.Animation.extend({
        options: {
            easing: LINEAR,
            speed: LINEAR_SPEED
        },

        setup: function() {
            var element = this.element;
            var options = this.options;

            var newPoints = options.newPoints;
            var oldPoints = options.oldPoints;
            var axis = this.axis = options.vertical ? Y : X;
            var to = this.to = newPoints[0][axis];
            var from = this.from = oldPoints[0][axis];

            if (options.duration !== 0) {
                options.duration = math.max((math.abs(to - from) / options.speed) * 1000, 1);
            }

            this._set(from);
        },

        step: function(pos) {
            var value = interpolateValue(this.from, this.to, pos);
            this._set(value);
        },

        _set: function(value) {
            var setter = "set" + this.axis.toUpperCase();
            var points = this.options.newPoints;

            points[0][setter](value);
            points[1][setter](value);
        }
    });
    draw.AnimationFactory.current.register(BAR_POINTER, BarLinearPointerAnimation);

    function _buildLabel(label, options) {
        var labelBox = label.box;
        var textBox = label.children[0].box;
        var border = options.border || {};
        var background = options.background || "";
        var elements = new Group();
        var styleBox, styleGeometry, wrapper;

        wrapper = Path.fromRect(new Rect([labelBox.x1, labelBox.y1], [labelBox.width(), labelBox.height()]), {
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
    }

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

    dataviz.ui.plugin(RadialGauge);
    dataviz.ui.plugin(LinearGauge);

    deepExtend(dataviz, {
        Gauge: Gauge,
        RadialPointer: RadialPointer,
        LinearPointer: LinearPointer,
        ArrowLinearPointer: ArrowLinearPointer,
        BarLinearPointer: BarLinearPointer,
        LinearScale: LinearScale,
        RadialScale: RadialScale,
        LinearGauge: LinearGauge,
        RadialGauge: RadialGauge
    });

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });