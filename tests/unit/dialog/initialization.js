import '@progress/kendo-ui/src/kendo.dialog.js';
import { removeMocksIn, mockFunc } from '../../helpers/unit/mock-utils.js';

let dialog;
let moduleOptions = {
    beforeEach: function() {
        //
    },
    afterEach: function() {
        Mocha.fixture.closest("body").find(".dialog").each(function(idx, element) {
            removeMocksIn(kendo.ui.Dialog.fn);
            let dialog = $(element).data("kendoDialog");
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
        let dialog = createDialog();
        let wrapper = dialog.wrapper;
        let wrapperChildren = wrapper.children();

        assert.isOk(wrapper.is(".k-window.k-dialog"));
        assert.isOk(wrapperChildren.eq(0).is(".k-window-titlebar.k-dialog-titlebar"));
        assert.isOk(wrapperChildren.eq(0).children().eq(1).is(".k-window-titlebar-actions.k-dialog-titlebar-actions"));
        assert.isOk(wrapperChildren.eq(0).children().eq(1).children().eq(0).is(".k-window-titlebar-action.k-dialog-titlebar-action.k-button"));
        assert.isOk(wrapperChildren.eq(0).children().eq(1).children().eq(0).children().eq(0).is(".k-svg-icon.k-svg-i-x"));
        assert.isOk(wrapperChildren.eq(1).is(".k-window-content.k-dialog-content"));
        assert.equal(wrapper.find(".k-dialog-actions").length, 0);
    });

    it("adds close button to wrapper if titleless", function() {
        let dialog = createDialog({
            title: false
        });
        let wrapper = dialog.wrapper;
        let wrapperChildren = wrapper.children();

        assert.isOk(wrapper.is(".k-dialog.k-window"));
        assert.isOk(wrapperChildren.eq(0).is(".k-dialog-titlebar-action.k-button"));
        assert.isOk(wrapperChildren.eq(0).children().eq(0).is(".k-svg-icon.k-svg-i-x"));
        assert.isOk(wrapperChildren.eq(1).is(".k-window-content"));
        assert.equal(wrapper.find(".k-dialog-actions").length, 0);
    });

    it("close button messages updates aria-label and title", function() {
        let testMessage = "test_close_button";
        let dialog = createDialog({
            messages: {
                close: testMessage
            }
        });
        let wrapper = dialog.wrapper;

        assert.equal(wrapper.find(".k-dialog-titlebar-action.k-button").attr("aria-label"), testMessage);
        assert.equal(wrapper.find(".k-dialog-titlebar-action.k-button").attr("title"), testMessage);
    });

    it("hide close button", function() {
        let dialog = createDialog({
            closable: false
        });
        let wrapper = dialog.wrapper;
        let wrapperChildren = wrapper.children();
        assert.isOk(!wrapperChildren.eq(0).is(".k-i-x"));
    });

    it("title=false does not render title", function() {
        let dialog = createDialog({
            title: false
        });

        assert.equal(dialog.wrapper.find(".k-dialog-titlebar").length, 0);
    });

    it("set title text from options", function() {
        let dialog = createDialog({
            title: "title text"
        });

        assert.equal(dialog.wrapper.find(".k-dialog-title").html(), "title text");
    });

    it("set content html from options", function() {
        let dialog = createDialog({
            content: "content text"
        });

        assert.equal(dialog.wrapper.find(".k-window-content").html(), "content text");
    });

    it("setting actions in options adds buttongroup container", function() {
        let dialog = createDialog({
            actions: [{ text: () => "OK" }]
        });

        assert.equal(dialog.wrapper.find(".k-dialog-actions").length, 1);
    });

    it("setting an acition in options adds a button", function() {
        let dialog = createDialog({
            actions: [{ text: () => "OK" }]
        });

        assert.equal(dialog.wrapper.find(".k-dialog-actions > .k-button").length, 1);
    });

    it("string action text does not violate CSP", function() {
        let dialog = createDialog({
            actions: [{ text: "OK" }]
        });

        assert.equal(dialog.wrapper.find(".k-dialog-actions > .k-button").length, 1);
    });

    it("setting an primary acition in options adds a primary button", function() {
        let dialog = createDialog({
            actions: [{
                text: () => "OK",
                primary: true
            }, {
                text: () => "Cancel"
            }]
        });
        let wrapper = dialog.wrapper;

        assert.equal(wrapper.find(".k-dialog-actions > .k-button").length, 2);
        assert.isOk(wrapper.find(".k-dialog-actions > .k-button:first").is(".k-button-solid-primary"));
    });

    it("visible:true option is inferred from content element", function() {
        let div = $("<div class='dialog'>foo</div>").appendTo(Mocha.fixture),
            clientObject;

        div.kendoDialog();

        clientObject = div.data("kendoDialog");

        assert.isOk(clientObject.wrapper.is(":visible"));
        assert.isOk(div.is(":visible"));
        assert.isOk(clientObject.options.visible);
    });

    it("visible:false option is inferred from content element", function() {
        let div = $("<div style='display: none' class='dialog'>foo</div>").appendTo(Mocha.fixture),
            clientObject;

        div.kendoDialog();

        clientObject = div.data("kendoDialog");

        assert.isOk(clientObject.wrapper.is(":hidden"));
        assert.isOk(!clientObject.options.visible);
    });

    it("width is constrained by minWidth", function() {
        let dialog = createDialog({ minWidth: 100, width: 90 });
        assert.equal(dialog.wrapper.outerWidth(), 100);
    });

    it("width is constrained by maxWidth", function() {
        let dialog = createDialog({ maxWidth: 100, width: 190 });
        assert.equal(dialog.wrapper.outerWidth(), 100);
    });

    it("height is constrained by minHeight", function() {
        let dialog = createDialog({ minHeight: 100, height: 90 });
        assert.equal(dialog.wrapper.outerHeight(), 100);
    });

    it("height is constrained by maxHeight", function() {
        let dialog = createDialog({ maxHeight: 150, height: 190 });
        assert.equal(dialog.wrapper.outerHeight(), 150);
    });

    it("height is constrained by maxHeight when content is larger", function() {
        let dialog = createHighDialog({ maxHeight: 150 }, null, 200);
        assert.isOk(dialog.wrapper.outerHeight() <= 150);
    });

    it("creating dialog with string width", function() {
        let dialog = createDialog({ width: "190px" });
        assert.equal(dialog.wrapper.outerWidth(), 190);
    });

    it("creating dialog with string height", function() {
        let dialog = createDialog({ height: "190px" });
        assert.equal(dialog.wrapper.outerHeight(), 190);
    });

    it("set zero content height by creating dialog with string insufficient height", function() {
        let dialog = createDialog({ height: "10px", buttonLayout: "normal" });

        assert.equal(dialog.element.height(), 0);
    });

    it("apply scroll class name to dialog content", function() {
        let dialog = createDialog({ height: "100px", content: "<h2>Content</h2>" });

        assert.isOk(dialog.element.hasClass("k-scroll"));
    });

    it("do not apply scroll class name to dialog content", function() {
        let dialog = createDialog({ height: "100px" });

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

        assert.isNotOk($(".k-overlay").is(":visible"));
    });

    it("construction of modal dialog with visible false does not destroy other dialog overlay", function() {
        createDialog({ modal: true });
        let div = $("<div class='dialog'>foo</div>").appendTo(Mocha.fixture);
        div.kendoDialog({ modal: false });

        assert.equal($(".k-overlay").length, 1);
        assert.isOk($(".k-overlay").is(":visible"));
    });

    it("tabindex is set when missing", function() {
        let dialog = createDialog();

        assert.equal(dialog.element.attr("tabindex"), 0);
    });

    it("predefine tabindex is applied on other elements", function() {
        let div = $("<div class='dialog' tabindex='10'>foo</div>").appendTo(Mocha.fixture);
        let dialog = div.kendoDialog({
            closable: true,
            actions: [{ text: () => "ok" }]
        }).getKendoDialog();

        assert.equal(dialog.element.attr("tabindex"), 10);
        assert.equal(dialog.wrapper.find(".k-window-titlebar-actions .k-button").attr("tabindex"), 10);
        assert.equal(dialog.wrapper.find(".k-button").attr("tabindex"), 10);
    });

    it("dialog aria-labelledby points to the titlebar", function() {
        let dialog = createDialog({ visible: true });
        let wrapper = dialog.wrapper;

        assert.equal(wrapper.attr("aria-labelledby"), wrapper.find(".k-window-titlebar").attr("id"));
    });

    it("buttonLayout stretched", function() {
        let dialog = createDialog({
            buttonLayout: "stretched",
            actions: [{ text: () => "a1" }, { text: () => "a2" }]
        });
        let actionbar = dialog.wrapper.find(".k-dialog-actions");

        assert.isOk(actionbar.hasClass("k-actions-stretched"));
        assert.equal(actionbar.find(".k-button").eq(0).width, actionbar.find(".k-button").eq(1).width);
    });

    it("buttonLayout normal", function() {
        let dialog = createDialog({
            buttonLayout: "normal",
            actions: [{ text: () => "a1" }, { text: () => "a2" }]
        });
        let actionbar = dialog.wrapper.find(".k-dialog-actions");

        assert.isOk(actionbar.hasClass("k-actions-end"));
        assert.equal(actionbar.find(".k-button").get(0).style.width, "");
    });

    it("creating dialog with size sets the class", function() {
        let dialog = createDialog({
            minHeight: 200,
            size: "small"
        });

        assert.isOk(dialog.wrapper.hasClass("k-window-sm"));
    });

    it("creating dialog with preventScroll stop the document scrolling", function() {
        let dialog = createDialog({
            minHeight: 200,
            visible: true,
            modal: {
                preventScroll: true
            }
        });

        assert.equal("hidden", $("body").css("overflow"));
    });

    it("closing dialog with preventScroll stop the document scrolling", function() {
        let dialog = createDialog({
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
        let dialog = createDialog({
            buttonLayout: "",
            actions: [{ text: () => "a1" }, { text: () => "a2" }]
        });
        let actionbar = dialog.wrapper.find(".k-dialog-actions");

        assert.isOk(actionbar.hasClass("k-actions-end"));
        assert.equal(actionbar.find(".k-button").get(0).style.width, "");
    });

    it("rtl on the wrapper element", function() {
        let node = $("<div class='dialog k-rtl'>foo</div>").appendTo(Mocha.fixture);
        let dialog = createDialog({ visible: true }, node);

        assert.isOk(dialog.wrapper.hasClass("k-rtl"));
    });
});

describe("accessible modality", function() {
    beforeEach($.noop);
    afterEach(function() {
        moduleOptions.afterEach();
        $("#before,#after").remove();
    });

    it("focuses visible modal dialog on init", function() {
        let dialogNode = $("<div class='dialog'></div>").appendTo(Mocha.fixture);
        mockFunc(kendo.ui.Dialog.fn, "_focus", function(node) {
            assert.equal(node, dialogNode[0]);
        });
        let dialog = createDialog({ modal: true, visible: true }, dialogNode);
    });

    it("invisible window should not track for resize", function() {
        let dialog = createDialog({ visible: false });
        assert.isOk(!dialog._trackResize);
    });

});
