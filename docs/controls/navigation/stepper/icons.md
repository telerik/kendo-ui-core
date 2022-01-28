---
title: Icons
page_title: jQuery Stepper Documentation
description: "Get started with the jQuery Stepper by Kendo UI and learn how to configure the icons of the steps."
slug: icons_stepper_widget
position: 3
---

# Icons

The Stepper provides to option to configure the icon of each Step.

## Step Icon

By default the Stepper displays the number of each step in the indictor element of the Step. The Step icon can be configured via the [`steps.icon`](/api/javascript/ui/stepper/configuration/steps) configuration property to an existing icon in the Kendo UI theme sprite. For a list of available icons, refer to the [Web Font Icons article](https://docs.telerik.com/kendo-ui/styles-and-layout/icons-web).

### Example

The following example demonstrates how to configure different icons.
```dojo
<nav id="stepper"></nav>

    <script>
        $(document).ready(function () {
            $("#stepper").kendoStepper({
                steps: [{
                    label: "First step",
                    icon:"home"
                },{
                    label: "Second step",
                    icon: "attachment"
                },{
                    label: "Last step",
                    icon: "save"
                }]
            });
        });
    </script>

```

## See Also

* [JavaScript API Reference of the Stepper](/api/javascript/ui/stepper)
* [Icons of the Stepper (Demo)](https://demos.telerik.com/kendo-ui/stepper/icons)
