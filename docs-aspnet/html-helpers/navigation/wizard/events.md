---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI Wizard component for {{ site.framework }}."
slug: events_wizard
position: 6
---

# Events

The Telerik UI Wizard for {{ site.framework }} [exposes a number of events](/api/Kendo.Mvc.UI.Fluent/WizardEventBuilder) that allow you to control the behavior of the UI component.

For a complete example on basic Wizard events, refer to the [demo on using the events of the Wizard](https://demos.telerik.com/{{ site.platform }}/wizard/events).

## Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```HtmlHelper
    @(Html.Kendo().Wizard()
        .Name("wizard")
        .Events(e => e.Activate("onActivate"))
        ... //Additional configuration
    )

    <script>
        function onActivate(e){
            // Handle the Wizard Activate event that triggers when a new step has been selected upon user interaction.
        };
    </script>
```

{% if site.core %}
```TagHelper
    <kendo-wizard name="wizard" on-activate="onActivate">
      <!-- additional configuration -->
    </kendo-wizard>

    <script>
        function onActivate(e){
            // Handle the Wizard Activate event that triggers when a new step has been selected upon user interaction.
        };
    </script>
```
{% endif %}

## Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```HtmlHelper
    @(Html.Kendo().Wizard()
        .Name("wizard")
        .Events(e => e.Activate(@<text>
                function() {
                    // Handle the Wizard Activate event inline.
                }
            </text>)
        )
        ... //Additional configuration
    )
```

{% if site.core %}
```TagHelper
    <kendo-wizard name="wizard" 
        on-activate="function() {
            // Handle the Wizard Activate event inline.
        }">
    </kendo-wizard>
```
{% endif %}

## Next Steps

* [Using the Wizard Events (Demo)](https://demos.telerik.com/{{ site.platform }}/wizard/events)

## See Also

* [Wizard Server-Side API for {{ site.framework}}](/api/wizard)
* [Wizard Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/wizard)