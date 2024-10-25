(function() {
    var keys = window.kendo.keys;
    var button;
    var instance;

    describe("navigation", function() {
        beforeEach(function() {
            $.fn.press = function(key) {
                return this.trigger({ type: "keydown", keyCode: key, preventDefault: $.noop });
            };

            button = $("<span id='btn'>Toggle Button</span>").appendTo(Mocha.fixture);
        });

        afterEach(function() {
            if (button) {
                kendo.destroy(button);
                instance = null;
                button.remove();
                button = null;
            }
        });

        it("Enter key triggers toggle event for non-button elements", function() {
            var fired = false;

            button.kendoToggleButton({
                toggle: () => {
                    fired = true;
                }
            });

            button.press(keys.ENTER);

            assert.isOk(fired);
        });

        it("Spacebar triggers toggle event for non-button elements", function() {
            var fired = false;

            button.kendoToggleButton({
                toggle: () => {
                    fired = true;
                }
            });

            button.press(keys.SPACEBAR);

            assert.isOk(fired);
        });
    });
}());
