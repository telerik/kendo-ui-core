(function ($) {

    // Imports ================================================================
    var kendo = window.kendo,
        Class = kendo.Class,
        Component = kendo.ui.Component,
        DataSource = kendo.data.DataSource,
        template = kendo.template,
        proxy = $.proxy;

    // Constants ==============================================================
    var BASELINE_MARKER_SIZE = 1,
        BAR = "bar",
        BOTTOM = "bottom",
        CENTER = "center",
        CHANGE = "change",
        COLUMN = "column",
        COORD_PRECISION = 3,
        DEFAULT_HEIGHT = 400,
        DEFAULT_WIDTH = 600,
        DATABOUND = "dataBound",
        DEFAULT_PRECISION = 6,
        HORIZONTAL = "horizontal",
        HEIGHT = "height",
        LEFT = "left",
        NONE = "none",
        OUTSIDE = "outside",
        RIGHT = "right",
        SVG_NS = "http://www.w3.org/2000/svg",
        TOP = "top",
        VERTICAL = "vertical",
        WIDTH = "width",
        X = "x",
        Y = "y",
        ZERO_THRESHOLD = 0.2,
        UNDEFINED = "undefined";

    // Chart ==================================================================
    var Chart = Component.extend({
        init: function(element, options) {
            var chart = this;

            Component.fn.init.call(chart, element);

            chart.options = deepExtend(chart.options, options);

            chart.bind([DATABOUND], chart.options);
            chart._viewFactory = chart._supportsSVG() ? new SVGFactory() : new VMLFactory();

            if (chart.options.dataSource) {
                chart._initDataSource();
            }

            chart.refresh();
        },

        options: {
            title: {
                visible: true
            },
            legend: {
                visible: true
            },
            valueAxis: {
                type: "Numeric"
            },
            categoryAxis: {
                categories: []
            },
            seriesDefaults: {
                type: COLUMN,
                data: []
            },
            seriesColors: ["#d7df23", "#adc32b", "#799b28", "#4c7520"],
            series: []
        },

        types: { },

        refresh: function() {
            var chart = this;

            chart._applyDefaults();

            if (chart.options.dataSource) {
                chart.dataSource.query();
            } else {
                chart._redraw();
            }
        },

        _redraw: function() {
            var chart = this,
                options = chart.options,
                model = new RootElement({ width: options.width, height: options.height });

            if (options.title && options.title.visible && options.title.text) {
                model.children.push(new Title(chart.options.title));
            }

            if (options.legend.visible) {
                var legendOptions = deepExtend({}, chart.options.legend,
                                    { series: chart.options.series });

                model.children.push(new Legend(legendOptions));
            }

            model.children.push(new PlotArea(chart.options));
            chart._model = model;

            model.updateLayout();
            var html = model.getView(chart._viewFactory).render();
            setContent(chart.element[0], html);
        },

        _supportsSVG: function() {
            return document.implementation.hasFeature(
                "http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1");
        },

        _applyDefaults: function() {
            var chart = this,
                element = chart.element,
                options = chart.options,
                series = options.series,
                seriesType,
                colors = options.seriesColors;

            for (var i = 0, length = series.length; i < length; i++) {
                // Determine series type in advance so we can apply the
                // default settings for this type
                seriesType = series[i].type || options.seriesDefaults.type;

                series[i] = deepExtend(
                    { color: colors[i % colors.length] },
                    options.seriesDefaults,
                    options.seriesDefaults[seriesType],
                    series[i]);
            }

            options.categoryAxis = deepExtend({}, options.axisDefaults, options.categoryAxis);

            if (!options.width) {
                options.width = element.width() || DEFAULT_WIDTH;
            }

            if (!options.height) {
                options.height = element.height() || DEFAULT_HEIGHT;
            }
        },

        _initDataSource: function() {
            var chart = this;

            chart.dataSource = DataSource
                .create(chart.options.dataSource)
                .bind(CHANGE, proxy(chart._onDataChanged, chart));
        },

        _onDataChanged: function() {
            var chart = this,
                options = chart.options,
                series = options.series,
                categoryAxis = options.categoryAxis,
                data = chart.dataSource.view();

            for (var dataIdx = 0, dataLength = data.length; dataIdx < dataLength; dataIdx++) {
                var row = data[dataIdx];

                if (categoryAxis.field) {
                    var category = row[categoryAxis.field];
                    if (dataIdx === 0) {
                        categoryAxis.categories = [category];
                    } else {
                        categoryAxis.categories.push(category);
                    }
                }

                for (var seriesIdx = 0, seriesLength = series.length; seriesIdx < seriesLength; seriesIdx++) {
                    var currentSeries = series[seriesIdx],
                        value = row[currentSeries.field];

                    if (currentSeries.field) {
                        if (dataIdx === 0) {
                            currentSeries.data = [value];
                        } else {
                            currentSeries.data.push(value);
                        }
                    }
                };
            };

            chart.trigger(DATABOUND);
            chart._redraw();
        }
    });

    function setContent(container, xml) {
        if (typeof setContent.useParser == UNDEFINED) {
            var testFragment = "<svg xmlns='" + SVG_NS + "'></svg>",
                testContainer = document.createElement("div"),
                hasParser = typeof DOMParser != UNDEFINED;

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



    // **************************
    // View Model
    // **************************
    var Box2D = Class.extend({
        init: function(x1, y1, x2, y2) {
            var box = this;
            box.x1 = x1 || 0;
            box.x2 = x2 || 0;
            box.y1 = y1 || 0;
            box.y2 = y2 || 0;
        },

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

        move: function(x, y) {
            var box = this,
                height = box.height(),
                width = box.width();

            box.x1 = x;
            box.y1 = y;
            box.x2 = box.x1 + width;
            box.y2 = box.y1 + height;

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

        expand: function(dw, dh) {
            this.shrink(-dw, -dh);
            return this;
        },

        pad: function(padding) {
            var box = this,
                spacing = getSpacing(padding);

            box.x1 -= spacing.left;
            box.x2 += spacing.right;
            box.y1 -= spacing.top;
            box.y2 += spacing.bottom;

            return box;
        },

        unpad: function(padding) {
            var box = this,
                spacing = getSpacing(padding);

            spacing.left = -spacing.left;
            spacing.top = -spacing.top;
            spacing.right = -spacing.right;
            spacing.bottom = -spacing.bottom;

            return box.pad(spacing);
        },

        clone: function() {
            var box = this;

            return new Box2D(box.x1, box.y1, box.x2, box.y2);
        }
    });

    var defaultBox = new Box2D(0, 0, 0, 0);

    var ChartElement = Class.extend({
        init: function(options) {
            var element = this;
            element.attributes = {};
            element.children = [];

            element.options = deepExtend({}, element.options, options);
        },

        updateLayout: function(targetBox) {
            var element = this,
                children = element.children,
                box;

            for (var i = 0; i < children.length; i++) {
                var currentChild = children[i];

                currentChild.updateLayout(targetBox);
                box = box ? box.wrap(currentChild.box) : currentChild.box.clone();
            }

            element.box = box;
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
        },

        translateChildren: function(dx, dy) {
            var element = this,
                children = element.children,
                childrenCount = children.length,
                i;

            for (i = 0; i < childrenCount; i++) {
                children[i].box.translate(dx, dy);
            }
        }
    });

    var RootElement = ChartElement.extend({
        init: function(options) {
            var root = this;

            ChartElement.fn.init.call(root, options);
        },

        options: {
            width: DEFAULT_WIDTH,
            height: DEFAULT_HEIGHT
        },

        updateLayout: function() {
            var root = this,
                currentBox = new Box2D(0, 0, root.options.width, root.options.height);

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

    var BoxElement = ChartElement.extend({
        init: function(options) {
            var element = this;

            ChartElement.fn.init.call(element, options);
        },

        options: {
            align: LEFT,
            vAlign: TOP,
            margin: { },
            padding: { },
            border: {
                color: "#000",
                width: 0
            },
            background: "",
            width: 0,
            height: 0
        },

        updateLayout: function(targetBox) {
            var element = this,
                box,
                contentBox,
                options = element.options,
                children = element.children,
                margin = getSpacing(options.margin),
                padding = getSpacing(options.padding),
                border = options.border,
                borderWidth = border.width;

            ChartElement.fn.updateLayout.call(element, targetBox);

            if (children.length === 0) {
                box = element.box = new Box2D(0, 0, options.width, options.height);
            } else {
                box = element.box;
            }

            contentBox = box.clone();

            box.pad(padding).pad(borderWidth).pad(margin);

            element.align(targetBox, X, options.align);
            element.align(targetBox, Y, options.vAlign);

            element.paddingBox = box.clone().unpad(margin).unpad(borderWidth);

            element.translateChildren(
                box.x1 - contentBox.x1 + margin.left + borderWidth + padding.left,
                box.y1 - contentBox.y1 + margin.top + borderWidth + padding.left);
        },

        align: function(targetBox, axis, alignment) {
            var element = this,
                box = element.box,
                c1 = axis + 1,
                c2 = axis + 2,
                sizeFunc = axis === X ? WIDTH : HEIGHT,
                size = box[sizeFunc]();

            if (inArray(alignment, [LEFT, TOP])) {
                box[c1] = targetBox[c1];
                box[c2] = box[c1] + size;
            } else if (inArray(alignment, [RIGHT, BOTTOM])) {
                box[c2] = targetBox[c2];
                box[c1] = box[c2] - size;
            } else if (alignment == CENTER) {
                box[c1] = targetBox[c1] + (targetBox[sizeFunc]() - size) / 2;
                box[c2] = box[c1] + size;
            }
        },

        getViewElements: function(factory) {
            var element = this,
                options = element.options,
                border = options.border || {},
                elements = [
                    factory.rect(element.paddingBox, {
                        stroke: border.width ? border.color : "",
                        strokeWidth: border.width,
                        fill: options.background })
                ];

            return elements.concat(
                ChartElement.fn.getViewElements.call(element, factory)
            );
        }
    });

    var Text = ChartElement.extend({
        init: function(content, options) {
            var text = this;

            ChartElement.fn.init.call(text, options);

            // Calculate size
            text.content = content;
            text.updateLayout(defaultBox);
        },

        options: {
            font: "10pt Verdana, sans-serif",
            align: LEFT,
            vAlign: ""
        },

        updateLayout: function(targetBox) {
            var text = this,
                options = text.options,
                size = measureText(text.content, { font: text.options.font });

            text.baseline = size.baseline;

            if (options.align == LEFT) {
                text.box = new Box2D(
                    targetBox.x1, targetBox.y1,
                    targetBox.x1 + size.width, targetBox.y1 + size.height);
            } else if (options.align == RIGHT) {
                text.box = new Box2D(
                    targetBox.x2 - size.width, targetBox.y1,
                    targetBox.x2, targetBox.y1 + size.height);
            } else if (options.align == CENTER) {
                var margin = (targetBox.width() - size.width) / 2;
                text.box = new Box2D(
                    round(targetBox.x1 + margin, COORD_PRECISION), targetBox.y1,
                    round(targetBox.x2 - margin, COORD_PRECISION), targetBox.y1 + size.height);
            }

            if (options.vAlign == CENTER) {
                var margin = (targetBox.height() - size.height) /2;
                text.box = new Box2D(
                    text.box.x1, targetBox.y1 + margin,
                    text.box.x2, targetBox.y2 - margin);
            } else if (options.vAlign == BOTTOM) {
                text.box = new Box2D(
                    text.box.x1, targetBox.y2 - size.height,
                    text.box.x2, targetBox.y2);
            } else if (options.vAlign == TOP) {
                text.box = new Box2D(
                    text.box.x1, targetBox.y1,
                    text.box.x2, targetBox.y1 + size.height);
            }
        },

        getViewElements: function(factory) {
            var text = this;

            return [
                factory.text(text.content, {
                    x: text.box.x1, y: text.box.y1,
                    baseline: text.baseline,
                    font: text.options.font })
            ];
        }
    });

    var TextBox = BoxElement.extend({
        init: function(content, options) {
            var textBox = this;

            BoxElement.fn.init.call(textBox, options);

            textBox.children.push(
                new Text(content, deepExtend({ }, textBox.options, {align: LEFT, vAlign: TOP}))
            );

            // Calculate size
            textBox.updateLayout(defaultBox);
        }
    });

    var BarLabel = ChartElement.extend({
        init: function(content, options) {
            var barLabel = this;
            ChartElement.fn.init.call(barLabel, options);

            barLabel.children.push(new TextBox(content, barLabel.options));
        },

        options: {
            font: "16px Verdana, sans-serif",
            aboveAxis: true,
            position: "outsideEnd",
            margin: 2,
            padding: 2
        },

        updateLayout: function(targetBox, isVertical) {
            var barLabel = this,
                options = barLabel.options,
                text = barLabel.children[0],
                box = text.box;

            text.options.align = isVertical ? CENTER : LEFT;
            text.options.vAlign = isVertical ? TOP : CENTER;

            if (options.position == "insideEnd") {
                if (isVertical) {
                    text.options.vAlign = TOP;

                    if (!options.aboveAxis && box.height() < targetBox.height()) {
                        text.options.vAlign = BOTTOM;
                    }
                } else {
                    text.options.align = options.aboveAxis ? RIGHT : LEFT;
                }
            } else if (options.position == CENTER) {
                text.options.vAlign = CENTER;
                text.options.align = CENTER;
            } else if (options.position == "insideBase") {
                if (isVertical) {
                    text.options.vAlign = options.aboveAxis ? BOTTOM : TOP;
                } else {
                    text.options.align = options.aboveAxis ? LEFT : RIGHT;
                }
            } else if (options.position == "outsideEnd") {
                if (isVertical) {
                    if (options.aboveAxis) {
                        targetBox = new Box2D(
                            targetBox.x1, targetBox.y1 - box.height(),
                            targetBox.x2, targetBox.y1
                        );
                    } else {
                        targetBox = new Box2D(
                            targetBox.x1, targetBox.y2,
                            targetBox.x2, targetBox.y2 + box.height()
                        );
                    }
                } else {
                    text.options.align = CENTER;
                    if (options.aboveAxis) {
                        targetBox = new Box2D(
                            targetBox.x2 + box.width(), targetBox.y1,
                            targetBox.x2, targetBox.y2
                        );
                    } else {
                        targetBox = new Box2D(
                            targetBox.x1 - box.width(), targetBox.y1,
                            targetBox.x1, targetBox.y2
                        );
                    }
                }
            }

            text.updateLayout(targetBox);
        }
    });

    var Title = ChartElement.extend({
        init: function(options) {
            var title = this;
            ChartElement.fn.init.call(title, options);

            title.create();
        },

        options: {
            text: "",
            font: "16px Verdana, sans-serif",
            position: TOP,
            align: CENTER,
            margin: {
                top: 10,
                bottom: 10
            }
        },

        create: function() {
            var title = this,
                options = title.options;

            title.children.push(
                new TextBox(options.text, {
                    align: options.align,
                    vAlign: options.position,
                    margin: options.margin,
                    font: options.font
                })
            );
        },

        updateLayout: function(targetBox) {
            var title = this,
                options = title.options,
                textBox = title.children[0];

            textBox.updateLayout(targetBox);
            title.box = textBox.box.clone().snapTo(targetBox, X);
        }
    });

    var Legend = ChartElement.extend({
        init: function(options) {
            var legend = this;
            ChartElement.fn.init.call(legend, options);

            legend.createLabels();
        },

        options: {
            position: RIGHT,
            series: [],
            font: "12px Verdana, sans-serif",
            offsetX: 0,
            offsetY: 0,
            margin: {
                top: 10,
                right: 10,
                bottom: 10,
                left: 10
            },
            zIndex: 1
        },

        createLabels: function() {
            var legend = this,
                series = legend.options.series,
                labels = legend._labels = [];

            for (var i = 0; i < series.length; i++) {
                var name = series[i].name,
                    label = new Text(name, { font: legend.options.font });

                legend.children.push(label);
            };
        },

        updateLayout: function(targetBox) {
            var legend = this,
                options = legend.options,
                childrenCount = legend.children.length;

            if (childrenCount === 0) {
                legend.box = new Box2D();
                return;
            }

            if (options.position == "custom") {
                legend.customLayout(targetBox);
                return;
            }

            if (options.position == TOP || options.position == BOTTOM) {
                legend.horizontalLayout(targetBox);
            } else {
                legend.verticalLayout(targetBox);
            }
        },

        getViewElements: function(factory) {
            var legend = this,
                children = legend.children,
                options = legend.options,
                series = options.series,
                markerSize = legend.markerSize(),
                group = factory.group({ zIndex: options.zIndex });

            [].push.apply(group.children, ChartElement.fn.getViewElements.call(legend, factory));

            for (var i = 0, length = series.length; i < length; i++) {
                var color = series[i].color,
                    label = children[i],
                    markerBox = new Box2D();

                markerBox.x1 = label.box.x1 - markerSize * 2;
                markerBox.x2 = markerBox.x1 + markerSize;

                if (options.position == TOP || options.position == BOTTOM) {
                    markerBox.y1 = label.box.y1 + markerSize / 2;
                } else {
                    markerBox.y1 = label.box.y1 + (label.box.height() - markerSize) / 2;
                }

                markerBox.y2 = markerBox.y1 + markerSize;

                group.children.push(factory.rect(markerBox, { fill: color, stroke: color }));
            };

            return [ group ];
        },

        verticalLayout: function(targetBox) {
            var legend = this,
                options = legend.options,
                children = legend.children,
                childrenCount = children.length,
                labelBox = children[0].box.clone(),
                offsetX,
                offsetY,
                margin = getSpacing(options.margin);

            // Position labels below each other
            for (var i = 1; i < childrenCount; i++) {
                var label = legend.children[i];
                label.box.alignTo(legend.children[i - 1].box, BOTTOM);
                labelBox.wrap(label.box);
            };

            // Vertical center is calculated relative to the container, not the parent!
            if (options.position == LEFT) {
                offsetX = targetBox.x1 + legend.markerSize() * 2 + margin.left;
                offsetY = (targetBox.y2 - labelBox.height()) / 2;
                labelBox.x2 += margin.left + margin.right;
            } else {
                offsetX = targetBox.x2 - labelBox.width() - margin.right;
                offsetY = (targetBox.y2 - labelBox.height()) / 2;
                labelBox.translate(offsetX, offsetY);
                labelBox.x1 -= legend.markerSize() * 2 + margin.left;
            }

            legend.translateChildren(offsetX + options.offsetX,
                    offsetY + options.offsetY);

            labelBox.y1 = targetBox.y1;
            labelBox.y2 = targetBox.y2;

            legend.box = labelBox;
        },

        horizontalLayout: function(targetBox) {
            var legend = this,
                options = legend.options,
                children = legend.children,
                childrenCount = children.length,
                labelBox = children[0].box.clone(),
                markerWidth = legend.markerSize() * 3,
                offsetX,
                offsetY,
                margin = getSpacing(options.margin);

            // Position labels next to each other
            for (var i = 1; i < childrenCount; i++) {
                var label = legend.children[i]
                label.box.alignTo(legend.children[i - 1].box, RIGHT);
                labelBox.wrap(label.box);
                label.box.x1 = label.box.x1 + i * markerWidth;
            };

            if (options.position == TOP) {
                offsetX = (targetBox.x2 - labelBox.width() - markerWidth) / 2;
                offsetY = targetBox.y1 + margin.top;
                labelBox.y2 = targetBox.y1 + labelBox.height() + margin.top + margin.bottom;
                labelBox.y1 = targetBox.y1;
            } else {
                offsetX = (targetBox.x2 - labelBox.width() - markerWidth) / 2;
                offsetY = targetBox.y2 - labelBox.height() - margin.bottom;
                labelBox.y1 = targetBox.y2 - labelBox.height() - margin.top - margin.bottom;
                labelBox.y2 = targetBox.y2;
            }

            legend.translateChildren(offsetX + options.offsetX,
                    offsetY + options.offsetY);

            labelBox.x1 = targetBox.x1;
            labelBox.x2 = targetBox.x2;

            legend.box = labelBox;
        },

        customLayout: function (targetBox) {
            var legend = this,
                options = legend.options,
                children = legend.children,
                childrenCount = children.length,
                labelBox = children[0].box.clone(),
                markerWidth = legend.markerSize() * 2,
                offsetX,
                offsetY,
                margin = getSpacing(options.margin);

            // Position labels next to each other
            for (var i = 1; i < childrenCount; i++) {
                var label = legend.children[i]
                label.box.alignTo(legend.children[i - 1].box, BOTTOM);
                labelBox.wrap(label.box);
            };

            legend.translateChildren(options.offsetX + markerWidth, options.offsetY);

            legend.box = targetBox;
        },

        markerSize: function() {
            var legend = this,
                children = legend.children;

            if (children.length > 0) {
                return children[0].box.height() / 2;
            } else {
                return 0;
            }
        }
    });

    var NumericAxis = ChartElement.extend({
        init: function(seriesMin, seriesMax, options) {
            var axis = this,
                autoOptions = {
                    min: axis.autoAxisMin(seriesMin, seriesMax),
                    max: axis.autoAxisMax(seriesMin, seriesMax)
                };

            ChartElement.fn.init.call(axis, deepExtend(autoOptions, options));

            options = axis.options;

            if(!options.majorUnit) {
                // Determine an auto major unit after min/max have been set
                options.majorUnit = axis.autoMajorUnit(options.min, options.max);
            }

            var majorDivisions = axis.getMajorDivisions(),
                currentValue = options.min;

            for (var i = 0; i < majorDivisions; i++) {
                var text = new Text(currentValue.toString(), { align: RIGHT });
                axis.children.push(text);

                currentValue = round(currentValue + options.majorUnit, DEFAULT_PRECISION);
            }
        },

        options: {
            min: 0,
            max: 1,
            lineWidth: 1,
            majorTickType: OUTSIDE,
            tickSize: 4,
            axisCrossingValue: 0,
            orientation: VERTICAL,
            majorGridLines: {
                visible: true,
                width: 1,
                color: "#000"
            },
            minorGridLines: {
                visible: false,
                width: 1,
                color: "#000"
            }
        },

        updateLayout: function(targetBox) {
            var axis = this,
                options = axis.options,
                isVertical = options.orientation === VERTICAL,
                children = axis.children;

            var maxLabelWidth = 0,
                maxLabelHeight = 0;
            for (var i = 0; i < children.length; i++) {
                var label = children[i];
                maxLabelWidth = Math.max(maxLabelWidth, label.box.width());
                maxLabelHeight = Math.max(maxLabelHeight, label.box.height());
            };

            if (isVertical) {
                axis.box = new Box2D(
                    targetBox.x1, targetBox.y1,
                    targetBox.x1 + maxLabelWidth + options.tickSize, targetBox.y2
                );
            } else {
                axis.box = new Box2D(
                    targetBox.x1, targetBox.y1,
                    targetBox.x2, targetBox.y1 + options.tickSize + maxLabelHeight
                );
            }

            axis.arrangeLabels(maxLabelWidth, maxLabelHeight);
        },

        arrangeLabels: function(maxLabelWidth, maxLabelHeight) {
            var axis = this,
                options = axis.options,
                isVertical = axis.options.orientation === VERTICAL,
                children = axis.children,
                box = axis.box,
                tickPositions = axis.getMajorTickPositions();

            for (var i = 0; i < children.length; i++) {
                var label = children[i],
                    tickIx = isVertical ? (children.length - 1 - i) : i,
                    labelSize = isVertical ? label.box.height() : label.box.width(),
                    labelPos = tickPositions[tickIx] - (labelSize / 2),
                    labelBox = isVertical ?
                        new Box2D(box.x1, labelPos,
                                box.x1 + maxLabelWidth, labelPos + labelSize) :
                        new Box2D(labelPos,
                                box.y1 + options.tickSize,
                                labelPos + labelSize,
                                box.y1 + options.tickSize + maxLabelHeight);


                label.updateLayout(labelBox);
            }
        },

        getViewElements: function(factory) {
            var axis = this,
                children = axis.children,
                options = axis.options,
                isVertical = options.orientation === VERTICAL,
                childElements = ChartElement.fn.getViewElements.call(axis, factory);

            var majorTickPositions = axis.getMajorTickPositions();
            if (options.lineWidth > 0) {
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
                isVertical = options.orientation === VERTICAL,
                box = axis.box;

            if (options.majorTickType === OUTSIDE) {
                var majorTickPositions = axis.getMajorTickPositions();
                return $.map(majorTickPositions, function(tickPos) {
                    if (isVertical) {
                        return factory.line(
                            box.x2 - options.tickSize, tickPos,
                            box.x2, tickPos
                        );
                    } else {
                        return factory.line(
                            tickPos, box.y1,
                            tickPos, box.y1 + options.tickSize
                        );
                    }
                });
            } else {
                return [];
            }
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

        getMinorDevisions: function() {
            var options = this.options;

            return ((Math.round(options.max - options.min) / options.majorUnit) * 5) + 1;
        },

        getTickPositions: function(divisions) {
            var axis = this,
                options = axis.options,
                isVertical = options.orientation === VERTICAL,
                children = axis.children,
                box = axis.box,
                lineBox = axis.getAxisLineBox(),
                majorDivisions = divisions,
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

        getMajorTickPositions: function() {
            var axis = this;

            return axis.getTickPositions(axis.getMajorDivisions());
        },

        getMinorTickPositions: function() {
            var axis = this;

            return axis.getTickPositions(axis.getMinorDevisions());
        },

        getAxisLineBox: function() {
            var axis = this,
                options = axis.options,
                isVertical = options.orientation === VERTICAL,
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
               return new Box2D(box.x2, box.y1 + startMargin,
                 box.x2, box.y2 - endMargin);
            } else {
               return new Box2D(box.x1 + startMargin, box.y1,
                 box.x2 - endMargin, box.y1);
            }
        },

        getSlot: function(a, b) {
            var axis = this,
                children = axis.children,
                options = axis.options,
                isVertical = options.orientation === VERTICAL,
                valueAxis = isVertical ? Y : X,
                lineBox = axis.getAxisLineBox(),
                lineStart = lineBox[valueAxis + 1],
                lineSize = isVertical ? lineBox.height() : lineBox.width(),
                scale = lineSize / (options.max - options.min),
                a = typeof a === UNDEFINED ? options.axisCrossingValue : a,
                b = typeof b === UNDEFINED ? options.axisCrossingValue : b,
                a = Math.max(Math.min(a, options.max), options.min),
                b = Math.max(Math.min(b, options.max), options.min),
                p1,
                p2,
                slotBox = new Box2D(lineBox.x1, lineBox.y1, lineBox.x1, lineBox.y1);

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

    var CategoryAxis = ChartElement.extend({
        init: function(options) {
            var axis = this;
            ChartElement.fn.init.call(axis);

            var options = axis.options = deepExtend({}, axis.options, options);

            for (var i = 0; i < options.categories.length; i++) {
                var label = options.categories[i];
                axis.children.push(new Text(label, { align: CENTER }));
            }
        },

        options: {
            categories: [],
            lineWidth: 1,
            tickSize: 4,
            majorTickType: OUTSIDE,
            axisCrossingValue: 0,
            orientation: HORIZONTAL,
            majorGridLines: {
                visible: false,
                width: 1,
                color: "#000"
            },
            minorGridLines: {
                visible: false,
                width: 1,
                color: "#000"
            }
        },

        updateLayout: function(targetBox) {
            var axis = this,
                options = axis.options,
                isVertical = options.orientation === VERTICAL,
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
                axis.box = new Box2D(
                    targetBox.x1, targetBox.y1,
                    targetBox.x1 + options.tickSize + maxLabelWidth, targetBox.y2
                );
            } else {
                axis.box = new Box2D(
                    targetBox.x1, targetBox.y1,
                    targetBox.x2, targetBox.y1 + options.tickSize + maxLabelHeight
                );
            }

            var majorDivisions = axis.getMajorTickPositions();

            if (isVertical) {
                labelX = axis.box.x2 - options.tickSize;
                for (var i = 0; i < children.length; i++) {
                    var label = children[i],
                        currentDivision = majorDivisions[i],
                        nextDivision = majorDivisions[i + 1],
                        middle = currentDivision + (nextDivision - currentDivision) / 2,
                        labelY = middle - label.box.height() / 2;

                    label.updateLayout(new Box2D(
                        labelX - label.box.width(), labelY,
                        labelX, labelY + label.box.height()
                    ));
                }
            } else {
                labelY = axis.box.y1 + options.tickSize;
                for (var i = 0; i < children.length; i++) {
                    var label = children[i],
                        currentDivision = majorDivisions[i],
                        nextDivision = majorDivisions[i + 1];

                    label.updateLayout(new Box2D(
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
                isVertical = options.orientation === VERTICAL,
                childElements = ChartElement.fn.getViewElements.call(axis, factory);

            if (options.lineWidth > 0) {
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
                isVertical = options.orientation === VERTICAL,
                box = axis.box;

            if (options.majorTickType === OUTSIDE) {
                var majorTickPositions = axis.getMajorTickPositions();
                return $.map(majorTickPositions, function(tickPos) {
                    if (isVertical) {
                        return factory.line(
                            box.x2 - options.tickSize, tickPos,
                            box.x2, tickPos
                        );
                    } else {
                        return factory.line(
                            tickPos, box.y1,
                            tickPos, box.y1 + options.tickSize
                        );
                    }
                });
            } else {
                return [];
            }
        },

        getTickPositions: function(itemsCount) {
            var axis = this,
                options = axis.options,
                isVertical = options.orientation === VERTICAL,
                size = isVertical ? axis.box.height() : axis.box.width(),
                step = size / itemsCount,
                pos = isVertical ? axis.box.y1 : axis.box.x1,
                positions = [];

            for (var i = 0; i < itemsCount; i++) {
                positions.push(pos);
                pos += step;
            };

            positions.push(isVertical ? axis.box.y2 : axis.box.x2);

            return positions;
        },

        getMajorTickPositions: function() {
            var axis = this;

            return axis.getTickPositions(axis.options.categories.length);
        },

        getMinorTickPositions: function() {
            var axis = this;

            return axis.getTickPositions(axis.options.categories.length * 2);
        },

        getSlot: function(categoryIx) {
            var axis = this,
                options = axis.options,
                isVertical = options.orientation === VERTICAL,
                children = axis.children,
                box = axis.box,
                size = isVertical ? box.height() : box.width(),
                startPos = isVertical ? box.y1 : box.x1,
                step = size / Math.max(1, children.length),
                p1 = startPos + (categoryIx * step),
                p2 = p1 + step;

            return isVertical ?
                   new Box2D(box.x2, p1, box.x2, p2) :
                   new Box2D(p1, box.y1, p2, box.y1);
        }
    });

    var ClusterLayout = ChartElement.extend({
        init: function(options) {
            var cluster = this;
            ChartElement.fn.init.call(cluster, options);
        },

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

    var StackLayout = ChartElement.extend({
        init: function(options) {
            var stack = this;
            ChartElement.fn.init.call(stack, options);
        },

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
                box = stack.box = new Box2D(),
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

    var Bar = ChartElement.extend({
        init: function(options) {
            var bar = this;
            ChartElement.fn.init.call(bar, options);
        },

        options: {
            color: "#fff",
            borderColor: "#000",
            borderWidth: 1,
            isVertical: true
        },

        updateLayout: function(targetBox) {
            var bar = this,
                children = bar.children,
                options = bar.options;

            bar.box = targetBox;
            for(var i = 0, length = children.length; i < length; i++) {
                children[i].updateLayout(targetBox, options.isVertical);
            }
        },

        getViewElements: function(factory) {
            var bar = this,
                options = bar.options,
                box = bar.box,
                elements = [];

            elements.push(
                factory.rect(box, {
                    fill: options.color,
                    stroke: options.borderColor,
                    strokeWidth: options.borderWidth
                })
            );
            [].push.apply(elements,
                ChartElement.fn.getViewElements.call(bar, factory)
            );
            return elements;
        }
    });

    var BarChart = ChartElement.extend({
        init: function(plotArea, options) {
            var chart = this;
            ChartElement.fn.init.call(chart, options);

            chart.plotArea = plotArea;
            chart._seriesMin = Number.MAX_VALUE;
            chart._seriesMax = - Number.MAX_VALUE;
            chart._bars = [];

            chart.render();
        },

        options: {
            series: [],
            isVertical: true,
            isStacked: false,
            gap: 1.5
        },

        render: function() {
            var barChart = this,
                options = barChart.options,
                isStacked = barChart.options.isStacked,
                catMax = [],
                catMin = [];

            barChart.traverseDataPoints(function(value, categoryIx, series) {
                if(typeof value !== UNDEFINED) {
                    if (isStacked) {
                        var sums = value > 0 ? catMax : catMin;
                        sums[categoryIx] = sums[categoryIx] ? sums[categoryIx] + value : value;
                    } else {
                        barChart._seriesMin = Math.min(barChart._seriesMin, value);
                        barChart._seriesMax = Math.max(barChart._seriesMax, value);
                    }
                }

                barChart.addValue(value, categoryIx, series);
            });

            if (isStacked) {
                barChart._seriesMin = sparseArrayMin(catMin.length ? catMin : catMax);
                barChart._seriesMax = sparseArrayMax(catMax.length ? catMax : catMin);
            }
        },

        addValue: function(value, categoryIx, series) {
            var barChart = this,
                options = barChart.options,
                children = barChart.children,
                isStacked = barChart.options.isStacked,
                labelOptions = deepExtend({}, series.labels);

            if (isStacked) {
                if (labelOptions.position == "outsideEnd") {
                    labelOptions.position = "insideEnd";
                }
            }

            var bar = new Bar({ color: series.color, borderColor: series.color, isVertical: options.isVertical });

            if (labelOptions.visible && value) {
                var label = new BarLabel(value, labelOptions);
                bar.children.push(label);
            }

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

        valueRange: function() {
            var barChart = this;
            return { min: barChart._seriesMin, max: barChart._seriesMax };
        },

        categoriesCount: function() {
            var barChart = this,
                series = barChart.options.series,
                categories = 0;

            for (var i = 0, length = series.length; i < length; i++) {
                categories = Math.max(categories, series[i].data.length);
            }

            return categories;
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

                var barSlot = new Box2D(slotX.x1, slotY.y1, slotX.x2, slotY.y2);
                var label = bar.children[0];

                if (label) {
                    var axis = options.isVertical ? plotArea.axisY : plotArea.axisX,
                        axisCrossingValue = axis.options.axisCrossingValue;
                    label.options.aboveAxis = value >= axisCrossingValue;
                    label.content = label.content || axisCrossingValue;
                }

                bar.box = barSlot;

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
                categoriesCount = barChart.categoriesCount();

            for (var categoryIx = 0; categoryIx < categoriesCount; categoryIx++) {
                for (var seriesIx = 0; seriesIx < series.length; seriesIx++) {
                    var currentSeries = series[seriesIx],
                        value = currentSeries.data[categoryIx];

                    callback(value, categoryIx, currentSeries);
                }
            }
       }
    });

    var PlotArea = ChartElement.extend({
        init: function(options) {
            var plotArea = this;
            ChartElement.fn.init.call(plotArea, options);

            plotArea.render();
        },

        options: {
            categoryAxis: { },
            valueAxis: { },
            series: [ ],
            plotArea: {
                margin: 0
            }
        },

        render: function() {
            var plotArea = this,
                options = plotArea.options,
                charts = plotArea.charts = [],
                range = { min: 0, max: 1 },
                categories = options.categoryAxis.categories,
                seriesType;

            var barSeries = $.grep(options.series, function(currentSeries) {
                return currentSeries.type === BAR || currentSeries.type === COLUMN;
            });

            if (barSeries.length > 0) {
                seriesType = barSeries[0].type;

                var barChart = new BarChart(this, {
                        series: barSeries,
                        isVertical: seriesType === COLUMN,
                        isStacked: barSeries[0].stack
                    });

                var categoriesToAdd = Math.max(0, barChart.categoriesCount() - categories.length);
                [].push.apply(options.categoryAxis.categories, new Array(categoriesToAdd));

                range = barChart.valueRange();
                charts.push(barChart);
                [].push.apply(plotArea.children, charts);
            }

            plotArea.createAxes(range.min, range.max, seriesType);
        },

        createAxes: function(seriesMin, seriesMax, seriesType) {
            var plotArea = this,
                options = plotArea.options,
                isColumn = (seriesType || COLUMN) === COLUMN,
                categoryAxis = new CategoryAxis(deepExtend({
                        orientation: isColumn ? HORIZONTAL : VERTICAL,
                        axisCrossingValue: isColumn ? 0 : options.categoryAxis.categories.length
                    }, options.axesDefaults, options.categoryAxis)
                ),
                valueAxis = new NumericAxis(seriesMin, seriesMax, deepExtend({
                        orientation: isColumn ? VERTICAL : HORIZONTAL
                    }, options.axesDefaults, options.valueAxis)
                );

            plotArea.axisX = isColumn ? categoryAxis : valueAxis;
            plotArea.axisY = isColumn ? valueAxis : categoryAxis;

            plotArea.children.push(plotArea.axisY);
            plotArea.children.push(plotArea.axisX);
        },

        updateLayout: function(targetBox) {
            var plotArea = this,
                charts = plotArea.charts,
                axisY = plotArea.axisY,
                axisX = plotArea.axisX,
                options = plotArea.options.plotArea,
                margin = getSpacing(options.margin);

            plotArea.box = targetBox.clone();
            plotArea.box.x1 += margin.left;
            plotArea.box.x2 -= margin.right;
            plotArea.box.y1 += margin.top;
            plotArea.box.y2 -= margin.bottom;

            axisY.updateLayout(plotArea.box);
            axisX.updateLayout(plotArea.box);

            plotArea.alignAxes();

            var axisBox = axisY.box.clone().wrap(axisX.box);

            var overflowY = axisBox.height() - plotArea.box.height();
            var overflowX = axisBox.width() - plotArea.box.width();

            var offsetX = plotArea.box.x1 - axisBox.x1;
            var offsetY = plotArea.box.y1 - axisBox.y1;

            axisY.updateLayout(
                axisY.box.translate(offsetX, offsetY).shrink(0, overflowY)
            );

            axisX.updateLayout(
                axisX.box.translate(offsetX, offsetY).shrink(overflowX, 0)
            );

            plotArea.alignAxes();

            for (var i = 0; i < charts.length; i++) {
                charts[i].updateLayout(plotArea.box);
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
        },

        renderGridlines: function(factory, axis, secondaryAxis) {
            var options = axis.options,
                isVertical = options.orientation === VERTICAL,
                boundaries = secondaryAxis.getMajorTickPositions(),
                crossingSlot = axis.getSlot(options.axisCrossingValue),
                secAxisPos = crossingSlot[isVertical ? "y1" : "x1"],
                lineStart = boundaries[0],
                lineEnd = boundaries.pop(),
                linePos,
                majorTicks = axis.getMajorTickPositions(),
                gridLines = [];

                if (options.majorGridLines.visible) {
                    gridLines = $.map(majorTicks, function(pos) {
                                    return {
                                        pos: pos,
                                        options: options.majorGridLines
                                    };
                                });
                }

                if (options.minorGridLines.visible) {
                    gridLines = gridLines.concat(
                        $.map(axis.getMinorTickPositions(), function(pos) {
                            if (options.majorGridLines.visible) {
                                if (!inArray(pos, majorTicks)) {
                                    return {
                                        pos: pos,
                                        options: options.minorGridLines
                                    };
                                }
                            } else {
                                return {
                                    pos: pos,
                                    options: options.minorGridLines
                                };
                            }
                        }
                    ));
                }

                return $.map(gridLines, function(line) {
                    linePos = line.pos;

                    if (secAxisPos === linePos) {
                        return null;
                    }

                    if (isVertical) {
                        return factory.line(
                            lineStart, linePos, lineEnd, linePos,
                            {
                                strokeWidth: line.options.width,
                                stroke: line.options.color
                            });
                    } else {
                        return factory.line(
                            linePos, lineStart, linePos, lineEnd,
                            {
                                strokeWidth: line.options.width,
                                stroke: line.options.color
                            });
                    }
                });
        },

        getViewElements: function(factory) {
            var plotArea = this,
                axisY = plotArea.axisY,
                axisX = plotArea.axisX,
                gridLinesY = plotArea.renderGridlines(factory, axisY, axisX),
                gridLinesX = plotArea.renderGridlines(factory, axisX, axisY),
                childElements = ChartElement.fn.getViewElements.call(plotArea, factory);

            return [].concat(gridLinesY, gridLinesX, childElements);
        }
    });

    // **************************
    // Visual elements - Generic, SVG, VML
    // **************************

    var ViewElement = Class.extend({
        init: function(options) {
            var element = this;
            element.children = [];
            element.options = deepExtend({}, element.options, options);
        },

        render: function() {
            return this.template(this);
        },

        renderContent: function() {
            var output = "",
                element = this,
                sortedChildren = element.sortChildren(),
                childrenCount = sortedChildren.length;

            for (var i = 0; i < childrenCount; i++) {
                output += sortedChildren[i].render();
            }

            return output;
        },

        sortChildren: function() {
            var element = this,
                children = element.children;

            for (var i = 0, length = children.length; i < length; i++) {
                children[i]._childIndex = i;
            }

            return children.slice(0).sort(element.compareChildren);
        },

        compareChildren: function(a, b) {
            var aValue = a.options.zIndex || 0,
                bValue = b.options.zIndex || 0;

            if (aValue !== bValue) {
                return aValue - bValue;
            }

            return a._childIndex - b._childIndex;
        }
    });

    function SVGFactory() {}

    SVGFactory.prototype = {
        root: function(options) {
            return new SVGRoot(options);
        },

        group: function(options) {
            return new SVGGroup(options);
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

        line: function(x1, y1, x2, y2, options) {
            return new SVGPath([[x1, y1], [x2, y2]], options);
        }
    };

    var SVGRoot = ViewElement.extend({
        init: function(options) {
            var root = this;

            ViewElement.fn.init.call(root, options);

            root.template = SVGRoot.template;
            if (!root.template) {
                root.template = SVGRoot.template = template(
                    "<svg xmlns='http://www.w3.org/2000/svg' version='1.1' " +
                    "width='<%= options.width %>px' height='<%= options.height %>px'>" +
                    "<%= renderContent() %></svg>"
                );
            }
        },

        options: {
            width: DEFAULT_WIDTH,
            height: DEFAULT_HEIGHT
        }
    });


    var SVGGroup = ViewElement.extend({
        init: function(options) {
            var group = this;
            ViewElement.fn.init.call(group, options);

            group.template = SVGGroup.template;
            if (!group.template) {
                group.template = SVGGroup.template =
                    template("<g><%= renderContent() %></g>");
            }
        }
    });


    var SVGText = ViewElement.extend({
        init: function(content, options) {
            var text = this;
            ViewElement.fn.init.call(text, options);

            text.content = content;
            text.template = SVGText.template;
            if (!text.template) {
                text.template = SVGText.template = template(
                    "<text x='<%= options.x %>' y='<%= options.y + options.baseline %>' " +
                    "style='font: <%= options.font %>'><%= content %></text>"
                );
            }
        },

        options: {
            x: 0,
            y: 0,
            baseline: 0,
            font: "16px Verdana, sans-serif"
        }
    });

    var SVGPath = ViewElement.extend({
        init: function(points, options) {
            var path = this;
            ViewElement.fn.init.call(path, options);

            path.template = SVGPath.template;
            if (!path.template) {
                path.template = SVGPath.template = template(
                    "<path d='<%= renderPoints() %>' " +
                    "stroke='<%= options.stroke %>' stroke-width='<%= options.strokeWidth %>' " +
                    "stroke-linecap='square' " +
                    "fill='<%= options.fill || 'none' %>'></path>"
                );
            }

            path.points = points || [];
        },

        options: {
            stroke: "#000",
            strokeWidth: 1,
            fill: ""
        },

        renderPoints: function() {
            var path = this,
                points = this.points,
                count = points.length,
                shouldAlign = path.options.strokeWidth % 2 !== 0,
                alignFunc = shouldAlign ? alignToPixel : Math.round,
                first = points[0],
                result = "M" + alignFunc(first[0]) + " " + alignFunc(first[1]);

            for (var i = 1; i < count; i++) {
                var p = points[i];
                result += " L" + alignFunc(p[0]) + " " + alignFunc(p[1]);
            }

            return result;
        }
    });

    function VMLFactory() {
        if (document.namespaces) {
            document.namespaces.add("kvml", "urn:schemas-microsoft-com:vml", "#default#VML");
        }
    }

    VMLFactory.prototype = {
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

        line: function(x1, y1, x2, y2, options) {
            return new VMLPath([[x1, y1], [x2, y2]], options);
        },

        group: function(options) {
            return new VMLGroup(options);
        }
    };

    var VMLRoot = ViewElement.extend({
        init: function(options) {
            var root = this;
            ViewElement.fn.init.call(root, options);

            root.template = VMLRoot.template;
            if (!root.template) {
                root.template = VMLRoot.template = template(
                    "<div style='width:<%= options.width %>px; height:<%= options.height %>px; " +
                    "position: relative;'>" +
                    "<%= renderContent() %></div>"
                );
            }
        },

        options: {
            width: DEFAULT_WIDTH,
            height: DEFAULT_HEIGHT
        }
    });

    var VMLText = ViewElement.extend({
        init: function(content, options) {
            var text = this;
            ViewElement.fn.init.call(text, options);

            text.content = content || "";
            text.template = VMLText.template;
            if (!text.template) {
                text.template = VMLText.template = template(
                    "<kvml:textbox style='position: absolute; " +
                    "left: <%= options.x %>px; top: <%= options.y %>px; " +
                    "font: <%= options.font %>'><%= content %></kvml:textbox>"
                );
            }
        },

        options: {
            x: 0,
            y: 0,
            font: "16px Verdana, sans-serif"
        }
    });

    var VMLPath = ViewElement.extend({
        init: function(points, options) {
            var path = this;
            ViewElement.fn.init.call(path, options);

            path.template = VMLPath.template;
            if (!path.template) {
                path.template = VMLPath.template = template(
                    "<kvml:shape style='position:absolute; width:1px; height:1px;' " +
                    "strokecolor='<%= options.stroke %>' stroked='<%= !!options.stroke %>' " +
                    "strokeweight='<%= options.strokeWidth %>' " +
                    "fillcolor='<%= options.fill %>' filled='<%= !!options.fill %>' " +
                    "coordorigin='0 0' coordsize='1 1'>" +
                    "<kvml:path v='<%= renderPoints() %> e' /></kvml:shape>"
                );
            }

            path.points = points || [];
        },

        options: {
            stroke: "#000",
            strokeWidth: 1,
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

    var VMLGroup = ViewElement.extend({
        init: function(options) {
            var group = this;
            ViewElement.fn.init.call(group, options);

            group.template = VMLGroup.template;
            if (!group.template) {
                group.template = VMLGroup.template = template(
                    "<div style='position: absolute; white-space: nowrap;'>" +
                    "<%= renderContent() %></div>"
                );
            }
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
        measureBox.innerHTML = text;
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
        if (r.x1 == s.x1 && r.y1 == s.y1 && r.x2 == s.x2 && r.y2 == s.y2) {
            return s;
        }

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
        result[ 0 ] = new Box2D( b, e, c, f );
        result[ 1 ] = new Box2D( a, f, b, g );
        result[ 2 ] = new Box2D( c, f, d, g );
        result[ 3 ] = new Box2D( b, g, c, h );

        // decide which corners
        if( r.x1 == a && r.y1 == e || s.x1 == a && s.y1 == e )
        { // corners 0 and 7
            result[ 4 ] = new Box2D( a, e, b, f );
            result[ 5 ] = new Box2D( c, g, d, h );
        }
        else
        { // corners 2 and 5
            result[ 4 ] = new Box2D( c, e, d, f );
            result[ 5 ] = new Box2D( a, g, b, h );
        }

        return $.grep(result, function(box) {
            return box.height() > 0 && box.width() > 0
        })[0];
    }

    function alignToPixel(coord) {
        return Math.round(coord) + 0.5;
    }

    function sparseArrayMin(arr) {
        return sparseArrayLimits(arr).min;
    }

    function sparseArrayMax(arr) {
        return sparseArrayLimits(arr).max;
    }

    function sparseArrayLimits(arr) {
        var min = Number.MAX_VALUE,
            max = - Number.MAX_VALUE;
        for (var i = 0, length = arr.length; i < length; i++) {
            var n = arr[i];
            if (typeof n !== UNDEFINED) {
                min = Math.min(min, n);
                max = Math.max(max, n);
            }
        }

        return { min: min, max: max };
    }

    function getSpacing(value) {
        var spacing = {};

        if (typeof(value) === "number") {
            spacing[TOP] = spacing[RIGHT] = spacing[BOTTOM] = spacing[LEFT] = value;
        } else {
            spacing[TOP] = value[TOP] || 0;
            spacing[RIGHT] = value[RIGHT] || 0;
            spacing[BOTTOM] = value[BOTTOM] || 0;
            spacing[LEFT] = value[LEFT] || 0;
        }

        return spacing;
    }

    function inArray(value, array) {
        return $.inArray(value, array) != -1;
    }

    function deepExtend(destination) {
        var i = 1,
            length = arguments.length,
            source,
            property,
            propValue;

        for (i = 1; i < length; i++) {
            source = arguments[i];

            for (property in source) {
                propValue = source[property];
                if (typeof propValue === "object" && propValue !== null && propValue.constructor !== Array) {
                    destination[property] = destination[property] || {};
                    deepExtend(destination[property], propValue);
                } else {
                    destination[property] = propValue;
                }
            }
        }

        return destination;
    }

    // Exports ================================================================

    kendo.ui.plugin("Chart", Chart);

    Chart.Box2D = Box2D;
    Chart.Text = Text;
    Chart.BarLabel = BarLabel;
    Chart.ChartElement = ChartElement;
    Chart.RootElement = RootElement;
    Chart.BoxElement = BoxElement;
    Chart.NumericAxis = NumericAxis;
    Chart.CategoryAxis = CategoryAxis;
    Chart.Bar = Bar;
    Chart.BarChart = BarChart;
    Chart.ClusterLayout = ClusterLayout;
    Chart.StackLayout = StackLayout;
    Chart.Title = Title;
    Chart.Legend = Legend;
    Chart.PlotArea = PlotArea;
    Chart.ViewElement = ViewElement;
    Chart.SVGFactory = SVGFactory;
    Chart.SVGRoot = SVGRoot;
    Chart.SVGGroup = SVGGroup;
    Chart.SVGText = SVGText;
    Chart.SVGPath = SVGPath;
    Chart.VMLFactory = VMLFactory;
    Chart.VMLRoot = VMLRoot;
    Chart.VMLText = VMLText;
    Chart.VMLPath = VMLPath;
    Chart.VMLGroup = VMLGroup;

})(jQuery);

