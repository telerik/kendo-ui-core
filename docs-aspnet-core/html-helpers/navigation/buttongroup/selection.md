---
title: Selection
page_title: Selection | Kendo UI ButtonGroup HtmlHelper for ASP.NET Core
description: "Restrict the number of selectable Buttons within the Kendo UI ButtonGroup HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: selection_buttongroup_aspnetcore
position: 5
---

# Selection

You can restrict the number of Buttons that can be selected by using the `.Selection()` property of each Button within the ButtonGroup.

The property can be configured for a `single` or `multiple` selection. For more information on the [`selection` setting of the ButtonGroup](http://docs.telerik.com/kendo-ui/api/javascript/ui/buttongroup#configuration-selection), refer to the [API of the ButtonGroup control](http://docs.telerik.com/kendo-ui/api/javascript/ui/buttongroup).

The following example demonstrates how to use the `.Selection()` configuration.

```
    @(Html.Kendo().ButtonGroup()
        .Name("select-period")
        .Selection("multiple")
        .Items(t =>
            {
                    t.Add().Text("Month");
                    t.Add().Text("Quarter");
                    t.Add().Text("Year");
            }))
```

## See Also

* [Selection by the Kendo UI ButtonGroup HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/buttongroup/selection)
* [JavaScript API Reference of the ButtonGroup](http://docs.telerik.com/kendo-ui/api/javascript/ui/buttongroup)
