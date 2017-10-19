---
title: Remove the Undo and Redo Buttons on the Spreadsheet Toolbar without Hiding the Whole Toolbar
description: How can I remove the undo and redo buttons on the spreadsheet toolbar without hiding the whole toolbar?
type: how-to
page_title: Hide Undo and Redo Toolbar Buttons | Kendo UI Spreadsheet
slug: spreadsheet-remove-undo-redo-buttons
tags: spreadsheet, toolbar-buttons, undo, redo
ticketid: 1135749
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Spreadsheet</td>
 </tr>
</table>

## Description

How can I remove the undo and redo buttons on the Kendo Spreadsheet toolbar without hiding the whole toolbar?

## Solution

You can remove the Undo and Redo buttons from the Spreadsheet Toolbar by applying the following CSS rules:

```html
    <div id="spreadsheet"></div>
	
    <script>
		$("#spreadsheet").kendoSpreadsheet();
    </script>
	
	<style>
		.k-spreadsheet .k-tabstrip-wrapper .k-spreadsheet-quick-access-toolbar {
			display: none;
		}
		.k-spreadsheet .k-tabstrip-wrapper .k-tabstrip-items {
			padding-left: .3em !important;
		}
	</style>
```

## See Also

* [Kendo Spreadsheet API Reference](http://docs.telerik.com/kendo-ui/api/javascript/ui/spreadsheet)

