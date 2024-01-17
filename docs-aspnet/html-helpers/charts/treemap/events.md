---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI TreeMap component for {{ site.framework }}."
slug: events_treemap_aspnetcore
position: 3
---

# Events

You can subscribe to all TreeMap [events](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/treemap#events).

## Handling Events by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```HtmlHelper
    @(Html.Kendo().TreeMap()
            .Name("treemap")
            .Events(events => events
                .ItemCreated("onItemCreated")
                .DataBound("onDataBound")
            )
    )
```
{% if site.core %}
```TagHelper

@addTagHelper *, Kendo.Mvc
    <kendo-treemap name="treemap" 
                on-item-created="onItemCreated" 
                on-data-bound="onDataBound">
    </kendo-treemap>

```
{% endif %}
```script.js

    <script>
        function onItemCreated(e) {
            // The HTML element.
            var element = e.element;
            // The dataItem to which the element is bound.
            var dataItem = e.sender.dataItem(e.element);
        }

        function onDataBound(e) {
            // Handle the dataBound event.
        }
    </script>
    
```

{% if site.core %}
## Handling Events by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```HtmlHelper
    @(Html.Kendo().TreeMap()
            .Name("treemap")
            .Events(e => e
                .ItemCreated(@<text>
                function(e) {
                    // The HTML element.
                    var element = e.element;
                    // The dataItem to which the element is bound.
                    var dataItem = e.sender.dataItem(e.element);
                }
                </text>)
                .DataBound(@<text>
                function(e) {
                    // Handle the dataBound event.
                }
                </text>)
            )
    )
```

{% endif %}

## See Also

* [Using the API of the TreeMap for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/treemap/api)
* [TreeMap Server-Side API](/api/treemap)
* [TreeMap Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/treemap)