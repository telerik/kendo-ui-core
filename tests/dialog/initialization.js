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

        ok(wrapper.is(".k-widget.k-dialog.k-window"));
        ok(wrapper.children().eq(0).is(".k-window-titlebar"));
        ok(wrapper.children().eq(2).is(".k-dialog-buttongroup"));
    });
})();
