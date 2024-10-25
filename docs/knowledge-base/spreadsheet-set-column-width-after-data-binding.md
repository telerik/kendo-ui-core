---
title: Setting Column Width After Data Binding in Kendo UI Spreadsheet
description: Learn how to programmatically set the column width to a text length or an autoWidth value in a data-bound sheet in Kendo UI Spreadsheet.
type: how-to
page_title: Set Column Width After Data Binding | Kendo UI Spreadsheet
slug: spreadsheet-set-column-width-after-data-binding
tags: kendo-ui, spreadsheet, column-width, data-binding
res_type: kb
---

## Environment

| Property | Value |
|---|---|
| Product | Spreadsheet for Progress® Kendo UI® |
| Version | 2023.3.1114 |

## Description

You want to know how to set the column width after a sheet is data-bound in the Kendo UI Spreadsheet. Specifically, you want to set the column width to a text length or to an autoWidth value.

## Solution

To achieve this behavior, you can follow these steps:

1. Attach a handler function to the [dataBound](/api/javascript/ui/spreadsheet/events/databound) event of the Spreadsheet.
2. Inside the event handler function, access the [active sheet](/api/javascript/ui/spreadsheet/methods/activesheet).
3. Get the [range](/api/javascript/spreadsheet/sheet/methods/range) of the column you want to auto-fit the width.
4. Find the longest value in the column and calculate its width.
5. Apply the calculated width to the column using the [columnWidth](/api/javascript/spreadsheet/sheet/methods/columnwidth) method.

Below is a runnable example of how to implement this logic:

```dojo
<div id="spreadsheet" style="width: 100%"></div>
    <script>
      $(function() {
        var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service";

        var dataSource = new kendo.data.DataSource({
          transport: {
            read: onRead
          },
          batch: true,
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
          dataBound: function(ev){
            // Get the sheet
            var sheet = ev.sender.activeSheet();
            
            // Get the longest text in the column           
            var range = "B1:B" + sheet.dataSource.data().length + 1
            var longestText = sheet.range(range).values()
            									.map((a) => a[0])
            									.filter(a => a)
            									.sort(function (a, b) {  
                                return b.length - a.length; 
                              })[0];
            
            // Render the text to get its proper width
            var tempElm = $("<span></span>")
            							.text(longestText)
            							.css({
                          	position: "absolute",
                            top: "-1000px"
                          })
            							.appendTo("body");
            // Get the width
            var width = tempElm.width();
            // Remove the element
            tempElm.remove();
            // Set the width to the collumn
            sheet.columnWidth(1, width);
          },
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
            }]
          }]
        });

        function onRead(options) {
          $.ajax({
            url: crudServiceBaseUrl + "/Products",
            dataType: "jsonp",
            success: function (result) {
              options.success(result);
            },
            error: function (result) {
              options.error(result);
            }
          });
        }
      });
    </script>
```



## See Also

- [Kendo UI Spreadsheet Documentation](https://docs.telerik.com/kendo-ui/controls/data-management/spreadsheet/overview)
