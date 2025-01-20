import '@progress/kendo-ui/src/kendo.dialog.js';
import { mockFunc, trackMethodCall } from '../../helpers/mock-utils.js';

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

    let KDIALOGTITLE = ".k-dialog-title",
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
        let dialog = createDialog({ title: "Title" }),
            oldTitle = dialog.title(),
            titleElement = $(KDIALOGTITLE, dialog.wrapper);

        dialog.title("Title is the new title!");

        assert.equal(titleElement.text(), "Title is the new title!");

        dialog.title(oldTitle);

        assert.equal(titleElement.text(), oldTitle);
    });

    it("title sets options.title", function() {
        let options = { title: "Title" },
            dialog = createDialog(options),
            newTitle = "Title is the new title!";

        dialog.title(newTitle);

        assert.equal(dialog.options.title, newTitle);
    });

    it("title sets title, when window was created with titile false", function() {
        let dialog = createDialog({ title: false });
        let titleElement = $(KDIALOGTITLE, dialog.wrapper);
        let titleText = "Title is the new title!";

        assert.equal(titleElement.length, 0);

        dialog.title(titleText);

        titleElement = $(KDIALOGTITLE, dialog.wrapper);
        assert.equal(titleElement.text(), titleText);
    });

    it("title sets title, when window was created with titile false, removes k-dialog-titleless class from wrapper", function() {
        let dialog = createDialog({ title: false });
        let titleText = "Title is the new title!";

        dialog.title(titleText);

        assert.isOk(!dialog.wrapper.hasClass(KTITLELESS));
    });

    it("title method gets and sets the title consistently", function() {
        let title = "foo",
            dialog = createDialog({ title: title });

        assert.equal(dialog.title(), title);
        dialog.title(dialog.title());
        assert.equal(dialog.title(), title);
    });

    it("title method and title property encode the title", function() {
        let stringValue = "<script>let foo1 = 1;<\/script>",
            dialog = createDialog({ title: stringValue }),
            titleElement = $(KDIALOGTITLE, dialog.wrapper);

        assert.equal(titleElement.html(), kendo.htmlEncode(stringValue));

        dialog.title(stringValue);

        assert.equal(titleElement.html(), kendo.htmlEncode(stringValue));
    });

    it("set title to false removes the titlebar element", function() {
        let dialog = createDialog({ title: "Title" });

        dialog.title(false);

        assert.equal(dialog.wrapper.children(KDIALOGTITLEBAR).length, 0);
    });

    it("content gets content", function() {
        assert.equal(createDialog().content(), "dialog content");
    });

    it("content sets content", function() {
        let dialog = createDialog(),
            oldContent = dialog.content(),
            contentElement = $(".k-window-content", dialog.wrapper);

        dialog.content("Content is the new content!");

        assert.equal(contentElement.html(), "Content is the new content!");

        dialog.content(oldContent);

        assert.equal(contentElement.html(), oldContent);
    });

    it("title sets options.title", function() {
        let dialog = createDialog({ content: "" }),
            newContent = "Content is the new content!";

        dialog.content(newContent);

        assert.equal(dialog.options.content, newContent);
    });

    it("close sets options.visible to false", function() {
        let dialog = createDialog();

        dialog.close();

        assert.equal(dialog.options.visible, false);
    });

    it("hides to overlay and wrapper", function() {
        let dialog = createDialog({});

        dialog.close();

        assert.isNotOk($(".k-overlay").closest(".k-dialog-wrapper").is(":visible"));
    });

    it("close does not destroy other dialog overlay", function() {
        createDialog();
        let dialog2 = createDialog();

        dialog2.close();

        assert.equal($(".k-overlay").length, 2);
        assert.isOk($(".k-overlay").is(":visible"));
    });

    it("destroy removes overlay element", function() {
        let dialog1 = createDialog();
        let dialog2 = createDialog();

        dialog2.destroy();
        dialog1.destroy();

        assert.equal($(".k-overlay").length, 0);
    });


    it("closing dialog from close handler", function() {
        let dialog = createDialog({
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
        let dialog = createDialog();
        let closeElemenet = dialog.wrapper.find(".k-dialog-close");
        closeElemenet.on("click", function(e) {
            assert.isOk(e.isDefaultPrevented());
        });

        closeElemenet.click();
    });

    it("open sets options.visible to true", function() {
        let dialog = createDialog({ visible: false });

        dialog.open();

        assert.equal(dialog.options.visible, true);
    });

    it("open shows the dialog wrapper ", function() {
        let dialog = createDialog({ visible: false });

        dialog.open();

        assert.isOk(dialog.wrapper.is(":visible"));
    });

    it("open adds only one modal overlay in each dialog", function() {
        let dialog = createDialog({ modal: true, visible: false });
        let dialog1 = createDialog({ modal: true, visible: false });

        dialog.open();
        dialog1.open();

        assert.isOk($(".k-overlay").length === 2);
    });

    it("open adds only is added after the last opened dialog", function() {
        let dialog = createDialog({ modal: true, visible: false });
        let dialog1 = createDialog({ modal: true, visible: false });

        dialog1.open();
        dialog.open();

        assert.isOk(dialog.wrapper.prev("div").is(".k-overlay"));
    });

    it("open sets zIndex larger then the other's dialogs", function() {
        let ZINDEX = "z-index";
        let dialog = createDialog({ modal: true, visible: false });
        let dialog1 = createDialog({ modal: true, visible: false });

        dialog1.open();
        dialog.open();

        assert.isOk(dialog1.dialogWrapper.css(ZINDEX) > 0);
        assert.isOk(dialog.dialogWrapper.css(ZINDEX) > dialog1.dialogWrapper.css(ZINDEX));
    });

    it("open dialog focuses the content", function() {
        let dialog = createDialog({ visible: false });
        mockFunc(dialog, "_focus", function(node) {
            assert.equal(node, dialog.element[0]);
        });
        dialog.open();
    });

    it("clicking on a button triggers action method", function() {
        let dialog = createDialog({
            actions: [{
                text: () => "OK",
                action: function() { assert.isOk(true); }
            }]
        });

        dialog.wrapper.find(".k-button-group .k-button").click();
    });

    it("clicking on an element in the button triggers action method", function() {
        let dialog = createDialog({
            actions: [{
                text: () => "<span class='button-span'>OK</span>",
                action: function() { assert.isOk(true); }
            }]
        });

        dialog.wrapper.find(".button-span").click();
    });

    it("executing action closes the dialog", function() {
        let dialog = createDialog({
            actions: [{
                text: () => "OK"
            }]
        });

        dialog.wrapper.find(".k-dialog-actions .k-button").click();
        assert.isOk(!dialog.options.visible);
        assert.isOk(!dialog.wrapper.is(":visible"));
    });

    it("executing action returning false does't closes the dialog", function() {
        let dialog = createDialog({
            actions: [{
                text: () => "OK",
                action: function() {
                    return false;
                }
            }]
        });

        dialog.wrapper.find(".k-dialog-actions .k-button").click();
        assert.isOk(dialog.options.visible);
        assert.isOk(dialog.wrapper.is(":visible"));
    });

    it("setOptions modifies actions", function() {
        let dialog = createDialog({
            actions: [{
                text: () => "OK"
            }]
        });

        dialog.setOptions({
            actions: [
                { text: () => "OK" },
                { text: () => "Cancel" }
            ]
        });

        assert.equal(dialog.wrapper.find(".k-dialog-actions .k-button").length, 2);
    });

    it("setOptions modifies title", function() {
        let dialog = createDialog({
            actions: [{
                text: () => "OK"
            }]
        });

        dialog.setOptions({
            title: "Test"
        });

        assert.equal(dialog.title(), "Test");
    });

    it("setOptions modifies modality", function() {
        let dialog = createDialog({
            actions: [{
                text: () => "OK"
            }],
            modal: true
        });

        dialog.setOptions({
            modal: false
        });

        assert.equal(dialog.options.modal, false);
    });

    it("setOptions modifies modality", function() {
        let dialog = createDialog({
            actions: [{
                text: () => "OK"
            }],
            modal: true
        });

        dialog.setOptions({
            content: "test"
        });

        assert.equal(dialog.element.html(), "test");
    });

    it("center should track for resize", function() {
        let dialog = createDialog({ visible: false });
        trackMethodCall(dialog, "_centerOnResize");
        dialog.center();

        assert.isOk(dialog._centerOnResize.called);
    });

    it("remove resize tracking on close", function() {
        let dialog = createDialog({ visible: true });
        trackMethodCall(dialog, "_stopCenterOnResize");

        dialog.close();

        assert.isOk(dialog._stopCenterOnResize.called);
    });
});
