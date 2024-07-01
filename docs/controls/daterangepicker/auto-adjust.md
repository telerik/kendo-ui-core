---
title: Automatic Correction
page_title: jQuery DateRangePicker Documentation - Automatic Correction
description: "Get familiar with the autocorrect feature of the jQuery DateRangePicker by Kendo UI. Learn how to automatically correct the user input when it's outside of the pre-configured range."
slug: autocorrect_kendoui_daterangepicker
position: 9
---

# Automatic Correction

Starting with Kendo UI R3 2024, the DateRangePicker component provides an [`autoAdjust`](/api/javascript/ui/daterangepicker/configuration/autoadjust) feature. When you have `min` and `max` dates configured, the component will autocorrect the user input if it is not within the specified range. If the component has a valid value before the autocorrect occurs, the autocorrected value will be the previous valid date of the DateRangePicker. If the component doesn't have a value when you enter an invalid date, the placeholder will be displayed.

```dojo
    <div id="daterangepicker" title="daterangepicker"></div>

    <script>
      $(document).ready(function(){
        $("#daterangepicker").kendoDateRangePicker({
          min: new Date("01/01/2024"),
          max: new Date("12/31/2024"),
          autoAdjust: true
        });
      });
    </script>
```

## See Also

* [Using the API of the DateRangePicker (Demo)](https://demos.telerik.com/kendo-ui/daterangepicker/api)
* [JavaScript API Reference of the DateRangePicker](/api/javascript/ui/daterangepicker)
