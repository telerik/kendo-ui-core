---
title: Use Column Template
page_title:  Use Column Template | Kendo UI Grid
description: "Learn how to use the column template as the value of a corresponding cell in the Excel document while exporting Kendo UI Grid."
slug: howto_use_column_template_grid
---

# Use Column Template

The example below demonstrates how to use the column template as the value of a corresponding cell in the Excel document while exporting Kendo UI Grid.

For additional information about how Excel documents work, refer to the [introductory help topic on Excel](/framework/excel/introduction#create-excel-document).

###### Example

```html
<div id="grid"></div>
<script>
$("#grid").kendoGrid({
  toolbar: ["excel"],
  columns: [
    { field: "ProductName", title: "Product Name" },
    { field: "UnitPrice", title: "Price", template: 'Price: #: kendo.format("{0:c}", UnitPrice)#' }
  ],
  pageable: true,
  dataSource: {
    transport: {
      read: {
        url: "http://demos.telerik.com/kendo-ui/service/products",
        dataType: "jsonp"
      }
    },
    pageSize: 10
  },
  excelExport: function(e) {
    var sheet = e.workbook.sheets[0];
    var template = kendo.template(this.columns[1].template);

    for (var i = 1; i < sheet.rows.length; i++) {
      var row = sheet.rows[i];

      var dataItem = {
         UnitPrice: row.cells[1].value
      };

      row.cells[1].value = template(dataItem);
    }
  }
});
</script>
```

## See Also

Other articles on the Kendo UI Grid and how-to examples related to its export to Excel:

* [JavaScript API Reference](/api/javascript/ui/grid#configuration-excel)
* [How to Align Footer Cells]({% slug howto_alignfootercells_grid %})
* [How to Configure Color for Alternating Rows]({% slug howto_configure_color_alternating_rows_grid %})
* [How to Export Checked Columns Only]({% slug howto_export_checked_columns_only_grid %})
* [How to Export Detail Grids]({% slug howto_exportto_excel_masterand_detail_grid %})
* [How to Export Multiple Grids]({% slug howto_export_excel_multiple_grids_grid %})
* [How to Format Cell Values]({% slug howto_format_cell_values_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_create_custom_editors_grid %}).
