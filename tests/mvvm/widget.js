(function(){


var TestWidget = kendo.ui.Widget.extend({
    init: function(element, options) {
        kendo.ui.Widget.fn.init.call(this, element, options);
    },

    options: {
        name: "TestWidget",
    }
});


var MobileTestWidget = kendo.mobile.ui.Widget.extend({
    init: function(element, options) {
        kendo.mobile.ui.Widget.fn.init.call(this, element, options);
    },

    options: {
        name: "TestWidget2",
    }
});


module("mvvm widgets", {
    setup: function() {
        kendo.ui.plugin(TestWidget);
        kendo.mobile.ui.plugin(MobileTestWidget);
        this.timeout = QUnit.config.testTimeout;
        QUnit.config.testTimeout = 100;
    },
    teardown: function() {
        QUnit.config.testTimeout = this.timeout;
    }
})

test("widgets are initialized", function() {
    var div = $('<div><span id="foo" data-role="testwidget" /></div>');
    kendo.bind(div, {}, kendo.ui);
    ok(div.find("#foo").data("kendoTestWidget"));
});

test("full path widgets are initialized", function() {
    var div = $('<div><span id="foo" data-role="kendo.ui.TestWidget" /></div>');
    kendo.bind(div, {}, kendo.ui);
    ok(div.find("#foo").data("kendoTestWidget"));
});

test("widgets are initialized from multiple namespaces", function() {
    var div = $('<div><span id="foo" data-role="testwidget" /><span id="bar" data-role="testwidget2" /></div>');
    kendo.bind(div, {}, kendo.ui, kendo.mobile.ui);
    ok(div.find("#bar").data("kendoMobileTestWidget2"));
});

}());
