(function() {

    var template = kendo.Template;

    describe("Template", function() {
        beforeEach(function() {
            Mocha.fixture.append(
                '<script id="encoded" type="text/x-kendo-template">' +
                '    <strong>${foo}</strong>' +
                '</script>' +
                '<script id="raw" type="text/x-kendo-template">' +
                '    <strong>#= foo #</strong>' +
                '</script>' +
                '<script id="code" type="text/x-kendo-template">' +
                '    # var foo = "foo"; ##= foo #' +
                '</script>' +
                '<script type="text/x-kendo-template" id="multiline-expression">' +
                '  # var a = "a",' +
                '    b = "b" #' +
                '  #= a + b #' +
                '</script>');
        });
        afterEach(function() {
            template.paramName = "data";
            template.useWithBlock = true;
        });

        it("template evaluates value expressions", function() {
            var t = template.compile("#= foo.bar #");
            assert.equal(t({ foo: { bar: "baz" } }), "baz");
        });

        it("function template returns the same function", function() {
            var t = $.noop;

            assert.isOk(template.compile(t) === t);
        });

        it("default paramName is 'data'", function() {
            var t = template.compile("#= data.foo #");
            assert.equal(t({ foo: "bar" }), "bar");
        });

        it("template evaluates value expressions using with", function() {
            var t = template.compile("#= foo #");
            assert.equal(t({ foo: "bar" }), "bar");
        });

        it("template ignores escaped sharp symbols", function() {
            var t = template.compile('<a href="\\#">#= "foo"#</a>');
            assert.equal(t({}), '<a href="#">foo</a>');
        });

        it("template evaluates value expressions in single quotes", function() {
            var t = template.compile("'#= foo #'");
            assert.equal(t({ foo: "bar" }), "'bar'");
        });

        it("template with custom paramName", function() {
            template.paramName = "foo";

            var t = template.compile("#= foo.bar #");

            assert.equal(t({ bar: "baz" }), "baz");
        });

        it("disabling with block generation", function() {
            template.useWithBlock = false;

            var t = template.compile("#= foo #");

            assert.isOk(!/with/.test(t));
        });

        it("with block generation", function() {
            var t = template.compile("#= foo #");

            assert.isOk(/with/.test(t));
        });

        it("can specify custom settings", function() {
            var t = template.compile("#= foo.bar #", { paramName: "foo" });

            assert.equal(t({ bar: "baz" }), "baz");
        });

        it("allows for member usage as a context", function() {
            var t = template.compile("#= bar #", { paramName: "data.foo" });
            assert.equal(t({ foo: { bar: "baz" } }), "baz");
        });

        it("allows for array accessor as a context", function() {
            var t = template.compile("#= bar #", { paramName: "data['foo']" });
            assert.equal(t({ foo: { bar: "baz" } }), "baz");
        });

        it("can execute code", function() {
            var executed = false,
                t = template.compile("# var result='foo'; ##= result#");

            assert.equal(t({}), "foo");
        });

        it("using ${} escapes html entities", function() {
            var t = template.compile("${foo}");
            assert.equal(t({ foo: "<" }), "&lt;");
        });

        it("using #: escapes html entities", function() {
            var t = template.compile("#:foo#");
            assert.equal(t({ foo: "<" }), "&lt;");
        });

        it("using ${} and non-string arguments", function() {
            var t = template.compile("${foo}");
            assert.equal(t({ foo: 1 }), "1");
        });

        it("using #: and non-string arguments", function() {
            var t = template.compile("#:foo#");
            assert.equal(t({ foo: 1 }), "1");
        });

        it("allows nesting escaped } in {}", function() {
            var t = template.compile("${'{\\}'}");
            assert.equal(t({}), "{}");
        });

        it("template defined in a script block", function() {
            var t = template.compile($("#encoded").text());
            assert.equal(t({ foo: 1 }).trim(), "<strong>1</strong>");
        });

        it("template preserves whitespace as is", function() {
            var t = template.compile("<p>\n\t<strong>${foo}</strong>\n</p>");
            assert.equal(t({ foo: 1 }).trim(), "<p>\n\t<strong>1</strong>\n</p>");
        });

        it("template with raw expression defined in a script block", function() {
            var t = template.compile($("#raw").text());
            assert.equal(t({ foo: 1 }).trim(), "<strong>1</strong>");
        });

        it("can execute code in template defined inside a script block", function() {
            var t = template.compile($("#code").text());
            assert.equal(t({}).trim(), "foo");
        });

        it("template executes multiline expression", function() {
            var t = template.compile($("#multiline-expression").text());
            assert.equal(t({}).trim(), "ab");
        });

        it("template throws error on invalid template", function() {
            assert.throws(function() { template.compile('<a href="#">link</a>') }, /Invalid template/, "Template does not raise proper error");
        });

        it("slot count is 0 for template without expressions", function() {
            var t = template.compile("foo");
            assert.equal(t._slotCount, 0);
        });

        it("slot count includes #= # expressions", function() {
            var t = template.compile("foo #= bar #");
            assert.equal(t._slotCount, 1);
        });

        it("slot count includes multiple expressions", function() {
            var t = template.compile("foo #= bar # baz #= zaz #");
            assert.equal(t._slotCount, 2);
        });

        it("slot count includes #: # expressions", function() {
            var t = template.compile("foo #: bar #");
            assert.equal(t._slotCount, 1);
        });

        it("slot count includes ${} expressions", function() {
            var t = template.compile("foo ${ bar }");
            assert.equal(t._slotCount, 1);
        });

    });
}());
