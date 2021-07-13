---
title: Keyboard Navigation
page_title: jQuery MultiViewCalendar Documentation | Keyboard Navigation
description: "Get started with the jQuery MultiViewCalendar by Kendo UI and learn about the accessibility support it provides through its keyboard navigation functionality."
previous_url: /controls/scheduling/multiviewcalendar/keyboard-navigation
slug: keyboard_navigation_multiviewcalendar
position: 2
---

# Keyboard Navigation

The keyboard navigation of the MultiViewCalendar is always available.

The MultiViewCalendar supports the following keyboard shortcuts:

| Shortcut            | Description                                  |
|:---                 |:---                                          |
| `Up Arrow`          | Highlights the same day from the previous week.  |
| `Down Arrow`        | Highlights the same day from the next week.      |
| `Left Arrow`        | Highlights the previous day.                     |
| `Right Arrow`       | Highlights the next day.                         |
| `Enter`             | Selects the focused date.                    |
| `Home`              | Focuses the first date in the month.         |
| `End`               | Focuses the last date in the month.          |
| `Ctrl`+`Up Arrow`   | Navigates to the previous view.                  |
| `Ctrl`+`Down Arrow` | Navigates to the next view.                      |
| `Ctrl`+`Down Left`  | Navigates to the previous month.                 |
| `Ctrl`+`Down Right` | Navigates to the next month.                     |


```dojo
    <div id="multiViewCalendar"></div>
    <script>
        $("#multiViewCalendar").kendoMultiViewCalendar({
            selectable: "multiple"
        });
    </script>
```

## See Also

* [Keyboard Navigation by the MultiViewCalendar (Demo)](https://demos.telerik.com/kendo-ui/multiviewcalendar/keyboard-navigation)
* [Keyboard Support in Kendo UI for jQuery]({% slug keyboard_shortcuts_accessibility_support %})
* [Accessibility in the MultiViewCalendar]({% slug accessibility_muliviewcalendar %})
