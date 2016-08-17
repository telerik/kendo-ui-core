---
title: Overview
page_title: Overview | Kendo UI Calendar HtmlHelper
description: "Get started with the server-side wrapper for the Kendo UI Calendar widget for ASP.NET MVC."
slug: overview_calendarhelper_aspnetmvc
position: 1
---

# Calendar HtmlHelper Overview

The Calendar HtmlHelper extension is a server-side wrapper for the [Kendo UI Calendar](https://demos.telerik.com/kendo-ui/calendar/index) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI Calendar.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).

**Step 2** Create a new action method which renders the view.

###### Example

        public ActionResult Index()
        {
            return View();
        }

**Step 3** Add a Calendar.

###### Example

```tab-ASPX

        <%: Html.Kendo().Calendar()
            .Name("calendar") //The name of the Calendar is mandatory. It specifies the "id" attribute of the widget.
            .Min(new DateTime(2010, 1, 1, 10, 0, 0)) //Set the min time of the Calendar.
            .Max(new DateTime(2010, 1, 1, 20, 0, 0)) //Set the min date of the Calendar.
            .Value(DateTime.Now) //Set the value of the Calendar.
        %>
```
```tab-Razor

        @(Html.Kendo().Calendar()
            .Name("calendar") //The name of the Calendar is mandatory. It specifies the "id" attribute of the widget.
            .Min(new DateTime(2010, 1, 1, 10, 0, 0)) //Set the min time of the Calendar.
            .Max(new DateTime(2010, 1, 1, 20, 0, 0)) //Set the min date of the Calendar.
            .Value(DateTime.Now) //Set the value of the Calendar.
        )
```

## Event Handling

You can subscribe to all Calendar [events](/api/javascript/ui/calendar#events).

### By Handler Name

The examples below demonstrates how to subscribe to events by a handler name.

###### Example

```tab-ASPX

        <%: Html.Kendo().Calendar()
            .Name("calendar")
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
```tab-Razor

        @(Html.Kendo().Calendar()
          .Name("calendar")
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

The example below demonstrates how to subscribe to events by a template delegate.

###### Example

```tab-Razor

        @(Html.Kendo().Calendar()
          .Name("calendar")
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

## Reference

### Existing Instances

You can reference an existing Kendo UI Calendar instance via [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [Calendar API](/api/javascript/ui/calendar#methods) to control its behavior.

###### Example

        //Put this after your Kendo UI Calendar for ASP.NET MVC declaration.
        <script>
        $(function() {
        //Notice that the Name() of the Calendar is used to get its client-side instance.
        var calendar = $("#calendar").data("kendoCalendar");
        });
        </script>

## See Also

Other articles on Telerik UI for ASP.NET MVC and on the Calendar:

* [ASP.NET MVC API Reference: CalendarBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/CalendarBuilder)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Overview of the Kendo UI Calendar Widget]({% slug overview_kendoui_calendar_widget %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/aspnet-mvc/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_autocompletehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
