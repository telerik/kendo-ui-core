(function() {

    var NumericTextBox = kendo.ui.NumericTextBox;
    var input;

    describe("kendo.ui.NumericTextBox Prefix and Suffix", function() {
        beforeEach(function() {
            input = $("<input />").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });


        it("prefix template rendered", function() {
            var numerictextbox = new NumericTextBox(input, {
                prefixOptions: { template: () => "<span>prefix</span>" }
            });

            assert.equal(numerictextbox._prefixContainer.length, 1);
            assert.equal(numerictextbox._prefixContainer.html(), "<span>prefix</span>");
        });

        it("prefix renders a separator by default", function() {
            var numerictextbox = new NumericTextBox(input, {
                prefixOptions: { template: () => "<span>prefix</span>" }
            });

            assert.equal(numerictextbox._prefixContainer.length, 1);
            assert.equal(numerictextbox._prefixContainer.next().hasClass("k-input-separator"), true);
        });

        it("prefix does not render a separator", function() {
            var numerictextbox = new NumericTextBox(input, {
                prefixOptions: {
                    template: () => "<span>prefix</span>",
                    separator: false
                }
            });

            assert.equal(numerictextbox._prefixContainer.length, 1);
            assert.equal(numerictextbox._prefixContainer.next().hasClass("k-input-separator"), false);
        });

        it("suffix template is rendered", function() {
            var numerictextbox = new NumericTextBox(input, {
                suffixOptions: { template: () => "<span>suffix</span>" }
            });

            assert.equal(numerictextbox._suffixContainer.length, 1);
            assert.equal(numerictextbox._suffixContainer.html(), "<span>suffix</span>");
        });

        it("suffix renders a separator by default", function() {
            var numerictextbox = new NumericTextBox(input, {
                suffixOptions: { template: () => "<span>suffix</span>" }
            });

            assert.equal(numerictextbox._suffixContainer.length, 1);
            assert.equal(numerictextbox._suffixContainer.prev().hasClass("k-input-separator"), true);
        });

        it("suffix does not render a separator", function() {
            var numerictextbox = new NumericTextBox(input, {
                suffixOptions: {
                    template: () => "<span>suffix</span>",
                    separator: false
                }
            });

            assert.equal(numerictextbox._suffixContainer.length, 1);
            assert.equal(numerictextbox._suffixContainer.next().hasClass("k-input-separator"), false);
        });

    });
}());
