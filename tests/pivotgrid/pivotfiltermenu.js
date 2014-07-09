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

        equal(schemaMembers.args("schemaMembers")[0].levelUniqueName, "foo");
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

})();
