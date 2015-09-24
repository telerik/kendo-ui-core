(function(){

var template = kendo.Template;

module("Template", {
    setup: function() {
        QUnit.fixture.append(
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
    },
    teardown: function() {
        template.paramName = "data";
        template.useWithBlock = true;
    }
});

test("template evaluates value expressions", function() {
    var t = template.compile("#= foo.bar #");
    equal(t({ foo: { bar: "baz" } }), "baz");
});

test("function template returns the same function", function() {
    var t = $.noop;

    ok(template.compile(t) === t);
});

test("default paramName is 'data'", function() {
    var t = template.compile("#= data.foo #");
    equal(t({ foo: "bar" }), "bar");
});

test("template evaluates value expressions using with", function() {
    var t = template.compile("#= foo #");
    equal(t({ foo: "bar" }), "bar");
});

test("template ignores escaped sharp symbols", function() {
  var t = template.compile('<a href="\\#">#= "foo"#</a>');
  equal(t({}), '<a href="#">foo</a>');
});

test("template evaluates value expressions in single quotes", function() {
    var t = template.compile("'#= foo #'");
    equal(t({ foo: "bar" }), "'bar'");
});

test("template with custom paramName", function() {
    template.paramName = "foo";

    var t = template.compile("#= foo.bar #");

    equal(t({ bar: "baz" }), "baz");
});

test("disabling with block generation", function() {
    template.useWithBlock = false;

    var t = template.compile("#= foo #");

    ok(!/with/.test(t));
});

test("with block generation", function() {
    var t = template.compile("#= foo #");

    ok(/with/.test(t));
});

test("can specify custom settings", function() {
    var t = template.compile("#= foo.bar #", {paramName: "foo"});

    equal(t({ bar: "baz" }), "baz");
});

test("allows for member usage as a context", function() {
    var t = template.compile("#= bar #", {paramName: "data.foo"});
    equal(t({foo: {bar: "baz"}}), "baz");
});

test("allows for array accessor as a context", function() {
    var t = template.compile("#= bar #", {paramName: "data['foo']"});
    equal(t({foo: {bar: "baz"}}), "baz");
});

test("can execute code", function() {
    var executed = false,
    t = template.compile("# var result='foo'; ##= result#");

    equal(t({}), "foo");
});

test("using ${} escapes html entities", function() {
    var t = template.compile("${foo}");
    equal(t({ foo: "<" }), "&lt;");
});

test("using #: escapes html entities", function() {
    var t = template.compile("#:foo#");
    equal(t({ foo: "<" }), "&lt;");
});

test("using ${} and non-string arguments", function() {
    var t = template.compile("${foo}");
    equal(t({ foo: 1 }), "1");
});

test("using #: and non-string arguments", function() {
    var t = template.compile("#:foo#");
    equal(t({ foo: 1 }), "1");
});

test("allows nesting escaped } in {}", function() {
    var t = template.compile("${'{\\}'}");
    equal(t({}), "{}");
});

test("template defined in a script block", function() {
    var t = template.compile($("#encoded").text());
    equal($.trim(t({ foo: 1 })), "<strong>1</strong>");
});

test("template preserves whitespace as is", function() {
    var t = template.compile("<p>\n\t<strong>${foo}</strong>\n</p>");
    equal($.trim(t({ foo: 1 })), "<p>\n\t<strong>1</strong>\n</p>");
});

test("template with raw expression defined in a script block", function() {
    var t = template.compile($("#raw").text());
    equal($.trim(t({ foo: 1 })), "<strong>1</strong>");
});

test("can execute code in template defined inside a script block", function() {
    var t = template.compile($("#code").text());
    equal($.trim(t({})), "foo");
});

test("template executes multiline expression", function() {
    var t = template.compile($("#multiline-expression").text());
    equal($.trim(t({})), "ab");
});

test("template throws error on invalid template", function() {
    throws(function() { template.compile('<a href="#">link</a>') }, /Invalid template/, "Template does not raise proper error");
});

test("slot count is 0 for template without expressions", function() {
    var t = template.compile("foo");
    equal(t._slotCount, 0);
});

test("slot count includes #= # expressions", function() {
    var t = template.compile("foo #= bar #");
    equal(t._slotCount, 1);
});

test("slot count includes multiple expressions", function() {
    var t = template.compile("foo #= bar # baz #= zaz #");
    equal(t._slotCount, 2);
});

test("slot count includes #: # expressions", function() {
    var t = template.compile("foo #: bar #");
    equal(t._slotCount, 1);
});

test("slot count includes ${} expressions", function() {
    var t = template.compile("foo ${ bar }");
    equal(t._slotCount, 1);
});

}());
