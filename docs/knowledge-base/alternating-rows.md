---
title: Configure Color for Alternating Rows
page_title:  jQuery Grid Documentation | Color for Alternating Rows | Kendo UI
description: "Get started with the jQuery Grid by Kendo UI and learn how to configure the background color for alternating rows."
previous_url: /controls/data-management/grid/how-to/excel/alternating-rows
slug: howto_configure_color_alternating_rows_grid
---

# Configure Color for Alternating Rows

The following example demonstrates how to customize the Excel document that the Grid generates during exporting.

To set the background color of the alternating rows, the demo uses the [`background`](/api/javascript/ooxml/workbook/configuration/sheets.rows.cells.background) option of the cell. For more information on how Excel documents work, refer to the [introductory help topic on Excel](/framework/excel/introduction#create-excel-document).

###### Example

```dojo
<div id="grid"></div>
<script>
    $("#grid").kendoGrid({
        toolbar: ["excel"],
        excelExport: function(e) {
          var sheet = e.workbook.sheets[0];
          for (var rowIndex = 1; rowIndex < sheet.rows.length; rowIndex++) {
            if (rowIndex % 2 == 0) {
              var row = sheet.rows[rowIndex];
              for (var cellIndex = 0; cellIndex < row.cells.length; cellIndex ++) {
                row.cells[cellIndex].background = "#aabbcc";
              }
            }
          }
        },
        dataSource: {
          type: "odata",
          transport: {
              read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
          },
          pageSize: 7
        },
        pageable: true,
        columns: [
            { width: 300, field: "ProductName", title: "Product Name" },
            { width: 300, field: "UnitPrice", title: "Unit Price" },
            { field: "UnitsOnOrder", title: "Units On Order" },
            { field: "UnitsInStock", title: "Units In Stock" }
        ]
    });
</script>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid/configuration/excel)
* [How to Align Footer Cells]({% slug howto_alignfootercells_grid %})
* [How to Export Checked Columns Only]({% slug howto_export_checked_columns_only_grid %})
* [How to Export Detail Grids]({% slug howto_exportto_excel_masterand_detail_grid %})
* [How to Export Multiple Grids]({% slug howto_export_excel_multiple_grids_grid %})
* [How to Format Cell Values]({% slug howto_format_cell_values_grid %})
* [How to Use Column Template]({% slug howto_use_column_template_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_adjust_row_heights_template_locked_columns_grid %}).
