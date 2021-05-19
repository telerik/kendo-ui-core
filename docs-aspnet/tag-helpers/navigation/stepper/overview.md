---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Stepper TagHelper for ASP.NET Core."
slug: taghelpers_stepper_aspnetcore_overview
position: 1
---

# Stepper TagHelper Overview

The Telerik UI Stepper TagHelper for ASP.NET Core is a server-side wrapper for the Kendo UI Stepper widget.

The Stepper is an intuitive UI component that visualizes progress by displaying a sequence of logical steps. The Stepper widget could also be used for navigational purposes.

* [Demo page for the Stepper](https://demos.telerik.com/aspnet-core/stepper/tag-helper)

## Basic Configuration

The following example demonstrates the basic configuration for the Stepper TagHelper.

```tagHelper
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

## Functionality and Features

* [Icons]({% slug taghelpers_stepper_aspnetcore_icons %})
* [Steps]({% slug taghelpers_stepper_aspnetcore_steps %})
* [Appearance]({% slug taghelpers_stepper_aspnetcore_appearance %})
* [Operation modes]({% slug taghelpers_stepper_aspnetcore_operation_modes %})

## Events

You can subscribe to all Stepper events.

```tagHelper
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

## See Also

* [Basic Usage of the Stepper TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/stepper/tag-helper)
