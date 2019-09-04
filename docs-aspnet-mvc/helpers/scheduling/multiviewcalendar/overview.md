---
title: Overview
page_title: MultiViewCalendar Overview | Telerik UI for ASP.NET MVC HTML Helpers
description: "Learn the basics when working with the Telerik UI MultiViewCalendar HtmlHelper for ASP.NETT MVC."
slug: overview_multiviewcalendar_aspnetmvc
position: 1
---

# MultiViewCalendar HtmlHelper Overview

The Telerik UI MultiViewCalendar HtmlHelper for ASP.NET MVC is a server-side wrapper for the Kendo UI MultiViewCalendar widget.

The MultiViewCalendar renders a graphical Gregorian calendar with multiple horizontal views.

* [Demo page for the MultiViewCalendar](https://demos.telerik.com/aspnet-mvc/multiviewcalendar)

## Basic Configuration

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).
1. Create a new action method which renders the view.

            public ActionResult Index()
            {
                return View();
            }

1. Add a MultiViewCalendar.

```ASPX

        <%: Html.Kendo().MultiViewCalendar()
            .Name("MultiViewCalendar") // The name of the MultiViewCalendar is mandatory. It specifies the "id" attribute of the MultiViewCalendar.
            .Min(new DateTime(2010, 1, 1, 10, 0, 0)) // Set the min time of the MultiViewCalendar.
            .Max(new DateTime(2010, 1, 1, 20, 0, 0)) // Set the min date of the MultiViewCalendar.
            .Value(DateTime.Now) // Set the value of the MultiViewCalendar.
        %>
```
```Razor

        @(Html.Kendo().MultiViewCalendar()
            .Name("MultiViewCalendar") // The name of the MultiViewCalendar is mandatory. It specifies the "id" attribute of the MultiViewCalendar.
            .Min(new DateTime(2010, 1, 1, 10, 0, 0)) // Set the min time of the MultiViewCalendar.
            .Max(new DateTime(2010, 1, 1, 20, 0, 0)) // Set the min date of the MultiViewCalendar.
            .Value(DateTime.Now) // Set the value of the MultiViewCalendar.
        )
```

## Functionality and Features

* [Active view]({% slug active_view_multiviewcalendar_aspnetmvc %})
* [Multiple views]({% slug multiple_views_multiviewcalendar_aspnetmvc %})
* [Selection]({% slug selection_multiviewcalendar_aspnetmvc %})
* [Day template]({% slug day_template_multiviewcalendar_aspnetmvc %})
* [Disabled dates]({% slug disabled_dates_multiviewcalendar_aspnetmvc %})
* [Week column]({% slug week_column_multiviewcalendar_aspnetmvc %})
* [Keyboard navigation]({% slug keyboard_navigation_multiviewcalendar_aspnetmvc %})

## Events

You can subscribe to all MultiViewCalendar [events](/api/multiviewcalendar).

### Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```ASPX

        <%: Html.Kendo().MultiViewCalendar()
            .Name("MultiViewCalendar")
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

### Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```Razor

        @(Html.Kendo().MultiViewCalendar()
          .Name("MultiViewCalendar")
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

## See Also

* [Basic Usage of the MultiViewCalendar HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/multiviewcalendar)
* [Using the API of the MultiViewCalendar HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/multiviewcalendar/api)
* [Server-Side API](/api/multiviewcalendar)
