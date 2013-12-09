(function() {

var Calendar = kendo.ui.Calendar;
var dom;

module("kendo.ui.Calendar MVVM", {
    setup: function() {
        kendo.effects.disable();

        window.change = function() {
            ok(true);
        };
    },
    teardown: function() {
        kendo.effects.enable();
        delete window.change;

        kendo.destroy(dom);
    }
});

test("initializes a calendar when data role is calendar", function() {
    dom = $('<div data-role="calendar"/>');

    kendo.bind(dom);

    ok(dom.data("kendoCalendar") instanceof kendo.ui.Calendar);
});

test("initializes a options from data attributes", function() {
    dom = $('<div data-role="calendar" data-start="year" />');

    kendo.bind(dom);

    var calendar = dom.data("kendoCalendar");

    equal(calendar.options.start, "year");
});

test("initializes value from view model", function() {
    dom = $('<div data-role="calendar" data-bind="value:value" />');
    var value = new Date();

    kendo.bind(dom, { value: value } );

    equal(dom.data("kendoCalendar").value().getTime(), value.getTime());
});

test("initializes a options from data attributes after init of the widget", function() {
    dom = $('<div data-role="calendar" data-format="{0:MM yyyy}" data-start="year" />');
    dom.kendoCalendar();

    kendo.bind(dom);

    var calendar = dom.data("kendoCalendar");

    equal(calendar.options.format, "MM yyyy");
    equal(calendar.options.start, "year");
});

test("changing a value updates the view model", function() {
    dom = $('<div data-role="calendar" data-bind="value:value" />');

    var observable = kendo.observable({ value: null });

    kendo.bind(dom, observable);
    var value = new Date(2011, 1, 2);

    dom.data("kendoCalendar").value(value);
    dom.data("kendoCalendar").trigger("change");

    equal(observable.value.getTime(), value.getTime());
});

test("binding calendar initialized before binding", function() {
    dom = $('<div data-bind="value:value" />');

    var value = new Date(2011, 1, 2);
    var observable = kendo.observable({ value: null });
    observable.value = value;

    dom.kendoCalendar();

    kendo.bind(dom, observable);

    equal(dom.data("kendoCalendar").value().getTime(), value.getTime());
});

test("binding calendar initialized after binding", function() {
    dom = $('<div data-bind="value:value" />');

    var observable = kendo.observable({ value: null });
    var value = new Date(2011, 1, 2);
    observable.value = value;

    kendo.bind(dom, observable);

    dom.kendoCalendar();

    equal(dom.data("kendoCalendar").value().getTime(), value.getTime());
});

test("updating model value updates the UI", function() {
    dom = $('<div data-bind="value:value" />');

    var observable = kendo.observable({ value: value });

    kendo.bind(dom, observable);

    dom.kendoCalendar();

    var value = new Date(2011, 1, 2);
    observable.set("value", value)
    equal(dom.data("kendoCalendar").value().getTime(), value.getTime());
});

test("bindings are removed if element is rebind", 1, function() {
    dom = $('<div data-role="calendar" data-bind="value:value" />');

    var observable = kendo.observable({ value: new Date(2011, 1, 2) });

    kendo.bind(dom, observable);

    var destroy = stub(dom[0].kendoBindingTarget, "destroy");

    kendo.bind(dom, observable);

    equal(destroy.calls("destroy"), 1);
});

test("binding target is destroyed", 1, function() {
    dom = $('<div data-role="calendar" data-bind="value:value"/>');

    var observable = kendo.observable({ value: null });

    kendo.bind(dom, observable);

    var destroy = stub(dom[0].kendoBindingTarget, "destroy");

    kendo.bind(dom, observable);

    equal(destroy.calls("destroy"), 1);
});

test("change event is raised if attached as option", 1, function() {
    dom = $('<div data-role="calendar" data-change="change" />');

    var observable = kendo.observable({
        items: [{text:"foo"}, {text:"bar"}]
    });

    kendo.bind(dom, observable);
    dom.data("kendoCalendar").trigger("change");
});

test("change event is raised if attached as option to a already initialized calendar", 1, function() {
    dom = $('<div data-change="change" />').kendoCalendar();

    var observable = kendo.observable({
        items: [{text:"foo"}, {text:"bar"}]
    });

    kendo.bind(dom, observable);
    dom.data("kendoCalendar").trigger("change");
});

test("binding visible to true shows the calendar", function() {
    dom = $('<div data-role="calendar" data-bind="visible: visible"></div>');

    kendo.bind(dom, { visible: true });

    var calendar = dom.data("kendoCalendar");

    ok(calendar.wrapper.css("display") != "none", "calendar is visible");
});

test("binding visible to false hides the calendar", function() {
    dom = $('<div data-role="calendar" data-bind="visible: visible"></div>');

    kendo.bind(dom, { visible: false });

    var calendar = dom.data("kendoCalendar");

    ok(calendar.wrapper.css("display") == "none", "calendar is not visible");
});

test("binding invisible to true hides the calendar", function() {
    dom = $('<div data-role="calendar" data-bind="invisible: invisible"></div>');

    kendo.bind(dom, { invisible: true });

    var calendar = dom.data("kendoCalendar");

    ok(calendar.wrapper.css("display") == "none", "calendar is invisible");
});

test("binding invisible to false shows the calendar", function() {
    dom = $('<div data-role="calendar" data-bind="invisible: invisible"></div>');

    kendo.bind(dom, { invisible: false });

    var calendar = dom.data("kendoCalendar");

    ok(calendar.wrapper.css("display") != "none", "calendar is not invisible");
});

})();
