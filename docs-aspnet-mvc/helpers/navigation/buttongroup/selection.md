---
title: Selection
page_title: Selection | Telerik UI ButtonGroup HtmlHelper for ASP.NET MVC
description: "Restrict the number of selectable Buttons within the Telerik UI ButtonGroup HtmlHelper for ASP.NET MVC."
slug: selection_buttongrouphelper_aspnetmvc
position: 5
---

# Selection

You can restrict the number of Buttons that can be selected by using the `.Selection()` property of each Button within the ButtonGroup.

The property can be configured for a `single` or `multiple` selection.

The following example demonstrates how to use the `.Selection()` configuration.

```Razor

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
```ASPX

        <%= Html.Kendo().ButtonGroup()
            .Name("select-period")
            .Selection("multiple")
            .Items(t =>
                {
                        t.Add().Text("Month");
                        t.Add().Text("Quarter");
                        t.Add().Text("Year");
                }) %>
```

## See Also

* [Selection by the Telerik UI ButtonGroup HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/buttongroup/selection)
* [ButtonGroupBuilder Server-Side API](/api/Kendo.Mvc.UI.Fluent/ButtonGroupBuilder)
* [ButtonGroup Server-Side API](/api/buttongroup)
