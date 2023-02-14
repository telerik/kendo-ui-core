(function() {

    var anchor;
    var div;
    var input;
    var DateInput = kendo.ui.DateInput;

    describe("kendo.ui.DateInput initialization", function() {
        beforeEach(function() {
            kendo.ns = "kendo-";


            input = $("<input />").appendTo(Mocha.fixture);
        });
        afterEach(function() {


            kendo.destroy(Mocha.fixture);

            kendo.ns = "";
        });

        it("get value of the input if", function() {
            input.val("10/10/2000");

            var dateinput = new DateInput(input);

            assert.equal(+dateinput.value(), +new Date(2000, 9, 10));
        });

        it("_wrapper() wraps input element", function() {
            input.css("width", "200");

            var dateinput = input.kendoDateInput().data("kendoDateInput");

            assert.equal(dateinput.wrapper.attr("class"), "k-dateinput k-input k-input-solid k-input-md k-rounded-md");
        });

        it("_input should add k-input-inner to the element", function() {
            var dateinput = input.kendoDateInput().data("kendoDateInput");

            assert.isOk(dateinput.element.hasClass("k-input-inner"));
        });

        it("DateInput copies input's className to the wrapper", function() {
            var dateinput = input.addClass("test").kendoDateInput().data("kendoDateInput");
            assert.isOk(dateinput.wrapper.hasClass("test"));
        });

        if (!kendo.support.touch) {
            it("DateInputs changes the type of the input", function() {
                input = $("<input type='date'/>").appendTo(Mocha.fixture);

                var dateinput = input.kendoDateInput().data("kendoDateInput");

                assert.equal(dateinput.element[0].type, "text");
                assert.equal(dateinput.element.attr("type"), "text");
            });
        }

        it("DateInput uses disabled attr over the readonly", function() {
            var dateinput = input.attr("readonly", true).attr("disabled", true)
                .kendoDateInput().data("kendoDateInput");

            assert.equal(input.attr("readonly"), undefined);
        });

        it("DateInput is disabled when placed in disabled fieldset", function() {
            $(input).wrap('<fieldset disabled="disabled"></fieldset>');
            input.kendoDateInput().data("kendoDateInput");
            assert.equal(input.attr("disabled"), "disabled");
        });

        it("DateInput removes input text on initialization if not valid value", function() {
            var dateinput = input.val("test").kendoDateInput().data("kendoDateInput");
            assert.equal(dateinput.value(), null);
            assert.equal(input.val(), "month/day/year");
        });

        it("DateInput sets min from min attribute", function() {
            var date = new Date(2000, 9, 10);
            input.attr("min", kendo.toString(date, "yyyy-MM-dd"));

            var dateinput = new DateInput(input);

            assert.deepEqual(dateinput.min(), date);
        });

        it("DateInput sets max from max attribute", function() {
            var date = new Date(2000, 9, 10);
            input.attr("max", kendo.toString(date, "yyyy-MM-dd"));

            var dateinput = new DateInput(input);

            assert.deepEqual(dateinput.max(), date);
        });

        it("DateInput renders empty place holders when empty", function() {
            var dateinput = input.kendoDateInput({
                min: new Date(2000, 0, 1),
                max: new Date(2000, 0, 2)
            }).data("kendoDateInput");
            assert.equal(dateinput.value(), null);
            assert.equal(dateinput.element.val(), "month/day/year");
        });

        it("DateInput renders not-floating label from string", function() {
            var dateinput = input.kendoDateInput({
                label: "some label"
            }).data("kendoDateInput");
            assert.equal(dateinput.label.element.text(), "some label");
            assert.isNotOk(!!dateinput.label.floatingLabel);
        });

        it("DateInput renders label from object", function() {
            var dateinput = input.kendoDateInput({
                label: {
                    content: "some label"
                }
            }).data("kendoDateInput");
            assert.equal(dateinput.label.element.text(), "some label");
        });

        it("DateInput renders floating label", function() {
            var dateinput = input.kendoDateInput({
                label: {
                    content: "some label",
                    floating: true
                }
            }).data("kendoDateInput");
            assert.equal(dateinput.label.element.text(), "some label");
            assert.isOk(!!dateinput.label.floatingLabel);
        });

        it("DateInput renders label with funciton", function() {
            var dateinput = input.kendoDateInput({
                label: () => `some label`
            }).data("kendoDateInput");
            assert.equal(dateinput.label.element.text(), "some label");
        });

        it("form reset support", function(done) {
            var form = $("<form/>").appendTo(Mocha.fixture).append(input),
                dateInput = input.kendoDateInput({ value: new Date(2018, 1, 1) }).data("kendoDateInput");

            dateInput.value(new Date(2011, 1, 1));

            form[0].reset();

            setTimeout(function() {
                assert.equal(dateInput.element.val(), "2/1/2018");
                assert.deepEqual(dateInput.value(), new Date(2018, 1, 1));
                done();
            }, 200);
        });

    });
}());
