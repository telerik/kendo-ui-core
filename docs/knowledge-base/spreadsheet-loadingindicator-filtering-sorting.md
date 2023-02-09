---
title: Add a Loading Indicator to Spreadsheet While Filtering and Sorting
description: Learn how to add loading indicator to Spreadsheet while filtering or sorting.
type: how-to
page_title: How to Add Loading Indicator to Spreadsheet While Filtering or Sorting - Kendo UI Spreadsheet for jQuery
slug: spreadsheet-loadingindicator-filtering-sorting
tags: kendo, kendoui, spreadsheet, filtering, sorting
ticketid: 1575511
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

How I can add a loading indicator while filtering or sorting of the Spreadsheet?

## Solution

1. You can to handle the click event of the filter icon.
1. Once the sorting or filtering is applied you can display a loading indicator for a certain time.

```dojo
    <div id="example">
      <div id="spreadsheet" style="width: 100%"></div>
      <script>
        $(function() {
          $("#spreadsheet").kendoSpreadsheet({
            render: function(){

            },
            sheets: [
              {
                name: "OrdersLog",
                mergedCells: [
                  "A1:G1",
                  "A2:F2"
                ],
                filter: {
                  ref: "A3:G49",
                  columns:[]
                },
                columns: [
                  { width: 80 },
                  { width: 100 },
                  { width: 100 },
                  { width: 150 },
                  { width: 150 },
                  { width: 130 },
                  { width: 130 }
                ],
                rows: [
                  {
                    height: 50,
                    cells: [
                      {
                        value: "ORDERS LOG", background: "rgb(144,164,174)", textAlign: "center",
                        color: "white", fontSize: 18
                      }
                    ]
                  },
                  {
                    cells: [
                      {
                        value: "REPORT", background: "rgb(176,190,197)", color: "white", textAlign: "right"
                      },
                      {
                        format: "MMM-dd", formula: "TODAY()", background: "rgb(176,190,197)", color: "white", index: 6
                      }
                    ]
                  },
                  {
                    cells: [
                      {
                        value: "ID", bold: "true", background: "rgb(236,239,241)", color: "black", textAlign: "center"
                      },
                      {
                        value: "DATE", bold: "true", background: "rgb(236,239,241)", color: "black", textAlign: "center"
                      },
                      {
                        value: "TIME", bold: "true", background: "rgb(236,239,241)", color: "black", textAlign: "center"
                      },
                      {
                        value: "CLIENT", bold: "true", background: "rgb(236,239,241)", color: "black", textAlign: "center"
                      },
                      {
                        value: "COMPANY", bold: "true", background: "rgb(236,239,241)", color: "black", textAlign: "center"
                      },
                      {
                        value: "SHIPPING", bold: "true", background: "rgb(236,239,241)", color: "black", textAlign: "center"
                      },
                      {
                        value: "DISCOUNT", bold: "true", background: "rgb(236,239,241)", color: "black", textAlign: "center"
                      }
                    ]
                  },
                  {
                    cells: [
                      {
                        value: 10223, textAlign: "center"
                      },
                      {
                        value: new Date("6/30/2014"), textAlign: "center"
                      },
                      {
                        value: new Date("6/30/2014 9:30"), format: "hh:mm", textAlign: "center"
                      },
                      {
                        value: "Terry Lawson", textAlign: "left"
                      },
                      {
                        value: "Excella", textAlign: "left"
                      },
                      {
                        value: "1 day", textAlign: "center"
                      },
                      {
                        value: 0.02, format: "0%", textAlign: "center"
                      }
                    ]
                  },
                  {
                    cells: [
                      {
                        value: 10247, textAlign: "center"
                      },
                      {
                        value: new Date("7/1/2014"), textAlign: "center"
                      },
                      {
                        value: new Date("7/1/2014 15:15"), format: "hh:mm", textAlign: "center"
                      },
                      {
                        value: "Charles Miller", textAlign: "left"
                      },
                      {
                        value: "Complete Tech", textAlign: "left"
                      },
                      {
                        value: "2 days", textAlign: "center"
                      },
                      {
                        value: 0.08, format: "0%", textAlign: "center"
                      }
                    ]
                  },
                  {
                    cells: [
                      {
                        value: 10251, textAlign: "center"
                      },
                      {
                        value: new Date("7/1/2014"), textAlign: "center"
                      },
                      {
                        value: new Date("7/1/2014 14:13"), format: "hh:mm", textAlign: "center"
                      },
                      {
                        value: "Jennie Walker", textAlign: "left"
                      },
                      {
                        value: "Plan Smart", textAlign: "left"
                      },
                      {
                        value: "2 days", textAlign: "center"
                      },
                      {
                        value: 0.10, format: "0%", textAlign: "center"
                      }
                    ]
                  },
                  {
                    cells: [
                      {
                        value: 10226, textAlign: "center"
                      },
                      {
                        value: new Date("6/30/2014"), textAlign: "center"
                      },
                      {
                        value: new Date("6/30/2014 17:43"), format: "hh:mm", textAlign: "center"
                      },
                      {
                        value: "Samuel Green", textAlign: "left"
                      },
                      {
                        value: "Excella", textAlign: "left"
                      },
                      {
                        value: "regular", textAlign: "center"
                      },
                      {
                        value: 0.08, format: "0%", textAlign: "center"
                      }
                    ]
                  },
                  {
                    cells: [
                      {
                        value: 10227, textAlign: "center"
                      },
                      {
                        value: new Date("6/30/2014"), textAlign: "center"
                      },
                      {
                        value: new Date("6/30/2014 10:27"), format: "hh:mm", textAlign: "center"
                      },
                      {
                        value: "James Smith", textAlign: "left"
                      },
                      {
                        value: "Complete Tech", textAlign: "left"
                      },
                      {
                        value: "2 days", textAlign: "center"
                      },
                      {
                        value: 0.01, format: "0%", textAlign: "center"
                      }
                    ]
                  },
                  {
                    cells: [
                      {
                        value: 10228, textAlign: "center"
                      },
                      {
                        value: new Date("6/30/2014"), textAlign: "center"
                      },
                      {
                        value: new Date("6/30/2014 11:12"), format: "hh:mm", textAlign: "center"
                      },
                      {
                        value: "Nora Allen", textAlign: "left"
                      },
                      {
                        value: "Plan Smart", textAlign: "left"
                      },
                      {
                        value: "express", textAlign: "center"
                      },
                      {
                        value: 0, format: "0%", textAlign: "center"
                      }
                    ]
                  },
                  {
                    cells: [
                      {
                        value: 10229, textAlign: "center"
                      },
                      {
                        value: new Date("6/29/2014"), textAlign: "center"
                      },
                      {
                        value: new Date("6/29/2014 13:56"), format: "hh:mm", textAlign: "center"
                      },
                      {
                        value: "Robyn Mason", textAlign: "left"
                      },
                      {
                        value: "Excella", textAlign: "left"
                      },
                      {
                        value: "express", textAlign: "center"
                      },
                      {
                        value: 0.07, format: "0%", textAlign: "center"
                      }
                    ]
                  },
                  {
                    cells: [
                      {
                        value: 10230, textAlign: "center"
                      },
                      {
                        value: new Date("6/29/2014"), textAlign: "center"
                      },
                      {
                        value: new Date("6/29/2014 14:40"), format: "hh:mm", textAlign: "center"
                      },
                      {
                        value: "Ralph Burke", textAlign: "left"
                      },
                      {
                        value: "Plan Smart", textAlign: "left"
                      },
                      {
                        value: "regular", textAlign: "center"
                      },
                      {
                        value: 0.06, format: "0%", textAlign: "center"
                      }
                    ]
                  },
                  {
                    cells: [
                      {
                        value: 10231, textAlign: "center"
                      },
                      {
                        value: new Date("6/29/2014"), textAlign: "center"
                      },
                      {
                        value: new Date("6/29/2014 8:25"), format: "hh:mm", textAlign: "center"
                      },
                      {
                        value: "Patty Prince", textAlign: "left"
                      },
                      {
                        value: "Integra Design", textAlign: "left"
                      },
                      {
                        value: "1 day", textAlign: "center"
                      },
                      {
                        value: 0.02, format: "0%", textAlign: "center"
                      }
                    ]
                  },
                  {
                    cells: [
                      {
                        value: 10232, textAlign: "center"
                      },
                      {
                        value: new Date("6/29/2014"), textAlign: "center"
                      },
                      {
                        value: new Date("6/29/2014 10:09"), format: "hh:mm", textAlign: "center"
                      },
                      {
                        value: "Natasha Green", textAlign: "left"
                      },
                      {
                        value: "Excella", textAlign: "left"
                      },
                      {
                        value: "express", textAlign: "center"
                      },
                      {
                        value: 0, format: "0%", textAlign: "center"
                      }
                    ]
                  },
                  {
                    cells: [
                      {
                        value: 10233, textAlign: "center"
                      },
                      {
                        value: new Date("6/29/2014"), textAlign: "center"
                      },
                      {
                        value: new Date("6/29/2014 12:54"), format: "hh:mm", textAlign: "center"
                      },
                      {
                        value: "James Smith", textAlign: "left"
                      },
                      {
                        value: "Complete Tech", textAlign: "left"
                      },
                      {
                        value: "express", textAlign: "center"
                      },
                      {
                        value: 0.03, format: "0%", textAlign: "center"
                      }
                    ]
                  },
                  {
                    cells: [
                      {
                        value: 10259, textAlign: "center"
                      },
                      {
                        value: new Date("7/2/2014"), textAlign: "center"
                      },
                      {
                        value: new Date("7/2/2014 11:28"), format: "hh:mm", textAlign: "center"
                      },
                      {
                        value: "Francis Stevens", textAlign: "left"
                      },
                      {
                        value: "Plan Smart", textAlign: "left"
                      },
                      {
                        value: "2 days", textAlign: "center"
                      },
                      {
                        value: 0.08, format: "0%", textAlign: "center"
                      }
                    ]
                  },
                  {
                    cells: [
                      {
                        value: 10235, textAlign: "center"
                      },
                      {
                        value: new Date("6/29/2014"), textAlign: "center"
                      },
                      {
                        value: new Date("6/29/2014 18:22"), format: "hh:mm", textAlign: "center"
                      },
                      {
                        value: "Roger Peters", textAlign: "left"
                      },
                      {
                        value: "Integra Design", textAlign: "left"
                      },
                      {
                        value: "2 days", textAlign: "center"
                      },
                      {
                        value: 0.03, format: "0%", textAlign: "center"
                      }
                    ]
                  },
                  {
                    cells: [
                      {
                        value: 10236, textAlign: "center"
                      },
                      {
                        value: new Date("6/29/2014"), textAlign: "center"
                      },
                      {
                        value: new Date("6/29/2014 9:07"), format: "hh:mm", textAlign: "center"
                      },
                      {
                        value: "Nora Allen", textAlign: "left"
                      },
                      {
                        value: "Plan Smart", textAlign: "left"
                      },
                      {
                        value: "express", textAlign: "center"
                      },
                      {
                        value: 0.02, format: "0%", textAlign: "center"
                      }
                    ]
                  },
                  {
                    cells: [
                      {
                        value: 10224, textAlign: "center"
                      },
                      {
                        value: new Date("6/30/2014"), textAlign: "center"
                      },
                      {
                        value: new Date("6/30/2014 12:14"), format: "hh:mm", textAlign: "center"
                      },
                      {
                        value: "Scott Lewis", textAlign: "left"
                      },
                      {
                        value: "Circuit Design", textAlign: "left"
                      },
                      {
                        value: "express", textAlign: "center"
                      },
                      {
                        value: 0.09, format: "0%", textAlign: "center"
                      }
                    ]
                  },
                  {
                    cells: [
                      {
                        value: 10225, textAlign: "center"
                      },
                      {
                        value: new Date("6/30/2014"), textAlign: "center"
                      },
                      {
                        value: new Date("6/30/2014 14:58"), format: "hh:mm", textAlign: "center"
                      },
                      {
                        value: "Scott Fox", textAlign: "left"
                      },
                      {
                        value: "Zig Zag Coder", textAlign: "left"
                      },
                      {
                        value: "express", textAlign: "center"
                      },
                      {
                        value: 0.10, format: "0%", textAlign: "center"
                      }
                    ]
                  },
                  {
                    cells: [
                      {
                        value: 10239, textAlign: "center"
                      },
                      {
                        value: new Date("6/29/2014"), textAlign: "center"
                      },
                      {
                        value: new Date("6/29/2014 17:20"), format: "hh:mm", textAlign: "center"
                      },
                      {
                        value: "Marian Rodriguez", textAlign: "left"
                      },
                      {
                        value: "Zig Zag Coder", textAlign: "left"
                      },
                      {
                        value: "1 day", textAlign: "center"
                      },
                      {
                        value: 0.06, format: "0%", textAlign: "center"
                      }
                    ]
                  },
                  {
                    cells: [
                      {
                        value: 10240, textAlign: "center"
                      },
                      {
                        value: new Date("6/29/2014"), textAlign: "center"
                      },
                      {
                        value: new Date("6/29/2014 8:04"), format: "hh:mm", textAlign: "center"
                      },
                      {
                        value: "Joe Lawrence", textAlign: "left"
                      },
                      {
                        value: "Complete Tech", textAlign: "left"
                      },
                      {
                        value: "2 days", textAlign: "center"
                      },
                      {
                        value: 0.07, format: "0%", textAlign: "center"
                      }
                    ]
                  },
                  {
                    cells: [
                      {
                        value: 10241, textAlign: "center"
                      },
                      {
                        value: new Date("6/29/2014"), textAlign: "center"
                      },
                      {
                        value: new Date("6/29/2014 10:49"), format: "hh:mm", textAlign: "center"
                      },
                      {
                        value: "Francis Stevens", textAlign: "left"
                      },
                      {
                        value: "Plan Smart", textAlign: "left"
                      },
                      {
                        value: "regular", textAlign: "center"
                      },
                      {
                        value: 0, format: "0%", textAlign: "center"
                      }
                    ]
                  },
                  {
                    cells: [
                      {
                        value: 10242, textAlign: "center"
                      },
                      {
                        value: new Date("6/29/2014"), textAlign: "center"
                      },
                      {
                        value: new Date("6/29/2014 13:33"), format: "hh:mm", textAlign: "center"
                      },
                      {
                        value: "Lynda Evans", textAlign: "left"
                      },
                      {
                        value: "Complete Tech", textAlign: "left"
                      },
                      {
                        value: "regular", textAlign: "center"
                      },
                      {
                        value: 0.05, format: "0%", textAlign: "center"
                      }
                    ]
                  },
                  {
                    cells: [
                      {
                        value: 10243, textAlign: "center"
                      },
                      {
                        value: new Date("6/29/2014"), textAlign: "center"
                      },
                      {
                        value: new Date("6/29/2014 16:18"), format: "hh:mm", textAlign: "center"
                      },
                      {
                        value: "Keith Clark", textAlign: "left"
                      },
                      {
                        value: "Circuit Design", textAlign: "left"
                      },
                      {
                        value: "1 day", textAlign: "center"
                      },
                      {
                        value: 0, format: "0%", textAlign: "center"
                      }
                    ]
                  },
                  {
                    cells: [
                      {
                        value: 10244, textAlign: "center"
                      },
                      {
                        value: new Date("7/1/2014"), textAlign: "center"
                      },
                      {
                        value: new Date("7/1/2014 19:02"), format: "hh:mm", textAlign: "center"
                      },
                      {
                        value: "Kara Wood", textAlign: "left"
                      },
                      {
                        value: "Excella", textAlign: "left"
                      },
                      {
                        value: "2 days", textAlign: "center"
                      },
                      {
                        value: 0, format: "0%", textAlign: "center"
                      }
                    ]
                  },
                  {
                    cells: [
                      {
                        value: 10245, textAlign: "center"
                      },
                      {
                        value: new Date("7/1/2014"), textAlign: "center"
                      },
                      {
                        value: new Date("7/1/2014 9:46"), format: "hh:mm", textAlign: "center"
                      },
                      {
                        value: "Juan Jacobs", textAlign: "left"
                      },
                      {
                        value: "Plan Smart", textAlign: "left"
                      },
                      {
                        value: "regular", textAlign: "center"
                      },
                      {
                        value: 0.07, format: "0%", textAlign: "center"
                      }
                    ]
                  },
                  {
                    cells: [
                      {
                        value: 10237, textAlign: "center"
                      },
                      {
                        value: new Date("6/29/2014"), textAlign: "center"
                      },
                      {
                        value: new Date("6/29/2014 13:51"), format: "hh:mm", textAlign: "center"
                      },
                      {
                        value: "Samuel Green", textAlign: "left"
                      },
                      {
                        value: "Excella", textAlign: "left"
                      },
                      {
                        value: "express", textAlign: "center"
                      },
                      {
                        value: 0.15, format: "0%", textAlign: "center"
                      }
                    ]
                  },
                  {
                    cells: [
                      {
                        value: 10265, textAlign: "center"
                      },
                      {
                        value: new Date("7/2/2014"), textAlign: "center"
                      },
                      {
                        value: new Date("7/2/2014 14:36"), format: "hh:mm", textAlign: "center"
                      },
                      {
                        value: "Alison Thompson", textAlign: "left"
                      },
                      {
                        value: "Circuit Design", textAlign: "left"
                      },
                      {
                        value: "express", textAlign: "center"
                      },
                      {
                        value: 0.10, format: "0%", textAlign: "center"
                      }
                    ]
                  },
                  {
                    cells: [
                      {
                        value: 10248, textAlign: "center"
                      },
                      {
                        value: new Date("7/1/2014"), textAlign: "center"
                      },
                      {
                        value: new Date("7/1/2014 18:07"), format: "hh:mm", textAlign: "center"
                      },
                      {
                        value: "Jerry Wright", textAlign: "left"
                      },
                      {
                        value: "Integra Design", textAlign: "left"
                      },
                      {
                        value: "regular", textAlign: "center"
                      },
                      {
                        value: 0.07, format: "0%", textAlign: "center"
                      }
                    ]
                  },
                  {
                    cells: [
                      {
                        value: 10234, textAlign: "center"
                      },
                      {
                        value: new Date("6/29/2014"), textAlign: "center"
                      },
                      {
                        value: new Date("6/29/2014 15:38"), format: "hh:mm", textAlign: "center"
                      },
                      {
                        value: "Nora Allen", textAlign: "left"
                      },
                      {
                        value: "Plan Smart", textAlign: "left"
                      },
                      {
                        value: "regular", textAlign: "center"
                      },
                      {
                        value: 0.10, format: "0%", textAlign: "center"
                      }
                    ]
                  },
                  {
                    cells: [
                      {
                        value: 10238, textAlign: "center"
                      },
                      {
                        value: new Date("6/29/2014"), textAlign: "center"
                      },
                      {
                        value: new Date("6/29/2014 14:36"), format: "hh:mm", textAlign: "center"
                      },
                      {
                        value: "Mark Moore", textAlign: "left"
                      },
                      {
                        value: "Webcom Services", textAlign: "left"
                      },
                      {
                        value: "regular", textAlign: "center"
                      },
                      {
                        value: 0.09, format: "0%", textAlign: "center"
                      }
                    ]
                  },
                  {
                    cells: [
                      {
                        value: 10246, textAlign: "center"
                      },
                      {
                        value: new Date("7/1/2014"), textAlign: "center"
                      },
                      {
                        value: new Date("7/1/2014 12:31"), format: "hh:mm", textAlign: "center"
                      },
                      {
                        value: "Patty Prince", textAlign: "left"
                      },
                      {
                        value: "Integra Design", textAlign: "left"
                      },
                      {
                        value: "regular", textAlign: "center"
                      },
                      {
                        value: 0.08, format: "0%", textAlign: "center"
                      }
                    ]
                  },
                  {
                    cells: [
                      {
                        value: 10252, textAlign: "center"
                      },
                      {
                        value: new Date("7/1/2014"), textAlign: "center"
                      },
                      {
                        value: new Date("7/1/2014 16:57"), format: "hh:mm", textAlign: "center"
                      },
                      {
                        value: "James Smith", textAlign: "left"
                      },
                      {
                        value: "Complete Tech", textAlign: "left"
                      },
                      {
                        value: "express", textAlign: "center"
                      },
                      {
                        value: 0.02, format: "0%", textAlign: "center"
                      }
                    ]
                  },
                  {
                    cells: [
                      {
                        value: 10253, textAlign: "center"
                      },
                      {
                        value: new Date("7/1/2014"), textAlign: "center"
                      },
                      {
                        value: new Date("7/1/2014 18:42"), format: "hh:mm", textAlign: "center"
                      },
                      {
                        value: "Marian Rodriguez", textAlign: "left"
                      },
                      {
                        value: "Zig Zag Coder", textAlign: "left"
                      },
                      {
                        value: "regular", textAlign: "center"
                      },
                      {
                        value: 0.01, format: "0%", textAlign: "center"
                      }
                    ]
                  },
                  {
                    cells: [
                      {
                        value: 10254, textAlign: "center"
                      },
                      {
                        value: new Date("7/1/2014"), textAlign: "center"
                      },
                      {
                        value: new Date("7/1/2014 9:46"), format: "hh:mm", textAlign: "center"
                      },
                      {
                        value: "Patty Prince", textAlign: "left"
                      },
                      {
                        value: "Integra Design", textAlign: "left"
                      },
                      {
                        value: "express", textAlign: "center"
                      },
                      {
                        value: 0, format: "0%", textAlign: "center"
                      }
                    ]
                  },
                  {
                    cells: [
                      {
                        value: 10255, textAlign: "center"
                      },
                      {
                        value: new Date("7/1/2014"), textAlign: "center"
                      },
                      {
                        value: new Date("7/1/2014 12:31"), format: "hh:mm", textAlign: "center"
                      },
                      {
                        value: "Jack Sims", textAlign: "left"
                      },
                      {
                        value: "Circuit Design", textAlign: "left"
                      },
                      {
                        value: "express", textAlign: "center"
                      },
                      {
                        value: 0, format: "0%", textAlign: "center"
                      }
                    ]
                  },
                  {
                    cells: [
                      {
                        value: 10256, textAlign: "center"
                      },
                      {
                        value: new Date("7/2/2014"), textAlign: "center"
                      },
                      {
                        value: new Date("7/2/2014 15:15"), format: "hh:mm", textAlign: "center"
                      },
                      {
                        value: "Hannah Watson", textAlign: "left"
                      },
                      {
                        value: "Excella", textAlign: "left"
                      },
                      {
                        value: "regular", textAlign: "center"
                      },
                      {
                        value: 0.01, format: "0%", textAlign: "center"
                      }
                    ]
                  },
                  {
                    cells: [
                      {
                        value: 10257, textAlign: "center"
                      },
                      {
                        value: new Date("7/2/2014"), textAlign: "center"
                      },
                      {
                        value: new Date("7/2/2014 18:07"), format: "hh:mm", textAlign: "center"
                      },
                      {
                        value: "Gregory Morrison", textAlign: "left"
                      },
                      {
                        value: "Webcom Services", textAlign: "left"
                      },
                      {
                        value: "2 days", textAlign: "center"
                      },
                      {
                        value: 0.04, format: "0%", textAlign: "center"
                      }
                    ]
                  },
                  {
                    cells: [
                      {
                        value: 10258, textAlign: "center"
                      },
                      {
                        value: new Date("7/2/2014"), textAlign: "center"
                      },
                      {
                        value: new Date("7/2/2014 8:44"), format: "hh:mm", textAlign: "center"
                      },
                      {
                        value: "Joe Lawrence", textAlign: "left"
                      },
                      {
                        value: "Complete Tech", textAlign: "left"
                      },
                      {
                        value: "1 day", textAlign: "center"
                      },
                      {
                        value: 0, format: "0%", textAlign: "center"
                      }
                    ]
                  },
                  {
                    cells: [
                      {
                        value: 10249, textAlign: "center"
                      },
                      {
                        value: new Date("7/1/2014"), textAlign: "center"
                      },
                      {
                        value: new Date("7/1/2014 8:44"), format: "hh:mm", textAlign: "center"
                      },
                      {
                        value: "Edward Hall", textAlign: "left"
                      },
                      {
                        value: "Zig Zag Coder", textAlign: "left"
                      },
                      {
                        value: "regular", textAlign: "center"
                      },
                      {
                        value: 0.08, format: "0%", textAlign: "center"
                      }
                    ]
                  },
                  {
                    cells: [
                      {
                        value: 10260, textAlign: "center"
                      },
                      {
                        value: new Date("7/2/2014"), textAlign: "center"
                      },
                      {
                        value: new Date("7/2/2014 14:13"), format: "hh:mm", textAlign: "center"
                      },
                      {
                        value: "Glenda White", textAlign: "left"
                      },
                      {
                        value: "Webcom Services", textAlign: "left"
                      },
                      {
                        value: "regular", textAlign: "center"
                      },
                      {
                        value: 0.05, format: "0%", textAlign: "center"
                      }
                    ]
                  },
                  {
                    cells: [
                      {
                        value: 10261, textAlign: "center"
                      },
                      {
                        value: new Date("7/2/2014"), textAlign: "center"
                      },
                      {
                        value: new Date("7/2/2014 16:57"), format: "hh:mm", textAlign: "center"
                      },
                      {
                        value: "Lynda Evans", textAlign: "left"
                      },
                      {
                        value: "Complete Tech", textAlign: "left"
                      },
                      {
                        value: "1 day", textAlign: "center"
                      },
                      {
                        value: 0.01, format: "0%", textAlign: "center"
                      }
                    ]
                  },
                  {
                    cells: [
                      {
                        value: 10262, textAlign: "center"
                      },
                      {
                        value: new Date("7/2/2014"), textAlign: "center"
                      },
                      {
                        value: new Date("7/2/2014 8:48"), format: "hh:mm", textAlign: "center"
                      },
                      {
                        value: "Edward Hall", textAlign: "left"
                      },
                      {
                        value: "Zig Zag Coder", textAlign: "left"
                      },
                      {
                        value: "2 days", textAlign: "center"
                      },
                      {
                        value: 0.04, format: "0%", textAlign: "center"
                      }
                    ]
                  },
                  {
                    cells: [
                      {
                        value: 10250, textAlign: "center"
                      },
                      {
                        value: new Date("7/1/2014"), textAlign: "center"
                      },
                      {
                        value: new Date("7/1/2014 11:28"), format: "hh:mm", textAlign: "center"
                      },
                      {
                        value: "Jerry Wright", textAlign: "left"
                      },
                      {
                        value: "Integra Design", textAlign: "left"
                      },
                      {
                        value: "regular", textAlign: "center"
                      },
                      {
                        value: 0.08, format: "0%", textAlign: "center"
                      }
                    ]
                  },
                  {
                    cells: [
                      {
                        value: 10264, textAlign: "center"
                      },
                      {
                        value: new Date("7/2/2014"), textAlign: "center"
                      },
                      {
                        value: new Date("7/2/2014 13:51"), format: "hh:mm", textAlign: "center"
                      },
                      {
                        value: "Jerry Wright", textAlign: "left"
                      },
                      {
                        value: "Integra Design", textAlign: "left"
                      },
                      {
                        value: "2 days", textAlign: "center"
                      },
                      {
                        value: 0, format: "0%", textAlign: "center"
                      }
                    ]
                  },
                  {
                    cells: [
                      {
                        value: 10263, textAlign: "center"
                      },
                      {
                        value: new Date("7/2/2014"), textAlign: "center"
                      },
                      {
                        value: new Date("7/2/2014 9:07"), format: "hh:mm", textAlign: "center"
                      },
                      {
                        value: "Charles Miller", textAlign: "left"
                      },
                      {
                        value: "Complete Tech", textAlign: "left"
                      },
                      {
                        value: "regular", textAlign: "center"
                      },
                      {
                        value: 0.10, format: "0%", textAlign: "center"
                      }
                    ]
                  },
                  {
                    cells: [
                      {
                        value: 10266, textAlign: "center"
                      },
                      {
                        value: new Date("7/2/2014"), textAlign: "center"
                      },
                      {
                        value: new Date("7/2/2014 17:20"), format: "hh:mm", textAlign: "center"
                      },
                      {
                        value: "Alison Ross", textAlign: "left"
                      },
                      {
                        value: "Excella", textAlign: "left"
                      },
                      {
                        value: "express", textAlign: "center"
                      },
                      {
                        value: 0.02, format: "0%", textAlign: "center"
                      }
                    ]
                  },
                  {
                    cells: [
                      {
                        value: 10267, textAlign: "center"
                      },
                      {
                        value: new Date("7/2/2014"), textAlign: "center"
                      },
                      {
                        value: new Date("7/2/2014 8:04"), format: "hh:mm", textAlign: "center"
                      },
                      {
                        value: "Alexandra Kennedy", textAlign: "left"
                      },
                      {
                        value: "Webcom Services", textAlign: "left"
                      },
                      {
                        value: "regular", textAlign: "center"
                      },
                      {
                        value: 0.05, format: "0%", textAlign: "center"
                      }
                    ]
                  },
                  {
                    cells: [
                      {
                        value: 10268, textAlign: "center"
                      },
                      {
                        value: new Date("7/2/2014"), textAlign: "center"
                      },
                      {
                        value: new Date("7/2/2014 10:49"), format: "hh:mm", textAlign: "center"
                      },
                      {
                        value: "Agnes Hill", textAlign: "left"
                      },
                      {
                        value: "Integra Design", textAlign: "left"
                      },
                      {
                        value: "1 day", textAlign: "center"
                      },
                      {
                        value: 0, format: "0%", textAlign: "center"
                      }
                    ]
                  }
                ]
              }]
          });

          $('.k-spreadsheet-filter').on('click', function(){

            $('.k-spreadsheet-filter-menu [data-command="sort"], .k-spreadsheet-filter-menu .k-action-buttons .k-button-solid-primary').bind('click', function(){
              kendo.ui.progress($("#spreadsheet"), true);
              setTimeout(function(){
                kendo.ui.progress($("#spreadsheet"), false);
              }, 500)
            })
          })
        });
      </script>
    </div>
```

## See Also

* [API Reference of the Spreadsheet](api/javascript/ui/spreadsheet)
