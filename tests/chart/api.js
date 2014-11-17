(function() {
    var dataviz = kendo.dataviz,
        draw = dataviz.drawing;
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

        test("redraw sets series defaults", function() {
            setupChart({
                series: [{
                    type: "column",
                    data: [1000],
                    color: function() { return "foo"; }
                }],
                seriesColors: ["red"]
            });

            chart.redraw();
            equal(chart.options.series[0]._defaults.color, "red");
        });

        test("refresh sets series defaults", function() {
            setupChart({
                series: [{
                    type: "column",
                    data: [1000],
                    color: function() { return "foo"; }
                }],
                seriesColors: ["red"]
            });

            chart.refresh();
            equal(chart.options.series[0]._defaults.color, "red");
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

        test("redraw clears cached size", function() {
            chart.element.css("width", 1000);
            chart.resize();

            chart.element.css("width", 0);
            chart.redraw();

            chart.element.css("width", 1000);
            chart.resize();

            equal(chart._model.options.width, 1000);
        });

        test("redraw creates a new overlay with the view and viewElement", function() {
            var highlight = chart._highlight;
            ok(highlight.view === chart._view);
            ok(highlight.viewElement === chart._viewElement);
        });

        test("redraw unsets active point", function() {
            chart._unsetActivePoint = function() { ok(true); };
            chart.redraw();
        });

        // ------------------------------------------------------------
        (function() {
            module("chartArea size", {
                teardown: destroyChart
            });

            test("applies width in pixels", function() {
                setupChart({
                    chartArea: { width: 1000 }
                });
                equal(chart.element.width(), 1000);
            });

            test("applies height in pixels", function() {
                setupChart({
                    chartArea: { height: 500 }
                });
                equal(chart.element.height(), 500);
            });

            test("applies width in units", function() {
                setupChart({
                    chartArea: { width: "1000px" }
                });
                equal(chart.element.width(), 1000);
            });

            test("applies height", function() {
                setupChart({
                    chartArea: { height: "500px" }
                });
                equal(chart.element.height(), 500);
            });
        })();

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

        test("destroys tooltip", function() {
            chart._tooltip.destroy();
            chart._tooltip = { destroy: function() { ok(true); }, hide: $.noop };
            chart.destroy();
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
        function triggerMousewheel(delta) {
            chart._mousewheel({
                originalEvent: {
                    detail: delta * 3,
                    clientX: 300,
                    clientY: 300
                },
                preventDefault: function() {},
                stopPropagation: function() {}
            });
        }

        module("Events", {
            setup: function() {
                setupChart({
                    series: [{}],
                    valueAxis: { name: "value" },
                    chartArea: { width: 600, height: 400 }
                });
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

        test("mousewheel down triggers zoom event (zoom out)", function() {
            chart.bind("zoom", function(e) {
                equal(e.axisRanges.value.max, 3.2);
            });
            triggerMousewheel(10);
        });

        test("mousewheel up triggers zoom event (zoom in)", function() {
            chart.bind("zoom", function(e) {
                equal(e.axisRanges.value.max, -0.8);
            });
            triggerMousewheel(-10);
        });
    })();

    (function() {
        var chart;

        function setupChart(options) {
            chart = createChart(kendo.deepExtend({
                series: [{
                    type: "bar",
                    data: [1, 2]
                }]
            }, options));
        }

        exportTests("Chart", createChart);
        legacyExportTests("Chart", createChart);
        saveAsPDFTests("Chart", createChart);

        // ------------------------------------------------------------
        module("Export", {
            setup: function() {
                setupChart();
            },
            teardown: function() {
                destroyChart();
            }
        });

        test("svg() does not replace model", function() {
            var oldModel = chart._model;
            chart.svg();
            ok(oldModel === chart._model);
        });

        test("svg() does not replace surface", function() {
            var oldSurface = chart.surface;
            chart.svg();
            ok(oldSurface === chart.surface);
        });

        test("svg() encodes entities", function() {
            setupChart({ categoryAxis: { categories: ["Foo & Bar"] } });
            ok(chart.svg().indexOf("Foo &amp; Bar") > -1);
        });

        test("svg() preserves encoded entities", function() {
            setupChart({ categoryAxis: { categories: ["Foo &amp; Bar"] } });
            ok(chart.svg().indexOf("Foo &amp; Bar") > -1);
        });

        test("imageDataURL() does not replace model", function() {
            var oldModel = chart._model;
            chart.imageDataURL();
            ok(oldModel === chart._model);
        });

        test("imageDataURL() does not replace surface", function() {
            var oldSurface = chart.surface;
            chart.imageDataURL();
            ok(oldSurface === chart.surface);
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

        test("extends axis options", function() {
            setupChart({
                valueAxis: { name: "foo" }
            });

            chart.setOptions({ valueAxis: { max: 1 } });
            equal(chart.options.valueAxis.name, "foo");
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

        test("does not extend data source", 0, function() {
            setupChart();

            var ds = { data: [{ "foo": 1 }], foo: { } };
            ds.foo.bar = ds.foo;

            chart.setOptions({
                dataSource: ds
            });
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

    // ------------------------------------------------------------
    (function() {
        module("Events / render", {
            teardown: destroyChart
        });

        test("triggers render after chart is rendered", 1, function() {
            createChart({
                series: [{
                    data: [1, 2, 3]
                }],
                render: function(e) {
                    ok(e.sender.surface._root.childNodes);
                }
            });
        });

        test("triggers render after dataBound", 1, function() {
            var dataBound = false;
            createChart({
                dataSource: [{
                    period: "Jan",
                    sales: 100
                }],
                series: [{
                    field: "sales"
                }],
                dataBound: function() {
                    dataBound = true;
                },
                render: function() {
                    ok(dataBound);
                }
            });
        });

        test("triggers render after rendering if autoBind is false", 1, function() {
            createChart({
                autoBind: false,
                dataSource: [{
                    period: "Jan",
                    sales: 100
                }],
                series: [{
                    field: "sales"
                }],
                dataBound: function() {
                    dataBound = true;
                },
                render: function() {
                    ok(true);
                }
            });
        });

        test("triggers render after setDataSource", 1, function() {
            var dataBound = false;
            var chart = createChart({
                series: [{
                    field: "sales"
                }],
                dataBound: function() {
                    dataBound = true;
                }
            });

            chart.bind("render", function() {
                ok(dataBound);
            });

            chart.setDataSource([{
                period: "Jan",
                sales: 100
            }]);
        });
    })();
})();
