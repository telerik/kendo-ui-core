---
title: Icons
page_title: Icons
description: "Learn how to configure the icons of the items and the delimiters of the widget."
slug: htmlhelpers_stepper_aspnetcore_icons
position: 3
---

# Icons

The {{ site.product }} Stepper provides to option to configure the icon of each Step.

## Step Icon

By default the Stepper displays the number of each step in the indictor element of the Step. The Step icon can be configured via the `steps.icon` configuration property to an existing icon in the Kendo UI theme sprite. For a list of available icons, refer to the [Web Font Icons article](https://docs.telerik.com/kendo-ui/styles-and-layout/icons-web).

### Example

The following example demonstrates how to configure different icons.

```Razor
    @(Html.Kendo().Stepper()
        .Name("stepper")
        .Steps(s =>
        {
            s.Add().Label("First Step").Icon("home");
            s.Add().Label("Second Step").Icon("attachment");
            s.Add().Label("Last Step").Icon("save");
        })
    )
```

## See Also

* [Icons of the Stepper HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/stepper/icons)
