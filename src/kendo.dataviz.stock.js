(function ($, undefined) {
    // Imports ================================================================
    var kendo = window.kendo,
        Widget = kendo.ui.Widget,
        deepExtend = kendo.deepExtend,

        dataviz = kendo.dataviz,
        Chart = dataviz.ui.Chart;

    // Constants =============================================================
    var AUTO_CATEGORY_WIDTH = 36,
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

            var stockDefaults = {
                categoryAxis: {
                    type: "date",
                    baseUnit: "fit",
                    // TODO: Place in last pane automatically
                    // TODO: Fix missing gridlines
                    pane: "volume",
                    // TODO: How to avoid label overlaps!?
                    // Perhaps we can query the label width and set step accordingly?
                    //labels: { step: 2 },
                    maxDateGroups: width / AUTO_CATEGORY_WIDTH
                }
            };

            Chart.fn._applyDefaults.call(chart, options, deepExtend(themeOptions, stockDefaults));
        },

        options: {
            name: "StockChart"
        }
    });

    // Exports ================================================================

    dataviz.ui.plugin(StockChart);

    deepExtend(dataviz, {
    });

})(jQuery);
