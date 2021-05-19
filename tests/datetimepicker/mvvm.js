(function() {

    var dom;

    describe("DateTimePicker mvvm", function() {
        beforeEach(function() {
            window.change = function() {
                assert.isOk(true);
            }
        });
        afterEach(function() {
            delete window.change;
            kendo.destroy(dom);
            kendo.destroy(Mocha.fixture);
        });

        it("initializes a datetimepicker when data role is datetimepicker", function() {
            dom = $('<input data-role="datetimepicker"/>');

            kendo.bind(dom);

            assert.isOk(dom.data("kendoDateTimePicker") instanceof kendo.ui.DateTimePicker);
        });

        it("initializes a options from data attributes", function() {
            dom = $('<input data-role="datetimepicker" data-start="year" />');

            kendo.bind(dom);

            var datetimepicker = dom.data("kendoDateTimePicker");

            assert.equal(datetimepicker.options.start, "year");
            assert.equal(datetimepicker.dateView.options.start, "year");
        });

        it("initializes a disabledDates from data attributes", function() {
            dom = $('<input data-role="datetimepicker" data-disable-dates="[\'sa\', \'su\']" />');

            kendo.bind(dom);

            var datetimepicker = dom.data("kendoDateTimePicker");

            assert.isOk(datetimepicker.options.disableDates != $.noop);
        });

        it("initializes min and max options from data attributes", function() {
            dom = $('<input data-role="datetimepicker" data-min="2000-10-10T10:00" data-max="2010-10-10T20:00" />');
            dom.appendTo(Mocha.fixture);

            kendo.bind(dom);

            var datetimepicker = dom.data("kendoDateTimePicker");

            assert.deepEqual(datetimepicker.min(), new Date(2000, 9, 10, 10));
            assert.deepEqual(datetimepicker.max(), new Date(2010, 9, 10, 20));
        });

        it("initializes min and max options from data attributes after init of the widget", function() {
            dom = $('<input data-role="datetimepicker" data-min="2000-10-10T10:00" data-max="2010-10-10T20:00" />');
            dom.appendTo(Mocha.fixture);
            dom.kendoDateTimePicker();

            kendo.bind(dom);

            var datetimepicker = dom.data("kendoDateTimePicker");

            assert.deepEqual(datetimepicker.min(), new Date(2000, 9, 10, 10));
            assert.deepEqual(datetimepicker.max(), new Date(2010, 9, 10, 20));
        });

        it("Preserve options after widget init", function() {
            dom = $('<input data-role="datetimepicker" />');
            dom.kendoDateTimePicker({
                start: "decade",
                depth: "decade"
            });

            kendo.bind(dom);

            var datetimepicker = dom.data("kendoDateTimePicker");

            assert.equal(datetimepicker.options.start, "decade");
            assert.equal(datetimepicker.dateView.options.start, "decade");
        });

        it("Preserve specific options of the views", function() {
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

            assert.equal(datetimepicker.options.format, "dd/MM/yyyy H:mm");
            assert.equal(datetimepicker.options.timeFormat, "H:mm");

            assert.notEqual(datetimepicker.dateView.options.change, change);
            assert.notEqual(datetimepicker.dateView.options.close, close);
            assert.notEqual(datetimepicker.dateView.options.open, open);

            assert.equal(datetimepicker.timeView.options.format, "H:mm");
            assert.notEqual(datetimepicker.timeView.options.change, change);
            assert.notEqual(datetimepicker.timeView.options.close, close);
            assert.notEqual(datetimepicker.timeView.options.open, open);
        });

        it("initializes a options from data attributes after init of the widget", function() {
            dom = $('<input data-role="datetimepicker" data-format="{0:MM yyyy hh:mm}" data-start="year" />');
            dom.kendoDateTimePicker();

            kendo.bind(dom);

            var datetimepicker = dom.data("kendoDateTimePicker");

            assert.equal(datetimepicker.options.format, "MM yyyy hh:mm");
            assert.equal(datetimepicker.dateView.options.format, "MM yyyy hh:mm");

            assert.equal(datetimepicker.options.start, "year");
            assert.equal(datetimepicker.dateView.options.start, "year");
        });

        it("initializes a parseFormats option from data attribute with array value", function() {
            dom = $('<input data-role="datetimepicker" data-format="MM yyyy" data-parse-formats=\'["MM/dd/yyyy", "dd/MM/yyyy"]\' />');
            dom.kendoDateTimePicker();

            kendo.bind(dom);

            var datetimepicker = dom.data("kendoDateTimePicker");

            assert.equal(datetimepicker.options.parseFormats[0], "MM yyyy");
            assert.equal(datetimepicker.options.parseFormats[3], datetimepicker.options.timeFormat);
            assert.equal(datetimepicker.options.parseFormats[1], "MM/dd/yyyy");
            assert.equal(datetimepicker.options.parseFormats[2], "dd/MM/yyyy");
        });

        it("initializes value from view model", function() {
            dom = $('<input data-role="datetimepicker" data-bind="value:value" />');
            var value = new Date();

            kendo.bind(dom, { value: value });

            assert.equal(dom.data("kendoDateTimePicker").value().getTime(), value.getTime());
        });

        it("changing a value updates the view model", function() {
            dom = $('<input data-role="datetimepicker" data-bind="value:value" />');

            var observable = kendo.observable({ value: null });

            kendo.bind(dom, observable);
            var value = new Date(2011, 1, 2);

            dom.data("kendoDateTimePicker").value(value);
            dom.data("kendoDateTimePicker").trigger("change");

            assert.equal(observable.value.getTime(), value.getTime());
        });

        it("binding datetimepicker initialized before binding", function() {
            dom = $('<input data-bind="value:value" />');

            var value = new Date(2011, 1, 2);
            var observable = kendo.observable({ value: null });
            observable.value = value;

            dom.kendoDateTimePicker();

            kendo.bind(dom, observable);

            assert.equal(dom.data("kendoDateTimePicker").value().getTime(), value.getTime());
        });

        it("binding datetimepicker initialized after binding", function() {
            dom = $('<input data-bind="value:value" />');

            var observable = kendo.observable({ value: null });
            var value = new Date(2011, 1, 2);
            observable.value = value;

            kendo.bind(dom, observable);

            dom.kendoDateTimePicker();

            assert.equal(dom.data("kendoDateTimePicker").value().getTime(), value.getTime());
        });

        it("updating model value updates the UI", function() {
            dom = $('<input data-bind="value:value" />');

            var observable = kendo.observable({ value: value });

            kendo.bind(dom, observable);

            dom.kendoDateTimePicker();

            var value = new Date(2011, 1, 2);
            observable.set("value", value)
            assert.equal(dom.data("kendoDateTimePicker").value().getTime(), value.getTime());
        });

        it("bindings are removed if element is rebind", function() {
            dom = $('<input data-role="datetimepicker" data-bind="value:value" />');

            var observable = kendo.observable({ value: new Date(2011, 1, 2) });

            kendo.bind(dom, observable);

            var destroy = stub(dom[0].kendoBindingTarget, "destroy");

            kendo.bind(dom, observable);

            assert.equal(destroy.calls("destroy"), 1);
        });

        it("binding target is destroyed", function() {
            dom = $('<input data-role="datetimepicker" data-bind="value:value"/>');

            var observable = kendo.observable({ value: null });

            kendo.bind(dom, observable);

            var destroy = stub(dom[0].kendoBindingTarget, "destroy");

            kendo.bind(dom, observable);

            assert.equal(destroy.calls("destroy"), 1);
        });

        it("change event is raised if attached as option", function() {
            dom = $('<input data-role="datetimepicker" data-change="change" />');

            var observable = kendo.observable({
                items: [{ text: "foo" }, { text: "bar" }]
            });

            kendo.bind(dom, observable);
            dom.data("kendoDateTimePicker").trigger("change");
        });

        it("change event is raised if attached as option to a already initialized datetimepicker", function() {
            dom = $('<input data-change="change" />').kendoDateTimePicker();

            var observable = kendo.observable({
                items: [{ text: "foo" }, { text: "bar" }]
            });

            kendo.bind(dom, observable);
            dom.data("kendoDateTimePicker").trigger("change");
        });

        it("binding enabled to false disables the widget", function() {
            dom = $('<input data-bind="enabled:enabled" data-role="datetimepicker"/>');

            var observable = kendo.observable({
                enabled: false
            });

            kendo.bind(dom, observable);

            assert.isOk(dom.is(":disabled"));
        });

        it("binding enabled to true enables the widget", function() {
            dom = $('<input data-bind="enabled:enabled" disabled="disabled" data-role="datetimepicker" />');

            var observable = kendo.observable({
                enabled: true
            });

            kendo.bind(dom, observable);

            assert.isOk(!dom.is(":disabled"));
        });

        it("binding disable to true disables the widget", function() {
            dom = $('<input data-bind="disabled:disabled" disabled="disabled" data-role="datetimepicker" />');

            var observable = kendo.observable({
                disabled: false
            });

            kendo.bind(dom, observable);

            assert.isOk(!dom.is(":disabled"));
        });

        it("binding disabled to false enables the widget", function() {
            dom = $('<input data-bind="disabled:disabled" data-role="datetimepicker" />');

            var observable = kendo.observable({
                disabled: true
            });

            kendo.bind(dom, observable);

            assert.isOk(dom.is(":disabled"));
        });

        it("binding visible to false hides the widget", function() {
            dom = $('<input data-bind="visible:visible" data-role="datetimepicker"/>');

            var observable = kendo.observable({
                visible: false
            });

            kendo.bind(dom, observable);

            assert.isOk(dom.data("kendoDateTimePicker").wrapper.css("display") == "none", "Display is 'none'");
        });

        it("binding visible to true shows the widget", function() {
            dom = $('<input data-bind="visible:visible" data-role="datetimepicker" style="display:none"/>');

            var observable = kendo.observable({
                visible: true
            });

            kendo.bind(dom, observable);

            assert.isOk(dom.data("kendoDateTimePicker").wrapper.css("display") != "none", "Display is not 'none'");
        });

        it("changing visible to false hides the widget", function() {
            dom = $('<input data-bind="visible:visible" data-role="datetimepicker"/>');

            var observable = kendo.observable({
                visible: true
            });

            kendo.bind(dom, observable);
            observable.set("visible", false);

            assert.isOk(dom.data("kendoDateTimePicker").wrapper.css("display") == "none", "Display is 'none'");
        });

        it("changing visible to true shows the widget", function() {
            dom = $('<input data-bind="visible:visible" data-role="datetimepicker"/>');

            var observable = kendo.observable({
                visible: false
            });

            kendo.bind(dom, observable);
            observable.set("visible", true);

            assert.isOk(dom.data("kendoDateTimePicker").wrapper.css("display") != "none", "Display is not 'none'");
        });

        it("binding invisible to true hides the widget", function() {
            dom = $('<input data-bind="invisible:invisible" data-role="datetimepicker"/>');

            var observable = kendo.observable({
                invisible: true
            });

            kendo.bind(dom, observable);

            assert.isOk(dom.data("kendoDateTimePicker").wrapper.css("display") == "none", "display is 'none'");
        });

        it("binding invisible to false shows the widget", function() {
            dom = $('<input data-bind="invisible:invisible" data-role="datetimepicker" style="display:none"/>');

            var observable = kendo.observable({
                invisible: false
            });

            kendo.bind(dom, observable);

            assert.isOk(dom.data("kendoDateTimePicker").wrapper.css("display") != "none", "display is not 'none'");
        });

        it("changing invisible to true hides the widget", function() {
            dom = $('<input data-bind="invisible:invisible" data-role="datetimepicker"/>');

            var observable = kendo.observable({
                invisible: false
            });

            kendo.bind(dom, observable);
            observable.set("invisible", true);

            assert.isOk(dom.data("kendoDateTimePicker").wrapper.css("display") == "none", "display is 'none'");
        });

        it("changing invisible to false shows the widget", function() {
            dom = $('<input data-bind="invisible:invisible" data-role="datetimepicker"/>');

            var observable = kendo.observable({
                invisible: true
            });

            kendo.bind(dom, observable);
            observable.set("invisible", false);

            assert.isOk(dom.data("kendoDateTimePicker").wrapper.css("display") != "none", "display is not 'none'");
        });

        it("binding datetimepicker initialized before binding does not override change of calendar", function() {
            dom = $('<input data-bind="value: value" />');

            var observable = kendo.observable({ value: null });

            kendo.bind(dom, observable);

            dom.kendoDateTimePicker({
                change: function() {
                    assert.equal(this, dom.data("kendoDateTimePicker"));
                }
            });

            dom.data("kendoDateTimePicker").open("date");
            dom.data("kendoDateTimePicker").dateView.calendar.value(new Date());
            dom.data("kendoDateTimePicker").dateView.calendar.trigger("change");
        });

        it("binding datetimepicker initialized before binding does not override change of timeView", function() {
            dom = $('<input data-bind="value: value" />');

            var observable = kendo.observable({ value: null });

            kendo.bind(dom, observable);

            dom.kendoDateTimePicker({
                change: function() {
                    assert.equal(this, dom.data("kendoDateTimePicker"));
                }
            });

            dom.data("kendoDateTimePicker").open("time");
            dom.data("kendoDateTimePicker").timeView.options.change("2:00 AM", true);
        });

    });
}());
