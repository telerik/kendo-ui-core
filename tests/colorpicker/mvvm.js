(function() {
    var dom;

    describe("colorpicker mvvm", function() {
        afterEach(function() {
            kendo.destroy(dom);
        });

        it("Initialize a ColorPicker when the data-role is colorpicker", function() {
            dom = $("<input data-role='colorpicker' />");
            kendo.bind(dom);
            var cp = dom.data("kendoColorPicker");
            assert.isOk(cp instanceof kendo.ui.ColorPicker);
        });

        it("Initialize value from view model", function() {
            dom = $("<input data-role='colorpicker' data-bind='value:value' />");
            kendo.bind(dom, { value: "rgb(255,0,0)" });
            assert.isOk(dom.data("kendoColorPicker").color().equals("#f00"));
        });

        it("Changing a value updates the model", function() {
            dom = $("<input data-role='colorpicker' data-bind='value:value' />");
            var observable = kendo.observable({ value: null });
            kendo.bind(dom, observable);
            dom.data("kendoColorPicker").color("#234");
            dom.data("kendoColorPicker").trigger("change");
            assert.equal(observable.value, "#223344");
        });

        it("Binding color picker initialized before binding", function() {
            dom = $("<input data-role='colorpicker' data-bind='value:value' />");
            var observable = kendo.observable({ value: "#234" });
            dom.kendoColorPicker();
            kendo.bind(dom, observable);
            assert.equal(dom.data("kendoColorPicker").value(), "#223344");
        });

        // XXX: does this test make any sense?
        it("Binding color picker initialized after binding", function() {
            dom = $("<input data-bind='value:value' />");
            var observable = kendo.observable({ value: null });
            observable.value = "#345";
            kendo.bind(dom, observable);
            dom.kendoColorPicker();
            assert.equal(dom.data("kendoColorPicker").value(), "#334455");
        });

        it("Updating model value changes the UI", function() {
            dom = $("<input data-role='colorpicker' data-bind='value:value' />");
            var observable = kendo.observable({ value: null });
            kendo.bind(dom, observable);
            observable.set("value", "#345");
            assert.equal(dom.data("kendoColorPicker").value(), "#334455");
        });

        it("Binding enabled to false disables the widget", function() {
            dom = $('<input data-bind="enabled:enabled" />').kendoColorPicker();
            var observable = kendo.observable({ enabled: false });
            kendo.bind(dom, observable);
            assert.isOk(dom.is(":disabled"));
        });

        it("Binding enabled to true enables the widget", function() {
            dom = $('<input data-bind="enabled:enabled" disabled="disabled" />').kendoColorPicker();
            var observable = kendo.observable({ enabled: true });
            kendo.bind(dom, observable);
            assert.isOk(!dom.is(":disabled"));
        });

        it("Binding disabled to true disables the widget", function() {
            dom = $('<input data-bind="disabled:disabled" />').kendoColorPicker();
            var observable = kendo.observable({ disabled: true });
            kendo.bind(dom, observable);
            assert.isOk(dom.is(":disabled"));
        });

        it("Binding disabled to false enables the widget", function() {
            dom = $('<input data-bind="disabled:disabled" disabled="disabled" />').kendoColorPicker();
            var observable = kendo.observable({ disabled: false });
            kendo.bind(dom, observable);
            assert.isOk(!dom.is(":disabled"));
        });

        it("Binding visible to false hides the widget", function() {
            dom = $('<input data-bind="visible:visible" data-role="colorpicker"/>');
            var observable = kendo.observable({ visible: false });
            kendo.bind(dom, observable);
            assert.isOk(dom.data("kendoColorPicker").wrapper.css("display") == "none", "Display is 'none'");
        });

        it("Binding visible to true shows the widget", function() {
            dom = $('<input data-bind="visible:visible" data-role="colorpicker" style="display:none"/>');
            var observable = kendo.observable({ visible: true });
            kendo.bind(dom, observable);
            assert.isOk(dom.data("kendoColorPicker").wrapper.css("display") != "none", "Display is not 'none'");
        });

        it("Changing visible to false hides the widget", function() {
            dom = $('<input data-bind="visible:visible" data-role="colorpicker"/>');
            var observable = kendo.observable({ visible: true });
            kendo.bind(dom, observable);
            observable.set("visible", false);
            assert.isOk(dom.data("kendoColorPicker").wrapper.css("display") == "none", "Display is 'none'");
        });

        it("Changing visible to true shows the widget", function() {
            dom = $('<input data-bind="visible:visible" data-role="colorpicker"/>');
            var observable = kendo.observable({ visible: false });
            kendo.bind(dom, observable);
            observable.set("visible", true);
            assert.isOk(dom.data("kendoColorPicker").wrapper.css("display") != "none", "Display is not 'none'");
        });

        it("Binding invisible to true hides the widget", function() {
            dom = $('<input data-bind="invisible:invisible" data-role="colorpicker"/>');
            var observable = kendo.observable({ invisible: true });
            kendo.bind(dom, observable);
            assert.isOk(dom.data("kendoColorPicker").wrapper.css("display") == "none", "display is 'none'");
        });

        it("Binding invisible to false shows the widget", function() {
            dom = $('<input data-bind="invisible:invisible" data-role="colorpicker" style="display:none"/>');
            var observable = kendo.observable({ invisible: false });
            kendo.bind(dom, observable);
            assert.isOk(dom.data("kendoColorPicker").wrapper.css("display") != "none", "display is not 'none'");
        });

        it("Changing invisible to true hides the widget", function() {
            dom = $('<input data-bind="invisible:invisible" data-role="colorpicker"/>');
            var observable = kendo.observable({ invisible: false });
            kendo.bind(dom, observable);
            observable.set("invisible", true);
            assert.isOk(dom.data("kendoColorPicker").wrapper.css("display") == "none", "display is 'none'");
        });

        it("Changing invisible to false shows the widget", function() {
            dom = $('<input data-bind="invisible:invisible" data-role="colorpicker"/>');
            var observable = kendo.observable({ invisible: true });
            kendo.bind(dom, observable);
            observable.set("invisible", false);
            assert.isOk(dom.data("kendoColorPicker").wrapper.css("display") != "none", "display is not 'none'");
        });

        it("Change event reflects value modifications", function() {
            dom = $('<input data-bind="value:value, events:{change: changeEvent}" data-role="colorpicker"/>');
            var observable = kendo.observable({
                value: "#fff",
                changeEvent: function() {
                    assert.equal(this.get("value"), "#ff0000");
                }
            });
            kendo.bind(dom, observable);
            dom.data("kendoColorPicker").value("#f00");
            dom.data("kendoColorPicker").trigger("change");
        });
    });
}());
