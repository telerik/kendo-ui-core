(function() {

var dom;

describe("kendo.ui.Calendar MVVM", function () {
    beforeEach(function() {
        window.change = function() {
            assert.isOk(true);
        };
    });
    afterEach(function() {
        delete window.change;

        kendo.destroy(dom);
    });

it("initializes a datepicker when data role is datepicker", function() {
    dom = $('<input data-role="datepicker"/>');
    dom.appendTo(Mocha.fixture);

    kendo.bind(dom);

    assert.isOk(dom.data("kendoDatePicker") instanceof kendo.ui.DatePicker);
});

it("initializes a options from data attributes", function() {
    dom = $('<input data-role="datepicker" data-start="year" />');
    dom.appendTo(Mocha.fixture);

    kendo.bind(dom);

    var datepicker = dom.data("kendoDatePicker");

    assert.equal(datepicker.options.start, "year");
    assert.equal(datepicker.dateView.options.start, "year");
});

it("initializes a disabledDates from data attributes", function() {
    dom = $('<input data-role="datepicker" data-disable-dates="[\'sa\', \'su\']" />');

    kendo.bind(dom);

    var datepicker = dom.data("kendoDatePicker");

    assert.isOk(datepicker.options.disableDates != $.noop);
});

it("Preserve options after widget init", function() {
    dom = $('<input data-role="datepicker" />');
    dom.appendTo(Mocha.fixture);
    dom.kendoDatePicker({
        start: "decade",
        depth: "decade"
    });

    kendo.bind(dom);

    var datepicker = dom.data("kendoDatePicker");

    assert.equal(datepicker.options.start, "decade");
    assert.equal(datepicker.dateView.options.start, "decade");
});

it("initializes options from data attributes after init of the widget", function() {
    dom = $('<input data-role="datepicker" data-format="{0:MM yyyy}" data-start="year" />');
    dom.appendTo(Mocha.fixture);
    dom.kendoDatePicker();

    kendo.bind(dom);

    var datepicker = dom.data("kendoDatePicker");

    assert.equal(datepicker.options.format, "MM yyyy");
    assert.equal(datepicker.dateView.options.format, "MM yyyy");

    assert.equal(datepicker.options.start, "year");
    assert.equal(datepicker.dateView.options.start, "year");
});

it("initializes min and max options from data attributes", function() {
    dom = $('<input data-role="datepicker" data-min="2000-10-10" data-max="2010-10-10" />');
    dom.appendTo(Mocha.fixture);

    kendo.bind(dom);

    var datepicker = dom.data("kendoDatePicker");

    assert.deepEqual(datepicker.min(), new Date(2000, 9, 10));
    assert.deepEqual(datepicker.max(), new Date(2010, 9, 10));
});

it("initializes min and max options from data attributes after init of the widget", function() {
    dom = $('<input data-role="datepicker" data-min="2000-10-10" data-max="2010-10-10" />');
    dom.appendTo(Mocha.fixture);
    dom.kendoDatePicker();

    kendo.bind(dom);

    var datepicker = dom.data("kendoDatePicker");

    assert.deepEqual(datepicker.min(), new Date(2000, 9, 10));
    assert.deepEqual(datepicker.max(), new Date(2010, 9, 10));
});

it("initializes a parseFormats option from data attributes", function() {
    dom = $('<input data-role="datepicker" data-format="MM yyyy" data-parse-formats="MM/dd/yyyy" />');
    dom.appendTo(Mocha.fixture);

    dom.kendoDatePicker();
    kendo.bind(dom);

    var datepicker = dom.data("kendoDatePicker");

    assert.equal(datepicker.options.parseFormats[0], "MM yyyy");
    assert.equal(datepicker.options.parseFormats[1], "MM/dd/yyyy");
});

it("initializes a parseFormats option from data attribute with array value", function() {
    dom = $('<input data-role="datepicker" data-format="MM yyyy" data-parse-formats=\'["MM/dd/yyyy", "dd/MM/yyyy"]\' />');
    dom.appendTo(Mocha.fixture);

    kendo.bind(dom);

    var datepicker = dom.data("kendoDatePicker");

    assert.equal(datepicker.options.parseFormats[0], "MM yyyy");
    assert.equal(datepicker.options.parseFormats[1], "MM/dd/yyyy");
    assert.equal(datepicker.options.parseFormats[2], "dd/MM/yyyy");
});

it("initializes value from view model", function() {
    dom = $('<input data-role="datepicker" data-bind="value:value" />');
    dom.appendTo(Mocha.fixture);

    var value = new Date();

    kendo.bind(dom, { value: value } );

    assert.equal(dom.data("kendoDatePicker").value().getTime(), value.getTime());
});

it("changing a value updates the view model", function() {
    dom = $('<input data-role="datepicker" data-bind="value:value" />');
    dom.appendTo(Mocha.fixture);

    var observable = kendo.observable({ value: null });

    kendo.bind(dom, observable);
    var value = new Date(2011, 1, 2);

    dom.data("kendoDatePicker").value(value);
    dom.data("kendoDatePicker").trigger("change");

    assert.equal(observable.value.getTime(), value.getTime());
});

it("changing to invalid value does not clear widget", function() {
    dom = $('<input data-role="datepicker" data-bind="value:value" />');
    dom.appendTo(Mocha.fixture);

    var observable = kendo.observable({ value: new Date() });

    kendo.bind(dom, observable);
    dom.val("10/10/0099").focus().blur();

    assert.equal(observable.value, null);
    assert.equal(dom.val(), "10/10/0099");
});

it("binding datepicker initialized before binding", function() {
    dom = $('<input data-bind="value:value" />');
    dom.appendTo(Mocha.fixture);

    var value = new Date(2011, 1, 2);
    var observable = kendo.observable({ value: null });
    observable.value = value;

    dom.kendoDatePicker();

    kendo.bind(dom, observable);

    assert.equal(dom.data("kendoDatePicker").value().getTime(), value.getTime());
});

it("binding datepicker initialized after binding", function() {
    dom = $('<input data-bind="value:value" />');
    dom.appendTo(Mocha.fixture);

    var observable = kendo.observable({ value: null });
    var value = new Date(2011, 1, 2);
    observable.value = value;

    kendo.bind(dom, observable);

    dom.kendoDatePicker();

    assert.equal(dom.data("kendoDatePicker").value().getTime(), value.getTime());
});

it("updating model value updates the UI", function() {
    dom = $('<input data-bind="value:value" />');
    dom.appendTo(Mocha.fixture);

    var observable = kendo.observable({ value: value });

    kendo.bind(dom, observable);

    dom.kendoDatePicker();

    var value = new Date(2011, 1, 2);
    observable.set("value", value)
    assert.equal(dom.data("kendoDatePicker").value().getTime(), value.getTime());
});

it("bindings are removed if element is rebind", function() {
    dom = $('<input data-role="datepicker" data-bind="value:value" />');
    dom.appendTo(Mocha.fixture);

    var observable = kendo.observable({ value: new Date(2011, 1, 2) });

    kendo.bind(dom, observable);

    var destroy = stub(dom[0].kendoBindingTarget, "destroy");

    kendo.bind(dom, observable);

    assert.equal(destroy.calls("destroy"), 1);
});

it("binding target is destroyed", function() {
    dom = $('<input data-role="datepicker" data-bind="value:value"/>');
    dom.appendTo(Mocha.fixture);

    var observable = kendo.observable({ value: null });

    kendo.bind(dom, observable);

    var destroy = stub(dom[0].kendoBindingTarget, "destroy");

    kendo.bind(dom, observable);

    assert.equal(destroy.calls("destroy"), 1);
});

it("dataBound event is raised if attached as option", function() {
    dom = $('<input data-role="datepicker" data-change="change" />');
    dom.appendTo(Mocha.fixture);

    var observable = kendo.observable({
        items: [{text:"foo"}, {text:"bar"}]
    });

    kendo.bind(dom, observable);
    dom.data("kendoDatePicker").trigger("change");
});

it("dataBound event is raised if attached as option to a already initialized datepicker", function() {
    dom = $('<input data-change="change" />').kendoDatePicker();
    dom.appendTo(Mocha.fixture);

    var observable = kendo.observable({
        items: [{text:"foo"}, {text:"bar"}]
    });

    kendo.bind(dom, observable);
    dom.data("kendoDatePicker").trigger("change");
});

it("binding enabled to false disables the widget", function() {
    dom = $('<input data-bind="enabled:enabled" data-role="datepicker"/>');
    dom.appendTo(Mocha.fixture);

    var observable = kendo.observable({
        enabled: false
    });

    kendo.bind(dom, observable);

    assert.isOk(dom.is(":disabled"));
});

it("binding enabled to true enables the widget", function() {
    dom = $('<input data-bind="enabled:enabled" disabled="disabled" data-role="datepicker" />');
    dom.appendTo(Mocha.fixture);

    var observable = kendo.observable({
        enabled: true
    });

    kendo.bind(dom, observable);

    assert.isOk(!dom.is(":disabled"));
});

it("binding disable to true disables the widget", function() {
    dom = $('<input data-bind="disabled:disabled" disabled="disabled" data-role="datepicker" />');
    dom.appendTo(Mocha.fixture);

    var observable = kendo.observable({
        disabled: false
    });

    kendo.bind(dom, observable);

    assert.isOk(!dom.is(":disabled"));
});

it("binding disabled to false enables the widget", function() {
    dom = $('<input data-bind="disabled:disabled" data-role="datepicker" />');
    dom.appendTo(Mocha.fixture);

    var observable = kendo.observable({
        disabled: true
    });

    kendo.bind(dom, observable);

    assert.isOk(dom.is(":disabled"));
});

it("binding visible to false hides the widget", function() {
    dom = $('<input data-bind="visible:visible" data-role="datepicker"/>');
    dom.appendTo(Mocha.fixture);

    var observable = kendo.observable({
        visible: false
    });

    kendo.bind(dom, observable);

    assert.isOk(dom.data("kendoDatePicker").wrapper.css("display") == "none", "Display is 'none'");
});

it("binding visible to true shows the widget", function() {
    dom = $('<input data-bind="visible:visible" data-role="datepicker" style="display:none"/>');
    dom.appendTo(Mocha.fixture);

    var observable = kendo.observable({
        visible: true
    });

    kendo.bind(dom, observable);

    assert.isOk(dom.data("kendoDatePicker").wrapper.css("display") != "none", "Display is not 'none'");
});

it("changing visible to false hides the widget", function() {
    dom = $('<input data-bind="visible:visible" data-role="datepicker"/>');
    dom.appendTo(Mocha.fixture);

    var observable = kendo.observable({
        visible: true
    });

    kendo.bind(dom, observable);
    observable.set("visible", false);

    assert.isOk(dom.data("kendoDatePicker").wrapper.css("display") == "none", "Display is 'none'");
});

it("changing visible to true shows the widget", function() {
    dom = $('<input data-bind="visible:visible" data-role="datepicker"/>');
    dom.appendTo(Mocha.fixture);

    var observable = kendo.observable({
        visible: false
    });

    kendo.bind(dom, observable);
    observable.set("visible", true);

    assert.isOk(dom.data("kendoDatePicker").wrapper.css("display") != "none", "Display is not 'none'");
});

it("binding invisible to true hides the widget", function() {
    dom = $('<input data-bind="invisible:invisible" data-role="datepicker"/>');
    dom.appendTo(Mocha.fixture);

    var observable = kendo.observable({
        invisible: true
    });

    kendo.bind(dom, observable);

    assert.isOk(dom.data("kendoDatePicker").wrapper.css("display") == "none", "display is 'none'");
});

it("binding invisible to false shows the widget", function() {
    dom = $('<input data-bind="invisible:invisible" data-role="datepicker" style="display:none"/>');
    dom.appendTo(Mocha.fixture);

    var observable = kendo.observable({
        invisible: false
    });

    kendo.bind(dom, observable);

    assert.isOk(dom.data("kendoDatePicker").wrapper.css("display") != "none", "display is not 'none'");
});

it("changing invisible to true hides the widget", function() {
    dom = $('<input data-bind="invisible:invisible" data-role="datepicker"/>');
    dom.appendTo(Mocha.fixture);

    var observable = kendo.observable({
        invisible: false
    });

    kendo.bind(dom, observable);
    observable.set("invisible", true);

    assert.isOk(dom.data("kendoDatePicker").wrapper.css("display") == "none", "display is 'none'");
});

it("changing invisible to false shows the widget", function() {
    dom = $('<input data-bind="invisible:invisible" data-role="datepicker"/>');
    dom.appendTo(Mocha.fixture);

    var observable = kendo.observable({
        invisible: true
    });

    kendo.bind(dom, observable);
    observable.set("invisible", false);

    assert.isOk(dom.data("kendoDatePicker").wrapper.css("display") != "none", "display is not 'none'");
});

it("binding datepicker initialized before binding does not override change event handler of calendar", function() {
    dom = $('<input data-bind="value: value" />');
    dom.appendTo(Mocha.fixture);

    var value = new Date(2011, 1, 2);
    var observable = kendo.observable({ value: null });
    observable.value = value;

    kendo.bind(dom, observable);

    dom.kendoDatePicker({
        change: function() {
            assert.equal(this, dom.data("kendoDatePicker"));
        }
    });

    dom.data("kendoDatePicker").open();
    dom.data("kendoDatePicker").dateView.calendar.value(new Date(2000, 10, 10));
    dom.data("kendoDatePicker").dateView.calendar.trigger("change");
});

    });
}());
