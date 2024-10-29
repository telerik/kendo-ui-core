---
title: Interval
page_title: jQuery TimePicker Documentation - Interval
description: "Get familiar with the jQuery TimePicker by Kendo UI component and how to set its interval feature."
slug: interval_kendoui_timepicker
position: 9
---

# Interval

The Kendo UI for jQuery TimePicker allows you to specify the time interval between values in the popup list.

Depending on the [Component Type](% slug componenttypes_timepicker %), you can set the interval in two distinct ways.

## Setting the Interval in Classic Render Mode

When the [`componentType`](/api/javascript/ui/timepicker/configuration/componenttype) configuration is set to `classic`, the interval is specified in minutes (numeric values).

```dojo
    <input id="timepicker" />

    <script>
    $("#timepicker").kendoTimePicker({
        interval: 15
    });
    </script>
```

> When the `componentType` is set to `classic`, the interval does not accept an object of hours, minutes, and seconds.

## Setting the Interval in Modern Render Mode

When the [`componentType`](/api/javascript/ui/timepicker/configuration/componenttype) configuration is set to `modern`, the interval is specified as an object of hours, minutes, and seconds.

```dojo
    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker({
        componentType: "modern",
        interval: {
            hour: 2,
            minute: 10,
            second: 15
        }
    });
    </script>
```

> When the `componentType` is set to `modern`, the interval does not accept a single numerical value.

## See Also

* [JavaScript API Reference of the TimePicker](/api/javascript/ui/timepicker)