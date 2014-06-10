(function() {
    module("api", {
        teardown: function() {
            if (button) {
                if (button.data("kendoButton")) {
                    button.data("kendoButton").destroy();
                }
                button.remove();
                button = null;
            }
        }
    });

    test("enable() removes a disabled state class", function() {
        var buttonObject = getButton().kendoButton({
            enable: false
        }).data("kendoButton");

        buttonObject.enable();

        ok(!button.hasClass("k-state-disabled"));
    });

    test("enable(true) removes a disabled state class", function() {
        var buttonObject = getButton().kendoButton({
            enable: false
        }).data("kendoButton");

        buttonObject.enable(true);

        ok(!button.hasClass("k-state-disabled"));
    });

    test("enable() sets widget options.enable to true", function() {
        var buttonObject = getButton().kendoButton({
            enable: false
        }).data("kendoButton");

        buttonObject.enable();

        equal(buttonObject.options.enable, true);
    });

    test("enable(true) sets widget options.enable to true", function() {
        var buttonObject = getButton().kendoButton({
            enable: false
        }).data("kendoButton");

        buttonObject.enable(true);

        equal(buttonObject.options.enable, true);
    });

    test("enable(false) sets a disabled state class", function() {
        var buttonObject = getButton().kendoButton({
            enable: true
        }).data("kendoButton");

        buttonObject.enable(false);

        ok(button.hasClass("k-state-disabled"));
    });

    test("enable(false) sets widget options.enable to false", function() {
        var buttonObject = getButton().kendoButton({
            enable: true
        }).data("kendoButton");

        buttonObject.enable(false);

        equal(buttonObject.options.enable, false);
    });

    test("enable(false) blurs the à span button", function () {
        var buttonObject = getSpanButton().kendoButton({
            enable: true
        }).data("kendoButton");

        buttonObject.element[0].focus();
        buttonObject.enable(false);

        notEqual(document.activeElement, buttonObject.element[0]);
    });
})();
