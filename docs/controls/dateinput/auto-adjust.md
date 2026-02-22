---
title: Automatic Correction
page_title: jQuery DateInput Documentation - Automatic Correction
description: "Get familiar with the autocorrect feature of the jQuery DateInput by Kendo UI, and learn how to disable it."
components: ["dateinput"]
slug: autocorrect_kendoui_dateinput
position: 6
---

# Automatic Correction

Starting with Kendo UI R3 2024, the DateInput component exposes an [`autoAdjust`](/api/javascript/ui/dateinput/configuration/autoadjust) feature which provides control over the autocorrect functionality. By default, when you have `min` and `max` dates configured, the component will autocorrect the user input if it is not within the specified range. The autocorrected value will be either the `min` or the `max` value you have set for the component depending on which the invalid date is closer to.

In order to disable the autocorrect, you can now set the `autoAdjust` option to `false`.

```dojo
    <input id="dateInput" />

    <script>
      $(document).ready(function(){
        $("#dateInput").kendoDateInput({
          min: new Date("01/01/2024"),
          max: new Date("12/31/2024"),
          autoAdjust: false
        });
      });
    </script>
```

## See Also

* [Using the API of the DateInput (Demo)](https://demos.telerik.com/kendo-ui/dateinput/api)
* [JavaScript API Reference of the DateInput](/api/javascript/ui/dateinput)
