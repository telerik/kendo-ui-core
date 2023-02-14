---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Calendar component for {{ site.framework }}."
previous_url: /helpers/scheduling/calendar/overview
slug: htmlhelpers_overview_calendarhelper_aspnetcore
position: 1
---

# {{ site.framework }} Calendar Overview

{% if site.core %}
The Telerik UI Calendar TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI Calendar widget.
{% else %}
The Telerik UI Calendar HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI Calendar widget.
{% endif %}

The Calendar renders a graphical calendar that provides navigation and selection functionalities.

* [Demo page for the Calendar HtmlHelper](https://demos.telerik.com/{{ site.platform }}/calendar/index)
{% if site.core %}
* [Demo page for the Calendar TagHelper](https://demos.telerik.com/aspnet-core/calendar/tag-helper)
{% endif %}

## Initializing the Calendar

The following example demonstrates how to define the Calendar by using the Calendar HtmlHelper.

```HtmlHelper
    @(Html.Kendo().Calendar()
        .Name("calendar") // The name of the Calendar is mandatory. It specifies the "id" attribute of the Calendar.
        .Min(new DateTime(2010, 1, 1, 10, 0, 0)) // Set the min time of the Calendar.
        .Max(new DateTime(2020, 1, 1, 20, 0, 0)) // Set the min date of the Calendar.
        .Value(DateTime.Now) // Set the value of the Calendar.
    )
```
{% if site.core %}
```TagHelper
    <kendo-calendar name="calendar"
                    min="new DateTime(2010, 1, 1, 10, 0, 0)"
                    max="new DateTime(2020, 1, 1, 20, 0, 0)"
                    value="DateTime.Now">
    </kendo-calendar>
```
{% endif %}


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

```HtmlHelper
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
{% if site.core %}
```TagHelper
   <kendo-calendar name="calendar"
                   on-change="calendar_change"
                   on-navigate="calendar_navigate">
   </kendo-calendar>
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
{% endif %}

### Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```HtmlHelper
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
{% if site.core %}
```TagHelper.cshtml
    <kendo-calendar name="calendar"
                    on-change='function(e)
                    {
                        // Handle the change event inline.
                        console.log(e.sender.value());
                    }'
                    on-navigate='function(e)
                    {
                        // Handle the navigate event inline.
                        console.log(e.sender);
                    }'>
    </kendo-calendar>
```
{% endif %}

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
{% if site.core %}
* [Basic Usage of the Calendar TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/calendar/tag-helper)
{% endif %}
* [Using the API of the Calendar HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/calendar/api)
* [Server-Side API](/api/calendar)
