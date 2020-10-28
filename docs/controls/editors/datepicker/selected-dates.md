---
title: Selected Dates
page_title: jQuery DatePicker Documentation | Selected Dates
description: "Get started with the jQuery DatePicker by Kendo UI and learn how to set selected dates and date ranges in the widget."
slug: selecteddates_datepicker
position: 3
---

# Selected Dates

The DatePicker allows you to render a pre-selected date and also define the minimum and maximum dates it displays.

To define date ranges in the DatePicker, use the [Kendo UI for jQuery DateRangePicker widget]({% slug overview_kendoui_daterangepicker_widget %}). For a complete example, refer to the [demo on setting range selection in the DatePicker by using the DateRangePicker](https://demos.telerik.com/kendo-ui/datepicker/rangeselection).

The following example demonstrates how to render a DatePicker with an initially selected date and defined min and max dates. The DatePicker sets the value only if the entered date is within the defined range and is valid.

```dojo
    <div>Dates outside the range 1/Jan/2019 and today cannot be set</div>
    <input id="datePicker" />

    <script>
        $(document).ready(function(){
            $("#datePicker").kendoDatePicker({
                value: new Date(),
                min: new Date(2019, 0, 1),
                max: new Date()
            })
        });
    </script>
```

## See Also

* [Range Selection in the DatePicker (Demo)](https://demos.telerik.com/kendo-ui/datepicker/rangeselection)
* [JavaScript API Reference of the DatePicker](/api/javascript/ui/datepicker)
