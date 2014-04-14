(function() {
    var dom;

    module("kendo.ui.NumericTextBox MVVM", {
        setup: function() {
            kendo.effects.disable();

            window.textBoxChange = function() {
                ok(true);
            }
        },
        teardown: function() {
            kendo.effects.enable();
            kendo.destroy(dom);

            delete window.textBoxChange;
        }
    });

    test("initializes a numerictextbox when data role is numerictextbox", function() {
        dom = $('<input data-role="numerictextbox"/>');

        kendo.bind(dom);

        ok(dom.data("kendoNumericTextBox") instanceof kendo.ui.NumericTextBox);
    });

    test("initializes a options from data attributes", function() {
        dom = $('<input data-role="numerictextbox" data-format="p0" />');

        kendo.bind(dom);

        var numerictextbox = dom.data("kendoNumericTextBox");

        equal(numerictextbox.options.format, "p0");
    });

    test("initializes value from view model", function() {
        dom = $('<input data-role="numerictextbox" data-bind="value:value" />');

        kendo.bind(dom, { value: 42 } );

        equal(dom.data("kendoNumericTextBox").value(), 42);
    });

    test("changing a value updates the view model", function() {
        dom = $('<input data-role="numerictextbox" data-bind="value:value" />');

        var observable = kendo.observable({ value: null });

        kendo.bind(dom, observable);

        dom.data("kendoNumericTextBox").value(42);
        dom.data("kendoNumericTextBox").trigger("change");

        equal(observable.value, 42);
    });

    test("binding numerictextbox initialized before binding", function() {
        dom = $('<input data-bind="value:value" />');

        var observable = kendo.observable({ value: null });
        observable.value = 42;

        dom.kendoNumericTextBox();

        kendo.bind(dom, observable);

        equal(dom.data("kendoNumericTextBox").value(), 42);
    });

    test("binding numerictextbox initialized after binding", function() {
        dom = $('<input data-bind="value:value" />');

        var observable = kendo.observable({ value: null });
        observable.value = 42;

        kendo.bind(dom, observable);

        dom.kendoNumericTextBox();

        equal(dom.data("kendoNumericTextBox").value(), 42);
    });

    test("updating model value updates the UI", function() {
        dom = $('<input data-bind="value:value" />');

        var observable = kendo.observable({ value: null });

        kendo.bind(dom, observable);

        dom.kendoNumericTextBox();

        observable.set("value", 42)
        equal(dom.data("kendoNumericTextBox").value(), 42);
    });

    test("binding to unexisting field clears widget value", function() {
        dom = $('<input data-bind="value:test" />');

        var observable = kendo.observable({ value: null });

        dom.kendoNumericTextBox({
            value: 10
        });

        kendo.bind(dom, observable);

        equal(dom.data("kendoNumericTextBox").value(), null);
    });

    test("bindings are removed if element is rebind", 1, function() {
        dom = $('<input data-role="numerictextbox" data-bind="value:value" />');

        var observable = kendo.observable({ value: 42 });

        kendo.bind(dom, observable);

        destroy = stub(dom[0].kendoBindingTarget, "destroy");

        kendo.bind(dom, observable);

        equal(destroy.calls("destroy"), 1);
    });

    test("binding target is destroyed", 1, function() {
        dom = $('<input data-role="numerictextbox" data-bind="value:value"/>');

        var observable = kendo.observable({ value: null });

        kendo.bind(dom, observable);

        destroy = stub(dom[0].kendoBindingTarget, "destroy");

        kendo.bind(dom, observable);

        equal(destroy.calls("destroy"), 1);
    });

    test("dataBound event is raised if attached as option", 1, function() {
        dom = $('<input data-role="numerictextbox" data-change="textBoxChange" />');

        var observable = kendo.observable({
            items: [{text:"foo"}, {text:"bar"}]
        });

        kendo.bind(dom, observable);
        dom.data("kendoNumericTextBox").trigger("change");
    });

    test("dataBound event is raised if attached as option to a already initialized numerictextbox", 1, function() {
        dom = $('<input data-change="textBoxChange" />').kendoNumericTextBox();

        var observable = kendo.observable({
            items: [{text:"foo"}, {text:"bar"}]
        });

        kendo.bind(dom, observable);
        dom.data("kendoNumericTextBox").trigger("change");
    });

    test("binding enabled to false disables the widget", function() {
        dom = $('<input data-bind="enabled:enabled" />').kendoNumericTextBox();

        var observable = kendo.observable({
            enabled: false
        });

        kendo.bind(dom, observable);

        ok(dom.is(":disabled"));
    });

    test("binding enabled to true enables the widget", function() {
        dom = $('<input data-bind="enabled:enabled" disabled="disabled" />').kendoNumericTextBox();

        var observable = kendo.observable({
            enabled: true
        });

        kendo.bind(dom, observable);

        ok(!dom.is(":disabled"));
    });

    test("binding disable to true disables the widget", function() {
        dom = $('<input data-bind="disabled:disabled" disabled="disabled"  data-role="numerictextbox" />');

        var observable = kendo.observable({
            disabled: false
        });

        kendo.bind(dom, observable);

        ok(!dom.is(":disabled"));
    });

    test("binding disabled to false enables the widget", function() {
        dom = $('<input data-bind="disabled:disabled" data-role="numerictextbox" />');

        var observable = kendo.observable({
            disabled: true
        });

        kendo.bind(dom, observable);

        ok(dom.is(":disabled"));
    });

    test("binding visible to false hides the widget", function() {
        dom = $('<input data-bind="visible:visible" data-role="numerictextbox"/>');

        var observable = kendo.observable({
            visible: false
        });

        kendo.bind(dom, observable);

        ok(dom.data("kendoNumericTextBox").wrapper.css("display") == "none", "Display is 'none'");
    });

    test("binding visible to true shows the widget", function() {
        dom = $('<input data-bind="visible:visible" data-role="numerictextbox" style="display:none"/>');

        var observable = kendo.observable({
            visible: true
        });

        kendo.bind(dom, observable);

        ok(dom.data("kendoNumericTextBox").wrapper.css("display") != "none", "Display is not 'none'");
    });

    test("changing visible to false hides the widget", function() {
        dom = $('<input data-bind="visible:visible" data-role="numerictextbox"/>');

        var observable = kendo.observable({
            visible: true
        });

        kendo.bind(dom, observable);
        observable.set("visible", false);

        ok(dom.data("kendoNumericTextBox").wrapper.css("display") == "none", "Display is 'none'");
    });

    test("changing visible to true shows the widget", function() {
        dom = $('<input data-bind="visible:visible" data-role="numerictextbox"/>');

        var observable = kendo.observable({
            visible: false
        });

        kendo.bind(dom, observable);
        observable.set("visible", true);

        ok(dom.data("kendoNumericTextBox").wrapper.css("display") != "none", "Display is not 'none'");
    });

    test("binding invisible to true hides the widget", function() {
        dom = $('<input data-bind="invisible:invisible" data-role="numerictextbox"/>');

        var observable = kendo.observable({
            invisible: true
        });

        kendo.bind(dom, observable);

        ok(dom.data("kendoNumericTextBox").wrapper.css("display") == "none", "display is 'none'");
    });

    test("binding invisible to false shows the widget", function() {
        dom = $('<input data-bind="invisible:invisible" data-role="numerictextbox" style="display:none"/>');

        var observable = kendo.observable({
            invisible: false
        });

        kendo.bind(dom, observable);

        ok(dom.data("kendoNumericTextBox").wrapper.css("display") != "none", "display is not 'none'");
    });

    test("changing invisible to true hides the widget", function() {
        dom = $('<input data-bind="invisible:invisible" data-role="numerictextbox"/>');

        var observable = kendo.observable({
            invisible: false
        });

        kendo.bind(dom, observable);
        observable.set("invisible", true);

        ok(dom.data("kendoNumericTextBox").wrapper.css("display") == "none", "display is 'none'");
    });

    test("changing invisible to false shows the widget", function() {
        dom = $('<input data-bind="invisible:invisible" data-role="numerictextbox"/>');

        var observable = kendo.observable({
            invisible: true
        });

        kendo.bind(dom, observable);
        observable.set("invisible", false);

        ok(dom.data("kendoNumericTextBox").wrapper.css("display") != "none", "display is not 'none'");
    });

    test("change event reflects value modifications", 1, function() {
        dom = $('<input data-bind="value:value, events:{change: changeEvent}" data-role="numerictextbox"/>');

        var observable = kendo.observable({
            value: 0,
            changeEvent: function() {
                equal(this.get("value"), 42);
            }
        });

        kendo.bind(dom, observable);

        dom.data("kendoNumericTextBox").value(42);
        dom.data("kendoNumericTextBox").trigger("change");
    });
})();
