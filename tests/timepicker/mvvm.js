(function() {
    var dom;
    describe('timepicker MVVM', function() {
        beforeEach(function() {

            window.timePickerChange = function() {
                assert.isOk(true);
            }

        });
        afterEach(function() {
            kendo.destroy(dom);
        });
        it("initializes a timepicker when data role is timepicker", function() {
            dom = $('<input data-role="timepicker"/>');

            kendo.bind(dom);

            assert.isOk(dom.data("kendoTimePicker") instanceof kendo.ui.TimePicker);
        });

        it("initializes a options from data attributes", function() {
            dom = $('<input data-role="timepicker" data-interval="15" />');

            kendo.bind(dom);

            var timepicker = dom.data("kendoTimePicker");

            assert.equal(timepicker.options.interval, "15");
            assert.equal(timepicker.timeView.options.interval, "15");
        });

        it("initializes value from view model", function() {
            dom = $('<input data-role="timepicker" data-bind="value:value" />');
            var value = new Date();

            kendo.bind(dom, { value: value });

            assert.equal(dom.data("kendoTimePicker").value().getTime(), value.getTime());
        });

        it("initializes a options from data attributes after init of the widget", function() {
            dom = $('<input data-role="timepicker" data-format="{0:hh:mm}" />');
            dom.kendoTimePicker();

            kendo.bind(dom);

            var timepicker = dom.data("kendoTimePicker");

            assert.equal(timepicker.options.format, "hh:mm");
            assert.equal(timepicker.timeView.options.format, "hh:mm");
        });

        it("initializes min and max options from data attributes", function() {
            dom = $('<input data-role="timepicker" data-min="09:00" data-max="21:30" />');
            dom.appendTo(Mocha.fixture);

            kendo.bind(dom);

            var timepicker = dom.data("kendoTimePicker");
            var min = kendo.date.today();
            var max = kendo.date.today();

            min.setHours(9, 0, 0);
            max.setHours(21, 30, 0);

            assert.deepEqual(timepicker.min(), min);
            assert.deepEqual(timepicker.max(), max);
        });

        it("initializes min and max options from data attributes after init of the widget", function() {
            dom = $('<input data-role="timepicker" data-min="09:00" data-max="21:30" />');
            dom.appendTo(Mocha.fixture);
            dom.kendoTimePicker();

            kendo.bind(dom);

            var timepicker = dom.data("kendoTimePicker");
            var min = kendo.date.today();
            var max = kendo.date.today();

            min.setHours(9, 0, 0);
            max.setHours(21, 30, 0);

            assert.deepEqual(timepicker.min(), min);
            assert.deepEqual(timepicker.max(), max);
        });

        it("Preserve options after widget init", function() {
            dom = $('<input data-role="timepicker" />');
            dom.kendoTimePicker({
                format: "HH:mm"
            });

            kendo.bind(dom);

            var timepicker = dom.data("kendoTimePicker");

            assert.equal(timepicker.options.format, "HH:mm");
            assert.equal(timepicker.timeView.options.format, "HH:mm");
        });

        it("initializes a parseFormats option from data attributes", function() {
            dom = $('<input data-role="timepicker" data-format="MM yyyy" data-parse-formats="MM/dd/yyyy" />');

            dom.kendoTimePicker();

            kendo.bind(dom);

            var timepicker = dom.data("kendoTimePicker");

            assert.equal(timepicker.options.parseFormats[0], "MM yyyy");
            assert.equal(timepicker.options.parseFormats[1], "MM/dd/yyyy");
        });

        it("initializes a parseFormats option from data attribute with array value", function() {
            dom = $('<input data-role="timepicker" data-format="MM yyyy" data-parse-formats=\'["MM/dd/yyyy", "dd/MM/yyyy"]\' />');

            dom.kendoTimePicker();

            kendo.bind(dom);

            var timepicker = dom.data("kendoTimePicker");

            assert.equal(timepicker.options.parseFormats[0], "MM yyyy");
            assert.equal(timepicker.options.parseFormats[1], "MM/dd/yyyy");
            assert.equal(timepicker.options.parseFormats[2], "dd/MM/yyyy");
        });

        it("changing a value updates the view model", function() {
            dom = $('<input data-role="timepicker" data-bind="value:value" />');

            var observable = kendo.observable({ value: null });

            kendo.bind(dom, observable);
            var value = new Date(2011, 1, 2);

            dom.data("kendoTimePicker").value(value);
            dom.data("kendoTimePicker").trigger("change");

            assert.equal(observable.value.getTime(), value.getTime());
        });

        it("binding timepicker initialized before binding", function() {
            dom = $('<input data-bind="value:value" />');

            var value = new Date(2011, 1, 2);
            var observable = kendo.observable({ value: null });
            observable.value = value;

            dom.kendoTimePicker();

            kendo.bind(dom, observable);

            assert.equal(dom.data("kendoTimePicker").value().getTime(), value.getTime());
        });

        it("binding timepicker initialized after binding", function() {
            dom = $('<input data-bind="value:value" />');

            var observable = kendo.observable({ value: null });
            var value = new Date(2011, 1, 2);
            observable.value = value;

            kendo.bind(dom, observable);

            dom.kendoTimePicker();

            assert.equal(dom.data("kendoTimePicker").value().getTime(), value.getTime());
        });

        it("updating model value updates the UI", function() {
            dom = $('<input data-bind="value:value" />');

            var observable = kendo.observable({ value: value });

            kendo.bind(dom, observable);

            dom.kendoTimePicker();

            var value = new Date(2011, 1, 2);
            observable.set("value", value)
            assert.equal(dom.data("kendoTimePicker").value().getTime(), value.getTime());
        });

        it("bindings are removed if element is rebind", function() {
            dom = $('<input data-role="timepicker" data-bind="value:value" />');

            var observable = kendo.observable({ value: new Date(2011, 1, 2) });

            kendo.bind(dom, observable);

            var destroy = stub(dom[0].kendoBindingTarget, "destroy");

            kendo.bind(dom, observable);

            assert.equal(destroy.calls("destroy"), 1);
        });

        it("change event is raised if attached as option", function() {
            dom = $('<input data-role="timepicker" data-change="timePickerChange" />');

            var observable = kendo.observable();

            kendo.bind(dom, observable);
            dom.data("kendoTimePicker").trigger("change");
        });

        it("change event is raised if attached as option to a already initialized timepicker", function() {
            dom = $('<input data-change="timePickerChange" />').kendoTimePicker();

            var observable = kendo.observable();

            kendo.bind(dom, observable);
            dom.data("kendoTimePicker").trigger("change");
        });

        it("binding enabled to false disables the widget", function() {
            dom = $('<input data-bind="enabled:enabled" data-role="timepicker"/>');

            var observable = kendo.observable({
                enabled: false
            });

            kendo.bind(dom, observable);

            assert.isOk(dom.is(":disabled"));
        });

        it("binding enabled to true enables the widget", function() {
            dom = $('<input data-bind="enabled:enabled" disabled="disabled" data-role="timepicker" />');

            var observable = kendo.observable({
                enabled: true
            });

            kendo.bind(dom, observable);

            assert.isOk(!dom.is(":disabled"));
        });

        it("binding disable to true disables the widget", function() {
            dom = $('<input data-bind="disabled:disabled" disabled="disabled" data-role="timepicker" />');

            var observable = kendo.observable({
                disabled: false
            });

            kendo.bind(dom, observable);

            assert.isOk(!dom.is(":disabled"));
        });

        it("binding disabled to false enables the widget", function() {
            dom = $('<input data-bind="disabled:disabled" data-role="timepicker" />');

            var observable = kendo.observable({
                disabled: true
            });

            kendo.bind(dom, observable);

            assert.isOk(dom.is(":disabled"));
        });

        it("binding visible to false hides the widget", function() {
            dom = $('<input data-bind="visible:visible" data-role="timepicker"/>');

            var observable = kendo.observable({
                visible: false
            });

            kendo.bind(dom, observable);

            assert.isOk(dom.data("kendoTimePicker").wrapper.css("display") == "none", "Display is 'none'");
        });

        it("binding visible to true shows the widget", function() {
            dom = $('<input data-bind="visible:visible" data-role="timepicker" style="display:none"/>');

            var observable = kendo.observable({
                visible: true
            });

            kendo.bind(dom, observable);

            assert.isOk(dom.data("kendoTimePicker").wrapper.css("display") != "none", "Display is not 'none'");
        });

        it("changing visible to false hides the widget", function() {
            dom = $('<input data-bind="visible:visible" data-role="timepicker"/>');

            var observable = kendo.observable({
                visible: true
            });

            kendo.bind(dom, observable);
            observable.set("visible", false);

            assert.isOk(dom.data("kendoTimePicker").wrapper.css("display") == "none", "Display is 'none'");
        });

        it("changing visible to true shows the widget", function() {
            dom = $('<input data-bind="visible:visible" data-role="timepicker"/>');

            var observable = kendo.observable({
                visible: false
            });

            kendo.bind(dom, observable);
            observable.set("visible", true);

            assert.isOk(dom.data("kendoTimePicker").wrapper.css("display") != "none", "Display is not 'none'");
        });

        it("binding invisible to true hides the widget", function() {
            dom = $('<input data-bind="invisible:invisible" data-role="timepicker"/>');

            var observable = kendo.observable({
                invisible: true
            });

            kendo.bind(dom, observable);

            assert.isOk(dom.data("kendoTimePicker").wrapper.css("display") == "none", "display is 'none'");
        });

        it("binding invisible to false shows the widget", function() {
            dom = $('<input data-bind="invisible:invisible" data-role="timepicker" style="display:none"/>');

            var observable = kendo.observable({
                invisible: false
            });

            kendo.bind(dom, observable);

            assert.isOk(dom.data("kendoTimePicker").wrapper.css("display") != "none", "display is not 'none'");
        });

        it("changing invisible to true hides the widget", function() {
            dom = $('<input data-bind="invisible:invisible" data-role="timepicker"/>');

            var observable = kendo.observable({
                invisible: false
            });

            kendo.bind(dom, observable);
            observable.set("invisible", true);

            assert.isOk(dom.data("kendoTimePicker").wrapper.css("display") == "none", "display is 'none'");
        });

        it("changing invisible to false shows the widget", function() {
            dom = $('<input data-bind="invisible:invisible" data-role="timepicker"/>');

            var observable = kendo.observable({
                invisible: true
            });

            kendo.bind(dom, observable);
            observable.set("invisible", false);

            assert.isOk(dom.data("kendoTimePicker").wrapper.css("display") != "none", "display is not 'none'");
        });

        it("binding timepicker initialized before binding does not override change event handler of timeView", function() {
            dom = $('<input data-bind="value: value" />');

            var observable = kendo.observable({ value: null });

            kendo.bind(dom, observable);

            dom.kendoTimePicker({
                change: function() {
                    assert.equal(this, dom.data("kendoTimePicker"));
                }
            });

            dom.data("kendoTimePicker").open();
            dom.data("kendoTimePicker").timeView.options.change("2:00 AM", true);
        });

    });
}());
