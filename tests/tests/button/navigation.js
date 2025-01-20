import '@progress/kendo-ui/src/kendo.button.js';
import { getButton, getSpanButton } from "../../helpers/button.js";

let button,
    keys = window.kendo.keys;

describe("navigation", function() {
    beforeEach(function() {
        $.fn.press = function(key) {
            return this.trigger({ type: "keydown", keyCode: key, preventDefault: $.noop });
        };
    });
    afterEach(function() {
        if (button) {
            if (button.data("kendoButton")) {
                button.data("kendoButton").destroy();
            }
            button.remove();
            button = null;
        }
    });

    it("focusing adds a focused class", function() {
        button = getButton().kendoButton();

        button.focus();

        assert.isOk(button.hasClass("k-focus"));
    });

    it("blurring removes a focused class", function() {
        button = getButton().addClass("k-focus").kendoButton();

        button.blur();

        assert.isOk(!button.hasClass("k-focus"));
    });

    it("Enter key triggers click event for non-button elements", function() {
        let fired = false;

        function clickHandler(e) {
            fired = true;
        }

        button = getSpanButton().kendoButton({
            click: clickHandler
        });

        button.press(keys.ENTER);

        assert.isOk(fired);
    });

    it("Spacebar triggers click event for non-button elements", function() {
        let fired = false;

        function clickHandler(e) {
            fired = true;
        }

        button = getSpanButton().kendoButton({
            click: clickHandler
        });

        button.press(keys.SPACEBAR);

        assert.isOk(fired);
    });
});

