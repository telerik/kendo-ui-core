---
title: Format Cell Values
page_title: Format Cell Values | Kendo UI Grid
description: "Learn how to format the cell values of the Kendo UI Grid widget during Excel export."
slug: howto_format_cell_values_grid
---

# Set Cell Format During Excel export

To format the cell values, set the [`format`](/api/javascript/ooxml/workbook.html#configuration-sheets.rows.cells.format) option of the cells. The page about [creating a custom number format](https://support.office.com/en-us/article/Create-a-custom-number-format-78f2a361-936b-4c03-8772-09fab54be7f4) describes the formats, supported by Excel.

The example below demonstrates how to format cell values of the Kendo UI Grid during Excel export.

###### Example

```html
<div id="grid"></div>
<script>
    $("#grid").kendoGrid({
        toolbar: ["excel"],
        excelExport: function(e) {
          var sheet = e.workbook.sheets[0];

          for (var rowIndex = 1; rowIndex < sheet.rows.length; rowIndex++) {
            var row = sheet.rows[rowIndex];
            for (var cellIndex = 0; cellIndex < row.cells.length; cellIndex ++) {
              row.cells[cellIndex].format = "[Blue]#,##0.0_);[Red](#,##0.0);0.0;"
            }
          }
        },
        dataSource: {
          data: [
            { text: "Positive", value: 10.5 },
            { text: "Negative", value: -10.5 },
            { text: "Zero", value: 0 }
          ]
        }
    });
</script>
```

The example below demonstrates how to set a custom format for `date` values.

###### Example

```html
<div id="grid"></div>
<script>
  $("#grid").kendoGrid({
    toolbar: ["excel"],
    excelExport: function(e) {
      var sheet = e.workbook.sheets[0];

      for (var rowIndex = 1; rowIndex < sheet.rows.length; rowIndex++) {
        var row = sheet.rows[rowIndex];
        for (var cellIndex = 0; cellIndex < row.cells.length; cellIndex ++) {
          row.cells[cellIndex].format = "yy-MM-dd hh:mm:ss"
        }
      }
    },
    columns: [
      { field: "name" },
      { field: "age" },
      { field: "date" }
    ],
    dataSource: {
      data: [
        { name: "Jane Doe", age: 30, date: new Date() },
        { name: "John Doe", age: 33, date: new Date() }
      ],
      schema: {
        model : {
          fields: {
            date: { type: "date" },
            name: { type: "string" },
            age: { type: "number" }
          }
        }
      }
    }
  });
  $("#export").click(function(e) {
    var grid = $("#grid").data("kendoGrid");
    grid.saveAsExcel();
  });
</script>
```

## See Also

Other articles on the Kendo UI Grid and how-to examples related to its export to Excel:

* [JavaScript API Reference](/api/javascript/ui/grid#configuration-excel)
* [How to Align Footer Cells]({% slug howto_alignfootercells_grid %})
* [How to Configure Color for Alternating Rows]({% slug howto_configure_color_alternating_rows_grid %})
* [How to Export Checked Columns Only]({% slug howto_export_checked_columns_only_grid %})
* [How to Export Detail Grids]({% slug howto_exportto_excel_masterand_detail_grid %})d
* [How to Export Multiple Grids]({% slug howto_export_excel_multiple_grids_grid %})
* [How to Use Column Template]({% slug howto_use_column_template_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_create_custom_editors_grid %}).
