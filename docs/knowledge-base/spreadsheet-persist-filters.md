---
title: Persisting Filters in Spreadsheet
description: An example of how to persist the selected filters in Spreadsheet | Kendo UI Spreadsheet
type: how-to
page_title: Persist Selected Filters in Spreadsheet after Reload of Data
slug: spreadsheet-persist-filters
tags: kendo, kendo-ui, spreadsheet, filters, persist-filter
ticketid: 1156588
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
We have some pretty large data-set that we are using with the Spreadsheet widget. There are times when the user wants to refresh the Spreadsheet and persist the already selected filters in the widget. They want me to save the filter for each column and then reapply once the data is reloaded. The changes in the data do not affect the number of columns so it is a one for one.

## Solution
As the Spreadsheet widget does not offer support for the described scenario out-of-the-box some advanced use of its API would be needed in this case.

First you could store the current filter state on the Sheet by retrieving it using [the filter() method](https://docs.telerik.com/kendo-ui/api/javascript/ui/spreadsheet/configuration/sheets.filter):

```js
var spread = $("#spreadsheet").getKendoSpreadsheet();
var sheet = spread.activeSheet();
var currentFilter = sheet.filter();

if (currentFilter && currentFilter.columns && currentFilter.columns.length > 0) {
    filter = currentFilter;
}
```

Then, when that would be needed, the filter status can be restored using [the filter() method of the Range object](https://docs.telerik.com/kendo-ui/api/javascript/spreadsheet/range/methods/filter):

```js
var spread = $("#spreadsheet").getKendoSpreadsheet();
var sheet = spread.activeSheet();
var columns = filter.columns;
var topLeft = filter.ref.topLeft;
var bottomRight = filter.ref.bottomRight;
var range = sheet.range(topLeft.row, topLeft.col, bottomRight.row, bottomRight.col + 1);

for (var i = 0; i < columns.length; i++ ) {
    columns[i].column = columns[i].index;
}

range.filter(columns);
```

Here you could find a small sample implementing the above suggestion:

```html
<input type="button" value="Save filters" id="save"/>
<input type="button" value="Reload filters" id="reload"/>
<div id="spreadsheet" style="width: 100%"></div>
<script>
  $(function() {
    var filter;

    $('#save').on('click', function() {
      var spread = $("#spreadsheet").getKendoSpreadsheet();
      var sheet = spread.activeSheet();
      var currentFilter = sheet.filter();

      if (currentFilter && currentFilter.columns && currentFilter.columns.length > 0) {
        filter = currentFilter;
      }
    });

    $('#reload').on('click', function() {
      if (!filter) {
        return;
      }

      var spread = $("#spreadsheet").getKendoSpreadsheet();
      var sheet = spread.activeSheet();
      var columns = filter.columns;
      var topLeft = filter.ref.topLeft;
      var bottomRight = filter.ref.bottomRight;
      var range = sheet.range(topLeft.row, topLeft.col, bottomRight.row, bottomRight.col + 1);

      for (var i = 0; i < columns.length; i++ ) {
        columns[i].column = columns[i].index;
      }

      range.filter(columns);
    });

    $("#spreadsheet").kendoSpreadsheet({
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
            }
          ]
        }]
    });
  });
</script>
```

## See Also

* [API Reference of the Spreadsheet](http://docs.telerik.com/kendo-ui/api/javascript/ui/spreadsheet)
