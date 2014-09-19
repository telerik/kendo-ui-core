(function ($, undefined) {
    
    var kendo = window.kendo,
        Class = kendo.Class,
        deepExtend = kendo.deepExtend,
        Widget = kendo.ui.Widget,
        dataviz = kendo.dataviz,
        autoMajorUnit = dataviz.autoMajorUnit,
        round = dataviz.round,
        geo = dataviz.geometry,
        draw = dataviz.drawing,
        Point = geo.Point,
        Circle = draw.Circle,
        Group = draw.Group,
        Path = draw.Path,
        Text = draw.Text;

    var ARROW = "arrow",
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
        INSIDE = "inside",
        NEEDLE = "needle";

    var Pointer = Class.extend({
        
        init: function(options) {  
            var pointer = this;

            options = pointer.options;
        },

        options: { 
            color: BLACK
        },

        value: function(newValue) {

        }
    });

    var RadialPointer = Pointer.extend({
        init: function() {

        },

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
                //type: RADIAL_POINTER,
                //speed: ANGULAR_SPEED
            }
        },

        //accepts parent
        render: function(parent) {
            var that = this,
                options = that.options,
                //scale = new RadialScale();
                scale = new geo.Arc([250, 250], {
                    radiusX: 200,
                    radiusY: 200,
                    startAngle: 150,
                    endAngle: 30
                }),
                group = new Group();

            if (options.shape === NEEDLE) {
                group.append(
                    that._renderNeedle(scale),
                    that._renderCap(scale)
                );
            } else {
                group.append(that._renderArrow(scale));
            }
            
            parent.append(group);
        },

        _renderNeedle: function(scale) {
            var pointer = this,
                options = pointer.options,
                center = scale.center,
                radius = scale.radiusX,
                capSize = radius * options.cap.size;

            var needlePath = new draw.Path({
                fill: {
                    color: options.color,
                }
            });

// + radius - minorTickSize
            needlePath.moveTo(center.x + radius - 10, center.y)
                      .lineTo(center.x, center.y - (capSize / 2))
                      .lineTo(center.x, center.y + (capSize / 2))
                      .close();

            return needlePath;
        },

        _renderCap: function(scale) {
            var pointer = this,
                options = pointer.options,
                center = scale.center,
                radius = scale.radiusX,
                capSize = radius * options.cap.size;

            var circle = new geo.Circle([250, 250], capSize);

            var cap = new draw.Circle(circle, {
               fill: {
                 color: options.cap.color || options.color
               }
            });

            return cap;
        }
    });

    var RadialScale = Class.extend({
        init: function(options) {
            var scale = this;

            scale.options = deepExtend({}, scale.options, options);
            scale.options.majorUnit = scale.options.majorUnit || autoMajorUnit(scale.options.min, scale.options.max);

            scale.options.minorUnit = scale.options.minorUnit || scale.options.majorUnit / 10;
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

        render: function(parent) {
            var that = this,
                options = that.options,
                group = new Group(),
                arc = that.renderArc();

            group.append(arc);
            group.append(that.renderTicks(arc));

            parent.append(group);
        },

        renderArc: function() {
            var that = this,
                options = that.options,
                arcGeometry = new geo.Arc([250, 250], {
                    radiusX: 200,
                    radiusY: 200,
                    startAngle: 180 + options.startAngle,
                    endAngle: 180 + options.endAngle
                });

            var arc = new Arc(arcGeometry).stroke(BLACK, 1);

            return arc;
        },

        renderTicks: function(arc) {
            var that = this,
                arcGeometry = arc._geometry,
                options = that.options,
                allTicks = new Group(),
                minorTickSize = options.minorTicks.size;

            function drawTicks(arcGeometry, unit, tickOptions, skipUnit) {
                var ticks = new Group(),
                    tickAngles = that.tickAngles(arcGeometry, unit),
                    center = arcGeometry.center,
                    i, tickStart, tickEnd,
                    skip = skipUnit / unit,
                    tickSize = unit.size,
                    visible = tickOptions.visible;

                if (visible) {
                    for (i = 0; i < tickAngles.length; i++) {
                        if (i % skip === 0) {
                            continue;
                        }

                        tickStart = new Point(center.x + 200, center.y).rotate(tickAngles[i], center);
                        tickEnd = new Point(center.x + 200 - tickOptions.size, center.y).rotate(tickAngles[i], center);

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

            allTicks.append(drawTicks(arcGeometry, options.majorUnit, options.majorTicks),
                            drawTicks(arcGeometry, options.minorUnit, options.minorTicks, options.majorUnit));
            return allTicks;
        },

        tickAngles: function(ring, stepValue) {
            var scale = this,
                options = scale.options,
                reverse = options.reverse,
                range = options.max - options.min,
                angle = ring.endAngle - ring.startAngle,
                pos = ring.startAngle,
                tickCount = range / stepValue,
                step = angle / tickCount,
                positions = [],
                i;

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
        }
    });

    var LinearPointer = Pointer.extend({
        options: {

        }
    });

    deepExtend(dataviz, {
        Pointer: Pointer,
        RadialPointer: RadialPointer,
        RadialScale: RadialScale
    });

})(window.kendo.jQuery);