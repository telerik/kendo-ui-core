(function() {

var DatePicker = kendo.ui.DatePicker,
    input, instance;

module("kendo.ui.DatePicker ARIA", {
    setup: function() {
        kendo.effects.disable();
        input = $("<input id='test' />").appendTo(QUnit.fixture);
        instance = new DatePicker(input, {
            ARIATemplate: "#=kendo.toString(current, 'D')#"
        });
    },
    teardown: function() {
        kendo.effects.enable();
        instance.destroy();
        kendo.destroy(QUnit.fixture);
    }
});

test("DatePicker adds role to the input element", function() {
    equal(input.attr("role"), "combobox");
});

test("DatePicker adds aria-owns", function() {
    equal(input.attr("aria-owns"), "test_dateview");
});

test("DatePicker sets id to the popup element", function() {
    equal(instance.dateView.popup.element.attr("id"), "test_dateview");
});

test("DatePicker adds aria-expanded", function() {
    equal(input.attr("aria-expanded"), "false");
});

test("DatePicker sets aria-expanded to true", function() {
    instance.open();
    equal(input.attr("aria-expanded"), "true");
});

test("DatePicker sets aria-hidden=false to the popup element", function() {
    instance.open();
    equal(instance.dateView.popup.element.attr("aria-hidden"), "false");
});

test("DatePicker sets aria-hidden=true to the popup element", function() {
    instance.open();
    instance.close();
    equal(instance.dateView.popup.element.attr("aria-hidden"), "true");
});

test("DatePicker adds aria-disabled=false", function() {
    equal(input.attr("aria-disabled"), "false");
});

test("DatePicker sets aria-disabled=true", function() {
    instance.enable(false);
    equal(input.attr("aria-disabled"), "true");
});

test("DatePicker adds role to the toggle button", function() {
    equal(instance._dateIcon.attr("role"), "button");
});

test("DatePicker adds aria-controls to the toggle button", function() {
    equal(instance._dateIcon.attr("aria-controls"), "test_dateview");
});

test("DatePicker sets id to the calendar", function() {
    instance.dateView._calendar();

    ok(instance.dateView.calendar.element.attr("id"));
});

test("DatePicker sets aria-activedescendant after navigation", function() {
    instance.open();

    instance.element.focus().trigger({
        type: "keydown",
        preventDefault: function() {},
        keyCode: 40
    });

    var cell = instance.dateView.calendar.element.find("td.k-state-focused");

    equal(instance.element.attr("aria-activedescendant"), cell.attr("id"));
});

test("DatePicker sets aria-label to focused cell", function() {
    instance.open();

    var date = kendo.date.today();
    var cell = instance.dateView.calendar.element.find("td.k-state-focused");

    equal(cell.attr("aria-label"), kendo.toString(date, "D"));
});

test("DatePicker removes aria-label from previous cell", function() {
    instance.open();

    instance.element.focus().trigger({
        type: "keydown",
        preventDefault: function() {},
        keyCode: 40
    });

    var date = kendo.date.today();
    var cell = instance.dateView.calendar.element.find("td[aria-label]");

    equal(cell.length, 1);
});

})();
