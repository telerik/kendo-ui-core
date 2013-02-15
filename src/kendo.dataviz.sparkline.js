kendo_module({
    id: "sparkline",
    name: "Sparkline",
    category: "dataviz",
    description: "Sparkline widgets.",
    depends: [ "chart" ]
});

(function ($, undefined) {
    // Imports ===============================================================
    var kendo = window.kendo,
        dataviz = kendo.dataviz,

        Chart = dataviz.ui.Chart,
        ObservableArray = kendo.data.ObservableArray,

        deepExtend = kendo.deepExtend,
        isArray = $.isArray,
        math = Math;

    // Constants =============================================================
    var CSS_PREFIX = "k-";

    // Sparkline =============================================================
    var Sparkline = Chart.extend({
        init: function(element, options) {
            var chart = this;

            options = options || {};

            if (isArray(options) || options instanceof ObservableArray) {
                options = { dataSource: options };
            }

            options = deepExtend({
                    series: [{ field: "*" }]
                },options, {
                    seriesDefaults: {
                        type: options.type
                    }
            });

            Chart.fn.init.call(chart, element, options);

            chart.element.addClass(CSS_PREFIX + "sparkline");
        },

        options: {
            name: "Sparkline",
            chartArea: {
                margin: 2
            },
            axisDefaults: {
                visible: false,
                majorGridLines: {
                    visible: false
                },
                valueAxis: {
                    narrowRange: true
                }
            },
            seriesDefaults: {
                autoBind: true,
                type: "line",
                area: {
                    line: {
                        width: 0.5
                    },
                    width: 1,
                    markers: {
                        border: {
                            width: 0
                        },
                        background: "red",
                        size: 2,
                        visible: true
                    }
                },
                line: {
                    width: 0.5,
                    markers: {
                        border: {
                            width: 0
                        },
                        background: "red",
                        size: 2
                    }
                },
                column: {
                    overlay: {
                        gradient: null
                    }
                }
            },
            tooltip: {
                shared: true,
                visible: true
            },
            categoryAxis: {
                crosshair: {
                    visible: true,
                    tooltip: {
                        visible: false
                    }
                }
            },
            legend: {
                visible: false
            },
            transitions: false,
            pointWidth: 5
        },

        _modelOptions: function() {
            var chart = this,
                chartOptions = chart.options,
                options,
                element = chart.element;

            if (element[0].innerHTML === "") {
                element[0].innerHTML = "&nbsp;";
            }

            options = deepExtend({
                width: chart._width(),
                height: element.innerHeight(),
                transitions: chartOptions.transitions
            }, chartOptions.chartArea, {
                inline: true,
                align: false
            });

            element.css({
                width: options.width,
                height: options.height
            });

            return options;
        },

        _width: function() {
            var chart = this,
                options = chart.options,
                series = options.series,
                dsTotal = chart.dataSource.total(),
                seriesTotal = 0,
                i,
                currentSeries;

            for (i = 0; i < series.length; i++) {
                currentSeries = series[i];
                if (currentSeries.data) {
                    seriesTotal = math.max(seriesTotal, currentSeries.data.length);
                }
            }

            return math.max(dsTotal, seriesTotal) * options.pointWidth;
        }
    });

    // Exports ================================================================

    dataviz.ui.plugin(Sparkline);

    deepExtend(dataviz, {
    });

})(window.kendo.jQuery);
