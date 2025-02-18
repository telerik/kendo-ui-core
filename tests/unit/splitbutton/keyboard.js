import '@progress/kendo-ui/src/kendo.splitbutton.js';
import { asyncTest } from '../../helpers/unit/async-utils.js';

let SplitButton = kendo.ui.SplitButton;
let keys = kendo.keys;
let button;

let defaultItems = [
    { id: "item1", text: "item 1" },
    { id: "item2", text: "item 2" }
];

describe("SplitButton keyboard navigation", function() {
    beforeEach(function() {
        button = $("<button>Button</button>").appendTo(Mocha.fixture);

        $.fn.press = function(key, shiftKey, altKey, target) {
            $(this).trigger({
                type: "keydown",
                keyCode: key,
                shiftKey: shiftKey,
                altKey: altKey,
                target: target || this
            });
        };
    });
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
    });

    asyncTest("Alt+Down opens button menu", function(done) {
        let splitButton = new SplitButton(button, {
            items: defaultItems,
            open: function() {
                done(() => assert.isOk(true));
            }
        });

        button.focus();
        button.press(keys.DOWN, false, true);
    });

    asyncTest("Alt+Up closes button menu", function(done) {
        let splitButton = new SplitButton(button, {
            items: defaultItems,
            close: function() {
                done(() => assert.isOk(true));
            }
        });

        button.focus();
        button.press(keys.DOWN, false, true);
        splitButton.menu.list.press(keys.UP, false, true, $("#item1")[0]);

    });

    it("Down navigates to second item", function() {
        let splitButton = new SplitButton(button, {
            items: defaultItems
        });

        splitButton.open();
        $("#item1").trigger("focus");
        splitButton.menu.list.press(keys.DOWN, false, false, $("#item1")[0]);

        assert.isOk($(document.activeElement).is("#item2"));
    });

    it("Up navigates to second item", function() {
        let splitButton = new SplitButton(button, {
            items: defaultItems
        });

        splitButton.open();
        $("#item2").trigger("focus");
        splitButton.menu.list.press(keys.UP, false, false, $("#item2")[0]);

        assert.isOk($(document.activeElement).is("#item1"));
    });

    it("Home navigates to first", function() {
        let splitButton = new SplitButton(button, {
            items: defaultItems
        });

        splitButton.open();
        $("#item2").trigger("focus");
        splitButton.menu.list.press(keys.HOME, false, false, $("#item2")[0]);

        assert.isOk($(document.activeElement).is("#item1"));
    });

    it("End navigates to first", function() {
        let splitButton = new SplitButton(button, {
            items: defaultItems
        });

        splitButton.open();
        $("#item1").trigger("focus");
        splitButton.menu.list.press(keys.END, false, false, $("#item1")[0]);

        assert.isOk($(document.activeElement).is("#item2"));
    });
});
