---
title: Create Header and Footer Rows for a Spreadsheet with DataSource
description: An example on how to insert a custom header and footer in a Kendo UI Spreadsheet sheet and load its data with a DataSource from a remote call.
type: how-to
page_title: Insert Custom Header and Footer in Spreadsheet with DataSource | Kendo UI Spreadsheet for jQuery
slug: spreadsheet-with-datasource-insert-header-and-footer
tags: kendo, kendoui, spreadsheet, datasource, footer, header
ticketid: 1140923
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Spreadsheet</td>
 </tr>
</table>

## Description

I am using a Spreadsheet that is bound to a DataSource which is configured for one of its sheets. The data is loading as expected from a remote call.

How can I have additional header and footer rows that are not part of the returned data?

## Solution

1. Manually insert the header and the footer by using the client-side API of the Spreadsheet.
1. Handle the [`requestEnd`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/events/requestend) event of the DataSource.

    The header row is inserted through the [`Sheet.insertRow()`](https://docs.telerik.com/kendo-ui/api/javascript/spreadsheet/sheet/methods/insertrow) method. Then, the range for the row is retrieved through [`Sheet.range()`](https://docs.telerik.com/kendo-ui/api/javascript/spreadsheet/sheet/methods/range). The values are set [`Range.values()`](https://docs.telerik.com/kendo-ui/api/javascript/spreadsheet/range/methods/values).

> This approach is not applicable if the data is edited and saved by using the other DataSource transport methods (`Update`, `Create`, and `Destroy`). Such scenarios do not support the insertion of a custom header or footer.

````dojo
<div id="spreadsheet" style="width: 100%"></div>

<script>
  $(function() {
    var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service";

    function onRequestEnd(e) {
      // Check the request type
      if (e.type === 'read') {
        setTimeout(function() {
          var spread = $("#spreadsheet").getKendoSpreadsheet();
          var sheet = spread.activeSheet();
          var responseLength = e.response.length;
          // Insert the custom header row
          sheet.insertRow(0, true); // the second parameter skips the update of the dataSource
          var headerRange = sheet.range('A1:E1');
          headerRange.values([["Test", "This", "Custom", "Header", "Once"]]);
          headerRange.fontSize(30);
          // Get the respective row for the footer
          var footerRowNumber = (responseLength + 3).toString();
          var footerRange = sheet.range('A' + footerRowNumber + ':E' + footerRowNumber);
          footerRange.values([["Test", "This", "Custom", "Footer", "Ho!"]]);
          footerRange.fontSize(20);
        }, 0);
      }
    }

    var dataSource = new kendo.data.DataSource({
      requestEnd: onRequestEnd,
      transport: {
        read:  {
          url: crudServiceBaseUrl + "/Products",
          dataType: "jsonp"
        }
      },
      schema: {
        model: {
          id: "ProductID"
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
          cells: [{
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
````

## See Also

* [API Reference of the Spreadsheet](https://docs.telerik.com/kendo-ui/api/javascript/ui/spreadsheet)
* [API Reference of the DataSource](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource)
