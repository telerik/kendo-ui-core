(function () {

    var DateInput = kendo.ui.DateInput,
        dateinput,
        div, input;

    module("kendo.ui.DateInput Events", {
        setup: function () {
            div = $("<div />").appendTo(QUnit.fixture);
            input = $("<input />").appendTo(QUnit.fixture);
        },
        teardown: function () {
            dateinput.destroy();
            kendo.destroy(QUnit.fixture);
        }
    });


    test("DateInput format empty value", function () {
        dateinput = input.kendoDateInput({}).data("kendoDateInput");
        equal(dateinput.value(), null);
        equal(dateinput.element.val(), "month/day/year");
    });

    test("DateInput format empty value with placeholders", function () {
        dateinput = input.kendoDateInput({
            messages: {
                year: "__",
                month: "--",
                day: "dd"
            }
        }).data("kendoDateInput");
        equal(dateinput.value(), null);
        equal(dateinput.element.val(), "--/dd/__");
    });

    test("DateInput formats placeholders with yyyy-dd-MM format correctly when empty", function () {
        dateinput = input.kendoDateInput({
            messages: {
                year: "y",
                month: "month",
                day: "dd"
            },
            format: "yyyy-dd-MM"
        }).data("kendoDateInput");
        equal(dateinput.element.val(), "y-dd-month");
    });

    test("DateInput formats placeholders with yyyy-dd-MM format correctly with value", function () {
        dateinput = input.kendoDateInput({
            messages: {
                year: "y",
                month: "month",
                day: "dd"
            },
            format: "yyyy-dd-MM",
            value: new Date(2010, 5, 16)
        }).data("kendoDateInput");
        equal(dateinput.element.val(), "2010-16-06");
    });

    test("DateInput parse month part correctly", function () {
        dateinput = input.kendoDateInput({
            value: new Date(2010, 5, 16)
        }).data("kendoDateInput");
        var element = dateinput.element[0];
        element.focus();

        equal(dateinput.element.val(), "6/16/2010");
        element.value = "1/16/2010";
        element.selectionStart = element.selectionStart = 1;

        dateinput._input();
        equal(dateinput.element.val(), "1/16/2010");
        equal(element.selectionStart, 0);
        equal(element.selectionEnd, 1);

        element.value = "2/16/2010";
        element.selectionStart = element.selectionStart = 1;
        dateinput._input();
        equal(dateinput.element.val(), "12/16/2010");
        equal(element.selectionStart, 0);
        equal(element.selectionEnd, 2);

        element.value = "/16/2010";
        element.selectionStart = element.selectionStart = 0;
        dateinput._input();
        equal(dateinput.element.val(), "month/16/2010");
        equal(element.selectionStart, 0);
        equal(element.selectionEnd, 5);

        element.value = "3/16/2010";
        element.selectionStart = element.selectionStart = 1;
        dateinput._input();
        equal(dateinput.element.val(), "3/16/2010");
        equal(element.selectionStart, 0);
        equal(element.selectionEnd, 1);
    });

    test("DateInput parse year part correctly", function () {
        dateinput = input.kendoDateInput({
            value: new Date(2010, 5, 16)
        }).data("kendoDateInput");
        var element = dateinput.element[0];
        element.focus();

        equal(dateinput.element.val(), "6/16/2010");
        element.value = "6/16/";
        element.selectionStart = element.selectionStart = 5;

        dateinput._input();
        equal(dateinput.element.val(), "6/16/year");
        equal(element.selectionStart, 5);
        equal(element.selectionEnd, 9);

        element.value = "6/16/2";
        element.selectionStart = element.selectionStart = 6;
        dateinput._input();
        equal(dateinput.element.val(), "6/16/0002");
        equal(element.selectionStart, 5);
        equal(element.selectionEnd, 9);

        element.value = "6/16/0";
        element.selectionStart = element.selectionStart = 6;
        dateinput._input();
        equal(dateinput.element.val(), "6/16/0020");
        equal(element.selectionStart, 5);
        equal(element.selectionEnd, 9);

        element.value = "6/16/1";
        element.selectionStart = element.selectionStart = 6;
        dateinput._input();
        equal(dateinput.element.val(), "6/16/0201");
        equal(element.selectionStart, 5);
        equal(element.selectionEnd, 9);

        element.value = "6/16/7";
        element.selectionStart = element.selectionStart = 6;
        dateinput._input();
        equal(dateinput.element.val(), "6/16/2017");
        equal(element.selectionStart, 5);
        equal(element.selectionEnd, 9);
    });

})();
