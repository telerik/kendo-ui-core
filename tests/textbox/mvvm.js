(function() {
    var dom;

    describe("kendo.ui.TextBox MVVM", function() {
        beforeEach(function() {


            window.textBoxChange = function() {
                assert.isOk(true);
            }
        });
        afterEach(function() {

            kendo.destroy(dom);

            delete window.textBoxChange;
        });

        it("initializes a textbox when data role is textbox", function() {
            dom = $('<input data-role="textbox"/>');

            kendo.bind(dom);

            assert.isOk(dom.data("kendoTextBox") instanceof kendo.ui.TextBox);
        });

        it("initializes a options from data attributes", function() {
            dom = $('<input data-role="textbox" data-placeholder="test..." />');

            kendo.bind(dom);

            var textbox = dom.data("kendoTextBox");

            assert.equal(textbox.options.placeholder, "test...");
        });

        it("initializes value from view model", function() {
            dom = $('<input data-role="textbox" data-bind="value:value" />');

            kendo.bind(dom, { value: "test value" });

            assert.equal(dom.data("kendoTextBox").value(), "test value");
        });

        it("changing a value updates the view model", function() {
            dom = $('<input data-role="textbox" data-bind="value:value" />');

            var observable = kendo.observable({ value: null });

            kendo.bind(dom, observable);

            dom.data("kendoTextBox").value("test");
            dom.data("kendoTextBox").trigger("change");

            assert.equal(observable.value, "test");
        });

        it("binding textbox initialized before binding", function() {
            dom = $('<input data-bind="value:value" />');

            var observable = kendo.observable({ value: null });
            observable.value = "test";

            dom.kendoTextBox();

            kendo.bind(dom, observable);

            assert.equal(dom.data("kendoTextBox").value(), "test");
        });

        it("binding textbox initialized after binding", function() {
            dom = $('<input data-bind="value:value" />');

            var observable = kendo.observable({ value: null });
            observable.value = "test";

            kendo.bind(dom, observable);

            dom.kendoTextBox();

            assert.equal(dom.data("kendoTextBox").value(), "test");
        });

        it("updating model value updates the UI", function() {
            dom = $('<input data-bind="value:value" />');

            var observable = kendo.observable({ value: null });

            kendo.bind(dom, observable);

            dom.kendoTextBox();

            observable.set("value", "test")
            assert.equal(dom.data("kendoTextBox").value(), "test");
        });

        it("binding to unexisting field clears widget value", function() {
            dom = $('<input data-bind="value:test" />');

            var observable = kendo.observable({ value: null });

            dom.kendoTextBox({
                value: "test"
            });

            kendo.bind(dom, observable);

            assert.equal(dom.data("kendoTextBox").value(), null);
        });

        it("bindings are removed if element is rebind", function() {
            dom = $('<input data-role="textbox" data-bind="value:value" />');

            var observable = kendo.observable({ value: 42 });

            kendo.bind(dom, observable);

            destroy = stub(dom[0].kendoBindingTarget, "destroy");

            kendo.bind(dom, observable);

            assert.equal(destroy.calls("destroy"), 1);
        });

        it("binding target is destroyed", function() {
            dom = $('<input data-role="textbox" data-bind="value:value"/>');

            var observable = kendo.observable({ value: null });

            kendo.bind(dom, observable);

            destroy = stub(dom[0].kendoBindingTarget, "destroy");

            kendo.bind(dom, observable);

            assert.equal(destroy.calls("destroy"), 1);
        });

        it("binding enabled to false disables the widget", function() {
            dom = $('<input data-bind="enabled:enabled" />').kendoTextBox();

            var observable = kendo.observable({
                enabled: false
            });

            kendo.bind(dom, observable);

            assert.isOk(dom.is(":disabled"));
        });

        it("binding enabled to true enables the widget", function() {
            dom = $('<input data-bind="enabled:enabled" disabled="disabled" />').kendoTextBox();

            var observable = kendo.observable({
                enabled: true
            });

            kendo.bind(dom, observable);

            assert.isOk(!dom.is(":disabled"));
        });

        it("binding disable to true disables the widget", function() {
            dom = $('<input data-bind="disabled:disabled" disabled="disabled"  data-role="textbox" />');

            var observable = kendo.observable({
                disabled: false
            });

            kendo.bind(dom, observable);

            assert.isOk(!dom.is(":disabled"));
        });

        it("binding disabled to false enables the widget", function() {
            dom = $('<input data-bind="disabled:disabled" data-role="textbox" />');

            var observable = kendo.observable({
                disabled: true
            });

            kendo.bind(dom, observable);

            assert.isOk(dom.is(":disabled"));
        });

        it("binding visible to false hides the widget", function() {
            dom = $('<input data-bind="visible:visible" data-role="textbox"/>');

            var observable = kendo.observable({
                visible: false
            });

            kendo.bind(dom, observable);

            assert.isOk(dom.data("kendoTextBox").wrapper.css("display") == "none", "Display is 'none'");
        });

        it("binding visible to true shows the widget", function() {
            dom = $('<input data-bind="visible:visible" data-role="textbox" style="display:none"/>');

            var observable = kendo.observable({
                visible: true
            });

            kendo.bind(dom, observable);

            assert.isOk(dom.data("kendoTextBox").wrapper.css("display") != "none", "Display is not 'none'");
        });

        it("changing visible to false hides the widget", function() {
            dom = $('<input data-bind="visible:visible" data-role="textbox"/>');

            var observable = kendo.observable({
                visible: true
            });

            kendo.bind(dom, observable);
            observable.set("visible", false);

            assert.isOk(dom.data("kendoTextBox").wrapper.css("display") == "none", "Display is 'none'");
        });

        it("changing visible to true shows the widget", function() {
            dom = $('<input data-bind="visible:visible" data-role="textbox"/>');

            var observable = kendo.observable({
                visible: false
            });

            kendo.bind(dom, observable);
            observable.set("visible", true);

            assert.isOk(dom.data("kendoTextBox").wrapper.css("display") != "none", "Display is not 'none'");
        });

        it("binding invisible to true hides the widget", function() {
            dom = $('<input data-bind="invisible:invisible" data-role="textbox"/>');

            var observable = kendo.observable({
                invisible: true
            });

            kendo.bind(dom, observable);

            assert.isOk(dom.data("kendoTextBox").wrapper.css("display") == "none", "display is 'none'");
        });

        it("binding invisible to false shows the widget", function() {
            dom = $('<input data-bind="invisible:invisible" data-role="textbox" style="display:none"/>');

            var observable = kendo.observable({
                invisible: false
            });

            kendo.bind(dom, observable);

            assert.isOk(dom.data("kendoTextBox").wrapper.css("display") != "none", "display is not 'none'");
        });

        it("changing invisible to true hides the widget", function() {
            dom = $('<input data-bind="invisible:invisible" data-role="textbox"/>');

            var observable = kendo.observable({
                invisible: false
            });

            kendo.bind(dom, observable);
            observable.set("invisible", true);

            assert.isOk(dom.data("kendoTextBox").wrapper.css("display") == "none", "display is 'none'");
        });

        it("changing invisible to false shows the widget", function() {
            dom = $('<input data-bind="invisible:invisible" data-role="textbox"/>');

            var observable = kendo.observable({
                invisible: true
            });

            kendo.bind(dom, observable);
            observable.set("invisible", false);

            assert.isOk(dom.data("kendoTextBox").wrapper.css("display") != "none", "display is not 'none'");
        });

        it("change event reflects value modifications", function() {
            dom = $('<input data-bind="value:value, events:{change: changeEvent}" data-role="textbox"/>');

            var observable = kendo.observable({
                value: 0,
                changeEvent: function() {
                    assert.equal(this.get("value"), "test");
                }
            });

            kendo.bind(dom, observable);

            dom.data("kendoTextBox").value("test");
            dom.data("kendoTextBox").trigger("change");
        });

        it("creates label", function() {
            dom = $('<input data-role="textbox" data-label="test"/>');

            kendo.bind(dom);

            assert.equal(dom.data("kendoTextBox")._inputLabel[0].innerHTML, "test");
        });

        it("floating label wraps the widget", function() {
            dom = $('<input data-role="textbox" data-label="{ floating: true }"/>');

            kendo.bind(dom);

            assert.isOk(dom.data("kendoTextBox").wrapper.parent().hasClass("k-floating-label-container"));
            assert.isOk(dom.data("kendoTextBox").wrapper.parent().hasClass("k-state-empty"));
        });
    });
}());
