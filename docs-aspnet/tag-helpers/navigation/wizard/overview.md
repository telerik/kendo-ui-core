---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Wizard TagHelper for ASP.NET Core."
slug: taghelpers_wizard_aspnetcore_overview
position: 1
---

# Wizard TagHelper Overview

The Telerik UI Wizard TagHelper for ASP.NET Core is a server-side wrapper for the Kendo UI Wizard widget.

The Wizard displays content in sequential, stepwise order. Each step of the Kendo UI Wizard has content, which can be a form or any other type of HTML content.

* [Demo page for the Wizard](https://demos.telerik.com/aspnet-core/wizard/tag-helper)

## Basic Configuration

The following example demonstrates the basic configuration for the Wizard TagHelper.

```tagHelper
    <kendo-wizard name="wizard">
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

## Functionality and Features

* [Content]({% slug taghelpers_wizard_aspnetcore_content %})
* [Layout]({% slug taghelpers_wizard_aspnetcore_layout %})

## Events

You can subscribe to all Wizard events.

```tagHelper
    <kendo-wizard name="wizard" on-activate="onActivate" on-select="onSelect">
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

    <script>
        function onActivate(e) {
            console.log("Activated: " + e.step.options.label);
        }

        function onSelect(e) {
            console.log("Selected: " + e.step.options.label);
        }
    </script>
```

## See Also

* [Basic Usage of the Wizard TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/wizard/tag-helper)
