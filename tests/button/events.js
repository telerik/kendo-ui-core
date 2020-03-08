(function() {
    describe("events", function () {
        afterEach(function() {
            if (button) {
                if (button.data("kendoButton")) {
                    button.data("kendoButton").destroy();
                }
                button.remove();
                button = null;
            }
        });

    it("click event is fired", function() {
        var fired = false;

        function clickHandler(e) {
            fired = true;
        }

        getButton().kendoButton({
            click: clickHandler
        });

        button.click();

        assert.isOk(fired);
    });

    it("click event passes event object as an argument", function() {
        var arg;

        function clickHandler(e) {
            arg = e;
        }

        getButton().kendoButton({
            click: clickHandler
        });

        button.click();

        assert.isOk(typeof arg.event == "object");
        assert.isOk(arg.event && arg.event.target == button[0]);
    });

    it("disabled button does not fire click event", function() {
        var notFired = true;

        function clickHandler(e) {
            notFired = false;
        }

        getButton().kendoButton({
            enable: false,
            click: clickHandler
        });

        button.click();

        assert.isOk(notFired);
    });

    it("disabled button does not fire click event (enabled: false)", function() {
        var notFired = true;

        function clickHandler(e) {
            notFired = false;
        }

        getButton().kendoButton({
            enabled: false,
            click: clickHandler
        });

        button.click();

        assert.isOk(notFired);
    });

    it("focus adds focused class", function() {
        getButton().kendoButton();

        button.focus();

        assert.isOk(button.hasClass("k-state-focused"));
    });

    it("blur removes focused class", function() {
        getButton().addClass("k-state-focused").kendoButton();

        button.blur();

        assert.isOk(!button.hasClass("k-state-focused"));
    });

    it("click event should be preventable", function () {
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

        assert.isOk(isClickPrevented);
    });
    });
}());
