import '@progress/kendo-ui/src/kendo.core.js';

describe("matchesMedia", function() {

    it("bootstrap media is converted to browser media", function() {
        assert.equal(kendo._bootstrapToMedia("xs"), "(max-width: 576px)");
        assert.equal(kendo._bootstrapToMedia("sm"), "(min-width: 576px)");
        assert.equal(kendo._bootstrapToMedia("md"), "(min-width: 768px)");
        assert.equal(kendo._bootstrapToMedia("lg"), "(min-width: 992px)");
        assert.equal(kendo._bootstrapToMedia("xl"), "(min-width: 1200px)");
    });
});
