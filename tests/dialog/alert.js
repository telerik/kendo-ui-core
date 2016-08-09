(function() {
    module("Alert dialog initialization", {
        teardown: function() {
            QUnit.fixture.closest("body").find(".alert").each(function(idx, element) {
                var alertDialog = $(element).data("kendoAlert");
                removeMocksIn(kendo.ui.Alert.fn);
                removeMocksIn(alertDialog);
                alertDialog.destroy();
            });
            QUnit.fixture.closest("body").find(".k-overlay").remove();
        }
    });

    function createAlert(options, element) {
        element = element || $("<div class='alert' />").appendTo(QUnit.fixture);
        return element.kendoAlert(options).data("kendoAlert");
    }

    test("creates default html structure", function() {
        var alertDialog = createAlert();
        var wrapper = alertDialog.wrapper;
        var wrapperChildren = wrapper.children();

        ok(wrapper.is(".k-alert.k-widget.k-dialog.k-window"));
        ok(wrapperChildren.eq(0).is(".k-window-titlebar"));
        ok(wrapperChildren.eq(1).is(".k-content"));
        ok(wrapperChildren.eq(2).is(".k-dialog-buttongroup"));
        ok(wrapperChildren.eq(2).children().eq(0).is(".k-button"));
    });

    test("alert has wai-aria role='alertdialog'", function() {
        var alertDialog = createAlert();

        equal(alertDialog.wrapper.attr("role"), "alertdialog");
    });

    test("title is window.location.host", function() {
        var alertDialog = createAlert();
        var host = window.location.host;

        equal(alertDialog.options.title, host);
        equal(alertDialog.title(), host);
    });

    test("closable is false", function() {
        var alertDialog = createAlert();
        equal(alertDialog.options.closable, false);
    });

    test("created one default OK action", function() {
        var alertDialog = createAlert();
        equal(alertDialog.options.actions.length, 1);
        equal(alertDialog.options.actions[0].aciotn, undefined);
    });

    test("close should call destroy", function() {
        mockFunc(kendo.ui.Alert.fn, "destroy", function() { ok(true); });
        var alertDialog = createAlert();
        alertDialog.open();
        alertDialog.close();
        removeMock(kendo.ui.Alert.fn, "destroy");
    });

    test("focuses the OK button on first show", function() {
        mockFunc(kendo.ui.Alert.fn, "_focus", function(node) {
            ok($(node).hasClass("k-button"));
        });
        createAlert({ visible: true });
    });

    test("open focuses the OK button", function() {
        var dialog = createAlert({ visible: false });
        mockFunc(dialog, "_focus", function(node) {
            ok($(node).hasClass("k-button"));
        });
        dialog.open();
    });

    test("aria-describedby is set to content element", function() {
        var alertDialog = createAlert({ content: "message", visible: true });

        equal(alertDialog.wrapper.attr("aria-describedby"), alertDialog.element.attr("id"));
    });

    test("ensure content has id", function() {
        var alertDialog = createAlert({ content: "message", visible: true });

        ok(alertDialog.element.attr("id"));
    });

    test("use existing content id for aria-describedby", function() {
        var node = $("<div class='alert' id='dialog-content'>content</div>").appendTo(QUnit.fixture);
        var alertDialog = createAlert({ visible: true }, node);

        equal(alertDialog.wrapper.attr("aria-describedby"), "dialog-content");
    });

    module("kendo.alert method", {
        teardown: function() {
            QUnit.fixture.closest("body").find(".k-alert .k-content").each(function(idx, element) {
                $(element).data("kendoAlert").destroy();
            });
            QUnit.fixture.closest("body").find(".k-overlay").remove();
        }
    });

    test("opens Alert dialog", function() {
        var alertDialog = kendo.alert("message");
        ok(alertDialog.options.visible);
    });

    test("text argument sets Alert dialog content", function() {
        var alertDialog = kendo.alert("message");
        equal(alertDialog.content(), "message");
    });

})();
