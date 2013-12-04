(function() {
    var dataviz = kendo.dataviz,
        Chart = dataviz.ui.Chart;

    var chart,
        plotArea;

    function setupChart(options) {
        chart = createChart(options);

        plotArea = chart._model.children[1];
    }

    function createBarChart(options) {
        setupChart($.extend({
            series: [{
                type: "bar",
                data: [1, 2]
            }]
        }, options));
    }

    function createScatterChart(options) {
        setupChart($.extend({
            series: [{
                type: "scatter",
                data: [[1, 1]]
            }]
        }, options));
    }

    // ------------------------------------------------------------
    var viewFactory;
    module("Views / View Factory", {
        setup: function() {
            viewFactory = new dataviz.ViewFactory;
        }
    });

    test("registers views in ascending order", function() {
        viewFactory.register("bar", Object, 1);
        viewFactory.register("foo", Object, 0);

        equal(viewFactory._views[0].name, "foo");
    });

    test("instantiates view with options", function() {
        viewFactory.register("foo", function(options) { ok(options.bar); }, 0);

        viewFactory.create({ bar: true });
    });

    test("instantiates default view", function() {
        viewFactory.register("foo", function() { ok(true); }, 0);
        viewFactory.register("bar", Object, 1);

        viewFactory.create();
    });

    test("instantiates preferred view", function() {
        viewFactory.register("foo", Object, 0);
        viewFactory.register("bar", function() { ok(true); }, 1);

        viewFactory.create({}, "bar");
    });

    test("ignores case of preferred view", function() {
        viewFactory.register("foo", Object, 0);
        viewFactory.register("bar", function() { ok(true); }, 1);

        viewFactory.create({}, "Bar");
    });

    test("instantiates default view if the preferred is unavailable", function() {
        viewFactory.register("foo", function() { ok(true); }, 0);
        viewFactory.register("bar", Object, 1);

        viewFactory.create({}, "baz");
    });

    asyncTest("logs warning if no views are registered", 1, function() {
        stubMethod(kendo, "logToConsole", function(message) {
            ok(message.indexOf("Warning: KendoUI DataViz cannot render.") > -1);
            start();
        }, function() {
            viewFactory.create();
        });
    });

    // ------------------------------------------------------------
    module("Views", {
        setup: function() {
            setupChart();
        },
        teardown: function() {
            destroyChart();
        }
    });

    test("sets dimensions on view element", 2, function() {
        var chart = $("<div id='container' />").kendoChart().data("kendoChart");
        var view = chart._view;
        equal(view.options.width, 600);
        equal(view.options.height, 400);
    });

    asyncTest("uses preferred view specified in 'renderAs'", 1, function() {
        stubMethod(dataviz.ViewFactory.prototype, "create", function(options, preferred) {
            equal(preferred, "foo");
            start();
        }, function() {
            setupChart({ renderAs: "foo" });
        });
    });

    // ------------------------------------------------------------
    module("Category Axis Configuration", {
        teardown: function() {
            destroyChart();
        }
    });

    test("categories are set", function() {
        setupChart({
            categoryAxis: {
                categories: ["Alpha", "Beta", "Charlie"]
            }
        });

        deepEqual(plotArea.categoryAxis.options.categories,
             chart.options.categoryAxis.categories);
    });

    test("category axis is rendered horizontally by default", function() {
        setupChart();
        ok(plotArea.categoryAxis instanceof dataviz.CategoryAxis);
    });

    test("categories are empty by default", function() {
        setupChart();

        equal(plotArea.categoryAxis.options.categories.length, 0);
    });

    test("global color is applied to line", function() {
        setupChart({
            categoryAxis: {
                color: "#f00"
            }
        });

        equal(plotArea.categoryAxis.options.line.color, "#f00");
    });

    test("line color overrides global color", function() {
        setupChart({
            categoryAxis: {
                color: "#0f0", line: { color: "#f00" }
            }
        });

        equal(plotArea.categoryAxis.options.line.color, "#f00");
    });

    test("global color is applied to labels", function() {
        setupChart({
            categoryAxis: {
                color: "#f00"
            }
        });

        equal(plotArea.categoryAxis.options.labels.color, "#f00");
    });

    test("labels color overrides global color", function() {
        setupChart({
            categoryAxis: {
                color: "#0f0", labels: { color: "#f00" }
            }
        });

        equal(plotArea.categoryAxis.options.labels.color, "#f00");
    });

    test("categoryAxes alias overrides categoryAxis", function() {
        setupChart({
            categoryAxis: {},
            categoryAxes: [{
                flag: true
            }]
        });

        ok(plotArea.categoryAxis.options.flag);
    });

    test("valueAxes alias overrides valueAxis", function() {
        setupChart({
            valueAxis: {},
            valueAxes: [{
                flag: true
            }]
        });

        ok(plotArea.valueAxis.options.flag);
    });

    test("xAxes alias overrides xAxis", function() {
        setupChart({
            xAxis: {},
            xAxes: [{
                flag: true
            }],
            series: [{ type: "scatterLine" }]
        });

        ok(plotArea.axisX.options.flag);
    });

    test("yAxes alias overrides yAxis", function() {
        setupChart({
            yAxis: {},
            yAxes: [{
                flag: true
            }],
            series: [{ type: "scatterLine" }]
        });

        ok(plotArea.axisY.options.flag);
    });

    // ------------------------------------------------------------
    module("Value Axis Configuration", {
        teardown: function() {
            destroyChart();
        }
    });

    test("default value axis type is numeric", function() {
        setupChart();
        equal(plotArea.valueAxis.options.type, "numeric");
    });

    test("value axis is rendered vertically by default", function() {
        setupChart();
        ok(plotArea.valueAxis instanceof dataviz.NumericAxis);
    });

    test("global color is applied to line", function() {
        setupChart({
            valueAxis: {
                color: "#f00"
            }
        });

        equal(plotArea.valueAxis.options.line.color, "#f00");
    });

    test("line color overrides global color", function() {
        setupChart({
            valueAxis: {
                color: "#0f0", line: { color: "#f00" }
            }
        });

        equal(plotArea.valueAxis.options.line.color, "#f00");
    });

    test("global color is applied to labels", function() {
        setupChart({
            valueAxis: {
                color: "#f00"
            }
        });

        equal(plotArea.valueAxis.options.labels.color, "#f00");
    });

    test("labels color overrides global color", function() {
        setupChart({
            valueAxis: {
                color: "#0f0", labels: { color: "#f00" }
            }
        });

        equal(plotArea.valueAxis.options.labels.color, "#f00");
    });

    test("global color is applied to title", function() {
        setupChart({
            valueAxis: {
                color: "#f00"
            }
        });

        equal(plotArea.valueAxis.options.title.color, "#f00");
    });

    test("title color overrides global color", function() {
        setupChart({
            valueAxis: {
                color: "#0f0", title: { color: "#f00" }
            }
        });

        equal(plotArea.valueAxis.options.title.color, "#f00");
    });

    // ------------------------------------------------------------
    module("Axis Configuration / Scatter Chart", {
        teardown: function() {
            destroyChart();
        }
    });

    test("xAxis settings are applied to primary X Axis", function() {
        createScatterChart({ xAxis: { min: 100 } });
        deepEqual(plotArea.axisX.options.min, 100);
    });

    test("xAxis can't be set to vertical", function() {
        createScatterChart({ xAxis: { vertical: true } });
        deepEqual(plotArea.axisX.options.vertical, false);
    });

    test("yAxis settings are applied to primary Y Axis", function() {
        createScatterChart({ yAxis: { min: 100 } });
        deepEqual(plotArea.axisY.options.min, 100);
    });

    test("yAxis can't be set to horizontal", function() {
        createScatterChart({ yAxis: { vertical: false } });
        deepEqual(plotArea.axisY.options.vertical, true);
    });

    // ------------------------------------------------------------
    module("Axis defaults", {
        teardown: function() {
            destroyChart();
        }
    });

    test("axisDefaults are applied to categoryAxis", function() {
        setupChart({
            axisDefaults: {
                flag: true
            }
        });

        ok(chart.options.categoryAxis.flag === true);
    });

    test("axisDefaults.categoryAxis are applied to categoryAxis", function() {
        setupChart({
            axisDefaults: {
                categoryAxis: {
                    flag: true
                }
            }
        });

        ok(chart.options.categoryAxis.flag === true);
    });

    test("axisDefaults options are applied to categoryAxes", function() {
        setupChart({
            axisDefaults: {
                flag: true
            },
            categoryAxes: [{ local: true }]
        });

        ok(plotArea.categoryAxis.options.flag && plotArea.categoryAxis.options.local);
    });

    test("axisDefaults.categoryAxis are applied to categoryAxes", function() {
        setupChart({
            axisDefaults: {
                categoryAxis: {
                    flag: true
                }
            },
            categoryAxes: [{ local: true }]
        });

        ok(plotArea.categoryAxis.options.flag && plotArea.categoryAxis.options.local);
    });

    test("axisDefaults are applied to valueAxis", function() {
        setupChart({
            axisDefaults: {
                flag: true
            }
        });

        ok(chart.options.valueAxis.flag === true);
    });

    test("axisDefaults.valueAxis are applied to valueAxis", function() {
        setupChart({
            axisDefaults: {
                valueAxis: {
                    flag: true
                }
            }
        });

        ok(chart.options.valueAxis.flag === true);
    });

    test("axisDefaults are applied to all value axes", function() {
        setupChart({
            axisDefaults: {
                flag: true
            },
            valueAxis: [{ }, { name: "secondary" }]
        });

        ok(chart.options.valueAxis[0].flag === true);
        ok(chart.options.valueAxis[1].flag === true);
    });

    test("axisDefaults options are applied to valueAxes", function() {
        setupChart({
            axisDefaults: {
                flag: true
            },
            valueAxes: [{ local: true }]
        });

        ok(plotArea.valueAxis.options.flag && plotArea.valueAxis.options.local);
    });

    test("axisDefaults.valueAxis options are applied to valueAxes", function() {
        setupChart({
            axisDefaults: {
                valueAxis: {
                    flag: true
                }
            },
            valueAxes: [{ local: true }]
        });

        ok(plotArea.valueAxis.options.flag && plotArea.valueAxis.options.local);
    });

    test("axisDefaults are applied to xAxis", function() {
        setupChart({
            axisDefaults: {
                flag: true
            }
        });

        ok(chart.options.xAxis.flag === true);
    });

    test("axisDefaults are applied to yAxis", function() {
        setupChart({
            axisDefaults: {
                flag: true
            }
        });

        ok(chart.options.yAxis.flag === true);
    });

    test("axisDefaults options are applied to xAxes", function() {
        setupChart({
            axisDefaults: {
                flag: true
            },
            xAxes: [{ local: true }],
            series: [{ type: "scatterLine" }]
        });

        ok(plotArea.axisX.options.flag && plotArea.axisX.options.local);
    });

    test("axisDefaults options are applied to yAxes", function() {
        setupChart({
            axisDefaults: {
                flag: true
            },
            yAxes: [{ local: true }],
            series: [{ type: "scatterLine" }]
        });

        ok(plotArea.axisY.options.flag && plotArea.axisY.options.local);
    });

    test("categoryAxis settings override axisDefaults settings", function() {
        setupChart({
            axisDefaults: {
                flag: false
            },
            categoryAxis: {
                flag: true
            }
        });

        ok(chart.options.categoryAxis.flag === true);
    });

    test("valueAxis settings override axisDefaults settings", function() {
        setupChart({
            axisDefaults: {
                flag: false
            },
            valueAxis: {
                flag: true
            }
        });

        ok(chart.options.valueAxis.flag === true);
    });

    test("xAxis settings override axisDefaults settings", function() {
        setupChart({
            axisDefaults: {
                flag: false
            },
            xAxis: {
                flag: true
            }
        });

        ok(chart.options.xAxis.flag === true);
    });

    test("yAxis settings override axisDefaults settings", function() {
        setupChart({
            axisDefaults: {
                flag: false
            },
            yAxis: {
                flag: true
            }
        });

        ok(chart.options.yAxis.flag === true);
    });

    test("axisDefaults override theme base", function() {
        dataviz.ui.themes.test = {
            chart: {
                categoryAxis: {
                    flag: true
                }
            }
        };

        setupChart({
            theme: "test",
            axisDefaults: {
                flag: false
            }
        });

        ok(chart.options.categoryAxis.flag === false);
    });

    test("axisDefaults override theme with specific type", function() {
        dataviz.ui.themes.test = {
            chart: {
                axisDefaults: {
                    categoryAxis: {
                        flag: true
                    }
                }
            }
        };

        setupChart({
            theme: "test",
            categoryAxis: {
                flag: false
            }
        });

        ok(chart.options.categoryAxis.flag === false);
    });

    // ------------------------------------------------------------
    var plotAreaConfig = [{
            series: "bar",
            plotArea: dataviz.CategoricalPlotArea,
            chart: dataviz.BarChart
        }, {
            series: "column",
            plotArea: dataviz.CategoricalPlotArea,
            chart: dataviz.BarChart
        }, {
            series: "line",
            plotArea: dataviz.CategoricalPlotArea,
            chart: dataviz.LineChart
        }, {
            series: "verticalLine",
            plotArea: dataviz.CategoricalPlotArea,
            chart: dataviz.LineChart
        }, {
            series: "area",
            plotArea: dataviz.CategoricalPlotArea,
            chart: dataviz.AreaChart
        }, {
            series: "verticalArea",
            plotArea: dataviz.CategoricalPlotArea,
            chart: dataviz.AreaChart
        }, {
            series: "pie",
            plotArea: dataviz.PiePlotArea,
            chart: dataviz.PieChart
        }, {
            series: "scatter",
            plotArea: dataviz.XYPlotArea,
            chart: dataviz.ScatterChart
        }, {
            series: "scatterLine",
            plotArea: dataviz.XYPlotArea,
            chart: dataviz.ScatterLineChart
        }
    ];

    module("Plot Area", {
        teardown: function() {
            destroyChart();
        }
    });

    test("Initialization and chart creation", function() {
        for (var i = 0; i < plotAreaConfig.length; i++) {
            var config = plotAreaConfig[i];

            setupChart({
                series: [{ type: config.series }]
            });

            ok( plotArea instanceof config.plotArea,
                "PlotArea type for '" + config.series + "' series");

            ok( plotArea.charts[0] instanceof config.chart,
                "Series of type '" + config.series + "' added to plot area");
        }
    });

    // ------------------------------------------------------------
    module("Series defaults", {
        teardown: function() {
            destroyChart();
        }
    });

    test("default type is set to column", function() {
        setupChart({
            series: [{ }]
        });

        equal(chart.options.series[0].type, "column");
    });

    test("type is set", function() {
        setupChart({
            seriesDefaults: {
                type: "line"
            },
            series: [{ }]
        });

        equal(chart.options.series[0].type, "line");
    });

    test("tooltip is set", function() {
        setupChart({
            seriesDefaults: {
                tooltip: {
                    flag: true
                }
            },
            series: [{ }]
        });

        ok(chart.options.series[0].tooltip.flag);
    });

    test("tooltip override tooltip options", function() {
        setupChart({
            seriesDefaults: {
                tooltip: {
                    flag: true
                }
            },
            series: [{ }],
            tooltip: {
                flag: false
            }
        });

        ok(chart.options.series[0].tooltip.flag);
    });

    test("series colors are set", function() {
        setupChart({
            seriesColors: ["#fff", "#f00"],
            series: [{}, {}]
        });

        equal(chart.options.series[0].color, "#fff");
        equal(chart.options.series[1].color, "#f00");
    });

    test("series colors are preserved", function() {
        setupChart({
            seriesColors: ["#fff"],
            series: [{ color: "#000" }]
        });

        equal(chart.options.series[0].color, "#000");
    });

    test("series colors are reused", function() {
        setupChart({
            seriesColors: ["#f00"],
            series: [{}, {}]
        });

        equal(chart.options.series[0].color, "#f00");
        equal(chart.options.series[1].color, "#f00");
    });

    test("bar series defaults are applied", function() {
        setupChart({
            seriesDefaults: {
                bar: {
                    gap: 1
                }
            },
            series: [{ type: "bar" }]
        });

        equal(chart.options.series[0].gap, 1);
    });

    test("bar series defaults are not applied to other series", function() {
        setupChart({
            seriesDefaults: {
                bar: {
                    gap: 1
                }
            },
            series: [{ type: "line" }]
        });

        notEqual(chart.options.series[0].gap, 1);
    });

    test("bar series defaults are not copied in series", function() {
        setupChart({
            seriesDefaults: {
                bar: { }
            },
            series: [{ type: "bar" }]
        });

        ok(typeof(chart.options.series[0].bar) === "undefined");
    });

    test("column series defaults are applied", function() {
        setupChart({
            seriesDefaults: {
                column: {
                    gap: 1
                }
            },
            series: [{ type: "column" }]
        });

        equal(chart.options.series[0].gap, 1);
    });

    test("column series defaults are applied to series with default type", function() {
        setupChart({
            seriesDefaults: {
                column: {
                    gap: 1
                }
            },
            series: [{}]
        });

        equal(chart.options.series[0].gap, 1);
    });

    test("column series defaults are not applied to other series", function() {
        setupChart({
            seriesDefaults: {
                bar: {
                    gap: 1
                }
            },
            series: [{ type: "line" }]
        });

        notEqual(chart.options.series[0].gap, 1);
    });

    test("column series defaults are not copied in series", function() {
        setupChart({
            seriesDefaults: {
                column: { }
            },
            series: [{ type: "column" }]
        });

        ok(typeof(chart.options.series[0].column) === "undefined");
    });

    test("line series defaults are applied", function() {
        setupChart({
            seriesDefaults: {
                line: {
                    width: 2
                }
            },
            series: [{ type: "line" }]
        });

        equal(chart.options.series[0].width, 2);
    });

    test("line series defaults are not applied to other series", function() {
        setupChart({
            seriesDefaults: {
                line: {
                    width: 1
                }
            },
            series: [{ type: "bar" }]
        });

        notEqual(chart.options.series[0].width, 1);
    });

    test("line series defaults are not copied in series", function() {
        setupChart({
            seriesDefaults: {
                line: { }
            },
            series: [{ type: "line" }]
        });

        ok(typeof(chart.options.series[0].line) === "undefined");
    });

    test("verticalLine series defaults are applied", function() {
        setupChart({
            seriesDefaults: {
                verticalLine: {
                    width: 2
                }
            },
            series: [{ type: "verticalLine" }]
        });

        equal(chart.options.series[0].width, 2);
    });

    test("verticalLine series defaults are not applied to other series", function() {
        setupChart({
            seriesDefaults: {
                verticalLine: {
                    width: 1
                }
            },
            series: [{ type: "bar" }]
        });

        notEqual(chart.options.series[0].width, 1);
    });

    test("verticalLine series defaults are not copied in series", function() {
        setupChart({
            seriesDefaults: {
                verticalLine: { }
            },
            series: [{ type: "verticalLine" }]
        });

        ok(typeof(chart.options.series[0].verticalLine) === "undefined");
    });

    test("area series defaults are applied", function() {
        setupChart({
            seriesDefaults: {
                area: {
                    width: 2
                }
            },
            series: [{ type: "area" }]
        });

        equal(chart.options.series[0].width, 2);
    });

    test("area series defaults are not applied to other series", function() {
        setupChart({
            seriesDefaults: {
                area: {
                    width: 1
                }
            },
            series: [{ type: "bar" }]
        });

        notEqual(chart.options.series[0].width, 1);
    });

    test("area series defaults are not copied in series", function() {
        setupChart({
            seriesDefaults: {
                area: { }
            },
            series: [{ type: "area" }]
        });

        ok(typeof(chart.options.series[0].area) === "undefined");
    });

    test("verticalArea series defaults are applied", function() {
        setupChart({
            seriesDefaults: {
                verticalArea: {
                    width: 2
                }
            },
            series: [{ type: "verticalArea" }]
        });

        equal(chart.options.series[0].width, 2);
    });

    test("verticalArea series defaults are not applied to other series", function() {
        setupChart({
            seriesDefaults: {
                verticalArea: {
                    width: 1
                }
            },
            series: [{ type: "bar" }]
        });

        notEqual(chart.options.series[0].width, 1);
    });

    test("verticalArea series defaults are not copied in series", function() {
        setupChart({
            seriesDefaults: {
                verticalArea: { }
            },
            series: [{ type: "verticalArea" }]
        });

        ok(typeof(chart.options.series[0].verticalArea) === "undefined");
    });

    test("pie series defaults are applied", function() {
        setupChart({
            seriesDefaults: {
                pie: {
                    width: 2
                }
            },
            series: [{ type: "pie" }]
        });

        equal(chart.options.series[0].width, 2);
    });

    test("pie series defaults are not applied to other series", function() {
        setupChart({
            seriesDefaults: {
                pie: {
                    width: 1
                }
            },
            series: [{ type: "bar" }]
        });

        notEqual(chart.options.series[0].width, 1);
    });

    test("pie series defaults are not copied in series", function() {
        setupChart({
            seriesDefaults: {
                pie: { }
            },
            series: [{ type: "pie" }]
        });

        ok(typeof(chart.options.series[0].pie) === "undefined");
    });

    test("scatter series defaults are applied", function() {
        setupChart({
            seriesDefaults: {
                scatter: {
                    width: 2
                }
            },
            series: [{ type: "scatter" }]
        });

        equal(chart.options.series[0].width, 2);
    });

    test("scatter series defaults are not applied to other series", function() {
        setupChart({
            seriesDefaults: {
                scatter: {
                    width: 1
                }
            },
            series: [{ type: "bar" }]
        });

        notEqual(chart.options.series[0].width, 1);
    });

    test("scatter series defaults are not copied in series", function() {
        setupChart({
            seriesDefaults: {
                scatter: { }
            },
            series: [{ type: "scatter" }]
        });

        ok(typeof(chart.options.series[0].scatter) === "undefined");
    });

    test("scatterLine series defaults are applied", function() {
        setupChart({
            seriesDefaults: {
                scatterLine: {
                    width: 2
                }
            },
            series: [{ type: "scatterLine" }]
        });

        equal(chart.options.series[0].width, 2);
    });

    test("scatterLine series defaults are not applied to other series", function() {
        setupChart({
            seriesDefaults: {
                scatterLine: {
                    width: 1
                }
            },
            series: [{ type: "bar" }]
        });

        notEqual(chart.options.series[0].width, 1);
    });

    test("scatterLine series defaults are not copied in series", function() {
        setupChart({
            seriesDefaults: {
                scatterLine: { }
            },
            series: [{ type: "scatterLine" }]
        });

        ok(typeof(chart.options.series[0].scatterLine) === "undefined");
    });


    // ------------------------------------------------------------
    module("Title", {
        teardown: function() {
            destroyChart();
        }
    });

    test("text is set", function() {
        setupChart({
            title: {
                text: "My Title"
            }
        });

        equal(chart._model.children[0].options.text, "My Title");
    });

    test("text can be set directly", function() {
        setupChart({
            title: "My Title"
        });

        equal(chart._model.children[0].options.text, "My Title");
    });

    test("default font", function() {
        setupChart({
            title: {
                text: "My Title"
            }
        });

        equal(chart._model.children[0].options.font,
              "16px Arial,Helvetica,sans-serif");
    });

    test("font is set", function() {
        setupChart({
            title: {
                text: "My Title",
                font: "10pt Comic Sans"
            }
        });

        equal(chart._model.children[0].options.font,
              "10pt Comic Sans");
    });

    test("not created if no text is set", function() {
        setupChart({
            title: {
                text: ""
            }
        });
        ok(!(chart._model.children[0] instanceof dataviz.Title));
    });

    test("not created if no visible is false", function() {
        setupChart({
            title: {
                text: "Title",
                visible: false
            }
        });
        ok(!(chart._model.children[0] instanceof dataviz.Title));
    });

(function() {
    function setupChart(options, element) {
        if (!element) {
            element = $("<div id='container' />");
        }
        chart = element.kendoChart(options).data("kendoChart");
    }

    // ------------------------------------------------------------
    module("Size", {
        setup: function() {
            setupChart({}, $("<div id='container' />").width("100px").height("100px").show());
        },
        teardown: function() {
            kendo.destroy($("#container"));
            $("#container").empty();
        }
    });

    test("picks width from container", function() {
        equal(chart._model.options.width, 100);
    });

    test("picks height from container", function() {
        equal(chart._model.options.height, 100);
    });

    test("picks width from container on refresh", function() {
        setupChart({}, $("<div id='container' />").width("200px"));
        chart.refresh();

        equal(chart._model.options.width, 200);
    });

    test("picks width from container on redraw", function() {
        setupChart({}, $("<div id='container' />").width("200px"));
        chart.redraw();

        equal(chart._model.options.width, 200);
    });

    test("picks height from container on refresh", function() {
        setupChart({}, $("<div id='container' />").height("200px"));
        chart.refresh();

        equal(chart._model.options.height, 200);
    });

    test("picks height from container on redraw", function() {
        setupChart({}, $("<div id='container' />").height("200px"));
        chart.redraw();

        equal(chart._model.options.height, 200);
    });

    test("applies set width", function() {
        setupChart({ chartArea: { width: 200, height: 200 }});

        equal(chart._model.options.width, 200);
    });

    test("applies set height", function() {
        setupChart({ chartArea: { width: 200, height: 200 }});

        equal(chart._model.options.height, 200);
    });

    test("maintains set width after refresh", function() {
        setupChart({ chartArea: { width: 200, height: 200 }});
        chart.refresh();

        equal(chart._model.options.width, 200);
    });

    test("maintains set height after refresh", function() {
        setupChart({ chartArea: { width: 200, height: 200 }});
        chart.refresh();

        equal(chart._model.options.height, 200);
    });

    test("uses default width when none is available", function() {
        setupChart();

        equal(chart._model.options.width, 600);
    });

    test("uses default height when none is available", function() {
        setupChart();

        equal(chart._model.options.height, 400);
    });

    test("sets width on rootElement", function() {
        setupChart({ chartArea: { width: 200 } });

        equal(chart._model.options.width, 200);
    });

    test("sets height on rootElement", function() {
        setupChart({ chartArea: { height: 200 } });

        equal(chart._model.options.height, 200);
    });
})();


    // ------------------------------------------------------------
    module("Themes", {
        setup: function() {
            dataviz.ui.themes.test = {
                    chart: {
                    flag: true,
                    seriesColors: ["#f00", "#cf0"],
                    seriesDefaults: {
                        seriesDefaultsFlag: true,
                        scatter: {
                            flag: false
                        }
                    }
                }
            };
        },
        teardown: function() {
            destroyChart();
        }
    });

    test("applies theme", function() {
        setupChart({ theme: "test" });

        ok(chart.options.flag);
    });

    test("applies default theme when not set by user", function() {
        setupChart();
        equal(chart.options.theme, "default");
    });

    test("default theme can be disabled", function() {
        setupChart({ theme: "" });
        equal(chart.options.theme, "");
    });

    test("overrides series colors", function() {
        setupChart({
            theme: "test",
            series: [{}, {}]
        });

        equal(chart.options.series[0].color, "#f00");
        equal(chart.options.series[1].color, "#cf0");
    });

    test("seriesDefaults overrides theme series settings", function() {
        setupChart({
            theme: "black",
            seriesDefaults: {
                overlay: {
                    gradient: "foo"
                }
            },
            series: [{}, {}]
        });

        equal(chart.options.series[0].overlay.gradient, "foo");
    });

    test("applies theme seriesDefaults", function() {
        setupChart({
            theme: "test",
            series: [{}, {}]
        });

        ok(chart.options.series[0].seriesDefaultsFlag);
    });

    test("applies theme seriesDefaults with specific type", function() {
        setupChart({
            theme: "test",
            seriesDefaults: {
                type: "scatter"
            },
            series: [{}, {}]
        });

        ok(chart.options.series[0].flag === false);
    });

    test("seriesDefaults overrides theme seriesDefaults", function() {
        setupChart({
            theme: "test",
            seriesDefaults: {
                type: "scatter",
                scatter: {
                    flag: true
                }
            },
            series: [{}, {}]
        });

        ok(chart.options.series[0].flag);
    });

    test("theme options are applied to categoryAxes", function() {
        dataviz.ui.themes.test = {
            chart: {
                categoryAxis: {
                    flag: true
                }
            }
        };

        setupChart({
            theme: "test",
            categoryAxes: [{ local: true }]
        });

        ok(plotArea.categoryAxis.options.flag && plotArea.categoryAxis.options.local);
    });

    test("theme options are applied to valueAxes", function() {
        dataviz.ui.themes.test = {
            chart: {
                valueAxis: {
                    flag: true
                }
            }
        };

        setupChart({
            theme: "test",
            valueAxes: [{ local: true }]
        });

        ok(plotArea.valueAxis.options.flag && plotArea.valueAxis.options.local);
    });

    test("theme options are applied to xAxes", function() {
        dataviz.ui.themes.test = {
            chart: {
                xAxis: {
                    flag: true
                }
            }
        };

        setupChart({
            theme: "test",
            xAxes: [{ local: true }],
            series: [{ type: "scatterLine" }]
        });

        ok(plotArea.axisX.options.flag && plotArea.axisX.options.local);
    });

    test("theme options are applied to yAxes", function() {
        dataviz.ui.themes.test = {
            chart: {
                yAxis: {
                    flag: true
                }
            }
        };

        setupChart({
            theme: "test",
            yAxes: [{ local: true }],
            series: [{ type: "scatterLine" }]
        });

        ok(plotArea.axisY.options.flag && plotArea.axisY.options.local);
    });

    // ------------------------------------------------------------
    module("Tooltip", {
        teardown: function() {
            destroyChart();
        }
    });

    test("created when visible", function() {
        setupChart({
            tooltip: {
                visible: true
            }
        });

        ok(typeof chart._tooltip !== "undefined");
    });

    test("sets format", function() {
        setupChart({
            tooltip: {
                visible: true,
                format: "{0}%"
            }
        });

        equal(chart._tooltip.options.format, "{0}%");
    });

    test("sets font", function() {
        setupChart({ tooltip: {
                visible: true,
                font: "100px Verdana"
            }
        });

        equal(chart._tooltip.options.font, "100px Verdana");
    });

    test("sets background", function() {
        setupChart({
            tooltip: {
                visible: true,
                background: "red"
            }
        });

        equal(chart._tooltip.options.background, "red");
    });

    // ------------------------------------------------------------
    var animations;
    function logAnimations(callback) {
        animations = [];
        stubMethod(dataviz.ViewBase.fn, "playAnimations",
            function() {
                var view = this;
                animations = view.animations;
                view.animations = [];
            }, callback
        );
    }

    module("Transitions", {
        teardown: function() {
            destroyChart();
        }
    });

    test("initial transitions are enabled by default", function() {
        logAnimations(
            function() {
                createBarChart();
                ok(animations.length > 0);
            }
        );
    });

    test("transitions can be disabled (transitions: false)", function() {
        logAnimations(
            function() {
                createBarChart({
                    transitions: false
                });

                equal(animations.length, 0);
            }
        );
    });

    // ------------------------------------------------------------
    module("Misc", {
        teardown: function() {
            destroyChart();
        }
    });

    test("renders k-chart class", function() {
        setupChart({ theme: "test" });

        ok($("#container").hasClass("k-chart"));
    });

    test("DataSource is not mangled", function() {
        var ds = new kendo.data.DataSource();

        setupChart({ dataSource: ds });
        ok(chart.options.dataSource instanceof kendo.data.DataSource);
    });
})();
