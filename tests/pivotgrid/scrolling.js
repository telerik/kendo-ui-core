
(function() {
    var PivotDataSource = kendo.data.PivotDataSource,
        PivotGrid = kendo.ui.PivotGrid,
        div;

    module("PivotGrid content scrolling", {
        setup: function() {
            kendo.ns = "kendo-";
            div = document.createElement("div");
            QUnit.fixture[0].appendChild(div);
        },
        teardown: function() {
            var component = $(div).data("kendoPivotGrid");
            if (component) {
                component.destroy();
            }
            kendo.destroy(QUnit.fixture);
            kendo.ns = "";
        }
    });

    function createPivot(options) {
        options = options || {};

        if (!options.dataSource) {
            options.dataSource = new kendo.data.PivotDataSource({
                schema: {
                    axes: function() {
                        return {};
                    }
                }
            });
        }

        return new PivotGrid($(div), options);
    }

    function createDataSource(tuples, data) {
        return new PivotDataSource({
            schema: {
                axes: "axes",
                data: "data"
            },
            transport: {
                read: function(options) {
                    options.success({
                        axes: {
                            columns: {
                                tuples: tuples || []
                            }
                        },
                        data: data || []
                    });
                }
            }
        });
    }

    test("PivotGrid sets width of 100 percents if content table is narrow than pivot", function() {
        var tuples = [{ members: [ { name: "dim 0", levelNum: "0", children: [] }] }];
        var data = [];

        for (var idx = 0; idx < 100; idx++) {
            tuples.push({ members: [ { name: "tuple " + idx, parentName: "dim 0", levelNum: "1", children: [] }] });
            data.push(idx);
        }

        var pivotgrid = createPivot({
            dataSource: createDataSource(tuples, data)
        });

        var header = pivotgrid.wrapper.find(".k-grid-header-wrap");
        var content = pivotgrid.wrapper.find(".k-grid-content");

        content[0].scrollLeft = content[0].scrollWidth;
        content.trigger("scroll");

        ok(Math.abs(header[0].scrollLeft - content[0].scrollLeft) < 100);
    });

})();
