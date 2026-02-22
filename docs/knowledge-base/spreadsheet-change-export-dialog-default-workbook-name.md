---
title: Change Default Workbook Name in Spreadsheet Export Dialog
description: Learn how to change the default name of the workbook in the export dialog of the Kendo UI Spreadsheet.
type: how-to
page_title: Change Default Workbook Name in Export Dialog - Kendo UI Spreadsheet for jQuery
slug: spreadsheet-change-export-dialog-default-workbook-name
tags: workbook, default, name, change, spreadsheet
ticketid: 1140511
res_type: kb
components: ["spreadsheet"]
---

## Environment

## Environment
<table>
<tbody>
<tr>
<td>Product</td>
<td>Kendo UI for jQuery Spreadsheet</td>
</tr>
<tr>
<td>Version</td>
<td>2025.4.1217</td>
</tr>
</tbody>
</table>


## Description

How can I change the default filename of the workbook which appears in the Export dialog of the Spreadsheet?

## Solution

To change the default workbook name in the Spreadsheet export dialog, follow these steps:

1. Get a reference to the Spreadsheet Menu and bind to its [`select`](/api/javascript/ui/menu/events/select) event.

2. When the File menu is selected, attach a click handler to the Export button.

3. In the Export button click handler, locate the filename input in the visible export window and set its value.

4. Use `unbind` before binding to prevent multiple event handlers if the File menu is opened repeatedly.

Below is a runnable example that demonstrates the approach:

```dojo
<div id="example">
    <div id="spreadsheet"></div>
</div>

<script>
    $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
            name: "Food Order",
            mergedCells: [
                "A1:G1"
            ],
            rows: [{
                height: 70,
                cells: [{
                    value: "My Company", fontSize: 32, textAlign: "center"
                }]
            }],
        }]
    });

    const spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
    const menu = spreadsheet.element.find("div.k-menu").data("kendoMenu");

    menu.bind("select", (e) => {
        const isFileMenu = $(e.item).find(".k-menu-link-text").text() === "File";
        if (!isFileMenu) {
            return;
        }
      
        const exportButton = $("button[title='Export...']").data("kendoButton");
        // prevent multiple bindings if File is opened more than once
        exportButton.unbind("click.exportNameChange");
      
        exportButton.bind("click.exportNameChange", () => {
            const exportWindow = $(".k-window:visible");
          
            // Find the file name input and set custom value
            const fileNameInput = exportWindow.find("input.k-textbox, input[data-bind='value: name']").first();
            fileNameInput.val("MyCustomWorkbookName");
        });
    });
</script>
```

## See Also

- [Kendo UI Spreadsheet Documentation](https://www.telerik.com/kendo-jquery-ui/documentation/controls/spreadsheet/overview)
- [Kendo UI Spreadsheet API Documentation](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/spreadsheet)
