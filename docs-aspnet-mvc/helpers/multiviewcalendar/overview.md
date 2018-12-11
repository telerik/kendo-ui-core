---
title: Overview
page_title: MultiViewCalendar | Telerik UI for ASP.NET MVC HtmlHelpers
description: "Get started with the server-side wrapper for the Kendo UI MultiViewCalendar widget for ASP.NET MVC."
slug: overview_multiviewcalendar_aspnetmvc
position: 1
---

# MultiViewCalendar HtmlHelper Overview

The MultiViewCalendar HtmlHelper extension is a server-side wrapper for the [Kendo UI MultiViewCalendar](https://demos.telerik.com/kendo-ui/multiviewcalendar/index) widget.

## Configuration

Below are listed the steps for you to follow when configuring the Kendo UI MultiViewCalendar.

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).

1. Create a new action method which renders the view.

###### Example

            public ActionResult Index()
            {
                return View();
            }

1. Add a MultiViewCalendar.

###### Example

```ASPX

        <%: Html.Kendo().MultiViewCalendar()
            .Name("MultiViewCalendar") //The name of the MultiViewCalendar is mandatory. It specifies the "id" attribute of the widget.
            .Min(new DateTime(2010, 1, 1, 10, 0, 0)) //Set the min time of the MultiViewCalendar.
            .Max(new DateTime(2010, 1, 1, 20, 0, 0)) //Set the min date of the MultiViewCalendar.
            .Value(DateTime.Now) //Set the value of the MultiViewCalendar.
        %>
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

* [Active view]({% slug active_view_multiviewcalendar_aspnetmvc %})
* [Multiple views]({% slug multiple_views_multiviewcalendar_aspnetmvc %})
* [Selection]({% slug selection_multiviewcalendar_aspnetmvc %})
* [Day template]({% slug day_template_multiviewcalendar_aspnetmvc %})
* [Disabled dates]({% slug disabled_dates_multiviewcalendar_aspnetmvc %})
* [Week column]({% slug week_column_multiviewcalendar_aspnetmvc %})
* [Keyboard navigation]({% slug keyboard_navigation_multiviewcalendar_aspnetmvc %})

## Event Handling

You can subscribe to all MultiViewCalendar [events](http://docs.telerik.com/kendo-ui/api/javascript/ui/multiviewcalendar#events).

### By Handler Name

The following example demonstrates how to subscribe to events by a handler name.

###### Example

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

### By Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

###### Example

```Razor

        @(Html.Kendo().MultiViewCalendar()
          .Name("MultiViewCalendar")
          .Events(e => e
              .Change(@<text>
                function() {
                    //Handle the change event inline.
                }
              </text>)
              .Navigate(@<text>
                function() {
                    //Handle the navigate event inline.
                }
                </text>)
          )
        )
```

## See Also

* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Overview of the Kendo UI MultiViewCalendar Widget](http://docs.telerik.com/kendo-ui/controls/scheduling/multiviewcalendar/overview)
* [Telerik UI for ASP.NET MVC API Reference Folder](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_autocompletehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
