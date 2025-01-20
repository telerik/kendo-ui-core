import '@progress/kendo-ui/src/kendo.maskedtextbox.js';

let MaskedTextBox = kendo.ui.MaskedTextBox,
    input;

describe("kendo.ui.MaskedTextBox ARIA", function() {
    beforeEach(function() {
        input = $("<input />").appendTo(Mocha.fixture);
    });
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
    });

    it("initialization adds an aria-placeholder when mask is set", function() {
        let maskedtextbox = new MaskedTextBox(input, {
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

    it("MaskedTextBox is accessible", async function() {
        let maskedtextbox = new MaskedTextBox(input, {
            mask: "0-0"
        });

        await axeRunFixture();
    });
});
