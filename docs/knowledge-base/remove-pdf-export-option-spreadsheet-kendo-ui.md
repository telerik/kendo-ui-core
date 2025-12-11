---
title: Removing PDF Export Option from Spreadsheet
description: Learn how to remove the PDF export option from the Spreadsheet in Kendo UI.
type: how-to
page_title: How to Remove PDF Export Option from Spreadsheet in Kendo UI
slug: remove-pdf-export-option-spreadsheet-kendo-ui
tags: how-to, spreadsheet, export, PDF, Kendo UI
res_type: kb
components: ["spreadsheet"]
---

## Environment
| Product | Spreadsheet for Progress® Kendo UI® |
| --- | --- |
| Version | 2023.2.718 |

## Description
I want to remove the PDF export option from the export popup in Spreadsheet in Kendo UI. How can I achieve this?

## Solution
To remove the PDF export option from the Spreadsheet in Kendo UI, follow these steps:

1. Bind a [`click`](/api/javascript/ui/toolbar/events/click) event to the Spreadsheet Toolbar.

2. In the event handler, get a reference to the respective DropDownList and change its dataSource.

```javascript
$('.k-spreadsheet-toolbar:eq(0)').data('kendoSpreadsheetToolBar').bind('click', function(ev) {
  if ($(ev.target).index()) {
    var ddl = $('.k-popup-edit-form select.k-file-format:eq(0)').data('kendoDropDownList');
    var oldData = ddl.dataSource.data();
    ddl.dataSource.remove(oldData[oldData.length - 1]);
  }
});
```

Below is a runnable example that demonstrates the approach:

```dojo
    <div id="spreadsheet"></div>
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
        }],
        excel: {
          fileName: "Order.xlsx"
        }
      });

      $('.k-spreadsheet-toolbar:eq(0)').data('kendoSpreadsheetToolBar').bind('click', function(ev){
        if($(ev.target).index()){

          var ddl =  $('.k-popup-edit-form select.k-file-format:eq(0)').data('kendoDropDownList');
          var oldData = ddl.dataSource.data();          
          ddl.dataSource.remove(oldData[oldData.length - 1]);
        }
      })
</script>
```

