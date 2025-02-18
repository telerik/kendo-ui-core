import { createInput } from "../../helpers/unit/maskedtextbox-utils.js";

let MaskedTextBox = kendo.ui.MaskedTextBox;
let input;

describe("kendo.ui.MaskedTextBox Prefix and Suffix", function() {
    beforeEach(function() {
        input = createInput();
    });
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
    });

    it("prefix template rendered", function() {
        let maskedtextbox = new MaskedTextBox(input, {
            prefixOptions: { template: () => "<span>prefix</span>" }
        });

        assert.equal(maskedtextbox._prefixContainer.length, 1);
        assert.equal(maskedtextbox._prefixContainer.html(), "<span>prefix</span>");
    });

    it("prefix renders a separator by default", function() {
        let maskedtextbox = new MaskedTextBox(input, {
            prefixOptions: { template: () => "<span>prefix</span>" }
        });

        assert.equal(maskedtextbox._prefixContainer.length, 1);
        assert.equal(maskedtextbox._prefixContainer.next().hasClass("k-input-separator"), true);
    });

    it("prefix does not render a separator", function() {
        let maskedtextbox = new MaskedTextBox(input, {
            prefixOptions: {
                template: () => "<span>prefix</span>",
                separator: false
            }
        });

        assert.equal(maskedtextbox._prefixContainer.length, 1);
        assert.equal(maskedtextbox._prefixContainer.next().hasClass("k-input-separator"), false);
    });

    it("suffix template is rendered", function() {
        let maskedtextbox = new MaskedTextBox(input, {
            suffixOptions: { template: () => "<span>suffix</span>" }
        });

        assert.equal(maskedtextbox._suffixContainer.length, 1);
        assert.equal(maskedtextbox._suffixContainer.html(), "<span>suffix</span>");
    });

    it("suffix renders a separator by default", function() {
        let maskedtextbox = new MaskedTextBox(input, {
            suffixOptions: { template: () => "<span>suffix</span>" }
        });

        assert.equal(maskedtextbox._suffixContainer.length, 1);
        assert.equal(maskedtextbox._suffixContainer.prev().hasClass("k-input-separator"), true);
    });

    it("suffix does not render a separator", function() {
        let maskedtextbox = new MaskedTextBox(input, {
            suffixOptions: {
                template: () => "<span>suffix</span>",
                separator: false
            }
        });

        assert.equal(maskedtextbox._suffixContainer.length, 1);
        assert.equal(maskedtextbox._suffixContainer.next().hasClass("k-input-separator"), false);
    });

});
