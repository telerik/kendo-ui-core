/* globals createInput, stub */
(function() {
    var MaskedTextBox = kendo.ui.MaskedTextBox;
    var input, masked;
    var originalBrowser = $.extend(kendo.support.browser);

    function assertChange() {
        assert.equal(masked.calls("inputChange"), 1);
    }

    function asyncTestEvent(name) {
        return function(done) {
            input.trigger(name);

            input.val("12-334");

            setTimeout(function() {
                assertChange();
                done();
            });
        };
    }

    describe("IE9 changes input in", function() {
        beforeEach(function() {
            input = createInput();
            kendo.support.browser = {
                msie: true,
                version: 9
            };

            masked = new MaskedTextBox(input, {
                mask: "00-00",
                value: "12-34"
            });

            stub(masked, {
                inputChange: masked.inputChange
            });
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
            kendo.support.browser = originalBrowser;
        });

        it("paste event", asyncTestEvent("paste"));
        it("drag and drop of text", asyncTestEvent("drop"));
        it("built-in clear button is clicked (mouseup event is triggered)", asyncTestEvent("mouseup"));
        it("delete content with DEL/BACKSPACE", asyncTestEvent("keydown"));

        it("delete with BACKSPACE respects direction", function(done) {
            window.__flag = true;
            input.trigger({
                type: "keydown",
                keyCode: kendo.keys.BACKSPACE
            });

            input.val("12-334");

            setTimeout(function() {
                assert.isOk(masked.args("inputChange")[0]);
                done();
            });
        });

        it("no change is value is same", function(done) {
            input.trigger(name);

            setTimeout(function() {
                assert.equal(masked.calls("inputChange"), 0);
                done();
            });
        });

        it("paste event from context menu (mouseup is triggered as well)", function(done) {
            input.trigger("mouseup");
            input.trigger("paste");

            input.val("12-334");

            setTimeout(function() {
                assertChange();
                done();
            });
        });

    });
}());
