---
title: How To Hide Year Selection from DatePicker
description: How to disable the the year view of the Kendo DatePicker DateTimePicker.
type: how-to
page_title: DatePicker Remove Year View
slug: datepicker-remove-year-view 
position: 0
tags: kendo ui, datepicker, datetimepicker, year view
teampulseid:
ticketid: 1115942, 1116792
pitsid:
---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Date/Time Pickers for Progress® Kendo UI®</td>
 </tr>
 <tr>
  <td>Progress® Kendo UI® version</td>
  <td>Tested up to version 2017.2 504</td>
 </tr>
</table>

 
## Description

I would like the user to be able to use the datepicker but without the displaying of the year. Is there a way to select just a day from a month and hide the year selection option, and the year from the selected text in the control?

## Possible Solution

Use Date/Time Pickers and Calendar events and configurations to achieve this behavior.

#### DatePicker Example

```html
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

#### DateTimePicker MVVM Example

```html
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