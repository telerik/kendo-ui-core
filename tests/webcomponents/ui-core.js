(function() {
    return;
    var coreWidgets = [
        "AutoComplete",
        "Button",
        "Calendar",
        "ColorPicker",
        "ComboBox",
        "DatePicker",
        "DateTimePicker",
        "DropDownList",
        "ListView",
        "MaskedTextBox",
        "Menu",
        "MultiSelect",
        "NumericTextBox",
        "PanelBar",
        "ProgressBar",
        "Slider",
        "Sortable",
        // "Splitter", Cannot initialize splitter with no nested divs. Separate test added
        "TabStrip",
        "TimePicker",
        "Tooltip",
        "Window"
    ];
    var mobileWidgets = [
        "Button",
        "BackButton",
        "DetailButton",
        "Switch",
        "ListView"
    ];
    var dom;

    module("WebComponents - Kendo UI Core", {
        setup: function() {
            QUnit.fixture.empty();
            dom = $("<div/>").appendTo(QUnit.fixture);
        },
        teardown: function() {
            kendo.destroy(dom);
            dom.remove();
        }
    });
    test("custom elements are created for core widgets", function() {
        coreWidgets.forEach(function(name) {
            var element = $("<kendo-"+ name.toLowerCase() +"/>").appendTo(dom)[0];
            ok(element.widget instanceof kendo.ui[name], name + " is not registered as a component");

        });
    });

    test("custom elements are created for mobile widgets", function() {
        mobileWidgets.forEach(function(name) {
            var element = $("<kendo-mobile"+ name.toLowerCase() +"/>").appendTo(dom)[0];
            ok(element.widget instanceof kendo.mobile.ui[name], name + " is not registered as a component");
        });
    });

    test("Window gets its content option from element's childNodes", function() {
        var element = $("<kendo-window>foo</kendo-window>").appendTo(dom)[0];
        equal(element.content(), "foo");
    });

    test("Splitter gets its panes option from element's childNodes", function() {
        var element = $("<kendo-splitter><div></div></kendo-splitter>").appendTo(dom)[0];
        equal(element._panes().length, 1);
    });
})();
