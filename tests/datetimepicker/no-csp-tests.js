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

        it("popup option can be successfully set through data attribute", function() {
            dom = $('<input data-popup="{ origin: \'top left\', position: \'bottom left\' }" data-role="dropdowntree" />');

            var observable = kendo.observable({});

            kendo.bind(dom, observable);
            var ddt = dom.data("kendoDropDownTree");

            assert.equal(ddt.options.popup.origin, "top left");
            assert.equal(ddt.options.popup.position, "bottom left");
        });
    });
}());
