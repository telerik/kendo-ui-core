---
title: Events
page_title: Telerik UI Chart Wizard Documentation - Client Events
description: "Learn how to handle the events of the Telerik UI Chart Wizard component for {{ site.framework }}."
slug: htmlhelpers_events_chartwizard
position: 5
---

# Events

The Telerik UI Chart Wizard for {{ site.framework }} [exposes multiple events](/api/kendo.mvc.ui.fluent/chartwizardeventbuilder) like `Change`, `Open`, `Close`, and more, that allow you to control the behavior of the UI component.

For a complete example on basic Chart Wizard events, refer to the [demo on using the events of the Chart Wizard](https://demos.telerik.com/{{ site.platform }}/chartwizard/events).

## Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```HtmlHelper
    @(Html.Kendo().ChartWizard<Product>()
        .Name("chartWizard")
        .Events(ev => ev.Change("onChange"))
        ... //Additional configuration
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-chartwizard name="chartWizard" on-change="onChange">
        <!-- Additional configuration -->
    </kendo-chartwizard>
```
{% endif %}
```Scripts
    <script>
        function onChange(e){
            // Handle the Chart Wizard "Change" event that triggers when the component changes its state.
        }
    </script>
```

## Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```HtmlHelper
    @(Html.Kendo().ChartWizard<Product>()
        .Name("chartWizard")
        .Events(e => e.Change(@<text>
            function() {
                // Handle the Chart Wizard Change event inline.
            }
            </text>)
        )
        ... //Additional configuration
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-chartwizard name="chartWizard" on-change="function() {
            // Handle the Chart Wizard "Change" event inline.
        }">
        <!-- Additional configuration -->
    </kendo-chartwizard>
```
{% endif %}

## Next Steps

* [Using the Chart Wizard Events (Demo)](https://demos.telerik.com/{{ site.platform }}/chartwizard/events)

## See Also

* [Using the API of the Chart Wizard for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/chartwizard/api)
* [Client-Side API of the Chart Wizard](https://docs.telerik.com/kendo-ui/api/javascript/ui/chartwizard)
* [Server-Side API of the Chart Wizard](/api/chartwizard)
{% if site.core %}
* [Server-Side API of the Chart Wizard TagHelper](/api/taghelpers/chartwizard)
{% endif %}
