(function () {

    // Imports ================================================================
    var $ = jQuery,
        doc = document,
        kendo = window.kendo,
        Class = kendo.Class,
        Component = kendo.ui.Component,
        DataSource = kendo.data.DataSource,
        baseTemplate = kendo.template,
        format = kendo.format,
        proxy = $.proxy;

    // Constants ==============================================================
    var ABOVE = "above",
        BASELINE_MARKER_SIZE = 1,
        BAR = "bar",
        BAR_BORDER_BRIGHTNESS = 0.7,
        BAR_GAP = 1.5,
        BAR_SPACING = 0.4,
        BELOW = "below",
        BLACK = "#000",
        BOTTOM = "bottom",
        CENTER = "center",
        CHANGE = "change",
        CIRCLE = "circle",
        COLUMN = "column",
        COORD_PRECISION = 3,
        DATABOUND = "dataBound",
        DEFAULT_HEIGHT = 400,
        DEFAULT_PRECISION = 6,
        DEFAULT_WIDTH = 600,
        GLASS = "glass",
        HEIGHT = "height",
        HORIZONTAL = "horizontal",
        INTERPOLATE = "interpolate",
        LEFT = "left",
        LINE = "line",
        LINE_MARKER_SIZE = 6,
        LINE_MARKER_SQUARE = "square",
        NONE = "none",
        OBJECT = "object",
        OUTSIDE = "outside",
        RIGHT = "right",
        SANS12 = "12px Verdana, sans-serif",
        SANS16 = "16px Verdana, sans-serif",
        SQUARE = "square",
        SVG_NS = "http://www.w3.org/2000/svg",
        TOP = "top",
        TRIANGLE = "triangle",
        UNDEFINED = "undefined",
        VERTICAL = "vertical",
        WIDTH = "width",
        WHITE = "#fff",
        X = "x",
        Y = "y",
        ZERO = "zero",
        ZERO_THRESHOLD = 0.2;

    // Chart ==================================================================
    var Chart = Component.extend({
        init: function(element, options) {
            var chart = this,
                theme = options ? options.theme : "";

            Component.fn.init.call(chart, element);

            chart.options = deepExtend(
                chart.options,
                theme ? Chart.Themes[theme] || Chart.Themes[theme.toLowerCase()] : { },
                options
            );

            chart.bind([DATABOUND], chart.options);

            if (chart.options.dataSource) {
                chart._initDataSource();
            }

            chart.refresh();
        },

        options: {
            chartArea: {},
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
            seriesColors: ["#d7df23", "#adc32b", "#799b28", "#4c7520"],
            seriesDefaults: {
                type: COLUMN,
                data: [],
                bar: {
                    gap: BAR_GAP,
                    spacing: BAR_SPACING
                },
                column: {
                    gap: BAR_GAP,
                    spacing: BAR_SPACING
                }
            },
            series: []
        },

        types: { },

        refresh: function() {
            var chart = this;

            chart._applyDefaults();

            if (chart.options.dataSource) {
                chart.dataSource.read();
            } else {
                chart._redraw();
            }
        },

        _redraw: function() {
            var chart = this,
                options = chart.options,
                model = new RootElement(options.chartArea);

            if (options.title && options.title.visible && options.title.text) {
                model.children.push(new Title(options.title));
            }

            if (options.legend.visible) {
                var legendOptions = deepExtend({}, options.legend,
                                    { series: options.series });

                model.children.push(new Legend(legendOptions));
            }

            model.children.push(new PlotArea(chart.options));
            chart._model = model;

            model.reflow();
            model.getView().renderTo(chart.element[0]);
        },

        _applyDefaults: function() {
            var chart = this,
                element = chart.element,
                options = chart.options,
                series = options.series,
                seriesType,
                colors = options.seriesColors,
                chartArea = options.chartArea,
                seriesDefaults = options.seriesDefaults,
                baseSeriesDefaults = deepExtend({}, options.seriesDefaults);

            delete baseSeriesDefaults.bar;
            delete baseSeriesDefaults.column;
            delete baseSeriesDefaults.line;

            for (var i = 0, length = series.length; i < length; i++) {
                // Determine series type in advance so we can apply the
                // default settings for this type
                seriesType = series[i].type || options.seriesDefaults.type;

                series[i] = deepExtend(
                    { color: colors[i % colors.length] },
                    baseSeriesDefaults,
                    options.seriesDefaults[seriesType],
                    series[i]);
            }

            if (!chartArea.width) {
                chartArea.width = element.width() || DEFAULT_WIDTH;
            }

            if (!chartArea.height) {
                chartArea.height = element.height() || DEFAULT_HEIGHT;
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
                }
            }

            chart.trigger(DATABOUND);
            chart._redraw();
        }
    });


    // **************************
    // Themes
    // **************************
    Chart.Themes = { };


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
        },

        center: function() {
            var box = this;

            return [
                box.x1 + box.width() / 2,
                box.y1 + box.height() / 2
            ];
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

        reflow: function(targetBox) {
            var element = this,
                children = element.children,
                box;

            for (var i = 0; i < children.length; i++) {
                var currentChild = children[i];

                currentChild.reflow(targetBox);
                box = box ? box.wrap(currentChild.box) : currentChild.box.clone();
            }

            element.box = box;
        },

        getViewElements: function(view) {
            var element = this,
                viewElements = [],
                children = element.children,
                childrenCount = children.length;

            for (var i = 0; i < childrenCount; i++) {
                viewElements.push.apply(viewElements,
                    children[i].getViewElements(view));
            }

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
            height: DEFAULT_HEIGHT,
            background: WHITE,
            border: {
                color: BLACK,
                width: 0
            },
            margin: 5,
            zIndex: -1
        },

        reflow: function() {
            var root = this,
                currentBox = new Box2D(0, 0, root.options.width, root.options.height);

            root.box = currentBox.unpad(root.options.margin);

            for (var i = 0; i < root.children.length; i++) {
                root.children[i].reflow(currentBox);
                currentBox = boxDiff(currentBox, root.children[i].box);
            }
        },

        getView: function() {
            var root = this,
                options = root.options,
                view = root.supportsSVG() ? new SVGView(options) : new VMLView(options);

            [].push.apply(view.children, root.getViewElements(view));

            return view;
        },

        getViewElements: function(view) {
            var root = this,
                options = root.options,
                border = options.border || {},
                box = root.box.clone().pad(options.margin).unpad(border.width),
                elements = [
                    view.createRect(box, {
                        stroke: border.width ? border.color : "",
                        strokeWidth: border.width,
                        fill: options.background,
                        zIndex: options.zIndex })
                ];

            return elements.concat(
                ChartElement.fn.getViewElements.call(root, view)
            );
        },

        supportsSVG: function() {
            return doc.implementation.hasFeature(
                "http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1");
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
                color: BLACK,
                width: 0
            },
            background: "",
            width: 0,
            height: 0,
            visible: true
        },

        reflow: function(targetBox) {
            var element = this,
                box,
                contentBox,
                options = element.options,
                children = element.children,
                margin = getSpacing(options.margin),
                padding = getSpacing(options.padding),
                border = options.border,
                borderWidth = border.width;

            ChartElement.fn.reflow.call(element, targetBox);

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

        getViewElements: function(view) {
            var element = this,
                options = element.options;

            if (!options.visible) {
                return [];
            }

            var border = options.border || {},
                elements = [
                    view.createRect(element.paddingBox, {
                        stroke: border.width ? border.color : "",
                        strokeWidth: border.width,
                        strokeOpacity: options.opacity,
                        fill: options.background,
                        fillOpacity: options.opacity })
                ];

            return elements.concat(
                ChartElement.fn.getViewElements.call(element, view)
            );
        }
    });

    var Text = ChartElement.extend({
        init: function(content, options) {
            var text = this;

            ChartElement.fn.init.call(text, options);

            // Calculate size
            text.content = content;
            text.reflow(defaultBox);
        },

        options: {
            font: "10pt Verdana, sans-serif",
            color: BLACK,
            align: LEFT,
            vAlign: ""
        },

        reflow: function(targetBox) {
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

        getViewElements: function(view) {
            var text = this,
                options = text.options;

            return [
                view.createText(text.content, {
                    x: text.box.x1, y: text.box.y1,
                    baseline: text.baseline,
                    font: options.font,
                    color: options.color })
            ];
        }
    });

    var TextBox = BoxElement.extend({
        init: function(content, options) {
            var textBox = this;

            BoxElement.fn.init.call(textBox, options);

            textBox.children.push(
                new Text(options.format ? format(options.format, content) : content,
                    deepExtend({ }, textBox.options, { align: LEFT, vAlign: TOP }))
            );

            // Calculate size
            textBox.reflow(defaultBox);
        }
    });

    var BarLabel = ChartElement.extend({
        init: function(content, options) {
            var barLabel = this;
            ChartElement.fn.init.call(barLabel, options);

            barLabel.children.push(new TextBox(content, barLabel.options));
        },

        options: {
            font: SANS16,
            position: "outsideEnd",
            margin: 2,
            padding: 2,
            color: BLACK,
            background: "",
            border: {
                width: 0,
                color: BLACK
            },
            aboveAxis: true,
            isVertical: false
        },

        reflow: function(targetBox) {
            var barLabel = this,
                options = barLabel.options,
                isVertical = options.isVertical,
                aboveAxis = options.aboveAxis,
                text = barLabel.children[0],
                box = text.box;

            text.options.align = isVertical ? CENTER : LEFT;
            text.options.vAlign = isVertical ? TOP : CENTER;

            if (options.position == "insideEnd") {
                if (isVertical) {
                    text.options.vAlign = TOP;

                    if (!aboveAxis && box.height() < targetBox.height()) {
                        text.options.vAlign = BOTTOM;
                    }
                } else {
                    text.options.align = aboveAxis ? RIGHT : LEFT;
                }
            } else if (options.position == CENTER) {
                text.options.vAlign = CENTER;
                text.options.align = CENTER;
            } else if (options.position == "insideBase") {
                if (isVertical) {
                    text.options.vAlign = aboveAxis ? BOTTOM : TOP;
                } else {
                    text.options.align = aboveAxis ? LEFT : RIGHT;
                }
            } else if (options.position == "outsideEnd") {
                if (isVertical) {
                    if (aboveAxis) {
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
                    if (aboveAxis) {
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

            text.reflow(targetBox);
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
            font: SANS16,
            color: BLACK,
            position: TOP,
            align: CENTER,
            margin: 5,
            padding: 5
        },

        create: function() {
            var title = this,
                options = title.options,
                textBoxOptions = deepExtend({}, options, {
                    vAlign: options.position
                });

            title.children.push(
                new TextBox(options.text, textBoxOptions)
            );
        },

        reflow: function(targetBox) {
            var title = this;

            ChartElement.fn.reflow.call(title, targetBox);
            title.box.snapTo(targetBox, X);
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
            labels: {
                font: SANS12
            },
            offsetX: 0,
            offsetY: 0,
            margin: 10,
            padding: 5,
            border: {
                color: BLACK,
                width: 0
            },
            background: "",
            zIndex: 1
        },

        createLabels: function() {
            var legend = this,
                series = legend.options.series;

            for (var i = 0; i < series.length; i++) {
                var name = series[i].name,
                    label = new Text(name, legend.options.labels);

                legend.children.push(label);
            }
        },

        reflow: function(targetBox) {
            var legend = this,
                options = legend.options,
                childrenCount = legend.children.length;

            if (childrenCount === 0) {
                legend.box = targetBox.clone();
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

        getViewElements: function(view) {
            var legend = this,
                children = legend.children,
                options = legend.options,
                series = options.series,
                markerSize = legend.markerSize(),
                group = view.createGroup({ zIndex: options.zIndex }),
                border = options.border || {},
                labelBox;

            [].push.apply(group.children, ChartElement.fn.getViewElements.call(legend, view));

            for (var i = 0, length = series.length; i < length; i++) {
                var color = series[i].color,
                    label = children[i],
                    markerBox = new Box2D();

                labelBox = labelBox ? labelBox.wrap(label.box) : label.box.clone();

                markerBox.x1 = label.box.x1 - markerSize * 2;
                markerBox.x2 = markerBox.x1 + markerSize;

                if (options.position == TOP || options.position == BOTTOM) {
                    markerBox.y1 = label.box.y1 + markerSize / 2;
                } else {
                    markerBox.y1 = label.box.y1 + (label.box.height() - markerSize) / 2;
                }

                markerBox.y2 = markerBox.y1 + markerSize;

                group.children.push(view.createRect(markerBox, { fill: color, stroke: color }));
            }

            if (children.length > 0) {
                var padding = getSpacing(options.padding);
                padding.left += markerSize * 2;
                labelBox.pad(padding);
                group.children.unshift(view.createRect(labelBox, {
                    stroke: border.width ? border.color : "",
                    strokeWidth: border.width,
                    fill: options.background })
                );
            }

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
                margin = getSpacing(options.margin),
                markerSpace = legend.markerSize() * 2;

            // Position labels below each other
            for (var i = 1; i < childrenCount; i++) {
                var label = legend.children[i];
                label.box.alignTo(legend.children[i - 1].box, BOTTOM);
                labelBox.wrap(label.box);
            }

            // Vertical center is calculated relative to the container, not the parent!
            if (options.position == LEFT) {
                offsetX = targetBox.x1 + markerSpace + margin.left;
                offsetY = (targetBox.y2 - labelBox.height()) / 2;
                labelBox.x2 += markerSpace + margin.left + margin.right;
            } else {
                offsetX = targetBox.x2 - labelBox.width() - margin.right;
                offsetY = (targetBox.y2 - labelBox.height()) / 2;
                labelBox.translate(offsetX, offsetY);
                labelBox.x1 -= markerSpace + margin.left;
            }

            legend.translateChildren(offsetX + options.offsetX,
                    offsetY + options.offsetY);

            var labelBoxWidth = labelBox.width();
            labelBox.x1 = Math.max(targetBox.x1, labelBox.x1);
            labelBox.x2 = labelBox.x1 + labelBoxWidth;

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
            }

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
                markerWidth = legend.markerSize() * 2;

            // Position labels next to each other
            for (var i = 1; i < childrenCount; i++) {
                var label = legend.children[i]
                label.box.alignTo(legend.children[i - 1].box, BOTTOM);
                labelBox.wrap(label.box);
            }

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

    var Axis = ChartElement.extend({
        init: function(options) {
            var axis = this;

            ChartElement.fn.init.call(axis, options);
        },

        options: {
            labels: { },
            line: {
                width: 1,
                color: BLACK
            },
            majorTickType: OUTSIDE,
            majorTickSize: 4,
            minorTickType: NONE,
            minorTickSize: 3,
            axisCrossingValue: 0,
            minorGridLines: {
                visible: false,
                width: 1,
                color: BLACK
            },
            margin: 5
        },

        renderTicks: function(view) {
            var axis = this,
                options = axis.options,
                isVertical = options.orientation === VERTICAL,
                box = axis.box,
                majorTicks = axis.getMajorTickPositions(),
                ticks = [];

            if (options.majorTickType.toLowerCase() === OUTSIDE) {
                ticks = ticks.concat($.map(majorTicks, function(pos) {
                                        return {
                                            pos: pos,
                                            size: options.majorTickSize,
                                            width: options.line.width,
                                            color: options.line.color
                                        };
                                    }));
            }

            if (options.minorTickType.toLowerCase()  === OUTSIDE) {
                ticks = ticks.concat($.map(axis.getMinorTickPositions(), function(pos) {
                            if (options.majorTickType !== NONE) {
                                if (!inArray(pos, majorTicks)) {
                                    return {
                                        pos: pos,
                                        size: options.minorTickSize,
                                        width: options.line.width,
                                        color: options.line.color
                                    };
                                }
                            } else {
                                    return {
                                        pos: pos,
                                        size: options.minorTickSize,
                                        width: options.line.width,
                                        color: options.line.color
                                    };
                            }
                        }));
            }

            return $.map(ticks, function(tick) {
                if (isVertical) {
                    return view.createLine(
                            box.x2 - tick.size, tick.pos, box.x2, tick.pos,
                            {
                                strokeWidth: tick.width,
                                stroke: tick.color
                            }
                    );
                } else {
                    return view.createLine(
                            tick.pos, box.y1, tick.pos, box.y1 + tick.size,
                            {
                                strokeWidth: tick.width,
                                stroke: tick.color
                            }
                    );
                }
            });
        },

        getActualTickSize: function () {
            var axis = this,
                options = axis.options,
                tickSize = 0;

            if (options.majorTickType != NONE && options.minorTickType != NONE ) {
                tickSize = Math.max(options.majorTickSize, options.minorTickSize);
            } else if (options.majorTickType != NONE) {
                tickSize = options.majorTickSize;
            } else if (options.minorTickType != NONE) {
                tickSize = options.minorTickSize;
            }

            return tickSize;
        },

        arrangeLabels: function(maxLabelWidth, maxLabelHeight, positions) {
            var axis = this,
                options = axis.options,
                isVertical = axis.options.orientation === VERTICAL,
                children = axis.children,
                tickPositions = axis.getMajorTickPositions(),
                tickSize = axis.getActualTickSize();

            for (var i = 0; i < children.length; i++) {
                var label = children[i],
                    tickIx = isVertical ? (children.length - 1 - i) : i,
                    labelSize = isVertical ? label.box.height() : label.box.width(),
                    labelPos = tickPositions[tickIx] - (labelSize / 2),
                    firstTickPosition,
                    nextTickPosition,
                    middle;

                if (isVertical) {
                    if (positions == "onMinorTicks") {
                        firstTickPosition = tickPositions[i],
                        nextTickPosition = tickPositions[i + 1];

                        middle = firstTickPosition + (nextTickPosition - firstTickPosition) / 2;
                        labelPos = middle - (labelSize / 2);
                    }
                    var labelX = axis.box.x2 - options.margin - tickSize;

                    labelBox = new Box2D(labelX - label.box.width(), labelPos,
                                         labelX, labelPos)
                } else {
                    if (positions == "onMinorTicks") {
                        firstTickPosition = tickPositions[i],
                        nextTickPosition = tickPositions[i + 1];
                    } else {
                        firstTickPosition = labelPos;
                        nextTickPosition = labelPos + labelSize;
                    }
                    var labelY = axis.box.y1 + tickSize + options.margin;

                    labelBox = new Box2D(firstTickPosition, labelY,
                                         nextTickPosition, labelY);
                }

                label.reflow(labelBox);
            }
        }
    });

    var NumericAxis = Axis.extend({
        init: function(seriesMin, seriesMax, options) {
            var axis = this,
                autoOptions = {
                    min: axis.autoAxisMin(seriesMin, seriesMax),
                    max: axis.autoAxisMax(seriesMin, seriesMax)
                };

            Axis.fn.init.call(axis, deepExtend(autoOptions, options));

            options = axis.options;

            if(!options.majorUnit) {
                // Determine an auto major unit after min/max have been set
                options.majorUnit = axis.autoMajorUnit(options.min, options.max);
            }

            var majorDivisions = axis.getMajorDivisions(),
                currentValue = options.min,
                align = options.orientation === VERTICAL ? RIGHT : CENTER,
                labelOptions = deepExtend({ }, options.labels, { align: align }),
                labelFormat = options.labels.format;

            for (var i = 0; i < majorDivisions; i++) {
                var text = new Text(
                    labelFormat ? format(labelFormat, currentValue) : currentValue.toString(),
                    labelOptions
                );

                axis.children.push(text);

                currentValue = round(currentValue + options.majorUnit, DEFAULT_PRECISION);
            }
        },

        options: {
            min: 0,
            max: 1,
            orientation: VERTICAL,
            majorGridLines: {
                visible: true,
                width: 1,
                color: BLACK
            },
            zIndex: 1
        },

        reflow: function(targetBox) {
            var axis = this,
                options = axis.options,
                isVertical = options.orientation === VERTICAL,
                children = axis.children,
                space = axis.getActualTickSize() + options.margin,
                maxLabelWidth = 0,
                maxLabelHeight = 0;

            for (var i = 0; i < children.length; i++) {
                var label = children[i];
                maxLabelWidth = Math.max(maxLabelWidth, label.box.width());
                maxLabelHeight = Math.max(maxLabelHeight, label.box.height());
            }

            if (isVertical) {
                axis.box = new Box2D(
                    targetBox.x1, targetBox.y1,
                    targetBox.x1 + maxLabelWidth + space, targetBox.y2
                );
            } else {
                axis.box = new Box2D(
                    targetBox.x1, targetBox.y1,
                    targetBox.x2, targetBox.y1 + maxLabelHeight + space
                );
            }

            axis.arrangeLabels(maxLabelWidth, maxLabelHeight);
        },

        getViewElements: function(view) {
            var axis = this,
                options = axis.options,
                isVertical = options.orientation === VERTICAL,
                childElements = ChartElement.fn.getViewElements.call(axis, view);

            var majorTickPositions = axis.getMajorTickPositions();
            if (options.line.width > 0) {
                if (isVertical) {
                    childElements.push(view.createLine(
                        axis.box.x2, majorTickPositions[0],
                        axis.box.x2, majorTickPositions[majorTickPositions.length - 1],
                        {
                            strokeWidth: options.line.width,
                            stroke: options.line.color,
                            zIndex: options.zIndex
                        }));
                } else {
                    childElements.push(view.createLine(
                        majorTickPositions[0], axis.box.y1,
                        majorTickPositions[majorTickPositions.length - 1], axis.box.y1,
                        {
                            strokeWidth: options.line.width,
                            stroke: options.line.color,
                            zIndex: options.zIndex
                        }));
                }

                [].push.apply(childElements, axis.renderTicks(view));
            }

            return childElements;
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

    var CategoryAxis = Axis.extend({
        init: function(options) {
            var axis = this;
            Axis.fn.init.call(axis, options);

            var options = axis.options,
                align = options.orientation === VERTICAL ? RIGHT : CENTER,
                labelOptions = deepExtend({ }, options.labels, { align: align });

            for (var i = 0; i < options.categories.length; i++) {
                var label = options.categories[i];
                axis.children.push(new Text(label, labelOptions));
            }
        },

        options: {
            categories: [],
            orientation: HORIZONTAL,
            majorGridLines: {
                visible: false,
                width: 1,
                color: BLACK
        },
            zIndex: 1
        },

        reflow: function(targetBox) {
            var axis = this,
                options = axis.options,
                isVertical = options.orientation === VERTICAL,
                children = axis.children,
                space = axis.getActualTickSize() + options.margin,
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
                    targetBox.x1 + maxLabelWidth + space, targetBox.y2
                );
            } else {
                axis.box = new Box2D(
                    targetBox.x1, targetBox.y1,
                    targetBox.x2, targetBox.y1 + maxLabelHeight + space
                );
            }

            axis.arrangeLabels(maxLabelWidth, maxLabelHeight, "onMinorTicks");
        },

        getViewElements: function(view) {
            var axis = this,
                options = axis.options,
                isVertical = options.orientation === VERTICAL,
                childElements = ChartElement.fn.getViewElements.call(axis, view);

            if (options.line.width > 0) {
                if (isVertical) {
                    childElements.push(view.createLine(
                        axis.box.x2, axis.box.y1, axis.box.x2, axis.box.y2,
                        {
                            strokeWidth: options.line.width,
                            stroke: options.line.color,
                            zIndex: options.zIndex
                        }));
                } else {
                    childElements.push(view.createLine(
                        axis.box.x1, axis.box.y1, axis.box.x2, axis.box.y1,
                        {
                            strokeWidth: options.line.width,
                            stroke: options.line.color,
                            zIndex: options.zIndex
                        }));
                }

                [].push.apply(childElements, axis.renderTicks(view));
            }

            return childElements;
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
                positions.push(round(pos, COORD_PRECISION));
                pos += step;
            }

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
        },

        getAxisLineBox: function() {
            var axis = this,
                options = axis.options;

            return axis.getSlot(0).wrap(axis.getSlot(options.categories.length - 1));
        }
    });

    var ClusterLayout = ChartElement.extend({
        init: function(options) {
            var cluster = this;
            ChartElement.fn.init.call(cluster, options);
        },

        options: {
            isVertical: false,
            gap: 0,
            spacing: 0
        },

        reflow: function(box) {
            var cluster = this,
                options = cluster.options,
                isVertical = options.isVertical,
                axis = isVertical ? Y : X,
                children = cluster.children,
                gap = options.gap,
                spacing = options.spacing,
                count = children.length,
                slots = count + gap + (spacing * (count - 1)),
                slotSize = (isVertical ? box.height() : box.width()) / slots,
                position = box[axis + 1] + slotSize * (gap / 2);

            for (var i = 0; i < count; i++) {
                var childBox = (children[i].box || box).clone();

                childBox[axis + 1] = position;
                childBox[axis + 2] = position + slotSize;

                children[i].reflow(childBox);
                if (i < count - 1) {
                    position += (slotSize * spacing);
                }

                position += slotSize;
            }
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

        reflow: function(targetBox) {
            var stack = this,
                options = stack.options,
                isVertical = options.isVertical,
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

                currentChild.reflow(childBox);

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
            color: WHITE,
            border: {
                width: 1
            },
            isVertical: true,
            overlay: GLASS
        },

        reflow: function(targetBox) {
            var bar = this,
                children = bar.children;

            bar.box = targetBox;
            for(var i = 0, length = children.length; i < length; i++) {
                children[i].reflow(targetBox);
            }
        },

        getViewElements: function(view) {
            var bar = this,
                options = bar.options,
                isVertical = options.isVertical,
                border = options.border.width > 0 ? {
                    stroke: bar.getBorderColor(),
                    strokeWidth: options.border.width
                } : {},
                box = bar.box,
                rectStyle = deepExtend({
                    fill: options.color,
                    overlay: options.overlay,
                    normalAngle: isVertical ? 0 : 90,
                    fillOpacity: options.opacity,
                    strokeOpacity: options.opacity
                }, border),
                elements = [];

            elements.push(
                view.createRect(box, rectStyle)
            );
            [].push.apply(elements,
                ChartElement.fn.getViewElements.call(bar, view)
            );
            return elements;
        },

        getBorderColor: function() {
            var bar = this,
                options = bar.options,
                color = options.color,
                borderColor = options.border.color;

            if (typeof borderColor === UNDEFINED) {
                borderColor =
                    new Color(color).brightness(BAR_BORDER_BRIGHTNESS).toHex();
            }

            return borderColor;
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
            isStacked: false
        },

        render: function() {
            var barChart = this,
                options = barChart.options,
                isStacked = options.isStacked,
                catMax = [],
                catMin = [];

            barChart.traverseDataPoints(function(value, categoryIx, series, seriesIx) {
                if(typeof value !== UNDEFINED) {
                    if (isStacked) {
                        var sums = value > 0 ? catMax : catMin;
                        sums[categoryIx] = sums[categoryIx] ? sums[categoryIx] + value : value;
                    } else {
                        barChart._seriesMin = Math.min(barChart._seriesMin, value);
                        barChart._seriesMax = Math.max(barChart._seriesMax, value);
                    }
                }

                barChart.addValue(value, categoryIx, series, seriesIx);
            });

            if (isStacked) {
                barChart._seriesMin = sparseArrayMin(catMin.length ? catMin : catMax);
                barChart._seriesMax = sparseArrayMax(catMax.length ? catMax : catMin);
            }
        },

        addValue: function(value, categoryIx, series, seriesIx) {
            var barChart = this,
                options = barChart.options,
                children = barChart.children,
                isStacked = barChart.options.isStacked,
                labelOptions = deepExtend({
                    isVertical: options.isVertical
                }, series.labels);

            if (isStacked) {
                if (labelOptions.position == "outsideEnd") {
                    labelOptions.position = "insideEnd";
                }
            }

            var bar = new Bar({
                color: series.color,
                opacity: series.opacity,
                border: series.border,
                isVertical: options.isVertical,
                overlay: series.overlay
            });

            if (labelOptions.visible && value) {
                var label = new BarLabel(value, labelOptions);
                bar.children.push(label);
            }

            barChart._bars.push(bar);

            var cluster = children[categoryIx];
            if (!cluster) {
                cluster = children[categoryIx] = new ClusterLayout({
                    isVertical: !options.isVertical,
                    gap: options.gap,
                    spacing: options.spacing
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

            if (barChart._bars.length) {
            return { min: barChart._seriesMin, max: barChart._seriesMax };
            }

            return null;
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

        reflow: function(targetBox) {
            var barChart = this,
                options = barChart.options,
                isVertical = options.isVertical,
                plotArea = barChart.plotArea,
                barIndex = 0,
                categorySlots = [],
                bars = barChart._bars;

            barChart.traverseDataPoints(function(value, categoryIx) {
                var bar = bars[barIndex++];

                if (bar && bar.stackValue) {
                    value = bar.stackValue;
                }

                var slotX = plotArea.axisX.getSlot(isVertical ? categoryIx : value);
                var slotY = plotArea.axisY.getSlot(isVertical ? value : categoryIx);

                var barSlot = new Box2D(slotX.x1, slotY.y1, slotX.x2, slotY.y2);

                var valueAxis = options.isVertical ? plotArea.axisY : plotArea.axisX,
                    axisCrossingValue = valueAxis.options.axisCrossingValue,
                    aboveAxis = value >= axisCrossingValue;

                if (bar) {
                    var label = bar.children[0];

                    if (label) {
                        label.options.aboveAxis = aboveAxis;
                        label.content = label.content || axisCrossingValue;
                    }

                    bar.box = barSlot;
                    bar.options.aboveAxis = aboveAxis;
                }

                if(!categorySlots[categoryIx]) {
                    categorySlots[categoryIx] = isVertical ? slotX : slotY;
                }
            });

            barChart.reflowCategories(categorySlots);

            barChart.box = targetBox;
       },

        reflowCategories: function(categorySlots) {
            var chart = this,
                children = chart.children,
                childrenLength = children.length,
                i;

            for (i = 0; i < childrenLength; i++) {
                children[i].reflow(categorySlots[i]);
            }
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

                    callback(value, categoryIx, currentSeries, seriesIx);
                }
            }
       }
    });

    var ShapeElement = BoxElement.extend({
        init: function(options) {
            var marker = this;

            BoxElement.fn.init.call(marker, options);
        },

        options: {
            type: SQUARE,
            align: CENTER,
            vAlign: CENTER
        },

        getViewElements: function(view) {
            var marker = this,
                options = marker.options,
                type = options.type,
                box = marker.box,
                element = BoxElement.fn.getViewElements.call(marker, view)[0],
                halfWidth = box.width() / 2;

            if (type === TRIANGLE) {
                element = view.createPath([
                    [box.x1 + halfWidth, box.y1],
                    [box.x1, box.y2],
                    [box.x2, box.y2]
                ], element.options);
            } else if (type === CIRCLE) {
                element = view.createCircle([
                    box.x1 + halfWidth, box.y1 + box.height() / 2
                ], halfWidth, element.options);
            }

            return [ element ];
        }
    });

    var LinePoint = ChartElement.extend({
        init: function(value, options) {
            var point = this;

            point.value = value;

            ViewElement.fn.init.call(point, options);

            point.render();
        },

        options: {
            aboveAxis: true,
            isVertical: false,
            markers: {
                visible: true,
                background: BLACK,
                size: LINE_MARKER_SIZE,
                type: LINE_MARKER_SQUARE,
                border: {
                    width: 1
                },
                opacity: 1
            },
            labels: {
                visible: false,
                position: ABOVE
            }
        },

        render: function() {
            var point = this,
                options = point.options,
                markers = options.markers,
                labels = options.labels,
                children = point.children,
                markerBackground = markers.background,
                markerBorder = deepExtend({}, markers.border);

            if (typeof markerBorder.color === UNDEFINED) {
                markerBorder.color =
                    new Color(markerBackground).brightness(BAR_BORDER_BRIGHTNESS).toHex();
            }

            children.push(
                new ShapeElement({
                    visible: markers.visible,
                    type: markers.type,
                    width: markers.size,
                    height: markers.size,
                    background: markerBackground,
                    border: markerBorder,
                    opacity: markers.opacity
                })
            );

            children.push(
                new TextBox(point.value, deepExtend({
                    visible: labels.visible,
                    align: CENTER,
                    vAlign: CENTER,
                    margin: {
                        left: 5,
                        right: 5
                    }
                }, labels))
            );
        },

        markerBox: function() {
            return this.children[0].box;
        },

        reflow: function(targetBox) {
            var point = this,
                options = point.options,
                isVertical = options.isVertical,
                aboveAxis = options.aboveAxis,
                childBox;

            point.box = targetBox;
            childBox = targetBox.clone();

            if (isVertical) {
                if (aboveAxis) {
                    childBox.x1 += childBox.width();
                } else {
                    childBox.x2 -= childBox.width();
                }
            } else {
                if (aboveAxis) {
                    childBox.y1 -= childBox.height();
                } else {
                    childBox.y2 += childBox.height();
                }
            }

            var marker = point.children[0];
            marker.reflow(childBox);

            point.reflowLabel(childBox);
        },

        reflowLabel: function(box) {
            var point = this,
                options = point.options,
                marker = point.children[0],
                label = point.children[1],
                edge = options.labels.position;

            edge = edge === ABOVE ? TOP : edge;
            edge = edge === BELOW ? BOTTOM : edge;

            label.reflow(box);
            label.box.alignTo(marker.box, edge);
            label.reflow(label.box);
        }
    });

    var LineChart = BarChart.extend({
        init: function(plotArea, options) {
            var chart = this;
            chart.seriesPoints = [];
            chart.categoryPoints = [];

            BarChart.fn.init.call(chart, plotArea, options);
        },

        render: function() {
            var chart = this,
                options = chart.options,
                isStacked = options.isStacked,
                sums = [];

            chart.traverseDataPoints(function(value, categoryIx, series, seriesIx) {
                if(typeof value !== UNDEFINED) {
                    if (isStacked) {
                        sums[categoryIx] = sums[categoryIx] ? sums[categoryIx] + value : value;
                    } else {
                        chart._seriesMin = Math.min(chart._seriesMin, value);
                        chart._seriesMax = Math.max(chart._seriesMax, value);
                    }
                }

                chart.addValue(value, categoryIx, series, seriesIx);
            });

            if (isStacked) {
                chart._seriesMin = Math.min.apply(Math, sums);
                chart._seriesMax = Math.max.apply(Math, sums);
            }
        },

        addValue: function(value, categoryIx, series, seriesIx) {
            var chart = this,
                options = chart.options,
                children = chart.children,
                isStacked = options.isStacked,
                points = chart.seriesPoints[seriesIx],
                categoryPoints = chart.categoryPoints[categoryIx],
                stackPoint,
                stackValue = 0;

            if (!points) {
                chart.seriesPoints[seriesIx] = points = [];
            }

            if (typeof value === UNDEFINED || value === null) {
                if (isStacked || series.missingValues === ZERO) {
                    value = 0;
                } else {
                    chart._bars.push(null);
                    points.push(null);
                    return;
                }
            }

            var point = new LinePoint(value,
                deepExtend(
                    {
                        isVertical: !options.isVertical,
                        markers: {
                            background: series.color,
                            opacity: series.opacity
                        }
                    },
                    series
                )
            );

            if (isStacked) {
                if (!categoryPoints) {
                    chart.categoryPoints[categoryIx] = categoryPoints = [];
                }

                stackPoint = categoryPoints[categoryPoints.length - 1];
                if (stackPoint) {
                    stackValue = stackPoint.stackValue;
                }

                point.stackValue = value + stackValue;

                categoryPoints.push(point);
            }

            chart._bars.push(point);
            points.push(point);
            children.push(point);
        },

        getViewElements: function(view) {
            var chart = this,
                options = chart.options,
                elements = BarChart.fn.getViewElements.call(chart, view),
                series = options.series,
                currentSeries,
                seriesIx,
                seriesPoints = chart.seriesPoints,
                seriesCount = seriesPoints.length,
                currentSeriesPoints,
                pointIx,
                pointCount,
                point,
                linePoints,
                interpolate,
                lines = [];

            for (seriesIx = 0; seriesIx < seriesCount; seriesIx++) {
                currentSeriesPoints = seriesPoints[seriesIx];
                pointCount = currentSeriesPoints.length;
                currentSeries = series[seriesIx];
                linePoints = [];
                interpolate = currentSeries.missingValues === INTERPOLATE;

                for (pointIx = 0; pointIx < pointCount; pointIx++) {
                    point = currentSeriesPoints[pointIx];
                    if (point) {
                        linePoints.push(point.markerBox().center());
                    } else if (!interpolate) {
                        if (linePoints.length > 1) {
                            lines.push(chart.createLine(view, linePoints, currentSeries));
                        }
                        linePoints = [];
                    }
                }

                if (linePoints.length > 1) {
                    lines.push(chart.createLine(view, linePoints, currentSeries));
                }
            }

            return lines.concat(elements);
        },

        createLine: function(view, points, series) {
            return view.createPath(points, {
                stroke: series.color,
                strokeWidth: series.width,
                strokeOpacity: series.opacity,
                fill: ""
            });
        },

        reflowCategories: function(categorySlots) {
            var chart = this,
                isStacked = chart.options.isStacked,
                children = chart.children,
                childrenLength = children.length,
                currentChild,
                i;

            for (i = 0; i < childrenLength; i++) {
                currentChild = children[i];
                currentChild.reflow(currentChild.box);
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
                margin: {}
            },
            background: "",
            border: {
                color: BLACK,
                width: 0
            }
        },

        render: function() {
            var plotArea = this,
                options = plotArea.options,
                charts = plotArea.charts = [],
                range = { min: 0, max: 1 },
                categories = options.categoryAxis.categories,
                invertAxes = options.categoryAxis.orientation === VERTICAL,
                i,
                series = options.series,
                seriesLength = series.length,
                currentSeries,
                barSeries = [],
                lineSeries = [],
                barChart,
                lineChart,
                categoriesToAdd,
                firstSeries;

            for (i = 0; i < seriesLength; i++) {
                currentSeries = series[i];

                if (currentSeries.type === BAR || currentSeries.type === COLUMN) {
                    barSeries.push(currentSeries);
                } else if (currentSeries.type === LINE) {
                    lineSeries.push(currentSeries);
                }
            }

            if (barSeries.length > 0) {
                firstSeries = barSeries[0];
                invertAxes = firstSeries.type === BAR;
                barChart = new BarChart(this, {
                        series: barSeries,
                        isVertical: !invertAxes,
                        isStacked: firstSeries.stack,
                        gap: firstSeries.gap,
                        spacing: firstSeries.spacing
                    });

                categoriesToAdd = Math.max(0, barChart.categoriesCount() - categories.length);
                [].push.apply(options.categoryAxis.categories, new Array(categoriesToAdd));

                range = barChart.valueRange() || range;
                charts.push(barChart);
            }

            if (lineSeries.length > 0) {
                firstSeries = lineSeries[0];
                lineChart = new LineChart(this, {
                    // TODO: Rename isVertical to invertAxes, flip logic
                    isVertical: !invertAxes,
                    isStacked: firstSeries.stack,
                    series: lineSeries
                });

                categoriesToAdd = Math.max(0, lineChart.categoriesCount() - categories.length);
                [].push.apply(options.categoryAxis.categories, new Array(categoriesToAdd));

                var lineChartRange = lineChart.valueRange() || range;
                range.min = Math.min(range.min, lineChartRange.min);
                range.max = Math.max(range.max, lineChartRange.max);
                charts.push(lineChart);
            }

            [].push.apply(plotArea.children, charts);

            plotArea.createAxes(range.min, range.max, invertAxes);
        },

        createAxes: function(seriesMin, seriesMax, invertAxes) {
            var plotArea = this,
                options = plotArea.options,
                categoriesCount = options.categoryAxis.categories.length,
                categoryAxis = new CategoryAxis(deepExtend({
                        orientation: invertAxes ? VERTICAL : HORIZONTAL,
                        axisCrossingValue: invertAxes ? categoriesCount : 0
                    }, options.axisDefaults, options.categoryAxis)
                ),
                valueAxis = new NumericAxis(seriesMin, seriesMax, deepExtend({
                        orientation: invertAxes ? HORIZONTAL : VERTICAL
                    }, options.axisDefaults, options.valueAxis)
                );

            plotArea.axisX = invertAxes ? valueAxis : categoryAxis;
            plotArea.axisY = invertAxes ? categoryAxis : valueAxis;

            plotArea.children.push(plotArea.axisY);
            plotArea.children.push(plotArea.axisX);
        },

        reflow: function(targetBox) {
            var plotArea = this,
                charts = plotArea.charts,
                axisY = plotArea.axisY,
                axisX = plotArea.axisX,
                options = plotArea.options.plotArea,
                margin = getSpacing(options.margin);

            plotArea.box = targetBox.clone();
            plotArea.box.unpad(margin);
            axisY.reflow(plotArea.box);
            axisX.reflow(plotArea.box);

            plotArea.alignAxes();

            var axisBox = axisY.box.clone().wrap(axisX.box);

            var overflowY = axisBox.height() - plotArea.box.height();
            var overflowX = axisBox.width() - plotArea.box.width();

            var offsetX = plotArea.box.x1 - axisBox.x1;
            var offsetY = plotArea.box.y1 - axisBox.y1;

            axisY.reflow(
                axisY.box.translate(offsetX, offsetY).shrink(0, overflowY)
            );

            axisX.reflow(
                axisX.box.translate(offsetX, offsetY).shrink(overflowX, 0)
            );

            plotArea.alignAxes();

            for (var i = 0; i < charts.length; i++) {
                charts[i].reflow(plotArea.box);
            }
            var lineBoxX = axisX.getAxisLineBox(),
                lineBoxY = axisY.getAxisLineBox();

            plotArea.box = lineBoxX.clone().wrap(lineBoxY);
        },

        alignAxes: function() {
            var plotArea = this,
                axisY = plotArea.axisY,
                axisX = plotArea.axisX,
                crossingValueY = axisY.options.axisCrossingValue,
                axisCrossingY = axisY.getSlot(crossingValueY, crossingValueY),
                crossingValueX = axisX.options.axisCrossingValue,
                axisCrossingX = axisX.getSlot(crossingValueX, crossingValueX);

            axisY.reflow(
                axisY.box.translate(axisCrossingX.x1 - axisCrossingY.x1, 0)
            );

            axisX.reflow(
                axisX.box.translate(0, axisCrossingY.y1 - axisCrossingX.y1)
            );
        },

        renderGridLines: function(view, axis, secondaryAxis) {
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
                        return view.createLine(
                            lineStart, linePos, lineEnd, linePos,
                            {
                                strokeWidth: line.options.width,
                                stroke: line.options.color
                            });
                    } else {
                        return view.createLine(
                            linePos, lineStart, linePos, lineEnd,
                            {
                                strokeWidth: line.options.width,
                                stroke: line.options.color
                            });
                    }
                });
        },

        getViewElements: function(view) {
            var plotArea = this,
                options = plotArea.options.plotArea,
                axisY = plotArea.axisY,
                axisX = plotArea.axisX,
                gridLinesY = plotArea.renderGridLines(view, axisY, axisX),
                gridLinesX = plotArea.renderGridLines(view, axisX, axisY),
                childElements = ChartElement.fn.getViewElements.call(plotArea, view),
                border = options.border || {},
                elements = [
                    view.createRect(plotArea.box, {
                        fill: options.background,
                        zIndex: -1 }),
                    view.createRect(plotArea.box, {
                        stroke: border.width ? border.color : "",
                        strokeWidth: border.width,
                        fill: "",
                        zIndex: 0 })
                ];

            return [].concat(gridLinesY, gridLinesX, childElements, elements);
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
        },

        renderAttr: function (name, value) {
            return value ? name + "='" + value + "' " : "";
        }
    });

    var ViewBase = ViewElement.extend({
        init: function(options) {
            var view = this;

            ViewElement.fn.init.call(view, options);

            view.definitions = { };
            view.decorators = [ ];
        },

        renderDefinitions: function() {
            var view = this,
                definitions = view.definitions,
                definitionId,
                output = "";

            for (definitionId in definitions) {
                if (definitions.hasOwnProperty(definitionId)) {
                    output += definitions[definitionId].render();
                }
            }

            return output;
        },

        decorate: function(element) {
            var view = this,
                decorators = view.decorators,
                i,
                length = decorators.length;

            for (i = 0; i < length; i++) {
                element = decorators[i].decorate(element);
            }

            return element;
        }
    });

    var SVGView = ViewBase.extend({
        init: function(options) {
            var view = this;

            ViewBase.fn.init.call(view, options);

            view.decorators.push(
                new SVGOverlayDecorator(view),
                new SVGPaintDecorator(view)
            );

            view.template = SVGView.template;
            if (!view.template) {
                view.template = SVGView.template = template(
                    "<svg xmlns='http://www.w3.org/2000/svg' version='1.1' " +
                    "width='<#= d.options.width #>px' height='<#= d.options.height #>px' " +
                    "style='position: relative;'>" +
                    "<#= d.renderDefinitions() #>" +
                    "<#= d.renderContent() #></svg>"
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
                svgText = view.render();

            renderSVG(container, svgText);
            view.alignToScreen(container.firstChild);
        },

        renderDefinitions: function() {
            var view = this,
                output = ViewBase.fn.renderDefinitions.call(view);

            return output.length > 0 ? "<defs>" + output + "</defs>" : "";
        },

        createGroup: function(options) {
            return new SVGGroup(options);
        },

        createText: function(content, options) {
            return new SVGText(content, options);
        },

        createRect: function(box, style) {
            return this.decorate(
                new SVGPath([
                        [box.x1, box.y1], [box.x2, box.y1],
                        [box.x2, box.y2], [box.x1, box.y2], [box.x1, box.y1]
                    ],
                    style
                )
            );
        },

        createLine: function(x1, y1, x2, y2, options) {
            return new SVGPath([[x1, y1], [x2, y2]], options);
        },

        createPath: function(points, options) {
            return new SVGPath(points, options);
        },

        createCircle: function(center, radius, options) {
            return new SVGCircle(center, radius, options);
        },

        createGradient: function(options) {
            return new SVGLinearGradient(options);
        },

        alignToScreen: function(element) {
            if (element.getScreenCTM) {
                var ctm = element.getScreenCTM(),
                    left = - ctm.e % 1,
                    top = - ctm.f % 1,
                    style = element.style;

                if (left !== 0 || top !== 0) {
                    style.left = left + "px";
                    style.top = top + "px";
                }
            }
        }
    });


    var SVGGroup = ViewElement.extend({
        init: function(options) {
            var group = this;
            ViewElement.fn.init.call(group, options);

            group.template = SVGGroup.template;
            if (!group.template) {
                group.template = SVGGroup.template =
                    template("<g><#= d.renderContent() #></g>");
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
                    "<text x='<#= Math.round(d.options.x) #>' " +
                    "y='<#= Math.round(d.options.y + d.options.baseline) #>' " +
                    "style='font: <#= d.options.font #>' fill='<#= d.options.color #>'>" +
                    "<#= d.content #></text>"
                );
            }
        },

        options: {
            x: 0,
            y: 0,
            baseline: 0,
            font: SANS16
        }
    });

    var SVGPath = ViewElement.extend({
        init: function(points, options) {
            var path = this;
            ViewElement.fn.init.call(path, options);

            path.template = SVGPath.template;
            if (!path.template) {
                path.template = SVGPath.template = template(
                    "<path d='<#= d.renderPoints() #>' " +
                    "<#= d.renderStroke() #><#= d.renderStrokeWidth() #>" +
                    "stroke-linecap='square' " +
                    "fill-opacity='<#= d.options.fillOpacity #>' " +
                    "stroke-opacity='<#= d.options.strokeOpacity #>'  " +
                    "fill='<#= d.options.fill || \"none\" #>'></path>"
                );
            }

            path.points = points || [];
        },

        options: {
            fill: "",
            fillOpacity: 1,
            strokeOpacity: 1
        },

        clone: function() {
            var path = this;
            return new SVGPath(path.points, deepExtend({}, path.options));
        },

        renderPoints: function() {
            var path = this,
                points = this.points,
                count = points.length,
                strokeWidth = path.options.strokeWidth,
                shouldAlign = strokeWidth && strokeWidth % 2 !== 0,
                alignFunc = shouldAlign ? alignToPixel : Math.round,
                first = points[0],
                result = "M" + alignFunc(first[0]) + " " + alignFunc(first[1]);

            for (var i = 1; i < count; i++) {
                var p = points[i];
                result += " L" + alignFunc(p[0]) + " " + alignFunc(p[1]);
            }

            return result;
        },

        renderStrokeWidth: function () {
            var path = this,
                options = path.options;

            return options.strokeWidth > 0 ? "stroke-width='" + options.strokeWidth + "' " : "";
        },

        renderStroke: function () {
            var path = this,
                options = path.options;

            return options.stroke ? "stroke='" + options.stroke + "' " : "";
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
                    "<circle cx='<#= d.center[0] #>' cy='<#= d.center[1] #>' " +
                    "r='<#= d.radius #>' " +
                    "<#= d.renderAttr(\"stroke\", d.options.stroke) #> " +
                    "<#= d.renderAttr(\"stroke-width\", d.options.strokeWidth) #>" +
                    "fill='<#= d.options.fill || \"none\" #>'></circle>"
                );
            }
        },

        options: {
            fill: ""
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
                    "<linearGradient id='<#= d.options.id #>' " +
                    "gradientTransform='rotate(<#= d.options.rotation #>)'> " +
                    "<#= d.renderStops() #>" +
                    "</linearGradient>"
                );

                gradient.stopTemplate = SVGLinearGradient.stopTemplate = template(
                    "<stop offset='<#= Math.round(d.offset * 100) #>%' " +
                    "style='stop-color:<#= d.color #>;stop-opacity:<#= d.opacity #>' />");
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

    function SVGOverlayDecorator(view) {
        this.view = view;
    }

    SVGOverlayDecorator.prototype = {
        decorate: function(element) {
            var decorator = this,
                view = decorator.view,
                overlayName = element.options ? element.options.overlay : "",
                overlay = Chart.Overlays[overlayName];

            if (!overlay) {
                return element;
            }

            var fill = overlay.fill,
                fillRotation = element.options.normalAngle || 0,
                fillId = overlayName + fillRotation,
                group = view.createGroup(),
                overlayElement = element.clone();

            group.children.push(element, overlayElement);

            overlayElement.options.fill =
                deepExtend(fill, { id: fillId, rotation: fillRotation });

            return group;
        }
    }

    function SVGPaintDecorator(view) {
        this.view = view;
    }

    SVGPaintDecorator.prototype = {
        decorate: function(element) {
            var decorator = this,
                options = element.options;

            options.fill = decorator.getPaint(options.fill);

            // Recursively decorate all child elements, e.g. overlays
            for(var i = 0; i < element.children.length; i++) {
                decorator.decorate(element.children[i]);
            }

            return element;
        },

        getPaint: function(paint) {
            var decorator = this,
                view = decorator.view,
                definitions = view.definitions,
                gradient,
                gradientId;

            if (typeof paint === OBJECT) {
                gradientId = paint.id;
                gradient = definitions[gradientId];
                if (!gradient) {
                    gradient = view.createGradient(paint);
                    definitions[gradientId] = gradient;
                }

                return "url(#" + gradient.options.id + ")";
            } else {
                return paint;
            }
        }
    };

    var VMLView = ViewBase.extend({
        init: function(options) {
            var view = this;
            ViewBase.fn.init.call(view, options);

            view.decorators.push(
                new VMLOverlayDecorator(view),
                new VMLGradientDecorator(view)
            );

            view.template = VMLView.template;
            if (!view.template) {
                view.template = VMLView.template = template(
                    "<div style='width:<#= d.options.width #>px; " +
                    "height:<#= d.options.height #>px; " +
                    "position: relative;'>" +
                    "<#= d.renderContent() #></div>"
                );
            }
        },

        options: {
            width: DEFAULT_WIDTH,
            height: DEFAULT_HEIGHT
        },

        renderTo: function(container) {
            if (doc.namespaces) {
                doc.namespaces.add("kvml", "urn:schemas-microsoft-com:vml", "#default#VML");
            }

            container.innerHTML = this.render();
        },

        createText: function(content, options) {
            return new VMLText(content, options);
        },

        createRect: function(box, style) {
            return this.decorate(
                new VMLPath(
                    [[box.x1, box.y1], [box.x2, box.y1],
                    [box.x2, box.y2], [box.x1, box.y2], [box.x1, box.y1]],
                    style
                )
            );
        },

        createLine: function(x1, y1, x2, y2, options) {
            return new VMLPath([[x1, y1], [x2, y2]], options);
        },

        createPath: function(points, options) {
            return new VMLPath(points, options);
        },

        createCircle: function(center, radius, options) {
            return new VMLCircle(center, radius, options);
        },

        createGroup: function(options) {
            return new VMLGroup(options);
        },

        createGradient: function(options) {
            return new VMLLinearGradient(options);
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
                    "left: <#= d.options.x #>px; top: <#= d.options.y #>px; " +
                    "font: <#= d.options.font #>; color: <#= d.options.color #>'>" +
                    "<#= d.content #></kvml:textbox>"
                );
            }
        },

        options: {
            x: 0,
            y: 0,
            font: SANS16,
            color: BLACK
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
                    "coordorigin='0 0' coordsize='1 1'>" +
                        "<kvml:path v='<#= d.renderPoints() #> e' />" +
                        "<#= d.fill.render() + d.stroke.render() #>" +
                    "</kvml:shape>"
                );
            }

            path.points = points || [];
            path.stroke = new VMLStroke(path.options);
            path.fill = new VMLFill(path.options);
        },

        options: {
            fill: ""
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

    var VMLStroke = ViewElement.extend({
        init: function(options) {
            var stroke = this;
            ViewElement.fn.init.call(stroke, options);

            stroke.template = VMLStroke.template;
            if (!stroke.template) {
                stroke.template = VMLStroke.template = template(
                    "<kvml:stroke on='<#= !!d.options.stroke #>' " +
                    "<#= d.renderAttr(\"color\", d.options.stroke) #>" +
                    "<#= d.renderAttr(\"weight\", d.options.strokeWidth) #>" +
                    "<#= d.renderAttr(\"opacity\", d.options.strokeOpacity) #> />"
                );
            }
        }
    });

    var VMLFill = ViewElement.extend({
        init: function(options) {
            var stroke = this;
            ViewElement.fn.init.call(stroke, options);

            stroke.template = VMLFill.template;
            if (!stroke.template) {
                stroke.template = VMLFill.template = template(
                    "<kvml:fill on='<#= !!d.options.fill #>' " +
                    "<#= d.renderAttr(\"color\", d.options.fill) #>" +
                    "<#= d.renderAttr(\"weight\", d.options.fillWidth) #>" +
                    "<#= d.renderAttr(\"opacity\", d.options.fillOpacity) #> />"
                );
            }
        }
    });

    var VMLCircle = ViewElement.extend({
        init: function(center, radius, options) {
            var circle = this;
            ViewElement.fn.init.call(circle, options);

            circle.center = center;
            circle.radius = radius;

            circle.template = VMLCircle.template;
            if (!circle.template) {
                circle.template = VMLCircle.template = template(
                    "<kvml:oval style='position:absolute; " +
                            "width:<#= d.radius * 2 #>px; height:<#= d.radius * 2 #>px; " +
                            "top:<#= d.center[1] - d.radius #>px; " +
                            "left:<#= d.center[0] - d.radius #>px;' " +
                        "strokecolor='<#= d.options.stroke || '' #>' " +
                        "stroked='<#= !!d.options.stroke #>' " +
                        "strokeweight='<#= d.options.strokeWidth || '' #>' " +
                        "fillcolor='<#= d.options.fill #>' " +
                        "filled='<#= !!d.options.fill || d.children.length > 0 #>'>" +
                    "</kvml:oval>"
                );
            }
        },

        options: {
            fill: ""
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
                    "<#= d.renderContent() #></div>"
                );
            }
        }
    });

    var VMLLinearGradient = ViewElement.extend({
        init: function(options) {
            var gradient = this;
            ViewElement.fn.init.call(gradient, options);

            gradient.template = VMLLinearGradient.template;
            if (!gradient.template) {
                gradient.template = VMLLinearGradient.template = template(
                    "<kvml:fill type='gradient' angle='<#= d.options.rotation #>' " +
                    "colors='<#= d.renderColors() #>' opacity='<#= d.options.opacity #>' />"
                );
            }
        },

        options: {
            rotation: 0,
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
                round = Math.round;

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

    function VMLOverlayDecorator(view) {
        this.view = view;
    }

    VMLOverlayDecorator.prototype = {
        decorate: function(element) {
            var options = element.options,
                overlayName = options ? options.overlay : "",
                overlay = Chart.Overlays[overlayName];

            if (!overlay) {
                return element;
            }

            var fill = overlay.fill,
                fillRotation = 270 - options.normalAngle || 0,
                fillOpacity = options.fillOpacity;

            if (typeof fillOpacity === UNDEFINED) {
                fillOpacity = 1;
            }

            options.overlay = "";
            options.fill = deepExtend(
                { },
                blendGradient(options.fill, fill),
                { rotation: fillRotation,
                  opacity: fillOpacity }
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

            if (typeof fill === OBJECT) {
                element.fill = view.createGradient(fill);
            }

            return element;
        }
    };

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
                .appendTo(doc.body)[0];
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
                if (typeof propValue === OBJECT && propValue !== null && propValue.constructor !== Array) {
                    if (typeof(destination[property]) === OBJECT) {
                        destination[property] = destination[property] || {};
                    } else {
                        destination[property] = {};
                    }
                    deepExtend(destination[property], propValue);
                } else if (typeof propValue !== "undefined") {
                    destination[property] = propValue;
                }
            }
        }

        return destination;
    }

    // renderSVG ==============================================================
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

    var Color = function(value) {
        var color = this,
            formats = Color.formats,
            re,
            processor,
            parts,
            channels;

        if(arguments.length === 1) {
            value = color.resolveColor(value);

            for (i = 0; i < formats.length; i++) {
                re = formats[i].re;
                processor = formats[i].process;
                parts = re.exec(value);

                if (parts) {
                    channels = processor(parts);
                    color.r = channels[0];
                    color.g = channels[1];
                    color.b = channels[2];
                }
            }
        } else {
            color.r = arguments[0];
            color.g = arguments[1];
            color.b = arguments[2];
        }

        color.r = color.normalizeByte(color.r);
        color.g = color.normalizeByte(color.g);
        color.b = color.normalizeByte(color.b);
    };

    Color.prototype = {
        toHex: function() {
            var color = this,
                pad = color.padDigit,
                r = color.r.toString(16);
                g = color.g.toString(16);
                b = color.b.toString(16);

            return "#" + pad(r) + pad(g) + pad(b);
        },

        resolveColor: function(value) {
            value = value || BLACK;

            if (value.charAt(0) == "#") {
                value = value.substr(1, 6);
            }

            value = value.replace(/ /g, "");
            value = value.toLowerCase();
            value = Color.namedColors[value] || value;

            return value;
        },

        normalizeByte: function(value) {
            return (value < 0 || isNaN(value)) ? 0 : ((value > 255) ? 255 : value);
        },

        padDigit: function(value) {
            return (value.length === 1) ? "0" + value : value;
        },

        brightness: function(value) {
            var color = this,
                round = Math.round;

            color.r = round(color.normalizeByte(color.r * value));
            color.g = round(color.normalizeByte(color.g * value));
            color.b = round(color.normalizeByte(color.b * value));

            return color;
        }
    };

    Color.formats = [{
            re: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
            process: function(parts) {
                return [
                    parseInt(parts[1], 10), parseInt(parts[2], 10), parseInt(parts[3], 10)
                ];
            }
        }, {
            re: /^(\w{2})(\w{2})(\w{2})$/,
            process: function(parts) {
                return [
                    parseInt(parts[1], 16), parseInt(parts[2], 16), parseInt(parts[3], 16)
                ];
            }
        }, {
            re: /^(\w{1})(\w{1})(\w{1})$/,
            process: function(parts) {
                return [
                    parseInt(parts[1] + parts[1], 16),
                    parseInt(parts[2] + parts[2], 16),
                    parseInt(parts[3] + parts[3], 16)
                ];
            }
        }
    ];

    Color.namedColors = {
        aliceblue: "f0f8ff", antiquewhite: "faebd7", aqua: "00ffff",
        aquamarine: "7fffd4", azure: "f0ffff", beige: "f5f5dc",
        bisque: "ffe4c4", black: "000000", blanchedalmond: "ffebcd",
        blue: "0000ff", blueviolet: "8a2be2", brown: "a52a2a",
        burlywood: "deb887", cadetblue: "5f9ea0", chartreuse: "7fff00",
        chocolate: "d2691e", coral: "ff7f50", cornflowerblue: "6495ed",
        cornsilk: "fff8dc", crimson: "dc143c", cyan: "00ffff",
        darkblue: "00008b", darkcyan: "008b8b", darkgoldenrod: "b8860b",
        darkgray: "a9a9a9", darkgreen: "006400", darkkhaki: "bdb76b",
        darkmagenta: "8b008b", darkolivegreen: "556b2f", darkorange: "ff8c00",
        darkorchid: "9932cc", darkred: "8b0000", darksalmon: "e9967a",
        darkseagreen: "8fbc8f", darkslateblue: "483d8b", darkslategray: "2f4f4f",
        darkturquoise: "00ced1", darkviolet: "9400d3", deeppink: "ff1493",
        deepskyblue: "00bfff", dimgray: "696969", dodgerblue: "1e90ff",
        feldspar: "d19275", firebrick: "b22222", floralwhite: "fffaf0",
        forestgreen: "228b22", fuchsia: "ff00ff", gainsboro: "dcdcdc",
        ghostwhite: "f8f8ff", gold: "ffd700", goldenrod: "daa520",
        gray: "808080", green: "008000", greenyellow: "adff2f",
        honeydew: "f0fff0", hotpink: "ff69b4", indianred: "cd5c5c",
        indigo: "4b0082", ivory: "fffff0", khaki: "f0e68c",
        lavender: "e6e6fa", lavenderblush: "fff0f5", lawngreen: "7cfc00",
        lemonchiffon: "fffacd", lightblue: "add8e6", lightcoral: "f08080",
        lightcyan: "e0ffff", lightgoldenrodyellow: "fafad2", lightgrey: "d3d3d3",
        lightgreen: "90ee90", lightpink: "ffb6c1", lightsalmon: "ffa07a",
        lightseagreen: "20b2aa", lightskyblue: "87cefa", lightslateblue: "8470ff",
        lightslategray: "778899", lightsteelblue: "b0c4de", lightyellow: "ffffe0",
        lime: "00ff00", limegreen: "32cd32", linen: "faf0e6",
        magenta: "ff00ff", maroon: "800000", mediumaquamarine: "66cdaa",
        mediumblue: "0000cd", mediumorchid: "ba55d3", mediumpurple: "9370d8",
        mediumseagreen: "3cb371", mediumslateblue: "7b68ee", mediumspringgreen: "00fa9a",
        mediumturquoise: "48d1cc", mediumvioletred: "c71585", midnightblue: "191970",
        mintcream: "f5fffa", mistyrose: "ffe4e1", moccasin: "ffe4b5",
        navajowhite: "ffdead", navy: "000080", oldlace: "fdf5e6",
        olive: "808000", olivedrab: "6b8e23", orange: "ffa500",
        orangered: "ff4500", orchid: "da70d6", palegoldenrod: "eee8aa",
        palegreen: "98fb98", paleturquoise: "afeeee", palevioletred: "d87093",
        papayawhip: "ffefd5", peachpuff: "ffdab9", peru: "cd853f",
        pink: "ffc0cb", plum: "dda0dd", powderblue: "b0e0e6",
        purple: "800080", red: "ff0000", rosybrown: "bc8f8f",
        royalblue: "4169e1", saddlebrown: "8b4513", salmon: "fa8072",
        sandybrown: "f4a460", seagreen: "2e8b57", seashell: "fff5ee",
        sienna: "a0522d", silver: "c0c0c0", skyblue: "87ceeb",
        slateblue: "6a5acd", slategray: "708090", snow: "fffafa",
        springgreen: "00ff7f", steelblue: "4682b4", tan: "d2b48c",
        teal: "008080", thistle: "d8bfd8", tomato: "ff6347",
        turquoise: "40e0d0", violet: "ee82ee", violetred: "d02090",
        wheat: "f5deb3", white: "ffffff", whitesmoke: "f5f5f5",
        yellow: "ffff00", yellowgreen: "9acd32"
    };

    function blendColors(base, overlay, alpha) {
        var baseColor = new Color(base),
            overlayColor = new Color(overlay),
            r = blendChannel(baseColor.r, overlayColor.r, alpha),
            g = blendChannel(baseColor.g, overlayColor.g, alpha),
            b = blendChannel(baseColor.b, overlayColor.b, alpha);

        return new Color(r, g, b).toHex();
    }

    function blendChannel(a, b, alpha) {
        return Math.round(alpha * b + (1 - alpha) * a);
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

    Chart.Overlays = {
        glass: {
            fill: {
                type: "linear",
                rotation: 0,
                stops: [{
                    offset: 0,
                    color: WHITE,
                    opacity: 0
                }, {
                    offset: 0.1,
                    color: WHITE,
                    opacity: 0
                }, {
                    offset: 0.25,
                    color: WHITE,
                    opacity: 0.4
                }, {
                    offset: 0.92,
                    color: WHITE,
                    opacity: 0
                }, {
                    offset: 1,
                    color: WHITE,
                    opacity: 0
                }]
            }
        }
    };

    function template(definition) {
        return baseTemplate(definition, { useWithBlock: false, paramName: "d" });
    }

    // Exports ================================================================

    kendo.ui.plugin("Chart", Chart);

    Chart.Box2D = Box2D;
    Chart.Text = Text;
    Chart.BarLabel = BarLabel;
    Chart.ChartElement = ChartElement;
    Chart.RootElement = RootElement;
    Chart.BoxElement = BoxElement;
    Chart.TextBox = TextBox;
    Chart.NumericAxis = NumericAxis;
    Chart.CategoryAxis = CategoryAxis;
    Chart.Bar = Bar;
    Chart.BarChart = BarChart;
    Chart.ShapeElement = ShapeElement;
    Chart.LinePoint = LinePoint;
    Chart.LineChart = LineChart;
    Chart.ClusterLayout = ClusterLayout;
    Chart.StackLayout = StackLayout;
    Chart.Title = Title;
    Chart.Legend = Legend;
    Chart.PlotArea = PlotArea;
    Chart.ViewElement = ViewElement;
    Chart.SVGView = SVGView;
    Chart.SVGGroup = SVGGroup;
    Chart.SVGText = SVGText;
    Chart.SVGPath = SVGPath;
    Chart.SVGCircle = SVGCircle;
    Chart.SVGOverlayDecorator = SVGOverlayDecorator;
    Chart.SVGPaintDecorator = SVGPaintDecorator;
    Chart.VMLView = VMLView;
    Chart.VMLText = VMLText;
    Chart.VMLPath = VMLPath;
    Chart.VMLCircle = VMLCircle;
    Chart.VMLGroup = VMLGroup;
    Chart.VMLOverlayDecorator = VMLOverlayDecorator;
    Chart.VMLLinearGradient = VMLLinearGradient;
    Chart.VMLStroke = VMLStroke;
    Chart.VMLFill = VMLFill;
    Chart.deepExtend = deepExtend;
    Chart.Color = Color;
    Chart.blendColors = blendColors;
    Chart.blendGradient = blendGradient;

})();

