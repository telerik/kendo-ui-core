(function() {
    var PivotConfigurator = kendo.ui.PivotConfigurator,
        div;

    module("PivotConfigurator initialziation", {
        setup: function() {
            kendo.ns = "kendo-";
            div = document.createElement("div");
            QUnit.fixture[0].appendChild(div);
        },
        teardown: function() {
            var component = $(div).data("kendoPivotConfigurator");
            if (component) {
                component.destroy();
            }
            kendo.destroy(QUnit.fixture);
            kendo.ns = "";
        }
    });

    function createConfigurator(options) {
        return new PivotConfigurator(div, options || {});
    }

    test("kendoPivotConfigurator attaches a pivotconfigurator object to target", function() {
        var configurator = $(div).kendoPivotConfigurator({ });

        ok(configurator.data("kendoPivotConfigurator") instanceof PivotConfigurator);
    });

    test("treeview is initialized", function() {
        var configurator = createConfigurator();

        ok(configurator.treeView instanceof kendo.ui.TreeView);
    });

    test("treeview is not bound initially", function() {
        var configurator = createConfigurator();

        ok(!configurator.treeView.options.autoBind);
    });

    test("treeview schema id is uniqueName", function() {
        var configurator = createConfigurator();

        var dataSource = configurator.treeView.dataSource;

        var model = new dataSource.reader.model;

        equal(model.idField, "uniqueName");
    });

    test("treeview hasChildren returns false for levels", function() {
        var configurator = createConfigurator();

        var dataSource = configurator.treeView.dataSource;

        var model = new dataSource.reader.model({ hierarchyUniqueName: "foo" });

        ok(!model.hasChildren);
    });

    test("treeview hasChildren returns true non levels", function() {
        var configurator = createConfigurator();

        var dataSource = configurator.treeView.dataSource;

        var model = new dataSource.reader.model({ });

        ok(model.hasChildren);
    });

    test("treeview hasChildren returns false for measure", function() {
        var configurator = createConfigurator();

        var dataSource = configurator.treeView.dataSource;

        var model = new dataSource.reader.model({ aggregator: "foo" });

        ok(!model.hasChildren);
    });

    test("treeview transport calls pivotDataSource for list of dimentions", function() {
        var configurator = createConfigurator({
            dataSource: {
                transport: {
                    discover: function(options) {
                        options.success([]);
                    }
                }
            }
        });

        var schemaDimensions = stub(configurator.dataSource, { schemaDimensions: configurator.dataSource.schemaDimensions });
        var dataSource = configurator.treeView.dataSource;

        dataSource.read();

        equal(schemaDimensions.calls("schemaDimensions"), 1);
    });

    test("treeview transport calls pivotDataSource for list of measures", function() {
        var configurator = createConfigurator({
            dataSource: {
                transport: {
                    discover: function(options) {
                        options.success([]);
                    }
                },
                schema: {
                    dimensions: function() {
                        return [{ uniqueName: "foo", type: 2 }]; //measure
                    }
                }
            }
        });

        var method = stub(configurator.dataSource, { schemaMeasures: configurator.dataSource.schemaMeasures });

        var dataSource = configurator.treeView.dataSource;

        dataSource.read();
        dataSource.at(0).load();

        equal(method.calls("schemaMeasures"), 1);
    });

    test("treeview transport calls pivotDataSource for list of hierarchies", function() {
        var configurator = createConfigurator({
            dataSource: {
                transport: {
                    discover: function(options) {
                        options.success([]);
                    }
                },
                schema: {
                    dimensions: function() {
                        return [{ uniqueName: "foo", type: 3 }];
                    }
                }
            }
        });

        var method = stub(configurator.dataSource, { schemaHierarchies: configurator.dataSource.schemaHierarchies });

        var dataSource = configurator.treeView.dataSource;

        dataSource.read();
        dataSource.at(0).load();

        equal(method.calls("schemaHierarchies"), 1);
    });

    test("treeview transport calls pivotDataSource for list of levels", function() {
        var configurator = createConfigurator({
            dataSource: {
                transport: {
                    discover: function(options) {
                        options.success([]);
                    }
                },
                schema: {
                    dimensions: function() {
                        return [{ uniqueName: "foo", type: 3 }];
                    },
                    hierarchies: function() {
                        return [{ uniqueName: "bar", dimensionUniqueName: "foo" }];
                    }
                }
            }
        });

        var method = stub(configurator.dataSource, { schemaLevels: configurator.dataSource.schemaLevels });

        var dataSource = configurator.treeView.dataSource;

        dataSource.read();
        dataSource.at(0).load();
        dataSource.at(0).children.at(0).load();

        equal(method.calls("schemaLevels"), 1);
    });



})();
