---
title: Selection
page_title: Selection | Kendo UI MultiViewCalendar
description: "Learn how to select dates in the Kendo UI MultiViewCalendar widget."
slug: selection_multiviewcalendar
position: 5
---

# Selection

The Kendo UI MultiViewCalendar allows the user to select multiple dates or a range of dates by using the MultiViewCalendar selection modes.

## Multiple Selection

The following example demonstrates how to implement the multiple-view selection mode in the MultiViewCalendar.

###### Example

```dojo
    <div id="multiViewCalendar"></div>
    <script>
        $("#multiViewCalendar").kendoMultiViewCalendar({
            selectable: "multiple"
        });
    </script>
```

## Range Selection

The following example demonstrates how to implement the range selection mode in the MultiViewCalendar.

###### Example

```dojo
    <div id="multiViewCalendar"></div>
    <script>
        $("#multiViewCalendar").kendoMultiViewCalendar({
            selectable: "range"
        });
    </script>
```

## See Also

* [Overview of the ASP.NET MVC HtmlHelper Extension for the MultiViewCalendar Widget](/aspnet-mvc/helpers/multiviewcalendar/overview)
* [MultiViewCalendar JavaScript API Reference](/api/javascript/ui/multiviewcalendar)
