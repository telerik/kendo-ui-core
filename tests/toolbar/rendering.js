(function() {
    var container,
        ToolBar = kendo.ui.ToolBar;

    module("kendo.ui.toolbar", {
        setup: function() {
            container = $("<div id='toolbar' />").appendTo(QUnit.fixture);
        },

        teardown: function() {
            if (container.data("kendoToolBar")) {
                container.kendoToolBar("destroy");
            }
        }
    });

    test("renders button from JSON", 2, function() {
        container.kendoToolBar({
            items: [
                { type: "button", text: "foo" }
            ]
        });

        ok(container.children("a[role=button]").length == 1, "Button element is rendered");
        equal(container.children().text(), "foo", "Button has correct text");
    });

    test("renders toggleButton from JSON", 2, function() {
        container.kendoToolBar({
            items: [
                { type: "toggleButton", text: "foo" }
            ]
        });

        ok(container.children("a[role=togglebutton]").length == 1, "ToggleButton element is rendered");
        equal(container.children().text(), "foo", "ToggleButton has correct text");
    });


})();
