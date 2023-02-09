---
title: Format Dates in DateTimePickers in Scheduler Edit Popup
page_title: Format Date in DateTimePickers in Scheduler Edit Popup
description: "Learn how to set a custom format in the Kendo UI for jQuery Scheduler edit popup DateTimePickers."
slug: scheduler-format-datetimepickers
tags: telerik, kendo, jquery, scheduler, format, date, datetimepicker
component: scheduler, dattimepicker
ticketid: 1559389
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Scheduler for jQuery</td>
  <td>Progress® Kendo UI® DateTimePicker for jQuery</td>
 </tr> 
</table>

## Description

How can I set a custom format to the DateTimePickers displayed in Scheduler edit popup?

## Solution

In order to change the date format in the edit popup you can:

1. Handle the [`edit`](/api/javascript/ui/scheduler/events/edit) event of the widget.
1. In the edit event handler get a reference to the start and end DateTimePickers.
1. Use the [`setOptions`](/api/javascript/ui/datetimepicker/methods/setoptions) method to set a new [`format`](/api/javascript/ui/datetimepicker/configuration/format).
1. Change the format set in `'data-format'` attribute in order for the validation to know the correct format.

```dojo
    <div id="scheduler"></div>
    <script>
      $(document).ready( function () {
         // custom validation rule    
        $.extend(true, kendo.ui.validator, {
          rules: {  
            dateValidation: function (input) { console.log('validate date')
              if (input.is("[name=start]") && input.val()) {
                // return true or false depending on the validity of the two dates
                return true 
              }
              return true;
            }
          },
          messages:{
            dateValidation:"Date validation message!"
          }
        });
      });

      $("#scheduler").kendoScheduler({
        date: new Date("2013/6/6"),
        views: [ "day", "month" ],
        dataSource: [
          {
            id: 1,
            start: new Date("2013/6/6 08:00 AM"),
            end: new Date("2013/6/6 09:00 AM"),
            title: "Interview"
          }
        ],
        edit: function(e) {
          var container = e.container
          var startInput = $(e.container).find('.k-datetimepicker [name="start"]')
          var startDateTimePicker = $(startInput).data('kendoDateTimePicker')
          startDateTimePicker.setOptions({
            format: "dd MMM yyyy hh:mm tt"
          })    

          var endInput = $(e.container).find('.k-datetimepicker [name="end"]')
          var endDateTimePicker = $(endInput).data('kendoDateTimePicker')
          endDateTimePicker.setOptions({
            format: "dd MMM yyyy hh:mm tt"
          })    

          $(container).find("[data-role=datetimepicker]").each(function() {    
            // this will be required for the validation to know the correct format
            $(this).attr("data-format",  "dd MMM yyyy hh:mm tt") 
          });
        }
      });
    </script>

```

## See Also

* [Basic Usage of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/index)
* [Using the API of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/api)
* [JavaScript API Reference of the Scheduler](/api/javascript/ui/scheduler)
