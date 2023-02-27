---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Wizard component for {{ site.framework }}."
slug: htmlhelpers_wizard_aspnetcore_overview
position: 0
---

# {{ site.framework }} Wizard Overview

{% if site.core %}
The Telerik UI Wizard TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI Wizard widget.
{% else %}
The Telerik UI Wizard HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI Wizard widget.
{% endif %}

The Wizard displays content in sequential, stepwise order. Each step of the Wizard component has content, which can be a [Form]({% slug htmlhelpers_form_aspnetcore_overview %}) or any other type of HTML content. The progress indicator shows the user the number of steps left toward the last step of the process.

* [Demo page for the Wizard HtmlHelper](https://demos.telerik.com/{{ site.platform }}/wizard/index)
{% if site.core %}
* [Demo page for the Wizard TagHelper](https://demos.telerik.com/aspnet-core/wizard/tag-helper)
{% endif %}

## Initializing the Wizard

The following example demonstrates how to define the Wizard.

```HtmlHelper
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
{% endif %}

## Functionality and Features

* [Form Integration]({% slug htmlhelpers_wizard_aspnetcore_form_integration %})&mdash;You can integrate the [Form component]({% slug htmlhelpers_form_aspnetcore_overview %}) inside a specified Wizard step.
* [Content]({% slug htmlhelpers_wizard_aspnetcore_content %})&mdash;The Wizard enables you to render static and asynchronous content.
* [Layout]({% slug htmlhelpers_wizard_aspnetcore_layout %})&mdash;You can control the layout of the Wizard based on your preferences.
* [Events]({% slug events_wizard %})&mdash;Subscribe to the Wizard events to implement any custom logic.
* [Accessibility]({% slug accessibility_aspnetcore_wizard %})&mdash;The Wizard is accessible for screen readers, supports WAI-ARIA attributes, and delivers [keyboard shortcuts]({% slug keynav_aspnetcore_wizard %}) for faster navigation.

## Next Steps

* [Getting Started with the Wizard]({% slug wizard_getting_started %})
* [Basic Usage of the Wizard HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/wizard/index)
{% if site.core %}
* [Basic Usage of the Wizard TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/wizard/index)
{% endif %}

## See Also

* [Using the Events of the Wizard for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/wizard/events)
* [Knowledge Base Section](/knowledge-base)
