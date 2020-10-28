---
title: Integration
page_title: jQuery DateInput Documentation | Integration
description: "Get started with the jQuery DateInput by Kendo UI and integrate the widget with the other Kendo UI editors."
slug: integration_kendoui_dateinput
position: 3
---

# Integration

The DateInput provides options for integrating it with other Kendo UI editor widgets such as the DatePicker, DateTimePicker, and TimePicker.

The following example demonstrates how to integrate the DateInput with the DatePicker by enabling the `dateInput` property of the DatePicker.

```dojo
    <input id="datepicker" />

    <script>
      $("#datepicker").kendoDatePicker({
        dateInput: true
      });
    </script>
```

## See Also

* [Basic Usage of the DateInput (Demo)](https://demos.telerik.com/kendo-ui/dateinput/index)
* [Using the API of the DateInput (Demo)](https://demos.telerik.com/kendo-ui/dateinput/api)
* [JavaScript API Reference of the DateInput](/api/javascript/ui/dateinput)
