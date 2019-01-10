(function() {
    var keys = window.kendo.keys;

    describe("navigation", function () {
        beforeEach(function() {
            $.fn.press = function(key) {
                return this.trigger({ type: "keydown", keyCode: key, preventDefault: $.noop });
            };
        });
        afterEach(function() {
            if (button) {
                if (button.data("kendoButton")) {
                    button.data("kendoButton").destroy();
                }
                button.remove();
                button = null;
            }
        });

    it("focusing adds a focused class", function() {
        var buttonObject = getButton().kendoButton();

        button.focus();

        assert.isOk(button.hasClass("k-state-focused"));
    });

    it("blurring removes a focused class", function() {
        var buttonObject = getButton().addClass("k-state-focused").kendoButton();

        button.blur();

        assert.isOk(!button.hasClass("k-state-focused"));
    });

    it("Enter key triggers click event for non-button elements", function() {
        var fired = false;

        function clickHandler(e) {
            fired = true;
        }

        getSpanButton().kendoButton({
            click: clickHandler
        });

        button.press(keys.ENTER);

        assert.isOk(fired);
    });

    it("Spacebar triggers click event for non-button elements", function() {
        var fired = false;

        function clickHandler(e) {
            fired = true;
        }

        getSpanButton().kendoButton({
            click: clickHandler
        });

        button.press(keys.SPACEBAR);

        assert.isOk(fired);
    });
    });
}());
