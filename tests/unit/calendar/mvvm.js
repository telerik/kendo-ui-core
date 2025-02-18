import '@progress/kendo-ui/src/kendo.calendar.js';
import '@progress/kendo-ui/src/kendo.binder.js';
import { stub } from '../../helpers/unit/stub.js';

let Calendar = kendo.ui.Calendar;
let dom;

describe("kendo.ui.Calendar MVVM", function() {
    beforeEach(function() {


        window.change = function() {
            assert.isOk(true);
        };
    });
    afterEach(function() {

        delete window.change;

        kendo.destroy(dom);
    });

    it("initializes a calendar when data role is calendar", function() {
        dom = $('<div data-role="calendar"/>');

        kendo.bind(dom);

        assert.isOk(dom.data("kendoCalendar") instanceof kendo.ui.Calendar);
    });

    it("initializes a options from data attributes", function() {
        dom = $('<div data-role="calendar" data-start="year" />');

        kendo.bind(dom);

        let calendar = dom.data("kendoCalendar");

        assert.equal(calendar.options.start, "year");
    });

    it("initializes a disabledDates from data attributes", function() {
        dom = $('<div data-role="calendar" data-disable-dates=\'["sa", "su"]\' ></div>');

        kendo.bind(dom);

        let calendar = dom.data("kendoCalendar");

        assert.isOk(calendar.options.disableDates != $.noop);
    });

    it("initializes value from view model", function() {
        dom = $('<div data-role="calendar" data-bind="value:value" />');
        let value = new Date();

        kendo.bind(dom, { value: value });

        assert.equal(dom.data("kendoCalendar").value().getTime(), value.getTime());
    });

    it("initializes a options from data attributes after init of the widget", function() {
        dom = $('<div data-role="calendar" data-format="{0:MM yyyy}" data-start="year" />');
        dom.kendoCalendar();

        kendo.bind(dom);

        let calendar = dom.data("kendoCalendar");

        assert.equal(calendar.options.format, "MM yyyy");
        assert.equal(calendar.options.start, "year");
    });

    it("changing a value updates the view model", function() {
        dom = $('<div data-role="calendar" data-bind="value:value" />');

        let observable = kendo.observable({ value: null });

        kendo.bind(dom, observable);
        let value = new Date(2011, 1, 2);

        dom.data("kendoCalendar").value(value);
        dom.data("kendoCalendar").trigger("change");

        assert.equal(observable.value.getTime(), value.getTime());
    });

    it("binding calendar initialized before binding", function() {
        dom = $('<div data-bind="value:value" />');

        let value = new Date(2011, 1, 2);
        let observable = kendo.observable({ value: null });
        observable.value = value;

        dom.kendoCalendar();

        kendo.bind(dom, observable);

        assert.equal(dom.data("kendoCalendar").value().getTime(), value.getTime());
    });

    it("binding calendar initialized after binding", function() {
        dom = $('<div data-bind="value:value" />');

        let observable = kendo.observable({ value: null });
        let value = new Date(2011, 1, 2);
        observable.value = value;

        kendo.bind(dom, observable);

        dom.kendoCalendar();

        assert.equal(dom.data("kendoCalendar").value().getTime(), value.getTime());
    });

    it("updating model value updates the UI", function() {
        dom = $('<div data-bind="value:value" />');

        let observable = kendo.observable({ value: null });

        kendo.bind(dom, observable);

        dom.kendoCalendar();

        let value = new Date(2011, 1, 2);
        observable.set("value", value);
        assert.equal(dom.data("kendoCalendar").value().getTime(), value.getTime());
    });

    it("bindings are removed if element is rebind", function() {
        dom = $('<div data-role="calendar" data-bind="value:value" />');

        let observable = kendo.observable({ value: new Date(2011, 1, 2) });

        kendo.bind(dom, observable);

        let destroy = stub(dom[0].kendoBindingTarget, "destroy");

        kendo.bind(dom, observable);

        assert.equal(destroy.calls("destroy"), 1);
    });

    it("binding target is destroyed", function() {
        dom = $('<div data-role="calendar" data-bind="value:value"/>');

        let observable = kendo.observable({ value: null });

        kendo.bind(dom, observable);

        let destroy = stub(dom[0].kendoBindingTarget, "destroy");

        kendo.bind(dom, observable);

        assert.equal(destroy.calls("destroy"), 1);
    });

    it("change event is raised if attached as option", function() {
        dom = $('<div data-role="calendar" data-change="change" />');

        let observable = kendo.observable({
            items: [{ text: "foo" }, { text: "bar" }]
        });

        kendo.bind(dom, observable);
        dom.data("kendoCalendar").trigger("change");
    });

    it("change event is raised if attached as option to a already initialized calendar", function() {
        dom = $('<div data-change="change" />').kendoCalendar();

        let observable = kendo.observable({
            items: [{ text: "foo" }, { text: "bar" }]
        });

        kendo.bind(dom, observable);
        dom.data("kendoCalendar").trigger("change");
    });

    it("binding visible to true shows the calendar", function() {
        dom = $('<div data-role="calendar" data-bind="visible: visible"></div>');

        kendo.bind(dom, { visible: true });

        let calendar = dom.data("kendoCalendar");

        assert.isOk(calendar.wrapper.css("display") != "none", "calendar is visible");
    });

    it("binding visible to false hides the calendar", function() {
        dom = $('<div data-role="calendar" data-bind="visible: visible"></div>');

        kendo.bind(dom, { visible: false });

        let calendar = dom.data("kendoCalendar");

        assert.isOk(calendar.wrapper.css("display") == "none", "calendar is not visible");
    });

    it("binding invisible to true hides the calendar", function() {
        dom = $('<div data-role="calendar" data-bind="invisible: invisible"></div>');

        kendo.bind(dom, { invisible: true });

        let calendar = dom.data("kendoCalendar");

        assert.isOk(calendar.wrapper.css("display") == "none", "calendar is invisible");
    });

    it("binding invisible to false shows the calendar", function() {
        dom = $('<div data-role="calendar" data-bind="invisible: invisible"></div>');

        kendo.bind(dom, { invisible: false });

        let calendar = dom.data("kendoCalendar");

        assert.isOk(calendar.wrapper.css("display") != "none", "calendar is not invisible");
    });

});
