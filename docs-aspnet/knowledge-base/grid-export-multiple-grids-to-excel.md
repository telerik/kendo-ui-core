---
title: Exporting Multiple Grids to Excel
description: How can I export multiple Grids to the same Excel file when working with {{ site.product }}?
type: how-to
page_title: Exporting Multiple Grids to Excel.
slug: excel-export-multiple-grids
position:
tags: grid, export, excel, multiple
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>2022.2.621</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>Grid for ASP.NET Core</td>
		</tr>
	</tbody>
</table>


## Description

How can I export multiple Grids to the same Excel file?

## Solution

The example below relies on the following key steps:

1. Create an external button to export the data when it is clicked.
1. Use the client-side [`saveAsExcel` method](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/saveasexcel) to trigger the data export of each Grid.
1. Handle the [`ExcelExport`](https://docs.telerik.com/aspnet-core/api/kendo.mvc.ui.fluent/grideventbuilder#excelexportsystemstring) event of the two Grids and prevent their default action.
1. Create a new Workbook by using the sheets of the Grids Workbooks and save it through the [`kendo.saveAs()` method](https://docs.telerik.com/kendo-ui/api/javascript/kendo/methods/saveas).

```Index.cshtml
    //Export to Excel Button
    @(Html.Kendo().Button()
        .Name("exportData")
        .Content("Export to Excel")
        .Icon("file-excel")
        .Events(ev => ev.Click("exportDataClick"))
    )

    //First Grid
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.ProductViewModel>()
        .Name("products")
        .Columns(columns =>
        {
            columns.Bound(p => p.ProductName);
            columns.Bound(p => p.UnitPrice);
            columns.Bound(p => p.UnitsOnOrder);
            columns.Bound(p => p.UnitsInStock);
        })
        .Events(e => e.ExcelExport("products_excelExport"))
        .Pageable()
        .DataSource(dataSource => dataSource
            .Ajax()
            .PageSize(20)
            .Read(read => read.Action("Excel_Export_Read", "Grid"))
        )
    )
    //Second Grid
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()    
        .Name("orders")
        .Columns(columns => {
            columns.Bound(p => p.OrderID).Filterable(false).Width(100);
            columns.Bound(p => p.Freight).Width(100);
            columns.Bound(p => p.OrderDate).Format("{0:MM/dd/yyyy}").Width(140);
            columns.Bound(p => p.ShipName);
            columns.Bound(p => p.ShipCity).Width(150);
        })
        .Events(e => e.ExcelExport("orders_excelExport"))
        .Pageable()
        .DataSource(dataSource => dataSource
            .Ajax()
            .PageSize(20)
            .Read(read => read.Action("Orders_Read", "Grid"))
        )
    )
```
```JavaScript
    <script src="https://unpkg.com/jszip/dist/jszip.min.js"></script>
    <script>
        // Use Promises to sync the exports.
        var promises = [
            $.Deferred(),
            $.Deferred()
        ];

        function exportDataClick(e) { //"Export to Excel" button "click" event handler.
            // Trigger export of the "products" Grid.
            $("#products").data("kendoGrid").saveAsExcel();
            // Trigger export of the "orders" Grid.
            $("#orders").data("kendoGrid").saveAsExcel();
            // Wait for both exports to finish.
            $.when.apply(null, promises)
            .then(function (productsWorkbook, ordersWorkbook) {
                // Create a new workbook using the sheets of the "products" and "orders" workbooks.
                var sheets = [
                    productsWorkbook.sheets[0],
                    ordersWorkbook.sheets[0]
                ];
                sheets[0].title = "Products";
                sheets[1].title = "Orders";
                var workbook = new kendo.ooxml.Workbook({
                    sheets: sheets
                });
                // Save the new workbook.
                workbook.toDataURLAsync().then(function(dataURL) {
                    kendo.saveAs({
                        dataURI: dataURL,
                        fileName: "ProductsAndOrders.xlsx"
                    });
                });

                promises = [
                    $.Deferred(),
                    $.Deferred()
                ];
            });
        }
        function products_excelExport(e) { //"ExcelExport" event handler of "products" Grid.
            e.preventDefault();
            promises[0].resolve(e.workbook);
        }
        function orders_excelExport(e) { //"ExcelExport" event handler of "orders" Grid.
            e.preventDefault();
            promises[1].resolve(e.workbook);
        }
    </script>
```

For a runnable example based on the code above, refer to the REPL project on [exporting multiple Grids to Excel](https://netcorerepl.telerik.com/wcYKwCPR52YDsbfP56).

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})

* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)

{% if site.core %}
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-core-ui/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-mvc/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Telerik REPL: Exporting Multiple Grids to Excel](https://netcorerepl.telerik.com/wcYKwCPR52YDsbfP56)
* [Exporting to Excel (Overview)](https://docs.telerik.com/{{ site.platform }}/html-helpers/data-management/grid/export/excel-export)
* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
