import '@progress/kendo-ui/src/kendo.splitbutton.js';

    let SplitButton = kendo.ui.SplitButton;
    let splitButton, button;

    let defaultItems = [
        { text: "item 1" },
        { text: "item 2" }
    ];

    describe("SplitButton aria attributes", function() {
        beforeEach(function() {
            button = $("<button>Button</button>").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("SplitButton renders default aria attributes", function() {
            let splitButton = new SplitButton(button, { items: defaultItems });

            assert.equal(button.attr("aria-label"), "Button splitbutton");
            assert.equal(button.attr("aria-haspopup"), "menu");
            assert.equal(button.attr("aria-expanded"), "false");
            assert.equal(button.attr("aria-controls"), splitButton.menu.list.attr("id"));
        });

        it("SplitButton renders correct aria-label attr", function() {
            button.attr("aria-label", "new label");
            let splitButton = new SplitButton(button, { items: defaultItems });

            assert.notEqual(button.attr("aria-label"), "Button splitbutton");
            assert.equal(button.attr("aria-label"), "new label");
        });

        it("SplitButton renders correct aria-controls", function() {
            button.attr("id", "buttonElm");
            let splitButton = new SplitButton(button, { items: defaultItems });

            assert.equal(splitButton.menu.list.attr("id"), "buttonElm_buttonmenu");
            assert.equal(button.attr("aria-controls"), "buttonElm_buttonmenu");
        });

        it("SplitButton renders correct aria attributes for list", function() {
            let splitButton = new SplitButton(button, { items: defaultItems });

            assert.equal(splitButton.menu.list.attr("role"), "menu");
            assert.equal(splitButton.menu.list.children("li").attr("role"), "menuitem");
        });

    });

    describe("SplitButton WAI-ARIA with AXE", function() {
        beforeEach(function() {
            button = $("<button>Button</button>").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("SplitButton is accessible", async function() {
            let splitButton = new SplitButton(button, { items: defaultItems });
            await axeRunFixture();
        });

        it("SplitButton menu is accessible", async function() {
            let splitButton = new SplitButton(button, { items: defaultItems });
            splitButton.menu._popup.open();
            await axeRun(splitButton.menu.element[0]);
        });
    });
