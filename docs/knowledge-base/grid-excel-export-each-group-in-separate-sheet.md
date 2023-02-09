---
title: Export Each Group in a Different Excel Sheet
page_title: Export Each Group in a Different Excel Sheet - Kendo UI Grid for jQuery
description: "An example demonstrating how to export each Grid group in a separate excel sheet."
type: how-to
slug: grid-excel-export-each-group-in-a-separate-sheet
tags: grid, group, export, excel, sheet, separate, individual, page, rows
res_type: kb
---

## Environment

<table>
	<tr>
		<td>Product Version</td>
		<td>2021.3.1207</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>Progress® Kendo UI® Grid for jQuery</td>
	</tr>
</table>

## Description

How can I export each group in a separate Excel sheet with the Kendo UI Grid?

## Solution

> This approach does not work with nested groups.

1. Utilize the [`excelExport`](/api/javascript/ui/grid/events/excelexport) event of the Grid.
1. Verify that the data is currently grouped and prevent the default export behavior.
1. Retrieve the generated excel rows and columns, and define two empty arrays. One for the rows and one for the sheets.
1. Iterate over each row and push it to the rows array.
1. If you reach a row with the type `group-footer`, it means that the current row is the end of the group. Create a new sheet object with the current array of rows and the retrieved columns.
1. Push the sheet to the sheets array. Since the new group must be on a separate sheet, empty the array of rows and push the header row to it. Continue with the iteration until a `group-footer` row is reached once again. Repeat the same process until all rows have been processed.
1. Once all of the sheets have been generated and pushed to the array, create a new [`workbook`](/api/javascript/ooxml/workbook) object.
1. Use the [`saveAs`](/api/javascript/kendo/methods/saveas) method to save the generated excel file.

```dojo
<div id="grid"></div>
<script>
    $("#grid").kendoGrid({
        toolbar: ["excel"],
        excel: {
            fileName: "Kendo UI Grid Export.xlsx",
            proxyURL: "https://demos.telerik.com/kendo-ui/service/export",
            allPages: true
        },
        dataSource: {
            type: "odata",
            transport: {
                read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
            },
            schema: {
                model: {
                    fields: {
                        UnitsInStock: { type: "number" },
                        ProductName: { type: "string" },
                        UnitPrice: { type: "number" },
                        UnitsOnOrder: { type: "number" },
                        UnitsInStock: { type: "number" }
                    }
                }
            },
            pageSize: 7,
            group: {
                field: "UnitsInStock", aggregates: [
                    { field: "ProductName", aggregate: "count" },
                    { field: "UnitPrice", aggregate: "sum" },
                    { field: "UnitsOnOrder", aggregate: "average" },
                    { field: "UnitsInStock", aggregate: "count" }
                ]
            },
            aggregate: [
                { field: "ProductName", aggregate: "count" },
                { field: "UnitPrice", aggregate: "sum" },
                { field: "UnitsOnOrder", aggregate: "average" },
                { field: "UnitsInStock", aggregate: "min" },
                { field: "UnitsInStock", aggregate: "max" }
            ]
        },
        excelExport: excelExportHandler,
        sortable: true,
        pageable: true,
        groupable: true,
        filterable: true,
        columnMenu: true,
        reorderable: true,
        resizable: true,
        columns: [
            { field: "ProductName", title: "Product Name", aggregates: ["count"], footerTemplate: "Total Count: #=count#", groupFooterTemplate: "Count: #=count#" },
            { field: "UnitPrice", title: "Unit Price", aggregates: ["sum"] },
            {
                field: "UnitsOnOrder", title: "Units On Order", aggregates: ["average"], footerTemplate: "Average: #=average#",
                groupFooterTemplate: "Average: #=average#"
            },
            {
                field: "UnitsInStock", title: "Units In Stock", aggregates: ["min", "max", "count"], footerTemplate: "Min: #= min # Max: #= max #",
                groupHeaderTemplate: "Units In Stock: #= value # (Count: #= count#)"
            }
        ]
    });

    function excelExportHandler(e) {
        // Verify that the data is grouped.
        if (e.data[0].field) {
            // Prevent the default export.
            e.preventDefault();
            // Get all the rows of the sheet.
            let rows = e.workbook.sheets[0].rows;
            // Get the header row.
            let header = e.workbook.sheets[0].rows[0];
            // Initialize an empty array for the multiple sheets.
            let sheets = [];
            // Initialize an array for the rows of the current sheet.
            let currentRows = [];
            // Retrieve the columns.
            let columns = e.workbook.sheets[0].columns;

            // Push the header column to the first sheet.
            currentRows.push(header);

            for (let i = 1; i < rows.length; i++) {
                // Push each row in the sheet.
                currentRows.push(rows[i]);
                // If we reach the group-footer...
                if (rows[i].type == "group-footer") {
                    // Create a sheet with the columns and the current rows (current group).
                    let sheet = {
                        columns: columns,
                        rows: currentRows
                    };

                    // Push the sheet to the sheets array.
                    sheets.push(sheet);
                    // Empty the current rows array. We are done with one group, so we will need a new empty sheet for the next group.
                    currentRows = [];
                    // Push the header to the new sheet.
                    currentRows.push(header);
                }
            }

            // Create a workbook with all of the sheets.
            var workbook = new kendo.ooxml.Workbook({
                sheets: sheets
            });

            // Get the filename defined in the Grid options.
            let fileName = e.sender.options.excel.fileName;

            // Save the workbook.
            kendo.saveAs({
                dataURI: workbook.toDataURL(),
                fileName: fileName
            });
        }
    }
</script>
```