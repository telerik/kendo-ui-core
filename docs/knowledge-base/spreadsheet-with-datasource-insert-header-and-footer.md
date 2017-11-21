---
title: How to Create Header and Footer Rows for a Spreadsheet with DataSource 
description: An example of how to insert custom header and footer in a Spreadsheet Sheet loading its data with DataSource from a remote call.
type: how-to
page_title: Insert Custom Header and Footer in a Spreadsheet Bound to DataSource
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

I am using Spreadsheet with DataSource configured for one of its Sheets. The data is loading as expected from a remote call. I would like to have additional Header and Footer rows that are not part of the data returned.

## Solution
  
To achieve the required you will have to insert the Header and the Footer manually using the Spreadsheet client-side API. The DataSource [`requestEnd`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource#events-requestEnd) event needs to be handled:  

````html
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
          sheet.insertRow(0);
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
  
Note, that the header row is inserted using the [`Sheet.insertRow()`](https://docs.telerik.com/kendo-ui/api/javascript/spreadsheet/sheet#methods-insertRow) method. Then the range for the row is retrieved ([`Sheet.range()`](https://docs.telerik.com/kendo-ui/api/javascript/spreadsheet/sheet#methods-range)) and the values are set ([`Range.values()`](https://docs.telerik.com/kendo-ui/api/javascript/spreadsheet/range#methods-values)).  
  
Keep in mind, that the above suggestion would not be applicable if the data is being edited and saved using the other DataSource transport methods (Update, Create, Destroy). In such scenario inserting custom header / footer would not be supported.  

## See Also

* [API Reference of the Spreadsheet](https://docs.telerik.com/kendo-ui/api/javascript/ui/spreadsheet)
* [API Reference of the DataSource](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource)
