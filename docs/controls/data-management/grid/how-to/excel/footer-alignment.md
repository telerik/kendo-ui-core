---
title: Align Footer Cells
page_title: Align Footer Cells | Kendo UI Grid
description: "Learn how to export to Excel more than one Kendo UI Grid."
slug: howto_alignfootercells_grid
---

# Align Footer Cells

Thе example below demonstrates how to align the footer cells during excel export. Usually, HTML and CSS are used to do that, but this is not supported in Excel.

The demo uses the [`hAlign`](/api/javascript/ooxml/workbook#configuration-sheets.rows.cells.hAlign) option of the cell to set the alignment.

To understand how Excel documents work, check the [introductory article on Excel]({% slug introduction_excelexport_kendoui %}).

###### Example

```html
<div id="grid"></div>
<script>
  $(function() {
    $("#grid").kendoGrid({
      toolbar: ["excel"],
      excelExport: function(e) {
        var rows = e.workbook.sheets[0].rows;

        for (var ri = 0; ri < rows.length; ri++) {
          var row = rows[ri];

          if (row.type == "group-footer" || row.type == "footer") {
            for (var ci = 0; ci < row.cells.length; ci++) {
              var cell = row.cells[ci];
              if (cell.value) {
                // Use jQuery.fn.text to remove the HTML and get only the text
                cell.value = $(cell.value).text();
                // Set the alignment
                cell.hAlign = "right";
              }
            }
          }
        }
      },
      dataSource: {
        type: "odata",
        transport: {
          read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
        },
        schema:{
          model: {
            fields: {
              UnitsInStock: { type: "number" },
              ProductName: { type: "string" },
              UnitPrice: { type: "number" },
              UnitsOnOrder: { type: "number" },
              UnitsInStock: { type: "number" }
            }
          }
        },
        pageSize: 7,
        group: {
          field: "UnitsInStock", aggregates: [
            { field: "ProductName", aggregate: "count" },
            { field: "UnitPrice", aggregate: "sum"},
            { field: "UnitsOnOrder", aggregate: "average" },
            { field: "UnitsInStock", aggregate: "count" }
          ]
        },

        aggregate: [ { field: "ProductName", aggregate: "count" },
                    { field: "UnitPrice", aggregate: "sum" },
                    { field: "UnitsOnOrder", aggregate: "average" },
                    { field: "UnitsInStock", aggregate: "min" },
                    { field: "UnitsInStock", aggregate: "max" }]
      },
      sortable: true,
      scrollable: false,
      pageable: true,
      columns: [
        { field: "ProductName", title: "Product Name", aggregates: ["count"], footerTemplate: "<div style='text-align:right'>Total Count: #=count#</div>", groupFooterTemplate: "<div style='text-align:right'>Count: #=count#</div>" },
        { field: "UnitPrice", title: "Unit Price", aggregates: ["sum"] },
        { field: "UnitsOnOrder", title: "Units On Order", aggregates: ["average"], footerTemplate: "<div style='text-align:right'>Average: #=average#</div>",
         groupFooterTemplate: "<div>Average: #=average#</div>" },
        { field: "UnitsInStock", title: "Units In Stock", aggregates: ["min", "max", "count"], footerTemplate: "<div style='text-align:right'>Min: #= min # Max: #= max #</div>",
         groupHeaderTemplate: "Units In Stock: #= value # (Count: #= count#)" }
      ]
    });
  });
</script>
```

## See Also

Other articles on the Kendo UI Grid and how-to examples related to its export to Excel:

* [JavaScript API Reference](/api/javascript/ui/grid#configuration-excel)
* [How to Configure Color for Alternating Rows]({% slug howto_configure_color_alternating_rows_grid %})
* [How to Export Detail Grids]({% slug howto_exportto_excel_masterand_detail_grid %})
* [How to Export Checked Columns Only]({% slug howto_export_checked_columns_only_grid %})
* [How to Export Multiple Grids]({% slug howto_export_excel_multiple_grids_grid %})
* [How to Format Cell Values]({% slug howto_format_cell_values_grid %})
* [How to Use Column Template]({% slug howto_use_column_template_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_create_custom_editors_grid %}).
