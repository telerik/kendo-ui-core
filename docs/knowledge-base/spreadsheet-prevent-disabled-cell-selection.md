---
title: Prevent selection for disabled cells in Spreadsheet
description: Learn how to prevent the selection of disabled cells in the Kendo UI Spreadsheet.
type: how-to
page_title: Prevent selection for disabled cells in Spreadsheet - Kendo UI Spreadsheet for jQuery
slug: spreadsheet-prevent-selection-disabled-cells
tags: kendo, kendo-ui, spreadsheet, prevent, selection
ticketid: 1152738
res_type: kb
---

## Environment

<table>
	<tr>
		<td>Product</td>
		<td>Progress® Kendo UI® Spreadsheet for jQuery</td>
	</tr>
</table>

## Description

How to prevent the selection for disabled cells in the Spreadsheet?

## Solution

```dojo
<style>
      .k-spreadsheet-cell {
        cursor: default !important;
      }
    </style>
    <div id="example">
      <div class="box wide">
        <div class="box-col">
          <h4>Disable cells</h4>
          <ul class="options">
            <li>
              <button class="k-button" id="toggle">Disable / Enable 'Quantity' column</button>
            </li>
          </ul>
        </div>
      </div>
      <div id="spreadsheet" style="width: 100%;"></div>
      <script>
        kendo.spreadsheet.Sheet.fn.select = function (ref, changeActiveCell) {
          var selectionState = this._selectionState();

          var expandedRef;

          if (ref) {              
            if (!(new kendo.spreadsheet.Range(ref, this)).enable()) {
              return selectionState.originalSelection;
            }
            ref = this._ref(ref);
            ref = this._grid.normalize(ref);
            expandedRef = this._grid.isAxis(ref) ? ref : this.unionWithMerged(ref);
          }


          return selectionState.select(ref, expandedRef, changeActiveCell);
        } 
        $(function() {
          var spreadsheet = $("#spreadsheet").kendoSpreadsheet({
            select: function (e) {
              if (!e.range.enable()) {
                e.preventDefault(); 
                e.sender.activeSheet()._viewSelection.selection = null;
              }
            },
            sheets: [
              {
                name: "Food Order",
                mergedCells: [
                  "A1:G1",
                  "C15:E15"
                ],
                rows: [
                  {
                    height: 70,
                    cells: [
                      {
                        index: 0, value: "Invoice #52 - 06/23/2015", fontSize: 32, background: "rgb(96,181,255)",
                        textAlign: "center", color: "white"
                      }
                    ]
                  },
                  {
                    height: 25,
                    cells: [
                      {
                        value: "ID", background: "rgb(167,214,255)", textAlign: "center", color: "rgb(0,62,117)"
                      },
                      {
                        value: "Product", background: "rgb(167,214,255)", textAlign: "center", color: "rgb(0,62,117)"
                      },
                      {
                        value: "Quantity", background: "rgb(167,214,255)", textAlign: "center", color: "rgb(0,62,117)"
                      },
                      {
                        value: "Price", background: "rgb(167,214,255)", textAlign: "center", color: "rgb(0,62,117)"
                      },
                      {
                        value: "Tax", background: "rgb(167,214,255)", textAlign: "center", color: "rgb(0,62,117)"
                      },
                      {
                        value: "Amount", background: "rgb(167,214,255)", textAlign: "center", color: "rgb(0,62,117)"
                      },
                      {
                        background: "rgb(167,214,255)", color: "rgb(0,62,117)"
                      }
                    ]
                  },
                  {
                    cells: [
                      {
                        value: 216321, textAlign: "center", background: "rgb(255,255,255)", color: "rgb(0,62,117)", enable: false
                      },
                      {
                        value: "Calzone", background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                      },
                      {
                        value: 1, textAlign: "center", background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                      },
                      {
                        value: 12.39, format: "$#,##0.00", background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                      },
                      {
                        formula: "C3*D3*0.2", format: "$#,##0.00", background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                      },
                      {
                        formula: "C3*D3+E3", format: "$#,##0.00", background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                      },
                      {
                        background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                      }
                    ]
                  },
                  {
                    cells: [
                      {
                        value: 546897, textAlign: "center", background: "rgb(229,243,255)", color: "rgb(0,62,117)", enable: false
                      },
                      {
                        value: "Margarita", background: "rgb(229,243,255)", color: "rgb(0,62,117)"
                      },
                      {
                        value: 2, textAlign: "center", background: "rgb(229,243,255)", color: "rgb(0,62,117)"
                      },
                      {
                        value: 8.79, format: "$#,##0.00", background: "rgb(229,243,255)", color: "rgb(0,62,117)"
                      },
                      {
                        formula: "C4*D4*0.2", format: "$#,##0.00", background: "rgb(229,243,255)", color: "rgb(0,62,117)"
                      },
                      {
                        formula: "C4*D4+E4", format: "$#,##0.00", background: "rgb(229,243,255)", color: "rgb(0,62,117)"
                      },
                      {
                        background: "rgb(229,243,255)", color: "rgb(0,62,117)"
                      }
                    ]
                  },
                  {
                    cells: [
                      {
                        value: 456231, textAlign: "center", background: "rgb(255,255,255)", color: "rgb(0,62,117)", enable: false
                      },
                      {
                        value: "Pollo Formaggio", background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                      },
                      {
                        value: 1, textAlign: "center", background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                      },
                      {
                        value: 13.99, format: "$#,##0.00", background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                      },
                      {
                        formula: "C5*D5*0.2", format: "$#,##0.00", background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                      },
                      {
                        formula: "C5*D5+E5", format: "$#,##0.00", background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                      },
                      {
                        background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                      }
                    ]
                  },
                  {
                    cells: [
                      {
                        value: 455873, textAlign: "center", background: "rgb(229,243,255)", color: "rgb(0,62,117)", enable: false
                      },
                      {
                        value: "Greek Salad", background: "rgb(229,243,255)", color: "rgb(0,62,117)"
                      },
                      {
                        value: 1, textAlign: "center", background: "rgb(229,243,255)", color: "rgb(0,62,117)"
                      },
                      {
                        value: 9.49, format: "$#,##0.00", background: "rgb(229,243,255)", color: "rgb(0,62,117)"
                      },
                      {
                        formula: "C6*D6*0.2", format: "$#,##0.00", background: "rgb(229,243,255)", color: "rgb(0,62,117)"
                      },
                      {
                        formula: "C6*D6+E6", format: "$#,##0.00", background: "rgb(229,243,255)", color: "rgb(0,62,117)"
                      },
                      {
                        background: "rgb(229,243,255)", color: "rgb(0,62,117)"
                      }
                    ]
                  },
                  {
                    cells: [
                      {
                        value: 456892, textAlign: "center", background: "rgb(255,255,255)", color: "rgb(0,62,117)", enable: false
                      },
                      {
                        value: "Spinach and Blue Cheese", background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                      },
                      {
                        value: 3, textAlign: "center", background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                      },
                      {
                        value: 11.49, format: "$#,##0.00", background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                      },
                      {
                        formula: "C7*D7*0.2", format: "$#,##0.00", background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                      },
                      {
                        formula: "C7*D7+E7", format: "$#,##0.00", background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                      },
                      {
                        background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                      }
                    ]
                  },
                  {
                    cells: [
                      {
                        value: 546564, textAlign: "center", background: "rgb(229,243,255)", color: "rgb(0,62,117)", enable: false
                      },
                      {
                        value: "Rigoletto", background: "rgb(229,243,255)", color: "rgb(0,62,117)"
                      },
                      {
                        value: 1, textAlign: "center", background: "rgb(229,243,255)", color: "rgb(0,62,117)"
                      },
                      {
                        value: 10.99, format: "$#,##0.00", background: "rgb(229,243,255)", color: "rgb(0,62,117)"
                      },
                      {
                        formula: "C8*D8*0.2", format: "$#,##0.00", background: "rgb(229,243,255)", color: "rgb(0,62,117)"
                      },
                      {
                        formula: "C8*D8+E8", format: "$#,##0.00", background: "rgb(229,243,255)", color: "rgb(0,62,117)"
                      },
                      {
                        background: "rgb(229,243,255)", color: "rgb(0,62,117)"
                      }
                    ]
                  },
                  {
                    cells: [
                      {
                        value: 789455, textAlign: "center", background: "rgb(255,255,255)", color: "rgb(0,62,117)", enable: false
                      },
                      {
                        value: "Creme Brulee", background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                      },
                      {
                        value: 5, textAlign: "center", background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                      },
                      {
                        value: 6.99, format: "$#,##0.00", background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                      },
                      {
                        formula: "C9*D9*0.2", format: "$#,##0.00", background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                      },
                      {
                        formula: "C9*D9+E9", format: "$#,##0.00", background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                      },
                      {
                        background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                      }
                    ]
                  },
                  {
                    cells: [
                      {
                        value: 123002, textAlign: "center", background: "rgb(229,243,255)", color: "rgb(0,62,117)", enable: false
                      },
                      {
                        value: "Radeberger Beer", background: "rgb(229,243,255)", color: "rgb(0,62,117)"
                      },
                      {
                        value: 4, textAlign: "center", background: "rgb(229,243,255)", color: "rgb(0,62,117)"
                      },
                      {
                        value: 4.99, format: "$#,##0.00", background: "rgb(229,243,255)", color: "rgb(0,62,117)"
                      },
                      {
                        formula: "C10*D10*0.2", format: "$#,##0.00", background: "rgb(229,243,255)", color: "rgb(0,62,117)"
                      },
                      {
                        formula: "C10*D10+E10", format: "$#,##0.00", background: "rgb(229,243,255)", color: "rgb(0,62,117)"
                      },
                      {
                        background: "rgb(229,243,255)", color: "rgb(0,62,117)"
                      }
                    ]
                  },
                  {
                    cells: [
                      {
                        value: 564896, textAlign: "center", background: "rgb(255,255,255)", color: "rgb(0,62,117)", enable: false
                      },
                      {
                        value: "Budweiser Beer", background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                      },
                      {
                        value: 3, textAlign: "center", background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                      },
                      {
                        value: 4.49, format: "$#,##0.00", background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                      },
                      {
                        formula: "C11*D11*0.2", format: "$#,##0.00", background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                      },
                      {
                        formula: "C11*D11+E11", format: "$#,##0.00", background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                      },
                      {
                        background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                      }
                    ]
                  },
                  {
                    index: 11,
                    cells: [
                      {
                        background: "rgb(229,243,255)", color: "rgb(0,62,117)"
                      },
                      {
                        background: "rgb(229,243,255)", color: "rgb(0,62,117)"
                      },
                      {
                        background: "rgb(229,243,255)", color: "rgb(0,62,117)"
                      },
                      {
                        background: "rgb(229,243,255)", color: "rgb(0,62,117)"
                      },
                      {
                        background: "rgb(229,243,255)", color: "rgb(0,62,117)"
                      },
                      {
                        background: "rgb(229,243,255)", color: "rgb(0,62,117)"
                      },
                      {
                        background: "rgb(229,243,255)", color: "rgb(0,62,117)"
                      }
                    ]
                  },
                  {
                    index: 12,
                    cells: [
                      {
                        background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                      },
                      {
                        background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                      },
                      {
                        background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                      },
                      {
                        background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                      },
                      {
                        background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                      },
                      {
                        background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                      },
                      {
                        background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                      }
                    ]
                  },
                  {
                    height: 25,
                    index: 13,
                    cells: [
                      {
                        background: "rgb(193,226,255)", color: "rgb(0,62,117)"
                      },
                      {
                        background: "rgb(193,226,255)", color: "rgb(0,62,117)"
                      },
                      {
                        background: "rgb(193,226,255)", color: "rgb(0,62,117)"
                      },
                      {
                        background: "rgb(193,226,255)", color: "rgb(0,62,117)"
                      },
                      {
                        value: "Tip:", background: "rgb(193,226,255)", color: "rgb(0,62,117)", textAlign: "right", verticalAlign: "bottom"
                      },
                      {
                        formula: "SUM(F3:F11)*0.1", background: "rgb(193,226,255)", color: "rgb(0,62,117)", format: "$#,##0.00", bold: "true", verticalAlign: "bottom"
                      },
                      {
                        background: "rgb(193,226,255)", color: "rgb(0,62,117)"
                      }
                    ]
                  },
                  {
                    height: 50,
                    index: 14,
                    cells: [
                      {
                        index: 0, background: "rgb(193,226,255)", color: "rgb(0,62,117)",
                      },
                      {
                        index: 1, background: "rgb(193,226,255)", color: "rgb(0,62,117)",
                      },
                      {
                        index: 2, fontSize: 20, value: "Total Amount:",
                        background: "rgb(193,226,255)", color: "rgb(0,62,117)", textAlign: "right"
                      },
                      {
                        index: 5, fontSize: 20, formula: "SUM(F3:F14)", background: "rgb(193,226,255)", color: "rgb(0,62,117)",
                        format: "$#,##0.00", bold: "true"
                      },
                      {
                        index: 6, background: "rgb(193,226,255)", color: "rgb(0,62,117)"
                      }
                    ]
                  }
                ],
                columns: [
                  {
                    width: 100
                  },
                  {
                    width: 215
                  },
                  {
                    width: 115
                  },
                  {
                    width: 115
                  },
                  {
                    width: 115
                  },
                  {
                    width: 155
                  }
                ]
              }
            ]
          }).data("kendoSpreadsheet");
          $("#toggle").click(function(){

            var range = spreadsheet.activeSheet().range("C3:C11");
            var enabled = range.enable();

            if (enabled === null) {
              enabled = true;
            }
            //Enable / disable specified range
            range.enable(!enabled);
          })

        });
      </script>
    </div>
```

## See Also

* [API Reference of the Spreadsheet](https://docs.telerik.com/kendo-ui/api/javascript/ui/spreadsheet)