---
title: Start and End Time
page_title: jQuery DateTimePicker Documentation - Start and End Time
description: "Learn how to set the Start and End Time for the Kendo UI for jQuery DateTimePicker component."
components: ["datetimepicker"]
slug: start_end_time_kendoui_datetimepicker_widget
position: 11
---

# Start and End Time

The DateTimePicker enables you to set the start and end time of the built-in TimePicker.

To define the desired earliest and latest available time in the built-in TimePicker, use the `startTime` and `endTime` options.

>Only the time part of the provided Date object is taken into account.

```dojo
    <input id="datetimepicker" />
    
    <script>
        $("#datetimepicker").kendoDateTimePicker({
            startTime: new Date(2023,1,3,8,30,0),
            endTime: new Date(2023,1,3,17,00,0)
        });
    </script>
```

## See Also

* [JavaScript API Reference of the DateTimePicker](/api/javascript/ui/datetimepicker)
* [Demo Page for the jQuery DateTimePicker](https://demos.telerik.com/kendo-ui/datetimepicker/index)
