(function(){

var dom;

var TestWidget = kendo.ui.Widget.extend({
    init: function(element, options) {
        kendo.ui.Widget.fn.init.call(this, element, options);

        this.dataSource = kendo.data.DataSource.create(this.options.dataSource);
    },

    options: {
        name: "TestWidget",
        foo: "",
        template:"",
        altTemplate:"",
        dataMinHeight: "",
        columns: null,
        dataBar:""
    },

    events: [ "click", "click2" ]
});

var MobileTestWidget = kendo.mobile.ui.Widget.extend({
    options: {
        name: "TestWidget"
    }
});

var TestWidget2 = kendo.mobile.ui.Widget.extend({
    options: {
        name: "TestWidget2"
    }
});

module("kendo.init", {
    setup: function() {
        QUnit.fixture.append(
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
            ok(true);
        };
        window.bar = {
            baz: function() {}
        };

        window.testDataSource = new kendo.data.DataSource();
    },
    teardown: function() {
        delete window.foo;
        delete window.bar;
        delete window.testDataSource;
        kendo.destroy(dom);
        kendo.ns = "";
    }
});

test("initializes a new testwidget based on its role", function() {
    dom = $('<div data-role="testwidget"/>');

    kendo.init(dom);

    ok(dom.data("kendoTestWidget") instanceof TestWidget, "TestWidget is initialized");
});

test("accepts a full name as a role", function() {
    dom = $('<div data-role="kendo.ui.TestWidget" />');

    kendo.init(dom);

    ok(dom.data("kendoTestWidget") instanceof TestWidget, "TestWidget is initialized");
});

test("kendo.destroy destroys a widget initialized with full name role", function() {
    dom = $('<div data-role="kendo.ui.TestWidget" />');

    kendo.init(dom);
    kendo.destroy(dom);


    equal(dom.data("kendoTestWidget"), null);
});

test("initializes multiple widgets based on their role", function() {
    dom = $('<div data-role="testwidget"/><div data-role="testwidget"/>');

    kendo.init(dom);

    ok(dom.last().data("kendoTestWidget") instanceof TestWidget, "TestWidget is initialized");
});

test("initializes a new testwidget from dom element", function() {
    dom = $('<div data-role="testwidget"/>');

    kendo.init(dom[0]);

    ok(dom.data("kendoTestWidget") instanceof TestWidget, "TestWidget is initialized");
});

test("initializes widgets in dom tree", function() {
    dom = $('<div><div data-role="testwidget"/></div>');

    kendo.init(dom);

    ok(dom.find("div").data("kendoTestWidget") instanceof TestWidget, "TestWidget is initialized");
});

test("role respects the namespace", function() {
    dom = $('<div data-kendo-role="testwidget"/>');

    kendo.ns = "kendo-";
    kendo.init(dom);

    ok(dom.data("kendoTestWidget") instanceof TestWidget, "TestWidget is initialized");
});

test("parses options from data attributes", function() {
    dom = $('<div data-role="testwidget" data-foo="foo" />');
    kendo.init(dom);

    var testwidget = dom.data("kendoTestWidget");

    equal(testwidget.options.foo, "foo");
});

test("parses string option from data attribute", function() {
    dom = $('<div data-role="testwidget" data-foo="[foo]" />');
    kendo.init(dom);

    var testwidget = dom.data("kendoTestWidget");

    equal(testwidget.options.foo, "[foo]");
});

test("parses strings array option from data attribute", function() {
    dom = $('<div data-role="testwidget" data-foo="[\'red\']"/>');

    kendo.init(dom);

    var testwidget = dom.data("kendoTestWidget");

    deepEqual(testwidget.options.foo, ["red"]);
});

test("parses object with array from data attribute", function() {
    dom = $('<div data-role="testwidget" data-foo="{data:[\'[red]\']}"/>');

    kendo.init(dom);

    var testwidget = dom.data("kendoTestWidget");

    deepEqual(testwidget.options.foo.data[0], "[red]");
});

test("parses ints array option from data attribute", function() {
    dom = $('<div data-role="testwidget" data-foo="[1]"/>');

    kendo.init(dom);

    var testwidget = dom.data("kendoTestWidget");

    deepEqual(testwidget.options.foo, [1]);
});

test("parses number options from data attributes", function() {
    dom = $('<div data-role="testwidget" data-foo="100" />');
    kendo.init(dom);
    var testwidget = dom.data("kendoTestWidget");

    ok(testwidget.options.foo === 100);
});

test("parses signed number options from data attributes", function() {
    dom = $('<div data-role="testwidget" data-foo="-100" />');
    kendo.init(dom);

    var testwidget = dom.data("kendoTestWidget");

    ok(testwidget.options.foo === -100);
});

test("parses float options from data attributes", function() {
    dom = $('<div data-role="testwidget" data-foo="100.10" />');
    kendo.init(dom);

    var testwidget = dom.data("kendoTestWidget");

    ok(testwidget.options.foo === 100.10);
});

test("parses percentage options from data attributes", function() {
    dom = $('<div data-role="testwidget" data-foo="100%" />');
    kendo.init(dom);

    var testwidget = dom.data("kendoTestWidget");

    equal(testwidget.options.foo, "100%");
});

test("parses options which start with data", function() {
    dom = $('<div data-role="testwidget" data-bar="bar" />');

    kendo.init(dom);

    var testwidget = dom.data("kendoTestWidget");

    equal(testwidget.options.dataBar, "bar");
});

test("parses camel case options that start with data", function() {
    dom = $('<div data-role="testwidget" data-min-height="bar" />');

    kendo.init(dom);

    var testwidget = dom.data("kendoTestWidget");

    equal(testwidget.options.dataMinHeight, "bar");
});

test("options respect the namespace", function() {
    dom = $('<div data-kendo-role="testwidget" data-kendo-min-height="bar" />');


    kendo.ns = "kendo-";
    kendo.init(dom);

    var testwidget = dom.data("kendoTestWidget");

    equal(testwidget.options.dataMinHeight, "bar");
});

test("parses events from data attributes", function() {
    dom = $('<div data-role="testwidget" data-click="foo" />');

    kendo.init(dom);

    var testwidget = dom.data("kendoTestWidget");

    equal(testwidget.options.click, foo);
});

test("parses nested events from data attributes", function() {
    dom = $('<div data-role="testwidget" data-click="bar.baz" />');

    kendo.init(dom);

    var testwidget = dom.data("kendoTestWidget");

    equal(testwidget.options.click, bar.baz);
});

test("parses templates from data attributes", function() {
    dom = $('<div data-role="testwidget" data-template="template" />');

    kendo.init(dom);

    var testwidget = dom.data("kendoTestWidget");

    equal(testwidget.options.template({}), $("#template").html());
});

test("parses template options", function() {
    dom = $('<div data-role="testwidget" data-alt-template="template" />');

    kendo.init(dom);

    var testwidget = dom.data("kendoTestWidget");

    equal(testwidget.options.altTemplate({}), $("#template").html());
});

test("initializes data source by field name", function() {
    dom = $('<div data-role="testwidget" data-source="testDataSource" />');

    kendo.init(dom);

    var testwidget = dom.data("kendoTestWidget");
    equal(testwidget.dataSource, testDataSource);
});

test("initializes data source by configuration", function() {
    dom = $('<div data-role="testwidget" data-source=\'{"transport":{"read":"http://example.com"}}\'"/>');

    kendo.init(dom);

    var testwidget = dom.data("kendoTestWidget");
    equal(testwidget.dataSource.transport.options.read.url, "http://example.com");
});

test("initializes multiline array field in JSON format", function() {
    dom = $('<div data-role="testwidget" data-columns=\'["foo",\r\n "bar"]\'/>');

    kendo.init(dom);
    var testwidget = dom.data("kendoTestWidget");
    equal(testwidget.options.columns[0], "foo");
    equal(testwidget.options.columns[1], "bar");
});

test("initializes multiline object field in JSON format", function() {
    dom = $('<div data-role="testwidget" data-columns=\'{"foo":"foo",\r\n "bar":"bar"}\'/>');

    kendo.init(dom);
    var testwidget = dom.data("kendoTestWidget");
    equal(testwidget.options.columns.foo, "foo");
    equal(testwidget.options.columns.bar, "bar");
});

test("initializes multiline object field which starts with a new line", function() {
    dom = $('<div data-role="testwidget" data-columns=\'\r\n{"foo":"foo",\r\n "bar":"bar"}\'/>');

    kendo.init(dom);
    var testwidget = dom.data("kendoTestWidget");
    equal(testwidget.options.columns.foo, "foo");
    equal(testwidget.options.columns.bar, "bar");
});

test("initializes multiline object field which ends with a new line", function() {
    dom = $('<div data-role="testwidget" data-columns=\'{"foo":"foo",\r\n "bar":"bar"}\r\n\'/>');

    kendo.init(dom);
    var testwidget = dom.data("kendoTestWidget");
    equal(testwidget.options.columns.foo, "foo");
    equal(testwidget.options.columns.bar, "bar");
});


test("initializes functions from parameters", function() {
dom = $('<div data-role="testwidget" data-columns=\'{"foo":foo}\'/>');

    kendo.init(dom);
    var testwidget = dom.data("kendoTestWidget");
    equal(testwidget.options.columns.foo, window.foo);
});

test("does not treat format strings as JSON", function() {
    dom = $('<div data-role="testwidget" data-foo="{0:d}"/>');

    kendo.init(dom);

    var testwidget = dom.data("kendoTestWidget");

    equal(testwidget.options.foo, "{0:d}");
});

test("skip format as property of complex object", function() {
    dom = $('<div data-role="testwidget" data-foo=\'{"bar":"{0:d}"}\'/>');

    kendo.init(dom);

    var testwidget = dom.data("kendoTestWidget");
    equal(testwidget.options.foo.bar, "{0:d}");
});

test("accepts multiple suites", function() {
    dom = $($("#multiple-widgets-template").html().toString());
    kendo.init(dom, kendo.ui, kendo.mobile.ui);

    ok(dom.find("#foo").data("kendoTestWidget") instanceof TestWidget, "TestWidget is initialized");
    ok(dom.find("#bar").data("kendoMobileTestWidget2") instanceof TestWidget2, "TestWidget2 is initialized");
});

test("multiple init calls bind unbind previous widget event handlers", 1, function() {
    dom = $('<a data-role="testwidget" data-click="foo" />');

    kendo.init(dom);
    kendo.init(dom);

    dom.data("kendoTestWidget").trigger("click");
});

test("init unbinds events from options only ", 1, function() {
    dom = $('<a data-role="testwidget" data-click="foo" />');

    new TestWidget(dom, { click2: window.foo });

    kendo.init(dom);

    dom.data("kendoTestWidget").trigger("click2");
});

test("Does not reinitialize a widget from another namespace", function() {
    dom = $("<div />");
    dom.kendoTestWidget();
    kendo.init(dom, kendo.mobile.ui);

    ok(dom.data("kendoTestWidget") instanceof TestWidget, "TestWidget is initialized");
    equal(dom.data("kendoMobileTestWidget"), null, "MobileTestWidget is not initialized");
});


}());
