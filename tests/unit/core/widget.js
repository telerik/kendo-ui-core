import '@progress/kendo-ui/src/kendo.core.js';
import { asyncTest } from "../../helpers/unit/async-utils.js";
import { stub } from '../../helpers/unit/stub.js';

    let Widget = kendo.ui.Widget;
    describe("widget", function() {

        it("Widget.element is initialized from constructor", function() {
            let element = $("<div>");
            let widget = new Widget(element);

            assert.isOk(widget.element[0] === element[0]);
        });

        it("Widget.options is initialized from constructor", function() {
            let widget = new Widget($(), { foo: "bar" });

            assert.equal(widget.options.foo, "bar");
        });

        it("Widget.options is cloned from constructor", function() {
            let options = { foo: "bar" };
            let widget = new Widget($(), options);

            options.foo = "baz";
            assert.equal(widget.options.foo, "bar");
        });

        it("Widget.options is merged with default options", function() {
            Widget.prototype.options = { foo: "bar" };

            let widget = new Widget($(), { baz: "boo" });

            assert.equal(widget.options.foo, "bar");
            assert.equal(widget.options.baz, "boo");
        });

        it("default options remain pristine", function() {
            Widget.prototype.options = { foo: "bar" };

            let widget = new Widget($(), { foo: "foo1", baz: "boo" });

            assert.equal(Widget.prototype.options.foo, "bar");
            assert.isOk(Widget.prototype.options.baz === undefined);
        });

        it("Widget is Observable", function() {
            let widget = new Widget();
            assert.isOk(widget instanceof kendo.Observable);
        });

        it("Widgets dont share events", function() {
            let one = new Widget(), two = new Widget();
            assert.isOk(one._events !== two._events);
        });

        it("plugin extends jQuery.fn", function() {
            let foo = Widget.extend({
                options: {
                    name: "Foo"
                }
            });

            kendo.ui.plugin(foo);

            assert.isOk($.fn.kendoFoo);
        });

        it("plugin provides get widget shortcut", function() {
            let Bar = Widget.extend({
                options: {
                    name: "Bar",
                    prefix: ""
                }
            }),
                el = $("<div />");

            kendo.ui.plugin(Bar);

            el.kendoBar();

            assert.isOk(el.getKendoBar());
            assert.equal(el.getKendoBar(), el.data("kendoBar"));
        });

        it("destroy removes the instance of the widget", function() {
            let Foo = Widget.extend({
                options: {
                    name: "Foo",
                    prefix: ""
                }
            }),
                el = $("<div />");

            kendo.ui.plugin(Foo);

            el.kendoFoo();

            el.data("kendoFoo").destroy();

            assert.isOk(!el.data("kendoFoo"));
        });


        it("destroy removes any event handlers", function() {
            let Foo = Widget.extend({
                options: {
                    name: "Foo",
                    prefix: ""
                },
                events: ["foo"]
            }),
                el = $("<div />");

            kendo.ui.plugin(Foo);

            let options = stub({}, "foo");

            let foo = el.kendoFoo(options).data("kendoFoo");

            foo.destroy();

            foo.trigger("foo");

            assert.equal(options.calls("foo"), 0);
        });

        it("plugin callback is called for existing and new widgets", function() {
            let currentWidgets = kendo.widgets;
            kendo.widgets = [];

            let Widget1 = kendo.ui.Widget.extend({ options: { name: "widget1" } });

            kendo.ui.plugin(Widget1, { roles: [] });

            let i = 0;
            kendo.onWidgetRegistered(function(entry) {
                switch (i++) {
                    case 0:
                        assert.equal(entry.widget.prototype.options.name, "widget1");
                        break;
                    case 1:
                        assert.equal(entry.widget.prototype.options.name, "widget2");
                        break;
                }
            });

            let Widget2 = kendo.ui.Widget.extend({ options: { name: "widget2" } });

            kendo.ui.plugin(Widget2, { roles: [] });

            // reset the state
            kendo.widgets = currentWidgets;
            kendo._widgetRegisteredCallbacks = [];
        });

        asyncTest("Widget can be extended with static Kendo template", function(done) {

            let currentWidgets = kendo.widgets;
            kendo.widgets = [];

            let template = kendo.template(() => '<some-element></some-element>');
            let Widget1 = kendo.ui.Widget.extend({

                options: {
                    name: "HtmlTemplateWidget",
                    prefix: ""
                },
                init: function(element, options) {

                    options = options || {};

                    element.getAttribute = function(key) {
                        switch (key) {
                            case 'data-template':
                            case 'template':
                                return template;
                            default:
                                return Element.prototype.getAttribute.call(element, key);
                        }

                    };

                    options.template = template;
                    kendo.ui.Widget.fn.init.call(this, element, options);
                }

            });

            kendo.ui.plugin(Widget1);

            kendo.onWidgetRegistered(function(entry) {

                if (entry.name === 'kendoHtmlTemplateWidget') {
                    let el = $('<some-test-element />');
                    el.kendoHtmlTemplateWidget();

                    let elTemplate = el.data("kendoHtmlTemplateWidget").options.template;

                    // reset the state
                    el.data("kendoHtmlTemplateWidget").destroy();
                    kendo.widgets = currentWidgets;
                    kendo._widgetRegisteredCallbacks = [];

                    done(() => assert.deepEqual(template, elTemplate));

                }

            });

        });

    });

