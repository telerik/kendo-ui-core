---
title: Delete Disabled Cell Content with ContextMenu in Spreadsheet
description: An example on how to delete the content of disabled Spreadsheet cells with a ContextMenu command.
type: how-to
page_title: Delete Disabled Cell Content with ContextMenu Command | Kendo UI Spreadsheet for jQuery
slug: spreadsheet-delete-disabled-cells-content
tags: kendo, kendoui, spreadsheet, delete, disabled, cells, contextmenu
ticketid: 1135315
res_type: kb
component: spreadsheet
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Spreadsheet</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 8.1</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Visual Studio version</td>
  <td>Visual Studio 2015</td>
 </tr>
</table>


## Description

I use the Kendo UI ContextMenu to delete rows from the Spreadsheet.

How can I delete a disabled cell in a Spreadsheet row through the **Delete** command from the ContextMenu?

## Solution

1. Bind the `select` event to the ContextMenu of the Spreadsheet.
1. Determine whether the currently selected command is **Delete**.
1. Enable the current selection (which is the entire row) and clear it.

```dojo
<div id="spreadsheet"></div>
<script>
    $(function() {
        var spreadsheet = $("#spreadsheet").kendoSpreadsheet({
                sheets: [{
                    rows: [{
                        cells: [{
                            value: "My Company",
                            enable: false
                        }]
                    }],

                }]
            }).data("kendoSpreadsheet"),
            rowContextMenu = spreadsheet.rowHeaderContextMenu();

        rowContextMenu.bind("select", function(e) {
			var command = $(e.item).text();
			var sheet = spreadsheet.activeSheet();
			var selection = sheet.selection();
			var rowsToBeDeleted = [];
			var shouldManuallyDelete = false;

			if (command == "Delete") {
				selection.forEachCell(function(row, col, cell) {
					var enabled = cell.enable;

					if (rowsToBeDeleted.indexOf(row) < 0) {
						rowsToBeDeleted.push(row);
					}

					if (!shouldManuallyDelete && enabled === false) {
						shouldManuallyDelete = true;
					}
				});

				if (shouldManuallyDelete) {
					selection.enable(true);

					for(var i = rowsToBeDeleted.length; i > 0; i--) {
						sheet.deleteRow(rowsToBeDeleted[i - 1]);
					}
				}
			}
        });
    });
</script>

```
