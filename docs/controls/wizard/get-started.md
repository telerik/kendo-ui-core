---
title: Getting Started
page_title: jQuery Wizard Documentation - Getting Started with the Wizard
description: "Get started with the jQuery Wizard by Kendo UI and learn how to create, initialize, and enable the component."
slug: getting_started_kendoui_wizard_widget
position: 1
---

# Getting Started with the Wizard

This guide demonstrates how to get up and running with the Kendo UI for jQuery Wizard.

After the completion of this guide, you will be able to achieve the following end result:

```dojo
    <div id="wizard"></div>

    <script>
      $("#wizard").kendoWizard({
        steps: [
          { title: "Initial step"},
          { title: "Second step"},
          { title: "Final step"},
        ]
      });
    </script>
```

## 1. Create an Empty Div Element

First, create an empty `<div>` element on the page that will serve as the main container of the Wizard component.

```html
<div id="wizard"></div>
```

## 2. Initialize the Wizard

In this step, you will initialize the Wizard from the empty `<div>` element. All settings of the Wizard will be provided in the initialization script statement and you have to describe its layout and configuration in JavaScript.

```html
<div id="wizard"></div>

<script>
    // Target the div element by using jQuery and then call the kendoWizard() method.
    $("#wizard").kendoWizard();
</script>
```

## 3. Add the Steps of the Wizard

The Wizard provides different ways to display its data. In this guide, you will be using the [`steps`](/api/javascript/ui/wizard/configuration/steps) configuration which allows you to use an array to display the steps. For further information about the Wizard's content, check the [Content Article]({% slug content_wizard_widget %}).

```html
<div id="wizard"></div>

<script>
  $("#wizard").kendoWizard({
      steps: [
        { title: "Initial step"},
        { title: "Second step"},
        { title: "Final step"},
      ]
  });
</script>
```

## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Demo Page for the Kendo UI for jQuery Wizard](https://demos.telerik.com/kendo-ui/wizard/index)

## See Also

* [JavaScript API Reference of the jQuery Wizard](/api/javascript/ui/wizard)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>
