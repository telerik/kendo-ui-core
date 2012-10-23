(function ($, undefined) {
    // Imports ================================================================
    var kendo = window.kendo,
        Class = kendo.Class,
        Widget = kendo.ui.Widget,
        deepExtend = kendo.deepExtend,
        math = Math,

        dataviz = kendo.dataviz,
        Chart = dataviz.ui.Chart,
        DateCategoryAxis = dataviz.DateCategoryAxis,
        Selection = dataviz.Selection,
        duration = dataviz.duration,
        lteDateIndex = dataviz.lteDateIndex,
        toDate = dataviz.toDate;

    // Constants =============================================================
    var AUTO_CATEGORY_WIDTH = 28,
        NAVIGATOR_PANE = "_navigator",
        NAVIGATOR_AXIS = NAVIGATOR_PANE;

    // Stock chart ===========================================================
    var StockChart = Chart.extend({
        init: function(element, options) {
            var chart = this;

            Chart.fn.init.call(chart, element, options);
        },

        _applyDefaults: function(options, themeOptions) {
            var chart = this,
                width = chart.element.width() || dataviz.DEFAULT_WIDTH;

            var stockDefaults = {
                axisDefaults: {
                    categoryAxis: {
                        field: options.dateField,
                        majorGridLines: {
                            visible: false
                        },
                        labels: {
                            step: 2
                        },
                        majorTicks: {
                            visible: false
                        },
                        maxDateGroups: Math.floor(width / AUTO_CATEGORY_WIDTH)
                    }
                }
            };

            if (themeOptions) {
                deepExtend(themeOptions, stockDefaults);
            }

            if (!chart._navigator) {
                Navigator.setup(options, themeOptions);
            }

            Chart.fn._applyDefaults.call(chart, options, themeOptions);
        },

        options: {
            name: "StockChart",
            axisDefaults: {
                categoryAxis: {
                    type: "date",
                    baseUnit: "fit",
                    justified: true
                },
                valueAxis: {
                    narrowRange: true
                }
            },
            dateField: "date",
            navigator: {
                seriesDefaults: {
                    markers: {
                        visible: false
                    },
                    tooltip: {
                        visible: true,
                        template: "#= kendo.toString(category, 'd') #"
                    },
                    width: 1
                }
            },
            tooltip: {
                visible: true
            }
        },

        _redraw: function() {
            var chart = this,
                navigator = chart._navigator;

            if (!navigator) {
                navigator = chart._navigator = new Navigator(chart);
            }

            navigator.applySelection();
            Chart.fn._redraw.call(chart);
            navigator.redraw();

            // Add panning support to Axis
            if (!chart._panningSetup) {
                if (kendo.ui.Draggable) {
                    $(chart._viewElement).kendoDraggable({
                        drag: $.proxy(chart._onDrag, chart),
                        dragstart: $.proxy(chart._onDragStart, chart),
                        dragend: $.proxy(chart._onDragEnd, chart)
                    });
                }

                chart._panningSetup = true;
            }
        },

        _onDragStart: function(e) {
            var chart = this;
            var primaryAxis = chart._plotArea.categoryAxis;
            var options = primaryAxis.options;
            var coords = chart._eventCoordinates(e);
            var baseUnit = primaryAxis.options.baseUnit;

            if (!chart._plotArea.panes[0].box.containsPoint(coords)) {
                e.preventDefault();
                return;
            }

            var range = duration(options.categories[0],
                                dataviz.last(options.categories),
                                baseUnit);

            // TODO: Duplicate from mouseMove
                delete chart._activePoint;
                chart._tooltip.hide();
                chart._highlight.hide();
                chart._suppressHover = true;

            chart._dragState = {
                min: options.min,
                max: options.max,
                range: range,
                scale: primaryAxis.box.width() / range,
                baseUnit: baseUnit
            };
        },

        _onDrag: function(e) {
            var chart = this,
                delta = e.x.startLocation - e.x.location,
                panes = chart._plotArea.panes,
                primaryAxis = chart._plotArea.categoryAxis,
                navigatorAxis = chart._plotArea.namedCategoryAxes[NAVIGATOR_AXIS];

                var dragState = chart._dragState,
                baseUnit = dragState.baseUnit;

                var offset = math.round(delta / dragState.scale);

            var rangeStart = toDate(math.min(
                math.max(navigatorAxis.options.categories[0],
                    dataviz.addDuration(dragState.min, offset, baseUnit)
                ),
                dataviz.addDuration(
                    dataviz.last(navigatorAxis.options.categories), -dragState.range, baseUnit
                )
            ));
            var rangeEnd = toDate(math.min(
                dataviz.addDuration(rangeStart, dragState.range, baseUnit),
                dataviz.last(navigatorAxis.options.categories)
            ));

            var axisSettings = chart._plotArea.options.categoryAxis[0];
            axisSettings.min = rangeStart;
            axisSettings.max = rangeEnd;
            chart._plotArea.redrawPane(panes[0]);

            var selection = chart._selection;
            selection.setRange(
                lteDateIndex(
                    navigatorAxis.options.categories,
                    rangeStart
                ),
                lteDateIndex(
                    navigatorAxis.options.categories,
                    rangeEnd
            ));
        },

        _onDragEnd: function(e) {
            this._suppressHover = false;
        }
    });

    var Navigator = Class.extend({
        init: function(chart) {
            var navi = this;

            navi.chart = chart;
            navi.options = chart.options.navigator;
        },

        redraw: function() {
            var navi = this,
                chart = navi.chart,
                axis = navi.mainAxis(),
                groups = axis.options.categories,
                select = navi.options.select,
                min = 0,
                max = groups.length - 1,
                start = min,
                end = max;

            if (groups.length > 0) {
                if (select.from) {
                    start = lteDateIndex(groups, toDate(select.from));
                }

                if (select.to) {
                    end = lteDateIndex(groups, toDate(select.to));
                }

                var selection = chart._selection = new Selection(chart.element, axis, {
                    // TODO: Start, end, min, max should be expressed in axis values
                    start: start,
                    end: end,
                    min: min,
                    max: max,
                    snap: true,
                    select: $.proxy(navi.onSelect, navi)
                });
            }
        },

        applySelection: function() {
            var navi = this,
                select = navi.options.select,
                chart = navi.chart,
                slaveAxes = chart.options.categoryAxis,
                i,
                axis;

            for (i = 0; i < slaveAxes.length; i++) {
                axis = slaveAxes[i];
                if (axis.pane !== NAVIGATOR_PANE) {
                    axis.min = select.from;
                    axis.max = select.to;
                }
            }
        },

        onSelect: function(e) {
            var navi = this,
                axis = navi.mainAxis(),
                groups = axis.options.categories,
                select = navi.options.select,
                chart = navi.chart,
                plotArea = chart._plotArea,
                slavePanes = plotArea.panes.slice(0, -1),
                i;

            // TODO: Provide start and end date in arguments
            select.from = groups[e.start];
            select.to = groups[e.end];

            navi.applySelection();

            for (i = 0; i < slavePanes.length; i++) {
                chart._plotArea.redrawPane(slavePanes[i]);
            }
        },

        mainAxis: function() {
            return this.chart._plotArea.namedCategoryAxes[NAVIGATOR_AXIS];
        }
    });

    Navigator.setup = function(options, themeOptions) {
        options = options || {};
        themeOptions = themeOptions || {};

        var naviOptions = deepExtend({}, options.navigator, themeOptions.navigator),
            panes = options.panes = [].concat(options.panes);

        panes.push(deepExtend(
            {}, naviOptions.pane, { name: NAVIGATOR_PANE })
        );

        Navigator.attachAxes(options);
        Navigator.attachSeries(options, naviOptions);
    };

    Navigator.attachAxes = function(options) {
        var dateField = options.dateField,
            categoryAxes,
            valueAxes;

        categoryAxes = options.categoryAxis = [].concat(options.categoryAxis);
        valueAxes = options.valueAxis = [].concat(options.valueAxis);

        var base = {
            type: "date",
            field: dateField,
            pane: NAVIGATOR_PANE,
            roundToBaseUnit: false,
            justified: true,
            tooltip: { visible: false },
            labels: { step: 1 }
        };

        categoryAxes.push(
            deepExtend({}, base, {
                name: NAVIGATOR_AXIS,
                baseUnit: "fit",
                // TODO: Width based
                maxDateGroups: 200,
                baseUnitStep: "auto",
                labels: { visible: false },
                majorTicks: { visible: false }
            }), deepExtend({}, base, {
                // TODO: Range-based
                baseUnit: "years",
                // TODO: Width based
                maxDateGroups: 20,
                baseUnitStep: "auto",
                majorTicks: { visible: true }
            }), deepExtend({}, base, {
                // TODO: Range-based
                baseUnit: "months",
                baseUnitStep: 1,
                majorTicks: {
                    visible: true,
                    width: 0.5
                },
                labels: { visible: false, mirror: true }
            })
        );

        valueAxes.push({
            // TODO: Extend navigaor.valueAxis
            name: NAVIGATOR_AXIS,
            pane: NAVIGATOR_PANE,
            majorGridLines: {
                visible: false
            },
            visible: false
        });
    };

    Navigator.attachSeries = function(options, naviOptions) {
        var series = options.series = options.series || [],
            navigatorSeries = [].concat(naviOptions.series),
            defaults = naviOptions.seriesDefaults,
            i;

        for (i = 0; i < navigatorSeries.length; i++) {
            series.push(
                deepExtend({}, defaults, navigatorSeries[i], {
                    axis: NAVIGATOR_AXIS,
                    categoryAxis: NAVIGATOR_AXIS
                })
            );
        }
    };

    // Exports ================================================================

    dataviz.ui.plugin(StockChart);

    deepExtend(dataviz, {
    });

})(jQuery);
