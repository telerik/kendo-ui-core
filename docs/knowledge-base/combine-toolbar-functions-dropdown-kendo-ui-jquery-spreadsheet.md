---
title: Merging Toolbar Functions into a Dropdown in Kendo UI for jQuery Spreadsheet
description: Learn how to combine multiple toolbar functions into a dropdown menu in Kendo UI for jQuery Spreadsheet.
type: how-to
page_title: Combine Toolbar Functions into Dropdown in Kendo UI Spreadsheet
meta_title: Combine Toolbar Functions into Dropdown in Kendo UI Spreadsheet
slug: combine-toolbar-functions-dropdown-kendo-ui-jquery-spreadsheet
tags: spreadsheet, kendo ui for jquery, toolbar, dropdown, merge cells, row height, column width
res_type: kb
ticketid: 1706084
---

## Environment

<table>
<tbody>
<tr>
<td> Product </td>
<td>
Kendo UI for jQuery Spreadsheet
</td>
</tr>
<tr>
<td> Version </td>
<td>
2025.4.1217
</td>
</tr>
</tbody>
</table>

## Description

I want to merge multiple toolbar functions, such as merging cells, setting row height, and setting column width, into a dropdown menu in Kendo UI for jQuery Spreadsheet.

This knowledge base article also answers the following questions:  
- How to customize the toolbar in Kendo UI for jQuery Spreadsheet?  
- How to create a dropdown for toolbar actions in Kendo UI for jQuery Spreadsheet?  
- How to integrate multiple actions into one dropdown in Kendo UI Spreadsheet?  

## Solution

To combine toolbar functions into a dropdown menu in Kendo UI for jQuery Spreadsheet, use the following steps:

1. Define a custom toolbar template with a dropdown list.
2. Implement a [`kendoDropDownList`](https://www.telerik.com/kendo-jquery-ui/documentation/controls/dropdownlist/overview) instance for the dropdown.
3. Handle the [`change`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/dropdownlist/events/change) event to execute actions based on the selected value.

Here is an example implementation:

```dojo
<div id="spreadsheet"></div>
<script>
	$("#spreadsheet").kendoSpreadsheet({
	  toolbar: {
	    home: [
	      {
	        template: '<select id="toolbarDropdown">' +
	                    '<option value="">Toolbar Actions</option>' +
	                    '<option value="merge">Merge Cells</option>' +
	                    '<option value="rowHeight">Set Row Height</option>' +
	                    '<option value="colWidth">Set Column Width</option>' +
	                  '</select>',
	        overflow: "never"
	      }
	    ]
	  }
	});

	$("#toolbarDropdown").kendoDropDownList({
	  change: function(e) {
	  	var sheet = $("#spreadsheet").data("kendoSpreadsheet").activeSheet();
			var selected = e.sender.value();
			if (selected === "merge") {
			  sheet.range(sheet.selection()).merge();
			} else if (selected === "rowHeight") {
			const selection = sheet.selection(); // returns range like { top, left, bottom, right }
			const rowIndex = selection._ref.topLeft.row;
			  sheet.rowHeight(rowIndex, 80);
			} else if (selected === "colWidth") {
			  const selection = sheet.selection(); // returns range like { top, left, bottom, right }
			  var colIndex =  selection._ref.topLeft.col;
			  sheet.columnWidth(colIndex, 120);
			}
	  }
	});
</script>
```

Expand the dropdown to include additional actions as required.

## See Also

- [Kendo UI for jQuery Spreadsheet Documentation](https://www.telerik.com/kendo-jquery-ui/documentation/controls/spreadsheet/overview)  
- [API Reference: Kendo UI Spreadsheet](https://docs.telerik.com/kendo-ui/api/javascript/ui/spreadsheet)  
