(function() {
    var dataviz = kendo.dataviz;

    (function() {
        var chart,
            model,
            title,
            legend,
            plotArea
            MARGIN = 10;

        function setupChart(series, options) {
            chart = createChart($.extend({
                title: {
                    text: "Chart Title"
                },
                series: series,
                categoryAxis: {
                    categories: ["Alpha", "Beta", "Charlie"]
                },
                chartArea: {
                    margin: 0
                }
            }, options ));

            model = chart._model;
            title = model.children[0];
            legend = model.children[1];
            plotArea = model.children[2];
        }

        module("Bar Chart Model", {
            setup: function() {
                setupChart([{
                    name: "Value",
                    type: "bar",
                    data: [100, 200, 300]
                }]);
            },
            teardown: function() {
                destroyChart();
            }
        });

        test("model is a RootElement", function() {
            ok(model instanceof dataviz.RootElement);
        });

        test("title is created", function() {
            ok(title instanceof dataviz.Title);
        });

        test("title text is set", function() {
            equal(title.options.text, "Chart Title");
        });

        test("title box is positioned at top", function() {
            equal(title.box.y1, 0);
        });

        test("legend is created", function() {
            ok(legend instanceof dataviz.Legend);
        });

        test("legend series are populated", function() {
            equal(legend.options.items[0].text, "Value");
        });

        test("default legend marker color is used when color is fn", function() {
            setupChart([{ color: function() { return "#foo"; }, name: "aaa" }]);
            equal(legend.options.items[0].markerColor, "#ff6800");
        });

        test("series can be excluded from legend", function() {
            setupChart([{
                name: "Value",
                type: "bar",
                data: [100, 200, 300],
                visibleInLegend: false
            }]);

            equal(legend.options.items.length, 0);
        });

        test("legend labels template", function() {
            setupChart([{
                name: "Value",
                type: "bar",
                data: [100, 200, 300],
                test: "test"
            }], {
                legend: {
                    labels: {
                        template: "#= text #-#= series.test #"
                    }
                }
            });

            equal(legend.options.items[0].text, "Value-test");
        });

        test("legend is positioned at right", function() {
            equal(legend.box.x1,
                model.box.width() - legend.box.width() -MARGIN);
        });

        test("legend is positioned at vertical center", function() {
            var titleHeight = title.box.height(),
                vCenter = titleHeight +
                          ((model.box.height() - titleHeight - legend.box.height()) / 2);
            equal(legend.box.y1, vCenter);
        });

        test("Categorical plotArea is created", function() {
            ok(plotArea instanceof dataviz.CategoricalPlotArea);
        });

        (function() {
            var note;

            module("Bar Chart Note", {
                setup: function() {
                    setupChart([{
                        name: "Value",
                        type: "bar",
                        data: [{ value: 10, noteText: "A" }]
                    }]);
                    note = chart._plotArea.charts[0].points[0].note;
                },
                teardown: function() {
                    destroyChart();
                }
            });

            test("should have text", function() {
                equal(note.text, "A");
            });

            module("Bar Chart Note / Template", {
                teardown: function() {
                    destroyChart();
                }
            });

            function createNote(options) {
                setupChart([{
                    name: "Value",
                    type: "bar",
                    data: [{ value: 10, category: "category", noteText: "A", test: "test" }],
                    notes: $.extend({}, options),
                    name: "name"
                }]);
                note = chart._plotArea.charts[0].points[0].note;
            }

            test("dataItem", function() {
                createNote({
                    label: {
                        template: "#= dataItem.test #"
                    }
                });

                equal(note.label.content, "test");
            });

            test("category", function() {
                createNote({
                    label: {
                        template: "#= category #"
                    }
                });

                equal(note.label.content, "Alpha");
            });

            test("value", function() {
                createNote({
                    label: {
                        template: "#= value #"
                    }
                });

                equal(note.label.content, 10);
            });

            test("series", function() {
                createNote({
                    label: {
                        template: "#= series.name #"
                    }
                });

                equal(note.label.content, "name");
            });
        })();
    })();
})();
