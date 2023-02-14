---
title: Spreadsheet retrieve range of formula cells 
description: Get all formula cells and return their range to perform actions on them after initialization
type: how-to
page_title: Spreadsheet set background color of formula cells
slug: spreadsheet-set-background-color-of-formula-cells
tags: spreadsheet, formula, range, cells, after, initialization
ticketid: 1402148
res_type: kb
---

## Environment
<table>
	<tr>
		<td>Product Version</td>
		<td>2021.1.330</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>Progress® Kendo UI® Spreadsheet for jQuery</td>
	</tr>
</table>

## Description
I want to identify all the formula cells so that I can perform actions on them after initialization such as change background color or disable them. How do I get all the formula values and return their respective ranges?

## Solution
1. Get the Spreadsheet's `[activeSheet](https://docs.telerik.com/kendo-ui/api/javascript/ui/spreadsheet/methods/activesheet)`
1. Use its private **_properties.get("formula").values()** method to get an Array of the cells values that have formulas
1. Utilize the [JS .map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) method, to map the Array
1. In the callback of the map method use the `[sheet.range](https://docs.telerik.com/kendo-ui/api/javascript/spreadsheet/sheet/methods/range)` method to get the `[Range](https://docs.telerik.com/kendo-ui/api/javascript/spreadsheet/range)` of the formula cells currently being mapped and return it to enable later manipulation
 
```dojo
<div id="example">
    <div id="spreadsheet" style="width: 100%;"></div>
    <script>
        var sp = $("#spreadsheet").kendoSpreadsheet({
          sheets: [{
            name: "Test",
            rows: [{
              cells: [
                {"format":"#","index":0,"value":1},
                {"format":"#","index":1,"value":2},
                {"formula":"SUM(A1, B1)","index":2,"value":3},
                {"formula":"SUM(C1, C2)","index":3,"value":10}
              ]
            },{
              cells: [
                {"format":"#","index":0,"value":3},
                {"format":"#","index":1,"value":4},
                {"formula":"SUM(A2, B2)", "index": 2, "value":7}
              ]
            }]
          }]
        }).getKendoSpreadsheet();

      var sheet = sp.activeSheet();
      var formulas = sheet._properties.get("formula").values().map(function (f) {
        var formulaRange = sheet.range(f.value.row, f.value.col);
        formulaRange.background("#92a8d1");
        return formulaRange;
      });
      console.log(formulas);
    </script>
</div>
```