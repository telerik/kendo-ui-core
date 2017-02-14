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

    var KDIALOGTITLE = ".k-dialog-title",
        KDIALOGTITLEBAR = ".k-window-titlebar",
        KTITLELESS = "k-dialog-titleless";

    function createDialog(options, element) {
        element = element || $("<div class='dialog'>dialog content</div>").appendTo(QUnit.fixture);
        return element.kendoDialog(options).data("kendoDialog");
    }

    test("title gets title", function() {
        equal(createDialog({ title: "Title" }).title(), "Title");
    });

    test("title sets title", function() {
        var dialog = createDialog({ title: "Title"}),
            oldTitle = dialog.title(),
            titleElement = $(KDIALOGTITLE, dialog.wrapper);

        dialog.title("Title is the new title!");

        equal(titleElement.text(), "Title is the new title!");

        dialog.title(oldTitle);

        equal(titleElement.text(), oldTitle);
    });

    test("title sets options.title", function() {
        var options = { title: "Title" },
            dialog = createDialog(options),
            newTitle = "Title is the new title!";

        dialog.title(newTitle);

        equal(dialog.options.title, newTitle);
    });

    test("title sets title, when window was created with titile false", function() {
        var dialog = createDialog({ title: false});
        var titleElement = $(KDIALOGTITLE, dialog.wrapper);
        var titleText = "Title is the new title!";

        equal(titleElement.length, 0);

        dialog.title(titleText);

        titleElement = $(KDIALOGTITLE, dialog.wrapper);
        equal(titleElement.text(), titleText);
    });

    test("title sets title, when window was created with titile false, removes k-dialog-titleless class from wrapper", function() {
        var dialog = createDialog({ title: false});
        var titleText = "Title is the new title!";

        dialog.title(titleText);

        ok(!dialog.wrapper.hasClass(KTITLELESS));
    });

    test("title method gets and sets the title consistently", 2, function () {
        var title = "&lt;foo&gt;",
            dialog = createDialog({ title: title });

        equal(dialog.title(), title);
        dialog.title(dialog.title());
        equal(dialog.title(), title);
    });

    test("title method and title property set once encoded string as once encoded", 2, function () {
        var encodedString = kendo.htmlEncode("<script>var foo1 = 1;<\/script>"),
            dialog = createDialog({ title: encodedString }),
            titleElement = $(KDIALOGTITLE, dialog.wrapper);

        equal(titleElement.html(), encodedString);

        dialog.title(encodedString);

        equal(titleElement.html(), encodedString);
    });

    test("set title to false removes the titlebar element", function() {
        var dialog = createDialog({ title: "Title" });

        dialog.title(false);

        equal(dialog.wrapper.children(KDIALOGTITLEBAR).length, 0);
    });

    test("set title to false adds k-dialog-titleles class to wrapper", function() {
        var dialog = createDialog({ title: "Title" });

        dialog.title(false);

        ok(dialog.wrapper.hasClass(KTITLELESS));
    });

    test("content gets content", function() {
        equal(createDialog().content(), "dialog content");
    });

    test("content sets content", function() {
        var dialog = createDialog(),
            oldContent = dialog.content(),
            contentElement = $(".k-content", dialog.wrapper);

        dialog.content("Content is the new content!");

        equal(contentElement.html(), "Content is the new content!");

        dialog.content(oldContent);

        equal(contentElement.html(), oldContent);
    });

    test("title sets options.title", function() {
        var dialog = createDialog({ content: "" }),
            newContent = "Content is the new content!";

        dialog.content(newContent);

        equal(dialog.options.content, newContent);
    });

    test("close sets options.visible to false", function() {
        var dialog = createDialog();

        dialog.close();

        equal(dialog.options.visible, false);
    });

    test("close removes the modal wrapper", function() {
        var dialog = createDialog({ });

        dialog.close();

        equal($(".k-overlay").length, 0);
    });

    test("close does not destroy other dialog overlay", function() {
        createDialog();
        var dialog2 = createDialog();

        dialog2.close();

        equal($(".k-overlay").length, 1);
        ok($(".k-overlay").is(":visible"));
    });

    test("closing dialog moves overlay before previous modal dialog", function() {
        var dialog1 = createDialog();
        var dialog2 = createDialog();

        dialog2.close();

        equal($(".k-overlay").length, 1);
        ok(dialog1.wrapper.prev("div").is(".k-overlay"));
    });

    test("closing dialog from close handler", 1, function() {
        var dialog = createDialog({
            close: function(e) {
                if (e.userTriggered) {
                    this.close();
                }
                ok(true);
            }
        });

        dialog.wrapper.find(".k-dialog-close").click();
    });

    test("closing dialog from close handler prevents link default behavior", 1, function() {
        var dialog = createDialog();
        var closeElemenet = dialog.wrapper.find(".k-dialog-close");
        closeElemenet.on("click", function(e){
            ok(e.isDefaultPrevented());
        });

        closeElemenet.click();
    });

    test("open sets options.visible to true", function() {
        var dialog = createDialog({ visible: false });

        dialog.open();

        equal(dialog.options.visible, true);
    });

    test("open shows the dialog wrapper ", function() {
        var dialog = createDialog({ visible: false });

        dialog.open();

        ok(dialog.wrapper.is(":visible"));
    });

    test("open adds only one modal overlay", function() {
        var dialog = createDialog({ modal: true,  visible: false });
        var dialog1 = createDialog({ modal: true,  visible: false });

        dialog.open();
        dialog1.open();

        ok($(".k-overlay").length === 1);
    });

    test("open adds only is added after the last opened dialog", function() {
        var dialog = createDialog({ modal: true,  visible: false });
        var dialog1 = createDialog({ modal: true,  visible: false });

        dialog1.open();
        dialog.open();

        ok(dialog.wrapper.prev("div").is(".k-overlay"));
    });

    test("open sets zIndex larger then the other's dialogs", function() {
        var ZINDEX = "z-index";
        var dialog = createDialog({ modal: true,  visible: false });
        var dialog1 = createDialog({ modal: true,  visible: false });

        dialog1.open();
        dialog.open();

        ok(dialog1.wrapper.css(ZINDEX) > 0);
        ok(dialog.wrapper.css(ZINDEX) > dialog1.wrapper.css(ZINDEX));
    });

    test("open dialog focuses the content", function() {
        var dialog = createDialog({ visible: false });
        mockFunc(dialog, "_focus", function(node) {
            equal(node, dialog.element[0]);
        });
        dialog.open();
    });

    test("clicking on a button triggers action method", function() {
        var dialog = createDialog({
            actions: [{
                text: "OK",
                action: function() { ok(true); }
            }]
        });

        dialog.wrapper.find(".k-button").click();
    });

    test("clicking on an element in the button triggers action method", function() {
        var dialog = createDialog({
            actions: [{
                text: "<span class='button-span'>OK</span>",
                action: function() { ok(true); }
            }]
        });

        dialog.wrapper.find(".button-span").click();
    });

    test("executing action closes the dialog", function() {
        var dialog = createDialog({
            actions: [{
                text: "OK"
            }]
        });

        dialog.wrapper.find(".k-dialog-buttongroup .k-button").click();
        ok(!dialog.options.visible);
        ok(!dialog.wrapper.is(":visible"));
    });

    test("executing action returning false does't closes the dialog", function() {
        var dialog = createDialog({
            actions: [{
                text: "OK",
                action: function() {
                    return false;
                }
            }]
        });

        dialog.wrapper.find(".k-dialog-buttongroup .k-button").click();
        ok(dialog.options.visible);
        ok(dialog.wrapper.is(":visible"));
    });

    test("center should track for resize", function() {
        var dialog = createDialog({ visible: false });
        trackMethodCall(dialog, "_centerOnResize");
        dialog.center();

        ok(dialog._centerOnResize.called);
    });

    test("remove resize tracking on close", function() {
        var dialog = createDialog({ visible: true });
        trackMethodCall(dialog, "_stopCenterOnResize");

        dialog.close();

        ok(dialog._stopCenterOnResize.called);
    });
}());
