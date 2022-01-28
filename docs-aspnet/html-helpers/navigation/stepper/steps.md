---
title: Steps
page_title: Steps
description: "Learn how to configure the steps of the widget."
slug: htmlhelpers_stepper_aspnetcore_steps
position: 2
---

# Steps

The `steps` configuration allows you to configure each Step of the {{ site.product }} Stepper.

You can set the label and the icon of an indicator element and define whether they would be enabled and available for selection or not. You can further set teh step that would be selected when the widget is rendered. The configuration also allows you to also define whether a step would be in error state.

The following example demonstrates how the set the configuration for the Steps of the Stepper through the `steps` configuration.

```Razor
    @(Html.Kendo().stepper()
        .Name("stepper")
        .Steps(s =>
        {
            s.Add().Label("First Step").Icon("home");
            s.Add().Label("Second Step").Icon("attachment").Error(true);
            s.Add().Label("Third Step").Icon("preview").Selected(true);
            s.Add().Label("Last Step").Icon("save").Enabled(false);
        })
    )
```

## See Also

* [Basic Usage of the Stepper HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/stepper/index)
