import '@progress/kendo-ui/src/kendo.datepicker.js';

describe("kendo.ui.DatePicker initialization", function() {
    let DatePicker = kendo.ui.DatePicker;

    afterEach(function() {
        kendo.destroy(Mocha.fixture);
    });

    it("preserves initial date input value", function() {
        let datepicker = new DatePicker($("<input type='date' value='2026-05-07' />").appendTo(Mocha.fixture), {
            format: "yyyy-MM-dd"
        });

        assert.equal(datepicker.element.val(), "2026-05-07");
        assert.equal(datepicker.value().getFullYear(), 2026);
        assert.equal(datepicker.value().getMonth(), 4);
        assert.equal(datepicker.value().getDate(), 7);
    });

    it("uses the initial element value before changing the input type", function() {
        let dateInput = $("<input type='date' value='2026-05-07' />").appendTo(Mocha.fixture);
        let setAttribute = dateInput[0].setAttribute;

        dateInput[0].setAttribute = function(name, value) {
            setAttribute.call(this, name, value);

            if (name === "type" && value === "text") {
                this.value = "1970-01-01";
            }
        };

        let datepicker = new DatePicker(dateInput, {
            format: "yyyy-MM-dd"
        });

        assert.equal(datepicker.element.val(), "2026-05-07");
        assert.equal(datepicker.value().getFullYear(), 2026);
        assert.equal(datepicker.value().getMonth(), 4);
        assert.equal(datepicker.value().getDate(), 7);
    });
});
