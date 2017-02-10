(function() {
    var dialog;
    var moduleOptions = {
        beforeEach: function() {
            //
        },
        afterEach: function() {
            QUnit.fixture.closest("body").find(".dialog").each(function(idx, element) {
                removeMocksIn(kendo.ui.Dialog.fn);
                var dialog = $(element).data("kendoDialog");
                dialog.destroy();
            });
            QUnit.fixture.closest("body").find(".k-overlay").remove();
        }
    };

    module("initialization", $.extend({}, moduleOptions));

    function createDialog(options, element) {
        element = element || $("<div class='dialog' />").appendTo(QUnit.fixture);
        return element.kendoDialog(options).data("kendoDialog");
    }

    function createHighDialog(options, element, innerHeight) {
        element = element || $("<div class='dialog'><div style='height:" + innerHeight + "px'></div></div>").appendTo(QUnit.fixture);
        return element.kendoDialog(options).data("kendoDialog");
    }

    test("creates default html structure", function() {
        var dialog = createDialog();
        var wrapper = dialog.wrapper;
        var wrapperChildren = wrapper.children();

        ok(wrapper.is(".k-widget.k-window.k-dialog"));
        ok(wrapperChildren.eq(0).is(".k-window-titlebar.k-dialog-titlebar"));
        ok(wrapperChildren.eq(0).children().eq(1).is(".k-window-actions.k-dialog-actions"));
        ok(wrapperChildren.eq(0).children().eq(1).children().eq(0).is(".k-window-action.k-dialog-action.k-dialog-close"));
        ok(wrapperChildren.eq(0).children().eq(1).children().eq(0).children().eq(0).is(".k-icon.k-i-close"));
        ok(wrapperChildren.eq(1).is(".k-content.k-window-content.k-dialog-content"));
        equal(wrapper.find(".k-button-group.k-dialog-buttongroup").length, 0);
    });

    test("adds close button to wrapper if titleless", function() {
        var dialog = createDialog({
            title: false
        });
        var wrapper = dialog.wrapper;
        var wrapperChildren = wrapper.children();

        ok(wrapper.is(".k-widget.k-dialog.k-window"));
        ok(wrapperChildren.eq(0).is(".k-dialog-action.k-dialog-close"));
        ok(wrapperChildren.eq(0).children().eq(0).is(".k-icon.k-i-close"));
        ok(wrapperChildren.eq(1).is(".k-content"));
        equal(wrapper.find(".k-dialog-buttongroup").length, 0);
    });

    test("close button messages updates aria-label and title", function() {
        var testMessage = "test_close_button";
        var dialog = createDialog({
            messages:{
                close: testMessage
            }
        });
        var wrapper = dialog.wrapper;

        equal(wrapper.find(".k-dialog-action.k-dialog-close").attr("aria-label"), testMessage);
        equal(wrapper.find(".k-dialog-action.k-dialog-close").attr("title"), testMessage);
    });

    test("hide close button", function() {
        var dialog = createDialog({
            closable: false
        });
        var wrapper = dialog.wrapper;
        var wrapperChildren = wrapper.children();
        ok(!wrapperChildren.eq(0).is(".k-i-close"));
    });

    test("title=false does not render title and adds css class", function() {
        var dialog = createDialog({
            title: false
        });

        equal(dialog.wrapper.find(".k-dialog-titlebar").length, 0);
        ok(dialog.wrapper.is(".k-dialog-titleless"));
    });

    test("set title text from options", function() {
        var dialog = createDialog({
            title: "title text"
        });

        equal(dialog.wrapper.find(".k-dialog-title").html(), "title text");
    });

    test("set content html from options", function() {
        var dialog = createDialog({
            content: "content text"
        });

        equal(dialog.wrapper.find(".k-content").html(), "content text");
    });

    test("setting actions in options adds buttongroup container", function() {
        var dialog = createDialog({
            actions: [{ text: "OK" }]
        });

        equal(dialog.wrapper.find(".k-dialog-buttongroup").length, 1);
    });

    test("setting an acition in options adds a button", function() {
        var dialog = createDialog({
            actions: [{ text: "OK" }]
        });

        equal(dialog.wrapper.find(".k-dialog-buttongroup > .k-button").length, 1);
    });

    test("setting an primary acition in options adds a primary button", function() {
        var dialog = createDialog({
            actions: [{
                text: "OK",
                primary: true
            },{
                text: "Cancel"
            }]
        });
        var wrapper = dialog.wrapper;

        equal(wrapper.find(".k-dialog-buttongroup > .k-button").length, 2);
        ok(wrapper.find(".k-dialog-buttongroup > .k-button:first").is(".k-primary"));
    });

    test("visible:true option is inferred from content element", function() {
        var div = $("<div class='dialog'>foo</div>").appendTo(QUnit.fixture),
            clientObject;

        div.kendoDialog();

        clientObject = div.data("kendoDialog");

        ok(clientObject.wrapper.is(":visible"));
        ok(div.is(":visible"));
        ok(clientObject.options.visible);
    });

    test("visible:false option is inferred from content element", function() {
        var div = $("<div style='display: none' class='dialog'>foo</div>").appendTo(QUnit.fixture),
            clientObject;

        div.kendoDialog();

        clientObject = div.data("kendoDialog");

        ok(clientObject.wrapper.is(":hidden"));
        ok(!clientObject.options.visible);
    });

    test("width is constrained by minWidth", function() {
        var dialog = createDialog({ minWidth: 100, width: 90 });
        equal(dialog.wrapper.width(), 100);
    });

    test("width is constrained by maxWidth", function() {
        var dialog = createDialog({ maxWidth: 100, width: 190 });
        equal(dialog.wrapper.width(), 100);
    });

    test("height is constrained by minHeight", function() {
        var dialog = createDialog({ minHeight: 100, height: 90 });
        equal(dialog.wrapper.height(), 100);
    });

    test("height is constrained by maxHeight", function() {
        var dialog = createDialog({ maxHeight: 150, height: 190 });
        equal(dialog.wrapper.height(), 150);
    });

    test("height is constrained by maxHeight when content is larger", function() {
        var dialog = createHighDialog({ maxHeight: 150 }, null, 200);
        ok(dialog.wrapper.height() <= 150);
    });

    test("creating dialog with string width", function() {
        var dialog = createDialog({ width: "190px" });
        equal(dialog.wrapper.width(), 190);
    });

    test("creating dialog with string height", function() {
        var dialog = createDialog({ height: "190px" });
        equal(dialog.wrapper.height(), 190);
    });

    test("construction of modal dialog shows overlay", function() {
        createDialog({
            modal: true
        });

        ok($(".k-overlay").is(":visible"));
    });

    test("construction of modal dialog with visible false does not shows overlay", function() {
        createDialog({
            visible: false,
            modal: true
        });

            equal($(".k-overlay").length, 0);
    });

    test("construction of modal dialog with visible false does not destroy other dialog overlay", function() {
        createDialog({ modal: true });
        var div = $("<div class='dialog'>foo</div>").appendTo(QUnit.fixture);
        div.kendoDialog({ modal: false });

        equal($(".k-overlay").length, 1);
        ok($(".k-overlay").is(":visible"));
    });

    test("tabindex is set when missing", function() {
        var dialog = createDialog();

        equal(dialog.element.attr("tabindex"), 0);
    });

    test("predefine tabindex is applied on other elements", function() {
        var div = $("<div class='dialog' tabindex='10'>foo</div>").appendTo(QUnit.fixture);
        var dialog = div.kendoDialog({
            closable: true,
            actions: [{text: "ok"}]
        }).getKendoDialog();

        equal(dialog.element.attr("tabindex"), 10);
        equal(dialog.wrapper.find(".k-dialog-close").attr("tabindex"), 10);
        equal(dialog.wrapper.find(".k-button").attr("tabindex"), 10);
    });

    test("dialog aria-labelledby points to the titlebar", function() {
        var dialog = createDialog({visible: true});
        var wrapper = dialog.wrapper;

        equal(wrapper.attr("aria-labelledby"), wrapper.find(".k-window-titlebar").attr("id"));
    });

    test("buttonLayout stretched", function() {
        var dialog = createDialog({ buttonLayout: "stretched",
            actions: [{ text: "a1" }, { text: "a2" }]});
        var actionbar = dialog.wrapper.find(".k-dialog-buttongroup");

        ok(actionbar.hasClass("k-dialog-button-layout-stretched"));
        equal(actionbar.find(".k-button").get(0).style.width, "50%");
    });

    test("buttonLayout normal", function() {
        var dialog = createDialog({ buttonLayout: "normal",
            actions: [{ text: "a1" }, { text: "a2" }]});
        var actionbar = dialog.wrapper.find(".k-dialog-buttongroup");

        ok(actionbar.hasClass("k-dialog-button-layout-normal"));
        equal(actionbar.find(".k-button").get(0).style.width, "");
    });

    test("buttonLayout is empty string resorts to normal", function() {
        var dialog = createDialog({ buttonLayout: "",
            actions: [{ text: "a1" }, { text: "a2" }]});
        var actionbar = dialog.wrapper.find(".k-dialog-buttongroup");

        ok(actionbar.hasClass("k-dialog-button-layout-normal"));
        equal(actionbar.find(".k-button").get(0).style.width, "");
    });

    test("rtl on the wrapper element", function() {
        var node = $("<div class='dialog k-rtl'>foo</div>").appendTo(QUnit.fixture);
        var dialog = createDialog({ visible: true }, node);

        ok(dialog.wrapper.hasClass("k-rtl"));
    });

    module("accessible modality", {
        beforeEach: $.noop,
        afterEach: function() {
            moduleOptions.afterEach();
            $("#before,#after").remove();
        }
    });

    test("adds aria-hidden", function () {
        var node = $("<div class='dialog'>foo</div>").appendTo(QUnit.fixture);
        QUnit.fixture.before("<div id='before'>before</div>");
        QUnit.fixture.after("<div id='after'>after</div>");

        dialog = createDialog({ modal: true, visible: true }, node);

        equal($("#before").attr("aria-hidden"), "true");
        equal($("#after").attr("aria-hidden"), "true");
    });

    test("aria-hidden is removed on close", function () {
        var node = $("<div class='dialog'>foo</div>").appendTo(QUnit.fixture);
        QUnit.fixture.before("<div id='before'>before</div>");
        QUnit.fixture.after("<div id='after'>after</div>");

        dialog = createDialog({ modal: true, visible: true }, node);
        dialog.close();

        equal($("#before").attr("aria-hidden"), null);
        equal($("#after").attr("aria-hidden"), null);
    });

    test("restores initial aria-hidden value on close", function () {
        var node = $("<div class='dialog'>foo</div>").appendTo(QUnit.fixture);
        QUnit.fixture.before("<div id='before' aria-hidden='true'>before</div>");
        QUnit.fixture.after("<div id='after'>after</div>");

        dialog = createDialog({ modal: true, visible: true }, node);
        dialog.close();

        equal($("#before").attr("aria-hidden"), "true");
        equal($("#after").attr("aria-hidden"), null);
    });

    test("focuses visible modal dialog on init", function() {
        var dialogNode = $("<div class='dialog'></div>").appendTo(QUnit.fixture);
        mockFunc(kendo.ui.Dialog.fn, "_focus", function(node) {
            equal(node, dialogNode[0]);
        });
        var dialog = createDialog({ modal: true, visible: true }, dialogNode);
    });

    test("invisible window should not track for resize", function() {
        var dialog = createDialog({ visible: false });
        ok(!dialog._trackResize);
    });

})();
