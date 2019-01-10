(function() {
    var TimePicker = kendo.ui.TimePicker,
        input, instance;

    describe("kendo.ui.TimePicker ARIA", function() {
        beforeEach(function() {
            input = $("<input id='test' />").appendTo(Mocha.fixture);
            instance = new TimePicker(input);
        });
        afterEach(function() {
            input.data("kendoTimePicker").destroy();
            input.parents(".k-widget").remove();
        });

        it("TimePicker adds role to the input element", function() {
            assert.equal(input.attr("role"), "combobox");
        });

        it("TimePicker adds aria-expanded", function() {
            assert.equal(input.attr("aria-expanded"), "false");
        });

        it("TimePicker adds aria-owns", function() {
            assert.equal(input.attr("aria-owns"), instance.timeView.ul.attr("id"));
        });

        it("TimePicker sets aria-expanded=true", function() {
            instance.open();
            assert.equal(input.attr("aria-expanded"), "true");
        });

        it("TimePicker sets aria-expanded=false", function() {
            instance.open();
            instance.close();
            assert.equal(input.attr("aria-expanded"), "false");
        });

        it("TimePicker adds role to the toggle button", function() {
            assert.equal(instance._arrow.attr("role"), "button");
        });

        it("TimePicker adds aria-controls to the toggle button", function() {
            assert.equal(instance._arrow.attr("aria-controls"), instance.timeView.ul.attr("id"));
        });

        it("TimePicker sets id to the ul element", function() {
            assert.equal(instance.timeView.ul.attr("id"), "test_timeview");
        });

        it("TimePicker adds role to the popup", function() {
            assert.equal(instance.timeView.ul.attr("role"), "listbox");
        });

        it("TimePicker adds aria-hidden to the popup", function() {
            assert.equal(instance.timeView.ul.attr("aria-hidden"), "true");
        });

        it("TimePicker sets aria-hidden=false to the popup", function() {
            instance.open();
            assert.equal(instance.timeView.ul.attr("aria-hidden"), "false");
        });

        it("TimePicker sets aria-hidden=true to the popup", function() {
            instance.open();
            instance.close();
            assert.equal(instance.timeView.ul.attr("aria-hidden"), "true");
        });

        it("TimePicker renders li elements with role attr", function() {
            instance.open();
            assert.equal(instance.timeView.ul.children(":first").attr("role"), "option");
        });

        it("TimePicker sets aria-selected to the selected option", function() {
            instance.open();
            instance.value("12:00 AM");
            assert.equal(instance.timeView.current().attr("aria-selected"), "true");
        });

        it("TimePicker allows only one selected option", function() {
            instance.open();
            instance.value("12:00 AM");
            instance.value("2:00 AM");
            assert.equal(instance.timeView.ul.children("[aria-selected=true]").length, 1);
        });

        it("TimePicker sets aria-activedescendant", function() {
            instance.open();
            instance.value("12:00 AM");
            assert.equal(instance.element.attr("aria-activedescendant"), instance.timeView._optionID);
        });

        it("TimePicker removes aria-activedescendant", function() {
            instance.open();
            instance.value("12:00 AM");
            instance.value("12:10 AM");
            assert.equal(instance.element.attr("aria-activedescendant"), undefined);
        });


    });
}());
