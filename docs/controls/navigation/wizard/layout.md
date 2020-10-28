---
title: Layout
page_title: jQuery Wizard Documentation | Wizard Layout
description: "Get started with the jQuery Wizard by Kendo UI and manage its appearance."
slug: layout_wizard_widget
position: 4
---

# Layout

The Wizard supports configuration of its layout.

By default the Wizard is rendered with a [Stepper]({% slug overview_stepper_widget %}) navigation in a horizontal orientation above the content of the Wizard. The layout could be configured via the [`contentPosition`](/api/javascript/ui/wizard/configuration/contentposition) configuration property. The available options allow you also to display a vertical Stepper on the left or right side of the Wizard step content.

The following example demonstrates how to initialize a Wizard with a vertical Stepper, while the Wizard content is positioned to the left from the Stepper.

```dojo
    <div id="wizard"></div>

    <script>
        $("#wizard").kendoWizard({
            contentPosition: "left",
            steps: ["Initial step", "Second step", "Third step"]
        });
    </script>

```

## See Also

* [Basic usage of the Wizard](https://demos.telerik.com/kendo-ui/wizard/index)
* [JavaScript API Reference of the Wizard](/api/javascript/ui/wizard)
