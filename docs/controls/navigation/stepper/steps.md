---
title: Steps
page_title: jQuery Stepper Documentation
description: "Get started with the jQuery Stepper by Kendo UI and learn how to configure the steps."
slug: steps_stepper_widget
position: 2
---

# Steps 

The `steps` configuration allows you to configure each Step of the Stepper.

You can set the label and the icon of an indicator element and define whether they would be enabled and available for selection or not. You can further set teh step that would be selected when the widget is rendered. The configuration also allows you to also define whether a step would be in error state.

The following example demonstrates how the set the configuration for the Steps of the Stepper through the [`steps`](/api/javascript/ui/stepper/configuration/steps) configuration.

```dojo
    <nav id="stepper"></nav>

    <script>
        $(document).ready(function () {
            $("#stepper").kendoStepper({
                steps: [{
                    label: "First step",
                    icon:"home",
                },{
                    label: "Second step",
                    icon: "attachment",
                    error: true
                },{
                    label: "Preview",
                    icon: "preview",
                    selected: true
                },{
                    label: "Last step",
                    icon: "save",
                    enabled: false
                }]
            });
        });
    </script>
    
```

## See Also

* [Basic usage of the Stepper](https://demos.telerik.com/kendo-ui/stepper/index)
* [JavaScript API Reference of the Stepper](/api/javascript/ui/stepper)
