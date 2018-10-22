---
title: Multiple Views
page_title: Multiple Views| Kendo UI MultiViewCalendar
description: "Control the visible date ranges in the Kendo UI MultiViewCalendar for Angular and manage the number of its horizontally rendered views."
slug: multiple_views_multiviewcalendar
position: 6
---

# Multiple Views

The Kendo UI MultiViewCalendar allows to define the number of views/months to be displayed at a time. In some scenarios it might be necessary to display more than two months. This is helpful especially in case of range selection among a couple of months.

###### Example

```html
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
            $("#multiViewCalendar").data().kendoMultiViewCalendar.setOptions({ numberOfVies: numberOfViews });
        }
    }
</script>
```

## See Also

Other articles on the Kendo UI MultiViewCalendar:

* [Overview of the ASP.NET MVC HtmlHelper Extension for the MultiViewCalendar Widget](/aspnet-mvc/helpers/multiviewcalendar/overview)
* [MultiViewCalendar JavaScript API Reference](/api/javascript/ui/multiviewcalendar)