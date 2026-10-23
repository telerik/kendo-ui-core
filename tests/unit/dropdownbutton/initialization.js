import '@progress/kendo-ui/src/kendo.dropdownbutton.js';

let DropDownButton = kendo.ui.DropDownButton;
let button;

let defaultItems = [
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

    it("DropdownButton can be initialized with empty items", function() {
        let dropDownButton = new DropDownButton(button, { items: [] });

        assert.isOk(dropDownButton);

        dropDownButton.setOptions({ items: defaultItems });
        assert.isOk(dropDownButton);
    });

    it("DropDownButton renders button", function() {
        const dropDownButton = new DropDownButton(button, { items: defaultItems, showArrowButton: true });

        assert.isOk(button.hasClass("k-menu-button"));
        assert.isOk(button.hasClass("k-button"));
        assert.isOk(button.children().eq(1).hasClass("k-button-arrow"));
        assert.isOk(button.children().eq(1).hasClass("k-menu-button-arrow"));
    });

    it("DropDownButton renders button with text", function() {
        let dropDownButton = new DropDownButton(button, { items: defaultItems });

        assert.equal(button.text(), "Button");
    });

    it("DropDownButton renders button with icon and text", function() {
        let dropDownButton = new DropDownButton(button, { icon: "gear", items: defaultItems });

        assert.isOk(button.children().eq(0).is(".k-icon, .k-svg-icon"));
        assert.isOk(button.children().eq(0).is(".k-i-gear, .k-svg-i-gear"));
        assert.equal(button.children().eq(1).text(), "Button");
    });

    it("DropDownButton renders buttons with default styling options", function() {
        let dropDownButton = new DropDownButton(button, { items: defaultItems });

        assert.isNotOk(button.hasClass("k-button-md"));
        assert.isNotOk(button.hasClass("k-rounded-md"));
        assert.isNotOk(button.hasClass("k-button-solid"));
        assert.isNotOk(button.hasClass("k-button-solid-base"));
    });

    it("DropDownButton renders buttons with correct styling options", function() {
        let dropDownButton = new DropDownButton(button, {
            size: "small",
            rounded: "small",
            fillMode: "outline",
            themeColor: "secondary",
            items: defaultItems
        });

        assert.isOk(button.hasClass("k-button-sm"));
        assert.isOk(button.hasClass("k-rounded-sm"));
        assert.isOk(button.hasClass("k-button-outline"));
        assert.isOk(button.hasClass("k-button-secondary"));
    });

    it("DropDownButton renders buttons with correct styling options after setOptions", function() {
        let dropDownButton = new DropDownButton(button, {
            items: defaultItems
        });

        dropDownButton.setOptions({
            size: "small",
            rounded: "small",
            fillMode: "outline",
            themeColor: "secondary"
        });

        assert.isOk(button.hasClass("k-button-sm"));
        assert.isOk(button.hasClass("k-rounded-sm"));
        assert.isOk(button.hasClass("k-button-outline"));
        assert.isOk(button.hasClass("k-button-secondary"));
    });

    it("DropDownButton renders default rounded option", function() {
        let dropDownButton = new DropDownButton(button, { items: defaultItems });

        assert.isNotOk(button.hasClass("k-rounded-md"));
    });

    it("DropDownButton renders small rounded option", function() {
        let dropDownButton = new DropDownButton(button, { rounded: "small", items: defaultItems });

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
        let dropDownButton = new DropDownButton(button, { items: defaultItems });

        assert.isOk(dropDownButton.menu.element.hasClass("k-menu-popup"));
        assert.isOk(dropDownButton.menu.element.hasClass("k-popup"));
        assert.equal(dropDownButton.menu.element.attr("data-role"), "buttonmenu");
        assert.isOk(dropDownButton.menu.element.data("kendoButtonMenu"));
        assert.isOk(dropDownButton.menu.element.data("kendoPopup"));
    });

    it("DropDownButton renders menu button - list", function() {
        button.attr("id", "buttonElm");
        let dropDownButton = new DropDownButton(button, { items: defaultItems });

        assert.isOk(dropDownButton.menu.list.hasClass("k-menu-group"));
        assert.equal(dropDownButton.menu.list.attr("id"), "buttonElm_buttonmenu");
    });

    it("DropDownButton renders menu button - list items", function() {
        button.attr("id", "buttonElm");
        let dropDownButton = new DropDownButton(button, { items: defaultItems });

        assert.equal(dropDownButton.menu.list.children("li").length, 2);
        assert.isOk(dropDownButton.menu.list.children("li").hasClass("k-menu-item"));
        assert.isOk(dropDownButton.menu.list.children("li").hasClass("k-item"));
        assert.equal(dropDownButton.menu.list.children("li").eq(0).text(), "item 1");
        assert.equal(dropDownButton.menu.list.children("li").eq(1).text(), "item 2");
    });

    it("encodes item IDs and link targets as attribute values", function() {
        let id = 'item" onmouseover="alert(1)';
        let target = 'window" onfocus="alert(1)';
        let dropDownButton = new DropDownButton(button, {
            items: [
                { id: id, text: "Item ID", url: "https://example.com", attributes: { target: target } },
                { text: "Attribute ID", url: "https://example.com", attributes: { id: id, target: target } }
            ]
        });
        let items = dropDownButton.menu.list.children("li");
        let links = items.find("a");

        assert.equal(items.eq(0).attr("id"), id);
        assert.equal(items.eq(1).attr("id"), id);
        assert.isUndefined(items.eq(0).attr("onmouseover"));
        assert.isUndefined(items.eq(1).attr("onmouseover"));
        assert.equal(links.eq(0).attr("target"), target);
        assert.equal(links.eq(1).attr("target"), target);
        assert.isUndefined(links.eq(0).attr("onfocus"));
        assert.isUndefined(links.eq(1).attr("onfocus"));
    });

    it("DropDownButton renders custom classes applied to its item", function() {
        button.attr("type", "submit");
        let dropDownButton = new DropDownButton(button, {
            items: [
                { text: "Insert between", attributes: { "class": "my-custom-class" } }
            ]
        });

        let item = dropDownButton.menu.element.find(".k-item");

        assert.equal(item.length, 1);
        assert.isOk(item.hasClass("my-custom-class"));
        assert.isOk(item.hasClass("k-menu-item"));
    });

    it("DropDownButton preserves item ids without injecting markup during initialization", function() {
        const id = 'item"><img data-injected="true">&quot;\'';
        new DropDownButton(button, { items: [{ id: id, text: "Item" }] });

        const list = $(document.getElementById(button.attr("aria-controls")));

        assert.equal(list.find("img").length, 0);
        assert.equal(list.children("li").length, 1);
        assert.equal(list.children("li").attr("id"), id);
    });

    it("DropDownButton preserves attribute ids without injecting markup during initialization", function() {
        const id = 'item"><img data-injected="true">&quot;\'';
        new DropDownButton(button, { items: [{ text: "Item", attributes: { id: id } }] });

        const list = $(document.getElementById(button.attr("aria-controls")));

        assert.equal(list.find("img").length, 0);
        assert.equal(list.children("li").length, 1);
        assert.equal(list.children("li").attr("id"), id);
    });

    it("DropDownButton preserves link targets without injecting markup during initialization", function() {
        const target = 'frame"><img data-injected="true">&quot;\'';
        new DropDownButton(button, {
            items: [{ text: "Item", url: "https://example.com", attributes: { target: target } }]
        });

        const list = $(document.getElementById(button.attr("aria-controls")));

        assert.equal(list.find("img").length, 0);
        assert.equal(list.children("li").length, 1);
        assert.equal(list.find("a").length, 1);
        assert.equal(list.find("a").attr("target"), target);
        assert.isUndefined(list.children("li").attr("target"));
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
        let dropDownButton = new DropDownButton(button, { enabled: false, items: defaultItems });

        assert.include(["disabled", "true"], button.attr("disabled"));
        assert.isOk(button.hasClass("k-disabled"));
    });

    it("DropDownButton renders disabled buttons when button has disabled attr", function() {
        button.attr("disabled", "disabled");
        let dropDownButton = new DropDownButton(button, { items: defaultItems });

        assert.include(["disabled", "true"], button.attr("disabled"));
        assert.isOk(button.hasClass("k-disabled"));
    });

    it("DropDownButton renders type button", function() {
        let dropDownButton = new DropDownButton(button, { items: defaultItems });

        assert.equal(button.attr("type"), "button");
    });

    it("DropDownButton renders type button as defined from DOM", function() {
        button.attr("type", "submit");
        let dropDownButton = new DropDownButton(button, { items: defaultItems });

        assert.equal(button.attr("type"), "submit");
    });
});
