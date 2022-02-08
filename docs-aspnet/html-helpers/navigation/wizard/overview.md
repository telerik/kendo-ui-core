---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Wizard component for {{ site.framework }}."
slug: htmlhelpers_wizard_aspnetcore_overview
position: 1
---

# Wizard Overview

{% if site.core %}
The Telerik UI Wizard TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI Wizard widget.
{% else %}
The Telerik UI Wizard HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI Wizard widget.
{% endif %}

The Wizard displays content in sequential, stepwise order. Each step of the Kendo UI Wizard has content, which can be a form or any other type of HTML content.

* [Demo page for the Wizard HtmlHelper](https://demos.telerik.com/{{ site.platform }}/wizard/index)
{% if site.core %}
* [Demo page for the Wizard TagHelper](https://demos.telerik.com/aspnet-core/wizard/tag-helper)
{% endif %}

## Initializing the Wizard

The following example demonstrates how to define the Wizard.

```Razor
    @(Html.Kendo().Wizard()
        .Name("wizard")
        .Steps(s=> {
            s.Add().Content("Initial Step");
            s.Add().Content("Second Step");
            s.Add().Content("Final Step");
        })
    )

    <script>
    $(function() {
        // The Name() of the Wizard is used to get its client-side instance.
        var wizard = $("#wizard").data("kendoWizard");
    });
    </script>
```
{% if site.core %}
```TagHelper
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

## Events

You can subscribe to all Wizard events.

```TagHelper
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
{% endif %}

## Functionality and Features

* [Form Integration]({% slug htmlhelpers_wizard_aspnetcore_form_integration %})
* [Content]({% slug htmlhelpers_wizard_aspnetcore_content %})
* [Layout]({% slug htmlhelpers_wizard_aspnetcore_layout %})
* [Accessibility]({% slug accessibility_aspnetcore_wizard %})

## See Also

* [Basic Usage of the Wizard HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/wizard/index)
{% if site.core %}
* [Basic Usage of the Wizard TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/wizard/tag-helper)
{% endif %}
