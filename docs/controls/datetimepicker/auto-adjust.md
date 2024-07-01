---
title: Automatic Correction
page_title: jQuery DateTimePicker Documentation - Automatic Correction
description: Get familiar with the autocorrect feature of the jQuery DateTimePicker by Kendo UI. Learn how to automatically correct the user input when it's outside of the pre-configured range."
slug: autocorrect_kendoui_datetimepicker
position: 12
---

# Automatic Correction

Starting with Kendo UI R3 2024, the DateTimePicker component provides an [`autoAdjust`](/api/javascript/ui/datetimepicker/configuration/autoadjust) feature. When you have `min` and `max` dates configured, the component will autocorrect the user input if it is not within the specified range. The autocorrected value will be either the `min` or the `max` value you have set for the component depending on which the invalid date is closer to.

In order for the `autoAdjust` configuration to work, the [`dateInput`](/api/javascript/ui/datetimepicker/configuration/dateinput) needs to be set to `true`.


```dojo
    <input id="datetimepicker" />

    <script>
      $(document).ready(function(){
        $("#datetimepicker").kendoDateTimePicker({
          min: new Date("01/01/2024"),
          max: new Date("12/31/2024"),
          dateInput:true,
          autoAdjust: true
        });
      });
    </script>
```

## See Also

* [Using the API of the DateTimePicker (Demo)](https://demos.telerik.com/kendo-ui/datetimepicker/api)
* [JavaScript API Reference of the DatDateTimePickereInput](/api/javascript/ui/datetimepicker)
