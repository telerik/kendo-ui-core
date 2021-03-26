---
title: DateInput Integration
page_title: jQuery DatePicker Documentation | DateInput Integration
description: "Get started with the jQuery DatePicker by Kendo UI and learn how to integrate it with the Kendo UI for jQuery DateInput."
slug: dateinputintegration_datepicker
position: 8
---

# DateInput Integration

The DatePicker provides integration options with the [Kendo UI for jQuery DateInput]({% slug overview_kendoui_dateinput_widget %}) for the input element it renders.

To use the DateInput as the input element in a DatePicker, enable the [`dateInput`](/api/javascript/ui/datepicker/configuration/dateinput) property of the DatePicker.

```dojo
    <input id="datepicker" />

    <script>
    $("#datepicker").kendoDatePicker({
        dateInput: true
    });
    </script>
```

## See Also

* [JavaScript API Reference of the DatePicker](/api/javascript/ui/datepicker)
