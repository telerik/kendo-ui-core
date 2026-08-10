import '@progress/kendo-ui/src/kendo.dialog.js';
import { removeMocksIn } from '../../helpers/unit/mock-utils.js';

    function createDialog(options, element) {
        element = element || $("<div class='dialog' />").appendTo(Mocha.fixture);
        return element.kendoDialog(options).data("kendoDialog");
    }

    describe("Dialog WAI-ARIA with AXE", function() {
        afterEach(function() {
            Mocha.fixture.closest("body").find(".dialog").each(function(idx, element) {
                removeMocksIn(kendo.ui.Dialog.fn);
                let dialog = $(element).data("kendoDialog");
                dialog.destroy();
            });
            Mocha.fixture.closest("body").find(".k-overlay").remove();
        });

        it("Dialog has appropriate role", function() {
            let dialog = createDialog(
                { title: "Test" }
            );

            assert.equal(dialog.element.parent().attr("role"), "dialog");
        });

        it("Dialog has aria-describedby pointing to content id", function() {
            let dialog = createDialog({ title: "Test" });

            assert.equal(dialog.element.parent().attr("aria-describedby"), dialog.element.attr("id"));
        });

        it("Dialog sets content id when missing and references it with aria-describedby", function() {
            let dialog = createDialog({ title: "Test" }, $("<div class='dialog' />").appendTo(Mocha.fixture));

            assert.isOk(dialog.element.attr("id"));
            assert.equal(dialog.element.parent().attr("aria-describedby"), dialog.element.attr("id"));
        });

        it("Modal Dialog has aria-modal true", function() {
            let dialog = createDialog({ title: "Test", modal: true });

            assert.equal(dialog.element.parent().attr("aria-modal"), "true");
        });

        it("Non-modal Dialog does not have aria-modal", function() {
            let dialog = createDialog({ title: "Test", modal: false });

            assert.isUndefined(dialog.element.parent().attr("aria-modal"));
        });

        it("Dialog is accessible", async function() {
            let dialog = createDialog(
                { title: "Test" }
            );

            await axeRun(dialog.element.parent());
        });

        it("Dialog with all tools is accessible", async function() {
            let dialog = createDialog(
                {
                    title: "Test",
                    actions: [ {
                        text: () => "OK",
                        primary: true
                    }, {
                        text: () => "Cancel",
                        primary: false
                    } ]
                }
            );

            await axeRun(dialog.element.parent());
        });

        it("modal Dialog is accessible", async function() {
            let dialog = createDialog(
                {
                    title: "Test",
                    modal: true
                }
            );

            await axeRun(dialog.element.parent());
        });
    });
