(function() {

var dom;

module("kendo.ui.Calendar MVVM", {
    setup: function() {
        window.change = function() {
            ok(true);
        };
    },
    teardown: function() {
        delete window.change;

        kendo.destroy(dom);
    }
});

test("initializes a datepicker when data role is datepicker", function() {
    dom = $('<input data-role="datepicker"/>');
    dom.appendTo(QUnit.fixture);

    kendo.bind(dom);

    ok(dom.data("kendoDatePicker") instanceof kendo.ui.DatePicker);
});

test("initializes a options from data attributes", function() {
    dom = $('<input data-role="datepicker" data-start="year" />');
    dom.appendTo(QUnit.fixture);

    kendo.bind(dom);

    var datepicker = dom.data("kendoDatePicker");

    equal(datepicker.options.start, "year");
    equal(datepicker.dateView.options.start, "year");
});

test("Preserve options after widget init", function() {
    dom = $('<input data-role="datepicker" />');
    dom.appendTo(QUnit.fixture);
    dom.kendoDatePicker({
        start: "decade",
        depth: "decade"
    });

    kendo.bind(dom);

    var datepicker = dom.data("kendoDatePicker");

    equal(datepicker.options.start, "decade");
    equal(datepicker.dateView.options.start, "decade");
});

test("initializes options from data attributes after init of the widget", function() {
    dom = $('<input data-role="datepicker" data-format="{0:MM yyyy}" data-start="year" />');
    dom.appendTo(QUnit.fixture);
    dom.kendoDatePicker();

    kendo.bind(dom);

    var datepicker = dom.data("kendoDatePicker");

    equal(datepicker.options.format, "MM yyyy");
    equal(datepicker.dateView.options.format, "MM yyyy");

    equal(datepicker.options.start, "year");
    equal(datepicker.dateView.options.start, "year");
});

test("initializes min and max options from data attributes", function() {
    dom = $('<input data-role="datepicker" data-min="2000-10-10" data-max="2010-10-10" />');
    dom.appendTo(QUnit.fixture);

    kendo.bind(dom);

    var datepicker = dom.data("kendoDatePicker");

    deepEqual(datepicker.min(), new Date(2000, 9, 10));
    deepEqual(datepicker.max(), new Date(2010, 9, 10));
});

test("initializes min and max options from data attributes after init of the widget", function() {
    dom = $('<input data-role="datepicker" data-min="2000-10-10" data-max="2010-10-10" />');
    dom.appendTo(QUnit.fixture);
    dom.kendoDatePicker();

    kendo.bind(dom);

    var datepicker = dom.data("kendoDatePicker");

    deepEqual(datepicker.min(), new Date(2000, 9, 10));
    deepEqual(datepicker.max(), new Date(2010, 9, 10));
});

test("initializes a parseFormats option from data attributes", function() {
    dom = $('<input data-role="datepicker" data-format="MM yyyy" data-parse-formats="MM/dd/yyyy" />');
    dom.appendTo(QUnit.fixture);

    dom.kendoDatePicker();
    kendo.bind(dom);

    var datepicker = dom.data("kendoDatePicker");

    equal(datepicker.options.parseFormats[0], "MM yyyy");
    equal(datepicker.options.parseFormats[1], "MM/dd/yyyy");
});

test("initializes a parseFormats option from data attribute with array value", function() {
    dom = $('<input data-role="datepicker" data-format="MM yyyy" data-parse-formats=\'["MM/dd/yyyy", "dd/MM/yyyy"]\' />');
    dom.appendTo(QUnit.fixture);

    kendo.bind(dom);

    var datepicker = dom.data("kendoDatePicker");

    equal(datepicker.options.parseFormats[0], "MM yyyy");
    equal(datepicker.options.parseFormats[1], "MM/dd/yyyy");
    equal(datepicker.options.parseFormats[2], "dd/MM/yyyy");
});

test("initializes value from view model", function() {
    dom = $('<input data-role="datepicker" data-bind="value:value" />');
    dom.appendTo(QUnit.fixture);

    var value = new Date();

    kendo.bind(dom, { value: value } );

    equal(dom.data("kendoDatePicker").value().getTime(), value.getTime());
});

test("changing a value updates the view model", function() {
    dom = $('<input data-role="datepicker" data-bind="value:value" />');
    dom.appendTo(QUnit.fixture);

    var observable = kendo.observable({ value: null });

    kendo.bind(dom, observable);
    var value = new Date(2011, 1, 2);

    dom.data("kendoDatePicker").value(value);
    dom.data("kendoDatePicker").trigger("change");

    equal(observable.value.getTime(), value.getTime());
});

test("changing to invalid value does not clear widget", function() {
    dom = $('<input data-role="datepicker" data-bind="value:value" />');
    dom.appendTo(QUnit.fixture);

    var observable = kendo.observable({ value: new Date() });

    kendo.bind(dom, observable);
    dom.val("10/10/0099").focus().blur();

    equal(observable.value, null);
    equal(dom.val(), "10/10/0099");
});

test("binding datepicker initialized before binding", function() {
    dom = $('<input data-bind="value:value" />');
    dom.appendTo(QUnit.fixture);

    var value = new Date(2011, 1, 2);
    var observable = kendo.observable({ value: null });
    observable.value = value;

    dom.kendoDatePicker();

    kendo.bind(dom, observable);

    equal(dom.data("kendoDatePicker").value().getTime(), value.getTime());
});

test("binding datepicker initialized after binding", function() {
    dom = $('<input data-bind="value:value" />');
    dom.appendTo(QUnit.fixture);

    var observable = kendo.observable({ value: null });
    var value = new Date(2011, 1, 2);
    observable.value = value;

    kendo.bind(dom, observable);

    dom.kendoDatePicker();

    equal(dom.data("kendoDatePicker").value().getTime(), value.getTime());
});

test("updating model value updates the UI", function() {
    dom = $('<input data-bind="value:value" />');
    dom.appendTo(QUnit.fixture);

    var observable = kendo.observable({ value: value });

    kendo.bind(dom, observable);

    dom.kendoDatePicker();

    var value = new Date(2011, 1, 2);
    observable.set("value", value)
    equal(dom.data("kendoDatePicker").value().getTime(), value.getTime());
});

test("bindings are removed if element is rebind", 1, function() {
    dom = $('<input data-role="datepicker" data-bind="value:value" />');
    dom.appendTo(QUnit.fixture);

    var observable = kendo.observable({ value: new Date(2011, 1, 2) });

    kendo.bind(dom, observable);

    var destroy = stub(dom[0].kendoBindingTarget, "destroy");

    kendo.bind(dom, observable);

    equal(destroy.calls("destroy"), 1);
});

test("binding target is destroyed", 1, function() {
    dom = $('<input data-role="datepicker" data-bind="value:value"/>');
    dom.appendTo(QUnit.fixture);

    var observable = kendo.observable({ value: null });

    kendo.bind(dom, observable);

    var destroy = stub(dom[0].kendoBindingTarget, "destroy");

    kendo.bind(dom, observable);

    equal(destroy.calls("destroy"), 1);
});

test("dataBound event is raised if attached as option", 1, function() {
    dom = $('<input data-role="datepicker" data-change="change" />');
    dom.appendTo(QUnit.fixture);

    var observable = kendo.observable({
        items: [{text:"foo"}, {text:"bar"}]
    });

    kendo.bind(dom, observable);
    dom.data("kendoDatePicker").trigger("change");
});

test("dataBound event is raised if attached as option to a already initialized datepicker", 1, function() {
    dom = $('<input data-change="change" />').kendoDatePicker();
    dom.appendTo(QUnit.fixture);

    var observable = kendo.observable({
        items: [{text:"foo"}, {text:"bar"}]
    });

    kendo.bind(dom, observable);
    dom.data("kendoDatePicker").trigger("change");
});

test("binding enabled to false disables the widget", function() {
    dom = $('<input data-bind="enabled:enabled" data-role="datepicker"/>');
    dom.appendTo(QUnit.fixture);

    var observable = kendo.observable({
        enabled: false
    });

    kendo.bind(dom, observable);

    ok(dom.is(":disabled"));
});

test("binding enabled to true enables the widget", function() {
    dom = $('<input data-bind="enabled:enabled" disabled="disabled" data-role="datepicker" />');
    dom.appendTo(QUnit.fixture);

    var observable = kendo.observable({
        enabled: true
    });

    kendo.bind(dom, observable);

    ok(!dom.is(":disabled"));
});

test("binding disable to true disables the widget", function() {
    dom = $('<input data-bind="disabled:disabled" disabled="disabled" data-role="datepicker" />');
    dom.appendTo(QUnit.fixture);

    var observable = kendo.observable({
        disabled: false
    });

    kendo.bind(dom, observable);

    ok(!dom.is(":disabled"));
});

test("binding disabled to false enables the widget", function() {
    dom = $('<input data-bind="disabled:disabled" data-role="datepicker" />');
    dom.appendTo(QUnit.fixture);

    var observable = kendo.observable({
        disabled: true
    });

    kendo.bind(dom, observable);

    ok(dom.is(":disabled"));
});

test("binding visible to false hides the widget", function() {
    dom = $('<input data-bind="visible:visible" data-role="datepicker"/>');
    dom.appendTo(QUnit.fixture);

    var observable = kendo.observable({
        visible: false
    });

    kendo.bind(dom, observable);

    ok(dom.data("kendoDatePicker").wrapper.css("display") == "none", "Display is 'none'");
});

test("binding visible to true shows the widget", function() {
    dom = $('<input data-bind="visible:visible" data-role="datepicker" style="display:none"/>');
    dom.appendTo(QUnit.fixture);

    var observable = kendo.observable({
        visible: true
    });

    kendo.bind(dom, observable);

    ok(dom.data("kendoDatePicker").wrapper.css("display") != "none", "Display is not 'none'");
});

test("changing visible to false hides the widget", function() {
    dom = $('<input data-bind="visible:visible" data-role="datepicker"/>');
    dom.appendTo(QUnit.fixture);

    var observable = kendo.observable({
        visible: true
    });

    kendo.bind(dom, observable);
    observable.set("visible", false);

    ok(dom.data("kendoDatePicker").wrapper.css("display") == "none", "Display is 'none'");
});

test("changing visible to true shows the widget", function() {
    dom = $('<input data-bind="visible:visible" data-role="datepicker"/>');
    dom.appendTo(QUnit.fixture);

    var observable = kendo.observable({
        visible: false
    });

    kendo.bind(dom, observable);
    observable.set("visible", true);

    ok(dom.data("kendoDatePicker").wrapper.css("display") != "none", "Display is not 'none'");
});

test("binding invisible to true hides the widget", function() {
    dom = $('<input data-bind="invisible:invisible" data-role="datepicker"/>');
    dom.appendTo(QUnit.fixture);

    var observable = kendo.observable({
        invisible: true
    });

    kendo.bind(dom, observable);

    ok(dom.data("kendoDatePicker").wrapper.css("display") == "none", "display is 'none'");
});

test("binding invisible to false shows the widget", function() {
    dom = $('<input data-bind="invisible:invisible" data-role="datepicker" style="display:none"/>');
    dom.appendTo(QUnit.fixture);

    var observable = kendo.observable({
        invisible: false
    });

    kendo.bind(dom, observable);

    ok(dom.data("kendoDatePicker").wrapper.css("display") != "none", "display is not 'none'");
});

test("changing invisible to true hides the widget", function() {
    dom = $('<input data-bind="invisible:invisible" data-role="datepicker"/>');
    dom.appendTo(QUnit.fixture);

    var observable = kendo.observable({
        invisible: false
    });

    kendo.bind(dom, observable);
    observable.set("invisible", true);

    ok(dom.data("kendoDatePicker").wrapper.css("display") == "none", "display is 'none'");
});

test("changing invisible to false shows the widget", function() {
    dom = $('<input data-bind="invisible:invisible" data-role="datepicker"/>');
    dom.appendTo(QUnit.fixture);

    var observable = kendo.observable({
        invisible: true
    });

    kendo.bind(dom, observable);
    observable.set("invisible", false);

    ok(dom.data("kendoDatePicker").wrapper.css("display") != "none", "display is not 'none'");
});

test("binding datepicker initialized before binding does not override change event handler of calendar", 1, function() {
    dom = $('<input data-bind="value: value" />');
    dom.appendTo(QUnit.fixture);

    var value = new Date(2011, 1, 2);
    var observable = kendo.observable({ value: null });
    observable.value = value;

    kendo.bind(dom, observable);

    dom.kendoDatePicker({
        change: function() {
            equal(this, dom.data("kendoDatePicker"));
        }
    });

    dom.data("kendoDatePicker").open();
    dom.data("kendoDatePicker").dateView.calendar.value(new Date(2000, 10, 10));
    dom.data("kendoDatePicker").dateView.calendar.trigger("change");
});

})();
