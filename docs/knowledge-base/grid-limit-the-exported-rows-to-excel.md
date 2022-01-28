---
title: Export to Excel a Limited Number of Rows
description: An example on how to limit the number of the Kendo UI Grid rows which are exported to Excel.
type: how-to
page_title: Limit the Exported Rows to Excel | Kendo UI Grid for ASP.NET MVC
slug: grid-limit-the-exported-rows-to-excel
tags: grid, excel, export
ticketid: 1146796
res_type: kb
---

## Environment

<table>
	<tr>
		<td>Product Version</td>
		<td>2017.3 1026</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>Progress Kendo UI Grid for ASP.NET MVC</td>
	</tr>
</table>


## Description

How can I set a configurable limit to the number of the Grid rows that are exported to Excel?

## Solution

Split the array of the exported rows based on a value during the [`excelExport`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/excelexport) event.  

```dojo
<div id="grid"></div>
    <script>
      var numerOfrows = 5 // the number of the exported rows
      $("#grid").kendoGrid({
        toolbar: ["excel"],
        excelExport: function(e) { sheet = e.workbook.sheets[0];
          var newSheet = sheet.rows.splice(0, numerOfrows + 1) // +1 is for the header row
          e.workbook.sheets[0].rows = newSheet
        },
        dataSource: {
          data: [
            { text: "Positive", value: 10.5 },
            { text: "Negative", value: -10.5 },
            { text: "Zero", value: 0 },
            { text: "Positive", value: 10.5 },
            { text: "Negative", value: -10.5 },
            { text: "Zero", value: 0 },
            { text: "Positive", value: 10.5 },
            { text: "Negative", value: -10.5 },
            { text: "Zero", value: 0 },            { text: "Positive", value: 10.5 },
            { text: "Negative", value: -10.5 },
            { text: "Zero", value: 0 }
          ]
        }
      });
    </script>
```
