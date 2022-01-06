---
title: Badge Button
page_title: Badge Button
description: "Include a badge and enhance the meaning of the text content of the Telerik UI Button HtmlHelper for {{ site.framework }}."
slug: badges_button_aspnetcore
position: 4
---

# Badge Button

The Button can accommodate a [Badge](https://docs.telerik.com/{{ site.platform }}/html-helpers/layout/badge/overview) to enhance the meaning of the text content.

The Button HtmlHelper provides the `Badge()` configuration method for configuring the Button's Badge. The [API](/api/Kendo.Mvc.UI.Fluent/ButtonBadgeSettingsBuilder) exposes methods you can use, including `Shape()`, `Size()`, `ThemeColor()`, `Position()`, `Fill()`,`Visible()` and `Align()` to customize the appearance of the Badge:

```
    @(Html.Kendo().Button()
        .Name("button")
        .Content("Click Me!")
        .Badge(b => b
            .Text("success")
            .Shape(BadgeShape.Pill)
            .Size(BadgeSize.Medium)
            .ThemeColor(BadgeColor.Info)
            .Position(BadgePosition.Edge)
            .Align(BadgeAlign.TopEnd)
        )
    )
```

 The `Icon()` method displays the appropriate [Kendo UI for jQuery font icon](https://docs.telerik.com/kendo-ui/styles-and-layout/icons-web) icon. The icon is rendered inside the badge by a `span.k-icon` or `span.k-svg-icon` element.

```
    @(Html.Kendo().Button()
        .Name("save")
        .Content("Save")
        .Badge(b => b
            .Shape(BadgeShape.Circle)
            .Size(BadgeSize.Large)
            .ThemeColor(BadgeColor.Success)
            .Position(BadgePosition.Edge)
            .Align(BadgeAlign.TopStart)
            .Icon("save")
        )
    )
```

## See Also

* [Adding Badges to the Button HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/button/badges)
* [Server-Side API](/api/button)
