---
title: Paging
page_title: Paging | Telerik UI Grid HtmlHelper for ASP.NET Core
description: "Learn how to enable the paging functionality of the Telerik UI Grid for ASP.NET Core."
slug: htmlhelpers_grid_aspnetcore_paging
position: 1
---

# Paging

By default, the paging functionality of the Telerik UI Grid for ASP.NET Core is disabled.

To control the paging in the Grid, use the `Pageable` option. Additionally, you have to specify the number of records to display on each page by setting the `PageSize` on the DataSource.

###### Example

	@(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
		  .Name("Grid")  
          ...		  
		  .Pageable()
		  .DataSource(dataSource => dataSource
			    .Ajax()
				.PageSize(15)
				...
		  )
	)

Try to do paging operations on the server to keep away from including too much data in the HTML which might slow down page performance. To accomplish this, keep the `ServerOperation` of the DataSource to `true` (the default value).

You can change the available page sizes from which the user can choose with an array with integer values that are set to the `PageSizes` property.

###### Example

    .Pageable(p=> {
        p.PageSizes(new[] { 5, 10, 30 });
    })


It is always recommended to use as small page sizes as possible, because rendering too many records causes performance issues especially when the Grid renders many columns or complex templates for its cells.	  

## See Also

* [Paging by the Grid HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/grid/aggregates)
* [Setting the Pager Visibility in the Grid HtmlHelper for ASP.NET Core](https://demos.telerik.com/aspnet-core/grid/pager-visibility)
* [JavaScript API Reference of the Grid HtmlHelper for ASP.NET Core](/api/grid)
