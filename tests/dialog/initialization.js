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

    function createDialog(options, element) {
        element = element || $("<div class='dialog' />").appendTo(QUnit.fixture);
        return element.kendoDialog(options).data("kendoDialog");
    }

    test("creates default html structure", function() {
        var dialog = createDialog();
        var wrapper = dialog.wrapper;
        var wrapperChildren = wrapper.children();

        ok(wrapper.is(".k-widget.k-dialog.k-window"));
        ok(wrapperChildren.eq(0).is(".k-i-close"));
        ok(wrapperChildren.eq(1).is(".k-window-titlebar"));
        ok(wrapperChildren.eq(2).is(".k-content"));
        equal(wrapper.find(".k-dialog-buttongroup").length, 0);
    });


    test("hide close button", function() {
        var dialog = createDialog({
            closable: false
        });
        var wrapper = dialog.wrapper;
        var wrapperChildren = wrapper.children();
        notOk(wrapperChildren.eq(0).is(".k-i-close"));
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
})();
