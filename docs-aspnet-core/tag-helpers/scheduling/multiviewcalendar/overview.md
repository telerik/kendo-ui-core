---
title: Overview
page_title: MultiViewCalendar | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Kendo UI MultiViewCalendar tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: overview_multiviewcalendar_taghelper_aspnetcore
position: 1
---

# MultiViewCalendar Tag Helper Overview

The MultiViewCalendar Tag Helper extension is a server-side wrapper for the [Kendo UI MultiViewCalendar](https://demos.telerik.com/kendo-ui/multiviewcalendar/index) widget.

## Configuration

Below are listed the steps for you to follow when configuring the Kendo UI MultiViewCalendar.

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET Core](https://docs.telerik.com/aspnet-core/introduction).

1. Create a new action method which renders the view.

###### Example

            public ActionResult Index()
            {
                return View();
            }

1. Add a MultiViewCalendar.

###### Example

```tagHelper

    <kendo-multiviewcalendar name="multiviewcalendar"
                             min="new DateTime(2010, 1, 1, 10, 0, 0)"
                             max="new DateTime(2010, 1, 1, 20, 0, 0)"
                             value="DateTime.Now">
    </kendo-multiviewcalendar>

```
```Razor

        @(Html.Kendo().MultiViewCalendar()
            .Name("MultiViewCalendar") //The name of the MultiViewCalendar is mandatory. It specifies the "id" attribute of the widget.
            .Min(new DateTime(2010, 1, 1, 10, 0, 0)) //Set the min time of the MultiViewCalendar.
            .Max(new DateTime(2010, 1, 1, 20, 0, 0)) //Set the min date of the MultiViewCalendar.
            .Value(DateTime.Now) //Set the value of the MultiViewCalendar.
        )
```

## Functionality and Features

* [Active view]({% slug active_view_multiviewcalendar_taghelper_aspnetcore %})
* [Multiple views]({% slug multiple_views_multiviewcalendar_taghelper_aspnetcore %})
* [Selection]({% slug selection_multiviewcalendar_taghelper_aspnetcore %})
* [Day template]({% slug day_template_multiviewcalendar_taghelper_aspnetcore %})
* [Disable dates]({% slug disabled_dates_multiviewcalendar_taghelper_aspnetcore %})
* [Week column]({% slug week_column_multiviewcalendar_taghelper_aspnetcore %})
* [Keyboard navigation]({% slug keyboard_navigation_multiviewcalendar_taghelper_aspnetcore %})

## Event Handling

You can subscribe to all MultiViewCalendar [events](http://docs.telerik.com/kendo-ui/api/javascript/ui/multiviewcalendar#events).

### By Handler Name

The following example demonstrates how to subscribe to events by a handler name.

###### Example

```tagHelper

    <kendo-multiviewcalendar name="multiviewcalendar" on-change="calendar_change" on-navigate="calendar_navigate">
    </kendo-multiviewcalendar>
    <script>
        function calendar_navigate() {
            //Handle the navigate event.
        }

        function calendar_change() {
            //Handle the change event.
        }
    </script>

```
```Razor

        @(Html.Kendo().MultiViewCalendar()
          .Name("MultiViewCalendar")
          .Events(e => e
                .Change("calendar_change")
                .Navigate("calendar_navigate")
          )
        )
        <script>
        function calendar_navigate() {
            //Handle the navigate event.
        }

        function calendar_change() {
            //Handle the change event.
        }
        </script>
```

## See Also

* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
