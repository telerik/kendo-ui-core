import '@progress/kendo-ui/src/kendo.dialog.js';
import { mockFunc, trackMethodCall } from '../../helpers/unit/mock-utils.js';

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

    // Tests for action button properties
    describe("action button properties", function() {
        it("action with themeColor applies theme color class", function() {
            let dialog = createDialog({
                actions: [{
                    text: () => "OK",
                    themeColor: "primary"
                }]
            });

            let button = dialog.wrapper.find(".k-dialog-actions .k-button");
            assert.isOk(button.hasClass("k-button-primary"));
        });

        it("action with themeColor error applies error theme class", function() {
            let dialog = createDialog({
                actions: [{
                    text: () => "Delete",
                    themeColor: "error"
                }]
            });

            let button = dialog.wrapper.find(".k-dialog-actions .k-button");
            assert.isOk(button.hasClass("k-button-error"));
        });

        it("action with themeColor warning applies warning theme class", function() {
            let dialog = createDialog({
                actions: [{
                    text: () => "Warning",
                    themeColor: "warning"
                }]
            });

            let button = dialog.wrapper.find(".k-dialog-actions .k-button");
            assert.isOk(button.hasClass("k-button-warning"));
        });

        it("action with fillMode applies fill mode class", function() {
            let dialog = createDialog({
                actions: [{
                    text: () => "OK",
                    fillMode: "outline"
                }]
            });

            let button = dialog.wrapper.find(".k-dialog-actions .k-button");
            assert.isOk(button.hasClass("k-button-outline"));
        });

        it("action with fillMode flat applies flat class", function() {
            let dialog = createDialog({
                actions: [{
                    text: () => "OK",
                    fillMode: "flat"
                }]
            });

            let button = dialog.wrapper.find(".k-dialog-actions .k-button");
            assert.isOk(button.hasClass("k-button-flat"));
        });

        it("action with fillMode link applies link class", function() {
            let dialog = createDialog({
                actions: [{
                    text: () => "OK",
                    fillMode: "link"
                }]
            });

            let button = dialog.wrapper.find(".k-dialog-actions .k-button");
            assert.isOk(button.hasClass("k-button-link"));
        });

        it("action with size applies size class", function() {
            let dialog = createDialog({
                actions: [{
                    text: () => "OK",
                    size: "large"
                }]
            });

            let button = dialog.wrapper.find(".k-dialog-actions .k-button");
            assert.isOk(button.hasClass("k-button-lg"));
        });

        it("action with size small applies small class", function() {
            let dialog = createDialog({
                actions: [{
                    text: () => "OK",
                    size: "small"
                }]
            });

            let button = dialog.wrapper.find(".k-dialog-actions .k-button");
            assert.isOk(button.hasClass("k-button-sm"));
        });

        it("action with size medium applies medium class", function() {
            let dialog = createDialog({
                actions: [{
                    text: () => "OK",
                    size: "medium"
                }]
            });

            let button = dialog.wrapper.find(".k-dialog-actions .k-button");
            assert.isOk(button.hasClass("k-button-md"));
        });

        it("action with rounded applies rounded class", function() {
            let dialog = createDialog({
                actions: [{
                    text: () => "OK",
                    rounded: "full"
                }]
            });

            let button = dialog.wrapper.find(".k-dialog-actions .k-button");
            assert.isOk(button.hasClass("k-rounded-full"));
        });

        it("action with rounded medium applies medium rounded class", function() {
            let dialog = createDialog({
                actions: [{
                    text: () => "OK",
                    rounded: "medium"
                }]
            });

            let button = dialog.wrapper.find(".k-dialog-actions .k-button");
            assert.isOk(button.hasClass("k-rounded-md"));
        });

        it("action with rounded small applies small rounded class", function() {
            let dialog = createDialog({
                actions: [{
                    text: () => "OK",
                    rounded: "small"
                }]
            });

            let button = dialog.wrapper.find(".k-dialog-actions .k-button");
            assert.isOk(button.hasClass("k-rounded-sm"));
        });

        it("action with icon renders icon element", function() {
            let dialog = createDialog({
                actions: [{
                    text: () => "Delete",
                    icon: "trash"
                }]
            });

            let button = dialog.wrapper.find(".k-dialog-actions .k-button");
            let icon = button.find(".k-button-icon");
            assert.equal(icon.length, 1);
            assert.isOk(icon.hasClass("k-svg-icon") || icon.hasClass("k-icon"));
        });

        it("action with icon and no text creates icon-only button", function() {
            let dialog = createDialog({
                actions: [{
                    icon: "trash"
                }]
            });

            let button = dialog.wrapper.find(".k-dialog-actions .k-button");
            assert.isOk(button.hasClass("k-icon-button"));
        });

        it("action with iconClass applies custom icon class", function() {
            let dialog = createDialog({
                actions: [{
                    text: () => "OK",
                    iconClass: "fa fa-male"
                }]
            });

            let button = dialog.wrapper.find(".k-dialog-actions .k-button");
            let icon = button.find(".fa.fa-male");
            assert.equal(icon.length, 1);
        });

        it("action with multiple properties applies all classes", function() {
            let dialog = createDialog({
                actions: [{
                    text: () => "Delete",
                    themeColor: "error",
                    fillMode: "solid",
                    size: "medium",
                    rounded: "full",
                    icon: "trash"
                }]
            });

            let button = dialog.wrapper.find(".k-dialog-actions .k-button");
            assert.isOk(button.hasClass("k-button-solid"));
            assert.isOk(button.hasClass("k-button-error"));
            assert.isOk(button.hasClass("k-button-md"));
            assert.isOk(button.hasClass("k-rounded-full"));
            assert.equal(button.find(".k-button-icon").length, 1);
        });

        it("action with primary true and no themeColor defaults to primary theme", function() {
            let dialog = createDialog({
                actions: [{
                    text: () => "OK",
                    primary: true
                }]
            });

            let button = dialog.wrapper.find(".k-dialog-actions .k-button");
            assert.isOk(button.hasClass("k-button-primary"));
        });

        it("action with primary true and themeColor uses specified themeColor", function() {
            let dialog = createDialog({
                actions: [{
                    text: () => "OK",
                    primary: true,
                    themeColor: "error"
                }]
            });

            let button = dialog.wrapper.find(".k-dialog-actions .k-button");
            assert.isOk(button.hasClass("k-button-error"));
        });

        it("setOptions updates action button properties", function() {
            let dialog = createDialog({
                actions: [{
                    text: () => "OK",
                    themeColor: "primary"
                }]
            });

            dialog.setOptions({
                actions: [{
                    text: () => "Delete",
                    themeColor: "error",
                    icon: "trash"
                }]
            });

            let button = dialog.wrapper.find(".k-dialog-actions .k-button");
            assert.isOk(button.hasClass("k-button-error"));
            assert.equal(button.find(".k-button-icon").length, 1);
        });

        it("multiple actions with different properties render correctly", function() {
            let dialog = createDialog({
                actions: [
                    {
                        text: () => "Cancel",
                        fillMode: "outline"
                    },
                    {
                        text: () => "Delete",
                        themeColor: "error",
                        fillMode: "solid"
                    },
                    {
                        icon: "eye-slash",
                        themeColor: "warning",
                        rounded: "full"
                    }
                ]
            });

            let buttons = dialog.wrapper.find(".k-dialog-actions .k-button");
            assert.equal(buttons.length, 3);
            assert.isOk(buttons.eq(0).hasClass("k-button-outline"));
            assert.isOk(buttons.eq(1).hasClass("k-button-solid"));
            assert.isOk(buttons.eq(1).hasClass("k-button-error"));
            assert.isOk(buttons.eq(2).hasClass("k-button-warning"));
            assert.isOk(buttons.eq(2).hasClass("k-rounded-full"));
            assert.isOk(buttons.eq(2).hasClass("k-icon-button"));
        });

        it("action with cssClass applies custom CSS class", function() {
            let dialog = createDialog({
                actions: [{
                    text: () => "OK",
                    cssClass: "myCustomClass"
                }]
            });

            let button = dialog.wrapper.find(".k-dialog-actions .k-button");
            assert.isOk(button.hasClass("myCustomClass"));
        });

        it("action with icon and iconClass prefers icon property", function() {
            let dialog = createDialog({
                actions: [{
                    text: () => "OK",
                    icon: "trash",
                    iconClass: "fa fa-male"
                }]
            });

            let button = dialog.wrapper.find(".k-dialog-actions .k-button");
            // Icon should be rendered (either as SVG or font icon)
            let iconElement = button.find(".k-button-icon");
            assert.equal(iconElement.length, 1);
        });
    });
});
