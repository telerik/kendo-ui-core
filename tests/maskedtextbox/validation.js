(function() {
    var MaskedTextBox = kendo.ui.MaskedTextBox,
        input,
        STATE_INVALID ="k-state-invalid",
        keyPressA = $.Event("keypress", { keyCode: 65 });

    module("kendo.ui.MaskedTextBox validation", {
        setup: function() {
            input = $("<input />").appendTo(QUnit.fixture);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("input has hidden decoration by default.", function () {
         var maskedtextbox = new MaskedTextBox(input);

         ok(!maskedtextbox.wrapper.hasClass(STATE_INVALID));
    });

    test("the keypress event adds invalid decoration for invalid value.", function () {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "0"
        });

        maskedtextbox.value("a");

        ok(maskedtextbox.wrapper.hasClass(STATE_INVALID));
    });

    test("the keypress event does not add invalid decoration for valid value.", function () {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "0"
        });

        maskedtextbox.value("1");

        ok(!maskedtextbox.wrapper.hasClass(STATE_INVALID));
    });

    asyncTest("invalid decoration is removed after some time.", 1, function () {
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "0"
        });

        maskedtextbox.value("a");
        setTimeout(function () {
            start();
            ok(!maskedtextbox.wrapper.hasClass(STATE_INVALID));
        }, 120);
    });

    test("on init control must be in valid state.", function () {
        input.val("555 123 4567");
        var maskedtextbox = new MaskedTextBox(input, {
            mask: "(999) 000-0000"
        });

        ok(!maskedtextbox.wrapper.hasClass(STATE_INVALID));
    });
})();