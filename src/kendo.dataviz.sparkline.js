kendo_module({
    id: "sparkline",
    name: "Sparkline",
    category: "dataviz",
    description: "Sparkline widget.",
    depends: [ "chart" ]
});

(function ($, undefined) {
    // Imports ================================================================
    var kendo = window.kendo,
        Class = kendo.Class,
        Observable = kendo.Observable,
        deepExtend = kendo.deepExtend,
        math = Math,
        proxy = $.proxy,

        dataviz = kendo.dataviz,
        template = kendo.template,
        defined = dataviz.defined,
        Chart = dataviz.ui.Chart,
        last = dataviz.last,
        renderTemplate = dataviz.renderTemplate;

    // Constants =============================================================
    var CSS_PREFIX = "k-";

    // Sparkline =============================================================
    var Sparkline = Chart.extend({
        init: function(element, options) {
            var chart = this;

            Chart.fn.init.call(chart, element, options);

            chart.element.addClass(CSS_PREFIX + "sparkline");
        },

        options: {
            name: "Sparkline",
            axisDefaults: {
                valueAxis: {
                    narrowRange: true
                }
            },
            valueAxis: {
                visible: false
            },
            tooltip: {
                visible: true
            },
            legend: {
                visible: false
            }
        },

        _getModel: function() {
            var chart = this,
                model = Chart.fn._getModel.call(chart);

            model.options.inline = true;

            return model;
        }
    });

    // Exports ================================================================

    dataviz.ui.plugin(Sparkline);

    deepExtend(dataviz, {
    });

})(window.kendo.jQuery);
