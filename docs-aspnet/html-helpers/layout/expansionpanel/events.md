---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI ExpansionPanel component for {{ site.framework }}."
components: ["expansionpanel"]
slug: events_expansionpanel
position: 3
---

# Events

The Telerik UI ExpansionPanel for {{ site.framework }} [exposes some events](/api/kendo.mvc.ui.fluent/expansionpaneleventbuilder) that allow you to control the behavior of the UI component.

For a complete example on the available component events, refer to the [demo on using the events of the ExpansionPanel](https://demos.telerik.com/{{ site.platform }}/expansionpanel/events).

## Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```HtmlHelper
    @(Html.Kendo().ExpansionPanel()
        .Name("expanionpanel")
        .Events(e => e.Expand("onExpand"))
        ... //Additional configuration
    )

    <script>
        function onExpand(e){
            // Handle the ExpansionPanel Expand event that triggers when it is expanded.
        }
    </script>
```

{% if site.core %}
```TagHelper
     <kendo-expansionpanel name="expanionpanel" on-expand="onExpand">
        <!-- additional configuration -->
     </kendo-expansionpanel>  

    <script>
        function onExpand(e){
            // Handle the ExpansionPanel Expand event that triggers when it is expanded.
        }
    </script>
```
{% endif %}

## Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```HtmlHelper
    @(Html.Kendo().ExpansionPanel()
        .Name("expanionpanel")
        .Events(e => e.Expand(@<text>
                function() {
                    // Handle the Expand event inline.
                }
            </text>)
        )
        ... //Additional configuration
    )
```

{% if site.core %}
```TagHelper
    <kendo-expansionpanel name="expanionpanel" 
        on-expand="function() {
            // Handle the Expand event inline.
        }">
    </kendo-expansionpanel>
```
{% endif %}

## Next Steps

* [Using the ExpansionPanel Events (Demo)](https://demos.telerik.com/{{ site.platform }}/expansionpanel/events)

## See Also

* [ExpansionPanel Server-Side API for {{ site.framework}}](/api/expansionpanel)
* [ExpansionPanel Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/expansionpanel)