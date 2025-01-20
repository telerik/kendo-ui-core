import '@progress/kendo-ui/src/kendo.core.js';

describe("kendo.ui.progress", function() {
    it("has proper role", function() {
        let div = $("<div>");

        Mocha.fixture.append(div);

        kendo.ui.progress(div, true);

        assert.equal($(".k-loading-text").attr("role"), "alert");
    });

    it("has aria-live='polite'", function() {
        let div = $("<div>");

        Mocha.fixture.append(div);

        kendo.ui.progress(div, true);

        assert.equal($(".k-loading-text").attr("aria-live"), "polite");
    });
});
