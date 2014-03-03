(function(){

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

module("mvvm widgets", {
    setup: function() {
        kendo.ui.plugin(TestWidget);
        kendo.mobile.ui.plugin(MobileTestWidget);
    },
    teardown: function() {
        kendo.destroy(dom);
    }
})

test("widgets are initialized", function() {
    dom = $('<div><span id="foo" data-role="testwidget" /></div>');
    kendo.bind(dom, {}, kendo.ui);
    ok(dom.find("#foo").data("kendoTestWidget"));
});

test("full path widgets are initialized", function() {
    dom = $('<div><span id="foo" data-role="kendo.ui.TestWidget" /></div>');
    kendo.bind(dom, {}, kendo.ui);
    ok(dom.find("#foo").data("kendoTestWidget"));
});

test("widgets are initialized from multiple namespaces", function() {
    dom = $('<div><span id="foo" data-role="testwidget" /><span id="bar" data-role="testwidget2" /></div>');
    kendo.bind(dom, {}, kendo.ui, kendo.mobile.ui);
    ok(dom.find("#bar").data("kendoMobileTestWidget2"));
});

test("widget specific binding is allowed", 1, function() {
    dom = $('<div><span id="foo" data-role="kendo.ui.TestWidget" data-bind="test: test" /></div>');
    kendo.bind(dom, {}, kendo.ui);

    ok(dom.find("#foo").data("kendoTestWidget"));
});

}());
