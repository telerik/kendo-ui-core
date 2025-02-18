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
