import '@progress/kendo-ui/src/kendo.timepicker.js';

describe("kendo.ui.TimePicker initialization", function() {
    let TimePicker = kendo.ui.TimePicker;

    afterEach(function() {
        kendo.destroy(Mocha.fixture);
    });

    it("preserves initial time input value with 24-hour format", function() {
        let timepicker = new TimePicker($("<input type='time' value='13:30' />").appendTo(Mocha.fixture), {
            format: "HH:mm"
        });

        assert.equal(timepicker.element.val(), "13:30");
        assert.equal(timepicker.value().getHours(), 13);
        assert.equal(timepicker.value().getMinutes(), 30);
    });

    it("uses the initial element value before changing the input type", function() {
        let timeInput = $("<input type='time' value='13:30' />").appendTo(Mocha.fixture);
        let setAttribute = timeInput[0].setAttribute;

        timeInput[0].setAttribute = function(name, value) {
            setAttribute.call(this, name, value);

            if (name === "type" && value === "text") {
                this.value = "00:00";
            }
        };

        let timepicker = new TimePicker(timeInput, {
            format: "HH:mm"
        });

        assert.equal(timepicker.element.val(), "13:30");
        assert.equal(timepicker.value().getHours(), 13);
        assert.equal(timepicker.value().getMinutes(), 30);
    });
});
