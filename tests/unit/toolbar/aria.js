import '@progress/kendo-ui/src/kendo.toolbar.js';

let container,
    ToolBar = kendo.ui.ToolBar;

function click(element) {
    element.trigger("click");
}

describe("Toolbar accessibility with AXE:", function() {
    beforeEach(function() {
        container = $("<div id='toolbar' />").appendTo(Mocha.fixture);
    });

    afterEach(function() {
        if (container.data("kendoToolBar")) {
            container.getKendoToolBar().destroy();
        }
    });

    it("Toolbar is accessible", async function() {
        container.kendoToolBar({
            items: [
                { type: "button", text: "Button" },
                { type: "button", text: "Toggle Button", togglable: true },
                {
                    type: "splitButton",
                    text: "Insert",
                    menuButtons: [
                        { text: "Insert above", icon: "insert-up" },
                        { text: "Insert between", icon: "insert-middle" },
                        { text: "Insert below", icon: "insert-down" }
                    ]
                },
                { type: "separator" },
                {
                    type: "buttonGroup",
                    buttons: [
                        { icon: "align-left", text: "Left", togglable: true, group: "text-align" },
                        { icon: "align-center", text: "Center", togglable: true, group: "text-align" },
                        { icon: "align-right", text: "Right", togglable: true, group: "text-align" }
                    ]
                },
                {
                    type: "buttonGroup",
                    buttons: [
                        { icon: "bold", text: "Bold", togglable: true },
                        { icon: "italic", text: "Italic", togglable: true },
                        { icon: "underline", text: "Underline", togglable: true }
                    ]
                },
                {
                    type: "button",
                    text: "Action",
                    overflow: "always"
                }
            ]
        });

        await axeRunFixture();
    });

    it("SplitButton is accessible", async function() {
        container.kendoToolBar({
            items: [
                {
                    type: "splitButton",
                    text: "Insert",
                    menuButtons: [
                        { text: "Insert above", icon: "insert-up" },
                        { text: "Insert between", icon: "insert-middle" },
                        { text: "Insert below", icon: "insert-down" }
                    ]
                }
            ]
        });

        $(".k-split-button .k-button").eq(1).trigger('click');

        let splitWrapper = $("[data-role=\"buttonmenu\"]");

        await axeRun(splitWrapper);
    });

    it("overflow container is accessible", async function() {
        container.kendoToolBar({
            items: [
                {
                    type: "button",
                    text: "Action",
                    overflow: "always"
                },
                {
                    type: "button",
                    text: "Another Action",
                    overflow: "always"
                },
                {
                    type: "button",
                    text: "Something else here",
                    overflow: "always"
                }
            ]
        });

        $(".k-toolbar-overflow-button").trigger('click');

        let overflowWrapper = $(".k-context-menu");

        await axeRun(overflowWrapper);
    });
});


describe("Toolbar WAI-ARIA:", function() {
    beforeEach(function() {
        container = $("<div id='toolbar' />").appendTo(Mocha.fixture);
    });

    afterEach(function() {
        if (container.data("kendoToolBar")) {
            container.getKendoToolBar().destroy();
        }
    });

    it("by default the button does not have aria-disabled attribute", function() {
        container.kendoToolBar({
            items: [
                { type: "button", id: "foo", text: "foo" }
            ]
        });

        let button = container.find("#foo");

        assert.isUndefined(button.attr("aria-disabled"));
    });

    it("button with enable: false receives aria-disabled attribute", function() {
        container.kendoToolBar({
            items: [
                { type: "button", id: "foo", text: "foo", enable: false }
            ]
        });

        let button = container.find("#foo");

        assert.equal(button.attr("aria-disabled"), "true");
    });

    it("splitbutton with enable: false has k-disabled class on main button", function() {
        container.kendoToolBar({
            items: [{
                type: "splitButton",
                id: "foo",
                text: "foo",
                enable: false,
                menuButtons: [
                    { id: "btn", text: "text" }
                ]
            }
            ]
        });

        let mainbutton = container.find("#foo");

        assert.isOk(mainbutton.hasClass("k-disabled"));
    });

    it("toggleButton receives aria-pressed attribute", function() {
        container.kendoToolBar({
            items: [
                { type: "button", togglable: true, text: "foo", selected: false },
                { type: "button", togglable: true, text: "bar", selected: true }
            ]
        });

        let buttons = container.find(".k-toolbar-toggle-button");

        assert.equal(buttons.eq(0).attr("aria-pressed"), "false");
        assert.equal(buttons.eq(1).attr("aria-pressed"), "true");
    });

    it("ButtonGroup buttons receive aria-pressed attribute", function() {
        let toolbar = container.kendoToolBar({
            items: [
                {
                    type: "buttonGroup", buttons: [
                        { id: "btn1", text: "Btn1", togglable: true, selected: false },
                        { id: "btn2", text: "Btn2", togglable: true, selected: true }
                    ]
                }
            ]
        }).data("kendoToolBar");

        let buttons = toolbar.element.find(".k-button");

        assert.equal(buttons.eq(0).attr("aria-pressed"), "false");
        assert.equal(buttons.eq(1).attr("aria-pressed"), "true");
    });

    it("aria-label is added on buttons with only text", function() {
        container.kendoToolBar({
            items: [
                { type: "button", text: "Foo", icon: "tick", showText: "overflow", id: "id" }
            ]
        }).data("kendoToolBar");

        let button = container.find("#id");

        assert.equal(button.attr("aria-label"), "Foo");
    });

    it("aria-label is added on overflow buttons with only text", function() {
        container.kendoToolBar({
            items: [
                { type: "button", text: "Foo", icon: "tick", showText: "toolbar", id: "id" }
            ]
        }).data("kendoToolBar");

        let button = $(".k-context-menu").find("#id_overflow");

        assert.equal(button.attr("aria-label"), "Foo");
    });

    it("overflow button has aria-expanded set to false initially", function() {
        let toolbar = container.kendoToolBar({
            items: [
                { type: "button", text: "Action", overflow: "always" }
            ]
        }).data("kendoToolBar");

        assert.equal(toolbar.overflowAnchor.attr("aria-expanded"), "false");
    });

    it("overflow button aria-expanded toggles on menu open and close", function() {
        let toolbar = container.kendoToolBar({
            items: [
                { type: "button", text: "Action", overflow: "always" }
            ]
        }).data("kendoToolBar");

        toolbar.overflowMenu.open();
        assert.equal(toolbar.overflowAnchor.attr("aria-expanded"), "true");

        toolbar.overflowMenu.close();
        assert.equal(toolbar.overflowAnchor.attr("aria-expanded"), "false");
    });

    it("overflow button aria-expanded toggles on section open and close", function() {
        let toolbar = container.kendoToolBar({
            overflow: { mode: "section" },
            items: [
                { type: "button", text: "Action", overflow: "always" }
            ]
        }).data("kendoToolBar");

        toolbar.overflowSection.open();
        assert.equal(toolbar.overflowAnchor.attr("aria-expanded"), "true");

        toolbar.overflowSection.close();
        assert.equal(toolbar.overflowAnchor.attr("aria-expanded"), "false");
    });

    it("k-toolbar-prev has aria-hidden=true and no aria-label", function() {
        container.kendoToolBar({
            overflow: { mode: "scroll" },
            items: [
                { type: "button", text: "One" },
                { type: "button", text: "Two" },
                { type: "button", text: "Three" }
            ]
        });

        let prevButton = container.find(".k-toolbar-prev");

        assert.equal(prevButton.attr("aria-hidden"), "true");
        assert.isUndefined(prevButton.attr("aria-label"));
    });

    it("k-toolbar-next has aria-hidden=true and no aria-label", function() {
        container.kendoToolBar({
            overflow: { mode: "scroll" },
            items: [
                { type: "button", text: "One" },
                { type: "button", text: "Two" },
                { type: "button", text: "Three" }
            ]
        });

        let nextButton = container.find(".k-toolbar-next");

        assert.equal(nextButton.attr("aria-hidden"), "true");
        assert.isUndefined(nextButton.attr("aria-label"));
    });
});
