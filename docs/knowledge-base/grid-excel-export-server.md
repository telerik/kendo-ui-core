---
title: Export Grid to Excel with the RadSpreadStreamProcessing Library
description: An example on how to export a Kendo UI Grid for jQuery on the server with the RadSpreadStreamProcessing library
type: how-to
page_title: Server-side Excel Export of Grid Data | Kendo UI Grid for jQuery
slug: grid-excel-export-server
ticketid: 1107641
tags: grid, excel, export, RadSpreadStreamProcessing, server, server-side, large, data set
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Kendo UI®</td>
 </tr>
 <tr>
  <td>Product</td>
  <td>RadSpreadStreamProcessing</td>
 </tr>
</table>

## Description

We have been using the excel export from the Kendo UI Grid (client-side) which has been working very well when we have small datasets.

We now have a larger data set and the client-side export timesout so we need to use server-side (possibly radspreadprocessing library) to generate an excel spreadsheet but it needs to be based on the current view (i.e. with all client-side filters applied) - are you able to have an example where this can be demonstrated?

## Solution

As one of our DevCraft Complete clients, you could take advantage of the `DataSourceRequest`/`DataSourceResult` classes from the `Kendo.Mvc.dll`. Set the data source as type `aspnetmvc-ajax` so it can be used in the MVC context and process the server paging, grouping, aggregating, filtering and sorting with the `ToDataSourceResult()` extension method. 

1. Include the `kendo.aspnetmvc.min.js` script in the `_Layout.cshtml`
1. Add a custom toolbar template to trigger the server-side export
1. Add the custom click function and post a request to the server-side method
1. Create a helper model that can deserialize the column settiings on the server
1. Include the server-side dependencies - **Kendo.Mvc.dll**, **Telerik.Documents.SpreadsheetStreaming.dll**, **Telerik.Windows.Zip.dll**

```tab-Index.cshtml
    <script id="template" type="text/x-kendo-template">
        <a class="k-button" href="\#" onclick="return toolbar_click()"><span class="k-icon k-i-excel"></span>Export To Excel</a>
    </script>

    toolbar: [{ template: kendo.template($("#template").html()) }],
    dataSource: {
        type: "aspnetmvc-ajax",
        transport: {
            read: {
                url: "/Grid/Orders",
                type: "POST"
            }
        },
        pageSize: 10,
        serverPaging: true,
        serverSorting: true,
        serverFiltering: true,
        serverGrouping: true,
        serverAggregates: true,
        schema: {
            data: "Data",
            total: "Total"
        },
    }

    function toolbar_click() {
        var grid = $("#grid").data("kendoGrid");

        var exportOptions = {
            format: "XLSX",
            title: "Export",
            createUrl: "/Grid/Export",
            downloadUrl: "/Grid/Download"
        }

        // Get the current filter/group/sort options of the grid data source

        var options = grid.getOptions().dataSource;

        // modify it to have no pageSize for allPages Excel Export

        delete options.pageSize;
        delete options.page;

        // change the request url and send the columns of the grid and other data. 
        // NB! The data property name must match the parameter in the controller, e.g. "columns", "title"

        options.transport.read = {
            type: "GET",
            url: exportOptions.createUrl,
            data: {
                columns: JSON.stringify(grid.columns),
                title: exportOptions.title,
                format: exportOptions.format
            }
        }

        // create a new data source instance with the new options
        var dataSource = new kendo.data.DataSource(options);

        // make a read request to create the Export in GridController/Export and store it in the Session
        // in the promise callback of the read() method, change the location of the window so you can download the generated file 
        dataSource.read().then(function () {
            window.location.replace(kendo.format("{0}?format={1}&title={2}",
                exportOptions.downloadUrl,
                exportOptions.format,
                exportOptions.title));
        });

        return false;
    }
```
```tab-ColumnSettings.cs
    public class ColumnSettings
    {
        public string Title { get; set; }
        public string Width { get; set; }
        public string Field { get; set; }
        public string Format { get; set; }
        public bool Hidden { get; set; }
    }
```
```tab-Export
    public JsonResult Export([DataSourceRequest]DataSourceRequest request, string columns, string title, string format)
        {
            var data = Enumerable.Range(1, 50).Select(i => new OrderViewModel
            {
                OrderID = i,
                Freight = i * 10,
                OrderDate = DateTime.Now.AddDays(i),
                ShipName = "ShipName " + i,
                ShipCity = "ShipCity " + i
            }).ToDataSourceResult(request).Data;

            var excelColumns = JsonConvert.DeserializeObject<IList<ColumnSettings>>(columns);

            // We serialize and deserialize the data to access it as a dictionary as opposed to repeating code for each property
            // This allows us to access the DataSourceResult.Data dynamically.
            // Example:
            // dataDictionary[rowIdx][excelColumns[colIdx].Field].Value
            // data[0]["ShipCity"]

            var dataDictionary =  JsonConvert.DeserializeObject<dynamic>(JsonConvert.SerializeObject(data));

            SpreadDocumentFormat exportFormat = SpreadDocumentFormat.Xlsx;
            using (MemoryStream stream = new MemoryStream())
            {
                using (IWorkbookExporter workbook = SpreadExporter.CreateWorkbookExporter(exportFormat, stream))
                {
                    using (IWorksheetExporter worksheet = workbook.CreateWorksheetExporter(title))
                    {
                        using (IRowExporter row = worksheet.CreateRowExporter())
                        {
                            for (int idx = 0; idx < excelColumns.Count; idx++)
                            {
                                var modelCol = excelColumns[idx];
                                string columnName = modelCol.Title ?? modelCol.Field;
                                using (ICellExporter cell = row.CreateCellExporter())
                                {
                                    cell.SetValue(columnName);
                                }
                            }
                        }
                        for (int rowIdx = 0; rowIdx < dataDictionary.Count; rowIdx++)                         
                        {
                            using (IRowExporter row = worksheet.CreateRowExporter())
                            {
                                for (int colIdx = 0; colIdx < excelColumns.Count; colIdx++)
                                {
                                    using (ICellExporter cell = row.CreateCellExporter())
                                    {
                                        cell.SetValue(dataDictionary[rowIdx][excelColumns[colIdx].Field].Value);
                                    }
                                }
                            }
                        }
                    }
                }
                Session[title] = stream.ToArray();
            }

            return Json(new { success = true }, JsonRequestBehavior.AllowGet);
        }
```
```tab-Download
    public FileResult Download(string title, string format)
    {
        string mimeType = format == "CSV" ? "text/csv" : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        if (Session[title] != null)
        {
            byte[] fileData = Session[title] as byte[];
            string fileName = string.Format("{0}.{1}", title, format.ToLowerInvariant());

            Session.Remove(title);

            Response.Buffer = true;
            Response.AddHeader("Content-Disposition", string.Format("attachment; filename={0}", fileName));
            return File(fileData, mimeType, fileName);
        }
        else
        {
            throw new Exception(string.Format("{0} not found", title));
        }
    }
```
