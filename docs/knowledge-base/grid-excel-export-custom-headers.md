---
title: Export Custom Headers to Excel in Grid
description: An example on how to add an extra row to the Excel Export for custom Kendo UI Grid headers.
type: how-to
page_title: Add Custom Headers When Exporting to Excel | Kendo UI Grid for jQuery
slug: grid-excel-export-custom-headers
tags: grid, excel, export, custom, headers, kendo
ticketid: 1081450
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
  <td>Progress Kendo UI Excel Export</td>
 </tr>
</table>


## Description

I want to make changes to the appearance and the content of the Kendo UI Grid when I export it to Excel.

How can I:
* Add extra information to the Grid when I export it to Excel?
* Export a custom header for a title and then style it in a different way?

Does the Grid export only the already existing data in it?

## Solution

The Grid triggers an [`excelExport`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/excelexport) event which contains the workbook as part of the event data.

The example demonstrates how to export additional information to Excel by implementing the following actions:

1. Change the name of the sheet by using the [`sheets.name`](https://docs.telerik.com/kendo-ui/api/javascript/ooxml/workbook/configuration/sheets.name) configuration property. For example, `sheets[0].name = "Orders";`.
1. Insert a new row of cells which contains the custom headers at position `0`.
1. Style the new headers with a new background color, font size, horizontal alignment, and row height.

```dojo

    <div id="example">
          <div id="grid"></div>

          <script>
            $(document).ready(function() {
              $("#grid").kendoGrid({
                toolbar: ["excel"],
                excel: {
                  fileName: "Kendo UI Grid Export.xlsx",
                  proxyURL: "//demos.telerik.com/kendo-ui/service/export",
                  filterable: true
                },
                excelExport: function(e){

                  var sheet = e.workbook.sheets[0];
                  sheet.frozenRows = 2;
                  sheet.mergedCells = ["B1:E1"];
                  sheet.name = "Orders";

                  var myHeaders = [{
                    value:"OrderID",
                    textAlign: "center",
                    background:"#60b5ff",
                    color:"#ffffff"
                  },{
                    value:"Shipping Information",
                    fontSize: 20,
                    textAlign: "center",
                    background:"#60b5ff",
    								color:"#ffffff"
                  }];

                  sheet.rows.splice(0, 0, { cells: myHeaders, type: "header", height: 70});
                },
                dataSource: {
                  type: "odata",
                  transport: {
                    read: "//demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
                  },
                  schema: {
                    model: {
                      fields: {
                        OrderID: { type: "number" },
                        ShipCountry: { type: "string" },
                        ShipName: { type: "string" },
                        ShipCity: { type: "string" },
                        ShipAddress: { type: "string" }
                      }
                    }
                  },
                  pageSize: 30
                },
                height: 540,
                pageable: true,
                columns: [ {
                  field: "OrderID",
                  title: "Order ID",
                  width: 150
                }, {
                  field: "ShipCountry",
                  title: "Ship Country",
                  width: 300
                }, {
                  field: "ShipCity",
                  title: "Ship City",
                  width: 300
                },{
                  field: "ShipName",
                  title: "Ship Name",
                  width: 300
                },  {
                  field: "ShipAddress",
                  width: 400
                }]
              });
            });
          </script>
        </div>
```

## See Also

* [Workbook API reference](https://docs.telerik.com/kendo-ui/api/javascript/ooxml/workbook)
* [Complete List of Configurable Cell Options](https://docs.telerik.com/kendo-ui/api/javascript/ooxml/workbook/configuration/sheets.rows.cells)
* [More Information on Appearance](https://docs.telerik.com/kendo-ui/framework/excel/appearance)
