---
title: Disabled ButtonGroup
page_title: Disabled ButtonGroup | Telerik UI ButtonGroup HtmlHelper for ASP.NET Core
description: "Enable or disable the Telerik UI ButtonGroup HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: disabled_buttongroup_aspnetcore
position: 2
---

# Disabled ButtonGroup

The Button provides options for setting its enabled and disabled state.  

To configure the ButtonGroup as initially disabled, use its `.Enable()` setting. The ButtonGroup can also be disabled or enabled with JavaScript by using its `.Enable()` method by setting a Boolean argument.

The following example demonstrates how to enable and disable the ButtonGroup over the `.Enable()` configuration.

```
    @(Html.Kendo().ButtonGroup()
        .Name("select-period")
        .Enable(false)
        .Items(t =>
            {
                    t.Add().Text("Month");
                    t.Add().Text("Quarter");
                    t.Add().Text("Year");
            }))
```

## See Also

* [Server-Side API](/api/buttongroup)
