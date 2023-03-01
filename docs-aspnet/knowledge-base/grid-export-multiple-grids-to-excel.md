---
title: Export Multiple Grids to Excel.
description: How can I export multiple Grids to the same Excel file?
type: how-to
page_title: Export multiple Grids to Excel.
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
1. Handle the [`ExcelExport`](https://docs.telerik.com/aspnet-core/api/Kendo.Mvc.UI.Fluent/GridEventBuilder#excelexportsystemstring) event of the two Grids and prevent their default action.
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
    <script src="//cdnjs.cloudflare.com/ajax/libs/jszip/2.4.0/jszip.min.js"></script>
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
                kendo.saveAs({
                    dataURI: workbook.toDataURL(),
                    fileName: "ProductsAndOrders.xlsx"
                })
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

Refer to [this REPL](https://netcorerepl.telerik.com/wcYKwCPR52YDsbfP56) for a runnable example.

## See Also
 * [Excel Export Overview](https://docs.telerik.com/kendo-ui/framework/excel/introduction)
 * [kendo.ooxml.Workbook client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ooxml/workbook)
