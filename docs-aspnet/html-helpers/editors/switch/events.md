---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI Switch component for {{ site.framework }}."
slug: events_switch
position: 6
---


# Events

The Switch for {{ site.framework }} exposes the [`Change()` event](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/switcheventbuilder#changesystemstring) that you can use for capturing the Switch's value during user interaction. 

For a complete example on Switch events, refer to the [demo on using the events of the Slider](https://demos.telerik.com/{{ site.platform }}/switch/events).

### Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```HtmlHelper
    @(Html.Kendo().Switch()
        .Name("switch")
        .Events(e => e
            .Change("change")
        )
    )
    <script>
        function change(e) {
            // Handle the change event.
        }
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-switch name="switch" on-change="change"></kendo-switch>
    <script>
        function change(e) {
            // Handle the change event.
        }
    </script>
```
{% endif %}

### Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```HtmlHelper
    @(Html.Kendo().Switch()
        .Name("switch")
        .Events(e => e
            .Change(@<text>
              function(e) {
                  // Handle the change event inline.
              }
            </text>)
        )
    )
```
{% if site.core %}
```TagHelper
    <kendo-switch name="switch"
              on-change="function() {
                 // Handle the change event inline.
              }">
    </kendo-switch>
```
{% endif %}

## Next Steps

* [Using the Switch Events (Demo)](https://demos.telerik.com/{{ site.platform }}/switch/events)

## See Also

* [Using the API of the Switch for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/switch/api)
* [Switch Server-Side API for {{ site.framework}}](/api/switch)
* [Switch Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/switch)