---
title: Export DataSource
page_title: Create Excel files directly from a DataSource
description: This article shows how to create Excel document using a Kendo UI DataSource
position: 7
---

# Requirements

Kendo UI API allows you to create Excel documents from any data set, and save them to a client machine. This way you can extract the data stored in a Kendo UI DataSource into an Excel file.

## Export DataSource to excel document

To extract the DataSource to an Excel document (a.k.a. workbook) follow these steps:

1. Instantiate a Kendo UI DataSource.
2. Create the rows header structure, based on the DataSource data. Save it into an `array`
3. Fetch the remote data, and using the callback of the [fetch](api/javascript/data/datasource#methods-fetch) method loop through the items and push the data to the `rows` array. 
4. Instantiate a [kendo.ooxml.Workbook](/api/javascript/ooxml/workbook). The workbook has an array of sheets, where you can set their width, title and set the rows property to the already created `rows` array.
5. Call the [toDataURL](/api/javascript/ooxml/workbook#methods-toDataURL) method of the workbook to get the output Excel file as a data URI.

### Example - create an Excel workbook

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


