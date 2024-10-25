---
title: DateInput Integration
page_title: jQuery DatePicker Documentation - DateInput Integration
description: "Get started with the jQuery DatePicker by Kendo UI and learn how to integrate it with the Kendo UI for jQuery DateInput."
slug: dateinputintegration_datepicker
position: 11
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

To customize the placeholders of the DateInput set the [`messages.dateInput`](api/javascript/ui/datepicker/configuration/messages.dateinput) configuration.

## AutoFill functionality

With the DateInput integration enabled, you the AutoFill functionality can also be enabled via the [`autoFill`](api/javascript/ui/datepicker/configuration/autofill) configuration option.

```dojo
    <input id="datepicker" />

    <script>
    $("#datepicker").kendoDatePicker({
        dateInput: true,
        autoFill: true
    });
    </script>
```

When the AutoFill functionality is enabled you can complete any of the date segments in the DatePicker's DateInput and when the component looses focus the rest of the date will automatically be filled with the corresponding segment of the current date. For example, if the current date is 06 Jul 2023 and the user fills only the day portion as 15 and clicks on another input element the date will be autofilled to 15 Jul 2023.

## See Also

* [JavaScript API Reference of the DatePicker](/api/javascript/ui/datepicker)
