(function() {
    var dataviz = kendo.dataviz,
        Chart = dataviz.ui.Chart;

    (function() {
        var chart;

        function setupChart(options) {
            chart = createChart(options);
        }

        // ------------------------------------------------------------
        module("refresh / redraw", {
            setup: function() {
                setupChart({series: [{}]});
            },
            teardown: destroyChart
        });

        test("refresh applies axis defaults", function() {
            $.extend(chart.options, {
                axisDefaults: {
                    flag: true
                }
            });

            chart.refresh();

            ok(chart.options.categoryAxis.flag === true);
        });

        test("redraw applies axis defaults", function() {
            $.extend(chart.options, {
                axisDefaults: {
                    flag: true
                }
            });

            chart.redraw();

            ok(chart.options.categoryAxis.flag === true);
        });

        test("redraw only redraws specified pane", 1, function() {
            setupChart({
                panes: [{ name: "top" }, { name: "bottom" }]
            });

            var plotArea = chart._model._plotArea;
            plotArea.redraw = function(pane) {
                ok(pane === plotArea.panes[1]);
            };

            chart.redraw("bottom");
        });

        test("redraw redraws default pane if invalid name is specified", 1, function() {
            setupChart({
                panes: [{ name: "top" }, { name: "bottom" }]
            });

            var plotArea = chart._model._plotArea;
            plotArea.redraw = function(pane) {
                ok(pane === plotArea.panes[0]);
            };

            chart.redraw("middle");
        });

        test("removes category axis aliases after init", 1, function() {
            setupChart({
                panes: [{ name: "top" }, { name: "bottom" }],
                categoryAxes: [{}]
            });

            ok(!chart.options.categoryAxes);
        });

        test("redraw keeps categories when using categoryAxes alias", function() {
            setupChart({
                dataSource: {
                    data: [{
                        type: "alpha",
                        value: 100
                    }]
                },
                series: [{
                    type: "column",
                    data: [1000]
                }],
                panes: [{
                    name: "top"
                }],
                categoryAxes: [{
                    field: "type",
                    pane: "top"
                }]
            });

            chart.redraw("top");
            equal(chart._model._plotArea.categoryAxis.options.categories[0], "alpha");
        });

        test("removes value axis alias after init", 1, function() {
            setupChart({
                series: [{
                    type: "column",
                    data: [1000]
                }],
                panes: [{
                    name: "top"
                }],
                valueAxes: [{
                    field: "type",
                    pane: "top"
                }]
            });

            ok(!chart.options.valueAxes);
        });

        test("refresh applies series defaults", function() {
            $.extend(chart.options, {
                seriesDefaults: {
                    labels: { visible: true }
                }
            });

            chart.refresh();

            equal(chart.options.series[0].labels.visible, true);
        });

        test("redraw applies series defaults", function() {
            $.extend(chart.options, {
                seriesDefaults: {
                    labels: { visible: true }
                }
            });

            chart.redraw();

            equal(chart.options.series[0].labels.visible, true);
        });

        test("redraw replaces SVG element", function() {
            chart.element.find("svg").data("dirty", true);
            chart.redraw();

            ok(!chart.element.data("dirty") > 0);
        });

        test("redraw removes elements appended to container", function() {
            chart.element.append("<div id='extra' />");
            chart.redraw();

            equal(chart.element.find("#extra").length, 0);
        });

        test("refresh applies changes to data-bound series", function() {
            setupChart({
                dataSource: [{ value: 1 }],
                series: [{ field: "value" }]
            });

            chart.options.series[0].flag = true;
            chart.refresh();

            ok(chart.options.series[0].flag);
        });

        test("refresh applies color to new series", function() {
            setupChart({
                seriesColors: ["red", "blue"],
                series: [{}]
            });

            chart.options.series.push({});
            chart.refresh();

            equal(chart.options.series[1].color, "blue");
        });

        test("refresh cleans up generated cateories", function() {
            setupChart({
                dataSource: [{ value: 1 }],
                series: [{ field: "value" }],
                categoryAxis: { categories: [] }
            });

            chart.options.series = [];
            chart.refresh();

            equal(chart.options.categoryAxis.categories.length, 0);
        });

        // ------------------------------------------------------------
        module("destroy", {
            setup: function() {
                setupChart({series: [{}]});
            }
        });

        test("removes data", function() {
            chart.destroy();
            ok(!$("#container").data("kendoChart"));
        });

        test("unbinds click from DOM container", function() {
            chart.destroy();
            ok(!($("#container").data("events") || {}).click);
        });

        test("unbinds mouseOver from DOM container", function() {
            chart.destroy();
            ok(!($("#container").data("events") || {}).mouseover);
        });

        test("unbinds DataSource change handler", function() {
            chart.destroy();
            equal(chart.dataSource._events["change"].length, 0);
        });

        test("releases IDs to pool", function() {
            chart.destroy();
            ok(dataviz.IDPool.current._pool.length > 0);
        });

        // ------------------------------------------------------------
        module("Events", {
            setup: function() {
                setupChart({series: [{}]});
            },
            teardown: destroyChart
        });

        test("navigation does not start if no handlers are attached", 0, function() {
            stubMethod(Chart.fn, "_startNavigation", function() {
                ok(false);
            }, function() {
                chart._start();
            });
        });

        test("navigation starts if dragStart handler is attached", 1, function() {
            chart.bind("dragStart", function() {});

            stubMethod(Chart.fn, "_startNavigation", function() {
                ok(true);
            }, function() {
                chart._start();
            });
        });

        test("navigation starts if drag handler is attached", 1, function() {
            chart.bind("drag", function() {});

            stubMethod(Chart.fn, "_startNavigation", function() {
                ok(true);
            }, function() {
                chart._start();
            });
        });

        test("navigation starts if dragEnd handler is attached", 1, function() {
            chart.bind("dragEnd", function() {});

            stubMethod(Chart.fn, "_startNavigation", function() {
                ok(true);
            }, function() {
                chart._start();
            });
        });

    })();

    (function() {
        var chart;

        function setupChart() {
            chart = createChart({
                series: [{
                    type: "bar",
                    data: [1, 2]
                }]
            });
        }

        // ------------------------------------------------------------
        var SVGView,
            CanvasView,
            supportsCanvas;

        module("Export", {
            setup: function() {
                setupChart();

                SVGView = dataviz.SVGView;
                CanvasView = dataviz.CanvasView;
                supportsCanvas = dataviz.supportsCanvas;
            },
            teardown: function() {
                dataviz.SVGView = SVGView;
                dataviz.CanvasView = CanvasView;
                dataviz.supportsCanvas = supportsCanvas;

                destroyChart();
            }
        });

        test("svg() exports SVG", function() {
            ok(chart.svg().match(/<svg.*<\/svg>/));
        });

        test("svg() throws error if SVGView is not loaded", function() {
            dataviz.SVGView = undefined;

            throws(function() { chart.svg() },
                   "Unable to create SVGView. Check that kendo.dataviz.svg.js is loaded.");
        });

        test("svg() does not replace model", function() {
            var oldModel = chart._model;
            chart.svg();
            ok(oldModel === chart._model);
        });

        test("svg() does not replace view", function() {
            var oldView = chart._view;
            chart.svg();
            ok(oldView === chart._view);
        });

        test("imageDataURL() exports image/png", function() {
            ok(chart.imageDataURL().match(/image\/png/));
        });

        test("imageDataURL() throws error if CanvasView is not loaded", function() {
            dataviz.CanvasView = undefined;

            throws(function() { chart.imageDataURL() },
                   "Unable to create CanvasView. Check that kendo.dataviz.canvas.js is loaded.");
        });

        test("imageDataURL() returns null if Canvas is not supported", function() {
            dataviz.supportsCanvas = function() { return false; }

            equal(chart.imageDataURL(), null);
        });

        asyncTest("imageDataURL logs warning if Canvas is not supported", function() {
            dataviz.supportsCanvas = function() { return false; }

            stubMethod(kendo, "logToConsole", function(message) {
                ok(message.indexOf("Warning: Unable to generate image.") > -1);
                start();
            }, function() {
                chart.imageDataURL();
            });
        });

        test("imageDataURL() does not replace model", function() {
            var oldModel = chart._model;
            chart.imageDataURL();
            ok(oldModel === chart._model);
        });

        test("imageDataURL() does not replace view", function() {
            var oldView = chart._view;
            chart.imageDataURL();
            ok(oldView === chart._view);
        });

    })();

    (function() {
        var chart;
        dataviz.ui.themes.foo = {
            chart: {
                foo: true,
                seriesDefaults: {
                    foo: true
                },
                seriesColors: ["#f00"]
            }
        };

        function setupChart(options) {
            chart = createChart(options);
        }

        // ------------------------------------------------------------
        module("setOptions", {
            teardown: destroyChart
        });

        test("extends original options", function() {
            setupChart();

            chart.setOptions({
                foo: true
            });

            ok(chart._originalOptions.foo);
        });

        test("applies theme", function() {
            setupChart();
            chart.setOptions({ theme: "foo" });

            ok(chart.options.foo);
        });

        test("does not taint original options with theme", function() {
            setupChart({ theme: "foo" });

            chart.setOptions({ theme: "" });

            ok(!chart.options.foo);
        });

        test("does not taint series options with theme", function() {
            setupChart({
                theme: "foo",
                series: [{ }]
            });

            chart.setOptions({ theme: "" });

            ok(!chart.options.series[0].foo);
        });

        test("does not taint series colors with theme", function() {
            setupChart({
                series: [{ }]
            });

            chart.setOptions({ theme: "foo" });
            chart.setOptions({ theme: "" });

            ok(!chart.options.series[0].color);
        });

        test("resets series after grouping", function() {
            setupChart({
                dataSource: {
                    data: [{
                        value: 1,
                        group: "A"
                    }, {
                        value: 1,
                        group: "B"
                    }],
                    group: {
                        field: "group"
                    }
                },
                series: [{
                    field: "value"
                }]
            });

            chart.setOptions({
                series: [{
                    data: [1, 2, 3]
                }]
            });

            chart.dataSource.read();

            equal(chart.options.series.length, 1);
        });

        test("sets data source", function() {
            setupChart({
                series: [{ field: "foo" }]
            });

            chart.setOptions({
                dataSource: { data: [{ "foo": 1 }] }
            });

            equal(chart.options.series[0].data.length, 1);
        });

        test("gets the data from the dataSource when it is set with the setDataSource method and the setOptions method is used", function(){
            var dataSource = new kendo.data.DataSource({
                data: [{foo: 1}]
            });

            setupChart({
                series: [{ field: "foo" }]
            });

            chart.setDataSource(dataSource);

            chart.setOptions({});
            ok(chart.options.series[0].data.length === 1);
        });

        test("calls redraw implicitly", function() {
            setupChart();

            stubMethod(Chart.fn, "redraw", function() {
                ok(true);
            }, function() {
                chart.setOptions({
                    foo: true
                });
            });
        });

        test("calls refresh implicitly when bound to a data source", function() {
            setupChart({
                series: [{ field: "foo" }],
                dataSource: { data: [{ "foo": 1 }] }
            });

            stubMethod(Chart.fn, "refresh", function() {
                ok(true);
            }, function() {
                chart.setOptions({
                    foo: true
                });
            });
        });

    })();
})();
