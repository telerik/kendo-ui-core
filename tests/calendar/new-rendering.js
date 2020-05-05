(function () {
    var Calendar = kendo.ui.Calendar;
    var div;

    describe("kendo.ui.Calendar API", function () {
        beforeEach(function () {

            div = $("<div />").appendTo(Mocha.fixture);
        });
        afterEach(function () {

            kendo.destroy(Mocha.fixture);
        });

        it("calendar header should contain k-calendar-header class when componentType is set to modern", function () {
            var cal = new Calendar(div, {
                componentType: 'modern'
            });

            assert.isTrue(cal.element.find(".k-calendar-header").length > 0);
        });

        it("calendar header should not contain k-calendar-header class when componentType is set to classic", function () {
            var cal = new Calendar(div);

            assert.isTrue(cal.element.find(".k-calendar-header").length === 0);
        });

        it("calendar header should contain four anchor tags when componentType is set to modern", function () {
            var cal = new Calendar(div, {
                componentType: 'modern'
            });

            assert.equal(cal.element.find(".k-calendar-header a").length, 4);
        });

        it("calendar header should contain three anchor tags when componentType is set to classic", function () {
            var cal = new Calendar(div);

            assert.equal(cal.element.find(".k-header a").length, 3);
        });

        it("calendar header should contain today navigation link", function () {
            var cal = new Calendar(div, {
                componentType: 'modern'
            });

            assert.equal(cal.element.find(".k-calendar-header .k-today").length, 1);
        });

        it("calendar should not create a footer when componentType is set to modern", function () {
            var cal = new Calendar(div, {
                componentType: 'modern'
            });

            assert.equal(cal.element.find(".k-footer").length, 0);
        });

        it("calendar should not call _footer when componentType is set to modern and setOptions is called", function () {
            var cal = new Calendar(div, {
                componentType: 'modern'
            });

            var calendarStub = stub(cal, {
                _footer: $.noop
            });

            cal.setOptions({
                value: new Date()
            });

            assert.equal(calendarStub.calls('_footer'), 0);
        });

        it("calendar view element should not contain k-calendar-monthview class when componentType is set to classic", function () {
            var cal = new Calendar(div);

            assert.equal(cal.element.find(".k-calendar-monthview").length, 0);
        });

        it("calendar table element should contain k-calendar-content class when componentType is set to modern", function () {
            var cal = new Calendar(div, {
                componentType: 'modern'
            });

            assert.equal(cal.element.find(".k-calendar-content").length, 1);
        });

        it("calendar table element should not contain k-calendar-content class when componentType is set to classic", function () {
            var cal = new Calendar(div);

            assert.equal(cal.element.find(".k-calendar-content").length, 0);
        });
    });
}());