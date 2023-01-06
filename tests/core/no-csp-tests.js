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
            dataBar: "",
            format: ""
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

            var testwidget = dom.data("kendoTestWidget");

            assert.equal(testwidget.options.template({}), $("#template").html());
        });

        it("parses template options", function() {
            dom = $('<div data-role="testwidget" data-alt-template="template" />');

            kendo.init(dom);

            var testwidget = dom.data("kendoTestWidget");

            assert.equal(testwidget.options.altTemplate({}), $("#template").html());
        });

        it("initializes functions from parameters", function() {
            dom = $('<div data-role="testwidget" data-columns=\'{"foo":foo}\'/>');

            kendo.init(dom);
            var testwidget = dom.data("kendoTestWidget");
            assert.equal(testwidget.options.columns.foo, window.foo);
        });
    });
}());
