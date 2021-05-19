---
title: Export Checked Columns Only in Grid
page_title:  Export Checked Columns Only | Kendo UI Grid for jQuery
description: "An example on how to create Excel documents by exporting the checked columns only in a Kendo UI Grid widget for jQuery."
previous_url: /controls/data-management/grid/how-to/excel/export-checked-columns-only
slug: howto_export_checked_columns_only_grid
tags: grid, export, checked, columns, only
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I create Excel documents by exporting the checked columns only in a Kendo UI Grid widget for jQuery?

## Solution

The following example demonstrates how to create Excel documents by exporting only the checked Grid columns.

```dojo
     <div id="grid"></div>
     <script>
      $("#grid").kendoGrid({
        toolbar: ['Export'],
        columns: [
          {field: "checkbox", template: "<input type='checkbox' />"},
          { field: "productName" },
          { field: "category" }
        ],
        dataSource: [
          { productName: "Tea", category: "Beverages" },
          { productName: "Coffee", category: "Beverages" },
          { productName: "Ham", category: "Food" },
          { productName: "Bread", category: "Food" }
        ]
      });

      $(".k-grid-Export").on('click', function(e){
        var grid = $("#grid").getKendoGrid();
        var rows = [{
          cells: [
            { value: "productName" },
            { value: "category" }
          ]
        }];
        var trs = $("#grid").find('tr');
        for (var i = 0; i < trs.length; i++) {
          if ($(trs[i]).find(":checkbox").is(":checked")) {
            var dataItem = grid.dataItem(trs[i]);
            rows.push({
              cells: [
                { value: dataItem.productName },
                { value: dataItem.category }
              ]
            })
          }
        }
        excelExport(rows)
      })

      function excelExport(rows) {
        var workbook = new kendo.ooxml.Workbook({
          sheets: [
            {
              columns: [
                { autoWidth: true },
                { autoWidth: true }
              ],
              title: "Orders",
              rows: rows
            }
          ]
        });
        kendo.saveAs({dataURI: workbook.toDataURL(), fileName: "Test.xlsx"});
      }
    </script>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
