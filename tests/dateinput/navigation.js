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


    test("DateInput keyboard navigation selects correct parts", function () {
        dateinput = input.kendoDateInput({ value: new Date(2017, 5, 13) }).data("kendoDateInput");

        var element = dateinput.element[0];
        equal(element.value, "6/13/2017");

        element.focus();
        element.selectionStart = 0;
        element.selectionEnd = 1;

        var noop = function () { };
        dateinput._keydown({ keyCode: 37, preventDefault: noop });
        equal(element.selectionStart, 0);
        equal(element.selectionEnd, 1);

        dateinput._keydown({ keyCode: 39, preventDefault: noop });
        equal(element.selectionStart, 2);
        equal(element.selectionEnd, 4);

        dateinput._keydown({ keyCode: 39, preventDefault: noop });
        equal(element.selectionStart, 5);
        equal(element.selectionEnd, 9);

        dateinput._keydown({ keyCode: 39, preventDefault: noop });
        equal(element.selectionStart, 5);
        equal(element.selectionEnd, 9);

        dateinput._keydown({ keyCode: 37, preventDefault: noop });
        dateinput._keydown({ keyCode: 37, preventDefault: noop });
        equal(element.selectionStart, 0);
        equal(element.selectionEnd, 1);
    });

    test("DateInput keyboard navigation changes correct parts", function () {
        dateinput = input.kendoDateInput({ value: new Date(2017, 5, 13) }).data("kendoDateInput");

        var element = dateinput.element[0];
        equal(element.value, "6/13/2017");

        element.focus();
        element.selectionStart = 0;
        element.selectionEnd = 1;

        var noop = function () { };
        dateinput._keydown({ keyCode: 38, preventDefault: noop });
        equal(element.selectionStart, 0);
        equal(element.selectionEnd, 1);
        equal(element.value, "7/13/2017");
        dateinput._keydown({ keyCode: 38, preventDefault: noop });
        dateinput._keydown({ keyCode: 38, preventDefault: noop });
        dateinput._keydown({ keyCode: 38, preventDefault: noop });
        equal(element.selectionStart, 0);
        equal(element.selectionEnd, 2);
        equal(element.value, "10/13/2017");

        dateinput._keydown({ keyCode: 39, preventDefault: noop });
        equal(element.selectionStart, 3);
        equal(element.selectionEnd, 5);
        for (var i = 0; i < 20; i++) {
            dateinput._keydown({ keyCode: 40, preventDefault: noop });
        }
        equal(element.value, "9/23/2017");
    });
})();
