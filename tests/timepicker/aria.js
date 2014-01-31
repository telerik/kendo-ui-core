(function() {
    var TimePicker = kendo.ui.TimePicker,
        input, instance;

    module("kendo.ui.TimePicker ARIA", {
        setup: function() {
            input = $("<input id='test' />").appendTo(QUnit.fixture);
            instance = new TimePicker(input);
        },
        teardown: function() {
            input.data("kendoTimePicker").destroy();
            input.parents(".k-widget").remove();
        }
    });

    test("TimePicker adds role to the input element", function() {
        equal(input.attr("role"), "combobox");
    });

    test("TimePicker adds aria-expanded", function() {
        equal(input.attr("aria-expanded"), "false");
    });

    test("TimePicker adds aria-owns", function() {
        equal(input.attr("aria-owns"), instance.timeView.ul.attr("id"));
    });

    test("TimePicker sets aria-expanded=true", function() {
        instance.open();
        equal(input.attr("aria-expanded"), "true");
    });

    test("TimePicker sets aria-expanded=false", function() {
        instance.open();
        instance.close();
        equal(input.attr("aria-expanded"), "false");
    });

    test("TimePicker adds role to the toggle button", function() {
        equal(instance._arrow.attr("role"), "button");
    });

    test("TimePicker adds aria-controls to the toggle button", function() {
        equal(instance._arrow.attr("aria-controls"), instance.timeView.ul.attr("id"));
    });

    test("TimePicker sets id to the ul element", function() {
        equal(instance.timeView.ul.attr("id"), "test_timeview");
    });

    test("TimePicker adds role to the popup", function() {
        equal(instance.timeView.ul.attr("role"), "listbox");
    });

    test("TimePicker adds aria-hidden to the popup", function() {
        equal(instance.timeView.ul.attr("aria-hidden"), "true");
    });

    test("TimePicker sets aria-hidden=false to the popup", function() {
        instance.open();
        equal(instance.timeView.ul.attr("aria-hidden"), "false");
    });

    test("TimePicker sets aria-hidden=true to the popup", function() {
        instance.open();
        instance.close();
        equal(instance.timeView.ul.attr("aria-hidden"), "true");
    });

    test("TimePicker renders li elements with role attr", function() {
        instance.open();
        equal(instance.timeView.ul.children(":first").attr("role"), "option");
    });

    test("TimePicker sets aria-selected to the selected option", function() {
        instance.open();
        instance.value("12:00 AM");
        equal(instance.timeView.current().attr("aria-selected"), "true");
    });

    test("TimePicker allows only one selected option", function() {
        instance.open();
        instance.value("12:00 AM");
        instance.value("2:00 AM");
        equal(instance.timeView.ul.children("[aria-selected=true]").length, 1);
    });

    test("TimePicker sets aria-activedescendant", function() {
        instance.open();
        instance.value("12:00 AM");
        equal(instance.element.attr("aria-activedescendant"), instance.timeView._optionID);
    });

    test("TimePicker removes aria-activedescendant", function() {
        instance.open();
        instance.value("12:00 AM");
        instance.value("12:10 AM");
        equal(instance.element.attr("aria-activedescendant"), undefined);
    });


})();
