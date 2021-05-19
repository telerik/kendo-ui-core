---
title: Multiple Views
page_title: jQuery MultiViewCalendar Documentation | Disabled Dates
description: "Get started with the jQuery MultiViewCalendar by Kendo UI and control and manage the number of the visible date ranges in horizontally rendered views."
slug: multiple_views_multiviewcalendar
position: 3
---

# Multiple Views

The MultiViewCalendar allows you to define the number of views and months that are displayed at a time.

To display two or more months and especially in case of range selection among a couple of months, use the following approach.

```dojo
    <input id="numberOfViews" />
    <button id="numberOfViewsBtn">Apply Changes</button>
    <div id="multiViewCalendar"></div>
<script>
    $(document).ready(function () {
        $("#numberOfViews").kendoNumericTextBox({
            restrictDecimals: true,
            decimals: 0,
            min: 2,
            max: 10,
            value: 2,
            format: "{0:n0}"
        });

        $("#numberOfViewsBtn").kendoButton({
            click: click
        });

        $("#multiViewCalendar").kendoMultiViewCalendar();
    });

    function click() {
        var numberOfViews = $("#numberOfViews").data().kendoNumericTextBox.value();
        if (numberOfViews > 0) {
            $("#multiViewCalendar").data().kendoMultiViewCalendar.setOptions({ views: numberOfViews });
        }
    }
</script>
```

## See Also

* [Using Multiple Views in the MultiViewCalendar (Demo)](https://demos.telerik.com/kendo-ui/multiviewcalendar/multiple-views)
* [JavaScript API Reference of the MultiViewCalendar](/api/javascript/ui/multiviewcalendar)
