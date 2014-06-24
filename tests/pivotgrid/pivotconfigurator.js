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

    test("create columns setting target", function() {
        var configurator = createConfigurator();

        ok(configurator.columns instanceof kendo.ui.PivotSettingTarget);
    });

    test("column setting target shares same datasource", function() {
        var configurator = createConfigurator();

        deepEqual(configurator.columns.dataSource, configurator.dataSource);
    });

    test("column setting target handles columns settings", function() {
        var configurator = createConfigurator();

        equal(configurator.columns.options.setting, "columns");
    });

    test("column setting empty message is read from the options", function() {
        var configurator = createConfigurator({
            messages: {
                columns: "Custom message"
            }
        });

        equal(configurator.columns.element.text(), "Custom message");
    });

    test("create rows setting target", function() {
        var configurator = createConfigurator();

        ok(configurator.rows instanceof kendo.ui.PivotSettingTarget);
    });

    test("rows setting target shares same datasource", function() {
        var configurator = createConfigurator();

        deepEqual(configurator.rows.dataSource, configurator.dataSource);
    });

    test("rows setting target handles columns settings", function() {
        var configurator = createConfigurator();

        equal(configurator.rows.options.setting, "rows");
    });

    test("rows setting target is connected with the columns target", function() {
        var configurator = createConfigurator();

        deepEqual(configurator.rows.options.connectWith[0], configurator.columns.element[0]);
    });

    test("rows setting empty message is read from the options", function() {
        var configurator = createConfigurator({
            messages: {
                rows: "Custom message"
            }
        });

        equal(configurator.rows.element.text(), "Custom message");
    });

    test("columns setting target is connected with the rows target", function() {
        var configurator = createConfigurator();

        deepEqual(configurator.columns.options.connectWith[0], configurator.rows.element[0]);
    });

    test("create measures setting target", function() {
        var configurator = createConfigurator();

        ok(configurator.measures instanceof kendo.ui.PivotSettingTarget);
    });

    test("measures setting target shares same datasource", function() {
        var configurator = createConfigurator();

        deepEqual(configurator.measures.dataSource, configurator.dataSource);
    });

    test("measures setting target handles columns settings", function() {
        var configurator = createConfigurator();

        equal(configurator.measures.options.setting, "measures");
    });

    test("measures setting empty message is read from the options", function() {
        var configurator = createConfigurator({
            messages: {
                measures: "Custom message"
            }
        });

        equal(configurator.measures.element.text(), "Custom message");
    });

    test("setDataSource attach new datasource", function() {
        var configurator = createConfigurator();

        var dataSource = new kendo.data.PivotDataSource();

        var catalog = stub(dataSource, "catalog");

        configurator.setDataSource(dataSource);

        deepEqual(configurator.dataSource, dataSource);

        ok(catalog.calls("catalog"));
    });

    test("setDataSource updates setting targets datasource", function() {
        var configurator = createConfigurator();
        var dataSource = new kendo.data.PivotDataSource();

        var measuresTarget = stub(configurator.measures, "setDataSource");
        var columnsTarget = stub(configurator.columns, "setDataSource");
        var rowsTarget = stub(configurator.rows, "setDataSource");

        configurator.setDataSource(dataSource);

        ok(measuresTarget.calls("setDataSource"));
        ok(columnsTarget.calls("setDataSource"));
        ok(rowsTarget.calls("setDataSource"));
    });
})();
