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
        SharedTooltip = dataviz.SharedTooltip,

        deepExtend = kendo.deepExtend,
        isArray = $.isArray,
        math = Math;

    // Constants =============================================================
    var CSS_PREFIX = "k-";

    // Sparkline =============================================================
    var Sparkline = Chart.extend({
        init: function(element, userOptions) {
            var chart = this,
                stage = chart.stage = $("<span />"),
                options = userOptions || {},
                defaults;

            element = $(element)
                .empty()
                .addClass(CSS_PREFIX + "sparkline")
                .append(stage);

            chart._initialWidth = math.floor(element.width());

            if (isArray(options)) {
                options = { seriesDefaults: { data: options } };
            } else if (options instanceof ObservableArray) {
                options = { dataSource: options };
            }

            options.series = options.series || [{}];
            defaults = options.seriesDefaults = options.seriesDefaults || {};
            if (options.type) {
                defaults.type = options.type;
            }

            if (options.data) {
                defaults.data = options.data;
            }

            Chart.fn.init.call(chart, element, options);
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
                        size: 2,
                        visible: false
                    }
                },
                line: {
                    width: 0.5,
                    markers: {
                        border: {
                            width: 0
                        },
                        size: 2,
                        visible: false
                    }
                },
                bar: {
                    overlay: {
                        gradient: null
                    },
                    border: {
                        width: 0
                    }
                },
                column: {
                    overlay: {
                        gradient: null
                    },
                    border: {
                        width: 0
                    }
                }
            },
            tooltip: {
                visible: true,
                shared: true
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

        _getModel: function() {
            var chart = this,
                series = chart.options.series,
                i,
                currentSeries;

            for (i = 0; i < series.length; i++) {
                currentSeries = series[i];

                if (currentSeries.type === "bar") {
                    currentSeries.type = "column";
                }
            }

            return Chart.fn._getModel.call(chart);
        },

        _modelOptions: function() {
            var chart = this,
                chartOptions = chart.options,
                options,
                width = chart._initialWidth,
                stage = chart.stage;

            chart.stage[0].innerHTML = "&nbsp;";

            options = deepExtend({
                width: width ? width : chart._autoWidth(),
                height: stage.height(),
                transitions: chartOptions.transitions
            }, chartOptions.chartArea, {
                inline: true,
                align: false
            });

            stage.css({
                width: options.width,
                height: options.height
            });

            return options;
        },

        _createTooltip: function() {
            var chart = this,
                options = chart.options,
                element = chart.element,
                tooltip;

            if (options.tooltip.shared) {
                tooltip = new SparklineSharedTooltip(element, chart._plotArea, options.tooltip);
            } else {
                tooltip = Chart.fn._createTooltip.call(chart);
            }

            return tooltip;
        },

        _renderView: function() {
            var chart = this;
            chart.element.empty().append(chart.stage);
            return chart._view.renderTo(chart.stage[0]);
        },

        _autoWidth: function() {
            var chart = this,
                options = chart.options,
                margin = dataviz.getSpacing(options.chartArea.margin),
                series = options.series,
                dsTotal = chart.dataSource.total(),
                seriesTotal = 0,
                width,
                i,
                currentSeries;

            for (i = 0; i < series.length; i++) {
                currentSeries = series[i];
                if (currentSeries.data) {
                    seriesTotal = math.max(seriesTotal, currentSeries.data.length);
                }
            }

            width = math.max(dsTotal, seriesTotal) * options.pointWidth;
            if (width > 0) {
                width += margin.left + margin.right;
            }

            return width;
        }
    });

    var SparklineSharedTooltip = SharedTooltip.extend({
        options: {
            animation: {
                duration: 0
            }
        },
        _anchor: function(point, slot) {
            var anchor = SharedTooltip.fn._anchor.call(this, point, slot);
            anchor.y = -this.element.height() - this.options.offset;

            return anchor;
        },

        _hideElement: function() {
            this.element.hide();
        }
    });

    // Exports ================================================================

    dataviz.ui.plugin(Sparkline);

    deepExtend(dataviz, {
    });

})(window.kendo.jQuery);
