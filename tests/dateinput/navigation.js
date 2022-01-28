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


        it("DateInput keyboard navigation selects correct parts", function() {
            dateinput = input.kendoDateInput({ value: new Date(2017, 5, 13) }).data("kendoDateInput");

            var element = dateinput.element[0];
            assert.equal(element.value, "6/13/2017");

            element.focus();
            element.selectionStart = 0;
            element.selectionEnd = 1;

            var noop = function() { };
            dateinput._keydown({ keyCode: 37, preventDefault: noop });
            assert.equal(element.selectionStart, 0);
            assert.equal(element.selectionEnd, 1);

            dateinput._keydown({ keyCode: 39, preventDefault: noop });
            assert.equal(element.selectionStart, 2);
            assert.equal(element.selectionEnd, 4);

            dateinput._keydown({ keyCode: 39, preventDefault: noop });
            assert.equal(element.selectionStart, 5);
            assert.equal(element.selectionEnd, 9);

            dateinput._keydown({ keyCode: 39, preventDefault: noop });
            assert.equal(element.selectionStart, 5);
            assert.equal(element.selectionEnd, 9);

            dateinput._keydown({ keyCode: 37, preventDefault: noop });
            dateinput._keydown({ keyCode: 37, preventDefault: noop });
            assert.equal(element.selectionStart, 0);
            assert.equal(element.selectionEnd, 1);
        });

        it("DateInput keyboard navigation changes correct parts", function() {
            dateinput = input.kendoDateInput({ value: new Date(2017, 5, 13) }).data("kendoDateInput");

            var element = dateinput.element[0];
            assert.equal(element.value, "6/13/2017");

            element.focus();
            element.selectionStart = 0;
            element.selectionEnd = 1;

            var noop = function() { };
            dateinput._keydown({ keyCode: 38, preventDefault: noop });
            assert.equal(element.selectionStart, 0);
            assert.equal(element.selectionEnd, 1);
            assert.equal(element.value, "7/13/2017");
            dateinput._keydown({ keyCode: 38, preventDefault: noop });
            dateinput._keydown({ keyCode: 38, preventDefault: noop });
            dateinput._keydown({ keyCode: 38, preventDefault: noop });
            assert.equal(element.selectionStart, 0);
            assert.equal(element.selectionEnd, 2);
            assert.equal(element.value, "10/13/2017");

            dateinput._keydown({ keyCode: 39, preventDefault: noop });
            assert.equal(element.selectionStart, 3);
            assert.equal(element.selectionEnd, 5);
            for (var i = 0; i < 20; i++) {
                dateinput._keydown({ keyCode: 40, preventDefault: noop });
            }
            assert.equal(element.value, "9/23/2017");
        });
    });
}());
