---
title: Conditional Grid Properties 
description: Set grid properties conditionally.
type: how-to
page_title: Conditional Grid Settings
slug: grid-conditional-properties
position: 
tags: grid, definition
res_type: kb
---

## Environment
<table>
	<tbody>
    <tr>
			<td>Product</td>
			<td>Progress® Kendo UI® Grid for ASP.NET MVC</td>
		</tr>
	</tbody>
</table>


## Description
How can I set some of the Grid properties depending on a condition?

## Solution
You can achieve this requirement by defining the Grid to a variable instance and then apply the logic using `if` conditional statements. Finally, you can call the .Render() method to display the grid.

```C#
@{
    var isAdmin = true;

    var grid = (Html.Kendo().Grid<KendoGridProject.Models.OrderViewModel>()
                 .Name("grid")
                 .Columns(columns =>
                 {
                     columns.Bound(p => p.OrderID).Filterable(false);
                     columns.Bound(p => p.Freight);
                     columns.Bound(p => p.OrderDate).Format("{0:MM/dd/yyyy}");
                     columns.Bound(p => p.ShipName);
                     columns.Bound(p => p.ShipCity);
                 })
                 .Pageable()
                 .Scrollable()
                 .HtmlAttributes(new
                 {
                     style = "height:550px;"
                 })
                 .DataSource(dataSource => dataSource
                     .Ajax()
                     .PageSize(20)
                     .Model(m=>m.Id("OrderID"))
                     .Read(read => read.Action("Orders_Read", "Grid"))
                 )
             );

    if (isAdmin)
    {
        grid.Editable();
        grid.Sortable();
        grid.Filterable();
        grid.Sortable();
    }

    grid.Render();
}
```

