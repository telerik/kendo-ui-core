(function() {

    var DropDownButton = kendo.ui.DropDownButton;
    var button;

    var defaultItems = [
        { text: "item 1" },
        { text: "item 2" }
    ];

    describe("DropDownButton intialization", function() {
        beforeEach(function() {
            button = $("<button>Button</button>").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("DropDownButton renders button", function() {
            var dropDownButton = new DropDownButton(button, { items: defaultItems });

            assert.isOk(button.hasClass("k-menu-button"));
            assert.isOk(button.hasClass("k-button"));
        });

        it("DropDownButton renders button with text", function() {
            var dropDownButton = new DropDownButton(button, { items: defaultItems });

            assert.equal(button.text(), "Button");
        });

        it("DropDownButton renders button with icon and text", function() {
            var dropDownButton = new DropDownButton(button, { icon: "gear", items: defaultItems });

            assert.isOk(button.children().eq(0).is(".k-icon, .k-svg-icon"));
            assert.isOk(button.children().eq(0).is(".k-i-gear, .k-svg-i-gear"));
            assert.equal(button.children().eq(1).text(), "Button");
        });

        it("DropDownButton renders buttons with default styling options", function() {
            var dropDownButton = new DropDownButton(button, { items: defaultItems });

            assert.isOk(button.hasClass("k-button-md"));
            assert.isOk(button.hasClass("k-rounded-md"));
            assert.isOk(button.hasClass("k-button-solid"));
            assert.isOk(button.hasClass("k-button-solid-base"));
        });

        it("DropDownButton renders buttons with correct styling options", function() {
            var dropDownButton = new DropDownButton(button, {
                size: "small",
                rounded: "small",
                fillMode: "outline",
                themeColor: "dark",
                items: defaultItems
            });

            assert.isOk(button.hasClass("k-button-sm"));
            assert.isOk(button.hasClass("k-rounded-sm"));
            assert.isOk(button.hasClass("k-button-outline"));
            assert.isOk(button.hasClass("k-button-outline-dark"));
        });

        it("DropDownButton renders buttons with correct styling options after setOptions", function() {
            var dropDownButton = new DropDownButton(button, {
                items: defaultItems
            });

            dropDownButton.setOptions({
                size: "small",
                rounded: "small",
                fillMode: "outline",
                themeColor: "dark"
            });

            assert.isOk(button.hasClass("k-button-sm"));
            assert.isOk(button.hasClass("k-rounded-sm"));
            assert.isOk(button.hasClass("k-button-outline"));
            assert.isOk(button.hasClass("k-button-outline-dark"));
        });

        it("DropDownButton renders default rounded option", function() {
            var dropDownButton = new DropDownButton(button, { items: defaultItems });

            assert.isOk(button.hasClass("k-rounded-md"));
        });

        it("DropDownButton renders small rounded option", function() {
            var dropDownButton = new DropDownButton(button, { rounded: "small", items: defaultItems });

            assert.isOk(button.hasClass("k-rounded-sm"));
        });
    });

    describe("DropDownButton menu button initialization", function() {
        beforeEach(function() {
            button = $("<button>Button</button>").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("DropDownButton renders menu button", function() {
            var dropDownButton = new DropDownButton(button, { items: defaultItems });

            assert.isOk(dropDownButton.menu.element.hasClass("k-menu-popup"));
            assert.isOk(dropDownButton.menu.element.hasClass("k-popup"));
            assert.equal(dropDownButton.menu.element.attr("data-role"), "buttonmenu");
            assert.isOk(dropDownButton.menu.element.data("kendoButtonMenu"));
            assert.isOk(dropDownButton.menu.element.data("kendoPopup"));
        });

        it("DropDownButton renders menu button - list", function() {
            button.attr("id", "buttonElm");
            var dropDownButton = new DropDownButton(button, { items: defaultItems });

            assert.isOk(dropDownButton.menu.list.hasClass("k-menu-group"));
            assert.isOk(dropDownButton.menu.list.hasClass("k-group"));
            assert.equal(dropDownButton.menu.list.attr("id"), "buttonElm_buttonmenu");
        });

        it("DropDownButton renders menu button - list items", function() {
            button.attr("id", "buttonElm");
            var dropDownButton = new DropDownButton(button, { items: defaultItems });

            assert.equal(dropDownButton.menu.list.children("li").length, 2);
            assert.isOk(dropDownButton.menu.list.children("li").hasClass("k-menu-item"));
            assert.isOk(dropDownButton.menu.list.children("li").hasClass("k-item"));
            assert.equal(dropDownButton.menu.list.children("li").eq(0).text(), "item 1");
            assert.equal(dropDownButton.menu.list.children("li").eq(1).text(), "item 2");
        });

        it("DropDownButton renders custom classes applied to its item", function() {
            button.attr("type", "submit");
            var dropDownButton = new DropDownButton(button, { items: [
                { text: "Insert between", attributes: { "class": "my-custom-class" } }
            ] });

            var item = dropDownButton.menu.element.find(".k-item");

            assert.equal(item.length, 1);
            assert.isOk(item.hasClass("my-custom-class"));
            assert.isOk(item.hasClass("k-menu-item"));
        });
    });

    describe("DropDownButton - disabled states", function() {
        beforeEach(function() {
            button = $("<button>Button</button>").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("DropDownButton renders disabled buttons", function() {
            var dropDownButton = new DropDownButton(button, { enabled: false, items: defaultItems });

            assert.equal(button.attr("disabled"), "disabled");
            assert.isOk(button.hasClass("k-disabled"));
        });

        it("DropDownButton renders disabled buttons when button has disabled attr", function() {
            button.attr("disabled", "disabled");
            var dropDownButton = new DropDownButton(button, { items: defaultItems });

            assert.equal(button.attr("disabled"), "disabled");
            assert.isOk(button.hasClass("k-disabled"));
        });

        it("DropDownButton renders type button", function() {
            var dropDownButton = new DropDownButton(button, { items: defaultItems });

            assert.equal(button.attr("type"), "button");
        });

        it("DropDownButton renders type button as defined from DOM", function() {
            button.attr("type", "submit");
            var dropDownButton = new DropDownButton(button, { items: defaultItems });

            assert.equal(button.attr("type"), "submit");
        });
    });
}());
