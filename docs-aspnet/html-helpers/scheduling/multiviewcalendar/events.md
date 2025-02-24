---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI MultiViewCalendar component for {{ site.framework }}."
slug: events_multiviewcalendar_aspnetcore
position: 10
---

# Events

The MultiViewCalendar exposes [`Change()` and `Navigate()` events](/api/kendo.mvc.ui.fluent/multiviewcalendareventbuilder) that you can handle. 

## Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```HtmlHelper
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
{% if site.core %}
```TagHelper
    <kendo-multiviewcalendar name="multiviewcalendar" 
                             on-change="calendar_change" 
                             on-navigate="calendar_navigate">
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
{% endif %}

## Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```HtmlHelper
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
{% if site.core %}
```TagHelper
  <kendo-multiviewcalendar name="multiViewCalendar"
                           on-change='function() {
                                  //Handle the change event inline.
                           }'
                           on-navigate='function() {
                                  //Handle the navigate event inline.
                           }'>
  </kendo-multiviewcalendar>
```
{% endif %}

## Next Steps

* [Configuring the Selection in the MultiViewCalendar (Demo)](https://demos.telerik.com/aspnet-core/multiviewcalendar/selection)

## See Also

* [Using the API of the MultiViewCalendar HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/multiviewcalendar/api)
* [Server-Side API of the MultiViewCalendar](/api/multiviewcalendar)
* [Client-Side API of the MultiViewCalendar](https://docs.telerik.com/kendo-ui/api/javascript/ui/multiviewcalendar)
