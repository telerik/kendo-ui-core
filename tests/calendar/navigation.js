(function() {

    var monthsAbbr = kendo.culture().calendar.months.namesAbbr;
    var keys = kendo.keys;
    var toDateObject = kendo.calendar.toDateObject;
    var div, calendar;

    describe("kendo.ui.Calendar navigation", function() {
        beforeEach(function() {


            div = $("<div />").appendTo(Mocha.fixture).kendoCalendar({
                min: new Date(1800, 0, 1),
                max: new Date(2200, 0, 1)
            });

            calendar = div.data("kendoCalendar");

            calendar.focus();
        });
        afterEach(function() {


            calendar.destroy();
            div.remove();
            kendo.destroy(Mocha.fixture);
        });

        it("navigate down should persist current viewedValue", function() {
            var value = new Date(2000, 10, 10, 22, 22, 22),
                upEvent = { keyCode: keys.UP, ctrlKey: true, preventDefault: $.noop },
                downEvent = { keyCode: keys.DOWN, ctrlKey: true, preventDefault: $.noop };

            calendar.value(value);

            calendar._move(upEvent);
            calendar._move(upEvent);

            calendar._move(downEvent);
            calendar._move(downEvent);

            assert.deepEqual(calendar.current(), value);
        });

        it("March 1st should have k-other-month class applied for leap and non-leap years", function() {
            var value = new Date(2018, 1, 10);

            calendar.value(value);

            assert.deepEqual(calendar.current(), value);

            assert.isOk(div.find("a[data-value='2018/2/1']").closest("td").hasClass("k-other-month"));
        });

        //MONTH View
        it("navigate should not _move selection if value is bigger than max", function() {
            var event = { keyCode: keys.RIGHT, preventDefault: $.noop },
                date = new Date(2000, 11, 1);

            calendar.max(date);
            calendar.value(date);

            calendar._move(event);

            assert.deepEqual(calendar.current(), date);
            assert.equal(div.find("td.k-state-focused").text(), date.getDate() + "");
        });

        it("navigate should not _move selection if value is less than min", function() {
            var event = { keyCode: keys.LEFT, preventDefault: $.noop },
                date = new Date(2000, 11, 1);

            calendar.min(date);
            calendar.value(date);

            calendar._move(event);

            assert.deepEqual(calendar.current(), date);
            assert.equal(div.find("td.k-state-focused").text(), date.getDate() + "");

        });

        it("navigate should focus next day in month view", function() {
            var event = { keyCode: keys.RIGHT, preventDefault: $.noop },
                focusedDate = new Date(calendar.current());

            kendo.calendar.views[0].setDate(focusedDate, 1);

            calendar._move(event);

            assert.equal(div.find("td.k-state-focused").text(), focusedDate.getDate() + "");
        });

        it("navigate should focus previous day in month view", function() {
            var event = { keyCode: keys.LEFT, preventDefault: $.noop },
                focusedDate = new Date(calendar.current());

            kendo.calendar.views[0].setDate(focusedDate, -1);

            calendar._move(event);

            assert.equal(div.find("td.k-state-focused").text(), focusedDate.getDate() + "");
        });

        it("navigate should focus day on previous row in month view", function() {
            var event = { keyCode: keys.UP, preventDefault: $.noop },
                focusedDate = new Date(calendar.current());

            kendo.calendar.views[0].setDate(focusedDate, -7);

            calendar._move(event);

            assert.equal(div.find("td.k-state-focused").text(), focusedDate.getDate() + "");
        });

        it("navigate should focus day on next row in month view", function() {
            var event = { keyCode: keys.DOWN, preventDefault: $.noop },
                focusedDate = new Date(calendar.current());

            kendo.calendar.views[0].setDate(focusedDate, 7);

            calendar._move(event);

            assert.equal(div.find("td.k-state-focused").text(), focusedDate.getDate() + "");
        });

        //YEAR VIEW
        it("navigate should focus next month in year view", function() {
            var event = { keyCode: keys.RIGHT, preventDefault: $.noop },
                focusedDate = new Date(calendar.current());

            calendar.navigateUp();

            kendo.calendar.views[1].setDate(focusedDate, 1);

            calendar._move(event);

            assert.equal(div.find("td.k-state-focused").text(), monthsAbbr[focusedDate.getMonth()]);
        });

        it("navigate should focus previous month in year view", function() {
            var event = { keyCode: keys.LEFT, preventDefault: $.noop },
                focusedDate = new Date(calendar.current());

            calendar.navigateUp();

            kendo.calendar.views[1].setDate(focusedDate, -1);

            calendar._move(event);

            assert.deepEqual(calendar.current(), focusedDate);
            assert.equal(div.find("td.k-state-focused").text(), monthsAbbr[focusedDate.getMonth()]);
        });

        it("navigate should focus month on previous row in year view", function() {
            var event = { keyCode: keys.UP, preventDefault: $.noop },
                focusedDate = new Date(calendar.current());

            calendar.navigateUp();

            kendo.calendar.views[1].setDate(focusedDate, -4);

            calendar._move(event);

            assert.deepEqual(calendar.current(), focusedDate);
            assert.equal(div.find("td.k-state-focused").text(), monthsAbbr[focusedDate.getMonth()]);
        });

        it("navigate should focus month on next row in year view", function() {
            var event = { keyCode: keys.DOWN, preventDefault: $.noop },
                focusedDate = new Date(calendar.current());

            calendar.navigateUp();

            kendo.calendar.views[1].setDate(focusedDate, 4);

            calendar._move(event);

            assert.deepEqual(calendar.current(), focusedDate);
            assert.equal(div.find("td.k-state-focused").text(), monthsAbbr[focusedDate.getMonth()]);
        });

        //DECADE VIEW
        it("navigate should focus next year in decade view", function() {
            var event = { keyCode: keys.RIGHT, preventDefault: $.noop },
                focusedDate = new Date(calendar.current());

            calendar.navigate(null, "decade");

            kendo.calendar.views[2].setDate(focusedDate, 1);

            calendar._move(event);

            assert.deepEqual(calendar.current(), focusedDate);
            assert.equal(div.find("td.k-state-focused").text(), focusedDate.getFullYear());

        });

        it("navigate should focus previous year in decade view", function() {
            var event = { keyCode: keys.LEFT, preventDefault: $.noop },
                focusedDate = new Date(calendar.current());

            calendar.navigate(null, "decade");

            kendo.calendar.views[2].setDate(focusedDate, -1);

            calendar._move(event);

            assert.deepEqual(calendar.current(), focusedDate);
            assert.equal(div.find("td.k-state-focused").text(), focusedDate.getFullYear());
            assert.isOk(!div.find("td.k-state-focused").hasClass("k-other-month"));
        });

        it("navigate should focus year on previous row in decade view", function() {
            var event = { keyCode: keys.UP, preventDefault: $.noop },
                focusedDate = new Date(calendar.current());

            calendar.navigate(null, "decade");

            kendo.calendar.views[2].setDate(focusedDate, -4);

            calendar._move(event);

            assert.deepEqual(calendar.current(), focusedDate);
            assert.equal(div.find("td.k-state-focused").text(), focusedDate.getFullYear());
        });

        it("navigate should focus year on next row in decade view", function() {
            var event = { keyCode: keys.DOWN, preventDefault: $.noop },
                focusedDate = new Date(calendar.current());

            calendar.navigate(null, "decade");

            kendo.calendar.views[2].setDate(focusedDate, 4);

            calendar._move(event);

            assert.deepEqual(calendar.current(), focusedDate);
            assert.equal(div.find("td.k-state-focused").text(), focusedDate.getFullYear());
        });

        //CENTURY VIEW
        it("navigate should focus next decade in century view", function() {
            var event = { keyCode: keys.RIGHT, preventDefault: $.noop },
                focusedDate = new Date(calendar.current()),
                year, result;

            calendar.navigate(null, "century");

            kendo.calendar.views[3].setDate(focusedDate, 1);
            year = focusedDate.getFullYear();
            year = year - (year % 10);
            result = year + " - " + (year + 9);

            calendar._move(event);

            assert.equal(div.find("td.k-state-focused").text(), result);
        });

        it("navigate should focus previous decade in century view", function() {
            var event = { keyCode: keys.LEFT, preventDefault: $.noop },
                focusedDate = new Date(calendar.current()),
                year, result;

            calendar.navigate(null, "century");

            kendo.calendar.views[3].setDate(focusedDate, -1);
            year = focusedDate.getFullYear();
            year = year - (year % 10);
            result = year + " - " + (year + 9);

            calendar._move(event);

            assert.equal(div.find("td.k-state-focused").text(), result);
        });

        it("navigate should focus decade on previous row in century view", function() {
            var event = { keyCode: keys.UP, preventDefault: $.noop },
                focusedDate = new Date(calendar.current()),
                year, result;

            calendar.navigate(null, "century");

            kendo.calendar.views[3].setDate(focusedDate, -4);
            year = focusedDate.getFullYear();
            year = year - (year % 10);
            result = year + " - " + (year + 9);

            calendar._move(event);

            assert.equal(div.find("td.k-state-focused").text(), result);
        });

        it("navigate should focus decade on next row in century view", function() {
            var event = { keyCode: keys.DOWN, preventDefault: $.noop },
                focusedDate = new Date(calendar.current()),
                year, result;

            calendar.navigate(null, "century");

            kendo.calendar.views[3].setDate(focusedDate, 4);
            year = focusedDate.getFullYear();
            year = year - (year % 10);
            result = year + " - " + (year + 9);

            calendar._move(event);

            assert.equal(div.find("td.k-state-focused").text(), result);
        });

        //Navigate through views
        it("navigate down", function() {
            var event = { keyCode: keys.DOWN, ctrlKey: true, preventDefault: $.noop };

            stub(calendar, { navigateDown: calendar.navigateDown });
            calendar.navigateUp();

            calendar._focus(calendar.current());

            calendar._move(event);

            assert.equal(calendar.calls("navigateDown"), 1);
        });

        it("navigate up", function() {
            var event = { keyCode: keys.UP, ctrlKey: true, preventDefault: $.noop };

            stub(calendar, "navigateUp");

            calendar._move(event);

            assert.equal(calendar.calls("navigateUp"), 1);
        });

        it("navigate down selects date", function() {
            var event = { keyCode: keys.DOWN, ctrlKey: true, preventDefault: $.noop },
                selectedDate = new Date(2000, 10, 15);

            calendar._focus(selectedDate);

            calendar._move(event);

            assert.deepEqual(calendar.value(), selectedDate);
        });

        it("navigate left", function() {
            var event = { keyCode: keys.LEFT, ctrlKey: true, preventDefault: $.noop };

            stub(calendar, "navigateToPast");

            calendar._move(event);

            assert.equal(calendar.calls("navigateToPast"), 1);
        });

        it("navigate right", function() {
            var event = { keyCode: keys.RIGHT, ctrlKey: true, preventDefault: $.noop };

            stub(calendar, "navigateToFuture");

            calendar._move(event);

            assert.equal(calendar.calls("navigateToFuture"), 1);
        });

        it("Home should focus first day of current month", function() {
            var event = { keyCode: keys.HOME, preventDefault: $.noop };

            calendar._move(event);

            var value = calendar.element.find(".k-state-focused").children(":first").attr("data-value");

            assert.equal(value, kendo.calendar.views[0].toDateString(calendar.current()));
        });

        it("End should focus last day of current month", function() {
            var event = { keyCode: keys.END, preventDefault: $.noop };

            calendar._move(event);

            var value = calendar.element.find(".k-state-focused").children(":first").attr("data-value");

            assert.equal(value, kendo.calendar.views[0].toDateString(calendar.current()));
        });

        it("PageUp should focus same day in previous month", function() {
            var event = { keyCode: keys.PAGEUP, preventDefault: $.noop };

            stub(calendar, { navigateToPast: calendar.navigateToPast });

            calendar._move(event);

            assert.equal(calendar.calls("navigateToPast"), 1);
        });

        it("PageDown should focus same day in next month", function() {
            var event = { keyCode: keys.PAGEDOWN, preventDefault: $.noop };

            stub(calendar, { navigateToFuture: calendar.navigateToFuture });

            calendar._move(event);

            assert.equal(calendar.calls("navigateToFuture"), 1);
        });

        it("Enter should focus viewedDate", function() {
            var event = { keyCode: keys.ENTER, preventDefault: $.noop };

            calendar.navigate(new Date(2000, 10, 10), "year");
            calendar._focus(calendar.current());
            calendar._move(event);

            assert.equal(div.find("td.k-state-focused").length, 1);
        });

        it("Enter should select date", function() {
            var called, event = { keyCode: keys.ENTER, preventDefault: $.noop },
                focused = new Date(2000, 10, 11);

            stub(calendar, { navigateDown: calendar.navigateDown });

            calendar._focus(focused);
            calendar._move(event);

            assert.deepEqual(calendar.args("navigateDown")[0], focused);
        });

        it("Enter should navigate down", function() {
            var event = { keyCode: keys.ENTER, preventDefault: $.noop };

            stub(calendar, { navigateDown: calendar.navigateDown });

            calendar.navigateUp();
            calendar._focus(calendar.current());

            calendar._move(event);

            assert.equal(calendar.calls("navigateDown"), 1);
        });

        it("Click on cell persists the time portion", function() {
            calendar.focus();
            calendar.value(new Date(2000, 10, 10, 14, 30));

            var link = calendar._table.find(".k-state-selected").next().find(".k-link");

            calendar._click(link);

            var value = calendar.value();

            assert.equal(value.getHours(), 14);
            assert.equal(value.getMinutes(), 30);
        });

        it("Click on cell from other month persists the time portion", function() {
            calendar.focus();
            calendar.value(new Date(2000, 10, 10, 14, 30));

            var link = calendar._table.find(".k-other-month").next().find(".k-link");

            calendar._click(link);

            var value = calendar.value();

            assert.equal(value.getHours(), 14);
            assert.equal(value.getMinutes(), 30);
        });

        it("Calendar persits time portion when select date with navigation", function() {
            calendar.focus();
            calendar.value(new Date(2000, 10, 10, 14, 30));

            calendar._move({ keyCode: keys.UPARROW, preventDefault: $.noop });
            calendar._move({ keyCode: keys.ENTER, preventDefault: $.noop });

            var value = calendar.value();

            assert.equal(value.getHours(), 14);
            assert.equal(value.getMinutes(), 30);
        });

        it("Calendar persits time portion when select first day of the month", function() {
            calendar.focus();
            calendar.value(new Date(2000, 10, 10, 14, 30));

            calendar._move({ keyCode: keys.HOME, preventDefault: $.noop });
            calendar._move({ keyCode: keys.ENTER, preventDefault: $.noop });

            var value = calendar.value();

            assert.equal(value.getHours(), 14);
            assert.equal(value.getMinutes(), 30);
        });

        it("Calendar persits time portion when select last day of the month", function() {
            calendar.focus();
            calendar.value(new Date(2000, 10, 10, 14, 30));

            calendar._move({ keyCode: keys.END, preventDefault: $.noop });
            calendar._move({ keyCode: keys.ENTER, preventDefault: $.noop });

            var value = calendar.value();

            assert.equal(value.getHours(), 14);
            assert.equal(value.getMinutes(), 30);
        });
    });

    describe("kendo.ui.Calendar focus persistance", function() {
        beforeEach(function() {


            div = $("<div />").appendTo(Mocha.fixture).kendoCalendar({
                min: new Date(1800, 0, 1),
                max: new Date(2200, 0, 1)
            });

            calendar = div.data("kendoCalendar");

            calendar.focus();
        });
        afterEach(function() {


            calendar.destroy();
            div.remove();
            kendo.destroy(Mocha.fixture);
        });

        it("click to change view", function() {
            document.body.focus();

            calendar.bind("navigate", function() {
                assert.equal(document.activeElement, calendar._table[0]);
            });

            div.find(".k-nav-prev").mousedown();
            div.find(".k-nav-prev").click();
        });

        it("mouseup on calendar will focus the table", function() {
            calendar.element.mouseup();

            assert.equal(document.activeElement, calendar._table[0]);
        });

        it("click on title focuses the table", function() {
            calendar._title.click();

            assert.equal(document.activeElement, calendar._table[0]);
        });

        it("click on prev arrow focuses the table", function() {
            calendar._prevArrow.click();

            assert.equal(document.activeElement, calendar._table[0]);
        });

        it("click on next arrow focuses the table", function() {
            calendar._nextArrow.click();

            assert.equal(document.activeElement, calendar._table[0]);
        });

        it("_move focuses the table", function() {
            calendar._table.trigger({
                type: "keydown",
                keyCode: kendo.keys.RIGHT,
                ctrlKey: true
            });

            assert.equal(document.activeElement, calendar._table[0]);
        });
    });

    describe("kendo.ui.Calendar disabled dates navigation", function() {
        beforeEach(function() {


            div = $("<div />").appendTo(Mocha.fixture).kendoCalendar({
                value: new Date(2015, 9, 22),
                disableDates: function(date) {
                    var disabled = [13, 14, 20, 21, 23];
                    if (date && disabled.indexOf(date.getDate()) > -1) {
                        return true;
                    } else {
                        return false;
                    }
                }
            });

            calendar = div.data("kendoCalendar");

            calendar.focus();
        });
        afterEach(function() {


            calendar.destroy();
            div.remove();
            kendo.destroy(Mocha.fixture);
        });

        it("skips disabled date to the left", function() {
            calendar._move({ keyCode: keys.LEFT, preventDefault: $.noop });

            assert.equal($(".k-state-focused > a").text(), 19);
        });

        it("skips disabled date to the right", function() {
            calendar.value(new Date(2015, 9, 19));
            calendar._move({ keyCode: keys.RIGHT, preventDefault: $.noop });

            assert.equal($(".k-state-focused > a").text(), 22);
        });

        it("skips disabled date when navigated between weeks UP", function() {
            calendar.value(new Date(2015, 9, 28));
            calendar._move({ keyCode: keys.UP, preventDefault: $.noop });

            assert.equal($(".k-state-focused > a").text(), 7);
        });

        it("skips disabled date when navigated between weeks DOWN", function() {
            calendar.value(new Date(2015, 9, 7));
            calendar._move({ keyCode: keys.DOWN, preventDefault: $.noop });

            assert.equal($(".k-state-focused > a").text(), 28);
        });

        it("do not navigate to disabled date in the min range", function() {
            calendar.value(new Date(2015, 9, 15));
            calendar.min(new Date(2015, 9, 13));
            calendar._move({ keyCode: keys.LEFT, preventDefault: $.noop });

            assert.equal($(".k-state-focused > a").text(), 15);
        });


        it("do not navigate to disabled date in the max range", function() {
            var max = new Date(2015, 9, 23);
            calendar.max(max);
            calendar._move({ keyCode: keys.RIGHT, preventDefault: $.noop });
            var focusedValue = new Date($(".k-state-focused > a").data("value")).getDate();
            assert.equal(focusedValue, 22);
        });

        it("same value in previous month can be choosed when navigate to prev month", function() {
            calendar.value(new Date(2015, 11, 1));
            $(".k-nav-prev").trigger("click");
            var valueCell = $(".k-other-month").eq(7);
            valueCell.trigger("click");
            assert.equal(calendar._current.getMonth(), 11);
        });

        it("two consecutive selections can be made", function() {
            calendar.value(new Date(2015, 11, 16));
            var currentCell = $(".k-state-selected");
            currentCell.next().trigger("click");
            assert.equal(calendar.value().getDate(), 17);
        });
    });

    describe("kendo.ui.Calendar mouse multiple selection navigation", function() {
        beforeEach(function() {


            div = $("<div />").appendTo(Mocha.fixture).kendoCalendar({
                value: new Date(2015, 9, 22),
                selectable: "multiple"
            });

            calendar = div.data("kendoCalendar");

            calendar.focus();
        });
        afterEach(function() {


            calendar.destroy();
            div.remove();
            kendo.destroy(Mocha.fixture);
        });

        it("two consecutive selections can be made", function() {
            calendar.value(new Date(2015, 11, 16));
            var currentCell = $(".k-state-selected");
            currentCell.next().trigger("click");
            assert.equal(calendar.value().getDate(), 17);
        });

        it("two consecutive selections can be made with ctrl key", function() {
            var event = $.Event("click", { ctrlKey: true });
            calendar.value(new Date(2015, 11, 16));
            var currentCell = $(".k-state-selected");
            currentCell.next().trigger(event);
            assert.equal(calendar.selectDates().length, 2);
            assert.equal(calendar.element.find(".k-state-selected").length, 2);
        });

        it("two consecutive selections can be made with meta key", function() {
            var event = $.Event("click", { metaKey: true });
            calendar.value(new Date(2015, 11, 16));
            var currentCell = $(".k-state-selected");
            currentCell.next().trigger(event);
            assert.equal(calendar.selectDates().length, 2);
            assert.equal(calendar.element.find(".k-state-selected").length, 2);
        });

        it("deselecting a selected date with ctrl key", function() {
            calendar.value(new Date(2015, 11, 16));
            var event = $.Event("click", { ctrlKey: true }),
                currentCell = $(".k-state-selected"),
                nextCell = currentCell.next();
            nextCell.trigger(event);
            nextCell.trigger(event);
            assert.equal(calendar.selectDates().length, 1);
            assert.equal(calendar.element.find(".k-state-selected").length, 1);
        });

        it("deselecting a selected date with meta key", function() {
            calendar.value(new Date(2015, 11, 16));
            var event = $.Event("click", { metaKey: true }),
                currentCell = $(".k-state-selected"),
                nextCell = currentCell.next();
            nextCell.trigger(event);
            nextCell.trigger(event);
            assert.equal(calendar.selectDates().length, 1);
            assert.equal(calendar.element.find(".k-state-selected").length, 1);
        });

        it("range selection on same view", function() {
            calendar.value(new Date(2015, 11, 16));
            var currentCell = $(".k-state-selected"),
                event = $.Event("click", { shiftKey: true }),
                specificDateCell = calendar.element.find("td").has("a[data-value='2015/11/25']");

            currentCell.trigger("click");

            specificDateCell.trigger(event);
            assert.equal(calendar.selectDates().length, 10);
            assert.equal(calendar.element.find(".k-state-selected").length, 10);
        });

        it("range selection between different views", function() {
            calendar.value(new Date(2015, 10, 16));
            var currentCell = $(".k-state-selected"),
                event = $.Event("click", { shiftKey: true }),
                nextPeriodButton = $(".k-nav-next");

            currentCell.trigger("click");

            nextPeriodButton.trigger("click");

            var specificDateCell = calendar.element.find("td").has("a[data-value='2015/11/10']");

            specificDateCell.trigger(event);
            assert.equal(calendar.selectDates().length, 25);
            assert.equal(calendar.element.find(".k-state-selected").length, 12);
        });

        it("range selection from future month to past month", function() {
            calendar.value(new Date(2015, 10, 10));
            var currentCell = $(".k-state-selected"),
                event = $.Event("click", { shiftKey: true }),
                prevButton = $(".k-nav-prev");

            currentCell.trigger("click");
            prevButton.trigger("click");
            var specificDateCell = calendar.element.find("td").has("a[data-value='2015/9/20']");

            specificDateCell.trigger(event);
            assert.equal(calendar.selectDates().length, 22);
            assert.equal(calendar.element.find(".k-state-selected").length, 19);
        });

        it("range selection from future month to past month with more than one shiftKey selections", function() {
            calendar.value(new Date(2015, 10, 10));
            var currentCell = $(".k-state-selected"),
                event = $.Event("click", { shiftKey: true }),
                prevButton = $(".k-nav-prev"),
                secondEvent = $.Event("click", { shiftKey: true });

            currentCell.trigger("click");
            prevButton.trigger("click");
            var specificDateCell = calendar.element.find("td").has("a[data-value='2015/9/20']");

            specificDateCell.trigger(event);

            var anotherSpecificDateCell = calendar.element.find("td").has("a[data-value='2015/9/10']");
            anotherSpecificDateCell.trigger(secondEvent);
            assert.equal(calendar.selectDates().length, 32);
            assert.equal(calendar.element.find(".k-state-selected").length, 29);
        });

        it("range selection from future month to past month with more than one shiftKey selections on previous date", function() {
            calendar.value(new Date(2015, 10, 10));
            var currentCell = $(".k-state-selected"),
                event = $.Event("click", { shiftKey: true }),
                prevButton = $(".k-nav-prev"),
                secondEvent = $.Event("click", { shiftKey: true });

            currentCell.trigger("click");
            prevButton.trigger("click");
            var specificDateCell = calendar.element.find("td").has("a[data-value='2015/9/20']");

            specificDateCell.trigger(event);
            var anotherSpecificDateCell = calendar.element.find("td").has("a[data-value='2015/9/25']");
            anotherSpecificDateCell.trigger(secondEvent);
            assert.equal(calendar.selectDates().length, 17);
            assert.equal(calendar.element.find(".k-state-selected").length, 14);
        });

        it("range selection with multiple shiftKey selections", function() {
            calendar.value(new Date(2015, 10, 10));
            var currentCell = $(".k-state-selected"),
                event = $.Event("click", { shiftKey: true }),
                specificDateCell = calendar.element.find("td").has("a[data-value='2015/10/20']"),
                secondEvent = $.Event("click", { shiftKey: true });

            currentCell.trigger("click");
            specificDateCell.trigger(event);

            var anotherSpecificDateCell = calendar.element.find("td").has("a[data-value='2015/10/25']");
            anotherSpecificDateCell.trigger(secondEvent);

            assert.equal(calendar.selectDates().length, 16);
            assert.equal(calendar.element.find(".k-state-selected").length, 16);
        });

        it("range selection with multiple shiftKey selections", function() {
            calendar.value(new Date(2015, 10, 10));
            var currentCell = $(".k-state-selected"),
                event = $.Event("click", { shiftKey: true }),
                specificDateCell = calendar.element.find("td").has("a[data-value='2015/10/20']"),
                secondEvent = $.Event("click", { shiftKey: true });

            currentCell.trigger("click");
            specificDateCell.trigger(event);

            var anotherSpecificDateCell = calendar.element.find("td").has("a[data-value='2015/10/25']");
            anotherSpecificDateCell.trigger(secondEvent);

            assert.equal(calendar.selectDates().length, 16);
            assert.equal(calendar.element.find(".k-state-selected").length, 16);
        });
    });

    describe("kendo.ui.Calendar keyboard multiple selection navigation", function() {
        beforeEach(function() {


            div = $("<div />").appendTo(Mocha.fixture).kendoCalendar({
                value: new Date(2015, 9, 22),
                selectable: "multiple"
            });

            calendar = div.data("kendoCalendar");

            calendar.focus();
        });
        afterEach(function() {


            calendar.destroy();
            div.remove();
            kendo.destroy(Mocha.fixture);
        });

        it("focus other month date does not navigate to other month", function() {
            var cell = div.find("tbody").find("td:not(.k-other-month)").eq(0);

            calendar.bind("navigate", function(e) {
                assert.isOk(false);
            });
            cell.click();
        });

        it("move with keyboard when next selection does not exists on current view navigates", function() {
            var event = { keyCode: keys.LEFT, preventDefault: $.noop },
                cell = calendar.element.find("tbody").find("td.k-other-month").eq(0),
                date = toDateObject(cell.find("a"));
            calendar.bind("navigate", function(e) {
                assert.isOk(true);
            });

            calendar._current = date;
            calendar._move(event);
        });

        it("move with keyboard to next view and focses the date in the view", function() {
            var event = { keyCode: keys.LEFT, preventDefault: $.noop },
                cell = calendar.element.find("tbody").find("td.k-other-month").eq(0),
                date = toDateObject(cell.find("a"));

            calendar._current = date;
            calendar._move(event);
            var focusedDate = toDateObject(div.find("tbody").find("td.k-state-focused").find("a"));
            assert.equal(focusedDate.getDate() + 1, date.getDate());
        });

        it("range selection with shiftKey and left arrow key", function() {
            var date = new Date(2015, 10, 10);
            event = { keyCode: keys.LEFT, shiftKey: true, preventDefault: $.noop };

            calendar.value(date);
            calendar._move(event);

            assert.equal(+calendar.selectDates()[1], +date);
            assert.equal(+calendar.selectDates()[0], +(new Date(2015, 10, 9)));
        });

        it("range selection with shiftKey and right arrow key", function() {
            var date = new Date(2015, 10, 10),
                event = { keyCode: keys.RIGHT, shiftKey: true, preventDefault: $.noop };

            calendar.value(date);

            calendar._move(event);
            assert.equal(+calendar.selectDates()[0], +date);
            assert.equal(+calendar.selectDates()[1], +(new Date(2015, 10, 11)));
        });

        it("range selection with shiftKey and down arrow key", function() {
            var date = new Date(2015, 10, 10),
                event = { keyCode: keys.DOWN, shiftKey: true, preventDefault: $.noop };
            calendar.value(date);

            calendar._move(event);
            assert.equal(calendar.selectDates().length, 8);
            assert.equal(+calendar.selectDates()[7], +(new Date(2015, 10, 17)));
        });

        it("range selection with shiftKey and up arrow key and change view", function() {
            var event = { keyCode: keys.UP, shiftKey: true, preventDefault: $.noop };


            calendar.navigate(new Date(2015, 10, 10));

            var cell = div.find("tbody").find("td").eq(1);
            calendar.bind("navigate", function(e) {
                assert.isOk(true);
            });
            calendar._current = new Date(2015, 10, 2);
            cell.trigger("click");
            calendar._move(event);
            var anotherEvent = { keyCode: keys.UP, shiftKey: true, preventDefault: $.noop };
            calendar._move(anotherEvent);
            assert.equal(calendar.selectDates().length, 15);
            assert.equal(+calendar.selectDates()[0], +(new Date(2015, 9, 19)));
        });

        it("range selection with shiftKey and space key", function() {
            var moveEvent = { keyCode: keys.DOWN, ctrlKey: false, preventDefault: $.noop },
                clickEvent = { keyCode: keys.SPACEBAR, shiftKey: true, preventDefault: $.noop };
            calendar.value(new Date(2015, 10, 10))

            calendar._move(moveEvent);
            calendar._move(clickEvent);
            assert.equal(calendar.selectDates().length, 8);
            assert.equal(+calendar.selectDates()[7], +(new Date(2015, 10, 17)));
        });

        it("range selection with ctrl key and space key", function() {
            var moveEvent = { keyCode: keys.DOWN, preventDefault: $.noop },
                clickEvent = { keyCode: keys.SPACEBAR, ctrlKey: true, preventDefault: $.noop };

            calendar.value(new Date(2015, 10, 10))
            calendar._move(moveEvent);
            calendar._move(clickEvent);
            assert.equal(calendar.selectDates().length, 2);
            assert.equal(+calendar.selectDates()[1], +(new Date(2015, 10, 17)));
        });

    });

    describe("kendo.ui.Calendar navigation border cases", function() {
        beforeEach(function() {
            div = $("<div />").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
            div.remove();
        });

        it("navigating works correctly when the new current is less tha min value", function() {
            var calendar = div.kendoCalendar({
                min: new Date(2017, 4, 31),
                value: new Date(2017, 4, 31),
                start: "year"
            }).getKendoCalendar();

            var downEvent = { keyCode: keys.DOWN, preventDefault: $.noop };
            var upEvent = { keyCode: keys.UP, preventDefault: $.noop };

            calendar.focus();
            calendar._move(downEvent);
            calendar._move(upEvent);
            assert.equal(+calendar.current(), +(new Date(2017, 4, 31)));
        });

        it("navigating and selecting works correctly when the new current is less tha min value", function() {
            var calendar = div.kendoCalendar({
                selectable: "multiple",
                animation: false,
                min: new Date(2017, 4, 27),
                value: new Date(2017, 5, 1)
            }).getKendoCalendar();

            var upEvent = { keyCode: kendo.keys.UP, shiftKey: true, preventDefault: $.noop };

            calendar.element.find(".k-state-selected").trigger("click");
            calendar._move(upEvent);
            assert.equal(+calendar.current(), +(new Date(2017, 4, 27)));
            assert.equal(calendar.selectDates().length, 6);

        });

        it("navigating in century view works correctly", function() {
            var calendar = div.kendoCalendar({
                selectable: "multiple",
                weekNumber: true,
                start: "century",
                disableDates: ["we", "sa"]
            }).getKendoCalendar();

            var rightEvent = { keyCode: kendo.keys.RIGHT, preventDefault: $.noop };
            var current = calendar.current().getFullYear();
            calendar.focus();
            calendar._move(rightEvent);
            assert.equal(calendar.current().getFullYear(), current + 10);

        });
    });
}());
