---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI Stepper component for {{ site.framework }}."
slug: stepper_events
position: 6
---

# Events

You can subscribe to [all client-side events](/api/kendo.mvc.ui.fluent/steppereventbuilder) and then use them to further customize the behavior of the Stepper.

The example below demonstrates how to handle the [`Activate`](/api/kendo.mvc.ui.fluent/steppereventbuilder#activatesystemstring) and [`Select`](/api/kendo.mvc.ui.fluent/steppereventbuilder#selectsystemstring) events that the Stepper triggers when a specified step is selected.

```HtmlHelper
    @using Kendo.Mvc.UI

    @(Html.Kendo().Stepper()
        .Name("stepper")
        .Steps(s =>
        {
            s.Add().Label("First step");
            s.Add().Label("Second step");
            s.Add().Label("Third step");
            s.Add().Label("Fourth step");
            s.Add().Label("Fifth step");
        })
        .Events(events => events.Activate("onActivate").Select("onSelect"))
    )

<script>
    function onActivate(e) {
        kendoConsole.log("Activated: " + e.step.options.label);
    }

    function onSelect(e) {
        kendoConsole.log("Selected: " + e.step.options.label);
    }
</script>
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-stepper name="stepper" on-activate="onActivate" on-select="onSelect">
        <steps>
            <step label="First step">
            </step>
            <step label="Second step">
            </step>
            <step label="Third step">
            </step>
            <step label="Fourth step">
            </step>
            <step label="Fifth step">
            </step>
        </steps>
    </kendo-stepper>

<script>
    function onActivate(e) {
        kendoConsole.log("Activated: " + e.step.options.label);
    }

    function onSelect(e) {
        kendoConsole.log("Selected: " + e.step.options.label);
    }
</script>
```
{% endif %}

## Next Steps

* [API for Configuring the Stepper Events](/api/kendo.mvc.ui.fluent/steppereventbuilder)
* [Using the Stepper Events (Demo)](https://demos.telerik.com/{{ site.platform }}/stepper/events)

## See Also

* [Using the API of the Stepper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/stepper/api)
