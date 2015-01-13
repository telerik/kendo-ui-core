(function() {
    var PivotFieldMenu = kendo.ui.PivotFieldMenu,
        div;

    module("PivotFieldMenu initialziation", {
        setup: function() {
            kendo.ns = "kendo-";
            div = document.createElement("div");
            QUnit.fixture[0].appendChild(div);
        },
        teardown: function() {
            var component = $(div).data("kendoPivotFieldMenu");
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

        return new PivotFieldMenu(div, options);
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

    test("kendoPivotFieldMenu attaches a field menu object to target", function() {
        var menu = $(div).kendoPivotFieldMenu({ });

        ok(menu.data("kendoPivotFieldMenu") instanceof PivotFieldMenu);
    });

    test("context menu is initialized", function() {
        var fieldmenu = createMenu();

        equal(fieldmenu.menu, fieldmenu.wrapper.data("kendoContextMenu"));
    });

    test("context menu shows filter fields", function() {
        var fieldmenu = createMenu();

        var include = fieldmenu.menu.element.find(".k-include-item");
        var filter = fieldmenu.menu.element.find(".k-filter-item");

        ok(include[0]);
        ok(filter[0]);
    });

    test("context menu skips filter fields", function() {
        var fieldmenu = createMenu({
            filterable: false
        });

        var include = fieldmenu.menu.element.find(".k-include-item");
        var filter = fieldmenu.menu.element.find(".k-filter-item");

        ok(!include[0]);
        ok(!filter[0]);
    });

    test("context menu shows sort fields", function() {
        var fieldmenu = createMenu();

        var asc = fieldmenu.menu.element.find(".k-sort-asc");
        var desc = fieldmenu.menu.element.find(".k-sort-desc");

        ok(asc[0]);
        ok(desc[0]);

        ok(asc.find(".k-i-sort-asc")[0]);
        ok(desc.find(".k-i-sort-desc")[0]);

        equal(asc.find(".k-link").text(), "Sort Ascending");
        equal(desc.find(".k-link").text(), "Sort Descending");
    });

    test("context menu skips sort fields", function() {
        var fieldmenu = createMenu({
            sortable: false
        });

        var asc = fieldmenu.menu.element.find(".k-sort-asc");
        var desc = fieldmenu.menu.element.find(".k-sort-desc");

        ok(!asc[0]);
        ok(!desc[0]);
    });

    test("window is initialized", function() {
        var fieldmenu = createMenu();

        ok(fieldmenu.includeWindow instanceof kendo.ui.Window);
    });

    test("window opens on context menu select", function() {
        var fieldmenu = createMenu();

        fieldmenu.menu.open();
        fieldmenu.menu.element.find(".k-include-item").click();

        ok(fieldmenu.includeWindow.element.is(":visible"));
    });

    test("treeview is initialized in the window", function() {
        var fieldmenu = createMenu();

        fieldmenu.includeWindow.open();

        ok(fieldmenu.includeWindow.element.find(".k-treeview").data("kendoTreeView"));
    });

    test("treeview is not bound initially", function() {
        var fieldmenu = createMenu();

        fieldmenu.includeWindow.open();

        ok(!fieldmenu.treeView.options.autoBind);
    });

    test("treeview schema id is uniqueName", function() {
        var fieldmenu = createMenu();

        fieldmenu.includeWindow.open();

        var dataSource = fieldmenu.treeView.dataSource;

        var model = new dataSource.reader.model;

        equal(model.idField, "uniqueName");
    });

    test("treeview uses 'caption' field for dataTextField option", function() {
        var fieldmenu = createMenu();

        fieldmenu.includeWindow.open();

        var field = fieldmenu.treeView.options.dataTextField;

        equal(field, "caption");
    });

    test("treeview uses 'name' if caption is not defined in model", function() {
        var fieldmenu = createMenu();

        fieldmenu.includeWindow.open();

        var treeView = fieldmenu.treeView;

        treeView.dataSource.data([
            { name: "test" }
        ]);

        var li = treeView.element.find("li");

        equal(li.text(), "test");
    });

    test("treeview hasChildren returns true for items with childrenCardinality", function() {
        var fieldmenu = createMenu();

        fieldmenu.includeWindow.open();

        var dataSource = fieldmenu.treeView.dataSource;

        var model = new dataSource.reader.model({ childrenCardinality: 10 });

        ok(model.hasChildren);
    });

    test("treeview hasChildren returns false for items with zero childrenCardinality", function() {
        var fieldmenu = createMenu();

        fieldmenu.includeWindow.open();

        var dataSource = fieldmenu.treeView.dataSource;

        var model = new dataSource.reader.model({ childrenCardinality: 0 });

        ok(!model.hasChildren);
    });

    test("treeview transport calls pivotDataSource for list of members", function() {
        var fieldmenu = createMenu();

        fieldmenu.includeWindow.open();

        var schemaMembers = stub(fieldmenu.dataSource, { schemaMembers: fieldmenu.dataSource.schemaMembers });
        var dataSource = fieldmenu.treeView.dataSource;

        dataSource.read();

        equal(schemaMembers.calls("schemaMembers"), 1);
    });

    test("treeview transport calls pivotDataSource with levelUniqueName", function() {
        var fieldmenu = createMenu();

        fieldmenu.currentMember = "foo";
        fieldmenu.includeWindow.open();

        var schemaMembers = stub(fieldmenu.dataSource, { schemaMembers: fieldmenu.dataSource.schemaMembers });
        var dataSource = fieldmenu.treeView.dataSource;

        dataSource.read();

        equal(schemaMembers.args("schemaMembers")[0].levelUniqueName, "foo.[(ALL)]");
    });

    test("treeview transport calls pivotDataSource with memberUniqueName", function() {
        var data = [
            [{ uniqueName: "foo", childrenCardinality: 2 }],
            [{ uniqueName: "bar" }, { uniqueName: "baz"}]
        ];
        var fieldmenu = createMenu({
            dataSource: {
                transport: {
                    discover: function(options) {
                        options.success(data.shift());
                    }
                }
            }
        });

        fieldmenu.currentMember = "foo";
        fieldmenu.includeWindow.open();

        var schemaMembers = stub(fieldmenu.dataSource, { schemaMembers: fieldmenu.dataSource.schemaMembers });
        var dataSource = fieldmenu.treeView.dataSource;

        dataSource.at(0).load();

        var args = schemaMembers.args("schemaMembers")[0];
        equal(args.memberUniqueName, "foo");
        equal(args.treeOp, 1);
    });

    test("treeview node is checked without filter expressions", function() {
        var fieldmenu = createMenu({
            dataSource: {
                transport: {
                    discover: function(options) {
                        options.success([{ uniqueName: "foo" }]);
                    }
                }
            }
        });

        fieldmenu.currentMember = "foo";
        fieldmenu.includeWindow.open();

        var dataSource = fieldmenu.treeView.dataSource;

        ok(dataSource.at(0).checked);
    });

    test("treeview node is checked when there isn't filter expressios for current member", function() {
        var fieldmenu = createMenu({
            dataSource: {
                filter: { field: "baz", operator: "in", value: "baz" },
                transport: {
                    discover: function(options) {
                        options.success([{ uniqueName: "foo" }]);
                    }
                }
            }
        });

        fieldmenu.currentMember = "foo";
        fieldmenu.includeWindow.open();

        var dataSource = fieldmenu.treeView.dataSource;

        ok(dataSource.at(0).checked);
    });

    test("treeview node is not checked when there is filter expressios for current member", function() {
        var fieldmenu = createMenu({
            dataSource: {
                filter: { field: "foo", operator: "in", value: "baz" },
                transport: {
                    discover: function(options) {
                        options.success([{ uniqueName: "foo" }]);
                    }
                }
            }
        });

        fieldmenu.currentMember = "foo";
        fieldmenu.includeWindow.open();

        var dataSource = fieldmenu.treeView.dataSource;

        ok(!dataSource.at(0).checked);
    });

    test("treeview node is checked when there isn't `in` filter expressios for current member", function() {
        var fieldmenu = createMenu({
            dataSource: {
                filter: { field: "foo", operator: "eq", value: "foo" },
                transport: {
                    discover: function(options) {
                        options.success([{ uniqueName: "foo" }]);
                    }
                }
            }
        });

        fieldmenu.currentMember = "foo";
        fieldmenu.includeWindow.open();

        var dataSource = fieldmenu.treeView.dataSource;

        ok(dataSource.at(0).checked);
    });

    test("treeview node is checked when there is filter expressios for current member and current member is in the value", function() {
        var fieldmenu = createMenu({
            dataSource: {
                filter: { field: "foo", operator: "in", value: "foo" },
                transport: {
                    discover: function(options) {
                        options.success([{ uniqueName: "foo" }]);
                    }
                }
            }
        });

        fieldmenu.currentMember = "foo";
        fieldmenu.includeWindow.open();

        var dataSource = fieldmenu.treeView.dataSource;

        ok(dataSource.at(0).checked);
    });

    test("treeview node is checked depending on the first `in` filter expression", function() {
        var fieldmenu = createMenu({
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

        fieldmenu.currentMember = "foo";
        fieldmenu.includeWindow.open();

        var dataSource = fieldmenu.treeView.dataSource;

        ok(!dataSource.at(0).checked);
    });

    test("filter expression is not build for checked root node", function() {
        var fieldmenu = createMenu({
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

        fieldmenu.currentMember = "foo";
        fieldmenu.includeWindow.open();
        fieldmenu.includeWindow.element.find(".k-button-ok").click();

        var filter = fieldmenu.dataSource.filter();
        ok(!filter);
    });

    test("filter expression is not build for unchecked root node when there isn't filter expressions", function() {
        var fieldmenu = createMenu({
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

        fieldmenu.currentMember = "foo";
        fieldmenu.includeWindow.open();

        fieldmenu.treeView.dataSource.at(0).set("checked", false);
        fieldmenu.includeWindow.element.find(".k-button-ok").click();

        var filter = fieldmenu.dataSource.filter();
        ok(!filter);
    });

    test("filter expression is build for checked nodes", function() {
        var data = [
            [{ uniqueName: "foo", childrenCardinality: 2 }],
            [{ uniqueName: "bar" }, { uniqueName: "baz"}]
        ];
        var fieldmenu = createMenu({
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

        fieldmenu.currentMember = "foo";
        fieldmenu.includeWindow.open();

        fieldmenu.treeView.dataSource.at(0).load();

        fieldmenu.treeView.dataSource.get("bar").set("checked", false);
        fieldmenu.includeWindow.element.find(".k-button-ok").click();

        var filter = fieldmenu.dataSource.filter();
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
        var fieldmenu = createMenu({
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

        fieldmenu.currentMember = "foo";
        fieldmenu.includeWindow.open();

        fieldmenu.treeView.dataSource.at(0).load();

        fieldmenu.treeView.dataSource.get("bar").set("checked", false);
        fieldmenu.treeView.dataSource.get("baz").set("checked", true);
        fieldmenu.includeWindow.element.find(".k-button-ok").click();

        var filter = fieldmenu.dataSource.filter();
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
        var fieldmenu = createMenu({
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

        fieldmenu.currentMember = "foo";
        fieldmenu.includeWindow.open();

        fieldmenu.treeView.dataSource.at(0).load();

        fieldmenu.treeView.dataSource.get("foo").set("checked", true);
        fieldmenu.includeWindow.element.find(".k-button-ok").click();

        var filter = fieldmenu.dataSource.filter();
        equal(filter.filters.length, 1);
    });

    test("filter expressions are cleared when last `in` expression is removed", function() {
        var data = [
            [{ uniqueName: "foo", childrenCardinality: 2 }],
            [{ uniqueName: "bar" }, { uniqueName: "baz"}, { uniqueName: "bax"}]
        ];
        var fieldmenu = createMenu({
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

        fieldmenu.currentMember = "foo";
        fieldmenu.includeWindow.open();

        fieldmenu.treeView.dataSource.at(0).load();

        fieldmenu.treeView.dataSource.get("foo").set("checked", true);
        fieldmenu.includeWindow.element.find(".k-button-ok").click();

        var filter = fieldmenu.dataSource.filter();
        ok(!filter);
    });

    test("filter expression is not build if root node is checked and there aren't existing filter expressions", function() {
        var data = [
            [{ uniqueName: "foo", childrenCardinality: 2 }],
            [{ uniqueName: "bar" }, { uniqueName: "baz"}, { uniqueName: "bax"}]
        ];
        var fieldmenu = createMenu({
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

        fieldmenu.currentMember = "foo";
        fieldmenu.includeWindow.open();

        fieldmenu.treeView.dataSource.at(0).load();

        fieldmenu.treeView.dataSource.get("foo").set("checked", false);
        fieldmenu.treeView.dataSource.get("foo").set("checked", true);
        fieldmenu.includeWindow.element.find(".k-button-ok").click();

        var filter = fieldmenu.dataSource.filter();
        ok(!filter);
    });

    test("existing filter expressins are preserved", function() {
        var data = [
            [{ uniqueName: "foo", childrenCardinality: 2 }],
            [{ uniqueName: "bar" }, { uniqueName: "baz"}, { uniqueName: "bax"}]
        ];
        var fieldmenu = createMenu({
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

        fieldmenu.currentMember = "foo";
        fieldmenu.includeWindow.open();

        fieldmenu.treeView.dataSource.at(0).load();

        fieldmenu.treeView.dataSource.get("baz").set("checked", false);
        fieldmenu.includeWindow.element.find(".k-button-ok").click();

        var filter = fieldmenu.dataSource.filter();
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
        var fieldmenu = createMenu({
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

        fieldmenu.currentMember = "foo";
        fieldmenu.includeWindow.open();

        fieldmenu.treeView.dataSource.get("foo").set("checked", true);
        fieldmenu.includeWindow.element.find(".k-button-ok").click();

        var filter = fieldmenu.dataSource.filter();
        equal(filter.filters.length, 1);
    });

    test("filter expressions are cleared when root node is checked and its children are not loaded", function() {
        var data = [
            [{ uniqueName: "foo", childrenCardinality: 2 }],
            [{ uniqueName: "bar" }, { uniqueName: "baz"}, { uniqueName: "bax"}]
        ];
        var fieldmenu = createMenu({
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

        fieldmenu.currentMember = "foo";
        fieldmenu.includeWindow.open();

        fieldmenu.treeView.dataSource.get("foo").set("checked", true);
        fieldmenu.includeWindow.element.find(".k-button-ok").click();

        var filter = fieldmenu.dataSource.filter();
        ok(!filter);
    });

    test("add label filter form on menu init", function() {
        var idx = 0;
        var fieldmenu = createMenu();
        var filterItem = fieldmenu.menu.element.find(".k-filter-item");
        var filterForm = filterItem.find("div").eq(0);
        var select = filterForm.find("select")[0];

        equal(filterForm.find(".k-filter-help-text").text(), fieldmenu.options.messages.info);

        for (var operator in fieldmenu.options.operators) {
            equal(select.options[idx].value, operator);
            idx++;
        }

        equal(filterForm.find(".k-button").length, 2);
    });

    test("create a dropdownlist for operators", function() {
        var fieldmenu = createMenu();
        var filterItem = fieldmenu.menu.element.find(".k-filter-item");
        var select = filterItem.find("select");

        ok(select.data("kendoDropDownList"));
    });

    test("filter data source on filter button click", function() {
        var fieldmenu = createMenu();
        var dataSource = fieldmenu.dataSource;
        var filterItem = fieldmenu.menu.element.find(".k-filter-item");

        filterItem.find("select").data("kendoDropDownList").value("eq");
        filterItem.find("input").val("chai");

        stub(dataSource, "filter");

        filterItem.find(".k-button-filter").click();

        var expression = dataSource.args("filter")[0].filters[0];

        equal(expression.field, fieldmenu.currentMember);
        equal(expression.operator, "eq");
        equal(expression.value, "chai");
    });

    test("do not filter data source if no value", function() {
        var fieldmenu = createMenu();
        var dataSource = fieldmenu.dataSource;
        var filterItem = fieldmenu.menu.element.find(".k-filter-item");

        filterItem.find("select").data("kendoDropDownList").value("eq");
        filterItem.find("input").val("");

        stub(dataSource, "filter");

        filterItem.find(".k-button-filter").click();

        ok(!dataSource.calls("filter"));
    });

    test("filter form removes existing filter before filter", function() {
        var dataSource = createDataSource();
        var fieldmenu = createMenu({ dataSource: dataSource });
        var filterItem = fieldmenu.menu.element.find(".k-filter-item");

        dataSource.filter({
            field: fieldmenu.currentMember,
            operator: "eq",
            value: "test"
        });

        filterItem.find("select").data("kendoDropDownList").value("eq");
        filterItem.find("input").val("chai");

        filterItem.find(".k-button-filter").click();

        var filters = dataSource.filter().filters;

        equal(filters.length, 1);
        equal(filters[0].field, fieldmenu.currentMember);
        equal(filters[0].operator, "eq");
        equal(filters[0].value, "chai");
    });

    test("filter button prevents default", 1, function() {
        var dataSource = createDataSource();
        var fieldmenu = createMenu({ dataSource: dataSource });
        var filterItem = fieldmenu.menu.element.find(".k-filter-item");

        dataSource.filter({
            field: fieldmenu.currentMember,
            operator: "eq",
            value: "test"
        });

        filterItem.find("select").data("kendoDropDownList").value("eq");
        filterItem.find("input").val("chai");

        filterItem.find(".k-button-filter").trigger({
            type: "click",
            preventDefault: function() {
                ok(true);
            }
        });
    });

    test("filter form preserves filters on 'in' operators", function() {
        var dataSource = createDataSource();
        var fieldmenu = createMenu({ dataSource: dataSource });
        var filterItem = fieldmenu.menu.element.find(".k-filter-item");

        dataSource.filter({
            field: fieldmenu.currentMember,
            operator: "in",
            value: "test"
        });

        filterItem.find("select").data("kendoDropDownList").value("contains");
        filterItem.find("input").val("chai");

        filterItem.find(".k-button-filter").click();

        var filters = dataSource.filter().filters;

        equal(filters.length, 2);
        equal(filters[0].field, fieldmenu.currentMember);
        equal(filters[0].operator, "in");
        equal(filters[0].value, "test");

        equal(filters[1].field, fieldmenu.currentMember);
        equal(filters[1].operator, "contains");
        equal(filters[1].value, "chai");
    });

    test("clear filter on clear button click", function() {
        var dataSource = createDataSource();
        var fieldmenu = createMenu({ dataSource: dataSource });
        var filterItem = fieldmenu.menu.element.find(".k-filter-item");

        dataSource.filter({
            field: fieldmenu.currentMember,
            operator: "eq",
            value: "test"
        });

        filterItem.find(".k-button-clear").click();

        var filters = dataSource.filter();

        ok(!filters);
    });

    test("reset form on clear button click", function() {
        var dataSource = createDataSource();
        var fieldmenu = createMenu({ dataSource: dataSource });
        var filterItem = fieldmenu.menu.element.find(".k-filter-item");

        dataSource.filter({
            field: fieldmenu.currentMember,
            operator: "eq",
            value: "test"
        });

        filterItem.find(".k-button-clear").click();

        equal(filterItem.find("select").val(), "contains");
        equal(filterItem.find("input").val(), "");
    });

    test("clear button prevents default", 1, function() {
        var dataSource = createDataSource();
        var fieldmenu = createMenu({ dataSource: dataSource });
        var filterItem = fieldmenu.menu.element.find(".k-filter-item");

        dataSource.filter({
            field: fieldmenu.currentMember,
            operator: "eq",
            value: "test"
        });

        filterItem.find(".k-button-clear").trigger({
            type: "click",
            preventDefault: function() {
                ok(true);
            }
        });
    });

    test("filter item form submit is prevented", 0, function() {
        var dataSource = createDataSource();
        var fieldmenu = createMenu({ dataSource: dataSource });
        var filterItem = fieldmenu.menu.element.find(".k-filter-item");
        var form = filterItem.find("form");

        form.trigger({
            type: "submit"
        });
    });

    test("filter item form filters on submit", function() {
        var dataSource = createDataSource();
        var fieldmenu = createMenu({ dataSource: dataSource });
        var filterItem = fieldmenu.menu.element.find(".k-filter-item");

        filterItem.find("select").data("kendoDropDownList").value("eq");
        filterItem.find("input").val("chai");

        filterItem.find("form").submit();

        var filters = dataSource.filter().filters;

        equal(filters.length, 1);
        equal(filters[0].field, fieldmenu.currentMember);
        equal(filters[0].operator, "eq");
        equal(filters[0].value, "chai");
    });

    test("close context menu on filter", function() {
        var dataSource = createDataSource();
        var fieldmenu = createMenu({ dataSource: dataSource });
        var filterItem = fieldmenu.menu.element.find(".k-filter-item");

        stub(fieldmenu.menu, "close");

        filterItem.find(".k-button-filter").click();

        ok(fieldmenu.menu.calls("close"));
    });

    test("close context menu on reset", function() {
        var dataSource = createDataSource();
        var fieldmenu = createMenu({ dataSource: dataSource });
        var filterItem = fieldmenu.menu.element.find(".k-filter-item");

        stub(fieldmenu.menu, "close");

        filterItem.find(".k-button-clear").click();

        ok(fieldmenu.menu.calls("close"));
    });

    test("sort ascending button sorts pivotgrid", function() {
        var dataSource = createDataSource();
        var fieldmenu = createMenu({ dataSource: dataSource });
        var sortAscItem = fieldmenu.menu.element.find(".k-sort-asc");

        sortAscItem.click();

        var sort = dataSource.sort();

        equal(sort.length, 1);
        equal(sort[0].field, fieldmenu.currentMember);
        equal(sort[0].dir, "asc");
    });

    test("sort descending button sorts pivotgrid", function() {
        var dataSource = createDataSource();
        var fieldmenu = createMenu({ dataSource: dataSource });
        var sortAscItem = fieldmenu.menu.element.find(".k-sort-desc");

        sortAscItem.click();

        var sort = dataSource.sort();

        equal(sort.length, 1);
        equal(sort[0].field, fieldmenu.currentMember);
        equal(sort[0].dir, "desc");
    });

    test("sort button closes the menu", 1, function() {
        var dataSource = createDataSource();
        var fieldmenu = createMenu({ dataSource: dataSource });
        var sortAscItem = fieldmenu.menu.element.find(".k-sort-desc");

        fieldmenu.menu.open();

        fieldmenu.menu.bind("close", function() {
            ok(true);
        });

        sortAscItem.click();
    });

    test("sort button removes only current sort expression", function() {
        var dataSource = createDataSource();
        var fieldmenu = createMenu({ dataSource: dataSource });
        var sortAscItem = fieldmenu.menu.element.find(".k-sort-asc");

        dataSource.sort([{
            field: "test",
            dir: "desc"
        }, {
            field: fieldmenu.currentMember,
            dir: "desc"
        }]);

        sortAscItem.click();

        var sort = dataSource.sort();

        equal(sort.length, 2);

        equal(sort[0].field, "test");
        equal(sort[0].dir, "desc");

        equal(sort[1].field, fieldmenu.currentMember);
        equal(sort[1].dir, "asc");
    });
})();
