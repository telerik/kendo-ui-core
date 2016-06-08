---
title: Configure Color for Alternating Rows
page_title:  Configure Color for Alternating Rows | Kendo UI Grid
description: "Learn how to configure the background color for alternating rows in the Kendo UI Grid widget."
slug: howto_configure_color_alternating_rows_grid
---

# Configure Color for Alternating Rows

The example below demonstrates how to customize the Excel document that the Grid generates during exporting. The demo uses the [`background`](/api/javascript/ooxml/workbook#configuration-sheets.rows.cells.background) option of the cell to set the background color of the alternating rows.

For more information about how Excel documents work, refer to the [introductory help topic on Excel](/framework/excel/introduction#create-excel-document).

###### Example

```html
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
              read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
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

Other articles on the Kendo UI Grid and how-to examples related to its export to Excel:

* [JavaScript API Reference](/api/javascript/ui/grid#configuration-excel)
* [How to Align Footer Cells]({% slug howto_alignfootercells_grid %})
* [How to Export Checked Columns Only]({% slug howto_export_checked_columns_only_grid %})
* [How to Export Detail Grids]({% slug howto_exportto_excel_masterand_detail_grid %})
* [How to Export Multiple Grids]({% slug howto_export_excel_multiple_grids_grid %})
* [How to Format Cell Values]({% slug howto_format_cell_values_grid %})
* [How to Use Column Template]({% slug howto_use_column_template_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_create_custom_editors_grid %}).
