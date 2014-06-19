(function() {
    var dom;

    module("switch mvvm", {
        setup: function() {
            window.change = function() {
                ok(true);
            }

            dom = $('<input data-bind="checked:checked" />');
        },

        teardown: function() {
            kendo.destroy(dom);
            delete window.change;
        }
    });

    test("initializes a switch when data role is switch", function() {
        dom = $('<input data-role="switch"/>');

        kendo.bind(dom, {}, kendo.mobile.ui);

        ok(dom.data("kendoMobileSwitch") instanceof kendo.mobile.ui.Switch);
    });

    test("initalizes checked value", function() {
        dom = $('<input data-role="switch" data-bind="checked:checked" />');

        kendo.bind(dom, { checked: true }, kendo.mobile.ui );

        equal(dom.prop("checked"), true);
    });

    test("initializes a options from data attributes", function() {
        dom = $('<input data-role="switch" data-checked="checked:checked" />');

        kendo.bind(dom, { }, kendo.mobile.ui );

        equal(dom.prop("checked"), true);
    });

    test("changing a checked value updates the view model", function() {
        dom = $('<input data-role="switch" data-bind="checked:checked" />');

        var observable = kendo.observable({ checked: false });

        kendo.bind(dom, observable, kendo.mobile.ui );

        dom.data("kendoMobileSwitch").toggle();
        dom.data("kendoMobileSwitch").trigger("change");

        equal(observable.checked, dom.prop("checked"));
    });

    test("(Angular) changing the value updates the view model", function() {
        dom = $('<input data-role="switch" data-bind="value: checked" />');

        var observable = kendo.observable({ checked: false });

        kendo.bind(dom, observable, kendo.mobile.ui );

        dom.data("kendoMobileSwitch").toggle();
        dom.data("kendoMobileSwitch").trigger("change");

        equal(observable.checked, dom.prop("checked"));
    });

    test("binding switch initialized before binding", function() {
        var checked = true;
        var observable = kendo.observable({ checked: checked });

        dom.kendoMobileSwitch();

        kendo.bind(dom, observable, kendo.mobile.ui );

        equal(dom.prop("checked"), checked);
    });

    test("binding switch initialized after binding", function() {
        var checked = true;
        var observable = kendo.observable({ checked: checked });

        kendo.bind(dom, observable, kendo.mobile.ui );

        dom.kendoMobileSwitch();

        equal(dom.prop("checked"), checked);
    });

    test("updating model value updates the UI", function() {
        var observable = kendo.observable({ checked: null });

        kendo.bind(dom, observable, kendo.mobile.ui );

        dom.kendoMobileSwitch();

        observable.set("checked", true)
        ok(dom.prop("checked"));
    });

    test("bindings are removed if element is rebind", 1, function() {
        dom = $('<input data-role="switch" data-bind="checked:value" />');

        var observable = kendo.observable({ value: true });

        kendo.bind(dom, observable, kendo.mobile.ui );

        var destroy = stub(dom[0].kendoBindingTarget, "destroy");

        kendo.bind(dom, observable, kendo.mobile.ui );

        equal(destroy.calls("destroy"), 1);
    });

    test("change event is raised if attached as option", 1, function() {
        dom = $('<input data-role="switch" data-change="change" />');

        var observable = kendo.observable({
            items: [{text:"foo"}, {text:"bar"}]
        });

        kendo.bind(dom, observable, kendo.mobile.ui );

        dom.data("kendoMobileSwitch").trigger("change");
    });

    test("change event is raised if attached as option to a already initialized datepicker", 1, function() {
        dom = $('<input data-change="change" />');

        dom.kendoMobileSwitch();

        var observable = kendo.observable({
            items: [{text:"foo"}, {text:"bar"}]
        });

        kendo.bind(dom, observable, kendo.mobile.ui );

        dom.data("kendoMobileSwitch").trigger("change");
    });

    test("binding visible to false hides the widget", function() {
        dom = $('<input data-role="switch" data-bind="visible:visible"/>');

        var observable = kendo.observable({
            visible: false
        });

        kendo.bind(dom, observable, kendo.mobile.ui);

        ok(dom.data("kendoMobileSwitch").wrapper.css("display") == "none", "Display is 'none'");
    });

    test("binding visible to true shows the widget", function() {
        dom = $('<input data-role="switch" data-bind="visible:visible" style="display:none"/>');

        var observable = kendo.observable({
            visible: true
        });

        kendo.bind(dom, observable, kendo.mobile.ui);

        ok(dom.data("kendoMobileSwitch").wrapper.css("display") != "none", "Display is not 'none'");
    });

    test("changing visible to false hides the widget", function() {
        dom = $('<input data-role="switch" data-bind="visible:visible"/>');

        var observable = kendo.observable({
            visible: true
        });

        kendo.bind(dom, observable, kendo.mobile.ui);
        observable.set("visible", false);

        ok(dom.data("kendoMobileSwitch").wrapper.css("display") == "none", "Display is 'none'");
    });

    test("changing visible to true shows the widget", function() {
        dom = $('<input data-role="switch" data-bind="visible:visible"/>');

        var observable = kendo.observable({
            visible: false
        });

        kendo.bind(dom, observable, kendo.mobile.ui);
        observable.set("visible", true);

        ok(dom.data("kendoMobileSwitch").wrapper.css("display") != "none", "Display is not 'none'");
    });

    test("binding invisible to true hides the widget", function() {
        dom = $('<input data-role="switch" data-bind="invisible:invisible"/>');

        var observable = kendo.observable({
            invisible: true
        });

        kendo.bind(dom, observable, kendo.mobile.ui);

        ok(dom.data("kendoMobileSwitch").wrapper.css("display") == "none", "display is 'none'");
    });

    test("binding invisible to false shows the widget", function() {
        dom = $('<input data-role="switch" data-bind="invisible:invisible" style="display:none"/>');

        var observable = kendo.observable({
            invisible: false
        });

        kendo.bind(dom, observable, kendo.mobile.ui);

        ok(dom.data("kendoMobileSwitch").wrapper.css("display") != "none", "display is not 'none'");
    });

    test("changing invisible to true hides the widget", function() {
        dom = $('<input data-role="switch" data-bind="invisible:invisible"/>');

        var observable = kendo.observable({
            invisible: false
        });

        kendo.bind(dom, observable, kendo.mobile.ui);
        observable.set("invisible", true);

        ok(dom.data("kendoMobileSwitch").wrapper.css("display") == "none", "display is 'none'");
    });

    test("changing invisible to false shows the widget", function() {
        dom = $('<input data-role="switch" data-bind="invisible:invisible"/>');

        var observable = kendo.observable({
            invisible: true
        });

        kendo.bind(dom, observable, kendo.mobile.ui);
        observable.set("invisible", false);

        ok(dom.data("kendoMobileSwitch").wrapper.css("display") != "none", "display is not 'none'");
    });
})();
