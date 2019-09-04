---
title: Index
page_title: Index | Telerik UI ButtonGroup HtmlHelper for ASP.NET MVC
description: "Configure the initially selected index of the Telerik UI ButtonGroup HtmlHelper for ASP.NET MVC."
slug: index_buttongrouphelper_aspnetmvc
position: 4
---

# Index

You can configure the initially selected index of the Telerik UI ButtonGroup by using its `index` property.

You can also select an index through the `select()` method with a Integer argument.

The following example demonstrates how to select a button by its index.

```Razor

        @(Html.Kendo().ButtonGroup()
            .Name("select-period")
            .Index(1)
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
            .Index(1)
            .Items(t =>
                {
                        t.Add().Text("Month");
                        t.Add().Text("Quarter");
                        t.Add().Text("Year");
                }) %>
```

## See Also

* [Basic Usage of the ButtonGroup HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/buttongroup)
* [ButtonGroupBuilder Server-Side API](/api/Kendo.Mvc.UI.Fluent/ButtonGroupBuilder)
* [ButtonGroup Server-Side API](/api/buttongroup)
