---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI Diagram component for {{ site.framework }}."
slug: diagram_events
position: 6
---

# Events

You can subscribe to [all Diagram events](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/diagrambuilder#eventssystemaction) and then use them to further customize the behavior of the Diagram.

For a complete example on Diagram events, refer to the [demo on using the events of the Diagram](https://demos.telerik.com/{{ site.platform }}/diagram/events).

### Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```HtmlHelper
    @(Html.Kendo().Diagram()
        .Name("diagram")
        .Events(e => e
            .Add("onAdd")
        )
    )
    <script>
        // The Diagram instance is available as an e.sender or this.
        function onAdd(e) {
            // Handle the add event.
        }
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-diagram name="diagram" on-add="onAdd"></kendo-diagram>
    <script>
        // The Diagram instance is available as an e.sender or this.
        function onAdd(e) {
            // Handle the add event.
        }
    </script>
```
{% endif %}

### Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```HtmlHelper
    @(Html.Kendo().Diagram()
        .Name("diagram")
        .Events(e => e
            .Add(@<text>
              function(e) {
                  //Handle the add event inline.
              }
            </text>)
        )
    )
```
{% if site.core %}
```TagHelper
    <kendo-diagram name="diagram"
                   on-add="function(){
                      // Handle the add event.
                   }"
    </kendo-diagram>
```
{% endif %}

## Next Steps

* [Using the Diagram Events (Demo)](https://demos.telerik.com/{{ site.platform }}/diagram/events)

## See Also

* [Using the API of the Diagram for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/diagram/api)
* [Diagram Server-Side API for {{ site.framework}}](/api/diagram)
* [Diagram Client-Side API](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/dataviz/ui/diagram)