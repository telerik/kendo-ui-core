(function() {
    module("events", {
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

    test("click event is fired", function() {
        var fired = false;

        function clickHandler(e) {
            fired = true;
        }

        getButton().kendoButton({
            click: clickHandler
        });

        button.click();

        ok(fired);
    });

    test("click event passes event object as an argument", function() {
        var arg;

        function clickHandler(e) {
            arg = e;
        }

        getButton().kendoButton({
            click: clickHandler
        });

        button.click();

        ok(typeof arg.event == "object");
        ok(arg.event && arg.event.target == button[0]);
    });

    test("disabled button does not fire click event", function() {
        var notFired = true;

        function clickHandler(e) {
            notFired = false;
        }

        getButton().kendoButton({
            enable: false,
            click: clickHandler
        });

        button.click();

        ok(notFired);
    });

    test("focus adds focused class", function() {
        getButton().kendoButton();

        button.focus();

        ok(button.hasClass("k-state-focused"));
    });

    test("blur removes focused class", function() {
        getButton().addClass("k-state-focused").kendoButton();

        button.blur();

        ok(!button.hasClass("k-state-focused"));
    });

    test("click event should be preventable", function () {
        var isClickPrevented = false;
        var fakeEvent = {
            preventDefault: function () {
                isClickPrevented = true;
            }
        };

        function clickHandler(e) {
            e.preventDefault();
        }

        getButton().kendoButton({
            click: clickHandler
        });

        button.data("kendoButton")._click(fakeEvent);

        ok(isClickPrevented);
    });
})();
