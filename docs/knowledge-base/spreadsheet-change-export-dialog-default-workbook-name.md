---
title: Change default workbook name in Spreadsheet export dialog
description: An example on how to change the default workbook name in the export dialog of the Kendo UI Spreadsheet.
type: how-to
page_title: Change default workbook name in export dialog | Kendo UI Spreadsheet
slug: spreadsheet-change-export-dialog-default-workbook-name
tags: workbook, default, name, change, spreadsheet
ticketid: 1140511
res_type: kb
component: spreadsheet
---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Spreadsheet for Progress® Kendo UI®</td>
 </tr>
</table>


## Description

How can I change the default workbook filename that appears in the Export dialog of the Spreadsheet?

## Solution

* Attach a click event handler to the Spreadsheet export button.
* Query the DOM and get a reference to the Window widget which contains the export form.
* Retrieve the corresponding ViewModel and updated the name property value.

```html
<div id="example">
    <div id="spreadsheet"></div>
</div>

<script>
    var spread = $("#spreadsheet").kendoSpreadsheet({
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
    }).getKendoSpreadsheet();

    var downloadBtn = spread.element.find(".k-button-icon .k-i-download");

    downloadBtn.parent().on("click", function(e) {
      var exportPopup = $("body").find(".k-spreadsheet-window.k-popup-edit-form"),
        workbookTextBox = exportPopup.find("[data-bind='value: name']").get(0),
        formViewModel = workbookTextBox.kendoBindingTarget.source;

      formViewModel.set("name", "MyCustomWorkbookName");
    })
  </script>
```

## See Also

* [API Reference of the Spreadsheet](http://docs.telerik.com/kendo-ui/api/javascript/ui/spreadsheet)