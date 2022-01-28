---
title: Operation Modes
page_title: Operation Modes
description: "Learn how to configuration the operation mode of the widget."
slug: htmlhelpers_stepper_aspnetcore_operation_modes
position: 5
---

# Operation Modes

The {{ site.product }} Stepper provides a set of modes that define the way the user will interact with the Stepper.

By default, the user has to follow the Steps sequence. This behavior could be customized by configuring the `linear` configuration option. When set to `false` the user will be able to select any step, irrespective of the Step sequence.

The following example demonstrates how to allow the user to navigate to any Step of the Stepper, irrespective of the Step sequence.

```Razor
    @(Html.Kendo().Stepper()
        .Name("stepper")
        .Linear(false)
        .Steps(s =>
        {
            s.Add().Label("First Step");
            s.Add().Label("Second Step");
            s.Add().Label("Third Step");
        })
    )
```

## See Also

* [Basic Usage of the Stepper HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/stepper/index)
