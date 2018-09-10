(function() {
    module("matchesMedia");

    test("bootstrap media is converted to browser media", function() {
        equal(kendo._bootstrapToMedia("xs"), "(max-width: 576px)");
        equal(kendo._bootstrapToMedia("sm"), "(min-width: 576px)");
        equal(kendo._bootstrapToMedia("md"), "(min-width: 768px)");
        equal(kendo._bootstrapToMedia("lg"), "(min-width: 992px)");
        equal(kendo._bootstrapToMedia("xl"), "(min-width: 1200px)");
    });

    test("matchesMedia calls bootstrapToMedia", function() {
        var mediaStub = stub(kendo, "_bootstrapToMedia");

        kendo.matchesMedia("xs");

        equal(mediaStub.calls("_bootstrapToMedia"), 1);
        equal(mediaStub.args("_bootstrapToMedia")[0], "xs");
    });

}());

