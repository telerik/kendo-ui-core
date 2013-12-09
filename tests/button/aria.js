(function() {
    module("aria", {
        teardown: function() {
            if (button && button.data("kendoButton")) {
                button.data("kendoButton").destroy();
                button.remove();
                button = null;
            }
            if (buttonContainer && buttonContainer.length) {
                kendo.destroy(buttonContainer);
                buttonContainer.remove();
                buttonContainer = null;
            }
        }
    });

    test("initialization adds a button role", function() {
        getButton().kendoButton();

        equal(button.attr("role"), "button");
    });

    test("initialization adds an aria-disabled false attribute", function() {
        getButton().kendoButton();

        equal(button.attr("aria-disabled"), "false");
    });

    test("initialization adds an aria-disabled true attribute", function() {
        getButton().kendoButton({
            enable: false
        });

        equal(button.attr("aria-disabled"), "true");
    });

    test("enable(true) sets an aria-disabled false attribute", function() {
        getButton().kendoButton({
            enable: false
        });

        button.data("kendoButton").enable(true);

        equal(button.attr("aria-disabled"), "false");
    });

    test("enable(false) sets an aria-disabled true attribute", function() {
        getButton().kendoButton({
            enable: true
        });

        button.data("kendoButton").enable(false);

        equal(button.attr("aria-disabled"), "true");
    });
})();
