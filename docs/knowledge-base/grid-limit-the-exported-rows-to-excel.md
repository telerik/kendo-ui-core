---
title: Export To Excel With Limit Rows
description: An example on how to limit the number of exported rows
type: how-to
page_title: Limit the Exported Rows to Excel
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
		<td>Progress® Kendo UI® Grid for ASP.NET MVC</td>
	</tr>
</table>


## Description

I want to set a configurable limit to the number of row exported to Excel.

## Solution

The desired result can be achieved by splicing the array of exported rows during the [excelExport](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/excelexport) event based on a value:  
  

Please chech the example demonstrating this:

````html
<div id="grid"></div>
    <script>
      var numerOfrows = 5 // the number of the exported rows
      $("#grid").kendoGrid({
        toolbar: ["excel"],
        excelExport: function(e) {
          var sheet = e.workbook.sheets[0];
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
````
