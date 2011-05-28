(function ($) {
    var kendo = window.kendo,
        ui = kendo.ui = kendo.ui || {},
        extend = $.extend,
        SVG_NS = "http://www.w3.org/2000/svg",
        DEFAULT_PRECISION = 6,
        COORD_PRECISION = 3,
        ZERO_THRESHOLD = 0.2,
        BASELINE_MARKER_SIZE = 1,
        X = "x",
        Y = "y",
        TOP = "top"
        BOTTOM = "bottom",
        LEFT = "left",
        RIGHT = "right";

    function Chart(element, options) {
        var chart = this;

        chart.options = $.extend({}, chart.options, options);
        chart.element = element;
        chart._viewFactory = chart._supportsSVG() ? new SVGFactory() : new VMLFactory();

        chart.refresh();
    }

    Chart.prototype = {
        options: {

        },

        types: { },

        refresh: function() {
            var chart = this,
                model = new RootElement();

            model.children.push(
                new Title({ text: chart.options.title }),
                new Legend({ series: chart.options.series }),
                new PlotArea(chart.options)
            );
            chart._model = model;

            model.updateLayout();
            var html = model.getView(chart._viewFactory).render();
            setContent(chart.element, html);
        },

        _supportsSVG: function() {
            return document.implementation.hasFeature(
                "http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1");
        }
    };

    function setContent(container, xml) {
        if (typeof setContent.useParser == "undefined") {
            var testFragment = "<svg xmlns='" + SVG_NS + "'></svg>",
                testContainer = document.createElement("div"),
                hasParser = typeof DOMParser != "undefined";

            testContainer.innerHTML = testFragment;
            setContent.useParser = hasParser && testContainer.firstChild.namespaceURI != SVG_NS;
        }

        if (setContent.useParser) {
            var parser = new DOMParser(),
                chartDoc = parser.parseFromString(xml, "text/xml"),
                importedDoc = document.adoptNode(chartDoc.documentElement);

            container.innerHTML = "";
            container.appendChild(importedDoc);
        } else {
            container.innerHTML = xml;
        }
    }

    ui.Chart = Chart;
    $.fn.kendoChart = function(options) {
        $(this).each(function() {
            $(this).data("kendoChart", new kendo.ui.Chart(this, options));
        });

        return this;
    };


    // **************************
    // View Model
    // **************************
    function Box(x1, y1, x2, y2) {
        var box = this;
        box.x1 = x1 || 0;
        box.x2 = x2 || 0;
        box.y1 = y1 || 0;
        box.y2 = y2 || 0;
    }

    Box.prototype = {
        width: function() {
            return this.x2 - this.x1;
        },

        height: function() {
            return this.y2 - this.y1;
        },

        translate: function(dx, dy) {
            var box = this;

            box.x1 += dx;
            box.x2 += dx;
            box.y1 += dy;
            box.y2 += dy;

            return box;
        },

        wrap: function(targetBox) {
            var box = this;

            box.x1 = Math.min(box.x1, targetBox.x1);
            box.y1 = Math.min(box.y1, targetBox.y1);
            box.x2 = Math.max(box.x2, targetBox.x2);
            box.y2 = Math.max(box.y2, targetBox.y2);

            return this;
        },

        snapTo: function(targetBox, axis) {
            var box = this;

            if (axis == X || !axis) {
                box.x1 = targetBox.x1;
                box.x2 = targetBox.x2;
            }

            if (axis == Y || !axis) {
                box.y1 = targetBox.y1;
                box.y2 = targetBox.y2;
            }

            return this;
        },

        alignTo: function(targetBox, edge) {
            var box = this,
                height = box.height(),
                width = box.width(),
                axis = edge == TOP || edge == BOTTOM ? Y : X,
                offset = axis == Y ? height : width;

            if (edge == TOP || edge == LEFT) {
                box[axis + 1] = targetBox[axis + 1] - offset;
            } else {
                box[axis + 1] = targetBox[axis + 2];
            }

            box.x2 = box.x1 + width;
            box.y2 = box.y1 + height;

            return box;
        },

        shrink: function(dw, dh) {
            var box = this;

            box.x2 -= dw;
            box.y2 -= dh;

            return box;
        },

        clone: function() {
            var box = this;

            return new Box(box.x1, box.y1, box.x2, box.y2);
        }
    }

    var defaultBox = new Box(0, 0, 0, 0);

    function ChartElement() {
        var element = this;
        element.attributes = {};
        element.children = [];
    }

    extend(ChartElement.prototype, {
        options: {
        },

        updateLayout: function(targetBox) {
            var element = this,
                children = element.children,
                box = this.box = new Box();

            for (var i = 0; i < children.length; i++) {
                var currentChild = children[i];

                currentChild.updateLayout(targetBox);
                box.wrap(currentChild.box);
            }
        },

        getViewElements: function(factory) {
            var element = this,
                viewElements = [],
                children = element.children,
                childrenCount = children.length;

            for (var i = 0; i < childrenCount; i++) {
                viewElements.push.apply(viewElements,
                    children[i].getViewElements(factory));
            };

            return viewElements;
        }
    });

    function RootElement(options) {
        var root = this;

        options = root.options = $.extend({}, root.options, options);
        ChartElement.call(this, options);
    }

    RootElement.prototype = new ChartElement();
    $.extend(RootElement.prototype, {
        options: {
            width: 800,
            height: 600
        },

        updateLayout: function() {
            var root = this,
                currentBox = new Box(0, 0, root.options.width, root.options.height);

            root.box = currentBox;

            for (var i = 0; i < root.children.length; i++) {
                root.children[i].updateLayout(currentBox);
                currentBox = boxDiff(currentBox, root.children[i].box);
            };
        },

        getView: function(factory) {
            var root = this,
                viewRoot = factory.root(root.options),
                viewElements = viewRoot.children;

            viewElements.push.apply(viewElements, root.getViewElements(factory));

            return viewRoot;
        }
    });

    function Text(content, options) {
        var text = this;
        ChartElement.call(text);

        text.options = $.extend({}, text.options, options);
        text.content = content || "";

        // Calculate size
        text.updateLayout(defaultBox);
    }

    Text.prototype = new ChartElement();

    extend(Text.prototype, {
        options: {
            fontSize: "12pt",
            fontFamily: "Verdana, sans-serif",
            align: "left"
        },

        updateLayout: function(targetBox) {
            var text = this,
                options = text.options,
                size = measureText(text.content, {
                            fontSize: text.options.fontSize,
                            fontFamily: text.options.fontFamily
                        });

            if (options.align == "left") {
                text.box = new Box(
                    targetBox.x1, targetBox.y1,
                    targetBox.x1 + size.width, targetBox.y1 + size.height);
            } else if (options.align == "right") {
                text.box = new Box(
                    targetBox.x2 - size.width, targetBox.y1,
                    targetBox.x2, targetBox.y1 + size.height);
            } else if (options.align == "center") {
                var margin = (targetBox.width() - size.width) / 2;
                text.box = new Box(
                    round(targetBox.x1 + margin, COORD_PRECISION), targetBox.y1,
                    round(targetBox.x2 - margin, COORD_PRECISION), targetBox.y1 + size.height);
                }
        },

        getViewElements: function(factory) {
            var text = this;
            return [
                factory.text(text.content, { x: text.box.x1, y: text.box.y1 })
            ];
        }
    });

    function Title(options) {
        var title = this;
        ChartElement.call(title);

        title.options = $.extend({}, title.options, options);

        var text = new Text(title.options.text);
        title.children.push(text);
    }

    Title.prototype = new ChartElement();

    $.extend(Title.prototype, {
        options: {
            text: "Title",
            position: "top",
            textAlign: "center"
        },

        updateLayout: function(targetBox) {
            var title = this,
                options = title.options,
                text = title.children[0],
                textBox = new Box();

            if (options.position == "top") {
                textBox.y1 = targetBox.y1;
            } else if (options.position == "bottom") {
                textBox.y1 = targetBox.y2 - text.box.height();
            }

            if (title.options.textAlign == "center") {
                textBox.x1 = (targetBox.width() - text.box.width()) / 2;
                textBox.x2 = textBox.x1 + text.box.width();
            }
            text.updateLayout(textBox);

            title.box = new Box(targetBox.x1, targetBox.y1, targetBox.x2, text.box.y2);
        }
    });

    function Legend(options) {
        var legend = this;
        ChartElement.call(legend);

        legend.options = $.extend({}, legend.options, options);
        legend.createLabels();
    }

    Legend.prototype = new ChartElement();
    $.extend(Legend.prototype, {
        options: {
            position: "right",
            series: []
        },

        createLabels: function() {
            var legend = this,
                series = legend.options.series;

            for (var i = 0; i < series.length; i++) {
                var name = series[i].name,
                    label = new Text(name);

                legend.children.push(label);
            };
        },

        updateLayout: function(targetBox) {
            var legend = this,
                labelsBox = new Box();

            // Position labels below each other
            for (var i = 0; i < legend.children.length; i++) {
                var label = legend.children[i];
                label.updateLayout(labelsBox);

                labelsBox.x2 = Math.max(labelsBox.x2, label.box.x2);
                labelsBox.y1 = labelsBox.y2 = label.box.y2;
            };
            labelsBox.y1 = 0;

            // Translate all labels to the final position
            var offsetX = targetBox.x2 - labelsBox.width(),
                offsetY = targetBox.y1 + ((targetBox.height() - labelsBox.height()) / 2);
            for (var i = 0; i < legend.children.length; i++) {
                var label = legend.children[i];
                label.box.translate(offsetX, offsetY);
            };

            labelsBox.translate(offsetX, offsetY);
            labelsBox.y1 = targetBox.y1;
            labelsBox.y2 = targetBox.y2;
            legend.box = labelsBox;
        }
    });

    function NumericAxis(seriesMin, seriesMax, options) {
        var axis = this;
        ChartElement.call(this);

        var autoOptions = {
            min: axis.autoAxisMin(seriesMin, seriesMax),
            max: axis.autoAxisMax(seriesMin, seriesMax),
            majorUnit: axis.autoMajorUnit(seriesMin, seriesMax)
        };

        axis.options = $.extend({}, axis.options, autoOptions, options);

        axis.init();
    }

    NumericAxis.prototype = new ChartElement();
    $.extend(NumericAxis.prototype, {
        options: {
            min: 0,
            max: 1,
            line: "solid",
            majorUnit: 0.1,
            majorTicks: "outside",
            majorTickSize: 4,
            axisCrossingValue: 0,
            isVertical: true
        },

        init: function() {
            var axis = this,
                options = axis.options,
                majorDivisions = axis.getMajorDivisions(),
                currentValue = options.min;

            for (var i = 0; i < majorDivisions; i++) {
                var text = new Text(currentValue.toString(), { align: "right" });
                axis.children.push(text);

                currentValue = round(currentValue + options.majorUnit, DEFAULT_PRECISION);
            }
        },

        updateLayout: function(targetBox) {
            var axis = this,
                options = axis.options,
                isVertical = options.isVertical,
                children = axis.children;

            var maxLabelWidth = 0,
                maxLabelHeight = 0;
            for (var i = 0; i < children.length; i++) {
                var label = children[i];
                maxLabelWidth = Math.max(maxLabelWidth, label.box.width());
                maxLabelHeight = Math.max(maxLabelHeight, label.box.height());
            };

            if (isVertical) {
                axis.box = new Box(
                    targetBox.x1, targetBox.y1,
                    targetBox.x1 + maxLabelWidth + options.majorTickSize, targetBox.y2
                );
            } else {
                axis.box = new Box(
                    targetBox.x1, targetBox.y1,
                    targetBox.x2, targetBox.y1 + options.majorTickSize + maxLabelHeight
                );
            }

            axis.arrangeLabels(maxLabelWidth, maxLabelHeight);
        },

        arrangeLabels: function(maxLabelWidth, maxLabelHeight) {
            var axis = this,
                options = axis.options,
                isVertical = axis.options.isVertical,
                children = axis.children,
                box = axis.box,
                tickPositions = axis.getMajorDivisionsPositions();

            for (var i = 0; i < children.length; i++) {
                var label = children[i],
                    tickIx = isVertical ? (children.length - 1 - i) : i,
                    labelSize = isVertical ? label.box.height() : label.box.width(),
                    labelPos = tickPositions[tickIx] - (labelSize / 2),
                    labelBox = isVertical ?
                        new Box(box.x1, labelPos,
                                box.x1 + maxLabelWidth, labelPos + labelSize) :
                        new Box(labelPos,
                                box.y1 + options.majorTickSize,
                                labelPos + labelSize,
                                box.y1 + options.majorTickSize + maxLabelHeight);


                label.updateLayout(labelBox);
            }
        },

        getViewElements: function(factory) {
            var axis = this,
                children = axis.children,
                options = axis.options,
                isVertical = options.isVertical,
                childElements = ChartElement.prototype.getViewElements.call(axis, factory);

            var majorTickPositions = axis.getMajorDivisionsPositions();
            if (options.line.toLowerCase() == "solid") {
                if (isVertical) {
                    childElements.push(factory.line(
                        axis.box.x2, majorTickPositions[0],
                        axis.box.x2, majorTickPositions[majorTickPositions.length - 1]));
                } else {
                    childElements.push(factory.line(
                        majorTickPositions[0], axis.box.y1,
                        majorTickPositions[majorTickPositions.length - 1], axis.box.y1));
                }
            }

            [].push.apply(childElements, axis.renderTicks(factory));

            return childElements;
        },

        renderTicks: function(factory) {
            var axis = this,
                options = axis.options,
                isVertical = options.isVertical,
                box = axis.box;

            var majorTickPositions = axis.getMajorDivisionsPositions();
            return $.map(majorTickPositions, function(tickPos) {
                if (isVertical) {
                    return factory.line(
                        box.x2 - options.majorTickSize, tickPos,
                        box.x2, tickPos
                    );
                } else {
                    return factory.line(
                        tickPos, box.y1,
                        tickPos, box.y1 + options.majorTickSize
                    );
                }
            });
        },

        autoMajorUnit: function (min, max) {
            var diff = max - min;

            if (diff == 0) {
                if (max == 0) {
                    return 0.1;
                }

                diff = Math.abs(max);
            }

            var scale = Math.pow(10, Math.floor(Math.log(diff) / Math.log(10))),
                relativeValue = round((diff / scale), DEFAULT_PRECISION),
                scaleMultiplier = 1;

            if (relativeValue < 1.904762) {
                scaleMultiplier = 0.2;
            } else if (relativeValue < 4.761904) {
                scaleMultiplier = 0.5;
            } else if (relativeValue < 9.523809) {
                scaleMultiplier = 1;
            } else {
                scaleMultiplier = 2;
            }

            return round(scale * scaleMultiplier, DEFAULT_PRECISION);
        },

        autoAxisMax: function(min, max) {
            if (min == 0 && max == 0) {
                return 1;
            }

            var axisMax;
            if (min <= 0 && max <= 0) {
                max = min == max ? 0 : max;

                var diff = Math.abs((max - min) / max);
                if(diff > ZERO_THRESHOLD) {
                    return 0;
                }

                axisMax = max - ((min - max) / 2);
            } else {
                min = min == max ? 0 : min;
                axisMax = max + 0.05 * (max - min);
            }

            var mu = this.autoMajorUnit(min, max);
            return ceil(axisMax, mu);
        },

        autoAxisMin: function(min, max) {
            if (min == 0 && max == 0) {
                return 0;
            }

            var axisMin;
            if (min >= 0 && max >= 0) {
                min = min == max ? 0 : min;

                var diff = (max - min) / max;
                if(diff > ZERO_THRESHOLD) {
                    return 0;
                }

                axisMin = min - ((max - min) / 2);
            } else {
                max = min == max ? 0 : max;
                axisMin = min + 0.05 * (min - max);
            }

            var mu = this.autoMajorUnit(min, max);
            return floor(axisMin, mu);
        },

        getMajorDivisions: function() {
            var options = this.options;

            return Math.round((options.max - options.min) / options.majorUnit) + 1;
        },

        getMajorDivisionsPositions: function() {
            var axis = this,
                options = axis.options,
                isVertical = options.isVertical,
                children = axis.children,
                box = axis.box,
                lineBox = axis.getAxisLineBox(),
                majorDivisions = axis.getMajorDivisions(),
                lineSize = isVertical ? lineBox.height() : lineBox.width(),
                step = lineSize / (majorDivisions - 1),
                pos = lineBox[(isVertical ? Y : X) + 1],
                positions = [];

            for (var i = 0; i < majorDivisions; i++) {
                positions.push(round(pos, COORD_PRECISION));
                pos += step;
            }

            return positions;
        },

        getAxisLineBox: function() {
            var axis = this,
                options = axis.options,
                isVertical = options.isVertical,
                labelSize = isVertical ? "height" : "width",
                children = axis.children,
                box = axis.box,
                startMargin = 0,
                endMargin = 0;

            if (children.length > 1) {
                startMargin = children[0].box[labelSize]() / 2;
                endMargin = children[children.length - 1].box[labelSize]() / 2;
            }

            if (isVertical) {
               return new Box(box.x2, box.y1 + startMargin,
                 box.x2, box.y2 - endMargin);
            } else {
               return new Box(box.x1 + startMargin, box.y1,
                 box.x2 - endMargin, box.y1);
            }
        },

        getSlot: function(a, b) {
            var axis = this,
                children = axis.children,
                options = axis.options,
                isVertical = options.isVertical,
                valueAxis = isVertical ? Y : X,
                lineBox = axis.getAxisLineBox(),
                lineStart = lineBox[valueAxis + 1],
                lineSize = isVertical ? lineBox.height() : lineBox.width(),
                scale = lineSize / (options.max - options.min),
                a = Math.max(Math.min(a, options.max), options.min),
                b = Math.max(Math.min(b || options.axisCrossingValue, options.max), options.min),
                p1,
                p2,
                slotBox = new Box(lineBox.x1, lineBox.y1, lineBox.x1, lineBox.y1);

            if (isVertical) {
                p1 = lineStart + scale * (options.max - Math.max(a, b));
                p2 = lineStart + scale * (options.max - Math.min(a, b));
            } else {
                p1 = lineStart + scale * (Math.min(a, b) - options.min);
                p2 = lineStart + scale * (Math.max(a, b) - options.min);
            }

            slotBox[valueAxis + 1] = p1;
            slotBox[valueAxis + 2] = p2;

            return slotBox;
        }
    });

    function CategoryAxis(options) {
        var axis = this;
        ChartElement.call(axis);

        axis.options = $.extend({}, axis.options, options);
        axis.init();
    }

    CategoryAxis.prototype = new ChartElement();
    $.extend(CategoryAxis.prototype, {
        options: {
            labels: [],
            line: "solid",
            majorTickLength: 4,
            isVertical: false,
            axisCrossingValue: 0
        },

        init: function() {
            var axis = this,
                options = axis.options;

            for (var i = 0; i < options.labels.length; i++) {
                var label = options.labels[i];
                axis.children.push(new Text(label, { align: "center" }));
            }
        },

        updateLayout: function(targetBox) {
            var axis = this,
                options = axis.options,
                isVertical = options.isVertical,
                children = axis.children,
                width = targetBox.width(),
                step = width / children.length,
                x = (step / 2) + targetBox.x1,
                maxLabelHeight = 0,
                maxLabelWidth = 0;

            for (var i = 0; i < children.length; i++) {
                var label = children[i];
                maxLabelHeight = Math.max(maxLabelHeight, label.box.height());
                maxLabelWidth = Math.max(maxLabelWidth, label.box.width());
            }

            if (isVertical) {
                axis.box = new Box(
                    targetBox.x1, targetBox.y1,
                    targetBox.x1 + options.majorTickLength + maxLabelWidth, targetBox.y2
                );
            } else {
                axis.box = new Box(
                    targetBox.x1, targetBox.y1,
                    targetBox.x2, targetBox.y1 + options.majorTickLength + maxLabelHeight
                );
            }

            var majorDivisions = axis.getMajorTickPositions();

            if (isVertical) {
                labelX = axis.box.x2 - options.majorTickLength;
                for (var i = 0; i < children.length; i++) {
                    var label = children[i],
                        currentDivision = majorDivisions[i],
                        nextDivision = majorDivisions[i + 1],
                        middle = currentDivision + (nextDivision - currentDivision) / 2,
                        labelY = middle - label.box.height() / 2;

                    label.updateLayout(new Box(
                        labelX - label.box.width(), labelY,
                        labelX, labelY + label.box.height()
                    ));
                }
            } else {
                labelY = axis.box.y1 + options.majorTickLength;
                for (var i = 0; i < children.length; i++) {
                    var label = children[i],
                        currentDivision = majorDivisions[i],
                        nextDivision = majorDivisions[i + 1];

                    label.updateLayout(new Box(
                        currentDivision, labelY,
                        nextDivision, labelY + label.box.height()
                    ));
                }
            }
        },

        getViewElements: function(factory) {
            var axis = this,
                children = axis.children,
                options = axis.options,
                isVertical = options.isVertical,
                childElements = ChartElement.prototype.getViewElements.call(axis, factory);

            if (options.line.toLowerCase() == "solid") {
                if (isVertical) {
                    childElements.push(factory.line(
                        axis.box.x2, axis.box.y1,
                        axis.box.x2, axis.box.y2));
                } else {
                    childElements.push(factory.line(
                        axis.box.x1, axis.box.y1,
                        axis.box.x2, axis.box.y1));
                }
            }

            [].push.apply(childElements, axis.renderTicks(factory));

            return childElements;
        },

        renderTicks: function(factory) {
            var axis = this,
                options = axis.options,
                isVertical = options.isVertical,
                box = axis.box;

            var majorTickPositions = axis.getMajorTickPositions();
            return $.map(majorTickPositions, function(tickPos) {
                if (isVertical) {
                    return factory.line(
                        box.x2 - options.majorTickLength, tickPos,
                        box.x2, tickPos
                    );
                } else {
                    return factory.line(
                        tickPos, box.y1,
                        tickPos, box.y1 + options.majorTickLength
                    );
                }
            });
        },

        getMajorTickPositions: function() {
            var axis = this,
                options = axis.options,
                isVertical = options.isVertical,
                children = axis.children,
                size = isVertical ? axis.box.height() : axis.box.width(),
                step = size / children.length,
                pos = isVertical ? axis.box.y1 : axis.box.x1,
                positions = [];

            for (var i = 0; i < children.length; i++) {
                positions.push(pos);
                pos += step;
            };

            positions.push(isVertical ? axis.box.y2 : axis.box.x2);

            return positions;
        },

        getSlot: function(categoryIx) {
            var axis = this,
                options = axis.options,
                isVertical = options.isVertical,
                children = axis.children,
                box = axis.box,
                size = isVertical ? box.height() : box.width(),
                startPos = isVertical ? box.y1 : box.x1,
                step = size / children.length,
                p1 = startPos + (categoryIx * step),
                p2 = p1 + step;

            return isVertical ?
                   new Box(box.x2, p1, box.x2, p2) :
                   new Box(p1, box.y1, p2, box.y1);
        }
    });

    function ClusterLayout(options) {
        var cluster = this;
        ChartElement.call(cluster);

        cluster.options = $.extend({}, cluster.options, options);
    }

    ClusterLayout.prototype = new ChartElement();
    $.extend(ClusterLayout.prototype, {
        options: {
            isVertical: false,
            gap: 1.5
        },

        updateLayout: function(box) {
            var cluster = this,
                options = cluster.options,
                isVertical = options.isVertical,
                axis = isVertical ? Y : X,
                children = cluster.children,
                gap = options.gap,
                slots = children.length + gap,
                slotSize = (isVertical ? box.height() : box.width()) / slots,
                position = box[axis + 1] + slotSize * (gap / 2);

            for (var i = 0; i < children.length; i++) {
                var childBox = (children[i].box || box).clone();

                childBox[axis + 1] = position;
                childBox[axis + 2] = position + slotSize;

                children[i].updateLayout(childBox);

                position += slotSize;
            };
        }
    });

    function StackLayout(options) {
        var stack = this;
        ChartElement.call(stack);

        stack.options = $.extend({}, stack.options, options);
    }

    StackLayout.prototype = new ChartElement();
    $.extend(StackLayout.prototype, {
        options: {
            isVertical: true,
            isReversed: false
        },

        updateLayout: function(targetBox) {
            var stack = this,
                options = stack.options,
                isVertical = options.isVertical,
                stackAxis = isVertical ? Y : X,
                positionAxis = isVertical ? X : Y,
                children = stack.children,
                box = stack.box = new Box(),
                stackDirection;

            if (options.isReversed) {
                stackDirection = isVertical ? BOTTOM : LEFT;
            } else {
                stackDirection = isVertical ? TOP : RIGHT;
            }

            for (var i = 0; i < children.length; i++) {
                var currentChild = children[i],
                    childBox = currentChild.box.clone();

                childBox.snapTo(targetBox, positionAxis)

                if (i > 0) {
                    childBox.alignTo(children[i - 1].box, stackDirection);
                } else {
                    box = stack.box = childBox.clone();
                }

                currentChild.updateLayout(childBox);

                box.wrap(childBox);
            }
        }
    });

    function Bar(options) {
        var bar = this;
        ChartElement.call(bar);

        bar.options = $.extend({}, bar.options, options);
    }

    Bar.prototype = new ChartElement();
    $.extend(Bar.prototype, {
        options: {
            style: {
                fill: "#000",
                borderWidth: 1
            }
        },

        updateLayout: function(targetBox) {
            this.box = targetBox;
        },

        getViewElements: function(factory) {
            var bar = this,
                options = bar.options,
                box = bar.box,
                elements = [];

            elements.push(
                factory.rect(box, options.style)
            );

            return elements;
        }
    });

    function BarChart(plotArea, options) {
        var chart = this;
        ChartElement.call(chart);

        chart.plotArea = plotArea;
        chart.options = $.extend({}, chart.options, options);
        chart._seriesMin = Number.MAX_VALUE;
        chart._seriesMax = - Number.MAX_VALUE;
        chart._bars = [];

        chart.init();
    }

    BarChart.prototype = new ChartElement();
    $.extend(BarChart.prototype, {
        options: {
            series: [],
            isVertical: true,
            isStacked: false,
            gap: 1.5
        },

        init: function() {
            var barChart = this,
                options = barChart.options,
                isStacked = barChart.options.isStacked,
                positiveSums = [],
                negativeSums = [];

            barChart.traverseDataPoints(function(value, categoryIx, series) {
                if (isStacked) {
                    var sums = value > 0 ? positiveSums : negativeSums;
                    if (sums.length === categoryIx) {
                        sums[categoryIx] = value;
                    } else {
                        sums[categoryIx] += value;
                    }
                } else {
                    barChart._seriesMin = Math.min(barChart._seriesMin, value);
                    barChart._seriesMax = Math.max(barChart._seriesMax, value);
                }

                barChart.addValue(value, categoryIx, series);
            });

            if (negativeSums.length === 0) {
                negativeSums = positiveSums;
            }

            if (positiveSums.length === 0) {
                positiveSums = negativeSums;
            }

            if (isStacked) {
                barChart._seriesMin = Math.min.apply(Math, negativeSums);
                barChart._seriesMax = Math.max.apply(Math, positiveSums);
            }
        },

        addValue: function(value, categoryIx, series) {
            var barChart = this,
                options = barChart.options,
                children = barChart.children,
                isStacked = barChart.options.isStacked;

            var bar = new Bar({ style: series.style });
            barChart._bars.push(bar);

            var cluster = children[categoryIx];
            if (!cluster) {
                cluster = children[categoryIx] = new ClusterLayout({
                    isVertical: !options.isVertical,
                    gap: options.gap
                });
            }

            if (isStacked) {
                var stackWrap = cluster.children[0],
                positiveStack,
                negativeStack;

                if (!stackWrap) {
                    stackWrap = new ChartElement();
                    cluster.children.push(stackWrap);

                    positiveStack = new StackLayout({
                        isVertical: options.isVertical
                    });
                    negativeStack = new StackLayout({
                        isVertical: options.isVertical,
                        isReversed: true
                    });
                    stackWrap.children.push(positiveStack, negativeStack);
                } else {
                    positiveStack = stackWrap.children[0];
                    negativeStack = stackWrap.children[1];
                }

                if (value > 0) {
                    positiveStack.children.push(bar);
                } else {
                    negativeStack.children.push(bar);
                }
            } else {
                cluster.children.push(bar);
            }
        },

        getValueRange: function() {
            var barChart = this;
            return { min: barChart._seriesMin, max: barChart._seriesMax };
        },

        updateLayout: function(targetBox) {
            var barChart = this,
                options = barChart.options,
                isVertical = options.isVertical,
                plotArea = barChart.plotArea,
                children = barChart.children,
                barIndex = 0,
                categorySlots = [],
                bars = barChart._bars;

            barChart.traverseDataPoints(function(value, categoryIx) {
                var bar = bars[barIndex++];

                var slotX = plotArea.axisX.getSlot(isVertical ? categoryIx : value);
                var slotY = plotArea.axisY.getSlot(isVertical ? value : categoryIx);

                var barSlot = new Box(slotX.x1, slotY.y1, slotX.x2, slotY.y2);
                bar.updateLayout(barSlot);

                if(!categorySlots[categoryIx]) {
                    categorySlots[categoryIx] = isVertical ? slotX : slotY;
                }
            });

            for (var i = 0; i < children.length; i++) {
                children[i].updateLayout(categorySlots[i]);
            };

            barChart.box = targetBox;
       },

       traverseDataPoints: function(callback) {
            var barChart = this,
                options = barChart.options,
                series = options.series,
                categoriesCount = series.length > 0 ? series[0].data.length : 0;

            for (var categoryIx = 0; categoryIx < categoriesCount; categoryIx++) {
                for (var seriesIx = 0; seriesIx < series.length; seriesIx++) {
                    var currentSeries = series[seriesIx],
                        value = currentSeries.data[categoryIx];

                    callback(value, categoryIx, currentSeries);
                }
            }
       }
    });


    function PlotArea(options) {
        var plotArea = this;
        ChartElement.call(plotArea);

        plotArea.options = $.extend({}, plotArea.options, options);
        plotArea.init();
    }

    PlotArea.prototype = new ChartElement();
    $.extend(PlotArea.prototype, {
        options: {
            axisY: { },
            axisX: { },
            series: [ ]
        },

        init: function() {
            var plotArea = this,
                options = plotArea.options,
                charts = plotArea.charts = [],
                range = { min: 0, max: 1 };

            var barSeries = $.grep(options.series, function(currentSeries) {
                return currentSeries.type == "bar";
            });

            if (barSeries.length > 0) {
                var barChart = new BarChart(this, { series: barSeries });

                range = barChart.getValueRange();
                charts.push(barChart);
                [].push.apply(plotArea.children, charts);
            }

            plotArea.createAxes(range.min, range.max);
        },

        createAxes: function(seriesMin, seriesMax) {
            var plotArea = this,
                options = plotArea.options;

            plotArea.axisY =
                new NumericAxis(seriesMin, seriesMax, plotArea.options.axisY);

            plotArea.axisX = new CategoryAxis(options.axisX);
            /*
            plotArea.axisX = new NumericAxis(seriesMin, seriesMax, plotArea.options.axisY);
            plotArea.axisY = new CategoryAxis(options.axisX);
            */

            plotArea.children.push(plotArea.axisY);
            plotArea.children.push(plotArea.axisX);
        },

        updateLayout: function(targetBox) {
            var plotArea = this,
                charts = plotArea.charts,
                axisY = plotArea.axisY,
                axisX = plotArea.axisX;

            plotArea.box = targetBox;

            axisY.updateLayout(targetBox);
            axisX.updateLayout(targetBox);

            plotArea.alignAxes();

            var axisBox = new Box().wrap(axisY.box).wrap(axisX.box);
            var overflowY = axisBox.height() - targetBox.height();
            var overflowX = axisBox.width() - targetBox.width();

            var offsetX = targetBox.x1 - axisBox.x1;
            var offsetY = targetBox.y1 - axisBox.y1;

            axisY.updateLayout(
                axisY.box.translate(offsetX, offsetY).shrink(0, overflowY)
            );

            axisX.updateLayout(
                axisX.box.translate(offsetX, offsetY).shrink(overflowX, 0)
            );

            plotArea.alignAxes();

            for (var i = 0; i < charts.length; i++) {
                charts[i].updateLayout(targetBox);
            }
        },

        alignAxes: function() {
            var plotArea = this,
                axisY = plotArea.axisY,
                axisX = plotArea.axisX,
                crossingValueY = axisY.options.axisCrossingValue,
                axisCrossingY = axisY.getSlot(crossingValueY, crossingValueY),
                crossingValueX = axisX.options.axisCrossingValue,
                axisCrossingX = axisX.getSlot(crossingValueX, crossingValueX);

            axisY.updateLayout(
                axisY.box.translate(axisCrossingX.x1 - axisCrossingY.x1, 0)
            );

            axisX.updateLayout(
                axisX.box.translate(0, axisCrossingY.y1 - axisCrossingX.y1)
            );
        }
    });

    // **************************
    // Visual elements - Generic, SVG, VML
    // **************************

    function ViewElement() {
        var element = this;

        element.children = [];
    }

    ViewElement.prototype = {
        render: function() {
            return this.template(this);
        },

        renderContent: function() {
            var output = "",
                element = this,
                childrenCount = element.children.length;

            for (var i = 0; i < childrenCount; i++) {
                output += element.children[i].render();
            }

            return output;
        }
    };


    function SVGFactory() {}

    $.extend(SVGFactory.prototype, {
        root: function(options) {
            return new SVGRoot(options);
        },

        group: function() {
            return new SVGGroup();
        },

        text: function(content, options) {
            return new SVGText(content, options);
        },

        rect: function(box, style) {
            return new SVGPath(
                [[box.x1, box.y1], [box.x2, box.y1],
                [box.x2, box.y2], [box.x1, box.y2], [box.x1, box.y1]],
                style
            );
        },

        line: function(x1, y1, x2, y2) {
            return new SVGPath([[x1, y1], [x2, y2]]);
        }
    });

    function SVGRoot(options) {
        var root = this;

        options = root.options = $.extend({}, root.options, options);
        ViewElement.call(root, options);

        root.template = SVGRoot.template;
        if (!root.template) {
                root.template = SVGRoot.template = kendo.template(
                "<svg xmlns='http://www.w3.org/2000/svg' version='1.1' " +
                "width='<%= options.width %>' height='<%= options.height %>'>" +
                "<%= renderContent() %></svg>"
            );
        }
    }

    SVGRoot.prototype = new ViewElement();
    $.extend(SVGRoot.prototype, {
        options: {
            width: "800px",
            height: "600px"
        }
    });


    function SVGGroup() {
        var group = this;

        ViewElement.call(group);
        group.template = kendo.template("<g><%= renderContent() %></g>");
    }

    SVGGroup.prototype = new ViewElement();


    function SVGText(content, options) {
        var text = this,
            options = text.options = $.extend({}, text.options, options);

        text.content = content || "";

        ViewElement.call(text);
        text.template = SVGText.template;
        if (!text.template) {
            text.template = SVGText.template = kendo.template(
                "<text x='<%= options.x %>' y='<%= options._baselineY %>' " +
                "style='font: <%= fontStyle() %>'><%= content %></text>"
            );
        }

        text.align();
    }

    SVGText.prototype = new ViewElement();
    $.extend(SVGText.prototype, {
        options: {
            x: 0,
            y: 0,
            _baselineY: 0,
            fontSize: "12pt",
            fontFamily: "Verdana, sans-serif"
        },

        align: function() {
            var text = this,
            size = measureText(text.content, {
                fontSize: text.options.fontSize,
                fontFamily: text.options.fontFamily
            });

            text.options._baselineY = text.options.y + size.baseline;
            text.options.y += size.baseline;
        },

        fontStyle: function() {
            var options = this.options;
            return options.fontSize + " " + options.fontFamily;
        }
    });

    function SVGPath(points, options) {
        var path = this;

        ViewElement.call(path);
        path.template = SVGPath.template;
        if (!path.template) {
            path.template = SVGPath.template = kendo.template(
                "<path d='<%= renderPoints() %>' " +
                "stroke='<%= options.stroke %>' fill='<%= options.fill %>'></path>"
            );
        }

        path.points = points || [];
        path.options = $.extend({}, path.options, options);
    }

    SVGPath.prototype = new ViewElement();
    $.extend(SVGPath.prototype, {
        options: {
            stroke: "#000",
            fill: "#fff"
        },

        renderPoints: function() {
            var points = this.points,
                count = points.length,
                first = points[0],
                result = "M" + alignToPixel(first[0]) + " " + alignToPixel(first[1]);

            for (var i = 1; i < count; i++) {
                var p = points[i];
                result += " L" + alignToPixel(p[0]) + " " + alignToPixel(p[1]);
            }

            return result;
        }
    });

    function VMLFactory() {
        if (document.namespaces) {
            document.namespaces.add("kvml", "urn:schemas-microsoft-com:vml", "#default#VML");
        }
    }

    $.extend(VMLFactory.prototype, {
        root: function(options) {
            return new VMLRoot(options);
        },

        text: function(content, options) {
            return new VMLText(content, options);
        },

        rect: function(box, style) {
            return new VMLPath(
                [[box.x1, box.y1], [box.x2, box.y1],
                [box.x2, box.y2], [box.x1, box.y2], [box.x1, box.y1]],
                style
            );
        },

        line: function(x1, y1, x2, y2) {
            return new VMLPath([[x1, y1], [x2, y2]]);
        }
    });

    function VMLRoot(options) {
        var root = this;

        options = root.options = $.extend({}, root.options, options);
        ViewElement.call(root, options);

        root.template = VMLRoot.template;
        if (!root.template) {
            root.template = VMLRoot.template = kendo.template(
                "<div style='width:<%= options.width %>; height:<%= options.height %>; " +
                            "position: relative;'>" +
                            "<%= renderContent() %></div>"
            );
        }
    }

    VMLRoot.prototype = new ViewElement();
    $.extend(VMLRoot.prototype, {
        options: {
            width: "800px",
            height: "600px"
        }
    });

    function VMLText(content, options) {
        var text = this,
            options = text.options = $.extend({}, text.options, options);

        text.content = content || "";

        ViewElement.call(text);
        text.template = VMLText.template;
        if (!text.template) {
            text.template = VMLText.template = kendo.template(
                "<kvml:textbox style='position: absolute; " +
                    "left:<%= options.x %>px; top:<%= options.y %>px; " +
                    "font:<%= fontStyle() %>'><%= content %></kvml:textbox>"
            );
        }
    }

    VMLText.prototype = new ViewElement();
    $.extend(VMLText.prototype, {
        options: {
            x: 0,
            y: 0,
            fontSize: "12pt",
            fontFamily: "Verdana, sans-serif"
        },

        fontStyle: function() {
            var options = this.options;
            return options.fontSize + " " + options.fontFamily;
        }
    });

    function VMLPath(points, options) {
        var path = this;
        ViewElement.call(path);

        path.template = VMLPath.template;
        if (!path.template) {
            path.template = VMLPath.template = kendo.template(
                "<kvml:shape style='position:absolute; width:1px; height:1px;' " +
                "strokecolor='<%= options.stroke %>' fillcolor='<%= options.fill %>' " +
                "coordorigin='0 0' coordsize='1 1'>" +
                "<kvml:path v='<%= renderPoints() %> e' /></kvml:shape>"
            );
        }

        path.points = points || [];
        path.options = $.extend({}, path.options, options);
    }

    VMLPath.prototype = new ViewElement();
    $.extend(VMLPath.prototype, {
        options: {
            stroke: "#000",
            fill: "#fff"
        },

        renderPoints: function() {
            var points = this.points,
                count = points.length,
                first = points[0],
                result = "m " + round(first[0]) + "," + round(first[1]);

            if (count > 1) {
                result += " l";

                for (var i = 1; i < count; i++) {
                    var p = points[i];
                    result += " " + round(p[0]) + "," + round(p[1]);

                    if (i < count - 1) {
                        result += ",";
                    }
                }
            }

            return result;
        }
    });

    // Helper functions
    function ceil(value, step) {
        return round(Math.ceil(value / step) * step, DEFAULT_PRECISION);
    }

    function floor(value, step) {
        return round(Math.floor(value / step) * step, DEFAULT_PRECISION);
    }

    function round(value, precision) {
        var power = Math.pow(10, precision || 0);
        return Math.round(value * power) / power;
    }

    function measureText(text, style) {
        var styleHash = getHash(style),
            cacheKey = text + styleHash,
            cachedResult = measureText.cache[cacheKey];

        if(cachedResult) {
            return cachedResult;
        }

        var measureBox = measureText.measureBox,
            baselineMarker = measureText.baselineMarker.cloneNode(false);

        if (!measureBox) {
            measureBox = measureText.measureBox =
                $("<div style='position: absolute; top: -4000px; left: -4000px;" +
                              "line-height: normal; visibility: hidden;' />")
                .appendTo(document.body)[0];
        }

        for (var styleKey in style) {
            measureBox.style[styleKey] = style[styleKey];
        }
        measureBox.innerHTML = text || "&nbsp;";
        measureBox.appendChild(baselineMarker);

        var size = {
            width: measureBox.offsetWidth - BASELINE_MARKER_SIZE,
            height: measureBox.offsetHeight,
            baseline: baselineMarker.offsetTop + BASELINE_MARKER_SIZE
        };

        measureText.cache[cacheKey] = size;

        return size;
    }

    measureText.cache = [];
    measureText.baselineMarker =
        $("<div style='display: inline-block; vertical-align: baseline;" +
                  "width: " + BASELINE_MARKER_SIZE + "px; height: " + BASELINE_MARKER_SIZE + "px;" +
                  "zoom: 1; *display: inline; overflow: hidden;' />")[0];

    function getHash(object) {
        var hash = [];
        for (var key in object) {
            hash.push(key + object[key]);
        }

        return hash.sort().join(" ");
    }


    function boxDiff( r, s ) {
        var a = Math.min( r.x1, s.x1 );
        var b = Math.max( r.x1, s.x1 );
        var c = Math.min( r.x2, s.x2 );
        var d = Math.max( r.x2, s.x2 );

        var e = Math.min( r.y1, s.y1 );
        var f = Math.max( r.y1, s.y1 );
        var g = Math.min( r.y2, s.y2 );
        var h = Math.max( r.y2, s.y2 );

        // X = intersection, 0-7 = possible difference areas
        // h +-+-+-+
        // . |5|6|7|
        // g +-+-+-+
        // . |3|X|4|
        // f +-+-+-+
        // . |0|1|2|
        // e +-+-+-+
        // . a b c d

        var result = [];

        // we'll always have rectangles 1, 3, 4 and 6
        result[ 0 ] = new Box( b, e, c, f );
        result[ 1 ] = new Box( a, f, b, g );
        result[ 2 ] = new Box( c, f, d, g );
        result[ 3 ] = new Box( b, g, c, h );

        // decide which corners
        if( r.x1 == a && r.y1 == e || s.x1 == a && s.y1 == e )
        { // corners 0 and 7
            result[ 4 ] = new Box( a, e, b, f );
            result[ 5 ] = new Box( c, g, d, h );
        }
        else
        { // corners 2 and 5
            result[ 4 ] = new Box( c, e, d, f );
            result[ 5 ] = new Box( a, g, b, h );
        }

        return $.grep(result, function(box) {
            return box.height() > 0 && box.width() > 0
        })[0];
    }

    function alignToPixel(coord) {
        return Math.round(coord) + 0.5;
    }

    // Make the internal functions public for unit testing

    Chart.Box = Box;
    Chart.Text = Text;
    Chart.RootElement = RootElement;
    Chart.NumericAxis = NumericAxis;
    Chart.CategoryAxis = CategoryAxis;
    Chart.Bar = Bar;
    Chart.BarChart = BarChart;
    Chart.ClusterLayout = ClusterLayout;
    Chart.StackLayout = StackLayout;
    Chart.Title = Title;
    Chart.Legend = Legend;
    Chart.PlotArea = PlotArea;
    Chart.SVGFactory = SVGFactory;
    Chart.SVGRoot = SVGRoot;
    Chart.SVGGroup = SVGGroup;
    Chart.SVGText = SVGText;
    Chart.SVGPath = SVGPath;
    Chart.VMLFactory = VMLFactory;
    Chart.VMLRoot = VMLRoot;
    Chart.VMLText = VMLText;
    Chart.VMLPath = VMLPath;

})(jQuery);

