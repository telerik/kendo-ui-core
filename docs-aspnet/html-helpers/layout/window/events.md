---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI Window component for {{ site.framework }}."
slug: events_window_aspnetcore
position: 7
---

# Events

The Telerik UI Window for {{ site.framework }} exposes multiple [events](/api/Kendo.Mvc.UI.Fluent/WindowEventBuilder) that allow you to control and customize the behavior of the UI component.

For a complete example on basic Window events, refer to the [demo on using the events of the Window](https://demos.telerik.com/{{ site.platform }}/window/events).

## Handling by Handler Name

The following example demonstrates how to subscribe to events by handler name.

```HtmlHelper
    @(Html.Kendo().Window()
        .Name("window")
        .Events(e => e
            .Open("window_open")
            .Close("window_close")
        )
    )
```
{% if site.core %}
```TagHelper
    <kendo-window name="window" on-open="window_open" on-close="window_close">
    </kendo-window>
```
{% endif %}
```JavaScript
    <script>
        function window_open() {
            // Handle the open event.
        }

        function window_close() {
            // Handle the close event.
        }
    </script>

```

## Handling by Template Delegate

The following example demonstrates how to subscribe to events by using a template delegate.

```HtmlHelper
    @(Html.Kendo().Window()
        .Name("window")
        .Events(e => e
            .Open(@<text>
                function() {
                    // Handle the open event inline.
                }
            </text>)
            .Close(@<text>
                function() {
                    // Handle the close event inline.
                }
            </text>)
        )
    )
```
{% if site.core %}
```TagHelper
    <kendo-window name="window"
     on-open="function() {
        //Handle the open event inline.
    }"
     on-close="function() {
       //Handle the open event inline.
    }">
    </kendo-window>
```
{% endif %}

## Next Steps

* [Using the Window Events (Demo)](https://demos.telerik.com/{{ site.platform }}/window/events)

## See Also

* [Using the API of the Window HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/window/api)
* [Window Server-Side API](/api/window)
* [Window Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/window)
