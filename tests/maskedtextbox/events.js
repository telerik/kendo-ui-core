/* globals createInput */
(function() {
    var MaskedTextBox = kendo.ui.MaskedTextBox,
        input;

    describe("kendo.ui.MaskedTextBox events", function() {
        beforeEach(function() {
            input = $("<input />").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("MaskedTextBox raises widget change event", function(done) {
            var maskedtextbox = new MaskedTextBox(input, {
                change: function() {
                    assert.isOk(true);
                }
            });

            input.focus();
            setTimeout(function() {
                input.val("test");
                input.blur();
                done();
            });
        });

        it("MaskedTextBox raises input change event", function() {
            var maskedtextbox = new MaskedTextBox(input);

            input.on("change", function() {
                assert.isOk(true);
            });

            input.focus();
            input.val("test");
            input.blur();
        });

        it("MaskedTextBox raises change event on ENTER", function() {
            var maskedtextbox = new MaskedTextBox(input, {
                mask: "LLLL",
                change: function() {
                    assert.isOk(true);
                }
            });

            input.focus();
            input.val("test");
            input.trigger({
                type: "keydown",
                keyCode: kendo.keys.ENTER
            });
        });
    });
}());
