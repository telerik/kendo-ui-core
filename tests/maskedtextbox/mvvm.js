(function() {
    var dom;

    module("kendo.ui.MaskedTextBox MVVM", {
        setup: function() {
            kendo.effects.disable();

            window.maskedtextboxChange = function() {
                ok(true);
            }
        },
        teardown: function() {
            kendo.effects.enable();
            kendo.destroy(dom);

            delete window.maskedtextboxChange;
        }
    });

    test("initializes a maskedtextbox when data role is maskedtextbox", function() {
        dom = $('<input data-role="maskedtextbox"/>');

        kendo.bind(dom);

        ok(dom.data("kendoMaskedTextBox") instanceof kendo.ui.MaskedTextBox);
    });

    test("initializes a options from data attributes", function() {
        dom = $('<input data-role="maskedtextbox" data-mask="(00)-(00)" />');

        kendo.bind(dom);

        var maskedtextbox = dom.data("kendoMaskedTextBox");

        equal(maskedtextbox.options.mask, "(00)-(00)");
    });

    test("initializes value from view model", function() {
        dom = $('<input data-role="maskedtextbox" data-mask="(00)" data-bind="value:value" />');

        kendo.bind(dom, { value: "(42)" } );

        equal(dom.data("kendoMaskedTextBox").value(), "(42)");
    });

    test("changing a value updates the view model", function() {
        dom = $('<input data-role="maskedtextbox" data-mask="(00)" data-bind="value:value" />');

        var observable = kendo.observable({ value: null });

        kendo.bind(dom, observable);

        dom.data("kendoMaskedTextBox").value("(42)");
        dom.data("kendoMaskedTextBox").trigger("change");

        equal(observable.value, "(42)");
    });

    test("binding maskedtextbox initialized before binding", function() {
        dom = $('<input data-bind="value:value" />');

        var observable = kendo.observable({ value: null });
        observable.value = "(42)";

        dom.kendoMaskedTextBox({
            mask: "(00)"
        });

        kendo.bind(dom, observable);

        equal(dom.data("kendoMaskedTextBox").value(), "(42)");
    });

    test("binding maskedtextbox initialized after binding", function() {
        dom = $('<input data-bind="value:value" />');

        var observable = kendo.observable({ value: null });
        observable.value = "(42)";

        kendo.bind(dom, observable);

        dom.kendoMaskedTextBox({
            mask: "(00)"
        });

        equal(dom.data("kendoMaskedTextBox").value(), "(42)");
    });

    test("updating model value updates the UI", function() {
        dom = $('<input data-bind="value:value" />');

        var observable = kendo.observable({ value: null });

        kendo.bind(dom, observable);

        dom.kendoMaskedTextBox({
            mask: "(00)"
        });

        observable.set("value", "(42)")
        equal(dom.data("kendoMaskedTextBox").value(), "(42)");
    });

    test("bindings are removed if element is rebind", 1, function() {
        dom = $('<input data-role="maskedtextbox" data-mask="(00)" data-bind="value:value" />');

        var observable = kendo.observable({ value: "(42)" });

        kendo.bind(dom, observable);

        destroy = stub(dom[0].kendoBindingTarget, "destroy");

        kendo.bind(dom, observable);

        equal(destroy.calls("destroy"), 1);
    });

    test("binding target is destroyed", 1, function() {
        dom = $('<input data-role="maskedtextbox" data-mask="(00)" data-bind="value:value"/>');

        var observable = kendo.observable({ value: null });

        kendo.bind(dom, observable);

        destroy = stub(dom[0].kendoBindingTarget, "destroy");

        kendo.bind(dom, observable);

        equal(destroy.calls("destroy"), 1);
    });

    test("binding enabled to false disables the widget", function() {
        dom = $('<input data-bind="enabled:enabled" />').kendoMaskedTextBox({ mask: "(0)" });

        var observable = kendo.observable({
            enabled: false
        });

        kendo.bind(dom, observable);

        ok(dom.is(":disabled"));
    });

    test("binding enabled to true enables the widget", function() {
        dom = $('<input data-bind="enabled:enabled" disabled="disabled" />').kendoMaskedTextBox({ mask: "(0)" });

        var observable = kendo.observable({
            enabled: true
        });

        kendo.bind(dom, observable);

        ok(!dom.is(":disabled"));
    });

    test("binding disable to true disables the widget", function() {
        dom = $('<input data-bind="disabled:disabled" disabled="disabled" data-mask="(0)" data-role="maskedtextbox" />');

        var observable = kendo.observable({
            disabled: false
        });

        kendo.bind(dom, observable);

        ok(!dom.is(":disabled"));
    });

    test("binding disabled to false enables the widget", function() {
        dom = $('<input data-bind="disabled:disabled" data-mask="(0)" data-role="maskedtextbox" />');

        var observable = kendo.observable({
            disabled: true
        });

        kendo.bind(dom, observable);

        ok(dom.is(":disabled"));
    });

    test("binding visible to false hides the widget", function() {
        dom = $('<input data-bind="visible:visible" data-role="maskedtextbox"/>');

        var observable = kendo.observable({
            visible: false
        });

        kendo.bind(dom, observable);

        ok(dom.data("kendoMaskedTextBox").wrapper.css("display") == "none", "Display is 'none'");
    });

    test("binding visible to true shows the widget", function() {
        dom = $('<input data-bind="visible:visible" data-role="maskedtextbox" style="display:none"/>');

        var observable = kendo.observable({
            visible: true
        });

        kendo.bind(dom, observable);

        ok(dom.data("kendoMaskedTextBox").wrapper.css("display") != "none", "Display is not 'none'");
    });

    test("changing visible to false hides the widget", function() {
        dom = $('<input data-bind="visible:visible" data-role="maskedtextbox"/>');

        var observable = kendo.observable({
            visible: true
        });

        kendo.bind(dom, observable);
        observable.set("visible", false);

        ok(dom.data("kendoMaskedTextBox").wrapper.css("display") == "none", "Display is 'none'");
    });

    test("changing visible to true shows the widget", function() {
        dom = $('<input data-bind="visible:visible" data-role="maskedtextbox"/>');

        var observable = kendo.observable({
            visible: false
        });

        kendo.bind(dom, observable);
        observable.set("visible", true);

        ok(dom.data("kendoMaskedTextBox").wrapper.css("display") != "none", "Display is not 'none'");
    });

    test("binding invisible to true hides the widget", function() {
        dom = $('<input data-bind="invisible:invisible" data-role="maskedtextbox"/>');

        var observable = kendo.observable({
            invisible: true
        });

        kendo.bind(dom, observable);

        ok(dom.data("kendoMaskedTextBox").wrapper.css("display") == "none", "display is 'none'");
    });

    test("binding invisible to false shows the widget", function() {
        dom = $('<input data-bind="invisible:invisible" data-role="maskedtextbox" style="display:none"/>');

        var observable = kendo.observable({
            invisible: false
        });

        kendo.bind(dom, observable);

        ok(dom.data("kendoMaskedTextBox").wrapper.css("display") != "none", "display is not 'none'");
    });

    test("changing invisible to true hides the widget", function() {
        dom = $('<input data-bind="invisible:invisible" data-role="maskedtextbox"/>');

        var observable = kendo.observable({
            invisible: false
        });

        kendo.bind(dom, observable);
        observable.set("invisible", true);

        ok(dom.data("kendoMaskedTextBox").wrapper.css("display") == "none", "display is 'none'");
    });

    test("changing invisible to false shows the widget", function() {
        dom = $('<input data-bind="invisible:invisible" data-role="maskedtextbox"/>');

        var observable = kendo.observable({
            invisible: true
        });

        kendo.bind(dom, observable);
        observable.set("invisible", false);

        ok(dom.data("kendoMaskedTextBox").wrapper.css("display") != "none", "display is not 'none'");
    });

    test("change event reflects value modifications", 1, function() {
        dom = $('<input data-bind="value:value, events:{change: changeEvent}" data-mask="(00)" data-role="maskedtextbox"/>');

        var observable = kendo.observable({
            value: 0,
            changeEvent: function() {
                equal(this.get("value"), "(42)");
            }
        });

        kendo.bind(dom, observable);

        dom.data("kendoMaskedTextBox").value("(42)");
        dom.data("kendoMaskedTextBox").trigger("change");
    });
})();
