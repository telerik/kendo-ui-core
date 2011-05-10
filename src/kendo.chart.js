(function ($) {
    var kendo = window.kendo,
        ui = kendo.ui = kendo.ui || {},
        extend = $.extend,
        SVG_NS = "http://www.w3.org/2000/svg",
        DEFAULT_PRECISION = 6,
        COORD_PRECISION = 3,
        ZERO_THRESHOLD = 0.2;

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

            _snapLineToBottom: false
        },

        init: function() {
            var axis = this,
                options = axis.options,
                majorDivisions = axis.getMajorDivisions(),
                currentValue = options.max;

            for (var i = 0; i < majorDivisions; i++) {
                var text = new Text(currentValue.toString(), { align: "right" });
                axis.children.push(text);

                currentValue = round(currentValue - options.majorUnit, DEFAULT_PRECISION);
            }
        },

        updateLayout: function(targetBox) {
            var axis = this,
                options = axis.options,
                children = axis.children;

            var maxLabelWidth = 0;
            for (var i = 0; i < children.length; i++) {
                var label = children[i];
                maxLabelWidth = Math.max(maxLabelWidth, label.box.width());
            };

            axis.box = new Box(
                targetBox.x1, targetBox.y1,
                targetBox.x1 + maxLabelWidth + options.majorTickSize, targetBox.y2
            );

            var majorTickPositions = axis.getMajorDivisionsPositions();
            for (var i = 0; i < children.length; i++) {
                var label = children[i],
                    labelY = majorTickPositions[i] - (label.box.height() / 2);

                label.updateLayout(new Box(
                    targetBox.x1, labelY,
                    targetBox.x1 + maxLabelWidth, labelY + label.box.height())
                );
            };
        },

        getViewElements: function(factory) {
            var axis = this,
                children = axis.children,
                options = axis.options,
                childElements = ChartElement.prototype.getViewElements.call(axis, factory);

            var majorTickPositions = axis.getMajorDivisionsPositions();
            if (options.line.toLowerCase() == "solid") {
                childElements.push(factory.line(
                        axis.box.x2, majorTickPositions[0],
                        axis.box.x2, majorTickPositions[majorTickPositions.length - 1]));
            }

            [].push.apply(childElements, axis.renderTicks(factory));

            return childElements;
        },

        renderTicks: function(factory) {
            var axis = this,
                options = axis.options,
                box = axis.box;

            var majorTickPositions = axis.getMajorDivisionsPositions();
            return $.map(majorTickPositions, function(majorTickY) {
                return factory.line(
                    box.x2 - options.majorTickSize, majorTickY,
                    box.x2, majorTickY
                );
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
                children = axis.children,
                box = axis.box,
                majorDivisions = axis.getMajorDivisions(),
                marginTop = 0,
                marginBottom = 0;

            if (children.length > 1) {
                marginTop = children[0].box.height() / 2;
                if (!axis.options._snapLineToBottom) {
                    marginBottom = marginTop;
                }
            }

            var step = (box.height() - marginTop - marginBottom) / (majorDivisions - 1),
                y = box.y1 + marginTop,
                positions = [];

            for (var i = 0; i < majorDivisions; i++) {
                positions.push(round(y, COORD_PRECISION));
                y = y + step;
            }

            return positions;
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
            majorTickLength: 4
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
                children = axis.children,
                width = targetBox.width(),
                step = width / children.length,
                x = (step / 2) + targetBox.x1,
                maxLabelHeight = 0;

            for (var i = 0; i < children.length; i++) {
                var label = children[i];
                maxLabelHeight = Math.max(maxLabelHeight, label.box.height());
            }

            axis.box = new Box(
                targetBox.x1, targetBox.y2 - maxLabelHeight - options.majorTickLength,
                targetBox.x2, targetBox.y2
            );

            var majorDivisions = axis.getMajorTickPositions(),
                labelY = targetBox.y2 - maxLabelHeight;
            for (var i = 0; i < children.length; i++) {
                var label = children[i],
                    currentDivision = majorDivisions[i],
                    nextDivision = majorDivisions[i + 1];

                label.updateLayout(new Box(
                    currentDivision, labelY,
                    nextDivision, labelY + label.box.height()
                ));
            }
        },

        getViewElements: function(factory) {
            var axis = this,
                children = axis.children,
                options = axis.options,
                childElements = ChartElement.prototype.getViewElements.call(axis, factory);

            if (options.line.toLowerCase() == "solid") {
                childElements.push(factory.line(
                        axis.box.x1, axis.box.y1,
                        axis.box.x2, axis.box.y1));
            }

            [].push.apply(childElements, axis.renderTicks(factory));

            return childElements;
        },

        renderTicks: function(factory) {
            var axis = this,
                options = axis.options,
                box = axis.box;

            var majorTickPositions = axis.getMajorTickPositions();
            return $.map(majorTickPositions, function(majorTickX) {
                return factory.line(
                    majorTickX, box.y1,
                    majorTickX, box.y1 + options.majorTickLength
                );
            });
        },

        getMajorTickPositions: function() {
            var axis = this,
                options = axis.options,
                children = axis.children,
                width = axis.box.width(),
                step = width / children.length,
                x = axis.box.x1,
                positions = [];

            for (var i = 0; i < children.length; i++) {
                positions.push(x);
                x = round(x + step, COORD_PRECISION);
            };

            positions.push(axis.box.x2);

            return positions;
        }
    });

    var BAR_WIDTH_RATIO = 2.6;
    function BarSeries(axisMin, axisMax, options) {
        var series = this;
        ChartElement.call(series);

        series._axisMin = axisMin;
        series._axisMax = axisMax;
        series.options = $.extend({}, series.options, options);
    }

    BarSeries.prototype = new ChartElement();
    $.extend(BarSeries.prototype, {
        options: {
        },

        getViewElements: function(factory) {
            var series = this,
                options = series.options,
                box = series.box,
                elements = [],
                dataLength = options.data.length,
                scale = box.height() / (series._axisMax - series._axisMin),
                categoryStep = box.width() / dataLength,
                barWidth = round(categoryStep / BAR_WIDTH_RATIO, COORD_PRECISION),
                barCenterX = box.x1 + categoryStep / 2,
                barBottomY = box.y2;

            for (var i = 0; i < dataLength; i++) {
                var value = options.data[i],
                    barHeight = round(value * scale, COORD_PRECISION),
                    barX = round(barCenterX - barWidth / 2, COORD_PRECISION),
                    barY = round(barBottomY - barHeight, COORD_PRECISION);

                elements.push(factory.rect(barX, barY, barWidth, barHeight));
                barCenterX += categoryStep;
            }

            return elements;
        },

        updateLayout: function(targetBox) {
            this.box = targetBox;
        }
    });


    function PlotArea(options) {
        var plotArea = this;
        ChartElement.call(plotArea);

        plotArea.options = $.extend({}, plotArea.options, options);
        plotArea.createAxes();
    }

    PlotArea.prototype = new ChartElement();
    $.extend(PlotArea.prototype, {
        options: {
            axisY: { },
            axisX: { },
            series: [ ]
        },

        createAxes: function() {
            var plotArea = this,
                options = plotArea.options,
                seriesRange = getSeriesRange(plotArea.options.series),
                axisY = new NumericAxis(seriesRange.min, seriesRange.max, plotArea.options.axisY),
                axisX = new CategoryAxis(options.axisX);

            plotArea.children.push(axisY);
            plotArea.children.push(axisX);

            for (var i = 0; i < options.series.length; i++) {
                var currentSeries = options.series[i];
                if (currentSeries.type == "bar") {
                    plotArea.children.push(
                        new BarSeries(axisY.options.min, axisY.options.max, currentSeries)
                    );
                }
            }
        },

        updateLayout: function(targetBox) {
            var plotArea = this,
                children = plotArea.children,
                axisY = children[0],
                axisX = children[1];

            plotArea.box = targetBox;

            axisY.updateLayout(targetBox);
            axisX.updateLayout(new Box(
                axisY.box.x2, targetBox.y1,
                targetBox.x2, targetBox.y2
            ));

            axisY.options._snapLineToBottom = true;
            axisY.updateLayout(new Box(
                targetBox.x1, targetBox.y1,
                targetBox.x2, axisX.box.y1
            ));

            var seriesBox = new Box(
                axisY.box.x2, targetBox.y1,
                targetBox.x2, axisX.box.y1
            );

            for (var i = 2; i < children.length; i++) {
                children[i].updateLayout(seriesBox);
            }
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

        rect: function(x, y, width, height) {
            return new SVGPath(
                [[x, y], [x + width, y],
                [x + width, y + height], [x, y + height], [x, y]]
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

        root.template = kendo.template(
            "<svg xmlns='http://www.w3.org/2000/svg' version='1.1' " +
            "width='<%= options.width %>' height='<%= options.height %>'>" +
            "<%= renderContent() %></svg>");
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
        text.template = kendo.template(
            "<text x='<%= options.x %>' y='<%= options._baselineY %>' " +
                  "style='font: <%= fontStyle() %>'><%= content %></text>");

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
        var path = this,
            options = $.extend({}, path.options, options);

        ViewElement.call(path);
        path.template = kendo.template(
            "<path d='<%= renderPoints() %>' stroke='<%= options.stroke %>'></path>");

        path.points = points || [];
    }

    SVGPath.prototype = new ViewElement();
    $.extend(SVGPath.prototype, {
        options: {
            stroke: "#000"
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

        rect: function(x, y, width, height) {
            return new VMLPath(
                [[x, y], [x + width, y],
                [x + width, y + height], [x, y + height], [x, y]]
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

        root.template = kendo.template(
            "<div style='width:<%= options.width %>; height:<%= options.height %>; " +
                        "position: relative;'>" +
            "<%= renderContent() %></div>");
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
        text.template = kendo.template(
            "<kvml:textbox style='position: absolute;" +
                "left:<%= options.x %>; top:<%= options.y %>;" +
                "font:<%= fontStyle() %>'><%= content %></kvml:textbox>");
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
        var path = this,
            options = $.extend({}, path.options, options);

        ViewElement.call(path);
        path.template = kendo.template(
            "<kvml:shape style='position:absolute; width:1px; height:1px;' " +
            "strokecolor='<%= options.stroke %>' " +
            "coordorigin='0 0' coordsize='1 1'>" +
            "<kvml:path v='<%= renderPoints() %> e' /></kvml:shape>");

        path.points = points || [];
    }

    VMLPath.prototype = new ViewElement();
    $.extend(VMLPath.prototype, {
        options: {
            stroke: "#000"
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
        var SIZE = 1,
            measureBox = measureText.measureBox,
            baselineMarker =
                $("<div style='display: inline-block; vertical-align: baseline;" +
                              "width: " + SIZE + "px; height: " + SIZE + "px;" +
                              "zoom: 1; *display: inline; overflow: hidden;' />");

        if (!measureBox) {
            measureBox = measureText.measureBox =
                $("<div style='position: absolute; top: -4000px; left: -4000px;" +
                              "line-height: normal; visibility: hidden;' />")
                .appendTo(document.body);
        }


        measureBox.css(style)
            .text(text || "&nbsp;")
            .append(baselineMarker);

        var size = {
            width: measureBox.width() - SIZE,
            height: measureBox.height(),
            baseline: baselineMarker[0].offsetTop + SIZE
        };

        return size;
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
        return round(coord) + 0.5;
    }

    function getSeriesRange(series) {
        var seriesMin = Number.MAX_VALUE,
        seriesMax = Number.MIN_VALUE;
        $.each(series, function() {
            seriesMin = Math.min(seriesMin, Math.min.apply(Math, this.data));
            seriesMax = Math.max(seriesMax, Math.max.apply(Math, this.data));
        });

        return { min: seriesMin, max: seriesMax };
    }

    // Make the internal functions public for unit testing

    Chart.Box = Box;
    Chart.Text = Text;
    Chart.RootElement = RootElement;
    Chart.NumericAxis = NumericAxis;
    Chart.CategoryAxis = CategoryAxis;
    Chart.BarSeries = BarSeries;
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

// kendo.chart.bar.js
(function($) {
    function BarChart() {
    }

    kendo.ui.Chart.prototype.types["bar"] = function(chart, configuration) {
        return new BarChart(chart, configuration);
    };
})(jQuery);
