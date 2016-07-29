(function() {
    module("Prompt dialog initialization", {
        teardown: function() {
            QUnit.fixture.closest("body").find(".prompt").each(function(idx, element) {
                var promptDialog = $(element).data("kendoPrompt");
                removeMocksIn(kendo.ui.Prompt.fn);
                removeMocksIn(promptDialog);
                promptDialog.destroy();
            });
            QUnit.fixture.closest("body").find(".k-overlay").remove();
        }
    });

    function createPrompt(options, element) {
        element = element || $("<div class='prompt' />").appendTo(QUnit.fixture);
        return element.kendoPrompt(options).data("kendoPrompt");
    }

    test("creates default html structure", function() {
        var promptDialog = createPrompt();
        var wrapper = promptDialog.wrapper;
        var wrapperChildren = wrapper.children();

        ok(wrapper.is(".k-prompt.k-widget.k-dialog.k-window"));
        ok(wrapperChildren.eq(0).is(".k-window-titlebar"));
        ok(wrapperChildren.eq(1).is(".k-content"));
        ok(wrapperChildren.eq(2).children(":first").is(".k-textbox"));
        ok(wrapperChildren.eq(3).is(".k-dialog-buttongroup"));
        ok(wrapperChildren.eq(3).children().eq(0).is(".k-button"));
        ok(wrapperChildren.eq(3).children().eq(1).is(".k-button"));
    });

    test("focuses the textbox on first show", function() {
        mockFunc(kendo.ui.Prompt.fn, "_focus", function(node) {
            ok($(node).hasClass("k-textbox"));
        });
        createPrompt({ visible: true });
    });

    test("open focuses the OK button", function() {
        var dialog = createPrompt({ visible: false });
        mockFunc(dialog, "_focus", function(node) {
            ok($(node).hasClass("k-textbox"));
        });
        dialog.open();
    });

    test("title is window.location.host", function() {
        var promptDialog = createPrompt();
        var host = window.location.host;

        equal(promptDialog.options.title, host);
        equal(promptDialog.title(), host);
    });

    test("closable is false", function() {
        var promptDialog = createPrompt();
        equal(promptDialog.options.closable, false);
    });

    test("proptValue sets the prompt input value", function() {
        var promptDialog = createPrompt({value: "test"});
        equal(promptDialog.wrapper.find(".k-textbox").val(), "test");
    });

    test("first action is primary", function() {
        var promptDialog = createPrompt();
        ok(promptDialog.options.actions[0].primary);
    });

    test("second action is not primary", function() {
        var promptDialog = createPrompt();
        ok(!promptDialog.options.actions[1].primary);
    });

    test("created two default actions with set action method", function() {
        var promptDialog = createPrompt();
        equal(promptDialog.options.actions.length, 2);
        equal(typeof promptDialog.options.actions[0].action, "function");
        equal(typeof promptDialog.options.actions[1].action, "function");
    });

    test("close should call destroy", function() {
        mockFunc(kendo.ui.Prompt.fn, "destroy", function() { ok(true); });
        var promptDialog = createPrompt();
        promptDialog.open();
        promptDialog.close();
        removeMock(kendo.ui.Prompt.fn, "destroy");
    });

    test("ok calls result done handler with value argument", function() {
        var promptDialog = createPrompt({value: "test value"});
        promptDialog.open();
        promptDialog.result.done(function(arg) { equal(arg, "test value"); });
        promptDialog.wrapper.find(".k-button:first").click();
    });

    test("cancle calls result fail handler with value argument", function() {
        var promptDialog = createPrompt({value: "test value"});
        promptDialog.open();
        promptDialog.result.fail(function(arg) { equal(arg, "test value"); });
        promptDialog.wrapper.find(".k-button:eq(1)").click();
    });

    module("kendo.prompt method", {
        teardown: function() {
            QUnit.fixture.closest("body").find(".k-prompt .k-content").each(function(idx, element) {
                $(element).data("kendoPrompt").destroy();
            });
            QUnit.fixture.closest("body").find(".k-overlay").remove();
        }
    });

    test("opens Prompt dialog", function() {
        kendo.prompt();
        equal($(".k-prompt").length, 1);
    });

    test("text argument sets Prompt dialog content", function() {
        kendo.prompt("message");
        equal($(".k-prompt .k-content").html(), "message");
    });

    test("value sets default prompt value", function() {
        kendo.prompt("message", "test value");
        equal($(".k-textbox").val(), "test value");
    });

    test("ok calls chained done handler with prompt value argument", function() {
        kendo.prompt("message", "test value").done(function(arg) { equal(arg, "test value"); });
        $(".k-prompt .k-content").data("kendoPrompt").wrapper.find(".k-button:first").click();
    });

    test("cancel calls chained fail handler with prompt value argument", function() {
        kendo.prompt("message", "test value").fail(function(arg) { equal(arg, "test value"); });
        $(".k-prompt .k-content").data("kendoPrompt").wrapper.find(".k-button:eq(1)").click();
    });
})();
