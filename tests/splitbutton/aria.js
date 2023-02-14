(function() {

    var SplitButton = kendo.ui.SplitButton;
    var splitButton, button;

    var defaultItems = [
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
            var splitButton = new SplitButton(button, { items: defaultItems });

            assert.equal(button.attr("aria-label"), "Button splitbutton");
            assert.equal(button.attr("aria-haspopup"), "menu");
            assert.equal(button.attr("aria-expanded"), "false");
            assert.equal(button.attr("aria-controls"), splitButton.menu.list.attr("id"));
        });

        it("SplitButton renders correct aria-label attr", function() {
            button.attr("aria-label", "new label");
            var splitButton = new SplitButton(button, { items: defaultItems });

            assert.notEqual(button.attr("aria-label"), "Button splitbutton");
            assert.equal(button.attr("aria-label"), "new label");
        });

        it("SplitButton renders correct aria-controls", function() {
            button.attr("id", "buttonElm");
            var splitButton = new SplitButton(button, { items: defaultItems });

            assert.equal(splitButton.menu.list.attr("id"), "buttonElm_buttonmenu");
            assert.equal(button.attr("aria-controls"), "buttonElm_buttonmenu");
        });

        it("SplitButton renders correct aria attributes for list", function() {
            var splitButton = new SplitButton(button, { items: defaultItems });

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

        it("SplitButton is accessible", function(done) {
            var splitButton = new SplitButton(button, { items: defaultItems });
            axeRunFixture(done);
        });

        it("SplitButton menu is accessible", function(done) {
            var splitButton = new SplitButton(button, { items: defaultItems });
            splitButton.menu._popup.open();
            axeRun(splitButton.menu.element[0], done);
        });
    });
}());
