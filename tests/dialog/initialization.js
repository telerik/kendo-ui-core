(function() {
    var dialog;
    var moduleOptions = {
        beforeEach: function() {
            //
        },
        afterEach: function() {
            Mocha.fixture.closest("body").find(".dialog").each(function(idx, element) {
                removeMocksIn(kendo.ui.Dialog.fn);
                var dialog = $(element).data("kendoDialog");
                dialog.destroy();
            });
            Mocha.fixture.closest("body").find(".k-overlay").remove();
        }
    };

    function createDialog(options, element) {
        element = element || $("<div class='dialog' />").appendTo(Mocha.fixture);
        return element.kendoDialog(options).data("kendoDialog");
    }

    function createHighDialog(options, element, innerHeight) {
        element = element || $("<div class='dialog'><div style='height:" + innerHeight + "px'></div></div>").appendTo(Mocha.fixture);
        return element.kendoDialog(options).data("kendoDialog");
    }

    describe("initialization", function() {

        beforeEach(moduleOptions.beforeEach);
        afterEach(function() {
            moduleOptions.afterEach();
            $("#before,#after").remove();
        });

        it("creates default html structure", function() {
            var dialog = createDialog();
            var wrapper = dialog.wrapper;
            var wrapperChildren = wrapper.children();

            assert.isOk(wrapper.is(".k-widget.k-window.k-dialog"));
            assert.isOk(wrapperChildren.eq(0).is(".k-window-titlebar.k-dialog-titlebar"));
            assert.isOk(wrapperChildren.eq(0).children().eq(1).is(".k-window-actions.k-dialog-actions"));
            assert.isOk(wrapperChildren.eq(0).children().eq(1).children().eq(0).is(".k-window-action.k-dialog-action.k-dialog-close"));
            assert.isOk(wrapperChildren.eq(0).children().eq(1).children().eq(0).children().eq(0).is(".k-icon.k-i-close"));
            assert.isOk(wrapperChildren.eq(1).is(".k-content.k-window-content.k-dialog-content"));
            assert.equal(wrapper.find(".k-dialog-buttongroup").length, 0);
        });

        it("adds close button to wrapper if titleless", function() {
            var dialog = createDialog({
                title: false
            });
            var wrapper = dialog.wrapper;
            var wrapperChildren = wrapper.children();

            assert.isOk(wrapper.is(".k-widget.k-dialog.k-window"));
            assert.isOk(wrapperChildren.eq(0).is(".k-dialog-action.k-dialog-close"));
            assert.isOk(wrapperChildren.eq(0).children().eq(0).is(".k-icon.k-i-close"));
            assert.isOk(wrapperChildren.eq(1).is(".k-content"));
            assert.equal(wrapper.find(".k-dialog-buttongroup").length, 0);
        });

        it("close button messages updates aria-label and title", function() {
            var testMessage = "test_close_button";
            var dialog = createDialog({
                messages: {
                    close: testMessage
                }
            });
            var wrapper = dialog.wrapper;

            assert.equal(wrapper.find(".k-dialog-action.k-dialog-close").attr("aria-label"), testMessage);
            assert.equal(wrapper.find(".k-dialog-action.k-dialog-close").attr("title"), testMessage);
        });

        it("hide close button", function() {
            var dialog = createDialog({
                closable: false
            });
            var wrapper = dialog.wrapper;
            var wrapperChildren = wrapper.children();
            assert.isOk(!wrapperChildren.eq(0).is(".k-i-close"));
        });

        it("title=false does not render title and adds css class", function() {
            var dialog = createDialog({
                title: false
            });

            assert.equal(dialog.wrapper.find(".k-dialog-titlebar").length, 0);
            assert.isOk(dialog.wrapper.is(".k-dialog-titleless"));
        });

        it("set title text from options", function() {
            var dialog = createDialog({
                title: "title text"
            });

            assert.equal(dialog.wrapper.find(".k-dialog-title").html(), "title text");
        });

        it("set content html from options", function() {
            var dialog = createDialog({
                content: "content text"
            });

            assert.equal(dialog.wrapper.find(".k-content").html(), "content text");
        });

        it("setting actions in options adds buttongroup container", function() {
            var dialog = createDialog({
                actions: [{ text: "OK" }]
            });

            assert.equal(dialog.wrapper.find(".k-dialog-buttongroup").length, 1);
        });

        it("setting an acition in options adds a button", function() {
            var dialog = createDialog({
                actions: [{ text: "OK" }]
            });

            assert.equal(dialog.wrapper.find(".k-dialog-buttongroup > .k-button").length, 1);
        });

        it("setting an primary acition in options adds a primary button", function() {
            var dialog = createDialog({
                actions: [{
                    text: "OK",
                    primary: true
                }, {
                    text: "Cancel"
                }]
            });
            var wrapper = dialog.wrapper;

            assert.equal(wrapper.find(".k-dialog-buttongroup > .k-button").length, 2);
            assert.isOk(wrapper.find(".k-dialog-buttongroup > .k-button:first").is(".k-primary"));
        });

        it("visible:true option is inferred from content element", function() {
            var div = $("<div class='dialog'>foo</div>").appendTo(Mocha.fixture),
                clientObject;

            div.kendoDialog();

            clientObject = div.data("kendoDialog");

            assert.isOk(clientObject.wrapper.is(":visible"));
            assert.isOk(div.is(":visible"));
            assert.isOk(clientObject.options.visible);
        });

        it("visible:false option is inferred from content element", function() {
            var div = $("<div style='display: none' class='dialog'>foo</div>").appendTo(Mocha.fixture),
                clientObject;

            div.kendoDialog();

            clientObject = div.data("kendoDialog");

            assert.isOk(clientObject.wrapper.is(":hidden"));
            assert.isOk(!clientObject.options.visible);
        });

        it("width is constrained by minWidth", function() {
            var dialog = createDialog({ minWidth: 100, width: 90 });
            assert.equal(dialog.wrapper.outerWidth(), 100);
        });

        it("width is constrained by maxWidth", function() {
            var dialog = createDialog({ maxWidth: 100, width: 190 });
            assert.equal(dialog.wrapper.outerWidth(), 100);
        });

        it("height is constrained by minHeight", function() {
            var dialog = createDialog({ minHeight: 100, height: 90 });
            assert.equal(dialog.wrapper.outerHeight(), 100);
        });

        it("height is constrained by maxHeight", function() {
            var dialog = createDialog({ maxHeight: 150, height: 190 });
            assert.equal(dialog.wrapper.outerHeight(), 150);
        });

        it("height is constrained by maxHeight when content is larger", function() {
            var dialog = createHighDialog({ maxHeight: 150 }, null, 200);
            assert.isOk(dialog.wrapper.outerHeight() <= 150);
        });

        it("creating dialog with string width", function() {
            var dialog = createDialog({ width: "190px" });
            assert.equal(dialog.wrapper.outerWidth(), 190);
        });

        it("creating dialog with string height", function() {
            var dialog = createDialog({ height: "190px" });
            assert.equal(dialog.wrapper.outerHeight(), 190);
        });

        it("set zero content height by creating dialog with string insufficient height", function() {
            var dialog = createDialog({ height: "10px", buttonLayout: "normal" });

            assert.equal(dialog.element.prop("style").getPropertyValue("height"), "0px");
        });

        it("apply scroll class name to dialog content", function() {
            var dialog = createDialog({ height: "100px", content: "<h2>Content</h2>" });

            assert.isOk(dialog.element.hasClass("k-scroll"));
        });

        it("do not apply scroll class name to dialog content", function() {
            var dialog = createDialog({ height: "100px" });

            assert.isOk(!dialog.element.hasClass("k-scroll"));
        });

        it("construction of modal dialog shows overlay", function() {
            createDialog({
                modal: true
            });

            assert.isOk($(".k-overlay").is(":visible"));
        });

        it("construction of modal dialog with visible false does not shows overlay", function() {
            createDialog({
                visible: false,
                modal: true
            });

            assert.equal($(".k-overlay").length, 0);
        });

        it("construction of modal dialog with visible false does not destroy other dialog overlay", function() {
            createDialog({ modal: true });
            var div = $("<div class='dialog'>foo</div>").appendTo(Mocha.fixture);
            div.kendoDialog({ modal: false });

            assert.equal($(".k-overlay").length, 1);
            assert.isOk($(".k-overlay").is(":visible"));
        });

        it("tabindex is set when missing", function() {
            var dialog = createDialog();

            assert.equal(dialog.element.attr("tabindex"), 0);
        });

        it("predefine tabindex is applied on other elements", function() {
            var div = $("<div class='dialog' tabindex='10'>foo</div>").appendTo(Mocha.fixture);
            var dialog = div.kendoDialog({
                closable: true,
                actions: [{ text: "ok" }]
            }).getKendoDialog();

            assert.equal(dialog.element.attr("tabindex"), 10);
            assert.equal(dialog.wrapper.find(".k-dialog-close").attr("tabindex"), 10);
            assert.equal(dialog.wrapper.find(".k-button").attr("tabindex"), 10);
        });

        it("dialog aria-labelledby points to the titlebar", function() {
            var dialog = createDialog({ visible: true });
            var wrapper = dialog.wrapper;

            assert.equal(wrapper.attr("aria-labelledby"), wrapper.find(".k-window-titlebar").attr("id"));
        });

        it("buttonLayout stretched", function() {
            var dialog = createDialog({
                buttonLayout: "stretched",
                actions: [{ text: "a1" }, { text: "a2" }]
            });
            var actionbar = dialog.wrapper.find(".k-dialog-buttongroup");

            assert.isOk(actionbar.hasClass("k-dialog-button-layout-stretched"));
            assert.equal(actionbar.find(".k-button").eq(0).width, actionbar.find(".k-button").eq(1).width);
        });

        it("buttonLayout normal", function() {
            var dialog = createDialog({
                buttonLayout: "normal",
                actions: [{ text: "a1" }, { text: "a2" }]
            });
            var actionbar = dialog.wrapper.find(".k-dialog-buttongroup");

            assert.isOk(actionbar.hasClass("k-dialog-button-layout-normal"));
            assert.equal(actionbar.find(".k-button").get(0).style.width, "");
        });

        it("creating dialog with size sets the class", function() {
            var dialog = createDialog({
                minHeight: 200,
                size: "small"
            });

            assert.isOk(dialog.wrapper.hasClass("k-window-sm"));
        });

        it("creating dialog with preventScroll stop the document scrolling", function() {
            var dialog = createDialog({
                minHeight: 200,
                visible: true,
                modal: {
                    preventScroll: true
                }
            });

            assert.equal("hidden", $("body").css("overflow"));
        });

        it("closing dialog with preventScroll stop the document scrolling", function() {
            var dialog = createDialog({
                minHeight: 200,
                visible: true,
                modal: {
                    preventScroll: true
                }
            });

            dialog.close();

            assert.equal("visible", $("body").css("overflow"));
        });


        it("buttonLayout is empty string resorts to normal", function() {
            var dialog = createDialog({
                buttonLayout: "",
                actions: [{ text: "a1" }, { text: "a2" }]
            });
            var actionbar = dialog.wrapper.find(".k-dialog-buttongroup");

            assert.isOk(actionbar.hasClass("k-dialog-button-layout-normal"));
            assert.equal(actionbar.find(".k-button").get(0).style.width, "");
        });

        it("rtl on the wrapper element", function() {
            var node = $("<div class='dialog k-rtl'>foo</div>").appendTo(Mocha.fixture);
            var dialog = createDialog({ visible: true }, node);

            assert.isOk(dialog.wrapper.hasClass("k-rtl"));
        });
    });

    describe("accessible modality", function() {
        beforeEach($.noop);
        afterEach(function() {
            moduleOptions.afterEach();
            $("#before,#after").remove();
        });

        it("adds aria-hidden", function() {
            var node = $("<div class='dialog'>foo</div>").appendTo(Mocha.fixture);
            Mocha.fixture.before("<div id='before'>before</div>");
            Mocha.fixture.after("<div id='after'>after</div>");

            dialog = createDialog({ modal: true, visible: true }, node);

            assert.equal($("#before").attr("aria-hidden"), "true");
            assert.equal($("#after").attr("aria-hidden"), "true");
        });

        it("aria-hidden is removed on close", function() {
            var node = $("<div class='dialog'>foo</div>").appendTo(Mocha.fixture);
            Mocha.fixture.before("<div id='before'>before</div>");
            Mocha.fixture.after("<div id='after'>after</div>");

            dialog = createDialog({ modal: true, visible: true }, node);
            dialog.close();

            assert.equal($("#before").attr("aria-hidden"), null);
            assert.equal($("#after").attr("aria-hidden"), null);
        });

        it("restores initial aria-hidden value on close", function() {
            var node = $("<div class='dialog'>foo</div>").appendTo(Mocha.fixture);
            Mocha.fixture.before("<div id='before' aria-hidden='true'>before</div>");
            Mocha.fixture.after("<div id='after'>after</div>");

            dialog = createDialog({ modal: true, visible: true }, node);
            dialog.close();

            assert.equal($("#before").attr("aria-hidden"), "true");
            assert.equal($("#after").attr("aria-hidden"), null);
        });

        it("focuses visible modal dialog on init", function() {
            var dialogNode = $("<div class='dialog'></div>").appendTo(Mocha.fixture);
            mockFunc(kendo.ui.Dialog.fn, "_focus", function(node) {
                assert.equal(node, dialogNode[0]);
            });
            var dialog = createDialog({ modal: true, visible: true }, dialogNode);
        });

        it("invisible window should not track for resize", function() {
            var dialog = createDialog({ visible: false });
            assert.isOk(!dialog._trackResize);
        });

    });
}());
