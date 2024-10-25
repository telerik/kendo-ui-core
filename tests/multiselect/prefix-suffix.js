(function() {
    function populateSelect() {
        var options = [];
        for (var i = 0; i < 5; i++) {
            options.push("<option value='" + i + "'>Option" + i + "</option>");
        }

        select.html(options);
    }

    var MultiSelect = kendo.ui.MultiSelect,
    select;
    describe("kendo.ui.MultiSelect Prefix and Suffix", function() {
        beforeEach(function() {
            kendo.ns = "";
            select = $("<select multiple />").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            if (select.data("kendoMultiSelect")) {
                select.data("kendoMultiSelect").destroy();
            }

            select.parents(".k-widget").remove();
        });

        it("prefix template rendered", function() {
            var multiselect = new MultiSelect(select, {
                prefixOptions: { template: () => "<span>prefix</span>" }
            });

            assert.equal(multiselect._prefixContainer.length, 1);
            assert.equal(multiselect._prefixContainer.html(), "<span>prefix</span>");
        });

        it("prefix renders a separator by default", function() {
            var multiselect = new MultiSelect(select, {
                prefixOptions: { template: () => "<span>prefix</span>" }
            });

            assert.equal(multiselect._prefixContainer.length, 1);
            assert.equal(multiselect._prefixContainer.next().hasClass("k-input-separator"), true);
        });

        it("prefix does not render a separator", function() {
            var multiselect = new MultiSelect(select, {
                prefixOptions: {
                    template: () => "<span>prefix</span>",
                    separator: false
                }
            });

            assert.equal(multiselect._prefixContainer.length, 1);
            assert.equal(multiselect._prefixContainer.next().hasClass("k-input-separator"), false);
        });

        it("suffix template is rendered", function() {
            var multiselect = new MultiSelect(select, {
                suffixOptions: { template: () => "<span>suffix</span>" }
            });

            assert.equal(multiselect._suffixContainer.length, 1);
            assert.equal(multiselect._suffixContainer.html(), "<span>suffix</span>");
        });

        it("suffix renders a separator by default", function() {
            var multiselect = new MultiSelect(select, {
                suffixOptions: { template: () => "<span>suffix</span>" }
            });

            assert.equal(multiselect._suffixContainer.length, 1);
            assert.equal(multiselect._suffixContainer.prev().hasClass("k-input-separator"), true);
        });

        it("suffix does not render a separator", function() {
            var multiselect = new MultiSelect(select, {
                suffixOptions: {
                    template: () => "<span>suffix</span>",
                    separator: false
                }
            });

            assert.equal(multiselect._suffixContainer.length, 1);
            assert.equal(multiselect._suffixContainer.next().hasClass("k-input-separator"), false);
        });

    });
}());
