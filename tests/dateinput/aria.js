(function() {
    var input;
    var DateInput = kendo.ui.DateInput;

    describe("kendo.ui.DateInput accessibility", function() {
        beforeEach(function() {
            $("<label>Hire date:<input title='date' /></label>").appendTo(Mocha.fixture);
            input = $(Mocha.fixture).find("input");
        });

        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("DateInput is accessible", function(done) {
            var numeric = new DateInput(input);

            axeRunFixture(done);
        });
    });
}());
