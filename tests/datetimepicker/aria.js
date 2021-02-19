(function() {

    var DateTimePicker = kendo.ui.DateTimePicker,
        input, instance;

    describe("kendo.ui.DateTimePicker ARIA", function() {
        beforeEach(function() {
            input = $("<input id='test' />").appendTo(Mocha.fixture);


            instance = new DateTimePicker(input, {
                ARIATemplate: "#=kendo.toString(current, 'G')#"
            });
        });
        afterEach(function() {
            instance.destroy();
        });

        it("DateTimePicker adds role to the input element", function() {
            assert.equal(input.attr("role"), "combobox");
        });

        it("DateTimePicker adds aria-expanded", function() {
            assert.equal(input.attr("aria-expanded"), "false");
        });

        it("DateTimePicker sets aria-expanded=true", function() {
            instance.open();
            assert.equal(input.attr("aria-expanded"), "true");
        });

        it("DateTimePicker sets aria-expanded=false", function() {
            instance.open();
            instance.close();
            assert.equal(input.attr("aria-expanded"), "false");
        });

        it("DateTimePicker adds aria-controls to the toggle button", function() {
            assert.equal(instance._dateIcon.attr("aria-controls"), instance.dateView.popup.element.attr("id"));
            assert.equal(instance._timeIcon.attr("aria-controls"), instance.timeView.ul.attr("id"));
        });

        it("DateTimePicker sets id to the ul element", function() {
            assert.equal(instance.timeView.ul.attr("id"), "test_timeview");
        });

        it("DateTimePicker sets id to the div element of the dateView", function() {
            assert.equal(instance.dateView.div.attr("id"), "test_dateview");
        });

        it("DateTimePicker sets aria-selected to the selected option", function() {
            instance.open("time");
            instance.value("12:00 AM");
            assert.equal(instance.timeView.current().attr("aria-selected"), "true");
        });

        it("DateTimePicker sets aria-owns to the DateView id", function() {
            instance.open("date");
            assert.equal(instance.element.attr("aria-owns"), instance.dateView._dateViewID);
        });

        it("DateTimePicker removes aria-owns to the DateView id", function() {
            instance.open("date");
            instance.close("date");
            assert.equal(instance.element.attr("aria-owns"), undefined);
        });

        it("DateTimePicker sets aria-owns to the DateView id", function() {
            instance.open("date");
            instance.open("time");
            assert.equal(instance.element.attr("aria-owns"), instance.timeView._timeViewID);
        });

        it("DateTimePicker removes aria-owns to the DateView id", function() {
            instance.open("time");
            instance.close("time");
            assert.equal(instance.element.attr("aria-owns"), undefined);
        });

        it("DateTimePicker sets aria-activedescendant", function() {
            instance.value("10/10/2000 12:00 AM");
            instance.open("time");

            assert.equal(instance.element.attr("aria-activedescendant"), instance.timeView._optionID);
        });

        it("DateTimePicker sets aria-activedescendant after navigation", function() {
            instance.open();

            instance.element.focus().trigger({
                type: "keydown",
                preventDefault: function() { },
                keyCode: 40
            });

            var cell = instance.dateView.calendar.element.find("td.k-state-focused");

            assert.equal(instance.element.attr("aria-activedescendant"), cell.attr("id"));
        });

        it("DateTimePicker sets aria-label to focused cell", function() {
            instance.open();

            var date = kendo.date.today();
            var cell = instance.dateView.calendar.element.find("td.k-state-focused");

            assert.equal(cell.attr("aria-label"), kendo.toString(date, "G"));
        });

        it("DateTimePicker removes aria-label from previous cell", function() {
            instance.open();

            instance.element.focus().trigger({
                type: "keydown",
                preventDefault: function() { },
                keyCode: 40
            });

            var date = kendo.date.today();
            var cell = instance.dateView.calendar.element.find("td[aria-label]");

            assert.equal(cell.length, 1);
        });

    });

describe("kendo.ui.DateTimePicker ARIA defaults", function () {
        beforeEach(function() {
    
            input = $("<input id='test' />").appendTo(Mocha.fixture);
        });
        afterEach(function() {
    
            instance.destroy();
            kendo.destroy(Mocha.fixture);
        });
    
    it("DateTimePicker add correct aria-label for date", function() {
        instance = new DateTimePicker(input);
        instance.open();
    
        var date = kendo.date.today();
        instance.element.trigger("focus");
        var cell = instance.dateView.calendar.element.find("td.k-state-focused");
    
        assert.equal(cell.attr("aria-label"), "Current focused date is "+kendo.toString(date, "D"));
    });
    
    it("DateTimePicker add correct aria-label for year", function() {
        var date = kendo.date.today();
        instance = new DateTimePicker(input, { start: "year"});
        instance.open();
        instance.element.trigger("focus");
        var cell = instance.dateView.calendar.element.find("td.k-state-focused");
        assert.equal(cell.attr("aria-label"), "Current focused month is "+kendo.toString(date, "MMMM"));
    });
    
    it("DateTimePicker add correct aria-label for decade", function() {
        var date = kendo.date.today();
        instance = new DateTimePicker(input, { start: "decade"});
        instance.open();
        instance.element.trigger("focus");
        var cell = instance.dateView.calendar.element.find("td.k-state-focused");
        assert.equal(cell.attr("aria-label"),  "Current focused year is "+kendo.toString(date, "yyyy"));
    });
    
    it("DateTimePicker add correct aria-label for century", function() {
        instance = new DateTimePicker(input, { start: "century", value: new Date(2021, 0, 1)});
        instance.open();
        instance.element.trigger("focus");
        var cell = instance.dateView.calendar.element.find("td.k-state-focused");
    
        assert.equal(cell.attr("aria-label"), "Current focused decade is 2020 - 2029");
    });
});
}());
