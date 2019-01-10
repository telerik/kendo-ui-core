(function() {

    describe("kendo attr", function() {
        afterEach(function() {
            kendo.ns = "";
        });

        it("default ns is empty", function() {
            assert.equal(kendo.ns, "");
        });

        it("attr returns a data attribute", function() {
            kendo.ns = "kendo-";
            assert.equal(kendo.attr("role"), "data-kendo-role");
        });

        it("attr handles empty ns", function() {
            kendo.ns = "";
            assert.equal(kendo.attr("role"), "data-role");
        });

    });
}());
