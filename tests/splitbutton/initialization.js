(function() {

    var SplitButton = kendo.ui.SplitButton;
    var button;

    var defaultItems = [
        { text: "item 1" },
        { text: "item 2" }
    ];

    describe("SplitButton intialization", function() {
        beforeEach(function() {
            button = $("<button>Button</button>").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("SplitButton renders wrapper and button", function() {
            var splitButton = new SplitButton(button, { items: defaultItems });

            assert.isOk(splitButton.wrapper.hasClass("k-split-button"));
            assert.isOk(button.hasClass("k-button"));
        });

        it("SplitButton renders arrow button", function() {
            var splitButton = new SplitButton(button, { items: defaultItems });
            var arrowBtn = button.next();
            assert.isOk(arrowBtn.hasClass("k-button"));
            assert.isOk(arrowBtn.hasClass("k-icon-button"));
        });

        it("SplitButton renders arrow button with icon", function() {
            var splitButton = new SplitButton(button, { items: defaultItems });
            var arrowBtn = button.next();
            var arrowIcon = arrowBtn.children().eq(0);
            assert.isOk(arrowIcon.is(".k-icon, .k-svg-icon"));
            assert.isOk(arrowIcon.is(".k-i-caret-alt-down, .k-svg-i-caret-alt-down"));
        });

        it("SplitButton renders arrow button with custom icon", function() {
            var splitButton = new SplitButton(button, { items: defaultItems, arrowIcon: "caret-alt-up" });
            var arrowBtn = button.next();
            var arrowIcon = arrowBtn.children().eq(0);
            assert.isOk(arrowIcon.is(".k-icon, .k-svg-icon"));
            assert.isNotOk(arrowIcon.hasClass("k-i-arrow-s"));
            assert.isOk(arrowIcon.is(".k-i-caret-alt-up, .k-svg-i-caret-alt-up"));
        });

        it("SplitButton renders button with text", function() {
            var splitButton = new SplitButton(button, { items: defaultItems });

            assert.equal(button.text(), "Button");
        });

        it("SplitButton renders button with icon and text", function() {
            var splitButton = new SplitButton(button, { icon: "gear", items: defaultItems });

            assert.isOk(button.children().eq(0).is(".k-icon, .k-svg-icon"));
            assert.isOk(button.children().eq(0).is(".k-i-gear, .k-svg-i-gear"));
            assert.equal(button.children().eq(1).text(), "Button");
        });

        it("SplitButton renders buttons with default styling options", function() {
            var splitButton = new SplitButton(button, { items: defaultItems });

            assert.isOk(button.hasClass("k-button-md"));
            assert.isOk(button.hasClass("k-rounded-md"));
            assert.isOk(button.hasClass("k-button-solid"));
            assert.isOk(button.hasClass("k-button-solid-base"));
            assert.isOk(button.next().hasClass("k-button-md"));
            assert.isOk(button.next().hasClass("k-rounded-md"));
            assert.isOk(button.next().hasClass("k-button-solid"));
            assert.isOk(button.next().hasClass("k-button-solid-base"));
        });

        it("SplitButton renders buttons with correct styling options", function() {
            var splitButton = new SplitButton(button, {
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
            assert.isOk(button.next().hasClass("k-button-sm"));
            assert.isOk(button.next().hasClass("k-rounded-sm"));
            assert.isOk(button.next().hasClass("k-button-outline"));
            assert.isOk(button.next().hasClass("k-button-outline-dark"));
        });

        it("SplitButton renders buttons with correct styling options after setOptions", function() {
            var splitButton = new SplitButton(button, {
                items: defaultItems
            });

            splitButton.setOptions({
                size: "small",
                rounded: "small",
                fillMode: "outline",
                themeColor: "dark"
            });

            assert.isOk(button.hasClass("k-button-sm"));
            assert.isOk(button.hasClass("k-rounded-sm"));
            assert.isOk(button.hasClass("k-button-outline"));
            assert.isOk(button.hasClass("k-button-outline-dark"));
            assert.isOk(button.next().hasClass("k-button-sm"));
            assert.isOk(button.next().hasClass("k-rounded-sm"));
            assert.isOk(button.next().hasClass("k-button-outline"));
            assert.isOk(button.next().hasClass("k-button-outline-dark"));
        });

        it("SplitButton renders default rounded option", function() {
            var splitButton = new SplitButton(button, { items: defaultItems });

            assert.isOk(button.hasClass("k-rounded-md"));
            assert.isOk(button.next().hasClass("k-rounded-md"));
            assert.isOk(splitButton.wrapper.hasClass("k-rounded-md"));
        });

        it("SplitButton renders small rounded option", function() {
            var splitButton = new SplitButton(button, { rounded: "small", items: defaultItems });

            assert.isOk(button.hasClass("k-rounded-sm"));
            assert.isOk(button.next().hasClass("k-rounded-sm"));
            assert.isOk(splitButton.wrapper.hasClass("k-rounded-sm"));
        });

        it('initialization with no options does not error out', function() {
            try {
                let splitButton = new SplitButton(button);
                assert.isOk(true); // No error occurred
            } catch (error) {
                assert.fail(error); // An error occurred
            }
        });

        it('initialization with no items does not error out on destroy', function() {
            try {
                let splitButton = new SplitButton(button, {});
                splitButton.destroy();
                assert.isOk(true); // No error occurred
            } catch (error) {
                assert.fail(error); // An error occurred
            }
        });
    });

    describe("SplitButton menu button initialization", function() {
        beforeEach(function() {
            button = $("<button>Button</button>").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("SplitButton renders menu button", function() {
            var splitButton = new SplitButton(button, { items: defaultItems });

            assert.isOk(splitButton.menu.element.hasClass("k-menu-popup"));
            assert.isOk(splitButton.menu.element.hasClass("k-popup"));
            assert.equal(splitButton.menu.element.attr("data-role"), "buttonmenu");
            assert.isOk(splitButton.menu.element.data("kendoButtonMenu"));
            assert.isOk(splitButton.menu.element.data("kendoPopup"));
        });

        it("SplitButton renders menu button - list", function() {
            button.attr("id", "buttonElm");
            var splitButton = new SplitButton(button, { items: defaultItems });

            assert.isOk(splitButton.menu.list.hasClass("k-menu-group"));
            assert.isOk(splitButton.menu.list.hasClass("k-group"));
            assert.equal(splitButton.menu.list.attr("id"), "buttonElm_buttonmenu");
        });

        it("SplitButton renders menu button - list items", function() {
            button.attr("id", "buttonElm");
            var splitButton = new SplitButton(button, { items: defaultItems });

            assert.equal(splitButton.menu.list.children("li").length, 2);
            assert.isOk(splitButton.menu.list.children("li").hasClass("k-menu-item"));
            assert.isOk(splitButton.menu.list.children("li").hasClass("k-item"));
            assert.equal(splitButton.menu.list.children("li").eq(0).text(), "item 1");
            assert.equal(splitButton.menu.list.children("li").eq(1).text(), "item 2");
        });

        it("SplitButton renders custom classes applied to its item", function() {
            button.attr("type", "submit");
            var splitButton = new SplitButton(button, { items: [
                { text: "Insert between", attributes: { "class": "my-custom-class" } }
            ] });

            var item = splitButton.menu.element.find(".k-item");

            assert.equal(item.length, 1);
            assert.isOk(item.hasClass("my-custom-class"));
            assert.isOk(item.hasClass("k-menu-item"));
        });
    });

    describe("SplitButton - disabled states", function() {
        beforeEach(function() {
            button = $("<button>Button</button>").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("SplitButton renders disabled buttons", function() {
            var splitButton = new SplitButton(button, { enabled: false, items: defaultItems });

            assert.equal(button.attr("disabled"), "disabled");
            assert.isOk(button.hasClass("k-disabled"));
            assert.equal(button.next().attr("disabled"), "disabled");
            assert.isOk(button.next().hasClass("k-disabled"));
        });

        it("SplitButton renders disabled buttons when button has disabled attr", function() {
            button.attr("disabled", "disabled");
            var splitButton = new SplitButton(button, { items: defaultItems });

            assert.equal(button.attr("disabled"), "disabled");
            assert.isOk(button.hasClass("k-disabled"));
            assert.equal(button.next().attr("disabled"), "disabled");
            assert.isOk(button.next().hasClass("k-disabled"));
        });

        it("SplitButton renders type button", function() {
            var splitButton = new SplitButton(button, { items: defaultItems });

            assert.equal(button.attr("type"), "button");
            assert.equal(splitButton.arrowButton.attr("type"), "button");
        });

        it("SplitButton renders type button as defined from DOM", function() {
            button.attr("type", "submit");
            var splitButton = new SplitButton(button, { items: defaultItems });

            assert.equal(button.attr("type"), "submit");
            assert.equal(splitButton.arrowButton.attr("type"), "button");
        });

        it("SplitButton renders target attribute on the <a> tag", function() {
            button.attr("type", "submit");
            var splitButton = new SplitButton(button, { items: [{
                test: "Link",
                url: "https://www.telerik.com",
                attributes: { target: "_blank" }
            }] });

            assert.equal(splitButton.menu.list.find(".k-item").attr("target"), undefined);
            assert.equal(splitButton.menu.list.find(".k-link").attr("target"), "_blank");
        });
    });
}());
