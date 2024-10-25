(function() {

    var AutoComplete = kendo.ui.AutoComplete;
    var input;

    describe("kendo.ui.AutoComplete Prefix and Suffix", function() {
        beforeEach(function() {
            input = $("<input>").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("prefix template rendered", function() {
            var autocomplete = new AutoComplete(input, {
                dataSource: [1, 2],
                prefixOptions: { template: () => "<span>prefix</span>" }
            });

            assert.equal(autocomplete._prefixContainer.length, 1);
            assert.equal(autocomplete._prefixContainer.html(), "<span>prefix</span>");
        });

        it("prefix renders a separator by default", function() {
            var autocomplete = new AutoComplete(input, {
                dataSource: [1, 2],
                prefixOptions: { template: () => "<span>prefix</span>" }
            });

            assert.equal(autocomplete._prefixContainer.length, 1);
            assert.equal(autocomplete._prefixContainer.next().hasClass("k-input-separator"), true);
        });

        it("prefix does not render a separator", function() {
            var autocomplete = new AutoComplete(input, {
                dataSource: [1, 2],
                prefixOptions: {
                    template: () => "<span>prefix</span>",
                    separator: false
                }
            });

            assert.equal(autocomplete._prefixContainer.length, 1);
            assert.equal(autocomplete._prefixContainer.next().hasClass("k-input-separator"), false);
        });

        it("suffix template is rendered", function() {
            var autocomplete = new AutoComplete(input, {
                dataSource: [1, 2],
                suffixOptions: { template: () => "<span>suffix</span>" }
            });

            assert.equal(autocomplete._suffixContainer.length, 1);
            assert.equal(autocomplete._suffixContainer.html(), "<span>suffix</span>");
        });

        it("suffix renders a separator by default", function() {
            var autocomplete = new AutoComplete(input, {
                dataSource: [1, 2],
                suffixOptions: { template: () => "<span>suffix</span>" }
            });

            assert.equal(autocomplete._suffixContainer.length, 1);
            assert.equal(autocomplete._suffixContainer.prev().hasClass("k-input-separator"), true);
        });

        it("suffix does not render a separator", function() {
            var autocomplete = new AutoComplete(input, {
                dataSource: [1, 2],
                suffixOptions: {
                    template: () => "<span>suffix</span>",
                    separator: false
                }
            });

            assert.equal(autocomplete._suffixContainer.length, 1);
            assert.equal(autocomplete._suffixContainer.next().hasClass("k-input-separator"), false);
        });

    });
}());
