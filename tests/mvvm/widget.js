(function() {

    var Binder = kendo.data.Binder;

    //specific widget binding
    kendo.data.binders.widget.testwidget = {
        test: Binder.extend({
            init: function(widget, bindings, options) {
                Binder.fn.init.call(this, widget.element[0], bindings, options);

                this.widget = widget;
            },

            refresh: function() {
                this.widget.trigger("change");
            }
        })
    };

    var TestWidget = kendo.ui.Widget.extend({
        init: function(element, options) {
            kendo.ui.Widget.fn.init.call(this, element, options);
        },

        options: {
            name: "TestWidget",
        },

        events: [
            "change"
        ]
    });


    var MobileTestWidget = kendo.mobile.ui.Widget.extend({
        init: function(element, options) {
            kendo.mobile.ui.Widget.fn.init.call(this, element, options);
        },

        options: {
            name: "TestWidget2",
        }
    });

    var dom;

    describe("mvvm widgets", function() {
        beforeEach(function() {
            kendo.ui.plugin(TestWidget);
            kendo.mobile.ui.plugin(MobileTestWidget);
        });
        afterEach(function() {
            kendo.destroy(dom);
        })

        it("widgets are initialized", function() {
            dom = $('<div><span id="foo" data-role="testwidget"></span></div>');
            kendo.bind(dom, {}, kendo.ui);
            assert.isOk(dom.find("#foo").data("kendoTestWidget"));
        });

        it("full path widgets are initialized", function() {
            dom = $('<div><span id="foo" data-role="kendo.ui.TestWidget"></span></div>');
            kendo.bind(dom, {}, kendo.ui);
            assert.isOk(dom.find("#foo").data("kendoTestWidget"));
        });

        it("widgets are initialized from multiple namespaces", function() {
            dom = $('<div><span id="foo" data-role="testwidget"></span><span id="bar" data-role="testwidget2"></span></div>');
            kendo.bind(dom, {}, kendo.ui, kendo.mobile.ui);
            assert.isOk(dom.find("#bar").data("kendoMobileTestWidget2"));
        });

        it("widget specific binding is allowed", function() {
            dom = $('<div><span id="foo" data-role="kendo.ui.TestWidget" data-bind="test: test"></span></div>');
            kendo.bind(dom, {}, kendo.ui);

            assert.isOk(dom.find("#foo").data("kendoTestWidget"));
        });

    });
}());
