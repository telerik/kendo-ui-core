---
title: Operation Modes
page_title: jQuery Stepper Documentation
description: "Get started with the jQuery Stepper by Kendo UI and configure its mode of operation."
slug: modes_stepper_widget
position: 4
---

# Operation Modes

The Stepper provides a set of modes that define the way the user will interact with the Stepper.

By default, the user has to follow the Steps sequence. This behavior could be customized by configuring the [`linear`](/api/javascript/ui/stepper/configuration/linear) configuration option. When set to `false` the user will be able to select any step, irrespective of the Step sequence.

The following example demonstrates how to allow the user to navigate to any Step of the Stepper, irrespective of the Step sequence.

```dojo
    <nav id="stepper"></nav>

    <script>
        $(document).ready(function () {
            $("#stepper").kendoStepper({
                linear: false,
                steps: [{
                    label: "First step"
                },{
                    label: "Second step",
                },{
                    label: "Third step",
                }]
            });
        });
    </script>
    
```

## See Also

* [Basic usage of the Stepper](https://demos.telerik.com/kendo-ui/stepper/index)
* [JavaScript API Reference of the Stepper](/api/javascript/ui/stepper)
