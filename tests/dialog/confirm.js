(function() {
    describe("Confirm dialog initialization", function() {
        afterEach(function() {
            Mocha.fixture.closest("body").find(".confirm").each(function(idx, element) {
                var confirmDialog = $(element).data("kendoConfirm");
                removeMocksIn(kendo.ui.Confirm.fn);
                removeMocksIn(confirmDialog);
                confirmDialog.destroy();
            });
            Mocha.fixture.closest("body").find(".k-overlay").remove();
        });

        function createConfirm(options, element) {
            element = element || $("<div class='confirm' />").appendTo(Mocha.fixture);
            return element.kendoConfirm(options).data("kendoConfirm");
        }

        it("creates default html structure", function() {
            var confirmDialog = createConfirm();
            var wrapper = confirmDialog.wrapper;
            var wrapperChildren = wrapper.children();

            assert.isOk(wrapper.is(".k-confirm.k-widget.k-dialog.k-window"));
            assert.isOk(wrapperChildren.eq(0).is(".k-window-titlebar"));
            assert.isOk(wrapperChildren.eq(1).is(".k-content"));
            assert.isOk(wrapperChildren.eq(2).is(".k-dialog-buttongroup"));
            assert.isOk(wrapperChildren.eq(2).children().eq(0).is(".k-button"));
            assert.isOk(wrapperChildren.eq(2).children().eq(1).is(".k-button"));
        });

        it("focuses the OK button on first show", function() {
            mockFunc(kendo.ui.Confirm.fn, "_focus", function(node) {
                assert.isOk($(node).hasClass("k-button"));
            });
            createConfirm({ visible: true });
        });

        it("open focuses the OK button", function() {
            var dialog = createConfirm({ visible: false });
            mockFunc(dialog, "_focus", function(node) {
                assert.isOk($(node).hasClass("k-button"));
            });
            dialog.open();
        });

        it("title is window.location.host", function() {
            var confirmDialog = createConfirm();
            var host = window.location.host;

            assert.equal(confirmDialog.options.title, host);
            assert.equal(confirmDialog.title(), host);
        });

        it("closable is false", function() {
            var confirmDialog = createConfirm();
            assert.equal(confirmDialog.options.closable, false);
        });

        it("first action is primary", function() {
            var confirmDialog = createConfirm();
            assert.isOk(confirmDialog.options.actions[0].primary);
            assert.isOk(!confirmDialog.options.actions[1].primary);
        });

        it("created two default actions with set action method", function() {
            var confirmDialog = createConfirm();
            assert.equal(confirmDialog.options.actions.length, 2);
            assert.equal(typeof confirmDialog.options.actions[0].action, "function");
            assert.equal(typeof confirmDialog.options.actions[1].action, "function");
        });

        it("close should call destroy", function() {
            mockFunc(kendo.ui.Confirm.fn, "destroy", function() { assert.isOk(true); });
            var confirmDialog = createConfirm();
            confirmDialog.open();
            confirmDialog.close();
            removeMock(kendo.ui.Confirm.fn, "destroy");
        });

        it("ok calls result done handler", function() {
            var confirmDialog = createConfirm();
            confirmDialog.open();
            confirmDialog.result.done(function() { assert.isOk(true); });
            confirmDialog.wrapper.find(".k-button:first").click();
        });

        it("cancle calls result cancel handler", function() {
            var confirmDialog = createConfirm();
            confirmDialog.open();
            confirmDialog.result.fail(function() { assert.isOk(true); });
            confirmDialog.wrapper.find(".k-button:eq(1)").click();
        });
    });

    describe("kendo.confirm method", function() {
        afterEach(function() {
            Mocha.fixture.closest("body").find(".k-confirm .k-content").each(function(idx, element) {
                $(element).data("kendoConfirm").destroy();
            });
            Mocha.fixture.closest("body").find(".k-overlay").remove();
        });

        it("opens Confirm dialog", function() {
            kendo.confirm();
            assert.equal($(".k-confirm").length, 1);
        });

        it("text argument sets Confirm dialog content", function() {
            kendo.confirm("message");
            assert.equal($(".k-confirm .k-content").html(), "message");
        });

        it("ok calls chained done handler", function() {
            kendo.confirm("message").done(function() { assert.isOk(true); });
            $(".k-confirm .k-content").data("kendoConfirm").wrapper.find(".k-button:first").click();
        });

        it("cancel calls chained fail handler", function() {
            kendo.confirm("message").fail(function() { assert.isOk(true); });
            $(".k-confirm .k-content").data("kendoConfirm").wrapper.find(".k-button:eq(1)").click();
        });
    });
}());
