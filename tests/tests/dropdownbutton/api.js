import '@progress/kendo-ui/src/kendo.dropdownbutton.js';
import { asyncTest } from '../../helpers/async-utils.js';

let DropDownButton = kendo.ui.DropDownButton;
let dropDownButton, button;

let defaultItems = [
    { id: "item1", text: "item 1" },
    { id: "item2", text: "item 2" }
];

describe("DropDownButton api methods", function() {
    beforeEach(function() {
        button = $("<button>Button</button>").appendTo(Mocha.fixture);
    });
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
    });

    it("DropDownButton enable toggles the state of the button", function() {
        let dropDownButton = new DropDownButton(button, { enabled: false, items: defaultItems });

        assert.isOk(button.prop("disabled"));

        dropDownButton.enable();

        assert.isNotOk(button.prop("disabled"));
    });

    it("DropDownButton enable toggles the state of the button and its items", function() {
        let dropDownButton = new DropDownButton(button, {
            enabled: false,
            items: defaultItems.map(function(item) {
                return $.extend(item, { enabled: false });
            })
        });

        assert.isOk(button.prop("disabled"));

        assert.isOk(dropDownButton.menu.list.children("li").hasClass("k-disabled"));

        dropDownButton.enable();

        assert.isNotOk(button.prop("disabled"));

        assert.isNotOk(dropDownButton.menu.list.children("li").hasClass("k-disabled"));
    });

    it("DropDownButton enable toggles the state of a single item", function() {
        let dropDownButton = new DropDownButton(button, {
            items: defaultItems
        });

        dropDownButton.enable(false, "#item1");

        assert.isOk(dropDownButton.menu.list.find("#item1").hasClass("k-disabled"));

        dropDownButton.enable(true, "#item1");

        assert.isNotOk(dropDownButton.menu.list.find("#item1").hasClass("k-disabled"));
    });

    it("DropDownButton enable toggles the state of a all items when disabled previously", function() {
        let dropDownButton = new DropDownButton(button, {
            items: defaultItems
        });

        dropDownButton.enable(false, "#item1");

        assert.isOk(dropDownButton.menu.list.find("#item1").hasClass("k-disabled"));

        dropDownButton.enable();

        assert.isNotOk(button.prop("disabled"));
        assert.isNotOk(dropDownButton.menu.list.find("#item1").hasClass("k-disabled"));
    });

    it("DropDownButton hidden hides/shows items", function() {
        let dropDownButton = new DropDownButton(button, {
            items: defaultItems
        });

        dropDownButton.hide("#item1");

        assert.isOk(dropDownButton.menu.list.find("#item1").hasClass("k-hidden"));

        dropDownButton.show("#item1");

        assert.isNotOk(dropDownButton.menu.list.find("#item1").hasClass("k-hidden"));
    });

    it("DropDownButton should not open menu with no items", function() {
        let dropDownButton = new DropDownButton(button, {
            items: [],
            open: function() {
                throw new Error("Open event should not be triggered");
            }
        });

        dropDownButton.open();
    });

    it("DropDownButton should not open menu with no visible items", function() {
        let dropDownButton = new DropDownButton(button, {
            items: defaultItems,
            open: function() {
                throw new Error("Open event should not be triggered");
            }
        });

        dropDownButton.hide(dropDownButton.items());
        dropDownButton.open();
    });
});

describe("DropDownButton api events", function() {
    beforeEach(function() {
        button = $("<button>Button</button>").appendTo(Mocha.fixture);
    });
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
    });

    asyncTest("DropDownButton click event triggered from menu item with correct id", function(done) {
        let dropDownButton = new DropDownButton(button, {
            items: defaultItems,
            click: function(ev) {
                done(() => assert.equal(ev.id, "item1"));
            }
        });

        $("#item1").click();
    });

    asyncTest("DropDownButton click event triggered from menu item with id set via attributes", function(done) {
        let dropDownButton = new DropDownButton(button, {
            items: [{
                attributes: { id: "idSet" }, click: function(ev) {
                    done(() => assert.equal(ev.target.id, "idSet"));
                }
            }],
        });

        $("#idSet").click();
    });

    asyncTest("DropDownButton open event is triggered on button click", function(done) {
        let dropDownButton = new DropDownButton(button, {
            items: defaultItems,
            open: function() {
                done(() => assert.isOk(true));
            }
        });

        button.click();
    });

    asyncTest("DropDownButton close event is triggered when popup is closed", function(done) {
        let dropDownButton = new DropDownButton(button, {
            items: defaultItems,
            close: function() {
                done(() => assert.isOk(true));
            }
        });

        button.click();
        $("#item1").click();
    });
});
