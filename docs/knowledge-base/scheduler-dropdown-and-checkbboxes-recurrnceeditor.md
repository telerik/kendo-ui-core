---
title: Use DropDownList for RecurrenceEditor and Checkboxes for Week Days sSelection
description: An example on how to force the Scheduler RecurrenceEditor to its older look and feel.
type: how-to
page_title: Use DropDownList for RecurrenceEditor and Checkboxes for Week Days Selection | Kendo UI Scheduler for jQuery
slug: scheduler-dropdown-and-checkbboxes-recurrnceeditor
tags: recurrence, recurrenceeditor, scheduler, editor, dropdownlist, checkboxes
res_type: kb
component: scheduler
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Scheduler</td>
 </tr>
</table>


## Description

As of the Kendo UI 2020 R3 release, the Scheduler RecurrenceEditor is rendered as a ButtonGroup and not a DropDownList. Apart from that, in the Weekly recurrence view the days selection is also displayed as a ButtonGroup instead of checkboxes. How can I go back to the older look?

## Solution

In order to have the DropDownList and the checkboxes instead of the current ButtonGroups you should override some parts of the RecurrenceEditor widget:

```dojo
<div id="scheduler"></div>

<script>
    // Below is needed to override the RecurrenceEditor definition
    var weekDayCheckBoxes = function(firstDay, repeatOn) {
        var shortNames = kendo.culture().calendar.days.namesShort,
            names = kendo.culture().calendar.days.names,
            length = shortNames.length,
            result = "",
            idx = 0,
            values = [];

        for (; idx < length; idx++) {
            values.push(idx);
        }

        shortNames = shortNames.slice(firstDay).concat(shortNames.slice(0, firstDay));
        names = names.slice(firstDay).concat(names.slice(0, firstDay));
        values = values.slice(firstDay).concat(values.slice(0, firstDay));

        for (idx = 0; idx < length; idx++) {
            result += '<label class="k-check"><input aria-label="' + repeatOn + ' ' + names[idx] + '" class="k-recur-weekday-checkbox" type="checkbox" value="' + values[idx] + '" /> ' + shortNames[idx] + "</label>";
        }

        return result;
    };

    var CUSTOM_RECURRENCE_VIEW_TEMPLATE = kendo.template(
       '# if (frequency !== "never") { #' +
           '<div class="k-edit-label"><label>#:messages.repeatEvery#</label></div>' +
           '<div class="k-edit-field"><input class="k-recur-interval" title="#:messages.repeatEvery# #:messages.interval#"/>#:messages.interval#</div>' +
       '# } #' +
       '# if (frequency === "weekly") { #' +
           '<div class="k-edit-label"><label>#:messages.repeatOn#</label></div>' +
           '<div class="k-edit-field">#=weekDayCheckBoxes(firstWeekDay,messages.repeatOn)#</div>' +
       '# } else if (frequency === "monthly") { #' +
           '<div class="k-edit-label"><label>#:messages.repeatOn#</label></div>' +
           '<div class="k-edit-field">' +
               '<ul class="k-reset">' +
                   '<li>' +
                       '<label class="<label class="k-radio-label"><input class="k-recur-month-radio k-radio" type="radio" name="month" value="monthday" title="#:messages.repeatOn#" />#:messages.date#:</label>' +
                       '<input class="k-recur-monthday" title="#:messages.date#" />' +
                   '</li>' +
                   '<li>' +
                        '<input class="k-recur-month-radio k-radio" type="radio" name="month" value="weekday" title="#:messages.repeatOn# #:messages.day#" />' +
                        '<input class="k-recur-weekday-offset" title="#:messages.repeatOn#" /><input class="k-recur-weekday" title="#:messages.day#" />' +
                   '</li>' +
               '</ul>' +
           '</div>' +
       '# } else if (frequency === "yearly") { #' +
           '<div class="k-edit-label"><label>#:messages.repeatOn#</label></div>' +
           '<div class="k-edit-field">' +
               '<ul class="k-reset">' +
                   '<li>' +
                       '<input class="k-recur-year-radio k-radio" type="radio" name="year" value="monthday" title="#:messages.repeatOn# #:messages.month#" />' +
                       '<input class="k-recur-month" title="#:messages.month#" /><input class="k-recur-monthday" title="#:messages.date#" />' +
                   '</li>' +
                   '<li>' +
                       '<input class="k-recur-year-radio k-radio" type="radio" name="year" value="weekday" title="#:messages.repeatOn# #:messages.day#" />' +
                       '<input class="k-recur-weekday-offset" title="#:messages.repeatOn#" /><input class="k-recur-weekday" title="#:messages.day#"  />#:messages.of#<input class="k-recur-month" title="#:messages.of + messages.month#"/>' +
                   '</li>' +
               '</ul>' +
           '</div>' +
       '# } #' +
       '# if (frequency !== "never") { #' +
           '<div class="k-edit-label"><label>#:end.label#</label></div>' +
           '<div class="k-edit-field">' +
               '<ul class="k-reset">' +
                   '<li>' +
                       '<label class="k-radio-label"><input class="k-recur-end-never k-radio" type="radio" name="end" value="never" title="#:end.label#" />#:end.never#</label>' +
                   '</li>' +
                   '<li>' +
                       '<label class="k-radio-label"><input class="k-recur-end-count k-radio" type="radio" name="end" value="count" title="#:end.label#" />#:end.after#</label>' +
                       '<input class="k-recur-count" title="#:end.occurrence#" />#:end.occurrence#' +
                   '</li>' +
                   '<li>' +
                       '<label class="k-radio-label"><input class="k-recur-end-until k-radio" type="radio" name="end" value="until" title="#:end.label#" />#:end.on#</label>' +
                       '<input class="k-recur-until" title="#:end.on#" name="recur-until" />' +
                   '</li>' +
               '</ul>' +
           '</div>' +
       '# } #'
    );

     kendo.ui.RecurrenceEditor.fn._initWeekDays = function() {
         var that = this;
         var rule = that._value;
         var weekDays = that._container.find(".k-recur-weekday-checkbox");

         if (weekDays[0]) {
             weekDays.on("click" + that._namespace, function() {
                 rule.weekDays = $.map(weekDays.filter(":checked"), function(checkbox) {
                     return {
                         day: Number(checkbox.value),
                         offset: 0
                     };
                 });

                 if (!that.options.mobile) {
                     that._trigger();
                 }
             });

             if (rule.weekDays) {
                 var idx, weekDay;
                 var i = 0, l = weekDays.length;
                 var length = rule.weekDays.length;

                 for (; i < l; i++) {
                     weekDay = weekDays[i];
                     for (idx = 0; idx < length; idx ++) {
                         if (weekDay.value == rule.weekDays[idx].day) {
                             weekDay.checked = true;
                         }
                     }
                 }
             }
         }
     };
     kendo.ui.RecurrenceEditor.fn.value = function(value) {
         var that = this;
         var timezone = that.options.timezone;
         var freq;

         if (value === undefined) {
             if (!that._value.freq) {
                 return "";
             }

             return kendo.recurrence.rule.serialize(that._value, timezone);
         }

         that._value = kendo.recurrence.rule.parse(value, timezone) || {};

         freq = that._value.freq;

         if (freq) {
             that._frequency.value(freq);
         } else {
             that._frequency.select(0);
         }

         that._initView(that._frequency.value());
     };
     kendo.ui.RecurrenceEditor.fn._initFrequency = function() {
         var that = this,
             options = that.options,
             frequencies = options.frequencies,
             messages = options.messages.frequencies,
             ddl = $('<input />').attr({title: options.messages.recurrenceEditorTitle}),
             frequency;

         frequencies = $.map(frequencies, function(frequency) {
             return {
                 text: messages[frequency],
                 value: frequency
             };
         });

         frequency = frequencies[0];
         if (frequency && frequency.value === "never") {
             frequency.value = "";
         }

         that.element.append(ddl);
         that._frequency = new kendo.ui.DropDownList(ddl, {
             dataTextField: "text",
             dataValueField: "value",
             dataSource: frequencies,
             change: function() {
                 that._value = {};
                 that._initView(that._frequency.value());
                 that.trigger("change");
             }
         });
     };
     kendo.ui.RecurrenceEditor.fn._initView = function(frequency) {
         var that = this;
         var rule = that._value;
         var options = that.options;

         var data = {
                 frequency: frequency || "never",
                 weekDayCheckBoxes: weekDayCheckBoxes,
                 firstWeekDay: options.firstWeekDay,
                 messages: options.messages[frequency],
                 end: options.messages.end
         };

         kendo.destroy(that._container);
         that._container.html(CUSTOM_RECURRENCE_VIEW_TEMPLATE(data));

         if (!frequency) {
             that._value = {};
             return;
         }

         rule.freq = frequency;

         if (frequency === "weekly" && !rule.weekDays) {
             rule.weekDays = [{
                 day: options.start.getDay(),
                 offset: 0
             }];
         }

         that._initInterval();
         that._initWeekDays();
         that._initMonthDay();
         that._initWeekDay();
         that._initMonth();
         that._initCount();
         that._initUntil();

         that._period();
         that._end();
     };

    // Below is needed to override the MobileRecurrenceEditor definition
    var mobileWeekDayCheckBoxes = function(firstDay) {
        var shortNames = kendo.culture().calendar.days.names,
            length = shortNames.length,
            result = "",
            idx = 0,
            values = [];

        for (; idx < length; idx++) {
            values.push(idx);
        }

        shortNames = shortNames.slice(firstDay).concat(shortNames.slice(0, firstDay));
        values = values.slice(firstDay).concat(values.slice(0, firstDay));

        for (idx = 0; idx < length; idx++) {
            result += '<li class="k-item k-listgroup-item">';
            result += '<label class="k-label k-listgroup-form-row">';
            result += '<span class="k-item-title k-listgroup-form-field-label">' + shortNames[idx] + '</span>';
            result += '<span class="k-listgroup-form-field-wrapper">';
            result += '<input class="k-recur-weekday-checkbox k-check" type="checkbox" value="' + values[idx] + '" />';
            result += '</span>';
            result += '</label>';
            result += '</li>';
        }

        return result;
    };

    var CUSTOM_RECURRENCE_REPEAT_PATTERN_TEMPLATE = kendo.template(
        '# if (frequency !== "never") { #' +
            '<label class="k-label k-listgroup-form-row">' +
                '<span class="k-item-title k-listgroup-form-field-label">#:messages.repeatEvery#</span>' +
                '<div class="k-recur-editor-wrap k-listgroup-form-field-wrapper">' +
                    '<input class="k-recur-interval" type="number" pattern="\\\\d*"/>' +
                    '# if (messages.interval.length) { #' +
                        '<span class="k-recur-editor-text">#:messages.interval#</span>' +
                    '# } #' +
                '</div>' +
            '</label>' +
        '# } #' +
        '# if (frequency === "weekly") { #' +
            '<ul class="k-recur-items-wrap k-listgroup k-listgroup-flush">' +
                '<li class="k-item k-listgroup-item k-no-click">' +
                    '<label class="k-label k-listgroup-form-row">' +
                        '<span class="k-item-title k-listgroup-form-field-label">#:messages.repeatOn#</span>' +
                    '</label>' +
                '</li>' +
                '#=weekDayCheckBoxes(firstWeekDay)#' +
            '</ul>' +
        '# } else if (frequency === "monthly") { #' +
            '<ul class="k-recur-items-wrap k-listgroup k-listgroup-flush">' +
                '<li class="k-item k-listgroup-item">' +
                    '<label class="k-label k-listgroup-form-row">' +
                        '<span class="k-item-title k-listgroup-form-field-label">#:messages.repeatBy#</span>' +
                        '<div class="k-repeat-rule k-listgroup-form-field-wrapper"></div>' +
                    '</label>' +
                '</li>' +
                '<li class="k-monthday-view k-item k-listgroup-item" style="display:none">' +
                    '<label class="k-label k-listgroup-form-row">' +
                        '<span class="k-item-title k-listgroup-form-field-label">#:messages.day#</span>' +
                        '<div class="k-listgroup-form-field-wrapper"><input class="k-recur-monthday" type="number" title="#:messages.day#" pattern="\\\\d*"/></div>' +
                    '</label>' +
                '</li>' +
                '<li class="k-weekday-view k-item k-listgroup-item" style="display:none">' +
                    '<label class="k-label k-listgroup-form-row">' +
                        '<span class="k-item-title k-listgroup-form-field-label">#:messages.every#</span>' +
                        '<div class="k-listgroup-form-field-wrapper"><select class="k-recur-weekday-offset" title="#:messages.every#"></select></div>' +
                    '</label>' +
                '</li>' +
                '<li class="k-weekday-view k-item k-listgroup-item" style="display:none">' +
                    '<label class="k-label k-listgroup-form-row">' +
                        '<span class="k-item-title k-listgroup-form-field-label">#:messages.day#</span>' +
                        '<div class="k-listgroup-form-field-wrapper"><select class="k-recur-weekday" title="#:messages.day#"></select></div>' +
                    '</label>' +
                '</li>' +
            '</ul>' +
        '# } else if (frequency === "yearly") { #' +
            '<ul class="k-recur-items-wrap k-listgroup k-listgroup-flush">' +
                '<li class="k-item k-listgroup-item">' +
                    '<label class="k-label k-listgroup-form-row">' +
                        '<span class="k-item-title k-listgroup-form-field-label">#:messages.repeatBy#</span>' +
                        '<div class="k-repeat-rule k-listgroup-form-field-wrapper"></div>' +
                    '</label>' +
                '</li>' +
                '<li class="k-monthday-view k-item k-listgroup-item" style="display:none">' +
                    '<label class="k-label k-listgroup-form-row">' +
                        '<span class="k-item-title k-listgroup-form-field-label">#:messages.day#</span>' +
                        '<div class="k-listgroup-form-field-wrapper"><input class="k-recur-monthday" type="number" title="#:messages.day#" pattern="\\\\d*"/></div>' +
                    '</label>' +
                '</li>' +
                '<li class="k-weekday-view k-item k-listgroup-item" style="display:none">' +
                    '<label class="k-label k-listgroup-form-row">' +
                        '<span class="k-item-title k-listgroup-form-field-label">#:messages.every#</span>' +
                        '<div class="k-listgroup-form-field-wrapper"><select class="k-recur-weekday-offset" title="#:messages.every#"></select></div>' +
                    '</label>' +
                '</li>' +
                '<li class="k-weekday-view k-item k-listgroup-item" style="display:none">' +
                    '<label class="k-label k-listgroup-form-row">' +
                        '<span class="k-item-title k-listgroup-form-field-label">#:messages.day#</span>' +
                        '<div class="k-listgroup-form-field-wrapper"><select class="k-recur-weekday" title="#:messages.day#"></select></div>' +
                    '</label>' +
                '</li>' +
                '<li class="k-item k-item k-listgroup-item">' +
                    '<label class="k-label k-listgroup-form-row">' +
                        '<span class="k-item-title k-listgroup-form-field-label">#:messages.month#</span>' +
                        '<div class="k-listgroup-form-field-wrapper"><select class="k-recur-month" title="#:messages.month#"></select></div>' +
                    '</label>' +
                '</li>' +
           '</ul>' +
        '# } #'
    );

    kendo.ui.MobileRecurrenceEditor.fn._initWeekDays = function() {
        var that = this;
        var rule = that._value;
        var weekDays = that._container.find(".k-recur-weekday-checkbox");

        if (weekDays[0]) {
            weekDays.on("click" + that._namespace, function() {
                rule.weekDays = $.map(weekDays.filter(":checked"), function(checkbox) {
                    return {
                        day: Number(checkbox.value),
                        offset: 0
                    };
                });

                if (!that.options.mobile) {
                    that._trigger();
                }
            });

            if (rule.weekDays) {
                var idx, weekDay;
                var i = 0, l = weekDays.length;
                var length = rule.weekDays.length;

                for (; i < l; i++) {
                    weekDay = weekDays[i];
                    for (idx = 0; idx < length; idx ++) {
                        if (weekDay.value == rule.weekDays[idx].day) {
                            weekDay.checked = true;
                        }
                    }
                }
            }
        }
    };

    kendo.ui.MobileRecurrenceEditor.fn._initRepeatView = function(isMobile) {
        var that = this;
        var frequency = that._value.freq || "never";

        var data = {
                frequency: frequency,
                weekDayCheckBoxes: isMobile ? mobileWeekDayCheckBoxes : weekDayCheckBoxes,
                firstWeekDay: that.options.firstWeekDay,
                messages: that.options.messages[frequency]
        };

        var html = CUSTOM_RECURRENCE_REPEAT_PATTERN_TEMPLATE(data);

        var container = that._container = that._container || this._pane.view().content.find("li.k-recur-view");
        var rule = that._value;

        if(that._endLabelField){
            that._endLabelField.toggleClass("k-state-disabled", frequency === "never");
        }

        kendo.destroy(container);
        container.html(html);

        if (!html) {
            that._value = {};
            container.hide();
            return;
        } else {
            container.show();
        }

        if (frequency === "weekly" && !rule.weekDays) {
                rule.weekDays = [{
                day: that.options.start.getDay(),
                offset: 0
                }];
        }

        that._initInterval();
        that._initMonthDay();
        that._initWeekDays();
        that._initWeekDay();
        that._initMonth();

        that._period();
    };

    $("#sch").kendoScheduler({
        dataSource: {
            batch: true,
            transport: {
                read: {
                    url: "https://demos.telerik.com/kendo-ui/service/tasks",
                    dataType: "jsonp"
                },
                update: {
                    url: "https://demos.telerik.com/kendo-ui/service/tasks/update",
                    dataType: "jsonp"
                },
                create: {
                    url: "https://demos.telerik.com/kendo-ui/service/tasks/create",
                    dataType: "jsonp"
                },
                destroy: {
                    url: "https://demos.telerik.com/kendo-ui/service/tasks/destroy",
                    dataType: "jsonp"
                },
                parameterMap: function(options, operation) {
                    if (operation !== "read" && options.models) {
                        return {models: kendo.stringify(options.models)};
                    }
                }
            },
            schema: {
                model: {
                    id: "taskId",
                    fields: {
                        taskId: { from: "TaskID", type: "number" },
                        title: { from: "Title", defaultValue: "No title", validation: { required: true } },
                        start: { type: "date", from: "Start" },
                        end: { type: "date", from: "End" },
                        startTimezone: { from: "StartTimezone" },
                        endTimezone: { from: "EndTimezone" },
                        description: { from: "Description" },
                        recurrenceId: { from: "RecurrenceID" },
                        recurrenceRule: { from: "RecurrenceRule" },
                        recurrenceException: { from: "RecurrenceException" },
                        ownerId: { from: "OwnerID", defaultValue: 1 },
                        isAllDay: { type: "boolean", from: "IsAllDay" }
                    }
                }
            }
        },
    });
</script>
```

## See Also

* [API Reference of the Scheduler](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler).
