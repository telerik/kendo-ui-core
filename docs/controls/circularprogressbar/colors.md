---
title: Colors
page_title: jQuery CircularProgressBar Colors Documentation - CircularProgressBar Colors
description: "Learn how to set different colors based on the value of the Kendo UI for jQuery CircularProgressBar component."
components: ["circularprogressbar"]
slug: colors_kendoui_circularprogressbar_widget
position: 3
---

# Colors

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

## See Also

* [Colors in the CircularProgressBar (Demo)](https://demos.telerik.com/kendo-ui/circularprogressbar/colors) 
* [JavaScript API Reference of the CircularProgressBar](/api/javascript/ui/circularprogressbar)