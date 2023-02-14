---
title: Overview
page_title: jQuery Stepper Documentation
description: "Get started with the jQuery Stepper by Kendo UI and learn how to initialize the widget."
slug: overview_stepper_widget
position: 1
---

# Overview 

The Stepper is an intuitive UI component that visualizes progress by displaying a sequence of logical steps. The Stepper widget could also be used for navigational purposes.

* [Demo page for the Stepper](https://demos.telerik.com/kendo-ui/stepper/index) 

## Initializing the Stepper

To initialize the Stepper, use the `<nav>` tag.

The following example demonstrates how to initialize the Stepper from an existing `<nav>` element.

```dojo
    <nav id="stepper"></nav>

    <script>
        $(document).ready(function () {
            $("#stepper").kendoStepper({
                steps: [{
                    label: "First step"
                },{
                    label: "Second step",
                    selected: true
                },{
                    label: "Last step",
                    icon: "save"
                }]
            });
        });
    </script>
    
```

## Functionality and Features

* [Icons]({% slug icons_stepper_widget %})
* [Steps]({% slug steps_stepper_widget %})
* [Appearance]({% slug appearance_stepper_widget %})
* [Modes of operation]({% slug modes_stepper_widget %})
* [Accessibility]({% slug accessibility_kendoui_stepper_widget %})

## See Also

* [Basic usage of the Stepper](https://demos.telerik.com/kendo-ui/stepper/index)
* [JavaScript API Reference of the Stepper](/api/javascript/ui/stepper)
