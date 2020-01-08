---
title: Paging
page_title: Paging
description: "Learn how to enable the paging functionality of the Telerik UI Grid for {{ site.framework }}."
slug: htmlhelpers_grid_aspnetcore_paging
position: 6
---

# Paging

By default, the paging functionality of the Telerik UI Grid for {{ site.framework }} is disabled.

For a runnable example, refer to the [demo on paging by the Grid](https://demos.telerik.com/{{ site.platform }}/grid/paging).

To control the paging in the Grid, use the `Pageable` option. Additionally, you have to specify the number of records to display on each page by setting the `PageSize` on the DataSource.

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

Try to do paging operations on the server to avoid including too much data in the HTML which might slow down page performance. To accomplish this, keep the `ServerOperation` of the DataSource to `true` (the default value).

You can change the available page sizes from which the user can choose with an array with integer values that are set to the `PageSizes` property.

    .Pageable(p=> {
        p.PageSizes(new[] { 5, 10, 30 });
    })

Use as small page sizes as possible, because rendering too many records causes performance issues especially when the Grid renders many columns or complex templates for its cells.	  

## See Also

* [Paging by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/aggregates)
* [Setting the Pager Visibility in the Grid HtmlHelper for {{ site.framework }}](https://demos.telerik.com/{{ site.platform }}/grid/pager-visibility)
* [Server-Side API](/api/grid)
