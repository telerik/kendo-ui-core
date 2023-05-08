---
title: Overview
page_title: jQuery CircularProgressBar Documentation - CircularProgressBar Overview
description: "Get started with the jQuery CircularProgressBar by Kendo UI and learn how to create, initialize, and enable the widget."
slug: overview_kendoui_circularprogressbar_widget
position: 1
---

# {{ site.product }} CirularProgressbar Overview

The CircularProgressBar delivers functionality for displaying and tracking the progress of a task.

* [Demo page for the CircularProgressBar](https://demos.telerik.com/kendo-ui/circularprogressbar/index)

## Basic Configuration

1. Add a `<div>` element to the page:

    ```html
    <div id="circularprogressbar"></div>
    ```

2. Initialize the CircularProgressBar widget:

    ```html
    <div id="circularprogressbar"></div>

    <script>
        $("#circularprogressbar").kendoCircularProgressBar();
    </script>
    ```

3. Configure additional options such as [`value`](/api/javascript/ui/circularprogressbar/configuration/value), [`colors`](/api/javascript/ui/circularprogressbar/configuration/colors), and [`centerTemplate`](/api/javascript/ui/circularprogressbar/configuration/centertemplate).

    ```html
    <div id="circularprogressbar"></div>

    <script>
        $("#circularprogressbar").kendoCircularProgressBar({
            value: 50, // Sets the default value of the progressbar.
            // Configures an array of colors that will be used at certain stages of the progress.
            colors: [{
                to: 25,
                color: '#C0392B'
            }, {
                from: 25,
                to: 50,
                color: '#D35400'
            }, {
                from: 50,
                to: 75,
                color: '#D4AC0D'
            }, {
                from: 75,
                to: 99,
                color: '#58D68D'
            }, {
                from: 99,
                color: '#229954'
            }],
            // Configures the appearance of the text in the middle of the progressbar.
            centerTemplate: '<span style="color: #: color #;">#= value == 100 ? "<span class=\'k-icon k-i-check\'></span>" : value + "%" #</span>'
        });
    </script>
    ```

The following example demonstrates the full implementation of the approach.

```dojo
<div id="circularprogressbar"></div>

<script>
    $("#circularprogressbar").kendoCircularProgressBar({
        value: 50, // Change the value to see the difference between the colors.
        colors: [{
            to: 25,
            color: '#C0392B'
        }, {
            from: 25,
            to: 50,
            color: '#D35400'
        }, {
            from: 50,
            to: 75,
            color: '#D4AC0D'
        }, {
            from: 75,
            to: 99,
            color: '#58D68D'
        }, {
            from: 99,
            color: '#229954'
        }],
        centerTemplate: '<span style="color: #: color #;">#= value == 100 ? "<span class=\'k-icon k-i-check\'></span>" : value + "%" #</span>'
    });
</script>
```

## Modes

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

## Colors

The CircularProgressBar allows you to specify an array of colors that will indicate specific ranges of the progress. For example, the CircularProgressBar will be red in the 0%-25% range; orange in the 25%-50% range; yellow in the 50%-75% range; green in the 75%-100% range.

To configure the colors, use the [`colors`](/api/javascript/ui/circularprogressbar/configuration/colors) option.

The following example showcases a CircularProgressBar that changes its colors based on the current value:

```dojo
<div id="circularprogressbar"></div>

<script>
    $("#circularprogressbar").kendoCircularProgressBar({
        value: 0,
        colors: [{
            to: 25,
            color: '#C0392B'
        }, {
            from: 25,
            to: 50,
            color: '#D35400'
        }, {
            from: 50,
            to: 75,
            color: '#D4AC0D'
        }, {
            from: 75,
            to: 99,
            color: '#58D68D'
        }, {
            from: 99,
            color: '#229954'
        }],
        centerTemplate: '<span style="color: #: color #;">#= value == 100 ? "<span class=\'k-icon k-i-check\'></span>" : value + "%" #</span>'
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

## Template

The CircularProgressBar enables you to render a custom message or element inside the center of the widget. To achieve this functionality, use the [`centerTemplate`](/api/javascript/ui/circularprogressbar/configuration/centertemplate) option.

The following example showcases how to render custom text that is the same color as the CircularProgressBar:

```dojo
<div id="circularprogressbar"></div>

<script>
    $("#circularprogressbar").kendoCircularProgressBar({
        value: 0,
        color: "red",
        centerTemplate: '<span style="color: #: color #;">#= value # percent</span>'
    });
</script>
```

## Referencing Existing Instances

Make a reference to an existing CirularProgressbar instance through [`jQuery.data()`](https://api.jquery.com/jQuery.data/) and use the [CircularProgressBar API](/api/javascript/ui/circularprogressbar) to control its behavior.

The following example demonstrates how to access an existing CircularProgressBar instance.

	var circularprogressbar = $("#circularprogressbar").data("kendoCircularProgressBar");

## See Also

* [Basic Usage of the CircularProgressBar (Demo)](https://demos.telerik.com/kendo-ui/circularprogressbar/index)
* [Using the API of the CircularProgressBar (Demo)](https://demos.telerik.com/kendo-ui/circularprogressbar/api)
* [JavaScript API Reference of the CircularProgressBar](/api/javascript/ui/circularprogressbar)