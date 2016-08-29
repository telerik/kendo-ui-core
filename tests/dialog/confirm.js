(function() {
    module("Confirm dialog initialization", {
        teardown: function() {
            QUnit.fixture.closest("body").find(".confirm").each(function(idx, element) {
                var confirmDialog = $(element).data("kendoConfirm");
                removeMocksIn(kendo.ui.Confirm.fn);
                removeMocksIn(confirmDialog);
                confirmDialog.destroy();
            });
            QUnit.fixture.closest("body").find(".k-overlay").remove();
        }
    });

    function createConfirm(options, element) {
        element = element || $("<div class='confirm' />").appendTo(QUnit.fixture);
        return element.kendoConfirm(options).data("kendoConfirm");
    }

    test("creates default html structure", function() {
        var confirmDialog = createConfirm();
        var wrapper = confirmDialog.wrapper;
        var wrapperChildren = wrapper.children();

        ok(wrapper.is(".k-confirm.k-widget.k-dialog.k-window"));
        ok(wrapperChildren.eq(0).is(".k-window-titlebar"));
        ok(wrapperChildren.eq(1).is(".k-content"));
        ok(wrapperChildren.eq(2).is(".k-dialog-buttongroup"));
        ok(wrapperChildren.eq(2).children().eq(0).is(".k-button"));
        ok(wrapperChildren.eq(2).children().eq(1).is(".k-button"));
    });

    test("focuses the OK button on first show", function() {
        mockFunc(kendo.ui.Confirm.fn, "_focus", function(node) {
            ok($(node).hasClass("k-button"));
        });
        createConfirm({ visible: true });
    });

    test("open focuses the OK button", function() {
        var dialog = createConfirm({ visible: false });
        mockFunc(dialog, "_focus", function(node) {
            ok($(node).hasClass("k-button"));
        });
        dialog.open();
    });

    test("title is window.location.host", function() {
        var confirmDialog = createConfirm();
        var host = window.location.host;

        equal(confirmDialog.options.title, host);
        equal(confirmDialog.title(), host);
    });

    test("closable is false", function() {
        var confirmDialog = createConfirm();
        equal(confirmDialog.options.closable, false);
    });

    test("first action is primary", function() {
        var confirmDialog = createConfirm();
        ok(confirmDialog.options.actions[0].primary);
        ok(!confirmDialog.options.actions[1].primary);
    });

    test("created two default actions with set action method", function() {
        var confirmDialog = createConfirm();
        equal(confirmDialog.options.actions.length, 2);
        equal(typeof confirmDialog.options.actions[0].action, "function");
        equal(typeof confirmDialog.options.actions[1].action, "function");
    });

    test("close should call destroy", function() {
        mockFunc(kendo.ui.Confirm.fn, "destroy", function() { ok(true); });
        var confirmDialog = createConfirm();
        confirmDialog.open();
        confirmDialog.close();
        removeMock(kendo.ui.Confirm.fn, "destroy");
    });

    test("ok calls result done handler", function() {
        var confirmDialog = createConfirm();
        confirmDialog.open();
        confirmDialog.result.done(function() { ok(true); });
        confirmDialog.wrapper.find(".k-button:first").click();
    });

    test("cancle calls result cancel handler", function() {
        var confirmDialog = createConfirm();
        confirmDialog.open();
        confirmDialog.result.fail(function() { ok(true); });
        confirmDialog.wrapper.find(".k-button:eq(1)").click();
    });

    module("kendo.confirm method", {
        teardown: function() {
            QUnit.fixture.closest("body").find(".k-confirm .k-content").each(function(idx, element) {
                $(element).data("kendoConfirm").destroy();
            });
            QUnit.fixture.closest("body").find(".k-overlay").remove();
        }
    });

    test("opens Confirm dialog", function() {
        kendo.confirm();
        equal($(".k-confirm").length, 1);
    });

    test("text argument sets Confirm dialog content", function() {
        kendo.confirm("message");
        equal($(".k-confirm .k-content").html(), "message");
    });

    test("ok calls chained done handler", function() {
        kendo.confirm("message").done(function() { ok(true); });
        $(".k-confirm .k-content").data("kendoConfirm").wrapper.find(".k-button:first").click();
    });

    test("cancel calls chained fail handler", function() {
        kendo.confirm("message").fail(function() { ok(true); });
        $(".k-confirm .k-content").data("kendoConfirm").wrapper.find(".k-button:eq(1)").click();
    });
})();
