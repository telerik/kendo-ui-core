(function() {
    describe("matchesMedia", function () {

    it("bootstrap media is converted to browser media", function() {
        assert.equal(kendo._bootstrapToMedia("xs"), "(max-width: 576px)");
        assert.equal(kendo._bootstrapToMedia("sm"), "(min-width: 576px)");
        assert.equal(kendo._bootstrapToMedia("md"), "(min-width: 768px)");
        assert.equal(kendo._bootstrapToMedia("lg"), "(min-width: 992px)");
        assert.equal(kendo._bootstrapToMedia("xl"), "(min-width: 1200px)");
    });

    it("matchesMedia calls bootstrapToMedia", function() {
        var mediaStub = stub(kendo, "_bootstrapToMedia");

        kendo.matchesMedia("xs");

        assert.equal(mediaStub.calls("_bootstrapToMedia"), 1);
        assert.equal(mediaStub.args("_bootstrapToMedia")[0], "xs");
    });

    });
}());

