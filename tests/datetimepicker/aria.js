(function() {

var DateTimePicker = kendo.ui.DateTimePicker,
    input, instance;

module("kendo.ui.DateTimePicker ARIA", {
    setup: function() {
        input = $("<input id='test' />").appendTo(QUnit.fixture);

        kendo.effects.disable();
        instance = new DateTimePicker(input, {
            ARIATemplate: "#=kendo.toString(current, 'G')#"
        });
    },
    teardown: function() {
        instance.destroy();
    }
});

test("DateTimePicker adds role to the input element", function() {
    equal(input.attr("role"), "combobox");
});

test("DateTimePicker adds aria-expanded", function() {
    equal(input.attr("aria-expanded"), "false");
});

test("DateTimePicker sets aria-expanded=true", function() {
    instance.open();
    equal(input.attr("aria-expanded"), "true");
});

test("DateTimePicker sets aria-expanded=false", function() {
    instance.open();
    instance.close();
    equal(input.attr("aria-expanded"), "false");
});

test("DateTimePicker adds role to the toggle button", function() {
    equal(instance._dateIcon.attr("role"), "button");
    equal(instance._timeIcon.attr("role"), "button");
});

test("DateTimePicker adds aria-controls to the toggle button", function() {
    equal(instance._dateIcon.attr("aria-controls"), instance.dateView.popup.element.attr("id"));
    equal(instance._timeIcon.attr("aria-controls"), instance.timeView.ul.attr("id"));
});

test("DateTimePicker sets id to the ul element", function() {
    equal(instance.timeView.ul.attr("id"), "test_timeview");
});

test("DateTimePicker sets id to the div element of the dateView", function() {
    equal(instance.dateView.div.attr("id"), "test_dateview");
});

test("DateTimePicker sets aria-selected to the selected option", function() {
    instance.open("time");
    instance.value("12:00 AM");
    equal(instance.timeView.current().attr("aria-selected"), "true");
});

test("DateTimePicker sets aria-owns to the DateView id", function() {
    instance.open("date");
    equal(instance.element.attr("aria-owns"), instance.dateView._dateViewID);
});

test("DateTimePicker removes aria-owns to the DateView id", function() {
    instance.open("date");
    instance.close("date");
    equal(instance.element.attr("aria-owns"), undefined);
});

test("DateTimePicker sets aria-owns to the DateView id", function() {
    instance.open("date");
    instance.open("time");
    equal(instance.element.attr("aria-owns"), instance.timeView._timeViewID);
});

test("DateTimePicker removes aria-owns to the DateView id", function() {
    instance.open("time");
    instance.close("time");
    equal(instance.element.attr("aria-owns"), undefined);
});

test("DateTimePicker sets aria-activedescendant", function() {
    instance.value("10/10/2000 12:00 AM");
    instance.open("time");

    equal(instance.element.attr("aria-activedescendant"), instance.timeView._optionID);
});

test("DateTimePicker sets aria-activedescendant after navigation", function() {
    instance.open();

    instance.element.focus().trigger({
        type: "keydown",
        preventDefault: function() {},
        keyCode: 40
    });

    var cell = instance.dateView.calendar.element.find("td.k-state-focused");

    equal(instance.element.attr("aria-activedescendant"), cell.attr("id"));
});

test("DateTimePicker sets aria-label to focused cell", function() {
    instance.open();

    var date = kendo.date.today();
    var cell = instance.dateView.calendar.element.find("td.k-state-focused");

    equal(cell.attr("aria-label"), kendo.toString(date, "G"));
});

test("DateTimePicker removes aria-label from previous cell", function() {
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
