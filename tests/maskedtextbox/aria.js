/* globals updateInput, createInput */
(function() {
    var MaskedTextBox = kendo.ui.MaskedTextBox,
        input;

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
