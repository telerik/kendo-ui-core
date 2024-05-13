---
title: DateRangePicker Buttons
page_title: jQuery DateRangePicker Documentation - DateRangePicker Buttons
description: "Check the available buttons in the Kendo for jQuery DateRangePicker."
slug: buttons_daterangepicker
position: 8
---

# Buttons

As of R2 2024 version of the Kendo UI suite, the DateRangePicker exposes two buttons. Below you will find additional information about their functionality and how to enable them.

## Calendar Button

The [`calendarButton`](/api/javascript/ui/daterangepicker/configuration/calendarbutton) changes the opening behaviour of the DateRangePicker. By default, the component is opened when you click on the input fields. When the feature is set to `true`, the DateRangePicker will open when you click the calendar icon which is rendered next to the input fields.

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
