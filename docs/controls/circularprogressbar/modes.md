---
title: Modes
page_title: jQuery CircularProgressBar Modes Documentation - CircularProgressBar Modes
description: "Learn about the modes of the Kendo UI for jQuery CircularProgressBar component."
slug: modes_kendoui_circularprogressbar_widget
position: 4
---

# Modes

The CircularProgressBar comes in the `infinite` and `finite` modes:

* The `infinite` mode renders a CircularProgressBar that is always spinning and with no clear indication of when the task will be completed. To enable the `infinite` mode, set the [`indeterminate`](/api/javascript/ui/circularprogressbar/configuration/indeterminate) configuration to `true`:

```javascript
    $("#circularprogressbar").kendoCircularProgressBar({
        indeterminate: true
    });
```

* The `finite` mode is the default mode of the CircularProgressBar and shows a clear indication of when a task will be completed. To update the value of the CircularProgressBar, use the [`value`](/api/javascript/ui/circularprogressbar/methods/value) method. The following example showcases how to update the value every 50 milliseconds:

```dojo
<div id="circularprogressbar"></div>

<script>
    $("#circularprogressbar").kendoCircularProgressBar({
        value: 0,
        centerTemplate: '<span style="color: #: color #;">#= value #%</span>'
    });

    // Update the value every 50 milliseconds until it reaches 100%.
    let interval = setInterval(function () {
        let pb = $("#circularprogressbar").data("kendoCircularProgressBar");
        let value = pb.value();
        if (value >= 100) {
            clearInterval(interval);
            return;
        }
        pb.value(value + 1);
    }, 50);
</script>
```

## See Also

* [Colors in the CircularProgressBar (Demo)](https://demos.telerik.com/kendo-ui/circularprogressbar/colors) 
* [JavaScript API Reference of the CircularProgressBar](/api/javascript/ui/circularprogressbar)