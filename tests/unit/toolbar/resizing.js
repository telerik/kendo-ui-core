import '@progress/kendo-ui/src/kendo.toolbar.js';

let container,
    ToolBar = kendo.ui.ToolBar;

describe("Toolbar: resizing", function() {
    beforeEach(function() {

        container = $("<div id='toolbar' />").appendTo(Mocha.fixture);
    });

    afterEach(function() {
        if (container.data("kendoToolBar")) {
            container.getKendoToolBar().destroy();
        }
    });

    it("buttons with overflow: auto are hidden upon initialization if there is not enough space", function() {
        container.width(120);
        let toolbar = container.kendoToolBar({
            items: [
                { type: "button", id: "foo", text: "foo" },
                { type: "button", id: "bar", text: "bar" }
            ]
        }).data("kendoToolBar");

        container.find(".k-toolbar-overflow-button").width(28);
        container.find(".k-button:not(.k-toolbar-overflow-button)").width(68);

        let toolbarButtons = container.find("#foo, #bar");
        assert.isOk(toolbarButtons.eq(0).is(":visible"), "First button is visible");
        assert.isOk(toolbarButtons.eq(1).is(":hidden"), "Second button is hidden");

        let overflowButtons = toolbar.overflowMenu.element.find(">li");
        assert.isOk(overflowButtons.eq(0).hasClass("k-hidden"), "First item is hidden");
        assert.isOk(!overflowButtons.eq(1).hasClass("k-hidden"), "Second item is visible");
    });

    it("buttons after hidden groups should be hidden as well no matter that there is sufficient space to show them", function() {
        container.width(250);
        let toolbar = container.kendoToolBar({
            items: [
                { type: "button", id: "foo", text: "foo" },
                {
                    type: "buttonGroup",
                    buttons: [
                        { text: "Left", },
                        { text: "Center" },
                        { text: "Right" }
                    ]
                },
                { type: "button", id: "bar", text: "bar" }
            ]
        }).data("kendoToolBar");

        container.find(".k-toolbar-overflow-button").width(28);
        container.find(".k-button:not(.k-toolbar-overflow-button)").width(50);

        let toolbarButtons = container.find("#foo, #bar");
        assert.isOk(toolbarButtons.eq(0).is(":visible"), "First button is visible");
        assert.isOk(toolbarButtons.eq(1).is(":hidden"), "Second button is hidden");
    });

    it("buttons with overflow: always are always hidden upon initialization", function() {
        let toolbar = container.kendoToolBar({
            items: [
                { type: "button", id: "foo", text: "foo" },
                { type: "button", id: "bar", text: "bar", overflow: "always" }
            ]
        }).data("kendoToolBar");

        let toolbarButton = container.find("#foo, #bar");
        assert.equal(toolbarButton.length, 1);
        assert.isOk(toolbarButton.is(":visible"), "Foo button is visible");

        let overflowButtons = toolbar.overflowMenu.element.find(">li");
        assert.equal(overflowButtons.length, 2);
        assert.isOk(!overflowButtons.eq(1).hasClass("k-hidden"), "Bar item is visible");
    });

    it("Toolbar's popup is automatically closed on resize", function() {
        let toolbar = container.kendoToolBar({
            items: [
                { type: "button", text: "foo" },
                { type: "button", text: "bar", overflow: "always" }
            ]
        }).data("kendoToolBar");

        let popup = toolbar.overflowMenu;
        popup.open();

        kendo.resize($("#toolbar"));
        assert.isOk(!popup.popup.visible());
    });

    it("Toolbar items are automatically hidden on resize if there is not enough available space", function() {
        container.width(400);
        let toolbar = container.kendoToolBar({
            items: [
                { type: "button", text: "foooooo" },
                { type: "button", text: "baaaaar" },
                { type: "button", text: "baaaaaz" }
            ]
        }).data("kendoToolBar");

        container.width(150);
        toolbar.resize();

        let button = toolbar.element.find(".k-button").not(".k-toolbar-overflow-button").last();

        assert.isOk(button.is(":hidden"));

        let listItem = toolbar.overflowMenu.element.find(">li").last();

        assert.isOk(!listItem.hasClass("k-hidden"));
    });

    it("Toolbar items are automatically shown on resize if there is enough available space", function() {
        container.width(200);
        let toolbar = container.kendoToolBar({
            items: [
                { type: "button", text: "foooooo" },
                { type: "button", text: "baaaaar" },
                { type: "button", text: "baaaaaz" }
            ]
        }).data("kendoToolBar");

        container.width(400);
        toolbar.resize();

        let button = toolbar.element.find(".k-toolbar-button").last();

        assert.isOk(button.is(":visible"));

        let listItem = toolbar.overflowMenu.element.find(">li").last();

        assert.isOk(listItem.hasClass("k-hidden"));
    });

    it("Multiple toolbar items are hidden with a single resize", function() {
        container.width(400);
        let toolbar = container.kendoToolBar({
            items: [
                { type: "button", id: "foo", text: "foooooo" },
                { type: "button", id: "bar", text: "baaaaar" },
                { type: "button", id: "baz", text: "baaaaaz" }
            ]
        }).data("kendoToolBar");

        container.width(80);
        toolbar.resize();

        let buttons = toolbar.element.find("#foo, #bar, #baz");

        assert.isOk(buttons.eq(1).is(":hidden") && buttons.eq(2).is(":hidden"));

        let listItems = toolbar.overflowMenu.element.find(">li");

        assert.isOk(!listItems.eq(1).hasClass("k-hidden") && !listItems.eq(2).hasClass("k-hidden"));
    });

    it("Multple toolbar items are shown with a singe resize", function() {
        container.width(100);
        let toolbar = container.kendoToolBar({
            items: [
                { type: "button", text: "foooooo" },
                { type: "button", text: "baaaaar" },
                { type: "button", text: "baaaaaz" }
            ]
        }).data("kendoToolBar");

        container.width(400);
        toolbar.resize();

        let buttons = toolbar.element.find(".k-button");

        assert.isOk(buttons.eq(1).is(":visible") && buttons.eq(2).is(":visible"));

        let listItems = toolbar.overflowMenu.element.find(">li");

        assert.isOk(listItems.eq(1).hasClass("k-hidden") && listItems.eq(2).hasClass("k-hidden"));
    });

    it("Commands with overflow: never is not necessary to be defined first", function() {
        container.width(400);

        let toolbar = container.kendoToolBar({
            items: [
                { type: "button", id: "foo", text: "foooooo" },
                { type: "button", id: "bar", text: "baaaaar" },
                { type: "button", id: "baz", text: "baaaaaz", overflow: "never" }
            ]
        }).data("kendoToolBar");

        container.width(80);
        toolbar.resize();

        let buttons = toolbar.element.find("#foo, #bar, #baz");

        assert.isOk(buttons.eq(0).is(":hidden") && buttons.eq(1).is(":hidden"), "Buttons with overflow: auto are hidden");
        assert.isOk(buttons.eq(2).is(":visible"), "3rd button (that have overflow: never) is visible");

        assert.isOk(!toolbar.overflowMenu.element.children("li").hasClass("k-hidden"), "Commands in the popup are visible");
    });

    it("Overflow anchor is not shown when the overflow container is empty", function() {
        container.width(600);

        let toolbar = container.kendoToolBar({
            items: [
                { type: "button", id: "foo", text: "foo" },
                { type: "button", id: "bar", text: "bar" },
                { type: "button", id: "baz", text: "baz" },
                { type: "button", id: "qux", text: "qux" }
            ]
        }).data("kendoToolBar");

        assert.isOk(toolbar.overflowAnchor.hasClass("k-hidden"), "Overflow anchor is not visible when there are no items in the overflow popup container");
    });

    it("Overflow anchor is shown after resize if the overflow popup container is NOT empty", function() {
        container.width(600);

        let toolbar = container.kendoToolBar({
            items: [
                { type: "button", id: "foo", text: "foo" },
                { type: "button", id: "bar", text: "bar" },
                { type: "button", id: "baz", text: "baz" },
                { type: "button", id: "qux", text: "qux" }
            ]
        }).data("kendoToolBar");

        assert.isOk(toolbar.overflowAnchor.hasClass("k-hidden"), "Overflow anchor is hidden before the resize");

        container.width(100);

        toolbar.resize();

        assert.isNotOk(toolbar.overflowAnchor.hasClass("k-hidden"), "Overflow anchor is visible after the resize");
    });
});

describe("Mobile Toolbar: resizing", function() {
    beforeEach(function() {

        container = $("<div id='toolbar' />").appendTo(Mocha.fixture);
    });

    afterEach(function() {
        if (container.data("kendoToolBar")) {
            container.getKendoToolBar().destroy();
        }
    });

    it("Overflow anchor is NOT shown if the widget is wide enough to display all tools", function() {
        let toolbar = container.kendoToolBar({
            mobile: true,
            items: [
                { type: "button", id: "foo", text: "foo" },
                { type: "button", id: "bar", text: "bar" }
            ]
        }).data("kendoToolBar");

        assert.isOk(toolbar.overflowAnchor.hasClass("k-hidden"));
    });

    it("hide method hides overflow buttons", function() {
        container.width(150);

        let toolbar = container.kendoToolBar({
            items: [
                { type: "button", id: "foo", text: "foo" },
                { type: "button", id: "bar", text: "bar" },
                { type: "button", id: "baz", text: "baz" },
                { type: "button", id: "qux", text: "qux" }
            ]
        }).data("kendoToolBar");

        toolbar.hide("#qux");

        assert.isOk($("#qux_overflow").hasClass("k-hidden"), "#qux_overflow is hidden");
    });

    it("Overflow anchor is NOT shown when buttons are hidden via hide method", function() {
        container.width(150);

        let toolbar = container.kendoToolBar({
            mobile: true,
            items: [
                { type: "button", id: "foo", text: "foo" },
                { type: "button", id: "bar", text: "bar" }
            ]
        }).data("kendoToolBar");

        toolbar.hide("#foo");
        toolbar.hide("#bar");

        assert.isOk(toolbar.overflowAnchor.hasClass("k-hidden"));
    });

});
