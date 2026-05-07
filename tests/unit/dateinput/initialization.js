import '@progress/kendo-ui/src/kendo.dateinput.js';

describe("kendo.ui.DateInput initialization", function() {
    let DateInput = kendo.ui.DateInput;

    afterEach(function() {
        kendo.destroy(Mocha.fixture);
    });

    it("preserves initial date input value", function() {
        let dateinput = new DateInput($("<input type='date' value='2026-05-07' />").appendTo(Mocha.fixture), {
            format: "yyyy-MM-dd"
        });

        assert.equal(dateinput.element.val(), "2026-05-07");
        assert.equal(dateinput.value().getFullYear(), 2026);
        assert.equal(dateinput.value().getMonth(), 4);
        assert.equal(dateinput.value().getDate(), 7);
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

        let dateinput = new DateInput(dateInput, {
            format: "yyyy-MM-dd"
        });

        assert.equal(dateinput.element.val(), "2026-05-07");
        assert.equal(dateinput.value().getFullYear(), 2026);
        assert.equal(dateinput.value().getMonth(), 4);
        assert.equal(dateinput.value().getDate(), 7);
    });
});
