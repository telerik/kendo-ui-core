---
title: Change Default Workbook Name in Spreadsheet Export Dialog
description: An example on how to change the default name of the workbook in the export dialog of the Kendo UI Spreadsheet.
type: how-to
page_title: Change Default Workbook Name in Export Dialog | Kendo UI Spreadsheet for jQuery
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
  <td>Progress Kendo UI Spreadsheet</td>
 </tr>
</table>


## Description

How can I change the default filename of the workbook which appears in the Export dialog of the Spreadsheet?

## Solution

1. Attach a `click` event handler to the **Export** button of the Spreadsheet.
1. Query the DOM and get a reference to the Window widget which contains the export form.
1. Retrieve the corresponding ViewModel and update the `name` property value.

```dojo
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

    var downloadBtn = spread.element.find(".k-button-icon.k-i-download");

    downloadBtn.parent().on("click", function(e) {
      var exportPopup = $("body").find(".k-spreadsheet-window.k-popup-edit-form"),
        workbookTextBox = exportPopup.find("[data-bind='value: name']").get(0),
        formViewModel = workbookTextBox.kendoBindingTarget.source;

      formViewModel.set("name", "MyCustomWorkbookName");
    })
  </script>
```

## See Also

* [API Reference of the Spreadsheet](https://docs.telerik.com/kendo-ui/api/javascript/ui/spreadsheet)
