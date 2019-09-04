---
title: Overview
page_title: Calendar Overview | Telerik UI for ASP.NET MVC HTML Helpers
description: "Learn the basics when working with the Telerik UI Calendar HtmlHelper for ASP.NET MVC."
slug: overview_calendarhelper_aspnetmvc
position: 1
---

# Calendar HtmlHelper Overview

The Telerik UI Calendar HtmlHelper for ASP.NET MVC is a server-side wrapper for the Kendo UI Calendar widget.

The Calendar renders a graphical calendar that provides navigation and selection functionalities.

* [Demo page for the Calendar](https://demos.telerik.com/aspnet-mvc/calendar/index)

## Basic Configuration

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).
1. Create a new action method which renders the view.

        public ActionResult Index()
        {
            return View();
        }

1. Add a Calendar.

    ```ASPX
        <%: Html.Kendo().Calendar()
            .Name("calendar") // The name of the Calendar is mandatory. It specifies the "id" attribute of the Calendar.
            .Min(new DateTime(2010, 1, 1, 10, 0, 0)) // Set the min time of the Calendar.
            .Max(new DateTime(2010, 1, 1, 20, 0, 0)) // Set the min date of the Calendar.
            .Value(DateTime.Now) // Set the value of the Calendar.
        %>
    ```
    ```Razor
        @(Html.Kendo().Calendar()
            .Name("calendar") // The name of the Calendar is mandatory. It specifies the "id" attribute of the Calendar.
            .Min(new DateTime(2010, 1, 1, 10, 0, 0)) // Set the min time of the Calendar.
            .Max(new DateTime(2010, 1, 1, 20, 0, 0)) // Set the min date of the Calendar.
            .Value(DateTime.Now) // Set the value of the Calendar.
        )
    ```

## Events

You can subscribe to all Calendar [events](/api/calendar). For a complete example on basic Calendar events, refer to the [demo on using the events of the Calendar](https://demos.telerik.com/aspnet-mvc/calendar/events).

### Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```ASPX
    <%: Html.Kendo().Calendar()
        .Name("calendar")
        .Events(e => e
            .Change("calendar_change")
            .Navigate("calendar_navigate")
        )
    %>
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
    @(Html.Kendo().Calendar()
        .Name("calendar")
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

### Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```Razor
    @(Html.Kendo().Calendar()
        .Name("calendar")
        .Events(e => e
            .Change(@<text>
            function() {
                // Handle the change event inline.
            }
            </text>)
            .Navigate(@<text>
            function() {
                // Handle the navigate event inline.
            }
            </text>)
        )
    )
```

## Referencing Existing Instances

To reference an existing Calendar instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [Calendar client-side API](http://docs.telerik.com/kendo-ui/api/javascript/ui/calendar#methods) to control its behavior.

    // Place the following after the Calendar for ASP.NET MVC declaration.
    <script>
        $(function() {
            // The Name() of the Calendar is used to get its client-side instance.
            var calendar = $("#calendar").data("kendoCalendar");
        });
    </script>

## See Also

* [Basic Usage of the Calendar HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/calendar/index)
* [Using the API of the Calendar HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/calendar/api)
* [CalendarBuilder Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/CalendarBuilder)
* [Calendar Server-Side API](/api/calendar)
