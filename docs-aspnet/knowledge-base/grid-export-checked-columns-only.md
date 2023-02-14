---
title: Exporting Checked Columns Only in the Grid
page_title: Exporting Checked Columns Only in the Grid
description: "An example on how to create Excel documents by exporting the checked columns only in the {{ site.product }} Grid."
slug: grid-export-checked-columns-only
tags: telerik, grid, export, checked, columns, only, rows, excel
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Grid</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2022.3.1109 version</td>
 </tr>
</table>

## Description

How can I create Excel documents by exporting the checked columns only in the {{ site.product }} Grid component?


## Solution

To achieve the desired scenario:

1. To handle the Excel export of the Grid, subscribe to the [`ExcelExport`](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/GridEventBuilder#excelexportsystemstring) event.
1. Enable the rows' persistence upon selection by using the [`.PersistSelection`](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/GridBuilder#persistselectionsystemboolean) configuration method.
1. Within the handler, obtain the fields of the columns that you are going to add by using the client-side [`.columns()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns) method the Grid provides and map them to a **key-value** pair by using the [`.map()`](https://api.jquery.com/jquery.map/) method. 
1. Push the cell headers from the previously obtained column fields.
1. From there, get the selected Grid rows by using the built-in [`.selectedKeyNames()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/selectedkeynames) method, traverse through each of the items, and push their column values with the help of the previously obtained Grid column fields.
1. Create a common function that will be responsible for creating the workbook document.

```Index.cshtml
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/2.4.0/jszip.js"></script> // To take full advantage of the Excel export   feature, download the JSZip library and include the file.

    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.ProductViewModel>()
        .Name("grid")
        .Columns(columns =>
        {
            columns.Select().Width(50);
            columns.Bound(p => p.ProductName);
            columns.Bound(p => p.UnitPrice).Width(100);
            columns.Bound(p => p.UnitsInStock).Width(100);
            columns.Bound(p => p.Discontinued).Width(100);
        })
        .ToolBar(t => t.Excel())
        .Excel(e => e.AllPages(true))
        .Pageable()
        .PersistSelection()
        .Sortable()
        .Events(events => events.ExcelExport("onExcelExport"))
        .DataSource(dataSource => dataSource
            .Ajax()
            .Model(model => model.Id(p => p.ProductID))
            .Read(read => read.Action("Selection_Read", "Grid"))
        )
    )
```
```Script.js
    <script>
        function onExcelExport(e) {
            e.preventDefault();
            var grid = e.sender;

            var gridColumns = e.sender.columns.map(column => {
                return {value: column.field}; // Map the columns names to an object that will be later passed to the workbook rows.
            }).filter(item => item.value != undefined); // Filter the grid columns in order to remove the select row.

            var selectedIds = grid.selectedKeyNames(); // Get the selected rows.
            var selectedDataItems = e.data.filter((el) => {
                return selectedIds.some((f) => {
                    return f == el.ProductID; // Filter the selected data items based on the id field.
                })
            })

            var rows = [{ // Predefine the cell headers that will be included in the excel file.
                cells: gridColumns // Pass in the previously obtained columns.
            }];
            var rowValues = selectedDataItems.forEach(item => { // Traverse through each of the selected items.
                cells = []; // Store the to-be-defined cells.
                gridColumns.forEach(field => { // Loop through each of the column fields.
                   console.log(field.value);
                   cells.push({
                       value: item[field.value]  // Push the selected item's respective column values.
                   })
                })
                rows.push({cells: cells}); // Push the rows.
            });
            excelExport(rows) // Call a common function for creating the excel workbook whilst passing the previosly pushed rows.
        }
        function excelExport(rows) {
            var workbook = new kendo.ooxml.Workbook({ // Create a Worbook.
                sheets: [
                    {
                        columns: [
                            { autoWidth: true },
                            { autoWidth: true },
                            { autoWidth: true },
                            { autoWidth: true },
                            { autoWidth: true },
                            { autoWidth: true },
                        ],
                        title: "Orders",
                        rows: rows // Specify the rows from the function argument.
                    }
                ]
            });
            kendo.saveAs({ dataURI: workbook.toDataURL(), fileName: "Test.xlsx" }); // Export the Excel file.
        }
    </script>
```

For the complete implementation of the suggested approach, refer to the [Telerik REPL example on exporting checked columns only in the Grid](https://netcorerepl.telerik.com/cclcYfFd35PFgwhC55).

## See Also

* [Client-Side API Reference of the Grid](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik REPL: Export checked columns only in the Grid](https://netcorerepl.telerik.com/cclcYfFd35PFgwhC55)