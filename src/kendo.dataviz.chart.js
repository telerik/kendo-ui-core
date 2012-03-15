(function ($, undefined) {

    // Imports ================================================================
    var each = $.each,
        grep = $.grep,
        map = $.map,
        math = Math,
        noop = $.noop,
        extend = $.extend,
        proxy = $.proxy,
        doc = document,

        kendo = window.kendo,
        Class = kendo.Class,
        DataSource = kendo.data.DataSource,
        Widget = kendo.ui.Widget,
        template = kendo.template,
        deepExtend = kendo.deepExtend,
        format = kendo.format,
        getter = kendo.getter,

        dataviz = kendo.dataviz,
        Axis = dataviz.Axis,
        Box2D = dataviz.Box2D,
        BoxElement = dataviz.BoxElement,
        ChartElement = dataviz.ChartElement,
        Color = dataviz.Color,
        ElementAnimation = dataviz.ElementAnimation,
        NumericAxis = dataviz.NumericAxis,
        Point2D = dataviz.Point2D,
        RootElement = dataviz.RootElement,
        Sector = dataviz.Sector,
        Text = dataviz.Text,
        TextBox = dataviz.TextBox,
        Title = dataviz.Title,
        ViewElement = dataviz.ViewElement,
        animationDecorator = dataviz.animationDecorator,
        append = dataviz.append,
        defined = dataviz.defined,
        getSpacing = dataviz.getSpacing,
        inArray = dataviz.inArray,
        interpolateValue = dataviz.interpolateValue,
        last = dataviz.last,
        round = dataviz.round,
        renderTemplate = dataviz.renderTemplate,
        uniqueId = dataviz.uniqueId;

    var CSS_PREFIX = "k-";

    // Constants ==============================================================
    var ABOVE = "above",
        AREA = "area",
        BAR = "bar",
        BAR_BORDER_BRIGHTNESS = 0.8,
        BAR_GAP = 1.5,
        BAR_SPACING = 0.4,
        BELOW = "below",
        BLACK = "#000",
        BOTTOM = "bottom",
        CENTER = "center",
        CHANGE = "change",
        CIRCLE = "circle",
        CLICK = "click",
        CLIP = "clip",
        COLUMN = "column",
        COORD_PRECISION = dataviz.COORD_PRECISION,
        DATABOUND = "dataBound",
        DEFAULT_FONT = dataviz.DEFAULT_FONT,
        DEFAULT_HEIGHT = dataviz.DEFAULT_HEIGHT,
        DEFAULT_PRECISION = dataviz.DEFAULT_PRECISION,
        DEFAULT_WIDTH = dataviz.DEFAULT_WIDTH,
        FADEIN = "fadeIn",
        GLASS = "glass",
        INITIAL_ANIMATION_DURATION = dataviz.INITIAL_ANIMATION_DURATION,
        INSIDE_BASE = "insideBase",
        INSIDE_END = "insideEnd",
        INTERPOLATE = "interpolate",
        LEFT = "left",
        LINE = "line",
        LINE_MARKER_SIZE = 8,
        LINEAR = "linear",
        MAX_VALUE = Number.MAX_VALUE,
        MIN_VALUE = -Number.MAX_VALUE,
        MOUSEMOVE_TRACKING = "mousemove.tracking",
        MOUSEOVER = "mouseover",
        ON_MINOR_TICKS = "onMinorTicks",
        OUTSIDE_END = "outsideEnd",
        OUTLINE_SUFFIX = "_outline",
        PIE = "pie",
        PIE_SECTOR_ANIM_DELAY = 70,
        PRIMARY = "primary",
        RIGHT = "right",
        ROUNDED_BEVEL = "roundedBevel",
        SCATTER = "scatter",
        SCATTER_LINE = "scatterLine",
        SERIES_CLICK = "seriesClick",
        STRING = "string",
        SQUARE = "square",
        SWING = "swing",
        TOP = "top",
        TOOLTIP_ANIMATION_DURATION = 150,
        TOOLTIP_OFFSET = 5,
        TOOLTIP_SHOW_DELAY = 100,
        TRIANGLE = "triangle",
        VERTICAL_LINE = "verticalLine",
        VERTICAL_AREA = "verticalArea",
        WHITE = "#fff",
        X = "x",
        Y = "y",
        ZERO = "zero";

    var CATEGORICAL_CHARTS = [BAR, COLUMN, LINE, VERTICAL_LINE, AREA, VERTICAL_AREA],
        XY_CHARTS = [SCATTER, SCATTER_LINE];

    // Chart ==================================================================
    var Chart = Widget.extend({
        init: function(element, userOptions) {
            var chart = this,
                options,
                themeOptions,
                themes = dataviz.ui.themes.chart || {},
                dataSourceOptions = (userOptions || {}).dataSource,
                themeName;

            Widget.fn.init.call(chart, element);
            options = deepExtend({}, chart.options, userOptions);

            themeName = options.theme;
            themeOptions = themeName ? themes[themeName] || themes[themeName.toLowerCase()] : {};

            applyDefaults(options, themeOptions);

            chart.options = deepExtend({}, themeOptions, options);

            applySeriesColors(chart.options);

            chart.bind(chart.events, chart.options);

            chart.element.addClass("k-chart");

            chart.wrapper = chart.element;

            chart._dataChangeHandler = proxy(chart._onDataChanged, chart);

            chart.dataSource = DataSource
                .create(dataSourceOptions)
                .bind(CHANGE, chart._dataChangeHandler);

            if (dataSourceOptions && options.autoBind) {
                chart.dataSource.fetch();
            }

            chart._redraw();
            chart._attachEvents();

            kendo.notify(chart, dataviz.ui);
        },

        setDataSource: function(dataSource) {
            var chart = this;

            if (chart.dataSource) {
                chart.dataSource.unbind(CHANGE, chart._dataChangeHandler);
            }

            chart.dataSource = dataSource;

            dataSource.bind(CHANGE, chart._dataChangeHandler);

            dataSource.fetch();
        },

        events:[
            DATABOUND,
            SERIES_CLICK
        ],

        items: function() {
            return $();
        },

        options: {
            name: "Chart",
            theme: "default",
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
            autoBind: true,
            seriesDefaults: {
                type: COLUMN,
                data: [],
                groupNameTemplate: "#= group.value + (kendo.dataviz.defined(series.name) ? ': ' + series.name : '') #",
                bar: {
                    gap: BAR_GAP,
                    spacing: BAR_SPACING
                },
                column: {
                    gap: BAR_GAP,
                    spacing: BAR_SPACING
                },
                line: {
                    width: 4
                },
                labels: {}
            },
            series: [],
            tooltip: {
                visible: false
            },
            transitions: true
        },

        refresh: function() {
            var chart = this;

            applyDefaults(chart.options);

            if (chart.dataSource) {
                chart.dataSource.read();
            } else {
                chart._redraw();
            }
        },

        redraw: function() {
            var chart = this;

            applyDefaults(chart.options);

            chart._redraw();
        },

        _redraw: function() {
            var chart = this,
                options = chart.options,
                element = chart.element,
                model = chart._model = chart._getModel(),
                plotArea = chart._plotArea = model._plotArea,
                viewType = dataviz.ui.defaultView(),
                view = chart._view = viewType.fromModel(model);

            element.css("position", "relative");
            chart._viewElement = view.renderTo(element[0]);
            chart._tooltip = new Tooltip(element, options.tooltip);
            chart._highlight = new Highlight(view, chart._viewElement);
        },

        svg: function() {
            var model = this._getModel(),
                view = dataviz.SVGView.fromModel(model);

            return view.render();
        },

        _getModel: function() {
            var chart = this,
                options = chart.options,
                element = chart.element,
                model = new RootElement(deepExtend({
                    width: element.width() || DEFAULT_WIDTH,
                    height: element.height() || DEFAULT_HEIGHT,
                    transitions: options.transitions
                    }, options.chartArea)),
                plotArea;

            if (options.title && options.title.visible && options.title.text) {
                model.append(new Title(options.title));
            }

            plotArea = model._plotArea = chart._createPlotArea();
            if (options.legend.visible) {
                model.append(new Legend(plotArea.options.legend));
            }
            model.append(plotArea);
            model.reflow();

            return model;
        },

        _createPlotArea: function() {
            var chart = this,
                options = chart.options,
                series = options.series,
                i,
                length = series.length,
                currentSeries,
                categoricalSeries = [],
                xySeries = [],
                pieSeries = [],
                plotArea;

            for (i = 0; i < length; i++) {
                currentSeries = series[i];

                if (inArray(currentSeries.type, CATEGORICAL_CHARTS)) {
                    categoricalSeries.push(currentSeries);
                } else if (inArray(currentSeries.type, XY_CHARTS)) {
                    xySeries.push(currentSeries);
                } else if (currentSeries.type === PIE) {
                    pieSeries.push(currentSeries);
                }
            }

            if (pieSeries.length > 0) {
                plotArea = new PiePlotArea(pieSeries, options);
            } else if (xySeries.length > 0) {
                plotArea = new XYPlotArea(xySeries, options);
            } else {
                plotArea = new CategoricalPlotArea(categoricalSeries, options);
            }

            return plotArea;
        },

        _attachEvents: function() {
            var chart = this,
                element = chart.element;

            element.bind(CLICK, proxy(chart._click, chart));
            element.bind(MOUSEOVER, proxy(chart._mouseOver, chart));
        },

        _getPoint: function(e) {
            var chart = this,
                model = chart._model,
                coords = chart._eventCoordinates(e),
                targetId = e.target.id,
                chartElement = model.idMap[targetId],
                metadata = model.idMapMetadata[targetId],
                point;

            if (chartElement) {
                if (chartElement.getNearestPoint && metadata) {
                    point = chartElement.getNearestPoint(coords.x, coords.y, metadata.seriesIx);
                } else {
                    point = chartElement;
                }
            }

            return point;
        },

        _eventCoordinates: function(e) {
            var element = this.element,
                offset = element.offset(),
                paddingLeft = parseInt(element.css("paddingLeft"), 10),
                paddingTop = parseInt(element.css("paddingTop"), 10),
                win = $(window);

            return {
                x: e.clientX - offset.left - paddingLeft + win.scrollLeft(),
                y: e.clientY - offset.top - paddingTop + win.scrollTop()
            };
        },

        _click: function(e) {
            var chart = this,
                point = chart._getPoint(e);

            if (point) {
                chart.trigger(SERIES_CLICK, {
                    value: point.value,
                    category: point.category,
                    series: point.series,
                    dataItem: point.dataItem,
                    element: $(e.target)
                });
            }
        },

        _mouseOver: function(e) {
            var chart = this,
                tooltip = chart._tooltip,
                highlight = chart._highlight,
                tooltipOptions,
                point;

            if (!highlight || highlight.element === e.target) {
                return;
            }

            point = chart._getPoint(e);
            if (point) {
                chart._activePoint = point;
                tooltipOptions = deepExtend({}, chart.options.tooltip, point.options.tooltip);
                if (tooltipOptions.visible) {
                    tooltip.show(point);
                }

                highlight.show(point);

                $(doc.body).bind(MOUSEMOVE_TRACKING, proxy(chart._mouseMove, chart));
            }
        },

        _mouseMove: function(e) {
            var chart = this,
                tooltip = chart._tooltip,
                highlight = chart._highlight,
                coords = chart._eventCoordinates(e),
                point = chart._activePoint,
                tooltipOptions,
                owner,
                seriesPoint;

            if (chart._plotArea.box.containsPoint(coords.x, coords.y)) {
                if (point && (point.series.type === LINE || point.series.type === AREA)) {
                    owner = point.owner;
                    seriesPoint = owner.getNearestPoint(coords.x, coords.y, point.seriesIx);
                    if (seriesPoint && seriesPoint != point) {
                        chart._activePoint = seriesPoint;

                        tooltipOptions = deepExtend({}, chart.options.tooltip, point.options.tooltip);
                        if (tooltipOptions.visible) {
                            tooltip.show(seriesPoint);
                        }
                        highlight.show(seriesPoint);
                    }
                }
            } else {
                $(doc.body).unbind(MOUSEMOVE_TRACKING);

                delete chart._activePoint;
                tooltip.hide();
                highlight.hide();
            }
        },

        _onDataChanged: function() {
            var chart = this,
                options = chart.options,
                series = chart._sourceSeries || options.series,
                seriesIx,
                seriesLength = series.length,
                data = chart.dataSource.view(),
                grouped = (chart.dataSource.group() || []).length > 0,
                processedSeries = [],
                currentSeries;

            for (seriesIx = 0; seriesIx < seriesLength; seriesIx++) {
                currentSeries = series[seriesIx];

                if (currentSeries.field || (currentSeries.xField && currentSeries.yField)) {
                    currentSeries.data = [];
                    currentSeries.dataItems = data;

                    [].push.apply(processedSeries, grouped ?
                        chart._createGroupedSeries(currentSeries, data) :
                        [ currentSeries ]
                    );
                } else {
                    processedSeries.push(currentSeries);
                }
            }

            chart._sourceSeries = series;
            options.series = processedSeries;

            applySeriesColors(chart.options);

            chart._bindSeries();
            chart._bindCategories(grouped ? data[0].items : data);

            chart.trigger(DATABOUND);
            chart._redraw();
        },

        _createGroupedSeries: function(series, data) {
            var groupSeries = [],
                nameTemplate,
                group,
                groupIx,
                dataLength = data.length,
                seriesClone;

            if (series.groupNameTemplate) {
                nameTemplate = template(series.groupNameTemplate);
            }

            for (groupIx = 0; groupIx < dataLength; groupIx++) {
                seriesClone = deepExtend({}, series);
                seriesClone.color = undefined;
                groupSeries.push(seriesClone);

                group = data[groupIx];
                seriesClone.dataItems = group.items;

                if (nameTemplate) {
                    seriesClone.name = nameTemplate({
                        series: seriesClone, group: group
                    });
                }
            }

            return groupSeries;
        },

        _bindSeries: function() {
            var chart = this,
                series = chart.options.series,
                seriesLength = series.length,
                seriesIx,
                currentSeries,
                data,
                dataIx,
                dataLength,
                row,
                value;

            for (seriesIx = 0; seriesIx < seriesLength; seriesIx++) {
                currentSeries = series[seriesIx];
                data = currentSeries.dataItems || [];
                dataLength = data.length;

                for (dataIx = 0; dataIx < dataLength; dataIx++) {
                    row = data[dataIx];

                    if (currentSeries.field) {
                        value = getField(currentSeries.field, row);
                    } else if (currentSeries.xField && currentSeries.yField) {
                        value = [getField(currentSeries.xField, row),
                                 getField(currentSeries.yField, row)];
                    } else {
                        value = undefined;
                    }

                    if (defined(value)) {
                        if (dataIx === 0) {
                            currentSeries.data = [value];
                            currentSeries.dataItems = [row];
                        } else {
                            currentSeries.data.push(value);
                            currentSeries.dataItems.push(row);
                        }
                    }
                }
            }
        },

        _bindCategories: function(categoriesData) {
            var categoryAxis = this.options.categoryAxis,
                i,
                category,
                length = categoriesData.length;

            if (categoryAxis.field) {
                for (i = 0; i < length; i++) {
                    category = getField(categoryAxis.field, categoriesData[i]);
                    if (i === 0) {
                        categoryAxis.categories = [category];
                    } else {
                        categoryAxis.categories.push(category);
                    }
                }
            }
        }
    });


    var BarLabel = ChartElement.extend({
        init: function(content, options) {
            var barLabel = this;
            ChartElement.fn.init.call(barLabel, options);

            barLabel.append(new TextBox(content, barLabel.options));
        },

        options: {
            position: OUTSIDE_END,
            margin: getSpacing(3),
            padding: getSpacing(4),
            color: BLACK,
            background: "",
            border: {
                width: 1,
                color: ""
            },
            aboveAxis: true,
            vertical: false,
            animation: {
                type: FADEIN,
                delay: INITIAL_ANIMATION_DURATION
            },
            zIndex: 1
        },

        reflow: function(targetBox) {
            var barLabel = this,
                options = barLabel.options,
                vertical = options.vertical,
                aboveAxis = options.aboveAxis,
                text = barLabel.children[0],
                box = text.box,
                padding = text.options.padding;

            text.options.align = vertical ? CENTER : LEFT;
            text.options.vAlign = vertical ? TOP : CENTER;

            if (options.position == INSIDE_END) {
                if (vertical) {
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
            } else if (options.position == INSIDE_BASE) {
                if (vertical) {
                    text.options.vAlign = aboveAxis ? BOTTOM : TOP;
                } else {
                    text.options.align = aboveAxis ? LEFT : RIGHT;
                }
            } else if (options.position == OUTSIDE_END) {
                if (vertical) {
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

            if (vertical) {
                padding.left = padding.right =
                    (targetBox.width() - text.contentBox.width()) / 2;
            } else {
                padding.top = padding.bottom =
                    (targetBox.height() - text.contentBox.height()) / 2;
            }

            text.reflow(targetBox);
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
            items: [],
            labels: {},
            offsetX: 0,
            offsetY: 0,
            margin: getSpacing(10),
            padding: getSpacing(5),
            border: {
                color: BLACK,
                width: 0
            },
            background: "",
            zIndex: 1
        },

        createLabels: function() {
            var legend = this,
                items = legend.options.items,
                count = items.length,
                label,
                name,
                i;

            for (i = 0; i < count; i++) {
                name = items[i].name;
                    label = new Text(name, legend.options.labels);

                legend.append(label);
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
                items = options.items,
                count = items.length,
                markerSize = legend.markerSize(),
                group = view.createGroup({ zIndex: options.zIndex }),
                border = options.border || {},
                padding,
                markerBox,
                labelBox,
                color,
                label,
                box,
                i;

            append(group.children, ChartElement.fn.getViewElements.call(legend, view));

            for (i = 0; i < count; i++) {
                color = items[i].color;
                label = children[i];
                markerBox = new Box2D();
                box = label.box;

                labelBox = labelBox ? labelBox.wrap(box) : box.clone();

                markerBox.x1 = box.x1 - markerSize * 2;
                markerBox.x2 = markerBox.x1 + markerSize;

                if (options.position == TOP || options.position == BOTTOM) {
                    markerBox.y1 = box.y1 + markerSize / 2;
                } else {
                    markerBox.y1 = box.y1 + (box.height() - markerSize) / 2;
                }

                markerBox.y2 = markerBox.y1 + markerSize;

                group.children.push(view.createRect(markerBox, { fill: color, stroke: color }));
            }

            if (children.length > 0) {
                padding = getSpacing(options.padding);
                padding.left += markerSize * 2;
                labelBox.pad(padding);
                group.children.unshift(view.createRect(labelBox, {
                    stroke: border.width ? border.color : "",
                    strokeWidth: border.width,
                    dashType: border.dashType,
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
                markerSpace = legend.markerSize() * 2,
                label,
                i;

            // Position labels below each other
            for (i = 1; i < childrenCount; i++) {
                label = legend.children[i];
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
            labelBox.x1 = math.max(targetBox.x1, labelBox.x1);
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
                box = children[0].box.clone(),
                markerWidth = legend.markerSize() * 3,
                offsetX,
                offsetY,
                margin = getSpacing(options.margin),
                boxWidth = children[0].box.width() + markerWidth,
                plotAreaWidth = targetBox.width(),
                label,
                labelY = 0,
                i;

            // Position labels next to each other
            for (i = 1; i < childrenCount; i++) {
                label = children[i];

                boxWidth += label.box.width() + markerWidth;
                if (boxWidth > plotAreaWidth - markerWidth) {
                    label.box = new Box2D(box.x1, box.y2,
                        box.x1 + label.box.width(), box.y2 + label.box.height());
                    boxWidth = label.box.width() + markerWidth;
                    labelY = label.box.y1;
                } else {
                    label.box.alignTo(children[i - 1].box, RIGHT);
                    label.box.y2 = labelY + label.box.height();
                    label.box.y1 = labelY;
                    label.box.translate(markerWidth, 0);
                }
                box.wrap(label.box);
            }

            offsetX = (targetBox.width() - box.width() + markerWidth) / 2;
            if (options.position === TOP) {
                offsetY = targetBox.y1 + margin.top;
                box.y2 = targetBox.y1 + box.height() + margin.top + margin.bottom;
                box.y1 = targetBox.y1;
            } else {
                offsetY = targetBox.y2 - box.height() - margin.bottom;
                box.y1 = targetBox.y2 - box.height() - margin.top - margin.bottom;
                box.y2 = targetBox.y2;
            }

            legend.translateChildren(offsetX + options.offsetX,
                    offsetY + options.offsetY);

            box.x1 = targetBox.x1;
            box.x2 = targetBox.x2;

            legend.box = box;
        },

        customLayout: function (targetBox) {
            var legend = this,
                options = legend.options,
                children = legend.children,
                childrenCount = children.length,
                labelBox = children[0].box.clone(),
                markerWidth = legend.markerSize() * 2,
                i;

            // Position labels next to each other
            for (i = 1; i < childrenCount; i++) {
                labelBox = legend.children[i].box;
                labelBox.alignTo(legend.children[i - 1].box, BOTTOM);
                labelBox.wrap(labelBox);
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

    var CategoryAxis = Axis.extend({
        options: {
            categories: [],
            vertical: false,
            majorGridLines: {
                visible: false,
                width: 1,
                color: BLACK
            },
            zIndex: 1
        },

        range: function() {
            return { min: 0, max: this.options.categories.length };
        },

        reflow: function(targetBox) {
            this.reflowAxis(targetBox, ON_MINOR_TICKS);
        },

        getViewElements: function(view) {
            var axis = this,
                options = axis.options,
                line = options.line,
                lineBox = axis.lineBox(),
                childElements = ChartElement.fn.getViewElements.call(axis, view),
                lineOptions;

            if (line.width > 0 && line.visible) {
                lineOptions = {
                    strokeWidth: line.width,
                    stroke: line.color,
                    dashType: line.dashType,
                    zIndex: line.zIndex
                };

                childElements.push(view.createLine(
                    lineBox.x1, lineBox.y1, lineBox.x2, lineBox.y2,
                    lineOptions));

                append(childElements, axis.renderTicks(view));
                append(childElements, axis.renderPlotBands(view));
            }

            return childElements;
        },

        getTickPositions: function(itemsCount) {
            var axis = this,
                options = axis.options,
                vertical = options.vertical,
                size = vertical ? axis.box.height() : axis.box.width(),
                step = size / itemsCount,
                pos = vertical ? axis.box.y1 : axis.box.x1,
                positions = [],
                i;

            for (i = 0; i < itemsCount; i++) {
                positions.push(round(pos, COORD_PRECISION));
                pos += step;
            }

            positions.push(vertical ? axis.box.y2 : axis.box.x2);

            return options.reverse ? positions.reverse() : positions;
        },

        getMajorTickPositions: function() {
            var axis = this;

            return axis.getTickPositions(axis.options.categories.length);
        },

        getMinorTickPositions: function() {
            var axis = this;

            return axis.getTickPositions(axis.options.categories.length * 2);
        },

        getSlot: function(from, to) {
            var axis = this,
                options = axis.options,
                reverse = options.reverse,
                vertical = options.vertical,
                lineBox = axis.lineBox(),
                size = vertical ? lineBox.height() : lineBox.width(),
                categoriesLength = math.max(1, options.categories.length),
                from = math.min(math.max(0, from), categoriesLength),
                to = defined(to) ? to : from,
                to = math.max(math.min(categoriesLength, to), from),
                valueAxis = vertical ? Y : X,
                lineStart = lineBox[valueAxis + (reverse ? 2 : 1)],
                step = (reverse ? -1 : 1) * (size / categoriesLength),
                p1 = lineStart + (from * step),
                p2 = p1 + step,
                slotSize = to - from,
                slotBox = new Box2D(lineBox.x1, lineBox.y1, lineBox.x1, lineBox.y1);

            if (slotSize > 0 || (from == to && categoriesLength == from)) {
                p2 = p1 + (slotSize * step);
            }

            slotBox[valueAxis + 1] = reverse ? p2 : p1;
            slotBox[valueAxis + 2] = reverse ? p1 : p2;

            return slotBox;
        },

        getLabelsCount: function() {
            return this.options.categories.length;
        },

        getLabelText: function(index) {
            var options = this.options;
            return defined(options.categories[index]) ? options.categories[index] : "";
        }
    });

    var ClusterLayout = ChartElement.extend({
        init: function(options) {
            var cluster = this;
            ChartElement.fn.init.call(cluster, options);
        },

        options: {
            vertical: false,
            gap: 0,
            spacing: 0
        },

        reflow: function(box) {
            var cluster = this,
                options = cluster.options,
                vertical = options.vertical,
                axis = vertical ? Y : X,
                children = cluster.children,
                gap = options.gap,
                spacing = options.spacing,
                count = children.length,
                slots = count + gap + (spacing * (count - 1)),
                slotSize = (vertical ? box.height() : box.width()) / slots,
                position = box[axis + 1] + slotSize * (gap / 2),
                childBox,
                i;

            for (i = 0; i < count; i++) {
                childBox = (children[i].box || box).clone();

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
            vertical: true,
            isReversed: false
        },

        reflow: function(targetBox) {
            var stack = this,
                options = stack.options,
                vertical = options.vertical,
                positionAxis = vertical ? X : Y,
                stackAxis = vertical ? Y : X,
                stackBase = targetBox[stackAxis + 2],
                children = stack.children,
                box = stack.box = new Box2D(),
                childrenCount = children.length,
                stackDirection,
                i;

            if (options.isReversed) {
                stackDirection = vertical ? BOTTOM : LEFT;
            } else {
                stackDirection = vertical ? TOP : RIGHT;
            }

            for (i = 0; i < childrenCount; i++) {
                var currentChild = children[i],
                    childBox = currentChild.box.clone();

                childBox.snapTo(targetBox, positionAxis)
                if (currentChild.options) {
                    currentChild.options.stackBase = stackBase;
                }

                if (i == 0) {
                    box = stack.box = childBox.clone();
                } else {
                    childBox.alignTo(children[i - 1].box, stackDirection);
                }

                currentChild.reflow(childBox);

                box.wrap(childBox);
            }
        }
    });

    var Bar = ChartElement.extend({
        init: function(value, options) {
            var bar = this;

            bar.value = value;
            bar.options.id = uniqueId();

            ChartElement.fn.init.call(bar, options);
        },

        options: {
            color: WHITE,
            border: {
                width: 1
            },
            vertical: true,
            overlay: {
                gradient: GLASS
            },
            aboveAxis: true,
            labels: {
                visible: false
            },
            animation: {
                type: BAR
            },
            opacity: 1
        },

        render: function() {
            var bar = this,
                value = bar.value,
                options = bar.options,
                labels = options.labels,
                labelText = value,
                labelTemplate;

            if (bar._rendered) {
                return;
            } else {
                bar._rendered = true;
            }

            if (labels.visible && value) {
                if (labels.template) {
                    labelTemplate = template(labels.template);
                    labelText = labelTemplate({
                        dataItem: bar.dataItem,
                        category: bar.category,
                        value: bar.value,
                        series: bar.series
                    });
                }

                bar.append(
                    new BarLabel(labelText, deepExtend({
                            vertical: options.vertical,
                            id: uniqueId()},
                        options.labels)
                    )
                );
            }
        },

        reflow: function(targetBox) {
            this.render();

            var bar = this,
                options = bar.options,
                children = bar.children,
                label = children[0];

            bar.box = targetBox;

            if (label) {
                label.options.aboveAxis = options.aboveAxis;
                label.reflow(targetBox);
            }
        },

        getViewElements: function(view) {
            var bar = this,
                options = bar.options,
                vertical = options.vertical,
                border = options.border.width > 0 ? {
                    stroke: bar.getBorderColor(),
                    strokeWidth: options.border.width,
                    dashType: options.border.dashType
                } : {},
                box = bar.box,
                rectStyle = deepExtend({
                    id: options.id,
                    fill: options.color,
                    fillOpacity: options.opacity,
                    strokeOpacity: options.opacity,
                    vertical: options.vertical,
                    aboveAxis: options.aboveAxis,
                    stackBase: options.stackBase,
                    animation: options.animation
                }, border),
                elements = [],
                label = bar.children[0];

            if (options.overlay) {
                rectStyle.overlay = deepExtend({rotation: vertical ? 0 : 90}, options.overlay);
            }

            elements.push(view.createRect(box, rectStyle));

            append(elements,
                ChartElement.fn.getViewElements.call(bar, view));

            bar.registerId(options.id);
            if (label) {
                bar.registerId(label.options.id);
            }

            return elements;
        },

        getOutlineElement: function(view, options){
            var bar = this,
                box = bar.box,
                outlineId = bar.options.id + OUTLINE_SUFFIX;

            bar.registerId(outlineId);
            options = deepExtend({}, options, { id: outlineId });

            return view.createRect(box, options);
        },

        getBorderColor: function() {
            var bar = this,
                options = bar.options,
                color = options.color,
                borderColor = options.border.color;

            if (!defined(borderColor)) {
                borderColor =
                    new Color(color).brightness(BAR_BORDER_BRIGHTNESS).toHex();
            }

            return borderColor;
        },

        tooltipAnchor: function(tooltipWidth, tooltipHeight) {
            var bar = this,
                options = bar.options,
                box = bar.box,
                vertical = options.vertical,
                aboveAxis = options.aboveAxis,
                x,
                y;

            if (vertical) {
                x = box.x2 + TOOLTIP_OFFSET;
                y = aboveAxis ? box.y1 : box.y2 - tooltipHeight;
            } else {
                if (options.isStacked) {
                    x = box.x2 - tooltipWidth;
                    y = box.y1 - tooltipHeight - TOOLTIP_OFFSET;
                } else {
                    x = box.x2 + TOOLTIP_OFFSET;
                    y = box.y1;
                }
            }

            return new Point2D(x, y);
        },

        formatPointValue: function(format) {
            var point = this;

            return point.owner.formatPointValue(point.value, format);
        }
    });

    var CategoricalChart = ChartElement.extend({
        init: function(plotArea, options) {
            var chart = this;

            ChartElement.fn.init.call(chart, options);

            chart.plotArea = plotArea;

            // Value axis ranges grouped by axis name, e.g.:
            // primary: { min: 0, max: 1 }
            chart.valueAxisRanges = {};

            chart.points = [];
            chart.categoryPoints = [];
            chart.seriesPoints = [];

            chart.render();
        },

        options: {
            series: [],
            invertAxes: false,
            isStacked: false
        },

        render: function() {
            var chart = this;

            chart.traverseDataPoints(proxy(chart.addValue, chart));
        },

        addValue: function(value, category, categoryIx, series, seriesIx) {
            var chart = this,
                point,
                categoryPoints = chart.categoryPoints[categoryIx],
                seriesPoints = chart.seriesPoints[seriesIx];

            if (!categoryPoints) {
                chart.categoryPoints[categoryIx] = categoryPoints = [];
            }

            if (!seriesPoints) {
                chart.seriesPoints[seriesIx] = seriesPoints = [];
            }

            chart.updateRange(value, categoryIx, series);

            point = chart.createPoint(value, category, categoryIx, series, seriesIx);
            if (point) {
                point.category = category;
                point.series = series;
                point.seriesIx = seriesIx;
                point.owner = chart;
                point.dataItem = series.dataItems ?
                    series.dataItems[categoryIx] : { value: value };
            }

            chart.points.push(point);
            seriesPoints.push(point);
            categoryPoints.push(point);
        },

        updateRange: function(value, categoryIx, series) {
            var chart = this,
                axisName = series.axis || PRIMARY,
                axisRange = chart.valueAxisRanges[axisName];

            if (defined(value)) {
                axisRange = chart.valueAxisRanges[axisName] =
                    axisRange || { min: MAX_VALUE, max: MIN_VALUE };

                axisRange.min = math.min(axisRange.min, value);
                axisRange.max = math.max(axisRange.max, value);
            }
        },

        seriesValueAxis: function(series) {
            return this.plotArea.namedValueAxes[(series || {}).axis || PRIMARY];
        },

        reflow: function(targetBox) {
            var chart = this,
                options = chart.options,
                invertAxes = options.invertAxes,
                plotArea = chart.plotArea,
                pointIx = 0,
                categorySlots = chart.categorySlots = [],
                chartPoints = chart.points,
                categoryAxis = plotArea.categoryAxis,
                valueAxis,
                axisCrossingValue,
                point;

            chart.traverseDataPoints(function(value, category, categoryIx, currentSeries) {
                valueAxis = chart.seriesValueAxis(currentSeries);
                axisCrossingValue = valueAxis.options.axisCrossingValue;
                point = chartPoints[pointIx++];
                if (point && point.plotValue) {
                    value = point.plotValue;
                }

                var categorySlot = chart.categorySlot(categoryAxis, categoryIx, valueAxis),
                    valueSlot = chart.valueSlot(valueAxis, value),
                    slotX = invertAxes ? valueSlot : categorySlot,
                    slotY = invertAxes ? categorySlot : valueSlot,
                    pointSlot = new Box2D(slotX.x1, slotY.y1, slotX.x2, slotY.y2),
                    aboveAxis = valueAxis.options.reverse ?
                                    value < axisCrossingValue : value >= axisCrossingValue;

                if (point) {
                    point.options.aboveAxis = aboveAxis;
                    point.reflow(pointSlot);
                }

                if (!categorySlots[categoryIx]) {
                    categorySlots[categoryIx] = categorySlot;
                }
            });

            chart.reflowCategories(categorySlots);

            chart.box = targetBox;
        },

        reflowCategories: function() { },

        valueSlot: function(valueAxis, value) {
            return valueAxis.getSlot(value);
        },

        categorySlot: function(categoryAxis, categoryIx) {
            return categoryAxis.getSlot(categoryIx);
        },

        traverseDataPoints: function(callback) {
            var chart = this,
            options = chart.options,
            series = options.series,
            categories = chart.plotArea.options.categoryAxis.categories || [],
            count = categoriesCount(series),
            categoryIx,
            seriesIx,
            value,
            currentCategory,
            currentSeries;

            for (categoryIx = 0; categoryIx < count; categoryIx++) {
                for (seriesIx = 0; seriesIx < series.length; seriesIx++) {
                    currentCategory = categories[categoryIx];
                    currentSeries = series[seriesIx];
                    value = currentSeries.data[categoryIx];
                    callback(value, currentCategory, categoryIx, currentSeries, seriesIx);
                }
            }
        },

        formatPointValue: function(value, tooltipFormat) {
            return format(tooltipFormat, value);
        }
    });

    var BarChart = CategoricalChart.extend({
        init: function(plotArea, options) {
            var chart = this;

            chart._groupTotals = {};
            chart._groups = [];

            CategoricalChart.fn.init.call(chart, plotArea, options);
        },

        render: function() {
            var chart = this;

            CategoricalChart.fn.render.apply(chart);
            chart.computeAxisRanges();
        },

        createPoint: function(value, category, categoryIx, series, seriesIx) {
            var barChart = this,
                options = barChart.options,
                children = barChart.children,
                isStacked = barChart.options.isStacked,
                labelOptions = deepExtend({}, series.labels),
                bar,
                cluster;

            if (isStacked) {
                if (labelOptions.position == OUTSIDE_END) {
                    labelOptions.position = INSIDE_END;
                }
            }

            bar = new Bar(value,
                deepExtend({}, {
                    vertical: !options.invertAxes,
                    overlay: series.overlay,
                    labels: labelOptions,
                    isStacked: isStacked
                }, series));

            cluster = children[categoryIx];
            if (!cluster) {
                cluster = new ClusterLayout({
                    vertical: options.invertAxes,
                    gap: options.gap,
                    spacing: options.spacing
                });
                barChart.append(cluster);
            }

            if (isStacked) {
                var stackWrap = barChart.getStackWrap(series, cluster),
                    positiveStack,
                    negativeStack;

                if (stackWrap.children.length === 0) {
                    positiveStack = new StackLayout({
                        vertical: !options.invertAxes
                    });
                    negativeStack = new StackLayout({
                        vertical: !options.invertAxes,
                        isReversed: true
                    });
                    stackWrap.append(positiveStack, negativeStack);
                } else {
                    positiveStack = stackWrap.children[0];
                    negativeStack = stackWrap.children[1];
                }

                if (value > 0) {
                    positiveStack.append(bar);
                } else {
                    negativeStack.append(bar);
                }
            } else {
                cluster.append(bar);
            }

            return bar;
        },

        getStackWrap: function(series, cluster) {
            var wraps = cluster.children,
                stackGroup = series.stack,
                stackWrap,
                i,
                length = wraps.length;

            if (typeof stackGroup === STRING) {
                for (i = 0; i < length; i++) {
                    if (wraps[i]._stackGroup === stackGroup) {
                        stackWrap = wraps[i];
                        break;
                    }
                }
            } else {
                stackWrap = wraps[0];
            }

            if (!stackWrap) {
                stackWrap = new ChartElement();
                stackWrap._stackGroup = stackGroup;
                cluster.append(stackWrap);
            }

            return stackWrap;
        },

        updateRange: function(value, categoryIx, series) {
            var chart = this,
                isStacked = chart.options.isStacked,
                totals = chart.groupTotals(series.stack),
                positive = totals.positive,
                negative = totals.negative;

            if (defined(value)) {
                if (isStacked) {
                    incrementSlot(value > 0 ? positive : negative, categoryIx, value);
                } else {
                    CategoricalChart.fn.updateRange.apply(chart, arguments);
                }
            }
        },

        computeAxisRanges: function() {
            var chart = this,
                isStacked = chart.options.isStacked,
                axisName,
                categoryTotals;

            if (isStacked) {
                axisName = chart.options.series[0].axis || PRIMARY;
                categoryTotals = chart.categoryTotals();
                chart.valueAxisRanges[axisName] = {
                    min: sparseArrayMin(categoryTotals.negative.concat(0)),
                    max: sparseArrayMax(categoryTotals.positive.concat(0))
                };
            }
        },

        seriesValueAxis: function(series) {
            var chart = this,
                options = chart.options;

            return CategoricalChart.fn.seriesValueAxis.call(
                chart,
                options.isStacked ? chart.options.series[0] : series
            );
        },

        valueSlot: function(valueAxis, value) {
            return valueAxis.getSlot(value, this.options.isStacked ? 0 : undefined);
        },

        categorySlot: function(categoryAxis, categoryIx, valueAxis) {
            var chart = this,
                options = chart.options,
                categorySlot = categoryAxis.getSlot(categoryIx),
                stackAxis,
                zeroSlot;

            if (options.isStacked) {
                zeroSlot = valueAxis.getSlot(0, 0);
                stackAxis = options.invertAxes ? X : Y;
                categorySlot[stackAxis + 1] = categorySlot[stackAxis + 2] = zeroSlot[stackAxis + 1];
            }

            return categorySlot;
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

        groupTotals: function(stackGroup) {
            var chart = this,
                groupName = typeof stackGroup === STRING ? stackGroup : "default",
                totals = chart._groupTotals[groupName];

            if (!totals) {
                totals = chart._groupTotals[groupName] = {
                    positive: [],
                    negative: []
                };

                chart._groups.push(groupName);
            }

            return totals;
        },

        categoryTotals: function() {
            var chart = this,
                groups = chart._groups,
                groupTotals = chart._groupTotals,
                name,
                totals,
                categoryTotals = { positive: [], negative: [] },
                i,
                length = groups.length;

            for (i = 0; i < length; i++) {
                name = groups[i];
                totals = groupTotals[name];
                append(categoryTotals.positive, totals.positive);
                append(categoryTotals.negative, totals.negative);
            }

            return categoryTotals;
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

        getViewElements: function(view, renderOptions) {
            var marker = this,
                options = marker.options,
                type = options.type,
                box = marker.paddingBox,
                element = BoxElement.fn.getViewElements.call(marker, view, renderOptions)[0],
                halfWidth = box.width() / 2;

            if (!element) {
                return [];
            }

            if (type === TRIANGLE) {
                element = view.createPolyline([
                    new Point2D(box.x1 + halfWidth, box.y1),
                    new Point2D(box.x1, box.y2),
                    new Point2D(box.x2, box.y2)
                ], true, element.options);
            } else if (type === CIRCLE) {
                element = view.createCircle([
                    round(box.x1 + halfWidth, COORD_PRECISION),
                    round(box.y1 + box.height() / 2, COORD_PRECISION)
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
        },

        options: {
            aboveAxis: true,
            vertical: true,
            markers: {
                visible: true,
                background: WHITE,
                size: LINE_MARKER_SIZE,
                type: CIRCLE,
                border: {
                    width: 2
                },
                opacity: 1
            },
            labels: {
                visible: false,
                position: ABOVE,
                margin: getSpacing(3),
                padding: getSpacing(4),
                animation: {
                    type: FADEIN,
                    delay: INITIAL_ANIMATION_DURATION
                }
            }
        },

        render: function() {
            var point = this,
                options = point.options,
                markers = options.markers,
                labels = options.labels,
                markerBackground = markers.background,
                markerBorder = deepExtend({}, markers.border),
                labelText = point.value;

            if (point._rendered) {
                return;
            } else {
                point._rendered = true;
            }

            if (!defined(markerBorder.color)) {
                markerBorder.color =
                    new Color(markerBackground).brightness(BAR_BORDER_BRIGHTNESS).toHex();
            }

            point.marker = new ShapeElement({
                id: uniqueId(),
                visible: markers.visible,
                type: markers.type,
                width: markers.size,
                height: markers.size,
                background: markerBackground,
                border: markerBorder,
                opacity: markers.opacity
            });

            point.append(point.marker);

            if (labels.visible) {
                if (labels.template) {
                    var labelTemplate = template(labels.template);
                    labelText = labelTemplate({
                        dataItem: point.dataItem,
                        category: point.category,
                        value: point.value,
                        series: point.series
                    });
                } else if (labels.format) {
                    labelText = point.formatPointValue(labels.format);
                }
                point.label = new TextBox(labelText,
                    deepExtend({
                        id: uniqueId(),
                        align: CENTER,
                        vAlign: CENTER,
                        margin: {
                            left: 5,
                            right: 5
                        }
                    }, labels, { format: "" })
                );
                point.append(point.label);
            }
        },

        markerBox: function() {
            return this.marker.box;
        },

        reflow: function(targetBox) {
            var point = this,
                options = point.options,
                vertical = options.vertical,
                aboveAxis = options.aboveAxis,
                childBox;

            point.render();

            point.box = targetBox;
            childBox = targetBox.clone();

            if (vertical) {
                if (aboveAxis) {
                    childBox.y1 -= childBox.height();
                } else {
                    childBox.y2 += childBox.height();
                }
            } else {
                if (aboveAxis) {
                    childBox.x1 += childBox.width();
                } else {
                    childBox.x2 -= childBox.width();
                }
            }

            point.marker.reflow(childBox);
            point.reflowLabel(childBox);
        },

        reflowLabel: function(box) {
            var point = this,
                options = point.options,
                marker = point.marker,
                label = point.label,
                edge = options.labels.position;

            if (label) {
                edge = edge === ABOVE ? TOP : edge;
                edge = edge === BELOW ? BOTTOM : edge;

                label.reflow(box);
                label.box.alignTo(marker.box, edge);
                label.reflow(label.box);
            }
        },

        getViewElements: function(view) {
            var element = this,
                marker = element.marker,
                label = element.label;

            element.registerId(marker.options.id);

            if (label) {
                element.registerId(label.options.id);
            }

            return ChartElement.fn.getViewElements.call(element, view);
        },

        getOutlineElement: function(view, options) {
            var element = this,
                marker = element.marker,
                outlineId = element.marker.options.id + OUTLINE_SUFFIX;

            element.registerId(outlineId);
            options = deepExtend({}, options, { id: outlineId });

            return marker.getViewElements(view, deepExtend(options, {
                fill: marker.options.border.color,
                fillOpacity: 1,
                strokeOpacity: 0
            }))[0];
        },

        tooltipAnchor: function(tooltipWidth, tooltipHeight) {
            var point = this,
                markerBox = point.marker.box,
                aboveAxis = point.options.aboveAxis;

            return new Point2D(
                markerBox.x2 + TOOLTIP_OFFSET,
                aboveAxis ? markerBox.y1 - tooltipHeight : markerBox.y2
            );
        },

        formatPointValue: function(format) {
            var point = this;

            return point.owner.formatPointValue(point.value, format);
        }
    });

    var LineChartMixin = {
        splitSegments: function(view) {
            var chart = this,
                options = chart.options,
                series = options.series,
                seriesPoints = chart.seriesPoints,
                currentSeries,
                seriesIx,
                seriesCount = seriesPoints.length,
                currentSeriesPoints,
                linePoints,
                point,
                pointCount,
                lines = [];

            for (seriesIx = 0; seriesIx < seriesCount; seriesIx++) {
                currentSeriesPoints = seriesPoints[seriesIx];
                pointCount = currentSeriesPoints.length;
                currentSeries = series[seriesIx];
                linePoints = [];

                for (pointIx = 0; pointIx < pointCount; pointIx++) {
                    point = currentSeriesPoints[pointIx];
                    if (point) {
                        pointCenter = point.markerBox().center();
                        linePoints.push(new Point2D(pointCenter.x, pointCenter.y));
                    } else if (currentSeries.missingValues !== INTERPOLATE) {
                        if (linePoints.length > 1) {
                            lines.push(
                                chart.createSegment(uniqueId(), view, linePoints, currentSeries, seriesIx));
                        }
                        linePoints = [];
                    }
                }

                if (linePoints.length > 1) {
                    lines.push(
                        chart.createSegment(uniqueId(), view, linePoints, currentSeries, seriesIx));
                }
            }

            return lines;
        },

        createSegment: function(lineId, view, points, series, seriesIx) {
            this.registerId(lineId, { seriesIx: seriesIx });
            return view.createPolyline(points, false, {
                id: lineId,
                stroke: series.color,
                strokeWidth: series.width,
                strokeOpacity: series.opacity,
                fill: "",
                dashType: series.dashType
            });
        },

        getNearestPoint: function(x, y, seriesIx) {
            var chart = this,
                invertAxes = chart.options.invertAxes,
                axis = invertAxes ? Y : X,
                pos = invertAxes ? y : x,
                points = chart.seriesPoints[seriesIx],
                nearestPointDistance = MAX_VALUE,
                pointsLength = points.length,
                currentPoint,
                pointBox,
                pointDistance,
                nearestPoint,
                i;

            for (i = 0; i < pointsLength; i++) {
                currentPoint = points[i];

                if (currentPoint && defined(currentPoint.value) && currentPoint.value !== null) {
                    pointBox = currentPoint.box;
                    pointDistance = math.abs(pointBox.center()[axis] - pos);

                    if (pointDistance < nearestPointDistance) {
                        nearestPoint = currentPoint;
                        nearestPointDistance = pointDistance;
                    }
                }
            }

            return nearestPoint;
        }
    };

    var LineChart = CategoricalChart.extend({
        init: function(plotArea, options) {
            var chart = this;

            chart._stackAxisRange = { min: MAX_VALUE, max: MIN_VALUE };
            chart._categoryTotals = [];

            CategoricalChart.fn.init.call(chart, plotArea, options);
        },

        render: function() {
            var chart = this;

            CategoricalChart.fn.render.apply(chart);
            chart.computeAxisRanges();
        },

        createPoint: function(value, category, categoryIx, series, seriesIx) {
            var chart = this,
                options = chart.options,
                isStacked = options.isStacked,
                categoryPoints = chart.categoryPoints[categoryIx],
                stackPoint,
                plotValue = 0;

            if (!defined(value) || value === null) {
                if (isStacked || series.missingValues === ZERO) {
                    value = 0;
                } else {
                    return null;
                }
            }

            var point = new LinePoint(value,
                deepExtend({
                    vertical: !options.invertAxes,
                    markers: {
                        border: {
                            color: series.color
                        }
                    }
                }, series)
            );

            if (isStacked) {
                stackPoint = last(categoryPoints);
                if (stackPoint) {
                    plotValue = stackPoint.plotValue;
                }

                point.plotValue = value + plotValue;
            }

            chart.append(point);

            return point;
        },

        updateRange: function(value, categoryIx, series) {
            var chart = this,
                isStacked = chart.options.isStacked,
                stackAxisRange = chart._stackAxisRange,
                totals = chart._categoryTotals;

            if (defined(value)) {
                if (isStacked) {
                    incrementSlot(totals, categoryIx, value);

                    stackAxisRange.min = math.min(stackAxisRange.min, sparseArrayMin(totals));
                    stackAxisRange.max = math.max(stackAxisRange.max, sparseArrayMax(totals));
                } else {
                    CategoricalChart.fn.updateRange.apply(chart, arguments);
                }
            }
        },

        computeAxisRanges: function() {
            var chart = this,
                isStacked = chart.options.isStacked,
                axisName,
                totals = chart._categoryTotals;

            if (isStacked) {
                axisName = chart.options.series[0].axis || PRIMARY;
                chart.valueAxisRanges[axisName] = chart._stackAxisRange;
            }
        },

        getViewElements: function(view) {
            var chart = this,
                elements = CategoricalChart.fn.getViewElements.call(chart, view),
                group = view.createGroup({
                    animation: {
                        type: CLIP
                    }
                }),
                lines = chart.splitSegments(view);


            group.children = lines.concat(elements);
            return [group];
        }
    });
    deepExtend(LineChart.fn, LineChartMixin);

    var AreaChart = LineChart.extend({
        splitSegments: function(view) {
            var chart = this,
                options = chart.options,
                plotArea = chart.plotArea,
                invertAxes = chart.options.invertAxes,
                originalLines = LineChart.fn.splitSegments.call(chart, view),
                lines = [],
                axisLineBox = plotArea.categoryAxis.lineBox(),
                end = invertAxes ? axisLineBox.x1 : axisLineBox.y1,
                originalLinePoints,
                linesCount = originalLines.length,
                seriesIx = 0,
                linePoints,
                firstPoint,
                lastPoint,
                lineOptions,
                i;

            for (i = 0; i < linesCount; i++) {
                line = originalLines[i].clone();
                linePoints = line.points;
                lineOptions = line.options;
                seriesIx = lineOptions.seriesIx;

                if (lineOptions.stack && seriesIx != 0) {
                    if (seriesIx > 0) {
                        originalLinePoints = originalLines[i - 1].clone().points.reverse();
                        line.points = linePoints.concat(originalLinePoints);
                    }
                } else {
                    if (linePoints.length > 1) {
                        firstPoint = linePoints[0];
                        lastPoint = last(linePoints);

                        if (invertAxes) {
                            linePoints.unshift(new Point2D(end, firstPoint.y));
                            linePoints.push(new Point2D(end, lastPoint.y));
                        } else {
                            linePoints.unshift(new Point2D(firstPoint.x, end));
                            linePoints.push(new Point2D(lastPoint.x, end));
                        }
                    }
                }
                lines.push(line);
            }

            return lines;
        },

        createSegment: function(lineId, view, points, series, seriesIx) {
            var line = deepExtend({}, {
                    color: series.color,
                    opacity: series.opacity
                }, series.line);
            this.registerId(lineId, { seriesIx: seriesIx });

            return view.createPolyline(points, true, {
                id: lineId,
                stroke: line.color,
                strokeWidth: line.width,
                strokeOpacity: line.opacity,
                dashType: line.dashType,
                fillOpacity: series.opacity,
                fill: series.color,
                seriesIx: seriesIx,
                stack: series.stack
            });
        }
    });

    var ScatterChart = ChartElement.extend({
        init: function(plotArea, options) {
            var chart = this;

            ChartElement.fn.init.call(chart, options);

            chart.plotArea = plotArea;

            // X and Y axis ranges grouped by name, e.g.:
            // primary: { min: 0, max: 1 }
            chart.xAxisRanges = {};
            chart.yAxisRanges = {};

            chart.points = [];
            chart.seriesPoints = [];

            chart.render();
        },

        options: {
            series: [],
            tooltip: {
                format: "{0}, {1}"
            },
            labels: {
                format: "{0}, {1}"
            }
        },

        render: function() {
            var chart = this;

            chart.traverseDataPoints(proxy(chart.addValue, chart));
        },

        addValue: function(value, fields) {
            var chart = this,
                point,
                seriesIx = fields.seriesIx,
                seriesPoints = chart.seriesPoints[seriesIx];

            chart.updateRange(value, fields.series);

            point = chart.createPoint(value, fields.series, seriesIx);
            if (point) {
                extend(point, fields);
            }

            chart.points.push(point);
            seriesPoints.push(point);
        },

        updateRange: function(value, series) {
            var chart = this,
                x = value.x,
                y = value.y,
                xAxisName = series.xAxis || PRIMARY,
                yAxisName = series.yAxis || PRIMARY,
                xAxisRange = chart.xAxisRanges[xAxisName],
                yAxisRange = chart.yAxisRanges[yAxisName];

            if (defined(x) && x !== null) {
                xAxisRange = chart.xAxisRanges[xAxisName] =
                    xAxisRange || { min: MAX_VALUE, max: MIN_VALUE };

                xAxisRange.min = math.min(xAxisRange.min, x);
                xAxisRange.max = math.max(xAxisRange.max, x);
            }

            if (defined(y) && y !== null) {
                yAxisRange = chart.yAxisRanges[yAxisName] =
                    yAxisRange || { min: MAX_VALUE, max: MIN_VALUE };

                yAxisRange.min = math.min(yAxisRange.min, y);
                yAxisRange.max = math.max(yAxisRange.max, y);
            }
        },

        createPoint: function(value, series, seriesIx) {
            var chart = this,
                point,
                x = value.x,
                y = value.y;

            if (!defined(x) || x === null || !defined(y) || y === null) {
                return null;
            }

            point = new LinePoint(value,
                deepExtend({
                    markers: {
                        border: {
                            color: series.color
                        },
                        opacity: series.opacity
                    },
                    tooltip: {
                        format: chart.options.tooltip.format
                    },
                    labels: {
                        format: chart.options.labels.format
                    }
                }, series)
            );

            chart.append(point);

            return point;
        },

        seriesAxes: function(series) {
            var plotArea = this.plotArea,
                xAxis = series.xAxis || PRIMARY,
                yAxis = series.yAxis || PRIMARY;

            return {
                x: plotArea.namedXAxes[xAxis],
                y: plotArea.namedYAxes[yAxis]
            };
        },

        reflow: function(targetBox) {
            var chart = this,
                plotArea = chart.plotArea,
                chartPoints = chart.points,
                pointIx = 0,
                point,
                seriesAxes;

            chart.traverseDataPoints(function(value, fields) {
                point = chartPoints[pointIx++];
                seriesAxes = chart.seriesAxes(fields.series);

                var slotX = seriesAxes.x.getSlot(value.x, value.x),
                    slotY = seriesAxes.y.getSlot(value.y, value.y),
                    pointSlot = new Box2D(slotX.x1, slotY.y1, slotX.x2, slotY.y2);

                if (point) {
                    point.reflow(pointSlot);
                }
            });

            chart.box = targetBox;
        },

        getViewElements: function(view) {
            var chart = this,
                elements = ChartElement.fn.getViewElements.call(chart, view),
                group = view.createGroup({
                    animation: {
                        type: CLIP
                    }
                });

            group.children = elements;
            return [group];
        },

        traverseDataPoints: function(callback) {
            var chart = this,
                options = chart.options,
                series = options.series,
                seriesPoints = chart.seriesPoints,
                pointIx = 0,
                seriesIx,
                currentSeries,
                currentSeriesPoints,
                dataItems,
                value,
                pointData;

            for (seriesIx = 0; seriesIx < series.length; seriesIx++) {
                currentSeries = series[seriesIx];

                currentSeriesPoints = seriesPoints[seriesIx];
                if (!currentSeriesPoints) {
                    seriesPoints[seriesIx] = [];
                }

                for (pointIx = 0; pointIx < currentSeries.data.length; pointIx++) {
                    pointData = currentSeries.data[pointIx] || [];
                    dataItems = currentSeries.dataItems;
                    value = { x: pointData[0], y: pointData[1] };

                    callback(value, {
                        pointIx: pointIx,
                        series: currentSeries,
                        seriesIx: seriesIx,
                        dataItem: dataItems ? dataItems[pointIx] : value,
                        owner: chart
                    });
                }
            }
        },

        formatPointValue: function(value, tooltipFormat) {
            return format(tooltipFormat, value.x, value.y);
        }
    });

    var ScatterLineChart = ScatterChart.extend({
        getViewElements: function(view) {
            var chart = this,
                elements = ScatterChart.fn.getViewElements.call(chart, view),
                group = view.createGroup({
                    animation: {
                        type: CLIP
                    }
                }),
                lines = chart.splitSegments(view);

            group.children = lines.concat(elements);
            return [group];
        }
    });
    deepExtend(ScatterLineChart.fn, LineChartMixin);

    var PieSegment = ChartElement.extend({
        init: function(value, sector, options) {
            var segment = this;

            segment.value = value;
            segment.sector = sector;

            ChartElement.fn.init.call(segment, options);
        },

        options: {
            color: WHITE,
            overlay: {
                gradient: ROUNDED_BEVEL
            },
            border: {
                width: 0.5
            },
            labels: {
                visible: false,
                distance: 35,
                font: DEFAULT_FONT,
                margin: getSpacing(0.5),
                align: CIRCLE,
                zIndex: 1,
                position: OUTSIDE_END
            },
            animation: {
                type: PIE
            },
            highlight: {
                visible: true,
                border: {
                    width: 1
                }
            }
        },

        render: function() {
            var segment = this,
                options = segment.options,
                labels = options.labels,
                labelText = segment.value,
                labelTemplate;

            if (segment._rendered) {
                return;
            } else {
                segment._rendered = true;
            }

            if (labels.template) {
                labelTemplate = template(labels.template);
                labelText = labelTemplate({
                    dataItem: segment.dataItem,
                    category: segment.category,
                    value: segment.value,
                    series: segment.series,
                    percentage: segment.percentage
                });
            }

            if (labels.visible) {
                segment.label = new TextBox(labelText, deepExtend({}, labels, {
                        id: uniqueId(),
                        align: CENTER,
                        vAlign: "",
                        animation: {
                            type: FADEIN,
                            delay: segment.categoryIx * PIE_SECTOR_ANIM_DELAY
                        }
                    }));

                segment.append(segment.label);
                segment.registerId(segment.label.options.id);
            }
        },

        reflow: function(targetBox) {
            var segment = this;

            segment.render();

            segment.box = targetBox;
            targetBox.clone();

            segment.reflowLabel();
        },

        reflowLabel: function() {
            var segment = this,
                sector = segment.sector.clone(),
                options = segment.options,
                label = segment.label,
                labelsOptions = options.labels,
                labelsDistance = labelsOptions.distance,
                lp,
                x1,
                angle = sector.middle(),
                labelWidth,
                labelHeight;

            if (label) {
                labelHeight = label.box.height();
                labelWidth = label.box.width();
                if (labelsOptions.position == CENTER) {
                    sector.r = math.abs((sector.r - labelHeight) / 2) + labelHeight;
                    lp = sector.point(angle);
                    label.reflow(new Box2D(lp.x, lp.y - labelHeight / 2, lp.x, lp.y));
                } else if (labelsOptions.position == INSIDE_END) {
                    sector.r = sector.r - labelHeight / 2;
                    lp = sector.point(angle);
                    label.reflow(new Box2D(lp.x, lp.y - labelHeight / 2, lp.x, lp.y));
                } else {
                    lp = sector.clone().expand(labelsDistance).point(angle);
                    if (lp.x >= sector.c.x) {
                        x1 = lp.x + labelWidth;
                        label.orientation = RIGHT;
                    } else {
                        x1 = lp.x - labelWidth;
                        label.orientation = LEFT;
                    }
                    label.reflow(new Box2D(x1, lp.y - labelHeight, lp.x, lp.y));
                }
            }
        },

        getViewElements: function(view) {
            var segment = this,
                sector = segment.sector,
                options = segment.options,
                borderOptions = options.border || {},
                border = borderOptions.width > 0 ? {
                    stroke: borderOptions.color,
                    strokeWidth: borderOptions.width,
                    dashType: borderOptions.dashType
                } : {},
                elements = [],
                overlay = options.overlay;

            if (overlay) {
                overlay = deepExtend({}, options.overlay, {
                    r: sector.r,
                    cx: sector.c.x,
                    cy: sector.c.y,
                    bbox: sector.getBBox()
                })
            }

            if (segment.value !== 0) {
                elements.push(view.createSector(sector, deepExtend({
                    id: options.id,
                    fill: options.color,
                    overlay: overlay,
                    fillOpacity: options.opacity,
                    strokeOpacity: options.opacity,
                    animation: deepExtend(options.animation, {
                        delay: segment.categoryIx * PIE_SECTOR_ANIM_DELAY
                    })
                }, border)));
            }

            append(elements,
                ChartElement.fn.getViewElements.call(segment, view)
            );

            return elements;
        },

        getOutlineElement: function(view, options) {
            var segment = this,
                highlight = segment.options.highlight || {},
                border = highlight.border || {},
                outlineId = segment.options.id + OUTLINE_SUFFIX,
                element;

            segment.registerId(outlineId);
            options = deepExtend({}, options, { id: outlineId });

            if (segment.value !== 0) {
                element = view.createSector(segment.sector, deepExtend({}, options, {
                    fill: highlight.color,
                    fillOpacity: highlight.opacity,
                    strokeOpacity: border.opacity,
                    strokeWidth: border.width,
                    stroke: border.color
                }));
            }

            return element;
        },

        tooltipAnchor: function(tooltipWidth, tooltipHeight) {
            var w = tooltipWidth / 2,
                h = tooltipHeight / 2,
                r = math.sqrt((w * w) + (h * h)),
                sector = this.sector.clone().expand(r + TOOLTIP_OFFSET),
                tooltipCenter = sector.point(sector.middle());

            return new Point2D(tooltipCenter.x - w, tooltipCenter.y - h);
        },

        formatPointValue: function(format) {
            var point = this;

            return point.owner.formatPointValue(point.value, format);
        }
    });

    var PieChart = ChartElement.extend({
        init: function(plotArea, options) {
            var chart = this;

            ChartElement.fn.init.call(chart, options);

            chart.plotArea = plotArea;
            chart.segments = [];
            chart.seriesPoints = [];
            chart.render();
        },

        options: {
            startAngle: 90,
            connectors: {
                width: 1,
                color: "#939393",
                padding: 4
            }
        },

        render: function() {
            var chart = this;

            chart.traverseDataPoints(proxy(chart.addValue, chart));
        },

        traverseDataPoints: function(callback) {
            var chart = this,
                options = chart.options,
                colors = chart.plotArea.options.seriesColors || [],
                startAngle = options.startAngle,
                colorsCount = colors.length,
                series = options.series,
                dataItems,
                currentName,
                currentSeries,
                currentData,
                seriesIx,
                angle,
                data,
                anglePerValue,
                value,
                explode,
                total,
                i;

            for (seriesIx = 0; seriesIx < series.length; seriesIx++) {
                currentSeries = series[seriesIx];
                dataItems = currentSeries.dataItems;
                data = currentSeries.data;
                total = chart.pointsTotal(data)
                anglePerValue = 360 / total;

                for (i = 0; i < data.length; i++) {
                    currentData = chart.pointData(currentSeries, i);
                    value = currentData.value;
                    angle = round(value * anglePerValue, DEFAULT_PRECISION);
                    currentName = currentData.category;
                    explode = data.length != 1 && !!currentData.explode;
                    currentSeries.color = currentData.color ?
                        currentData.color : colors[i % colorsCount];

                    callback(value, new Sector(null, 0, startAngle, angle), {
                        owner: chart,
                        category: currentName,
                        categoryIx: i,
                        series: currentSeries,
                        seriesIx: seriesIx,
                        dataItem: dataItems ? dataItems[i] : { value: currentData },
                        percentage: value / total,
                        explode: explode,
                        currentData: currentData
                    });

                    startAngle += angle;
                }
            }
        },

        addValue: function(value, sector, fields) {
            var chart = this,
                segment;

            segment = new PieSegment(value, sector, fields.series);
            segment.options.id = uniqueId();
            extend(segment, fields);
            chart.append(segment);
            chart.segments.push(segment);
        },

        pointValue: function(point) {
            return defined(point.value) ? point.value : point;
        },

        pointData: function(series, index) {
            var chart = this,
                data = series.data[index];

            return {
                value: chart.pointValue(data),
                category: chart.pointGetter(series, index, "category"),
                color: chart.pointGetter(series, index, "color"),
                explode: chart.pointGetter(series, index, "explode")
            };
        },

        pointGetter: function(series, index, prop) {
            var valueField = series[prop + "Field"],
                data = series.data[index],
                value = data[prop];

            if (valueField && series.dataItems) {
                return getField(valueField, series.dataItems[index]);
            } else {
                return defined(value) ? value : "";
            }
        },

        pointsTotal: function(data) {
            var chart = this,
                length = data.length,
                sum = 0,
                i;

            for(i = 0; i < length; i++) {
                sum += chart.pointValue(data[i]);
            }

            return sum;
        },

        reflow: function(targetBox) {
            var chart = this,
                options = chart.options,
                box = targetBox.clone(),
                space = 5,
                minWidth = math.min(box.width(), box.height()),
                halfMinWidth = minWidth / 2,
                defaultPadding = minWidth - minWidth * 0.85,
                padding = defined(options.padding) ? options.padding : defaultPadding,
                padding = padding > halfMinWidth - space ? halfMinWidth - space : padding,
                newBox = new Box2D(box.x1, box.y1,
                    box.x1 + minWidth, box.y1 + minWidth),
                newBoxCenter = newBox.center(),
                boxCenter = box.center(),
                segments = chart.segments,
                count = segments.length,
                leftSideLabels = [],
                rightSideLabels = [],
                label,
                segment,
                sector,
                i;

            newBox.translate(boxCenter.x - newBoxCenter.x, boxCenter.y - newBoxCenter.y);

            for (i = 0; i < count; i++) {
                segment = segments[i];

                sector = segment.sector;
                sector.r = halfMinWidth - padding;
                sector.c = new Point2D(
                    sector.r + newBox.x1 + padding,
                    sector.r + newBox.y1 + padding
                );

                if (segment.explode) {
                    sector.c = sector.clone().radius(sector.r * 0.15).point(sector.middle());
                }

                segment.reflow(newBox);

                label = segment.label;
                if (label) {
                    if (label.options.position === OUTSIDE_END) {
                        if (label.orientation === RIGHT) {
                            rightSideLabels.push(label);
                        } else {
                            leftSideLabels.push(label);
                        }
                    }
                }
            }

            if (leftSideLabels.length > 0) {
                leftSideLabels.sort(chart.labelComparator(true));
                chart.leftLabelsReflow(leftSideLabels);
            }

            if (rightSideLabels.length > 0) {
                rightSideLabels.sort(chart.labelComparator(false));
                chart.rightLabelsReflow(rightSideLabels);
            }

            chart.box = newBox;
        },

        leftLabelsReflow: function(labels) {
            var chart = this,
                distances = chart.distanceBetweenLabels(labels);

            chart.distributeLabels(distances, labels);
        },

        rightLabelsReflow: function(labels) {
            var chart = this,
                distances = chart.distanceBetweenLabels(labels);

            chart.distributeLabels(distances, labels);
        },

        distanceBetweenLabels: function(labels) {
            var chart = this,
                segment = chart.segments[0],
                sector = segment.sector,
                firstBox = labels[0].box,
                secondBox,
                count = labels.length - 1,
                distances = [],
                distance,
                lr = sector.r + segment.options.labels.distance,
                i;

            distance = round(firstBox.y1 - (sector.c.y - lr - firstBox.height() - firstBox.height() / 2));
            distances.push(distance);
            for (i = 0; i < count; i++) {
                firstBox = labels[i].box;
                secondBox = labels[i + 1].box;
                distance = round(secondBox.y1 - firstBox.y2);
                distances.push(distance);
            }
            distance = round(sector.c.y + lr - labels[count].box.y2 - labels[count].box.height() / 2);
            distances.push(distance);

            return distances;
        },

        distributeLabels: function(distances, labels) {
            var chart = this,
                count = distances.length,
                remaining,
                left,
                right,
                i;

            for (i = 0; i < count; i++) {
                left = right = i;
                remaining = -distances[i];
                while(remaining > 0 && (left >= 0 || right < count)) {
                    remaining = chart._takeDistance(distances, i, --left, remaining);
                    remaining = chart._takeDistance(distances, i, ++right, remaining);
                }
            }

            chart.reflowLabels(distances, labels);
        },

        _takeDistance: function(distances, anchor, position, amount) {
            if (distances[position] > 0) {
                var available = math.min(distances[position], amount);
                amount -= available;
                distances[position] -= available;
                distances[anchor] += available;
            }

            return amount;
        },

        reflowLabels: function(distances, labels) {
            var chart = this,
                segments = chart.segments,
                segment = segments[0],
                sector = segment.sector,
                labelsCount = labels.length,
                labelOptions = segment.options.labels,
                labelDistance = labelOptions.distance,
                boxY = sector.c.y - (sector.r + labelDistance) - labels[0].box.height(),
                label,
                boxX,
                box,
                i;

            distances[0] += 2;
            for (i = 0; i < labelsCount; i++) {
                label = labels[i];
                boxY += distances[i];
                box = label.box;
                boxX = chart.hAlignLabel(
                    box.x2,
                    sector.clone().expand(labelDistance),
                    boxY,
                    boxY + box.height(),
                    label.orientation == RIGHT);

                if (label.orientation == RIGHT) {
                    if (labelOptions.align !== CIRCLE) {
                        boxX = sector.r + sector.c.x + labelDistance;
                    }
                    label.reflow(new Box2D(boxX + box.width(), boxY,
                        boxX, boxY));
                } else {
                    if (labelOptions.align !== CIRCLE) {
                        boxX = sector.c.x - sector.r - labelDistance;
                    }
                    label.reflow(new Box2D(boxX - box.width(), boxY,
                        boxX, boxY));
                }

                boxY += box.height();
            }
        },

        getViewElements: function(view) {
            var chart = this,
                options = chart.options,
                connectors = options.connectors,
                segments = chart.segments,
                connectorLine,
                sector,
                count = segments.length,
                space = 4,
                angle,
                lines = [],
                points,
                segment,
                seriesIx,
                label,
                i;

            for (i = 0; i < count; i++) {
                segment = segments[i];
                sector = segment.sector;
                angle = sector.middle();
                label = segment.label;
                seriesIx = { seriesId: segment.seriesIx };

                if (label) {
                    points = [];
                    if (label.options.position === OUTSIDE_END && segment.value !== 0) {
                        var box = label.box,
                            centerPoint = sector.c,
                            start = sector.point(angle),
                            middle = new Point2D(box.x1, box.center().y),
                            sr,
                            end,
                            crossing;

                        start = sector.clone().expand(connectors.padding).point(angle);
                        points.push(start);
                        if (label.orientation == RIGHT) {
                            end = new Point2D(box.x1 - connectors.padding, box.center().y);
                            crossing = intersection(centerPoint, start, middle, end);
                            middle = new Point2D(end.x - space, end.y);
                            crossing = crossing || middle;
                            crossing.x = math.min(crossing.x, middle.x);

                            if (chart.pointInCircle(crossing, sector.c, sector.r + space) ||
                                crossing.x < sector.c.x) {
                                sr = sector.c.x + sector.r + space;
                                if (segment.options.labels.align !== COLUMN) {
                                    if (sr < middle.x) {
                                        points.push(new Point2D(sr, start.y));
                                    } else {
                                        points.push(new Point2D(start.x + space * 2, start.y));
                                    }
                                } else {
                                    points.push(new Point2D(sr, start.y));
                                }
                                points.push(new Point2D(middle.x, end.y));
                            } else {
                                crossing.y = end.y;
                                points.push(crossing);
                            }
                        } else {
                            end = new Point2D(box.x2 + connectors.padding, box.center().y);
                            crossing = intersection(centerPoint, start, middle, end);
                            middle = new Point2D(end.x + space, end.y);
                            crossing = crossing || middle;
                            crossing.x = math.max(crossing.x, middle.x);

                            if (chart.pointInCircle(crossing, sector.c, sector.r + space) ||
                                crossing.x > sector.c.x) {
                                sr = sector.c.x - sector.r - space;
                                if (segment.options.labels.align !== COLUMN) {
                                    if (sr > middle.x) {
                                        points.push(new Point2D(sr, start.y));
                                    } else {
                                        points.push(new Point2D(start.x - space * 2, start.y));
                                    }
                                } else {
                                    points.push(new Point2D(sr, start.y));
                                }
                                points.push(new Point2D(middle.x, end.y));
                            } else {
                                crossing.y = end.y;
                                points.push(crossing);
                            }
                        }

                        points.push(end);
                        connectorLine = view.createPolyline(points, false, {
                            id: uniqueId(),
                            stroke: connectors.color,
                            strokeWidth: connectors.width,
                            animation: {
                                type: FADEIN,
                                delay: segment.categoryIx * PIE_SECTOR_ANIM_DELAY
                            }
                        });
                        lines.push(connectorLine);
                        segment.registerId(connectorLine.options.id, seriesIx);
                    }
                    segment.registerId(label.options.id, seriesIx);
                }

                segment.registerId(segment.options.id, seriesIx);
            }

            append(lines,
                ChartElement.fn.getViewElements.call(chart, view));

            return lines;
        },

        labelComparator: function (reverse) {
            reverse = (reverse) ? -1 : 1;

            return function(a, b) {
                a = (a.parent.sector.middle() + 270) % 360;
                b = (b.parent.sector.middle() + 270) % 360;
                return (a - b) * reverse;
            }
        },

        hAlignLabel: function(originalX, sector, y1, y2, direction) {
            var cx = sector.c.x,
                cy = sector.c.y,
                r = sector.r,
                t = math.min(math.abs(cy - y1), math.abs(cy - y2));

            if (t > r) {
                return originalX;
            } else {
                return cx + math.sqrt((r * r) - (t * t)) * (direction ? 1 : -1);
            }
        },

        pointInCircle: function(point, c, r) {
            return sqr(c.x - point.x) + sqr(c.y - point.y) < sqr(r);
        },

        formatPointValue: function(value, tooltipFormat) {
            return format(tooltipFormat, value);
        }
    });

    var PlotAreaBase = ChartElement.extend({
        init: function(series, options) {
            var plotArea = this;

            ChartElement.fn.init.call(plotArea, options);

            plotArea.series = series;
            plotArea.charts = [];
            plotArea.options.legend.items = [];
            plotArea.axes = [];

            plotArea.render();
        },

        options: {
            series: [],
            plotArea: {
                margin: {}
            },
            background: "",
            border: {
                color: BLACK,
                width: 0
            },
            legend: {}
        },

        appendChart: function(chart) {
            var plotArea = this;

            plotArea.charts.push(chart);
            plotArea.addToLegend(chart);
            plotArea.append(chart);
        },

        addToLegend: function(chart) {
            var series = chart.options.series,
                count = series.length,
                data = [],
                i;

            for (i = 0; i < count; i++) {
                data.push({ name: series[i].name || "", color: series[i].color });
            }

            append(this.options.legend.items, data);
        },

        reflow: function(targetBox) {
            var plotArea = this,
                options = plotArea.options.plotArea,
                margin = getSpacing(options.margin);

            plotArea.box = targetBox.clone();

            plotArea.box.unpad(margin);

            if (plotArea.axes.length > 0) {
                plotArea.reflowAxes();
                plotArea.box = plotArea.axisBox();
            }

            plotArea.reflowCharts();
        },

        axisCrossingValues: function(axis, crossingAxes) {
            var options = axis.options,
                crossingValues = [].concat(options.axisCrossingValue),
                valuesToAdd = crossingAxes.length - crossingValues.length,
                defaultValue = crossingValues[0] || 0,
                i;

            for (i = 0; i < valuesToAdd; i++) {
                crossingValues.push(defaultValue);
            }

            return crossingValues;
        },

        alignAxisTo: function(axis, targetAxis, crossingValue, targetCrossingValue) {
            var slot = axis.getSlot(crossingValue, crossingValue),
                slotEdge = axis.options.reverse ? 2 : 1,
                targetSlot = targetAxis.getSlot(targetCrossingValue, targetCrossingValue),
                targetEdge = targetAxis.options.reverse ? 2 : 1;

            axis.reflow(
                axis.box.translate(
                    targetSlot[X + targetEdge] - slot[X + slotEdge],
                    targetSlot[Y + targetEdge] - slot[Y + slotEdge]
                )
            );
        },

        alignAxes: function(xAxes, yAxes) {
            var plotArea = this,
                xAnchor = xAxes[0],
                yAnchor = yAxes[0],
                xAnchorCrossings = plotArea.axisCrossingValues(xAnchor, yAxes),
                yAnchorCrossings = plotArea.axisCrossingValues(yAnchor, xAxes),
                leftAnchor,
                rightAnchor,
                topAnchor,
                bottomAnchor,
                axis,
                axisCrossings,
                i;

            // TODO: Refactor almost-identical loops
            for (i = 0; i < yAxes.length; i++) {
                axis = yAxes[i];
                plotArea.alignAxisTo(axis, xAnchor, yAnchorCrossings[i], xAnchorCrossings[i]);

                if (axis.lineBox().x1 === xAnchor.lineBox().x1) {
                    if (leftAnchor) {
                        axis.reflow(axis.box
                            .alignTo(leftAnchor.box, LEFT)
                            .translate(-axis.options.margin, 0)
                        );
                    }

                    leftAnchor = axis;
                }

                if (axis.lineBox().x2 === xAnchor.lineBox().x2) {
                    if (!axis._mirrored) {
                        axis.options.labels.mirror = !axis.options.labels.mirror;
                        axis._mirrored = true;
                    }
                    plotArea.alignAxisTo(axis, xAnchor, yAnchorCrossings[i], xAnchorCrossings[i]);

                    if (rightAnchor) {
                        axis.reflow(axis.box
                            .alignTo(rightAnchor.box, RIGHT)
                            .translate(axis.options.margin, 0)
                        );
                    }

                    rightAnchor = axis;
                }
            }

            for (i = 0; i < xAxes.length; i++) {
                axis = xAxes[i];
                plotArea.alignAxisTo(axis, yAnchor, xAnchorCrossings[i], yAnchorCrossings[i]);

                if (axis.lineBox().y1 === yAnchor.lineBox().y1) {
                    if (!axis._mirrored) {
                        axis.options.labels.mirror = !axis.options.labels.mirror;
                        axis._mirrored = true;
                    }
                    plotArea.alignAxisTo(axis, yAnchor, xAnchorCrossings[i], yAnchorCrossings[i]);

                    if (topAnchor) {
                        axis.reflow(axis.box
                            .alignTo(topAnchor.box, TOP)
                            .translate(0, -axis.options.margin)
                        );
                    }

                    topAnchor = axis;
                }

                if (axis.lineBox().y2 === yAnchor.lineBox().y2) {
                    if (bottomAnchor) {
                        axis.reflow(axis.box
                            .alignTo(bottomAnchor.box, BOTTOM)
                            .translate(0, axis.options.margin)
                        );
                    }

                    bottomAnchor = axis;
                }
            }
        },

        axisBox: function() {
            var plotArea = this,
                axes = plotArea.axes,
                box = axes[0].box.clone(),
                i,
                length = axes.length;

            for (i = 1; i < length; i++) {
                box.wrap(axes[i].box);
            }

            return box;
        },

        shrinkAxes: function() {
            var plotArea = this,
                box = plotArea.box,
                axisBox = plotArea.axisBox(),
                overflowY = axisBox.height() - box.height(),
                overflowX = axisBox.width() - box.width(),
                axes = plotArea.axes,
                currentAxis,
                vertical,
                i,
                length = axes.length;

            // Shrink all axes so they don't overflow out of the bounding box
            for (i = 0; i < length; i++) {
                currentAxis = axes[i];
                vertical = currentAxis.options.vertical;

                currentAxis.reflow(
                    currentAxis.box.shrink(
                        vertical ? 0 : overflowX,
                        vertical ? overflowY : 0
                    )
                );
            }
        },

        shrinkAdditionalAxes: function(xAxes, yAxes) {
            var plotArea = this,
                axes = plotArea.axes,
                xAnchor = xAxes[0],
                yAnchor = yAxes[0],
                anchorLineBox = xAnchor.lineBox().clone().wrap(yAnchor.lineBox()),
                overflowX,
                overflowY,
                currentAxis,
                vertical,
                lineBox,
                i,
                length = axes.length;

            for (i = 0; i < length; i++) {
                currentAxis = axes[i];
                vertical = currentAxis.options.vertical;
                lineBox = currentAxis.lineBox();

                overflowX = math.max(0, lineBox.x2 - anchorLineBox.x2) +
                            math.max(0, anchorLineBox.x1 - lineBox.x1);

                overflowY = math.max(0, lineBox.y2 - anchorLineBox.y2) +
                            math.max(0, anchorLineBox.y1 - lineBox.y1);

                currentAxis.reflow(
                    currentAxis.box.shrink(
                        vertical ? 0 : overflowX,
                        vertical ? overflowY : 0
                    )
                );
            }
        },

        fitAxes: function() {
            var plotArea = this,
                axes = plotArea.axes,
                box = plotArea.box,
                axisBox = plotArea.axisBox(),
                offsetX = box.x1 - axisBox.x1,
                offsetY = box.y1 - axisBox.y1,
                currentAxis,
                i,
                length = axes.length;

            for (i = 0; i < length; i++) {
                currentAxis = axes[i];

                currentAxis.reflow(
                    currentAxis.box.translate(offsetX, offsetY)
                );
            }
        },

        reflowAxes: function() {
            var plotArea = this,
                axes = plotArea.axes,
                xAxes = grep(axes, (function(axis) { return !axis.options.vertical; })),
                yAxes = grep(axes, (function(axis) { return axis.options.vertical; })),
                i,
                length = axes.length;

            for (i = 0; i < length; i++) {
                axes[i].reflow(plotArea.box);
            }

            plotArea.alignAxes(xAxes, yAxes);
            plotArea.shrinkAdditionalAxes(xAxes, yAxes);
            plotArea.alignAxes(xAxes, yAxes);
            plotArea.shrinkAxes();
            plotArea.alignAxes(xAxes, yAxes);
            plotArea.fitAxes();
        },

        reflowCharts: function() {
            var plotArea = this,
                charts = plotArea.charts,
                count = charts.length,
                box = plotArea.box,
                i;

            for (i = 0; i < count; i++) {
                charts[i].reflow(box);
            }

            plotArea.box = box;
        },

        renderGridLines: function(view, axis, secondaryAxis) {
            var options = axis.options,
                vertical = options.vertical,
                crossingSlot = axis.getSlot(options.axisCrossingValue),
                secAxisPos = round(crossingSlot[vertical ? "y1" : "x1"]),
                lineBox = secondaryAxis.lineBox(),
                lineStart = lineBox[vertical ? "x1" : "y1"],
                lineEnd = lineBox[vertical ? "x2" : "y2" ],
                majorTicks = axis.getMajorTickPositions(),
                gridLines = [],
                gridLine = function (pos, options) {
                    return {
                        pos: pos,
                        options: options
                    };
                };

            if (options.majorGridLines.visible) {
                gridLines = map(majorTicks, function(pos) {
                                return gridLine(pos, options.majorGridLines);
                            });
            }

            if (options.minorGridLines.visible) {
                gridLines = gridLines.concat(
                    map(axis.getMinorTickPositions(), function(pos) {
                        if (options.majorGridLines.visible) {
                            if (!inArray(pos, majorTicks)) {
                                return gridLine(pos, options.minorGridLines);
                            }
                        } else {
                            return gridLine(pos, options.minorGridLines);
                        }
                    }
                ));
            }

            return map(gridLines, function(line) {
                var gridLineOptions = {
                        strokeWidth: line.options.width,
                        stroke: line.options.color,
                        dashType: line.options.dashType
                    },
                    linePos = round(line.pos);

                if (secAxisPos === linePos && secondaryAxis.options.line.visible) {
                    return null;
                }

                if (vertical) {
                    return view.createLine(
                        lineStart, linePos, lineEnd, linePos,
                        gridLineOptions);
                } else {
                    return view.createLine(
                        linePos, lineStart, linePos, lineEnd,
                        gridLineOptions);
                }
            });
        },

        getViewElements: function(view) {
            var plotArea = this,
                options = plotArea.options.plotArea,
                axisY = plotArea.axisY,
                axisX = plotArea.axisX,
                gridLinesY = axisY ? plotArea.renderGridLines(view, axisY, axisX) : [],
                gridLinesX = axisX ? plotArea.renderGridLines(view, axisX, axisY) : [],
                childElements = ChartElement.fn.getViewElements.call(plotArea, view),
                border = options.border || {},
                elements = [
                    view.createRect(plotArea.box, {
                        fill: options.background,
                        zIndex: -1
                    }),
                    view.createRect(plotArea.box, {
                        stroke: border.width ? border.color : "",
                        strokeWidth: border.width,
                        fill: "",
                        zIndex: 0,
                        dashType: border.dashType
                    })
                ];

            return [].concat(gridLinesY, gridLinesX, childElements, elements);
        }
    });

    var CategoricalPlotArea = PlotAreaBase.extend({
        init: function(series, options) {
            var plotArea = this,
                axisOptions = deepExtend({}, plotArea.options, options);

            plotArea.namedValueAxes = {};
            plotArea.valueAxisRangeTracker = new AxisGroupRangeTracker(axisOptions.valueAxis);

            if (series.length > 0) {
                plotArea.invertAxes = inArray(
                    series[0].type, [BAR, VERTICAL_LINE, VERTICAL_AREA]
                );
            }

            PlotAreaBase.fn.init.call(plotArea, series, options);
        },

        options: {
            categoryAxis: {
                categories: []
            },
            valueAxis: {}
        },

        render: function() {
            var plotArea = this,
                series = plotArea.series;

            plotArea.createBarChart(grep(series, function(s) {
                return inArray(s.type, [BAR, COLUMN]);
            }));

            plotArea.createLineChart(grep(series, function(s) {
                return inArray(s.type, [LINE, VERTICAL_LINE]);
            }));

            plotArea.createAreaChart(grep(series, function(s) {
                return inArray(s.type, [AREA, VERTICAL_AREA]);
            }));

            plotArea.createAxes();
        },

        appendChart: function(chart) {
            var plotArea = this,
                options = plotArea.options,
                series = chart.options.series,
                categories = options.categoryAxis.categories,
                categoriesToAdd = math.max(0, categoriesCount(series) - categories.length);

            append(categories, new Array(categoriesToAdd));

            plotArea.valueAxisRangeTracker.update(chart.valueAxisRanges);

            PlotAreaBase.fn.appendChart.call(plotArea, chart);
        },

        createBarChart: function(series) {
            if (series.length === 0) {
                return;
            }

            var plotArea = this,
                options = plotArea.options,
                firstSeries = series[0],
                barChart = new BarChart(plotArea, {
                    series: series,
                    invertAxes: plotArea.invertAxes,
                    isStacked: firstSeries.stack && series.length > 1,
                    gap: firstSeries.gap,
                    spacing: firstSeries.spacing
                });

            plotArea.appendChart(barChart);
        },

        createLineChart: function(series) {
            if (series.length === 0) {
                return;
            }

            var plotArea = this,
                options = plotArea.options,
                firstSeries = series[0],
                lineChart = new LineChart(plotArea, {
                    invertAxes: plotArea.invertAxes,
                    isStacked: firstSeries.stack && series.length > 1,
                    series: series
                });

            plotArea.appendChart(lineChart);
        },

        createAreaChart: function(series) {
            if (series.length === 0) {
                return;
            }

            var plotArea = this,
                options = plotArea.options,
                firstSeries = series[0],
                areaChart = new AreaChart(plotArea, {
                    invertAxes: plotArea.invertAxes,
                    isStacked: firstSeries.stack && series.length > 1,
                    series: series
                });

            plotArea.appendChart(areaChart);
        },

        createAxes: function() {
            var plotArea = this,
                options = plotArea.options,
                range,
                invertAxes = plotArea.invertAxes,
                categoriesCount = options.categoryAxis.categories.length,
                categoryAxis = new CategoryAxis(deepExtend({
                        vertical: invertAxes,
                        axisCrossingValue: invertAxes ? categoriesCount : 0
                    },
                    options.categoryAxis)
                ),
                axis,
                axisName,
                namedValueAxes = plotArea.namedValueAxes,
                valueAxisOptions = [].concat(options.valueAxis),
                primaryValueAxis;

            each(valueAxisOptions, function() {
                axisName = this.name || PRIMARY;
                range = plotArea.valueAxisRangeTracker.query(axisName);

                axis = namedValueAxes[axisName] =
                    new NumericAxis(range.min, range.max, deepExtend({
                        vertical: !invertAxes
                    },
                    this)
                );

                plotArea.axes.push(axis);
                plotArea.append(axis);
            });

            primaryValueAxis = namedValueAxes[PRIMARY] || plotArea.axes[0];

            // TODO: Consider removing axisX and axisY aliases
            plotArea.axisX = invertAxes ? primaryValueAxis : categoryAxis;
            plotArea.axisY = invertAxes ? categoryAxis : primaryValueAxis;

            plotArea.categoryAxis = categoryAxis;
            plotArea.axes.push(categoryAxis);
            plotArea.append(plotArea.categoryAxis);
        }
    });

    var AxisGroupRangeTracker = Class.extend({
        init: function(axisOptions) {
            var tracker = this;

            tracker.axisRanges = {},
            tracker.axisOptions = [].concat(axisOptions),
            tracker.defaultRange = { min: 0, max: 1 };
        },

        update: function(chartAxisRanges) {
            var tracker = this,
                axisRanges = tracker.axisRanges,
                axisOptions = tracker.axisOptions,
                range,
                chartRange,
                i,
                axis,
                axisName,
                length = axisOptions.length;

            if (!chartAxisRanges) {
                return;
            }

            for (i = 0; i < length; i++) {
                axis = axisOptions[i];
                axisName = axis.name || PRIMARY;
                range = axisRanges[axisName];
                chartRange = chartAxisRanges[axisName];
                if (chartRange) {
                    axisRanges[axisName] = range =
                        range || { min: MAX_VALUE, max: MIN_VALUE };

                    range.min = math.min(range.min, chartRange.min);
                    range.max = math.max(range.max, chartRange.max);
                }
            }
        },

        query: function(axisName) {
            var tracker = this;

            return tracker.axisRanges[axisName] || deepExtend({}, tracker.defaultRange);
        }
    });

    var XYPlotArea = PlotAreaBase.extend({
        init: function(series, options) {
            var plotArea = this,
                axisOptions = deepExtend({}, plotArea.options, options);

            plotArea.namedXAxes = {};
            plotArea.namedYAxes = {};

            plotArea.xAxisRangeTracker = new AxisGroupRangeTracker(axisOptions.xAxis);
            plotArea.yAxisRangeTracker = new AxisGroupRangeTracker(axisOptions.yAxis);

            PlotAreaBase.fn.init.call(plotArea, series, options);
        },

        options: {
            xAxis: {},
            yAxis: {}
        },

        render: function() {
            var plotArea = this,
                series = plotArea.series;

            plotArea.createScatterChart(grep(series, function(s) {
                return s.type === SCATTER;
            }));

            plotArea.createScatterLineChart(grep(series, function(s) {
                return s.type === SCATTER_LINE;
            }));

            plotArea.createAxes();
        },

        appendChart: function(chart) {
            var plotArea = this;

            plotArea.xAxisRangeTracker.update(chart.xAxisRanges);
            plotArea.yAxisRangeTracker.update(chart.yAxisRanges);

            PlotAreaBase.fn.appendChart.call(plotArea, chart);
        },

        createScatterChart: function(series) {
            var plotArea = this;

            if (series.length > 0) {
                plotArea.appendChart(
                    new ScatterChart(plotArea, { series: series })
                );
            }
        },

        createScatterLineChart: function(series) {
            var plotArea = this;

            if (series.length > 0) {
                plotArea.appendChart(
                    new ScatterLineChart(plotArea, { series: series })
                );
            }
        },

        createXYAxis: function(options, vertical) {
            var plotArea = this,
                axisName = options.name || PRIMARY,
                namedAxes = vertical ? plotArea.namedYAxes : plotArea.namedXAxes,
                axisRanges = vertical ? plotArea.yAxisRanges : plotArea.xAxisRanges,
                rangeTracker = vertical ? plotArea.yAxisRangeTracker : plotArea.xAxisRangeTracker,
                range = rangeTracker.query(axisName),
                options = deepExtend({}, options, { vertical: vertical }),
                axis = new NumericAxis(range.min, range.max, options);

            namedAxes[axisName] = axis;
            plotArea.append(axis);
            plotArea.axes.push(axis);
        },

        createAxes: function() {
            var plotArea = this,
                options = plotArea.options,
                xAxesOptions = [].concat(options.xAxis),
                yAxesOptions = [].concat(options.yAxis);

            each(xAxesOptions, function() {
                plotArea.createXYAxis(this, false);
            });

            each(yAxesOptions, function() {
                plotArea.createXYAxis(this, true);
            });

            // TODO: Remove axisX and axisY aliases
            plotArea.axisX = plotArea.namedXAxes.primary || plotArea.namedXAxes[xAxesOptions[0].name];
            plotArea.axisY = plotArea.namedYAxes.primary || plotArea.namedYAxes[yAxesOptions[0].name];
        }
    });

    var PiePlotArea = PlotAreaBase.extend({
        render: function() {
            var plotArea = this,
                series = plotArea.series;

            plotArea.createPieChart(series);
        },

        createPieChart: function(series) {
            var plotArea = this,
                firstSeries = series[0],
                pieChart = new PieChart(plotArea, {
                    series: series,
                    padding: firstSeries.padding,
                    startAngle: firstSeries.startAngle,
                    connectors: firstSeries.connectors
                });

            plotArea.appendChart(pieChart);
        },

        addToLegend: function(chart) {
            var plotArea = this,
                options = plotArea.options,
                segments = chart.segments,
                count = segments.length,
                i;

            for (i = 0; i < count; i++) {
                options.legend.items.push({
                    name: segments[i].category,
                    color: segments[i].options.color });
            }
        }
    });

    var PieAnimation = ElementAnimation.extend({
        options: {
            easing: "easeOutElastic",
            duration: INITIAL_ANIMATION_DURATION
        },

        setup: function() {
            var sector = this.element.config;

            this.endRadius = sector.r;
            sector.r = 0;
        },

        step: function(pos) {
            var endRadius = this.endRadius,
                sector = this.element.config;

            sector.r = interpolateValue(0, endRadius, pos);
        }
    });

    var BarAnimationDecorator = animationDecorator(BAR, BarAnimation),
        PieAnimationDecorator = animationDecorator(PIE, PieAnimation);

    var Highlight = Class.extend({
        init: function(view, viewElement, options) {
            var highlight = this;
            highlight.options = deepExtend({}, highlight.options, options);

            highlight.view = view;
            highlight.viewElement = viewElement;
        },

        options: {
            fill: WHITE,
            fillOpacity: 0.2,
            stroke: WHITE,
            strokeWidth: 1,
            strokeOpacity: 0.2
        },

        show: function(point) {
            var highlight = this,
                view = highlight.view,
                viewElement = highlight.viewElement,
                outline,
                element;

            highlight.hide();

            if (point.getOutlineElement) {
                outline = point.getOutlineElement(view, highlight.options);

                if (outline) {
                    element = view.renderElement(outline);
                    viewElement.appendChild(element);

                    highlight.element = element;
                    highlight.visible = true;
                }
            }
        },

        hide: function() {
            var highlight = this,
                element = highlight.element;

            if (element) {
                if (element.parentNode) {
                    element.parentNode.removeChild(element);
                }

                delete highlight.element;
                highlight.visible = false;
            }
        }
    });

    var Tooltip = Class.extend({
        init: function(chartElement, options) {
            var tooltip = this;

            tooltip.options = deepExtend({}, tooltip.options, options);
            options = tooltip.options;

            tooltip.chartElement = chartElement;
            tooltip.chartPadding = {
                top: parseInt(chartElement.css("paddingTop"), 10),
                left: parseInt(chartElement.css("paddingLeft"), 10)
            };

            tooltip.template = Tooltip.template;
            if (!tooltip.template) {
                tooltip.template = Tooltip.template = renderTemplate(
                    "<div class='" + CSS_PREFIX + "tooltip' " +
                    "style='display:none; position: absolute; font: #= d.font #;" +
                    "border: #= d.border.width #px solid;" +
                    "opacity: #= d.opacity #; filter: alpha(opacity=#= d.opacity * 100 #);" +
                    "padding: 2px 6px; white-space: nowrap; z-index: 1000;'></div>"
                );
            }

            tooltip.element = $(tooltip.template(tooltip.options)).appendTo(chartElement);
        },

        options: {
            background: BLACK,
            color: WHITE,
            border: {
                width: 3
            },
            opacity: 1,
            animation: {
                duration: TOOLTIP_ANIMATION_DURATION
            }
        },

        show: function(point) {
            var tooltip = this;

            tooltip.point = point;
            tooltip.showTimeout =
                setTimeout(proxy(tooltip._show, tooltip), TOOLTIP_SHOW_DELAY);
        },

        _show: function() {
            var tooltip = this,
                point = tooltip.point,
                element = tooltip.element,
                options = tooltip.options,
                chartPadding = tooltip.chartPadding,
                anchor,
                tooltipTemplate,
                content,
                tooltipOptions,
                top,
                left;

            if (!point) {
                return;
            }
            content = point.value.toString();

            tooltipOptions = deepExtend({}, tooltip.options, point.options.tooltip);

            if (tooltipOptions.template) {
                tooltipTemplate = template(tooltipOptions.template);
                content = tooltipTemplate({
                    value: point.value,
                    category: point.category,
                    series: point.series,
                    dataItem: point.dataItem,
                    percentage: point.percentage
                });
            } else if (tooltipOptions.format) {
                content = point.formatPointValue(tooltipOptions.format);
            }

            element.html(content);

            anchor = point.tooltipAnchor(element.outerWidth(), element.outerHeight());
            top = round(anchor.y + chartPadding.top) + "px";
            left = round(anchor.x + chartPadding.left) + "px";

            if (!tooltip.visible) {
                tooltip.element.css({ top: top, left: left });
            }

            tooltip.element
                .css({
                   backgroundColor: tooltipOptions.background,
                   borderColor: tooltipOptions.border.color || point.options.color,
                   color: tooltipOptions.color,
                   opacity: tooltipOptions.opacity,
                   borderWidth: tooltipOptions.border.width
                })
                .stop(true, true)
                .show()
                .animate({
                    left: left,
                    top: top
                }, options.animation.duration);

            tooltip.visible = true;
        },

        hide: function() {
            var tooltip = this;

            clearTimeout(tooltip.showTimeout);

            if (tooltip.visible) {
                tooltip.element.fadeOut();

                tooltip.point = null;
                tooltip.visible = false;
            }
        }
    });

    function sparseArrayMin(arr) {
        return sparseArrayLimits(arr).min;
    }

    function sparseArrayMax(arr) {
        return sparseArrayLimits(arr).max;
    }

    function sparseArrayLimits(arr) {
        var min = MAX_VALUE,
            max = MIN_VALUE,
            i,
            length = arr.length,
            n;

        for (i = 0; i < length; i++) {
            n = arr[i];
            if (defined(n)) {
                min = math.min(min, n);
                max = math.max(max, n);
            }
        }

        return { min: min, max: max };
    }

    function intersection(a1, a2, b1, b2) {
        var result,
            ua_t = (b2.x - b1.x) * (a1.y - b1.y) - (b2.y - b1.y) * (a1.x - b1.x),
            u_b = (b2.y - b1.y) * (a2.x - a1.x) - (b2.x - b1.x) * (a2.y - a1.y),
            ua;

        if (u_b != 0) {
            ua = (ua_t / u_b);

            result = new Point2D(
                a1.x + ua * (a2.x - a1.x),
                a1.y + ua * (a2.y - a1.y)
            );
        }

        return result;
    }

    function applySeriesDefaults(options, themeOptions) {
        var series = options.series,
            i,
            seriesLength = series.length,
            seriesType,
            seriesDefaults = options.seriesDefaults,
            commonDefaults = deepExtend({}, options.seriesDefaults),
            themeSeriesDefaults = themeOptions ? deepExtend({}, themeOptions.seriesDefaults) : {},
            commonThemeDefaults = deepExtend({}, themeSeriesDefaults);

        cleanupNestedSeriesDefaults(commonDefaults);
        cleanupNestedSeriesDefaults(commonThemeDefaults);

        for (i = 0; i < seriesLength; i++) {
            seriesType = series[i].type || options.seriesDefaults.type;

            series[i] = deepExtend(
                {},
                commonThemeDefaults,
                themeSeriesDefaults[seriesType],
                { tooltip: options.tooltip },
                commonDefaults,
                seriesDefaults[seriesType],
                series[i]);
        }
    }

    function cleanupNestedSeriesDefaults(seriesDefaults) {
        delete seriesDefaults.bar;
        delete seriesDefaults.column;
        delete seriesDefaults.line;
        delete seriesDefaults.verticalLine;
        delete seriesDefaults.pie;
        delete seriesDefaults.area;
        delete seriesDefaults.verticalArea;
        delete seriesDefaults.scatter;
        delete seriesDefaults.scatterLine;
    }

    function applySeriesColors(options) {
        var series = options.series,
            i,
            seriesLength = series.length,
            colors = options.seriesColors || [];

        for (i = 0; i < seriesLength; i++) {
            series[i].color = series[i].color || colors[i % colors.length];
        }
    }

    function applyAxisDefaults(options, themeOptions) {
        var themeAxisDefaults = deepExtend({}, (themeOptions || {}).axisDefaults);

        each(["category", "value", "x", "y"], function() {
            var axisName = this + "Axis",
                axes = [].concat(options[axisName]);

            axes = $.map(axes, function(axisOptions) {
                var axisColor = (axisOptions || {}).color;
                return deepExtend({},
                    themeAxisDefaults,
                    themeAxisDefaults[axisName],
                    options.axisDefaults,
                    { line: { color: axisColor }, labels: { color: axisColor }, title: { color: axisColor } },
                    axisOptions
                );
            });

            options[axisName] = axes.length > 1 ? axes : axes[0];
        });
    }

    function applyDefaults(options, themeOptions) {
        applyAxisDefaults(options, themeOptions);
        applySeriesDefaults(options, themeOptions);
    }

    function incrementSlot(slots, index, value) {
        slots[index] = (slots[index] || 0) + value;
    }

    function categoriesCount(series) {
        var seriesCount = series.length,
            categories = 0,
            i;

        for (i = 0; i < seriesCount; i++) {
            categories = math.max(categories, series[i].data.length);
        }

        return categories;
    }

    function sqr(value) {
        return value * value;
    }

    extend($.easing, {
        easeOutElastic: function (n, d, first, diff) {
            var s = 1.70158,
                p = 0,
                a = diff;

            if ( n === 0 ) {
                return first;
            }

            if ( n === 1) {
                return first + diff;
            }

            if (!p) {
                p = 0.5;
            }

            if (a < math.abs(diff)) {
                a=diff;
                s = p / 4;
            } else {
                s = p / (2 * math.PI) * math.asin(diff / a);
            }

            return a * math.pow(2,-10 * n) *
                   math.sin((n * 1 - s) * (1.1 * math.PI) / p) +
                   diff + first;
        }
    });

    function getField(field, row) {
        if (row === null) {
            return null;
        }

        var get = getField.cache[field] =
                getField.cache[field] || getter(field, true);

        return get(row);
    }
    getField.cache = {};

    // Exports ================================================================

    dataviz.ui.plugin(Chart);

    deepExtend(dataviz, {
        CLIP: CLIP,

        AreaChart: AreaChart,
        Bar: Bar,
        BarAnimationDecorator: BarAnimationDecorator,
        BarChart: BarChart,
        BarLabel: BarLabel,
        CategoricalPlotArea: CategoricalPlotArea,
        CategoryAxis: CategoryAxis,
        ClusterLayout: ClusterLayout,
        Highlight: Highlight,
        Legend: Legend,
        LineChart: LineChart,
        LinePoint: LinePoint,
        PieAnimation: PieAnimation,
        PieAnimationDecorator: PieAnimationDecorator,
        PieChart: PieChart,
        PiePlotArea: PiePlotArea,
        PieSegment: PieSegment,
        ScatterChart: ScatterChart,
        ScatterLineChart: ScatterLineChart,
        ShapeElement: ShapeElement,
        StackLayout: StackLayout,
        Tooltip: Tooltip,
        XYPlotArea: XYPlotArea,

        categoriesCount: categoriesCount
    });

})(jQuery);
