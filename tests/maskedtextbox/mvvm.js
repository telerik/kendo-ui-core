(function() {
    var dom;

    describe("kendo.ui.MaskedTextBox MVVM", function() {
        beforeEach(function() {


            window.maskedtextboxChange = function() {
                assert.isOk(true);
            }
        });
        afterEach(function() {

            kendo.destroy(dom);

            delete window.maskedtextboxChange;
        });

        it("initializes a maskedtextbox when data role is maskedtextbox", function() {
            dom = $('<input data-role="maskedtextbox"/>');

            kendo.bind(dom);

            assert.isOk(dom.data("kendoMaskedTextBox") instanceof kendo.ui.MaskedTextBox);
        });

        it("initializes a options from data attributes", function() {
            dom = $('<input data-role="maskedtextbox" data-mask="(00)-(00)" />');

            kendo.bind(dom);

            var maskedtextbox = dom.data("kendoMaskedTextBox");

            assert.equal(maskedtextbox.options.mask, "(00)-(00)");
        });

        it("initializes value from view model", function() {
            dom = $('<input data-role="maskedtextbox" data-mask="(00)" data-bind="value:value" />');

            kendo.bind(dom, { value: "(42)" });

            assert.equal(dom.data("kendoMaskedTextBox").value(), "(42)");
        });

        it("changing a value updates the view model", function() {
            dom = $('<input data-role="maskedtextbox" data-mask="(00)" data-bind="value:value" />');

            var observable = kendo.observable({ value: null });

            kendo.bind(dom, observable);

            dom.data("kendoMaskedTextBox").value("(42)");
            dom.data("kendoMaskedTextBox").trigger("change");

            assert.equal(observable.value, "(42)");
        });

        it("binding maskedtextbox initialized before binding", function() {
            dom = $('<input data-bind="value:value" />');

            var observable = kendo.observable({ value: null });
            observable.value = "(42)";

            dom.kendoMaskedTextBox({
                mask: "(00)"
            });

            kendo.bind(dom, observable);

            assert.equal(dom.data("kendoMaskedTextBox").value(), "(42)");
        });

        it("binding maskedtextbox initialized after binding", function() {
            dom = $('<input data-bind="value:value" />');

            var observable = kendo.observable({ value: null });
            observable.value = "(42)";

            kendo.bind(dom, observable);

            dom.kendoMaskedTextBox({
                mask: "(00)"
            });

            assert.equal(dom.data("kendoMaskedTextBox").value(), "(42)");
        });

        it("updating model value updates the UI", function() {
            dom = $('<input data-bind="value:value" />');

            var observable = kendo.observable({ value: null });

            kendo.bind(dom, observable);

            dom.kendoMaskedTextBox({
                mask: "(00)"
            });

            observable.set("value", "(42)")
            assert.equal(dom.data("kendoMaskedTextBox").value(), "(42)");
        });

        it("bindings are removed if element is rebind", function() {
            dom = $('<input data-role="maskedtextbox" data-mask="(00)" data-bind="value:value" />');

            var observable = kendo.observable({ value: "(42)" });

            kendo.bind(dom, observable);

            destroy = stub(dom[0].kendoBindingTarget, "destroy");

            kendo.bind(dom, observable);

            assert.equal(destroy.calls("destroy"), 1);
        });

        it("binding target is destroyed", function() {
            dom = $('<input data-role="maskedtextbox" data-mask="(00)" data-bind="value:value"/>');

            var observable = kendo.observable({ value: null });

            kendo.bind(dom, observable);

            destroy = stub(dom[0].kendoBindingTarget, "destroy");

            kendo.bind(dom, observable);

            assert.equal(destroy.calls("destroy"), 1);
        });

        it("binding enabled to false disables the widget", function() {
            dom = $('<input data-bind="enabled:enabled" />').kendoMaskedTextBox({ mask: "(0)" });

            var observable = kendo.observable({
                enabled: false
            });

            kendo.bind(dom, observable);

            assert.isOk(dom.is(":disabled"));
        });

        it("binding enabled to true enables the widget", function() {
            dom = $('<input data-bind="enabled:enabled" disabled="disabled" />').kendoMaskedTextBox({ mask: "(0)" });

            var observable = kendo.observable({
                enabled: true
            });

            kendo.bind(dom, observable);

            assert.isOk(!dom.is(":disabled"));
        });

        it("binding disable to true disables the widget", function() {
            dom = $('<input data-bind="disabled:disabled" disabled="disabled" data-mask="(0)" data-role="maskedtextbox" />');

            var observable = kendo.observable({
                disabled: false
            });

            kendo.bind(dom, observable);

            assert.isOk(!dom.is(":disabled"));
        });

        it("binding disabled to false enables the widget", function() {
            dom = $('<input data-bind="disabled:disabled" data-mask="(0)" data-role="maskedtextbox" />');

            var observable = kendo.observable({
                disabled: true
            });

            kendo.bind(dom, observable);

            assert.isOk(dom.is(":disabled"));
        });

        it("binding visible to false hides the widget", function() {
            dom = $('<input data-bind="visible:visible" data-role="maskedtextbox"/>');

            var observable = kendo.observable({
                visible: false
            });

            kendo.bind(dom, observable);

            assert.isOk(dom.data("kendoMaskedTextBox").wrapper.css("display") == "none", "Display is 'none'");
        });

        it("binding visible to true shows the widget", function() {
            dom = $('<input data-bind="visible:visible" data-role="maskedtextbox" style="display:none"/>');

            var observable = kendo.observable({
                visible: true
            });

            kendo.bind(dom, observable);

            assert.isOk(dom.data("kendoMaskedTextBox").wrapper.css("display") != "none", "Display is not 'none'");
        });

        it("changing visible to false hides the widget", function() {
            dom = $('<input data-bind="visible:visible" data-role="maskedtextbox"/>');

            var observable = kendo.observable({
                visible: true
            });

            kendo.bind(dom, observable);
            observable.set("visible", false);

            assert.isOk(dom.data("kendoMaskedTextBox").wrapper.css("display") == "none", "Display is 'none'");
        });

        it("changing visible to true shows the widget", function() {
            dom = $('<input data-bind="visible:visible" data-role="maskedtextbox"/>');

            var observable = kendo.observable({
                visible: false
            });

            kendo.bind(dom, observable);
            observable.set("visible", true);

            assert.isOk(dom.data("kendoMaskedTextBox").wrapper.css("display") != "none", "Display is not 'none'");
        });

        it("binding invisible to true hides the widget", function() {
            dom = $('<input data-bind="invisible:invisible" data-role="maskedtextbox"/>');

            var observable = kendo.observable({
                invisible: true
            });

            kendo.bind(dom, observable);

            assert.isOk(dom.data("kendoMaskedTextBox").wrapper.css("display") == "none", "display is 'none'");
        });

        it("binding invisible to false shows the widget", function() {
            dom = $('<input data-bind="invisible:invisible" data-role="maskedtextbox" style="display:none"/>');

            var observable = kendo.observable({
                invisible: false
            });

            kendo.bind(dom, observable);

            assert.isOk(dom.data("kendoMaskedTextBox").wrapper.css("display") != "none", "display is not 'none'");
        });

        it("changing invisible to true hides the widget", function() {
            dom = $('<input data-bind="invisible:invisible" data-role="maskedtextbox"/>');

            var observable = kendo.observable({
                invisible: false
            });

            kendo.bind(dom, observable);
            observable.set("invisible", true);

            assert.isOk(dom.data("kendoMaskedTextBox").wrapper.css("display") == "none", "display is 'none'");
        });

        it("changing invisible to false shows the widget", function() {
            dom = $('<input data-bind="invisible:invisible" data-role="maskedtextbox"/>');

            var observable = kendo.observable({
                invisible: true
            });

            kendo.bind(dom, observable);
            observable.set("invisible", false);

            assert.isOk(dom.data("kendoMaskedTextBox").wrapper.css("display") != "none", "display is not 'none'");
        });

        it("change event reflects value modifications", function() {
            dom = $('<input data-bind="value:value, events:{change: changeEvent}" data-mask="(00)" data-role="maskedtextbox"/>');

            var observable = kendo.observable({
                value: 0,
                changeEvent: function() {
                    assert.equal(this.get("value"), "(42)");
                }
            });

            kendo.bind(dom, observable);

            dom.data("kendoMaskedTextBox").value("(42)");
            dom.data("kendoMaskedTextBox").trigger("change");
        });

        it("mask should not be parsed to number", function() {
            dom = $('<input data-bind="value:value" data-mask="000" data-role="maskedtextbox"/>');

            var observable = kendo.observable({
                value: "123aaa",
            });

            kendo.bind(dom, observable);

            assert.equal(dom.val(), "123")
        });
    });
}());
