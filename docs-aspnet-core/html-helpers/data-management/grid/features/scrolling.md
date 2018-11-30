---
title: Scrolling
page_title: Scrolling | Kendo UI Grid HtmlHelper for ASP.NET Core
description: "Learn how to enable the scrolling functionality of the Kendo UI Grid for ASP.NET Core."
slug: htmlhelpers_grid_aspnetcore_scrolling
position: 6
---

# Scrolling

By default, the scrolling functionality of the Kendo UI Grid for ASP.NET Core is disabled.

To control scrolling in the Grid, use the `Scrollable` property.

###### Example

```
@(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.Customer>()
    .Name("grid")
    .HtmlAttributes(new { style = "height: 380px;" })
    .Scrollable()
    ...
```

Apart from the standard scrolling of the Grid, you can use the additional `Virtual` and `Endless` options. The `Virtual` scrolling always displays a single page of data. Scrolling only changes the data which is currently displayed. The `Endless` scrolling mode appends new pages of data to the already rendered records.

###### Example

```
@(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
    .Name("grid")
    .Scrollable(scrollable => scrollable.Virtual(true))
    .HtmlAttributes(new { style = "height:430px;" })
    .DataSource(dataSource => dataSource
        .Ajax()
        .PageSize(100)
		...
)
```

The `Endless` scrolling is suitable for limited number of records, because after some point the browser will start to freeze (due to the amount of DOM elements on the page). For huge amount of records it is recommended to use `Virtual` scrolling or standard paging.

## See Also

* [JavaScript API Reference of the Grid](http://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Grid HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/grid/overview)
* [Grid Official Demos](http://demos.telerik.com/aspnet-core/grid/index)
* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
