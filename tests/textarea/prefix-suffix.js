(function() {

    var TextArea = kendo.ui.TextArea;
    var textarea;

    describe("kendo.ui.TextArea Prefix and Suffix", function() {
        beforeEach(function() {
            textarea = $("<textarea />").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("prefix template rendered", function() {
            var textareaInstance = new TextArea(textarea, {
                prefixOptions: { template: () => "<span>prefix</span>" }
            });

            assert.equal(textareaInstance._prefixContainer.length, 1);
            assert.equal(textareaInstance._prefixContainer.html(), "<span>prefix</span>");
        });

        it("prefix renders a separator by default", function() {
            var textareaInstance = new TextArea(textarea, {
                prefixOptions: { template: () => "<span>prefix</span>" }
            });

            assert.equal(textareaInstance._prefixContainer.length, 1);
            assert.equal(textareaInstance._prefixContainer.next().hasClass("k-input-separator"), true);
        });

        it("prefix does not render a separator", function() {
            var textareaInstance = new TextArea(textarea, {
                prefixOptions: {
                    template: () => "<span>prefix</span>",
                    separator: false
                }
            });

            assert.equal(textareaInstance._prefixContainer.length, 1);
            assert.equal(textareaInstance._prefixContainer.next().hasClass("k-input-separator"), false);
        });

        it("suffix template is rendered", function() {
            var textareaInstance = new TextArea(textarea, {
                suffixOptions: { template: () => "<span>suffix</span>" }
            });

            assert.equal(textareaInstance._suffixContainer.length, 1);
            assert.equal(textareaInstance._suffixContainer.html(), "<span>suffix</span>");
        });

        it("suffix renders a separator by default", function() {
            var textareaInstance = new TextArea(textarea, {
                suffixOptions: { template: () => "<span>suffix</span>" }
            });

            assert.equal(textareaInstance._suffixContainer.length, 1);
            assert.equal(textareaInstance._suffixContainer.prev().hasClass("k-input-separator"), true);
        });

        it("suffix does not render a separator", function() {
            var textareaInstance = new TextArea(textarea, {
                suffixOptions: {
                    template: () => "<span>suffix</span>",
                    separator: false
                }
            });

            assert.equal(textareaInstance._suffixContainer.length, 1);
            assert.equal(textareaInstance._suffixContainer.next().hasClass("k-input-separator"), false);
        });

    });
}());
