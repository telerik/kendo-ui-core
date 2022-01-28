(function() {
    var Popup = kendo.ui.Popup, div, anchor, popup;

    describe("kendo.ui.Popup accessibility with AXE", function() {
        beforeEach(function() {

            div = $("<div style='background:red'>popup</div>");
            anchor = $("<div style='background:blue;position:absolute;left:100px;top:100px;'>anchor</div>").appendTo($("#qunit-fixture"));
        });
        afterEach(function() {
            if (popup) {
                popup.destroy();
            }
            div.add(anchor).remove();
        });

        it("Popup is accessible", function(done) {
            popup = new Popup(div, { anchor: anchor });
            popup.open();

            axeRun(div.parent(), done);
        });
    });
}());
