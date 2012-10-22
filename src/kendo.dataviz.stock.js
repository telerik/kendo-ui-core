(function ($, undefined) {
    // Imports ================================================================
    var kendo = window.kendo,
        math = Math,
        Widget = kendo.ui.Widget,
        deepExtend = kendo.deepExtend,

        dataviz = kendo.dataviz,
        Chart = dataviz.ui.Chart,
        DateCategoryAxis = dataviz.DateCategoryAxis,
        Selection = dataviz.Selection,

        duration = dataviz.duration,
        lteDateIndex = dataviz.lteDateIndex,
        toDate = dataviz.toDate;

    // Constants =============================================================
    var AUTO_CATEGORY_WIDTH = 47,
        NAVIGATOR_PANE = "_navigator",
        NAVIGATOR_AXIS = NAVIGATOR_PANE;

    // Stock chart ===========================================================
    var StockChart = Chart.extend({
        init: function(element, options) {
            var chart = this;

            Chart.fn.init.call(chart, element, options);
        },

        _ready: function() {
            var chart = this;

            chart._createNavigator();

            $(chart.element).kendoDraggable({
                drag: $.proxy(chart._onDrag, chart),
                dragstart: $.proxy(chart._onDragStart, chart),
                dragend: $.proxy(chart._onDragEnd, chart)
            });
        },

        _applyDefaults: function(options, themeOptions) {
            var chart = this,
                width = chart.element.width() || dataviz.DEFAULT_WIDTH;

            var stockDefaults = {
                axisDefaults: {
                    categoryAxis: {
                        field: options.dateField,
                        maxDateGroups: Math.floor(width / AUTO_CATEGORY_WIDTH)
                    }
                }
            };

            if (themeOptions) {
                deepExtend(themeOptions, stockDefaults);
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
            var chart = this;

            Chart.fn._redraw.call(chart);
            chart._redrawSelection();
        },

        _redrawSelection: function() {
            var chart = this;
            var navigatorAxis = chart._plotArea.namedCategoryAxes[NAVIGATOR_AXIS];
            var select = chart.options.navigator.select;
            var categoriesLength = navigatorAxis.options.categories.length;
            var start = 0;
            var end = navigatorAxis.options.categories.length;

            if (categoriesLength > 0) {
                if (select.from) {
                    start = lteDateIndex(
                        navigatorAxis.options.categories,
                        toDate(select.from)
                    );
                }

                if (select.to) {
                    end = lteDateIndex(
                        navigatorAxis.options.categories,
                        toDate(select.to)
                    );
                }

                var selection = chart._selection = new Selection(chart.element, navigatorAxis, {
                    // TODO: Start, end, min, max should be expressed in axis values
                    start: start,
                    end: end,
                    min: 0,
                    max: navigatorAxis.options.categories.length - 1,
                    snap: true,
                    select: $.proxy(chart._navigatorSelect, chart)
                });

                chart._applySelection();
            }
        },

        _createNavigator: function() {
            var chart = this,
                options = chart.options,
                panes = options.panes = [].concat(options.panes),
                categoryAxes = options.categoryAxis = [].concat(options.categoryAxis),
                valueAxes = options.valueAxis = [].concat(options.valueAxis),
                series = options.series;

            panes.push(deepExtend(
                {}, options.navigator.pane, { name: NAVIGATOR_PANE })
            );

            var dateField = options.dateField;
            categoryAxes.push({
                type: "date",
                field: dateField,
                name: NAVIGATOR_AXIS,
                pane: NAVIGATOR_PANE,
                baseUnit: "fit",
                // TODO: Width based
                maxDateGroups: 200,
                baseUnitStep: "auto",
                roundToBaseUnit: false,
                justified: true,
                labels: { visible: false },
                majorTicks: { visible: false },
                tooltip: { visible: false }
            }, {
                type: "date",
                field: dateField,
                pane: NAVIGATOR_PANE,
                // TODO: Range-based
                baseUnit: "years",
                maxDateGroups: 20,
                baseUnitStep: "auto",
                roundToBaseUnit: false,
                justified: true
            }, {
                type: "date",
                field: dateField,
                pane: NAVIGATOR_PANE,
                // TODO: Range-based
                baseUnit: "months",
                baseUnitStep: 1,
                roundToBaseUnit: false,
                justified: true,
                labels: { visible: false, mirror: true }
            });

            valueAxes.push({
                // TODO: Extend navigaor.valueAxis
                name: NAVIGATOR_AXIS,
                pane: NAVIGATOR_PANE,
                majorGridLines: {
                    visible: false
                },
                visible: false
            });

            var navigatorSeries = [].concat(options.navigator.series);
            var seriesDefaults = options.navigator.seriesDefaults;
            for (var i = 0; i < navigatorSeries.length; i++) {
                series.push(
                    deepExtend({}, seriesDefaults, navigatorSeries[i], {
                        axis: NAVIGATOR_AXIS,
                        categoryAxis: NAVIGATOR_AXIS,
                    })
                );
            }
        },

        _applySelection: function() {
            var chart = this;
            var navigatorAxis = chart._plotArea.namedCategoryAxes[NAVIGATOR_AXIS];
            var axes = chart._plotArea.options.categoryAxis;
            var slavePanes = chart._plotArea.panes.slice(0, -1);
            var i;
            var select = chart.options.navigator.select;

            for (i = 0; i < axes.length; i++) {
                var slaveAxis = axes[i];
                if (slaveAxis.pane !== NAVIGATOR_PANE) {
                    slaveAxis.min = select.from;
                    slaveAxis.max = select.to;
                }
            }

            for (i = 0; i < slavePanes.length; i++) {
                chart._plotArea.redrawPane(slavePanes[i]);
            }
        },

        _navigatorSelect: function(e) {
            var chart = this;
            var navigatorAxis = chart._plotArea.namedCategoryAxes[NAVIGATOR_AXIS];
            var select = chart.options.navigator.select;

            // TODO: Return start and end date
            select.from = navigatorAxis.options.categories[e.start];
            select.to = navigatorAxis.options.categories[e.end];
            chart._applySelection();
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

    // Exports ================================================================

    dataviz.ui.plugin(StockChart);

    deepExtend(dataviz, {
    });

})(jQuery);
