(function() {
    var dataviz = kendo.dataviz;

    var chart,
        model,
        title,
        legend,
        plotArea
        MARGIN = 10;

    function createBarChart(series, options) {
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
        }, options));
        model = chart._model;
        title = model.children[0];
        legend = model.children[1];
        plotArea = model.children[2];
    }

    module("Bar Chart Model", {
        setup: function() {
            createBarChart([{
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
        createBarChart([{ color: function() { return "#foo"; }, name: "aaa" }]);
        debugger;
        equal(legend.options.items[0].markerColor, "#ff6800");
    });

    test("series can be excluded from legend", function() {
        createBarChart([{
            name: "Value",
            type: "bar",
            data: [100, 200, 300],
            visibleInLegend: false
        }]);

        equal(legend.options.items.length, 0);
    });

    test("legend labels template", function() {
        createBarChart([{
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

})();
