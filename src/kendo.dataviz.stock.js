(function ($, undefined) {
    // Imports ================================================================
    var kendo = window.kendo,
        Widget = kendo.ui.Widget,
        deepExtend = kendo.deepExtend,

        dataviz = kendo.dataviz,
        Chart = dataviz.ui.Chart,
        Selection = dataviz.Selection;

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
        },

        _applyDefaults: function(options, themeOptions) {
            var chart = this,
                width = chart.element.width() || dataviz.DEFAULT_WIDTH;

            console.log(width / AUTO_CATEGORY_WIDTH)
            var stockDefaults = {
                categoryAxis: {
                    type: "date",
                    baseUnit: "fit",
                    // TODO: Place in last pane automatically?
                    // TODO: Fix missing gridlines
                    maxDateGroups: Math.floor(width / AUTO_CATEGORY_WIDTH)
                }
            };

            if (themeOptions) {
                deepExtend(themeOptions, stockDefaults);
            }

            Chart.fn._applyDefaults.call(chart, options, themeOptions);
        },

        options: {
            name: "StockChart"
        },

        _redraw: function() {
            var chart = this;

            Chart.fn._redraw.call(chart);

            var navigatorAxis = chart._plotArea.namedCategoryAxes[NAVIGATOR_AXIS];
            var categoriesLength = navigatorAxis.options.categories.length;
            if (categoriesLength > 0) {
                var selection = new Selection(chart.element, navigatorAxis, {
                    start: 0,
                    end: navigatorAxis.options.categories.length,
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
            primaryAxis.min = navigatorAxis.options.categories[e.start];
            primaryAxis.max = navigatorAxis.options.categories[e.end];
            chart._plotArea.redrawPane(panes[0]);
            //chart._plotArea.redrawPane(panes[1]);
        }
    });

    // Exports ================================================================

    dataviz.ui.plugin(StockChart);

    deepExtend(dataviz, {
    });

})(jQuery);
