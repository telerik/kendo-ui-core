---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI Calendar component for {{ site.framework }}."
slug: events_calendar_aspnetcore
position: 7
---

# Events

The Calendar exposes [`Change()` and `Navigate()` events](/api/kendo.mvc.ui.fluent/calendareventbuilder) that you can handle. 

For a complete example on basic Calendar events, refer to the [demo on using the events of the Calendar](https://demos.telerik.com/{{ site.platform }}/calendar/events).

## Handling by Handler Name

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
        function calendar_navigate() {
            // Handle the navigate event.
        }

        function calendar_change() {
            // Handle the change event.
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
        function calendar_navigate() {
            // Handle the navigate event.
        }

        function calendar_change() {
            // Handle the change event.
        }
    </script>
```
{% endif %}

## Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```HtmlHelper
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
{% if site.core %}
```TagHelper
  <kendo-calendar name="calendar"
                           on-change='function() {
                                  //Handle the change event inline.
                           }'
                           on-navigate='function() {
                                  //Handle the navigate event inline.
                           }'>
  </kendo-calendar>
```
{% endif %}

## Next Steps

* [Configuring the Selection in the Calendar (Demo)](https://demos.telerik.com/{{ site.platform }}/calendar/selection)

## See Also

* [Using the API of the Calendar HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/calendar/api)
* [Server-Side API of the Calendar](/api/calendar)
* [Client-Side API of the Calendar](https://docs.telerik.com/kendo-ui/api/javascript/ui/calendar)
