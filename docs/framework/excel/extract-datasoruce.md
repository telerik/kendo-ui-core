---
title: Exporting Data Sources
page_title: Exporting Data Sources | Kendo UI Excel Export
description: "Learn how to create Excel documents by using the Kendo UI DataSource component."
slug: exportdatasource_excelexport_kendoui
position: 7
---

# Exporting Data Sources

Kendo UI allows you to create Excel documents from any data set and save them to a client machine.

In this way you are able to extract the data that is stored in a [Kendo UI DataSource]({% slug overview_kendoui_datasourcecomponent %}) to an Excel file.

## Getting Started

To extract the DataSource to an Excel document (workbook):

1. Instantiate a [Kendo UI DataSource](/api/javascript/data/datasource).
2. Create the rows header structure based on the DataSource data. Save it into an `array`.
3. Fetch the remote data and by using the callback of the [`fetch`](/api/javascript/data/datasource/methods/fetch) method, loop through the items and push the data to the `rows` array.
4. Instantiate a [`kendo.ooxml.Workbook`](/api/javascript/ooxml/workbook). The workbook has an array of sheets, where you can set their width and title, and set the `rows` property to the already created `rows` array.
5. Call the [`toDataURL`](/api/javascript/ooxml/workbook/methods/todataurl) or [`toDataURLAsync`](/api/javascript/ooxml/workbook/methods/todataurlasync) methods of the workbook to get the output Excel file as a data URI.

## Creating Excel Workbooks

The following example demonstrates how to create an Excel workbook based on the steps from the previous section.

```dojo
    <script>
      var ds = new kendo.data.DataSource({
        type: "odata",
        transport: {
          read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
        },
        schema: {
          model: {
            fields: {
              OrderID: { type: "number" },
              Freight: { type: "number" },
              ShipName: { type: "string" },
              OrderDate: { type: "date" },
              ShipCity: { type: "string" }
            }
          }
        }
      });

      var rows = [{
        cells: [
           // The first cell.
          { value: "OrderID" },
           // The second cell.
          { value: "Freight" },
          // The third cell.
          { value: "ShipName" },
          // The fourth cell.
          { value: "OrderDate" },
          // The fifth cell.
          { value: "ShipCity" }
        ]
      }];

      // Use fetch so that you can process the data when the request is successfully completed.
      ds.fetch(function(){
        var data = this.data();
        for (var i = 0; i < data.length; i++){
          // Push single row for every record.
          rows.push({
            cells: [
              { value: data[i].OrderID },
              { value: data[i].Freight },
              { value: data[i].ShipName },
              { value: data[i].OrderDate },
              { value: data[i].ShipCity }
            ]
          })
        }
        var workbook = new kendo.ooxml.Workbook({
          sheets: [
            {
              columns: [
                // Column settings (width).
                { autoWidth: true },
                { autoWidth: true },
                { autoWidth: true },
                { autoWidth: true },
                { autoWidth: true }
              ],
              // The title of the sheet.
              title: "Orders",
              // The rows of the sheet.
              rows: rows
            }
          ]
        });
        // Save the file as an Excel file with the xlsx extension.
        kendo.saveAs({dataURI: workbook.toDataURL(), fileName: "Test.xlsx"});
      });
    </script>
```

## See Also

* [Introduction to the Excel Export Functionality]({% slug introduction_excelexport_kendoui %})
* [Customizing the Appearance]({% slug appearance_excelexport_kendoui %})
* [Freezing Rows and Columns]({% slug freezerowsandcolumns_excelexport_kendoui %})
* [Setting the Column Width]({% slug columnwidth_excelexport_kendoui %})
* [Spanning Cells across Rows and Columns]({% slug colaspanandrowspan_excelexport_kendoui %})
* [Creating Multiple Sheets]({% slug sheets_excelexport_kendoui %})
