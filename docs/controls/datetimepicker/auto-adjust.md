---
title: Automatic Correction
page_title: jQuery DateTimePicker Documentation - Automatic Correction
description: "Get familiar with the autocorrect feature of the jQuery DateTimePicker by Kendo UI, and learn how to disable it."
components: ["datetimepicker"]
slug: autocorrect_kendoui_datetimepicker
position: 12
---

# Automatic Correction

Starting with Kendo UI R3 2024, the DateTimePicker component provides an [`autoAdjust`](/api/javascript/ui/datetimepicker/configuration/autoadjust) feature which provides control over the autocorrect functionality. By default, when you have `min` and `max` dates configured and the [`dateInput`](/api/javascript/ui/datetimepicker/configuration/dateinput) is set to `true`, the component will autocorrect the user input if it is not within the specified range. The autocorrected value will be either the `min` or the `max` value you have set for the component depending on which the invalid date is closer to.

In order to disable the autocorrect, you can now set the `autoAdjust` option to `false`.


```dojo
    <input id="datetimepicker" />

    <script>
      $(document).ready(function(){
        $("#datetimepicker").kendoDateTimePicker({
          min: new Date("01/01/2024"),
          max: new Date("12/31/2024"),
          dateInput:true,
          autoAdjust: false
        });
      });
    </script>
```

## See Also

* [Using the API of the DateTimePicker (Demo)](https://demos.telerik.com/kendo-ui/datetimepicker/api)
* [JavaScript API Reference of the DatDateTimePickereInput](/api/javascript/ui/datetimepicker)
