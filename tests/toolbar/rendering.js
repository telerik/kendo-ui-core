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

        ok(container.children("a[role=button]").length, "Button element is rendered");
        equal(container.children().text(), "foo", "Button has correct text");
    });

    test("renders toggleButton from JSON", 2, function() {
        container.kendoToolBar({
            items: [
                { type: "toggleButton", text: "foo" }
            ]
        });

        ok(container.children("a[role=togglebutton]").length, "ToggleButton element is rendered");
        equal(container.children().text(), "foo", "ToggleButton has correct text");
    });

    test("renders buttonGroup from JSON", 2, function() {
        container.kendoToolBar({
            items: [
                { type: "buttonGroup", items: [
                        { type: "button", id: "btn1", text: "Btn1" },
                        { type: "button", id: "btn2", text: "Btn2" },
                        { type: "button", id: "btn3", text: "Btn3" }
                    ]
                }
            ]
        });

        ok(container.children("div.k-button-group").length, "ButtonGroup element is rendered");
        equal(container.find("div.k-button-group").children().length, 3, "Button group contains correct amount of items");
    });

    test("renders splitButton from JSON", 2, function() {
        container.kendoToolBar({
            items: [
                { type: "splitButton", id: "splitButton", name: "splitButton", text: "Split Button", options: [
                        { id: "option1", text: "Option 1" },
                        { id: "option2", text: "Option 2" },
                        { id: "option3", text: "Option 3" },
                        { id: "option4", text: "Option 4" }
                    ]
                }
            ]
        });

        ok(container.children("div.k-split-button").length, "SplitButton element is rendered");
        equal(container.find("div.k-split-button > .k-split-button-dropdown").children().length, 4, "SplitButton dropdown contains correct amount of items");
    });


    test("renders separator from JSON", 1, function() {
        container.kendoToolBar({
            items: [
                { type: "separator" }
            ]
        });

        ok(container.children(".k-toolbar-separator").length, "Separator element is rendered");
    });

})();
