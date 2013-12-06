(function() {
   var MobileRecurrenceEditor = kendo.ui.MobileRecurrenceEditor,
        editField, pane, div;

    module("kendo.ui.MobileRecurrenceEditor initialization", {
        setup: function() {
            var element = $("<div />").appendTo(QUnit.fixture);

            pane = kendo.mobile.ui.Pane.wrap(element);

            editField = $("<div class='k-edit-field' />").appendTo(QUnit.fixture);
            div = $("<div />").appendTo(editField);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("MobileRecurrenceEditor attaches a mobile reccurrenceEditor object to target", function() {
        div.kendoMobileRecurrenceEditor();

        ok(div.data("kendoMobileRecurrenceEditor") instanceof MobileRecurrenceEditor);
    });

    test("MobileRecurrenceEditor renders repeat button", function() {
        div.kendoMobileRecurrenceEditor();

        var button = div.find(".k-scheduler-recur");

        ok(button[0]);
    });

    test("MobileRecurrenceEditor renders end button", function() {
        div.kendoMobileRecurrenceEditor();

        var label = editField.next();
        var endEditField = label.next();
        var button = endEditField.children(".k-scheduler-recur-end");

        ok(label.hasClass("k-edit-label"));
        ok(endEditField.hasClass("k-edit-field"));
        ok(button[0]);
    });

    test("MobileRecurrenceEditor renders disabled end button if no frequency", function() {
        div.kendoMobileRecurrenceEditor();

        var label = editField.next();
        var endEditField = label.next();

        ok(label.hasClass("k-state-disabled"));
        ok(endEditField.hasClass("k-state-disabled"));
    });

    test("MobileRecurrenceEditor renders enabled end button if frequency", function() {
        div.kendoMobileRecurrenceEditor({
            value: "FREQ=DAILY"
        });

        var label = editField.next();
        var endEditField = label.next();

        ok(!label.hasClass("k-state-disabled"));
        ok(!endEditField.hasClass("k-state-disabled"));
    });

    test("MobileRecurrenceEditor navigates to recurrence view when click the repeat button", function() {
        div.kendoMobileRecurrenceEditor({
            pane: pane
        });

        div.find(".k-scheduler-recur").click();

        var view = $("#recurrence");

        ok(view[0]);
    });

    test("View renders localized header", function() {
        div.kendoMobileRecurrenceEditor({
            pane: pane
        });

        div.find(".k-scheduler-recur").click();

        var view = $("#recurrence");

        equal(view.find(".k-scheduler-cancel").text(), MobileRecurrenceEditor.fn.options.messages.cancel);
        equal(view.find(".k-scheduler-update").text(), MobileRecurrenceEditor.fn.options.messages.update);
    });

    test("View renders frequency toolbar", function() {
        div.kendoMobileRecurrenceEditor({
            pane: pane
        });

        div.find(".k-scheduler-recur").click();

        var view = $("#recurrence");

        var toolbar = view.find("ul.k-scheduler-navigation:first");
        var li = toolbar.children();

        equal(li.length, MobileRecurrenceEditor.fn.options.frequencies.length);
        equal(li.eq(0).find(".k-link").text(), MobileRecurrenceEditor.fn.options.messages.frequencies.never);
    });

    test("MobileRecurrenceEditor renders daily view", function() {
        div.kendoMobileRecurrenceEditor({
            pane: pane,
            value: "FREQ=DAILY;INTERVAL=2"
        });

        div.find(".k-scheduler-recur").click();

        var view = $("#recurrence");
        var toolbar = view.find("ul.k-scheduler-navigation:first");

        var patternView = view.find(".k-recur-view");
        var interval = patternView.find("[data-role=numerictextbox].k-recur-interval");

        ok(interval[0]);
        equal(interval.data("kendoNumericTextBox").value(), 2);
    });

    test("MobileRecurrenceEditor renders daily view", function() {
        div.kendoMobileRecurrenceEditor({
            pane: pane,
            value: "FREQ=DAILY;INTERVAL=2"
        });

        div.find(".k-scheduler-recur").click();

        var view = $("#recurrence");
        var toolbar = view.find("ul.k-scheduler-navigation:first");

        var patternView = view.find(".k-recur-view");
        var interval = patternView.find("[data-role=numerictextbox].k-recur-interval");

        ok(interval[0]);
        equal(interval.data("kendoNumericTextBox").value(), 2);
    });

    test("MobileRecurrenceEditor renders weekly view", function() {
        div.kendoMobileRecurrenceEditor({
            pane: pane,
            value: "FREQ=WEEKLY;INTERVAL=2;BYDAY=MO,TU"
        });

        div.find(".k-scheduler-recur").click();

        var view = $("#recurrence");
        var toolbar = view.find("ul.k-scheduler-navigation:first");

        var patternView = view.find(".k-recur-view");
        var interval = patternView.find("[data-role=numerictextbox].k-recur-interval");

        var checkboxes = patternView.find("input:checked");

        ok(interval[0]);
        equal(interval.data("kendoNumericTextBox").value(), 2);
        equal(checkboxes.length, 2);
        equal(checkboxes.eq(0).val(), "1");
        equal(checkboxes.eq(1).val(), "2");
    });

    test("MobileRecurrenceEditor renders monthly view", function() {
        div.kendoMobileRecurrenceEditor({
            pane: pane,
            value: "FREQ=MONTHLY;INTERVAL=2;BYDAY=3MO;BYMONTHDAY=20"
        });

        div.find(".k-scheduler-recur").click();

        var view = $("#recurrence");
        var toolbar = view.find("ul.k-scheduler-navigation:first");

        var patternView = view.find(".k-recur-view");
        var interval = patternView.find("[data-role=numerictextbox].k-recur-interval");

        var weekday = patternView.find("select.k-recur-weekday");
        var weekdayOffset = patternView.find("select.k-recur-weekday-offset");

        var monthday = patternView.find("[data-role=numerictextbox].k-recur-monthday");

        ok(interval[0]);
        equal(interval.data("kendoNumericTextBox").value(), 2);

        equal(monthday.val(), 20);

        equal(weekdayOffset.val(), "3");
        equal(weekday.val(), "1");
    });

    test("MobileRecurrenceEditor renders yearly view", function() {
        div.kendoMobileRecurrenceEditor({
            pane: pane,
            value: "FREQ=YEARLY;INTERVAL=2;BYMONTH=4;BYDAY=3MO;BYMONTHDAY=20"
        });

        div.find(".k-scheduler-recur").click();

        var view = $("#recurrence");
        var toolbar = view.find("ul.k-scheduler-navigation:first");

        var patternView = view.find(".k-recur-view");
        var interval = patternView.find("[data-role=numerictextbox].k-recur-interval");

        var weekday = patternView.find("select.k-recur-weekday");
        var weekdayOffset = patternView.find("select.k-recur-weekday-offset");

        var monthday = patternView.find("[data-role=numerictextbox].k-recur-monthday");

        var month = patternView.find("select.k-recur-month");

        ok(interval[0]);
        equal(interval.data("kendoNumericTextBox").value(), 2);

        equal(month.val(), 4);

        equal(monthday.val(), 20);

        equal(weekdayOffset.val(), "3");
        equal(weekday.val(), "1");
    });

    test("Changing frequency updates recurrence rule", function() {
        div.kendoMobileRecurrenceEditor({
            pane: pane,
            value: "FREQ=YEARLY;INTERVAL=2;BYMONTH=4;BYDAY=3MO;BYMONTHDAY=20"
        });

        div.find(".k-scheduler-recur").click();

        var view = $("#recurrence");
        var toolbar = view.find("ul.k-scheduler-navigation:first");

        toolbar.find(".k-link:first").click();

        equal(div.data("kendoMobileRecurrenceEditor").value(), "");
    });

    test("clicking update button triggers change event", 1, function() {
        div.kendoMobileRecurrenceEditor({
            pane: pane,
            value: "FREQ=YEARLY;INTERVAL=2;BYMONTH=4;BYDAY=3MO;BYMONTHDAY=20",
            change: function() {
                ok(true);
            }
        });

        div.find(".k-scheduler-recur").click();

        var view = $("#recurrence");
        var toolbar = view.find("ul.k-scheduler-navigation:first");

        view.find(".k-scheduler-update").click();
    });

    test("MobileRecurrenceEditor navigates to recurrence view when click the end button", function() {
        div.kendoMobileRecurrenceEditor({
            pane: pane,
            value:"FREQ=DAILY"
        });

        var endField = editField.siblings(".k-edit-field");
        var endButton = endField.find(".k-button");

        endButton.click();

        var view = $("#recurrence");

        ok(view[0]);
    });

    test("View renders end pattern toolbar", function() {
        div.kendoMobileRecurrenceEditor({
            value:"FREQ=DAILY",
            pane: pane
        });

        var endField = editField.siblings(".k-edit-field");
        var endButton = endField.find(".k-button");

        endButton.click();

        var toolbar = $("#recurrence").find("ul.k-scheduler-navigation:first");
        var li = toolbar.children();

        equal(li.length, 3);
        equal(li.eq(0).find(".k-link").text(), MobileRecurrenceEditor.fn.options.messages.end.patterns.never);
    });

    test("View renders count input for end option", function() {
        div.kendoMobileRecurrenceEditor({
            value:"FREQ=DAILY",
            pane: pane
        });

        var endField = editField.siblings(".k-edit-field");
        var endButton = endField.find(".k-button");
        endButton.click();

        var view = $("#recurrence");
        var count = view.find("ul.k-scheduler-navigation:first").children().eq(1);

        count.click();

        var countInput = view.find("[data-role=numerictextbox].k-recur-count");

        ok(countInput[0]);
        equal(countInput.val(), "1");
        equal(div.data("kendoMobileRecurrenceEditor").value(), "FREQ=DAILY;COUNT=1;WKST=SU");
    });

    test("View renders until input for end option", function() {
        div.kendoMobileRecurrenceEditor({
            value:"FREQ=DAILY",
            pane: pane
        });

        var endField = editField.siblings(".k-edit-field");
        var endButton = endField.find(".k-button");
        endButton.click();

        var view = $("#recurrence");
        var until = view.find("ul.k-scheduler-navigation:first").children().eq(2);

        until.click();

        var untilInput = view.find("input.k-recur-until");
        var value;

        if (kendo.support.input.date) {
            value = kendo.parseDate(untilInput.val(), "yyyy-MM-dd");
        } else {
            value = untilInput.data("kendoDatePicker").value();
        }

        value = kendo.timezone.convert(value, value.getTimezoneOffset(), "Etc/UTC");

        equal(div.data("kendoMobileRecurrenceEditor").value(), "FREQ=DAILY;UNTIL=" + kendo.toString(value, "yyyyMMddTHHmmssZ") + ";WKST=SU");
    });
})();
