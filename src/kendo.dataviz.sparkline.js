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
                visible: false
            },
            legend: {
                visible: false
            }
        },

        _modelOptions: function() {
            var chart = this,
                options = Chart.fn._modelOptions.call(chart),
                element = chart.element;

            options.inline = true;

            // TODO: Container width or computed
            options.width = 80;
            // TODO: Container height or default
            options.height = 20;

            element.css({
                width: options.width,
                height: options.height
            });

            return options;
        }
    });

    // Exports ================================================================

    dataviz.ui.plugin(Sparkline);

    deepExtend(dataviz, {
    });

})(window.kendo.jQuery);
