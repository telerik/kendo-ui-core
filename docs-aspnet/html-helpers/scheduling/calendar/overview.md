---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Calendar HtmlHelper for {{ site.framework }}."
previous_url: /helpers/scheduling/calendar/overview
slug: htmlhelpers_overview_calendarhelper_aspnetcore
position: 1
---

# Calendar HtmlHelper Overview

The Telerik UI Calendar HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI Calendar widget.

The Calendar renders a graphical calendar that provides navigation and selection functionalities.

* [Demo page for the Calendar](https://demos.telerik.com/{{ site.platform }}/calendar/index)

## Initializing the Calendar

The following example demonstrates how to define the Calendar by using the Calendar HtmlHelper.

```
    @(Html.Kendo().Calendar()
        .Name("calendar") // The name of the Calendar is mandatory. It specifies the "id" attribute of the Calendar.
        .Min(new DateTime(2010, 1, 1, 10, 0, 0)) // Set the min time of the Calendar.
        .Max(new DateTime(2020, 1, 1, 20, 0, 0)) // Set the min date of the Calendar.
        .Value(DateTime.Now) // Set the value of the Calendar.
    )
```

## Functionality and Features

* [Date ranges]({% slug htmlhelpers_dateranges_calendar_aspnetcore %})
* [Day template]({% slug htmlhelpers_daytemplate_calendar_aspnetcore %})
* [Week numbers]({% slug htmlhelpers_weeknumbers_calendar_aspnetcore %})
* [Selection]({% slug htmlhelpers_selection_calendar_aspnetcore %})
* [Disabled dates]({% slug htmlhelpers_disableddates_calendar_aspnetcore %})
* [Accessibility]({% slug htmlhelpers_accessibility_calendar_aspnetcore %})

## Events

You can subscribe to all Calendar events. For a complete example on basic Calendar events, refer to the [demo on using the events of the Calendar](https://demos.telerik.com/{{ site.platform }}/calendar/events).

### Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

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
            // Handle the navigate event.
            var calendar = e.sender;
        }

        function calendar_change(e) {
            // Alerts the selected date with kendo.alert().
            var calendar = e.sender;
            kendo.alert(calendar.value());
        }
    </script>
```

### Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```
    @(Html.Kendo().Calendar()
      .Name("calendar")
      .Events(e => e
          .Change(@<text>
            function(e) {
              // Handle the change event inline.
              console.log(e.sender.value());
            }
          </text>)
          .Navigate(@<text>
            function(e) {
              // Handle the navigate event inline.
              console.log(e.sender);
            }
            </text>)
      )
    )
```

## Referencing Existing Instances

To reference an existing Telerik UI Calendar instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [Calendar client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/calendar#methods) to control its behavior.

```
    // Place the following after your Telerik UI Calendar for {{ site.framework }} declaration.
    <script>
         $(function() {
            // The Name() of the Calendar is used to get its client-side instance.
            var calendar = $("#calendar").data("kendoCalendar");
         });
    </script>
```

## See Also

* [Basic Usage of the Calendar HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/calendar/index)
* [Using the API of the Calendar HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/calendar/api)
* [Server-Side API](/api/calendar)
