import '@progress/kendo-ui/src/kendo.button.js';
import { getButton } from "../../helpers/button.js";

let button;

    describe("Button accessibility with AXE", function() {
        afterEach(function() {
            if (button && button.data("kendoButton")) {
                button.data("kendoButton").destroy();
                button.remove();
                button = null;
            }
        });

        it("Button is accessible", async function() {
            getButton().kendoButton();

            await axeRunFixture();
        });

        it("disabled Button is accessible", async function() {
            getButton().kendoButton({
                enable: false
            });

            await axeRunFixture();
        });

        it("icon Button is accessible", async function() {
            getButton().kendoButton({
                icon: "refresh"
            });

            await axeRunFixture();
        });

    });

    describe("aria", function() {
        afterEach(function() {
            if (button && button.data("kendoButton")) {
                button.data("kendoButton").destroy();
                button.remove();
                button = null;
            }
        });

        it("initialization adds a button role", function() {
            button = getButton().kendoButton();

            assert.equal(button.attr("role"), "button");
        });

        it("initialization adds an aria-disabled false attribute", function() {
            button = getButton().kendoButton();

            assert.equal(button.attr("aria-disabled"), "false");
        });

        it("initialization adds an aria-disabled true attribute when enable: false", function() {
            button = getButton().kendoButton({
                enable: false
            });

            assert.equal(button.attr("aria-disabled"), "true");
        });

        it("initialization adds an aria-disabled true attribute when enabled: false", function() {
            button = getButton().kendoButton({
                enabled: false
            });

            assert.equal(button.attr("aria-disabled"), "true");
        });

        it("enable(true) sets an aria-disabled false attribute", function() {
            button = getButton().kendoButton({
                enable: false
            });

            button.data("kendoButton").enable(true);

            assert.equal(button.attr("aria-disabled"), "false");
        });

        it("enable(false) sets an aria-disabled true attribute", function() {
            button = getButton().kendoButton({
                enable: true
            });

            button.data("kendoButton").enable(false);

            assert.equal(button.attr("aria-disabled"), "true");
        });
    });

