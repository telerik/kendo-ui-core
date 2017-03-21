(function() {
    var MaskedTextBox = kendo.ui.MaskedTextBox,
        input;

    module("kendo.ui.MaskedTextBox events", {
        setup: function() {
            input = $("<input />").appendTo(QUnit.fixture);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    asyncTest("MaskedTextBox raises widget change event", 1, function() {
        var maskedtextbox = new MaskedTextBox(input, {
            change: function() {
                ok(true);
            }
        });

        input.focus();
        setTimeout(function() {
            start();
            input.val("test");
            input.blur();
        });
    });

    test("MaskedTextBox raises input change event", 1, function() {
        var maskedtextbox = new MaskedTextBox(input);

        input.on("change", function() {
            ok(true);
        });

        input.focus();
        input.val("test");
        input.blur();
    });

    test("MaskedTextBox raises change event on ENTER", 1, function() {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "LLLL",
            change: function() {
                ok(true);
            }
        });

        input.focus();
        input.val("test");
        input.trigger({
            type: "keydown",
            keyCode: kendo.keys.ENTER
        });
    });
})();
