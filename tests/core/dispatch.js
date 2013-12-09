(function(){

var TestWidget = kendo.ui.Widget.extend({
    init: function(element, options) {
        kendo.ui.Widget.fn.init.call(this, element, options);

        this._value = "foo";
    },
    value: function(value) {
        if (value) {
            this._value = value;
        } else {
            return this._value;
        }
    },
    options: {
        name: "TestWidget",
        foo: "",
    }
});

var dom;

module("dispatch", {
    setup: function() {
        kendo.ui.plugin(TestWidget);
    },
    teardown: function() {
        kendo.destroy(dom);
    }
})

test("invokes a widget method via the jQuery plugin", function() {
    dom = $("<div/>").kendoTestWidget();

    var testwidget = dom.data("kendoTestWidget");
    stub(testwidget, "value");

    dom.kendoTestWidget("value");

    equal(testwidget.calls("value"), 1);
});

test("passes arguments to method", function() {
    dom = $("<div/>").kendoTestWidget();

    var testwidget = dom.data("kendoTestWidget");
    stub(testwidget, "value");

    dom.kendoTestWidget("value", "bar");

    equal(testwidget.args("value")[0], "bar");
});

test("invokes the method for all widgets matching the selector", function() {
    dom = $("<div/><div/>").kendoTestWidget();

    var testwidget1 = dom.eq(0).data("kendoTestWidget");
    stub(testwidget1, "value");
    var testwidget2 = dom.eq(1).data("kendoTestWidget");
    stub(testwidget2, "value");

    dom.kendoTestWidget("value", "bar");

    equal(testwidget1.calls("value"), 1);
    equal(testwidget2.calls("value"), 1);
});

test("the jQuery object is returned after invocation", function() {
    dom = $("<div/>").kendoTestWidget();

    strictEqual(dom.kendoTestWidget("value", "foo"), dom);
});

test("returns the result of the method if there is any", function() {
    dom = $("<div/>").kendoTestWidget();
    equal(dom.kendoTestWidget("value"), "foo");
});

test("calls the method of the first widget only if it returns a result", function() {
    dom = $("<div/><div/>").kendoTestWidget();

    var testwidget = dom.eq(1).data("kendoTestWidget");
    stub(testwidget, "value");

    dom.kendoTestWidget("value");

    equal(testwidget.calls("value"), 0);
});

test("throws error if method is invoked before the widget is initialized", 1, function() {
    try {
        dom = $("<div/>");
        dom.kendoTestWidget("value");
    } catch (e) {
        equal(e.message, "Cannot call method 'value' of kendoTestWidget before it is initialized");
    }
});

test("throws error if the method does not exist", 1, function() {
    try {
        dom = $("<div/>").kendoTestWidget();
        dom.kendoTestWidget("foo");
    } catch (e) {
        equal(e.message, "Cannot find method 'foo' of kendoTestWidget");
    }
});

test("throws error if trying to invoke a field", 1, function() {
    try {
        dom = $("<div/>").kendoTestWidget();
        dom.kendoTestWidget("options");
    } catch (e) {
        equal(e.message, "Cannot find method 'options' of kendoTestWidget");
    }
});

}());
