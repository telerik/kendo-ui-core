/* globals updateInput, createInput */
(function() {
    var MaskedTextBox = kendo.ui.MaskedTextBox,
        input;

    describe("kendo.ui.MaskedTextBox ARIA", function() {
        beforeEach(function() {
            input = $("<input />").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("initialization adds an aria-placeholder when mask is set", function() {
            var maskedtextbox = new MaskedTextBox(input, {
                mask: "0-0"
            });

            assert.equal(maskedtextbox.element.attr("aria-placeholder"), "0-0");
        });
    });

    describe("kendo.ui.MaskedTextBox initialization", function() {
        beforeEach(function() {
            $("<label>Phone number:<input title='number' /></label>").appendTo(Mocha.fixture);
            input = $(Mocha.fixture).find("input");
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("MaskedTextBox is accessible", function(done) {
            var maskedtextbox = new MaskedTextBox(input, {
                mask: "0-0"
            });

            axeRunFixture(done);
        });
    });
}());
