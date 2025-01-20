import '@progress/kendo-ui/src/kendo.core.js';

describe("kendo.destroy", function() {
    beforeEach(function() {

        Mocha.fixture.append(
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
    });

    it("destroy the widget in the root DOM element", function() {
        let Foo = kendo.ui.Widget.extend({
            options: {
                name: "Foo"
            }
        });

        kendo.ui.plugin(Foo);

        let dom = $("<div/>").kendoFoo();

        kendo.destroy(dom);

        assert.isOk(!dom.data("kendoFoo"));
    });

    it("destroy a widget which also calls destroy internally", function() {
        let Foo = kendo.ui.Widget.extend({
            options: {
                name: "Foo"
            },
            destroy: function() {
                kendo.ui.Widget.fn.destroy.call(this);

                kendo.destroy(this.element);
            }
        });

        kendo.ui.plugin(Foo);

        let dom = $("<div/>").kendoFoo();

        kendo.destroy(dom);

        assert.isOk(!dom.data("kendoFoo"));
    });

    it("destroy child widgets", function() {
        let Foo = kendo.ui.Widget.extend({
            options: {
                name: "Foo"
            }
        });

        kendo.ui.plugin(Foo);

        let dom = $("<div><div></div></div>").find("div").kendoFoo().end();

        kendo.destroy(dom);

        assert.isOk(!dom.find("div").data("kendoFoo"));
    });


});
