(function() {
    describe("api", function () {
        afterEach(function() {
            if (button) {
                if (button.data("kendoButton")) {
                    button.data("kendoButton").destroy();
                }
                button.remove();
                button = null;
            }
        });

    it("enable() removes a disabled state class", function() {
        var buttonObject = getButton().kendoButton({
            enable: false
        }).data("kendoButton");

        buttonObject.enable();

        assert.isOk(!button.hasClass("k-state-disabled"));
    });

    it("enable(true) removes a disabled state class", function() {
        var buttonObject = getButton().kendoButton({
            enable: false
        }).data("kendoButton");

        buttonObject.enable(true);

        assert.isOk(!button.hasClass("k-state-disabled"));
    });

    it("enable() sets widget options.enable to true", function() {
        var buttonObject = getButton().kendoButton({
            enable: false
        }).data("kendoButton");

        buttonObject.enable();

        assert.equal(buttonObject.options.enable, true);
    });

    it("enable(true) sets widget options.enable to true", function() {
        var buttonObject = getButton().kendoButton({
            enable: false
        }).data("kendoButton");

        buttonObject.enable(true);

        assert.equal(buttonObject.options.enable, true);
    });

    it("enable(false) sets a disabled state class", function() {
        var buttonObject = getButton().kendoButton({
            enable: true
        }).data("kendoButton");

        buttonObject.enable(false);

        assert.isOk(button.hasClass("k-state-disabled"));
    });

    it("enable(false) sets widget options.enable to false", function() {
        var buttonObject = getButton().kendoButton({
            enable: true
        }).data("kendoButton");

        buttonObject.enable(false);

        assert.equal(buttonObject.options.enable, false);
    });

    it("enable(false) blurs the � span button", function () {
        var buttonObject = getSpanButton().kendoButton({
            enable: true
        }).data("kendoButton");

        buttonObject.element[0].focus();
        buttonObject.enable(false);

        assert.notEqual(document.activeElement, buttonObject.element[0]);
    });
    });
}());
