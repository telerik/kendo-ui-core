---
title: Operation Modes
page_title: Operation Modes
description: "Learn how to configuration the operation mode of the widget."
slug: taghelpers_stepper_aspnetcore_operation_modes
position: 5
---

# Operation Modes

The Telerik UI for ASP.NET Core Stepper provides a set of modes that define the way the user will interact with the Stepper.

By default, the user has to follow the Steps sequence. This behavior could be customized by configuring the `linear` configuration option. When set to `false` the user will be able to select any step, irrespective of the Step sequence.

The following example demonstrates how to allow the user to navigate to any Step of the Stepper, irrespective of the Step sequence.

```tagHelper
    <kendo-stepper name="stepper" linear="false" >
        <steps>
            <step label="First"></step>
            <step label="Second"></step>
            <step label="Third"></step>
        </steps>
    </kendo-stepper>
```

## See Also

* [Basic Usage of the Stepper TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/stepper/tag-helper)
