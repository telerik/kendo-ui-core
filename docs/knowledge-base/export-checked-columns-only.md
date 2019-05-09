---
title: Export Checked Columns Only
page_title:  jQuery Grid Documentation | Export Checked Columns Only | Kendo UI
description: "Get started with the jQuery Grid by Kendo UI and learn how to create Excel documents by exporting the checked columns only."
previous_url: /controls/data-management/grid/how-to/excel/export-checked-columns-only
slug: howto_export_checked_columns_only_grid
---

# Export Checked Columns Only

The following example demonstrates how to create Excel documents by exporting only the checked Grid columns.

###### Example

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

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid/configuration/excel)
* [How to Align Footer Cells]({% slug howto_alignfootercells_grid %})
* [How to Configure Color for Alternating Rows]({% slug howto_configure_color_alternating_rows_grid %})
* [How to Export Detail Grids]({% slug howto_exportto_excel_masterand_detail_grid %})
* [How to Export Multiple Grids]({% slug howto_export_excel_multiple_grids_grid %})
* [How to Format Cell Values]({% slug howto_format_cell_values_grid %})
* [How to Use Column Template]({% slug howto_use_column_template_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_adjust_row_heights_template_locked_columns_grid %}).
