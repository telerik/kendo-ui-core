---
title: Overview
page_title: Calendar | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the Kendo UI Calendar HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: overview_calendarhelper_aspnetcore
position: 1
---

# Calendar HtmlHelper Overview

The Calendar HtmlHelper extension is a server-side wrapper for the [Kendo UI Calendar](https://demos.telerik.com/kendo-ui/calendar/index) widget.

## Configuration

Add the Calendar.

###### Example

```
    @(Html.Kendo().Calendar()
        .Name("calendar") //The name of the Calendar is mandatory. It specifies the "id" attribute of the widget.
        .Min(new DateTime(2010, 1, 1, 10, 0, 0)) //Set the min time of the Calendar.
        .Max(new DateTime(2020, 1, 1, 20, 0, 0)) //Set the min date of the Calendar.
        .Value(DateTime.Now) //Set the value of the Calendar.
    )
```

## Event Handling

You can subscribe to all Calendar [events](https://docs.telerik.com/kendo-ui/api/javascript/ui/calendar#events).

### By Handler Name

The following example demonstrates how to subscribe to events by a handler name.

###### Example

```
    @(Html.Kendo().Calendar()
      .Name("calendar")
      .Events(e => e
          .Change("calendar_change")
          .Navigate("calendar_navigate")
      )
    )
    <script>
        function calendar_navigate(e) {
            //Handle the navigate event.
            var calendar = e.sender;
        }

        function calendar_change(e) {
            // alerts the chosen date with kendo.alert()
            var calendar = e.sender;
            kendo.alert(calendar.value());
        }
    </script>
```

### By Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

###### Example

```
    @(Html.Kendo().Calendar()
      .Name("calendar")
      .Events(e => e
          .Change(@<text>
            function(e) {
              //Handle the change event inline.
              console.log(e.sender.value());
            }
          </text>)
          .Navigate(@<text>
            function(e) {
              //Handle the navigate event inline.
              console.log(e.sender);
            }
            </text>)
      )
    )
```

## Reference

### Existing Instances

To reference an existing Kendo UI Calendar instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [Calendar API](https://docs.telerik.com/kendo-ui/api/javascript/ui/calendar#methods) to control its behavior.

###### Example

```
    //Put this after your Kendo UI Calendar for ASP.NET Core declaration.
    <script>
         $(function() {
            //Notice that the Name() of the Calendar is used to get its client-side instance.
            var calendar = $("#calendar").data("kendoCalendar");
         });
    </script>
```

## See Also

* [Overview of the Kendo UI jQuery Calendar Widget](https://docs.telerik.com/kendo-ui/controls/scheduling/calendar/overview)
* [UI for ASP.NET Core Calendar live demo](https://demos.telerik.com/aspnet-core/calendar)
