---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI TileLayout component for {{ site.framework }}."
components: ["tilelayout"]
slug: tilelayout_events
position: 6
---

# Events

The Telerik UI TileLayout for {{ site.framework }} [exposes a number of events](/api/kendo.mvc.ui.fluent/tilelayouteventbuilder) that allow you to control the behavior of the UI component.

For a complete example on basic TileLayout events, refer to the [demo on using the events of the TileLayout](https://demos.telerik.com/{{ site.platform }}/tilelayout/events).

## Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```HtmlHelper
    @(Html.Kendo().TileLayout()
        .Name("tilelayout")
        .Events(e => e.Reorder("onReorder"))
        ... //Additional configuration
    )

    <script>
        function onReorder(e){
            // Handle the TileLayout Reorder event that triggers when a tile is reordered.
        };
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-tilelayout name="tilelayout" reorderable="true" on-reorder="onReorder">
        <!-- additional configuration -->
    </kendo-tilelayout>

    <script>
        function onReorder(e){
            // Handle the TileLayout Reorder event that triggers when a tile is reordered.
        };
    </script>
```
{% endif %}

## Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```HtmlHelper
    @(Html.Kendo().TileLayout()
        .Name("tilelayout")
        .Events(e => e.Reorder(@<text>
                function() {
                    // Handle the TileLayout Reorder event inline.
                }
            </text>)
        )
        ... //Additional configuration
    )
```
{% if site.core %}
```TagHelper
    <kendo-tilelayout name="tilelayout" reorderable="true" 
        on-reorder="function() {
            // Handle the TileLayout Reorder event inline.
        }">
        <!-- additional configuration -->
    </kendo-tilelayout>
```
{% endif %}

## Next Steps

* [Using the TileLayout Events (Demo)](https://demos.telerik.com/{{ site.platform }}/tilelayout/events)

## See Also

* [Client-Side API of the TileLayout](https://docs.telerik.com/kendo-ui/api/javascript/ui/tilelayout)
* [Server-Side API of the TileLayout](/api/tilelayout)