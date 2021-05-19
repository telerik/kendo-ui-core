---
title: Render Read-Only Spreadsheets
description: An example on how to hide or remove everything but the cells in a Kendo UI Spreadsheet and put them in a read-only mode which only shows the cells but prevents them from being edited or modified.
type: how-to
page_title: Set the Read-Only Mode | Kendo UI Spreadsheet for jQuery
slug: view-only-spreadsheet-widget
tags: kendo, spreadsheet, view, view-only, read-only, hide
ticketid: 1362798, 1356967
res_type: kb
---

## Environment

<table>
	<tr>
		<td>Product</td>
		<td>Spreadsheet for Progress® Kendo UI®</td>
	</tr>
</table>

## Description

How can I show a Kendo UI Spreadsheet in a view-only (read-only) mode so that the user cannot edit the cells and the toolbars or buttons are not rendered.

## Solution

Apply either of the following approaches:

* Use a Kendo UI Grid or a `table` element.
* Subscribe to the [`render`](https://docs.telerik.com/kendo-ui/api/javascript/ui/spreadsheet/events/render) event of the Spreadsheet and disable all cells across all sheets as demonstrated in the following example.

```dojo
<div id="example">
    <div id="spreadsheet" style="width: 100%;" class="hiddenToolbars"></div>
    <script>
    $(function() {
        $("#spreadsheet").kendoSpreadsheet({
            excel: {                
                // Required to enable saving files in older browsers
                proxyURL: "https://demos.telerik.com/kendo-ui/service/export"
            },
            pdf: {                
                proxyURL: "https://demos.telerik.com/kendo-ui/service/export"
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
                                    value: 216321, textAlign: "center", background: "rgb(255,255,255)", color: "rgb(0,62,117)"
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
                                    value: 546897, textAlign: "center", background: "rgb(229,243,255)", color: "rgb(0,62,117)"
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
                                    value: 456231, textAlign: "center", background: "rgb(255,255,255)", color: "rgb(0,62,117)"
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
                                    value: 455873, textAlign: "center", background: "rgb(229,243,255)", color: "rgb(0,62,117)"
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
                                    value: 456892, textAlign: "center", background: "rgb(255,255,255)", color: "rgb(0,62,117)"
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
                                    value: 546564, textAlign: "center", background: "rgb(229,243,255)", color: "rgb(0,62,117)"
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
                                    value: 789455, textAlign: "center", background: "rgb(255,255,255)", color: "rgb(0,62,117)"
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
                                    value: 123002, textAlign: "center", background: "rgb(229,243,255)", color: "rgb(0,62,117)"
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
                                    value: 564896, textAlign: "center", background: "rgb(255,255,255)", color: "rgb(0,62,117)"
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
        }).data("kendoSpreadsheet").one("render", function (e) {
            e.sender.sheets().forEach(function (sheet) {
                sheet.range(0, 0, sheet._rows._count, sheet._columns._count).enable(false);
            })
        });
    });
    </script>
  <style>
    .hiddenToolbars .k-tabstrip-wrapper, /* hide the main menu bars */
    .hiddenToolbars .k-spreadsheet-action-bar, /* hide the formula bar */
    .hiddenToolbars .k-spreadsheet-sheets-bar /* hide the sheets list bar */
    {
        display: none;
    }

    .hiddenToolbars {/* hide the border that is usually around the toolbars */
      border: 0;
    }
</style>
</div>
```

## See Also

 * [API Reference of the Kendo UI Spreadsheet for jQuery](https://docs.telerik.com/kendo-ui/api/javascript/ui/spreadsheet)
 * [`Range` API Reference](https://docs.telerik.com/kendo-ui/api/javascript/spreadsheet/range)
