(function() {

module("kendo.destroy", {
    setup: function() {

        QUnit.fixture.append(
            '<script id="multiple-widgets-template" type="text/x-kendo-template">' +
            '<div>' +
            '    <div id="foo" data-role="testwidget"></div>' +
            '    <div id="bar" data-role="testwidget2"></div>' +
            '</div>' +
            '</script>' +
            '<script id="template" type="text/x-kendo-template">' +
            'foo' +
            '</script>'
        );
    }
});

test("destroy the widget in the root DOM element", function() {
    var Foo = kendo.ui.Widget.extend({
        options: {
            name: "Foo"
        }
    });

    kendo.ui.plugin(Foo);

    var dom = $("<div/>").kendoFoo();

    kendo.destroy(dom);

    ok(!dom.data("kendoFoo"));
});

test("destroy a widget which also calls destroy internally", function() {
    var Foo = kendo.ui.Widget.extend({
        options: {
            name: "Foo"
        },
        destroy: function() {
            kendo.ui.Widget.fn.destroy.call(this);

            kendo.destroy(this.element);
        }
    });

    kendo.ui.plugin(Foo);

    var dom = $("<div/>").kendoFoo();

    kendo.destroy(dom);

    ok(!dom.data("kendoFoo"));
});

test("destroy child widgets", function() {
    var Foo = kendo.ui.Widget.extend({
        options: {
            name: "Foo"
        }
    });

    kendo.ui.plugin(Foo);

    var dom = $("<div><div/></div>").find("div").kendoFoo().end();

    kendo.destroy(dom);

    ok(!dom.find("div").data("kendoFoo"));
});


}());
