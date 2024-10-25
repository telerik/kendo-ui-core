(function() {

    var DropDownButton = kendo.ui.DropDownButton;
    var dropDownButton, button;

    var defaultItems = [
        { text: "item 1" },
        { text: "item 2" }
    ];

    describe("DropDownButton aria attributes", function() {
        beforeEach(function() {
            button = $("<button>Button</button>").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("DropDownButton renders default aria attributes", function() {
            var dropDownButton = new DropDownButton(button, { items: defaultItems });

            assert.equal(button.attr("aria-label"), "Button dropdownbutton");
            assert.equal(button.attr("aria-haspopup"), "menu");
            assert.equal(button.attr("aria-expanded"), "false");
            assert.equal(button.attr("aria-controls"), dropDownButton.menu.list.attr("id"));
        });

        it("DropDownButton renders correct aria-label attr", function() {
            button.attr("aria-label", "new label");
            var dropDownButton = new DropDownButton(button, { items: defaultItems });

            assert.notEqual(button.attr("aria-label"), "Button dropdownbutton");
            assert.equal(button.attr("aria-label"), "new label");
        });

        it("DropDownButton renders correct aria-controls", function() {
            button.attr("id", "buttonElm");
            var dropDownButton = new DropDownButton(button, { items: defaultItems });

            assert.equal(dropDownButton.menu.list.attr("id"), "buttonElm_buttonmenu");
            assert.equal(button.attr("aria-controls"), "buttonElm_buttonmenu");
        });

        it("DropDownButton renders correct aria attributes for list", function() {
            var dropDownButton = new DropDownButton(button, { items: defaultItems });

            assert.equal(dropDownButton.menu.list.attr("role"), "menu");
            assert.equal(dropDownButton.menu.list.children("li").attr("role"), "menuitem");
        });

    });

    describe("DropDownButton WAI-ARIA with AXE", function() {
        beforeEach(function() {
            button = $("<button>Button</button>").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("DropDownButton is accessible", function(done) {
            var dropDownButton = new DropDownButton(button, { items: defaultItems });
            axeRunFixture(done);
        });

        it("DropDownButton menu is accessible", function(done) {
            var dropDownButton = new DropDownButton(button, { items: defaultItems });
            dropDownButton.menu._popup.open();
            axeRun(dropDownButton.menu.element[0], done);
        });
    });
}());
