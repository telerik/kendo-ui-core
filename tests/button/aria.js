(function() {
    describe("Button accessibility with AXE", function () {
        afterEach(function() {
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
        });

        it("Button is accessible", function(done) {
            getButton().kendoButton();

            axeRunFixture(done);
        });

        it("disabled Button is accessible", function(done) {
            getButton().kendoButton({
                enable: false
            });

            axeRunFixture(done);
        });

        it("icon Button is accessible", function(done) {
            getButton().kendoButton({
                icon: "refresh"
            });

            axeRunFixture(done);
        });

    });

    describe("aria", function () {
        afterEach(function() {
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
        });

    it("initialization adds a button role", function() {
        getButton().kendoButton();

        assert.equal(button.attr("role"), "button");
    });

    it("initialization adds an aria-disabled false attribute", function() {
        getButton().kendoButton();

        assert.equal(button.attr("aria-disabled"), "false");
    });

    it("initialization adds an aria-disabled true attribute when enable: false", function() {
        getButton().kendoButton({
            enable: false
        });

        assert.equal(button.attr("aria-disabled"), "true");
    });

    it("initialization adds an aria-disabled true attribute when enabled: false", function() {
        getButton().kendoButton({
            enabled: false
        });

        assert.equal(button.attr("aria-disabled"), "true");
    });

    it("enable(true) sets an aria-disabled false attribute", function() {
        getButton().kendoButton({
            enable: false
        });

        button.data("kendoButton").enable(true);

        assert.equal(button.attr("aria-disabled"), "false");
    });

    it("enable(false) sets an aria-disabled true attribute", function() {
        getButton().kendoButton({
            enable: true
        });

        button.data("kendoButton").enable(false);

        assert.equal(button.attr("aria-disabled"), "true");
    });
    });
}());
