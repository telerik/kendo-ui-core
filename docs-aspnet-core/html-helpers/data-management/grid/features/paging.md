---
title: Paging
page_title: Paging | Kendo UI Grid HtmlHelper for ASP.NET Core
description: "Learn how to enable the paging functionality of the Kendo UI Grid for ASP.NET Core."
slug: htmlhelpers_grid_aspnetcore_paging
position: 1
---

# Grid Paging

By default, the paging functionality of the Kendo UI Grid for ASP.NET Core is disabled.

The paging functionality of the Grid is controlled by the `Pageable` option. 

Additionally, you have to specify the number of records to display on each page by setting the `PageSize` on the DataSource:

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

Try to do paging operations on the server to keep away from including too much data in the HTML, which might slow down page performance. To accomplish this, keep the `ServerOperation` of the DataSource to `true` (the default value).

You can change the available page sizes from which the user could choose from with an array with integer values set to the PageSizes property:

###### Example

    .Pageable(p=> {
        p.PageSizes(new[] { 5, 10, 30 });
    })
	  

It is always recommended to use as small page sizes as possible, because rendering too many records could cause performance issues, especially when there are many columns or complex templates for the cells.	  
	  