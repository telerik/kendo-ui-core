(function() {
    describe("Prompt dialog initialization", function() {
        afterEach(function() {
            Mocha.fixture.closest("body").find(".prompt").each(function(idx, element) {
                var promptDialog = $(element).data("kendoPrompt");
                removeMocksIn(kendo.ui.Prompt.fn);
                removeMocksIn(promptDialog);
                promptDialog.destroy();
            });
            Mocha.fixture.closest("body").find(".k-overlay").remove();
        });

        function createPrompt(options, element) {
            element = element || $("<div class='prompt' />").appendTo(Mocha.fixture);
            return element.kendoPrompt(options).data("kendoPrompt");
        }

        it("creates default html structure", function() {
            var promptDialog = createPrompt();
            var wrapper = promptDialog.wrapper;
            var wrapperChildren = wrapper.children();

            assert.isOk(wrapper.is(".k-prompt.k-widget.k-dialog.k-window"));
            assert.isOk(wrapperChildren.eq(0).is(".k-window-titlebar"));
            assert.isOk(wrapperChildren.eq(1).is(".k-content"));
            assert.isOk(wrapperChildren.eq(2).children(":first").is(".k-textbox"));
            assert.isOk(wrapperChildren.eq(3).is(".k-dialog-buttongroup"));
            assert.isOk(wrapperChildren.eq(3).children().eq(0).is(".k-button"));
            assert.isOk(wrapperChildren.eq(3).children().eq(1).is(".k-button"));
        });

        it("focuses the textbox on first show", function() {
            mockFunc(kendo.ui.Prompt.fn, "_focus", function(node) {
                assert.isOk($(node).hasClass("k-textbox"));
            });
            createPrompt({ visible: true });
        });

        it("open focuses the OK button", function() {
            var dialog = createPrompt({ visible: false });
            mockFunc(dialog, "_focus", function(node) {
                assert.isOk($(node).hasClass("k-textbox"));
            });
            dialog.open();
        });

        it("title is window.location.host", function() {
            var promptDialog = createPrompt();
            var host = window.location.host;

            assert.equal(promptDialog.options.title, host);
            assert.equal(promptDialog.title(), host);
        });

        it("closable is false", function() {
            var promptDialog = createPrompt();
            assert.equal(promptDialog.options.closable, false);
        });

        it("proptValue sets the prompt input value", function() {
            var promptDialog = createPrompt({ value: "test" });
            assert.equal(promptDialog.wrapper.find(".k-textbox").val(), "test");
        });

        it("first action is primary", function() {
            var promptDialog = createPrompt();
            assert.isOk(promptDialog.options.actions[0].primary);
        });

        it("second action is not primary", function() {
            var promptDialog = createPrompt();
            assert.isOk(!promptDialog.options.actions[1].primary);
        });

        it("created two default actions with set action method", function() {
            var promptDialog = createPrompt();
            assert.equal(promptDialog.options.actions.length, 2);
            assert.equal(typeof promptDialog.options.actions[0].action, "function");
            assert.equal(typeof promptDialog.options.actions[1].action, "function");
        });

        it("close should call destroy", function() {
            mockFunc(kendo.ui.Prompt.fn, "destroy", function() { assert.isOk(true); });
            var promptDialog = createPrompt();
            promptDialog.open();
            promptDialog.close();
            removeMock(kendo.ui.Prompt.fn, "destroy");
        });

        it("ok calls result done handler with value argument", function() {
            var promptDialog = createPrompt({ value: "test value" });
            promptDialog.open();
            promptDialog.result.done(function(arg) { assert.equal(arg, "test value"); });
            promptDialog.wrapper.find(".k-button:first").click();
        });

        it("cancle calls result fail handler with value argument", function() {
            var promptDialog = createPrompt({ value: "test value" });
            promptDialog.open();
            promptDialog.result.fail(function(arg) { assert.equal(arg, "test value"); });
            promptDialog.wrapper.find(".k-button:eq(1)").click();
        });
    });

    describe("kendo.prompt method", function() {
        afterEach(function() {
            Mocha.fixture.closest("body").find(".k-prompt .k-content").each(function(idx, element) {
                $(element).data("kendoPrompt").destroy();
            });
            Mocha.fixture.closest("body").find(".k-overlay").remove();
        });

        it("opens Prompt dialog", function() {
            kendo.prompt();
            assert.equal($(".k-prompt").length, 1);
        });

        it("text argument sets Prompt dialog content", function() {
            kendo.prompt("message");
            assert.equal($(".k-prompt .k-content").html(), "message");
        });

        it("value sets default prompt value", function() {
            kendo.prompt("message", "test value");
            assert.equal($(".k-textbox").val(), "test value");
        });

        it("ok calls chained done handler with prompt value argument", function() {
            kendo.prompt("message", "test value").done(function(arg) { assert.equal(arg, "test value"); });
            $(".k-prompt .k-content").data("kendoPrompt").wrapper.find(".k-button:first").click();
        });

        it("cancel calls chained fail handler with prompt value argument", function() {
            kendo.prompt("message", "test value").fail(function(arg) { assert.equal(arg, "test value"); });
            $(".k-prompt .k-content").data("kendoPrompt").wrapper.find(".k-button:eq(1)").click();
        });
    });
}());
