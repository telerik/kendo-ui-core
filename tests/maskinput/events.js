(function() {
    var MaskInput = kendo.ui.MaskInput,
        input;

    module("kendo.ui.MaskInput events", {
        setup: function() {
            input = $("<input />").appendTo(QUnit.fixture);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("MaskInput raises widget change event", 1, function() {
        var maskinput = new MaskInput(input, {
            change: function() {
                ok(true);
            }
        });

        input.focus();
        input.val("test");
        input.blur();
    });

    test("MaskInput raises input change event", 1, function() {
        var maskinput = new MaskInput(input);

        input.on("change", function() {
            ok(true);
        });

        input.focus();
        input.val("test");
        input.blur();
    });

    test("MaskInput raises change event on ENTER", 1, function() {
        var maskinput = new MaskInput(input, {
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
