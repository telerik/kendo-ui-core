---
title: Getting Started
page_title: jQuery Stepper Documentation - Getting Started with the Stepper
description: "Get started with the jQuery Stepper by Kendo UI and learn how to create, initialize, and enable the component."
slug: getting_started_kendoui_stepper_widget
position: 1
---

# Getting Started with the Stepper

This guide demonstrates how to get up and running with the Kendo UI for jQuery Stepper.

After the completion of this guide, you will be able to achieve the following end result:

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

## 1. Create an Empty Nav Element

First, create an empty `<nav>` element on the page that will serve as the main container of the Stepper component.

```html
    <nav id="stepper"></nav>
```

## 2. Initialize the Stepper

In this step, you will initialize the Stepper from the empty `<nav>` element. All settings of the Stepper will be provided in the initialization script statement and you have to describe its layout and configuration in JavaScript.

```html
<nav id="stepper"></nav>

<script>
    // Target the nav element by using jQuery and then call the kendoStepper() method.
    $("#stepper").kendoStepper();
</script>
```

## 3. Add the Steps

The component's [`steps`](/api/javascript/ui/stepper/configuration/steps) provide various options, such as icons, templates, labels, and others.

```html
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

## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Demo Page for the Kendo UI for jQuery Stepper](https://demos.telerik.com/kendo-ui/stepper/index)

## See Also

* [JavaScript API Reference of the jQuery Stepper](/api/javascript/ui/stepper)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>
