(function() {

    describe("html encode", function() {

        it("replace < with &lt;", function() {
            assert.equal(kendo.htmlEncode("<<"), "&lt;&lt;");
        });

        it("replace > with &gt;", function() {
            assert.equal(kendo.htmlEncode(">>"), "&gt;&gt;");
        });

        it("replace & with &amp;", function() {
            assert.equal(kendo.htmlEncode("&&"), "&amp;&amp;");
        });

        it('replace " with &quot;', function() {
            assert.equal(kendo.htmlEncode('""'), "&quot;&quot;");
        });

        it("replace ' with &#39;", function() {
            assert.equal(kendo.htmlEncode("''"), "&#39;&#39;");
        });
    });
}());
