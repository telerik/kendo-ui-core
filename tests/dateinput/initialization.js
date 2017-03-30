(function () {

    var anchor;
    var div;
    var input;
    var DateInput = kendo.ui.DateInput;

    module("kendo.ui.DateInput initialization", {
        setup: function () {
            kendo.ns = "kendo-";
            kendo.effects.disable();

            input = $("<input />").appendTo(QUnit.fixture);
        },
        teardown: function () {
            kendo.effects.enable();

            kendo.destroy(QUnit.fixture);

            kendo.ns = "";
        }
    });

    test("get value of the input if", function () {
        input.val("10/10/2000");

        var dateinput = new DateInput(input);

        equal(+dateinput.value(), +new Date(2000, 9, 10));
    });

    test("_wrapper() wraps input element", function () {
        input.css("width", "200");

        var dateinput = input.kendoDateInput().data("kendoDateInput");

        ok(input.parent().hasClass("k-state-default"));
        equal(dateinput.wrapper.attr("class"), "k-widget k-dateinput k-state-default");
    });

    test("_input should add k-textbox to the element", function () {
        var dateinput = input.kendoDateInput().data("kendoDateInput");

        ok(dateinput.element.hasClass("k-textbox"));
    });

    test("DateInput copies input's className to the wrapper", function () {
        var dateinput = input.addClass("test").kendoDateInput().data("kendoDateInput");
        ok(dateinput.wrapper.hasClass("test"));
    });

    if (!kendo.support.touch) {
        test("DateInputs changes the type of the input", function () {
            input = $("<input type='date'/>").appendTo(QUnit.fixture);

            var dateinput = input.kendoDateInput().data("kendoDateInput");

            equal(dateinput.element[0].type, "text");
            equal(dateinput.element.attr("type"), "text");
        });
    }

    test("DateInput uses disabled attr over the readonly", function () {
        var dateinput = input.attr("readonly", true).attr("disabled", true)
            .kendoDateInput().data("kendoDateInput");

        equal(input.attr("readonly"), undefined);
    });

    test("DateInput is disabled when placed in disabled fieldset", function () {
        $(input).wrap('<fieldset disabled="disabled"></fieldset>');
        input.kendoDateInput().data("kendoDateInput");
        equal(input.attr("disabled"), "disabled");
    });

    test("DateInput removes input text on initialization if not valid value", function () {
        var dateinput = input.val("test").kendoDateInput().data("kendoDateInput");
        equal(dateinput.value(), null);
        equal(input.val(), "month/day/year");
    });

    test("DateInput sets min from min attribute", function () {
        var date = new Date(2000, 9, 10);
        input.attr("min", kendo.toString(date, "yyyy-MM-dd"));

        var dateinput = new DateInput(input);

        deepEqual(dateinput.min(), date);
    });

    test("DateInput sets max from max attribute", function () {
        var date = new Date(2000, 9, 10);
        input.attr("max", kendo.toString(date, "yyyy-MM-dd"));

        var dateinput = new DateInput(input);

        deepEqual(dateinput.max(), date);
    });

    test("DateInput renders empty place holders when empty", function () {
        var dateinput = input.kendoDateInput({
            min: new Date(2000, 0, 1),
            max: new Date(2000, 0, 2)
        }).data("kendoDateInput");
        equal(dateinput.value(), null);
        equal(dateinput.element.val(), "month/day/year");
    });

})();
