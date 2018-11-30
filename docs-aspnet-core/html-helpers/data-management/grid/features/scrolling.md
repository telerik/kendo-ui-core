---
title: Scrolling
page_title: Scrolling | Kendo UI Grid HtmlHelper for ASP.NET Core
description: "Learn how to enable the scrolling functionality of the Kendo UI Grid for ASP.NET Core."
slug: htmlhelpers_grid_aspnetcore_scrolling
position: 6
---

# Grid Scrolling

By default, the scrolling functionality of the Kendo UI Grid for ASP.NET Core is disabled.

The scrolling functionality of the Grid is controlled by the `Scrollable` property:

###### Example

```
@(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.Customer>()
    .Name("grid")
    .HtmlAttributes(new { style = "height: 380px;" })
    .Scrollable()
    ...
```

Apart from the standard scrolling of the Grid, there are two additional options: `Virtual` and `Endless`. The `Virtual` scrolling always displays a single page of data. Scrolling would just change the data which is currently displayed. The `Endless` scrolling will append new pages of data to the already rendered records.

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
