(function() {
    var dom;
    module('timepicker MVVM', {
        setup: function() {

            window.timePickerChange = function() {
                ok(true);
            }

        },
        teardown: function() {
            kendo.destroy(dom);
        }
    });
    test("initializes a timepicker when data role is timepicker", function() {
        dom = $('<input data-role="timepicker"/>');

        kendo.bind(dom);

        ok(dom.data("kendoTimePicker") instanceof kendo.ui.TimePicker);
    });

    test("initializes a options from data attributes", function() {
        dom = $('<input data-role="timepicker" data-interval="15" />');

        kendo.bind(dom);

        var timepicker = dom.data("kendoTimePicker");

        equal(timepicker.options.interval, "15");
        equal(timepicker.timeView.options.interval, "15");
    });

    test("initializes value from view model", function() {
        dom = $('<input data-role="timepicker" data-bind="value:value" />');
        var value = new Date();

        kendo.bind(dom, { value: value } );

        equal(dom.data("kendoTimePicker").value().getTime(), value.getTime());
    });

    test("initializes a options from data attributes after init of the widget", function() {
        dom = $('<input data-role="timepicker" data-format="{0:hh:mm}" />');
        dom.kendoTimePicker();

        kendo.bind(dom);

        var timepicker = dom.data("kendoTimePicker");

        equal(timepicker.options.format, "hh:mm");
        equal(timepicker.timeView.options.format, "hh:mm");
    });

    test("initializes min and max options from data attributes", function() {
        dom = $('<input data-role="timepicker" data-min="09:00" data-max="21:30" />');
        dom.appendTo(QUnit.fixture);

        kendo.bind(dom);

        var timepicker = dom.data("kendoTimePicker");
        var min = kendo.date.today();
        var max = kendo.date.today();

        min.setHours(9, 0, 0);
        max.setHours(21, 30, 0);

        deepEqual(timepicker.min(), min);
        deepEqual(timepicker.max(), max);
    });

    test("initializes min and max options from data attributes after init of the widget", function() {
        dom = $('<input data-role="timepicker" data-min="09:00" data-max="21:30" />');
        dom.appendTo(QUnit.fixture);
        dom.kendoTimePicker();

        kendo.bind(dom);

        var timepicker = dom.data("kendoTimePicker");
        var min = kendo.date.today();
        var max = kendo.date.today();

        min.setHours(9, 0, 0);
        max.setHours(21, 30, 0);

        deepEqual(timepicker.min(), min);
        deepEqual(timepicker.max(), max);
    });

    test("Preserve options after widget init", function() {
        dom = $('<input data-role="timepicker" />');
        dom.kendoTimePicker({
            format: "HH:mm"
        });

        kendo.bind(dom);

        var timepicker = dom.data("kendoTimePicker");

        equal(timepicker.options.format, "HH:mm");
        equal(timepicker.timeView.options.format, "HH:mm");
    });

    test("initializes a parseFormats option from data attributes", function() {
        dom = $('<input data-role="timepicker" data-format="MM yyyy" data-parse-formats="MM/dd/yyyy" />');

        dom.kendoTimePicker();

        kendo.bind(dom);

        var timepicker = dom.data("kendoTimePicker");

        equal(timepicker.options.parseFormats[0], "MM yyyy");
        equal(timepicker.options.parseFormats[1], "MM/dd/yyyy");
    });

    test("initializes a parseFormats option from data attribute with array value", function() {
        dom = $('<input data-role="timepicker" data-format="MM yyyy" data-parse-formats=\'["MM/dd/yyyy", "dd/MM/yyyy"]\' />');

        dom.kendoTimePicker();

        kendo.bind(dom);

        var timepicker = dom.data("kendoTimePicker");

        equal(timepicker.options.parseFormats[0], "MM yyyy");
        equal(timepicker.options.parseFormats[1], "MM/dd/yyyy");
        equal(timepicker.options.parseFormats[2], "dd/MM/yyyy");
    });

    test("changing a value updates the view model", function() {
        dom = $('<input data-role="timepicker" data-bind="value:value" />');

        var observable = kendo.observable({ value: null });

        kendo.bind(dom, observable);
        var value = new Date(2011, 1, 2);

        dom.data("kendoTimePicker").value(value);
        dom.data("kendoTimePicker").trigger("change");

        equal(observable.value.getTime(), value.getTime());
    });

    test("binding timepicker initialized before binding", function() {
        dom = $('<input data-bind="value:value" />');

        var value = new Date(2011, 1, 2);
        var observable = kendo.observable({ value: null });
        observable.value = value;

        dom.kendoTimePicker();

        kendo.bind(dom, observable);

        equal(dom.data("kendoTimePicker").value().getTime(), value.getTime());
    });

    test("binding timepicker initialized after binding", function() {
        dom = $('<input data-bind="value:value" />');

        var observable = kendo.observable({ value: null });
        var value = new Date(2011, 1, 2);
        observable.value = value;

        kendo.bind(dom, observable);

        dom.kendoTimePicker();

        equal(dom.data("kendoTimePicker").value().getTime(), value.getTime());
    });

    test("updating model value updates the UI", function() {
        dom = $('<input data-bind="value:value" />');

        var observable = kendo.observable({ value: value });

        kendo.bind(dom, observable);

        dom.kendoTimePicker();

        var value = new Date(2011, 1, 2);
        observable.set("value", value)
        equal(dom.data("kendoTimePicker").value().getTime(), value.getTime());
    });

    test("bindings are removed if element is rebind", 1, function() {
        dom = $('<input data-role="timepicker" data-bind="value:value" />');

        var observable = kendo.observable({ value: new Date(2011, 1, 2) });

        kendo.bind(dom, observable);

        var destroy = stub(dom[0].kendoBindingTarget, "destroy");

        kendo.bind(dom, observable);

        equal(destroy.calls("destroy"), 1);
    });

    test("change event is raised if attached as option", 1, function() {
        dom = $('<input data-role="timepicker" data-change="timePickerChange" />');

        var observable = kendo.observable();

        kendo.bind(dom, observable);
        dom.data("kendoTimePicker").trigger("change");
    });

    test("change event is raised if attached as option to a already initialized timepicker", 1, function() {
        dom = $('<input data-change="timePickerChange" />').kendoTimePicker();

        var observable = kendo.observable();

        kendo.bind(dom, observable);
        dom.data("kendoTimePicker").trigger("change");
    });

    test("binding enabled to false disables the widget", function() {
        dom = $('<input data-bind="enabled:enabled" data-role="timepicker"/>');

        var observable = kendo.observable({
            enabled: false
        });

        kendo.bind(dom, observable);

        ok(dom.is(":disabled"));
    });

    test("binding enabled to true enables the widget", function() {
        dom = $('<input data-bind="enabled:enabled" disabled="disabled" data-role="timepicker" />');

        var observable = kendo.observable({
            enabled: true
        });

        kendo.bind(dom, observable);

        ok(!dom.is(":disabled"));
    });

    test("binding disable to true disables the widget", function() {
        dom = $('<input data-bind="disabled:disabled" disabled="disabled" data-role="timepicker" />');

        var observable = kendo.observable({
            disabled: false
        });

        kendo.bind(dom, observable);

        ok(!dom.is(":disabled"));
    });

    test("binding disabled to false enables the widget", function() {
        dom = $('<input data-bind="disabled:disabled" data-role="timepicker" />');

        var observable = kendo.observable({
            disabled: true
        });

        kendo.bind(dom, observable);

        ok(dom.is(":disabled"));
    });

    test("binding visible to false hides the widget", function() {
        dom = $('<input data-bind="visible:visible" data-role="timepicker"/>');

        var observable = kendo.observable({
            visible: false
        });

        kendo.bind(dom, observable);

        ok(dom.data("kendoTimePicker").wrapper.css("display") == "none", "Display is 'none'");
    });

    test("binding visible to true shows the widget", function() {
        dom = $('<input data-bind="visible:visible" data-role="timepicker" style="display:none"/>');

        var observable = kendo.observable({
            visible: true
        });

        kendo.bind(dom, observable);

        ok(dom.data("kendoTimePicker").wrapper.css("display") != "none", "Display is not 'none'");
    });

    test("changing visible to false hides the widget", function() {
        dom = $('<input data-bind="visible:visible" data-role="timepicker"/>');

        var observable = kendo.observable({
            visible: true
        });

        kendo.bind(dom, observable);
        observable.set("visible", false);

        ok(dom.data("kendoTimePicker").wrapper.css("display") == "none", "Display is 'none'");
    });

    test("changing visible to true shows the widget", function() {
        dom = $('<input data-bind="visible:visible" data-role="timepicker"/>');

        var observable = kendo.observable({
            visible: false
        });

        kendo.bind(dom, observable);
        observable.set("visible", true);

        ok(dom.data("kendoTimePicker").wrapper.css("display") != "none", "Display is not 'none'");
    });

    test("binding invisible to true hides the widget", function() {
        dom = $('<input data-bind="invisible:invisible" data-role="timepicker"/>');

        var observable = kendo.observable({
            invisible: true
        });

        kendo.bind(dom, observable);

        ok(dom.data("kendoTimePicker").wrapper.css("display") == "none", "display is 'none'");
    });

    test("binding invisible to false shows the widget", function() {
        dom = $('<input data-bind="invisible:invisible" data-role="timepicker" style="display:none"/>');

        var observable = kendo.observable({
            invisible: false
        });

        kendo.bind(dom, observable);

        ok(dom.data("kendoTimePicker").wrapper.css("display") != "none", "display is not 'none'");
    });

    test("changing invisible to true hides the widget", function() {
        dom = $('<input data-bind="invisible:invisible" data-role="timepicker"/>');

        var observable = kendo.observable({
            invisible: false
        });

        kendo.bind(dom, observable);
        observable.set("invisible", true);

        ok(dom.data("kendoTimePicker").wrapper.css("display") == "none", "display is 'none'");
    });

    test("changing invisible to false shows the widget", function() {
        dom = $('<input data-bind="invisible:invisible" data-role="timepicker"/>');

        var observable = kendo.observable({
            invisible: true
        });

        kendo.bind(dom, observable);
        observable.set("invisible", false);

        ok(dom.data("kendoTimePicker").wrapper.css("display") != "none", "display is not 'none'");
    });

    test("binding timepicker initialized before binding does not override change event handler of timeView", 1, function() {
        dom = $('<input data-bind="value: value" />');

        var observable = kendo.observable({ value: null });

        kendo.bind(dom, observable);

        dom.kendoTimePicker({
            change: function() {
                equal(this, dom.data("kendoTimePicker"));
            }
        });

        dom.data("kendoTimePicker").open();
        dom.data("kendoTimePicker").timeView.options.change("2:00 AM", true);
    });

})();
