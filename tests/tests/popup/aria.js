import '@progress/kendo-ui/src/kendo.popup.js';

let Popup = kendo.ui.Popup, div, anchor, popup;

describe("kendo.ui.Popup accessibility with AXE", function() {
    beforeEach(function() {

        div = $("<div style='background:red'>popup</div>");
        anchor = $("<div style='background:blue;position:absolute;left:100px;top:100px;'>anchor</div>").appendTo(Mocha.fixture);
        Mocha.fixture.attr("role", "main");
    });
    afterEach(function() {
        if (popup) {
            popup.destroy();
        }
        div.add(anchor).remove();
    });

    it("Popup is accessible", async function() {
        popup = new Popup(div, { anchor: anchor });
        popup.open();

        await axeRun(div.closest(".k-animation-container").parent());
    });
});
