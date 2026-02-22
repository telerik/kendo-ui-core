---
title: Dynamically Setting Min Date and Time for Kendo UI DateTimePicker
description: Learn how to dynamically set the minimum date and time for a Kendo UI DateTimePicker based on another DateTimePicker's selection.
type: how-to
page_title: How to Set Min Date and Time Based on Another DateTimePicker's Selection in Kendo UI
slug: dynamically-set-min-date-time-kendo-datetimepicker
tags: kendo-ui, datetimepicker, min-date, setoptions, javascript
res_type: kb
components: ["datetimepicker", "timepicker"]
ticketid: 1674797
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® DateTimePicker for jQuery</td>
 </tr>
</table>

## Description

When using two [Kendo UI for jQuery DateTimePicker](https://docs.telerik.com/kendo-ui/api/javascript/ui/datetimepicker) components for start and end date selections, it's necessary to update the minimum selectable date and time of the end date picker based on the selection in the start date picker. This ensures that the end date cannot precede the start date. 

This knowledge base article also answers the following questions:
- How to dynamically change the minimum date of a DateTimePicker based on another DateTimePicker's value?
- How to use the setOptions method to update DateTimePicker settings?
- How to synchronize two DateTimePicker controls to ensure logical date and time selection?

## Solution

To dynamically set the minimum date and time for the end date DateTimePicker based on the start date DateTimePicker's selection, use the `change` event of the start date DateTimePicker. Within this event, retrieve the selected date and time, and then use the `setOptions` method to update the minimum date (`min`) and start time (`startTime`) of the end date DateTimePicker.

Here's an example of how to implement this:

```javascript
// Assuming shiftStart and shiftEnd are your DateTimePicker instances
shiftStart.kendoDateTimePicker({
    timeFormat: "HH:mm",
    format: "dd MMM yyyy HH:mm",
    min: new Date(vYear, vMonth - 1, vDay, vHour, vMin),
    interval: 15,
    change: function() {
        var startDT = this.value();
        var year = startDT.getFullYear();
        var month = startDT.getMonth();
        var day = startDT.getDate();
        var vHour = startDT.getHours();
        var vMin = startDT.getMinutes();
        shiftEnd.data("kendoDateTimePicker").setOptions({
            min: new Date(year, month, day, vHour, vMin),
            startTime: new Date(year, month, day, vHour, vMin)
        });
    }
});

shiftEnd.kendoDateTimePicker({
    timeFormat: "HH:mm",
    format: "dd MMM yyyy HH:mm",
    min: new Date(vYear, vMonth - 1, vDay, vHour, vMin),
    interval: 15
});
```

This code snippet demonstrates how to configure the `shiftStart` DateTimePicker to update the `shiftEnd` DateTimePicker's `min` and `startTime` options upon a change. 

## See Also

- [Kendo UI DateTimePicker Documentation](https://docs.telerik.com/kendo-ui/api/javascript/ui/datetimepicker)
- [Kendo UI DateTimePicker setOptions Method](https://docs.telerik.com/kendo-ui/api/javascript/ui/datetimepicker/methods/setoptions)
- [Example of Synchronizing Two DateTimePickers](https://dojo.telerik.com/dXCVgCOv)
