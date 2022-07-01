---
title: Export Detail Grids and Merge their Workbooks with the Parent Grid Workbook.
description: Learn how to use the excelExport event to export a parent Grid and all detail Grids to Excel.
type: how-to
page_title: Export parent and all detail Grids to Excel.
slug: aspnetcore_export_detail_grids_to_excel
position:
tags: grid, export, excel, hierarchy, detail,
ticketid: 1563579
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>2022.1.412</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>Grid for ASP.NET Core</td>
		</tr>
	</tbody>
</table>


## Description
How can I export a parent Grid and all of the detail Grids to Excel?

## Solution
The example below extends the [Grid Hierarchy Demo](https://demos.telerik.com/aspnet-core/grid/hierarchy) to demonstrate how to export to Excel the data from all detail Grids and merge their workbooks with the parent Grid workbook.

The example relies on the following key steps:

1. Add a Toolbar with an Export to Excel Button.
1. Add an event handler to the client-side [ExcelExport](https://docs.telerik.com/aspnet-core/api/Kendo.Mvc.UI.Fluent/GridEventBuilder#excelexportsystemstring) event. The event is then prevented to avoid exporting only the data in the parent grid.
1. Fetch the data for all detail Grids and append to the corresponding parent row.

```
@(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.EmployeeViewModel>()
        .Name("grid")
        .ToolBar(t=>t.Excel())
        .Events(events => events.ExcelExport("excelExport"))
        ...// omitted for brevity
)

<script>
     // used to wait for the children to finish async export
    var detailExportPromises = [];


    function excelExport(e){
        e.preventDefault();
        var workbook = e.workbook;
        detailExportPromises = [];
        var masterData = e.data;
        for (var rowIndex = 0; rowIndex < masterData.length; rowIndex++) {
            exportChildData(masterData[rowIndex].EmployeeID, rowIndex);
        }
        // wait for all detail grids to finish exporting
        $.when.apply(null, detailExportPromises)
        .then(function () {
            // get the export results
            var detailExports = $.makeArray(arguments);
            // sort by masterRowIndex
            detailExports.sort(function (a, b) {
                return a.masterRowIndex - b.masterRowIndex;
            });
            // add an empty column
            workbook.sheets[0].columns.unshift({ width: 30 });
            // prepend an empty cell to each row
            for (var i = 0; i < workbook.sheets[0].rows.length; i++) {
                workbook.sheets[0].rows[i].cells.unshift({});
            }
            // merge the detail export sheet rows with the master sheet rows
            // loop backwards so the masterRowIndex doesn't need to be updated
            for (var i = detailExports.length - 1; i >= 0; i--) {
                var masterRowIndex = detailExports[i].masterRowIndex + 1;
                var sheet = detailExports[i].sheet;
                // prepend an empty cell to each row
                for (var ci = 0; ci < sheet.rows.length; ci++) {
                    if (sheet.rows[ci].cells[0].value) {
                        sheet.rows[ci].cells.unshift({});
                    }
                }
                // insert the detail sheet rows after the master row
                [].splice.apply(workbook.sheets[0].rows, [masterRowIndex + 1, 0].concat(sheet.rows));
            }
            // save the workbook
            kendo.saveAs({
                dataURI: new kendo.ooxml.Workbook(workbook).toDataURL(),
                fileName: "Export.xlsx"
            });
        });
    }

    function exportChildData(EmployeeID, rowIndex) {
        var deferred = $.Deferred();
        detailExportPromises.push(deferred);
        var rows = [{
            cells: [
                { value: "OrderID" },
                { value: "ShipCountry" },
                { value: "ShipAddress" },
                { value: "ShipName" }
            ]
        }];

        var baseUrl = "@Url.Action("HierarchyBinding_Orders", "Grid")";
        baseUrl+= "?employeeID="+EmployeeID
        var exporter = new kendo.ExcelExporter({
            columns: [
                { field: "OrderID" },
                { field: "ShipCountry" },
                { field: "ShipAddress" },
                { field: "ShipName" }
            ],
            dataSource: {
                type: "aspnetmvc-ajax",
                transport: {
                    read: { 
                        url: baseUrl 
                    }
                },
                schema: {
                    data: "Data",
                    total: "Total",
                    error: "Errors"
                }
            }
        });
        exporter.workbook().then(function (book, data) {
            deferred.resolve({
                masterRowIndex: rowIndex,
                sheet: book.sheets[0]
            });
        });
    }
</script>
```

Refer to [this REPL](https://netcorerepl.telerik.com/QGOKQDvS30QKTkiV55) for a runnable example.

## See Also
 * [Excel Export Overview](https://docs.telerik.com/kendo-ui/framework/excel/introduction)
 * [kendo.ooxml.Workbook client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ooxml/workbook)
