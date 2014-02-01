(function() {

var dom;

module("DateTimePicker mvvm", {
  setup: function() {
      window.change = function() {
          ok(true);
      }
  },
  teardown: function() {
      delete window.change;
      kendo.destroy(dom);
      kendo.destroy(QUnit.fixture);
  }
});

test("initializes a datetimepicker when data role is datetimepicker", function() {
    dom = $('<input data-role="datetimepicker"/>');

    kendo.bind(dom);

    ok(dom.data("kendoDateTimePicker") instanceof kendo.ui.DateTimePicker);
});

test("initializes a options from data attributes", function() {
    dom = $('<input data-role="datetimepicker" data-start="year" />');

    kendo.bind(dom);

    var datetimepicker = dom.data("kendoDateTimePicker");

    equal(datetimepicker.options.start, "year");
    equal(datetimepicker.dateView.options.start, "year");
});

test("initializes min and max options from data attributes", function() {
    dom = $('<input data-role="datetimepicker" data-min="2000-10-10T10:00" data-max="2010-10-10T20:00" />');
    dom.appendTo(QUnit.fixture);

    kendo.bind(dom);

    var datetimepicker = dom.data("kendoDateTimePicker");

    deepEqual(datetimepicker.min(), new Date(2000, 9, 10, 10));
    deepEqual(datetimepicker.max(), new Date(2010, 9, 10, 20));
});

test("initializes min and max options from data attributes after init of the widget", function() {
    dom = $('<input data-role="datetimepicker" data-min="2000-10-10T10:00" data-max="2010-10-10T20:00" />');
    dom.appendTo(QUnit.fixture);
    dom.kendoDateTimePicker();

    kendo.bind(dom);

    var datetimepicker = dom.data("kendoDateTimePicker");

    deepEqual(datetimepicker.min(), new Date(2000, 9, 10, 10));
    deepEqual(datetimepicker.max(), new Date(2010, 9, 10, 20));
});

test("Preserve options after widget init", function() {
    dom = $('<input data-role="datetimepicker" />');
    dom.kendoDateTimePicker({
        start: "decade",
        depth: "decade"
    });

    kendo.bind(dom);

    var datetimepicker = dom.data("kendoDateTimePicker");

    equal(datetimepicker.options.start, "decade");
    equal(datetimepicker.dateView.options.start, "decade");
});

test("Preserve specific options of the views", function() {
    dom = $('<input data-role="datetimepicker" />');

    var change = function() { },
        close = function() { },
        open = function() { };

    dom.kendoDateTimePicker({
        format: "dd/MM/yyyy H:mm",
        timeFormat: "H:mm",
        change: change,
        close: close,
        open: open
    });

    kendo.bind(dom);

    var datetimepicker = dom.data("kendoDateTimePicker");

    equal(datetimepicker.options.format, "dd/MM/yyyy H:mm");
    equal(datetimepicker.options.timeFormat, "H:mm");

    notEqual(datetimepicker.dateView.options.change, change);
    notEqual(datetimepicker.dateView.options.close, close);
    notEqual(datetimepicker.dateView.options.open, open);

    equal(datetimepicker.timeView.options.format, "H:mm");
    notEqual(datetimepicker.timeView.options.change, change);
    notEqual(datetimepicker.timeView.options.close, close);
    notEqual(datetimepicker.timeView.options.open, open);
});

test("initializes a options from data attributes after init of the widget", function() {
    dom = $('<input data-role="datetimepicker" data-format="{0:MM yyyy hh:mm}" data-start="year" />');
    dom.kendoDateTimePicker();

    kendo.bind(dom);

    var datetimepicker = dom.data("kendoDateTimePicker");

    equal(datetimepicker.options.format, "MM yyyy hh:mm");
    equal(datetimepicker.dateView.options.format, "MM yyyy hh:mm");

    equal(datetimepicker.options.start, "year");
    equal(datetimepicker.dateView.options.start, "year");
});

test("initializes a parseFormats option from data attribute with array value", function() {
    dom = $('<input data-role="datetimepicker" data-format="MM yyyy" data-parse-formats=\'["MM/dd/yyyy", "dd/MM/yyyy"]\' />');
    dom.kendoDateTimePicker();

    kendo.bind(dom);

    var datetimepicker = dom.data("kendoDateTimePicker");

    equal(datetimepicker.options.parseFormats[0], "MM yyyy");
    equal(datetimepicker.options.parseFormats[1], datetimepicker.options.timeFormat);
    equal(datetimepicker.options.parseFormats[2], "MM/dd/yyyy");
    equal(datetimepicker.options.parseFormats[3], "dd/MM/yyyy");
});

test("initializes value from view model", function() {
    dom = $('<input data-role="datetimepicker" data-bind="value:value" />');
    var value = new Date();

    kendo.bind(dom, { value: value } );

    equal(dom.data("kendoDateTimePicker").value().getTime(), value.getTime());
});

test("changing a value updates the view model", function() {
    dom = $('<input data-role="datetimepicker" data-bind="value:value" />');

    var observable = kendo.observable({ value: null });

    kendo.bind(dom, observable);
    var value = new Date(2011, 1, 2);

    dom.data("kendoDateTimePicker").value(value);
    dom.data("kendoDateTimePicker").trigger("change");

    equal(observable.value.getTime(), value.getTime());
});

test("binding datetimepicker initialized before binding", function() {
    dom = $('<input data-bind="value:value" />');

    var value = new Date(2011, 1, 2);
    var observable = kendo.observable({ value: null });
    observable.value = value;

    dom.kendoDateTimePicker();

    kendo.bind(dom, observable);

    equal(dom.data("kendoDateTimePicker").value().getTime(), value.getTime());
});

test("binding datetimepicker initialized after binding", function() {
    dom = $('<input data-bind="value:value" />');

    var observable = kendo.observable({ value: null });
    var value = new Date(2011, 1, 2);
    observable.value = value;

    kendo.bind(dom, observable);

    dom.kendoDateTimePicker();

    equal(dom.data("kendoDateTimePicker").value().getTime(), value.getTime());
});

test("updating model value updates the UI", function() {
    dom = $('<input data-bind="value:value" />');

    var observable = kendo.observable({ value: value });

    kendo.bind(dom, observable);

    dom.kendoDateTimePicker();

    var value = new Date(2011, 1, 2);
    observable.set("value", value)
    equal(dom.data("kendoDateTimePicker").value().getTime(), value.getTime());
});

test("bindings are removed if element is rebind", 1, function() {
    dom = $('<input data-role="datetimepicker" data-bind="value:value" />');

    var observable = kendo.observable({ value: new Date(2011, 1, 2) });

    kendo.bind(dom, observable);

    var destroy = stub(dom[0].kendoBindingTarget, "destroy");

    kendo.bind(dom, observable);

    equal(destroy.calls("destroy"), 1);
});

test("binding target is destroyed", 1, function() {
    dom = $('<input data-role="datetimepicker" data-bind="value:value"/>');

    var observable = kendo.observable({ value: null });

    kendo.bind(dom, observable);

    var destroy = stub(dom[0].kendoBindingTarget, "destroy");

    kendo.bind(dom, observable);

    equal(destroy.calls("destroy"), 1);
});

test("change event is raised if attached as option", 1, function() {
    dom = $('<input data-role="datetimepicker" data-change="change" />');

    var observable = kendo.observable({
        items: [{text:"foo"}, {text:"bar"}]
    });

    kendo.bind(dom, observable);
    dom.data("kendoDateTimePicker").trigger("change");
});

test("change event is raised if attached as option to a already initialized datetimepicker", 1, function() {
    dom = $('<input data-change="change" />').kendoDateTimePicker();

    var observable = kendo.observable({
        items: [{text:"foo"}, {text:"bar"}]
    });

    kendo.bind(dom, observable);
    dom.data("kendoDateTimePicker").trigger("change");
});

test("binding enabled to false disables the widget", function() {
    dom = $('<input data-bind="enabled:enabled" data-role="datetimepicker"/>');

    var observable = kendo.observable({
        enabled: false
    });

    kendo.bind(dom, observable);

    ok(dom.is(":disabled"));
});

test("binding enabled to true enables the widget", function() {
    dom = $('<input data-bind="enabled:enabled" disabled="disabled" data-role="datetimepicker" />');

    var observable = kendo.observable({
        enabled: true
    });

    kendo.bind(dom, observable);

    ok(!dom.is(":disabled"));
});

test("binding disable to true disables the widget", function() {
    dom = $('<input data-bind="disabled:disabled" disabled="disabled" data-role="datetimepicker" />');

    var observable = kendo.observable({
        disabled: false
    });

    kendo.bind(dom, observable);

    ok(!dom.is(":disabled"));
});

test("binding disabled to false enables the widget", function() {
    dom = $('<input data-bind="disabled:disabled" data-role="datetimepicker" />');

    var observable = kendo.observable({
        disabled: true
    });

    kendo.bind(dom, observable);

    ok(dom.is(":disabled"));
});

test("binding visible to false hides the widget", function() {
    dom = $('<input data-bind="visible:visible" data-role="datetimepicker"/>');

    var observable = kendo.observable({
        visible: false
    });

    kendo.bind(dom, observable);

    ok(dom.data("kendoDateTimePicker").wrapper.css("display") == "none", "Display is 'none'");
});

test("binding visible to true shows the widget", function() {
    dom = $('<input data-bind="visible:visible" data-role="datetimepicker" style="display:none"/>');

    var observable = kendo.observable({
        visible: true
    });

    kendo.bind(dom, observable);

    ok(dom.data("kendoDateTimePicker").wrapper.css("display") != "none", "Display is not 'none'");
});

test("changing visible to false hides the widget", function() {
    dom = $('<input data-bind="visible:visible" data-role="datetimepicker"/>');

    var observable = kendo.observable({
        visible: true
    });

    kendo.bind(dom, observable);
    observable.set("visible", false);

    ok(dom.data("kendoDateTimePicker").wrapper.css("display") == "none", "Display is 'none'");
});

test("changing visible to true shows the widget", function() {
    dom = $('<input data-bind="visible:visible" data-role="datetimepicker"/>');

    var observable = kendo.observable({
        visible: false
    });

    kendo.bind(dom, observable);
    observable.set("visible", true);

    ok(dom.data("kendoDateTimePicker").wrapper.css("display") != "none", "Display is not 'none'");
});

test("binding invisible to true hides the widget", function() {
    dom = $('<input data-bind="invisible:invisible" data-role="datetimepicker"/>');

    var observable = kendo.observable({
        invisible: true
    });

    kendo.bind(dom, observable);

    ok(dom.data("kendoDateTimePicker").wrapper.css("display") == "none", "display is 'none'");
});

test("binding invisible to false shows the widget", function() {
    dom = $('<input data-bind="invisible:invisible" data-role="datetimepicker" style="display:none"/>');

    var observable = kendo.observable({
        invisible: false
    });

    kendo.bind(dom, observable);

    ok(dom.data("kendoDateTimePicker").wrapper.css("display") != "none", "display is not 'none'");
});

test("changing invisible to true hides the widget", function() {
    dom = $('<input data-bind="invisible:invisible" data-role="datetimepicker"/>');

    var observable = kendo.observable({
        invisible: false
    });

    kendo.bind(dom, observable);
    observable.set("invisible", true);

    ok(dom.data("kendoDateTimePicker").wrapper.css("display") == "none", "display is 'none'");
});

test("changing invisible to false shows the widget", function() {
    dom = $('<input data-bind="invisible:invisible" data-role="datetimepicker"/>');

    var observable = kendo.observable({
        invisible: true
    });

    kendo.bind(dom, observable);
    observable.set("invisible", false);

    ok(dom.data("kendoDateTimePicker").wrapper.css("display") != "none", "display is not 'none'");
});

test("binding datetimepicker initialized before binding does not override change of calendar", 1, function() {
    dom = $('<input data-bind="value: value" />');

    var observable = kendo.observable({ value: null });

    kendo.bind(dom, observable);

    dom.kendoDateTimePicker({
        change: function() {
            equal(this, dom.data("kendoDateTimePicker"));
        }
    });

    dom.data("kendoDateTimePicker").open("date");
    dom.data("kendoDateTimePicker").dateView.calendar.value(new Date());
    dom.data("kendoDateTimePicker").dateView.calendar.trigger("change");
});

test("binding datetimepicker initialized before binding does not override change of timeView", 1, function() {
    dom = $('<input data-bind="value: value" />');

    var observable = kendo.observable({ value: null });

    kendo.bind(dom, observable);

    dom.kendoDateTimePicker({
        change: function() {
            equal(this, dom.data("kendoDateTimePicker"));
        }
    });

    dom.data("kendoDateTimePicker").open("time");
    dom.data("kendoDateTimePicker").timeView.options.change("2:00 AM", true);
});

})();
