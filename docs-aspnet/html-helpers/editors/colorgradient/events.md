---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI ColorGradient component for {{ site.framework }}."
components: ["colorgradient"]
slug: events_colorgradient_aspnetcore
position: 4
---

# Events

The Telerik UI ColorGradient for {{ site.framework }} exposes multiple [events](/api/kendo.mvc.ui.fluent/colorgradienteventbuilder) that allow you to control and customize the behavior of the component.

For a complete example of the basic ColorGradient events, refer to the [demo on using the events of the ColorGradient](https://demos.telerik.com/{{ site.platform }}/colorgradient/events).

## Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```HtmlHelper
    @(Html.Kendo().ColorGradient()
        .Name("colorgradient")
        .Events(e => e
            .Select("onSelect")
            .Change("onChange")
        )
    )
    <script>
        function onSelect() {
            // Handle the select event.
        }

        function onChange() {
            // Handle the change event.
        }
    </script>
```
{% if site.core %}
```TagHelper
    <script>
        function onSelect() {
            // Handle the select event.
        }

        function onChange() {
            // Handle the change event.
        }
    </script>

    <kendo-colorgradient name="colorgradient"
        on-select="onSelect"
        on-change="onChange">
    </kendo-colorgradient>
```
{% endif %}

## Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```HtmlHelper
    @(Html.Kendo().ColorGradient()
        .Name("colorgradient")
        .Events(e => e
            .Select(@<text>
                function() {
                    // Handle the select event inline.
                }
            </text>)
            .Change(@<text>
                function() {
                    // Handle the change event inline.
                }
            </text>)
        )
    )
```
{% if site.core %}
```TagHelper
    <kendo-colorgradient name="colorgradient"
        on-select="function() {
            // Handle the select event inline.
        }"
        on-change="function() {
            // Handle the change event inline.
        }">
    </kendo-colorgradient>
```
{% endif %}

## Next Steps

* [Using the ColorGradient Events (Demo)](https://demos.telerik.com/{{ site.platform }}/colorgradient/events)

## See Also

* [Using the API of the ColorGradient HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/colorgradient/api)
* [Server-Side API of the ColorGradient](/api/colorgradient)
* [Client-Side API of the ColorGradient](https://docs.telerik.com/kendo-ui/api/javascript/ui/colorgradient)
