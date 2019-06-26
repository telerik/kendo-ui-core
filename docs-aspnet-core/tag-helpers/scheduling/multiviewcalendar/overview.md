---
title: Overview
page_title: MultiViewCalendar Overview | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Kendo UI MultiViewCalendar tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: overview_multiviewcalendar_taghelper_aspnetcore
position: 1
---

# MultiViewCalendar Tag Helper Overview

The Kendo UI MultiViewCalendar renders a graphical Gregorian calendar with multiple horizontal views.

The MultiViewCalendar tag helper extension is a server-side wrapper for the [Kendo UI MultiViewCalendar](https://demos.telerik.com/kendo-ui/multiviewcalendar/index) widget and enables you to configure the Kendo UI MultiViewCalendar widget in ASP.NET Core applications.

## Initializing the MultiViewCalendar

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET Core](https://docs.telerik.com/aspnet-core/introduction).
1. Create a new action method which renders the view.

            public ActionResult Index()
            {
                return View();
            }

1. Add a MultiViewCalendar.

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

## Events

You can subscribe to all MultiViewCalendar [events](http://docs.telerik.com/kendo-ui/api/javascript/ui/multiviewcalendar#events).

The following example demonstrates how to subscribe to events by a handler name.

```tagHelper

    <kendo-multiviewcalendar name="multiviewcalendar" on-change="calendar_change" on-navigate="calendar_navigate">
    </kendo-multiviewcalendar>
    <script>
        function calendar_navigate() {
            // Handle the navigate event.
        }

        function calendar_change() {
            // Handle the change event.
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
            // Handle the navigate event.
        }

        function calendar_change() {
            // Handle the change event.
        }
        </script>
```

## See Also

* [Basic Usage of the MultiViewCalendar Tag Helper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/multiviewcalendar/tag-helper)
* [JavaScript API Reference of the MultiViewCalendar](http://docs.telerik.com/kendo-ui/api/javascript/ui/multiviewcalendar)
