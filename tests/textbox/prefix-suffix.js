(function() {

    var TextBox = kendo.ui.TextBox;
    var input;

    describe("kendo.ui.TextBox Prefix and Suffix", function() {
        beforeEach(function() {
            input = $("<input>").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("prefix template rendered", function() {
            var textbox = new TextBox(input, {
                prefixOptions: { template: () => "<span>prefix</span>" }
            });

            assert.equal(textbox._prefixContainer.length, 1);
            assert.equal(textbox._prefixContainer.html(), "<span>prefix</span>");
        });

        it("prefix renders a separator by default", function() {
            var textbox = new TextBox(input, {
                prefixOptions: { template: () => "<span>prefix</span>" }
            });

            assert.equal(textbox._prefixContainer.length, 1);
            assert.equal(textbox._prefixContainer.next().hasClass("k-input-separator"), true);
        });

        it("prefix does not render a separator", function() {
            var textbox = new TextBox(input, {
                prefixOptions: {
                    template: () => "<span>prefix</span>",
                    separator: false
                }
            });

            assert.equal(textbox._prefixContainer.length, 1);
            assert.equal(textbox._prefixContainer.next().hasClass("k-input-separator"), false);
        });

        it("suffix template is rendered", function() {
            var textbox = new TextBox(input, {
                suffixOptions: { template: () => "<span>suffix</span>" }
            });

            assert.equal(textbox._suffixContainer.length, 1);
            assert.equal(textbox._suffixContainer.html(), "<span>suffix</span>");
        });

        it("suffix renders a separator by default", function() {
            var textbox = new TextBox(input, {
                suffixOptions: { template: () => "<span>suffix</span>" }
            });

            assert.equal(textbox._suffixContainer.length, 1);
            assert.equal(textbox._suffixContainer.prev().hasClass("k-input-separator"), true);
        });

        it("suffix does not render a separator", function() {
            var textbox = new TextBox(input, {
                suffixOptions: {
                    template: () => "<span>suffix</span>",
                    separator: false
                }
            });

            assert.equal(textbox._suffixContainer.length, 1);
            assert.equal(textbox._suffixContainer.next().hasClass("k-input-separator"), false);
        });

        it("clear button is rendered as after suffix container", function() {
            var textbox = new TextBox(input, {
                suffixOptions: {
                    template: () => "<span>suffix</span>",
                    separator: false
                },
                value: "large",
                clearButton: true
            });

            assert.equal(textbox.wrapper.find(".k-clear-value").prev()[0], textbox._suffixContainer[0]);
        });

    });
}());
