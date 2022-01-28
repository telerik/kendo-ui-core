(function() {
    var KICONCLOSE = ".k-dialog-close";

    function createDialog(options, element) {
        element = element || $("<div class='dialog'>dialog content</div>").appendTo(Mocha.fixture);
        return element.kendoDialog(options).data("kendoDialog");
    }

    describe("initialization", function() {
        beforeEach(function() {
            //
        });
        afterEach(function() {
            Mocha.fixture.closest("body").find(".dialog").each(function(idx, element) {
                $(element).data("kendoDialog").destroy();
            });
            Mocha.fixture.closest("body").find(".k-overlay").remove();
        });

        it("dialog has kendoNS", function() {
            var dialog = createDialog({ visible: true });

            assert.isOk(dialog.wrapper.data("kendoNS"));
            assert.isOk(dialog.element.data("kendoNS"));
        });

        it("dialog actions have kendoNS", function() {
            var dialog = createDialog({ actions: [{}, {}] })
            var actionBtns = dialog.wrapper.find(".k-dialog-buttongroup > .k-button");
            actionBtns.each(function() {
                assert.isOk($(this).data("kendoNS"));
            });
        });

        it("close triggers close event", function() {
            var dialog = createDialog({
                close: function(ev) {
                    assert.isNotOk(ev.userTriggered);
                    assert.isOk(true);
                }
            });

            dialog.close();
        });

        it("title click on close icon calls close event", function() {
            var dialog = createDialog({
                close: function(ev) {
                    assert.isOk(ev.userTriggered);
                    assert.isOk(true);
                }
            });

            dialog.wrapper.find(KICONCLOSE).click();
        });

        it("action click calls close event", function() {
            var dialog = createDialog({
                actions: [
                    { text: "just close" }
                ],
                close: function(ev) {
                    assert.isOk(ev.userTriggered);
                    assert.isOk(true);
                }
            });

            dialog.wrapper.find(".k-button-group .k-button").click();
        });

        it("init triggers open event if visible: true", function() {
            createDialog({
                open: function() { assert.isOk(true); }
            });
        });

        it("init triggers open event if visible: true and modal: false", function() {
            createDialog({
                modal: false,
                open: function() { assert.isOk(true); }
            });
        });

        it("init triggers initOpen event if visible: true", function() {
            createDialog({
                initOpen: function() { assert.isOk(true); }
            });
        });

        it("init triggers initOpen event if visible: true and modal: false", function() {
            createDialog({
                modal: false,
                initOpen: function() { assert.isOk(true); }
            });
        });

        it("initOpen is triggered only once on init if visible: true", function() {
            var dialog = createDialog({
                initOpen: function() { assert.isOk(true); }
            });
            dialog.close();
            dialog.open();
        });

        it("open triggers open event", function() {
            var dialog = createDialog({
                visible: false,
                open: function() { assert.isOk(true); }
            });

            dialog.open();
        });


        it("initOpen event is fired only the first time a dialog is opend", function() {
            var dialog = createDialog({
                visible: false,
                initOpen: function() { assert.isOk(true); }
            });
            dialog.open();
            dialog.close();
            dialog.open();
        });

        it("open triggers show event", function() {
            var dialog = createDialog({
                visible: false,
                show: function(e) { assert.isOk(e.sender.wrapper.is(":visible")); }
            });

            dialog.open();
        });

        it("open does not triggers show event, if open event hendler returns false.", function() {
            var dialog = createDialog({
                visible: false,
                opne: function() { assert.isOk(true); return false; },
                show: function(e) { assert.isOk(e.sender.wrapper.is(":visible")); }
            });

            dialog.open();
        });

        it("close triggers hide event", function() {
            var dialog = createDialog({
                visible: true,
                hide: function(e) { assert.isOk(!e.sender.wrapper.is(":visible")); }
            });
            dialog.close();
        });

        it("close does not triggers hide event, if close event hendler returns false.", function() {
            var dialog = createDialog({
                visible: true,
                close: function() { assert.isOk(true); return false; },
                show: function(e) { assert.isOk(!e.sender.wrapper.is(":visible")); }
            });

            dialog.close();
        });
    });

    var keys = kendo.keys;
    describe("keyboard support", function() {
        beforeEach(function() {
            keys = kendo.keys;

            $.fn.press = function(key, options) {
                return this.trigger($.extend({ type: "keydown", keyCode: key }, options));
            };
        });
        afterEach(function() {
            Mocha.fixture.closest("body").find(".dialog").each(function(idx, element) {
                $(element).data("kendoDialog").destroy();
            });
            Mocha.fixture.closest("body").find(".k-overlay").remove();
        });

        it("escape key coses the window", function() {
            var dialog = createDialog({
                closable: true,
                animation: false
            });

            dialog.element.press(keys.ESC);

            assert.isOk(!dialog.options.visible);
            assert.isOk(!dialog.wrapper.is(":visible"));
        });

        it("escape key does not close the dialog, when closable is false", function() {
            var dialog = createDialog({
                closable: false,
                animation: false
            });

            dialog.element.press(keys.ESC);

            assert.isOk(dialog.options.visible);
            assert.isOk(dialog.wrapper.is(":visible"));
        });

        function keyboardCloseButton_closesDialog(keyCode) {
            var dialog = createDialog({
                closable: true,
                close: function (ev) {
                    assert.isOk(ev.userTriggered);
                }
            });

            dialog.wrapper.find(KICONCLOSE).press(keyCode);

            assert.isOk(!dialog.options.visible);
        }

        it("close button enter key triggers close", $.proxy(keyboardCloseButton_closesDialog, this, keys.ENTER));
        it("close button esc key triggers close", $.proxy(keyboardCloseButton_closesDialog, this, keys.ESC));
        it("close button space key triggers close", $.proxy(keyboardCloseButton_closesDialog, this, keys.SPACEBAR));

        function actionButtonKeyTrigger(keyCode) {
            var dialog = createDialog({
                actions: [{
                    text: "ok", action: function() {
                        assert.isOk(true);
                    }
                }]
            });

            dialog.wrapper.find(".k-dialog-buttongroup .k-button").press(keyCode);
        }

        it("action button triggered by enter key", $.proxy(actionButtonKeyTrigger, this, keys.ENTER));
        it("action button triggered by enter key", $.proxy(actionButtonKeyTrigger, this, keys.SPACEBAR));

        it("esc key on action button just closes the dialog", function() {
            var dialog = createDialog({
                actions: [{
                    text: "ok",
                    action: function() {
                        assert.isOk(false);
                    }
                }]
            });

            dialog.wrapper.find(".k-dialog-buttongroup .k-button").press(keys.ESC);
            assert.isOk(!dialog.options.visible);
        });

        it("enter key on action button runs action only once", function() {
            var dialog = createDialog({
                actions: [{
                    text: "ok",
                    action: function() {
                        assert.isOk(true);
                    }
                }]
            });

            dialog.wrapper.find(".k-dialog-buttongroup .k-button").press(keys.ENTER);
            dialog.wrapper.find(".k-dialog-buttongroup .k-button").click();
        });

        it("SPACEBAR key on action button runs action only once", function() {
            var dialog = createDialog({
                actions: [{
                    text: "ok",
                    action: function() {
                        assert.isOk(true);
                    }
                }]
            });

            dialog.wrapper.find(".k-dialog-buttongroup .k-button").press(keys.SPACEBAR);
            dialog.wrapper.find(".k-dialog-buttongroup .k-button").click();
        });
    });
}());
