---
title: Generate Exception for Recurring Event Using External DatePicker
description: An example of how to manually add exception date for recurring event in the Kendo Scheduler using the Kendo DatePicker.
type: how-to
page_title: Manually Add Exception to recurring Event | Kendo UI Scheduler
slug: scheduler-manually-add-exceptio-to-recurring
tags: kendo, kendoui, scheduler, recurring-events, exception, add-exception
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

How to manually add exception date for recurring event in the Kendo Scheduler using the Kendo DatePicker?

## Solution

```dojo
  Pick a date to be added to the exception:
  <input id="datepicker" />
  <button type="button" class="k-button" id="btn">Click to add the selected date as exception</button>
  <div id="scheduler"></div>

  <script>
    $("#scheduler").kendoScheduler({
      views: ['week'],
      showWorkHours: true,
      dataSource: [{
        id: 1,
        start: new Date("2017/7/16 12:00"),
        end: new Date("2017/7/16 12:30"),
        title: "Lunch",
        recurrenceRule: "FREQ=DAILY"
      }]
    });
    
    $("#datepicker").kendoDatePicker();
    
    $('#btn').on('click', function() {
      var picker = $("#datepicker").getKendoDatePicker();
      var pickerDate = picker.value();
      
      if (!pickerDate) {
      	return;
      }
      
      pickerDate.setHours(12,0,0,0);
      var pickerString = pickerDate.toISOString();
      
    	var schedulerDataSource = $("#scheduler").getKendoScheduler().dataSource;
      var dataItem = schedulerDataSource.at(0);
      
      if (!dataItem.recurrenceException) {
      	dataItem.recurrenceException = '';
      } else {
      	dataItem.recurrenceException += ',';
      }
      
      dataItem.recurrenceException = dataItem.recurrenceException + pickerString;

      schedulerDataSource.sync();
    });
  </script>
```

## See Also

* [Kendo Scheduler API Reference](http://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler)
* [Kendo DatePicker API Reference](http://docs.telerik.com/kendo-ui/api/javascript/ui/datepicker)
