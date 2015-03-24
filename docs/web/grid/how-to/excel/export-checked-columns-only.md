---
title: Export only checked columns
page_title: Create Excel file from checked columns only
description: This article shows how to create Excel document from the checked rows only
---

## Export checked columns of the Grid

### Example - create an Excel document from checked columns only

```html
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

