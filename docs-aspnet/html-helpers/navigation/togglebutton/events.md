---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI ToggleButton component for {{ site.framework }}."
components: ["togglebutton"]
slug: events_togglebutton_aspnetcore
position: 7
---

# Events

The ToggleButton exposes a [`Toggle()` event](/api/kendo.mvc.ui.fluent/buttoneventbuilder) that you can handle. 

For a complete example on basic ToggleButton events, refer to the [demo on using the events of the ToggleButton](https://demos.telerik.com/{{ site.platform }}/togglebutton/events).

## Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```HtmlHelper
    @(Html.Kendo().ToggleButton()
        .Name("toggleButton")
        .Content("Sample ToggleButton")
        .Events(events => events.Toggle("onToggle"))
    )

    <script>
        function onToggle(e){
            // Handle the ToggleButton Toggle event that is triggered when selected state is toggled.
        };
    </script>
```

{% if site.core %}
```TagHelper
    <kendo-togglebutton name="toggleButton"
              on-toggle="onToggle">
        Sample ToggleButton
    </kendo-togglebutton>

     <script>
        function onToggle(e){
            // Handle the ToggleButton Toggle event that is triggered when selected state is toggled.
        };
    </script>
```
{% endif %}

## Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```HtmlHelper
    @(Html.Kendo().ToggleButton()
        .Name("toggleButton")
        .Content("Sample ToggleButton")
        .Events(events => events.Toggle(@<text>
            function() {
                // Handle the ToggleButton Toggle event inline.
            }
        </text>))
    )
```

{% if site.core %}
```TagHelper
    <kendo-togglebutton name="toggleButton"
              on-toggle="function(){
                // Handle the ToggleButton Toggle event inline.
              }">
        Sample ToggleButton
    </kendo-togglebutton>
```
{% endif %}

## Next Steps

* [Using the ToggleButton Events (Demo)](https://demos.telerik.com/aspnet-core/togglebutton/events)

## See Also

* [Using the API of the ToggleButton HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/togglebutton/api)
* [ToggleButton Server-Side API](/api/togglebutton)
* [ToggleButton Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/togglebutton)
