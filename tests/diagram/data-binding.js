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

    test("Binds to flat data", function() {
        diagram = createDiagram({
            dataSource: {
                data: [{
                    id: "1"
                }]
            }
        });

        equal(diagram.shapes.length, 1);
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

        ok(diagram.shapes[1].dataItem.foo);
    });

    // ------------------------------------------------------------
    var dataMap;
    var dataSource;
    var shapes;
    var connections;
    var shape;
    var uid;

    module("Diagram / Data Binding / updates", {
        setup: function() {
            diagram = createDiagram({
                dataSource: {
                    data: [{
                        id: "1",
                        items: [{
                            id: "1.1",
                            foo: true
                        }]
                    }, {
                        id: "2"
                    }],
                    schema: {
                        model: {
                            children: "items"
                        }
                    }
                }
            });
            shapes = diagram.shapes;
            connections = diagram.connections;
            dataSource = diagram.dataSource;
            dataMap = diagram._dataMap;
        },
        teardown: destroyDiagram
    });

    test("binding adds dataItem uids to dataMap", function() {
        for (var idx = 0; idx < shapes.length; idx++) {
            shape = shapes[idx];
            ok(dataMap[shape.dataItem.uid] === shape);
        }
    });

    test("dataSource remove removes uid from map", function() {
        var item = dataSource.at(0);
        uid = item.uid;
        dataSource.remove(item);
        ok(!dataMap[uid]);
    });

    test("dataSource remove removes shape and its connections ", function() {
        shape = diagram.shapes[0];
        var shapeConnections = shape.connections();
        var removed;
        var idx;
        dataSource.remove(dataSource.at(0));
        removed = $.inArray(shape, shapes) == -1;

        for (idx = 0; idx < shapeConnections.length; idx++) {
            removed = removed && $.inArray(shapeConnections[idx], connections) == -1;
        }
        ok(removed);
    });

    test("dataSource remove removes children shapes and their connections", function() {
        dataSource.remove(dataSource.at(0));
        equal(connections.length, 0);
        equal(shapes.length, 1);
    });


})();
