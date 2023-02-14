(function() {

    var dom;

    describe("kendo.ui.DatePicker MVVM - No CSP", function() {
        beforeEach(function() {
            window.change = function() {
                assert.isOk(true);
            };
        });
        afterEach(function() {
            delete window.change;

            kendo.destroy(dom);
        });

        it("initializes a disabledDates from data attributes", function() {
            dom = $('<input data-role="datepicker" data-disable-dates="[\'sa\', \'su\']" />');

            kendo.bind(dom);

            var datepicker = dom.data("kendoDatePicker");

            assert.isOk(datepicker.options.disableDates != $.noop);
        });
    });
}());
