(function() {
    var keys = window.kendo.keys;

    module("navigation", {
        setup: function() {
            $.fn.press = function(key) {
                return this.trigger({ type: "keydown", keyCode: key, preventDefault: $.noop });
            };
        },
        teardown: function() {
            if (button) {
                if (button.data("kendoButton")) {
                    button.data("kendoButton").destroy();
                }
                button.remove();
                button = null;
            }
        }
    });

    test("focusing adds a focused class", function() {
        var buttonObject = getButton().kendoButton();

        button.focus();

        ok(button.hasClass("k-state-focused"));
    });

    test("blurring removes a focused class", function() {
        var buttonObject = getButton().addClass("k-state-focused").kendoButton();

        button.blur();

        ok(!button.hasClass("k-state-focused"));
    });

    test("Enter key triggers click event for non-button elements", function() {
        var fired = false;

        function clickHandler(e) {
            fired = true;
        }

        getSpanButton().kendoButton({
            click: clickHandler
        });

        button.press(keys.ENTER);

        ok(fired);
    });

    test("Spacebar triggers click event for non-button elements", function() {
        var fired = false;

        function clickHandler(e) {
            fired = true;
        }

        getSpanButton().kendoButton({
            click: clickHandler
        });

        button.press(keys.SPACEBAR);

        ok(fired);
    });
})();
