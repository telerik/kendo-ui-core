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

    test("treeview uses 'caption' field for dataTextField option", function() {
        var configurator = createConfigurator();

        var field = configurator.treeView.options.dataTextField;

        equal(field, "caption");
    });

    test("treeview uses 'name' if caption is not defined in model", function() {
        var configurator = createConfigurator();

        var treeView = configurator.treeView;

        treeView.dataSource.data([
            { name: "test" }
        ]);

        var li = treeView.element.find("li");

        equal(li.text(), "test");
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

    test("treeview transport adds KPI item after Measures", function() {
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

        var dataSource = configurator.treeView.dataSource;

        dataSource.read();

        var kpi = dataSource.at(1);

        equal(kpi.caption, "KPIs");
        equal(kpi.defaultHierarchy, "[KPIs]");
        equal(kpi.name, "KPIs");
        equal(kpi.uniqueName, "[KPIs]");
    });

    test("treeview transport skips KPI item if client cube is used", function() {
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
                    },
                    cube: {}
                }
            }
        });

        var dataSource = configurator.treeView.dataSource;

        dataSource.read();

        var measure = dataSource.at(0);
        var kpi = dataSource.at(1);

        ok(measure);
        ok(!kpi);
    });

    test("configurator calls treeview fetch if client cube is used", function() {
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
                    },
                    cube: {}
                }
            }
        });

        var dataSource = configurator.treeView.dataSource;

        stub(dataSource, {
            fetch: dataSource.fetch
        });

        configurator.refresh();

        equal(dataSource.calls("fetch"), 1);
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

    test("treeview transport calls pivotDataSource for list of KPIs", function() {
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
                    },
                    kpis: function() {
                        return [];
                    }
                }
            }
        });

        var method = stub(configurator.dataSource, { schemaKPIs: configurator.dataSource.schemaKPIs });

        var dataSource = configurator.treeView.dataSource;

        dataSource.read();
        dataSource.at(1).load(); //KPI load

        equal(method.calls("schemaKPIs"), 1);
    });

    test("treeview transport creates KPI items per KPI node data", function() {
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
                    },
                    kpis: function() {
                        return [{
                            goal: "goal",
                            status: "status",
                            trend: "trend",
                            value: "value"
                        }];
                    }
                }
            }
        });

        var method = stub(configurator.dataSource, { schemaKPIs: configurator.dataSource.schemaKPIs });

        var dataSource = configurator.treeView.dataSource;

        dataSource.read();
        dataSource.at(1).load(); //load kpis
        dataSource.at(1).items[0].load(); //show kpi measures

        var measures = dataSource.at(1).items[0].items;

        equal(measures.length, 4);

        equal(measures[0].caption, "value");
        equal(measures[0].id, "value");
        equal(measures[0].measure, "value");
        equal(measures[0].name, "value");
        equal(measures[0].type, "value");
        equal(measures[0].kpi, true);

        equal(measures[1].caption, "goal");
        equal(measures[1].id, "goal");
        equal(measures[1].measure, "goal");
        equal(measures[1].name, "goal");
        equal(measures[1].type, "goal");
        equal(measures[1].kpi, true);

        equal(measures[2].caption, "status");
        equal(measures[2].id, "status");
        equal(measures[2].measure, "status");
        equal(measures[2].name, "status");
        equal(measures[2].type, "status");
        equal(measures[2].kpi, true);

        equal(measures[3].caption, "trend");
        equal(measures[3].id, "trend");
        equal(measures[3].measure, "trend");
        equal(measures[3].name, "trend");
        equal(measures[3].type, "trend");
        equal(measures[3].kpi, true);
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

    test("treeview renders dimension icon for dimension fields", function() {
        var configurator = createConfigurator({
            dataSource: {
                schema: {
                    dimensions: function() {
                        return [
                            { uniqueName: "foo", type: 1 },
                            { uniqueName: "bar", type: 3 }
                        ];
                    }
                }
            }
        });

        configurator.treeView.dataSource.read();

        var items = configurator.element.find(".k-treeview").find("li");
        var icon1 = items.eq(0).find(".k-icon");
        var icon2 = items.eq(1).find(".k-icon");

        ok(icon1.hasClass("k-i-dimension"));
        ok(icon2.hasClass("k-i-dimension"));
    });

    test("treeview renders measure icon for measure field", function() {
        var configurator = createConfigurator({
            dataSource: {
                schema: {
                    dimensions: function() {
                        return [ { uniqueName: "foo", type: 2 } ];
                    }
                }
            }
        });

        configurator.treeView.dataSource.read();

        var items = configurator.element.find(".k-treeview").find("li");
        var icon = items.eq(0).find(".k-icon");

        ok(icon.hasClass("k-i-sum"));
    });

    test("treeview renders kpi icon for kpi field", function() {
        var configurator = createConfigurator({
            dataSource: {
                schema: {
                    dimensions: function() {
                        return [ { uniqueName: "foo", type: 2 } ];
                    }
                }
            }
        });

        configurator.treeView.dataSource.read();

        var items = configurator.element.find(".k-treeview").find("li");
        var icon = items.eq(1).find(".k-icon");

        ok(icon.hasClass("k-i-kpi"));
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

    test("height option defines the widget height", function() {
        var configurator = createConfigurator({
            height: 300
        });

        equal(configurator.element.height(), 300);
    });

    test("height option in string value defines the widget height", function() {
        var configurator = createConfigurator({
            height: "300px"
        });

        equal(configurator.element.height(), 300);
    });

    test("drop KPI group creates list of measures", function() {
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
                    },
                    kpis: function() {
                        return [{
                            goal: "goal",
                            status: "status",
                            trend: "trend",
                            value: "value"
                        }];
                    }
                }
            }
        });

        var method = stub(configurator.dataSource, { schemaKPIs: configurator.dataSource.schemaKPIs });

        var dataSource = configurator.treeView.dataSource;

        dataSource.read();
        dataSource.at(1).load(); //load kpis
        dataSource.at(1).items[0].load(); //show kpi measures

        var setting = configurator.measures;
        var sourceNode = configurator.treeView.wrapper.find("[data-kendo-uid=" + dataSource.at(1).items[0].uid + "]");

        stub(setting, "add");

        configurator.treeView.trigger("drop", {
            preventDefault: $.noop,
            dropTarget: setting.element,
            sourceNode: sourceNode
        });

        var args = setting.args("add")[0];

        equal(args.length, 4);
        equal(args[0].name, "value");
        equal(args[0].type, "value");

        equal(args[1].name, "goal");
        equal(args[1].type, "goal");

        equal(args[2].name, "status");
        equal(args[2].type, "status");

        equal(args[3].name, "trend");
        equal(args[3].type, "trend");
    });

    test("drop KPI measures creates measure with a special type", function() {
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
                    },
                    kpis: function() {
                        return [{
                            goal: "goal",
                            status: "status",
                            trend: "trend",
                            value: "value"
                        }];
                    }
                }
            }
        });

        var method = stub(configurator.dataSource, { schemaKPIs: configurator.dataSource.schemaKPIs });

        var dataSource = configurator.treeView.dataSource;

        dataSource.read();
        dataSource.at(1).load(); //load kpis
        dataSource.at(1).items[0].load(); //show kpi measures

        var setting = configurator.measures;
        var sourceNode = configurator.treeView.wrapper.find("[data-kendo-uid=" + dataSource.at(1).items[0].items[0].uid + "]");

        stub(setting, "add");

        configurator.treeView.trigger("drop", {
            preventDefault: $.noop,
            dropTarget: setting.element,
            sourceNode: sourceNode
        });

        var args = setting.args("add")[0];

        equal(args.length, 1);
        equal(args[0].name, "value");
        equal(args[0].type, "value");
    });

    test("droped root dimension onto columns setting uses correct name", function() {
        var configurator = createConfigurator({
            dataSource: {
                transport: {
                    discover: function(options) {
                        options.success([]);
                    }
                },
                schema: {
                    dimensions: function() {
                        return [{ defaultHierarchy: "[foo].[foo]", uniqueName: "wrong", type: 1 }]; //root dimension
                    }
                }
            }
        });

        var method = stub(configurator.dataSource, { schemaKPIs: configurator.dataSource.schemaKPIs });

        var dataSource = configurator.treeView.dataSource;

        dataSource.read();

        var setting = configurator.columns;
        var sourceNode = configurator.treeView.wrapper.find("[data-kendo-uid=" + dataSource.at(0).uid + "]");

        stub(setting, "add");

        configurator.treeView.trigger("drop", {
            preventDefault: $.noop,
            dropTarget: setting.element,
            sourceNode: sourceNode
        });

        var args = setting.args("add")[0];
        equal(args, "[foo].[foo]");
    });
})();
