---
title: Automatic Correction
page_title: jQuery DateRangePicker Documentation - Automatic Correction
description: "Get familiar with the autocorrect feature of the jQuery DateRangePicker by Kendo UI, and learn how to disable it."
components: ["daterangepicker"]
slug: autocorrect_kendoui_daterangepicker
position: 9
---

# Automatic Correction

Starting with Kendo UI R3 2024, the DateRangePicker component provides an [`autoAdjust`](/api/javascript/ui/daterangepicker/configuration/autoadjust) feature which provides control over the autocorrect functionality. By default, when you have `min` and `max` dates configured, the component will autocorrect the user input if it is not within the specified range. If the component has a valid value before the autocorrect occurs, the autocorrected value will be the previous valid date of the DateRangePicker. If the component doesn't have a value when you enter an invalid date, the placeholder will be displayed.

In order to disable the autocorrect, you can now set the `autoAdjust` option to `false`.

```dojo
    <div id="daterangepicker" title="daterangepicker"></div>

    <script>
      $(document).ready(function(){
        $("#daterangepicker").kendoDateRangePicker({
          min: new Date("01/01/2024"),
          max: new Date("12/31/2024"),
          autoAdjust: false
        });
      });
    </script>
```

## See Also

* [Using the API of the DateRangePicker (Demo)](https://demos.telerik.com/kendo-ui/daterangepicker/api)
* [JavaScript API Reference of the DateRangePicker](/api/javascript/ui/daterangepicker)
