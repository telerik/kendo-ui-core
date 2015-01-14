(function(f, define){
    define([ "./kendo.data", "./kendo.userevents", "./kendo.dataviz.core", "./kendo.drawing", "./kendo.dataviz.themes" ], f);
})(function(){

var __meta__ = {
    id: "dataviz.chart",
    name: "Chart",
    category: "dataviz",
    description: "The Chart widget uses modern browser technologies to render high-quality data visualizations in the browser.",
    depends: [ "data", "userevents", "drawing", "dataviz.core", "dataviz.themes" ],
    features: [ {
        id: "dataviz.chart-polar",
        name: "Polar & Radar",
        description: "Support for Polar and Radar charts.",
        depends: [ "dataviz.chart.polar" ],
        requireJS: false
    }, {
        id: "dataviz.chart-funnel",
        name: "Funnel chart",
        description: "Support for Funnel chart.",
        depends: [ "dataviz.chart.funnel" ],
        requireJS: false
    }, {
        id: "dataviz.chart-pdf-export",
        name: "PDF export",
        description: "Export Chart as PDF",
        depends: [ "pdf" ]
    }]
};

(function ($, undefined) {
    // Imports ================================================================
    var each = $.each,
        isArray = $.isArray,
        map = $.map,
        math = Math,
        noop = $.noop,
        extend = $.extend,
        proxy = $.proxy,

        kendo = window.kendo,
        Class = kendo.Class,
        Observable = kendo.Observable,
        DataSource = kendo.data.DataSource,
        Widget = kendo.ui.Widget,
        deepExtend = kendo.deepExtend,
        getter = kendo.getter,
        isFn = kendo.isFunction,
        template = kendo.template,

        dataviz = kendo.dataviz,
        Axis = dataviz.Axis,
        AxisLabel = dataviz.AxisLabel,
        Box2D = dataviz.Box2D,
        BoxElement = dataviz.BoxElement,
        ChartElement = dataviz.ChartElement,
        Color = kendo.drawing.Color,
        CurveProcessor = dataviz.CurveProcessor,
        FloatElement = dataviz.FloatElement,
        Note = dataviz.Note,
        LogarithmicAxis = dataviz.LogarithmicAxis,
        NumericAxis = dataviz.NumericAxis,
        Point2D = dataviz.Point2D,
        RootElement = dataviz.RootElement,
        Ring = dataviz.Ring,
        ShapeElement = dataviz.ShapeElement,
        ShapeBuilder = dataviz.ShapeBuilder,
        Text = dataviz.Text,
        TextBox = dataviz.TextBox,
        Title = dataviz.Title,
        alignPathToPixel = dataviz.alignPathToPixel,
        autoFormat = dataviz.autoFormat,
        dateComparer = dataviz.dateComparer,
        getSpacing = dataviz.getSpacing,
        inArray = dataviz.inArray,
        interpolate = dataviz.interpolateValue,
        mwDelta = dataviz.mwDelta,
        round = dataviz.round,

        util = kendo.util,
        append = util.append,
        defined = util.defined,
        last = util.last,
        limitValue = util.limitValue,
        sparseArrayLimits = util.sparseArrayLimits,
        sparseArrayMin = util.sparseArrayMin,
        sparseArrayMax = util.sparseArrayMax,
        renderTemplate = util.renderTemplate,
        valueOrDefault = util.valueOrDefault,

        geom = dataviz.geometry,
        draw = dataviz.drawing;

    // Constants ==============================================================
    var NS = ".kendoChart",
        ABOVE = "above",
        AREA = "area",
        AUTO = "auto",
        FIT = "fit",
        AXIS_LABEL_CLICK = dataviz.AXIS_LABEL_CLICK,
        BAR = "bar",
        BAR_ALIGN_MIN_WIDTH = 6,
        BAR_BORDER_BRIGHTNESS = 0.8,
        BELOW = "below",
        BLACK = "#000",
        BOTH = "both",
        BOTTOM = "bottom",
        BOX_PLOT = "boxPlot",
        BUBBLE = "bubble",
        BULLET = "bullet",
        CANDLESTICK = "candlestick",
        CATEGORY = "category",
        CENTER = "center",
        CHANGE = "change",
        CIRCLE = "circle",
        CONTEXTMENU_NS = "contextmenu" + NS,
        CLIP = dataviz.CLIP,
        COLOR = "color",
        COLUMN = "column",
        COORD_PRECISION = dataviz.COORD_PRECISION,
        CROSS = "cross",
        CSS_PREFIX = "k-",
        CUSTOM = "custom",
        DATABOUND = "dataBound",
        DATE = "date",
        DAYS = "days",
        DEFAULT_FONT = dataviz.DEFAULT_FONT,
        DEFAULT_HEIGHT = dataviz.DEFAULT_HEIGHT,
        DEFAULT_PRECISION = dataviz.DEFAULT_PRECISION,
        DEFAULT_WIDTH = dataviz.DEFAULT_WIDTH,
        DEFAULT_ERROR_BAR_WIDTH = 4,
        DONUT = "donut",
        DONUT_SECTOR_ANIM_DELAY = 50,
        DRAG = "drag",
        DRAG_END = "dragEnd",
        DRAG_START = "dragStart",
        ERROR_LOW_FIELD = "errorLow",
        ERROR_HIGH_FIELD = "errorHigh",
        X_ERROR_LOW_FIELD = "xErrorLow",
        X_ERROR_HIGH_FIELD = "xErrorHigh",
        Y_ERROR_LOW_FIELD = "yErrorLow",
        Y_ERROR_HIGH_FIELD = "yErrorHigh",
        FADEIN = "fadeIn",
        FIRST = "first",
        FROM = "from",
        FUNNEL = "funnel",
        GLASS = "glass",
        HORIZONTAL = "horizontal",
        HORIZONTAL_WATERFALL = "horizontalWaterfall",
        HOURS = "hours",
        INITIAL_ANIMATION_DURATION = dataviz.INITIAL_ANIMATION_DURATION,
        INSIDE_BASE = "insideBase",
        INSIDE_END = "insideEnd",
        INTERPOLATE = "interpolate",
        LEFT = "left",
        LEGEND_ITEM_CLICK = "legendItemClick",
        LEGEND_ITEM_HOVER = "legendItemHover",
        LINE = "line",
        LINE_MARKER_SIZE = 8,
        LINEAR = "linear",
        LOGARITHMIC = "log",
        MAX = "max",
        MAX_EXPAND_DEPTH = 5,
        MAX_VALUE = Number.MAX_VALUE,
        MIN = "min",
        MIN_VALUE = -Number.MAX_VALUE,
        MINUTES = "minutes",
        MONTHS = "months",
        MOUSELEAVE_NS = "mouseleave" + NS,
        MOUSEMOVE_TRACKING = "mousemove.tracking",
        MOUSEOVER_NS = "mouseover" + NS,
        MOUSEOUT_NS = "mouseout" + NS,
        MOUSEMOVE_NS = "mousemove" + NS,
        MOUSEMOVE_DELAY = 20,
        MOUSEWHEEL_DELAY = 150,
        MOUSEWHEEL_NS = "DOMMouseScroll" + NS + " mousewheel" + NS,
        NOTE_CLICK = dataviz.NOTE_CLICK,
        NOTE_HOVER = dataviz.NOTE_HOVER,
        NOTE_TEXT = "noteText",
        OBJECT = "object",
        OHLC = "ohlc",
        OUTSIDE_END = "outsideEnd",
        OUTLINE_SUFFIX = "_outline",
        PIE = "pie",
        PIE_SECTOR_ANIM_DELAY = 70,
        PLOT_AREA_CLICK = "plotAreaClick",
        POINTER = "pointer",
        RANGE_BAR = "rangeBar",
        RANGE_COLUMN = "rangeColumn",
        RENDER = "render",
        RIGHT = "right",
        ROUNDED_BEVEL = "roundedBevel",
        ROUNDED_GLASS = "roundedGlass",
        SCATTER = "scatter",
        SCATTER_LINE = "scatterLine",
        SECONDS = "seconds",
        SELECT_START = "selectStart",
        SELECT = "select",
        SELECT_END = "selectEnd",
        SERIES_CLICK = "seriesClick",
        SERIES_HOVER = "seriesHover",
        START_SCALE = 0.001,
        STEP = "step",
        SMOOTH = "smooth",
        STD_ERR = "stderr",
        STD_DEV = "stddev",
        STRING = "string",
        SUMMARY_FIELD = "summary",
        TIME_PER_SECOND = 1000,
        TIME_PER_MINUTE = 60 * TIME_PER_SECOND,
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
            "minutes": TIME_PER_MINUTE,
            "seconds": TIME_PER_SECOND
        },
        TO = "to",
        TOP = "top",
        TOOLTIP_ANIMATION_DURATION = 150,
        TOOLTIP_OFFSET = 5,
        TOOLTIP_SHOW_DELAY = 100,
        TOOLTIP_HIDE_DELAY = 100,
        TOOLTIP_INVERSE = "chart-tooltip-inverse",
        VALUE = "value",
        VERTICAL = "vertical",
        VERTICAL_AREA = "verticalArea",
        VERTICAL_BULLET = "verticalBullet",
        VERTICAL_LINE = "verticalLine",
        WATERFALL = "waterfall",
        WEEKS = "weeks",
        WHITE = "#fff",
        X = "x",
        Y = "y",
        YEARS = "years",
        ZERO = "zero",
        ZOOM_ACCELERATION = 3,
        ZOOM_START = "zoomStart",
        ZOOM = "zoom",
        ZOOM_END = "zoomEnd",
        BASE_UNITS = [
            SECONDS, MINUTES, HOURS, DAYS, WEEKS, MONTHS, YEARS
        ],
        EQUALLY_SPACED_SERIES = [
            BAR, COLUMN, OHLC, CANDLESTICK, BOX_PLOT, BULLET, RANGE_COLUMN, RANGE_BAR, WATERFALL, HORIZONTAL_WATERFALL
        ];

    var DateLabelFormats = {
        seconds: "HH:mm:ss",
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
                dataSource;

            kendo.destroy(element);

            Widget.fn.init.call(chart, element);

            chart.element
                .addClass(CSS_PREFIX + this.options.name.toLowerCase())
                .css("position", "relative");

            if (userOptions) {
                dataSource = userOptions.dataSource;
                userOptions.dataSource = undefined;
            }

            options = deepExtend({}, chart.options, userOptions);
            chart._originalOptions = deepExtend({}, options);
            chart._initTheme(options);

            chart._initSurface();

            chart.bind(chart.events, chart.options);

            chart.wrapper = chart.element;

            if (userOptions) {
                userOptions.dataSource = dataSource;
            }

            chart._initDataSource(userOptions);

            kendo.notify(chart, dataviz.ui);
        },

        _initTheme: function(options) {
            var chart = this,
                themes = dataviz.ui.themes || {},
                themeName = options.theme,
                theme = themes[themeName] || themes[themeName.toLowerCase()],
                themeOptions = themeName && theme ? theme.chart : {},
                seriesCopies = [],
                series = options.series || [],
                i;

            for (i = 0; i < series.length; i++) {
                seriesCopies.push($.extend({}, series[i]));
            }
            options.series = seriesCopies;

            resolveAxisAliases(options);
            chart._applyDefaults(options, themeOptions);

            // Clean up default if not overriden by data attributes
            if (options.seriesColors === null) {
                options.seriesColors = undefined;
            }

            chart.options = deepExtend({}, themeOptions, options);
            applySeriesColors(chart.options);
        },

        _initDataSource: function(userOptions) {
            var chart = this,
                dataSource = (userOptions || {}).dataSource;

            chart._dataChangeHandler = proxy(chart._onDataChanged, chart);

            chart.dataSource = DataSource
                .create(dataSource)
                .bind(CHANGE, chart._dataChangeHandler);

            chart._bindCategories();

            if (dataSource) {
                chart._hasDataSource = true;
            }

            chart._redraw();
            chart._attachEvents();

            if (dataSource) {
                if (chart.options.autoBind) {
                    chart.dataSource.fetch();
                }
            }
        },

        setDataSource: function(dataSource) {
            var chart = this;

            chart.dataSource.unbind(CHANGE, chart._dataChangeHandler);
            chart.dataSource = dataSource = DataSource.create(dataSource);
            chart._hasDataSource = true;
            chart._hasData = false;

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
            LEGEND_ITEM_CLICK,
            LEGEND_ITEM_HOVER,
            PLOT_AREA_CLICK,
            DRAG_START,
            DRAG,
            DRAG_END,
            ZOOM_START,
            ZOOM,
            ZOOM_END,
            SELECT_START,
            SELECT,
            SELECT_END,
            NOTE_CLICK,
            NOTE_HOVER,
            RENDER
        ],

        items: function() {
            return $();
        },

        options: {
            name: "Chart",
            renderAs: "",
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
                highlight: {
                    visible: true
                },
                labels: {},
                negativeValues: {
                    visible: false
                }
            },
            series: [],
            seriesColors: null,
            tooltip: {
                visible: false
            },
            transitions: true,
            valueAxis: {},
            plotArea: {},
            title: {},
            xAxis: {},
            yAxis: {},
            panes: [{}]
        },

        refresh: function() {
            var chart = this;

            chart._applyDefaults(chart.options);

            applySeriesColors(chart.options);

            chart._bindSeries();
            chart._bindCategories();

            chart.trigger(DATABOUND);
            chart._redraw();
        },

        getSize: function() {
            return kendo.dimensions(this.element);
        },

        _resize: function() {
            var t = this.options.transitions;
            this.options.transitions = false;

            this._redraw();

            this.options.transitions = t;
        },

        redraw: function(paneName) {
            var chart = this,
                pane,
                plotArea;

            chart._applyDefaults(chart.options);
            applySeriesColors(chart.options);

            if (paneName) {
                plotArea = chart._model._plotArea;
                pane = plotArea.findPane(paneName);
                plotArea.redraw(pane);
            } else {
                chart._redraw();
            }
        },

        _initSurface: function() {
            var surface = this.surface;
            var wrap = this._surfaceWrap();
            if (!surface || surface.options.type !== this.options.renderAs) {
                if (surface) {
                    surface.destroy();
                }

                this.surface = draw.Surface.create(wrap, {
                    type: this.options.renderAs
                });
            } else {
                this.surface.clear();
            }

            var chartArea = this.options.chartArea;
            if (chartArea.width) {
                wrap.css("width", chartArea.width);
            }
            if (chartArea.height) {
                wrap.css("height", chartArea.height);
            }
        },

        _surfaceWrap: function() {
            return this.element;
        },

        _redraw: function() {
            var chart = this,
                model = chart._getModel(),
                view;

            chart._destroyView();

            chart._model = model;
            chart._plotArea = model._plotArea;

            model.renderVisual();

            if (this.options.transitions !== false) {
                model.traverse(function(element) {
                    if (element.animation) {
                        element.animation.setup();
                    }
                });
            }

            chart._initSurface();
            chart.surface.draw(model.visual);

            if (this.options.transitions !== false) {
                model.traverse(function(element) {
                    if (element.animation) {
                        element.animation.play();
                    }
                });
            }

            chart._tooltip = chart._createTooltip();
            chart._highlight = new Highlight(view);
            chart._setupSelection();

            if (!chart._hasDataSource || chart._hasData || !chart.options.autoBind) {
                chart.trigger(RENDER);
            }
        },

        exportVisual: function() {
            var model = this._getModel();
            model.renderVisual();

            return model.visual;
        },

        _sharedTooltip: function() {
            var chart = this,
                options = chart.options;

            return chart._plotArea instanceof CategoricalPlotArea && options.tooltip.shared;
        },

        _createTooltip: function() {
            var chart = this,
                options = chart.options,
                element = chart.element,
                tooltip;

            if (chart._sharedTooltip()) {
                tooltip = new SharedTooltip(element, chart._plotArea, options.tooltip);
            } else {
                tooltip = new Tooltip(element, options.tooltip);
            }

            return tooltip;
        },

        _applyDefaults: function(options, themeOptions) {
            applyAxisDefaults(options, themeOptions);
            applySeriesDefaults(options, themeOptions);
        },

        _getModel: function() {
            var chart = this,
                options = chart.options,
                model = new RootElement(chart._modelOptions()),
                plotArea;

            model.chart = chart;

            Title.buildTitle(options.title, model);

            plotArea = model._plotArea = chart._createPlotArea();
            if (options.legend.visible) {
                model.append(new Legend(plotArea.options.legend));
            }
            model.append(plotArea);
            model.reflow();

            return model;
        },

        _modelOptions: function() {
            var chart = this,
                options = chart.options,
                element = chart.element,
                height = math.floor(element.height()),
                width = math.floor(element.width());

            chart._size = null;

            return deepExtend({
                width: width || DEFAULT_WIDTH,
                height: height || DEFAULT_HEIGHT,
                transitions: options.transitions
            }, options.chartArea);
        },

        _createPlotArea: function(skipSeries) {
            var chart = this,
                options = chart.options;

            return PlotAreaFactory.current.create(skipSeries ? [] : options.series, options);
        },

        _setupSelection: function() {
            var chart = this,
                plotArea = chart._plotArea,
                axes = plotArea.axes,
                selections = chart._selections = [],
                selection, i, axis,
                min, max, options;

            if (!chart._selectStartHandler) {
                chart._selectStartHandler = proxy(chart._selectStart, chart);
                chart._selectHandler = proxy(chart._select, chart);
                chart._selectEndHandler = proxy(chart._selectEnd, chart);
            }

            for (i = 0; i < axes.length; i++) {
                axis = axes[i];
                options = axis.options;
                if (axis instanceof CategoryAxis && options.select && !options.vertical) {
                    min = 0;
                    max = options.categories.length - 1;

                    if (axis instanceof DateCategoryAxis) {
                        min = options.categories[min];
                        max = options.categories[max];
                    }

                    if (!options.justified) {
                        if (axis instanceof DateCategoryAxis) {
                            max = addDuration(max, 1, options.baseUnit, options.weekStartDay);
                        } else {
                            max++;
                        }
                    }

                    selection = new Selection(chart, axis,
                        deepExtend({ min: min, max: max }, options.select)
                    );

                    selection.bind(SELECT_START, chart._selectStartHandler);
                    selection.bind(SELECT, chart._selectHandler);
                    selection.bind(SELECT_END, chart._selectEndHandler);

                    selections.push(selection);
                }
            }
        },

        _selectStart: function(e) {
            return this.trigger(SELECT_START, e);
        },

        _select: function(e) {
            return this.trigger(SELECT, e);
        },

        _selectEnd: function(e) {
            return this.trigger(SELECT_END, e);
        },

        _attachEvents: function() {
            var chart = this,
                element = chart.element;

            element.on(CONTEXTMENU_NS, proxy(chart._click, chart));
            element.on(MOUSEOVER_NS, proxy(chart._mouseover, chart));
            element.on(MOUSEOUT_NS, proxy(chart._mouseout, chart));
            element.on(MOUSEWHEEL_NS, proxy(chart._mousewheel, chart));
            element.on(MOUSELEAVE_NS, proxy(chart._mouseleave, chart));

            chart._mousemove = kendo.throttle(
                proxy(chart._mousemove, chart),
                MOUSEMOVE_DELAY
            );

            if (chart._shouldAttachMouseMove()) {
                element.on(MOUSEMOVE_NS, chart._mousemove);
            }

            if (kendo.UserEvents) {
                chart._userEvents = new kendo.UserEvents(element, {
                    global: true,
                    filter: ":not(.k-selector)",
                    multiTouch: false,
                    tap: proxy(chart._tap, chart),
                    start: proxy(chart._start, chart),
                    move: proxy(chart._move, chart),
                    end: proxy(chart._end, chart)
                });
            }
        },

        _mouseout: function(e) {
            var chart = this,
                element = chart._getChartElement(e);

            if (element && element.leave) {
                element.leave(chart, e);
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
                delta = mwDelta(e),
                totalDelta,
                state = chart._navState,
                axes,
                i,
                currentAxis,
                axisName,
                ranges = {};

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
                        ranges[axisName] = currentAxis.scaleRange(-totalDelta);
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

                if (prevented) {
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

        _getChartElement: function(e, match) {
            var element = this.surface.eventTarget(e);
            if (!element) {
                return;
            }

            var chartElement;
            while (element && !chartElement) {
                chartElement = element.chartElement;
                element = element.parent;
            }

            if (chartElement) {
                if (chartElement.aliasFor) {
                    chartElement = chartElement.aliasFor(e, this._eventCoordinates(e));
                }

                if (match) {
                    chartElement = chartElement.closest(match);
                }

                return chartElement;
            }
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

            return new Point2D(
                clientX - offset.left - paddingLeft + win.scrollLeft(),
                clientY - offset.top - paddingTop + win.scrollTop()
            );
        },

        _tap: function(e) {
            var chart = this,
                element = chart._getChartElement(e);

            if (chart._activePoint === element) {
                chart._click(e);
            } else {
                if (!chart._startHover(e)) {
                    chart._unsetActivePoint();
                }

                chart._click(e);
            }
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
                element = chart._getChartElement(e),
                tooltip = chart._tooltip,
                highlight = chart._highlight,
                tooltipOptions = chart.options.tooltip,
                point;

            if (chart._suppressHover || !highlight || highlight.isHighlighted(element) || chart._sharedTooltip()) {
                return;
            }

            point = chart._getChartElement(e, function(element) {
                return element.hover;
            });

            if (point && !point.hover(chart, e)) {
                chart._activePoint = point;

                tooltipOptions = deepExtend({}, tooltipOptions, point.options.tooltip);
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
                $(document).on(MOUSEMOVE_TRACKING, proxy(chart._mouseMoveTracking, chart));
            }
        },

        _mouseMoveTracking: function(e) {
            var chart = this,
                options = chart.options,
                tooltip = chart._tooltip,
                highlight = chart._highlight,
                coords = chart._eventCoordinates(e),
                point = chart._activePoint,
                tooltipOptions, owner, seriesPoint;

            if (chart._plotArea.box.containsPoint(coords)) {
                if (point && point.tooltipTracking && point.series && point.parent.getNearestPoint) {
                    seriesPoint = point.parent.getNearestPoint(coords.x, coords.y, point.seriesIx);
                    if (seriesPoint && seriesPoint != point) {
                        seriesPoint.hover(chart, e);
                        chart._activePoint = seriesPoint;

                        tooltipOptions = deepExtend({}, options.tooltip, point.options.tooltip);
                        if (tooltipOptions.visible) {
                            tooltip.show(seriesPoint);
                        }

                        highlight.show(seriesPoint);
                    }
                }
            } else {
                $(document).off(MOUSEMOVE_TRACKING);
                chart._unsetActivePoint();
            }
        },

        _mousemove: function(e) {
            var coords = this._eventCoordinates(e);

            this._trackCrosshairs(coords);

            if (this._sharedTooltip()) {
                this._trackSharedTooltip(coords, e);
            }
        },

        _trackCrosshairs: function(coords) {
            var crosshairs = this._plotArea.crosshairs,
                i,
                current;

            for (i = 0; i < crosshairs.length; i++) {
                current = crosshairs[i];

                if (current.box.containsPoint(coords)) {
                    current.showAt(coords);
                } else {
                    current.hide();
                }
            }
        },

        _trackSharedTooltip: function(coords, e) {
            var chart = this,
                options = chart.options,
                plotArea = chart._plotArea,
                categoryAxis = plotArea.categoryAxis,
                tooltip = chart._tooltip,
                tooltipOptions = options.tooltip,
                highlight = chart._highlight,
                index, points;

            if (plotArea.box.containsPoint(coords)) {
                index = categoryAxis.pointCategoryIndex(coords);
                if (index !== chart._tooltipCategoryIx) {
                    points = plotArea.pointsByCategoryIndex(index);

                    var pointArgs = $.map(points, function(point) {
                        return point.eventArgs(e);
                    });

                    var hoverArgs = pointArgs[0] || {};
                    hoverArgs.categoryPoints = pointArgs;

                    if (points.length > 0 && !this.trigger(SERIES_HOVER, hoverArgs)) {
                        if (tooltipOptions.visible) {
                            tooltip.showAt(points, coords);
                        }

                        highlight.show(points);
                    } else {
                        tooltip.hide();
                    }

                    chart._tooltipCategoryIx = index;
                }
            }
        },

        _mouseleave: function(e) {
            var chart = this,
                plotArea = chart._plotArea,
                crosshairs = plotArea.crosshairs,
                tooltip = chart._tooltip,
                highlight = chart._highlight,
                target = e.relatedTarget,
                i;

            if (!(target && $(target).closest(tooltip.element).length)) {
                chart._mousemove.cancel();

                for (i = 0; i < crosshairs.length; i++) {
                    crosshairs[i].hide();
                }

                highlight.hide();

                setTimeout(proxy(tooltip.hide, tooltip), TOOLTIP_HIDE_DELAY);
                chart._tooltipCategoryIx = null;
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
                processedSeries = [],
                currentSeries;

            for (seriesIx = 0; seriesIx < seriesLength; seriesIx++) {
                currentSeries = series[seriesIx];

                if (chart._isBindable(currentSeries) && grouped) {
                    append(processedSeries,
                           groupSeries(currentSeries, data));
                } else {
                    processedSeries.push(currentSeries || []);
                }
            }

            chart._sourceSeries = series;
            options.series = processedSeries;

            applySeriesColors(chart.options);

            chart._bindSeries();
            chart._bindCategories();
            chart._hasData = true;

            chart._deferRedraw();
        },

        _deferRedraw: function() {
            var chart = this;

            if (kendo.support.vml) {
                chart._clearRedrawTimeout();
                chart._redrawTimeout = setTimeout(function() {
                    if (!chart.surface) {
                        return;
                    }

                    chart.trigger(DATABOUND);
                    chart._redraw();
                }, 0);
            } else {
                chart.trigger(DATABOUND);
                chart._redraw();
            }
        },

        _clearRedrawTimeout: function() {
            if (this._redrawTimeout) {
                clearInterval(this._redrawTimeout);
                this._redrawTimeout = null;
            }
        },

        _bindSeries: function() {
            var chart = this,
                data = chart.dataSource.view(),
                series = chart.options.series,
                seriesIx,
                seriesLength = series.length,
                currentSeries,
                groupIx,
                seriesData;

            for (seriesIx = 0; seriesIx < seriesLength; seriesIx++) {
                currentSeries = series[seriesIx];

                if (chart._isBindable(currentSeries)) {
                    groupIx = currentSeries._groupIx;
                    seriesData = defined(groupIx) ? (data[groupIx] || {}).items : data;

                    if (currentSeries.autoBind !== false) {
                        currentSeries.data = seriesData;
                    }
                }
            }
        },

        _bindCategories: function() {
            var chart = this,
                data = chart.dataSource.view() || [],
                grouped = (chart.dataSource.group() || []).length > 0,
                categoriesData = data,
                options = chart.options,
                definitions = [].concat(options.categoryAxis),
                axisIx,
                axis;

            if (grouped) {
                if (data.length) {
                    categoriesData = data[0].items;
                }
            }

            for (axisIx = 0; axisIx < definitions.length; axisIx++) {
                axis = definitions[axisIx];
                if (axis.autoBind !== false) {
                    chart._bindCategoryAxis(axis, categoriesData, axisIx);
                }
            }
        },

        _bindCategoryAxis: function(axis, data, axisIx) {
            var count = (data || []).length,
                categoryIx,
                category,
                row;

            if (axis.field) {
                axis.categories = [];
                for (categoryIx = 0; categoryIx < count; categoryIx++) {
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
            } else {
                this._bindCategoryAxisFromSeries(axis, axisIx);
            }
        },

        _bindCategoryAxisFromSeries: function(axis, axisIx) {
            var chart = this,
                items = [],
                result,
                series = chart.options.series,
                seriesLength = series.length,
                seriesIx,
                s,
                onAxis,
                data,
                dataIx,
                dataLength,
                dataRow,
                category,
                uniqueCategories = {},
                getFn,
                dateAxis;

            for (seriesIx = 0; seriesIx < seriesLength; seriesIx++) {
                s = series[seriesIx];
                onAxis = s.categoryAxis === axis.name || (!s.categoryAxis && axisIx === 0);
                data = s.data;
                dataLength = data.length;

                if (s.categoryField && onAxis && dataLength > 0) {
                    dateAxis = isDateAxis(axis, getField(s.categoryField, data[0]));
                    getFn = dateAxis ? getDateField : getField;

                    for (dataIx = 0; dataIx < dataLength; dataIx++) {
                        dataRow = data[dataIx];
                        category = getFn(s.categoryField, dataRow);

                        if (dateAxis || !uniqueCategories[category]) {
                            items.push([category, dataRow]);

                            if (!dateAxis) {
                                uniqueCategories[category] = true;
                            }
                        }
                    }
                }
            }

            if (items.length > 0) {
                if (dateAxis) {
                    items = uniqueDates(items, function(a, b) {
                        return dateComparer(a[0], b[0]);
                    });
                }

                result = transpose(items);
                axis.categories = result[0];
                axis.dataItems = result[1];
            }
        },

        _isBindable: function(series) {
            var valueFields = SeriesBinder.current.valueFields(series),
                result = true,
                field, i;

            for (i = 0; i < valueFields.length; i++) {
                field = valueFields[i];
                if (field === VALUE) {
                    field = "field";
                } else {
                    field = field + "Field";
                }

                if (!defined(series[field])) {
                    result = false;
                    break;
                }
            }

            return result;
        },

        _legendItemClick: function(seriesIndex, pointIndex) {
            var chart = this,
                plotArea = chart._plotArea,
                currentSeries = (plotArea.srcSeries || plotArea.series)[seriesIndex],
                originalSeries = (chart._sourceSeries || [])[seriesIndex] || currentSeries,
                transitionsState, visible, point;

            if (inArray(currentSeries.type, [PIE, DONUT,FUNNEL])) {
                point = originalSeries.data[pointIndex];
                if (!defined(point.visible)) {
                    visible = false;
                } else {
                    visible = !point.visible;
                }
                point.visible = visible;
            } else {
                visible = !originalSeries.visible;
                originalSeries.visible = visible;
                currentSeries.visible = visible;
            }

            if (chart.options.transitions) {
                chart.options.transitions = false;
                transitionsState = true;
            }
            chart.redraw();
            if (transitionsState) {
                chart.options.transitions = true;
            }
        },

        _legendItemHover: function(seriesIndex, pointIndex) {
            var chart = this,
                plotArea = chart._plotArea,
                highlight = chart._highlight,
                currentSeries = (plotArea.srcSeries || plotArea.series)[seriesIndex],
                index, items;

            if (inArray(currentSeries.type, [PIE, DONUT, FUNNEL])) {
                index = pointIndex;
            } else {
                index = seriesIndex;
            }

            items = plotArea.pointsBySeriesIndex(index);
            highlight.show(items);
        },

        _shouldAttachMouseMove: function() {
            var chart = this;

            return chart._plotArea.crosshairs.length || (chart._tooltip && chart._sharedTooltip());
        },

        setOptions: function(options) {
            var chart = this,
                dataSource = options.dataSource;

            options.dataSource = undefined;

            chart._originalOptions = deepExtend(chart._originalOptions, options);
            chart.options = deepExtend({}, chart._originalOptions);
            chart._sourceSeries = null;
            $(document).off(MOUSEMOVE_NS);

            Widget.fn._setEvents.call(chart, options);

            chart._initTheme(chart.options);

            if (dataSource) {
                chart.setDataSource(dataSource);
            }

            if (chart._shouldAttachMouseMove()) {
                chart.element.on(MOUSEMOVE_NS, chart._mousemove);
            }

            if (chart._hasDataSource) {
                chart.refresh();
            }  else {
                chart.redraw();
            }
        },

        destroy: function() {
            var chart = this,
                dataSource = chart.dataSource;

            chart.element.off(NS);
            dataSource.unbind(CHANGE, chart._dataChangeHandler);
            $(document).off(MOUSEMOVE_TRACKING);

            if (chart._userEvents) {
                chart._userEvents.destroy();
            }

            chart._destroyView();

            chart.surface.destroy();
            chart.surface = null;

            chart._clearRedrawTimeout();

            Widget.fn.destroy.call(chart);
        },

        _destroyView: function() {
            var chart = this,
                model = chart._model,
                selections = chart._selections;

            if (model) {
                model.destroy();
                chart._model = null;
            }

            if (selections) {
                while (selections.length > 0) {
                    selections.shift().destroy();
                }
            }

            chart._unsetActivePoint();

            if (chart._tooltip) {
                chart._tooltip.destroy();
            }

            if (chart._highlight) {
                chart._highlight.destroy();
            }
        }
    });

    dataviz.ExportMixin.extend(Chart.fn);

    if (kendo.PDFMixin) {
        kendo.PDFMixin.extend(Chart.fn);
    }

    var PlotAreaFactory = Class.extend({
        init: function() {
            this._registry = [];
        },

        register: function(type, seriesTypes) {
            this._registry.push({
                type: type,
                seriesTypes: seriesTypes
            });
        },

        create: function(srcSeries, options) {
            var registry = this._registry,
                match = registry[0],
                i,
                entry,
                series;

            for (i = 0; i < registry.length; i++) {
                entry = registry[i];
                series = filterSeriesByType(srcSeries, entry.seriesTypes);

                if (series.length > 0) {
                    match = entry;
                    break;
                }
            }

            return new match.type(series, options);
        }
    });
    PlotAreaFactory.current = new PlotAreaFactory();

    var SeriesBinder = Class.extend({
        init: function() {
            this._valueFields = {};
            this._otherFields = {};
            this._nullValue = {};
            this._undefinedValue = {};
        },

        register: function(seriesTypes, valueFields, otherFields) {
            var binder = this,
                i,
                type;

            valueFields = valueFields || [VALUE];

            for (i = 0; i < seriesTypes.length; i++) {
                type = seriesTypes[i];

                binder._valueFields[type] = valueFields;
                binder._otherFields[type] = otherFields;
                binder._nullValue[type] = binder._makeValue(valueFields, null);
                binder._undefinedValue[type] = binder._makeValue(valueFields, undefined);
            }
        },

        canonicalFields: function(series) {
            return this.valueFields(series).concat(this.otherFields(series));
        },

        valueFields: function(series) {
            return this._valueFields[series.type] || [VALUE];
        },

        otherFields: function(series) {
            return this._otherFields[series.type] || [VALUE];
        },

        bindPoint: function(series, pointIx) {
            var binder = this,
                data = series.data,
                pointData = data[pointIx],
                result = { valueFields: { value: pointData } },
                fields, fieldData,
                srcValueFields, srcPointFields,
                valueFields = binder.valueFields(series),
                otherFields = binder._otherFields[series.type],
                value;

            if (pointData === null) {
                value = binder._nullValue[series.type];
            } else if (!defined(pointData)) {
                value = binder._undefinedValue[series.type];
            } else if (isArray(pointData)) {
                fieldData = pointData.slice(valueFields.length);
                value = binder._bindFromArray(pointData, valueFields);
                fields = binder._bindFromArray(fieldData, otherFields);
            } else if (typeof pointData === OBJECT) {
                srcValueFields = binder.sourceFields(series, valueFields);
                srcPointFields = binder.sourceFields(series, otherFields);

                value = binder._bindFromObject(pointData, valueFields, srcValueFields);
                fields = binder._bindFromObject(pointData, otherFields, srcPointFields);
            }

            if (defined(value)) {
                if (valueFields.length === 1) {
                    result.valueFields.value = value[valueFields[0]];
                } else {
                    result.valueFields = value;
                }
            }

            result.fields = fields || {};

            return result;
        },

        _makeValue: function(fields, initialValue) {
            var value = {},
                i,
                length = fields.length,
                fieldName;

            for (i = 0; i < length; i++) {
                fieldName = fields[i];
                value[fieldName] = initialValue;
            }

            return value;
        },

        _bindFromArray: function(array, fields) {
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
        },

        _bindFromObject: function(object, fields, srcFields) {
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
        },

        sourceFields: function(series, canonicalFields) {
            var i, length, fieldName,
                sourceFields, sourceFieldName;

            if (canonicalFields) {
                length = canonicalFields.length;
                sourceFields = [];

                for (i = 0; i < length; i++) {
                    fieldName = canonicalFields[i];
                    sourceFieldName = fieldName === VALUE ? "field" : fieldName + "Field";

                    sourceFields.push(series[sourceFieldName] || fieldName);
                }
            }

            return sourceFields;
        }
    });
    SeriesBinder.current = new SeriesBinder();

    var BarLabel = ChartElement.extend({
        init: function(content, options) {
            var barLabel = this;
            ChartElement.fn.init.call(barLabel, options);

            this.textBox = new TextBox(content, barLabel.options);
            barLabel.append(this.textBox);
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
            zIndex: 2
        },

        createVisual: function() {
            this.textBox.options.noclip = this.options.noclip;
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

            if (!options.rotation) {
                if (vertical) {
                    padding.left = padding.right =
                        (targetBox.width() - text.contentBox.width()) / 2;
                } else {
                    padding.top = padding.bottom =
                        (targetBox.height() - text.contentBox.height()) / 2;
                }
            }

            text.reflow(targetBox);
        },

        alignToClipBox: function(clipBox) {
            var barLabel = this,
                vertical = barLabel.options.vertical,
                field = vertical ? Y : X,
                start = field + "1",
                end = field + "2",
                text = barLabel.children[0],
                parentBox = barLabel.parent.box,
                targetBox;

            if (parentBox[start] < clipBox[start] || clipBox[end] < parentBox[end]) {
                targetBox = text.paddingBox.clone();
                targetBox[start] = math.max(parentBox[start], clipBox[start]);
                targetBox[end] = math.min(parentBox[end], clipBox[end]);

                this.reflow(targetBox);
            }
        }
    });

    var LegendItem = BoxElement.extend({
        init: function(options) {
            var item = this;

            BoxElement.fn.init.call(item, options);

            item.createContainer();
            item.createMarker();
            item.createLabel();
        },

        createContainer: function() {
            var item = this;

            item.container = new FloatElement({ vertical: false, wrap: false, align: CENTER });
            item.append(item.container);
        },

        createMarker: function() {
            var item = this,
                options = item.options,
                markerColor = options.markerColor,
                markers = options.markers,
                markerOptions = deepExtend({}, markers, {
                    background: markerColor,
                    border: {
                        color: markerColor
                    }
                });

            item.container.append(new ShapeElement(markerOptions));
        },

        createLabel: function() {
            var item = this,
                options = item.options,
                labelOptions = deepExtend({}, options.labels);

            item.container.append(new TextBox(options.text, labelOptions));
        },

        renderComplete: function() {
            ChartElement.fn.renderComplete.call(this);

            var cursor = this.options.cursor || {};
            var eventSink = this._itemOverlay = draw.Path.fromRect(this.container.box.toRect(), {
                fill: {
                    color: WHITE,
                    opacity: 0
                },
                stroke: null,
                cursor: cursor.style
            });

            this.appendVisual(eventSink);
        },

        click: function(widget, e) {
            var args = this.eventArgs(e);

            if (!widget.trigger(LEGEND_ITEM_CLICK, args)) {
                e.preventDefault();
                widget._legendItemClick(args.seriesIndex, args.pointIndex);
            }
        },

        hover: function(widget, e) {
            var args = this.eventArgs(e);

            if (!widget.trigger(LEGEND_ITEM_HOVER, args)) {
                e.preventDefault();
                widget._legendItemHover(args.seriesIndex, args.pointIndex);
            }

            // Don't trigger point hover for legend items
            return true;
        },

        leave: function(widget) {
            widget._unsetActivePoint();
        },

        eventArgs: function(e) {
            var options = this.options;

            return {
                element: $(e.target),
                text: options.text,
                series: options.series,
                seriesIndex: options.series.index,
                pointIndex: options.pointIndex
            };
        },

        createVisual: noop
    });

    var Legend = ChartElement.extend({
        init: function(options) {
            var legend = this;

            ChartElement.fn.init.call(legend, options);

            if (!inArray(legend.options.position, [TOP, RIGHT, BOTTOM, LEFT, CUSTOM])) {
                legend.options.position = RIGHT;
            }

            legend.createContainer();

            legend.createItems();
        },

        options: {
            position: RIGHT,
            items: [],
            labels: {
                margin: {
                    left: 6
                }
            },
            offsetX: 0,
            offsetY: 0,
            margin: getSpacing(5),
            padding: getSpacing(5),
            border: {
                color: BLACK,
                width: 0
            },
            item: {
                cursor: {
                    style: POINTER
                }
            },
            spacing: 6,
            background: "",
            zIndex: 1,
            markers: {
                border: {
                    width: 1
                },
                width: 7,
                height: 7,
                type: "rect",
                align: LEFT,
                vAlign: CENTER
            }
        },

        createContainer: function() {
            var legend = this,
                options = legend.options,
                position = options.position,
                align = position,
                vAlign = CENTER;

            if (position == CUSTOM) {
                align = LEFT;
            } else if (inArray(position, [TOP, BOTTOM])) {
                align = CENTER;
                vAlign = position;
            }

            legend.container = new BoxElement({
                margin: options.margin,
                padding: options.padding,
                background: options.background,
                border: options.border,
                vAlign: vAlign,
                align: align,
                zIndex: options.zIndex,
                shrinkToFit: true
            });

            legend.append(legend.container);
        },

        createItems: function() {
            var legend = this,
                options = legend.options,
                items = options.items,
                count = items.length,
                vertical = legend.isVertical(),
                innerElement, i, item;

            innerElement = new FloatElement({
                vertical: vertical,
                spacing: options.spacing
            });

            if (options.reverse) {
                items = items.slice(0).reverse();
            }

            for (i = 0; i < count; i++) {
                item = items[i];

                innerElement.append(new LegendItem(deepExtend({}, {
                    markers: options.markers,
                    labels: options.labels
                }, options.item, item)));
            }
            legend.container.append(innerElement);
        },

        isVertical: function() {
            var legend = this,
                options = legend.options,
                position = options.position,
                vertical = inArray(position, [ LEFT, RIGHT ]) ||
                    (position == CUSTOM && options.orientation != HORIZONTAL);

            return vertical;
        },

        hasItems: function() {
            return this.container.children[0].children.length > 0;
        },

        reflow: function(targetBox) {
            var legend = this,
                options = legend.options,
                container = legend.container,
                vertical = legend.isVertical(),
                containerBox = targetBox.clone();

            if (!legend.hasItems()) {
                legend.box = targetBox.clone();
                return;
            }

            if (vertical) {
                containerBox.y1 = 0;
            }

            if (options.position === CUSTOM) {
                legend.containerCustomReflow(containerBox);
                legend.box = targetBox.clone();
            } else {
                container.reflow(containerBox);
                legend.containerReflow(targetBox);
            }
        },

        containerReflow: function(targetBox) {
            var legend = this,
                options = legend.options,
                pos = options.position == TOP || options.position == BOTTOM ? X : Y,
                containerBox = legend.container.box,
                box = containerBox.clone();

            if (options.offsetX || options.offsetY) {
                containerBox.translate(options.offsetX, options.offsetY);
                legend.container.reflow(containerBox);
            }

            box[pos + 1] = targetBox[pos + 1];
            box[pos + 2] = targetBox[pos + 2];

            legend.box = box;
        },

        containerCustomReflow: function (targetBox) {
            var legend = this,
                options = legend.options,
                offsetX = options.offsetX,
                offsetY = options.offsetY,
                container = legend.container,
                width = options.width,
                height = options.height,
                vertical = legend.isVertical(),
                containerBox = targetBox.clone();

            if (vertical && height) {
                containerBox.y2 = containerBox.y1 + height;
            } else if (!vertical && width){
                containerBox.x2 = containerBox.x1 + width;
            }
            container.reflow(containerBox);
            containerBox = container.box;

            container.reflow(Box2D(
                offsetX, offsetY,
                offsetX + containerBox.width(), offsetY + containerBox.height()
            ));
        },

        renderVisual: function() {
            if (this.hasItems()) {
                ChartElement.fn.renderVisual.call(this);
            }
        }
    });

    var CategoryAxis = Axis.extend({
        init: function(options) {
            var axis = this;

            Axis.fn.init.call(axis, options);

            options = axis.options;
            options.categories = options.categories.slice(0);

            axis._ticks = {};
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
            labels: {
                zIndex: 1
            },
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
            return this.getTicks().majorTicks;
        },

        getMinorTickPositions: function() {
            return this.getTicks().minorTicks;
        },

        getTicks: function() {
            var axis = this,
                cache = axis._ticks,
                options = axis.options,
                count = options.categories.length,
                reverse = options.reverse,
                justified = options.justified,
                lineBox = axis.lineBox(),
                hash;

            hash = lineBox.getHash() + count + reverse + justified;
            if (cache._hash !== hash) {
                cache._hash = hash;
                cache.majorTicks = axis.getTickPositions(count);
                cache.minorTicks = axis.getTickPositions(count * 2);
            }

            return cache;
        },

        getSlot: function(from, to) {
            var axis = this,
                options = axis.options,
                majorTicks = axis.getTicks().majorTicks,
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

            var singleSlot = !defined(to);

            from = valueOrDefault(from, 0);
            to = valueOrDefault(to, from);
            from = limitValue(from, 0, intervals);
            to = limitValue(to - 1, from, intervals);
            // Fixes transient bug caused by iOS 6.0 JIT
            // (one can never be too sure)
            to = math.max(from, to);

            p1 = from === 0 ? lineStart : (majorTicks[from] || lineEnd);
            p2 = justified ? p1 : majorTicks[to];
            slotSize = to - from;

            if (slotSize > 0 || (from === to)) {
                p2 = majorTicks[to + 1] || lineEnd;
            }

            if (singleSlot && justified) {
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

        pointCategoryIndex: function(point) {
            var axis = this,
                options = axis.options,
                reverse = options.reverse,
                vertical = options.vertical,
                valueAxis = vertical ? Y : X,
                lineBox = axis.lineBox(),
                lineStart = lineBox[valueAxis + 1],
                lineEnd = lineBox[valueAxis + 2],
                pos = point[valueAxis],
                majorTicks = axis.getMajorTickPositions(),
                diff = MAX_VALUE,
                tickPos, nextTickPos, i, categoryIx;

            if (pos < lineStart || pos > lineEnd) {
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

                if (options.justified) {
                    if (pos === nextTickPos) {
                        categoryIx = math.max(0, vertical ? majorTicks.length - i - 1 : i + 1);
                        break;
                    }

                    if (math.abs(pos - tickPos) < diff) {
                        diff = pos - tickPos;
                        categoryIx = i;
                    }
                } else {
                    if (pos >= tickPos && pos <= nextTickPos) {
                        categoryIx = i;
                        break;
                    }
                }
            }

            return categoryIx;
        },

        getCategory: function(point) {
            var index = this.pointCategoryIndex(point);

            if (index === null) {
                return null;
            }
            return this.options.categories[index];
        },

        categoryIndex: function(value) {
            return indexOf(value, this.options.categories);
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
                category = valueOrDefault(options.categories[index], ""),
                text = axis.axisLabelText(category, dataItem, labelOptions);

            return new AxisLabel(category, text, index, dataItem, labelOptions);
        },

        shouldRenderNote: function(value) {
            var categories = this.options.categories;

            return categories.length && (categories.length > value && value >= 0);
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
                categories: toDate(options.categories),
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
            } else {
                options.baseUnit = options.baseUnit || DAYS;
            }

            CategoryAxis.fn.init.call(axis, options);
        },

        options: {
            type: DATE,
            labels: {
                dateFormats: DateLabelFormats
            },
            autoBaseUnitSteps: {
                seconds: [1, 2, 5, 15, 30],
                minutes: [1, 2, 5, 15, 30],
                hours: [1, 2, 3],
                days: [1, 2, 3],
                weeks: [1, 2],
                months: [1, 2, 3, 6],
                years: [1, 2, 3, 5, 10, 25, 50]
            },
            maxDateGroups: 10
        },

        shouldRenderNote: function(value) {
            var axis = this,
                range = axis.range(),
                categories = axis.options.categories || [];

            return dateComparer(value, range.min) >= 0 && dateComparer(value, range.max) <= 0 && categories.length;
        },

        parseNoteValue: function(value) {
            return toDate(value);
        },

        translateRange: function(delta) {
            var axis = this,
                options = axis.options,
                baseUnit = options.baseUnit,
                weekStartDay = options.weekStartDay,
                lineBox = axis.lineBox(),
                size = options.vertical ? lineBox.height() : lineBox.width(),
                range = axis.range(),
                scale = size / (range.max - range.min),
                offset = round(delta / scale, DEFAULT_PRECISION),
                from,
                to;

            if (range.min && range.max) {
                from = addTicks(options.min || range.min, offset);
                to = addTicks(options.max || range.max, offset);

                range = {
                    min: addDuration(from, 0, baseUnit, weekStartDay),
                    max: addDuration(to, 0, baseUnit, weekStartDay)
                };
            }

            return range;
        },

        scaleRange: function(delta) {
            var axis = this,
                rounds = math.abs(delta),
                range = axis.range(),
                from = range.min,
                to = range.max,
                step;

            if (range.min && range.max) {
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

                range = { min: from, max: to };
            }

            return range;
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
                cat = categories[categoryIx];

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
                        } else if (minDiff >= TIME_PER_MINUTE) {
                            unit = MINUTES;
                        } else {
                            unit = SECONDS;
                        }
                    }
                }

                lastCat = cat;
            }

            return unit || DAYS;
        },

        _categoryRange: function(categories) {
            var range = categories._range;
            if (!range) {
                range = categories._range = sparseArrayLimits(categories);
            }

            return range;
        },

        range: function(options) {
            options = options || this.options;

            var categories = options.categories,
                autoUnit = options.baseUnit === FIT,
                baseUnit = autoUnit ? BASE_UNITS[0] : options.baseUnit,
                baseUnitStep = options.baseUnitStep || 1,
                min = toTime(options.min),
                max = toTime(options.max),
                categoryLimits = this._categoryRange(categories);

            var minCategory = toTime(categoryLimits.min),
                maxCategory = toTime(categoryLimits.max);

            if (options.roundToBaseUnit) {
                return { min: addDuration(min || minCategory, 0, baseUnit, options.weekStartDay),
                         max: addDuration(max || maxCategory, baseUnitStep, baseUnit, options.weekStartDay) };
            } else {
                return { min: toDate(min || minCategory),
                         max: toDate(max || this._srcMaxDate || maxCategory) };
            }
        },

        autoBaseUnit: function(options) {
            var axis = this,
                range = axis.range(deepExtend({}, options, { baseUnitStep: 1 })),
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

            while (!step || units > maxDateGroups) {
                unitSteps = unitSteps || autoBaseUnitSteps[baseUnit].slice(0);
                nextStep = unitSteps.shift();

                if (nextStep) {
                    step = nextStep;
                    units = totalUnits / step;
                } else if (baseUnit === last(BASE_UNITS)) {
                    step = math.ceil(totalUnits / maxDateGroups);
                    break;
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

        _timeScale: function() {
            var axis = this,
                range = axis.range(),
                options = axis.options,
                lineBox = axis.lineBox(),
                vertical = options.vertical,
                lineSize = vertical ? lineBox.height() : lineBox.width(),
                timeRange;

            if (options.justified && options._collapse !== false) {
                var categoryLimits = this._categoryRange(options.categories);
                var maxCategory = toTime(categoryLimits.max);
                timeRange = toDate(maxCategory) - range.min;
            } else {
                timeRange = range.max - range.min;
            }

            return lineSize / timeRange;
        },

        getTickPositions: function(count) {
            var axis = this,
                options = axis.options,
                categories = options.categories,
                positions = [];

            if (options.roundToBaseUnit || categories.length === 0) {
                positions = CategoryAxis.fn.getTickPositions.call(axis, count);
            } else {
                var vertical = options.vertical,
                    reverse = options.reverse,
                    lineBox = axis.lineBox(),
                    startTime = categories[0].getTime(),
                    collapse = valueOrDefault(options._collapse, options.justified),
                    divisions = categories.length - (collapse ? 1 : 0),
                    scale = axis._timeScale(),
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
                categories = options.categories,
                maxCategory = toDate(sparseArrayMax(categories)),
                baseUnit = options.baseUnit,
                baseUnitStep = options.baseUnitStep || 1,
                range = axis.range(options),
                max = range.max,
                date,
                nextDate,
                groups = [];

            for (date = range.min; date < max; date = nextDate) {
                groups.push(date);

                nextDate = addDuration(date, baseUnitStep, baseUnit, options.weekStartDay);
                if (nextDate > maxCategory && !options.max) {
                    break;
                }
            }

            if (!options.roundToBaseUnit && !dateEquals(last(groups), max)) {
                if (max < nextDate && options._collapse !== false) {
                    this._srcMaxDate = max;
                } else {
                    groups.push(max);
                }
            }

            options.srcCategories = categories;
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
            } else if (!options.roundToBaseUnit) {
                visible = !dateEquals(this.range().max, date);
            }

            if (visible) {
                labelOptions.format = labelOptions.format || unitFormat;
                var text = this.axisLabelText(date, dataItem, labelOptions);
                if (text) {
                    return new AxisLabel(date, text, index, dataItem, labelOptions);
                }
            }
        },

        categoryIndex: function(value, range) {
            var axis = this,
                options = axis.options,
                categories = options.categories,
                equalsRoundedMax,
                index;

            value = toDate(value);
            range = range || axis.range();
            equalsRoundedMax = options.roundToBaseUnit && dateEquals(range.max, value);
            if (value && (value > range.max || equalsRoundedMax)) {
                return categories.length;
            } else if (!value || value < range.min) {
                return -1;
            }

            index = lteDateIndex(value, categories);

            return index;
        },

        getSlot: function(a, b) {
            var axis = this;

            if (typeof a === OBJECT) {
                a = axis.categoryIndex(a);
            }

            if (typeof b === OBJECT) {
                b = axis.categoryIndex(b);
            }

            return CategoryAxis.fn.getSlot.call(axis, a, b);
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
            majorGridLines: {
                visible: true,
                width: 1,
                color: BLACK
            },
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
                autoMin = floorDate(toTime(min) - 1, baseUnit) || toDate(max),
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

            options.baseUnit  = options.baseUnit  || baseUnit;
            options.min       = options.min       || addDuration(autoMin, -head, baseUnit);
            options.max       = options.max       || addDuration(autoMax, tail, baseUnit);
            options.minorUnit = options.minorUnit || majorUnit / 5;
            options.majorUnit = majorUnit;

            return options;
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

        getTickPositions: function(step) {
            var options = this.options;
            var vertical = options.vertical;
            var reverse = options.reverse;

            var lineBox = this.lineBox();
            var dir = (vertical ? -1 : 1) * (reverse ? -1 : 1);
            var startEdge = dir === 1 ? 1 : 2;
            var start = lineBox[(vertical ? Y : X) + startEdge];

            var divisions = this.getDivisions(step);
            var timeRange = options.max - options.min;
            var lineSize = vertical ? lineBox.height() : lineBox.width();
            var scale = lineSize / timeRange;

            var positions = [start];
            for (var i = 1; i < divisions; i++) {
                var date = addDuration(options.min, i * options.majorUnit, options.baseUnit);
                var pos = start + (date - options.min) * scale * dir;

                positions.push(round(pos, COORD_PRECISION));
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

        getSlot: function(a, b, limit) {
            return NumericAxis.fn.getSlot.call(
                this, toDate(a), toDate(b), limit
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
            var options = this.options;
            var offset = index * options.majorUnit;

            var date = options.min;
            if (offset > 0) {
                date = addDuration(date, offset, options.baseUnit);
            }

            var unitFormat = labelOptions.dateFormats[options.baseUnit];
            labelOptions.format = labelOptions.format || unitFormat;

            var text = this.axisLabelText(date, null, labelOptions);
            return new AxisLabel(date, text, index, null, labelOptions);
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
        },

        translateRange: function(delta) {
            var axis = this,
                options = axis.options,
                baseUnit = options.baseUnit,
                weekStartDay = options.weekStartDay,
                lineBox = axis.lineBox(),
                size = options.vertical ? lineBox.height() : lineBox.width(),
                range = axis.range(),
                scale = size / (range.max - range.min),
                offset = round(delta / scale, DEFAULT_PRECISION),
                from = addTicks(options.min, offset),
                to = addTicks(options.max, offset);

            return {
                min: addDuration(from, 0, baseUnit, weekStartDay),
                max: addDuration(to, 0, baseUnit, weekStartDay)
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

        shouldRenderNote: function(value) {
            var range = this.range();

            return dateComparer(value, range.min) >= 0 && dateComparer(value, range.max) <= 0;
        }
    });

    var PassthroughVisualMixin = {
        extend: function(proto) {
            proto.createVisual = this.createVisual;
            proto.appendVisual = this.appendVisual;
        },

        createVisual: noop,

        appendVisual: function(childVisual) {
            this.parent.appendVisual(childVisual);
        }
    };

    var ClusterLayout = ChartElement.extend({
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
    PassthroughVisualMixin.extend(ClusterLayout.fn);

    var StackWrap = ChartElement.extend({
        options: {
            vertical: true
        },

        reflow: function(targetBox) {
            var options = this.options,
                vertical = options.vertical,
                positionAxis = vertical ? X : Y,
                stackAxis = vertical ? Y : X,
                children = this.children,
                box = this.box = new Box2D(),
                childrenCount = children.length,
                i;

            for (i = 0; i < childrenCount; i++) {
                var currentChild = children[i],
                    childBox;
                if (currentChild.visible !== false) {
                    childBox = currentChild.box.clone();
                    childBox.snapTo(targetBox, positionAxis);

                    if (i === 0) {
                        box = this.box = childBox.clone();
                    }

                    currentChild.reflow(childBox);
                    box.wrap(childBox);
                }
            }
        }
    });
    PassthroughVisualMixin.extend(StackWrap.fn);

    var PointEventsMixin = {
        click: function(chart, e) {
            return chart.trigger(
                SERIES_CLICK,
                this.eventArgs(e)
            );
        },

        hover: function(chart, e) {
            return chart.trigger(
                SERIES_HOVER,
                this.eventArgs(e)
            );
        },

        eventArgs: function(e) {
            return {
                value: this.value,
                percentage: this.percentage,
                category: this.category,
                series: this.series,
                dataItem: this.dataItem,
                runningTotal: this.runningTotal,
                total: this.total,
                element: $(e.target),
                originalEvent: e,
                point: this
            };
        }
    };

    var NoteMixin = {
        createNote: function() {
            var element = this,
                options = element.options.notes,
                text = element.noteText || options.label.text;

            if (options.visible !== false && defined(text) && text !== null) {
                element.note = new Note(
                    element.value,
                    text,
                    element.dataItem,
                    element.category,
                    element.series,
                    element.options.notes
                );
                element.append(element.note);
            }
        }
    };

    var Bar = ChartElement.extend({
        init: function(value, options) {
            var bar = this;

            ChartElement.fn.init.call(bar);

            bar.options = options;
            bar.color = options.color || WHITE;
            bar.aboveAxis = valueOrDefault(bar.options.aboveAxis, true);
            bar.value = value;
        },

        defaults: {
            border: {
                width: 1
            },
            vertical: true,
            overlay: {
                gradient: GLASS
            },
            labels: {
                visible: false,
                format: "{0}"
            },
            opacity: 1,
            notes: {
                label: {}
            }
        },

        render: function() {
            if (this._rendered) {
                return;
            } else {
                this._rendered = true;
            }

            this.createLabel();
            this.createNote();

            if (this.errorBar) {
                this.append(this.errorBar);
            }
        },

        createLabel: function() {
            var value = this.value;
            var options = this.options;
            var labels = options.labels;
            var labelText;

            if (labels.visible) {
                if (labels.template) {
                    var labelTemplate = template(labels.template);
                    labelText = labelTemplate({
                        dataItem: this.dataItem,
                        category: this.category,
                        value: this.value,
                        percentage: this.percentage,
                        runningTotal: this.runningTotal,
                        total: this.total,
                        series: this.series
                    });
                } else {
                    labelText = this.formatValue(labels.format);
                }

                this.label = new BarLabel(labelText,
                        deepExtend({
                            vertical: options.vertical
                        },
                        options.labels
                    ));
                this.append(this.label);
            }
        },

        formatValue: function(format) {
            return this.owner.formatPointValue(this, format);
        },

        reflow: function(targetBox) {
            this.render();

            var bar = this,
                options = bar.options,
                label = bar.label;

            bar.box = targetBox;

            if (label) {
                label.options.aboveAxis = bar.aboveAxis;
                label.reflow(targetBox);
            }

            if (bar.note) {
                bar.note.reflow(targetBox);
            }

            if(bar.errorBars){
                for(var i = 0; i < bar.errorBars.length;i++){
                    bar.errorBars[i].reflow(targetBox);
                }
            }
        },

        createVisual: function() {
            var box = this.box;
            if (this.visible !== false) {
                ChartElement.fn.createVisual.call(this);
                if (box.width() > 0 && box.height() > 0) {
                    this.createRect();
                }
            }
        },

        createRect: function(view) {
            var options = this.options;
            var border = options.border;
            var strokeOpacity = defined(border.opacity) ? border.opacity : options.opacity;
            var rect = draw.Path.fromRect(this.box.toRect(), {
                fill: {
                    color: this.color,
                    opacity: options.opacity
                },
                stroke: {
                    color: this.getBorderColor(),
                    width: border.width,
                    opacity: strokeOpacity,
                    dashType: border.dashType
                }
            });

            var size = options.vertical ? this.box.width() : this.box.height();
            if (size > BAR_ALIGN_MIN_WIDTH) {
                alignPathToPixel(rect);
            }

            this.visual.append(rect);

            if (hasGradientOverlay(options)) {
                this.visual.append(this.createGradientOverlay(rect, {
                        baseColor: this.color
                    }, deepExtend({
                         end: !options.vertical ? [0, 1] : undefined
                    }, options.overlay)
                ));
            }
        },

        createHighlight: function(style) {
            var highlight = draw.Path.fromRect(this.box.toRect(), style);

            return alignPathToPixel(highlight);
        },

        getBorderColor: function() {
            var bar = this,
                options = bar.options,
                color = bar.color,
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
                aboveAxis = bar.aboveAxis,
                clipBox = bar.owner.pane.clipBox() || box,
                x,
                y;

            if (vertical) {
                x = box.x2 + TOOLTIP_OFFSET;
                y = aboveAxis ? math.max(box.y1, clipBox.y1) : math.min(box.y2, clipBox.y2) - tooltipHeight;
            } else {
                var x1 = math.max(box.x1, clipBox.x1),
                    x2 = math.min(box.x2, clipBox.x2);
                if (options.isStacked) {
                    x = aboveAxis ? x2 - tooltipWidth : x1;
                    y = box.y1 - tooltipHeight - TOOLTIP_OFFSET;
                } else {
                    x = aboveAxis ? x2 + TOOLTIP_OFFSET : x1 - tooltipWidth - TOOLTIP_OFFSET;
                    y = box.y1;
                }
            }

            return new Point2D(x, y);
        }
    });
    deepExtend(Bar.fn, PointEventsMixin);
    deepExtend(Bar.fn, NoteMixin);

    var BarChartAnimation = draw.Animation.extend({
        options: {
            duration: INITIAL_ANIMATION_DURATION
        },

        setup: function() {
            var element = this.element;
            var options = this.options;

            var bbox = element.bbox();
            if (bbox) {
                var origin = this.origin = options.origin;

                var axis = options.vertical ? Y : X;

                var fromScale = this.fromScale = new geom.Point(1, 1);
                fromScale[axis] = START_SCALE;

                element.transform(geom.transform()
                    .scale(fromScale.x, fromScale.y)
                );
            } else {
                this.abort();
            }
        },

        step: function(pos) {
            var scaleX = interpolate(this.fromScale.x, 1, pos);
            var scaleY = interpolate(this.fromScale.y, 1, pos);

            this.element.transform(geom.transform()
                .scale(scaleX, scaleY, this.origin)
            );
        },

        abort: function() {
            draw.Animation.fn.abort.call(this);
            this.element.transform(null);
        }
    });
    draw.AnimationFactory.current.register(BAR, BarChartAnimation);

    var BarChartAnimationMixin = {
        extend: function(proto) {
            if (proto.createVisual !== noop) {
                throw new Error("Refusing to override existing createVisual");
            }

            proto.appendVisual = this.appendVisual;
            proto.createVisual = this.createVisual;
            proto._setAnimationOptions = this._setAnimationOptions;

            deepExtend(proto.options, {
                animation: {
                    type: BAR
                }
            });
        },

        createVisual: function() {
            this._setAnimationOptions();
            ChartElement.fn.createVisual.call(this);
        },

        appendVisual: function(childVisual) {
            if (defined(childVisual.options.zIndex)) {
                childVisual.chartElement.options.animation =
                    this.options.animation;
            }

            ChartElement.fn.appendVisual.call(this, childVisual);
        },

        _setAnimationOptions: function() {
            var options = this.options;
            var origin = this.categoryAxis.getSlot(0);

            options.animation = options.animation || {};
            options.animation.origin = new geom.Point(origin.x1, origin.y1);
            options.animation.vertical = !this.options.invertAxes;
        }
    };

    var FadeInAnimation = draw.Animation.extend({
        options: {
            duration: 200,
            easing: LINEAR
        },

        setup: function() {
            this.fadeTo = this.element.opacity();
            this.element.opacity(0);
        },

        step: function(pos) {
            this.element.opacity(pos * this.fadeTo);
        }
    });
    draw.AnimationFactory.current.register(FADEIN, FadeInAnimation);


    var ErrorRangeCalculator = function(errorValue, series, field) {
        var that = this;
        that.initGlobalRanges(errorValue, series, field);
    };

    ErrorRangeCalculator.prototype = ErrorRangeCalculator.fn = {
        percentRegex: /percent(?:\w*)\((\d+)\)/,
        standardDeviationRegex: new RegExp("^" + STD_DEV + "(?:\\((\\d+(?:\\.\\d+)?)\\))?$"),

        initGlobalRanges: function(errorValue, series, field) {
            var that = this,
                data = series.data,
                deviationMatch = that.standardDeviationRegex.exec(errorValue);

            if (deviationMatch) {
                that.valueGetter = that.createValueGetter(series, field);

                var average = that.getAverage(data),
                    deviation = that.getStandardDeviation(data, average, false),
                    multiple = deviationMatch[1] ? parseFloat(deviationMatch[1]) : 1,
                    errorRange = {low: average.value - deviation * multiple, high: average.value + deviation * multiple};
                that.globalRange = function() {
                    return errorRange;
                };
            } else if (errorValue.indexOf && errorValue.indexOf(STD_ERR) >= 0) {
                that.valueGetter = that.createValueGetter(series, field);
                var standardError = that.getStandardError(data, that.getAverage(data));
                that.globalRange = function(value) {
                    return {low: value - standardError, high: value + standardError};
                };
            }
        },

        createValueGetter: function(series, field) {
            var data = series.data,
                binder = SeriesBinder.current,
                valueFields = binder.valueFields(series),
                item = defined(data[0]) ? data[0] : {},
                idx,
                srcValueFields,
                valueGetter;

            if (isArray(item)) {
                idx = field ? indexOf(field, valueFields): 0;
                valueGetter = getter("[" + idx + "]");
            } else if (isNumber(item)) {
                valueGetter = getter();
            } else if (typeof item === OBJECT) {
                srcValueFields = binder.sourceFields(series, valueFields);
                valueGetter = getter(srcValueFields[indexOf(field, valueFields)]);
            }

            return valueGetter;
        },

        getErrorRange: function(pointValue, errorValue) {
            var that = this,
                low,
                high,
                value;

            if (!defined(errorValue)) {
                return;
            }

            if (that.globalRange) {
                return that.globalRange(pointValue);
            }

            if (isArray(errorValue)) {
                low = pointValue - errorValue[0];
                high = pointValue + errorValue[1];
            } else if (isNumber(value = parseFloat(errorValue))) {
                low = pointValue - value;
                high = pointValue + value;
            } else if ((value = that.percentRegex.exec(errorValue))) {
                var percentValue = pointValue * (parseFloat(value[1]) / 100);
                low = pointValue - math.abs(percentValue);
                high = pointValue + math.abs(percentValue);
            } else {
                throw new Error("Invalid ErrorBar value: " + errorValue);
            }

            return {low: low, high: high};
        },

        getStandardError: function(data, average) {
            return this.getStandardDeviation(data, average, true) / math.sqrt(average.count);
        },

        getStandardDeviation: function(data, average, isSample) {
            var squareDifferenceSum = 0,
                length = data.length,
                total = isSample ? average.count - 1 : average.count,
                value;

            for (var i = 0; i < length; i++) {
                value = this.valueGetter(data[i]);
                if (isNumber(value)) {
                    squareDifferenceSum += math.pow(value - average.value, 2);
                }
            }

            return math.sqrt(squareDifferenceSum / total);
        },

        getAverage: function(data) {
            var sum = 0,
                count = 0,
                length = data.length,
                value;

            for(var i = 0; i < length; i++){
                value = this.valueGetter(data[i]);
                if (isNumber(value)) {
                    sum += value;
                    count++;
                }
            }

            return {
                value: sum / count,
                count: count
            };
        }
    };

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
            chart.seriesOptions = [];
            chart._evalSeries = [];

            chart.render();
        },

        options: {
            series: [],
            invertAxes: false,
            isStacked: false,
            clip: true
        },

        render: function() {
            var chart = this;
            chart.traverseDataPoints(proxy(chart.addValue, chart));
        },

        pointOptions: function(series, seriesIx) {
            var options = this.seriesOptions[seriesIx];
            if (!options) {
                var defaults = this.pointType().fn.defaults;
                this.seriesOptions[seriesIx] = options = deepExtend({ }, defaults, {
                    vertical: !this.options.invertAxes
                }, series);
            }

            return options;
        },

        plotValue: function(point) {
            if (!point) {
                return 0;
            }

            if (this.options.isStacked100 && isNumber(point.value)) {
                var categoryIx = point.categoryIx;
                var categoryPts = this.categoryPoints[categoryIx];
                var categorySum = 0;

                for (var i = 0; i < categoryPts.length; i++) {
                    var other = categoryPts[i];
                    if (other) {
                        var stack = point.series.stack;
                        var otherStack = other.series.stack;

                        if ((stack && otherStack) && stack.group !== otherStack.group) {
                            continue;
                        }

                        if (isNumber(other.value)) {
                            categorySum += math.abs(other.value);
                        }
                    }
                }

                if (categorySum > 0) {
                    return point.value / categorySum;
                }
            }

            return point.value;
        },

        plotRange: function(point, startValue) {
            var categoryIx = point.categoryIx;
            var categoryPts = this.categoryPoints[categoryIx];

            if (this.options.isStacked) {
                startValue = startValue || 0;
                var plotValue = this.plotValue(point);
                var positive = plotValue > 0;
                var prevValue = startValue;
                var isStackedBar = false;

                for (var i = 0; i < categoryPts.length; i++) {
                    var other = categoryPts[i];

                    if (point === other) {
                        break;
                    }

                    var stack = point.series.stack;
                    var otherStack = other.series.stack;
                    if (stack && otherStack) {
                        if (typeof stack === STRING && stack !== otherStack) {
                            continue;
                        }

                        if (stack.group && stack.group !== otherStack.group) {
                            continue;
                        }
                    }

                    var otherValue = this.plotValue(other);
                    if ((otherValue > 0 && positive) ||
                        (otherValue < 0 && !positive)) {
                        prevValue += otherValue;
                        plotValue += otherValue;
                        isStackedBar = true;
                    }
                }

                if (isStackedBar) {
                    prevValue -= startValue;
                }

                return [prevValue, plotValue];
            }

            var series = point.series;
            var valueAxis = this.seriesValueAxis(series);
            var axisCrossingValue = this.categoryAxisCrossingValue(valueAxis);

            return [axisCrossingValue, point.value || axisCrossingValue];
        },

        stackLimits: function(axisName, stackName) {
            var min = MAX_VALUE;
            var max = MIN_VALUE;

            for (var i = 0; i < this.categoryPoints.length; i++) {
                var categoryPts = this.categoryPoints[i];

                for (var pIx = 0; pIx < categoryPts.length; pIx++) {
                    var point = categoryPts[pIx];
                    if (point) {
                        if (point.series.stack === stackName || point.series.axis === axisName) {
                            var to = this.plotRange(point, 0)[1];
                            if (defined(to)) {
                                max = math.max(max, to);
                                min = math.min(min, to);
                            }
                        }
                    }
                }
            }

            return { min: min, max: max };
        },

        updateStackRange: function() {
            var chart = this;
            var chartSeries = chart.options.series;
            var isStacked = chart.options.isStacked;
            var limits;
            var limitsCache = {};

            if (isStacked) {
                for (var i = 0; i < chartSeries.length; i++) {
                    var series = chartSeries[i];
                    var axisName = series.axis;
                    var key = axisName + series.stack;

                    limits = limitsCache[key];
                    if (!limits) {
                        limits = chart.stackLimits(axisName, series.stack);

                        var errorTotals = chart.errorTotals;
                        if (errorTotals) {
                            if (errorTotals.negative.length) {
                                limits.min = math.min(limits.min, sparseArrayMin(errorTotals.negative));
                            }
                            if (errorTotals.positive.length) {
                                limits.max = math.max(limits.max, sparseArrayMax(errorTotals.positive));
                            }
                        }

                        limitsCache[key] = limits;
                    }

                    chart.valueAxisRanges[axisName] = limits;
                }
            }
        },

        addErrorBar: function(point, data, categoryIx) {
            var chart = this,
                value = point.value,
                series = point.series,
                seriesIx = point.seriesIx,
                errorBars = point.options.errorBars,
                errorRange,
                lowValue = data.fields[ERROR_LOW_FIELD],
                highValue = data.fields[ERROR_HIGH_FIELD];

            if (isNumber(lowValue) &&
                isNumber(highValue)) {
                errorRange = {low: lowValue, high: highValue};
            } else if (errorBars && defined(errorBars.value)) {
                chart.seriesErrorRanges = chart.seriesErrorRanges || [];
                chart.seriesErrorRanges[seriesIx] = chart.seriesErrorRanges[seriesIx] ||
                    new ErrorRangeCalculator(errorBars.value, series, VALUE);

                errorRange = chart.seriesErrorRanges[seriesIx].getErrorRange(value, errorBars.value);
            }

            if (errorRange) {
                point.low = errorRange.low;
                point.high = errorRange.high;
                chart.addPointErrorBar(point, categoryIx);
            }
        },

        addPointErrorBar: function(point, categoryIx) {
            var chart = this,
                series = point.series,
                low = point.low,
                high = point.high,
                isVertical = !chart.options.invertAxes,
                options = point.options.errorBars,
                errorBar,
                stackedErrorRange;

            if (chart.options.isStacked) {
                stackedErrorRange = chart.stackedErrorRange(point, categoryIx);
                low = stackedErrorRange.low;
                high = stackedErrorRange.high;
            } else {
                var fields = { categoryIx: categoryIx, series: series };
                chart.updateRange({value: low}, fields);
                chart.updateRange({value: high}, fields);
            }

            errorBar = new CategoricalErrorBar(low, high, isVertical, chart, series, options);
            point.errorBars = [errorBar];
            point.append(errorBar);
        },

        stackedErrorRange: function(point, categoryIx) {
            var chart = this,
                value = point.value,
                plotValue = chart.plotRange(point, 0)[1] - point.value,
                low = point.low + plotValue,
                high = point.high + plotValue;

            chart.errorTotals = chart.errorTotals || {positive: [], negative: []};

            if (low < 0) {
                chart.errorTotals.negative[categoryIx] =  math.min(chart.errorTotals.negative[categoryIx] || 0, low);
            }

            if (high > 0) {
                chart.errorTotals.positive[categoryIx] =  math.max(chart.errorTotals.positive[categoryIx] || 0, high);
            }

            return {low: low, high: high};
        },

        addValue: function(data, fields) {
            var chart = this;
            var categoryIx = fields.categoryIx;
            var category = fields.category;
            var series = fields.series;
            var seriesIx = fields.seriesIx;

            var categoryPoints = chart.categoryPoints[categoryIx];
            if (!categoryPoints) {
                chart.categoryPoints[categoryIx] = categoryPoints = [];
            }

            var seriesPoints = chart.seriesPoints[seriesIx];
            if (!seriesPoints) {
                chart.seriesPoints[seriesIx] = seriesPoints = [];
            }

            var point = chart.createPoint(data, fields);
            if (point) {
                $.extend(point, fields);

                point.owner = chart;
                point.dataItem = series.data[categoryIx];
                point.noteText = data.fields.noteText;
                chart.addErrorBar(point, data, categoryIx);
            }

            chart.points.push(point);
            seriesPoints.push(point);
            categoryPoints.push(point);

            chart.updateRange(data.valueFields, fields);
        },

        evalPointOptions: function(options, value, category, categoryIx, series, seriesIx) {
            var state = { defaults: series._defaults, excluded: ["data", "aggregate", "_events", "tooltip", "template"] };

            var doEval = this._evalSeries[seriesIx];
            if (!defined(doEval)) {
                this._evalSeries[seriesIx] = doEval = evalOptions(options, {}, state, true);
            }

            if (doEval) {
                options = deepExtend({}, options);
                evalOptions(options, {
                    value: value,
                    category: category,
                    index: categoryIx,
                    series: series,
                    dataItem: series.data[categoryIx]
                }, state);
            }

            return options;
        },

        updateRange: function(data, fields) {
            var chart = this,
                axisName = fields.series.axis,
                value = data.value,
                axisRange = chart.valueAxisRanges[axisName];

            if (isFinite(value) && value !== null) {
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
                pointIx = 0,
                categorySlots = chart.categorySlots = [],
                chartPoints = chart.points,
                categoryAxis = chart.categoryAxis,
                value, valueAxis,
                point;

            chart.traverseDataPoints(function(data, fields) {
                var category = fields.category;
                var categoryIx = fields.categoryIx;
                var currentSeries = fields.series;

                value = chart.pointValue(data);

                valueAxis = chart.seriesValueAxis(currentSeries);
                point = chartPoints[pointIx++];

                var categorySlot = categorySlots[categoryIx];
                if (!categorySlot) {
                    categorySlots[categoryIx] = categorySlot =
                        chart.categorySlot(categoryAxis, categoryIx, valueAxis);
                }

                if (point) {
                    var plotRange = chart.plotRange(point, valueAxis.startValue());
                    var valueSlot = valueAxis.getSlot(plotRange[0], plotRange[1], !chart.options.clip);
                    if (valueSlot) {
                        var pointSlot = chart.pointSlot(categorySlot, valueSlot);

                        point.aboveAxis = chart.aboveAxis(point, valueAxis);
                        if (chart.options.isStacked100) {
                            point.percentage = chart.plotValue(point);
                        }

                        chart.reflowPoint(point, pointSlot);
                    } else {
                        point.visible = false;
                    }
                }
            });

            chart.reflowCategories(categorySlots);

            chart.box = targetBox;
        },

        aboveAxis: function(point, valueAxis) {
            var axisCrossingValue = this.categoryAxisCrossingValue(valueAxis);
            var value = point.value;

            return valueAxis.options.reverse ?
                value < axisCrossingValue : value >= axisCrossingValue;
        },

        categoryAxisCrossingValue: function(valueAxis) {
            var categoryAxis = this.categoryAxis,
                options = valueAxis.options,
                crossingValues = [].concat(
                    options.axisCrossingValues || options.axisCrossingValue
                );

            return crossingValues[categoryAxis.axisIndex || 0] || 0;
        },

        reflowPoint: function(point, pointSlot) {
            point.reflow(pointSlot);
        },

        reflowCategories: function() { },

        pointSlot: function(categorySlot, valueSlot) {
            var chart = this,
                options = chart.options,
                invertAxes = options.invertAxes,
                slotX = invertAxes ? valueSlot : categorySlot,
                slotY = invertAxes ? categorySlot : valueSlot;

            return new Box2D(slotX.x1, slotY.y1, slotX.x2, slotY.y2);
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
                categoryIx,
                seriesIx,
                pointData,
                currentCategory,
                currentSeries,
                seriesCount = series.length;

            for (categoryIx = 0; categoryIx < count; categoryIx++) {
                for (seriesIx = 0; seriesIx < seriesCount; seriesIx++) {
                    currentSeries = series[seriesIx];
                    currentCategory = categories[categoryIx];
                    pointData = this._bindPoint(currentSeries, seriesIx, categoryIx);

                    callback(pointData, {
                        category: currentCategory,
                        categoryIx: categoryIx,
                        series: currentSeries,
                        seriesIx: seriesIx
                    });
                }
            }
        },

        _bindPoint: function(series, seriesIx, categoryIx) {
            if (!this._bindCache) {
                this._bindCache = [];
            }

            var bindCache = this._bindCache[seriesIx];
            if (!bindCache) {
                bindCache = this._bindCache[seriesIx] = [];
            }

            var data = bindCache[categoryIx];
            if (!data) {
                data = bindCache[categoryIx] = SeriesBinder.current.bindPoint(series, categoryIx);
            }

            return data;
        },

        formatPointValue: function(point, format) {
            if (point.value === null) {
                return "";
            }

            return autoFormat(format, point.value);
        },

        pointValue: function(data) {
            return data.valueFields.value;
        },

        createVisual: noop
    });

    var BarChart = CategoricalChart.extend({
        render: function() {
            var chart = this;

            CategoricalChart.fn.render.apply(chart);
            chart.updateStackRange();
        },

        pointType: function() {
            return Bar;
        },

        clusterType: function() {
            return ClusterLayout;
        },

        stackType: function() {
            return StackWrap;
        },

        stackLimits: function(axisName, stackName) {
            var limits = CategoricalChart.fn.stackLimits.call(this, axisName, stackName);
            limits.min = math.min(0, limits.min);
            limits.max = math.max(0, limits.max);

            return limits;
        },

        createPoint: function(data, fields) {
            var chart = this;
            var categoryIx = fields.categoryIx;
            var category = fields.category;
            var series = fields.series;
            var seriesIx = fields.seriesIx;
            var value = chart.pointValue(data);
            var options = chart.options;
            var children = chart.children;
            var isStacked = chart.options.isStacked;
            var point;
            var pointType = chart.pointType();
            var pointOptions;
            var cluster;
            var clusterType = chart.clusterType();

            pointOptions = this.pointOptions(series, seriesIx);

            var labelOptions = pointOptions.labels;
            if (isStacked) {
                if (labelOptions.position == OUTSIDE_END) {
                    labelOptions.position = INSIDE_END;
                }
            }

            pointOptions.isStacked = isStacked;

            var color = data.fields.color || series.color;
            if (value < 0 && pointOptions.negativeColor) {
                color = pointOptions.negativeColor;
            }

            pointOptions = chart.evalPointOptions(
                pointOptions, value, category, categoryIx, series, seriesIx
            );

            if (kendo.isFunction(series.color)) {
                color = pointOptions.color;
            }

            point = new pointType(value, pointOptions);
            point.color = color;

            cluster = children[categoryIx];
            if (!cluster) {
                cluster = new clusterType({
                    vertical: options.invertAxes,
                    gap: options.gap,
                    spacing: options.spacing
                });
                chart.append(cluster);
            }

            if (isStacked) {
               var stackWrap = chart.getStackWrap(series, cluster);
               stackWrap.append(point);
            } else {
                cluster.append(point);
            }

            return point;
        },

        getStackWrap: function(series, cluster) {
            var stack = series.stack;
            var stackGroup = stack ? stack.group || stack : stack;

            var wraps = cluster.children;
            var stackWrap;
            if (typeof stackGroup === STRING) {
                for (var i = 0; i < wraps.length; i++) {
                    if (wraps[i]._stackGroup === stackGroup) {
                        stackWrap = wraps[i];
                        break;
                    }
                }
            } else {
                stackWrap = wraps[0];
            }

            if (!stackWrap) {
                var stackType = this.stackType();
                stackWrap = new stackType({
                    vertical: !this.options.invertAxes
                });
                stackWrap._stackGroup = stackGroup;
                cluster.append(stackWrap);
            }

            return stackWrap;
        },

        categorySlot: function(categoryAxis, categoryIx, valueAxis) {
            var chart = this,
                options = chart.options,
                categorySlot = categoryAxis.getSlot(categoryIx),
                startValue = valueAxis.startValue(),
                stackAxis, zeroSlot;

            if (options.isStacked) {
                zeroSlot = valueAxis.getSlot(startValue, startValue, true);
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
        }
    });
    BarChartAnimationMixin.extend(BarChart.fn);

    var RangeBar = Bar.extend({
        defaults: {
            labels: {
                format: "{0} - {1}"
            },
            tooltip: {
                format: "{1}"
            }
        },

        createLabel: function() {
            var value = this.value;
            var labels = this.options.labels;
            var fromOptions = deepExtend({}, labels, labels.from);
            var toOptions = deepExtend({}, labels, labels.to);

            if (fromOptions.visible) {
                this.labelFrom = this._createLabel(fromOptions);
                this.append(this.labelFrom);
            }

            if (toOptions.visible) {
                this.labelTo = this._createLabel(toOptions);
                this.append(this.labelTo);
            }
        },

        _createLabel: function(options) {
            var labelText;

            if (options.template) {
                var labelTemplate = template(options.template);
                labelText = labelTemplate({
                    dataItem: this.dataItem,
                    category: this.category,
                    value: this.value,
                    percentage: this.percentage,
                    runningTotal: this.runningTotal,
                    total: this.total,
                    series: this.series
                });
            } else {
                labelText = this.formatValue(options.format);
            }

            return new BarLabel(labelText,
                deepExtend({
                    vertical: this.options.vertical
                },
                options
            ));
        },

        reflow: function(targetBox) {
            this.render();

            var rangeBar = this,
                options = rangeBar.options,
                labelFrom = rangeBar.labelFrom,
                labelTo = rangeBar.labelTo,
                value = rangeBar.value;

            rangeBar.box = targetBox;

            if (labelFrom) {
                labelFrom.options.aboveAxis = rangeBar.value.from > rangeBar.value.to;
                labelFrom.reflow(targetBox);
            }

            if (labelTo) {
                labelTo.options.aboveAxis = rangeBar.value.to > rangeBar.value.from;
                labelTo.reflow(targetBox);
            }

            if (rangeBar.note) {
                rangeBar.note.reflow(targetBox);
            }
        }
    });

    var RangeBarChart = BarChart.extend({
        pointType: function() {
            return RangeBar;
        },

        pointValue: function(data) {
            return data.valueFields;
        },

        formatPointValue: function(point, format) {
            if (point.value.from === null && point.value.to === null) {
                return "";
            }

            return autoFormat(format, point.value.from, point.value.to);
        },

        plotLimits: CategoricalChart.fn.plotLimits,

        plotRange: function(point) {
            if (!point) {
                return 0;
            }

            return [point.value.from, point.value.to];
        },

        updateRange: function(value, fields) {
            var chart = this,
                axisName = fields.series.axis,
                from = value.from,
                to = value.to,
                axisRange = chart.valueAxisRanges[axisName];

            if (value !== null && isNumber(from) && isNumber(to)) {
                axisRange = chart.valueAxisRanges[axisName] =
                    axisRange || { min: MAX_VALUE, max: MIN_VALUE };

                axisRange.min = math.min(axisRange.min, from);
                axisRange.max = math.max(axisRange.max, from);

                axisRange.min = math.min(axisRange.min, to);
                axisRange.max = math.max(axisRange.max, to);
            }
        },

        aboveAxis: function(point){
            var value = point.value;
            return value.from < value.to;
        }
    });

    var BulletChart = CategoricalChart.extend({
        init: function(plotArea, options) {
            var chart = this;

            chart.wrapData(options);

            CategoricalChart.fn.init.call(chart, plotArea, options);
        },

        wrapData: function(options) {
            var series = options.series,
                i, data, seriesItem;

            for (i = 0; i < series.length; i++) {
                seriesItem = series[i];
                data = seriesItem.data;
                if (data && !isArray(data[0]) && typeof(data[0]) != OBJECT) {
                    seriesItem.data = [data];
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

        plotRange: function(point) {
            var series = point.series;
            var valueAxis = this.seriesValueAxis(series);
            var axisCrossingValue = this.categoryAxisCrossingValue(valueAxis);

            return [axisCrossingValue, point.value.current || axisCrossingValue];
        },

        createPoint: function(data, fields) {
            var chart = this;
            var categoryIx = fields.categoryIx;
            var category = fields.category;
            var series = fields.series;
            var seriesIx = fields.seriesIx;
            var value = data.valueFields;
            var options = chart.options;
            var children = chart.children;
            var bullet;
            var bulletOptions;
            var cluster;

            bulletOptions = deepExtend({
                vertical: !options.invertAxes,
                overlay: series.overlay,
                categoryIx: categoryIx,
                invertAxes: options.invertAxes
            }, series);

            bulletOptions = chart.evalPointOptions(
                bulletOptions, value, category, categoryIx, series, seriesIx
            );

            bullet = new Bullet(value, bulletOptions);

            cluster = children[categoryIx];
            if (!cluster) {
                cluster = new ClusterLayout({
                    vertical: options.invertAxes,
                    gap: options.gap,
                    spacing: options.spacing
                });
                chart.append(cluster);
            }

            cluster.append(bullet);

            return bullet;
        },

        updateRange: function(value, fields) {
            var chart = this,
                axisName = fields.series.axis,
                current = value.current,
                target = value.target,
                axisRange = chart.valueAxisRanges[axisName];

            if (defined(current) && !isNaN(current) && defined(target && !isNaN(target))) {
                axisRange = chart.valueAxisRanges[axisName] =
                    axisRange || { min: MAX_VALUE, max: MIN_VALUE };

                axisRange.min = math.min.apply(math, [axisRange.min, current, target]);
                axisRange.max = math.max.apply(math, [axisRange.max, current, target]);
            }
        },

        formatPointValue: function(point, format) {
            return autoFormat(format, point.value.current, point.value.target);
        },

        pointValue: function(data) {
            return data.valueFields.current;
        },

        aboveAxis: function(point, valueAxis) {
            var value = point.value.current;

            return value > 0;
        }
    });
    BarChartAnimationMixin.extend(BulletChart.fn);

    var Bullet = ChartElement.extend({
        init: function(value, options) {
            var bullet = this;

            ChartElement.fn.init.call(bullet, options);

            bullet.value = value;
            bullet.aboveAxis = bullet.options.aboveAxis;
        },

        options: {
            color: WHITE,
            border: {
                width: 1
            },
            vertical: false,
            opacity: 1,
            target: {
                shape: "",
                border: {
                    width: 0,
                    color: "green"
                },
                line: {
                    width: 2
                }
            },
            tooltip: {
                format: "Current: {0}</br>Target: {1}"
            }
        },

        render: function() {
            var bullet = this,
                options = bullet.options;

            if (!bullet._rendered) {
                bullet._rendered = true;

                if (defined(bullet.value.target)) {
                    bullet.target = new Target({
                        type: options.target.shape,
                        background: options.target.color || options.color,
                        opacity: options.opacity,
                        zIndex: options.zIndex,
                        border: options.target.border,
                        vAlign: TOP,
                        align: RIGHT
                    });

                    bullet.append(bullet.target);
                }

                bullet.createNote();
            }
        },

        reflow: function(box) {
            this.render();

            var bullet = this,
                options = bullet.options,
                chart = bullet.owner,
                target = bullet.target,
                invertAxes = options.invertAxes,
                valueAxis = chart.seriesValueAxis(bullet.options),
                categorySlot = chart.categorySlot(chart.categoryAxis, options.categoryIx, valueAxis),
                targetValueSlot = valueAxis.getSlot(bullet.value.target),
                targetSlotX = invertAxes ? targetValueSlot : categorySlot,
                targetSlotY = invertAxes ? categorySlot : targetValueSlot,
                targetSlot;

            if (target) {
                targetSlot = new Box2D(
                    targetSlotX.x1, targetSlotY.y1,
                    targetSlotX.x2, targetSlotY.y2
                );
                target.options.height = invertAxes ? targetSlot.height() : options.target.line.width;
                target.options.width = invertAxes ? options.target.line.width : targetSlot.width();
                target.reflow(targetSlot);
            }

            if (bullet.note) {
                bullet.note.reflow(box);
            }

            bullet.box = box;
        },

        createVisual: function() {
            ChartElement.fn.createVisual.call(this);

            var options = this.options;
            var body = draw.Path.fromRect(this.box.toRect(), {
                fill: {
                    color: options.color,
                    opacity: options.opacity
                },
                stroke: null
            });

            if (options.border.width > 0) {
                body.options.set("stroke", {
                    color: options.border.color || options.color,
                    width: options.border.width,
                    dashType: options.border.dashType,
                    opacity: valueOrDefault(options.border.opacity, options.opacity)
                });
            }

            alignPathToPixel(body);
            this.visual.append(body);
        },

        createAnimation: function() {
            var options = this.options;

            deepExtend(options, {
                animation: {
                    aboveAxis: this.aboveAxis,
                    vertical: options.vertical
                }
            });

            ChartElement.fn.createAnimation.call(this);
        },

        tooltipAnchor: function(tooltipWidth, tooltipHeight) {
            var bar = this,
                options = bar.options,
                box = bar.box,
                vertical = options.vertical,
                aboveAxis = bar.aboveAxis,
                clipBox = bar.owner.pane.clipBox() || box,
                x,
                y;

            if (vertical) {
                x = box.x2 + TOOLTIP_OFFSET;
                y = aboveAxis ? math.max(box.y1, clipBox.y1) : math.min(box.y2, clipBox.y2) - tooltipHeight;
            } else {
                var x1 = math.max(box.x1, clipBox.x1),
                    x2 = math.min(box.x2, clipBox.x2);
                if (options.isStacked) {
                    x = aboveAxis ? x2 - tooltipWidth : x1;
                    y = box.y1 - tooltipHeight - TOOLTIP_OFFSET;
                } else {
                    x = aboveAxis ? x2 + TOOLTIP_OFFSET : x1 - tooltipWidth - TOOLTIP_OFFSET;
                    y = box.y1;
                }
            }

            return new Point2D(x, y);
        },

        createHighlight: function(style) {
            return draw.Path.fromRect(this.box.toRect(), style);
        },

        formatValue: function(format) {
            var bullet = this;

            return bullet.owner.formatPointValue(bullet, format);
        }
    });
    deepExtend(Bullet.fn, PointEventsMixin);
    deepExtend(Bullet.fn, NoteMixin);

    var Target = ShapeElement.extend();
    deepExtend(Target.fn, PointEventsMixin);

    var ErrorBarBase = ChartElement.extend({
        init: function(low, high, isVertical, chart, series, options) {
            var errorBar = this;
            errorBar.low = low;
            errorBar.high = high;
            errorBar.isVertical = isVertical;
            errorBar.chart = chart;
            errorBar.series = series;

            ChartElement.fn.init.call(errorBar, options);
        },

        options: {
            animation: {
                type: FADEIN,
                delay: INITIAL_ANIMATION_DURATION
            },
            endCaps: true,
            line: {
                width: 1
            },
            zIndex: 1
        },

        getAxis: function(){},

        reflow: function(targetBox) {
            var linePoints,
                errorBar = this,
                endCaps = errorBar.options.endCaps,
                isVertical = errorBar.isVertical,
                axis = errorBar.getAxis(),
                valueBox = axis.getSlot(errorBar.low, errorBar.high),
                centerBox = targetBox.center(),
                capsWidth = errorBar.getCapsWidth(targetBox, isVertical),
                capValue = isVertical ? centerBox.x: centerBox.y,
                capStart = capValue - capsWidth,
                capEnd = capValue + capsWidth;

            if (isVertical) {
                linePoints = [
                    Point2D(centerBox.x, valueBox.y1),
                    Point2D(centerBox.x, valueBox.y2)
                ];
                if (endCaps) {
                    linePoints.push(Point2D(capStart, valueBox.y1),
                        Point2D(capEnd, valueBox.y1),
                        Point2D(capStart, valueBox.y2),
                        Point2D(capEnd, valueBox.y2));
                }
            } else {
                linePoints = [
                    Point2D(valueBox.x1, centerBox.y),
                    Point2D(valueBox.x2, centerBox.y)
                ];
                if (endCaps) {
                    linePoints.push(Point2D(valueBox.x1, capStart),
                        Point2D(valueBox.x1, capEnd),
                        Point2D(valueBox.x2, capStart),
                        Point2D(valueBox.x2, capEnd));
                }
            }

            errorBar.linePoints = linePoints;
        },

        getCapsWidth: function(box, isVertical) {
            var boxSize = isVertical ? box.width() : box.height(),
                capsWidth = math.min(math.floor(boxSize / 2), DEFAULT_ERROR_BAR_WIDTH) || DEFAULT_ERROR_BAR_WIDTH;

            return capsWidth;
        },

        createVisual: function() {
            var errorBar = this,
                options = errorBar.options,
                parent = errorBar.parent,
                lineOptions = {
                    stroke: {
                        color: options.color,
                        width: options.line.width,
                        dashType: options.line.dashType
                    }
                },
                linePoints = errorBar.linePoints;

            ChartElement.fn.createVisual.call(this);

            for (var idx = 0; idx < linePoints.length; idx+=2) {
                var line = new draw.Path(lineOptions)
                    .moveTo(linePoints[idx].x, linePoints[idx].y)
                    .lineTo(linePoints[idx + 1].x, linePoints[idx + 1].y);

                this.visual.append(line);
            }
        }
    });

    var CategoricalErrorBar = ErrorBarBase.extend({
        getAxis: function() {
            var errorBar = this,
                chart = errorBar.chart,
                series = errorBar.series,
                axis = chart.seriesValueAxis(series);

            return axis;
        }
    });

    var ScatterErrorBar = ErrorBarBase.extend({
        getAxis: function() {
            var errorBar = this,
                chart = errorBar.chart,
                series = errorBar.series,
                axes = chart.seriesAxes(series),
                axis = errorBar.isVertical ? axes.y : axes.x;
            return axis;
        }
    });

    var LinePoint = ChartElement.extend({
        init: function(value, options) {
            var point = this;

            ChartElement.fn.init.call(point);

            point.value = value;
            point.options = options;
            point.aboveAxis = valueOrDefault(point.options.aboveAxis, true);
            point.tooltipTracking = true;
        },

        defaults: {
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
            },
            notes: {
                label: {}
            },
            highlight: {
                markers: {
                    border: {}
                }
            }
        },

        render: function() {
            var point = this,
                options = point.options,
                markers = options.markers,
                labels = options.labels,
                labelText = point.value;

            if (point._rendered) {
                return;
            } else {
                point._rendered = true;
            }

            if (markers.visible && markers.size) {
                point.marker = point.createMarker();
                point.append(point.marker);
            }

            if (labels.visible) {
                if (labels.template) {
                    var labelTemplate = template(labels.template);
                    labelText = labelTemplate({
                        dataItem: point.dataItem,
                        category: point.category,
                        value: point.value,
                        percentage: point.percentage,
                        series: point.series
                    });
                } else if (labels.format) {
                    labelText = point.formatValue(labels.format);
                }
                point.label = new TextBox(labelText,
                    deepExtend({
                        align: CENTER,
                        vAlign: CENTER,
                        margin: {
                            left: 5,
                            right: 5
                        },
                        zIndex: this.series.zIndex
                    }, labels)
                );
                point.append(point.label);
            }

            point.createNote();

            if (point.errorBar) {
                point.append(point.errorBar);
            }
        },

        markerBorder: function() {
            var options = this.options.markers;
            var background = options.background;
            var border = deepExtend({ color: this.color }, options.border);

            if (!defined(border.color)) {
                border.color =
                    new Color(background).brightness(BAR_BORDER_BRIGHTNESS).toHex();
            }

            return border;
        },

        createVisual: noop,

        createMarker: function() {
            var options = this.options.markers;
            var marker = new ShapeElement({
                type: options.type,
                width: options.size,
                height: options.size,
                rotation: options.rotation,
                background: options.background,
                border: this.markerBorder(),
                opacity: options.opacity,
                zIndex: this.series.zIndex,
                animation: options.animation
            });

            return marker;
        },

        markerBox: function() {
            if (!this.marker) {
                this.marker = this.createMarker();
                this.marker.reflow(this._childBox);
            }

            return this.marker.box;
        },

        reflow: function(targetBox) {
            var point = this,
                options = point.options,
                vertical = options.vertical,
                aboveAxis = point.aboveAxis,
                childBox, center;

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

            point._childBox = childBox;
            if (point.marker) {
                point.marker.reflow(childBox);
            }

            point.reflowLabel(childBox);

            if (point.errorBars) {
                for(var i = 0; i < point.errorBars.length; i++){
                     point.errorBars[i].reflow(childBox);
                }
            }

            if (point.note) {
                var noteTargetBox = point.markerBox();

                if (!point.marker) {
                    center = noteTargetBox.center();
                    noteTargetBox = Box2D(center.x, center.y, center.x, center.y);
                }

                point.note.reflow(noteTargetBox);
            }
        },

        reflowLabel: function(box) {
            var point = this,
                options = point.options,
                label = point.label,
                anchor = options.labels.position;

            if (label) {
                anchor = anchor === ABOVE ? TOP : anchor;
                anchor = anchor === BELOW ? BOTTOM : anchor;

                label.reflow(box);
                label.box.alignTo(point.markerBox(), anchor);
                label.reflow(label.box);
            }
        },

        createHighlight: function() {
            var highlight = this.options.highlight;
            var markers = highlight.markers;
            var defaultColor = this.markerBorder().color;
            var options = this.options.markers;

            var shadow = new ShapeElement({
                type: options.type,
                width: options.size,
                height: options.size,
                rotation: options.rotation,
                background: markers.color || defaultColor,
                border: {
                    color: markers.border.color,
                    width: markers.border.width,
                    opacity: valueOrDefault(markers.border.opacity, 1)
                },
                opacity: valueOrDefault(markers.opacity, 1)
            });
            shadow.reflow(this._childBox);

            return shadow.getElement();
        },

        tooltipAnchor: function(tooltipWidth, tooltipHeight) {
            var point = this,
                markerBox = point.markerBox(),
                options = point.options,
                aboveAxis = point.aboveAxis,
                x = markerBox.x2 + TOOLTIP_OFFSET,
                y = aboveAxis ? markerBox.y1 - tooltipHeight : markerBox.y2,
                clipBox = point.owner.pane.clipBox(),
                showTooltip = !clipBox || clipBox.overlaps(markerBox);

            if (showTooltip) {
                return Point2D(x, y);
            }
        },

        formatValue: function(format) {
            var point = this;

            return point.owner.formatPointValue(point, format);
        }
    });
    deepExtend(LinePoint.fn, PointEventsMixin);
    deepExtend(LinePoint.fn, NoteMixin);

    var Bubble = LinePoint.extend({
        init: function(value, options) {
            var point = this;

            LinePoint.fn.init.call(point, value, options);

            point.category = value.category;
        },

        defaults: {
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

        createHighlight: function() {
            var highlight = this.options.highlight;
            var border = highlight.border;
            var markers = this.options.markers;
            var center = this.box.center();
            var radius = markers.size / 2 - border.width / 2;
            var overlay = new draw.Circle(new geom.Circle([center.x, center.y], radius), {
                stroke: {
                    color: border.color ||
                        new Color(markers.background).brightness(BAR_BORDER_BRIGHTNESS).toHex(),
                    width: border.width,
                    opacity: border.opacity
                },
                fill: {
                    color: markers.background,
                    opacity: highlight.opacity
                }
            });

            return overlay;
        }
    });

    var LineSegment = ChartElement.extend({
        init: function(linePoints, series, seriesIx) {
            var segment = this;

            ChartElement.fn.init.call(segment);

            segment.linePoints = linePoints;
            segment.series = series;
            segment.seriesIx = seriesIx;
        },

        options: {
            closed: false
        },

        points: function(visualPoints) {
            var segment = this,
                linePoints = segment.linePoints.concat(visualPoints || []),
                points = [];

            for (var i = 0, length = linePoints.length; i < length; i++) {
                if (linePoints[i].visible !== false) {
                    points.push(linePoints[i]._childBox.toRect().center());
                }
            }

            return points;
        },

        createVisual: function() {
            var options = this.options;
            var series = this.series;
            var defaults = series._defaults;
            var color = series.color;

            if (isFn(color) && defaults) {
                color = defaults.color;
            }

            var line = draw.Path.fromPoints(this.points(), {
                stroke: {
                    color: color,
                    width: series.width,
                    opacity: series.opacity,
                    dashType: series.dashType
                },
                zIndex: series.zIndex
            });

            if (options.closed) {
                line.close();
            }

            this.visual = line;
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
                currentSeries, seriesIx,
                seriesCount = seriesPoints.length,
                sortedPoints, linePoints,
                point, pointIx, pointCount,
                lastSegment;

            this._segments = [];

            for (seriesIx = 0; seriesIx < seriesCount; seriesIx++) {
                currentSeries = series[seriesIx];
                sortedPoints = chart.sortPoints(seriesPoints[seriesIx]);
                pointCount = sortedPoints.length;
                linePoints = [];

                for (pointIx = 0; pointIx < pointCount; pointIx++) {
                    point = sortedPoints[pointIx];
                    if (point) {
                        linePoints.push(point);
                    } else if (chart.seriesMissingValues(currentSeries) !== INTERPOLATE) {
                        if (linePoints.length > 1) {
                            lastSegment = chart.createSegment(
                                linePoints, currentSeries, seriesIx, lastSegment
                            );
                            this._addSegment(lastSegment);
                        }
                        linePoints = [];
                    }
                }

                if (linePoints.length > 1) {
                    lastSegment = chart.createSegment(
                        linePoints, currentSeries, seriesIx, lastSegment
                    );
                    this._addSegment(lastSegment);
                }
            }
        },

        _addSegment: function(segment) {
            this._segments.push(segment);
            this.children.unshift(segment);
            segment.parent = this;
        },

        sortPoints: function(points) {
            return points;
        },

        seriesMissingValues: function(series) {
            var missingValues = series.missingValues,
                assumeZero = !missingValues && this.options.isStacked;

            return assumeZero ? ZERO : missingValues || INTERPOLATE;
        },

        getNearestPoint: function(x, y, seriesIx) {
            var target = new Point2D(x, y);
            var allPoints = this.seriesPoints[seriesIx];
            var nearestPointDistance = MAX_VALUE;
            var nearestPoint;

            for (var i = 0; i < allPoints.length; i++) {
                var point = allPoints[i];

                if (point && defined(point.value) && point.value !== null && point.visible !== false) {
                    var pointBox = point.box;
                    var pointDistance = pointBox.center().distanceTo(target);

                    if (pointDistance < nearestPointDistance) {
                        nearestPoint = point;
                        nearestPointDistance = pointDistance;
                    }
                }
            }

            return nearestPoint;
        }
    };

    var LineChart = CategoricalChart.extend({
        render: function() {
            var chart = this;

            CategoricalChart.fn.render.apply(chart);

            chart.updateStackRange();
            chart.renderSegments();
        },

        pointType: function() {
            return LinePoint;
        },

        createPoint: function(data, fields) {
            var chart = this;
            var categoryIx = fields.categoryIx;
            var category = fields.category;
            var series = fields.series;
            var seriesIx = fields.seriesIx;
            var value = data.valueFields.value;
            var options = chart.options;
            var isStacked = options.isStacked;
            var categoryPoints = chart.categoryPoints[categoryIx];
            var missingValues = chart.seriesMissingValues(series);
            var stackPoint;
            var plotValue = 0;
            var point;
            var pointOptions;

            if (!defined(value) || value === null) {
                if (missingValues === ZERO) {
                    value = 0;
                } else {
                    return null;
                }
            }

            pointOptions = this.pointOptions(series, seriesIx);
            pointOptions = chart.evalPointOptions(
                pointOptions, value, category, categoryIx, series, seriesIx
            );

            var color = data.fields.color || series.color;
            if (kendo.isFunction(series.color)) {
                color = pointOptions.color;
            }

            point = new LinePoint(value, pointOptions);
            point.color = color;

            chart.append(point);

            return point;
        },

        plotRange: function(point) {
            var plotValue = this.plotValue(point);

            if (this.options.isStacked) {
                var categoryIx = point.categoryIx;
                var categoryPts = this.categoryPoints[categoryIx];

                for (var i = 0; i < categoryPts.length; i++) {
                    var other = categoryPts[i];

                    if (point === other) {
                        break;
                    }

                    plotValue += this.plotValue(other);
                }

            }

            return [plotValue, plotValue];
        },

        createSegment: function(linePoints, currentSeries, seriesIx) {
            var pointType,
                style = currentSeries.style;

            if (style === STEP) {
                pointType = StepLineSegment;
            } else if (style === SMOOTH) {
                pointType = SplineSegment;
            } else {
                pointType = LineSegment;
            }

            return new pointType(linePoints, currentSeries, seriesIx);
        }
    });
    deepExtend(LineChart.fn, LineChartMixin);

    var StepLineSegment = LineSegment.extend({
        points: function(visualPoints) {
            var segment = this,
                points;

            points = segment.calculateStepPoints(segment.linePoints);

            if (visualPoints && visualPoints.length) {
                points = points.concat(segment.calculateStepPoints(visualPoints).reverse());
            }

            return points;
        },

        calculateStepPoints: function(points) {
            var segment = this,
                chart = segment.parent,
                plotArea = chart.plotArea,
                categoryAxis = plotArea.seriesCategoryAxis(segment.series),
                isInterpolate = chart.seriesMissingValues(segment.series) === INTERPOLATE,
                length = points.length,
                reverse = categoryAxis.options.reverse,
                vertical = categoryAxis.options.vertical,
                dir = reverse ? 2 : 1,
                revDir = reverse ? 1 : 2,
                prevPoint, point, i,
                prevMarkerBoxCenter, markerBoxCenter,
                result = [];

            for (i = 1; i < length; i++) {
                prevPoint = points[i - 1];
                point = points[i];
                prevMarkerBoxCenter = prevPoint.markerBox().center();
                markerBoxCenter = point.markerBox().center();
                if (categoryAxis.options.justified) {
                    result.push(new geom.Point(prevMarkerBoxCenter.x, prevMarkerBoxCenter.y));
                    if (vertical) {
                        result.push(new geom.Point(prevMarkerBoxCenter.x, markerBoxCenter.y));
                    } else {
                        result.push(new geom.Point(markerBoxCenter.x, prevMarkerBoxCenter.y));
                    }
                    result.push(new geom.Point(markerBoxCenter.x, markerBoxCenter.y));
                } else {
                    if (vertical) {
                        result.push(new geom.Point(prevMarkerBoxCenter.x, prevPoint.box[Y + dir]));
                        result.push(new geom.Point(prevMarkerBoxCenter.x, prevPoint.box[Y + revDir]));
                        if (isInterpolate) {
                            result.push(new geom.Point(prevMarkerBoxCenter.x, point.box[Y + dir]));
                        }
                        result.push(new geom.Point(markerBoxCenter.x, point.box[Y + dir]));
                        result.push(new geom.Point(markerBoxCenter.x, point.box[Y + revDir]));
                    } else {
                        result.push(new geom.Point(prevPoint.box[X + dir], prevMarkerBoxCenter.y));
                        result.push(new geom.Point(prevPoint.box[X + revDir], prevMarkerBoxCenter.y));
                        if (isInterpolate) {
                            result.push(new geom.Point(point.box[X + dir], prevMarkerBoxCenter.y));
                        }
                        result.push(new geom.Point(point.box[X + dir], markerBoxCenter.y));
                        result.push(new geom.Point(point.box[X + revDir], markerBoxCenter.y));
                    }
                }
            }

            return result || [];
        }
    });

    var SplineSegment = LineSegment.extend({
        createVisual: function() {
            var options = this.options;
            var series = this.series;
            var defaults = series._defaults;
            var color = series.color;

            if (isFn(color) && defaults) {
                color = defaults.color;
            }

            var curveProcessor = new CurveProcessor(this.options.closed);
            var segments = curveProcessor.process(this.points());
            var curve = new draw.Path({
                stroke: {
                    color: color,
                    width: series.width,
                    opacity: series.opacity,
                    dashType: series.dashType
                },
                zIndex: series.zIndex
            });

            curve.segments.push.apply(curve.segments, segments);

            this.visual = curve;
        }
    });

    var AreaSegmentMixin = {
        points: function() {
            var segment = this,
                chart = segment.parent,
                plotArea = chart.plotArea,
                invertAxes = chart.options.invertAxes,
                valueAxis = chart.seriesValueAxis(segment.series),
                valueAxisLineBox = valueAxis.lineBox(),
                categoryAxis = plotArea.seriesCategoryAxis(segment.series),
                categoryAxisLineBox = categoryAxis.lineBox(),
                end = invertAxes ? categoryAxisLineBox.x1 : categoryAxisLineBox.y1,
                stackPoints = segment.stackPoints,
                points = segment._linePoints(stackPoints),
                pos = invertAxes ? X : Y,
                firstPoint, lastPoint;

            end = limitValue(end, valueAxisLineBox[pos + 1], valueAxisLineBox[pos + 2]);
            if (!segment.stackPoints && points.length > 1) {
                firstPoint = points[0];
                lastPoint = last(points);

                if (invertAxes) {
                    points.unshift(new geom.Point(end, firstPoint.y));
                    points.push(new geom.Point(end, lastPoint.y));
                } else {
                    points.unshift(new geom.Point(firstPoint.x, end));
                    points.push(new geom.Point(lastPoint.x, end));
                }
            }

            return points;
        },

        createVisual: function() {
            var options = this.options;
            var series = this.series;
            var defaults = series._defaults;
            var color = series.color;

            if (isFn(color) && defaults) {
                color = defaults.color;
            }

            this.visual = new draw.Group({
                zIndex: series.zIndex
            });

            this.createArea(color);
            this.createLine(color);
        },

        createLine: function(color) {
            var series = this.series;
            var lineOptions = deepExtend({
                        color: color,
                        opacity: series.opacity
                    }, series.line
                );

            if (lineOptions.visible !== false && lineOptions.width > 0) {
                var line = draw.Path.fromPoints(this._linePoints(), {
                    stroke: {
                        color: lineOptions.color,
                        width: lineOptions.width,
                        opacity: lineOptions.opacity,
                        dashType: lineOptions.dashType,
                        lineCap: "butt"
                    }
                });

                this.visual.append(line);
            }
        },

        createArea: function(color) {
            var series = this.series;

            var area = draw.Path.fromPoints(this.points(), {
                fill: {
                    color: color,
                    opacity: series.opacity
                },
                stroke: null
            });

            this.visual.append(area);
        }
    };

    var AreaSegment = LineSegment.extend({
        init: function(linePoints, stackPoints, currentSeries, seriesIx) {
            var segment = this;

            segment.stackPoints = stackPoints;

            LineSegment.fn.init.call(segment, linePoints, currentSeries, seriesIx);
        },

        _linePoints: LineSegment.fn.points
    });
    deepExtend(AreaSegment.fn, AreaSegmentMixin);

    var AreaChart = LineChart.extend({
        createSegment: function(linePoints, currentSeries, seriesIx, prevSegment) {
            var chart = this,
                options = chart.options,
                isStacked = options.isStacked,
                stackPoints, pointType,
                style = (currentSeries.line || {}).style;

            if (isStacked && seriesIx > 0 && prevSegment) {
                stackPoints = prevSegment.linePoints;
                if (style !== STEP) {
                    stackPoints = stackPoints.slice(0).reverse();
                }
            }

            if (style === SMOOTH) {
                return new SplineAreaSegment(linePoints, prevSegment, isStacked, currentSeries, seriesIx);
            }

            if (style === STEP) {
                pointType = StepAreaSegment;
            } else {
                pointType = AreaSegment;
            }

            return new pointType(linePoints, stackPoints, currentSeries, seriesIx);
        },

        seriesMissingValues: function(series) {
            return series.missingValues || ZERO;
        }
    });

    var SplineAreaSegment = AreaSegment.extend({
        init: function(linePoints, prevSegment, isStacked, currentSeries, seriesIx) {
            var segment = this;

            segment.prevSegment = prevSegment;
            segment.isStacked = isStacked;
            LineSegment.fn.init.call(segment, linePoints, currentSeries, seriesIx);
        },

        strokeSegments: function() {
            var segments = this._strokeSegments;

            if (!segments) {
                var curveProcessor = new CurveProcessor(this.options.closed);
                var linePoints = LineSegment.fn.points.call(this);
                segments = this._strokeSegments = curveProcessor.process(linePoints);
            }

            return segments;
        },

        createVisual: function() {
            var options = this.options;
            var series = this.series;
            var defaults = series._defaults;
            var color = series.color;

            if (isFn(color) && defaults) {
                color = defaults.color;
            }

            this.visual = new draw.Group({
                zIndex: series.zIndex
            });

            this.createFill({
                fill: {
                    color: color,
                    opacity: series.opacity
                },
                stroke: null
            });

            this.createStroke({
                stroke: deepExtend({
                    color: color,
                    opacity: series.opacity,
                    lineCap: "butt"
                }, series.line)
            });
        },

        createFill: function(style) {
            var strokeSegments = this.strokeSegments();
            var fillSegments = strokeSegments.slice(0);
            var prevSegment = this.prevSegment;

            if (this.isStacked && prevSegment) {
                var prevStrokeSegments = prevSegment.strokeSegments();
                var prevAnchor = last(prevStrokeSegments).anchor();

                fillSegments.push(new draw.Segment(
                    prevAnchor,
                    prevAnchor,
                    last(strokeSegments).anchor()
                ));

                var stackSegments = $.map(prevStrokeSegments, function(segment) {
                    return new draw.Segment(
                        segment.anchor(),
                        segment.controlOut(),
                        segment.controlIn()
                    );
                }).reverse();

                append(fillSegments, stackSegments);

                var firstAnchor = fillSegments[0].anchor();
                fillSegments.push(new draw.Segment(
                    firstAnchor,
                    firstAnchor,
                    last(stackSegments).anchor()
                ));
            }

            var fill = new draw.Path(style);
            fill.segments.push.apply(fill.segments, fillSegments);
            this.closeFill(fill);

            this.visual.append(fill);
        },

        closeFill: function(fillPath) {
            var segment = this,
                chart = segment.parent,
                prevSegment = segment.prevSegment,
                plotArea = chart.plotArea,
                invertAxes = chart.options.invertAxes,
                valueAxis = chart.seriesValueAxis(segment.series),
                valueAxisLineBox = valueAxis.lineBox(),
                categoryAxis = plotArea.seriesCategoryAxis(segment.series),
                categoryAxisLineBox = categoryAxis.lineBox(),
                end = invertAxes ? categoryAxisLineBox.x1 : categoryAxisLineBox.y1,
                pos = invertAxes ? X : Y,
                segments = segment.strokeSegments(),
                firstPoint = segments[0].anchor(),
                lastPoint = last(segments).anchor();

            end = limitValue(end, valueAxisLineBox[pos + 1], valueAxisLineBox[pos + 2]);
            if (!(chart.options.isStacked && prevSegment) && segments.length > 1) {
                if (invertAxes) {
                    fillPath.lineTo(end, lastPoint.y)
                            .lineTo(end, firstPoint.y);
                } else {
                    fillPath.lineTo(lastPoint.x, end)
                            .lineTo(firstPoint.x, end);
                }
            }
        },

        createStroke: function(style) {
            if (style.stroke.width > 0) {
                var stroke = new draw.Path(style);
                stroke.segments.push.apply(stroke.segments, this.strokeSegments());

                this.visual.append(stroke);
            }
        }
    });

    var StepAreaSegment = StepLineSegment.extend({
        init: function(linePoints, stackPoints, currentSeries, seriesIx) {
            var segment = this;

            segment.stackPoints = stackPoints;

            StepLineSegment.fn.init.call(segment, linePoints, currentSeries, seriesIx);
        },

        _linePoints: StepLineSegment.fn.points
    });
    deepExtend(StepAreaSegment.fn, AreaSegmentMixin);

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
            chart.seriesOptions = [];
            chart._evalSeries = [];

            chart.render();
        },

        options: {
            series: [],
            tooltip: {
                format: "{0}, {1}"
            },
            labels: {
                format: "{0}, {1}"
            },
            clip: true
        },

        render: function() {
            var chart = this;

            chart.traverseDataPoints(proxy(chart.addValue, chart));
        },

        addErrorBar: function(point, field, fields){
            var errorRange,
                chart = this,
                value = point.value[field],
                valueErrorField = field + "Value",
                lowField = field + "ErrorLow",
                highField = field + "ErrorHigh",
                seriesIx = fields.seriesIx,
                series = fields.series,
                errorBars = point.options.errorBars,
                lowValue = fields[lowField],
                highValue = fields[highField];

            if (isNumber(value)) {
                if (isNumber(lowValue) && isNumber(highValue)) {
                    errorRange = {low: lowValue, high: highValue};
                }

                if (errorBars && defined(errorBars[valueErrorField])) {
                    chart.seriesErrorRanges = chart.seriesErrorRanges || {x: [], y: []};
                    chart.seriesErrorRanges[field][seriesIx] = chart.seriesErrorRanges[field][seriesIx] ||
                        new ErrorRangeCalculator(errorBars[valueErrorField], series, field);

                    errorRange = chart.seriesErrorRanges[field][seriesIx].getErrorRange(value, errorBars[valueErrorField]);
                }

                if (errorRange) {
                    chart.addPointErrorBar(errorRange, point, field);
                }
            }
        },

        addPointErrorBar: function(errorRange, point, field){
            var chart = this,
                low = errorRange.low,
                high = errorRange.high,
                series = point.series,
                isVertical = field === Y,
                options = point.options.errorBars,
                item = {},
                errorBar;

            point[field + "Low"] = low;
            point[field + "High"] = high;

            point.errorBars = point.errorBars || [];
            errorBar = new ScatterErrorBar(low, high, isVertical, chart, series, options);
            point.errorBars.push(errorBar);
            point.append(errorBar);

            item[field] = low;
            chart.updateRange(item, series);
            item[field] = high;
            chart.updateRange(item, series);
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
                point = chart.createPoint(value, fields);
                if (point) {
                    extend(point, fields);
                    chart.addErrorBar(point, X, fields);
                    chart.addErrorBar(point, Y, fields);
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

                if (typeof(x) === STRING) {
                    x = toDate(x);
                }

                xAxisRange.min = math.min(xAxisRange.min, x);
                xAxisRange.max = math.max(xAxisRange.max, x);
            }

            if (defined(y) && y !== null) {
                yAxisRange = chart.yAxisRanges[yAxisName] =
                    yAxisRange || { min: MAX_VALUE, max: MIN_VALUE };

                if (typeof(y) === STRING) {
                    y = toDate(y);
                }

                yAxisRange.min = math.min(yAxisRange.min, y);
                yAxisRange.max = math.max(yAxisRange.max, y);
            }
        },

        evalPointOptions: function(options, value, fields) {
            var series = fields.series;
            var seriesIx = fields.seriesIx;
            var state = { defaults: series._defaults, excluded: ["data", "tooltip", "tempate"] };

            var doEval = this._evalSeries[seriesIx];
            if (!defined(doEval)) {
                this._evalSeries[seriesIx] = doEval = evalOptions(options, {}, state, true);
            }

            if (doEval) {
                options = deepExtend({}, options);
                evalOptions(options, {
                    value: value,
                    series: series,
                    dataItem: fields.dataItem
                }, state);
            }

            return options;
        },

        pointType: function() {
            return LinePoint;
        },

        pointOptions: function(series, seriesIx) {
            var options = this.seriesOptions[seriesIx];
            if (!options) {
                var defaults = this.pointType().fn.defaults;
                this.seriesOptions[seriesIx] = options = deepExtend({}, defaults, {
                    markers: {
                        opacity: series.opacity
                    },
                    tooltip: {
                        format: this.options.tooltip.format
                    },
                    labels: {
                        format: this.options.labels.format
                    }
                }, series);
            }

            return options;
        },

        createPoint: function(value, fields) {
            var chart = this,
                series = fields.series,
                point;

            var pointOptions = this.pointOptions(series, fields.seriesIx);
            var color = fields.color || series.color;

            pointOptions = chart.evalPointOptions(pointOptions, value, fields);

            if (kendo.isFunction(series.color)) {
                color = pointOptions.color;
            }

            point = new LinePoint(value, pointOptions);
            point.color = color;

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
                seriesAxes,
                clip = chart.options.clip,
                limit = !chart.options.clip;

            chart.traverseDataPoints(function(value, fields) {
                point = chartPoints[pointIx++];
                seriesAxes = chart.seriesAxes(fields.series);

                var slotX = seriesAxes.x.getSlot(value.x, value.x, limit),
                    slotY = seriesAxes.y.getSlot(value.y, value.y, limit),
                    pointSlot;

                if (point) {
                    if (slotX && slotY) {
                        pointSlot = chart.pointSlot(slotX, slotY);
                        point.reflow(pointSlot);
                    } else {
                        point.visible = false;
                    }
                }
            });

            chart.box = targetBox;
        },

        pointSlot: function(slotX, slotY) {
            return new Box2D(slotX.x1, slotY.y1, slotX.x2, slotY.y2);
        },

        traverseDataPoints: function(callback) {
            var chart = this,
                options = chart.options,
                series = options.series,
                seriesPoints = chart.seriesPoints,
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
                    pointData = this._bindPoint(currentSeries, seriesIx, pointIx);
                    value = pointData.valueFields;
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

        _bindPoint: CategoricalChart.fn._bindPoint,

        formatPointValue: function(point, format) {
            var value = point.value;
            return autoFormat(format, value.x, value.y);
        },

        createVisual: noop
    });

    var ScatterLineChart = ScatterChart.extend({
        render: function() {
            var chart = this;

            ScatterChart.fn.render.call(chart);

            chart.renderSegments();
        },

        createSegment: function(linePoints, currentSeries, seriesIx) {
            var pointType,
                style = currentSeries.style;

            if (style === SMOOTH) {
                pointType = SplineSegment;
            } else {
                pointType = LineSegment;
            }

            return new pointType(linePoints, currentSeries, seriesIx);
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
            if ((value.size !== null && value.size >= 0) || fields.series.negativeValues.visible) {
                ScatterChart.fn.addValue.call(this, value, fields);
            }
        },

        reflow: function(box) {
            var chart = this;

            chart.updateBubblesSize(box);
            ScatterChart.fn.reflow.call(chart, box);
        },

        pointType: function() {
            return Bubble;
        },

        createPoint: function(value, fields) {
            var chart = this,
                series = fields.series,
                seriesColors = chart.plotArea.options.seriesColors || [],
                pointsCount = series.data.length,
                delay = fields.pointIx * (INITIAL_ANIMATION_DURATION / pointsCount),
                animationOptions = {
                    delay: delay,
                    duration: INITIAL_ANIMATION_DURATION - delay,
                    type: BUBBLE
                },
                point, pointOptions;

            var color = fields.color || series.color;
            if (value.size < 0 && series.negativeValues.visible) {
                color = valueOrDefault(
                    series.negativeValues.color, color
                );
            }

            pointOptions = deepExtend({
                labels: {
                    animation: {
                        delay: delay,
                        duration: INITIAL_ANIMATION_DURATION - delay
                    }
                }
            }, this.pointOptions(series, fields.seriesIx), {
                markers: {
                    type: CIRCLE,
                    border: series.border,
                    opacity: series.opacity,
                    animation: animationOptions
                }
            });

            pointOptions = chart.evalPointOptions(pointOptions, value, fields);
            if (kendo.isFunction(series.color)) {
                color = pointOptions.color;
            }

            pointOptions.markers.background = color;

            point = new Bubble(value, pointOptions);
            point.color = color;

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

        formatPointValue: function(point, format) {
            var value = point.value;
            return autoFormat(format, value.x, value.y, value.size, point.category);
        }
    });

    var Candlestick = ChartElement.extend({
        init: function(value, options) {
            ChartElement.fn.init.call(this, options);
            this.value = value;
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
            },
            notes: {
                visible: true,
                label: {}
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
            points.push([ [mid, lhSlot.y1], [mid, ocSlot.y1] ]);
            points.push([ [mid, ocSlot.y2], [mid, lhSlot.y2] ]);

            point.lines = points;

            point.box = lhSlot.clone().wrap(ocSlot);

            if (!point._rendered) {
                point._rendered = true;
                point.createNote();
            }

            point.reflowNote();
        },

        reflowNote: function() {
            var point = this;

            if (point.note) {
                point.note.reflow(point.box);
            }
        },

        createVisual: function() {
            ChartElement.fn.createVisual.call(this);

            this.visual.append(
                this.mainVisual(this.options)
            );

            this.createOverlay();
        },

        mainVisual: function(options) {
            var group = new draw.Group();

            this.createBody(group, options);
            this.createLines(group, options);

            return group;
        },

        createBody: function(container, options) {
            var body = draw.Path.fromRect(this.realBody.toRect(), {
                fill: {
                    color: this.color,
                    opacity: options.opacity
                },
                stroke: null
            });

            if (options.border.width > 0) {
                body.options.set("stroke", {
                    color: this.getBorderColor(),
                    width: options.border.width,
                    dashType: options.border.dashType,
                    opacity: valueOrDefault(options.border.opacity, options.opacity)
                });
            }

            alignPathToPixel(body);
            container.append(body);

            if (hasGradientOverlay(options)) {
                container.append(this.createGradientOverlay(body, {
                        baseColor: this.color
                    },
                    deepExtend({}, options.overlay)
                ));
            }
        },

        createLines: function(container, options) {
            this.drawLines(container, options, this.lines, options.line);
        },

        drawLines: function(container, options, lines, lineOptions) {
            var lineStyle = {
                stroke: {
                    color: lineOptions.color || this.color,
                    opacity: valueOrDefault(lineOptions.opacity, options.opacity),
                    width: lineOptions.width,
                    dashType: lineOptions.dashType,
                    lineCap: "butt"
                }
            };

            for (var i = 0; i < lines.length; i++) {
                var line = draw.Path.fromPoints(lines[i], lineStyle);
                alignPathToPixel(line);
                container.append(line);
            }
        },

        getBorderColor: function() {
            var point = this,
                options = point.options,
                border = options.border,
                borderColor = border.color;

            if (!defined(borderColor)) {
                borderColor =
                    new Color(point.color).brightness(border._brightness).toHex();
            }

            return borderColor;
        },

        createOverlay: function() {
            var overlay = draw.Path.fromRect(this.box.toRect(), {
                fill: {
                    color: WHITE,
                    opacity: 0
                },
                stroke: null
            });

            this.visual.append(overlay);
        },

        createHighlight: function() {
            var highlight = this.options.highlight;
            var normalColor = this.color;

            this.color = highlight.color || this.color;
            var overlay = this.mainVisual(
                deepExtend({}, this.options, {
                    line: {
                        color: this.getBorderColor()
                    }
                }, highlight)
            );
            this.color = normalColor;

            return overlay;
        },

        tooltipAnchor: function() {
            var point = this,
                box = point.box,
                clipBox = point.owner.pane.clipBox() || box;

            return new Point2D(box.x2 + TOOLTIP_OFFSET, math.max(box.y1, clipBox.y1) + TOOLTIP_OFFSET);
        },

        formatValue: function(format) {
            var point = this;
            return point.owner.formatPointValue(point, format);
        }
    });
    deepExtend(Candlestick.fn, PointEventsMixin);
    deepExtend(Candlestick.fn, NoteMixin);

    var CandlestickChart = CategoricalChart.extend({
        options: {},

        reflowCategories: function(categorySlots) {
            var chart = this,
                children = chart.children,
                childrenLength = children.length,
                i;

            for (i = 0; i < childrenLength; i++) {
                children[i].reflow(categorySlots[i]);
            }
        },

        addValue: function(data, fields) {
            var chart = this;
            var categoryIx = fields.categoryIx;
            var category = fields.category;
            var series = fields.series;
            var seriesIx = fields.seriesIx;
            var options = chart.options;
            var value = data.valueFields;
            var children = chart.children;
            var valueParts = chart.splitValue(value);
            var hasValue = areNumbers(valueParts);
            var categoryPoints = chart.categoryPoints[categoryIx];
            var dataItem = series.data[categoryIx];
            var point, cluster;

            if (!categoryPoints) {
                chart.categoryPoints[categoryIx] = categoryPoints = [];
            }

            if (hasValue) {
                point = chart.createPoint(data, fields);
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
                chart.updateRange(value, fields);

                cluster.append(point);

                point.categoryIx = categoryIx;
                point.category = category;
                point.series = series;
                point.seriesIx = seriesIx;
                point.owner = chart;
                point.dataItem = dataItem;
                point.noteText = data.fields.noteText;
            }

            chart.points.push(point);
            categoryPoints.push(point);
        },

        pointType: function() {
            return Candlestick;
        },

        createPoint: function(data, fields) {
            var chart = this;
            var categoryIx = fields.categoryIx;
            var category = fields.category;
            var series = fields.series;
            var seriesIx = fields.seriesIx;
            var value = data.valueFields;
            var pointOptions = deepExtend({}, series);
            var pointType = chart.pointType();
            var color = data.fields.color || series.color;

            pointOptions = chart.evalPointOptions(
                pointOptions, value, category, categoryIx, series, seriesIx
            );

            if (series.type == CANDLESTICK) {
                if (value.open > value.close) {
                    color = data.fields.downColor || series.downColor || series.color;
                }
            }

            if (kendo.isFunction(series.color)) {
                color = pointOptions.color;
            }

            var point = new pointType(value, pointOptions);
            point.color = color;

            return point;
        },

        splitValue: function(value) {
            return [value.low, value.open, value.close, value.high];
        },

        updateRange: function(value, fields) {
            var chart = this,
                axisName = fields.series.axis,
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

            oPoints.push([oSlot.x1, oSlot.y1]);
            oPoints.push([mid, oSlot.y1]);
            cPoints.push([mid, cSlot.y1]);
            cPoints.push([cSlot.x2, cSlot.y1]);
            lhPoints.push([mid, lhSlot.y1]);
            lhPoints.push([mid, lhSlot.y2]);

            point.lines = [
                oPoints, cPoints, lhPoints
            ];

            point.box = lhSlot.clone().wrap(oSlot.clone().wrap(cSlot));

            point.reflowNote();
        },

        createBody: $.noop
    });

    var OHLCChart = CandlestickChart.extend({
        pointType: function() {
            return OHLCPoint;
        }
    });

    var BoxPlotChart = CandlestickChart.extend({
        addValue: function(data, fields) {
            var chart = this;
            var categoryIx = fields.categoryIx;
            var category = fields.category;
            var series = fields.series;
            var seriesIx = fields.seriesIx;
            var options = chart.options;
            var children = chart.children;
            var value = data.valueFields;
            var valueParts = chart.splitValue(value);
            var hasValue = areNumbers(valueParts);
            var categoryPoints = chart.categoryPoints[categoryIx];
            var dataItem = series.data[categoryIx];
            var point, cluster;

            if (!categoryPoints) {
                chart.categoryPoints[categoryIx] = categoryPoints = [];
            }

            if (hasValue) {
                point = chart.createPoint(data, fields);
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
                chart.updateRange(value, fields);

                cluster.append(point);

                point.categoryIx = categoryIx;
                point.category = category;
                point.series = series;
                point.seriesIx = seriesIx;
                point.owner = chart;
                point.dataItem = dataItem;
            }

            chart.points.push(point);
            categoryPoints.push(point);
        },

        pointType: function() {
            return BoxPlot;
        },

        splitValue: function(value) {
            return [
                value.lower, value.q1, value.median,
                value.q3, value.upper
            ];
        },

        updateRange: function(value, fields) {
            var chart = this,
                axisName = fields.series.axis,
                axisRange = chart.valueAxisRanges[axisName],
                parts = chart.splitValue(value).concat(
                    chart.filterOutliers(value.outliers));

            if (defined(value.mean)) {
                parts = parts.concat(value.mean);
            }

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
                value.lower, value.q1, value.median,
                value.q3, value.upper, value.mean, point.category
            );
        },

        filterOutliers: function(items) {
            var length = (items || []).length,
                result = [],
                i, item;

            for (i = 0; i < length; i++) {
                item = items[i];
                if (defined(item)) {
                    appendIfNotNull(result, item);
                }
            }

            return result;
        }
    });

    var BoxPlot = Candlestick.extend({
        init: function(value, options) {
            var point = this;

            ChartElement.fn.init.call(point, options);
            point.value = value;

            point.createNote();
        },

        options: {
            border: {
                _brightness: 0.8
            },
            line: {
                width: 2
            },
            mean: {
                width: 2,
                dashType: "dash"
            },
            overlay: {
                gradient: GLASS
            },
            tooltip: {
                format: "<table style='text-align: left;'>" +
                        "<th colspan='2'>{6:d}</th>" +
                        "<tr><td>Lower:</td><td>{0:C}</td></tr>" +
                        "<tr><td>Q1:</td><td>{1:C}</td></tr>" +
                        "<tr><td>Median:</td><td>{2:C}</td></tr>" +
                        "<tr><td>Mean:</td><td>{5:C}</td></tr>" +
                        "<tr><td>Q3:</td><td>{3:C}</td></tr>" +
                        "<tr><td>Upper:</td><td>{4:C}</td></tr>" +
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
            },
            notes: {
                visible: true,
                label: {}
            },
            outliers: {
                visible: true,
                size: LINE_MARKER_SIZE,
                type: CROSS,
                background: WHITE,
                border: {
                    width: 2,
                    opacity: 1
                },
                opacity: 0
            },
            extremes: {
                visible: true,
                size: LINE_MARKER_SIZE,
                type: CIRCLE,
                background: WHITE,
                border: {
                    width: 2,
                    opacity: 1
                },
                opacity: 0
            }
        },

        reflow: function(box) {
            var point = this,
                options = point.options,
                chart = point.owner,
                value = point.value,
                valueAxis = chart.seriesValueAxis(options),
                mid, whiskerSlot, boxSlot, medianSlot, meanSlot;

            boxSlot = valueAxis.getSlot(value.q1, value.q3);
            point.boxSlot = boxSlot;

            whiskerSlot = valueAxis.getSlot(value.lower, value.upper);
            medianSlot = valueAxis.getSlot(value.median);

            boxSlot.x1 = whiskerSlot.x1 = box.x1;
            boxSlot.x2 = whiskerSlot.x2 = box.x2;

            point.realBody = boxSlot;

            if (value.mean) {
                meanSlot = valueAxis.getSlot(value.mean);
                point.meanPoints = [
                    [[box.x1, meanSlot.y1], [box.x2, meanSlot.y1]]
                ];
            }

            mid = whiskerSlot.center().x;
            point.whiskerPoints = [[
                [mid - 5, whiskerSlot.y1], [mid + 5, whiskerSlot.y1],
                [mid, whiskerSlot.y1], [mid, boxSlot.y1]
            ], [
                [mid - 5, whiskerSlot.y2], [mid + 5, whiskerSlot.y2],
                [mid, whiskerSlot.y2], [mid, boxSlot.y2]
            ]];

            point.medianPoints = [
                [[box.x1, medianSlot.y1], [box.x2, medianSlot.y1]]
            ];

            point.box = whiskerSlot.clone().wrap(boxSlot);

            point.reflowNote();
        },

        renderOutliers: function(options) {
            var point = this,
                markers = options.markers || {},
                value = point.value,
                outliers = value.outliers || [],
                valueAxis = point.owner.seriesValueAxis(options),
                outerFence = math.abs(value.q3 - value.q1) * 3,
                markersBorder, markerBox, shape, outlierValue, i;

            var elements = [];

            for (i = 0; i < outliers.length; i++) {
                outlierValue = outliers[i];
                if (outlierValue < value.q3 + outerFence && outlierValue > value.q1 - outerFence) {
                    markers = options.outliers;
                } else {
                    markers = options.extremes;
                }
                markersBorder = deepExtend({}, markers.border);

                if (!defined(markersBorder.color)) {
                    if (defined(point.color)) {
                        markersBorder.color = point.color;
                    } else {
                        markersBorder.color =
                            new Color(markers.background).brightness(BAR_BORDER_BRIGHTNESS).toHex();
                    }
                }

                shape = new ShapeElement({
                    type: markers.type,
                    width: markers.size,
                    height: markers.size,
                    rotation: markers.rotation,
                    background: markers.background,
                    border: markersBorder,
                    opacity: markers.opacity
                });

                shape.value = outlierValue;

                elements.push(shape);
            }

            this.reflowOutliers(elements);
            return elements;
        },

        reflowOutliers: function(outliers) {
            var valueAxis = this.owner.seriesValueAxis(this.options);
            var centerX = this.box.center().x;

            for (var i = 0; i < outliers.length; i++) {
                var outlierValue = outliers[i].value;
                var markerBox = valueAxis.getSlot(outlierValue).move(centerX);

                this.box = this.box.wrap(markerBox);
                outliers[i].reflow(markerBox);
            }
        },

        mainVisual: function(options) {
            var group = Candlestick.fn.mainVisual.call(this, options);

            var outliers = this.renderOutliers(options);
            for (var i = 0; i < outliers.length; i++) {
                var element = outliers[i].getElement();
                if (element) {
                    group.append(element);
                }
            }

            return group;
        },

        createLines: function(container, options) {
            this.drawLines(container, options, this.whiskerPoints, options.line);
            this.drawLines(container, options, this.medianPoints, options.median);
            this.drawLines(container, options, this.meanPoints, options.mean);
        },

        getBorderColor: function() {
            if (this.color) {
                return this.color;
            }

            return Candlestick.getBorderColor.call(this);
        }
    });
    deepExtend(BoxPlot.fn, PointEventsMixin);

    // TODO: Rename to Segment?
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
            },
            visible: true
        },

        render: function() {
            var segment = this,
                options = segment.options,
                labels = options.labels,
                labelText = segment.value,
                labelTemplate;

            if (segment._rendered || segment.visible === false) {
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
                angle = sector.middle(),
                lp, x1, labelWidth, labelHeight;

            if (label) {
                labelHeight = label.box.height();
                labelWidth = label.box.width();
                if (labelsOptions.position == CENTER) {
                    sector.r = math.abs((sector.r - labelHeight) / 2) + labelHeight;
                    lp = sector.point(angle);
                    label.reflow(Box2D(lp.x, lp.y - labelHeight / 2, lp.x, lp.y));
                } else if (labelsOptions.position == INSIDE_END) {
                    sector.r = sector.r - labelHeight / 2;
                    lp = sector.point(angle);
                    label.reflow(Box2D(lp.x, lp.y - labelHeight / 2, lp.x, lp.y));
                } else {
                    lp = sector.clone().expand(labelsDistance).point(angle);
                    if (lp.x >= sector.c.x) {
                        x1 = lp.x + labelWidth;
                        label.orientation = RIGHT;
                    } else {
                        x1 = lp.x - labelWidth;
                        label.orientation = LEFT;
                    }
                    label.reflow(Box2D(x1, lp.y - labelHeight, lp.x, lp.y));
                }
            }
        },

        createVisual: function() {
            var segment = this,
                sector = segment.sector,
                options = segment.options,
                borderOptions = options.border || {},
                border = borderOptions.width > 0 ? {
                    stroke: {
                        color: borderOptions.color,
                        width: borderOptions.width,
                        opacity: borderOptions.opacity,
                        dashType: borderOptions.dashType
                    }
                } : {},
                elements = [],
                color = options.color,
                fill = {
                    color: color,
                    opacity: options.opacity
                },
                visual;

            ChartElement.fn.createVisual.call(this);
            if (segment.value) {
                visual = segment.createSegment(sector, deepExtend({
                    fill: fill,
                    stroke: {
                        opacity: options.opacity
                    },
                    zIndex: options.zIndex
                }, border));

                this.visual.append(visual);

                if (hasGradientOverlay(options)) {
                    this.visual.append(this.createGradientOverlay(visual, {
                            baseColor: color,
                            fallbackFill: fill
                        }, deepExtend({
                            center: [sector.c.x, sector.c.y],
                            innerRadius: sector.ir,
                            radius: sector.r,
                            userSpace: true
                        }, options.overlay)
                    ));
                }
            }
        },

        createSegment: function(sector, options) {
            if (options.singleSegment) {
                return new draw.Circle(new geom.Circle(new geom.Point(sector.c.x, sector.c.y), sector.r), options);
            } else {
                return ShapeBuilder.current.createRing(sector, options);
            }
        },

        createAnimation: function() {
            var options = this.options;

            var center = this.sector.c;
            deepExtend(options, {
                animation: {
                    center: [center.x, center.y],
                    delay: this.animationDelay
                }
            });

            ChartElement.fn.createAnimation.call(this);
        },

        createHighlight: function(options) {
            var segment = this,
                highlight = segment.options.highlight || {},
                border = highlight.border || {};

            return segment.createSegment(segment.sector, deepExtend({}, options, {
                fill: {
                    color: highlight.color,
                    opacity: highlight.opacity
                },
                stroke: {
                    opacity: border.opacity,
                    width: border.width,
                    color: border.color
                }
            }));
        },

        tooltipAnchor: function(width, height) {
            var point = this,
                box = point.sector.adjacentBox(TOOLTIP_OFFSET, width, height);

            return new Point2D(box.x1, box.y1);
        },

        formatValue: function(format) {
            var point = this;

            return point.owner.formatPointValue(point, format);
        }
    });
    deepExtend(PieSegment.fn, PointEventsMixin);

    var PieChartMixin = {
        createLegendItem: function(value, point, options) {
            var chart = this,
                legendOptions = chart.options.legend || {},
                labelsOptions = legendOptions.labels || {},
                inactiveItems = legendOptions.inactiveItems || {},
                inactiveItemsLabels = inactiveItems.labels || {},
                text, labelTemplate, markerColor, itemLabelOptions,
                pointVisible;

            if (options && options.visibleInLegend !== false) {
                pointVisible = options.visible !== false;
                text = options.category || "";
                labelTemplate = pointVisible ? labelsOptions.template :
                    (inactiveItemsLabels.template || labelsOptions.template);

                if (labelTemplate) {
                    text = template(labelTemplate)({
                        text: text,
                        series: options.series,
                        dataItem: options.dataItem,
                        percentage: options.percentage,
                        value: value
                    });
                }

                if (pointVisible) {
                    itemLabelOptions = {};
                    markerColor = point.color;
                } else {
                    itemLabelOptions = {
                        color: inactiveItemsLabels.color,
                        font: inactiveItemsLabels.font
                    };
                    markerColor = (inactiveItems.markers || {}).color;
                }

                if (text) {
                    chart.legendItems.push({
                        pointIndex: options.index,
                        text: text,
                        series: options.series,
                        markerColor: markerColor,
                        labels: itemLabelOptions
                    });
                }
            }
        }
    };

    var PieChart = ChartElement.extend({
        init: function(plotArea, options) {
            var chart = this;

            ChartElement.fn.init.call(chart, options);

            chart.plotArea = plotArea;
            chart.points = [];
            chart.legendItems = [];
            chart.render();
        },

        options: {
            startAngle: 90,
            connectors: {
                width: 1,
                color: "#939393",
                padding: 4
            },
            inactiveItems: {
                markers: {},
                labels: {}
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
                colorsCount = colors.length,
                series = options.series,
                seriesCount = series.length,
                currentSeries, pointData, fields, seriesIx,
                angle, data, anglePerValue, value, plotValue, explode,
                total, currentAngle, i, pointIx = 0;

            for (seriesIx = 0; seriesIx < seriesCount; seriesIx++) {
                currentSeries = series[seriesIx];
                data = currentSeries.data;
                total = seriesTotal(currentSeries);
                anglePerValue = 360 / total;

                if (defined(currentSeries.startAngle)) {
                    currentAngle = currentSeries.startAngle;
                } else {
                    currentAngle = options.startAngle;
                }

                if (seriesIx != seriesCount - 1) {
                    if (currentSeries.labels.position == OUTSIDE_END) {
                        currentSeries.labels.position = CENTER;
                    }
                }

                for (i = 0; i < data.length; i++) {
                    pointData = SeriesBinder.current.bindPoint(currentSeries, i);
                    value = pointData.valueFields.value;
                    plotValue = math.abs(value);
                    fields = pointData.fields;
                    angle = round(plotValue * anglePerValue, DEFAULT_PRECISION);
                    explode = data.length != 1 && !!fields.explode;
                    if (!isFn(currentSeries.color)) {
                        currentSeries.color = fields.color || colors[i % colorsCount];
                    }

                    callback(value, new Ring(null, 0, 0, currentAngle, angle), {
                        owner: chart,
                        category: fields.category || "",
                        index: pointIx,
                        series: currentSeries,
                        seriesIx: seriesIx,
                        dataItem: data[i],
                        percentage: plotValue / total,
                        explode: explode,
                        visibleInLegend: fields.visibleInLegend,
                        visible: fields.visible,
                        zIndex: seriesCount - seriesIx,
                        animationDelay: chart.animationDelay(i, seriesIx, seriesCount)
                    });

                    if (pointData.fields.visible !== false) {
                        currentAngle += angle;
                    }
                    pointIx++;
                }
                pointIx = 0;
            }
        },

        evalSegmentOptions: function(options, value, fields) {
            var series = fields.series;

            evalOptions(options, {
                value: value,
                series: series,
                dataItem: fields.dataItem,
                category: fields.category,
                percentage: fields.percentage
            }, { defaults: series._defaults, excluded: ["data", "template"] });
        },

        addValue: function(value, sector, fields) {
            var chart = this,
                segment;

            var segmentOptions = deepExtend({}, fields.series, { index: fields.index });
            chart.evalSegmentOptions(segmentOptions, value, fields);

            chart.createLegendItem(value, segmentOptions, fields);

            if (fields.visible === false) {
                return;
            }

            segment = new PieSegment(value, sector, segmentOptions);
            extend(segment, fields);
            chart.append(segment);
            chart.points.push(segment);
        },

        reflow: function(targetBox) {
            var chart = this,
                options = chart.options,
                box = targetBox.clone(),
                space = 5,
                minWidth = math.min(box.width(), box.height()),
                halfMinWidth = minWidth / 2,
                defaultPadding = minWidth - minWidth * 0.85,
                padding = valueOrDefault(options.padding, defaultPadding),
                newBox = Box2D(box.x1, box.y1,
                    box.x1 + minWidth, box.y1 + minWidth),
                newBoxCenter = newBox.center(),
                seriesConfigs = chart.seriesConfigs || [],
                boxCenter = box.center(),
                points = chart.points,
                count = points.length,
                seriesCount = options.series.length,
                leftSideLabels = [],
                rightSideLabels = [],
                seriesConfig, seriesIndex, label,
                segment, sector, r, i, c;

            padding = padding > halfMinWidth - space ? halfMinWidth - space : padding;
            newBox.translate(boxCenter.x - newBoxCenter.x, boxCenter.y - newBoxCenter.y);
            r = halfMinWidth - padding;
            c = Point2D(
                r + newBox.x1 + padding,
                r + newBox.y1 + padding
            );

            for (i = 0; i < count; i++) {
                segment = points[i];

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
                points = chart.points,
                segment = points[points.length - 1],
                sector = segment.sector,
                firstBox = labels[0].box,
                count = labels.length - 1,
                lr = sector.r + segment.options.labels.distance,
                distances = [],
                secondBox, distance, i;

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
                remaining, left, right, i;

            for (i = 0; i < count; i++) {
                left = right = i;
                remaining = -distances[i];
                while (remaining > 0 && (left >= 0 || right < count)) {
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
                points = chart.points,
                segment = points[points.length - 1],
                sector = segment.sector,
                labelsCount = labels.length,
                labelOptions = segment.options.labels,
                labelDistance = labelOptions.distance,
                boxY = sector.c.y - (sector.r + labelDistance) - labels[0].box.height(),
                label, boxX, box, i;

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
                    label.reflow(Box2D(boxX + box.width(), boxY,
                        boxX, boxY));
                } else {
                    if (labelOptions.align !== CIRCLE) {
                        boxX = sector.c.x - sector.r - labelDistance;
                    }
                    label.reflow(Box2D(boxX - box.width(), boxY,
                        boxX, boxY));
                }

                boxY += box.height();
            }
        },

        createVisual: function() {
            var chart = this,
                options = chart.options,
                connectors = options.connectors,
                points = chart.points,
                connectorLine,
                count = points.length,
                space = 4,
                sector, angle, segment,
                seriesIx, label, i;

            ChartElement.fn.createVisual.call(this);
            this._connectorLines = [];
            for (i = 0; i < count; i++) {
                segment = points[i];
                sector = segment.sector;
                angle = sector.middle();
                label = segment.label;
                seriesIx = { seriesId: segment.seriesIx };

                if (label) {
                    connectorLine = new draw.Path({
                        stroke: {
                            color:  connectors.color,
                            width: connectors.width
                        },
                        animation: {
                            type: FADEIN,
                            delay: segment.animationDelay
                        }
                    });
                    if (label.options.position === OUTSIDE_END && segment.value !== 0) {
                        var box = label.box,
                            centerPoint = sector.c,
                            start = sector.point(angle),
                            middle = Point2D(box.x1, box.center().y),
                            sr, end, crossing;

                        start = sector.clone().expand(connectors.padding).point(angle);
                        connectorLine.moveTo(start.x, start.y);
                        // TODO: Extract into a method to remove duplication
                        if (label.orientation == RIGHT) {
                            end = Point2D(box.x1 - connectors.padding, box.center().y);
                            crossing = intersection(centerPoint, start, middle, end);
                            middle = Point2D(end.x - space, end.y);
                            crossing = crossing || middle;
                            crossing.x = math.min(crossing.x, middle.x);

                            if (chart.pointInCircle(crossing, sector.c, sector.r + space) ||
                                crossing.x < sector.c.x) {
                                sr = sector.c.x + sector.r + space;
                                if (segment.options.labels.align !== COLUMN) {
                                    if (sr < middle.x) {
                                        connectorLine.lineTo(sr, start.y);
                                    } else {
                                        connectorLine.lineTo(start.x + space * 2, start.y);
                                    }
                                } else {
                                    connectorLine.lineTo(sr, start.y);
                                }
                                connectorLine.lineTo(middle.x, end.y);
                            } else {
                                crossing.y = end.y;
                                connectorLine.lineTo(crossing.x, crossing.y);
                            }
                        } else {
                            end = Point2D(box.x2 + connectors.padding, box.center().y);
                            crossing = intersection(centerPoint, start, middle, end);
                            middle = Point2D(end.x + space, end.y);
                            crossing = crossing || middle;
                            crossing.x = math.max(crossing.x, middle.x);

                            if (chart.pointInCircle(crossing, sector.c, sector.r + space) ||
                                crossing.x > sector.c.x) {
                                sr = sector.c.x - sector.r - space;
                                if (segment.options.labels.align !== COLUMN) {
                                    if (sr > middle.x) {
                                        connectorLine.lineTo(sr, start.y);
                                    } else {
                                        connectorLine.lineTo(start.x - space * 2, start.y);
                                    }
                                } else {
                                    connectorLine.lineTo(sr, start.y);
                                }
                                connectorLine.lineTo(middle.x, end.y);
                            } else {
                                crossing.y = end.y;
                                connectorLine.lineTo(crossing.x, crossing.y);
                            }
                        }

                        connectorLine.lineTo(end.x, end.y);

                        this._connectorLines.push(connectorLine);
                        this.visual.append(connectorLine);
                    }
                }
            }
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

    deepExtend(PieChart.fn, PieChartMixin);

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

        createSegment: function(sector, options) {
            return ShapeBuilder.current.createRing(sector, options);
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

            var segmentOptions = deepExtend({}, fields.series, { index: fields.index });
            chart.evalSegmentOptions(segmentOptions, value, fields);

            chart.createLegendItem(value, segmentOptions, fields);

            if (!value || fields.visible === false) {
                return;
            }

            segment = new DonutSegment(value, sector, segmentOptions);
            extend(segment, fields);
            chart.append(segment);
            chart.points.push(segment);
        },

        reflow: function(targetBox) {
            var chart = this,
                options = chart.options,
                box = targetBox.clone(),
                space = 5,
                minWidth = math.min(box.width(), box.height()),
                halfMinWidth = minWidth / 2,
                defaultPadding = minWidth - minWidth * 0.85,
                padding = valueOrDefault(options.padding, defaultPadding),
                series = options.series,
                currentSeries,
                seriesCount = series.length,
                seriesWithoutSize = 0,
                holeSize, totalSize, size,
                margin = 0, i, r, ir = 0,
                currentSize = 0;

            chart.seriesConfigs = [];
            padding = padding > halfMinWidth - space ? halfMinWidth - space : padding;
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
                size = valueOrDefault(currentSeries.size, totalSize / seriesWithoutSize);
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

    var WaterfallChart = BarChart.extend({
        render: function() {
            BarChart.fn.render.call(this);
            this.createSegments();
        },

        traverseDataPoints: function(callback) {
            var series = this.options.series;
            var categories = this.categoryAxis.options.categories || [];
            var totalCategories = categoriesCount(series);
            var isVertical = !this.options.invertAxes;

            for (var seriesIx = 0; seriesIx < series.length; seriesIx++) {
                var currentSeries = series[seriesIx];
                var total = 0;
                var runningTotal = 0;

                for (var categoryIx = 0; categoryIx < totalCategories; categoryIx++) {
                    var data = SeriesBinder.current.bindPoint(currentSeries, categoryIx);
                    var value = data.valueFields.value;
                    var summary = data.fields.summary;

                    var from = total;
                    var to;
                    if (summary) {
                        if (summary.toLowerCase() === "total") {
                            data.valueFields.value = total;
                            from = 0;
                            to = total;
                        } else {
                            data.valueFields.value = runningTotal;
                            to = from - runningTotal;
                            runningTotal = 0;
                        }
                    } else if (isNumber(value)) {
                        runningTotal += value;
                        total += value;
                        to = total;
                    }

                    callback(data, {
                        category: categories[categoryIx],
                        categoryIx: categoryIx,
                        series: currentSeries,
                        seriesIx: seriesIx,
                        total: total,
                        runningTotal: runningTotal,
                        from: from,
                        to: to,
                        isVertical: isVertical
                    });
                }
            }
        },

        updateRange: function(value, fields) {
            BarChart.fn.updateRange.call(this, { value: fields.to }, fields);
        },

        aboveAxis: function(point) {
            return point.value >= 0;
        },

        plotRange: function(point) {
            return [point.from, point.to];
        },

        createSegments: function() {
            var series = this.options.series;
            var seriesPoints = this.seriesPoints;
            var segments = this.segments = [];

            for (var seriesIx = 0; seriesIx < series.length; seriesIx++) {
                var currentSeries = series[seriesIx];
                var points = seriesPoints[seriesIx];

                if (points) {
                    var prevPoint;
                    for (var pointIx = 0; pointIx < points.length; pointIx++) {
                        var point = points[pointIx];

                        if (point && prevPoint) {
                            var segment = new WaterfallSegment(prevPoint, point, currentSeries);
                            segments.push(segment);
                            this.append(segment);
                        }

                        prevPoint = point;
                    }
                }
            }
        }
    });

    var WaterfallSegment = ChartElement.extend({
        init: function(from, to, series) {
            var segment = this;

            ChartElement.fn.init.call(segment);

            segment.from = from;
            segment.to = to;
            segment.series = series;
        },

        options: {
            animation: {
                type: FADEIN,
                delay: INITIAL_ANIMATION_DURATION
            }
        },

        linePoints: function() {
            var points = [];
            var from = this.from;
            var fromBox = from.box;
            var toBox = this.to.box;

            if (from.isVertical) {
                var y = from.aboveAxis ? fromBox.y1 : fromBox.y2;
                points.push(
                    [fromBox.x1, y],
                    [toBox.x2, y]
                );
            } else {
                var x = from.aboveAxis ? fromBox.x2 : fromBox.x1;
                points.push(
                    [x, fromBox.y1],
                    [x, toBox.y2]
                );
            }

            return points;
        },

        createVisual: function() {
            ChartElement.fn.createVisual.call(this);

            var options = this.options;
            var line = this.series.line || {};

            var path = draw.Path.fromPoints(this.linePoints(), {
                stroke: {
                    color: line.color,
                    width: line.width,
                    opacity: line.opacity,
                    dashType: line.dashType
                }
            });

            alignPathToPixel(path);
            this.visual.append(path);
        }
    });

    var Pane = BoxElement.extend({
        init: function(options) {
            var pane = this;

            BoxElement.fn.init.call(pane, options);

            options = pane.options;
            pane.id = kendo.guid();

            pane.createTitle();

            pane.content = new ChartElement();

            pane.chartContainer = new ChartContainer({}, pane);
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

        createTitle: function() {
            var pane = this;
            var titleOptions = pane.options.title;
            if (typeof titleOptions === OBJECT) {
                titleOptions = deepExtend({}, titleOptions, {
                    align: titleOptions.position,
                    position: TOP
                });
            }
            pane.title = Title.buildTitle(titleOptions, pane, Pane.fn.options.title);
        },

        appendAxis: function(axis) {
            var pane = this;

            pane.content.append(axis);
            pane.axes.push(axis);
            axis.pane = pane;
        },

        appendChart: function(chart) {
            var pane = this;
            if (pane.chartContainer.parent !== pane.content) {
                pane.content.append(pane.chartContainer);
            }
            pane.charts.push(chart);
            pane.chartContainer.append(chart);
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

            pane.content.destroy();
            pane.content.children = [];
            pane.chartContainer.children = [];
        },

        reflow: function(targetBox) {
            var pane = this;

            // Content (such as charts) is rendered, but excluded from reflows
            var content;
            if (last(pane.children) === pane.content) {
                content = pane.children.pop();
            }

            BoxElement.fn.reflow.call(pane, targetBox);

            if (content) {
                pane.children.push(content);
            }

            if (pane.title) {
                pane.contentBox.y1 += pane.title.box.height();
            }
        },

        renderComplete: function() {
            if (this.options.visible) {
                this.createGridLines();
            }
        },

        stackRoot: returnSelf,

        createGridLines: function() {
            var pane = this,
                axes = pane.axes,
                allAxes = axes.concat(pane.parent.axes),
                vGridLines = [],
                hGridLines = [],
                gridLines, i, j, axis,
                vertical, altAxis;

            // TODO
            // Is full combination really necessary?
            for (i = 0; i < axes.length; i++) {
                axis = axes[i];
                vertical = axis.options.vertical;
                gridLines = vertical ? vGridLines : hGridLines;
                for (j = 0; j < allAxes.length; j++) {
                    if (gridLines.length === 0) {
                        altAxis = allAxes[j];
                        if (vertical !== altAxis.options.vertical) {
                            append(gridLines, axis.createGridLines(altAxis));
                        }
                    }
                }
            }
        },

        refresh: function() {
            this.visual.clear();

            this.content.parent = null;
            this.content.createGradient = $.proxy(this.createGradient, this);
            this.content.renderVisual();
            this.content.parent = this;

            this.visual.append(this.content.visual);

            this.renderComplete();
        },

        clipBox: function() {
            return this.chartContainer.clipBox;
        }
    });

    var ChartContainer = ChartElement.extend({
        init: function(options, pane) {
            var container = this;
            ChartElement.fn.init.call(container, options);
            container.pane = pane;
        },

        shouldClip: function () {
            var container = this,
                children = container.children,
                length = children.length,
                i;

            for (i = 0; i < length; i++) {
                if (children[i].options.clip === true) {
                    return true;
                }
            }
            return false;
        },

        _clipBox: function() {
            var container = this,
                pane = container.pane,
                axes = pane.axes,
                length = axes.length,
                clipBox = pane.box.clone(),
                axisValueField, idx,
                lineBox, axis;

            for (idx = 0; idx < length; idx++) {
                axis = axes[idx];
                axisValueField = axis.options.vertical ? Y : X;
                lineBox = axis.lineBox();
                clipBox[axisValueField + 1] = lineBox[axisValueField + 1];
                clipBox[axisValueField + 2] = lineBox[axisValueField + 2];
            }

            return clipBox;
        },

        createVisual: function() {
            this.visual = new draw.Group({
                zIndex: 0
            });

            if (this.shouldClip()) {
                var clipBox = this.clipBox = this._clipBox();

                var clipRect = clipBox.toRect();
                var clipPath = draw.Path.fromRect(clipRect);
                this.visual.clip(clipPath);

                this.unclipLabels();
            }
        },

        stackRoot: returnSelf,

        unclipLabels: function() {
            var container = this,
                charts = container.children,
                clipBox = container.clipBox,
                points, point,
                i, j, length;
            for (i = 0; i < charts.length; i++) {
                points = charts[i].points || {};
                length = points.length;

                for (j = 0; j < length; j++) {
                    point = points[j];
                    if (point && point.label && point.label.options.visible) {
                        if (point.box.overlaps(clipBox)) {
                            if (point.label.alignToClipBox) {
                                point.label.alignToClipBox(clipBox);
                            }
                            point.label.options.noclip = true;
                        }
                    }
                }
            }
        },

        destroy: function() {
            ChartElement.fn.destroy.call(this);
            delete this.parent;
        }
    });

    var PlotAreaBase = ChartElement.extend({
        init: function(series, options) {
            var plotArea = this;

            ChartElement.fn.init.call(plotArea, options);

            plotArea.series = series;
            plotArea.initSeries();
            plotArea.charts = [];
            plotArea.options.legend.items = [];
            plotArea.axes = [];
            plotArea.crosshairs = [];

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
            legend: {
                inactiveItems: {
                    labels: {
                        color: "#919191"
                    },
                    markers: {
                        color: "#919191"
                    }
                }
            }
        },

        initSeries: function() {
            var series = this.series,
                i, currentSeries;

            for (i = 0; i < series.length; i++) {
                currentSeries = series[i];
                currentSeries.index = i;
            }
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

        createCrosshairs: function(panes) {
            var plotArea = this,
                i, j, pane, axis, currentCrosshair;

            panes = panes || plotArea.panes;
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

        removeCrosshairs: function(pane) {
            var plotArea = this,
               crosshairs = plotArea.crosshairs,
               axes = pane.axes,
               i, j;

            for (i = crosshairs.length - 1; i >= 0; i--) {
                for (j = 0; j < axes.length; j++) {
                    if (crosshairs[i].axis === axes[j]) {
                        crosshairs.splice(i, 1);
                        break;
                    }
                }
            }
        },

        findPane: function(name) {
            var plotArea = this,
                panes = plotArea.panes,
                i, matchingPane;

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
                i, matchingPane;

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
                i, axis,
                filteredAxes = [];

            for (i = 0; i < plotArea.axes.length; i++) {
                axis = plotArea.axes[i];
                if (axisToRemove !== axis) {
                    filteredAxes.push(axis);
                } else {
                    axis.destroy();
                }
            }

            plotArea.axes = filteredAxes;
        },

        appendChart: function(chart, pane) {
            var plotArea = this;

            plotArea.charts.push(chart);
            if (pane) {
                pane.appendChart(chart);
            } else {
                plotArea.append(chart);
            }
        },

        removeChart: function(chartToRemove) {
            var plotArea = this,
                i, chart,
                filteredCharts = [];

            for (i = 0; i < plotArea.charts.length; i++) {
                chart = plotArea.charts[i];
                if (chart !== chartToRemove) {
                    filteredCharts.push(chart);
                } else {
                    chart.destroy();
                }
            }

            plotArea.charts = filteredCharts;
        },

        addToLegend: function(series) {
            var count = series.length,
                data = [],
                i, currentSeries, text,
                legend = this.options.legend,
                labels = legend.labels || {},
                inactiveItems = legend.inactiveItems || {},
                inactiveItemsLabels = inactiveItems.labels || {},
                color, itemLabelOptions, markerColor,
                defaults, seriesVisible, labelTemplate;

            for (i = 0; i < count; i++) {
                currentSeries = series[i];
                seriesVisible = currentSeries.visible !== false;
                if (currentSeries.visibleInLegend === false) {
                    continue;
                }

                text = currentSeries.name || "";
                labelTemplate = seriesVisible ? labels.template :
                    (inactiveItemsLabels.template || labels.template);
                if (labelTemplate) {
                    text = template(labelTemplate)({
                        text: text,
                        series: currentSeries
                    });
                }

                color = currentSeries.color;
                defaults = currentSeries._defaults;
                if (isFn(color) && defaults) {
                    color = defaults.color;
                }

                if (seriesVisible) {
                    itemLabelOptions = {};
                    markerColor = color;
                } else {
                    itemLabelOptions = {
                        color: inactiveItemsLabels.color,
                        font: inactiveItemsLabels.font
                    };
                    markerColor = inactiveItems.markers.color;
                }

                if (text) {
                    data.push({
                        text: text,
                        labels: itemLabelOptions,
                        markerColor: markerColor,
                        series: currentSeries,
                        active: seriesVisible
                    });
                }
            }

            append(legend.items, data);
        },

        groupAxes: function(panes) {
            var xAxes = [],
                yAxes = [],
                paneAxes, axis, paneIx, axisIx;

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
                i, pane, currentSeries;

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

        filterVisibleSeries: function(series) {
            var i, currentSeries,
                result = [];

            for (i = 0; i < series.length; i++) {
                currentSeries = series[i];
                if (currentSeries.visible !== false) {
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
            this.initSeries();

            for (i = 0; i < panes.length; i++) {
                plotArea.removeCrosshairs(panes[i]);
                panes[i].empty();
            }

            plotArea.render(panes);
            plotArea.reflowAxes(plotArea.panes);
            plotArea.reflowCharts(panes);

            plotArea.createCrosshairs(panes);

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
            var slot = axis.getSlot(crossingValue, crossingValue, true),
                slotEdge = axis.options.reverse ? 2 : 1,
                targetSlot = targetAxis.getSlot(targetCrossingValue, targetCrossingValue, true),
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
                pane, paneId, axis, i;

            for (i = 0; i < yAxes.length; i++) {
                axis = yAxes[i];
                pane = axis.pane;
                paneId = pane.id;
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
                paneId = pane.id;
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
                i, currentPane, currentAxis;

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
            var i, currentPane, axes,
                overflowY, j, currentAxis;

            for (i = 0; i < panes.length; i++) {
                currentPane = panes[i];
                axes = currentPane.axes;
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
                offsetX = 0,
                paneAxes, paneBox, axisBox, offsetY,
                currentPane, currentAxis, i, j;

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
                chartPane, i;

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
                panesLength = panes.length,
                i, currentPane, paneBox,
                remainingHeight = box.height(),
                remainingPanes = panesLength,
                autoHeightPanes = 0,
                top = box.y1,
                height, percents;

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
                lineBox, box, i, j, axisA, axisB;

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

        createVisual: function() {
            ChartElement.fn.createVisual.call(this);

            var bgBox = this.backgroundBox();
            var options = this.options.plotArea;
            var border = options.border || {};

            var bg = this._bgVisual = draw.Path.fromRect(bgBox.toRect(), {
                fill: {
                    color: options.background,
                    opacity: options.opacity
                },
                stroke: {
                    color: border.width ? border.color : "",
                    width: border.width,
                    dashType: border.dashType
                },
                zIndex: -1
            });

            this.appendVisual(bg);
        },

        pointsByCategoryIndex: function(categoryIndex) {
            var charts = this.charts,
                result = [],
                i, j, points, point, chart;

            if (categoryIndex !== null) {
                for (i = 0; i < charts.length; i++) {
                    chart = charts[i];
                    if (chart.pane.options.name === "_navigator") {
                        continue;
                    }

                    points = charts[i].categoryPoints[categoryIndex];
                    if (points && points.length) {
                        for (j = 0; j < points.length; j++) {
                            point = points[j];
                            if (point && defined(point.value) && point.value !== null) {
                                result.push(point);
                            }
                        }
                    }
                }
            }

            return result;
        },

        pointsBySeriesIndex: function(seriesIndex) {
            var charts = this.charts,
                result = [],
                points, point, i, j, chart;

            for (i = 0; i < charts.length; i++) {
                chart = charts[i];
                points = chart.points;
                for (j = 0; j < points.length; j++) {
                    point = points[j];
                    if (point && point.options.index === seriesIndex) {
                        result.push(point);
                    }
                }
            }

            return result;
        },

        paneByPoint: function(point) {
            var plotArea = this,
                panes = plotArea.panes,
                pane, i;

            for (i = 0; i < panes.length; i++) {
                pane = panes[i];
                if (pane.box.containsPoint(point)) {
                    return pane;
                }
            }
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
                    series[0].type, [BAR, BULLET, VERTICAL_LINE, VERTICAL_AREA, RANGE_BAR, HORIZONTAL_WATERFALL]
                );

                for (var i = 0; i < series.length; i++) {
                    var stack = series[i].stack;
                    if (stack && stack.type === "100%") {
                        plotArea.stack100 = true;
                        break;
                    }
                }
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
            plotArea.aggregateCategories(panes);
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
                i, pane, paneSeries, filteredSeries;

            for (i = 0; i < panes.length; i++) {
                pane = panes[i];
                paneSeries = seriesByPane[pane.options.name || "default"] || [];
                plotArea.addToLegend(paneSeries);
                filteredSeries = plotArea.filterVisibleSeries(paneSeries);

                if (!filteredSeries) {
                    continue;
                }

                plotArea.createAreaChart(
                    filterSeriesByType(filteredSeries, [AREA, VERTICAL_AREA]),
                    pane
                );

                plotArea.createBarChart(
                    filterSeriesByType(filteredSeries, [COLUMN, BAR]),
                    pane
                );

                plotArea.createRangeBarChart(
                    filterSeriesByType(filteredSeries, [RANGE_COLUMN, RANGE_BAR]),
                    pane
                );

                plotArea.createBulletChart(
                    filterSeriesByType(filteredSeries, [BULLET, VERTICAL_BULLET]),
                    pane
                );

                plotArea.createCandlestickChart(
                    filterSeriesByType(filteredSeries, CANDLESTICK),
                    pane
                );

                plotArea.createBoxPlotChart(
                    filterSeriesByType(filteredSeries, BOX_PLOT),
                    pane
                );

                plotArea.createOHLCChart(
                    filterSeriesByType(filteredSeries, OHLC),
                    pane
                );

                plotArea.createWaterfallChart(
                    filterSeriesByType(filteredSeries, [WATERFALL, HORIZONTAL_WATERFALL]),
                    pane
                );

                plotArea.createLineChart(
                    filterSeriesByType(filteredSeries, [LINE, VERTICAL_LINE]),
                    pane
                );
            }
        },

        aggregateCategories: function(panes) {
            var plotArea = this,
                series = plotArea.srcSeries || plotArea.series,
                processedSeries = [],
                i, currentSeries,
                categoryAxis, axisPane, dateAxis;

            for (i = 0; i < series.length; i++) {
                currentSeries = series[i];
                categoryAxis = plotArea.seriesCategoryAxis(currentSeries);
                axisPane = plotArea.findPane(categoryAxis.options.pane);
                dateAxis = equalsIgnoreCase(categoryAxis.options.type, DATE);

                if ((dateAxis || currentSeries.categoryField) && inArray(axisPane, panes)) {
                    currentSeries = plotArea.aggregateSeries(currentSeries, categoryAxis);
                }

                processedSeries.push(currentSeries);

            }

            plotArea.srcSeries = series;
            plotArea.series = processedSeries;
        },

        aggregateSeries: function(series, categoryAxis) {
            var axisOptions = categoryAxis.options,
                dateAxis = equalsIgnoreCase(categoryAxis.options.type, DATE),
                categories = axisOptions.categories,
                srcCategories = axisOptions.srcCategories || categories,
                srcData = series.data,
                srcPoints = [],
                range = categoryAxis.range(),
                result = deepExtend({}, series),
                aggregatorSeries = deepExtend({}, series),
                i, category, categoryIx,
                data,
                aggregator,
                getFn = getField;

            result.data = data = [];

            if (dateAxis) {
                getFn = getDateField;
            }

            for (i = 0; i < srcData.length; i++) {
                if (series.categoryField) {
                    category = getFn(series.categoryField, srcData[i]);
                } else {
                    category = srcCategories[i];
                }

                categoryIx = categoryAxis.categoryIndex(category, range);
                if (categoryIx > -1) {
                    srcPoints[categoryIx] = srcPoints[categoryIx] || [];
                    srcPoints[categoryIx].push(i);
                }
            }

            aggregator = new SeriesAggregator(
                aggregatorSeries, SeriesBinder.current, DefaultAggregates.current
            );

            for (i = 0; i < categories.length; i++) {
                data[i] = aggregator.aggregatePoints(
                    srcPoints[i], categories[i]
                );
            }

            return result;
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

        stackableChartOptions: function(firstSeries, pane) {
            var stack = firstSeries.stack,
                isStacked100 = stack && stack.type === "100%",
                clip;
            if (defined(pane.options.clip)) {
                clip = pane.options.clip;
            } else if (isStacked100){
                clip = false;
            }
            return {
                isStacked: stack,
                isStacked100: isStacked100,
                clip: clip
            };
        },

        createBarChart: function(series, pane) {
            if (series.length === 0) {
                return;
            }

            var plotArea = this,
                firstSeries = series[0],
                barChart = new BarChart(plotArea, extend({
                    series: series,
                    invertAxes: plotArea.invertAxes,
                    gap: firstSeries.gap,
                    spacing: firstSeries.spacing
                }, plotArea.stackableChartOptions(firstSeries, pane)));

            plotArea.appendChart(barChart, pane);
        },

        createRangeBarChart: function(series, pane) {
            if (series.length === 0) {
                return;
            }

            var plotArea = this,
                firstSeries = series[0],
                rangeColumnChart = new RangeBarChart(plotArea, {
                    series: series,
                    invertAxes: plotArea.invertAxes,
                    gap: firstSeries.gap,
                    spacing: firstSeries.spacing
                });

            plotArea.appendChart(rangeColumnChart, pane);
        },

        createBulletChart: function(series, pane) {
            if (series.length === 0) {
                return;
            }

            var plotArea = this,
                firstSeries = series[0],
                bulletChart = new BulletChart(plotArea, {
                    series: series,
                    invertAxes: plotArea.invertAxes,
                    gap: firstSeries.gap,
                    spacing: firstSeries.spacing,
                    clip: pane.options.clip
                });

            plotArea.appendChart(bulletChart, pane);
        },

        createLineChart: function(series, pane) {
            if (series.length === 0) {
                return;
            }

            var plotArea = this,
                firstSeries = series[0],
                lineChart = new LineChart(plotArea, extend({
                    invertAxes: plotArea.invertAxes,
                    series: series
                }, plotArea.stackableChartOptions(firstSeries, pane)));

            plotArea.appendChart(lineChart, pane);
        },

        createAreaChart: function(series, pane) {
            if (series.length === 0) {
                return;
            }

            var plotArea = this,
                firstSeries = series[0],
                areaChart = new AreaChart(plotArea, extend({
                    invertAxes: plotArea.invertAxes,
                    series: series
                }, plotArea.stackableChartOptions(firstSeries, pane)));

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
                    spacing: firstSeries.spacing,
                    clip: pane.options.clip
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
                    spacing: firstSeries.spacing,
                    clip: pane.options.clip
                });

            plotArea.appendChart(chart, pane);
        },

        createBoxPlotChart: function(series, pane) {
            if (series.length === 0) {
                return;
            }

            var plotArea = this,
                firstSeries = series[0],
                chart = new BoxPlotChart(plotArea, {
                    invertAxes: plotArea.invertAxes,
                    gap: firstSeries.gap,
                    series: series,
                    spacing: firstSeries.spacing,
                    clip: pane.options.clip
                });

            plotArea.appendChart(chart, pane);
        },

        createWaterfallChart: function(series, pane) {
            if (series.length === 0) {
                return;
            }

            var plotArea = this,
                firstSeries = series[0],
                waterfallChart = new WaterfallChart(plotArea, {
                    series: series,
                    invertAxes: plotArea.invertAxes,
                    gap: firstSeries.gap,
                    spacing: firstSeries.spacing
                });

            plotArea.appendChart(waterfallChart, pane);
        },

        axisRequiresRounding: function(categoryAxisName, categoryAxisIndex) {
            var plotArea = this,
                centeredSeries = filterSeriesByType(plotArea.series, EQUALLY_SPACED_SERIES),
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
                i, axisOptions, axisPane,
                categories, type, name,
                categoryAxis, axes = [],
                primaryAxis;

            for (i = 0; i < definitions.length; i++) {
                axisOptions = definitions[i];
                axisPane = plotArea.findPane(axisOptions.pane);

                if (inArray(axisPane, panes)) {
                    name = axisOptions.name;
                    categories = axisOptions.categories || [];
                    type  = axisOptions.type || "";
                    axisOptions = deepExtend({
                        vertical: invertAxes,
                        axisCrossingValue: invertAxes ? MAX_VALUE : 0
                    }, axisOptions);

                    if (!defined(axisOptions.justified)) {
                        axisOptions.justified = plotArea.isJustified();
                    }

                    if (plotArea.axisRequiresRounding(name, i)) {
                        axisOptions.justified = false;
                        axisOptions.roundToBaseUnit = true;
                    }

                    if (isDateAxis(axisOptions, categories[0])) {
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

        isJustified: function() {
            var plotArea = this,
                series = plotArea.series,
                i, currentSeries;

            for (i = 0; i < series.length; i++) {
                currentSeries = series[i];
                if (!inArray(currentSeries.type, [AREA, VERTICAL_AREA])) {
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
                axisOptions, axisPane, valueAxis,
                primaryAxis, axes = [], range,
                axisType, defaultAxisRange,
                name, i;

            if (plotArea.stack100) {
                baseOptions.roundToMajorUnit = false;
                baseOptions.labels = { format: "P0" };
            }

            for (i = 0; i < definitions.length; i++) {
                axisOptions = definitions[i];
                axisPane = plotArea.findPane(axisOptions.pane);

                if (inArray(axisPane, panes)) {
                    name = axisOptions.name;
                    defaultAxisRange = equalsIgnoreCase(axisOptions.type, LOGARITHMIC) ? {min: 0.1, max: 1} : { min: 0, max: 1 };
                    range = tracker.query(name) || defaultRange || defaultAxisRange;

                    if (i === 0 && range && defaultRange) {
                        range.min = math.min(range.min, defaultRange.min);
                        range.max = math.max(range.max, defaultRange.max);
                    }

                    if (equalsIgnoreCase(axisOptions.type, LOGARITHMIC)) {
                        axisType = LogarithmicAxis;
                    } else {
                        axisType = NumericAxis;
                    }

                    valueAxis = new axisType(range.min, range.max,
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
                    valueAxis.axisIndex = i;

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
                    originalEvent: e,
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
            this.axisRanges[axisName] = undefined;
        },

        query: function(axisName) {
            return this.axisRanges[axisName];
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
                i, pane, paneSeries, filteredSeries;

            panes = panes || plotArea.panes;

            for (i = 0; i < panes.length; i++) {
                pane = panes[i];
                paneSeries = seriesByPane[pane.options.name || "default"] || [];
                plotArea.addToLegend(paneSeries);
                filteredSeries = plotArea.filterVisibleSeries(paneSeries);

                if (!filteredSeries) {
                    continue;
                }

                plotArea.createScatterChart(
                    filterSeriesByType(filteredSeries, SCATTER),
                    pane
                );

                plotArea.createScatterLineChart(
                    filterSeriesByType(filteredSeries, SCATTER_LINE),
                    pane
                );

                plotArea.createBubbleChart(
                    filterSeriesByType(filteredSeries, BUBBLE),
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
                    new ScatterChart(plotArea, { series: series, clip: pane.options.clip }),
                    pane
                );
            }
        },

        createScatterLineChart: function(series, pane) {
            var plotArea = this;

            if (series.length > 0) {
                plotArea.appendChart(
                    new ScatterLineChart(plotArea, { series: series, clip: pane.options.clip }),
                    pane
                );
            }
        },

        createBubbleChart: function(series, pane) {
            var plotArea = this;

            if (series.length > 0) {
                plotArea.appendChart(
                    new BubbleChart(plotArea, { series: series, clip: pane.options.clip }),
                    pane
                );
            }
        },

        createXYAxis: function(options, vertical, axisIndex) {
            var plotArea = this,
                axisName = options.name,
                namedAxes = vertical ? plotArea.namedYAxes : plotArea.namedXAxes,
                tracker = vertical ? plotArea.yAxisRangeTracker : plotArea.xAxisRangeTracker,
                axisOptions = deepExtend({}, options, { vertical: vertical }),
                isLog = equalsIgnoreCase(axisOptions.type, LOGARITHMIC),
                defaultRange = tracker.query(),
                defaultAxisRange = isLog ? {min: 0.1, max: 1} : { min: 0, max: 1 },
                range = tracker.query(axisName) || defaultRange || defaultAxisRange,
                axis,
                axisType,
                seriesIx,
                series = plotArea.series,
                currentSeries,
                seriesAxisName,
                firstPointValue,
                typeSamples = [axisOptions.min, axisOptions.max],
                inferredDate,
                i;

            for (seriesIx = 0; seriesIx < series.length; seriesIx++) {
                currentSeries = series[seriesIx];
                seriesAxisName = currentSeries[vertical ? "yAxis" : "xAxis"];
                if ((seriesAxisName == axisOptions.name) || (axisIndex === 0 && !seriesAxisName)) {
                    firstPointValue = SeriesBinder.current.bindPoint(currentSeries, 0).valueFields;
                    typeSamples.push(firstPointValue[vertical ? "y" : "x"]);

                    break;
                }
            }

            if (axisIndex === 0 && defaultRange) {
                range.min = math.min(range.min, defaultRange.min);
                range.max = math.max(range.max, defaultRange.max);
            }

            for (i = 0; i < typeSamples.length; i++) {
                if (typeSamples[i] instanceof Date) {
                    inferredDate = true;
                    break;
                }
            }

            if (equalsIgnoreCase(axisOptions.type, DATE) || (!axisOptions.type && inferredDate)) {
                axisType = DateValueAxis;
            } else if (isLog){
                axisType = LogarithmicAxis;
            } else {
                axisType = NumericAxis;
            }

            axis = new axisType(range.min, range.max, axisOptions);

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
                    originalEvent: e,
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
        },

        appendChart: function(chart, pane) {
            PlotAreaBase.fn.appendChart.call(this, chart, pane);
            append(this.options.legend.items, chart.legendItems);
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
                    connectors: firstSeries.connectors,
                    legend: plotArea.options.legend
                });

            plotArea.appendChart(donutChart);
        }
    });

    var PieAnimation = draw.Animation.extend({
        options: {
            easing: "easeOutElastic",
            duration: INITIAL_ANIMATION_DURATION
        },

        setup: function() {
            this.element.transform(geom.transform()
                .scale(START_SCALE, START_SCALE, this.options.center)
            );
        },

        step: function(pos) {
            this.element.transform(geom.transform()
                .scale(pos, pos, this.options.center)
            );
        }
    });
    draw.AnimationFactory.current.register(PIE, PieAnimation);

    var BubbleAnimation = draw.Animation.extend({
        options: {
            easing: "easeOutElastic"
        },

        setup: function() {
            var center = this.center = this.element.bbox().center();
            this.element.transform(geom.transform()
                .scale(START_SCALE, START_SCALE, center)
            );
        },

        step: function(pos) {
            this.element.transform(geom.transform()
                .scale(pos, pos, this.center)
            );
        }
    });
    draw.AnimationFactory.current.register(BUBBLE, BubbleAnimation);

    var Highlight = Class.extend({
        init: function() {
            this._points = [];
        },

        destroy: function() {
            this._points = [];
        },

        show: function(points) {
            points = [].concat(points);
            this.hide();

            for (var i = 0; i < points.length; i++) {
                var point = points[i];
                if (point && point.toggleHighlight) {
                    point.toggleHighlight(true);
                    this._points.push(point);
                }
            }
        },

        hide: function() {
            var points = this._points;
            while (points.length) {
                points.pop().toggleHighlight(false);
            }
        },

        isHighlighted: function(element) {
            var points = this._points;

            for (var i = 0; i < points.length; i++) {
                var point = points[i];
                if (element == point) {
                    return true;
                }
            }

            return false;
        }
    });

    var BaseTooltip = Class.extend({
        init: function(chartElement, options) {
            var tooltip = this;

            tooltip.options = deepExtend({}, tooltip.options, options);

            tooltip.chartElement = chartElement;

            tooltip.template = BaseTooltip.template;
            if (!tooltip.template) {
                tooltip.template = BaseTooltip.template = renderTemplate(
                    "<div class='" + CSS_PREFIX + "tooltip " + CSS_PREFIX + "chart-tooltip' " +
                    "style='display:none; position: absolute; font: #= d.font #;" +
                    "border: #= d.border.width #px solid;" +
                    "opacity: #= d.opacity #; filter: alpha(opacity=#= d.opacity * 100 #);'>" +
                    "</div>"
                );
            }

            tooltip.element = $(tooltip.template(tooltip.options));
            tooltip.move = proxy(tooltip.move, tooltip);
            tooltip._mouseleave = proxy(tooltip._mouseleave, tooltip);
        },

        destroy: function() {
            this._clearShowTimeout();

            if (this.element) {
                this.element.off(MOUSELEAVE_NS).remove();
                this.element = null;
            }
        },

        options: {
            border: {
                width: 1
            },
            opacity: 1,
            animation: {
                duration: TOOLTIP_ANIMATION_DURATION
            }
        },

        move: function() {
            var tooltip = this,
                options = tooltip.options,
                element = tooltip.element,
                offset;

            if (!tooltip.anchor) {
                return;
            }

            offset = tooltip._offset();
            if (!tooltip.visible) {
                element.css({ top: offset.top, left: offset.left });
            }

            tooltip._ensureElement(document.body);
            element
                .stop(true, true)
                .show()
                .animate({
                    left: offset.left,
                    top: offset.top
                }, options.animation.duration);

            tooltip.visible = true;
        },

        _clearShowTimeout: function() {
            if (this.showTimeout) {
                clearTimeout(this.showTimeout);
                this.showTimeout = null;
            }
        },

        _padding: function() {
            if (!this._chartPadding) {
                var chartElement = this.chartElement;
                this._chartPadding = {
                    top: parseInt(chartElement.css("paddingTop"), 10),
                    left: parseInt(chartElement.css("paddingLeft"), 10)
                };
            }

            return this._chartPadding;
        },

        _offset: function() {
            var tooltip = this,
                size = tooltip._measure(),
                anchor = tooltip.anchor,
                chartPadding = tooltip._padding(),
                chartOffset = tooltip.chartElement.offset(),
                top = round(anchor.y + chartPadding.top + chartOffset.top),
                left = round(anchor.x + chartPadding.left + chartOffset.left),
                zoomLevel = kendo.support.zoomLevel(),
                viewport = $(window),
                scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0,
                scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || 0;

            top += tooltip._fit(top - scrollTop, size.height, viewport.outerHeight() / zoomLevel);
            left += tooltip._fit(left - scrollLeft, size.width, viewport.outerWidth() / zoomLevel);

            return {
                top: top,
                left: left
            };
        },

        setStyle: function(options, point) {
            var background = options.background;
            var border = options.border.color;

            if (point) {
                var pointColor = point.color || point.options.color;
                background = valueOrDefault(background, pointColor);
                border = valueOrDefault(border, pointColor);
            }

            if (!defined(options.color)) {
                var brightness = new Color(background).percBrightness();

                this.element.toggleClass(
                    CSS_PREFIX + TOOLTIP_INVERSE,
                    brightness > 180
                );
            }

            this.element.css({
                backgroundColor: background,
                borderColor: border,
                font: options.font,
                color: options.color,
                opacity: options.opacity,
                borderWidth: options.border.width
            });
        },

        show: function() {
            this._clearShowTimeout();
            this.showTimeout = setTimeout(this.move, TOOLTIP_SHOW_DELAY);
        },

        hide: function() {
            var tooltip = this;

            clearTimeout(tooltip.showTimeout);
            tooltip._hideElement();

            if (tooltip.visible) {
                tooltip.point = null;
                tooltip.visible = false;
                tooltip.index = null;
            }
        },

        _measure: function() {
            this._ensureElement();

            var size = {
                width: this.element.outerWidth(),
                height: this.element.outerHeight()
            };

            return size;
        },

        _ensureElement: function() {
            if (this.element) {
                this.element
                    .appendTo(document.body)
                    .on(MOUSELEAVE_NS, this._mouseleave);
            }
        },

        _mouseleave: function(e) {
            var target = e.relatedTarget;
            var chart = this.chartElement[0];
            if (target && target !== chart && !$.contains(chart, target)) {
                this.hide();
            }
        },

        _hideElement: function() {
            if (this.element) {
                this.element.fadeOut({
                    always: function(){
                        $(this).off(MOUSELEAVE_NS).remove();
                    }
                });
            }
        },

        _pointContent: function(point) {
            var tooltip = this,
                options = deepExtend({}, tooltip.options, point.options.tooltip),
                content, tooltipTemplate;

            if (defined(point.value)) {
                content = point.value.toString();
            }

            if (options.template) {
                tooltipTemplate = template(options.template);
                content = tooltipTemplate({
                    value: point.value,
                    category: point.category,
                    series: point.series,
                    dataItem: point.dataItem,
                    percentage: point.percentage,
                    runningTotal: point.runningTotal,
                    total: point.total,
                    low: point.low,
                    high: point.high,
                    xLow: point.xLow,
                    xHigh: point.xHigh,
                    yLow: point.yLow,
                    yHigh: point.yHigh
                });
            } else if (options.format) {
                content = point.formatValue(options.format);
            }

            return content;
        },

        _pointAnchor: function(point) {
            var size = this._measure();

            return point.tooltipAnchor(size.width, size.height);
        },

        _fit: function(offset, size, viewPortSize) {
            var output = 0;

            if (offset + size > viewPortSize) {
                output = viewPortSize - (offset + size);
            }

            if (offset < 0) {
                output = -offset;
            }

            return output;
        }
    });

    var Tooltip = BaseTooltip.extend({
        show: function(point) {
            var tooltip = this,
                options = deepExtend({}, tooltip.options, point.options.tooltip);

            if (!point || !point.tooltipAnchor || !tooltip.element) {
                return;
            }

            tooltip.element.html(tooltip._pointContent(point));
            tooltip.anchor = tooltip._pointAnchor(point);

            if (tooltip.anchor) {
                tooltip.setStyle(options, point);
                BaseTooltip.fn.show.call(tooltip, point);
            } else {
                tooltip.hide();
            }
        }
    });

    var SharedTooltip = BaseTooltip.extend({
        init: function(element, plotArea, options) {
            var tooltip = this;

            BaseTooltip.fn.init.call(tooltip, element, options);

            tooltip.plotArea = plotArea;
        },

        options: {
            sharedTemplate:
                "<table>" +
                "<th colspan='2'>#= categoryText #</th>" +
                "# for(var i = 0; i < points.length; i++) { #" +
                "# var point = points[i]; #" +
                "<tr>" +
                    "# if(point.series.name) { # " +
                        "<td> #= point.series.name #:</td>" +
                    "# } #" +
                    "<td>#= content(point) #</td>" +
                "</tr>" +
                "# } #" +
                "</table>",
            categoryFormat: "{0:d}"
        },

        showAt: function(points, coords) {
            var tooltip = this,
                options = tooltip.options,
                plotArea = tooltip.plotArea,
                axis = plotArea.categoryAxis,
                index = axis.pointCategoryIndex(coords),
                category = axis.getCategory(coords),
                slot = axis.getSlot(index),
                content;

            points = $.grep(points, function(p) {
                var tooltip = p.series.tooltip,
                    excluded = tooltip && tooltip.visible === false;

                return !excluded;
            });

            if (points.length > 0) {
                content = tooltip._content(points, category);
                tooltip.element.html(content);
                tooltip.anchor = tooltip._slotAnchor(coords, slot);
                tooltip.setStyle(options, points[0]);

                BaseTooltip.fn.show.call(tooltip);
            }
        },

        _slotAnchor: function(point, slot) {
            var tooltip = this,
                plotArea = tooltip.plotArea,
                axis = plotArea.categoryAxis,
                anchor,
                size = this._measure(),
                hCenter = point.y - size.height / 2;

            if (axis.options.vertical) {
                anchor = Point2D(point.x, hCenter);
            } else {
                anchor = Point2D(slot.center().x, hCenter);
            }

            return anchor;
        },

        _content: function(points, category) {
            var tooltip = this,
                template,
                content;

            template = kendo.template(tooltip.options.sharedTemplate);
            content = template({
                points: points,
                category: category,
                categoryText: autoFormat(tooltip.options.categoryFormat, category),
                content: tooltip._pointContent
            });

            return content;
        }
    });

    var Crosshair = ChartElement.extend({
        init: function(axis, options) {
            ChartElement.fn.init.call(this, options);

            this.axis = axis;
            this.stickyMode = axis instanceof CategoryAxis;
        },

        options: {
            color: BLACK,
            width: 1,
            zIndex: -1,
            tooltip: {
                visible: false
            }
        },

        showAt: function(point) {
            var crosshair = this;

            this.point = point;
            this.moveLine();
            this.line.visible(true);

            var tooltipOptions = this.options.tooltip;
            if (tooltipOptions.visible) {
                if (!this.tooltip) {
                    this.tooltip = new CrosshairTooltip(this,
                        deepExtend({}, tooltipOptions, { stickyMode: this.stickyMode })
                    );
                }
                this.tooltip.showAt(point);
            }
        },

        hide: function() {
            this.line.visible(false);

            if (this.tooltip) {
                this.tooltip.hide();
            }
        },

        moveLine: function() {
            var crosshair = this,
                axis = crosshair.axis,
                vertical = axis.options.vertical,
                box = crosshair.getBox(),
                point = crosshair.point,
                dim = vertical ? Y : X,
                slot, lineStart, lineEnd;

            lineStart = new geom.Point(box.x1, box.y1);
            if (vertical) {
                lineEnd = new geom.Point(box.x2, box.y1);
            } else {
                lineEnd = new geom.Point(box.x1, box.y2);
            }

            if (point) {
                if (crosshair.stickyMode) {
                    slot = axis.getSlot(axis.pointCategoryIndex(point));
                    lineStart[dim] = lineEnd[dim] = slot.center()[dim];
                } else {
                    lineStart[dim] = lineEnd[dim] = point[dim];
                }
            }

            crosshair.box = box;

            this.line.moveTo(lineStart).lineTo(lineEnd);
        },

        getBox: function() {
            var crosshair = this,
                axis = crosshair.axis,
                axes = axis.pane.axes,
                length = axes.length,
                vertical = axis.options.vertical,
                box = axis.lineBox().clone(),
                dim = vertical ? X : Y,
                axisLineBox, currentAxis, i;

            for (i = 0; i < length; i++) {
                currentAxis = axes[i];
                if (currentAxis.options.vertical != vertical) {
                    if (!axisLineBox) {
                        axisLineBox = currentAxis.lineBox().clone();
                    } else {
                        axisLineBox.wrap(currentAxis.lineBox());
                    }
                }
            }

            box[dim + 1] = axisLineBox[dim + 1];
            box[dim + 2] = axisLineBox[dim + 2];

            return box;
        },

        createVisual: function() {
            ChartElement.fn.createVisual.call(this);

            var options = this.options;
            this.line = new draw.Path({
                stroke: {
                    color: options.color,
                    width: options.width,
                    opacity: options.opacity,
                    dashType: options.dashType
                },
                visible: false
            });

            this.moveLine();
            this.visual.append(this.line);
        },

        destroy: function() {
            var crosshair = this;
            if (crosshair.tooltip) {
                crosshair.tooltip.destroy();
            }

            ChartElement.fn.destroy.call(crosshair);
        }
    });

    var CrosshairTooltip = BaseTooltip.extend({
        init: function(crosshair, options) {
            var tooltip = this,
                chartElement = crosshair.axis.getRoot().chart.element;

            tooltip.crosshair = crosshair;

            BaseTooltip.fn.init.call(tooltip, chartElement, deepExtend({},
                tooltip.options, {
                    background: crosshair.axis.plotArea.options.seriesColors[0]
                },
                options));

            tooltip.setStyle(tooltip.options);
        },

        options: {
            padding: 10
        },

        showAt: function(point) {
            var tooltip = this,
                element = tooltip.element;

            if (element) {
                tooltip.point = point;
                tooltip.element.html(tooltip.content(point));
                tooltip.anchor = tooltip.getAnchor();

                tooltip.move();
            }
        },

        move: function() {
            var tooltip = this,
                element = tooltip.element,
                offset = tooltip._offset();

            tooltip._ensureElement();
            element.css({ top: offset.top, left: offset.left }).show();
        },

        content: function(point) {
            var tooltip = this,
                options = tooltip.options,
                axis = tooltip.crosshair.axis,
                axisOptions = axis.options,
                content, value, tooltipTemplate;

            value = content = axis[options.stickyMode ? "getCategory" : "getValue"](point);

            if (options.template) {
                tooltipTemplate = template(options.template);
                content = tooltipTemplate({
                    value: value
                });
            } else if (options.format) {
                content = autoFormat(options.format, value);
            } else {
                if (axisOptions.type === DATE) {
                    content = autoFormat(axisOptions.labels.dateFormats[axisOptions.baseUnit], value);
                }
            }

            return content;
        },

        getAnchor: function() {
            var tooltip = this,
                options = tooltip.options,
                position = options.position,
                crosshair = this.crosshair,
                vertical = !crosshair.axis.options.vertical,
                lineBox = crosshair.line.bbox(),
                size = this._measure(),
                halfWidth = size.width / 2,
                halfHeight = size.height / 2,
                padding = options.padding,
                anchor;

            if (vertical) {
                if (position === BOTTOM) {
                    anchor = lineBox.bottomLeft()
                        .translate(-halfWidth, padding);
                } else {
                    anchor = lineBox.topLeft()
                        .translate(-halfWidth, -size.height - padding);
                }
            } else {
                if (position === LEFT) {
                    anchor = lineBox.topLeft()
                        .translate(-size.width - padding, -halfHeight);
                } else {
                    anchor = lineBox.topRight()
                        .translate(padding, -halfHeight);
                }
            }

            return anchor;
        },

        hide: function() {
            this.element.hide();
            this.point = null;
        },

        destroy: function() {
            BaseTooltip.fn.destroy.call(this);

            this.point = null;
        }
    });

    var Aggregates = {
        min: function(values) {
            var min = MAX_VALUE,
                length = values.length,
                i, n;

            for (i = 0; i < length; i++) {
                n = values[i];
                if (isNumber(n)) {
                    min = math.min(min, n);
                }
            }

            return min === MAX_VALUE ? values[0] : min;
        },

        max: function(values) {
            var max = MIN_VALUE,
                length = values.length,
                i, n;

            for (i = 0; i < length; i++) {
                n = values[i];
                if (isNumber(n)) {
                    max = math.max(max, n);
                }
            }

            return max === MIN_VALUE ? values[0] : max;
        },

        sum: function(values) {
            var length = values.length,
                sum = 0,
                i, n;

            for (i = 0; i < length; i++) {
                n = values[i];
                if (isNumber(n)) {
                    sum += n;
                }
            }

            return sum;
        },

        sumOrNull: function(values) {
            var result = null;

            if (countNumbers(values)) {
                result = Aggregates.sum(values);
            }

            return result;
        },

        count: function(values) {
            var length = values.length,
                count = 0,
                i, val;

            for (i = 0; i < length; i++) {
                val = values[i];
                if (val !== null && defined(val)) {
                    count++;
                }
            }

            return count;
        },

        avg: function(values) {
            var result = values[0],
                count = countNumbers(values);

            if (count > 0) {
                result = Aggregates.sum(values) / count;
            }

            return result;
        },

        first: function(values) {
            var length = values.length,
                i,
                val;

            for (i = 0; i < length; i++) {
                val = values[i];
                if (val !== null && defined(val)) {
                    return val;
                }
            }

            return values[0];
        }
    };

    function DefaultAggregates() {
        this._defaults = {};
    }

    DefaultAggregates.prototype = {
        register: function(seriesTypes, aggregates) {
            for (var i = 0; i < seriesTypes.length; i++) {
                this._defaults[seriesTypes[i]] = aggregates;
            }
        },

        query: function(seriesType) {
            return this._defaults[seriesType];
        }
    };

    DefaultAggregates.current = new DefaultAggregates();

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
            that._dateAxis = that.categoryAxis instanceof DateCategoryAxis;
            that.valueAxis = valueAxis;

            if (that._dateAxis) {
                deepExtend(options, {
                    min: toDate(options.min),
                    max: toDate(options.max),
                    from: toDate(options.from),
                    to: toDate(options.to)
                });
            }

            that.template = Selection.template;
            if (!that.template) {
                that.template = Selection.template = renderTemplate(
                    "<div class='" + CSS_PREFIX + "selector' " +
                    "style='width: #= d.width #px; height: #= d.height #px;" +
                    " top: #= d.offset.top #px; left: #= d.offset.left #px;'>" +
                    "<div class='" + CSS_PREFIX + "mask'></div>" +
                    "<div class='" + CSS_PREFIX + "mask'></div>" +
                    "<div class='" + CSS_PREFIX + "selection'>" +
                    "<div class='" + CSS_PREFIX + "selection-bg'></div>" +
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

                that.set(that._index(options.from), that._index(options.to));

                that.bind(that.events, that.options);
                that.wrapper[0].style.cssText = that.wrapper[0].style.cssText;

                that.wrapper.on(MOUSEWHEEL_NS, proxy(that._mousewheel, that));

                if (kendo.UserEvents) {
                    that.userEvents = new kendo.UserEvents(that.wrapper, {
                        global: true,
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
            visible: true,
            mousewheel: {
                zoom: BOTH
            },
            min: MIN_VALUE,
            max: MAX_VALUE
        },

        destroy: function() {
            var that = this,
                userEvents = that.userEvents;

            if (userEvents) {
                userEvents.destroy();
            }

            clearTimeout(that._mwTimeout);
            that._state = null;

            that.wrapper.remove();
        },

        _rangeEventArgs: function(range) {
            var that = this;

            return {
                axis: that.categoryAxis.options,
                from: that._value(range.from),
                to: that._value(range.to)
            };
        },

        _start: function(e) {
            var that = this,
                options = that.options,
                target = $(e.event.target),
                args;

            if (that._state || !target) {
                return;
            }

            that.chart._unsetActivePoint();
            that._state = {
                moveTarget: target.parents(".k-handle").add(target).first(),
                startLocation: e.x ? e.x.location : 0,
                range: {
                    from: that._index(options.from),
                    to: that._index(options.to)
                }
            };

            args = that._rangeEventArgs({
                from: that._index(options.from),
                to: that._index(options.to)
            });

            if (that.trigger(SELECT_START, args)) {
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
                categories = that.categoryAxis.options.categories,
                from = that._index(options.from),
                to = that._index(options.to),
                min = that._index(options.min),
                max = that._index(options.max),
                delta = state.startLocation - e.x.location,
                range = state.range,
                oldRange = { from: range.from, to: range.to },
                span = range.to - range.from,
                target = state.moveTarget,
                scale = that.wrapper.width() / (categories.length - 1),
                offset = math.round(delta / scale);

            if (!target) {
                return;
            }

            e.preventDefault();

            if (target.is(".k-selection, .k-selection-bg")) {
                range.from = math.min(
                    math.max(min, from - offset),
                    max - span
                );
                range.to = math.min(
                    range.from + span,
                    max
                );
            } else if (target.is(".k-leftHandle")) {
                range.from = math.min(
                    math.max(min, from - offset),
                    max - 1
                );
                range.to = math.max(range.from + 1, range.to);
            } else if (target.is(".k-rightHandle")) {
                range.to = math.min(
                    math.max(min + 1, to - offset),
                    max
                );
                range.from = math.min(range.to - 1, range.from);
            }

            if (range.from !== oldRange.from || range.to !== oldRange.to) {
                that.move(range.from, range.to);
                that.trigger(SELECT, that._rangeEventArgs(range));
            }
        },

        _end: function() {
            var that = this,
                range = that._state.range;

            delete that._state;
            that.set(range.from, range.to);
            that.trigger(SELECT_END, that._rangeEventArgs(range));
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
                categoryAxis.pointCategoryIndex(new dataviz.Point2D(left)) ||
                options.min;

            range.to =
                categoryAxis.pointCategoryIndex(new dataviz.Point2D(right)) ||
                options.max;

            that.move(range.from, range.to);
        },

        _tap: function(e) {
            var that = this,
                options = that.options,
                coords = that.chart._eventCoordinates(e),
                categoryAxis = that.categoryAxis,
                categoryIx = categoryAxis.pointCategoryIndex(
                    new dataviz.Point2D(coords.x, categoryAxis.box.y1)
                ),
                from = that._index(options.from),
                to = that._index(options.to),
                min = that._index(options.min),
                max = that._index(options.max),
                span = to - from,
                mid = from + span / 2,
                offset = math.round(mid - categoryIx),
                range = {},
                rightClick = e.event.which === 3;

            if (that._state || rightClick) {
                return;
            }

            e.preventDefault();
            that.chart._unsetActivePoint();

            if (!categoryAxis.options.justified) {
                offset--;
            }

            range.from = math.min(
                math.max(min, from - offset),
                max - span
            );

            range.to = math.min(range.from + span, max);

            that._start(e);
            if (that._state) {
                that._state.range = range;
                that.trigger(SELECT, that._rangeEventArgs(range));
                that._end();
            }
        },

        _mousewheel: function(e) {
            var that = this,
                options = that.options,
                delta = mwDelta(e);

            that._start({ event: { target: that.selection } });

            if (that._state) {
                var range = that._state.range;

                e.preventDefault();
                e.stopPropagation();

                if (math.abs(delta) > 1) {
                    delta *= ZOOM_ACCELERATION;
                }

                if (options.mousewheel.reverse) {
                    delta *= -1;
                }

                if (that.expand(delta)) {
                    that.trigger(SELECT, {
                        axis: that.categoryAxis.options,
                        delta: delta,
                        originalEvent: e,
                        from: that._value(range.from),
                        to: that._value(range.to)
                    });
                }

                if (that._mwTimeout) {
                    clearTimeout(that._mwTimeout);
                }

                that._mwTimeout = setTimeout(function() {
                    that._end();
                }, MOUSEWHEEL_DELAY);
            }
        },

        _index: function(value) {
            var that = this,
                categoryAxis = that.categoryAxis,
                categories = categoryAxis.options.categories,
                index = value;

            if (value instanceof Date) {
                index = lteDateIndex(value, categories);
                if (!categoryAxis.options.justified && value > last(categories)) {
                    index += 1;
                }
            }

            return index;
        },

        _value: function(index) {
            var that = this,
                categoryAxis = this.categoryAxis,
                categories = categoryAxis.options.categories,
                value = index;

            if (that._dateAxis) {
                if (index > categories.length - 1) {
                    value = that.options.max;
                } else {
                    value = categories[index];
                }
            }

            return value;
        },

        _slot: function(value) {
            var that = this,
                categoryAxis = this.categoryAxis;

            return categoryAxis.getSlot(that._index(value));
        },

        move: function(from, to) {
            var that = this,
                options = that.options,
                offset = options.offset,
                padding = options.padding,
                border = options.selection.border,
                leftMaskWidth,
                rightMaskWidth,
                box,
                distance;

            box = that._slot(from);
            leftMaskWidth = round(box.x1 - offset.left + padding.left);
            that.leftMask.width(leftMaskWidth);
            that.selection.css("left", leftMaskWidth);

            box = that._slot(to);
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
                options = that.options,
                min = that._index(options.min),
                max = that._index(options.max);

            from = limitValue(that._index(from), min, max);
            to = limitValue(that._index(to), from + 1, max);

            if (options.visible) {
                that.move(from, to);
            }

            options.from = that._value(from);
            options.to = that._value(to);
        },

        expand: function(delta) {
            var that = this,
                options = that.options,
                min = that._index(options.min),
                max = that._index(options.max),
                zDir = options.mousewheel.zoom,
                from = that._index(options.from),
                to = that._index(options.to),
                range = { from: from, to: to },
                oldRange = deepExtend({}, range);

            if (that._state) {
                range = that._state.range;
            }

            if (zDir !== RIGHT) {
                range.from = limitValue(
                    limitValue(from - delta, 0, to - 1),
                    min, max
                );
            }

            if (zDir !== LEFT) {
                range.to = limitValue(
                    limitValue(to + delta, range.from + 1, max),
                    min,
                    max
                 );
            }

            if (range.from !== oldRange.from || range.to !== oldRange.to) {
                that.set(range.from, range.to);
                return true;
            }
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

    var SeriesAggregator = function(series, binder, defaultAggregates) {
        var sa = this,
            canonicalFields = binder.canonicalFields(series),
            valueFields = binder.valueFields(series),
            sourceFields = binder.sourceFields(series, canonicalFields),
            seriesFields = sa._seriesFields = [],
            defaults = defaultAggregates.query(series.type),
            rootAggregate = series.aggregate || defaults,
            i;

        sa._series = series;
        sa._binder = binder;

        for (i = 0; i < canonicalFields.length; i++) {
            var field = canonicalFields[i],
                fieldAggregate;

            if (typeof rootAggregate === OBJECT) {
                fieldAggregate = rootAggregate[field];
            } else if (i === 0 || inArray(field, valueFields)) {
                fieldAggregate = rootAggregate;
            } else {
                break;
            }

            if (fieldAggregate) {
                seriesFields.push({
                    canonicalName: field,
                    name: sourceFields[i],
                    transform: isFn(fieldAggregate) ?
                        fieldAggregate : Aggregates[fieldAggregate]
                });
            }
        }
    };

    SeriesAggregator.prototype = {
        aggregatePoints: function(srcPoints, group) {
            var sa = this,
                data = sa._bindPoints(srcPoints || []),
                series = sa._series,
                seriesFields = sa._seriesFields,
                i,
                field,
                srcValues,
                value,
                firstDataItem = data.dataItems[0],
                result = {};

            if (firstDataItem && !isNumber(firstDataItem) && !isArray(firstDataItem)) {
                var fn = function() {};
                fn.prototype = firstDataItem;
                result = new fn();
            }

            for (i = 0; i < seriesFields.length; i++) {
                field = seriesFields[i];
                srcValues = sa._bindField(data.values, field.canonicalName);
                value = field.transform(srcValues, series, data.dataItems, group);

                if (value !== null && typeof value === OBJECT && !defined(value.length)) {
                    result = value;
                    break;
                } else {
                    if (defined(value)) {
                        ensureTree(field.name, result);
                        kendo.setter(field.name)(result, value);
                    }
                }
            }

            return result;
        },

        _bindPoints: function(points) {
            var sa = this,
                binder = sa._binder,
                series = sa._series,
                values = [],
                dataItems = [],
                i,
                pointIx;

            for (i = 0; i < points.length; i++) {
                pointIx = points[i];

                values.push(binder.bindPoint(series, pointIx));
                dataItems.push(series.data[pointIx]);
            }

            return {
                values: values,
                dataItems: dataItems
            };
        },

        _bindField: function(data, field) {
            var values = [],
                count = data.length,
                i, item, value, valueFields;

            for (i = 0; i < count; i++) {
                item = data[i];
                valueFields = item.valueFields;

                if (defined(valueFields[field])) {
                    value = valueFields[field];
                } else {
                    value = item.fields[field];
                }

                values.push(value);
            }

            return values;
        }
    };

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

            var baseOptions = deepExtend(
                { data: [] },
                commonThemeDefaults,
                themeSeriesDefaults[seriesType],
                { tooltip: options.tooltip },
                commonDefaults,
                seriesDefaults[seriesType]
            );

            series[i]._defaults = baseOptions;
            series[i] = deepExtend({}, baseOptions, series[i]);
        }
    }

    function cleanupNestedSeriesDefaults(seriesDefaults) {
        delete seriesDefaults.bar;
        delete seriesDefaults.column;
        delete seriesDefaults.rangeColumn;
        delete seriesDefaults.line;
        delete seriesDefaults.verticalLine;
        delete seriesDefaults.pie;
        delete seriesDefaults.donut;
        delete seriesDefaults.area;
        delete seriesDefaults.verticalArea;
        delete seriesDefaults.scatter;
        delete seriesDefaults.scatterLine;
        delete seriesDefaults.bubble;
        delete seriesDefaults.candlestick;
        delete seriesDefaults.ohlc;
        delete seriesDefaults.boxPlot;
        delete seriesDefaults.bullet;
        delete seriesDefaults.verticalBullet;
        delete seriesDefaults.polarArea;
        delete seriesDefaults.polarLine;
        delete seriesDefaults.radarArea;
        delete seriesDefaults.radarLine;
        delete seriesDefaults.waterfall;
    }

    function applySeriesColors(options) {
        var series = options.series,
            colors = options.seriesColors || [],
            i,
            currentSeries,
            seriesColor,
            defaults;

        for (i = 0; i < series.length; i++) {
            currentSeries = series[i];
            seriesColor = colors[i % colors.length];
            currentSeries.color = currentSeries.color || seriesColor;

            defaults = currentSeries._defaults;
            if (defaults) {
                defaults.color = defaults.color || seriesColor;
            }
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
                var result = deepExtend({},
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

                delete result[axisName];

                return result;
            });

            options[axisName] = axes.length > 1 ? axes : axes[0];
        });
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
            return row;
        }

        var get = getter(field, true);
        return get(row);
    }

    function getDateField(field, row) {
        if (row === null) {
            return row;
        }

        var key = "_date_" + field,
            value = row[key];

        if (!value) {
            value = toDate(getter(field, true)(row));
            row[key] = value;
        }

        return value;
    }

    function toDate(value) {
        var result,
            i;

        if (value instanceof Date) {
            result = value;
        } else if (typeof value === STRING) {
            result = kendo.parseDate(value) || new Date(value);
        } else if (value) {
            if (isArray(value)) {
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
        var result = date,
            hours;

        if (date) {
            date = toDate(date);
            hours = date.getHours();

            if (unit === YEARS) {
                result = new Date(date.getFullYear() + value, 0, 1);
                kendo.date.adjustDST(result, 0);
            } else if (unit === MONTHS) {
                result = new Date(date.getFullYear(), date.getMonth() + value, 1);
                kendo.date.adjustDST(result, hours);
            } else if (unit === WEEKS) {
                result = addDuration(startOfWeek(date, weekStartDay), value * 7, DAYS);
                kendo.date.adjustDST(result, hours);
            } else if (unit === DAYS) {
                result = new Date(date.getFullYear(), date.getMonth(), date.getDate() + value);
                kendo.date.adjustDST(result, hours);
            } else if (unit === HOURS) {
                result = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours() + value);
                if (value > 0 && dateEquals(date, result)) {
                    result = addDuration(date, value + 1, unit, weekStartDay);
                }
            } else if (unit === MINUTES) {
                result = new Date(date.getTime() + value * TIME_PER_MINUTE);

                if (result.getSeconds() > 0) {
                    result.setSeconds(0);
                }
            } else if (unit === SECONDS) {
                result = new Date(date.getTime() + value * TIME_PER_SECOND);
            }

            if (result.getMilliseconds() > 0) {
                result.setMilliseconds(0);
            }
        }

        return result;
    }

    function startOfWeek(date, weekStartDay) {
        var day = date.getDay(),
            daysToSubtract = 0;

        if (!isNaN(day)) {
            weekStartDay = weekStartDay || 0;
            while (day !== weekStartDay) {
                if (day === 0) {
                    day = 6;
                } else {
                    day--;
                }

                daysToSubtract++;
            }
        }

        return addTicks(date, -daysToSubtract * TIME_PER_DAY);
    }

    function floorDate(date, unit, weekStartDay) {
        date = toDate(date);

        return addDuration(date, 0, unit, weekStartDay);
    }

    function ceilDate(date, unit, weekStartDay) {
        date = toDate(date);

        if (date && floorDate(date, unit, weekStartDay).getTime() === date.getTime()) {
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

    function singleItemOrArray(array) {
        return array.length === 1 ? array[0] : array;
    }

    function axisGroupBox(axes) {
        var length = axes.length,
            box, i, axisBox;

        if (length > 0) {
            for (i = 0; i < length; i++) {
                axisBox = axes[i].box;

                if (!box) {
                    box = axisBox.clone();
                } else {
                    box.wrap(axisBox);
                }
            }
        }

        return box || Box2D();
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

    function lteDateIndex(date, sortedDates) {
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

            while (dateEquals(sortedDates[i - 1], date)) {
                i--;
            }

            return i;
        }

        if (sortedDates[i] <= date) {
            return i;
        } else {
            return i - 1;
        }
    }

    function isNumber(val) {
        return typeof val === "number" && !isNaN(val);
    }

    function countNumbers(values) {
        var length = values.length,
            count = 0,
            i,
            num;

        for (i = 0; i < length; i++) {
            num = values[i];
            if (isNumber(num)) {
                count++;
            }
        }

        return count;
    }

    function areNumbers(values) {
        return countNumbers(values) === values.length;
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

    function evalOptions(options, context, state, dryRun) {
        var property,
            propValue,
            excluded,
            defaults,
            depth,
            needsEval = false;

        state = state || {};
        excluded = state.excluded = state.excluded || [];
        defaults = state.defaults = state.defaults || {};
        depth = state.depth = state.depth || 0;

        if (depth > MAX_EXPAND_DEPTH) {
            return;
        }

        for (property in options) {
            if (!inArray(property, state.excluded)&&options.hasOwnProperty(property)) {
                propValue = options[property];
                if (isFn(propValue)) {
                    needsEval = true;
                    if (!dryRun) {
                        options[property] = valueOrDefault(propValue(context), defaults[property]);
                    }
                } else if (typeof propValue === OBJECT) {
                    state.defaults = defaults[property];
                    state.depth++;
                    needsEval = evalOptions(propValue, context, state, dryRun) || needsEval;
                    state.depth--;
                }
            }
        }

        return needsEval;
    }

    function groupSeries(series, data) {
        var result = [],
            nameTemplate,
            legacyTemplate = series.groupNameTemplate,
            groupIx,
            dataLength = data.length,
            seriesClone;

        if (defined(legacyTemplate)) {
            kendo.logToConsole(
                "'groupNameTemplate' is obsolete and will be removed in future versions. " +
                "Specify the group name template as 'series.name'"
            );

            if (legacyTemplate) {
                nameTemplate = template(legacyTemplate);
            }
        } else {
            nameTemplate = template(series.name || "");
            if (nameTemplate._slotCount === 0) {
                nameTemplate = template(defined(series.name) ?
                    "#= group.value #: #= series.name #" :
                    "#= group.value #"
                );
            }
        }

        for (groupIx = 0; groupIx < dataLength; groupIx++) {
            seriesClone = deepExtend({}, series);

            if (!isFn(seriesClone.color)) {
                seriesClone.color = undefined;
            }

            seriesClone._groupIx = groupIx;
            result.push(seriesClone);

            if (nameTemplate) {
                seriesClone.name = nameTemplate({
                    series: seriesClone, group: data[groupIx]
                });
            }
        }

        return result;
    }

    function filterSeriesByType(series, types) {
         var i, currentSeries,
             result = [];

         types = [].concat(types);
         for (i = 0; i < series.length; i++) {
             currentSeries = series[i];
             if (inArray(currentSeries.type, types)) {
                 result.push(currentSeries);
             }
         }

         return result;
    }

    function indexOf(item, arr) {
         if (item instanceof Date) {
             for (var i = 0, length = arr.length; i < length; i++) {
                 if (dateEquals(arr[i], item)) {
                     return i;
                 }
             }

             return -1;
         } else {
             return $.inArray(item, arr);
         }
    }

    function sortDates(dates, comparer) {
         comparer = comparer || dateComparer;

         for (var i = 1, length = dates.length; i < length; i++) {
             if (comparer(dates[i], dates[i - 1]) < 0) {
                 dates.sort(comparer);
                 break;
             }
         }

         return dates;
    }

    // Will mutate srcDates, not cloned for performance
    function uniqueDates(srcDates, comparer) {
        var i,
            dates = sortDates(srcDates, comparer),
            length = dates.length,
            result = length > 0 ? [dates[0]] : [];

        comparer = comparer || dateComparer;

        for (i = 1; i < length; i++) {
            if (comparer(dates[i], last(result)) !== 0) {
                result.push(dates[i]);
            }
        }

        return result;
    }

    function isDateAxis(axisOptions, sampleCategory) {
        var type = axisOptions.type,
            dateCategory = sampleCategory instanceof Date;

        return (!type && dateCategory) || equalsIgnoreCase(type, DATE);
    }

    function transpose(rows) {
        var result = [],
            rowCount = rows.length,
            rowIx,
            row,
            colIx,
            colCount;

        for (rowIx = 0; rowIx < rowCount; rowIx++) {
            row = rows[rowIx];
            colCount = row.length;
            for (colIx = 0; colIx < colCount; colIx++) {
                result[colIx] = result[colIx] || [];
                result[colIx].push(row[colIx]);
            }
        }

        return result;
    }

    function ensureTree(fieldName, target) {
        if (fieldName.indexOf(".") > -1) {
            var parts = fieldName.split("."),
                path = "",
                val;

            while (parts.length > 1) {
                path += parts.shift();
                val = kendo.getter(path)(target) || {};
                kendo.setter(path)(target, val);
                path += ".";
            }
        }
    }

    function seriesTotal(series) {
        var data = series.data;
        var sum = 0;

        for (var i = 0; i < data.length; i++) {
            var pointData = SeriesBinder.current.bindPoint(series, i);
            var value = pointData.valueFields.value;

            if (typeof value === STRING) {
                value = parseFloat(value);
            }

            if (isNumber(value) && pointData.fields.visible !== false) {
                sum += math.abs(value);
            }
        }

        return sum;
    }

    function hasGradientOverlay(options) {
        var overlay = options.overlay;
        return overlay && overlay.gradient && overlay.gradient != "none";
    }

    function returnSelf() {
        return this;
    }

    // Exports ================================================================
    dataviz.ui.plugin(Chart);

    PlotAreaFactory.current.register(CategoricalPlotArea, [
        BAR, COLUMN, LINE, VERTICAL_LINE, AREA, VERTICAL_AREA,
        CANDLESTICK, OHLC, BULLET, VERTICAL_BULLET, BOX_PLOT,
        RANGE_COLUMN, RANGE_BAR, WATERFALL, HORIZONTAL_WATERFALL
    ]);

    PlotAreaFactory.current.register(XYPlotArea, [
        SCATTER, SCATTER_LINE, BUBBLE
    ]);

    PlotAreaFactory.current.register(PiePlotArea, [PIE]);
    PlotAreaFactory.current.register(DonutPlotArea, [DONUT]);

    SeriesBinder.current.register(
        [BAR, COLUMN, LINE, VERTICAL_LINE, AREA, VERTICAL_AREA],
        [VALUE], [CATEGORY, COLOR, NOTE_TEXT, ERROR_LOW_FIELD, ERROR_HIGH_FIELD]
    );

    SeriesBinder.current.register(
        [RANGE_COLUMN, RANGE_BAR],
        [FROM, TO], [CATEGORY, COLOR, NOTE_TEXT]
    );

    SeriesBinder.current.register(
        [WATERFALL, HORIZONTAL_WATERFALL],
        [VALUE], [CATEGORY, COLOR, NOTE_TEXT, SUMMARY_FIELD]
    );

    DefaultAggregates.current.register(
        [BAR, COLUMN, LINE, VERTICAL_LINE, AREA, VERTICAL_AREA, WATERFALL, HORIZONTAL_WATERFALL],
        { value: MAX, color: FIRST, noteText: FIRST, errorLow: MIN, errorHigh: MAX }
    );

    DefaultAggregates.current.register(
        [RANGE_COLUMN, RANGE_BAR],
        { from: MIN, to: MAX, color: FIRST, noteText: FIRST }
    );

    SeriesBinder.current.register(
        [SCATTER, SCATTER_LINE, BUBBLE],
        [X, Y], [COLOR, NOTE_TEXT, X_ERROR_LOW_FIELD, X_ERROR_HIGH_FIELD, Y_ERROR_LOW_FIELD, Y_ERROR_HIGH_FIELD]
    );

    SeriesBinder.current.register(
        [BUBBLE], [X, Y, "size"], [COLOR, CATEGORY, NOTE_TEXT]
    );

    SeriesBinder.current.register(
        [CANDLESTICK, OHLC],
        ["open", "high", "low", "close"], [CATEGORY, COLOR, "downColor", NOTE_TEXT]
    );

    DefaultAggregates.current.register(
        [CANDLESTICK, OHLC],
        { open: MAX, high: MAX, low: MIN, close: MAX,
          color: FIRST, downColor: FIRST, noteText: FIRST }
    );

    SeriesBinder.current.register(
        [BOX_PLOT],
        ["lower", "q1", "median", "q3", "upper", "mean", "outliers"], [CATEGORY, COLOR, NOTE_TEXT]
    );

    DefaultAggregates.current.register(
        [BOX_PLOT],
        { lower: MAX, q1: MAX, median: MAX, q3: MAX, upper: MAX, mean: MAX, outliers: FIRST,
          color: FIRST, noteText: FIRST }
    );

    SeriesBinder.current.register(
        [BULLET, VERTICAL_BULLET],
        ["current", "target"], [CATEGORY, COLOR, "visibleInLegend", NOTE_TEXT]
    );

    DefaultAggregates.current.register(
        [BULLET, VERTICAL_BULLET],
        { current: MAX, target: MAX, color: FIRST, noteText: FIRST }
    );

    SeriesBinder.current.register(
        [PIE, DONUT],
        [VALUE], [CATEGORY, COLOR, "explode", "visibleInLegend", "visible"]
    );

    deepExtend(dataviz, {
        EQUALLY_SPACED_SERIES: EQUALLY_SPACED_SERIES,

        Aggregates: Aggregates,
        AreaChart: AreaChart,
        AreaSegment: AreaSegment,
        AxisGroupRangeTracker: AxisGroupRangeTracker,
        Bar: Bar,
        BarChart: BarChart,
        BarLabel: BarLabel,
        BubbleChart: BubbleChart,
        Bullet: Bullet,
        BulletChart: BulletChart,
        CandlestickChart: CandlestickChart,
        Candlestick: Candlestick,
        CategoricalChart: CategoricalChart,
        CategoricalErrorBar: CategoricalErrorBar,
        CategoricalPlotArea: CategoricalPlotArea,
        CategoryAxis: CategoryAxis,
        ChartContainer: ChartContainer,
        ClusterLayout: ClusterLayout,
        Crosshair: Crosshair,
        CrosshairTooltip: CrosshairTooltip,
        DateCategoryAxis: DateCategoryAxis,
        DateValueAxis: DateValueAxis,
        DefaultAggregates: DefaultAggregates,
        DonutChart: DonutChart,
        DonutPlotArea: DonutPlotArea,
        DonutSegment: DonutSegment,
        ErrorBarBase: ErrorBarBase,
        ErrorRangeCalculator: ErrorRangeCalculator,
        Highlight: Highlight,
        SharedTooltip: SharedTooltip,
        Legend: Legend,
        LegendItem: LegendItem,
        LineChart: LineChart,
        LinePoint: LinePoint,
        LineSegment: LineSegment,
        Pane: Pane,
        PieAnimation: PieAnimation,
        PieChart: PieChart,
        PieChartMixin: PieChartMixin,
        PiePlotArea: PiePlotArea,
        PieSegment: PieSegment,
        PlotAreaBase: PlotAreaBase,
        PlotAreaFactory: PlotAreaFactory,
        PointEventsMixin: PointEventsMixin,
        RangeBar: RangeBar,
        RangeBarChart: RangeBarChart,
        ScatterChart: ScatterChart,
        ScatterErrorBar: ScatterErrorBar,
        ScatterLineChart: ScatterLineChart,
        Selection: Selection,
        SeriesAggregator: SeriesAggregator,
        SeriesBinder: SeriesBinder,
        ShapeElement: ShapeElement,
        SplineSegment: SplineSegment,
        SplineAreaSegment: SplineAreaSegment,
        StackWrap: StackWrap,
        Tooltip: Tooltip,
        OHLCChart: OHLCChart,
        OHLCPoint: OHLCPoint,
        WaterfallChart: WaterfallChart,
        WaterfallSegment: WaterfallSegment,
        XYPlotArea: XYPlotArea,

        addDuration: addDuration,
        areNumbers: areNumbers,
        axisGroupBox: axisGroupBox,
        categoriesCount: categoriesCount,
        ceilDate: ceilDate,
        countNumbers: countNumbers,
        duration: duration,
        ensureTree: ensureTree,
        indexOf: indexOf,
        isNumber: isNumber,
        floorDate: floorDate,
        filterSeriesByType: filterSeriesByType,
        lteDateIndex: lteDateIndex,
        evalOptions: evalOptions,
        seriesTotal: seriesTotal,
        singleItemOrArray: singleItemOrArray,
        sortDates: sortDates,
        startOfWeek: startOfWeek,
        transpose: transpose,
        toDate: toDate,
        toTime: toTime,
        uniqueDates: uniqueDates
    });

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
