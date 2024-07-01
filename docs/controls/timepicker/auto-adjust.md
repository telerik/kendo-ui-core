---
title: Automatic Correction
page_title: jQuery TimePicker Documentation - Automatic Correction
description: "Get familiar with the autocorrect feature of the jQuery TimePicker by Kendo UI. Learn how to automatically correct the user input when it's outside of the pre-configured range."
slug: autocorrect_kendoui_timepicker
position: 7
---

# Automatic Correction

Starting with Kendo UI R3 2024, the TimePicker component provides an [`autoAdjust`](/api/javascript/ui/timepicker/configuration/autoadjust) feature. When you have `min` and `max` time slots configured, the component will autocorrect the user input if it is not within the specified range. The autocorrected value will be either the `min` or the `max` value you have set for the component depending on which the invalid value is closer to.

 In order for the `autoAdjust` configuration to work, the [`dateInput`](/api/javascript/ui/timepicker/configuration/dateinput) needs to be set to `true`.


```dojo
    <input id="timepicker" />

    <script>
      $(document).ready(function(){
        $("#timepicker").kendoTimePicker({
          min: new Date(2024, 0, 1, 8, 0, 0),
          max: new Date(2024, 0, 1, 22, 0, 0),
          dateInput: true,
          autoAdjust: true
        });
      });
    </script>
```

## See Also

* [Using the API of the TimePicker (Demo)](https://demos.telerik.com/kendo-ui/timepicker/api)
* [JavaScript API Reference of the TimePicker](/api/javascript/ui/timepicker)
