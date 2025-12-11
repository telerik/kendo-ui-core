---
title: Overview
page_title: Overview
description: "The Telerik UI Stepper component for {{ site.framework }} provides a styled UI component for progressive handling of workflow."
components: ["stepper"]
slug: htmlhelpers_stepper_aspnetcore_overview
position: 0
---

# {{ site.framework }} Stepper Overview

{% if site.core %}
The Telerik UI Stepper TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI Stepper widget.
{% else %}
The Telerik UI Stepper HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI Stepper widget.
{% endif %}

The Stepper is an intuitive UI component that visualizes progress by displaying a sequence of logical steps. The Stepper widget could also be used for navigational purposes.

* [Demo page for the Stepper TagHelper](https://demos.telerik.com/{{ site.platform }}/stepper/index)
{% if site.core %}
* [Demo page for the Stepper HtmlHelper](https://demos.telerik.com/aspnet-core/stepper/tag-helper)
{% endif %}

## Initializing the Stepper

The following example demonstrates how to define the Stepper.

```HtmlHelper
    @(Html.Kendo().Stepper()
        .Name("stepper")
    )
```
{% if site.core %}
```TagHelper
    <kendo-stepper name="stepper">
    </kendo-stepper>
```
{% endif %}

## Basic Configuration

The following example demonstrates the basic configuration for the Stepper.

```HtmlHelper
    @(Html.Kendo().Stepper()
        .Name("stepper")
        .Steps(s =>
        {
            s.Add().Label("First Step");
            s.Add().Label("Second Step").Selected(true);
            s.Add().Label("Last Step").Icon("save");
        })
    )

    <script>
    $(function() {
        // The Name() of the Stepper is used to get its client-side instance.
        var stepper = $("#stepper").data("kendoStepper");
    });
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-stepper name="stepper">
        <steps>
            <step label="First" icon="home"></step>
            <step label="Second" selected="true"></step>
            <step label="Third"></step>
            <step label="Fourth" enabled="false"></step>
            <step label="Fifth"></step>
        </steps>
    </kendo-stepper>
```
{% endif %}

## Functionality and Features

* [Icons]({% slug htmlhelpers_stepper_aspnetcore_icons %})&mdash;The Stepper enables you to customize the rendered icons.
* [Steps]({% slug htmlhelpers_stepper_aspnetcore_steps %})&mdash;The component provides different configuration options for its steps.
* [Appearance]({% slug htmlhelpers_stepper_aspnetcore_appearance %})&mdash;The Stepper enables you to customize its final appearance.
* [Operation modes]({% slug htmlhelpers_stepper_aspnetcore_operation_modes %})&mdash;The component provides the capability of operation modes.
* [Accessibility]({% slug htmlhelpers_stepper_accessibility %})&mdash;The Stepper is compatible with the global accessibility requirements.

## Next Steps

* [Getting Started with the Stepper]({% slug aspnetcore_stepper_getting_started %})
* [Basic Usage of the Stepper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/stepper/index)
{% if site.core %}
* [Stepper in Razor Pages]({% slug htmlhelpers_stepper_razorpage_aspnetcore %})
{% endif %}

## See Also

* [Using the API of the Stepper (Demo)](https://demos.telerik.com/{{ site.platform }}/stepper/api)
* [Knowledge Base Section](/knowledge-base)
