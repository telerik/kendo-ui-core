---
title: Overview
page_title: Calendar Overview
description: "Learn the basics when working with the Telerik UI Calendar TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /helpers/tag-helpers/calendar
slug: taghelpers_calendar_aspnetcore
position: 1
---

# Calendar TagHelper Overview

The Telerik UI Calendar TagHelper for ASP.NET Core is a server-side wrapper for the Kendo UI Calendar widget.

The Calendar renders a graphical calendar that provides navigation and selection functionalities. To define the first rendered view, use the `start` option. To control the navigation depth, set the `depth` option. The Calendar provides the `month`, `year`, `decade`, and `century` predefined views.

* [Demo page for the Calendar](https://demos.telerik.com/aspnet-core/calendar/tag-helper)

## Initializing the Calendar

The following example demonstrates how to define the Calendar by using the Calendar TagHelper.

```tagHelper

    <kendo-calendar name="calendar" >
    </kendo-calendar>
```
```cshtml

    @(Html.Kendo().Calendar()
        .Name("calendar"))
```

## Functionality and Features

* [Date ranges]({% slug dateranges_calendar_aspnetcore %})
* [Day template]({% slug daytemplate_calendar_aspnetcore %})
* [Week numbers]({% slug weeknumbers_calendar_aspnetcore %})
* [Selection]({% slug selection_calendar_aspnetcore %})
* [Disabled dates]({% slug disableddates_calendar_aspnetcore %})
* [Keyboard navigation]({% slug keynav_calendar_aspnetcore %})

## See Also

* [Basic Usage of the Calendar TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/calendar/tag-helper)
* [Server-Side API](/api/calendar)
