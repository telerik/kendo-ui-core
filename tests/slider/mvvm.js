(function() {

    var dom;

    describe("slider mvvm", function() {
        beforeEach(function() {
            window.change = function() {
                assert.isOk(true);
            };
        });
        afterEach(function() {
            kendo.destroy(dom);
            delete window.change;
        });

        it("initializes a slider when data role is slider", function() {
            dom = $('<input data-role="slider"/>');

            kendo.bind(dom);

            assert.isOk(dom.data("kendoSlider") instanceof kendo.ui.Slider);
        });

        it("initializes a options from data attributes", function() {
            dom = $('<input data-role="slider" data-max="100" />');

            kendo.bind(dom);

            var slider = dom.data("kendoSlider");

            slider.value(80);

            assert.equal(slider.options.max, 100);
            assert.equal(slider.value(), 80);
        });

        it("initializes value from view model", function() {
            dom = $('<input data-role="slider" data-bind="value:value" />');

            kendo.bind(dom, { value: 10 });

            assert.equal(dom.data("kendoSlider").value(), 10);
        });

        it("changing a value updates the view model", function() {
            dom = $('<input data-role="slider" data-bind="value:value" />');

            var observable = kendo.observable({ value: null });

            kendo.bind(dom, observable);

            dom.data("kendoSlider").value(10);
            dom.data("kendoSlider").trigger("change");

            assert.equal(observable.value, 10);
        });

        it("binding slider initialized before binding", function() {
            dom = $('<input data-bind="value:value" />');

            var observable = kendo.observable({ value: null });
            observable.value = 10;

            dom.kendoSlider();

            kendo.bind(dom, observable);

            assert.equal(dom.data("kendoSlider").value(), 10);
        });

        it("binding slider initialized after binding", function() {
            dom = $('<input data-bind="value:value" />');

            var observable = kendo.observable({ value: null });
            observable.value = 10;

            kendo.bind(dom, observable);

            dom.kendoSlider();

            assert.equal(dom.data("kendoSlider").value(), 10);
        });

        it("updating model value updates the UI", function() {
            dom = $('<input data-bind="value:value" />');

            var observable = kendo.observable({ value: null });

            kendo.bind(dom, observable);

            dom.kendoSlider();

            observable.set("value", 10)
            assert.equal(dom.data("kendoSlider").value(), 10);
        });

        it("bindings are removed if element is rebind", function() {
            dom = $('<input data-role="slider" data-bind="value:value" />');

            var observable = kendo.observable({ value: 10 });

            kendo.bind(dom, observable);

            var destroy = stub(dom[0].kendoBindingTarget, "destroy");

            kendo.bind(dom, observable);

            assert.equal(destroy.calls("destroy"), 1);
        });

        it("binding target is destroyed", function() {
            dom = $('<input data-role="slider" data-bind="value:value"/>');

            var observable = kendo.observable({ value: null });

            kendo.bind(dom, observable);

            var destroy = stub(dom[0].kendoBindingTarget, "destroy");

            kendo.bind(dom, observable);

            assert.equal(destroy.calls("destroy"), 1);
        });

        it("change event is raised if attached as option", function() {
            dom = $('<input data-role="slider" data-change="change" />');

            var observable = kendo.observable({
                items: [{ text: "foo" }, { text: "bar" }]
            });

            kendo.bind(dom, observable);
            dom.data("kendoSlider").trigger("change");
        });

        it("change event is raised if attached as option to a already initialized slider", function() {
            dom = $('<input data-change="change" />').kendoSlider();

            var observable = kendo.observable({
                items: [{ text: "foo" }, { text: "bar" }]
            });

            kendo.bind(dom, observable);
            dom.data("kendoSlider").trigger("change");
        });

        it("binding enabled to false disables the widget", function() {
            dom = $('<input data-bind="enabled:enabled" data-role="slider"/>');

            var observable = kendo.observable({
                enabled: false
            });

            kendo.bind(dom, observable);

            assert.isOk(dom.is(":disabled"));
        });

        it("binding enabled to true enables the widget", function() {
            dom = $('<input data-bind="enabled:enabled" disabled="disabled" data-role="slider" />');

            var observable = kendo.observable({
                enabled: true
            });

            kendo.bind(dom, observable);

            assert.isOk(!dom.is(":disabled"));
        });

        it("binding disable to true disables the widget", function() {
            dom = $('<input data-bind="disabled:disabled" disabled="disabled" data-role="slider" />');

            var observable = kendo.observable({
                disabled: false
            });

            kendo.bind(dom, observable);

            assert.isOk(!dom.is(":disabled"));
        });

        it("binding disabled to false enables the widget", function() {
            dom = $('<input data-bind="disabled:disabled" data-role="slider" />');

            var observable = kendo.observable({
                disabled: true
            });

            kendo.bind(dom, observable);

            assert.isOk(dom.is(":disabled"));
        });

        it("binding visible to false hides the widget", function() {
            dom = $('<input data-bind="visible:visible" data-role="slider"/>');

            var observable = kendo.observable({
                visible: false
            });

            kendo.bind(dom, observable);

            assert.isOk(dom.data("kendoSlider").wrapper.css("display") == "none", "Display is 'none'");
        });

        it("binding visible to true shows the widget", function() {
            dom = $('<input data-bind="visible:visible" data-role="slider" style="display:none"/>');

            var observable = kendo.observable({
                visible: true
            });

            kendo.bind(dom, observable);

            assert.isOk(dom.data("kendoSlider").wrapper.css("display") != "none", "Display is not 'none'");
        });

        it("changing visible to false hides the widget", function() {
            dom = $('<input data-bind="visible:visible" data-role="slider"/>');

            var observable = kendo.observable({
                visible: true
            });

            kendo.bind(dom, observable);
            observable.set("visible", false);

            assert.isOk(dom.data("kendoSlider").wrapper.css("display") == "none", "Display is 'none'");
        });

        it("changing visible to true shows the widget", function() {
            dom = $('<input data-bind="visible:visible" data-role="slider"/>');

            var observable = kendo.observable({
                visible: false
            });

            kendo.bind(dom, observable);
            observable.set("visible", true);

            assert.isOk(dom.data("kendoSlider").wrapper.css("display") != "none", "Display is not 'none'");
        });

        it("binding invisible to true hides the widget", function() {
            dom = $('<input data-bind="invisible:invisible" data-role="slider"/>');

            var observable = kendo.observable({
                invisible: true
            });

            kendo.bind(dom, observable);

            assert.isOk(dom.data("kendoSlider").wrapper.css("display") == "none", "display is 'none'");
        });

        it("binding invisible to false shows the widget", function() {
            dom = $('<input data-bind="invisible:invisible" data-role="slider" style="display:none"/>');

            var observable = kendo.observable({
                invisible: false
            });

            kendo.bind(dom, observable);

            assert.isOk(dom.data("kendoSlider").wrapper.css("display") != "none", "display is not 'none'");
        });

        it("changing invisible to true hides the widget", function() {
            dom = $('<input data-bind="invisible:invisible" data-role="slider"/>');

            var observable = kendo.observable({
                invisible: false
            });

            kendo.bind(dom, observable);
            observable.set("invisible", true);

            assert.isOk(dom.data("kendoSlider").wrapper.css("display") == "none", "display is 'none'");
        });

        it("changing invisible to false shows the widget", function() {
            dom = $('<input data-bind="invisible:invisible" data-role="slider"/>');

            var observable = kendo.observable({
                invisible: true
            });

            kendo.bind(dom, observable);
            observable.set("invisible", false);

            assert.isOk(dom.data("kendoSlider").wrapper.css("display") != "none", "display is not 'none'");
        });

        it("slider should have value 10", function() {
            dom = $('<input data-value="10" data-role="slider"/>');

            kendo.bind(dom);

            assert.isOk(dom.data("kendoSlider").options.value == 10, "value is not equal to 10");
        });
    });

    describe("rangeslider mvvm", function() {
        beforeEach(function() {
            window.change = function() {
                assert.isOk(true);
            };
        });
        afterEach(function() {
            kendo.destroy(dom);
            delete window.change;
        });

        it("initializes a rangeslider when data role is rangeslider", function() {
            dom = $('<div data-role="rangeslider"><input /><input /></div>');

            kendo.bind(dom);

            assert.isOk(dom.data("kendoRangeSlider") instanceof kendo.ui.RangeSlider);
        });

        it("initializes a options from data attributes", function() {
            dom = $('<div data-role="rangeslider" data-max="100"><input /><input /></div>');

            kendo.bind(dom);

            var rangeSlider = dom.data("kendoRangeSlider");

            rangeSlider.value([40, 80]);

            assert.equal(rangeSlider.options.max, 100);
            assert.deepEqual(rangeSlider.value(), [40, 80]);
        });

        it("initializes value from view model", function() {
            dom = $('<div data-role="rangeslider" data-bind="value:value"><input /><input /></div>');

            kendo.bind(dom, { value: [1, 2] });

            assert.deepEqual(dom.data("kendoRangeSlider").value(), [1, 2]);
        });

        it("changing a value updates the view model", function() {
            dom = $('<div data-role="rangeslider" data-bind="value:value"><input /><input /></div>');

            var observable = kendo.observable({ value: [1, 1] });

            kendo.bind(dom, observable);

            dom.data("kendoRangeSlider").value([1, 2]);
            dom.data("kendoRangeSlider").trigger("change");

            assert.isOk(observable.value[0], 1);
            assert.isOk(observable.value[1], 2);
        });

        it("binding rangeslider initialized before binding", function() {
            dom = $('<div data-bind="value:value"><input /><input /></div>');

            var observable = kendo.observable({ value: null });
            observable.value = [1, 2];

            dom.kendoRangeSlider();

            kendo.bind(dom, observable);

            assert.deepEqual(dom.data("kendoRangeSlider").value(), [1, 2]);
        });

        it("binding slider initialized after binding", function() {
            dom = $('<div data-bind="value:value"><input /><input /></div>');

            var observable = kendo.observable({ value: null });
            observable.value = [1, 2];

            kendo.bind(dom, observable);

            dom.kendoRangeSlider();

            assert.deepEqual(dom.data("kendoRangeSlider").value(), [1, 2]);
        });

        it("updating model value updates the UI", function() {
            dom = $('<div data-bind="value:value"><input /><input /></div>');

            var observable = kendo.observable({ value: null });

            kendo.bind(dom, observable);

            dom.kendoRangeSlider();

            observable.set("value", [1, 3])
            assert.deepEqual(dom.data("kendoRangeSlider").value(), [1, 3]);
        });

        it("bindings are removed if element is rebind", function() {
            dom = $('<div data-role="rangeslider" data-bind="value:value"><input /><input /></div>');

            var observable = kendo.observable({ value: [1, 4] });

            kendo.bind(dom, observable);

            var destroy = stub(dom[0].kendoBindingTarget, "destroy");

            kendo.bind(dom, observable);

            assert.equal(destroy.calls("destroy"), 1);
        });

        it("binding target is destroyed", function() {
            dom = $('<div data-role="rangeslider" data-bind="value:value"><input /><input /></div>');

            var observable = kendo.observable({ value: null });

            kendo.bind(dom, observable);

            var destroy = stub(dom[0].kendoBindingTarget, "destroy");

            kendo.bind(dom, observable);

            assert.equal(destroy.calls("destroy"), 1);
        });

        it("change event is raised if attached as option", function() {
            dom = $('<div data-role="rangeslider" data-change="change"><input /><input /></div>');

            var observable = kendo.observable({
                items: [{ text: "foo" }, { text: "bar" }]
            });

            kendo.bind(dom, observable);
            dom.data("kendoRangeSlider").trigger("change");
        });

        it("change event is raised if attached as option to a already initialized slider", function() {
            dom = $('<div data-change="change"><input /><input /></div>').kendoRangeSlider();

            var observable = kendo.observable({
                items: [{ text: "foo" }, { text: "bar" }]
            });

            kendo.bind(dom, observable);
            dom.data("kendoRangeSlider").trigger("change");
        });

        it("binding enabled to false disables the widget", function() {
            dom = $('<div data-bind="enabled:enabled" data-role="rangeslider"><input /><input /></div>');

            var observable = kendo.observable({
                enabled: false
            });

            kendo.bind(dom, observable);

            assert.isOk($(dom.find("input")[0]).is(":disabled"));
            assert.isOk($(dom.find("input")[1]).is(":disabled"));
        });

        it("binding enabled to true enables the widget", function() {
            dom = $('<div data-bind="enabled:enabled" data-role="rangeslider"><input disabled="disabled" /><input disabled="disabled" /></div>');

            var observable = kendo.observable({
                enabled: true
            });

            kendo.bind(dom, observable);

            assert.isOk(!$(dom.find("input")[0]).is(":disabled"));
            assert.isOk(!$(dom.find("input")[1]).is(":disabled"));
        });

        it("binding disable to true disables the widget", function() {
            dom = $('<div data-bind="disabled:disabled" data-role="rangeslider"><input disabled="disabled" /><input disabled="disabled" /></div>');

            var observable = kendo.observable({
                disabled: false
            });

            kendo.bind(dom, observable);

            assert.isOk(!$(dom.find("input")[0]).is(":disabled"));
            assert.isOk(!$(dom.find("input")[1]).is(":disabled"));
        });

        it("binding disabled to false enables the widget", function() {
            dom = $('<div data-bind="disabled:disabled" data-role="rangeslider"><input /><input /></div>');

            var observable = kendo.observable({
                disabled: true
            });

            kendo.bind(dom, observable);

            assert.isOk($(dom.find("input")[0]).is(":disabled"));
            assert.isOk($(dom.find("input")[1]).is(":disabled"));
        });

        it("binding visible to false hides the widget", function() {
            dom = $('<div data-bind="visible:visible" data-role="rangeslider"><input /><input /></div>');

            var observable = kendo.observable({
                visible: false
            });

            kendo.bind(dom, observable);

            assert.isOk(dom.data("kendoRangeSlider").wrapper.css("display") == "none", "Display is 'none'");
        });

        it("binding visible to true shows the widget", function() {
            dom = $('<div data-bind="visible:visible" data-role="rangeslider" style="display:none"><input /><input /></div>');

            var observable = kendo.observable({
                visible: true
            });

            kendo.bind(dom, observable);

            assert.isOk(dom.data("kendoRangeSlider").wrapper.css("display") != "none", "Display is not 'none'");
        });

        it("changing visible to false hides the widget", function() {
            dom = $('<div data-bind="visible:visible" data-role="rangeslider"><input /><input /></div>');

            var observable = kendo.observable({
                visible: true
            });

            kendo.bind(dom, observable);
            observable.set("visible", false);

            assert.isOk(dom.data("kendoRangeSlider").wrapper.css("display") == "none", "Display is 'none'");
        });

        it("changing visible to true shows the widget", function() {
            dom = $('<div data-bind="visible:visible" data-role="rangeslider"><input /><input /></div>');

            var observable = kendo.observable({
                visible: false
            });

            kendo.bind(dom, observable);
            observable.set("visible", true);

            assert.isOk(dom.data("kendoRangeSlider").wrapper.css("display") != "none", "Display is not 'none'");
        });

        it("binding invisible to true hides the widget", function() {
            dom = $('<div data-bind="invisible:invisible" data-role="rangeslider"><input /><input /></div>');

            var observable = kendo.observable({
                invisible: true
            });

            kendo.bind(dom, observable);

            assert.isOk(dom.data("kendoRangeSlider").wrapper.css("display") == "none", "display is 'none'");
        });

        it("binding invisible to false shows the widget", function() {
            dom = $('<div data-bind="invisible:invisible" data-role="rangeslider" style="display:none"><input /><input /></div>');

            var observable = kendo.observable({
                invisible: false
            });

            kendo.bind(dom, observable);

            assert.isOk(dom.data("kendoRangeSlider").wrapper.css("display") != "none", "display is not 'none'");
        });

        it("changing invisible to true hides the widget", function() {
            dom = $('<div data-bind="invisible:invisible" data-role="rangeslider"><input /><input /></div>');

            var observable = kendo.observable({
                invisible: false
            });

            kendo.bind(dom, observable);
            observable.set("invisible", true);

            assert.isOk(dom.data("kendoRangeSlider").wrapper.css("display") == "none", "display is 'none'");
        });

        it("changing invisible to false shows the widget", function() {
            dom = $('<div data-bind="invisible:invisible" data-role="rangeslider"><input /><input /></div>');

            var observable = kendo.observable({
                invisible: true
            });

            kendo.bind(dom, observable);
            observable.set("invisible", false);

            assert.isOk(dom.data("kendoRangeSlider").wrapper.css("display") != "none", "display is not 'none'");
        });

        it("rangeslider should have selection start 10", function() {
            dom = $('<div data-selection-start="10" data-role="rangeslider"><input /><input /></div>');

            kendo.bind(dom);

            assert.isOk(dom.data("kendoRangeSlider").options.selectionStart == 10, "selectionStart is not equal to 10");
        });

        it("rangeslider should have selection end 10", function() {
            dom = $('<div data-selection-end="10" data-role="rangeslider"><input /><input /></div>');

            kendo.bind(dom);

            assert.isOk(dom.data("kendoRangeSlider").options.selectionEnd == 10, "selectionEnd is not equal to 10");
        });
    });
}());
