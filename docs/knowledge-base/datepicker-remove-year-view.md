---
title: Hide Year Selection from DatePicker and DateTimePicker
description: An example on how to disable the year view of the Kendo UI DatePicker and DateTimePicker widgets.
type: how-to
page_title: Remove the Year View | Kendo UI DatePicker
slug: datepicker-remove-year-view
tags: kendo ui, datepicker, datetimepicker, year view
ticketid: 1115942, 1116792
res_type: kb
component: date-time-pickers
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI DatePicker</td>
 </tr>
 <tr>
  <td>Progress Kendo UI version</td>
  <td>Tested up to version 2017.2 504</td>
 </tr>
</table>
 

## Description

Can I disable the display of the year in the DatePicker? How can I enable my users to select only a day from a month while I hide from them the option to select the year?

## Solution

The Calendar, DatePicker, and DateTimePicker provide configuration options for hiding the year view.

### DatePicker

The following example demonstrates how to hide the year view in a Kendo UI DatePicker.

```dojo
<input id="datepicker" />
<script>
    var openFlag = true;

    $("#datepicker").kendoDatePicker({
        depth: "month",
        start: "year",
        animation: false,
        min: new Date(2017, 0, 1),
        max: new Date(2017, 11, 31),
        footer: "#: kendo.toString(data, 'm') #",
        format: "MM dd",
        value: new Date(),
        open: function(e) {
            var dp = e.sender;
            var calendar = dp.dateView.calendar;

            if (openFlag) {
                calendar.setOptions({
                    animation: false
                });
                openFlag = false;
                calendar.navigateUp();
            }


            if (calendar.view().name === "year") {
                calendar.element.find(".k-header").css("display", "none");
            };

            calendar.bind("navigate", function(e) {
                var cal = e.sender;
                var view = cal.view();

                if (view.name === "year") {
                    cal.element.find(".k-header").css("display", "none");
                } else {
                    var navFast = $(".k-nav-fast");

                    var dsa = cal.element.find(".k-header").css("display", "block");
                    navFast[0].innerText = navFast[0].innerText.slice(0, -5);
                }

            });
        },
        close: function(e) {
            var calendar = e.sender.dateView.calendar;

            calendar.unbind("navigate");
            calendar.element.find(".k-header").css("display", "block");
        }
    });
</script>
```

### DateTimePicker

The following example demonstrates how to hide the year view in a Kendo UI DateTimPicker in MVVM.

```dojo
<div id="example">
<input data-role="datetimepicker"
         data-bind="value: selectedDate,
                    events: { open: onOpen, close: onClose}",
         data-depth="month",
         data-start="year",
         min="2017-1-1",
         max="2017-12-31",
         data-format="MM dd HH:hh",
         data-footer="#: kendo.toString(data, 'm') #" />

<script>
    var openFlag = true;
    var viewModel = kendo.observable({
        selectedDate: new Date(),
        onOpen: function(e) {
            if (e.sender.dateView.calendar) {
                var dp = e.sender;
                var calendar = dp.dateView.calendar;

                if (openFlag) {
                    calendar.setOptions({
                        animation: false
                    });
                    openFlag = false;
                    calendar.navigateUp();
                }


                if (calendar.view().name === "year") {
                    calendar.element.find(".k-header").css("display", "none");
                };

                calendar.bind("navigate", function(e) {
                    var cal = e.sender;
                    var view = cal.view();

                    if (view.name === "year") {
                        cal.element.find(".k-header").css("display", "none");
                    } else {
                        var navFast = $(".k-nav-fast");

                        var dsa = cal.element.find(".k-header").css("display", "block");
                        navFast[0].innerText = navFast[0].innerText.slice(0, -5);
                    }

                });
            }
        },
        onClose: function(e) {
            if (e.sender.dateView.calendar) {
                var calendar = e.sender.dateView.calendar;

                calendar.unbind("navigate");
                calendar.element.find(".k-header").css("display", "block");
            }
        }
    });
    kendo.bind($("#example"), viewModel);
</script>
</div>
```

## See Also

* [DatePicker API Reference](http://docs.telerik.com/kendo-ui/api/javascript/ui/datepicker)
* [DateTimePicker API Reference](http://docs.telerik.com/kendo-ui/api/javascript/ui/datetimepicker)
* [Calendar API Reference](http://docs.telerik.com/kendo-ui/api/javascript/ui/calendar)
