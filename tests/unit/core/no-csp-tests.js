import '@progress/kendo-ui/src/kendo.core.js';
import '@progress/kendo-ui/src/kendo.data.js';

let dom;

let TestWidget = kendo.ui.Widget.extend({
    init: function(element, options) {
        kendo.ui.Widget.fn.init.call(this, element, options);

        this.dataSource = kendo.data.DataSource.create(this.options.dataSource);
    },

    options: {
        name: "TestWidget",
        foo: "",
        template: "",
        altTemplate: "",
        dataMinHeight: "",
        columns: null,
        dataBar: "",
        format: ""
    },

    events: ["click", "click2"]
});

let MobileTestWidget = kendo.mobile.ui.Widget.extend({
    options: {
        name: "TestWidget"
    }
});

let TestWidget2 = kendo.mobile.ui.Widget.extend({
    options: {
        name: "TestWidget2"
    }
});

describe("kendo.init - no CSP", function() {
    beforeEach(function() {
        Mocha.fixture.append(
            '<script id="multiple-widgets-template" type="text/x-kendo-template">' +
            '<div>' +
            '   <div id="foo" data-role="testwidget"></div>' +
            '   <div id="bar" data-role="testwidget2"></div>' +
            '</div>' +
            '</script>' +
            '<script id="template" type="text/x-kendo-template">' +
            '    foo' +
            '</script>');

        kendo.ui.plugin(TestWidget);
        kendo.mobile.ui.plugin(TestWidget2);
        kendo.mobile.ui.plugin(MobileTestWidget);

        window.foo = function() {
            assert.isOk(true);
        };
        window.bar = {
            baz: function() { }
        };

        window.testDataSource = new kendo.data.DataSource();
    });
    afterEach(function() {
        delete window.foo;
        delete window.bar;
        delete window.testDataSource;
        kendo.destroy(dom);
        kendo.ns = "";
    });

    it("parses templates from data attributes", function() {
        dom = $('<div data-role="testwidget" data-template="template" />');

        kendo.init(dom);

        let testwidget = dom.data("kendoTestWidget");

        assert.equal(testwidget.options.template({}), $("#template").html());
    });

    it("parses template options", function() {
        dom = $('<div data-role="testwidget" data-alt-template="template" />');

        kendo.init(dom);

        let testwidget = dom.data("kendoTestWidget");

        assert.equal(testwidget.options.altTemplate({}), $("#template").html());
    });

    it("initializes functions from parameters", function() {
        dom = $('<div data-role="testwidget" data-columns=\'{"foo":foo}\'/>');

        kendo.init(dom);
        let testwidget = dom.data("kendoTestWidget");
        assert.equal(testwidget.options.columns.foo, window.foo);
    });
});

describe("Template", function() {
    let template = kendo.Template;

    beforeEach(function() {
        Mocha.fixture.append(
            '<script id="encoded" type="text/x-kendo-template">' +
            '    <strong>${foo}</strong>' +
            '</script>' +
            '<script id="raw" type="text/x-kendo-template">' +
            '    <strong>#= foo #</strong>' +
            '</script>' +
            '<script id="code" type="text/x-kendo-template">' +
            '    # let foo = "foo"; ##= foo #' +
            '</script>' +
            '<script type="text/x-kendo-template" id="multiline-expression">' +
            '  # let a = "a",' +
            '    b = "b" #' +
            '  #= a + b #' +
            '</script>');
    });
    afterEach(function() {
        template.paramName = "data";
        template.useWithBlock = true;
    });

    it("template evaluates value expressions", function() {
        let t = template.compile("#= foo.bar #");
        assert.equal(t({ foo: { bar: "baz" } }), "baz");
    });

    it("default paramName is 'data'", function() {
        let t = template.compile("#= data.foo #");
        assert.equal(t({ foo: "bar" }), "bar");
    });

    it("template evaluates value expressions using with", function() {
        let t = template.compile("#= foo #");
        assert.equal(t({ foo: "bar" }), "bar");
    });

    it("template ignores escaped sharp symbols", function() {
        let t = template.compile('<a href="\\#">#= "foo"#</a>');
        assert.equal(t({}), '<a href="#">foo</a>');
    });

    it("template evaluates value expressions in single quotes", function() {
        let t = template.compile("'#= foo #'");
        assert.equal(t({ foo: "bar" }), "'bar'");
    });

    it("template with custom paramName", function() {
        template.paramName = "foo";

        let t = template.compile("#= foo.bar #");

        assert.equal(t({ bar: "baz" }), "baz");
    });

    it("disabling with block generation", function() {
        template.useWithBlock = false;

        let t = template.compile("#= foo #");

        assert.isOk(!/with/.test(t));
    });

    it("with block generation", function() {
        let t = template.compile("#= foo #");

        assert.isOk(/with/.test(t));
    });

    it("can specify custom settings", function() {
        let t = template.compile("#= foo.bar #", { paramName: "foo" });

        assert.equal(t({ bar: "baz" }), "baz");
    });

    it("allows for member usage as a context", function() {
        let t = template.compile("#= bar #", { paramName: "data.foo" });
        assert.equal(t({ foo: { bar: "baz" } }), "baz");
    });

    it("allows for array accessor as a context", function() {
        let t = template.compile("#= bar #", { paramName: "data['foo']" });
        assert.equal(t({ foo: { bar: "baz" } }), "baz");
    });

    it("can execute code", function() {
        let executed = false,
            t = template.compile("# let result='foo'; ##= result#");

        assert.equal(t({}), "foo");
    });

    it("using ${} escapes html entities", function() {
        let t = template.compile("${foo}");
        assert.equal(t({ foo: "<" }), "&lt;");
    });

    it("using #: escapes html entities", function() {
        let t = template.compile("#:foo#");
        assert.equal(t({ foo: "<" }), "&lt;");
    });

    it("using ${} and non-string arguments", function() {
        let t = template.compile("${foo}");
        assert.equal(t({ foo: 1 }), "1");
    });

    it("using #: and non-string arguments", function() {
        let t = template.compile("#:foo#");
        assert.equal(t({ foo: 1 }), "1");
    });

    it("allows nesting escaped } in {}", function() {
        let t = template.compile("${'{\\}'}");
        assert.equal(t({}), "{}");
    });

    it("template defined in a script block", function() {
        let t = template.compile($("#encoded").text());
        assert.equal(t({ foo: 1 }).trim(), "<strong>1</strong>");
    });

    it("template preserves whitespace as is", function() {
        let t = template.compile("<p>\n\t<strong>${foo}</strong>\n</p>");
        assert.equal(t({ foo: 1 }).trim(), "<p>\n\t<strong>1</strong>\n</p>");
    });

    it("template with raw expression defined in a script block", function() {
        let t = template.compile($("#raw").text());
        assert.equal(t({ foo: 1 }).trim(), "<strong>1</strong>");
    });

    it("can execute code in template defined inside a script block", function() {
        let t = template.compile($("#code").text());
        assert.equal(t({}).trim(), "foo");
    });

    it("template executes multiline expression", function() {
        let t = template.compile($("#multiline-expression").text());
        assert.equal(t({}).trim(), "ab");
    });

    it("template throws error on invalid template", function() {
        assert.throws(function() { template.compile('<a href="#">link</a>'); }, /Invalid template/, "Template does not raise proper error");
    });

    it("slot count is 0 for template without expressions", function() {
        let t = template.compile("foo");
        assert.equal(t._slotCount, 0);
    });

    it("slot count includes #= # expressions", function() {
        let t = template.compile("foo #= bar #");
        assert.equal(t._slotCount, 1);
    });

    it("slot count includes multiple expressions", function() {
        let t = template.compile("foo #= bar # baz #= zaz #");
        assert.equal(t._slotCount, 2);
    });

    it("slot count includes #: # expressions", function() {
        let t = template.compile("foo #: bar #");
        assert.equal(t._slotCount, 1);
    });

    it("slot count includes ${} expressions", function() {
        let t = template.compile("foo ${ bar }");
        assert.equal(t._slotCount, 1);
    });

});