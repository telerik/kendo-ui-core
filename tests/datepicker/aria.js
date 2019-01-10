(function() {

var DatePicker = kendo.ui.DatePicker,
    input, instance;

describe("kendo.ui.DatePicker ARIA", function () {
    beforeEach(function() {

        input = $("<input id='test' />").appendTo(Mocha.fixture);
        instance = new DatePicker(input, {
            ARIATemplate: "#=kendo.toString(current, 'D')#"
        });
    });
    afterEach(function() {

        instance.destroy();
        kendo.destroy(Mocha.fixture);
    });

it("DatePicker adds role to the input element", function() {
    assert.equal(input.attr("role"), "combobox");
});

it("DatePicker adds aria-owns", function() {
    assert.equal(input.attr("aria-owns"), "test_dateview");
});

it("DatePicker sets id to the popup element", function() {
    assert.equal(instance.dateView.popup.element.attr("id"), "test_dateview");
});

it("DatePicker adds aria-expanded", function() {
    assert.equal(input.attr("aria-expanded"), "false");
});

it("DatePicker sets aria-expanded to true", function() {
    instance.open();
    assert.equal(input.attr("aria-expanded"), "true");
});

it("DatePicker sets aria-hidden=false to the popup element", function() {
    instance.open();
    assert.equal(instance.dateView.popup.element.attr("aria-hidden"), "false");
});

it("DatePicker sets aria-hidden=true to the popup element", function() {
    instance.open();
    instance.close();
    assert.equal(instance.dateView.popup.element.attr("aria-hidden"), "true");
});

it("DatePicker adds aria-disabled=false", function() {
    assert.equal(input.attr("aria-disabled"), "false");
});

it("DatePicker sets aria-disabled=true", function() {
    instance.enable(false);
    assert.equal(input.attr("aria-disabled"), "true");
});

it("DatePicker adds role to the toggle button", function() {
    assert.equal(instance._dateIcon.attr("role"), "button");
});

it("DatePicker adds aria-controls to the toggle button", function() {
    assert.equal(instance._dateIcon.attr("aria-controls"), "test_dateview");
});

it("DatePicker sets id to the calendar", function() {
    instance.dateView._calendar();

    assert.isOk(instance.dateView.calendar.element.attr("id"));
});

it("DatePicker sets aria-activedescendant after navigation", function() {
    instance.open();

    instance.element.focus().trigger({
        type: "keydown",
        preventDefault: function() {},
        keyCode: 40
    });

    var cell = instance.dateView.calendar.element.find("td.k-state-focused");

    assert.equal(instance.element.attr("aria-activedescendant"), cell.attr("id"));
});

it("DatePicker sets aria-label to focused cell", function() {
    instance.open();

    var date = kendo.date.today();
    var cell = instance.dateView.calendar.element.find("td.k-state-focused");

    assert.equal(cell.attr("aria-label"), kendo.toString(date, "D"));
});

it("DatePicker removes aria-label from previous cell", function() {
    instance.open();

    instance.element.focus().trigger({
        type: "keydown",
        preventDefault: function() {},
        keyCode: 40
    });

    var date = kendo.date.today();
    var cell = instance.dateView.calendar.element.find("td[aria-label]");

    assert.equal(cell.length, 1);
});

    });
}());
