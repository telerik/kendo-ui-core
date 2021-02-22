(function () {
    var TimePicker = kendo.ui.TimePicker;
    var input;

    describe("kendo.ui.Calendar API", function () {
        beforeEach(function () {

            input = $("<input />").appendTo(Mocha.fixture);
        });
        afterEach(function () {

            kendo.destroy(Mocha.fixture);
        });

        it("TimeView list should have the k-timeselector class when component type is modern", function () {
            var picker = new TimePicker(input, {
                componentType: 'modern'
            });

            assert.isTrue(picker.timeView.list.is(".k-timeselector"));
        });

        it("TimeView list should contain a header with a tittle and a button when component type is modern", function () {
            var picker = new TimePicker(input, {
                componentType: 'modern'
            });

            assert.equal(picker.timeView.list.find(".k-time-header").length, 1);
            assert.equal(picker.timeView.list.find(".k-time-header .k-title").length, 1);
            assert.equal(picker.timeView.list.find(".k-time-header button").length, 1);
        });

        it("TimeView list should contain a k-time-list-container element when component type is modern", function () {
            var picker = new TimePicker(input, {
                componentType: 'modern'
            });

            assert.equal(picker.timeView.list.find(".k-time-list-container").length, 1);
        });

        it("TimeView list should contain a footer with two buttons when component type is modern", function () {
            var picker = new TimePicker(input, {
                componentType: 'modern'
            });

            assert.equal(picker.timeView.list.find(".k-time-footer").length, 1);
            assert.equal(picker.timeView.list.find(".k-time-footer button").length, 2);
        });

        it("_updateTitle should update the title", function () {
            var picker = new TimePicker(input, {
                componentType: 'modern'
            });

            picker.timeView._value = new Date(2000, 1, 1, 10, 0, 0);
            picker.timeView._updateTitle();

            assert.equal(picker.timeView.list.find(".k-title").text(), "10:00 AM");
        });

        it("_createListContent called when timeview is refreshed", function () {
            var picker = new TimePicker(input, {
                componentType: 'modern'
            });

            var pickerStub = stub(picker.timeView, {
                _createListContent: $.noop
            });
            picker.timeView.refresh();
            assert.isTrue(pickerStub.calls('_createListContent') > 0);
        });

        it("_updateListBottomOffset updates the height of the k-scrollable-placeholder element", function () {
            var picker = new TimePicker(input, {
                componentType: 'modern'
            });
            picker.open();
            var list = picker.timeView.ul.find('[data-index=1]');

            picker.timeView._updateListBottomOffset(list);

            assert.isTrue(list.find('.k-scrollable-placeholder').outerHeight() != 0);
        });

        it("setting a max before 12 PM should hide the PM option", function () {
            var now = new Date();
            now.setHours(11);
            var picker = new TimePicker(input, {
                componentType: 'modern',
                max: now
            });
            picker.open();
            var list = picker.timeView.ul.find('[data-index=4]');

            assert.isFalse(list.find('[data-value="PM"]').is(":visible"));
        });

        it("setting a min after 12 PM should hide the AM option", function () {
            var now = new Date();
            now.setHours(13);
            var picker = new TimePicker(input, {
                componentType: 'modern',
                min: now
            });
            picker.open();
            var list = picker.timeView.ul.find('[data-index=4]');

            assert.isFalse(list.find('[data-value="AM"]').is(":visible"));
        });

        it("setting min and max should hide the elements outside the specified range", function () {
            var min = new Date();
            var max = new Date();
            min.setHours(8);
            max.setHours(11);

            var picker = new TimePicker(input, {
                componentType: 'modern',
                min: min,
                max: max,
                value: new Date(2020, 1, 1, 8, 20, 30),
                format: "hh:mm:ss tt"
            });

            picker.open();
            assert.equal(picker.timeView.ul.find('[data-index=1]').find('.k-item:visible').length, 4);

        });

        it("addTranslate method should be executed after the timeview is opened and component type is modern", function () {
            var picker = new TimePicker(input, {
                componentType: 'modern'
            });
            var pickerStub = stub(picker.timeView, {
                addTranslate: $.noop
            });
            picker.open();

            assert.isTrue(pickerStub.calls('addTranslate') === 1);
        });

        it("addTranslate method should be executed after the timeview is opened and component type is modern", function () {
            var picker = new TimePicker(input, {
                componentType: 'modern'
            });
            picker.open();

            assert.isTrue(!!picker.timeView.ul.find('ul:eq(0)').css("transform"));
        });

        it("_nowClickHandler updates the value of the widget", function () {
            var value = new Date(2020, 1, 1, 1, 1);
            var picker = new TimePicker(input, {
                componentType: 'modern',
                value: new Date(value)
            });

            picker.timeView._nowClickHandler();

            assert.notEqual(+value, +picker.timeView._value);
        });

        it("time view should contain a list for each format part", function () {
            var picker = new TimePicker(input, {
                componentType: 'modern',
                format: "hh:mm:ss tt"
            });

            picker.open();

            assert.equal(picker.timeView.list.find('[data-index]').length, 4);
        });

        it("_updateCurrentlySelected selected calls _findSelectedValue method", function () {
            var picker = new TimePicker(input, {
                componentType: 'modern',
                format: "hh:mm:ss tt"
            });

            var pickerStub = stub(picker.timeView, {
                _findSelectedValue: $.noop
            });

            picker.open();
            picker.timeView._updateCurrentlySelected();

            assert.isTrue(pickerStub.calls('_findSelectedValue') > 0);
        });

        it("_updateRanges should call _showAllHiddenItems when validateDate is true and date does not match", function () {
            var picker = new TimePicker(input, {
                componentType: 'modern',
                format: "hh:mm:ss tt",
                validateDate: true,
                max: new Date(1999,11, 11, 11, 11,11, 11)
            });

            picker.open();
            picker.timeView._currentlySelected = new Date(1999,10, 11, 11, 11,11, 11);

            var pickerStub = stub(picker.timeView, {
                _showAllHiddenItems: $.noop
            });

            picker.timeView._updateRanges();

            assert.isTrue(pickerStub.calls('_showAllHiddenItems') === 1);
        });
    });
}());