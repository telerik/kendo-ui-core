---
title: Kendo Spreadsheet Delete Disabled Cells Content with ContextMenu
description: An example on how to delete the content of disabled cells with ContextMenu command
type: how-to
page_title: Delete Disabled Cells' Content with ContextMenu Command | Kendo UI Spreadsheet
slug: spreadsheet-delete-disabled-cells-content
position: 0
tags: kendo, kendoui, spreadsheet, delete, disabled, cells, contextmenu
ticketid: 1135315
res_type: kb

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Spreadsheet</td>
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

I am using the context menu to delete a row from the Spreadsheet. However, when there is a disabled cell in that row, the delete command from the ContextMenu is not executed.

## Solution

In order to achieve the desired behavior, you should follow these steps:

1. Bind the select event for the ContextMenu of the Spreadsheet.
1. Determine whether the currently selected command is Delete.
1. Enable the current selection (which is the entire row) and set clear it.

``` html
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

            if (command == "Delete") {
                var sheet = spreadsheet.activeSheet(),
                    selection = sheet.selection();

                selection.enable(true)
                selection.value([])
            }
        });
    });
</script>

```
