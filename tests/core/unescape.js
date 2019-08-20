(function() {
    describe("kendo.unescape()", function() {

        it("unescape UTF-8 hex encoded characters", function() {
            assert.equal(kendo.unescape("%C4%87"), "ć");
            assert.equal(kendo.unescape("%E1%88%BF"), "ሿ");
            assert.equal(kendo.unescape("%E3%A7%B5"), "㧵");
            assert.equal(kendo.unescape("%E1%BB%A5"), "ụ");
        });

        it("unescape Unicode two digit hex encoded characters", function() {
            assert.equal(kendo.unescape("%97"), "");
            assert.equal(kendo.unescape("%3f"), "?");
            assert.equal(kendo.unescape("%D5"), "Õ");
            assert.equal(kendo.unescape("%e5"), "å");
        });

        it("unescape Unicode four digit hex encoded characters with lower case", function() {
            assert.equal(kendo.unescape("%u0107"), "ć");
            assert.equal(kendo.unescape("%u123f"), "ሿ");
            assert.equal(kendo.unescape("%u39f5"), "㧵");
            assert.equal(kendo.unescape("%u1ee5"), "ụ");
        });

        it("unescape Unicode four digit hex encoded characters with upper case", function() {
            assert.equal(kendo.unescape("%U0107"), "ć");
            assert.equal(kendo.unescape("%U123F"), "ሿ");
            assert.equal(kendo.unescape("%U39F5"), "㧵");
            assert.equal(kendo.unescape("%U1EE5"), "ụ");
        });
    });
}());
