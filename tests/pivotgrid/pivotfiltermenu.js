(function() {
    var PivotFilterMenu = kendo.ui.PivotFilterMenu,
        div;

    module("PivotFilterMenu initialziation", {
        setup: function() {
            kendo.ns = "kendo-";
            div = document.createElement("div");
            QUnit.fixture[0].appendChild(div);
        },
        teardown: function() {
            var component = $(div).data("kendoPivotFilterMenu");
            if (component) {
                component.destroy();
            }
            kendo.destroy(QUnit.fixture);
            kendo.ns = "";
        }
    });

    function createMenu(options) {
        options = $.extend({}, {
            dataSource: {
                transport: {
                    discover: function(options) {
                        options.success([]);
                    }
                }
            }
        }, options);

        return new PivotFilterMenu(div, options);
    }

    function createDataSource() {
        return new kendo.data.PivotDataSource({
            schema: {
                axes: "axes",
                data: "data"
            },
            transport: {
                read: function(options) {
                    options.success({
                        axes: {
                            columns: {
                                tuples: []
                            }
                        },
                        data: []
                    });
                }
            }
        });
    }

    test("kendoPivotFilterMenu attaches a filter menu object to target", function() {
        var menu = $(div).kendoPivotFilterMenu({ });

        ok(menu.data("kendoPivotFilterMenu") instanceof PivotFilterMenu);
    });

    test("context menu is initialized", function() {
        var filterMenu = createMenu();

        equal(filterMenu.menu, filterMenu.wrapper.data("kendoContextMenu"));
    });

    test("window is initialized", function() {
        var filterMenu = createMenu();

        ok(filterMenu.includeWindow instanceof kendo.ui.Window);
    });

    test("window opens on context menu select", function() {
        var filterMenu = createMenu();

        filterMenu.menu.open();
        filterMenu.menu.element.find(".k-include-item").click();

        ok(filterMenu.includeWindow.element.is(":visible"));
    });

    test("treeview is initialized in the window", function() {
        var filterMenu = createMenu();

        filterMenu.includeWindow.open();

        ok(filterMenu.includeWindow.element.find(".k-treeview").data("kendoTreeView"));
    });

    test("treeview is not bound initially", function() {
        var filterMenu = createMenu();

        filterMenu.includeWindow.open();

        ok(!filterMenu.treeView.options.autoBind);
    });

    test("treeview schema id is uniqueName", function() {
        var filterMenu = createMenu();

        filterMenu.includeWindow.open();

        var dataSource = filterMenu.treeView.dataSource;

        var model = new dataSource.reader.model;

        equal(model.idField, "uniqueName");
    });

    test("treeview hasChildren returns true for items with childrenCardinality", function() {
        var filterMenu = createMenu();

        filterMenu.includeWindow.open();

        var dataSource = filterMenu.treeView.dataSource;

        var model = new dataSource.reader.model({ childrenCardinality: 10 });

        ok(model.hasChildren);
    });

    test("treeview hasChildren returns false for items with zero childrenCardinality", function() {
        var filterMenu = createMenu();

        filterMenu.includeWindow.open();

        var dataSource = filterMenu.treeView.dataSource;

        var model = new dataSource.reader.model({ childrenCardinality: 0 });

        ok(!model.hasChildren);
    });

    test("treeview transport calls pivotDataSource for list of members", function() {
        var filterMenu = createMenu();

        filterMenu.includeWindow.open();

        var schemaMembers = stub(filterMenu.dataSource, { schemaMembers: filterMenu.dataSource.schemaMembers });
        var dataSource = filterMenu.treeView.dataSource;

        dataSource.read();

        equal(schemaMembers.calls("schemaMembers"), 1);
    });

    test("treeview transport calls pivotDataSource with levelUniqueName", function() {
        var filterMenu = createMenu();

        filterMenu.currentMember = "foo";
        filterMenu.includeWindow.open();

        var schemaMembers = stub(filterMenu.dataSource, { schemaMembers: filterMenu.dataSource.schemaMembers });
        var dataSource = filterMenu.treeView.dataSource;

        dataSource.read();

        equal(schemaMembers.args("schemaMembers")[0].levelUniqueName, "foo.[(ALL)]");
    });

    test("treeview transport calls pivotDataSource with memberUniqueName", function() {
        var data = [
            [{ uniqueName: "foo", childrenCardinality: 2 }],
            [{ uniqueName: "bar" }, { uniqueName: "baz"}]
        ];
        var filterMenu = createMenu({
            dataSource: {
                transport: {
                    discover: function(options) {
                        options.success(data.shift());
                    }
                }
            }
        });

        filterMenu.currentMember = "foo";
        filterMenu.includeWindow.open();

        var schemaMembers = stub(filterMenu.dataSource, { schemaMembers: filterMenu.dataSource.schemaMembers });
        var dataSource = filterMenu.treeView.dataSource;

        dataSource.at(0).load();

        var args = schemaMembers.args("schemaMembers")[0];
        equal(args.memberUniqueName, "foo");
        equal(args.treeOp, 1);
    });

    test("treeview node is checked without filter expressions", function() {
        var filterMenu = createMenu({
            dataSource: {
                transport: {
                    discover: function(options) {
                        options.success([{ uniqueName: "foo" }]);
                    }
                }
            }
        });

        filterMenu.currentMember = "foo";
        filterMenu.includeWindow.open();

        var dataSource = filterMenu.treeView.dataSource;

        ok(dataSource.at(0).checked);
    });

    test("treeview node is checked when there isn't filter expressios for current member", function() {
        var filterMenu = createMenu({
            dataSource: {
                filter: { field: "baz", operator: "in", value: "baz" },
                transport: {
                    discover: function(options) {
                        options.success([{ uniqueName: "foo" }]);
                    }
                }
            }
        });

        filterMenu.currentMember = "foo";
        filterMenu.includeWindow.open();

        var dataSource = filterMenu.treeView.dataSource;

        ok(dataSource.at(0).checked);
    });

    test("treeview node is not checked when there is filter expressios for current member", function() {
        var filterMenu = createMenu({
            dataSource: {
                filter: { field: "foo", operator: "in", value: "baz" },
                transport: {
                    discover: function(options) {
                        options.success([{ uniqueName: "foo" }]);
                    }
                }
            }
        });

        filterMenu.currentMember = "foo";
        filterMenu.includeWindow.open();

        var dataSource = filterMenu.treeView.dataSource;

        ok(!dataSource.at(0).checked);
    });

    test("treeview node is checked when there isn't `in` filter expressios for current member", function() {
        var filterMenu = createMenu({
            dataSource: {
                filter: { field: "foo", operator: "eq", value: "foo" },
                transport: {
                    discover: function(options) {
                        options.success([{ uniqueName: "foo" }]);
                    }
                }
            }
        });

        filterMenu.currentMember = "foo";
        filterMenu.includeWindow.open();

        var dataSource = filterMenu.treeView.dataSource;

        ok(dataSource.at(0).checked);
    });

    test("treeview node is checked when there is filter expressios for current member and current member is in the value", function() {
        var filterMenu = createMenu({
            dataSource: {
                filter: { field: "foo", operator: "in", value: "foo" },
                transport: {
                    discover: function(options) {
                        options.success([{ uniqueName: "foo" }]);
                    }
                }
            }
        });

        filterMenu.currentMember = "foo";
        filterMenu.includeWindow.open();

        var dataSource = filterMenu.treeView.dataSource;

        ok(dataSource.at(0).checked);
    });

    test("treeview node is checked depending on the first `in` filter expression", function() {
        var filterMenu = createMenu({
            dataSource: {
                filter: {
                    logic: "and",
                    filters: [
                        { field: "foo", operator: "in", value: "baz" },
                        { field: "foo", operator: "in", value: "foo" },
                    ]
                },
                transport: {
                    discover: function(options) {
                        options.success([{ uniqueName: "foo" }]);
                    }
                }
            }
        });

        filterMenu.currentMember = "foo";
        filterMenu.includeWindow.open();

        var dataSource = filterMenu.treeView.dataSource;

        ok(!dataSource.at(0).checked);
    });

    test("filter expression is not build for checked root node", function() {
        var filterMenu = createMenu({
            dataSource: {
                transport: {
                    discover: function(options) {
                        options.success([{ uniqueName: "foo", childrenCardinality: 2 }]);
                    },
                    read: function(options) {
                        options.success([]);
                    }
                }
            }
        });

        filterMenu.currentMember = "foo";
        filterMenu.includeWindow.open();
        filterMenu.includeWindow.element.find(".k-button-ok").click();

        var filter = filterMenu.dataSource.filter();
        ok(!filter);
    });

    test("filter expression is not build for unchecked root node when there isn't filter expressions", function() {
        var filterMenu = createMenu({
            dataSource: {
                transport: {
                    discover: function(options) {
                        options.success([{ uniqueName: "foo", childrenCardinality: 2 }]);
                    },
                    read: function(options) {
                        options.success([]);
                    }
                }
            }
        });

        filterMenu.currentMember = "foo";
        filterMenu.includeWindow.open();

        filterMenu.treeView.dataSource.at(0).set("checked", false);
        filterMenu.includeWindow.element.find(".k-button-ok").click();

        var filter = filterMenu.dataSource.filter();
        ok(!filter);
    });

    test("filter expression is build for checked nodes", function() {
        var data = [
            [{ uniqueName: "foo", childrenCardinality: 2 }],
            [{ uniqueName: "bar" }, { uniqueName: "baz"}]
        ];
        var filterMenu = createMenu({
            dataSource: {
                transport: {
                    discover: function(options) {
                        options.success(data.shift());
                    },
                    read: function(options) {
                        options.success([]);
                    }
                }
            }
        });

        filterMenu.currentMember = "foo";
        filterMenu.includeWindow.open();

        filterMenu.treeView.dataSource.at(0).load();

        filterMenu.treeView.dataSource.get("bar").set("checked", false);
        filterMenu.includeWindow.element.find(".k-button-ok").click();

        var filter = filterMenu.dataSource.filter();
        equal(filter.filters.length, 1);
        equal(filter.filters[0].field, "foo");
        equal(filter.filters[0].operator, "in");
        equal(filter.filters[0].value, "baz");
    });

    test("existing `in` filter expressions is modified", function() {
        var data = [
            [{ uniqueName: "foo", childrenCardinality: 2 }],
            [{ uniqueName: "bar" }, { uniqueName: "baz"}, { uniqueName: "bax"}]
        ];
        var filterMenu = createMenu({
            dataSource: {
                transport: {
                    discover: function(options) {
                        options.success(data.shift());
                    },
                    read: function(options) {
                        options.success([]);
                    }
                },
                filter: { field: "foo", operator: "in", value: "bax" }
            }
        });

        filterMenu.currentMember = "foo";
        filterMenu.includeWindow.open();

        filterMenu.treeView.dataSource.at(0).load();

        filterMenu.treeView.dataSource.get("bar").set("checked", false);
        filterMenu.treeView.dataSource.get("baz").set("checked", true);
        filterMenu.includeWindow.element.find(".k-button-ok").click();

        var filter = filterMenu.dataSource.filter();
        equal(filter.filters.length, 1);
        equal(filter.filters[0].field, "foo");
        equal(filter.filters[0].operator, "in");
        equal(filter.filters[0].value, "baz,bax");
    });

    test("existing `in` filter expressions is removed", function() {
        var data = [
            [{ uniqueName: "foo", childrenCardinality: 2 }],
            [{ uniqueName: "bar" }, { uniqueName: "baz"}, { uniqueName: "bax"}]
        ];
        var filterMenu = createMenu({
            dataSource: {
                transport: {
                    discover: function(options) {
                        options.success(data.shift());
                    },
                    read: function(options) {
                        options.success([]);
                    }
                },
                filter: { field: "foo", operator: "in", value: "bax" },
                filter: { field: "baz", operator: "in", value: "bax" }
            }
        });

        filterMenu.currentMember = "foo";
        filterMenu.includeWindow.open();

        filterMenu.treeView.dataSource.at(0).load();

        filterMenu.treeView.dataSource.get("foo").set("checked", true);
        filterMenu.includeWindow.element.find(".k-button-ok").click();

        var filter = filterMenu.dataSource.filter();
        equal(filter.filters.length, 1);
    });

    test("filter expressions are cleared when last `in` expression is removed", function() {
        var data = [
            [{ uniqueName: "foo", childrenCardinality: 2 }],
            [{ uniqueName: "bar" }, { uniqueName: "baz"}, { uniqueName: "bax"}]
        ];
        var filterMenu = createMenu({
            dataSource: {
                transport: {
                    discover: function(options) {
                        options.success(data.shift());
                    },
                    read: function(options) {
                        options.success([]);
                    }
                },
                filter: { field: "foo", operator: "in", value: "bax" }
            }
        });

        filterMenu.currentMember = "foo";
        filterMenu.includeWindow.open();

        filterMenu.treeView.dataSource.at(0).load();

        filterMenu.treeView.dataSource.get("foo").set("checked", true);
        filterMenu.includeWindow.element.find(".k-button-ok").click();

        var filter = filterMenu.dataSource.filter();
        ok(!filter);
    });

    test("filter expression is not build if root node is checked and there aren't existing filter expressions", function() {
        var data = [
            [{ uniqueName: "foo", childrenCardinality: 2 }],
            [{ uniqueName: "bar" }, { uniqueName: "baz"}, { uniqueName: "bax"}]
        ];
        var filterMenu = createMenu({
            dataSource: {
                transport: {
                    discover: function(options) {
                        options.success(data.shift());
                    },
                    read: function(options) {
                        options.success([]);
                    }
                }
            }
        });

        filterMenu.currentMember = "foo";
        filterMenu.includeWindow.open();

        filterMenu.treeView.dataSource.at(0).load();

        filterMenu.treeView.dataSource.get("foo").set("checked", false);
        filterMenu.treeView.dataSource.get("foo").set("checked", true);
        filterMenu.includeWindow.element.find(".k-button-ok").click();

        var filter = filterMenu.dataSource.filter();
        ok(!filter);
    });

    test("existing filter expressins are preserved", function() {
        var data = [
            [{ uniqueName: "foo", childrenCardinality: 2 }],
            [{ uniqueName: "bar" }, { uniqueName: "baz"}, { uniqueName: "bax"}]
        ];
        var filterMenu = createMenu({
            dataSource: {
                transport: {
                    discover: function(options) {
                        options.success(data.shift());
                    },
                    read: function(options) {
                        options.success([]);
                    }
                },
                filter: { field: "foo", operator: "in", value: "bax" },
                filter: { field: "baz", operator: "in", value: "bax" }
            }
        });

        filterMenu.currentMember = "foo";
        filterMenu.includeWindow.open();

        filterMenu.treeView.dataSource.at(0).load();

        filterMenu.treeView.dataSource.get("baz").set("checked", false);
        filterMenu.includeWindow.element.find(".k-button-ok").click();

        var filter = filterMenu.dataSource.filter();
        equal(filter.filters.length, 2);

        equal(filter.filters[0].field, "baz");
        equal(filter.filters[0].operator, "in");
        equal(filter.filters[0].value, "bax");

        equal(filter.filters[1].field, "foo");
        equal(filter.filters[1].operator, "in");
        equal(filter.filters[1].value, "bar,bax");

    });

    test("existing `in` filter expressions is removed when root node is checked and children are not loaded", function() {
        var data = [
            [{ uniqueName: "foo", childrenCardinality: 2 }],
            [{ uniqueName: "bar" }, { uniqueName: "baz"}, { uniqueName: "bax"}]
        ];
        var filterMenu = createMenu({
            dataSource: {
                transport: {
                    discover: function(options) {
                        options.success(data.shift());
                    },
                    read: function(options) {
                        options.success([]);
                    }
                },
                filter: { field: "foo", operator: "in", value: "bax" },
                filter: { field: "baz", operator: "in", value: "bax" }
            }
        });

        filterMenu.currentMember = "foo";
        filterMenu.includeWindow.open();

        filterMenu.treeView.dataSource.get("foo").set("checked", true);
        filterMenu.includeWindow.element.find(".k-button-ok").click();

        var filter = filterMenu.dataSource.filter();
        equal(filter.filters.length, 1);
    });

    test("filter expressions are cleared when root node is checked and its children are not loaded", function() {
        var data = [
            [{ uniqueName: "foo", childrenCardinality: 2 }],
            [{ uniqueName: "bar" }, { uniqueName: "baz"}, { uniqueName: "bax"}]
        ];
        var filterMenu = createMenu({
            dataSource: {
                transport: {
                    discover: function(options) {
                        options.success(data.shift());
                    },
                    read: function(options) {
                        options.success([]);
                    }
                },
                filter: { field: "foo", operator: "in", value: "bax" }
            }
        });

        filterMenu.currentMember = "foo";
        filterMenu.includeWindow.open();

        filterMenu.treeView.dataSource.get("foo").set("checked", true);
        filterMenu.includeWindow.element.find(".k-button-ok").click();

        var filter = filterMenu.dataSource.filter();
        ok(!filter);
    });

    test("add label filter form on menu init", function() {
        var idx = 0;
        var filterMenu = createMenu();
        var filterItem = filterMenu.menu.element.find(".k-filter-item");
        var filterForm = filterItem.find("div").eq(0);
        var select = filterForm.find("select")[0];

        equal(filterForm.find(".k-filter-help-text").text(), filterMenu.options.messages.info);

        for (var operator in filterMenu.options.operators) {
            equal(select.options[idx].value, operator);
            idx++;
        }

        equal(filterForm.find(".k-button").length, 2);
    });

    test("create a dropdownlist for operators", function() {
        var filterMenu = createMenu();
        var filterItem = filterMenu.menu.element.find(".k-filter-item");
        var select = filterItem.find("select");

        ok(select.data("kendoDropDownList"));
    });

    test("filter data source on filter button click", function() {
        var filterMenu = createMenu();
        var dataSource = filterMenu.dataSource;
        var filterItem = filterMenu.menu.element.find(".k-filter-item");

        filterItem.find("select").data("kendoDropDownList").value("eq");
        filterItem.find("input").val("chai");

        stub(dataSource, "filter");

        filterItem.find(".k-button-filter").click();

        var expression = dataSource.args("filter")[0].filters[0];

        equal(expression.field, filterMenu.currentMember);
        equal(expression.operator, "eq");
        equal(expression.value, "chai");
    });

    test("do not filter data source if no value", function() {
        var filterMenu = createMenu();
        var dataSource = filterMenu.dataSource;
        var filterItem = filterMenu.menu.element.find(".k-filter-item");

        filterItem.find("select").data("kendoDropDownList").value("eq");
        filterItem.find("input").val("");

        stub(dataSource, "filter");

        filterItem.find(".k-button-filter").click();

        ok(!dataSource.calls("filter"));
    });

    test("filter form removes existing filter before filter", function() {
        var dataSource = createDataSource();
        var filterMenu = createMenu({ dataSource: dataSource });
        var filterItem = filterMenu.menu.element.find(".k-filter-item");

        dataSource.filter({
            field: filterMenu.currentMember,
            operator: "eq",
            value: "test"
        });

        filterItem.find("select").data("kendoDropDownList").value("eq");
        filterItem.find("input").val("chai");

        filterItem.find(".k-button-filter").click();

        var filters = dataSource.filter().filters;

        equal(filters.length, 1);
        equal(filters[0].field, filterMenu.currentMember);
        equal(filters[0].operator, "eq");
        equal(filters[0].value, "chai");
    });

    test("filter form preserves filters on 'in' operators", function() {
        var dataSource = createDataSource();
        var filterMenu = createMenu({ dataSource: dataSource });
        var filterItem = filterMenu.menu.element.find(".k-filter-item");

        dataSource.filter({
            field: filterMenu.currentMember,
            operator: "in",
            value: "test"
        });

        filterItem.find("select").data("kendoDropDownList").value("contains");
        filterItem.find("input").val("chai");

        filterItem.find(".k-button-filter").click();

        var filters = dataSource.filter().filters;

        equal(filters.length, 2);
        equal(filters[0].field, filterMenu.currentMember);
        equal(filters[0].operator, "in");
        equal(filters[0].value, "test");

        equal(filters[1].field, filterMenu.currentMember);
        equal(filters[1].operator, "contains");
        equal(filters[1].value, "chai");
    });

    test("clear filter on clear button click", function() {
        var dataSource = createDataSource();
        var filterMenu = createMenu({ dataSource: dataSource });
        var filterItem = filterMenu.menu.element.find(".k-filter-item");

        dataSource.filter({
            field: filterMenu.currentMember,
            operator: "eq",
            value: "test"
        });

        filterItem.find(".k-button-clear").click();

        var filters = dataSource.filter();

        ok(!filters);
    });

    test("reset form on clear button click", function() {
        var dataSource = createDataSource();
        var filterMenu = createMenu({ dataSource: dataSource });
        var filterItem = filterMenu.menu.element.find(".k-filter-item");

        dataSource.filter({
            field: filterMenu.currentMember,
            operator: "eq",
            value: "test"
        });

        filterItem.find(".k-button-clear").click();

        equal(filterItem.find("select").val(), "contains");
        equal(filterItem.find("input").val(), "");
    });

    test("close context menu on filter", function() {
        var dataSource = createDataSource();
        var filterMenu = createMenu({ dataSource: dataSource });
        var filterItem = filterMenu.menu.element.find(".k-filter-item");

        stub(filterMenu.menu, "close");

        filterItem.find(".k-button-filter").click();

        ok(filterMenu.menu.calls("close"));
    });

    test("close context menu on reset", function() {
        var dataSource = createDataSource();
        var filterMenu = createMenu({ dataSource: dataSource });
        var filterItem = filterMenu.menu.element.find(".k-filter-item");

        stub(filterMenu.menu, "close");

        filterItem.find(".k-button-clear").click();

        ok(filterMenu.menu.calls("close"));
    });
})();
