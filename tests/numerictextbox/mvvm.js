(function() {
    var dom;

    describe("kendo.ui.NumericTextBox MVVM", function() {
        beforeEach(function() {


            window.textBoxChange = function() {
                assert.isOk(true);
            }
        });
        afterEach(function() {

            kendo.destroy(dom);

            delete window.textBoxChange;
        });

        it("initializes a numerictextbox when data role is numerictextbox", function() {
            dom = $('<input data-role="numerictextbox"/>');

            kendo.bind(dom);

            assert.isOk(dom.data("kendoNumericTextBox") instanceof kendo.ui.NumericTextBox);
        });

        it("initializes a options from data attributes", function() {
            dom = $('<input data-role="numerictextbox" data-format="p0" />');

            kendo.bind(dom);

            var numerictextbox = dom.data("kendoNumericTextBox");

            assert.equal(numerictextbox.options.format, "p0");
        });

        it("initializes a selectOnFocus from data attributes", function() {
            dom = $('<input data-role="numerictextbox" data-select-on-focus="true" />');

            kendo.bind(dom);

            var numerictextbox = dom.data("kendoNumericTextBox");

            assert.equal(numerictextbox.options.selectOnFocus, true);
        });

        it("initializes value from view model", function() {
            dom = $('<input data-role="numerictextbox" data-bind="value:value" />');

            kendo.bind(dom, { value: 42 });

            assert.equal(dom.data("kendoNumericTextBox").value(), 42);
        });

        it("changing a value updates the view model", function() {
            dom = $('<input data-role="numerictextbox" data-bind="value:value" />');

            var observable = kendo.observable({ value: null });

            kendo.bind(dom, observable);

            dom.data("kendoNumericTextBox").value(42);
            dom.data("kendoNumericTextBox").trigger("change");

            assert.equal(observable.value, 42);
        });

        it("binding numerictextbox initialized before binding", function() {
            dom = $('<input data-bind="value:value" />');

            var observable = kendo.observable({ value: null });
            observable.value = 42;

            dom.kendoNumericTextBox();

            kendo.bind(dom, observable);

            assert.equal(dom.data("kendoNumericTextBox").value(), 42);
        });

        it("binding numerictextbox initialized after binding", function() {
            dom = $('<input data-bind="value:value" />');

            var observable = kendo.observable({ value: null });
            observable.value = 42;

            kendo.bind(dom, observable);

            dom.kendoNumericTextBox();

            assert.equal(dom.data("kendoNumericTextBox").value(), 42);
        });

        it("updating model value updates the UI", function() {
            dom = $('<input data-bind="value:value" />');

            var observable = kendo.observable({ value: null });

            kendo.bind(dom, observable);

            dom.kendoNumericTextBox();

            observable.set("value", 42)
            assert.equal(dom.data("kendoNumericTextBox").value(), 42);
        });

        it("binding to unexisting field clears widget value", function() {
            dom = $('<input data-bind="value:test" />');

            var observable = kendo.observable({ value: null });

            dom.kendoNumericTextBox({
                value: 10
            });

            kendo.bind(dom, observable);

            assert.equal(dom.data("kendoNumericTextBox").value(), null);
        });

        it("bindings are removed if element is rebind", function() {
            dom = $('<input data-role="numerictextbox" data-bind="value:value" />');

            var observable = kendo.observable({ value: 42 });

            kendo.bind(dom, observable);

            destroy = stub(dom[0].kendoBindingTarget, "destroy");

            kendo.bind(dom, observable);

            assert.equal(destroy.calls("destroy"), 1);
        });

        it("binding target is destroyed", function() {
            dom = $('<input data-role="numerictextbox" data-bind="value:value"/>');

            var observable = kendo.observable({ value: null });

            kendo.bind(dom, observable);

            destroy = stub(dom[0].kendoBindingTarget, "destroy");

            kendo.bind(dom, observable);

            assert.equal(destroy.calls("destroy"), 1);
        });

        it("dataBound event is raised if attached as option", function() {
            dom = $('<input data-role="numerictextbox" data-change="textBoxChange" />');

            var observable = kendo.observable({
                items: [{ text: "foo" }, { text: "bar" }]
            });

            kendo.bind(dom, observable);
            dom.data("kendoNumericTextBox").trigger("change");
        });

        it("dataBound event is raised if attached as option to a already initialized numerictextbox", function() {
            dom = $('<input data-change="textBoxChange" />').kendoNumericTextBox();

            var observable = kendo.observable({
                items: [{ text: "foo" }, { text: "bar" }]
            });

            kendo.bind(dom, observable);
            dom.data("kendoNumericTextBox").trigger("change");
        });

        it("binding enabled to false disables the widget", function() {
            dom = $('<input data-bind="enabled:enabled" />').kendoNumericTextBox();

            var observable = kendo.observable({
                enabled: false
            });

            kendo.bind(dom, observable);

            assert.isOk(dom.is(":disabled"));
        });

        it("binding enabled to true enables the widget", function() {
            dom = $('<input data-bind="enabled:enabled" disabled="disabled" />').kendoNumericTextBox();

            var observable = kendo.observable({
                enabled: true
            });

            kendo.bind(dom, observable);

            assert.isOk(!dom.is(":disabled"));
        });

        it("binding disable to true disables the widget", function() {
            dom = $('<input data-bind="disabled:disabled" disabled="disabled"  data-role="numerictextbox" />');

            var observable = kendo.observable({
                disabled: false
            });

            kendo.bind(dom, observable);

            assert.isOk(!dom.is(":disabled"));
        });

        it("binding disabled to false enables the widget", function() {
            dom = $('<input data-bind="disabled:disabled" data-role="numerictextbox" />');

            var observable = kendo.observable({
                disabled: true
            });

            kendo.bind(dom, observable);

            assert.isOk(dom.is(":disabled"));
        });

        it("binding visible to false hides the widget", function() {
            dom = $('<input data-bind="visible:visible" data-role="numerictextbox"/>');

            var observable = kendo.observable({
                visible: false
            });

            kendo.bind(dom, observable);

            assert.isOk(dom.data("kendoNumericTextBox").wrapper.css("display") == "none", "Display is 'none'");
        });

        it("binding visible to true shows the widget", function() {
            dom = $('<input data-bind="visible:visible" data-role="numerictextbox" style="display:none"/>');

            var observable = kendo.observable({
                visible: true
            });

            kendo.bind(dom, observable);

            assert.isOk(dom.data("kendoNumericTextBox").wrapper.css("display") != "none", "Display is not 'none'");
        });

        it("changing visible to false hides the widget", function() {
            dom = $('<input data-bind="visible:visible" data-role="numerictextbox"/>');

            var observable = kendo.observable({
                visible: true
            });

            kendo.bind(dom, observable);
            observable.set("visible", false);

            assert.isOk(dom.data("kendoNumericTextBox").wrapper.css("display") == "none", "Display is 'none'");
        });

        it("changing visible to true shows the widget", function() {
            dom = $('<input data-bind="visible:visible" data-role="numerictextbox"/>');

            var observable = kendo.observable({
                visible: false
            });

            kendo.bind(dom, observable);
            observable.set("visible", true);

            assert.isOk(dom.data("kendoNumericTextBox").wrapper.css("display") != "none", "Display is not 'none'");
        });

        it("binding invisible to true hides the widget", function() {
            dom = $('<input data-bind="invisible:invisible" data-role="numerictextbox"/>');

            var observable = kendo.observable({
                invisible: true
            });

            kendo.bind(dom, observable);

            assert.isOk(dom.data("kendoNumericTextBox").wrapper.css("display") == "none", "display is 'none'");
        });

        it("binding invisible to false shows the widget", function() {
            dom = $('<input data-bind="invisible:invisible" data-role="numerictextbox" style="display:none"/>');

            var observable = kendo.observable({
                invisible: false
            });

            kendo.bind(dom, observable);

            assert.isOk(dom.data("kendoNumericTextBox").wrapper.css("display") != "none", "display is not 'none'");
        });

        it("changing invisible to true hides the widget", function() {
            dom = $('<input data-bind="invisible:invisible" data-role="numerictextbox"/>');

            var observable = kendo.observable({
                invisible: false
            });

            kendo.bind(dom, observable);
            observable.set("invisible", true);

            assert.isOk(dom.data("kendoNumericTextBox").wrapper.css("display") == "none", "display is 'none'");
        });

        it("changing invisible to false shows the widget", function() {
            dom = $('<input data-bind="invisible:invisible" data-role="numerictextbox"/>');

            var observable = kendo.observable({
                invisible: true
            });

            kendo.bind(dom, observable);
            observable.set("invisible", false);

            assert.isOk(dom.data("kendoNumericTextBox").wrapper.css("display") != "none", "display is not 'none'");
        });

        it("change event reflects value modifications", function() {
            dom = $('<input data-bind="value:value, events:{change: changeEvent}" data-role="numerictextbox"/>');

            var observable = kendo.observable({
                value: 0,
                changeEvent: function() {
                    assert.equal(this.get("value"), 42);
                }
            });

            kendo.bind(dom, observable);

            dom.data("kendoNumericTextBox").value(42);
            dom.data("kendoNumericTextBox").trigger("change");
        });

        it("creates label", function() {
            dom = $('<input data-role="numerictextbox" data-label="test"/>');

            kendo.bind(dom);

            assert.equal(dom.data("kendoNumericTextBox")._inputLabel[0].innerHTML, "test");
        });

        it("floating label wraps the widget", function() {
            dom = $('<input data-role="numerictextbox" data-label="{ floating: true }"/>');

            kendo.bind(dom);

            assert.isOk(dom.data("kendoNumericTextBox").wrapper.parent().hasClass("k-floating-label-container"));
            assert.isOk(dom.data("kendoNumericTextBox").wrapper.parent().hasClass("k-state-empty"));
        });
    });
}());
