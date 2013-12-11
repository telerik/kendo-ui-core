(function() {
    var dataviz = kendo.dataviz,
        deepExtend = kendo.deepExtend,
        Sparkline = dataviz.ui.Sparkline;

    (function() {
        var sparkline,
            plotArea,
            liveSeries;

        function createSparkline(options) {
            destroySparkline();

            var div = $("<div id='container' />").appendTo(QUnit.fixture);
            sparkline = div.kendoSparkline(options).data("kendoSparkline");
            liveSeries = sparkline._plotArea.charts[0].options.series
        }

        function destroySparkline() {
            if (sparkline) {
                sparkline.destroy();
                sparkline.element.remove();
                sparkline = null;
            }
        }

        // ------------------------------------------------------------
        module("Data Binding / Array", {
            setup: function() {
                createSparkline([1, 2]);
            },
            teardown: destroySparkline
        });

        test("array is used to initialize series data", function() {
            equal(sparkline.options.seriesDefaults.data.length, 2);
        });

        test("observable array is used to initialize series data", function() {
            createSparkline(new kendo.data.ObservableArray([1, 2]));
            equal(sparkline.options.seriesDefaults.data.length, 2);
        });

        test("default series are created", function() {
            equal(sparkline.options.series.length, 1);
        });

        test("default series are bound to array items", function() {
            equal(liveSeries[0].data.length, 2);
        });

        test("number is encapsulated in array", function() {
            createSparkline(1);
            equal(liveSeries[0].data[0], 1);
        });

        // ------------------------------------------------------------
        module("Data Binding / Data", {
            setup: function() {
                createSparkline({
                    data: [1, 2]
                });
            },
            teardown: destroySparkline
        });

        test("default series are created", function() {
            equal(sparkline.options.series.length, 1);
        });

        test("default series are bound to array items", function() {
            equal(liveSeries[0].data.length, 2);
        });

        test("default series inherit seriesDefaults options", function() {
            createSparkline({
                seriesDefaults: {
                    field: "value"
                }
            });

            equal(sparkline.options.series[0].field, "value");
        });

        test("number is encapsulated in array", function() {
            createSparkline({
                data: 1
            });
            equal(liveSeries[0].data[0], 1);
        });

        // ------------------------------------------------------------
        module("Data Binding / Data Source / Implicit series", {
            setup: function() {
                createSparkline({
                    seriesDefaults: {
                        field: "value"
                    },
                    dataSource: new kendo.data.DataSource({
                        data: [{ value: 1 }, { value: 2 }]
                    })
                });
            },
            teardown: destroySparkline
        });

        test("default series are created", function() {
            equal(sparkline.options.series.length, 1);
        });

        test("default series are bound to existing data source", function() {
            equal(sparkline.options.series[0].data.length, 2);
        });

        // ------------------------------------------------------------
        module("Data Binding / Data Source / Explicit series", {
            setup: function() {
                createSparkline({
                    dataSource: [{ value: 1 }, { value: 2 }],
                    series: [{
                        field: "value"
                    }]
                });
            },
            teardown: destroySparkline
        });

        test("default series are not created", function() {
            equal(sparkline.options.series.length, 1);
        });

        test("series are data bound", function() {
            equal(sparkline.options.series[0].data.length, 2);
        });

        test("series are bound to existing data source", function() {
            createSparkline({
                dataSource: new kendo.data.DataSource({
                    data: [{ value: 1 }, { value: 2 }],
                }),
                series: [{
                    field: "value"
                }]
            });

            equal(sparkline.options.series[0].data.length, 2);
        });

    })();
})();
