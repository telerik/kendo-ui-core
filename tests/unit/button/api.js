import '@progress/kendo-ui/src/kendo.button.js';
import { getButton, getSpanButton } from "../../helpers/unit/button.js";

let button, buttonInstance;

describe("api", function() {
    afterEach(function() {
        if (button) {
            if (button.data("kendoButton")) {
                button.data("kendoButton").destroy();
            }
            button.remove();
            button = null;
            buttonInstance = null;
        }
    });

    it("enable() removes a disabled state class", function() {
        button = getButton().kendoButton({
            enable: false
        });

        buttonInstance = button.data("kendoButton");

        buttonInstance.enable();

        assert.isOk(!button.hasClass("k-disabled"));
    });

    it("enable(true) removes a disabled state class", function() {
        button = getButton().kendoButton({
            enable: false
        });

        buttonInstance = button.data("kendoButton");

        buttonInstance.enable(true);

        assert.isOk(!button.hasClass("k-disabled"));
    });

    it("enable() sets widget options.enable to true", function() {
        button = getButton().kendoButton({
            enable: false
        });

        buttonInstance = button.data("kendoButton");

        buttonInstance.enable();

        assert.equal(buttonInstance.options.enable, true);
    });

    it("enable(true) sets widget options.enable to true", function() {
        button = getButton().kendoButton({
            enable: false
        });

        buttonInstance = button.data("kendoButton");

        buttonInstance.enable(true);

        assert.equal(buttonInstance.options.enable, true);
    });

    it("enable(false) sets a disabled state class", function() {
        button = getButton().kendoButton({
            enable: true
        });

        buttonInstance = button.data("kendoButton");

        buttonInstance.enable(false);

        assert.isOk(button.hasClass("k-disabled"));
    });

    it("enable(false) sets widget options.enable to false", function() {
        button = getButton().kendoButton({
            enable: true
        });

        buttonInstance = button.data("kendoButton");

        buttonInstance.enable(false);

        assert.equal(buttonInstance.options.enable, false);
    });

    it("enable(false) blurs the � span button", function() {
        button = getSpanButton().kendoButton({
            enable: true
        });

        buttonInstance = button.data("kendoButton");

        button.focus();
        buttonInstance.enable(false);

        assert.notEqual(document.activeElement, button);
    });
});
