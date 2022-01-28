---
title: Remove the Undo and Redo Buttons on the Spreadsheet Toolbar without Hiding the Whole Toolbar
description: An example on how to remove the Undo and Redo buttons on the toolbar of the Kendo UI Spreadsheet without hiding the whole toolbar.
type: how-to
page_title: Hide the Undo and Redo Toolbar Buttons | Kendo UI Spreadsheet for jQuery
slug: spreadsheet-remove-undo-redo-buttons
tags: spreadsheet, toolbar-buttons, undo, redo
ticketid: 1135749
res_type: kb
component: spreadsheet
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Spreadsheet</td>
 </tr>
</table>

## Description

How can I remove the **Undo** and **Redo** buttons on the Kendo UI Spreadsheet toolbar without hiding the whole toolbar?

## Solution

To remove the buttons, apply CSS rules.


```dojo
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

* [API Reference of the Spreadsheet](https://docs.telerik.com/kendo-ui/api/javascript/ui/spreadsheet)
