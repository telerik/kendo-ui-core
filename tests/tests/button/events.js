import '@progress/kendo-ui/src/kendo.button.js';
import { getButton } from "../../helpers/button.js";

let button;

describe("events", function() {
    afterEach(function() {
        if (button) {
            if (button.data("kendoButton")) {
                button.data("kendoButton").destroy();
            }
            button.remove();
            button = null;
        }
    });

    it("click event is fired", function() {
        let fired = false;

        function clickHandler(e) {
            fired = true;
        }

        button = getButton().kendoButton({
            click: clickHandler
        });

        button.click();

        assert.isOk(fired);
    });

    it("click event passes event object as an argument", function() {
        let arg;

        function clickHandler(e) {
            arg = e;
        }

        button = getButton().kendoButton({
            click: clickHandler
        });

        button.click();

        assert.isOk(typeof arg.event == "object");
        assert.isOk(arg.event && arg.event.target == button[0]);
    });

    it("disabled button does not fire click event", function() {
        let notFired = true;

        function clickHandler(e) {
            notFired = false;
        }

        button = getButton().kendoButton({
            enable: false,
            click: clickHandler
        });

        button.click();

        assert.isOk(notFired);
    });

    it("disabled button does not fire click event (enabled: false)", function() {
        let notFired = true;

        function clickHandler(e) {
            notFired = false;
        }

        button = getButton().kendoButton({
            enabled: false,
            click: clickHandler
        });

        button.click();

        assert.isOk(notFired);
    });

    it("focus adds focused class", function() {
        button = getButton().kendoButton();

        button.focus();

        assert.isOk(button.hasClass("k-focus"));
    });

    it("blur removes focused class", function() {
        button = getButton().addClass("k-focus").kendoButton();

        button.blur();

        assert.isOk(!button.hasClass("k-focus"));
    });

    it("click event should be preventable", function() {
        let isClickPrevented = false;
        let fakeEvent = {
            preventDefault: function() {
                isClickPrevented = true;
            }
        };

        function clickHandler(e) {
            e.preventDefault();
        }

        button = getButton().kendoButton({
            click: clickHandler
        });

        button.data("kendoButton")._click(fakeEvent);

        assert.isOk(isClickPrevented);
    });
});
