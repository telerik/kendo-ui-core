---
title: Steps
page_title: Steps
description: "Learn how to configure the steps of the widget."
slug: taghelpers_stepper_aspnetcore_steps
position: 2
---

# Steps

The `steps` configuration allows you to configure each Step of the Telerik UI for ASP.NET Core Stepper.

You can set the label and the icon of an indicator element and define whether they would be enabled and available for selection or not. You can further set teh step that would be selected when the widget is rendered. The configuration also allows you to also define whether a step would be in error state.

The following example demonstrates how the set the configuration for the Steps of the Stepper through the `steps` configuration.

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

## See Also

* [Basic Usage of the Stepper TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/stepper/tag-helper)
