test("Initialize a ColorPicker when the data-role is colorpicker", function(){
    var dom = $("<input data-role='colorpicker' />");
    kendo.bind(dom);
    var cp = dom.data("kendoColorPicker");
    ok(cp instanceof kendo.ui.ColorPicker);
});

test("Initialize value from view model", function(){
    var dom = $("<input data-role='colorpicker' data-bind='value:value' />");
    kendo.bind(dom, { value: "rgb(255,0,0)" });
    ok(dom.data("kendoColorPicker").color().equals("#f00"));
});

test("Changing a value updates the model", function(){
    var dom = $("<input data-role='colorpicker' data-bind='value:value' />");
    var observable = kendo.observable({ value: null });
    kendo.bind(dom, observable);
    dom.data("kendoColorPicker").color("#234");
    dom.data("kendoColorPicker").trigger("change");
    equal(observable.value, "#223344");
});

test("Binding color picker initialized before binding", function(){
    var dom = $("<input data-role='colorpicker' data-bind='value:value' />");
    var observable = kendo.observable({ value: "#234" });
    dom.kendoColorPicker();
    kendo.bind(dom, observable);
    equal(dom.data("kendoColorPicker").value(), "#223344");
});

// XXX: does this test make any sense?
test("Binding color picker initialized after binding", function(){
    var dom = $("<input data-role='colorpicker' data-bind='value:value' />");
    var observable = kendo.observable({ value: null });
    observable.value = "#345";
    kendo.bind(dom, observable);
    dom.kendoColorPicker();
    equal(dom.data("kendoColorPicker").value(), "#334455");
});

test("Updating model value changes the UI", function(){
    var dom = $("<input data-role='colorpicker' data-bind='value:value' />");
    var observable = kendo.observable({ value: null });
    kendo.bind(dom, observable);
    observable.set("value", "#345");
    equal(dom.data("kendoColorPicker").value(), "#334455");
});
