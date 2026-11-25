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

        it("_ariaLabel references the label element of the widget element", function() {
            let element = $("<input id='widget-a11y' />").appendTo(Mocha.fixture),
                label = $("<label for='widget-a11y'>Name</label>").appendTo(Mocha.fixture),
                target = $("<span />").appendTo(Mocha.fixture),
                widget = new Widget(element);

            widget._ariaLabel(target);

            assert.isOk(label.attr("id"));
            assert.equal(target.attr("aria-labelledby"), label.attr("id"));
        });

        it("_ariaLabel finds the label element of an id containing quotes and backslashes", function() {
            let id = "a\"b'c\\d]e",
                element = $("<input />").attr("id", id).appendTo(Mocha.fixture),
                label = $("<label>Name</label>").attr("for", id).appendTo(Mocha.fixture),
                target = $("<span />").appendTo(Mocha.fixture),
                widget = new Widget(element);

            widget._ariaLabel(target);

            assert.isOk(label.attr("id"));
            assert.equal(target.attr("aria-labelledby"), label.attr("id"));
        });

        it("_ariaLabel does not match a label with another for value", function() {
            let element = $("<input id='widget-a11y-b' />").appendTo(Mocha.fixture),
                target = $("<span />").appendTo(Mocha.fixture),
                widget = new Widget(element);

            $("<label for='widget-a11y-b-other'>Other</label>").appendTo(Mocha.fixture);
            widget._ariaLabel(target);

            assert.isNotOk(target.attr("aria-labelledby"));
        });

        it("_ariaLabel does not match a label with for undefined when the element has no id", function() {
            let element = $("<input />").appendTo(Mocha.fixture),
                target = $("<span />").appendTo(Mocha.fixture),
                widget = new Widget(element);

            $("<label for='undefined'>Unrelated</label>").appendTo(Mocha.fixture);
            widget._ariaLabel(target);

            assert.isNotOk(target.attr("aria-labelledby"));
        });

        it("_ariaLabel prefers the aria-label of the widget element", function() {
            let element = $("<input id='widget-a11y-c' aria-label='Own name' />").appendTo(Mocha.fixture),
                target = $("<span />").appendTo(Mocha.fixture),
                widget = new Widget(element);

            $("<label for='widget-a11y-c'>Label</label>").appendTo(Mocha.fixture);
            widget._ariaLabel(target);

            assert.equal(target.attr("aria-label"), "Own name");
            assert.isNotOk(target.attr("aria-labelledby"));
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

            let el = $('<some-test-element />');
            el.kendoHtmlTemplateWidget();

            let elTemplate = el.data("kendoHtmlTemplateWidget").options.template;

            // reset the state
            el.data("kendoHtmlTemplateWidget").destroy();
            kendo.widgets = currentWidgets;

            done(() => assert.deepEqual(template, elTemplate));
        });

    });

