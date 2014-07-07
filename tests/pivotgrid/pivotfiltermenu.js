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
        return new PivotFilterMenu(div, options || {});
    }

    test("kendoPivotFilterMenu attaches a filter menu object to target", function() {
        var menu = $(div).kendoPivotFilterMenu({ });

        ok(menu.data("kendoPivotFilterMenu") instanceof PivotFilterMenu);
    });

    test("kendoContextMenu is initialized", function() {
        var filterMenu = createMenu();

        equal(filterMenu.menu, filterMenu.wrapper.data("kendoContextMenu"));
    });
})();
