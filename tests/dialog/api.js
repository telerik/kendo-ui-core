(function() {
    describe("api", function() {
        beforeEach(function() {
            //
        });
        afterEach(function() {
            Mocha.fixture.closest("body").find(".k-window-content").each(function(idx, element) {
                kendo.widgetInstance($(element)).destroy();
            });
            Mocha.fixture.closest("body").find(".k-overlay").remove();
        });

        var KDIALOGTITLE = ".k-dialog-title",
            KDIALOGTITLEBAR = ".k-window-titlebar",
            KTITLELESS = "k-dialog-titleless";

        function createDialog(options, element) {
            element = element || $("<div class='dialog'>dialog content</div>").appendTo(Mocha.fixture);
            return element.kendoDialog(options).data("kendoDialog");
        }

        function createWindow(options) {
            return $("<div />").appendTo(Mocha.fixture).kendoWindow(options).data("kendoWindow");
        }

        it("title gets title", function() {
            assert.equal(createDialog({ title: "Title" }).title(), "Title");
        });

        it("title sets title", function() {
            var dialog = createDialog({ title: "Title" }),
                oldTitle = dialog.title(),
                titleElement = $(KDIALOGTITLE, dialog.wrapper);

            dialog.title("Title is the new title!");

            assert.equal(titleElement.text(), "Title is the new title!");

            dialog.title(oldTitle);

            assert.equal(titleElement.text(), oldTitle);
        });

        it("title sets options.title", function() {
            var options = { title: "Title" },
                dialog = createDialog(options),
                newTitle = "Title is the new title!";

            dialog.title(newTitle);

            assert.equal(dialog.options.title, newTitle);
        });

        it("title sets title, when window was created with titile false", function() {
            var dialog = createDialog({ title: false });
            var titleElement = $(KDIALOGTITLE, dialog.wrapper);
            var titleText = "Title is the new title!";

            assert.equal(titleElement.length, 0);

            dialog.title(titleText);

            titleElement = $(KDIALOGTITLE, dialog.wrapper);
            assert.equal(titleElement.text(), titleText);
        });

        it("title sets title, when window was created with titile false, removes k-dialog-titleless class from wrapper", function() {
            var dialog = createDialog({ title: false });
            var titleText = "Title is the new title!";

            dialog.title(titleText);

            assert.isOk(!dialog.wrapper.hasClass(KTITLELESS));
        });

        it("title method gets and sets the title consistently", function() {
            var title = "foo",
                dialog = createDialog({ title: title });

            assert.equal(dialog.title(), title);
            dialog.title(dialog.title());
            assert.equal(dialog.title(), title);
        });

        it("title method and title property encode the title", function() {
            var stringValue = "<script>var foo1 = 1;<\/script>",
                dialog = createDialog({ title: stringValue }),
                titleElement = $(KDIALOGTITLE, dialog.wrapper);

            assert.equal(titleElement.html(), kendo.htmlEncode(stringValue));

            dialog.title(stringValue);

            assert.equal(titleElement.html(), kendo.htmlEncode(stringValue));
        });

        it("set title to false removes the titlebar element", function() {
            var dialog = createDialog({ title: "Title" });

            dialog.title(false);

            assert.equal(dialog.wrapper.children(KDIALOGTITLEBAR).length, 0);
        });

        it("set title to false adds k-dialog-titleles class to wrapper", function() {
            var dialog = createDialog({ title: "Title" });

            dialog.title(false);

            assert.isOk(dialog.wrapper.hasClass(KTITLELESS));
        });

        it("content gets content", function() {
            assert.equal(createDialog().content(), "dialog content");
        });

        it("content sets content", function() {
            var dialog = createDialog(),
                oldContent = dialog.content(),
                contentElement = $(".k-window-content", dialog.wrapper);

            dialog.content("Content is the new content!");

            assert.equal(contentElement.html(), "Content is the new content!");

            dialog.content(oldContent);

            assert.equal(contentElement.html(), oldContent);
        });

        it("title sets options.title", function() {
            var dialog = createDialog({ content: "" }),
                newContent = "Content is the new content!";

            dialog.content(newContent);

            assert.equal(dialog.options.content, newContent);
        });

        it("close sets options.visible to false", function() {
            var dialog = createDialog();

            dialog.close();

            assert.equal(dialog.options.visible, false);
        });

        it("close removes the modal wrapper", function() {
            var dialog = createDialog({});

            dialog.close();

            assert.equal($(".k-overlay").length, 0);
        });

        it("close does not destroy other dialog overlay", function() {
            createDialog();
            var dialog2 = createDialog();

            dialog2.close();

            assert.equal($(".k-overlay").length, 1);
            assert.isOk($(".k-overlay").is(":visible"));
        });

        it("closing dialog moves overlay before previous modal dialog", function() {
            var dialog1 = createDialog();
            var dialog2 = createDialog();

            dialog2.close();

            assert.equal($(".k-overlay").length, 1);
            assert.isOk(dialog1.wrapper.prev("div").is(".k-overlay"));
        });

        it("closing dialog moves overlay before previous modal dialog", function() {
            var dialog1 = createWindow({ modal: true });
            var dialog2 = createDialog();

            dialog2.close();

            assert.equal($(".k-overlay").length, 1);
            assert.isOk(dialog1.wrapper.prev("div").is(".k-overlay"));
        });

        it("closing dialog removes overlay if previous modal has containment enabled", function() {
            $("<div id='container' style='height: 400px; width: 400px; position: absolute;' />").appendTo(Mocha.fixture);
            var dialog1 = createWindow({
                modal: true,
                draggable: {
                    containment: "#container"
                },
                animation: false
            });
            var dialog2 = createDialog({ animation: false });

            dialog2.close();
            dialog1.close();

            assert.equal($(".k-overlay").length, 0);
        });

        it("closing dialog from close handler", function() {
            var dialog = createDialog({
                close: function(e) {
                    if (e.userTriggered) {
                        this.close();
                    }
                    assert.isOk(true);
                }
            });

            dialog.wrapper.find(".k-dialog-close").click();
        });

        it("closing dialog from close handler prevents link default behavior", function() {
            var dialog = createDialog();
            var closeElemenet = dialog.wrapper.find(".k-dialog-close");
            closeElemenet.on("click", function(e) {
                assert.isOk(e.isDefaultPrevented());
            });

            closeElemenet.click();
        });

        it("open sets options.visible to true", function() {
            var dialog = createDialog({ visible: false });

            dialog.open();

            assert.equal(dialog.options.visible, true);
        });

        it("open shows the dialog wrapper ", function() {
            var dialog = createDialog({ visible: false });

            dialog.open();

            assert.isOk(dialog.wrapper.is(":visible"));
        });

        it("open adds only one modal overlay", function() {
            var dialog = createDialog({ modal: true, visible: false });
            var dialog1 = createDialog({ modal: true, visible: false });

            dialog.open();
            dialog1.open();

            assert.isOk($(".k-overlay").length === 1);
        });

        it("open adds only is added after the last opened dialog", function() {
            var dialog = createDialog({ modal: true, visible: false });
            var dialog1 = createDialog({ modal: true, visible: false });

            dialog1.open();
            dialog.open();

            assert.isOk(dialog.wrapper.prev("div").is(".k-overlay"));
        });

        it("open sets zIndex larger then the other's dialogs", function() {
            var ZINDEX = "z-index";
            var dialog = createDialog({ modal: true, visible: false });
            var dialog1 = createDialog({ modal: true, visible: false });

            dialog1.open();
            dialog.open();

            assert.isOk(dialog1.wrapper.css(ZINDEX) > 0);
            assert.isOk(dialog.wrapper.css(ZINDEX) > dialog1.wrapper.css(ZINDEX));
        });

        it("open dialog focuses the content", function() {
            var dialog = createDialog({ visible: false });
            mockFunc(dialog, "_focus", function(node) {
                assert.equal(node, dialog.element[0]);
            });
            dialog.open();
        });

        it("clicking on a button triggers action method", function() {
            var dialog = createDialog({
                actions: [{
                    text: "OK",
                    action: function() { assert.isOk(true); }
                }]
            });

            dialog.wrapper.find(".k-button-group .k-button").click();
        });

        it("clicking on an element in the button triggers action method", function() {
            var dialog = createDialog({
                actions: [{
                    text: "<span class='button-span'>OK</span>",
                    action: function() { assert.isOk(true); }
                }]
            });

            dialog.wrapper.find(".button-span").click();
        });

        it("executing action closes the dialog", function() {
            var dialog = createDialog({
                actions: [{
                    text: "OK"
                }]
            });

            dialog.wrapper.find(".k-dialog-buttongroup .k-button").click();
            assert.isOk(!dialog.options.visible);
            assert.isOk(!dialog.wrapper.is(":visible"));
        });

        it("executing action returning false does't closes the dialog", function() {
            var dialog = createDialog({
                actions: [{
                    text: "OK",
                    action: function() {
                        return false;
                    }
                }]
            });

            dialog.wrapper.find(".k-dialog-buttongroup .k-button").click();
            assert.isOk(dialog.options.visible);
            assert.isOk(dialog.wrapper.is(":visible"));
        });

        it("setOptions modifies actions", function() {
            var dialog = createDialog({
                actions: [{
                    text: "OK"
                }]
            });

            dialog.setOptions({
                actions: [
                    { text: "OK" },
                    { text: "Cancel" }
                ]
            });

            assert.equal(dialog.wrapper.find(".k-dialog-buttongroup .k-button").length, 2);
        });

        it("setOptions modifies title", function() {
            var dialog = createDialog({
                actions: [{
                    text: "OK"
                }]
            });

            dialog.setOptions({
                title: "Test"
            });

            assert.equal(dialog.title(), "Test");
        });

        it("setOptions modifies modality", function() {
            var dialog = createDialog({
                actions: [{
                    text: "OK"
                }],
                modal: true
            });

            dialog.setOptions({
                modal: false
            });

            assert.equal(dialog.options.modal, false);
        });

        it("setOptions modifies modality", function() {
            var dialog = createDialog({
                actions: [{
                    text: "OK"
                }],
                modal: true
            });

            dialog.setOptions({
                content: "test"
            });

            assert.equal(dialog.element.html(), "test");
        });

        it("center should track for resize", function() {
            var dialog = createDialog({ visible: false });
            trackMethodCall(dialog, "_centerOnResize");
            dialog.center();

            assert.isOk(dialog._centerOnResize.called);
        });

        it("remove resize tracking on close", function() {
            var dialog = createDialog({ visible: true });
            trackMethodCall(dialog, "_stopCenterOnResize");

            dialog.close();

            assert.isOk(dialog._stopCenterOnResize.called);
        });
    });
}());
