---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI PropertyGrid component for {{ site.framework }}."
slug: htmlhelpers_events_propertygrid
position: 5
---

# Events

The Telerik UI PropertyGrid for {{ site.framework }} [exposes various events](/api/kendo.mvc.ui.fluent/propertygridventbuilder) that allow you to control the behavior of the UI component.

For a complete example on basic PropertyGrid events, refer to the [demo on using the events of the PropertyGrid](https://demos.telerik.com/{{ site.platform }}/propertygrid/events).

## Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```HtmlHelper
    @model PropertyViewModel

    @(Html.Kendo().PropertyGrid<PropertyViewModel>()
        .Name("propertyGrid")
        .Events(e => e.Edit("onEdit"))
        ... //Additional configuration
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc
    @model PropertyViewModel

    <kendo-propertygrid name="propertyGrid" on-edit="onEdit">
      <!-- Additional configuration -->
    </kendo-propertygrid>
```
{% endif %}
```Scripts
    <script>
        function onEdit(e){
            // Handle the PropertyGrid Edit event that triggers when the user edits a data item.
        };
    </script>
```

## Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```HtmlHelper
    @model PropertyViewModel

    @(Html.Kendo().PropertyGrid<PropertyViewModel>()
        .Name("propertyGrid")
        .Events(e => e.Edit(@<text>
                function() {
                    // Handle the PropertyGrid Edit event inline.
                }
            </text>)
        )
        ... //Additional configuration
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc
    @model PropertyViewModel

    <kendo-propertygrid name="propertyGrid" 
        on-edit="function() {
            // Handle the PropertyGrid Edit event inline.
        }">
    </kendo-propertygrid>
```
{% endif %}

## Next Steps

* [Using the PropertyGrid Events (Demo)](https://demos.telerik.com/{{ site.platform }}/propertygrid/events)

## See Also

* [Using the API of the PropertyGrid for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/propertygrid/api)
* [Client-Side API of the PropertyGrid](https://docs.telerik.com/kendo-ui/api/javascript/ui/propertygrid)
* [Server-Side API of the PropertyGrid](/api/propertygrid)
{% if site.core %}
* [Server-Side API of the PropertyGrid TagHelper](/api/taghelpers/propertygrid)
{% endif %}