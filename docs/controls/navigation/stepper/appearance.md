---
title: Appearance
page_title: jQuery Stepper Documentation
description: "Get started with the jQuery Stepper by Kendo UI and manage its appearance."
slug: appearance_stepper_widget
position: 5
---

# Appearance

The Stepper is rendered horizontally with an indictor element and a label for each Step. The Stepper provides the possibility to customize all of these configurations

## Orientation

The orientation of the Stepper could be configured via the [`orientation`](/api/javascript/ui/stepper/configuration/orientation) configuration property.

The following example demonstrates how to initialize a vertical Stepper from an existing `<nav>` element.

```dojo
    <nav id="stepper"></nav>

    <script>
        $(document).ready(function () {
            $("#stepper").kendoStepper({
                orientation: "vertical",
                steps: [{
                    label: "First step"
                },{
                    label: "Second step",
                },{
                    label: "Last step",
                }]
            });
        });
    </script>
    
```

## Layout

By default both the label and indicator of each Step are displayed. The Stepper layout could be configured via the [`label`](/api/javascript/ui/stepper/configuration/label) and [`indicator`](/api/javascript/ui/stepper/configuration/indicator) configuration properties.

The following example demonstrates how to initialize a Stepper from an existing `<nav>` element with only indicator elements displayed.

```dojo
    <nav id="stepper"></nav>

    <script>
        $(document).ready(function () {
            $("#stepper").kendoStepper({
                label: false,
                indicator: true,
                steps: [{
                    label: "First step"
                },{
                    label: "Second step",
                },{
                    label: "Last step",
                }]
            });
        });
    </script>
    
```

## See Also

* [Basic usage of the Stepper](https://demos.telerik.com/kendo-ui/stepper/index)
* [JavaScript API Reference of the Stepper](/api/javascript/ui/stepper)
