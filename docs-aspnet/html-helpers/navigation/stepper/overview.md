---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Stepper component for {{ site.framework }}."
slug: htmlhelpers_stepper_aspnetcore_overview
position: 1
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

## Events

You can subscribe to all Stepper events.

```TagHelper
    <kendo-stepper name="stepper" on-activate="onActivate" on-select="onSelect">
        <steps>
            <step label="First" icon="home"></step>
            <step label="Second" selected="true"></step>
            <step label="Third"></step>
            <step label="Fourth" enabled="false"></step>
            <step label="Fifth"></step>
        </steps>
    </kendo-stepper>

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

* [Icons]({% slug htmlhelpers_stepper_aspnetcore_icons %})
* [Steps]({% slug htmlhelpers_stepper_aspnetcore_steps %})
* [Appearance]({% slug htmlhelpers_stepper_aspnetcore_appearance %})
* [Operation modes]({% slug htmlhelpers_stepper_aspnetcore_operation_modes %})
* [Accessibility]({% slug accessibility_aspnetcore_stepper %})

## See Also

* [Basic Usage of the Stepper HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/stepper/index)
{% if site.core %}
* [Basic Usage of the Stepper TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/stepper/tag-helper)
{% endif %}
* [Using the API of the Stepper HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/stepper/api)
