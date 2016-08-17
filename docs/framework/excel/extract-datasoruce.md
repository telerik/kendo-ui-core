---
title: DataSource Export
page_title: DataSource Export | Kendo UI Excel Export
description: "Learn how to create Excel documents by using the Kendo UI DataSource component."
slug: exportdatasource_excelexport_kendoui
position: 7
---

# DataSource Export

The Kendo UI API allows you to create Excel documents from any data set and save them to a client machine. In this way you are able to extract the data stored in a [Kendo UI DataSource]({% slug overview_kendoui_datasourcecomponent %}) to an Excel file.

## Configuration

### Requirements

To extract the DataSource to an Excel document (workbook), follow these steps:

1. Instantiate a [Kendo UI DataSource](/api/javascript/data/datasource).
2. Create the rows header structure based on the DataSource data. Save it into an `array`.
3. Fetch the remote data and by using the callback of the [`fetch`](/api/javascript/data/datasource#methods-fetch) method, loop through the items and push the data to the `rows` array.
4. Instantiate a [`kendo.ooxml.Workbook`](/api/javascript/ooxml/workbook). The workbook has an array of sheets, where you can set their width and title, and set the `rows` property to the already created `rows` array.
5. Call the [`toDataURL`](/api/javascript/ooxml/workbook#methods-toDataURL) method of the workbook to get the output Excel file as a data URI.

### Create Excel Workbook

The example below demonstrates how to create an Excel workbook based on the requirements from the previous section.

###### Example

```html
    <script>
      var ds = new kendo.data.DataSource({
        type: "odata",
        transport: {
          read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
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
           // First cell
          { value: "OrderID" },
           // Second cell
          { value: "Freight" },
          // Third cell
          { value: "ShipName" },
          // Fourth cell
          { value: "OrderDate" },
          // Fifth cell
          { value: "ShipCity" }
        ]
      }];

      //using fetch, so we can process the data when the request is successfully completed
      ds.fetch(function(){
        var data = this.data();
        for (var i = 0; i < data.length; i++){
          //push single row for every record
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
                // Column settings (width)
                { autoWidth: true },
                { autoWidth: true },
                { autoWidth: true },
                { autoWidth: true },
                { autoWidth: true }
              ],
              // Title of the sheet
              title: "Orders",
              // Rows of the sheet
              rows: rows
            }
          ]
        });
        //save the file as Excel file with extension xlsx
        kendo.saveAs({dataURI: workbook.toDataURL(), fileName: "Test.xlsx"});
      });
    </script>
```

## See Also

Articles on the Excel export functionality in Kendo UI:

* [Introduction to the Excel Export Functionality]({% slug introduction_excelexport_kendoui %})
* [Customize the Appearance]({% slug appearance_excelexport_kendoui %})
* [Freeze Rows and Columns]({% slug freezerowsandcolumns_excelexport_kendoui %})
* [Set the Column Width]({% slug columnwidth_excelexport_kendoui %})
* [Set the Colspan and Rowspan]({% slug colaspanandrowspan_excelexport_kendoui %})
* [Create Multiple Sheets]({% slug sheets_excelexport_kendoui %})
