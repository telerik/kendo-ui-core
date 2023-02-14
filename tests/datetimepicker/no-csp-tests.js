(function() {

    var dom;

    describe("DateTimePicker mvvm - No CSP", function() {
        beforeEach(function() {
            window.change = function() {
                assert.isOk(true);
            };
        });
        afterEach(function() {
            delete window.change;
            kendo.destroy(dom);
            kendo.destroy(Mocha.fixture);
        });

        it("initializes a disabledDates from data attributes", function() {
            dom = $('<input data-role="datetimepicker" data-disable-dates="[\'sa\', \'su\']" />');

            kendo.bind(dom);

            var datetimepicker = dom.data("kendoDateTimePicker");

            assert.isOk(datetimepicker.options.disableDates != $.noop);
        });
    });
}());
