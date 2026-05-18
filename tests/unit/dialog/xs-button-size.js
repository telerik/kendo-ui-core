import '@progress/kendo-ui/src/kendo.dialog.js';

let dialog;

function createDialog(options, element) {
    element = element || $("<div class='dialog' />").appendTo(Mocha.fixture);
    return element.kendoDialog(options).data("kendoDialog");
}

describe("dialog xs button size", function() {
    afterEach(function() {
        if (dialog) {
            dialog.destroy();
        }
        Mocha.fixture.closest("body").find(".dialog").each(function(idx, element) {
            let d = $(element).data("kendoDialog");
            if (d) {
                d.destroy();
            }
        });
        Mocha.fixture.closest("body").find(".k-overlay").remove();
    });

    it("close button has k-button-xs class", function() {
        dialog = createDialog({ title: "Test" });
        let closeButton = dialog.wrapper.find(".k-dialog-titlebar-action");

        assert.isTrue(closeButton.hasClass("k-button-xs"));
    });

    it("close button has k-button-xs class when titleless", function() {
        dialog = createDialog({ title: false });
        let closeButton = dialog.wrapper.find(".k-dialog-titlebar-action");

        assert.isTrue(closeButton.hasClass("k-button-xs"));
    });

    it("close button is rendered via renderButton with xsmall size", function() {
        dialog = createDialog({ title: "Test" });
        let closeButton = dialog.wrapper.find(".k-dialog-titlebar-action");

        assert.isTrue(closeButton.hasClass("k-button"));
        assert.isTrue(closeButton.hasClass("k-button-xs"));
        assert.isTrue(closeButton.hasClass("k-button-flat"));
        assert.isTrue(closeButton.hasClass("k-icon-button"));
    });
});
