(function() {

var DatePicker = kendo.ui.DatePicker,
    input, instance;

describe("kendo.ui.DatePicker ARIA", function() {
    beforeEach(function() {

        input = $("<input id='test' />").appendTo(Mocha.fixture);
        instance = new DatePicker(input, {
            ARIATemplate: ({ current }) => `${kendo.toString(current, 'D')}`
        });
    });
    afterEach(function() {

        instance.destroy();
        kendo.destroy(Mocha.fixture);
    });

it("DatePicker adds role to the input element", function() {
    assert.equal(input.attr("role"), "combobox");
});

it("DatePicker adds aria-controls", function() {
    assert.equal(input.attr("aria-controls"), "test_dateview");
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

it("DatePicker sets aria-haspopup to grid", function() {
    instance.open();
    assert.equal(input.attr("aria-haspopup"), "grid");
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

it("DatePicker sets aria-disabled=true", function() {
    instance.enable(false);
    assert.equal(input.attr("aria-disabled"), "true");
});

it("DatePicker sets aria-disabled to false after state is changed", function() {
    instance.enable(false);
    instance.enable(true);

    assert.equal(input.attr("aria-disabled"), "false");
});

it("DatePicker sets aria-readonly=true", function() {
    instance.readonly(true);
    assert.equal(input.attr("aria-readonly"), "true");
});

it("DatePicker sets aria-readonly to false after state is changed", function() {
    instance.readonly(true);
    instance.readonly(false);

    assert.equal(input.attr("aria-readonly"), "false");
});

it("DatePicker adds role to the toggle button", function() {
    assert.equal(instance._dateIcon.attr("role"), "button");
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

    var cell = instance.dateView.calendar.element.find("td.k-focus");

    assert.equal(instance.element.attr("aria-activedescendant"), cell.attr("id"));
});

it("navigate to new month in DateView should update the aria-activedescendant", function() {
    jasmine.clock().install();
    instance.open();

    instance.element.focus();

    instance.dateView.calendar.element.find(".k-nav-next").trigger("click");
    instance.dateView.calendar.element.find(".k-nav-next").trigger("click");

    var cell = instance.dateView.calendar.element.find("td.k-focus");

    jasmine.clock().tick();
    jasmine.clock().uninstall();

    assert.equal(instance.element.attr("aria-activedescendant"), cell.attr("id"));
});

it("DatePicker sets aria-label to focused cell", function() {
    instance.open();

    var date = kendo.date.today();
    var cell = instance.dateView.calendar.element.find("td.k-focus");

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

describe("kendo.ui.DatePicker ARIA defaults", function() {
    beforeEach(function() {

        input = $("<input id='test' />").appendTo(Mocha.fixture);
    });
    afterEach(function() {

        instance.destroy();
        kendo.destroy(Mocha.fixture);
    });

it("DatePicker add correct aria-label for date", function() {
    instance = new DatePicker(input);
    instance.open();

    var date = kendo.date.today();
    instance.element.trigger("focus");
    var cell = instance.dateView.calendar.element.find("td.k-focus");

    assert.equal(cell.attr("aria-label"), "Current focused date is " + kendo.toString(date, "D"));
});

it("DatePicker add correct aria-label for year", function() {
    var date = kendo.date.today();
    instance = new DatePicker(input, { start: "year" });
    instance.open();
    instance.element.trigger("focus");
    var cell = instance.dateView.calendar.element.find("td.k-focus");
    assert.equal(cell.attr("aria-label"), "Current focused month is " + kendo.toString(date, "MMMM"));
});

it("DatePicker add evaluates ariatemplate in correct context", function() {
    var date = kendo.date.today();
    instance = new DatePicker(input, {
        ARIATemplate: ({ current }) => `Current focused date is ${instance.dateView.calendar.view().name === 'month' ? 'test' : kendo.toString(current, 'MMM yyyy')}`
    });
    instance.open();
    instance.element.trigger("focus");
    var cell = instance.dateView.calendar.element.find("td.k-focus");
    assert.equal(cell.attr("aria-label"), "Current focused date is test");
});

it("DatePicker add correct aria-label for decade", function() {
    var date = kendo.date.today();
    instance = new DatePicker(input, { start: "decade" });
    instance.open();
    instance.element.trigger("focus");
    var cell = instance.dateView.calendar.element.find("td.k-focus");
    assert.equal(cell.attr("aria-label"), "Current focused year is " + kendo.toString(date, "yyyy"));
});

it("DatePicker add correct aria-label for century", function() {
    instance = new DatePicker(input, { start: "century", value: new Date(2021, 0, 1) });
    instance.open();
    instance.element.trigger("focus");
    var cell = instance.dateView.calendar.element.find("td.k-focus");

    assert.equal(cell.attr("aria-label"), "Current focused decade is 2020 - 2029");
});

});

describe("kendo.ui.DatePicker aria with AXE", function() {
    beforeEach(function() {
        $("<label>Hire date:<input id='test' /></label>").appendTo(Mocha.fixture);
        input = $(Mocha.fixture).find("input");
        Mocha.fixture.attr("role", "main");
    });

    afterEach(function() {
        instance.destroy();
        kendo.destroy(Mocha.fixture);
    });

    it("DatePicker is accessible", function(done) {
        instance = new DatePicker(input);

        axeRunFixture(done);
    });

    it("DatePicker has accessible popup", function(done) {
        instance = new DatePicker(input);

        instance.open();

        axeRun(instance.dateView.popup.element.closest(".k-animation-container").parent(), done);
    });
});
}());
