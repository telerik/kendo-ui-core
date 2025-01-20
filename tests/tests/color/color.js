import '@progress/kendo-ui/src/kendo.color.js';

let Color = kendo.Color;

// ------------------------------------------------------------
describe("Color", function() {

    it("fromHSL", function() {
        let color = Color.fromHSL(200, 0.5, 1, 0);
        assert.equal(color.h, 200);
        assert.equal(color.s, 0.5);
        assert.equal(color.l, 1);
        assert.equal(color.a, 0);
    });

    it("HSL to RGB", function() {
        let color = Color.fromHSL(228, 83, 61, 0);
        assert.equal(color.toRGB().toCss(), "#496aee");
    });

    it("RGB to HSL", function() {
        let color = kendo.parseColor("#496aee").toHSL();
        close(color.h, 228, 0.1);
        close(color.s, 83, 0.1);
        close(color.l, 61, 0.1);
        assert.equal(color.a, 1);
    });

    it("RGB to HSL achromatic", function() {
        let color = kendo.parseColor("#fff").toHSL().toCss();
        assert.equal(color, "#ffffff");
    });

    it("darken HSL", function() {
        let color = kendo.parseColor("#496aee").toHSL();
        color.l = 30;

        assert.equal(color.toCss(), "#0d268c");
    });

    it("lighten HSL", function() {
        let color = kendo.parseColor("#496aee").toHSL();
        color.l = 90;

        assert.equal(color.toCss(), "#d0d9fb");
    });
});
