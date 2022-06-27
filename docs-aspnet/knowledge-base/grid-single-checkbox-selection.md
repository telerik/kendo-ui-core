---
title: Select Only One Grid Row with the Checkbox selectable column
description: Remove the master checkbox of the built-in checkbox column in the Telerik UI Grid. Limit the selection to ine selected Grid row only.
type: how-to
page_title: Limit the Selection to a Single Row
slug: grid-singe-checkbox-selection
tags: grid, checkbox, single, select, one, row, only
res_type: kb
---

## Environment

<table>
	<tbody>
        <tr>
			<td>Product</td>
			<td>Progress® Telerik® UI Grid for {{ site.product_short }}</td>
		</tr>
	</tbody>
</table>

## Description

I want to remove the master checkbox of the built-in checkbox column in the Telerik UI Grid. How can I limit the selection to one selected Grid row only?

## Solution
1. Remove the master checkbox by adding an empty header template to the column.
2. Subscribe for the [click](https://api.jquery.com/click/) event of the checkboxes by using a jQuery selector.
3. In the `click` event handler, get the row and the row classes by using the [closest](https://api.jquery.com/closest/) jQuery method.
4. Based on the row classes, use the [clearSelection](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/clearselection) method of the Grid.

```View

@(Html.Kendo().Grid<CheckboxSelectOneRowOnly.Models.OrderViewModel>()
    .Name("grid")
    .Columns(columns =>
    {
        columns.Select().Width(50).HeaderTemplate(h=>h);
        columns.Bound(p => p.OrderID).Filterable(false);
        columns.Bound(p => p.Freight);
        columns.Bound(p => p.OrderDate).Format("{0:MM/dd/yyyy}");
        columns.Bound(p => p.ShipName);
        columns.Bound(p => p.ShipCity);
    })
    .Pageable()
    .Sortable()
    .Scrollable()
    .Filterable()
    .HtmlAttributes(new { style = "height:550px;" })
    .DataSource(dataSource => dataSource
        .Ajax()
        .PageSize(20)
        .Read(read => read.Action("Orders_Read", "Grid"))
    )
)
```
```script.js
$(document).ready(function () {
        var grid = $("#grid").data("kendoGrid");
        grid.tbody.on("click", ".k-checkbox", onClick);
        function onClick(e) {
            var grid = $("#grid").data("kendoGrid");
            var row = $(e.target).closest("tr");

            if (row.hasClass("k-selected")) {
                setTimeout(function (e) {
                    var grid = $("#grid").data("kendoGrid");
                    grid.clearSelection();
                })
            } else {
                grid.clearSelection();
            };
        };
    })
```
```Controller
	public partial class GridController : Controller
    {
		public ActionResult Orders_Read([DataSourceRequest]DataSourceRequest request)
		{
			var result = Enumerable.Range(0, 50).Select(i => new OrderViewModel
			{
				OrderID = i,
				Freight = i * 10,
				OrderDate = DateTime.Now.AddDays(i),
				ShipName = "ShipName " + i,
				ShipCity = "ShipCity " + i
			});

			return Json(result.ToDataSourceResult(request));
		}
	}
```
```Model
    public class OrderViewModel
    {
        public int OrderID { get; internal set; }
        public int Freight { get; internal set; }
        public DateTime OrderDate { get; internal set; }
        public string ShipName { get; internal set; }
        public string ShipCity { get; internal set; }
    }
```
