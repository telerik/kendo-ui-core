(function() {
    var container,
        ToolBar = kendo.ui.ToolBar;

    module("Toolbar: resizing", {
        setup: function() {
            container = $("<div id='toolbar' />").appendTo(QUnit.fixture);
        },

        teardown: function() {
            if (container.data("kendoToolBar")) {
                container.kendoToolBar("destroy");
            }
        }
    });

    test("buttons with overflow: auto are hidden upon initialization if there is not enough space", 4, function() {
        container.width(90);
        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", text: "foooooo" },
                { type: "button", text: "baaaaar" }
            ]
        }).data("kendoToolBar");

        var toolbarButtons = container.find(".k-button");
        ok(toolbarButtons.eq(0).is(":visible"), "First button is visible");
        ok(toolbarButtons.eq(1).is(":hidden"), "Second button is hidden");

        var overflowButtons = toolbar.popup.element.find(">li");
        ok(overflowButtons.eq(0).hasClass("k-overflow-hidden"), "First item is hidden");
        ok(!overflowButtons.eq(1).hasClass("k-overflow-hidden"), "Second item is visible");
    });

    test("buttons with overflow: always are always hidden upon initialization", 4, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", text: "foo" },
                { type: "button", text: "bar", overflow: "always" }
            ]
        }).data("kendoToolBar");

        var toolbarButton = container.find(".k-button");
        equal(toolbarButton.length, 1);
        ok(toolbarButton.is(":visible"), "Foo button is visible");

        var overflowButtons = toolbar.popup.element.find(">li");
        equal(overflowButtons.length, 2);
        ok(!overflowButtons.eq(1).hasClass("k-overflow-hidden"), "Bar item is visible");
    });

    test("Toolbar's popup is automatically closed on resize", 1, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", text: "foo" },
                { type: "button", text: "bar", overflow: "always" }
            ]
        }).data("kendoToolBar");

        var popup = toolbar.popup;
        popup.open();

        kendo.resize($("#toolbar"));
        ok(!popup.visible());
    });

    test("Toolbar items are automatically hidden on resize if there is not enough available space", 2, function() {
        container.width(400);
        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", text: "foooooo" },
                { type: "button", text: "baaaaar" },
                { type: "button", text: "baaaaaz" }
            ]
        }).data("kendoToolBar");

        container.width(200);
        toolbar.resize();

        var button = toolbar.element.find(".k-button").last();

        ok(button.is(":hidden"));

        var listItem = toolbar.popup.element.find(">li").last();

        ok(!listItem.hasClass("k-overflow-hidden"));
    });

    test("Toolbar items are automatically shown on resize if there is enough available space", 2, function() {
        container.width(200);
        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", text: "foooooo" },
                { type: "button", text: "baaaaar" },
                { type: "button", text: "baaaaaz" }
            ]
        }).data("kendoToolBar");

        container.width(400);
        toolbar.resize();

        var button = toolbar.element.find(".k-button").last();

        ok(button.is(":visible"));

        var listItem = toolbar.popup.element.find(">li").last();

        ok(listItem.hasClass("k-overflow-hidden"));
    });

    test("Multiple toolbar items are hidden with a single resize", 2, function() {
        container.width(400);
        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", text: "foooooo" },
                { type: "button", text: "baaaaar" },
                { type: "button", text: "baaaaaz" }
            ]
        }).data("kendoToolBar");

        container.width(100);
        toolbar.resize();

        var buttons = toolbar.element.find(".k-button");

        ok(buttons.eq(1).is(":hidden") && buttons.eq(2).is(":hidden"));

        var listItems = toolbar.popup.element.find(">li");

        ok(!listItems.eq(1).hasClass("k-overflow-hidden") && !listItems.eq(2).hasClass("k-overflow-hidden"));
    });

    test("Multple toolbar items are shown with a singe resize", 2, function() {
        container.width(100);
        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", text: "foooooo" },
                { type: "button", text: "baaaaar" },
                { type: "button", text: "baaaaaz" }
            ]
        }).data("kendoToolBar");

        container.width(400);
        toolbar.resize();

        var buttons = toolbar.element.find(".k-button");

        ok(buttons.eq(1).is(":visible") && buttons.eq(2).is(":visible"));

        var listItems = toolbar.popup.element.find(">li");

        ok(listItems.eq(1).hasClass("k-overflow-hidden") && listItems.eq(2).hasClass("k-overflow-hidden"));
    });

})();
