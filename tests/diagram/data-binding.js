(function() {
    var diagram;

    function createDiagram(options) {
        var div = $("<div id='container' />").appendTo(QUnit.fixture);
        div.kendoDiagram(options);

        return div.data("kendoDiagram");
    }

    function destroyDiagram() {
        kendo.destroy(QUnit.fixture);
        QUnit.fixture.empty();
    }

    // ------------------------------------------------------------
    module("Diagram / Data Binding", {
          teardown: destroyDiagram
    });

    test("Binds to hierarchical data", function() {
        diagram = createDiagram({
            dataSource: {
                data: [{
                    id: "1",
                    items: [{
                        id: "1.1"
                    }]
                }],
                schema: {
                    model: {
                        children: "items"
                    }
                }
            }
        });

        equal(diagram.shapes.length, 2);
    });

    test("Binds to hierarchical data (custom field)", function() {
        diagram = createDiagram({
            dataSource: {
                data: [{
                    id: "1",
                    bars: [{
                        id: "1.1"
                    }]
                }],
                schema: {
                    model: {
                        children: "bars"
                    }
                }
            }
        });

        equal(diagram.shapes.length, 2);
    });

    test("Binds to HierarchicalDataSource instance", function() {
        diagram = createDiagram({
            dataSource: new kendo.data.HierarchicalDataSource({
                data: [{
                    id: "1",
                    bars: [{
                        id: "1.1"
                    }]
                }],
                schema: {
                    model: {
                        children: "bars"
                    }
                }
            })
        });

        equal(diagram.shapes.length, 2);
    });

    test("Applies visual to bound shapes", function() {
        diagram = createDiagram({
            dataSource: {
                data: [{
                    id: "1",
                    bars: [{
                        id: "1.1"
                    }]
                }],
                schema: {
                    model: {
                        children: "bars"
                    }
                }
            },
            shapeDefaults: {
                visual: function() {
                    ok(true);
                    return new kendo.dataviz.diagram.Group();
                }
            }
        });
    });

    test("Provides access to data item", function() {
        diagram = createDiagram({
            dataSource: {
                data: [{
                    id: "1",
                    items: [{
                        id: "1.1",
                        foo: true
                    }]
                }],
                schema: {
                    model: {
                        children: "items"
                    }
                }
            }
        });

        ok(diagram.shapes[0].dataItem.foo);
    });
})();
