import '@progress/kendo-ui/src/kendo.datetimepicker.js';

describe("kendo.ui.DateTimePicker initialization", function() {
    let DateTimePicker = kendo.ui.DateTimePicker;

    afterEach(function() {
        kendo.destroy(Mocha.fixture);
    });

    it("preserves initial datetime-local input value", function() {
        let datetimepicker = new DateTimePicker($("<input type='datetime-local' value='2026-05-07T13:30' />").appendTo(Mocha.fixture), {
            format: "yyyy-MM-ddTHH:mm"
        });

        assert.equal(datetimepicker.element.val(), "2026-05-07T13:30");
        assert.equal(datetimepicker.value().getFullYear(), 2026);
        assert.equal(datetimepicker.value().getMonth(), 4);
        assert.equal(datetimepicker.value().getDate(), 7);
        assert.equal(datetimepicker.value().getHours(), 13);
        assert.equal(datetimepicker.value().getMinutes(), 30);
    });

    it("uses the initial element value before changing the input type", function() {
        let dateTimeInput = $("<input type='datetime-local' value='2026-05-07T13:30' />").appendTo(Mocha.fixture);
        let setAttribute = dateTimeInput[0].setAttribute;

        dateTimeInput[0].setAttribute = function(name, value) {
            setAttribute.call(this, name, value);

            if (name === "type" && value === "text") {
                this.value = "1970-01-01T00:00";
            }
        };

        let datetimepicker = new DateTimePicker(dateTimeInput, {
            format: "yyyy-MM-ddTHH:mm"
        });

        assert.equal(datetimepicker.element.val(), "2026-05-07T13:30");
        assert.equal(datetimepicker.value().getFullYear(), 2026);
        assert.equal(datetimepicker.value().getMonth(), 4);
        assert.equal(datetimepicker.value().getDate(), 7);
        assert.equal(datetimepicker.value().getHours(), 13);
        assert.equal(datetimepicker.value().getMinutes(), 30);
    });
});
