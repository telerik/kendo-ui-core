(function() {

    var dom;

    var TestWidget = kendo.ui.Widget.extend({
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
            dataBar: ""
        },

        events: ["click", "click2"]
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

    describe("kendo.init", function() {
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

        it("initializes a new testwidget based on its role", function() {
            dom = $('<div data-role="testwidget"/>');

            kendo.init(dom);

            assert.isOk(dom.data("kendoTestWidget") instanceof TestWidget, "TestWidget is initialized");
        });

        it("accepts a full name as a role", function() {
            dom = $('<div data-role="kendo.ui.TestWidget" />');

            kendo.init(dom);

            assert.isOk(dom.data("kendoTestWidget") instanceof TestWidget, "TestWidget is initialized");
        });

        it("kendo.destroy destroys a widget initialized with full name role", function() {
            dom = $('<div data-role="kendo.ui.TestWidget" />');

            kendo.init(dom);
            kendo.destroy(dom);


            assert.equal(dom.data("kendoTestWidget"), null);
        });

        it("initializes multiple widgets based on their role", function() {
            dom = $('<div data-role="testwidget"></div><div data-role="testwidget"></div>');

            kendo.init(dom);

            assert.isOk(dom.last().data("kendoTestWidget") instanceof TestWidget, "TestWidget is initialized");
        });

        it("initializes a new testwidget from dom element", function() {
            dom = $('<div data-role="testwidget"/>');

            kendo.init(dom[0]);

            assert.isOk(dom.data("kendoTestWidget") instanceof TestWidget, "TestWidget is initialized");
        });

        it("initializes widgets in dom tree", function() {
            dom = $('<div><div data-role="testwidget"></div></div>');

            kendo.init(dom);

            assert.isOk(dom.find("div").data("kendoTestWidget") instanceof TestWidget, "TestWidget is initialized");
        });

        it("role respects the namespace", function() {
            dom = $('<div data-kendo-role="testwidget"/>');

            kendo.ns = "kendo-";
            kendo.init(dom);

            assert.isOk(dom.data("kendoTestWidget") instanceof TestWidget, "TestWidget is initialized");
        });

        it("parses options from data attributes", function() {
            dom = $('<div data-role="testwidget" data-foo="foo" />');
            kendo.init(dom);

            var testwidget = dom.data("kendoTestWidget");

            assert.equal(testwidget.options.foo, "foo");
        });

        it("parses string option from data attribute", function() {
            dom = $('<div data-role="testwidget" data-foo="[foo]" />');
            kendo.init(dom);

            var testwidget = dom.data("kendoTestWidget");

            assert.equal(testwidget.options.foo, "[foo]");
        });

        it("parses strings array option from data attribute", function() {
            dom = $('<div data-role="testwidget" data-foo="[\'red\']"/>');

            kendo.init(dom);

            var testwidget = dom.data("kendoTestWidget");

            assert.deepEqual(testwidget.options.foo, ["red"]);
        });

        it("parses empty array from data attribute", function() {
            dom = $('<div data-role="testwidget" data-foo="[]"/>');

            kendo.init(dom);

            var testwidget = dom.data("kendoTestWidget");

            assert.deepEqual(testwidget.options.foo, []);
        });

        it("parses object with array from data attribute", function() {
            dom = $('<div data-role="testwidget" data-foo="{data:[\'[red]\']}"/>');

            kendo.init(dom);

            var testwidget = dom.data("kendoTestWidget");

            assert.deepEqual(testwidget.options.foo.data[0], "[red]");
        });

        it("parses ints array option from data attribute", function() {
            dom = $('<div data-role="testwidget" data-foo="[1]"/>');

            kendo.init(dom);

            var testwidget = dom.data("kendoTestWidget");

            assert.deepEqual(testwidget.options.foo, [1]);
        });

        it("parses number options from data attributes", function() {
            dom = $('<div data-role="testwidget" data-foo="100" />');
            kendo.init(dom);
            var testwidget = dom.data("kendoTestWidget");

            assert.isOk(testwidget.options.foo === 100);
        });

        it("parses signed number options from data attributes", function() {
            dom = $('<div data-role="testwidget" data-foo="-100" />');
            kendo.init(dom);

            var testwidget = dom.data("kendoTestWidget");

            assert.isOk(testwidget.options.foo === -100);
        });

        it("parses float options from data attributes", function() {
            dom = $('<div data-role="testwidget" data-foo="100.10" />');
            kendo.init(dom);

            var testwidget = dom.data("kendoTestWidget");

            assert.isOk(testwidget.options.foo === 100.10);
        });

        it("parses percentage options from data attributes", function() {
            dom = $('<div data-role="testwidget" data-foo="100%" />');
            kendo.init(dom);

            var testwidget = dom.data("kendoTestWidget");

            assert.equal(testwidget.options.foo, "100%");
        });

        it("parses options which start with data", function() {
            dom = $('<div data-role="testwidget" data-bar="bar" />');

            kendo.init(dom);

            var testwidget = dom.data("kendoTestWidget");

            assert.equal(testwidget.options.dataBar, "bar");
        });

        it("parses camel case options that start with data", function() {
            dom = $('<div data-role="testwidget" data-min-height="bar" />');

            kendo.init(dom);

            var testwidget = dom.data("kendoTestWidget");

            assert.equal(testwidget.options.dataMinHeight, "bar");
        });

        it("options respect the namespace", function() {
            dom = $('<div data-kendo-role="testwidget" data-kendo-min-height="bar" />');


            kendo.ns = "kendo-";
            kendo.init(dom);

            var testwidget = dom.data("kendoTestWidget");

            assert.equal(testwidget.options.dataMinHeight, "bar");
        });

        it("parses events from data attributes", function() {
            dom = $('<div data-role="testwidget" data-click="foo" />');

            kendo.init(dom);

            var testwidget = dom.data("kendoTestWidget");

            assert.equal(testwidget.options.click, foo);
        });

        it("parses nested events from data attributes", function() {
            dom = $('<div data-role="testwidget" data-click="bar.baz" />');

            kendo.init(dom);

            var testwidget = dom.data("kendoTestWidget");

            assert.equal(testwidget.options.click, bar.baz);
        });

        it("parses templates from data attributes", function() {
            dom = $('<div data-role="testwidget" data-template="template" />');

            kendo.init(dom);

            var testwidget = dom.data("kendoTestWidget");

            assert.equal(testwidget.options.template({}), $("#template").html());
        });

        it("parses template options", function() {
            dom = $('<div data-role="testwidget" data-alt-template="template" />');

            kendo.init(dom);

            var testwidget = dom.data("kendoTestWidget");

            assert.equal(testwidget.options.altTemplate({}), $("#template").html());
        });

        it("initializes data source by field name", function() {
            dom = $('<div data-role="testwidget" data-source="testDataSource" />');

            kendo.init(dom);

            var testwidget = dom.data("kendoTestWidget");
            assert.equal(testwidget.dataSource, testDataSource);
        });

        it("initializes data source by configuration", function() {
            dom = $('<div data-role="testwidget" data-source=\'{"transport":{"read":"http://example.com"}}\'"/>');

            kendo.init(dom);

            var testwidget = dom.data("kendoTestWidget");
            assert.equal(testwidget.dataSource.transport.options.read.url, "http://example.com");
        });

        it("initializes multiline array field in JSON format", function() {
            dom = $('<div data-role="testwidget" data-columns=\'["foo",\r\n "bar"]\'/>');

            kendo.init(dom);
            var testwidget = dom.data("kendoTestWidget");
            assert.equal(testwidget.options.columns[0], "foo");
            assert.equal(testwidget.options.columns[1], "bar");
        });

        it("initializes multiline object field in JSON format", function() {
            dom = $('<div data-role="testwidget" data-columns=\'{"foo":"foo",\r\n "bar":"bar"}\'/>');

            kendo.init(dom);
            var testwidget = dom.data("kendoTestWidget");
            assert.equal(testwidget.options.columns.foo, "foo");
            assert.equal(testwidget.options.columns.bar, "bar");
        });

        it("initializes multiline object field which starts with a new line", function() {
            dom = $('<div data-role="testwidget" data-columns=\'\r\n{"foo":"foo",\r\n "bar":"bar"}\'/>');

            kendo.init(dom);
            var testwidget = dom.data("kendoTestWidget");
            assert.equal(testwidget.options.columns.foo, "foo");
            assert.equal(testwidget.options.columns.bar, "bar");
        });

        it("initializes multiline object field which ends with a new line", function() {
            dom = $('<div data-role="testwidget" data-columns=\'{"foo":"foo",\r\n "bar":"bar"}\r\n\'/>');

            kendo.init(dom);
            var testwidget = dom.data("kendoTestWidget");
            assert.equal(testwidget.options.columns.foo, "foo");
            assert.equal(testwidget.options.columns.bar, "bar");
        });


        it("initializes functions from parameters", function() {
            dom = $('<div data-role="testwidget" data-columns=\'{"foo":foo}\'/>');

            kendo.init(dom);
            var testwidget = dom.data("kendoTestWidget");
            assert.equal(testwidget.options.columns.foo, window.foo);
        });

        it("does not treat format strings as JSON", function() {
            dom = $('<div data-role="testwidget" data-foo="{0:d}"/>');

            kendo.init(dom);

            var testwidget = dom.data("kendoTestWidget");

            assert.equal(testwidget.options.foo, "{0:d}");
        });

        it("skip format as property of complex object", function() {
            dom = $('<div data-role="testwidget" data-foo=\'{"bar":"{0:d}"}\'/>');

            kendo.init(dom);

            var testwidget = dom.data("kendoTestWidget");
            assert.equal(testwidget.options.foo.bar, "{0:d}");
        });

        it("accepts multiple suites", function() {
            dom = $($("#multiple-widgets-template").html().toString());
            kendo.init(dom, kendo.ui, kendo.mobile.ui);

            assert.isOk(dom.find("#foo").data("kendoTestWidget") instanceof TestWidget, "TestWidget is initialized");
            assert.isOk(dom.find("#bar").data("kendoMobileTestWidget2") instanceof TestWidget2, "TestWidget2 is initialized");
        });

        it("multiple init calls bind unbind previous widget event handlers", function() {
            dom = $('<a data-role="testwidget" data-click="foo" />');

            kendo.init(dom);
            kendo.init(dom);

            dom.data("kendoTestWidget").trigger("click");
        });

        it("init unbinds events from options only ", function() {
            dom = $('<a data-role="testwidget" data-click="foo" />');

            new TestWidget(dom, { click2: window.foo });

            kendo.init(dom);

            dom.data("kendoTestWidget").trigger("click2");
        });

        it("Does not reinitialize a widget from another namespace", function() {
            dom = $("<div />");
            dom.kendoTestWidget();
            kendo.init(dom, kendo.mobile.ui);

            assert.isOk(dom.data("kendoTestWidget") instanceof TestWidget, "TestWidget is initialized");
            assert.equal(dom.data("kendoMobileTestWidget"), null, "MobileTestWidget is not initialized");
        });


    });
}());
