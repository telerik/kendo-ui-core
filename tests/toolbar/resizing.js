(function() {
    var container,
        ToolBar = kendo.ui.ToolBar;

    module("Toolbar: resizing", {
        setup: function() {
            kendo.effects.disable();
            container = $("<div id='toolbar' />").appendTo(QUnit.fixture);
        },

        teardown: function() {
            if (container.data("kendoToolBar")) {
                container.kendoToolBar("destroy");
            }
        }
    });

    test("buttons with overflow: auto are hidden upon initialization if there is not enough space", 4, function() {
        container.width(120);
        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", id: "foo", text: "foo" },
                { type: "button", id: "bar", text: "bar" }
            ]
        }).data("kendoToolBar");

        container.find(".k-overflow-anchor").width(28);
        container.find(".k-button:not(.k-overflow-anchor)").width(68);

        var toolbarButtons = container.find("#foo, #bar");
        ok(toolbarButtons.eq(0).is(":visible"), "First button is visible");
        ok(toolbarButtons.eq(1).is(":hidden"), "Second button is hidden");

        var overflowButtons = toolbar.popup.element.find(">li");
        ok(overflowButtons.eq(0).hasClass("k-overflow-hidden"), "First item is hidden");
        ok(!overflowButtons.eq(1).hasClass("k-overflow-hidden"), "Second item is visible");
    });

    test("buttons with overflow: always are always hidden upon initialization", 4, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", id: "foo", text: "foo" },
                { type: "button", id: "bar", text: "bar", overflow: "always" }
            ]
        }).data("kendoToolBar");

        var toolbarButton = container.find("#foo, #bar");
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
                { type: "button", id: "foo", text: "foooooo" },
                { type: "button", id: "bar", text: "baaaaar" },
                { type: "button", id: "baz", text: "baaaaaz" }
            ]
        }).data("kendoToolBar");

        container.width(100);
        toolbar.resize();

        var buttons = toolbar.element.find("#foo, #bar, #baz");

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

    test("Commands with overflow: never is not necessary to be defined first", 3, function() {
        container.width(400);

        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", id: "foo", text: "foooooo" },
                { type: "button", id: "bar", text: "baaaaar" },
                { type: "button", id: "baz", text: "baaaaaz", overflow: "never" }
            ]
        }).data("kendoToolBar");

        container.width(100);
        toolbar.resize();

        var buttons = toolbar.element.find("#foo, #bar, #baz");

        ok(buttons.eq(0).is(":hidden") && buttons.eq(1).is(":hidden"), "Buttons with overflow: auto are hidden");
        ok(buttons.eq(2).is(":visible"), "3rd button (that have overflow: never) is visible");

        ok(!toolbar.popup.element.children("li").hasClass("k-overflow-hidden"), "Commands in the popup are visible");
    });

    test("First and last visible items in the ToolBar receive classes", 4, function() {
        container.width(400);

        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", id: "foo", text: "foo" },
                { type: "button", id: "bar", text: "bar" },
                { type: "button", id: "baz", text: "baz" },
                { type: "button", id: "qux", text: "qux" }
            ]
        }).data("kendoToolBar");

        container.find(".k-overflow-anchor").width(28);
        container.find(".k-button:not(.k-overflow-anchor)").width(68);

        container.width(150);
        toolbar.resize();

        ok($("#foo").hasClass("k-toolbar-first-visible"), "#foo is the first visible button in the toolbar");
        ok($("#foo").hasClass("k-toolbar-last-visible"), "#foo is the last visible button in the toolbar");

        container.width(260);
        toolbar.resize();

        ok($("#foo").hasClass("k-toolbar-first-visible"), "#foo is the first visible button in the toolbar");
        ok($("#bar").hasClass("k-toolbar-last-visible"), "#bar is the last visible button in the toolbar");
    });

    test("First and last visible items in the command overflow popup receive classes", 4, function() {
        container.width(400);

        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", id: "foo", text: "foo" },
                { type: "button", id: "bar", text: "bar" },
                { type: "button", id: "baz", text: "baz" },
                { type: "button", id: "qux", text: "qux" }
            ]
        }).data("kendoToolBar");

        container.find(".k-overflow-anchor").width(28);
        container.find(".k-button:not(.k-overflow-anchor)").width(68);

        container.width(150);
        toolbar.resize();

        ok($("#bar_overflow").parent().hasClass("k-toolbar-first-visible"), "#bar is the first visible button in the command overflow popup");
        ok($("#qux_overflow").parent().hasClass("k-toolbar-last-visible"), "#qux is the last visible button in the command overflow popup");

        container.width(260);
        toolbar.resize();

        ok($("#baz_overflow").parent().hasClass("k-toolbar-first-visible"), "#baz is the first visible button in the command overflow popup");
        ok($("#qux_overflow").parent().hasClass("k-toolbar-last-visible"), "#qux is the last visible button in the command overflow popup");
    });

    test("Overflow anchor is not shown when the overflow container is empty", 1, function() {
        container.width(600);

        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", id: "foo", text: "foo" },
                { type: "button", id: "bar", text: "bar" },
                { type: "button", id: "baz", text: "baz" },
                { type: "button", id: "qux", text: "qux" }
            ]
        }).data("kendoToolBar");

        equal(toolbar.overflowAnchor.css("visibility"), "hidden", "Overflow anchor is not visible when there are no items in the overflow popup container");
    });

    test("Overflow anchor is shown after resize if the overflow popup container is NOT empty", 2, function() {
        container.width(600);

        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", id: "foo", text: "foo" },
                { type: "button", id: "bar", text: "bar" },
                { type: "button", id: "baz", text: "baz" },
                { type: "button", id: "qux", text: "qux" }
            ]
        }).data("kendoToolBar");

        equal(toolbar.overflowAnchor.css("visibility"), "hidden", "Overflow anchor is hidden before the resize");

        container.width(150);
        toolbar.resize();

        equal(toolbar.overflowAnchor.css("visibility"), "visible", "Overflow anchor is visible after the resize");
    });

    test("Overflow anchor is NOT shown if a widget with popup is initialized in the overflow container", 1, function() {
        var toolbar = container.kendoToolBar({
            items: [
                { type: "button", id: "foo", text: "foo" },
                { type: "button", id: "bar", text: "bar" },
                { template: '<div>foo</div>', overflowTemplate: '<div><select id="dropdown"></select></div>' }
            ]
        }).data("kendoToolBar");

        $('#dropdown').kendoDropDownList({
            dataSource: ['a', 'b', 'c']
        });

        toolbar.resize(); //force resizing

        equal(toolbar.overflowAnchor.css("visibility"), "hidden");
    });

})();
