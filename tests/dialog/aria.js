(function() {
    function createDialog(options, element) {
        element = element || $("<div class='dialog' />").appendTo(Mocha.fixture);
        return element.kendoDialog(options).data("kendoDialog");
    }

    describe("Dialog WAI-ARIA with AXE", function () {
        afterEach(function() {
            Mocha.fixture.closest("body").find(".dialog").each(function(idx, element) {
                removeMocksIn(kendo.ui.Dialog.fn);
                var dialog = $(element).data("kendoDialog");
                dialog.destroy();
            });
            Mocha.fixture.closest("body").find(".k-overlay").remove();
        });

        it("Dialog has appropriate role", function() {
            var dialog = createDialog(
                { title: "Test" }
            );

            assert.equal(dialog.element.parent().attr("role"), "dialog");
        });

        it("Dialog is accessible", function(done) {
            var dialog = createDialog(
                { title: "Test" }
            );

            axeRun(dialog.element.parent(), done);
        });

        it("Dialog with all tools is accessible", function(done) {
            var dialog = createDialog(
                {
                    title: "Test",
                    actions: [ {
                        text: "OK",
                        primary: true
                    }, {
                        text: "Cancel",
                        primary: false
                    } ]
                }
            );

            axeRun(dialog.element.parent(), done);
        });

        it("modal Dialog is accessible", function(done) {
            var dialog = createDialog(
                {
                    title: "Test",
                    modal: true
                }
            );

            axeRun(dialog.element.parent(), done);
        });
    });
}());