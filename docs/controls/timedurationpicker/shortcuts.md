---
title: Shortcuts
page_title: jQuery TimeDurationPicker Documentation - TimeDurationPicker Shortcuts
description: "Learn how to configure the columns of the TimeDurationPicker component."
slug: shortcuts_timedurationpicker
position: 4
---

# TimeDurationPicker Shortcuts

The [`shortcuts`](/api/javascript/ui/timedurationpicker/configuration/shortcuts) configuration of the Kendo UI for jQuery TimeDurationPicker enables you to render custom button elements in the popup. 

These buttons can hold timeframe values. Upon clicking any of them, the value of the TimeDurationPicker will be updated with the value of the corresponding button. You have to specify the value of the `shortcuts` in milliseconds.

The following example showcases how to define a shortcut:

```dojo
    <input id="timedurationpicker" />
    <script>
    $("#timedurationpicker").kendoTimeDurationPicker({
        columns: [ "hours", "minutes" ],
        shortcuts: [
            { text: "1h 30min", value: 5400000 } // Specify the value displayed on the button in the "text" field and the value(in milliseconds) that will be applied to the TimeDurationPicker in the "value" field.
        ]
    });
    </script>
```

## See Also

* [Shortcuts in the TimeDurationPicker (Demo)](https://demos.telerik.com/kendo-ui/timedurationpicker/shortcuts)
* [JavaScript API Reference of the TimeDurationPicker](/api/javascript/ui/timedurationpicker)