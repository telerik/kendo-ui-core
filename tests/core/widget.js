(function(){

var Widget = kendo.ui.Widget;

test("Widget.element is initialized from constructor", function() {
    var element = $("<div>");
    var widget = new Widget(element);

    ok(widget.element[0] === element[0]);
});

test("Widget.options is initialized from constructor", function() {
    var widget = new Widget($(), { foo: "bar" });

    equal(widget.options.foo, "bar");
});

test("Widget.options is cloned from constructor", function() {
    var options = { foo: "bar" };
    var widget = new Widget($(), options);

    options.foo = "baz";
    equal(widget.options.foo, "bar");
});

test("Widget.options is merged with default options", function() {
    Widget.prototype.options = { foo: "bar" };

    var widget = new Widget($(), { baz: "boo" });

    equal(widget.options.foo, "bar");
    equal(widget.options.baz, "boo");
});

test("default options remain pristine", function() {
    Widget.prototype.options = { foo: "bar" };

    var widget = new Widget($(), { foo: "foo1", baz: "boo" });

    equal(Widget.prototype.options.foo, "bar");
    ok(Widget.prototype.options.baz === undefined);
});

test("Widget is Observable", function() {
    var widget = new Widget();
    ok(widget instanceof kendo.Observable);
});

test("Widgets dont share events", function() {
    var one = new Widget(), two = new Widget();
    ok(one._events !== two._events);
});

test("plugin extends jQuery.fn", function() {
    var foo = Widget.extend( {
        options: {
            name: "Foo"
        }
    });

    kendo.ui.plugin(foo);

    ok($.fn.kendoFoo);
});

test("plugin provides get widget shortcut", 2, function() {
    var Bar = Widget.extend({
        options: {
            name: "Bar",
            prefix: ""
        }
    }),
    el = $("<div />");

    kendo.ui.plugin(Bar);

    el.kendoBar();

    ok(el.getKendoBar());
    equal(el.getKendoBar(), el.data("kendoBar"));
});

test("destroy removes the instance of the widget", function() {
    var Foo = Widget.extend({
            options: {
                name: "Foo",
                prefix: ""
            }
        }),
        el = $("<div />");

    kendo.ui.plugin(Foo);

    el.kendoFoo();

    el.data("kendoFoo").destroy();

    ok(!el.data("kendoFoo"));
});


test("destroy removes any event handlers", function() {
    var Foo = Widget.extend({
            options: {
                name: "Foo",
                prefix: ""
            },
            events: [ "foo" ]
        }),
        el = $("<div />");

    kendo.ui.plugin(Foo);

    var options = stub({}, "foo");

    var foo = el.kendoFoo(options).data("kendoFoo");

    foo.destroy();

    foo.trigger("foo");

    equal(options.calls("foo"), 0);
});

test("plugin callback is called for existing and new widgets", 2, function() {
    var currentWidgets = kendo.widgets;
    kendo.widgets = [];

    var Widget1 = kendo.ui.Widget.extend({ options: { name: "widget1" }});

    kendo.ui.plugin(Widget1, { roles: [] });

    var i = 0;
    kendo.onWidgetRegistered(function(entry) {
        switch (i++) {
            case 0:
                equal(entry.widget.prototype.options.name, "widget1");
                break;
            case 1:
                equal(entry.widget.prototype.options.name, "widget2");
                break;
        }
    });

    var Widget2 = kendo.ui.Widget.extend({ options: { name: "widget2" }});

    kendo.ui.plugin(Widget2, { roles: [] });

    // reset the state
    kendo.widgets = currentWidgets;
    kendo._widgetRegisteredCallbacks = [];
});

asyncTest("Widget can be extended with static Kendo template", function() {

    var currentWidgets = kendo.widgets;
    kendo.widgets = [];

    expect(1);

    var template = kendo.template('<some-element></some-element>');
    var Widget1 = kendo.ui.Widget.extend({

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
                        break;
                    default:
                        return Element.prototype.getAttribute.call(element, key);
                        break;
                }
                
            }

            options.template = template;
            kendo.ui.Widget.fn.init.call(this, element, options);

        }
    });

    kendo.ui.plugin(Widget1);

    kendo.onWidgetRegistered(function(entry) {

        if(entry.name === 'kendoHtmlTemplateWidget') {
            var el = $('<some-test-element />');
            el.kendoHtmlTemplateWidget();

            deepEqual(template, el.data("kendoHtmlTemplateWidget").options.template);

            // reset the state
            el.data("kendoHtmlTemplateWidget").destroy();
            kendo.widgets = currentWidgets;
            kendo._widgetRegisteredCallbacks = [];

            start();

        }

    });

});

}());
