(function() {
    var dom;

    describe("kendo.ui.TextArea MVVM", function() {
        beforeEach(function() {


            window.textBoxChange = function() {
                assert.isOk(true);
            }
        });
        afterEach(function() {

            kendo.destroy(dom);

            delete window.textBoxChange;
        });

        it("initializes a widget when data role is widget", function() {
            dom = $('<textarea data-role="textarea"/>');

            kendo.bind(dom);

            assert.isOk(dom.data("kendoTextArea") instanceof kendo.ui.TextArea);
        });

        it("initializes a options from data attributes", function() {
            dom = $('<textarea data-role="textarea" data-placeholder="test..." />');

            kendo.bind(dom);

            var widget = dom.data("kendoTextArea");

            assert.equal(widget.options.placeholder, "test...");
        });

        it("initializes value from view model", function() {
            dom = $('<textarea data-role="textarea" data-bind="value:value" />');

            kendo.bind(dom, { value: "test value" });

            assert.equal(dom.data("kendoTextArea").value(), "test value");
        });

        it("changing a value updates the view model", function() {
            dom = $('<textarea data-role="textarea" data-bind="value:value" />');

            var observable = kendo.observable({ value: null });

            kendo.bind(dom, observable);

            dom.data("kendoTextArea").value("test");
            dom.data("kendoTextArea").trigger("change");

            assert.equal(observable.value, "test");
        });

        it("binding widget initialized before binding", function() {
            dom = $('<textarea data-bind="value:value" />');

            var observable = kendo.observable({ value: null });
            observable.value = "test";

            dom.kendoTextArea();

            kendo.bind(dom, observable);

            assert.equal(dom.data("kendoTextArea").value(), "test");
        });

        it("binding widget initialized after binding", function() {
            dom = $('<textarea data-bind="value:value" />');

            var observable = kendo.observable({ value: null });
            observable.value = "test";

            kendo.bind(dom, observable);

            dom.kendoTextArea();

            assert.equal(dom.data("kendoTextArea").value(), "test");
        });

        it("updating model value updates the UI", function() {
            dom = $('<textarea data-bind="value:value" />');

            var observable = kendo.observable({ value: null });

            kendo.bind(dom, observable);

            dom.kendoTextArea();

            observable.set("value", "test")
            assert.equal(dom.data("kendoTextArea").value(), "test");
        });

        it("binding to unexisting field clears widget value", function() {
            dom = $('<textarea data-bind="value:test" />');

            var observable = kendo.observable({ value: null });

            dom.kendoTextArea({
                value: "test"
            });

            kendo.bind(dom, observable);

            assert.equal(dom.data("kendoTextArea").value(), null);
        });

        it("bindings are removed if element is rebind", function() {
            dom = $('<textarea data-role="textarea" data-bind="value:value" />');

            var observable = kendo.observable({ value: 42 });

            kendo.bind(dom, observable);

            destroy = stub(dom[0].kendoBindingTarget, "destroy");

            kendo.bind(dom, observable);

            assert.equal(destroy.calls("destroy"), 1);
        });

        it("binding target is destroyed", function() {
            dom = $('<textarea data-role="textarea" data-bind="value:value"/>');

            var observable = kendo.observable({ value: null });

            kendo.bind(dom, observable);

            destroy = stub(dom[0].kendoBindingTarget, "destroy");

            kendo.bind(dom, observable);

            assert.equal(destroy.calls("destroy"), 1);
        });

        it("binding enabled to false disables the widget", function() {
            dom = $('<textarea data-bind="enabled:enabled" />').kendoTextArea();

            var observable = kendo.observable({
                enabled: false
            });

            kendo.bind(dom, observable);

            assert.isOk(dom.is(":disabled"));
        });

        it("binding enabled to true enables the widget", function() {
            dom = $('<textarea data-bind="enabled:enabled" disabled="disabled" />').kendoTextArea();

            var observable = kendo.observable({
                enabled: true
            });

            kendo.bind(dom, observable);

            assert.isOk(!dom.is(":disabled"));
        });

        it("binding disable to true disables the widget", function() {
            dom = $('<textarea data-bind="disabled:disabled" disabled="disabled"  data-role="textarea" />');

            var observable = kendo.observable({
                disabled: false
            });

            kendo.bind(dom, observable);

            assert.isOk(!dom.is(":disabled"));
        });

        it("binding disabled to false enables the widget", function() {
            dom = $('<textarea data-bind="disabled:disabled" data-role="textarea" />');

            var observable = kendo.observable({
                disabled: true
            });

            kendo.bind(dom, observable);

            assert.isOk(dom.is(":disabled"));
        });

        it("binding visible to false hides the widget", function() {
            dom = $('<textarea data-bind="visible:visible" data-role="textarea"/>');

            var observable = kendo.observable({
                visible: false
            });

            kendo.bind(dom, observable);

            assert.isOk(dom.data("kendoTextArea").wrapper.css("display") == "none", "Display is 'none'");
        });

        it("binding visible to true shows the widget", function() {
            dom = $('<textarea data-bind="visible:visible" data-role="textarea" style="display:none"/>');

            var observable = kendo.observable({
                visible: true
            });

            kendo.bind(dom, observable);

            assert.isOk(dom.data("kendoTextArea").wrapper.css("display") != "none", "Display is not 'none'");
        });

        it("changing visible to false hides the widget", function() {
            dom = $('<textarea data-bind="visible:visible" data-role="textarea"/>');

            var observable = kendo.observable({
                visible: true
            });

            kendo.bind(dom, observable);
            observable.set("visible", false);

            assert.isOk(dom.data("kendoTextArea").wrapper.css("display") == "none", "Display is 'none'");
        });

        it("changing visible to true shows the widget", function() {
            dom = $('<textarea data-bind="visible:visible" data-role="textarea"/>');

            var observable = kendo.observable({
                visible: false
            });

            kendo.bind(dom, observable);
            observable.set("visible", true);

            assert.isOk(dom.data("kendoTextArea").wrapper.css("display") != "none", "Display is not 'none'");
        });

        it("binding invisible to true hides the widget", function() {
            dom = $('<textarea data-bind="invisible:invisible" data-role="textarea"/>');

            var observable = kendo.observable({
                invisible: true
            });

            kendo.bind(dom, observable);

            assert.isOk(dom.data("kendoTextArea").wrapper.css("display") == "none", "display is 'none'");
        });

        it("binding invisible to false shows the widget", function() {
            dom = $('<textarea data-bind="invisible:invisible" data-role="textarea" style="display:none"/>');

            var observable = kendo.observable({
                invisible: false
            });

            kendo.bind(dom, observable);

            assert.isOk(dom.data("kendoTextArea").wrapper.css("display") != "none", "display is not 'none'");
        });

        it("changing invisible to true hides the widget", function() {
            dom = $('<textarea data-bind="invisible:invisible" data-role="textarea"/>');

            var observable = kendo.observable({
                invisible: false
            });

            kendo.bind(dom, observable);
            observable.set("invisible", true);

            assert.isOk(dom.data("kendoTextArea").wrapper.css("display") == "none", "display is 'none'");
        });

        it("changing invisible to false shows the widget", function() {
            dom = $('<textarea data-bind="invisible:invisible" data-role="textarea"/>');

            var observable = kendo.observable({
                invisible: true
            });

            kendo.bind(dom, observable);
            observable.set("invisible", false);

            assert.isOk(dom.data("kendoTextArea").wrapper.css("display") != "none", "display is not 'none'");
        });

        it("change event reflects value modifications", function() {
            dom = $('<textarea data-bind="value:value, events:{change: changeEvent}" data-role="textarea"/>');

            var observable = kendo.observable({
                value: 0,
                changeEvent: function() {
                    assert.equal(this.get("value"), "test");
                }
            });

            kendo.bind(dom, observable);

            dom.data("kendoTextArea").value("test");
            dom.data("kendoTextArea").trigger("change");
        });

        it("creates label", function() {
            dom = $('<textarea data-role="textarea" data-label="test"/>');

            kendo.bind(dom);

            assert.equal(dom.data("kendoTextArea")._inputLabel[0].innerHTML, "test");
        });

        it("floating label wraps the widget", function() {
            dom = $('<textarea data-role="textarea" data-label="{ floating: true }"/>');

            kendo.bind(dom);

            assert.isOk(dom.data("kendoTextArea").wrapper.parent().hasClass("k-floating-label-container"));
            assert.isOk(dom.data("kendoTextArea").wrapper.parent().hasClass("k-state-empty"));
        });
    });
}());
