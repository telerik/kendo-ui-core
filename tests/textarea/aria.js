(function() {
    var TextArea = kendo.ui.TextArea,
        textarea;

    describe("kendo.ui.TextArea ARIA", function() {
        beforeEach(function() {
            textarea = $("<textarea />").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("initialization adds an aria-disabled false attribute", function() {
            var widget = new TextArea(textarea);

            assert.equal(widget.element.attr("aria-disabled"), "false");
        });

        it("initialization adds an aria-disabled true attribute when enable: false", function() {
            var widget = new TextArea(textarea, {
                enable: false
            });

            assert.equal(widget.element.attr("aria-disabled"), "true");
        });
    });

    describe("kendo.ui.TextArea AXE", function() {
        beforeEach(function() {
            $("<textarea />").appendTo(Mocha.fixture);
            textarea = $(Mocha.fixture).find("textarea");
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("TextArea is accessible", function(done) {
            var widget = new TextArea(textarea, {
                label: {
                    content: "Text"
                }
            });

            axeRunFixture(done);
        });
    });
}());
