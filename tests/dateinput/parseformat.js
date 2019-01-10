(function() {

    var DateInput = kendo.ui.DateInput,
        dateinput,
        div, input;

    describe("kendo.ui.DateInput Events", function() {
        beforeEach(function() {
            div = $("<div />").appendTo(Mocha.fixture);
            input = $("<input />").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            dateinput.destroy();
            kendo.destroy(Mocha.fixture);
        });


    it("DateInput format empty value", function() {
        dateinput = input.kendoDateInput({}).data("kendoDateInput");
        assert.equal(dateinput.value(), null);
        assert.equal(dateinput.element.val(), "month/day/year");
    });

    it("DateInput format empty value with placeholders", function() {
        dateinput = input.kendoDateInput({
            messages: {
                year: "__",
                month: "--",
                day: "dd"
            }
        }).data("kendoDateInput");
        assert.equal(dateinput.value(), null);
        assert.equal(dateinput.element.val(), "--/dd/__");
    });

    it("DateInput formats placeholders with yyyy-dd-MM format correctly when empty", function() {
        dateinput = input.kendoDateInput({
            messages: {
                year: "y",
                month: "month",
                day: "dd"
            },
            format: "yyyy-dd-MM"
        }).data("kendoDateInput");
        assert.equal(dateinput.element.val(), "y-dd-month");
    });

    it("DateInput formats placeholders with yyyy-dd-MM format correctly with value", function() {
        dateinput = input.kendoDateInput({
            messages: {
                year: "y",
                month: "month",
                day: "dd"
            },
            format: "yyyy-dd-MM",
            value: new Date(2010, 5, 16)
        }).data("kendoDateInput");
        assert.equal(dateinput.element.val(), "2010-16-06");
    });

    it("DateInput parse month part correctly", function() {
        dateinput = input.kendoDateInput({
            value: new Date(2010, 5, 16)
        }).data("kendoDateInput");
        var element = dateinput.element[0];
        element.focus();

        assert.equal(dateinput.element.val(), "6/16/2010");
        element.value = "1/16/2010";
        element.selectionStart = element.selectionStart = 1;

        dateinput._input();
        assert.equal(dateinput.element.val(), "1/16/2010");
        assert.equal(element.selectionStart, 0);
        assert.equal(element.selectionEnd, 1);

        element.value = "2/16/2010";
        element.selectionStart = element.selectionStart = 1;
        dateinput._input();
        assert.equal(dateinput.element.val(), "12/16/2010");
        assert.equal(element.selectionStart, 0);
        assert.equal(element.selectionEnd, 2);

        element.value = "/16/2010";
        element.selectionStart = element.selectionStart = 0;
        dateinput._input();
        assert.equal(dateinput.element.val(), "month/16/2010");
        assert.equal(element.selectionStart, 0);
        assert.equal(element.selectionEnd, 5);

        element.value = "3/16/2010";
        element.selectionStart = element.selectionStart = 1;
        dateinput._input();
        assert.equal(dateinput.element.val(), "3/16/2010");
        assert.equal(element.selectionStart, 0);
        assert.equal(element.selectionEnd, 1);
    });

    it("DateInput parse year part correctly", function() {
        dateinput = input.kendoDateInput({
            value: new Date(2010, 5, 16)
        }).data("kendoDateInput");
        var element = dateinput.element[0];
        element.focus();

        assert.equal(dateinput.element.val(), "6/16/2010");
        element.value = "6/16/";
        element.selectionStart = element.selectionStart = 5;

        dateinput._input();
        assert.equal(dateinput.element.val(), "6/16/year");
        assert.equal(element.selectionStart, 5);
        assert.equal(element.selectionEnd, 9);

        element.value = "6/16/2";
        element.selectionStart = element.selectionStart = 6;
        dateinput._input();
        assert.equal(dateinput.element.val(), "6/16/0002");
        assert.equal(element.selectionStart, 5);
        assert.equal(element.selectionEnd, 9);

        element.value = "6/16/0";
        element.selectionStart = element.selectionStart = 6;
        dateinput._input();
        assert.equal(dateinput.element.val(), "6/16/0020");
        assert.equal(element.selectionStart, 5);
        assert.equal(element.selectionEnd, 9);

        element.value = "6/16/1";
        element.selectionStart = element.selectionStart = 6;
        dateinput._input();
        assert.equal(dateinput.element.val(), "6/16/0201");
        assert.equal(element.selectionStart, 5);
        assert.equal(element.selectionEnd, 9);

        element.value = "6/16/7";
        element.selectionStart = element.selectionStart = 6;
        dateinput._input();
        assert.equal(dateinput.element.val(), "6/16/2017");
        assert.equal(element.selectionStart, 5);
        assert.equal(element.selectionEnd, 9);
    });

});
}());
