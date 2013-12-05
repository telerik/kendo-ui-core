(function() {
    var dataviz = kendo.dataviz,
        deepExtend = kendo.deepExtend,
        StockChart = dataviz.ui.StockChart;

    (function() {
        var chart,
            plotArea;

        function createStockChart(options) {
            var div = $("<div id='container' />").appendTo(QUnit.fixture);
            chart = div.kendoStockChart(options).data("kendoStockChart");
        }

        function destroyChart() {
            var element = $("#container");
            kendo.destroy(element);
            element.unbind().empty();
        }

        // ------------------------------------------------------------
        module("Options / Defaults", {
            setup: function() {
                createStockChart({ });
            },
            teardown: destroyChart
        });

        test("tooltip is visible by default", function() {
            ok(chart.options.tooltip.visible);
        });

        test("legend is not visible by default", function() {
            ok(!chart.options.legend.visible);
        });

        // ------------------------------------------------------------
        module("Options / Date Field", {
            setup: function() {
                createStockChart({
                    navigator: {
                        series: { }
                    }
                });
            },
            teardown: destroyChart
        });

        test("default series categoryField is 'date'", function() {
            equal(chart.options.series[0].categoryField, "date");
        });

        test("dateField is applied as default categoryField", function() {
            createStockChart({ dateField: "d", navigator: { series: { } } });
            equal(chart.options.series[0].categoryField, "d");
        });

        test("default categoryField is applied", function() {
            createStockChart({
                seriesDefaults: {
                    categoryField: "d"
                },
                navigator: {
                    series: {}
                }
            });
            equal(chart.options.series[0].categoryField, "d");
        });

        asyncTest("navigator categoryField is inherited from the chart", function() {
            createStockChart({
                dateField: "Date",
                dataSource: {
                    data: [{
                            Date: new Date("2012/09/01"),
                            Sales: 100
                        }]
                },
                navigator: {
                    dataSource: {
                        data: [{
                            Date: new Date("2012/09/01"),
                            Volume: 100
                        }]
                    },
                    series: [{
                        field: "Volume"
                    }]
                }
            });

            setTimeout(function() {
                equal(chart.options.series[0].categoryField, "Date");
                start();
            }, 50);
        });

        asyncTest("navigator date field can be overriden", function() {
            createStockChart({
                dateField: "date",
                dataSource: {
                    data: [{
                            date: new Date("2012/09/01"),
                            Sales: 100
                        }]
                },
                navigator: {
                    dateField: "Date",
                    dataSource: {
                        data: [{
                            Date: new Date("2012/09/01"),
                            Volume: 100
                        }]
                    },
                    series: [{
                        field: "Volume"
                    }]
                }
            });

            setTimeout(function() {
                equal(chart.options.series[0].categoryField, "Date");
                start();
            }, 50);
        });

        // ------------------------------------------------------------
        module("Options / Navigator");

        asyncTest("autoBind is inherited from the chart", function() {
            createStockChart({
                autoBind: false,
                navigator: {
                    dataSource: {
                        data: {
                            date: new Date("2012/09/01"),
                            volume: 1
                        }
                    },
                    series: {
                        field: "volume"
                    }
                }
            });

            setTimeout(function() {
                equal(chart.options.series[0].data.length, 0);
                start();
            }, 50);
        });

        asyncTest("autoBind can be overriden", function() {
            createStockChart({
                autoBind: false,
                navigator: {
                    dataSource: {
                        data: [{
                            date: new Date("2012/09/01"),
                            volume: 1
                        }]
                    },
                    autoBind: true,
                    series: [{
                        field: "volume"
                    }]
                }
            });

            setTimeout(function() {
                equal(chart.options.series[0].data.length, 1);
                start();
            }, 50);
        });

        test("roundToBaseUnit is set to true for equally sized series", function() {
            createStockChart({
                navigator: {
                    series: [{
                        type: "column"
                    }]
                }
            });

            $.each(chart._plotArea.axes, function(i, a) {
                if (a instanceof dataviz.CategoryAxis && a.options.pane === "_navigator") {
                    equal(a.options.roundToBaseUnit, true);
                }
            });
        });

        test("justified is set to false for equally sized series", function() {
            createStockChart({
                navigator: {
                    series: [{
                        type: "column"
                    }]
                }
            });

            $.each(chart._plotArea.axes, function(i, a) {
                if (a instanceof dataviz.CategoryAxis && a.options.pane === "_navigator") {
                    equal(a.options.justified, false);
                }
            });
        });

        // ------------------------------------------------------------
        var support = deepExtend({}, kendo.support);
        module("Navigator / Live drag", {
            setup: function() {
                createStockChart({ navigator: { dataSource: null } });
            },
            teardown: function() {
                kendo.support = deepExtend({}, support);
            }
        });

        test("disabled on touch", function() {
            kendo.support.touch = true;
            ok(!chart._navigator._liveDrag());
        });

        test("disabled on firefox", function() {
            kendo.support.browser.mozilla = true;
            ok(!chart._navigator._liveDrag());
        });

        test("disabled on old IEs", function() {
            kendo.support.browser.msie = true;
            kendo.support.browser.version = 8;
            ok(!chart._navigator._liveDrag());
        });

        test("enabled on everything else", function() {
            kendo.support.touch = false;
            kendo.support.browser.mozilla = false;
            kendo.support.browser.version = 9;
            ok(chart._navigator._liveDrag());
        });
    })();
})();
