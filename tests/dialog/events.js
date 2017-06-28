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

    var KICONCLOSE = ".k-dialog-close";

    function createDialog(options, element) {
        element = element || $("<div class='dialog'>dialog content</div>").appendTo(QUnit.fixture);
        return element.kendoDialog(options).data("kendoDialog");
    }

    test("dialog has kendoNS", function() {
        var dialog = createDialog({ visible: true });

        ok(dialog.wrapper.data("kendoNS"));
        ok(dialog.element.data("kendoNS"));
    });

    test("dialog actions have kendoNS", function () {
        var dialog = createDialog({ actions: [{}, {}] })
        var actionBtns = dialog.wrapper.find(".k-dialog-buttongroup > .k-button");
        actionBtns.each(function() {
            ok($(this).data("kendoNS"));
        });
    });

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

    test("init triggers open event if visible: true and modal: false", function() {
        createDialog({
            modal: false,
            open: function() { ok(true); }
        });
    });

    test("init triggers initOpen event if visible: true", function() {
        createDialog({
            initOpen: function() { ok(true); }
        });
    });

    test("init triggers initOpen event if visible: true and modal: false", function() {
        createDialog({
            modal: false,
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

    test("open triggers show event", function() {
        var dialog = createDialog({
            visible: false,
            show: function(e) { ok(e.sender.wrapper.is(":visible")); }
        });

        dialog.open();
    });

    test("open does not triggers show event, if open event hendler returns false.", function() {
        var dialog = createDialog({
            visible: false,
            opne: function() { ok(true); return false;},
            show: function(e) { ok(e.sender.wrapper.is(":visible")); }
        });

        dialog.open();
    });

    test("close triggers hide event", function() {
        var dialog = createDialog({
            visible: true,
            hide: function(e) {ok(!e.sender.wrapper.is(":visible")); }
        });
        dialog.close();
    });

    test("close does not triggers hide event, if close event hendler returns false.", function() {
        var dialog = createDialog({
            visible: true,
            close: function() { ok(true); return false;},
            show: function(e) { ok(!e.sender.wrapper.is(":visible")); }
        });

        dialog.close();
    });

    var keys = kendo.keys;
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

        ok(!dialog.options.visible);
        ok(!dialog.wrapper.is(":visible"));
    });

    test("escape key does not close the dialog, when closable is false", function() {
        var dialog = createDialog({
            closable: false,
            animation: false
        });

        dialog.element.press(keys.ESC);

        ok(dialog.options.visible);
        ok(dialog.wrapper.is(":visible"));
    });

    function keyboardCloseButton_closesDialog(keyCode) {
        var dialog = createDialog({ closable: true });

        dialog.wrapper.find(KICONCLOSE).press(keyCode);

        ok(!dialog.options.visible);
    }

    test("close button enter key triggers close", $.proxy(keyboardCloseButton_closesDialog, this, keys.ENTER));
    test("close button esc key triggers close", $.proxy(keyboardCloseButton_closesDialog, this, keys.ESC));
    test("close button space key triggers close", $.proxy(keyboardCloseButton_closesDialog, this, keys.SPACEBAR));

    function actionButtonKeyTrigger(keyCode) {
        var dialog = createDialog({
            actions: [{ text: "ok", action: function() {
                ok(true);
            }}]
        });

        dialog.wrapper.find(".k-dialog-buttongroup .k-button").press(keyCode);
    }

    test("action button triggered by enter key", $.proxy(actionButtonKeyTrigger, this, keys.ENTER));
    test("action button triggered by enter key", $.proxy(actionButtonKeyTrigger, this, keys.SPACEBAR));

    test("esc key on action button just closes the dialog", function() {
        var dialog = createDialog({
            actions: [{
                text: "ok",
                action: function() {
                    ok(false);
                }
            }]
        });

        dialog.wrapper.find(".k-dialog-buttongroup .k-button").press(keys.ESC);
        ok(!dialog.options.visible);
    });
})();
