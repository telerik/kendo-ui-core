kendo_module({
    id: "chart",
    name: "Chart",
    category: "dataviz",
    description: "The Chart widget uses modern browser technologies to " +
                 "render high-quality data visualizations in the browser.",
    depends: [ "data", "userevents", "dataviz-core", "dataviz-svg" ]
});

(function ($, undefined) {
    // Imports ================================================================
    var each = $.each,
        isArray = $.isArray,
        map = $.map,
        math = Math,
        extend = $.extend,
        proxy = $.proxy,
        doc = document,

        kendo = window.kendo,
        Class = kendo.Class,
        Observable = kendo.Observable,
        DataSource = kendo.data.DataSource,
        Widget = kendo.ui.Widget,
        template = kendo.template,
        deepExtend = kendo.deepExtend,
        getter = kendo.getter,

        dataviz = kendo.dataviz,
        Axis = dataviz.Axis,
        AxisLabel = dataviz.AxisLabel,
        BarAnimation = dataviz.BarAnimation,
        Box2D = dataviz.Box2D,
        BoxElement = dataviz.BoxElement,
        ChartElement = dataviz.ChartElement,
        Color = dataviz.Color,
        ElementAnimation = dataviz.ElementAnimation,
        NumericAxis = dataviz.NumericAxis,
        Point2D = dataviz.Point2D,
        RootElement = dataviz.RootElement,
        Ring = dataviz.Ring,
        Text = dataviz.Text,
        TextBox = dataviz.TextBox,
        Title = dataviz.Title,
        animationDecorator = dataviz.animationDecorator,
        append = dataviz.append,
        autoFormat = dataviz.autoFormat,
        defined = dataviz.defined,
        getSpacing = dataviz.getSpacing,
        inArray = dataviz.inArray,
        interpolateValue = dataviz.interpolateValue,
        last = dataviz.last,
        round = dataviz.round,
        renderTemplate = dataviz.renderTemplate,
        uniqueId = dataviz.uniqueId;

    // Constants ==============================================================
    var NS = ".kendoChart",

        ABOVE = "above",
        AREA = "area",
        AUTO = "auto",
        FIT = "fit",
        AXIS_LABEL_CLICK = dataviz.AXIS_LABEL_CLICK,
        BAR = "bar",
        BAR_BORDER_BRIGHTNESS = 0.8,
        BELOW = "below",
        BLACK = "#000",
        BOTTOM = "bottom",
        BUBBLE = "bubble",
        CANDLESTICK = "candlestick",
        CATEGORY = "category",
        CENTER = "center",
        CHANGE = "change",
        CIRCLE = "circle",
        CLICK_NS = "click" + NS,
        CLIP = dataviz.CLIP,
        COLUMN = "column",
        COORD_PRECISION = dataviz.COORD_PRECISION,
        CSS_PREFIX = "k-",
        DATABOUND = "dataBound",
        DATE = "date",
        DATE_REGEXP = /^\/Date\((.*?)\)\/$/,
        DAYS = "days",
        DEFAULT_FONT = dataviz.DEFAULT_FONT,
        DEFAULT_HEIGHT = dataviz.DEFAULT_HEIGHT,
        DEFAULT_PRECISION = dataviz.DEFAULT_PRECISION,
        DEFAULT_WIDTH = dataviz.DEFAULT_WIDTH,
        DEGREE = math.PI / 180,
        DONUT = "donut",
        DONUT_SECTOR_ANIM_DELAY = 50,
        DRAG = "drag",
        DRAG_END = "dragEnd",
        DRAG_START = "dragStart",
        FADEIN = "fadeIn",
        GLASS = "glass",
        HOURS = "hours",
        INITIAL_ANIMATION_DURATION = dataviz.INITIAL_ANIMATION_DURATION,
        INSIDE_BASE = "insideBase",
        INSIDE_END = "insideEnd",
        INTERPOLATE = "interpolate",
        LEFT = "left",
        LINE = "line",
        LINE_MARKER_SIZE = 8,
        MAX_VALUE = Number.MAX_VALUE,
        MIN_VALUE = -Number.MAX_VALUE,
        MINUTES = "minutes",
        MONTHS = "months",
        MOUSEMOVE_TRACKING = "mousemove.tracking",
        MOUSEOVER_NS = "mouseover" + NS,
        MOUSEMOVE_NS = "mousemove" + NS,
        MOUSEWHEEL_DELAY = 150,
        MOUSEWHEEL_NS = "DOMMouseScroll" + NS + " mousewheel" + NS,
        OHLC = "ohlc",
        OUTSIDE_END = "outsideEnd",
        OUTLINE_SUFFIX = "_outline",
        PIE = "pie",
        PIE_SECTOR_ANIM_DELAY = 70,
        PLOT_AREA_CLICK = "plotAreaClick",
        RIGHT = "right",
        ROUNDED_BEVEL = "roundedBevel",
        ROUNDED_GLASS = "roundedGlass",
        SCATTER = "scatter",
        SCATTER_LINE = "scatterLine",
        SELECT_START = "selectStart",
        SELECT = "select",
        SELECT_END = "selectEnd",
        SERIES_CLICK = "seriesClick",
        SERIES_HOVER = "seriesHover",
        STRING = "string",
        TIME_PER_MINUTE = 60000,
        TIME_PER_HOUR = 60 * TIME_PER_MINUTE,
        TIME_PER_DAY = 24 * TIME_PER_HOUR,
        TIME_PER_WEEK = 7 * TIME_PER_DAY,
        TIME_PER_MONTH = 31 * TIME_PER_DAY,
        TIME_PER_YEAR = 365 * TIME_PER_DAY,
        TIME_PER_UNIT = {
            "years": TIME_PER_YEAR,
            "months": TIME_PER_MONTH,
            "weeks": TIME_PER_WEEK,
            "days": TIME_PER_DAY,
            "hours": TIME_PER_HOUR,
            "minutes": TIME_PER_MINUTE
        },
        TOP = "top",
        TOOLTIP_ANIMATION_DURATION = 150,
        TOOLTIP_OFFSET = 5,
        TOOLTIP_SHOW_DELAY = 100,
        TOUCH_START_NS = "touchstart" + NS,
        TRIANGLE = "triangle",
        VALUE = "value",
        VERTICAL_AREA = "verticalArea",
        VERTICAL_LINE = "verticalLine",
        WEEKS = "weeks",
        WHITE = "#fff",
        X = "x",
        Y = "y",
        YEARS = "years",
        ZERO = "zero",
        ZOOM_START = "zoomStart",
        ZOOM = "zoom",
        ZOOM_END = "zoomEnd",

        CATEGORICAL_CHARTS = [
            BAR, COLUMN, LINE, VERTICAL_LINE, AREA, VERTICAL_AREA, CANDLESTICK, OHLC
        ],
        XY_CHARTS = [
            SCATTER, SCATTER_LINE, BUBBLE
        ],
        BASE_UNITS = [
            MINUTES, HOURS, DAYS, WEEKS, MONTHS, YEARS
        ];

    var DateLabelFormats = {
        minutes: "HH:mm",
        hours: "HH:mm",
        days: "M/d",
        weeks: "M/d",
        months: "MMM 'yy",
        years: "yyyy"
    };

    // Chart ==================================================================
    var Chart = Widget.extend({
        init: function(element, userOptions) {
            var chart = this,
                options,
                themeOptions,
                themes = dataviz.ui.themes || {},
                theme,
                themeName;

            Widget.fn.init.call(chart, element);
            options = deepExtend({}, chart.options, userOptions);

            chart.element
                .addClass("k-chart")
                .css("position", "relative");

            chart._originalOptions = deepExtend({}, options);

            themeName = options.theme;
            theme = themes[themeName] || themes[themeName.toLowerCase()];
            themeOptions = themeName && theme ? theme.chart : {};

            resolveAxisAliases(options);
            chart._applyDefaults(options, themeOptions);

            chart.options = deepExtend({}, themeOptions, options);

            applySeriesColors(chart.options);

            chart.bind(chart.events, chart.options);

            chart.wrapper = chart.element;

            chart._initDataSource(userOptions);

            kendo.notify(chart, dataviz.ui);
        },

        _initDataSource: function(userOptions) {
            var chart = this,
                dataSourceOptions = (userOptions || {}).dataSource;

            chart._dataChangeHandler = proxy(chart._onDataChanged, chart);

            chart.dataSource = DataSource
                .create(dataSourceOptions)
                .bind(CHANGE, chart._dataChangeHandler);

            chart._redraw();
            chart._attachEvents();

            if (dataSourceOptions && chart.options.autoBind) {
                chart.dataSource.fetch();
            }
        },

        setDataSource: function(dataSource) {
            var chart = this;

            chart.dataSource.unbind(CHANGE, chart._dataChangeHandler);
            chart.dataSource = dataSource;

            dataSource.bind(CHANGE, chart._dataChangeHandler);

            if (chart.options.autoBind) {
                dataSource.fetch();
            }
        },

        events:[
            DATABOUND,
            SERIES_CLICK,
            SERIES_HOVER,
            AXIS_LABEL_CLICK,
            PLOT_AREA_CLICK,
            DRAG_START,
            DRAG,
            DRAG_END,
            ZOOM_START,
            ZOOM,
            ZOOM_END,
            SELECT_START,
            SELECT,
            SELECT_END
        ],

        items: function() {
            return $();
        },

        options: {
            name: "Chart",
            theme: "default",
            chartArea: {},
            legend: {
                visible: true,
                labels: {}
            },
            categoryAxis: {},
            autoBind: true,
            seriesDefaults: {
                type: COLUMN,
                data: [],
                groupNameTemplate: "#= group.value + (kendo.dataviz.defined(series.name) ? ': ' + series.name : '') #",
                labels: {}
            },
            series: [],
            tooltip: {
                visible: false
            },
            transitions: true,
            valueAxis: {},
            plotArea: {},
            title: {},
            xAxis: {},
            yAxis: {}
        },

        refresh: function() {
            var chart = this;

            chart._applyDefaults(chart.options);

            delete chart._sourceSeries;
            chart._onDataChanged();
        },

        redraw: function(paneName) {
            var chart = this,
                pane,
                plotArea;

            chart._applyDefaults(chart.options);

            if (paneName) {
                plotArea = chart._model._plotArea;
                pane = plotArea.findPane(paneName);
                plotArea.redraw(pane);
            } else {
                chart._redraw();
            }
        },

        _redraw: function() {
            var chart = this,
                options = chart.options,
                element = chart.element,
                model = chart._model = chart._getModel(),
                viewType = dataviz.ui.defaultView(),
                view;

            chart._plotArea = model._plotArea;

            if (viewType) {
                view = chart._view = viewType.fromModel(model);

                chart._viewElement = view.renderTo(element[0]);
                chart._tooltip = new dataviz.Tooltip(element, options.tooltip);
                chart._highlight = new Highlight(view, chart._viewElement);
            }
        },

        svg: function() {
            var model = this._getModel(),
                view = dataviz.SVGView.fromModel(model);

            return view.render();
        },

        _applyDefaults: function(options, themeOptions) {
            applyAxisDefaults(options, themeOptions);
            applySeriesDefaults(options, themeOptions);
        },

        _getModel: function() {
            var chart = this,
                options = chart.options,
                element = chart.element,
                height = math.round(element.innerHeight()),
                width = math.round(element.innerWidth()),
                model = new RootElement(deepExtend({
                    width: width || DEFAULT_WIDTH,
                    height: height || DEFAULT_HEIGHT,
                    transitions: options.transitions
                    }, options.chartArea)),
                plotArea;

            model.parent = chart;

            Title.buildTitle(options.title, model);

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
                donutSeries = [],
                plotArea;

            for (i = 0; i < length; i++) {
                currentSeries = series[i];

                if (inArray(currentSeries.type, CATEGORICAL_CHARTS)) {
                    categoricalSeries.push(currentSeries);
                } else if (inArray(currentSeries.type, XY_CHARTS)) {
                    xySeries.push(currentSeries);
                } else if (currentSeries.type === PIE) {
                    pieSeries.push(currentSeries);
                } else if (currentSeries.type === DONUT) {
                    donutSeries.push(currentSeries);
                }
            }

            if (pieSeries.length > 0) {
                plotArea = new PiePlotArea(pieSeries, options);
            } else if (donutSeries.length > 0) {
                plotArea = new DonutPlotArea(donutSeries, options);
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

            element.on(CLICK_NS, proxy(chart._click, chart));
            element.on(MOUSEOVER_NS, proxy(chart._mouseover, chart));
            element.on(MOUSEMOVE_NS, proxy(chart._mousemove, chart));
            element.on(MOUSEWHEEL_NS, proxy(chart._mousewheel, chart));
            element.on(TOUCH_START_NS, proxy(chart._tap, chart));

            if (kendo.UserEvents) {
                chart._userEvents = new kendo.UserEvents(element, {
                    global: true,
                    threshold: 5,
                    filter: ":not(.k-selector)",
                    multiTouch: false,
                    start: proxy(chart._start, chart),
                    move: proxy(chart._move, chart),
                    end: proxy(chart._end, chart)
                });
            }
        },

        _start: function(e) {
            var chart = this,
                events = chart._events;

            if (defined(events[DRAG_START] || events[DRAG] || events[DRAG_END])) {
                chart._startNavigation(e, DRAG_START);
            }
        },

        _move: function(e) {
            var chart = this,
                state = chart._navState,
                axes,
                ranges = {},
                i, currentAxis, axisName, axis, delta;

            if (state) {
                e.preventDefault();

                axes = state.axes;

                for (i = 0; i < axes.length; i++) {
                    currentAxis = axes[i];
                    axisName = currentAxis.options.name;
                    if (axisName) {
                        axis = currentAxis.options.vertical ? e.y : e.x;
                        delta = axis.startLocation - axis.location;

                        if (delta !== 0) {
                            ranges[currentAxis.options.name] =
                                currentAxis.translateRange(delta);
                        }
                    }
                }

                state.axisRanges = ranges;
                chart.trigger(DRAG, {
                   axisRanges: ranges,
                   originalEvent: e
                });
            }
        },

        _end: function(e) {
            this._endNavigation(e, DRAG_END);
        },

        _mousewheel: function(e) {
            var chart = this,
                origEvent = e.originalEvent,
                prevented,
                delta = 0,
                totalDelta,
                state = chart._navState,
                axes,
                i,
                currentAxis,
                axisName,
                ranges = {};

            if (origEvent.wheelDelta) {
                delta = -origEvent.wheelDelta / 120;
                delta = delta > 0 ? math.ceil(delta) : math.floor(delta);
            }

            if (origEvent.detail) {
                delta = round(origEvent.detail / 3);
            }

            if (!state) {
                prevented = chart._startNavigation(origEvent, ZOOM_START);
                if (!prevented) {
                    state = chart._navState;
                }
            }

            if (state) {
                totalDelta = state.totalDelta || delta;
                state.totalDelta = totalDelta + delta;

                axes = chart._navState.axes;

                for (i = 0; i < axes.length; i++) {
                    currentAxis = axes[i];
                    axisName = currentAxis.options.name;
                    if (axisName) {
                        ranges[axisName] = currentAxis.scaleRange(totalDelta);
                    }
                }

                chart.trigger(ZOOM, {
                    delta: delta,
                    axisRanges: ranges,
                    originalEvent: e
                });

                if (chart._mwTimeout) {
                    clearTimeout(chart._mwTimeout);
                }

                chart._mwTimeout = setTimeout(function() {
                    chart._endNavigation(e, ZOOM_END);
                }, MOUSEWHEEL_DELAY);
            }
        },

        _startNavigation: function(e, chartEvent) {
            var chart = this,
                coords = chart._eventCoordinates(e),
                plotArea = chart._model._plotArea,
                pane = plotArea.findPointPane(coords),
                axes = plotArea.axes.slice(0),
                i,
                currentAxis,
                inAxis = false,
                prevented;

            if (!pane) {
                return;
            }

            for (i = 0; i < axes.length; i++) {
                currentAxis = axes[i];
                if (currentAxis.box.containsPoint(coords)) {
                    inAxis = true;
                    break;
                }
            }

            if (!inAxis && plotArea.backgroundBox().containsPoint(coords)) {
                prevented = chart.trigger(chartEvent, {
                    axisRanges: axisRanges(axes),
                    originalEvent: e
                });

                if(prevented) {
                    chart._userEvents.cancel();
                } else {
                    chart._suppressHover = true;
                    chart._unsetActivePoint();
                    chart._navState = {
                        pane: pane,
                        axes: axes
                    };
                }
            }
        },

        _endNavigation: function(e, chartEvent) {
            var chart = this;

            if (chart._navState) {
                chart.trigger(chartEvent, {
                    axisRanges: chart._navState.axisRanges,
                    originalEvent: e
                });
                chart._suppressHover = false;
                chart._navState = null;
            }
        },

        _getChartElement: function(e) {
            var chart = this,
                modelId = $(e.target).data("modelId"),
                model = chart._model,
                element;

            if (modelId) {
                element = model.modelMap[modelId];
            }

            if (element && element.aliasFor) {
                element = element.aliasFor(e, chart._eventCoordinates(e));
            }

            return element;
        },

        _eventCoordinates: function(e) {
            var chart = this,
                isTouch = defined((e.x || {}).client),
                clientX = isTouch ? e.x.client : e.clientX,
                clientY = isTouch ? e.y.client : e.clientY;

            return chart._toModelCoordinates(clientX, clientY);
        },

        _toModelCoordinates: function(clientX, clientY) {
            var element = this.element,
                offset = element.offset(),
                paddingLeft = parseInt(element.css("paddingLeft"), 10),
                paddingTop = parseInt(element.css("paddingTop"), 10),
                win = $(window);

            return {
                x: clientX - offset.left - paddingLeft + win.scrollLeft(),
                y: clientY - offset.top - paddingTop + win.scrollTop()
            };
        },

        _click: function(e) {
            var chart = this,
                element = chart._getChartElement(e);

            while (element) {
                if (element.click) {
                    element.click(chart, e);
                }

                element = element.parent;
            }
        },

        _startHover: function(e) {
            var chart = this,
                tooltip = chart._tooltip,
                highlight = chart._highlight,
                tooltipOptions,
                point;

            if (chart._suppressHover || !highlight || highlight.overlayElement === e.target) {
                return;
            }

            point = chart._getChartElement(e);
            if (point && point.hover) {
                point.hover(chart, e);
                chart._activePoint = point;

                tooltipOptions = deepExtend({}, chart.options.tooltip, point.options.tooltip);
                if (tooltipOptions.visible) {
                    tooltip.show(point);
                }

                highlight.show(point);
                return true;
            }
        },

        _mouseover: function(e) {
            var chart = this;

            if (chart._startHover(e)) {
                $(doc.body).on(MOUSEMOVE_TRACKING, proxy(chart._mouseMoveTracking, chart));
            }
        },

        _mouseMoveTracking: function(e) {
            var chart = this,
                tooltip = chart._tooltip,
                highlight = chart._highlight,
                coords = chart._eventCoordinates(e),
                point = chart._activePoint,
                tooltipOptions,
                owner,
                seriesPoint;

            if (chart._plotArea.box.containsPoint(coords)) {
                if (point && point.series && (point.series.type === LINE || point.series.type === AREA)) {
                    owner = point.parent;
                    seriesPoint = owner.getNearestPoint(coords.x, coords.y, point.seriesIx);
                    if (seriesPoint && seriesPoint != point) {
                        seriesPoint.hover(chart, e);
                        chart._activePoint = seriesPoint;

                        tooltipOptions = deepExtend({}, chart.options.tooltip, point.options.tooltip);
                        if (tooltipOptions.visible) {
                            tooltip.show(seriesPoint);
                        }
                        highlight.show(seriesPoint);
                    }
                }
            } else {
                $(doc.body).off(MOUSEMOVE_TRACKING);
                chart._unsetActivePoint();
            }
        },

        _mousemove: function(e) {
            var chart = this,
                plotArea = chart._plotArea,
                crosshairs = plotArea.crosshairs,
                length = crosshairs.length,
                coords = chart._eventCoordinates(e),
                point = Point2D(coords.x, coords.y),
                i, crosshair;

            if (length) {
                for (i = 0; i < length; i++) {
                    crosshair = crosshairs[i];
                    if (plotArea.backgroundBox().containsPoint(coords)) {
                        crosshair.showAt(point);
                    } else {
                        crosshair.hide();
                    }
                }
            }
        },

        _unsetActivePoint: function() {
            var chart = this,
                tooltip = chart._tooltip,
                highlight = chart._highlight;

            chart._activePoint = null;

            if (tooltip) {
                tooltip.hide();
            }

            if (highlight) {
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
                categoriesData = grouped ? data[0].items : data,
                processedSeries = [],
                currentSeries;

            for (seriesIx = 0; seriesIx < seriesLength; seriesIx++) {
                currentSeries = series[seriesIx];

                if (chart.isBindable(currentSeries)) {
                    if (currentSeries.autoBind !== false) {
                        currentSeries.data = data;
                    }

                    append(processedSeries, grouped ?
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

            chart._bindCategories(categoriesData);

            chart.trigger(DATABOUND);
            chart._redraw();
        },

        _bindCategories: function(data) {
            var chart = this,
                options = chart.options,
                definitions = [].concat(options.categoryAxis),
                axisIx,
                axis;

            for (axisIx = 0; axisIx < definitions.length; axisIx++) {
                axis = definitions[axisIx];
                if (axis.autoBind !== false) {
                    chart._bindCategoryAxis(axis, data);
                }
            }
        },

        _bindCategoryAxis: function(axis, data) {
            var categoryIx,
                category,
                row;

            if (axis.field) {
                axis.categories = [];
                for (categoryIx = 0; categoryIx < data.length; categoryIx++) {
                    row = data[categoryIx];

                    category = getField(axis.field, row);
                    if (categoryIx === 0) {
                        axis.categories = [category];
                        axis.dataItems = [row];
                    } else {
                        axis.categories.push(category);
                        axis.dataItems.push(row);
                    }
                }
            }
        },

        isBindable: function(series) {
            var valueFields = valueFieldsByChartType(series.type),
                result = true,
                field, i;

            for (i = 0; i < valueFields.length; i++) {
                field = valueFields[i];
                if (field === VALUE) {
                    field = "field";
                } else {
                    field = field + "Field";
                }

                if (!series[field]) {
                    result = false;
                    break;
                }
            }

            return result;
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
                seriesClone.data = group.items;

                if (nameTemplate) {
                    seriesClone.name = nameTemplate({
                        series: seriesClone, group: group
                    });
                }
            }

            return groupSeries;
        },

        _tap: function(e) {
            var chart = this;

            if (!chart._startHover(e)) {
                chart._unsetActivePoint();
            }

            chart._click(e);
        },

        destroy: function() {
            var chart = this,
                dataSource = chart.dataSource;

            chart.element.off(NS);
            dataSource.unbind(CHANGE, chart._dataChangeHandler);

            if (chart._userEvents) {
                chart._userEvents.destroy();
            }

            Widget.fn.destroy.call(chart);
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
        init: function(options) {
            var axis = this;

            Axis.fn.init.call(axis, options);

            options = axis.options;
            options.categories = options.categories.slice(0);
        },

        options: {
            type: CATEGORY,
            categories: [],
            vertical: false,
            majorGridLines: {
                visible: false,
                width: 1,
                color: BLACK
            },
            zIndex: 1,
            justified: false
        },

        range: function() {
            return { min: 0, max: this.options.categories.length };
        },

        getTickPositions: function(itemsCount) {
            var axis = this,
                options = axis.options,
                vertical = options.vertical,
                justified = options.justified,
                lineBox = axis.lineBox(),
                size = vertical ? lineBox.height() : lineBox.width(),
                intervals = itemsCount - (justified ? 1 : 0),
                step = size / intervals,
                dim = vertical ? Y : X,
                pos = lineBox[dim + 1],
                positions = [],
                i;

            for (i = 0; i < itemsCount; i++) {
                positions.push(round(pos, COORD_PRECISION));
                pos += step;
            }

            if (!justified) {
                positions.push(lineBox[dim + 2]);
            }

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
                majorTicks = axis.getMajorTickPositions(),
                reverse = options.reverse,
                justified = options.justified,
                valueAxis = options.vertical ? Y : X,
                lineBox = axis.lineBox(),
                lineStart = lineBox[valueAxis + (reverse ? 2 : 1)],
                lineEnd = lineBox[valueAxis + (reverse ? 1 : 2)],
                slotBox = lineBox.clone(),
                intervals = math.max(1, majorTicks.length - (justified ? 0 : 1)),
                p1,
                p2,
                slotSize;

            from = defined(from) ? from : 0;
            to = defined(to) ? to : from;
            from = clipValue(from, 0, intervals);
            to = clipValue(to - 1, from, intervals);
            // Fixes transient bug caused by iOS 6.0 JIT
            // (one can never be too sure)
            to = math.max(from, to);

            p1 = from === 0 ? lineStart : majorTicks[from];
            p2 = justified ? p1 : majorTicks[to];
            slotSize = to - from;

            if (slotSize > 0 || (from === to)) {
                p2 = majorTicks[to + 1] || lineEnd;
            }

            if (justified) {
                if (from === intervals) {
                    p1 = p2;
                } else {
                    p2 = p1;
                }
            }

            slotBox[valueAxis + 1] = reverse ? p2 : p1;
            slotBox[valueAxis + 2] = reverse ? p1 : p2;

            return slotBox;
        },

        getCategoryIndex: function(point) {
            var axis = this,
                options = axis.options,
                reverse = options.reverse,
                vertical = options.vertical,
                valueAxis = vertical ? Y : X,
                lineBox = axis.lineBox(),
                lineStart = lineBox[valueAxis + 1],
                lineEnd = lineBox[valueAxis + 2],
                position = point[valueAxis],
                majorTicks = axis.getMajorTickPositions(),
                tickPos,
                nextTickPos,
                i,
                categoryIx;

            if (position < lineStart || position > lineEnd) {
                return null;
            }

            for (i = 0; i < majorTicks.length; i++) {
                tickPos = majorTicks[i];
                nextTickPos = majorTicks[i + 1];

                if (!defined(nextTickPos)) {
                    nextTickPos = reverse ? lineStart : lineEnd;
                }

                if (reverse) {
                    tickPos = nextTickPos;
                    nextTickPos = majorTicks[i];
                }

                if (options.justified && position === nextTickPos) {
                    categoryIx = math.max(0, vertical ? majorTicks.length - i - 1 : i + 1);
                    break;
                }

                if (position >= tickPos && position <= nextTickPos) {
                    categoryIx = math.max(0, vertical ? majorTicks.length - i - 2: i);
                    break;
                }
            }

            return categoryIx;
        },

        getCategory: function(point) {
            var index = this.getCategoryIndex(point);

            if (index === null) {
                return null;
            }
            return this.options.categories[index];
        },

        translateRange: function(delta) {
            var axis = this,
                options = axis.options,
                lineBox = axis.lineBox(),
                size = options.vertical ? lineBox.height() : lineBox.width(),
                range = options.categories.length,
                scale = size / range,
                offset = round(delta / scale, DEFAULT_PRECISION);

            return {
                min: offset,
                max: range + offset
            };
        },

        scaleRange: function(scale) {
            var axis = this,
                options = axis.options,
                range = options.categories.length,
                delta = scale * range;

            return {
                min: -delta,
                max: range + delta
            };
        },

        labelsCount: function() {
            return this.options.categories.length;
        },

        createAxisLabel: function(index, labelOptions) {
            var axis = this,
                options = axis.options,
                dataItem = options.dataItems ? options.dataItems[index] : null,
                category = defined(options.categories[index]) ? options.categories[index] : "";

            return new AxisLabel(category, index, dataItem, labelOptions);
        }
    });

    var AxisDateLabel = AxisLabel.extend({
        formatValue: function(value, options) {
            return kendo.toString(value, options.format, options.culture);
        }
    });

    var DateCategoryAxis = CategoryAxis.extend({
        init: function(options) {
            var axis = this,
                baseUnit,
                useDefault;

            options = options || {};

            options = deepExtend({
                roundToBaseUnit: true
            }, options, {
                min: toDate(options.min),
                max: toDate(options.max)
            });

            if (options.categories && options.categories.length > 0) {
                baseUnit = (options.baseUnit || "").toLowerCase();
                useDefault = baseUnit !== FIT && !inArray(baseUnit, BASE_UNITS);
                if (useDefault) {
                    options.baseUnit = axis.defaultBaseUnit(options);
                }

                if (baseUnit === FIT || options.baseUnitStep === AUTO) {
                    axis.autoBaseUnit(options);
                }

                axis.groupCategories(options);
            }

            CategoryAxis.fn.init.call(axis, options);
        },

        options: {
            type: DATE,
            labels: {
                dateFormats: DateLabelFormats
            },
            autoBaseUnitSteps: {
                minutes: [1, 2, 5, 15, 30],
                hours: [1, 2, 3],
                days: [1, 2, 3],
                weeks: [1, 2],
                months: [1, 2, 3, 6],
                years: [1, 2, 3, 5, 10, 25, 50]
            },
            maxDateGroups: 10
        },

        translateRange: function(delta) {
            var axis = this,
                range = CategoryAxis.fn.translateRange.call(axis, delta),
                options = axis.options,
                baseUnit = options.baseUnit,
                offset = math.round(range.min),
                weekStartDay = options.weekStartDay;

            return {
                min: addDuration(options.min, offset, baseUnit, weekStartDay),
                max: addDuration(options.max, offset, baseUnit, weekStartDay)
            };
        },

        scaleRange: function(delta) {
            var axis = this,
                options = axis.options,
                rounds = math.abs(delta),
                from = options.min,
                to = options.max,
                range,
                step;

            while (rounds--) {
                range = dateDiff(from, to);
                step = math.round(range * 0.1);
                if (delta < 0) {
                    from = addTicks(from, step);
                    to = addTicks(to, -step);
                } else {
                    from = addTicks(from, -step);
                    to = addTicks(to, step);
                }
            }

            return { min: from, max: to };
        },

        defaultBaseUnit: function(options) {
            var categories = options.categories,
                count = defined(categories) ? categories.length : 0,
                categoryIx,
                cat,
                diff,
                minDiff = MAX_VALUE,
                lastCat,
                unit;

            for (categoryIx = 0; categoryIx < count; categoryIx++) {
                cat = toDate(categories[categoryIx]);

                if (cat && lastCat) {
                    diff = dateDiff(cat, lastCat);
                    if (diff > 0) {
                        minDiff = math.min(minDiff, diff);

                        if (minDiff >= TIME_PER_YEAR) {
                            unit = YEARS;
                        } else if (minDiff >= TIME_PER_MONTH - TIME_PER_DAY * 3) {
                            unit = MONTHS;
                        } else if (minDiff >= TIME_PER_WEEK) {
                            unit = WEEKS;
                        } else if (minDiff >= TIME_PER_DAY) {
                            unit = DAYS;
                        } else if (minDiff >= TIME_PER_HOUR) {
                            unit = HOURS;
                        } else {
                            unit = MINUTES;
                        }
                    }
                }

                lastCat = cat;
            }

            return unit || DAYS;
        },

        range: function(options) {
            options = options || this.options;

            var categories = toDate(options.categories),
                autoUnit = options.baseUnit === FIT,
                baseUnit = autoUnit ? BASE_UNITS[0] : options.baseUnit,
                min = toTime(options.min),
                max = toTime(options.max),
                categoryLimits = sparseArrayLimits(categories),
                minCategory = toTime(categoryLimits.min),
                maxCategory = toTime(categoryLimits.max);

            if (options.roundToBaseUnit) {
                return { min: addDuration(min || minCategory, 0, baseUnit, options.weekStartDay),
                         max: addDuration(max || maxCategory, 1, baseUnit, options.weekStartDay) };
            } else {
                return { min: toDate(min || minCategory),
                         max: toDate(max || maxCategory) };
            }
        },

        autoBaseUnit: function(options) {
            var axis = this,
                range = axis.range(options),
                autoUnit = options.baseUnit === FIT,
                autoUnitIx = 0,
                baseUnit = autoUnit ? BASE_UNITS[autoUnitIx++] : options.baseUnit,
                span = range.max - range.min,
                units = span / TIME_PER_UNIT[baseUnit],
                totalUnits = units,
                maxDateGroups = options.maxDateGroups || axis.options.maxDateGroups,
                autoBaseUnitSteps = deepExtend(
                    {}, axis.options.autoBaseUnitSteps, options.autoBaseUnitSteps
                ),
                unitSteps,
                step,
                nextStep;

            while (units > maxDateGroups) {
                unitSteps = unitSteps || autoBaseUnitSteps[baseUnit].slice(0);
                nextStep = unitSteps.shift();

                if (nextStep) {
                    step = nextStep;
                    units = totalUnits / step;
                } else if (autoUnit) {
                    baseUnit = BASE_UNITS[autoUnitIx++] || last(BASE_UNITS);
                    totalUnits = span / TIME_PER_UNIT[baseUnit];
                    unitSteps = null;
                } else {
                    if (units > maxDateGroups) {
                        step = math.ceil(totalUnits / maxDateGroups);
                    }
                    break;
                }
            }

            options.baseUnitStep = step;
            options.baseUnit = baseUnit;
        },

        getMajorTickPositions: function() {
            var axis = this,
                options = axis.options,
                categories = options.categories,
                positions = [];

            if (options.roundToBaseUnit || categories.length === 0) {
                positions = CategoryAxis.fn.getMajorTickPositions.call(axis);
            } else {
                var vertical = options.vertical,
                    reverse = options.reverse,
                    lineBox = axis.lineBox(),
                    lineSize = vertical ? lineBox.height() : lineBox.width(),
                    startTime = categories[0].getTime(),
                    range = axis.range(axis.options),
                    timeRange = range.max - range.min,
                    scale = lineSize / timeRange,
                    divisions = categories.length,
                    dir = (vertical ? -1 : 1) * (reverse ? -1 : 1),
                    startEdge = dir === 1 ? 1 : 2,
                    endEdge = dir === 1 ? 2 : 1,
                    startPos = lineBox[(vertical ? Y : X) + startEdge],
                    endPos = lineBox[(vertical ? Y : X) + endEdge],
                    pos = startPos,
                    i,
                    timePos;

                for (i = 0; i < divisions; i++) {
                    timePos = categories[i] - startTime;
                    pos = startPos + timePos * scale * dir;
                    positions.push(round(pos, COORD_PRECISION));
                }

                if (last(positions) !== endPos) {
                    positions.push(endPos);
                }
            }

            return positions;
        },

        groupCategories: function(options) {
            var axis = this,
                categories = toDate(options.categories),
                baseUnit = options.baseUnit,
                baseUnitStep = options.baseUnitStep || 1,
                range = axis.range(options),
                round = options.roundToBaseUnit,
                end,
                date,
                nextDate,
                groups = [],
                categoryMap = axis.categoryMap = [],
                categoryIndicies,
                lastCategoryIndicies = [],
                categoryIx,
                categoryDate;

            end = round ?
                addDuration(range.max, baseUnitStep - 1, baseUnit, options.weekStartDay) :
                range.max;

            if (dateEquals(range.min, range.max)) {
                end = toDate(toTime(end) + 1);
            }

            for (date = range.min; date < end; date = nextDate) {
                nextDate = addDuration(date, baseUnitStep, baseUnit, options.weekStartDay);

                groups.push(date);
                categoryIndicies = [];

                for (categoryIx = lteDateIndex(categories, date);
                     categoryIx < categories.length; categoryIx++) {

                    categoryDate = categories[categoryIx];
                    if (categoryDate && categoryDate >= date) {
                        if (categoryDate < nextDate) {
                            if (options.justified && dateEquals(categoryDate, end)) {
                                lastCategoryIndicies.push(categoryIx);
                            } else {
                                categoryIndicies.push(categoryIx);
                            }
                        } else if (!round && dateEquals(nextDate, end)) {
                            lastCategoryIndicies.push(categoryIx);
                        } else {
                            break;
                        }
                    }
                }

                categoryMap.push(categoryIndicies);
            }

            if (lastCategoryIndicies.length) {
                groups.push(end);
                categoryMap.push(lastCategoryIndicies);
            }

            if (!options.max && (last(categoryMap) || []).length === 0) {
                // Drop the last group if the user has not requested it
                categoryMap.pop();
                groups.pop();
            }

            options.min = groups[0];
            options.max = round ? last(groups) : end;
            options.categories = groups;
        },

        createAxisLabel: function(index, labelOptions) {
            var options = this.options,
                dataItem = options.dataItems ? options.dataItems[index] : null,
                date = options.categories[index],
                baseUnit = options.baseUnit,
                visible = true,
                unitFormat = labelOptions.dateFormats[baseUnit];

            if (options.justified) {
                var roundedDate = floorDate(date, baseUnit, options.weekStartDay);
                visible = dateEquals(roundedDate, date);
            }

            labelOptions = deepExtend({ format: unitFormat }, labelOptions, { visible: visible });
            return new AxisDateLabel(date, index, dataItem, labelOptions);
        }
    });

    var DateValueAxis = Axis.extend({
        init: function(seriesMin, seriesMax, options) {
            var axis = this;

            options = options || {};

            deepExtend(options, {
                min: toDate(options.min),
                max: toDate(options.max),
                axisCrossingValue: toDate(
                    options.axisCrossingValues || options.axisCrossingValue
                )
            });

            options = axis.applyDefaults(toDate(seriesMin), toDate(seriesMax), options);

            Axis.fn.init.call(axis, options);
        },

        options: {
            type: DATE,
            labels: {
                dateFormats: DateLabelFormats
            }
        },

        applyDefaults: function(seriesMin, seriesMax, options) {
            var axis = this,
                min = options.min || seriesMin,
                max = options.max || seriesMax,
                baseUnit = options.baseUnit || axis.timeUnits(max - min),
                baseUnitTime = TIME_PER_UNIT[baseUnit],
                autoMin = floorDate(toTime(min) - 1, baseUnit),
                autoMax = ceilDate(toTime(max) + 1, baseUnit),
                userMajorUnit = options.majorUnit ? options.majorUnit : undefined,
                majorUnit = userMajorUnit || dataviz.ceil(
                                dataviz.autoMajorUnit(autoMin.getTime(), autoMax.getTime()),
                                baseUnitTime
                            ) / baseUnitTime,
                actualUnits = duration(autoMin, autoMax, baseUnit),
                totalUnits = dataviz.ceil(actualUnits, majorUnit),
                unitsToAdd = totalUnits - actualUnits,
                head = math.floor(unitsToAdd / 2),
                tail = unitsToAdd - head;

            if (!options.baseUnit) {
                delete options.baseUnit;
            }

            return deepExtend({
                    baseUnit: baseUnit,
                    min: addDuration(autoMin, -head, baseUnit),
                    max: addDuration(autoMax, tail, baseUnit),
                    minorUnit: majorUnit / 5
                }, options, {
                    majorUnit: majorUnit
                }
            );
        },

        range: function() {
            var options = this.options;
            return { min: options.min, max: options.max };
        },

        getDivisions: function(stepValue) {
            var options = this.options;

            return math.floor(
                duration(options.min, options.max, options.baseUnit) / stepValue + 1
            );
        },

        getTickPositions: function(stepValue) {
            var axis = this,
                options = axis.options,
                vertical = options.vertical,
                reverse = options.reverse,
                lineBox = axis.lineBox(),
                lineSize = vertical ? lineBox.height() : lineBox.width(),
                timeRange = duration(options.min, options.max, options.baseUnit),
                scale = lineSize / timeRange,
                step = stepValue * scale,
                divisions = axis.getDivisions(stepValue),
                dir = (vertical ? -1 : 1) * (reverse ? -1 : 1),
                startEdge = dir === 1 ? 1 : 2,
                pos = lineBox[(vertical ? Y : X) + startEdge],
                positions = [],
                i;

            for (i = 0; i < divisions; i++) {
                positions.push(round(pos, COORD_PRECISION));
                pos = pos + step * dir;
            }

            return positions;
        },

        getMajorTickPositions: function() {
            var axis = this;

            return axis.getTickPositions(axis.options.majorUnit);
        },

        getMinorTickPositions: function() {
            var axis = this;

            return axis.getTickPositions(axis.options.minorUnit);
        },

        getSlot: function(a, b) {
            return NumericAxis.fn.getSlot.call(
                this, toDate(a), toDate(b)
            );
        },

        getValue: function(point) {
            var value = NumericAxis.fn.getValue.call(this, point);

            return value !== null ? toDate(value) : null;
        },

        labelsCount: function() {
            return this.getDivisions(this.options.majorUnit);
        },

        createAxisLabel: function(index, labelOptions) {
            var options = this.options,
                offset =  index * options.majorUnit,
                date = addDuration(options.min, offset, options.baseUnit),
                unitFormat = labelOptions.dateFormats[options.baseUnit];

            labelOptions.format = labelOptions.format || unitFormat;

            return new AxisDateLabel(date, index, null, labelOptions);
        },

        timeUnits: function(delta) {
            var unit = HOURS;

            if (delta >= TIME_PER_YEAR) {
                unit = YEARS;
            } else if (delta >= TIME_PER_MONTH) {
                unit = MONTHS;
            } else if (delta >= TIME_PER_WEEK) {
                unit = WEEKS;
            } else if (delta >= TIME_PER_DAY) {
                unit = DAYS;
            }

            return unit;
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

                childBox.snapTo(targetBox, positionAxis);
                if (currentChild.options) {
                    currentChild.options.stackBase = stackBase;
                }

                if (i === 0) {
                    box = stack.box = childBox.clone();
                } else {
                    childBox.alignTo(children[i - 1].box, stackDirection);
                }

                currentChild.reflow(childBox);

                box.wrap(childBox);
            }
        }
    });

    var PointEventsMixin = {
        click: function(chart, e) {
            var point = this;

            chart.trigger(SERIES_CLICK, {
                value: point.value,
                category: point.category,
                series: point.series,
                dataItem: point.dataItem,
                element: $(e.target)
            });
        },

        hover: function(chart, e) {
            var point = this;

            chart.trigger(SERIES_HOVER, {
                value: point.value,
                category: point.category,
                series: point.series,
                dataItem: point.dataItem,
                element: $(e.target)
            });
        }
    };

    var Bar = ChartElement.extend({
        init: function(value, options) {
            var bar = this;

            ChartElement.fn.init.call(bar, options);

            bar.value = value;
            bar.options.id = uniqueId();
            bar.enableDiscovery();
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
                } else if (labels.format) {
                    labelText = autoFormat(labels.format, labelText);
                }

                bar.append(
                    new BarLabel(labelText,
                        deepExtend({
                            vertical: options.vertical,
                            id: uniqueId()
                        },
                        options.labels
                    ))
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
                    animation: options.animation,
                    data: { modelId: options.modelId }
                }, border),
                elements = [];

            if (box.width() > 0 && box.height() > 0) {
                if (options.overlay) {
                    rectStyle.overlay = deepExtend({
                        rotation: vertical ? 0 : 90
                    }, options.overlay);
                }

                elements.push(view.createRect(box, rectStyle));
            }

            append(elements, ChartElement.fn.getViewElements.call(bar, view));

            return elements;
        },

        highlightOverlay: function(view, options){
            var bar = this,
                box = bar.box;

            options = deepExtend({ data: { modelId: bar.options.modelId } }, options);

            return view.createRect(box, options);
        },

        getBorderColor: function() {
            var bar = this,
                options = bar.options,
                color = options.color,
                border = options.border,
                borderColor = border.color,
                brightness = border._brightness || BAR_BORDER_BRIGHTNESS;

            if (!defined(borderColor)) {
                borderColor =
                    new Color(color).brightness(brightness).toHex();
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
                    x = aboveAxis ? box.x2 - tooltipWidth : box.x1;
                    y = box.y1 - tooltipHeight - TOOLTIP_OFFSET;
                } else {
                    x = aboveAxis ? box.x2 + TOOLTIP_OFFSET : box.x1 - tooltipWidth - TOOLTIP_OFFSET;
                    y = box.y1;
                }
            }

            return new Point2D(x, y);
        },

        formatValue: function(format) {
            var point = this;

            return point.owner.formatPointValue(point, format);
        }
    });
    deepExtend(Bar.fn, PointEventsMixin);

    var CategoricalChart = ChartElement.extend({
        init: function(plotArea, options) {
            var chart = this;

            ChartElement.fn.init.call(chart, options);

            chart.plotArea = plotArea;
            chart.categoryAxis = plotArea.seriesCategoryAxis(options.series[0]);

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

        addValue: function(data, category, categoryIx, series, seriesIx) {
            var chart = this,
                value = data.value,
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

            point = chart.createPoint(data, category, categoryIx, series, seriesIx);
            if (point) {
                point.category = category;
                point.series = series;
                point.seriesIx = seriesIx;
                point.owner = chart;
                point.dataItem = series.data[categoryIx];
            }

            chart.points.push(point);
            seriesPoints.push(point);
            categoryPoints.push(point);
        },

        updateRange: function(value, categoryIx, series) {
            var chart = this,
                axisName = series.axis,
                axisRange = chart.valueAxisRanges[axisName];

            if (defined(value) && !isNaN(value)) {
                axisRange = chart.valueAxisRanges[axisName] =
                    axisRange || { min: MAX_VALUE, max: MIN_VALUE };

                axisRange.min = math.min(axisRange.min, value);
                axisRange.max = math.max(axisRange.max, value);
            }
        },

        seriesValueAxis: function(series) {
            var plotArea = this.plotArea,
                axisName = series.axis,
                axis = axisName ?
                    plotArea.namedValueAxes[axisName] :
                    plotArea.valueAxis;

            if (!axis) {
                throw new Error("Unable to locate value axis with name " + axisName);
            }

            return axis;
        },

        reflow: function(targetBox) {
            var chart = this,
                options = chart.options,
                invertAxes = options.invertAxes,
                pointIx = 0,
                categorySlots = chart.categorySlots = [],
                chartPoints = chart.points,
                categoryAxis = chart.categoryAxis,
                valueAxis,
                axisCrossingValue,
                point;

            chart.traverseDataPoints(function(data, category, categoryIx, currentSeries) {
                var value = data.value;

                valueAxis = chart.seriesValueAxis(currentSeries);
                axisCrossingValue = chart.categoryAxisCrossingValue(valueAxis);
                point = chartPoints[pointIx++];

                if (point && point.plotValue) {
                    value = point.plotValue;
                }

                var categorySlot = chart.categorySlot(categoryAxis, categoryIx, valueAxis),
                    valueSlot = chart.valueSlot(valueAxis, value, axisCrossingValue),
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

        categoryAxisCrossingValue: function(valueAxis) {
            var categoryAxis = this.categoryAxis,
                options = valueAxis.options,
                crossingValues = [].concat(
                    options.axisCrossingValues || options.axisCrossingValue
                );

            return crossingValues[categoryAxis.axisIndex || 0] || 0;
        },

        reflowCategories: function() { },

        valueSlot: function(valueAxis, value, axisCrossingValue) {
            return valueAxis.getSlot(value, axisCrossingValue);
        },

        categorySlot: function(categoryAxis, categoryIx) {
            return categoryAxis.getSlot(categoryIx);
        },

        traverseDataPoints: function(callback) {
            var chart = this,
                options = chart.options,
                series = options.series,
                categories = chart.categoryAxis.options.categories || [],
                count = categoriesCount(series),
                bindableFields = chart.bindableFields(),
                categoryIx,
                seriesIx,
                pointData,
                currentCategory,
                currentSeries,
                seriesCount = series.length;

            for (categoryIx = 0; categoryIx < count; categoryIx++) {
                for (seriesIx = 0; seriesIx < seriesCount; seriesIx++) {
                    currentCategory = categories[categoryIx];
                    currentSeries = series[seriesIx];
                    pointData = bindPoint(currentSeries, categoryIx, bindableFields);

                    callback(pointData, currentCategory, categoryIx, currentSeries, seriesIx);
                }
            }
        },

        bindableFields: function() {
            return [];
        },

        formatPointValue: function(point, format) {
            return autoFormat(format, point.value);
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

        createPoint: function(data, category, categoryIx, series) {
            var barChart = this,
                value = data.value,
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
                }, series, {
                    color: data.fields.color || undefined
                }));

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
                axisName = chart.options.series[0].axis;
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

        valueSlot: function(valueAxis, value, axisCrossingValue) {
            return valueAxis.getSlot(value, this.options.isStacked ? 0 : axisCrossingValue);
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

        reflow: function(targetBox) {
            var chart = this;

            chart.setStacksDirection();

            CategoricalChart.fn.reflow.call(chart, targetBox);
        },

        setStacksDirection: function() {
            var chart = this,
                options = chart.options,
                series = options.series,
                count = categoriesCount(series),
                clusters = chart.children,
                categoryIx,
                seriesIx,
                currentSeries,
                valueAxis,
                seriesCount = series.length;

            for (seriesIx = 0; seriesIx < seriesCount; seriesIx++) {
                currentSeries = series[seriesIx];
                valueAxis = chart.seriesValueAxis(currentSeries);

                for (categoryIx = 0; categoryIx < count; categoryIx++) {
                    var cluster = clusters[categoryIx],
                        stackWrap = chart.getStackWrap(currentSeries, cluster),
                        stacks = stackWrap.children,
                        positiveStack = stacks[0],
                        negativeStack = stacks[1];

                    if (positiveStack && negativeStack) {
                        positiveStack.options.isReversed = valueAxis.options.reverse;
                        negativeStack.options.isReversed = !valueAxis.options.reverse;
                    }
                }
            }
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
        },

        bindableFields: function() {
            return ["color"];
        }
    });

    var ShapeElement = BoxElement.extend({
        init: function(options) {
            var marker = this;

            BoxElement.fn.init.call(marker, options);
        },

        options: {
            type: CIRCLE,
            align: CENTER,
            vAlign: CENTER
        },

        getViewElements: function(view, renderOptions) {
            var marker = this,
                options = marker.options,
                type = options.type,
                box = marker.paddingBox,
                element,
                elementOptions,
                halfWidth = box.width() / 2;

            if (!options.visible || !marker.hasBox()) {
                return [];
            }

            elementOptions = deepExtend(marker.elementStyle(), renderOptions);

            if (type === TRIANGLE) {
                element = view.createPolyline([
                    new Point2D(box.x1 + halfWidth, box.y1),
                    new Point2D(box.x1, box.y2),
                    new Point2D(box.x2, box.y2)
                ], true, elementOptions);
            } else if (type === CIRCLE) {
                element = view.createCircle(new Point2D(
                    round(box.x1 + halfWidth, COORD_PRECISION),
                    round(box.y1 + box.height() / 2, COORD_PRECISION)
                ), halfWidth, elementOptions);
            } else {
                element = view.createRect(box, elementOptions);
            }

            return [ element ];
        }
    });

    var LinePoint = ChartElement.extend({
        init: function(value, options) {
            var point = this;

            ChartElement.fn.init.call(point, options);

            point.value = value;
            point.options.id = uniqueId();
            point.enableDiscovery();
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
                id: point.options.id,
                visible: markers.visible && markers.size,
                type: markers.type,
                width: markers.size,
                height: markers.size,
                background: markerBackground,
                border: markerBorder,
                opacity: markers.opacity,
                zIndex: markers.zIndex,
                animation: markers.animation
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
                    labelText = point.formatValue(labels.format);
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
                    }, labels)
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
                anchor = options.labels.position;

            if (label) {
                anchor = anchor === ABOVE ? TOP : anchor;
                anchor = anchor === BELOW ? BOTTOM : anchor;

                label.reflow(box);
                label.box.alignTo(marker.box, anchor);
                label.reflow(label.box);
            }
        },

        highlightOverlay: function(view, options) {
            var element = this,
                marker = element.marker;

            options = deepExtend({ data: { modelId: element.options.modelId } }, options);

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

        formatValue: function(format) {
            var point = this;

            return point.owner.formatPointValue(point, format);
        }
    });
    deepExtend(LinePoint.fn, PointEventsMixin);

    var Bubble = LinePoint.extend({
        init: function(value, options) {
            var point = this;

            LinePoint.fn.init.call(point, value, options);

            point.category = value.category;
        },

        options: {
            labels: {
                position: CENTER
            },
            highlight: {
                opacity: 1,
                border: {
                    width: 1,
                    opacity: 1
                }
            }
        },

        highlightOverlay: function(view) {
            var element = this,
                options = element.options,
                highlight = options.highlight,
                borderWidth = highlight.border.width,
                markers = options.markers,
                center = element.box.center(),
                radius = markers.size / 2 - borderWidth / 2,
                borderColor =
                    highlight.border.color ||
                    new Color(markers.background).brightness(BAR_BORDER_BRIGHTNESS).toHex();

            return view.createCircle(center, radius, {
                data: { modelId: element.options.modelId },
                stroke: borderColor,
                strokeWidth: borderWidth,
                strokeOpacity: highlight.border.opacity
            });
        },

        toggleHighlight: function(view) {
            var element = this,
                opacity = element.options.highlight.opacity;

            element.highlighted = !element.highlighted;

            var marker = element.marker.getViewElements(view, {
                fillOpacity: element.highlighted ? opacity : undefined
            })[0];

            marker.refresh(doc.getElementById(this.options.id));
        }
    });

    var LineSegment = ChartElement.extend({
        init: function(linePoints, series, seriesIx) {
            var segment = this;

            ChartElement.fn.init.call(segment);

            segment.linePoints = linePoints;
            segment.series = series;
            segment.seriesIx = seriesIx;
            segment.options.id = uniqueId();

            segment.enableDiscovery();
        },

        options: {},

        points: function(visualPoints) {
            var segment = this,
                linePoints = segment.linePoints.concat(visualPoints || []),
                points = [],
                i,
                length = linePoints.length,
                pointCenter;

            for (i = 0; i < length; i++) {
                pointCenter = linePoints[i].markerBox().center();

                points.push(new Point2D(pointCenter.x, pointCenter.y));
            }

            return points;
        },

        getViewElements: function(view) {
            var segment = this,
                series = segment.series;

            ChartElement.fn.getViewElements.call(segment, view);

            return [
                view.createPolyline(segment.points(), false, {
                    id: segment.options.id,
                    stroke: series.color,
                    strokeWidth: series.width,
                    strokeOpacity: series.opacity,
                    fill: "",
                    dashType: series.dashType,
                    data: { modelId: segment.options.modelId },
                    zIndex: -1
                })
            ];
        },

        aliasFor: function(e, coords) {
            var segment = this,
                seriesIx = segment.seriesIx;

            return segment.parent.getNearestPoint(coords.x, coords.y, seriesIx);
        }
    });

    var LineChartMixin = {
        renderSegments: function() {
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
                pointIx,
                pointCount,
                segments = [];

            for (seriesIx = 0; seriesIx < seriesCount; seriesIx++) {
                currentSeriesPoints = seriesPoints[seriesIx];
                pointCount = currentSeriesPoints.length;
                currentSeries = series[seriesIx];
                linePoints = [];

                for (pointIx = 0; pointIx < pointCount; pointIx++) {
                    point = currentSeriesPoints[pointIx];
                    if (point) {
                        linePoints.push(point);
                    } else if (chart.seriesMissingValues(currentSeries) !== INTERPOLATE) {
                        if (linePoints.length > 1) {
                            segments.push(
                                chart.createSegment(
                                    linePoints, currentSeries, seriesIx, last(segments)
                                )
                            );
                        }
                        linePoints = [];
                    }
                }

                if (linePoints.length > 1) {
                    segments.push(
                        chart.createSegment(
                            linePoints, currentSeries, seriesIx, last(segments)
                        )
                    );
                }
            }

            chart._segments = segments;
            chart.append.apply(chart, segments);
        },

        seriesMissingValues: function(series) {
            var missingValues = series.missingValues,
                assumeZero = !missingValues && this.options.isStacked;

            return assumeZero ? ZERO : missingValues;
        },

        createSegment: function(linePoints, currentSeries, seriesIx) {
            return new LineSegment(linePoints, currentSeries, seriesIx);
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
            chart.enableDiscovery();

            CategoricalChart.fn.init.call(chart, plotArea, options);
        },

        render: function() {
            var chart = this;

            CategoricalChart.fn.render.apply(chart);

            chart.computeAxisRanges();
            chart.renderSegments();
        },

        createPoint: function(data, category, categoryIx, series) {
            var chart = this,
                value = data.value,
                options = chart.options,
                isStacked = options.isStacked,
                categoryPoints = chart.categoryPoints[categoryIx],
                missingValues = chart.seriesMissingValues(series),
                stackPoint,
                plotValue = 0,
                fields = data.fields;

            if (!defined(value) || value === null) {
                if (missingValues === ZERO) {
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
                }, series, {
                    color: fields.color,
                    markers: {
                        border: {
                            color: fields.color
                        }
                    }
                })
            );

            if (isStacked) {
                stackPoint = lastValue(categoryPoints);
                if (stackPoint) {
                    plotValue = stackPoint.plotValue;
                }

                point.plotValue = value + plotValue;
            }

            chart.append(point);

            return point;
        },

        updateRange: function(value, categoryIx) {
            var chart = this,
                isStacked = chart.options.isStacked,
                stackAxisRange = chart._stackAxisRange,
                totals = chart._categoryTotals,
                totalsLimits;

            if (defined(value)) {
                if (isStacked) {
                    incrementSlot(totals, categoryIx, value);

                    totalsLimits = sparseArrayLimits(totals);
                    stackAxisRange.min = math.min(stackAxisRange.min, totalsLimits.min);
                    stackAxisRange.max = math.max(stackAxisRange.max, totalsLimits.max);
                } else {
                    CategoricalChart.fn.updateRange.apply(chart, arguments);
                }
            }
        },

        computeAxisRanges: function() {
            var chart = this,
                isStacked = chart.options.isStacked,
                axisName;

            if (isStacked) {
                axisName = chart.options.series[0].axis;
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
                });

            group.children = elements;
            return [group];
        },

        bindableFields: function() {
            return ["color"];
        }
    });
    deepExtend(LineChart.fn, LineChartMixin);

    var AreaSegment = LineSegment.extend({
        init: function(linePoints, stackPoints, currentSeries, seriesIx) {
            var segment = this;

            segment.stackPoints = stackPoints;

            LineSegment.fn.init.call(segment, linePoints, currentSeries, seriesIx);
        },

        points: function() {
            var segment = this,
                chart = segment.parent,
                stack = chart.options.isStacked && segment.seriesIx > 0,
                plotArea = chart.plotArea,
                invertAxes = chart.options.invertAxes,
                valueAxis = chart.seriesValueAxis(segment.series),
                valueAxisLineBox = valueAxis.lineBox(),
                categoryAxis = plotArea.seriesCategoryAxis(segment.series),
                categoryAxisLineBox = categoryAxis.lineBox(),
                end = invertAxes ? categoryAxisLineBox.x1 : categoryAxisLineBox.y1,
                stackPoints = segment.stackPoints,
                points = LineSegment.fn.points.call(segment, stackPoints),
                firstPoint,
                lastPoint;

            if (invertAxes) {
                end = clipValue(end, valueAxisLineBox.x1, valueAxisLineBox.x2);
            } else {
                end = clipValue(end, valueAxisLineBox.y1, valueAxisLineBox.y2);
            }

            if (!stack && points.length > 1) {
                firstPoint = points[0];
                lastPoint = last(points);

                if (invertAxes) {
                    points.unshift(new Point2D(end, firstPoint.y));
                    points.push(new Point2D(end, lastPoint.y));
                } else {
                    points.unshift(new Point2D(firstPoint.x, end));
                    points.push(new Point2D(lastPoint.x, end));
                }
            }

            return points;
        },

        getViewElements: function(view) {
            var segment = this,
                series = segment.series,
                lineOptions = deepExtend({
                        color: series.color,
                        opacity: series.opacity
                    }, series.line
                ),
                linePoints = LineSegment.fn.points.call(segment),
                areaPoints = segment.points();

            ChartElement.fn.getViewElements.call(segment, view);

            return [
                view.createPolyline(areaPoints, false, {
                    id: segment.options.id,
                    fillOpacity: series.opacity,
                    fill: series.color,
                    stack: series.stack,
                    data: { modelId: segment.options.modelId },
                    zIndex: -1
                }),
                view.createPolyline(linePoints, false, {
                    id: segment.options.id,
                    stroke: lineOptions.color,
                    strokeWidth: lineOptions.width,
                    strokeOpacity: lineOptions.opacity,
                    dashType: lineOptions.dashType,
                    data: { modelId: segment.options.modelId },
                    strokeLineCap: "butt",
                    zIndex: -1
                })
            ];
        }
    });

    var AreaChart = LineChart.extend({
        createSegment: function(linePoints, currentSeries, seriesIx, prevSegment) {
            var chart = this,
                options = chart.options,
                stackPoints;

            if (options.isStacked && seriesIx > 0 && prevSegment) {
                stackPoints = prevSegment.linePoints.slice(0).reverse();
            }

            return new AreaSegment(linePoints, stackPoints, currentSeries, seriesIx);
        },

        seriesMissingValues: function(series) {
            return series.missingValues || ZERO;
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
                x = value.x,
                y = value.y,
                seriesIx = fields.seriesIx,
                seriesPoints = chart.seriesPoints[seriesIx];

            chart.updateRange(value, fields.series);

            if (defined(x) && x !== null && defined(y) && y !== null) {
                point = chart.createPoint(value, fields.series, seriesIx, fields);
                if (point) {
                    extend(point, fields);
                }
            }

            chart.points.push(point);
            seriesPoints.push(point);
        },

        updateRange: function(value, series) {
            var chart = this,
                x = value.x,
                y = value.y,
                xAxisName = series.xAxis,
                yAxisName = series.yAxis,
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

        createPoint: function(value, series, seriesIx, fields) {
            var chart = this,
                point;

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
                }, series, {
                    color: fields.color,
                    markers: {
                        border: {
                            color: fields.color
                        }
                    }
                })
            );

            chart.append(point);

            return point;
        },

        seriesAxes: function(series) {
            var plotArea = this.plotArea,
                xAxisName = series.xAxis,
                xAxis = xAxisName ?
                        plotArea.namedXAxes[xAxisName] :
                        plotArea.axisX,
                yAxisName = series.yAxis,
                yAxis = yAxisName ?
                        plotArea.namedYAxes[yAxisName] :
                        plotArea.axisY;

            if (!xAxis) {
                throw new Error("Unable to locate X axis with name " + xAxisName);
            }

            if (!yAxis) {
                throw new Error("Unable to locate Y axis with name " + yAxisName);
            }

            return {
                x: xAxis,
                y: yAxis
            };
        },

        reflow: function(targetBox) {
            var chart = this,
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
                bindableFields = chart.bindableFields(),
                pointIx,
                seriesIx,
                currentSeries,
                currentSeriesPoints,
                pointData,
                value,
                fields;

            for (seriesIx = 0; seriesIx < series.length; seriesIx++) {
                currentSeries = series[seriesIx];

                currentSeriesPoints = seriesPoints[seriesIx];
                if (!currentSeriesPoints) {
                    seriesPoints[seriesIx] = [];
                }

                for (pointIx = 0; pointIx < currentSeries.data.length; pointIx++) {
                    pointData = bindPoint(currentSeries, pointIx, bindableFields);
                    value = pointData.value;
                    fields = pointData.fields;

                   callback(value, deepExtend({
                       pointIx: pointIx,
                       series: currentSeries,
                       seriesIx: seriesIx,
                       dataItem: currentSeries.data[pointIx],
                       owner: chart
                   }, fields));
                }
            }
        },

        bindableFields: function() {
            return ["color"];
        },

        formatPointValue: function(point, format) {
            var value = point.value;
            return autoFormat(format, value.x, value.y);
        }
    });

    var ScatterLineChart = ScatterChart.extend({
        render: function() {
            var chart = this;

            ScatterChart.fn.render.call(chart);

            chart.renderSegments();
        }
    });
    deepExtend(ScatterLineChart.fn, LineChartMixin);

    var BubbleChart = ScatterChart.extend({
        options: {
            tooltip: {
                format: "{3}"
            },
            labels: {
                format: "{3}"
            }
        },

        addValue: function(value, fields) {
            var chart = this,
                color,
                series = fields.series,
                negativeValues = series.negativeValues,
                seriesColors = chart.plotArea.options.seriesColors || [],
                visible = true;

            color = fields.color || series.color ||
                seriesColors[fields.pointIx % seriesColors.length];

            if (value.size < 0) {
                color = negativeValues.color || color;
                visible = negativeValues.visible;
            }

            fields.color = color;

            if (visible) {
                ScatterChart.fn.addValue.call(this, value, fields);
            }
        },

        reflow: function(box) {
            var chart = this;

            chart.updateBubblesSize(box);
            ScatterChart.fn.reflow.call(chart, box);
        },

        createPoint: function(value, series, seriesIx, fields) {
            var chart = this,
                point,
                pointsCount = series.data.length,
                delay = fields.pointIx * (INITIAL_ANIMATION_DURATION / pointsCount),
                animationOptions = {
                    delay: delay,
                    duration: INITIAL_ANIMATION_DURATION - delay,
                    type: BUBBLE
                };

            point = new Bubble(value, deepExtend({
                    tooltip: {
                        format: chart.options.tooltip.format
                    },
                    labels: {
                        format: chart.options.labels.format,
                        animation: animationOptions
                    }
                },
                series, {
                    color: fields.color,
                    markers: {
                        type: CIRCLE,
                        background: fields.color,
                        border: series.border,
                        opacity: series.opacity,
                        animation: animationOptions
                    }
                })
            );

            chart.append(point);

            return point;
        },

        updateBubblesSize: function(box) {
            var chart = this,
                options = chart.options,
                series = options.series,
                boxSize = math.min(box.width(), box.height()),
                seriesIx,
                pointIx;

            for (seriesIx = 0; seriesIx < series.length; seriesIx++) {
                var currentSeries = series[seriesIx],
                    seriesPoints = chart.seriesPoints[seriesIx],
                    seriesMaxSize = chart.maxSize(seriesPoints),
                    minSize = currentSeries.minSize || math.max(boxSize * 0.02, 10),
                    maxSize = currentSeries.maxSize || boxSize * 0.2,
                    minR = minSize / 2,
                    maxR = maxSize / 2,
                    minArea = math.PI * minR * minR,
                    maxArea = math.PI * maxR * maxR,
                    areaRange = maxArea - minArea,
                    areaRatio = areaRange / seriesMaxSize;

                for (pointIx = 0; pointIx < seriesPoints.length; pointIx++) {
                    var point = seriesPoints[pointIx],
                        area = math.abs(point.value.size) * areaRatio,
                        r = math.sqrt((minArea + area) / math.PI);

                    deepExtend(point.options, {
                        markers: {
                            size: r * 2,
                            zIndex: maxR - r
                        },
                        labels: {
                            zIndex: maxR - r + 1
                        }
                    });
                }
            }
        },

        maxSize: function(seriesPoints) {
            var length = seriesPoints.length,
                max = 0,
                i,
                size;

            for (i = 0; i < length; i++) {
                size = seriesPoints[i].value.size;
                max = math.max(max, math.abs(size));
            }

            return max;
        },

        bindableFields: function() {
            return ["color", "category", "visibleInLegend"];
        },

        getViewElements: function(view) {
            var chart = this,
                elements = ChartElement.fn.getViewElements.call(chart, view),
                group = view.createGroup();

            group.children = elements;
            return [group];
        },

        formatPointValue: function(point, format) {
            var value = point.value;
            return autoFormat(format, value.x, value.y, value.size, point.category);
        }
    });

    var Candlestick = ChartElement.extend({
        init: function(value, options) {
            var point = this;

            ChartElement.fn.init.call(point, options);
            point.value = value;
            point.options.id = uniqueId();
            point.enableDiscovery();
        },

        options: {
            border: {
                _brightness: 0.8
            },
            line: {
                width: 2
            },
            overlay: {
                gradient: GLASS
            },
            tooltip: {
                format: "<table style='text-align: left;'>" +
                        "<th colspan='2'>{4:d}</th>" +
                        "<tr><td>Open:</td><td>{0:C}</td></tr>" +
                        "<tr><td>High:</td><td>{1:C}</td></tr>" +
                        "<tr><td>Low:</td><td>{2:C}</td></tr>" +
                        "<tr><td>Close:</td><td>{3:C}</td></tr>" +
                        "</table>"
            },
            highlight: {
                opacity: 1,
                border: {
                    width: 1,
                    opacity: 1
                },
                line: {
                    width: 1,
                    opacity: 1
                }
            }
        },

        reflow: function(box) {
            var point = this,
                options = point.options,
                chart = point.owner,
                value = point.value,
                valueAxis = chart.seriesValueAxis(options),
                points = [], mid, ocSlot, lhSlot;

            ocSlot = valueAxis.getSlot(value.open, value.close);
            lhSlot = valueAxis.getSlot(value.low, value.high);

            ocSlot.x1 = lhSlot.x1 = box.x1;
            ocSlot.x2 = lhSlot.x2 = box.x2;

            point.realBody = ocSlot;

            mid = lhSlot.center().x;
            points.push([ new Point2D(mid, lhSlot.y1), new Point2D(mid, ocSlot.y1) ]);
            points.push([ new Point2D(mid, ocSlot.y2), new Point2D(mid, lhSlot.y2) ]);

            point.lowHighLinePoints = points;

            point.box = lhSlot.clone().wrap(ocSlot);
        },

        getViewElements: function(view) {
            var point = this,
                options = point.options,
                elements = [],
                border = options.border.width > 0 ? {
                    stroke: point.getBorderColor(),
                    strokeWidth: options.border.width,
                    dashType: options.border.dashType,
                    strokeOpacity: defined(options.border.opacity) ? options.border.opacity : options.opacity
                } : {},
                rectStyle = deepExtend({
                    id: options.id,
                    fill: point.color,
                    fillOpacity: options.opacity
                }, border),
                lineStyle = {
                    id: options.id,
                    strokeOpacity: defined(options.line.opacity) ? options.line.opacity : options.opacity,
                    strokeWidth: options.line.width,
                    stroke: options.line.color || point.color,
                    dashType: options.line.dashType,
                    strokeLineCap: "butt"
                },
                group = view.createGroup({
                    animation: {
                        type: CLIP
                    }
                });

            if (options.overlay) {
                rectStyle.overlay = deepExtend({
                    rotation: 0
                }, options.overlay);
            }

            elements.push(view.createRect(point.realBody, rectStyle));
            elements.push(view.createPolyline(point.lowHighLinePoints[0], false, lineStyle));
            elements.push(view.createPolyline(point.lowHighLinePoints[1], false, lineStyle));
            elements.push(point.createOverlayRect(view, options));

            append(elements,
                ChartElement.fn.getViewElements.call(point, view)
            );

            group.children = elements;

            return [group];
        },

        getBorderColor: function() {
            var point = this,
                options = point.options,
                color = point.color,
                border = options.border,
                borderColor = border.color;

            if (!defined(borderColor)) {
                borderColor =
                    new Color(color).brightness(border._brightness).toHex();
            }

            return borderColor;
        },

        createOverlayRect: function(view, options) {
            return view.createRect(this.box, {
                id: options.id,
                data: { modelId: options.modelId },
                fill: "#fff",
                fillOpacity: 0
            });
        },

        highlightOverlay: function(view, options) {
            var point = this,
                pointOptions = point.options,
                highlight = pointOptions.highlight,
                border = highlight.border,
                borderColor = point.getBorderColor(),
                line = highlight.line,
                data = { data: { modelId: pointOptions.modelId } },
                rectStyle = deepExtend({}, data, options, {
                    stroke: borderColor,
                    strokeOpacity: border.opacity,
                    strokeWidth: border.width
                }),
                lineStyle = deepExtend({}, data, {
                    stroke: line.color || borderColor,
                    strokeWidth: line.width,
                    strokeOpacity: line.opacity,
                    strokeLineCap: "butt"
                }),
                group = view.createGroup();

            group.children.push(view.createRect(point.realBody, rectStyle));
            group.children.push(view.createPolyline(point.lowHighLinePoints[0], false, lineStyle));
            group.children.push(view.createPolyline(point.lowHighLinePoints[1], false, lineStyle));

            return group;
        },

        tooltipAnchor: function() {
            var point = this,
                box = point.box;

            return new Point2D(box.x2 + TOOLTIP_OFFSET, box.y1 + TOOLTIP_OFFSET);
        },

        formatValue: function(format) {
            var point = this;
            return point.owner.formatPointValue(point, format);
        }
    });
    deepExtend(Candlestick.fn, PointEventsMixin);

    var CandlestickChart = CategoricalChart.extend({
        options: {},

        bindableFields: function() {
            return ["color", "downColor"];
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

        addValue: function(data, category, categoryIx, series, seriesIx) {
            var chart = this,
                options = chart.options,
                value = data.value,
                children = chart.children,
                pointColor = data.fields.color || series.color,
                point,
                valueParts = this.splitValue(value),
                hasValue = validNumbers(valueParts),
                cluster;

            if (hasValue) {
                point = chart.createPoint(value, series);
            }

            cluster = children[categoryIx];
            if (!cluster) {
                cluster = new ClusterLayout({
                    vertical: options.invertAxes,
                    gap: options.gap,
                    spacing: options.spacing
                });
                chart.append(cluster);
            }

            if (point) {
                chart.updateRange(value, categoryIx, series);

                cluster.append(point);

                if (series.type == CANDLESTICK) {
                    if (value.open > value.close) {
                        pointColor = data.fields.downColor || series.downColor;
                    }
                }

                point.color = pointColor;
                point.categoryIx = categoryIx;
                point.category = category;
                point.series = series;
                point.seriesIx = seriesIx;
                point.owner = chart;
                point.dataItem = series.data[categoryIx];
            }

            chart.points.push(point);
        },

        createPoint: function(value, series) {
            return new Candlestick(value, series);
        },

        splitValue: function(value) {
            return [value.low, value.open, value.close, value.high];
        },

        updateRange: function(value, categoryIx, series) {
            var chart = this,
                axisName = series.axis,
                axisRange = chart.valueAxisRanges[axisName],
                parts = chart.splitValue(value);

            axisRange = chart.valueAxisRanges[axisName] =
                axisRange || { min: MAX_VALUE, max: MIN_VALUE };

            axisRange = chart.valueAxisRanges[axisName] = {
                min: math.min.apply(math, parts.concat([axisRange.min])),
                max: math.max.apply(math, parts.concat([axisRange.max]))
            };
        },

        formatPointValue: function(point, format) {
            var value = point.value;

            return autoFormat(format,
                value.open, value.high,
                value.low, value.close, point.category
            );
        }
    });

    var OHLCPoint = Candlestick.extend({
        reflow: function(box) {
            var point = this,
                options = point.options,
                chart = point.owner,
                value = point.value,
                valueAxis = chart.seriesValueAxis(options),
                oPoints = [], cPoints = [], lhPoints = [],
                mid, oSlot, cSlot, lhSlot;

            lhSlot = valueAxis.getSlot(value.low, value.high);
            oSlot = valueAxis.getSlot(value.open, value.open);
            cSlot = valueAxis.getSlot(value.close, value.close);

            oSlot.x1 = cSlot.x1 = lhSlot.x1 = box.x1;
            oSlot.x2 = cSlot.x2 = lhSlot.x2 = box.x2;

            mid = lhSlot.center().x;

            oPoints.push(new Point2D(oSlot.x1, oSlot.y1));
            oPoints.push(new Point2D(mid, oSlot.y1));
            cPoints.push(new Point2D(mid, cSlot.y1));
            cPoints.push(new Point2D(cSlot.x2, cSlot.y1));
            lhPoints.push(new Point2D(mid, lhSlot.y1));
            lhPoints.push(new Point2D(mid, lhSlot.y2));

            point.oPoints = oPoints;
            point.cPoints = cPoints;
            point.lhPoints = lhPoints;

            point.box = lhSlot.clone().wrap(oSlot.clone().wrap(cSlot));
        },

        getViewElements: function(view) {
            var point = this,
                options = point.options,
                elements = [],
                lineStyle = {
                    id: options.id,
                    strokeOpacity: options.opacity,
                    zIndex: -1,
                    strokeWidth: options.width,
                    stroke: point.color,
                    dashType: options.dashType
                },
                group = view.createGroup({
                    animation: {
                        type: CLIP
                    }
                });

            elements.push(point.createOverlayRect(view, options));
            elements.push(view.createPolyline(point.oPoints, true, lineStyle));
            elements.push(view.createPolyline(point.cPoints, true, lineStyle));
            elements.push(view.createPolyline(point.lhPoints, true, lineStyle));

            append(elements,
                ChartElement.fn.getViewElements.call(point, view)
            );

            group.children = elements;

            return [group];
        },

        highlightOverlay: function(view) {
            var point = this,
                pointOptions = point.options,
                highlight = pointOptions.highlight,
                data = { data: { modelId: pointOptions.modelId } },
                lineStyle = deepExtend(data, {
                    strokeWidth: highlight.line.width,
                    strokeOpacity: highlight.line.opacity,
                    stroke: highlight.line.color || point.color
                }),
                group = view.createGroup();

            group.children.push(view.createPolyline(point.oPoints, true, lineStyle));
            group.children.push(view.createPolyline(point.cPoints, true, lineStyle));
            group.children.push(view.createPolyline(point.lhPoints, true, lineStyle));

            return group;
        }
    });

    var OHLCChart = CandlestickChart.extend({
        createPoint: function(value, series) {
            return new OHLCPoint(value, series);
        },

        bindableFields: function() {
            return ["color"];
        }
    });

    var PieSegment = ChartElement.extend({
        init: function(value, sector, options) {
            var segment = this;

            segment.value = value;
            segment.sector = sector;
            segment.enableDiscovery();

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
            } else if (labels.format) {
                labelText = autoFormat(labels.format, labelText);
            }

            if (labels.visible && labelText) {
                segment.label = new TextBox(labelText, deepExtend({}, labels, {
                        id: uniqueId(),
                        align: CENTER,
                        vAlign: "",
                        animation: {
                            type: FADEIN,
                            delay: segment.animationDelay
                        }
                    }));

                segment.append(segment.label);
            }
        },

        reflow: function(targetBox) {
            var segment = this;

            segment.render();

            segment.box = targetBox;

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
                    ir: sector.ir,
                    cx: sector.c.x,
                    cy: sector.c.y,
                    bbox: sector.getBBox()
                });
            }

            if (segment.value) {
                elements.push(segment.createSegment(view, sector, deepExtend({
                    id: options.id,
                    fill: options.color,
                    overlay: overlay,
                    fillOpacity: options.opacity,
                    strokeOpacity: options.opacity,
                    animation: deepExtend(options.animation, {
                        delay: segment.animationDelay
                    }),
                    data: { modelId: options.modelId },
                    zIndex: options.zIndex,
                    singleSegment: (segment.options.data || []).length === 1
                }, border)));
            }

            append(elements,
                ChartElement.fn.getViewElements.call(segment, view)
            );

            return elements;
        },

        createSegment: function(view, sector, options) {
            if (options.singleSegment) {
                return view.createCircle(sector.c, sector.r, options);
            } else {
                return view.createSector(sector, options);
            }
        },

        highlightOverlay: function(view, options) {
            var segment = this,
                highlight = segment.options.highlight || {},
                border = highlight.border || {},
                outlineId = segment.options.id + OUTLINE_SUFFIX,
                element;

            options = deepExtend({}, options, { id: outlineId });

            if (segment.value !== 0) {
                element = segment.createSegment(view, segment.sector, deepExtend({}, options, {
                    fill: highlight.color,
                    fillOpacity: highlight.opacity,
                    strokeOpacity: border.opacity,
                    strokeWidth: border.width,
                    stroke: border.color,
                    data: { modelId: segment.options.modelId }
                }));
            }

            return element;
        },

        tooltipAnchor: function(tooltipWidth, tooltipHeight) {
            var point = this,
                sector = point.sector.clone().expand(15),
                w = tooltipWidth / 2,
                h = tooltipHeight / 2,
                midAndle = sector.middle(),
                pointAngle = midAndle * DEGREE,
                lp = sector.point(midAndle),
                cx = lp.x - w,
                cy = lp.y - h,
                sa = math.sin(pointAngle),
                ca = math.cos(pointAngle);

            if (math.abs(sa) < 0.9) {
                cx += w * -ca / math.abs(ca);
            }

            if (math.abs(ca) < 0.9) {
                cy += h * -sa / math.abs(sa);
            }

            return new Point2D(cx, cy);
        },

        formatValue: function(format) {
            var point = this;

            return point.owner.formatPointValue(point, format);
        }
    });
    deepExtend(PieSegment.fn, PointEventsMixin);

    var PieChart = ChartElement.extend({
        init: function(plotArea, options) {
            var chart = this;

            ChartElement.fn.init.call(chart, options);

            chart.plotArea = plotArea;
            chart.segments = [];
            chart.legendItems = [];
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
                seriesCount = series.length,
                overlayId = uniqueId(),
                bindableFields = chart.bindableFields(),
                currentSeries,
                pointData,
                fields,
                seriesIx,
                angle,
                data,
                anglePerValue,
                value,
                explode,
                total,
                currentAngle,
                i;

            for (seriesIx = 0; seriesIx < seriesCount; seriesIx++) {
                currentSeries = series[seriesIx];
                data = currentSeries.data;
                total = chart.pointsTotal(currentSeries);
                anglePerValue = 360 / total;
                currentAngle = startAngle;
                if (seriesIx != seriesCount - 1) {
                    if (currentSeries.labels.position == OUTSIDE_END) {
                        currentSeries.labels.position = CENTER;
                    }
                }

                for (i = 0; i < data.length; i++) {
                    pointData = bindPoint(currentSeries, i, bindableFields);
                    value = pointData.value;
                    fields = pointData.fields;
                    angle = round(value * anglePerValue, DEFAULT_PRECISION);
                    explode = data.length != 1 && !!fields.explode;
                    currentSeries.color = fields.color || colors[i % colorsCount];

                    callback(value, new Ring(null, 0, 0, currentAngle, angle), {
                        owner: chart,
                        category: fields.category || "",
                        categoryIx: i,
                        series: currentSeries,
                        seriesIx: seriesIx,
                        dataItem: data[i],
                        percentage: value / total,
                        explode: explode,
                        visibleInLegend: fields.visibleInLegend,
                        overlay: {
                            id: overlayId + seriesIx
                        },
                        zIndex: seriesCount - seriesIx,
                        animationDelay: chart.animationDelay(i, seriesIx, seriesCount)
                    });

                    currentAngle += angle;
                }
            }
        },

        bindableFields: function() {
            return ["category", "color", "explode", "visibleInLegend"];
        },

        addValue: function(value, sector, fields) {
            var chart = this,
                segment;

            chart.createLegendItem(value, fields);

            if (!value) {
                return;
            }
            segment = new PieSegment(value, sector, fields.series);
            segment.options.id = uniqueId();
            extend(segment, fields);
            chart.append(segment);
            chart.segments.push(segment);
        },

        createLegendItem: function(value, point) {
            var chart = this,
                options = (chart.options.legend || {}).labels || {},
                text, labelTemplate;

            if (point && point.visibleInLegend !== false) {
                text = point.category || "";
                if ((options || {}).template) {
                    labelTemplate = template(options.template);
                    text = labelTemplate({
                        text: text,
                        series: point.series,
                        dataItem: point.dataItem,
                        percentage: point.percentage,
                        value: value
                    });
                }

                chart.legendItems.push({
                    name: text,
                    color: point.series.color
                });
            }
        },

        pointsTotal: function(series) {
            var data = series.data,
                length = data.length,
                sum = 0,
                i;

            for(i = 0; i < length; i++) {
                sum += bindPoint(series, i).value;
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
                newBox = new Box2D(box.x1, box.y1,
                    box.x1 + minWidth, box.y1 + minWidth),
                newBoxCenter = newBox.center(),
                seriesConfigs = chart.seriesConfigs || [],
                boxCenter = box.center(),
                segments = chart.segments,
                count = segments.length,
                seriesCount = options.series.length,
                leftSideLabels = [],
                rightSideLabels = [],
                seriesConfig,
                seriesIndex,
                label,
                segment,
                sector,
                r, i, c;

            padding = padding > halfMinWidth - space ? halfMinWidth - space : padding,
            newBox.translate(boxCenter.x - newBoxCenter.x, boxCenter.y - newBoxCenter.y);
            r = halfMinWidth - padding;
            c = new Point2D(
                r + newBox.x1 + padding,
                r + newBox.y1 + padding
            );

            for (i = 0; i < count; i++) {
                segment = segments[i];

                sector = segment.sector;
                sector.r = r;
                sector.c = c;
                seriesIndex = segment.seriesIx;
                if (seriesConfigs.length) {
                    seriesConfig = seriesConfigs[seriesIndex];
                    sector.ir = seriesConfig.ir;
                    sector.r = seriesConfig.r;
                }

                if (seriesIndex == seriesCount - 1 && segment.explode) {
                    sector.c = sector.clone().radius(sector.r * 0.15).point(sector.middle());
                }

                segment.reflow(newBox);

                label = segment.label;
                if (label) {
                    if (label.options.position === OUTSIDE_END) {
                        if (seriesIndex == seriesCount - 1) {
                            if (label.orientation === RIGHT) {
                                rightSideLabels.push(label);
                            } else {
                                leftSideLabels.push(label);
                            }
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
                segments = chart.segments,
                segment = segments[segments.length - 1],
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
                segment = segments[segments.length - 1],
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
                                delay: segment.animationDelay
                            },
                            data: { modelId: segment.options.modelId }
                        });

                        lines.push(connectorLine);
                    }
                }
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
            };
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

        formatPointValue: function(point, format) {
            return autoFormat(format, point.value);
        },

        animationDelay: function(categoryIndex) {
            return categoryIndex * PIE_SECTOR_ANIM_DELAY;
        }
    });

    var DonutSegment = PieSegment.extend({
        options: {
            overlay: {
                gradient: ROUNDED_GLASS
            },
            labels: {
                position: CENTER
            },
            animation: {
                type: PIE
            }
        },

        reflowLabel: function() {
            var segment = this,
                sector = segment.sector.clone(),
                options = segment.options,
                label = segment.label,
                labelsOptions = options.labels,
                lp,
                angle = sector.middle(),
                labelHeight;

            if (label) {
                labelHeight = label.box.height();
                if (labelsOptions.position == CENTER) {
                    sector.r -= (sector.r - sector.ir) / 2;
                    lp = sector.point(angle);
                    label.reflow(new Box2D(lp.x, lp.y - labelHeight / 2, lp.x, lp.y));
                } else {
                    PieSegment.fn.reflowLabel.call(segment);
                }
            }
        },

        createSegment: function(view, sector, options) {
            return view.createRing(sector, options);
        }
    });
    deepExtend(DonutSegment.fn, PointEventsMixin);

    var DonutChart = PieChart.extend({
        options: {
            startAngle: 90,
            connectors: {
                width: 1,
                color: "#939393",
                padding: 4
            }
        },

        addValue: function(value, sector, fields) {
            var chart = this,
                segment;

            chart.createLegendItem(value, fields);

            if (!value) {
                return;
            }

            segment = new DonutSegment(value, sector, fields.series);
            segment.options.id = uniqueId();
            extend(segment, fields);
            chart.append(segment);
            chart.segments.push(segment);
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
                series = options.series,
                currentSeries,
                seriesCount = series.length,
                seriesWithoutSize = 0,
                holeSize,
                totalSize,
                size,
                margin = 0,
                i, r, ir = 0,
                currentSize = 0;

            chart.seriesConfigs = [];
            padding = padding > halfMinWidth - space ? halfMinWidth - space : padding,
            totalSize = halfMinWidth - padding;

            for (i = 0; i < seriesCount; i++) {
                currentSeries = series[i];
                if (i === 0) {
                    if (defined(currentSeries.holeSize)) {
                        holeSize = currentSeries.holeSize;
                        totalSize -= currentSeries.holeSize;
                    }
                }

                if (defined(currentSeries.size)) {
                    totalSize -= currentSeries.size;
                } else {
                    seriesWithoutSize++;
                }

                if (defined(currentSeries.margin) && i != seriesCount - 1) {
                    totalSize -= currentSeries.margin;
                }
            }

            if (!defined(holeSize)) {
                currentSize = (halfMinWidth - padding) / (seriesCount + 0.75);
                holeSize = currentSize * 0.75;
                totalSize -= holeSize;
            }

            ir = holeSize;

            for (i = 0; i < seriesCount; i++) {
                currentSeries = series[i];
                size = defined(currentSeries.size) ? currentSeries.size : totalSize / seriesWithoutSize;
                ir += margin;
                r = ir + size;
                chart.seriesConfigs.push({ ir: ir, r: r });
                margin = currentSeries.margin || 0;
                ir = r;
            }

            PieChart.fn.reflow.call(chart, targetBox);
        },

        animationDelay: function(categoryIndex, seriesIndex, seriesCount) {
            return categoryIndex * DONUT_SECTOR_ANIM_DELAY +
                (INITIAL_ANIMATION_DURATION * (seriesIndex + 1) / (seriesCount + 1));
        }
    });

    var Pane = BoxElement.extend({
        init: function(options) {
            var pane = this;

            BoxElement.fn.init.call(pane, options);

            options = pane.options;
            options.id = uniqueId();

            pane.title = Title.buildTitle(options.title, pane, Pane.fn.options.title);

            pane.content = new ChartElement();
            pane.append(pane.content);

            pane.axes = [];
            pane.charts = [];
        },

        options: {
            zIndex: -1,
            shrinkToFit: true,
            title: {
                align: LEFT
            },
            visible: true
        },

        appendAxis: function(axis) {
            var pane = this;

            pane.content.append(axis);
            pane.axes.push(axis);
            axis.pane = pane;
        },

        appendChart: function(chart) {
            var pane = this;

            pane.charts.push(chart);
            pane.content.append(chart);
            chart.pane = pane;
        },

        empty: function() {
            var pane = this,
                plotArea = pane.parent,
                i;

            if (plotArea) {
                for (i = 0; i < pane.axes.length; i++) {
                    plotArea.removeAxis(pane.axes[i]);
                }

                for (i = 0; i < pane.charts.length; i++) {
                    plotArea.removeChart(pane.charts[i]);
                }
            }

            pane.axes = [];
            pane.charts = [];

            pane.content.disableDiscovery();
            pane.content.children = [];
        },

        reflow: function(targetBox) {
            var pane = this;

            // Content (such as charts) is rendered, but excluded from reflows
            if (last(pane.children) === pane.content) {
                pane.children.pop();
            }

            BoxElement.fn.reflow.call(pane, targetBox);

            if (pane.title) {
                pane.contentBox.y1 += pane.title.box.height();
            }
        },

        getViewElements: function(view) {
            var pane = this,
                elements = CategoricalChart.fn.getViewElements.call(pane, view),
                group = view.createGroup({
                    id: pane.options.id
                }),
                result = [];

            group.children = elements.concat(
                pane.renderGridLines(view),
                pane.content.getViewElements(view)
            );

            pane.view = view;

            if (pane.options.visible) {
                result = [group];
            }

            return result;
        },

        renderGridLines: function(view) {
            var pane = this,
                axes = pane.axes,
                allAxes = axes.concat(pane.parent.axes),
                vGridLines = [],
                hGridLines = [],
                gridLines,
                i,
                j,
                axis,
                vertical,
                altAxis;

            for (i = 0; i < axes.length; i++) {
                axis = axes[i];
                vertical = axis.options.vertical;
                gridLines = vertical ? vGridLines : hGridLines;

                for (j = 0; j < allAxes.length; j++) {
                    if (gridLines.length === 0) {
                        altAxis = allAxes[j];
                        if (vertical !== altAxis.options.vertical) {
                            append(gridLines, axis.renderGridLines(view, altAxis, axis));
                        }
                    }
                }
            }

            return vGridLines.concat(hGridLines);
        },

        refresh: function() {
            var pane = this,
                view = pane.view,
                element = document.getElementById(pane.options.id);

            if (view && element) {
                element.parentNode.replaceChild(
                    view.renderElement(pane.getViewElements(view)[0]),
                    element
                );
            }
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
            plotArea.crosshairs = [];

            plotArea.options.id = uniqueId();
            plotArea.enableDiscovery();

            plotArea.createPanes();
            plotArea.render();
            plotArea.createCrosshairs();
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

        createPanes: function() {
            var plotArea = this,
                panes = [],
                paneOptions = plotArea.options.panes || [],
                i,
                panesLength = math.max(paneOptions.length, 1),
                currentPane;

            for (i = 0; i < panesLength; i++) {
                currentPane = new Pane(paneOptions[i]);
                currentPane.paneIndex = i;

                panes.push(currentPane);
                plotArea.append(currentPane);
            }

            plotArea.panes = panes;
        },

        createCrosshairs: function() {
            var plotArea = this,
                panes = plotArea.panes,
                i, j, pane, axis, currentCrosshair;

            for (i = 0; i < panes.length; i++) {
                pane = panes[i];
                for (j = 0; j < pane.axes.length; j++) {
                    axis = pane.axes[j];
                    if (axis.options.crosshair && axis.options.crosshair.visible) {
                        currentCrosshair = new Crosshair(axis, axis.options.crosshair);
                        plotArea.crosshairs.push(currentCrosshair);
                        pane.content.append(currentCrosshair);
                    }
                }
            }
        },

        findPane: function(name) {
            var plotArea = this,
                panes = plotArea.panes,
                i,
                matchingPane;

            for (i = 0; i < panes.length; i++) {
                if (panes[i].options.name === name) {
                    matchingPane = panes[i];
                    break;
                }
            }

            return matchingPane || panes[0];
        },

        findPointPane: function(point) {
            var plotArea = this,
                panes = plotArea.panes,
                i,
                matchingPane;

            for (i = 0; i < panes.length; i++) {
                if (panes[i].box.containsPoint(point)) {
                    matchingPane = panes[i];
                    break;
                }
            }

            return matchingPane;
        },

        appendAxis: function(axis) {
            var plotArea = this,
                pane = plotArea.findPane(axis.options.pane);

            pane.appendAxis(axis);
            plotArea.axes.push(axis);
            axis.plotArea = plotArea;
        },

        removeAxis: function(axisToRemove) {
            var plotArea = this,
                i,
                axis,
                filteredAxes = [];

            for (i = 0; i < plotArea.axes.length; i++) {
                axis = plotArea.axes[i];
                if (axisToRemove !== axis) {
                    filteredAxes.push(axis);
                }
            }

            plotArea.axes = filteredAxes;
        },

        appendChart: function(chart, pane) {
            var plotArea = this;

            plotArea.charts.push(chart);
            plotArea.addToLegend(chart);
            if (pane) {
                pane.appendChart(chart);
            } else {
                plotArea.append(chart);
            }
        },

        removeChart: function(chartToRemove) {
            var plotArea = this,
                i,
                chart,
                filteredCharts = [];

            for (i = 0; i < plotArea.charts.length; i++) {
                chart = plotArea.charts[i];
                if (chart !== chartToRemove) {
                    filteredCharts.push(chart);
                }
            }

            plotArea.charts = filteredCharts;
        },

        addToLegend: function(chart) {
            var series = chart.options.series,
                count = series.length,
                data = [],
                i, currentSeries, text, labelTemplate,
                labels = this.options.legend.labels || {};

            if (chart.legendItems) {
                data = chart.legendItems;
            } else {
                for (i = 0; i < count; i++) {
                    currentSeries = series[i];
                    if (currentSeries.visibleInLegend !== false) {
                        text = currentSeries.name || "";
                        if (labels.template) {
                            labelTemplate = template(labels.template);
                            text = labelTemplate({
                                text: text,
                                series: currentSeries
                            });
                        }
                        data.push({ name: text, color: currentSeries.color });
                    }
                }
            }

            append(this.options.legend.items, data);
        },

        groupAxes: function(panes) {
            var xAxes = [],
                yAxes = [],
                paneAxes,
                axis,
                paneIx,
                axisIx;

            for (paneIx = 0; paneIx < panes.length; paneIx++) {
                paneAxes = panes[paneIx].axes;
                for (axisIx = 0; axisIx < paneAxes.length; axisIx++) {
                    axis = paneAxes[axisIx];
                    if (axis.options.vertical) {
                        yAxes.push(axis);
                    } else {
                        xAxes.push(axis);
                    }
                }
            }

            return { x: xAxes, y: yAxes, any: xAxes.concat(yAxes) };
        },

        groupSeriesByPane: function() {
            var plotArea = this,
                series = plotArea.series,
                seriesByPane = {},
                i,
                pane,
                currentSeries;

            for (i = 0; i < series.length; i++) {
                currentSeries = series[i];
                pane = plotArea.seriesPaneName(currentSeries);

                if (seriesByPane[pane]) {
                    seriesByPane[pane].push(currentSeries);
                } else {
                    seriesByPane[pane] = [currentSeries];
                }
            }

            return seriesByPane;
        },

        filterSeriesByType: function(series, types) {
            var i,
                currentSeries,
                result = [];

            types = [].concat(types);
            for (i = 0; i < series.length; i++) {
                currentSeries = series[i];
                if (inArray(currentSeries.type, types)) {
                    result.push(currentSeries);
                }
            }

            return result;
        },

        reflow: function(targetBox) {
            var plotArea = this,
                options = plotArea.options.plotArea,
                panes = plotArea.panes,
                margin = getSpacing(options.margin);

            plotArea.box = targetBox.clone().unpad(margin);
            plotArea.reflowPanes();

            plotArea.reflowAxes(panes);
            plotArea.reflowCharts(panes);
        },

        redraw: function(panes) {
            var plotArea = this,
                i;

            panes = [].concat(panes);

            for (i = 0; i < panes.length; i++) {
                panes[i].empty();
            }

            plotArea.render(panes);
            plotArea.reflowAxes(plotArea.panes);
            plotArea.reflowCharts(panes);

            for (i = 0; i < panes.length; i++) {
                panes[i].refresh();
            }
        },

        axisCrossingValues: function(axis, crossingAxes) {
            var options = axis.options,
                crossingValues = [].concat(
                    options.axisCrossingValues || options.axisCrossingValue
                ),
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
                targetEdge = targetAxis.options.reverse ? 2 : 1,
                axisBox = axis.box.translate(
                    targetSlot[X + targetEdge] - slot[X + slotEdge],
                    targetSlot[Y + targetEdge] - slot[Y + slotEdge]
                );

            if (axis.pane !== targetAxis.pane) {
                axisBox.translate(0, axis.pane.box.y1 - targetAxis.pane.box.y1);
            }

            axis.reflow(axisBox);
        },

        alignAxes: function(xAxes, yAxes) {
            var plotArea = this,
                xAnchor = xAxes[0],
                yAnchor = yAxes[0],
                xAnchorCrossings = plotArea.axisCrossingValues(xAnchor, yAxes),
                yAnchorCrossings = plotArea.axisCrossingValues(yAnchor, xAxes),
                leftAnchors = {},
                rightAnchors = {},
                topAnchors = {},
                bottomAnchors = {},
                pane,
                paneId,
                axis,
                i;

            for (i = 0; i < yAxes.length; i++) {
                axis = yAxes[i];
                pane = axis.pane;
                paneId = pane.options.id;
                plotArea.alignAxisTo(axis, xAnchor, yAnchorCrossings[i], xAnchorCrossings[i]);

                if (axis.options._overlap) {
                    continue;
                }

                if (round(axis.lineBox().x1) === round(xAnchor.lineBox().x1)) {
                    if (leftAnchors[paneId]) {
                        axis.reflow(axis.box
                            .alignTo(leftAnchors[paneId].box, LEFT)
                            .translate(-axis.options.margin, 0)
                        );
                    }

                    leftAnchors[paneId] = axis;
                }

                if (round(axis.lineBox().x2) === round(xAnchor.lineBox().x2)) {
                    if (!axis._mirrored) {
                        axis.options.labels.mirror = !axis.options.labels.mirror;
                        axis._mirrored = true;
                    }
                    plotArea.alignAxisTo(axis, xAnchor, yAnchorCrossings[i], xAnchorCrossings[i]);

                    if (rightAnchors[paneId]) {
                        axis.reflow(axis.box
                            .alignTo(rightAnchors[paneId].box, RIGHT)
                            .translate(axis.options.margin, 0)
                        );
                    }

                    rightAnchors[paneId] = axis;
                }

                if (i !== 0 && yAnchor.pane === axis.pane) {
                    axis.alignTo(yAnchor);
                }
            }

            for (i = 0; i < xAxes.length; i++) {
                axis = xAxes[i];
                pane = axis.pane;
                paneId = pane.options.id;
                plotArea.alignAxisTo(axis, yAnchor, xAnchorCrossings[i], yAnchorCrossings[i]);

                if (axis.options._overlap) {
                    continue;
                }

                if (round(axis.lineBox().y1) === round(yAnchor.lineBox().y1)) {
                    if (!axis._mirrored) {
                        axis.options.labels.mirror = !axis.options.labels.mirror;
                        axis._mirrored = true;
                    }
                    plotArea.alignAxisTo(axis, yAnchor, xAnchorCrossings[i], yAnchorCrossings[i]);

                    if (topAnchors[paneId]) {
                        axis.reflow(axis.box
                            .alignTo(topAnchors[paneId].box, TOP)
                            .translate(0, -axis.options.margin)
                        );
                    }

                    topAnchors[paneId] = axis;
                }

                if (round(axis.lineBox().y2, COORD_PRECISION) === round(yAnchor.lineBox().y2, COORD_PRECISION)) {
                    if (bottomAnchors[paneId]) {
                        axis.reflow(axis.box
                            .alignTo(bottomAnchors[paneId].box, BOTTOM)
                            .translate(0, axis.options.margin)
                        );
                    }

                    bottomAnchors[paneId] = axis;
                }

                if (i !== 0) {
                    axis.alignTo(xAnchor);
                }
            }
        },

        shrinkAxisWidth: function(panes) {
            var plotArea = this,
                axes = plotArea.groupAxes(panes).any,
                axisBox = axisGroupBox(axes),
                overflowX = 0,
                i,
                currentPane,
                currentAxis;

            for (i = 0; i < panes.length; i++) {
                currentPane = panes[i];

                if (currentPane.axes.length > 0) {
                    overflowX = math.max(
                        overflowX,
                        axisBox.width() - currentPane.contentBox.width()
                    );
                }
            }

            for (i = 0; i < axes.length; i++) {
                currentAxis = axes[i];

                if (!currentAxis.options.vertical) {
                    currentAxis.reflow(currentAxis.box.shrink(overflowX, 0));
                }
            }
        },

        shrinkAxisHeight: function(panes) {
            var i,
                currentPane,
                axes,
                overflowY,
                j,
                currentAxis;

            for (i = 0; i < panes.length; i++) {
                currentPane = panes[i];
                axes = currentPane.axes,
                overflowY = math.max(
                    0,
                    axisGroupBox(axes).height() - currentPane.contentBox.height()
                );

                for (j = 0; j < axes.length; j++) {
                    currentAxis = axes[j];

                    if (currentAxis.options.vertical) {
                        currentAxis.reflow(
                            currentAxis.box.shrink(0, overflowY)
                        );
                    }
                }
            }
        },

        fitAxes: function(panes) {
            var plotArea = this,
                axes = plotArea.groupAxes(panes).any,
                paneAxes,
                paneBox,
                axisBox,
                offsetX = 0,
                offsetY,
                currentPane,
                currentAxis,
                i,
                j;

            for (i = 0; i < panes.length; i++) {
                currentPane = panes[i];
                paneAxes = currentPane.axes;
                paneBox = currentPane.contentBox;

                if (paneAxes.length > 0) {
                    axisBox = axisGroupBox(paneAxes);

                    // OffsetX is calculated and applied globally
                    offsetX = math.max(offsetX, paneBox.x1 - axisBox.x1);

                    // OffsetY is calculated and applied per pane
                    offsetY = math.max(paneBox.y1 - axisBox.y1, paneBox.y2 - axisBox.y2);

                    for (j = 0; j < paneAxes.length; j++) {
                        currentAxis = paneAxes[j];

                        currentAxis.reflow(
                            currentAxis.box.translate(0, offsetY)
                        );
                    }
                }
            }

            for (i = 0; i < axes.length; i++) {
                currentAxis = axes[i];

                currentAxis.reflow(
                    currentAxis.box.translate(offsetX, 0)
                );
            }
        },

        reflowAxes: function(panes) {
            var plotArea = this,
                i,
                axes = plotArea.groupAxes(panes);

            for (i = 0; i < panes.length; i++) {
                plotArea.reflowPaneAxes(panes[i]);
            }

            if (axes.x.length > 0 && axes.y.length > 0) {
                plotArea.alignAxes(axes.x, axes.y);
                plotArea.shrinkAxisWidth(panes);
                plotArea.alignAxes(axes.x, axes.y);
                plotArea.shrinkAxisHeight(panes);
                plotArea.alignAxes(axes.x, axes.y);
                plotArea.fitAxes(panes);
            }
        },

        reflowPaneAxes: function(pane) {
            var axes = pane.axes,
                i,
                length = axes.length;

            if (length > 0) {
                for (i = 0; i < length; i++) {
                    axes[i].reflow(pane.contentBox);
                }
            }
        },

        reflowCharts: function(panes) {
            var plotArea = this,
                charts = plotArea.charts,
                count = charts.length,
                box = plotArea.box,
                chartPane,
                i;

            for (i = 0; i < count; i++) {
                chartPane = charts[i].pane;
                if (!chartPane || inArray(chartPane, panes)) {
                    charts[i].reflow(box);
                }
            }
        },

        reflowPanes: function() {
            var plotArea = this,
                box = plotArea.box,
                panes = plotArea.panes,
                i,
                panesLength = panes.length,
                currentPane,
                paneBox,
                remainingHeight = box.height(),
                remainingPanes = panesLength,
                autoHeightPanes = 0,
                top = box.y1,
                height,
                percents;

            for (i = 0; i < panesLength; i++) {
                currentPane = panes[i];
                height = currentPane.options.height;

                currentPane.options.width = box.width();

                if (!currentPane.options.height) {
                    autoHeightPanes++;
                } else {
                    if (height.indexOf && height.indexOf("%")) {
                        percents = parseInt(height, 10) / 100;
                        currentPane.options.height = percents * box.height();
                    }

                    currentPane.reflow(box.clone());

                    remainingHeight -= currentPane.options.height;
                }
            }

            for (i = 0; i < panesLength; i++) {
                currentPane = panes[i];

                if (!currentPane.options.height) {
                    currentPane.options.height = remainingHeight / autoHeightPanes;
                }
            }

            for (i = 0; i < panesLength; i++) {
                currentPane = panes[i];

                paneBox = box
                    .clone()
                    .move(box.x1, top);

                currentPane.reflow(paneBox);

                remainingPanes--;
                top += currentPane.options.height;
            }
        },

        backgroundBox: function() {
            var plotArea = this,
                axes = plotArea.axes,
                axesCount = axes.length,
                lineBox,
                box,
                i,
                j,
                axisA,
                axisB;

            for (i = 0; i < axesCount; i++) {
                axisA = axes[i];

                for (j = 0; j < axesCount; j++) {
                    axisB = axes[j];

                    if (axisA.options.vertical !== axisB.options.vertical) {
                        lineBox = axisA.lineBox().clone().wrap(axisB.lineBox());

                        if (!box) {
                            box = lineBox;
                        } else {
                            box = box.wrap(lineBox);
                        }
                    }
                }
            }

            return box || plotArea.box;
        },

        getViewElements: function(view) {
            var plotArea = this,
                bgBox = plotArea.backgroundBox(),
                options = plotArea.options,
                userOptions = options.plotArea,
                border = userOptions.border || {},
                elements = ChartElement.fn.getViewElements.call(plotArea, view);

            append(elements, [
                view.createRect(bgBox, {
                    fill: userOptions.background,
                    fillOpacity: userOptions.opacity,
                    zIndex: -2,
                    strokeWidth: 0.1
                }),
                view.createRect(bgBox, {
                    id: options.id,
                    data: { modelId: options.modelId },
                    stroke: border.width ? border.color : "",
                    strokeWidth: border.width,
                    fill: WHITE,
                    fillOpacity: 0,
                    zIndex: -1,
                    dashType: border.dashType
                })
            ]);

            return elements;
        }
    });

    var CategoricalPlotArea = PlotAreaBase.extend({
        init: function(series, options) {
            var plotArea = this;

            plotArea.namedCategoryAxes = {};
            plotArea.namedValueAxes = {};
            plotArea.valueAxisRangeTracker = new AxisGroupRangeTracker();

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

        render: function(panes) {
            var plotArea = this;

            panes = panes || plotArea.panes;

            plotArea.createCategoryAxes(panes);
            plotArea.aggregateDateSeries(panes);
            plotArea.createCharts(panes);
            plotArea.createValueAxes(panes);
        },

        removeAxis: function(axis) {
            var plotArea = this,
                axisName = axis.options.name;

            PlotAreaBase.fn.removeAxis.call(plotArea, axis);

            if (axis instanceof CategoryAxis) {
                delete plotArea.namedCategoryAxes[axisName];
            } else {
                plotArea.valueAxisRangeTracker.reset(axisName);
                delete plotArea.namedValueAxes[axisName];
            }

            if (axis === plotArea.categoryAxis) {
                delete plotArea.categoryAxis;
            }

            if (axis === plotArea.valueAxis) {
                delete plotArea.valueAxis;
            }
        },

        createCharts: function(panes) {
            var plotArea = this,
                seriesByPane = plotArea.groupSeriesByPane(),
                i,
                pane,
                paneSeries;

            for (i = 0; i < panes.length; i++) {
                pane = panes[i];
                paneSeries = seriesByPane[pane.options.name || "default"];

                if (!paneSeries) {
                    continue;
                }

                plotArea.createAreaChart(
                    plotArea.filterSeriesByType(paneSeries, [AREA, VERTICAL_AREA]),
                    pane
                );

                plotArea.createBarChart(
                    plotArea.filterSeriesByType(paneSeries, [COLUMN, BAR]),
                    pane
                );

                plotArea.createLineChart(
                    plotArea.filterSeriesByType(paneSeries, [LINE, VERTICAL_LINE]),
                    pane
                );

                plotArea.createCandlestickChart(
                    plotArea.filterSeriesByType(paneSeries, CANDLESTICK),
                    pane
                );

                plotArea.createOHLCChart(
                    plotArea.filterSeriesByType(paneSeries, OHLC),
                    pane
                );
            }
        },

        aggregateDateSeries: function(panes) {
            var plotArea = this,
                series = plotArea.srcSeries || plotArea.series,
                processedSeries = [],
                categoryAxis,
                axisPane,
                categories,
                categoryMap,
                groupIx,
                categoryIndicies,
                seriesIx,
                currentSeries,
                seriesClone,
                srcData,
                data,
                srcValues,
                i,
                categoryIx,
                pointData,
                value;

            for (seriesIx = 0; seriesIx < series.length; seriesIx++) {
                currentSeries = series[seriesIx];
                seriesClone = deepExtend({}, currentSeries);
                categoryAxis = plotArea.seriesCategoryAxis(currentSeries);
                axisPane = plotArea.findPane(categoryAxis.options.pane);

                if (inArray(axisPane, panes) && equalsIgnoreCase(categoryAxis.options.type, DATE)) {
                    categories = categoryAxis.options.categories;
                    categoryMap = categoryAxis.categoryMap;

                    srcData = seriesClone.data;
                    seriesClone.data = data = [];

                    for (groupIx = 0; groupIx < categories.length; groupIx++) {
                        categoryIndicies = categoryMap[groupIx];
                        srcValues = [];

                        for (i = 0; i < categoryIndicies.length; i++) {
                            categoryIx = categoryIndicies[i];
                            pointData = bindPoint(currentSeries, categoryIx);
                            value = pointData.value;

                            if (defined(value)) {
                                srcValues.push(pointData.value);
                            }
                        }

                        if (srcValues.length > 1) {
                            data[groupIx] = calculateAggregates(srcValues, currentSeries);
                        } else {
                            data[groupIx] = srcData[categoryIndicies[0]];
                        }
                    }
                }

                processedSeries.push(seriesClone);
            }

            plotArea.srcSeries = series;
            plotArea.series = processedSeries;
        },

        appendChart: function(chart, pane) {
            var plotArea = this,
                series = chart.options.series,
                categoryAxis = plotArea.seriesCategoryAxis(series[0]),
                categories = categoryAxis.options.categories,
                categoriesToAdd = math.max(0, categoriesCount(series) - categories.length);

            while (categoriesToAdd--) {
                categories.push("");
            }

            plotArea.valueAxisRangeTracker.update(chart.valueAxisRanges);

            PlotAreaBase.fn.appendChart.call(plotArea, chart, pane);
        },

        // TODO: Refactor, optionally use series.pane option
        seriesPaneName: function(series) {
            var plotArea = this,
                options = plotArea.options,
                axisName = series.axis,
                axisOptions = [].concat(options.valueAxis),
                axis = $.grep(axisOptions, function(a) { return a.name === axisName; })[0],
                panes = options.panes || [{}],
                defaultPaneName = (panes[0] || {}).name || "default",
                paneName = (axis || {}).pane || defaultPaneName;

            return paneName;
        },

        seriesCategoryAxis: function(series) {
            var plotArea = this,
                axisName = series.categoryAxis,
                axis = axisName ?
                    plotArea.namedCategoryAxes[axisName] :
                    plotArea.categoryAxis;

            if (!axis) {
                throw new Error("Unable to locate category axis with name " + axisName);
            }

            return axis;
        },

        createBarChart: function(series, pane) {
            if (series.length === 0) {
                return;
            }

            var plotArea = this,
                firstSeries = series[0],
                barChart = new BarChart(plotArea, {
                    series: series,
                    invertAxes: plotArea.invertAxes,
                    isStacked: firstSeries.stack && series.length > 1,
                    gap: firstSeries.gap,
                    spacing: firstSeries.spacing
                });

            plotArea.appendChart(barChart, pane);
        },

        createLineChart: function(series, pane) {
            if (series.length === 0) {
                return;
            }

            var plotArea = this,
                firstSeries = series[0],
                lineChart = new LineChart(plotArea, {
                    invertAxes: plotArea.invertAxes,
                    isStacked: firstSeries.stack && series.length > 1,
                    series: series
                });

            plotArea.appendChart(lineChart, pane);
        },

        createAreaChart: function(series, pane) {
            if (series.length === 0) {
                return;
            }

            var plotArea = this,
                firstSeries = series[0],
                areaChart = new AreaChart(plotArea, {
                    invertAxes: plotArea.invertAxes,
                    isStacked: firstSeries.stack && series.length > 1,
                    series: series
                });

            plotArea.appendChart(areaChart, pane);
        },

        createOHLCChart: function(series, pane) {
            if (series.length === 0) {
                return;
            }

            var plotArea = this,
                firstSeries = series[0],
                chart = new OHLCChart(plotArea, {
                    invertAxes: plotArea.invertAxes,
                    gap: firstSeries.gap,
                    series: series,
                    spacing: firstSeries.spacing
                });

            plotArea.appendChart(chart, pane);
        },

        createCandlestickChart: function(series, pane) {
            if (series.length === 0) {
                return;
            }

            var plotArea = this,
                firstSeries = series[0],
                chart = new CandlestickChart(plotArea, {
                    invertAxes: plotArea.invertAxes,
                    gap: firstSeries.gap,
                    series: series,
                    spacing: firstSeries.spacing
                });

            plotArea.appendChart(chart, pane);
        },

        axisRequiresRounding: function(categoryAxisName, categoryAxisIndex) {
            var plotArea = this,
                centeredSeries = plotArea.filterSeriesByType(
                    plotArea.series, [BAR, COLUMN, OHLC, CANDLESTICK]
                ),
                seriesIx,
                seriesAxis;

            for (seriesIx = 0; seriesIx < centeredSeries.length; seriesIx++) {
                seriesAxis = centeredSeries[seriesIx].categoryAxis || "";
                if (seriesAxis === categoryAxisName || (!seriesAxis && categoryAxisIndex === 0)) {
                    return true;
                }
            }
        },

        createCategoryAxes: function(panes) {
            var plotArea = this,
                invertAxes = plotArea.invertAxes,
                definitions = [].concat(plotArea.options.categoryAxis),
                i,
                axisOptions,
                axisPane,
                categories,
                type,
                name,
                dateCategory,
                categoryAxis,
                axes = [],
                primaryAxis;

            for (i = 0; i < definitions.length; i++) {
                axisOptions = definitions[i];
                axisPane = plotArea.findPane(axisOptions.pane);

                if (inArray(axisPane, panes)) {
                    name = axisOptions.name;
                    categories = axisOptions.categories || [];
                    dateCategory = categories[0] instanceof Date;
                    type  = axisOptions.type || "";
                    axisOptions = deepExtend({
                        vertical: invertAxes,
                        axisCrossingValue: invertAxes ? categories.length : 0
                    }, axisOptions);

                    if (!defined(axisOptions.justified)) {
                        axisOptions.justified = plotArea.inJustified();
                    }

                    if (plotArea.axisRequiresRounding(name, i)) {
                        axisOptions.justified = false;
                        axisOptions.roundToBaseUnit = true;
                    }

                    if ((!type && dateCategory) || equalsIgnoreCase(type, DATE)) {
                        categoryAxis = new DateCategoryAxis(axisOptions);
                    } else {
                        categoryAxis = new CategoryAxis(axisOptions);
                    }

                    if (name) {
                        if (plotArea.namedCategoryAxes[name]) {
                            throw new Error(
                                "Category axis with name " + name + " is already defined"
                            );
                        }
                        plotArea.namedCategoryAxes[name] = categoryAxis;
                    }

                    categoryAxis.axisIndex = i;
                    axes.push(categoryAxis);
                    plotArea.appendAxis(categoryAxis);
                }
            }

            primaryAxis = plotArea.categoryAxis || axes[0];
            plotArea.categoryAxis = primaryAxis;

            if (invertAxes) {
                plotArea.axisY = primaryAxis;
            } else {
                plotArea.axisX = primaryAxis;
            }
        },

        inJustified: function() {
            var plotArea = this,
                series = plotArea.series,
                i, currentSeries;

            for (i = 0; i < series.length; i++) {
                currentSeries = series[i];
                if (currentSeries.type !== AREA) {
                    return false;
                }
            }

            return true;
        },

        createValueAxes: function(panes) {
            var plotArea = this,
                tracker = plotArea.valueAxisRangeTracker,
                defaultRange = tracker.query(),
                definitions = [].concat(plotArea.options.valueAxis),
                invertAxes = plotArea.invertAxes,
                baseOptions = { vertical: !invertAxes },
                axisOptions,
                axisPane,
                valueAxis,
                primaryAxis,
                axes = [],
                range,
                name,
                i;

            for (i = 0; i < definitions.length; i++) {
                axisOptions = definitions[i];
                axisPane = plotArea.findPane(axisOptions.pane);

                if (inArray(axisPane, panes)) {
                    name = axisOptions.name;
                    range = tracker.query(name);

                    if (i === 0 && defaultRange) {
                        range.min = math.min(range.min, defaultRange.min);
                        range.max = math.max(range.max, defaultRange.max);
                    }

                    valueAxis = new NumericAxis(range.min, range.max,
                        deepExtend({}, baseOptions, axisOptions)
                    );

                    if (name) {
                        if (plotArea.namedValueAxes[name]) {
                            throw new Error(
                                "Value axis with name " + name + " is already defined"
                            );
                        }
                        plotArea.namedValueAxes[name] = valueAxis;
                    }

                    axes.push(valueAxis);
                    plotArea.appendAxis(valueAxis);
                }
            }

            primaryAxis = plotArea.valueAxis || axes[0];
            plotArea.valueAxis = primaryAxis;

            if (invertAxes) {
                plotArea.axisX = primaryAxis;
            } else {
                plotArea.axisY = primaryAxis;
            }
        },

        click: function(chart, e) {
            var plotArea = this,
                coords = chart._eventCoordinates(e),
                point = new Point2D(coords.x, coords.y),
                pane = plotArea.pointPane(point),
                allAxes,
                i,
                axis,
                categories = [],
                values = [];

            if (!pane) {
                return;
            }

            allAxes = pane.axes;
            for (i = 0; i < allAxes.length; i++) {
                axis = allAxes[i];
                if (axis.getValue) {
                    appendIfNotNull(values, axis.getValue(point));
                } else {
                    appendIfNotNull(categories, axis.getCategory(point));
                }
            }

            if (categories.length === 0) {
                appendIfNotNull(
                    categories, plotArea.categoryAxis.getCategory(point)
                );
            }

            if (categories.length > 0 && values.length > 0) {
                chart.trigger(PLOT_AREA_CLICK, {
                    element: $(e.target),
                    category: singleItemOrArray(categories),
                    value: singleItemOrArray(values)
                });
            }
        },

        pointPane: function(point) {
            var plotArea = this,
                panes = plotArea.panes,
                currentPane,
                i;

            for (i = 0; i < panes.length; i++) {
                currentPane = panes[i];
                if (currentPane.contentBox.containsPoint(point)) {
                    return currentPane;
                }
            }
        },

        pointsByCategory: function(category) {
            var plotArea = this,
                charts = plotArea.charts,
                points, pointCategory, point, i, j, result = [];

            for (i = 0; i < charts.length; i++) {
                points = charts[i].points;
                for (j = 0; j < points.length; j++) {
                    point = points[j];

                    if (point) {
                        pointCategory = point.category;
                        if (pointCategory instanceof Date && category instanceof Date) {
                            if (pointCategory.getTime() === category.getTime()) {
                                result.push(point);
                            }
                        } else {
                            if (pointCategory === category) {
                                result.push(point);
                            }
                        }
                    }
                }
            }

            return result;
        }
    });

    var AxisGroupRangeTracker = Class.extend({
        init: function() {
            var tracker = this;

            tracker.axisRanges = {};
        },

        update: function(chartAxisRanges) {
            var tracker = this,
                axisRanges = tracker.axisRanges,
                range,
                chartRange,
                axisName;

            for (axisName in chartAxisRanges) {
                range = axisRanges[axisName];
                chartRange = chartAxisRanges[axisName];
                axisRanges[axisName] = range =
                    range || { min: MAX_VALUE, max: MIN_VALUE };

                range.min = math.min(range.min, chartRange.min);
                range.max = math.max(range.max, chartRange.max);
            }
        },

        reset: function(axisName) {
            delete this.axisRanges[axisName];
        },

        query: function(axisName) {
            var tracker = this;

            return tracker.axisRanges[axisName] || { min: 0, max: 1 };
        }
    });

    var XYPlotArea = PlotAreaBase.extend({
        init: function(series, options) {
            var plotArea = this;

            plotArea.namedXAxes = {};
            plotArea.namedYAxes = {};

            plotArea.xAxisRangeTracker = new AxisGroupRangeTracker();
            plotArea.yAxisRangeTracker = new AxisGroupRangeTracker();

            PlotAreaBase.fn.init.call(plotArea, series, options);
        },

        options: {
            xAxis: {},
            yAxis: {}
        },

        render: function(panes) {
            var plotArea = this,
                seriesByPane = plotArea.groupSeriesByPane(),
                i,
                pane,
                paneSeries;

            panes = panes || plotArea.panes;

            for (i = 0; i < panes.length; i++) {
                pane = panes[i];
                paneSeries = seriesByPane[pane.options.name || "default"];

                if (!paneSeries) {
                    continue;
                }

                plotArea.createScatterChart(
                    plotArea.filterSeriesByType(paneSeries, SCATTER),
                    pane
                );

                plotArea.createScatterLineChart(
                    plotArea.filterSeriesByType(paneSeries, SCATTER_LINE),
                    pane
                );

                plotArea.createBubbleChart(
                    plotArea.filterSeriesByType(paneSeries, BUBBLE),
                    pane
                );
            }

            plotArea.createAxes(panes);
        },

        appendChart: function(chart, pane) {
            var plotArea = this;

            plotArea.xAxisRangeTracker.update(chart.xAxisRanges);
            plotArea.yAxisRangeTracker.update(chart.yAxisRanges);

            PlotAreaBase.fn.appendChart.call(plotArea, chart, pane);
        },

        removeAxis: function(axis) {
            var plotArea = this,
                axisName = axis.options.name;

            PlotAreaBase.fn.removeAxis.call(plotArea, axis);

            if (axis.options.vertical) {
                plotArea.yAxisRangeTracker.reset(axisName);
                delete plotArea.namedYAxes[axisName];
            } else {
                plotArea.xAxisRangeTracker.reset(axisName);
                delete plotArea.namedXAxes[axisName];
            }

            if (axis === plotArea.axisX) {
                delete plotArea.axisX;
            }

            if (axis === plotArea.axisY) {
                delete plotArea.axisY;
            }
        },

        // TODO: Refactor, optionally use series.pane option
        seriesPaneName: function(series) {
            var plotArea = this,
                options = plotArea.options,
                xAxisName = series.xAxis,
                xAxisOptions = [].concat(options.xAxis),
                xAxis = $.grep(xAxisOptions, function(a) { return a.name === xAxisName; })[0],
                yAxisName = series.yAxis,
                yAxisOptions = [].concat(options.yAxis),
                yAxis = $.grep(yAxisOptions, function(a) { return a.name === yAxisName; })[0],
                panes = options.panes || [{}],
                defaultPaneName = panes[0].name || "default",
                paneName = (xAxis || {}).pane || (yAxis || {}).pane || defaultPaneName;

            return paneName;
        },

        createScatterChart: function(series, pane) {
            var plotArea = this;

            if (series.length > 0) {
                plotArea.appendChart(
                    new ScatterChart(plotArea, { series: series }),
                    pane
                );
            }
        },

        createScatterLineChart: function(series, pane) {
            var plotArea = this;

            if (series.length > 0) {
                plotArea.appendChart(
                    new ScatterLineChart(plotArea, { series: series }),
                    pane
                );
            }
        },

        createBubbleChart: function(series, pane) {
            var plotArea = this;

            if (series.length > 0) {
                plotArea.appendChart(
                    new BubbleChart(plotArea, { series: series }),
                    pane
                );
            }
        },

        createXYAxis: function(options, vertical, axisIndex) {
            var plotArea = this,
                axisName = options.name,
                namedAxes = vertical ? plotArea.namedYAxes : plotArea.namedXAxes,
                tracker = vertical ? plotArea.yAxisRangeTracker : plotArea.xAxisRangeTracker,
                range = tracker.query(axisName),
                defaultRange = tracker.query(),
                axisOptions = deepExtend({}, options, { vertical: vertical }),
                axis,
                seriesIx,
                series = plotArea.series,
                currentSeries,
                firstPointValue,
                dateData;

            for (seriesIx = 0; seriesIx < series.length; seriesIx++) {
                currentSeries = series[seriesIx];
                if (currentSeries[vertical ? "yAxis" : "xAxis"] == axisOptions.name) {
                    firstPointValue = bindPoint(currentSeries, 0).value;
                    dateData = firstPointValue[vertical ? "y" : "x"] instanceof Date;

                    break;
                }
            }

            if (axisIndex === 0 && defaultRange) {
                range.min = math.min(range.min, defaultRange.min);
                range.max = math.max(range.max, defaultRange.max);
            }

            if (equalsIgnoreCase(axisOptions.type, DATE) || (!axisOptions.type && dateData)) {
                axis = new DateValueAxis(range.min, range.max, axisOptions);
            } else {
                axis = new NumericAxis(range.min, range.max, axisOptions);
            }

            if (axisName) {
                if (namedAxes[axisName]) {
                    throw new Error(
                        (vertical ? "Y" : "X") +
                        " axis with name " + axisName + " is already defined"
                    );
                }
                namedAxes[axisName] = axis;
            }

            plotArea.appendAxis(axis);

            return axis;
        },

        createAxes: function(panes) {
            var plotArea = this,
                options = plotArea.options,
                axisPane,
                xAxesOptions = [].concat(options.xAxis),
                xAxes = [],
                yAxesOptions = [].concat(options.yAxis),
                yAxes = [];

            each(xAxesOptions, function(i) {
                axisPane = plotArea.findPane(this.pane);
                if (inArray(axisPane, panes)) {
                    xAxes.push(plotArea.createXYAxis(this, false, i));
                }
            });

            each(yAxesOptions, function(i) {
                axisPane = plotArea.findPane(this.pane);
                if (inArray(axisPane, panes)) {
                    yAxes.push(plotArea.createXYAxis(this, true, i));
                }
            });

            plotArea.axisX = plotArea.axisX || xAxes[0];
            plotArea.axisY = plotArea.axisY || yAxes[0];
        },

        click: function(chart, e) {
            var plotArea = this,
                coords = chart._eventCoordinates(e),
                point = new Point2D(coords.x, coords.y),
                allAxes = plotArea.axes,
                i,
                length = allAxes.length,
                axis,
                xValues = [],
                yValues = [],
                currentValue,
                values;

            for (i = 0; i < length; i++) {
                axis = allAxes[i];
                values = axis.options.vertical ? yValues : xValues;
                currentValue = axis.getValue(point);
                if (currentValue !== null) {
                    values.push(currentValue);
                }
            }

            if (xValues.length > 0 && yValues.length > 0) {
                chart.trigger(PLOT_AREA_CLICK, {
                    element: $(e.target),
                    x: singleItemOrArray(xValues),
                    y: singleItemOrArray(yValues)
                });
            }
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
                    connectors: firstSeries.connectors,
                    legend: plotArea.options.legend
                });

            plotArea.appendChart(pieChart);
        }
    });

    var DonutPlotArea = PiePlotArea.extend({
        render: function() {
            var plotArea = this,
                series = plotArea.series;

            plotArea.createDonutChart(series);
        },

        createDonutChart: function(series) {
            var plotArea = this,
                firstSeries = series[0],
                donutChart = new DonutChart(plotArea, {
                    series: series,
                    padding: firstSeries.padding,
                    startAngle: firstSeries.startAngle,
                    connectors: firstSeries.connectors,
                    legend: plotArea.options.legend
                });

            plotArea.appendChart(donutChart);
        }
    });

    var PieAnimation = ElementAnimation.extend({
        options: {
            easing: "easeOutElastic",
            duration: INITIAL_ANIMATION_DURATION
        },

        setup: function() {
            var element = this.element,
                sector = element.config,
                startRadius;

            if (element.options.singleSegment) {
                sector = element;
            }

            this.endRadius = sector.r;
            startRadius = this.startRadius = sector.ir || 0;
            sector.r = startRadius;
        },

        step: function(pos) {
            var animation = this,
                element = animation.element,
                endRadius = animation.endRadius,
                sector = element.config,
                startRadius = animation.startRadius;

            if (element.options.singleSegment) {
                sector = element;
            }

            sector.r = interpolateValue(startRadius, endRadius, pos);
        }
    });

    var BubbleAnimation = ElementAnimation.extend({
        options: {
            easing: "easeOutElastic",
            duration: INITIAL_ANIMATION_DURATION
        },

        setup: function() {
            var circle = this.element;

            circle.endRadius = circle.radius;
            circle.radius = 0;
        },

        step: function(pos) {
            var circle = this.element,
                endRadius = circle.endRadius;

            circle.radius = interpolateValue(0, endRadius, pos);
        }
    });

    var BarAnimationDecorator = animationDecorator(BAR, BarAnimation),
        PieAnimationDecorator = animationDecorator(PIE, PieAnimation),
        BubbleAnimationDecorator = animationDecorator(BUBBLE, BubbleAnimation);

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
                overlay,
                overlayElement;

            highlight.hide();

            if (point.highlightOverlay) {
                overlay = point.highlightOverlay(view, highlight.options);

                if (overlay) {
                    overlayElement = view.renderElement(overlay);
                    viewElement.appendChild(overlayElement);

                    highlight.overlayElement = overlayElement;
                    highlight.visible = true;
                }
            }

            if (point.toggleHighlight) {
                point.toggleHighlight(view);
                highlight.point = point;
                highlight.visible = true;
            }
        },

        hide: function() {
            var highlight = this,
                overlayElement = highlight.overlayElement;

            if (overlayElement) {
                if (overlayElement.parentNode) {
                    overlayElement.parentNode.removeChild(overlayElement);
                }

                delete highlight.overlayElement;
            }

            if (highlight.point) {
                highlight.point.toggleHighlight(highlight.view);
                delete highlight.point;
            }

            highlight.visible = false;
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
                    "opacity: #= d.opacity #; filter: alpha(opacity=#= d.opacity * 100 #);'>" +
                    "</div>"
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
                content = point.formatValue(tooltipOptions.format);
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
                   font: tooltipOptions.font,
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

    var MultiplePointTooltip = Class.extend({
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
                    "opacity: #= d.opacity #; filter: alpha(opacity=#= d.opacity * 100 #);'>" +
                    "</div>"
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

        show: function() {
            var tooltip = this;

            tooltip.showTimeout =
                setTimeout(proxy(tooltip._show, tooltip), TOOLTIP_SHOW_DELAY);
        },

        _show: function() {
            var tooltip = this,
                point = tooltip.point,
                axis = tooltip.axis,
                plotArea = axis.plotArea,
                element = tooltip.element,
                options = tooltip.options,
                chartPadding = tooltip.chartPadding,
                anchor, tooltipTemplate, content = "",
                tooltipOptions, top, left, points;

            value = content = axis[options.stickyMode ? "getCategory" : "getValue"](point);
            if (options.stickyMode) {
                points = plotArea.pointsByCategory(value);
            }

            if (options.template) {
                template = template(options.template);
                content = template({
                    value: value
                });
            } else if (options.format) {
                content = autoFormat(options.format, value);
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
                   font: tooltipOptions.font,
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

        content: function(points) {
            var tooltip = this,
                content = "",
                i, point;

            if (points) {
                for (i = 0; i < points.length; i++) {
                    point = points[i];
                    if (!point) {
                        continue;
                    }

                    content = tooltip.pointContent(point);
                }
            }
        },

        pointContent: function(point) {
            var tooptip = this,
                content = point.value.toString(),
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
                content = point.formatValue(tooltipOptions.format);
            }

            return content;
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

    var Crosshair = ChartElement.extend({
        init: function(axis, options) {
            var crosshair = this;

            ChartElement.fn.init.call(crosshair, options);
            crosshair.axis = axis;

            if (!crosshair.options.id) {
                crosshair.options.id = uniqueId();
            }
            crosshair._visible = false;
            crosshair.stickyMode = axis instanceof CategoryAxis;
        },

        options: {
            color: BLACK,
            width: 1,
            zIndex: -1
        },

        repaint: function() {
            var crosshair = this,
                element = crosshair.element;

            crosshair.getViewElements(crosshair._view);
            element = crosshair.element;
            element.refresh(doc.getElementById(crosshair.options.id));
        },

        showAt: function(point) {
            var crosshair = this;

            crosshair._visible = true;
            crosshair.point = point;
            crosshair.repaint();

            if (crosshair.options.tooltip.visible) {
                if (!crosshair.tooltip) {
                    crosshair.tooltip = new CrosshairTooltip(
                        crosshair,
                        deepExtend({}, crosshair.options.tooltip, { stickyMode: crosshair.stickyMode } )
                    );
                }
                crosshair.tooltip.showAt(point);
            }
        },

        hide: function() {
            var crosshair = this;

            if (crosshair._visible) {
                crosshair._visible = false;
                crosshair.repaint();
                crosshair.tooltip.hide();
            }
        },

        linePoints: function() {
            var crosshair = this,
                axis = crosshair.axis,
                vertical = axis.options.vertical,
                plotAreaBox = axis.plotArea.backgroundBox(),
                point = crosshair.point,
                dim = vertical ? Y : X,
                slot, lineStart, lineEnd;

            lineStart = Point2D(plotAreaBox.x1, plotAreaBox.y1);
            if (vertical) {
                lineEnd = Point2D(plotAreaBox.x2, plotAreaBox.y1);
            } else {
                lineEnd = Point2D(plotAreaBox.x1, plotAreaBox.y2);
            }

            if (point) {
                if (crosshair.stickyMode) {
                    slot = axis.getSlot(axis.getCategoryIndex(point));
                    lineStart[dim] = lineEnd[dim] = slot.center()[dim];
                } else {
                    lineStart[dim] = lineEnd[dim] = point[dim];
                }
            }

            return [lineStart, lineEnd];
        },

        getViewElements: function(view) {
            var crosshair = this,
                options = crosshair.options,
                elements = [];

            crosshair.points = crosshair.linePoints();
            crosshair.element = view.createPolyline(crosshair.points, false, {
                id: options.id,
                stroke: options.color,
                strokeWidth: options.width,
                fill: "",
                dashType: options.dashType,
                zIndex: options.zIndex,
                visible: crosshair._visible
            });

            elements.push(crosshair.element);
            crosshair._view = view;

            append(elements, ChartElement.fn.getViewElements.call(crosshair, view));

            return elements;
        }
    });

    var CrosshairTooltip = Class.extend({
        init: function(crosshair, options) {
            var tooltip = this,
                chartElement = crosshair.axis.getRoot().parent.element;

            tooltip.options = deepExtend({}, tooltip.options, options);
            tooltip.axis = crosshair.axis;
            tooltip.crosshair = crosshair;
            options = tooltip.options;

            tooltip.chartPadding = {
                top: parseInt(chartElement.css("paddingTop"), 10),
                left: parseInt(chartElement.css("paddingLeft"), 10)
            };

            tooltip.template = CrosshairTooltip.template;
            if (!tooltip.template) {
                tooltip.template = Tooltip.template = renderTemplate(
                    "<div class='" + CSS_PREFIX + "tooltip' " +
                    "style='display:none; position: absolute; font: #= d.font #;" +
                    "border: #= d.border.width #px solid;" +
                    "opacity: #= d.opacity #; filter: alpha(opacity=#= d.opacity * 100 #);'>" +
                    "</div>"
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

        showAt: function(point) {
            var tooltip = this;

            tooltip.point = point;
            tooltip.showTimeout =
                setTimeout(proxy(tooltip._show, tooltip), TOOLTIP_SHOW_DELAY);
        },

        _show: function() {
            var tooltip = this,
                options = tooltip.options,
                point = tooltip.point,
                axis = tooltip.axis,
                element = tooltip.element,
                chartPadding = tooltip.chartPadding,
                value, content,
                anchor, top, left, template;

            if (!point) {
                return;
            }

            // Apply date format here
            value = content = axis[options.stickyMode ? "getCategory" : "getValue"](point);

            if (options.template) {
                template = template(options.template);
                content = template({
                    value: value
                });
            } else if (options.format) {
                content = autoFormat(options.format, value);
            }

            element.html(content);

            anchor = tooltip.tooltipPosition(element.outerWidth(), element.outerHeight());
            top = round(anchor.y + chartPadding.top) + "px";
            left = round(anchor.x + chartPadding.left) + "px";

            if (!tooltip.visible) {
                tooltip.element.css({ top: top, left: left });
            }

            element
                .css({
                   backgroundColor: options.background,
                   borderColor: options.border.color,
                   font: options.font,
                   color: options.color,
                   opacity: options.opacity,
                   borderWidth: options.border.width
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
        },

        tooltipPosition: function(width, height) {
            var tooltip = this,
                vertical = tooltip.axis.options.vertical,
                points = tooltip.crosshair.points,
                x, y;

            if (vertical) {
                x = points[1].x;
                y = points[1].y - height / 2;
            } else {
                x = points[0].x + 10;
                y = points[0].y;
            }

            return Point2D(x, y);
        }
    });

    var Aggregates = {
        max: function(values) {
            var result = math.max.apply(math, values);
            if (isNaN(result)) {
                return sparseArrayMax(values);
            } else {
                return result;
            }
        },

        min: function(values) {
            var result = math.min.apply(math, values);
            if (isNaN(result)) {
                return sparseArrayMin(values);
            } else {
                return result;
            }
        },

        sum: function(values) {
            var i,
                length = values.length,
                sum = 0,
                n;

            for (i = 0; i < length; i++) {
                n = values[i];
                if (defined(n) && !isNaN(n)) {
                    sum += n;
                }
            }

            return sum;
        },

        count: function(values) {
            return values.length;
        },

        avg: function(values) {
            return Aggregates.sum(values) / Aggregates.count(values);
        }
    };

    var Selection = Observable.extend({
        init: function(chart, categoryAxis, options) {
            var that = this,
                chartElement = chart.element,
                categoryAxisLineBox = categoryAxis.lineBox(),
                valueAxis = that.getValueAxis(categoryAxis),
                valueAxisLineBox = valueAxis.lineBox(),
                selectorPrefix = "." + CSS_PREFIX,
                wrapper, padding;

            Observable.fn.init.call(that);

            that.options = deepExtend({}, that.options, options);
            options = that.options;
            that.chart = chart;
            that.chartElement = chartElement;
            that.categoryAxis = categoryAxis;
            that.valueAxis = valueAxis;

            that.template = Selection.template;
            if (!that.template) {
                that.template = Selection.template = renderTemplate(
                    "<div class='" + CSS_PREFIX + "selector' " +
                    "style='width: #= d.width #px; height: #= d.height #px;" +
                    " top: #= d.offset.top #px; left: #= d.offset.left #px;'>" +
                    "<div class='" + CSS_PREFIX + "mask'></div>" +
                    "<div class='" + CSS_PREFIX + "mask'></div>" +
                    "<div class='" + CSS_PREFIX + "selection'>" +
                    "<div class='" + CSS_PREFIX + "handle " + CSS_PREFIX + "leftHandle'><div></div></div>" +
                    "<div class='" + CSS_PREFIX + "handle " + CSS_PREFIX + "rightHandle'><div></div></div>" +
                    "</div></div>"
                );
            }

            padding = {
                left: parseInt(chartElement.css("paddingLeft"), 10),
                right: parseInt(chartElement.css("paddingTop"), 10)
            };

            that.options = deepExtend({}, {
                width: categoryAxisLineBox.width(),
                height: valueAxisLineBox.height(),
                padding: padding,
                offset: {
                    left: valueAxisLineBox.x2 + padding.left,
                    top: valueAxisLineBox.y1 + padding.right
                },
                from: options.min,
                to: options.max
            }, options);

            if (that.options.visible) {
                that.wrapper = wrapper = $(that.template(that.options)).appendTo(chartElement);

                that.selection = wrapper.find(selectorPrefix + "selection");
                that.leftMask = wrapper.find(selectorPrefix + "mask").first();
                that.rightMask = wrapper.find(selectorPrefix + "mask").last();
                that.leftHandle = wrapper.find(selectorPrefix + "leftHandle");
                that.rightHandle = wrapper.find(selectorPrefix + "rightHandle");
                that.options.selection = {
                    border: {
                        left: parseFloat(that.selection.css("border-left-width"), 10),
                        right: parseFloat(that.selection.css("border-right-width"), 10)
                    }
                };

                that.leftHandle.css("top", (that.selection.height() - that.leftHandle.height()) / 2);
                that.rightHandle.css("top", (that.selection.height() - that.rightHandle.height()) / 2);

                that.move(options.from, options.to);

                that.bind(that.events, that.options);
                that.wrapper[0].style.cssText = that.wrapper[0].style.cssText;

                if (kendo.UserEvents) {
                    that.userEvents = new kendo.UserEvents(that.wrapper, {
                        global: true,
                        threshold: 5,
                        stopPropagation: true,
                        multiTouch: true,
                        start: proxy(that._start, that),
                        move: proxy(that._move, that),
                        end: proxy(that._end, that),
                        tap: proxy(that._tap, that),
                        gesturestart: proxy(that._gesturechange, that),
                        gesturechange: proxy(that._gesturechange, that)
                    });
                } else {
                    that.leftHandle.add(that.rightHandle).removeClass(CSS_PREFIX + "handle");
                }
            }
        },

        events: [
            SELECT_START,
            SELECT,
            SELECT_END
        ],

        options: {
            min: MIN_VALUE,
            max: MAX_VALUE
        },

        destroy: function() {
            var that = this,
                userEvents = that.userEvents;

            if (userEvents) {
                userEvents.destroy();
            }
        },

        _start: function(e) {
            var that = this,
                options = that.options,
                target = $(e.event.target);

            if (that._state || !target) {
                return;
            }

            that.chart._unsetActivePoint();
            that._state = {
                moveTarget: target.parents(".k-handle").add(target).first(),
                startLocation: e.x.location,
                range: {
                    from: options.from,
                    to: options.to
                }
            };

            if (that.trigger(SELECT_START, that._state.range)) {
                that.userEvents.cancel();
                that._state = null;
            }
        },

        _move: function(e) {
            if (!this._state) {
                return;
            }

            var that = this,
                state = that._state,
                options = that.options,
                fullSpan = options.max - options.min,
                delta = state.startLocation - e.x.location,
                range = state.range,
                span = range.to - range.from,
                target = state.moveTarget,
                scale = that.wrapper.width() / fullSpan,
                offset = math.round(delta / scale);

            if (!target) {
                return;
            }

            e.preventDefault();

            if (target.is(".k-selection")) {
                range.from = math.min(
                    math.max(options.min, options.from - offset),
                    options.max - span
                );
                range.to = math.min(
                    range.from + span,
                    options.max
                );
            } else if (target.is(".k-leftHandle")) {
                range.from = math.min(
                    math.max(options.min, options.from - offset),
                    options.max - 1
                );
                range.to = math.max(range.from + 1, range.to);
            } else if (target.is(".k-rightHandle")) {
                range.to = math.min(
                    math.max(options.min + 1, options.to - offset),
                    options.max
                );
                range.from = math.min(range.to - 1, range.from);
            }

            that.move(range.from, range.to);

            that.trigger(SELECT, range);
        },

        _end: function() {
            var that = this,
                range = that._state.range;

            delete that._state;
            that.set(range.from, range.to);
            that.trigger(SELECT_END, range);
        },

        _gesturechange: function(e) {
            if (!this._state) {
                return;
            }

            var that = this,
                chart = that.chart,
                state = that._state,
                options = that.options,
                categoryAxis = that.categoryAxis,
                range = state.range,
                p0 = chart._toModelCoordinates(e.touches[0].x.location).x,
                p1 = chart._toModelCoordinates(e.touches[1].x.location).x,
                left = math.min(p0, p1),
                right = math.max(p0, p1);

            e.preventDefault();
            state.moveTarget = null;

            range.from =
                categoryAxis.getCategoryIndex(new dataviz.Point2D(left)) ||
                options.min;

            range.to =
                categoryAxis.getCategoryIndex(new dataviz.Point2D(right)) ||
                options.max;

            that.move(range.from, range.to);
        },

        _tap: function(e) {
            var that = this,
                options = that.options,
                coords = that.chart._eventCoordinates(e),
                categoryAxis = that.categoryAxis,
                categoryIx = categoryAxis.getCategoryIndex(
                    new dataviz.Point2D(coords.x, categoryAxis.box.y1)
                ),
                span = options.to - options.from,
                mid = options.from + span / 2,
                offset = math.round(mid - categoryIx),
                from,
                to;

            if (that._state) {
                return;
            }

            e.preventDefault();
            that.chart._unsetActivePoint();

            from = math.min(
                math.max(options.min, options.from - offset),
                options.max - span
            );
            to = math.min(
                from + span,
                options.max
            );

            that.set(from, to);
            that.trigger(SELECT_END);
        },

        move: function(from, to) {
            var that = this,
                options = that.options,
                offset = options.offset,
                padding = options.padding,
                border = options.selection.border,
                categoryAxis = that.categoryAxis,
                leftMaskWidth,
                rightMaskWidth,
                box,
                distance;

            box = categoryAxis.getSlot(from);
            leftMaskWidth = round(box.x1 - offset.left + padding.left);
            that.leftMask.width(leftMaskWidth);
            that.selection.css("left", leftMaskWidth);

            box = categoryAxis.getSlot(to);
            rightMaskWidth = round(options.width - (box.x1 - offset.left + padding.left));
            that.rightMask.width(rightMaskWidth);
            distance = options.width - rightMaskWidth;
            if (distance != options.width) {
                distance += border.right;
            }

            that.rightMask.css("left", distance);
            that.selection.width(math.max(
                options.width - (leftMaskWidth + rightMaskWidth) - border.right,
                0
            ));
        },

        set: function(from, to) {
            var that = this,
                options = that.options;

            from = clipValue(from, options.min, options.max);
            to = clipValue(to, from + 1, options.max);

            if (options.visible) {
                that.move(from, to);
            }

            options.from = from;
            options.to = to;
        },

        expandLeft: function(delta) {
            var selection = this,
                options = selection.options;

            selection.set(
                math.min(options.from - delta, options.to - 1),
                options.to
            );
        },

        getValueAxis: function(categoryAxis) {
            var axes = categoryAxis.pane.axes,
                axesCount = axes.length,
                i, axis;

            for (i = 0; i < axesCount; i++) {
                axis = axes[i];

                if (axis.options.vertical !== categoryAxis.options.vertical) {
                    return axis;
                }
            }
        }
    });

    function calculateAggregates(values, series) {
        var aggregate = series.aggregate,
            result;

        function execSimple(values, aggregate, series) {
            var result,
                aggregateType = typeof aggregate;

            if (aggregateType === STRING) {
                result = Aggregates[aggregate](values);
            } else if (aggregateType === "function") {
                result = aggregate(values, series);
            } else {
                result = Aggregates.max(values);
            }

            return result;
        }

        function execComposite(values, aggregate, series) {
            var valueFields = valueFieldsByChartType(series.type),
                valueFieldsCount = valueFields.length,
                count = values.length,
                i,
                j,
                field,
                result = [],
                data = [];

            for (i = 0; i < valueFieldsCount; i++) {
                field = valueFields[i];
                for (j = 0; j < count; j++) {
                    data.push(values[j][field]);
                }
                result.push(execSimple(data, aggregate[field], series));
                data = [];
            }

            return result;
        }

        if (typeof aggregate === "object") {
            result = execComposite(values, aggregate, series);
        } else {
            result = execSimple(values, aggregate, series);
        }

        return result;
    }

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
            if (n !== null && isFinite(n)) {
                min = math.min(min, n);
                max = math.max(max, n);
            }
        }

        return {
            min: min === MAX_VALUE ? undefined : min,
            max: max === MIN_VALUE ? undefined : max
        };
    }

    function intersection(a1, a2, b1, b2) {
        var result,
            ua_t = (b2.x - b1.x) * (a1.y - b1.y) - (b2.y - b1.y) * (a1.x - b1.x),
            u_b = (b2.y - b1.y) * (a2.x - a1.x) - (b2.x - b1.x) * (a2.y - a1.y),
            ua;

        if (u_b !== 0) {
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
        delete seriesDefaults.bubble;
        delete seriesDefaults.candlestick;
        delete seriesDefaults.ohlc;
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

    function resolveAxisAliases(options) {
        var alias;

        each([CATEGORY, VALUE, X, Y], function() {
            alias = this + "Axes";
            if (options[alias]) {
                options[this + "Axis"] = options[alias];
                delete options[alias];
            }
        });
    }

    function applyAxisDefaults(options, themeOptions) {
        var themeAxisDefaults = ((themeOptions || {}).axisDefaults) || {};

        each([CATEGORY, VALUE, X, Y], function() {
            var axisName = this + "Axis",
                axes = [].concat(options[axisName]),
                axisDefaults = options.axisDefaults || {};

            axes = $.map(axes, function(axisOptions) {
                var axisColor = (axisOptions || {}).color;
                return deepExtend({},
                    themeAxisDefaults,
                    themeAxisDefaults[axisName],
                    axisDefaults,
                    axisDefaults[axisName],
                    {
                        line: { color: axisColor },
                        labels: { color: axisColor },
                        title: { color: axisColor }
                    },
                    axisOptions
                );
            });

            options[axisName] = axes.length > 1 ? axes : axes[0];
        });
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

        var get = getter(field, true);
        return get(row);
    }

    function toDate(value) {
        var result,
            aspDate,
            i;

        if (value instanceof Date) {
            result = value;
        } else if (typeof value === STRING) {
            aspDate = DATE_REGEXP.exec(value);
            result = new Date(aspDate ? parseInt(aspDate[1], 10) : value);
        } else if (value) {
            if (value.length) {
                result = [];
                for (i = 0; i < value.length; i++) {
                    result.push(toDate(value[i]));
                }
            } else {
                result = new Date(value);
            }
        }

        return result;
    }

    function toTime(value) {
        if (isArray(value)) {
            return map(value, toTime);
        } else if (value) {
            return toDate(value).getTime();
        }
    }

    function addDuration(date, value, unit, weekStartDay) {
        var result = date;

        if (date) {
            date = toDate(date);

            if (unit === YEARS) {
                result = new Date(date.getFullYear() + value, 0, 1);
            } else if (unit === MONTHS) {
                result = new Date(date.getFullYear(), date.getMonth() + value, 1);
            } else if (unit === WEEKS) {
                result = addDuration(startOfWeek(date, weekStartDay), value * 7, DAYS);
            } else if (unit === DAYS) {
                result = new Date(date.getFullYear(), date.getMonth(), date.getDate() + value);
            } else if (unit === HOURS) {
                result = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours() + value);
                if (value > 0 && dateEquals(date, result)) {
                    result = addDuration(date, value + 1, unit, weekStartDay);
                }
            } else if (unit === MINUTES) {
                result = new Date(date.getTime() + value * TIME_PER_MINUTE);
                result.setSeconds(0);
            }
        }

        return result;
    }

    function startOfWeek(date, weekStartDay) {
        var day = date.getDay(),
            daysToSubtract = 0;

        weekStartDay = weekStartDay || 0;
        while (day !== weekStartDay) {
            if (day === 0) {
                day = 6;
            } else {
                day--;
            }

            daysToSubtract++;
        }

        return addTicks(date, -daysToSubtract * TIME_PER_DAY);
    }

    function floorDate(date, unit, weekStartDay) {
        date = toDate(date);

        return addDuration(date, 0, unit, weekStartDay);
    }

    function ceilDate(date, unit, weekStartDay) {
        date = toDate(date);

        if (floorDate(date, unit, weekStartDay).getTime() === date.getTime()) {
            return date;
        }

        return addDuration(date, 1, unit, weekStartDay);
    }

    function dateDiff(a, b) {
        var diff = a.getTime() - b,
            offsetDiff = a.getTimezoneOffset() - b.getTimezoneOffset();

        return diff - (offsetDiff * TIME_PER_MINUTE);
    }

    function addTicks(date, ticks) {
        var tzOffsetBefore = date.getTimezoneOffset(),
            result = new Date(date.getTime() + ticks),
            tzOffsetDiff = result.getTimezoneOffset() - tzOffsetBefore;

        return new Date(result.getTime() + tzOffsetDiff * TIME_PER_MINUTE);
    }

    function duration(a, b, unit) {
        var diff;

        if (unit === YEARS) {
            diff = b.getFullYear() - a.getFullYear();
        } else if (unit === MONTHS) {
            diff = duration(a, b, YEARS) * 12 + b.getMonth() - a.getMonth();
        } else if (unit === DAYS) {
            diff = math.floor(dateDiff(b, a) / TIME_PER_DAY);
        } else {
            diff = math.floor((b - a) / TIME_PER_UNIT[unit]);
        }

        return diff;
    }

    function valueFieldsByChartType(type) {
        var result = [VALUE];

        if (inArray(type, [CANDLESTICK, OHLC])){
            result = ["open", "high", "low", "close"];
        } else if (inArray(type, XY_CHARTS)) {
            result = [X, Y];
            if (type === BUBBLE) {
                result.push("size");
            }
        }

        return result;
    }

    function bindPoint(series, pointIx, pointFields) {
        var pointData = series.data[pointIx],
            fieldData,
            fields = {},
            srcValueFields,
            srcPointFields,
            valueFields = valueFieldsByChartType(series.type),
            value,
            result = { value: pointData };

        if (defined(pointData)) {
            if (isArray(pointData)) {
                fieldData = pointData.slice(valueFields.length);
                value = bindFromArray(pointData, valueFields);
                fields = bindFromArray(fieldData, pointFields);
            } else if (typeof pointData === "object") {
                srcValueFields = mapSeriesFields(series, valueFields);
                srcPointFields = mapSeriesFields(series, pointFields);

                value = bindFromObject(pointData, valueFields, srcValueFields);
                fields = bindFromObject(pointData, pointFields, srcPointFields);
            }
        } else {
            value = bindFromObject({}, valueFields);
        }

        if (defined(value)) {
            if (valueFields.length === 1) {
                value = value[valueFields[0]];
            }

            result.value = value;
        }

        result.fields = fields;

        return result;
    }

    function bindFromArray(array, fields) {
        var value = {},
            i,
            length;

        if (fields) {
            length = math.min(fields.length, array.length);

            for (i = 0; i < length; i++) {
                value[fields[i]] = array[i];
            }
        }

        return value;
    }

    function bindFromObject(object, fields, srcFields) {
        var value = {},
            i,
            length,
            fieldName,
            srcFieldName;

        if (fields) {
            length = fields.length;
            srcFields = srcFields || fields;

            for (i = 0; i < length; i++) {
                fieldName = fields[i];
                srcFieldName = srcFields[i];
                value[fieldName] = getField(srcFieldName, object);
            }
        }

        return value;
    }

    function mapSeriesFields(series, fields) {
        var i,
            length,
            fieldName,
            sourceFields,
            sourceFieldName;

        if (fields) {
            length = fields.length;
            sourceFields = [];

            for (i = 0; i < length; i++) {
                fieldName = fields[i];
                sourceFieldName = fieldName === VALUE ? "field" : fieldName + "Field";

                sourceFields.push(series[sourceFieldName] || fieldName);
            }
        }

        return sourceFields;
    }

    function singleItemOrArray(array) {
        return array.length === 1 ? array[0] : array;
    }

    function clipValue(value, min, max) {
        return math.max(math.min(value, max), min);
    }

    function axisGroupBox(axes) {
        var box = new Box2D(),
            i,
            length = axes.length,
            currentAxis;

        if (length > 0) {
            for (i = 0; i < length; i++) {
                currentAxis = axes[i];

                if (i === 0) {
                    box = currentAxis.box.clone();
                } else {
                    box.wrap(currentAxis.box);
                }
            }
        }

        return box;
    }

    function equalsIgnoreCase(a, b) {
        if (a && b) {
            return a.toLowerCase() === b.toLowerCase();
        }

        return a === b;
    }

    function dateEquals(a, b) {
        if (a && b) {
            return toTime(a) === toTime(b);
        }

        return a === b;
    }

    function lastValue(array) {
        var i = array.length,
            value;

        while (i--) {
            value = array[i];
            if (defined(value) && value !== null) {
                return value;
            }
        }
    }

    function appendIfNotNull(array, element) {
        if (element !== null) {
            array.push(element);
        }
    }

    function lteDateIndex(sortedDates, date) {
        var low = 0,
            high = sortedDates.length - 1,
            i,
            currentDate;

        while (low <= high) {
            i = math.floor((low + high) / 2);
            currentDate = sortedDates[i];

            if (currentDate < date) {
                low = i + 1;
                continue;
            }

            if (currentDate > date) {
                high = i - 1;
                continue;
            }

            return i;
        }

        if (sortedDates[i] <= date) {
            return i;
        } else {
            return i - 1;
        }
    }

    function validNumbers(values) {
        var valid = true,
            i,
            val,
            length = values.length;

        for (i = 0; i < length; i++) {
            val = values[i];
            if (typeof val !== "number" || isNaN(val)) {
                valid = false;
                break;
            }
        }

        return valid;
    }

    function axisRanges(axes) {
        var i,
            axis,
            axisName,
            ranges = {};

        for (i = 0; i < axes.length; i++) {
            axis = axes[i];
            axisName = axis.options.name;
            if (axisName) {
                ranges[axisName] = axis.range();
            }
        }

        return ranges;
    }

    // Exports ================================================================
    dataviz.ui.plugin(Chart);

    deepExtend(dataviz, {
        Aggregates: Aggregates,
        AreaChart: AreaChart,
        Bar: Bar,
        BarAnimationDecorator: BarAnimationDecorator,
        BarChart: BarChart,
        BarLabel: BarLabel,
        BubbleAnimationDecorator: BubbleAnimationDecorator,
        BubbleChart: BubbleChart,
        CandlestickChart: CandlestickChart,
        Candlestick: Candlestick,
        CategoricalPlotArea: CategoricalPlotArea,
        CategoryAxis: CategoryAxis,
        ClusterLayout: ClusterLayout,
        DateCategoryAxis: DateCategoryAxis,
        DateValueAxis: DateValueAxis,
        DonutChart: DonutChart,
        DonutPlotArea: DonutPlotArea,
        DonutSegment: DonutSegment,
        Highlight: Highlight,
        Legend: Legend,
        LineChart: LineChart,
        LinePoint: LinePoint,
        Pane: Pane,
        PieAnimation: PieAnimation,
        PieAnimationDecorator: PieAnimationDecorator,
        PieChart: PieChart,
        PiePlotArea: PiePlotArea,
        PieSegment: PieSegment,
        ScatterChart: ScatterChart,
        ScatterLineChart: ScatterLineChart,
        Selection: Selection,
        ShapeElement: ShapeElement,
        StackLayout: StackLayout,
        Tooltip: Tooltip,
        OHLCChart: OHLCChart,
        OHLCPoint: OHLCPoint,
        XYPlotArea: XYPlotArea,

        addDuration: addDuration,
        axisGroupBox: axisGroupBox,
        validNumbers: validNumbers,
        bindPoint: bindPoint,
        categoriesCount: categoriesCount,
        ceilDate: ceilDate,
        duration: duration,
        floorDate: floorDate,
        lteDateIndex: lteDateIndex,
        sparseArrayLimits: sparseArrayLimits,
        toDate: toDate,
        toTime: toTime
    });

})(window.kendo.jQuery);
