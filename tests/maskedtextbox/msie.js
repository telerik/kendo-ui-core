/* globals createInput, stub */
(function() {
    var MaskedTextBox = kendo.ui.MaskedTextBox;
    var input, masked;
    var originalBrowser = $.extend(kendo.support.browser);

    function assertChange() {
        equal(masked.calls("inputChange"), 1);
    }

    function asyncTestEvent(name) {
        return function() {
            input.trigger(name);

            input.val("12-334");

            setTimeout(function() {
                start();
                assertChange();
            });
        };
    }

    module("IE9 changes input in", {
        setup: function() {
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
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
            kendo.support.browser = originalBrowser;
        }
    });

    asyncTest("paste event", asyncTestEvent("paste"));
    asyncTest("drag and drop of text", asyncTestEvent("drop"));
    asyncTest("built-in clear button is clicked (mouseup event is triggered)", asyncTestEvent("mouseup"));
    asyncTest("delete content with DEL/BACKSPACE", asyncTestEvent("keydown"));

    asyncTest("delete with BACKSPACE respects direction", function() {
        window.__flag = true;
        input.trigger({
            type: "keydown",
            keyCode: kendo.keys.BACKSPACE
        });

        input.val("12-334");

        setTimeout(function() {
            start();
            ok(masked.args("inputChange")[0]);
        });
    });

    asyncTest("no change is value is same", function() {
        input.trigger(name);

        setTimeout(function() {
            start();
            equal(masked.calls("inputChange"), 0);
        });
    });

    asyncTest("paste event from context menu (mouseup is triggered as well)", function() {
        input.trigger("mouseup");
        input.trigger("paste");

        input.val("12-334");

        setTimeout(function() {
            start();
            assertChange();
        });
    });

})();
