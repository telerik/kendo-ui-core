(function() {
    module("initialization", {
        setup: function() {
            //
        },
        teardown: function() {
            QUnit.fixture.closest("body").find(".dialog").each(function(idx, element) {
                $(element).data("kendoDialog").destroy();
            });
            QUnit.fixture.closest("body").find(".k-overlay").remove();
        }
    });

    var KICONCLOSE = ".k-i-close";

    function createDialog(options, element) {
        element = element || $("<div class='dialog'>dialog content</div>").appendTo(QUnit.fixture);
        return element.kendoDialog(options).data("kendoDialog");
    }

    test("close triggers close event", function() {
        var dialog = createDialog({
            close: function() { ok(true); }
        });

        dialog.close();
    });

    test("title click on close icon calls close event", function() {
        var dialog = createDialog({
            close: function() { ok(true); }
        });

        dialog.wrapper.find(KICONCLOSE).click();
    });

    test("init triggers open event if visible: true", function() {
        createDialog({
            open: function() { ok(true); }
        });
    });

    test("init triggers initOpen event if visible: true", function() {
        createDialog({
            initOpen: function() { ok(true); }
        });
    });

    test("initOpen is triggered only once on init if visible: true", function() {
        var dialog = createDialog({
            initOpen: function() { ok(true); }
        });
        dialog.close();
        dialog.open();
    });

    test("open triggers open event", function() {
        var dialog = createDialog({
            visible: false,
            open: function() { ok(true); }
        });

        dialog.open();
    });


    test("initOpen event is fired only the first time a dialog is opend", 1, function() {
        var dialog = createDialog({
            visible: false,
            initOpen: function() { ok(true); }
        });
        dialog.open();
        dialog.close();
        dialog.open();
    });

    var keys;
    module("keyboard support", {
        setup: function() {
            keys = kendo.keys;

            $.fn.press = function(key, options) {
                return this.trigger($.extend({ type: "keydown", keyCode: key }, options));
            };
        },
        teardown: function() {
            QUnit.fixture.closest("body").find(".dialog").each(function(idx, element) {
                $(element).data("kendoDialog").destroy();
            });
            QUnit.fixture.closest("body").find(".k-overlay").remove();
        }
    });

    test("escape key coses the window", function() {
        var dialog = createDialog({
            closable: true,
            animation: false
        });

        dialog.element.press(keys.ESC);

        notOk(dialog.options.visible);
        notOk(dialog.wrapper.is(":visible"));
    });

    test("escape key does not cose the dialog, when closable is false", function() {
        var dialog = createDialog({
            closable: false,
            animation: false
        });

        dialog.element.press(keys.ESC);

        ok(dialog.options.visible);
        ok(dialog.wrapper.is(":visible"));
    });
})();
