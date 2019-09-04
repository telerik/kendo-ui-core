---
title: Overview
page_title: ButtonGroup Overview | Telerik UI for ASP.NET MVC HTML Helpers
description: "Learn the basics when working with the Telerik UI ButtonGroup HtmlHelper for ASP.NET MVC."
slug: overview_buttongrouphelper_aspnetmvc
position: 1
---

# ButtonGroup HtmlHelper Overview

The Telerik UI ButtonGroup HtmlHelper for ASP.NET MVC is a server-side wrapper for the Kendo UI ButtonGroup widget.

The ButtonGroup groups a series of buttons together on a single line.

* [Demo page for the ButtonGroup](https://demos.telerik.com/aspnet-mvc/buttongroup/index)

## Initializing the ButtonGroup

The following example demonstrates how to initialize the ButtonGroup.

```Razor

        @(Html.Kendo().ButtonGroup()
            .Name("select-period")
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
            .Items(t =>
                {
                        t.Add().Text("Month");
                        t.Add().Text("Quarter");
                        t.Add().Text("Year");
                }) %>
```

## Functionality and Features

* [Disabled ButtonGroup]({% slug disabled_buttongrouphelper_aspnetmvc %})
* [Icon ButtonGroup]({% slug icons_buttongrouphelper_aspnetmvc %})
* [Index]({% slug index_buttongrouphelper_aspnetmvc %})
* [Selection]({% slug selection_buttongrouphelper_aspnetmvc %})

## Events

For a complete example on basic ButtonGroup events, refer to the [demo on using the events of the ButtonGroup](https://demos.telerik.com/aspnet-mvc/buttongroup/events).

## Referencing Existing Instances

To reference an existing ButtonGroup instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [ButtonGroup client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/buttongroup).

## See Also

* [Basic Usage of the ButtonGroup HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/buttongroup)
* [Using the API of the ButtonGroup HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/buttongroup/api)
* [ButtonGroupBuilder Server-Side API](/api/Kendo.Mvc.UI.Fluent/ButtonGroupBuilder)
* [ButtonGroup Server-Side API](/api/buttongroup)
