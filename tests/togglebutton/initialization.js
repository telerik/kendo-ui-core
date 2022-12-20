(function() {
    var button;
    var instance;

    describe("initialization", function() {
        beforeEach(function() {
            button = $("<button id='btn' type='button'>Toggle Button</button>").appendTo(Mocha.fixture);
        });

        afterEach(function() {
            if (button) {
                kendo.destroy(button);
                instance = null;
                button.remove();
                button = null;
            }
        });

        it("initialization adds a k-toggle-button class", function() {
            button.kendoToggleButton();

            assert.isOk(button.hasClass("k-toggle-button"));
        });

        it("initialization adds a k-selected class if button is selected", function() {
            button.kendoToggleButton({
                selected: true
            });

            assert.isOk(button.hasClass("k-selected"));
        });

        it("initialization does not add a k-selected class if button is not selected", function() {
            button.kendoToggleButton({
                selected: false
            });

            assert.isOk(!button.hasClass("k-selected"));
        });
    });
}());