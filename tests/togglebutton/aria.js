(function() {
    var button;
    var instance;

    describe("ToggleButton accessibility with AXE", function() {
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

        it("ToggleButton is accessible", function(done) {
            button.kendoToggleButton();

            axeRunFixture(done);
        });

        it("selected ToggleButton is accessible", function(done) {
            button.kendoToggleButton({
                selected: true
            });

            axeRunFixture(done);
        });
    });

    describe("aria", function() {
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

        it("initialization adds aria-pressed attribute", function() {
            button.kendoToggleButton();

            assert.equal(button.attr("aria-pressed"), "false");
        });

        it("initialization of selected ToggleButton adds aria-pressed=true attribute", function() {
            button.kendoToggleButton({
                selected: true
            });

            assert.equal(button.attr("aria-pressed"), "true");
        });
    });
}());
