---
title: Change the Columns Headers in a DataSource Bound Spreadsheet
description: An example on how to manually alter the headers of the columns in a Kendo UI Spreadsheet which is populated from a DataSource.
type: how-to
page_title: Rename the Default Headers When Using DataSource | Kendo UI Spreadsheet for jQuery
slug: spreadsheet-rename-headers-from-datasource
tags: kendo, kendoui, spreadsheet, datasource, headers
res_type: kb
component: spreadsheet
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Spreadsheet</td>
 </tr>
</table>


## Description

How can I manually alter the headers of the columns in a Spreadsheet which is populated from a DataSource?

## Solution

Handle the first [`requestEnd`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/events/requestend) event of the DataSource.

```dojo
<div id="spreadsheet" style="width: 100%"></div>

<script>
  $(function() {
    var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service";
    var shouldPopulateHeader = true;

    var dataSource = new kendo.data.DataSource({
      requestEnd: function (e) {
        setTimeout(function(e) {
          if(shouldPopulateHeader) {
            shouldPopulateHeader = false;

            var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
            var sheet = spreadsheet.activeSheet();

            // Change the default headers for the first and the second column
            sheet.batch(function(){
              sheet.range("A1").value("SERVICE ID");
              sheet.range("B1").value("CUSTOM SERVICE DESCRIPTION HEDER");
            }, { recalc: true });
          }
        }, 0);
      },
      transport: {
        read:  {
          url: crudServiceBaseUrl + "/Products",
          dataType: "jsonp"
        }
      },
      schema: {
        model: {
          id: "ProductID",
          fields: {
            ProductID: { type: "number" },
            ProductName: { type: "string" },
            UnitPrice: { type: "number" },
            Discontinued: { type: "boolean" },
            UnitsInStock: { type: "number" }
          }
        }
      }
    });

    $("#spreadsheet").kendoSpreadsheet({
      columns: 20,
      rows: 100,
      toolbar: false,
      sheetsbar: false,
      sheets: [{
        name: "Products",
        dataSource: dataSource,
        rows: [{
          height: 40,
          cells: [
            {
              bold: "true",
              background: "#9c27b0",
              textAlign: "center",
              color: "white"
            },{
              bold: "true",
              background: "#9c27b0",
              textAlign: "center",
              color: "white"
            },{
              bold: "true",
              background: "#9c27b0",
              textAlign: "center",
              color: "white"
            },{
              bold: "true",
              background: "#9c27b0",
              textAlign: "center",
              color: "white"
            },{
              bold: "true",
              background: "#9c27b0",
              textAlign: "center",
              color: "white"
            }]
        }],
        columns: [
          { width: 100 },
          { width: 415 },
          { width: 145 },
          { width: 145 },
          { width: 145 }
        ]
      }]
    });
  });
</script>
```

## See Also

* [API Reference of the Spreadsheet](https://docs.telerik.com/kendo-ui/api/javascript/ui/spreadsheet)
* [API Reference of the DataSource](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource)
