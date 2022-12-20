(function() {
    var button;
    var instance;

    describe("api", function() {
        beforeEach(function() {
            button = $("<button id='btn' type='button'>Toggle Button</button>").appendTo(Mocha.fixture);
        });

        afterEach(function() {
            if (instance) {
                instance.destroy();
                instance = null;
            }

            if (button) {
                button.remove();
                button = null;
            }
        });

        it("toggle() toggles k-selected class", function() {
            instance = button.kendoToggleButton({
                selected: false
            }).data("kendoToggleButton");

            instance.toggle();

            assert.isOk(button.hasClass("k-selected"));
        });

        it("toggle(true) sets k-selected class", function() {
            instance = button.kendoToggleButton({
                selected: false
            }).data("kendoToggleButton");

            instance.toggle(true);

            assert.isOk(button.hasClass("k-selected"));
        });

        it("toggle(false) removes k-selected class", function() {
            instance = button.kendoToggleButton({
                selected: true
            }).data("kendoToggleButton");

            instance.toggle(false);

            assert.isOk(!button.hasClass("k-selected"));
        });
    });
}());
