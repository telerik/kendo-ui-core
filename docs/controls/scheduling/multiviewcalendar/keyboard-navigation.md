---
title: Keyboard Navigation
page_title: Keyboard Navigation| Kendo UI MultiViewCalendar
description: "Use the Kendo UI MultiViewCalendar keyboard navigation."
slug: keyboard_navigation_multiviewcalendar
position: 7
---

# Keyboard Navigation

The keyboard navigation of the MultiViewCalendar is always available.

The MultiViewCalendar supports the following keyboard shortcuts:

| Shortcut            | Description                                  |
|:---                 |:---                                          |
| `Up Arrow`          | Highlights same day from the previous week.  |
| `Down Arrow`        | Highlights same day from the next week.      |
| `Left Arrow`        | Highlights previous day.                     |
| `Right Arrow`       | Highlights next day.                         |
| `Enter`             | Selects the focused date.                    |
| `Home`              | Focuses the first date in the month.         |
| `End`               | Focuses the last date in the month.          |
| `Ctrl`+`Up Arrow`   | Navigates to previous view.                  |
| `Ctrl`+`Down Arrow` | Navigates to next view.                      |
| `Ctrl`+`Down Left`  | navigates to previous month.                 |
| `Ctrl`+`Down Right` | navigates to next month.                     |


###### Example

```html
    <div id="multiViewCalendar"></div>
    <script>
        $("#multiViewCalendar").kendoMultiViewCalendar({
            selectable: "multiple"
        });
    </script>
```

## See Also

Other articles on the Kendo UI MultiViewCalendar:

* [Overview of the ASP.NET MVC HtmlHelper Extension for the MultiViewCalendar Widget](/aspnet-mvc/helpers/multiviewcalendar/overview)
* [MultiViewCalendar JavaScript API Reference](/api/javascript/ui/multiviewcalendar)