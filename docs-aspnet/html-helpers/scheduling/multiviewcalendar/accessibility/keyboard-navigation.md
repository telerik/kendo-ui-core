---
title: Keyboard Navigation
page_title: Keyboard Navigation
description: "Use the Telerik UI MultiViewCalendar keyboard navigation."
previous_url: /helpers/scheduling/multiviewcalendar/accessibility/keyboard-navigation
slug: keyboard_navigation_multiviewcalendar_htmlhelper_aspnetcore
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

```Razor

        @(Html.Kendo().MultiViewCalendar()
            .Name("MultiViewCalendar")
            .Selectable("multiple")
        )
```

## See Also

* [Keyboard Navigation in the MultiViewCalendar HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/multiviewcalendar/keyboard-navigation)
* [Server-Side API](/api/multiviewcalendar)
