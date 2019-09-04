---
title: Disabled ButtonGroup
page_title: Disabled ButtonGroup | Telerik UI ButtonGroup HtmlHelper for ASP.NET MVC
description: "Enable or disable the Telerik UI ButtonGroup HtmlHelper for ASP.NET MVC."
slug: disabled_buttongrouphelper_aspnetmvc
position: 2
---

# Disabled ButtonGroup

The Button provides options for setting its enabled and disabled state.  

To configure the ButtonGroup as initially disabled, use its `.Enable()` setting. The ButtonGroup can also be disabled or enabled with JavaScript by using its [`.Enable()`](/api//Kendo.Mvc.UI.Fluent/ButtonGroupBuilder#enablesystemboolean) method by setting a Boolean argument. 

The following example demonstrates how to enable and disable the ButtonGroup over the `.Enable()` configuration.

```Razor

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
```ASPX

        <%= Html.Kendo().ButtonGroup()
            .Name("select-period")
            .Enable(false)
            .Items(t =>
                {
                        t.Add().Text("Month");
                        t.Add().Text("Quarter");
                        t.Add().Text("Year");
                }) %>
```

## See Also

* [Basic Usage of the ButtonGroup HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/buttongroup)
* [Using the API of the ButtonGroup HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/buttongroup/api)
* [ButtonGroupBuilder Server-Side API](/api/Kendo.Mvc.UI.Fluent/ButtonGroupBuilder)
* [ButtonGroup Server-Side API](/api/buttongroup)
