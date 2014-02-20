(function() {
    test("replace < with &lt;", function() {
        equal(kendo.htmlEncode("<<"), "&lt;&lt;");
    });

    test("replace > with &gt;", function() {
        equal(kendo.htmlEncode(">>"), "&gt;&gt;");
    });

    test("replace & with &amp;", function() {
        equal(kendo.htmlEncode("&&"), "&amp;&amp;");
    });

    test('replace " with &quot;', function() {
        equal(kendo.htmlEncode('""'), "&quot;&quot;");
    });

    test("replace ' with &#39;", function() {
        equal(kendo.htmlEncode("''"), "&#39;&#39;");
    });
}());
