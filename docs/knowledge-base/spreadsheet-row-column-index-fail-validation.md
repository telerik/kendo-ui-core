---
title: How to Get the Row and Column Index of Failed Cell Validation in Spreadsheet
description: Learn how to get the row and column index of failed cell validation in Spreadsheet.
type: how-to
page_title: How to Get the Row and Column Index of Failed Cell Validation in Spreadsheet - Kendo UI Tooltip for jQuery
slug: spreadsheet-row-column-index-fail-validation
tags: kendo ui, spreadsheet, row, column, validation
ticketid: 1534253
res_type: kb
component: spreadsheet
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Spreadsheet for jQuery</td>
 </tr>
</table>
 

## Description

How to get the row and column index of the cell when the validation in the Spreadsheet fails?

## Solution

Subscribe to the Spreadsheet [`change`](/api/javascript/ui/spreadsheet/events/change) event. In the event handler find the current `range`. Check the `validation` value for each cell.

### DatePicker

The following example demonstrates how to get the row and column index of the cells with failed validation.

```dojo
    <div id="spreadsheet" style="width: 100%;"></div>
    <script>
        $(function() {
          $("#spreadsheet").kendoSpreadsheet({
            columns: 26,
            change: function(args){
              args.range.forEachCell(function (row, column, cell) {
                if(cell.validation && !cell.validation.value) {
                  console.log("Row: " + row + " Col: " + column + " Value: " + cell.value);
                }
              });
            },
            rows: 30,
            sheetsbar: false,
            excel: {
              // Required to enable Excel Export in some browsers
              proxyURL: "https://demos.telerik.com/kendo-ui/service/export"
            },
            sheets: [
              {
                name: "ContactsForm",
                mergedCells: [
                  "A1:E1"
                ],
                rows: [
                  {
                    height: 70,
                    cells: [
                      {
                        index: 0, value: "CONTACTS FORM", fontSize: 32, background: "rgb(96,181,255)", enable: false,
                        textAlign: "center", color: "white"
                      }
                    ]
                  },
                  {
                    height: 25,
                    cells: [
                      {
                        value: "Full Name", background: "rgb(167,214,255)", textAlign: "center", color: "rgb(0,62,117)", enable: false
                      },                    
                    ]
                  },
                  {
                    height: 25,
                    cells: [
                      {
                        value: "Maria Anders",
                        validation: {
                          dataType: "custom",
                          from: "AND(LEN(A3)>3, LEN(A3)<200)",
                          allowNulls: true,
                          type: "reject",
                          titleTemplate: "Full Name validation error",
                          messageTemplate: "The full name should be longer than 3 letters and shorter than 200."
                        }

                      },

                    ]
                  }
                ],
                columns: [
                  {
                    width: 100
                  }
                ]
              },
              {
                name: "ListValues",
                rows: [ //A1:B1
                  {
                    cells: [
                      {
                        value: true
                      },
                      {
                        value: false
                      }
                    ]
                  }
                ]
              }
            ]
          });
        });
    </script>
    </div>
```

## See Also

* [Spreadsheet] API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/spreadsheet)
