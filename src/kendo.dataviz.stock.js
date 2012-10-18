(function ($, undefined) {
    // Imports ================================================================
    var kendo = window.kendo,
        math = Math,
        Widget = kendo.ui.Widget,
        deepExtend = kendo.deepExtend,

        dataviz = kendo.dataviz,
        Chart = dataviz.ui.Chart,
        Selection = dataviz.Selection,

        duration = dataviz.duration,
        toDate = dataviz.toDate;

    // Constants =============================================================
    var AUTO_CATEGORY_WIDTH = 47,
        NAVIGATOR_PANE = "_navigator",
        NAVIGATOR_AXIS = "_navigator";

    // Stock chart ===========================================================
    var StockChart = Chart.extend({
        init: function(element, options) {
            var chart = this;

            Chart.fn.init.call(chart, element, options);
        },

        _ready: function() {
            var chart = this,
                options = chart.options,
                panes = options.panes = [].concat(options.panes),
                categoryAxes = options.categoryAxis = [].concat(options.categoryAxis),
                valueAxes = options.valueAxis = [].concat(options.valueAxis),
                series = options.series;

            panes.push({
                name: NAVIGATOR_PANE,
                // TODO: Customization?
                height: 80
            });

            var dateField = categoryAxes[0].field;
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
                majorTicks: { visible: false }
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

            series.push({
                // TODO: Customization
                // TODO: navigator.series?
                type: options.navigator.type,
                field: options.navigator.field,
                axis: NAVIGATOR_AXIS,
                categoryAxis: NAVIGATOR_AXIS,
                markers: {
                    visible: false
                },
                tooltip: {
                    visible: true,
                    template: "#= kendo.toString(category, 'd') #"
                },
                width: 1
            });

            $(chart.element).kendoDraggable({
                drag: $.proxy(chart._onDrag, chart),
                dragstart: $.proxy(chart._onDragStart, chart)
            });
        },

        _applyDefaults: function(options, themeOptions) {
            var chart = this,
                width = chart.element.width() || dataviz.DEFAULT_WIDTH;

            var stockDefaults = {
                categoryAxis: {
                    type: "date",
                    baseUnit: "fit",
                    // TODO: Place in last pane automatically?
                    // TODO: Fix missing gridlines
                    maxDateGroups: Math.floor(width / AUTO_CATEGORY_WIDTH),
                    justified: true
                }
            };

            if (themeOptions) {
                deepExtend(themeOptions, stockDefaults);
            }

            Chart.fn._applyDefaults.call(chart, options, themeOptions);
        },

        options: {
            name: "StockChart",
            tooltip: {
                visible: true
            }
        },

        _redraw: function() {
            var chart = this;

            Chart.fn._redraw.call(chart);

            var navigatorAxis = chart._plotArea.namedCategoryAxes[NAVIGATOR_AXIS];
            var primaryAxis = chart._plotArea.options.categoryAxis[0];
            var categoriesLength = navigatorAxis.options.categories.length;
            var start = 0,
                end = navigatorAxis.options.categories.length;

            if (primaryAxis.min) {
                start = dataviz.lteDateIndex(
                    navigatorAxis.options.categories,
                    dataviz.toDate(primaryAxis.min)
                );
            }

            if (primaryAxis.max) {
                end = dataviz.lteDateIndex(
                    navigatorAxis.options.categories,
                    dataviz.toDate(primaryAxis.max)
                );
            }

            if (categoriesLength > 0) {
                var selection = chart._selection = new Selection(chart.element, navigatorAxis, {
                    // TODO: Accept dates for start and end
                    start: start,
                    end: end,
                    min: 0,
                    max: navigatorAxis.options.categories.length - 1,
                    snap: true,
                    select: $.proxy(chart._navigatorSelect, chart)
                });
            }
        },

        _navigatorSelect: function(e) {
            var chart = this,
                navigatorAxis = chart._plotArea.namedCategoryAxes[NAVIGATOR_AXIS],
                // TODO: Control all slave axes
                primaryAxis = chart._plotArea.options.categoryAxis[0],
                panes = chart._plotArea.panes;

            // TODO: Provide less awkward way to update axis options
            // TODO: Return start and end date
            primaryAxis.min = navigatorAxis.options.categories[e.start];
            primaryAxis.max = navigatorAxis.options.categories[e.end];
            chart._plotArea.redrawPane(panes[0]);
            //chart._plotArea.redrawPane(panes[1]);
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
                dataviz.lteDateIndex(
                    navigatorAxis.options.categories,
                    rangeStart
                ),
                dataviz.lteDateIndex(
                    navigatorAxis.options.categories,
                    rangeEnd
            ));
        }
    });

    // Exports ================================================================

    dataviz.ui.plugin(StockChart);

    deepExtend(dataviz, {
    });

})(jQuery);
