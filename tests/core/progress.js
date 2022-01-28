(function() {
    describe("kendo.ui.progress", function() {
        it("has proper role", function() {
            var div = $("<div>");

            Mocha.fixture.append(div);

            kendo.ui.progress(div, true);

            assert.equal($(".k-loading-text").attr("role"), "alert");
        });

        it("has aria-live='polite'", function() {
            var div = $("<div>");

            Mocha.fixture.append(div);

            kendo.ui.progress(div, true);

            assert.equal($(".k-loading-text").attr("aria-live"), "polite");
        });
    });
}());