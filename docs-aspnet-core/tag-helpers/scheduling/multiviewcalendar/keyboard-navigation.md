---
title: Keyboard Navigation
page_title: Keyboard Navigation | Telerik UI for ASP.NET Core Tag Helpers
description: "Use the Kendo UI MultiViewCalendar keyboard navigation."
slug: keyboard_navigation_multiviewcalendar_taghelper_aspnetcore
position: 8
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

```tab-tagHelper

    <kendo-multiviewcalendar name="multiviewcalendar" selectable="multiple">        
    </kendo-multiviewcalendar>

```
```tab-Razor

        @(Html.Kendo().MultiViewCalendar()
            .Name("MultiViewCalendar")
            .Selectable("multiple")
        )
```

## See Also

Other articles on the Kendo UI MultiViewCalendar:

* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
