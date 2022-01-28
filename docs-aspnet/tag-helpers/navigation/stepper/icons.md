---
title: Icons
page_title: Icons
description: "Learn how to configure the icons of the items and the delimiters of the widget."
slug: taghelpers_stepper_aspnetcore_icons
position: 3
---

# Icons

The Telerik UI for ASP.NET Core Stepper provides to option to configure the icon of each Step.

## Step Icon

By default the Stepper displays the number of each step in the indictor element of the Step. The Step icon can be configured via the `steps.icon` configuration property to an existing icon in the Kendo UI theme sprite. For a list of available icons, refer to the [Web Font Icons article](https://docs.telerik.com/kendo-ui/styles-and-layout/icons-web).

### Example

The following example demonstrates how to configure different icons.

```tagHelper
    <kendo-stepper name="stepper">
        <steps>
            <step label="First" icon="home"></step>
            <step label="Second" icon="attachment"></step>
            <step label="Third" icon="save"></step>
        </steps>
    </kendo-stepper>
```

## See Also

* [Basic Usage of the Stepper TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/stepper/tag-helper)

