---
title: DateRangePicker Buttons
page_title: jQuery DateRangePicker Documentation - DateRangePicker Buttons
description: "Check the available buttons in the Kendo UI for jQuery DateRangePicker."
slug: buttons_daterangepicker
position: 8
---

# Buttons

Starting with Kendo UI R2 R2024, the DateRangePicker exposes two buttons. Below you will find additional information about their functionality and how to enable them.

## Calendar Button

The [`calendarButton`](/api/javascript/ui/daterangepicker/configuration/calendarbutton) changes the opening behavior of the DateRangePicker. By default, the component opens when you click the input fields. When `calendarButton` is set to `true`, the DateRangePicker opens when you click the calendar icon located next to the input fields.

```dojo
    <div id="daterangepicker"></div>
    <script>
        $("#daterangepicker").kendoDateRangePicker({
            calendarButton:true
        });
    </script>
```

## Clear Button

The [`clearButton`](/api/javascript/ui/daterangepicker/configuration/clearbutton) allows you to clear the selected range. The example below shows how to enable the button.

```dojo
    <div id="daterangepicker"></div>
    <script>
        $("#daterangepicker").kendoDateRangePicker({
            clearButton:true
        });
    </script>
```


## See Also

* [Buttons Demo of the DateRangePicker](https://demos.telerik.com/kendo-ui/daterangepicker/buttons)
* [JavaScript API Reference of the DateRangePicker](/api/javascript/ui/daterangepicker)
