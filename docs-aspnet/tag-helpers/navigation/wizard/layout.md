---
title: Layout
page_title: Layout
description: "Get started with the Telerik UI Wizard TagHelper for ASP.NET Core and learn how to customize its appearance."
slug: taghelpers_wizard_aspnetcore_layout
position: 3
---

# Layout

The Telerik UI Wizard TagHelper for ASP.NET Core Wizard supports customization of the layout of its child components.  

By default the Telerik UI for ASP.NET Core Wizard is rendered with a Stepper in a horizontal orientation above the content of the Wizard. The layout could be configured via the `content-position` configuration option. The available options allow you to display a vertical Stepper on the left or right side of the Wizard step content.

The following example demonstrates how to initialize a Wizard with a vertical Stepper and content rendered on the right side of the Stepper.

```tagHelper
    <kendo-wizard name="wizard" content-position="WizardContentPosition.Right">
        <wizard-steps>
            <wizard-step title="Initial step">
                <wizard-step-content>
                    <h1>Initial step content</h1>
                </wizard-step-content>
            </wizard-step>
            <wizard-step title="Second step">
                <wizard-step-content>
                    <h1>Second step content</h1>
                </wizard-step-content>
            </wizard-step>
            <wizard-step title="Final step">
                <wizard-step-content>
                    <h1>Final step content</h1>
                </wizard-step-content>
            </wizard-step>
        </wizard-steps>
    </kendo-wizard>
```

## See Also

* [Basic Usage of the Wizard TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/wizard/tag-helper)
