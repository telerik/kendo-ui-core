---
title: Grid Excel Export Insert Custom Headers
description: How to Add an extra row to the grid excel export for custom headers
type: how-to
page_title: How to add Custom Headers to the Grid Excel Export
slug: grid-excel-export-custom-headers
position:
tags: grid, excel, export, custom, headers, kendo
teampulseid:
ticketid: 1081450
pitsid:
res_type: kb

---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI</td>
 </tr>
</table>


## Description

Is there a way to also add extra information to the grid Excel export, or does the export only the data within the grid?  I'd like a custom header to be exported for a title and styled in a different way etc.? To summarise, I would like to make some changes to the appearance and content of the Kendo UI Grid Excel Export.

## Solution

The Kendo UI Grid triggers an [`excelExport`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid#events-excelExport) event, which contains the workbook as part of the event data.  
Here is a breakdown of the example below:  
  
1. I changed the `name` of the sheet via the [`sheets.name`](http://docs.telerik.com/kendo-ui/api/javascript/ooxml/workbook#configuration-sheets.name) configuration property.
  
e.g. `sheets[0].name = "Orders";`  

2. I inserted a new row of cells at position 0 that contains the custom headers.  
  
3. I styled the new headers with a new background color, font size and horizontal alignment as well as row height.  

```html

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
  
Workbook API reference:  
  
[http://docs.telerik.com/kendo-ui/api/javascript/ooxml/workbook](http://docs.telerik.com/kendo-ui/api/javascript/ooxml/workbook)  
  
The complete list of configurable cell options is available at:  
  
[http://docs.telerik.com/kendo-ui/api/javascript/ooxml/workbook\#configuration-sheets.rows.cells](http://docs.telerik.com/kendo-ui/api/javascript/ooxml/workbook#configuration-sheets.rows.cells)  
  
More on appearance: [http://docs.telerik.com/kendo-ui/framework/excel/appearance](http://docs.telerik.com/kendo-ui/framework/excel/appearance)
