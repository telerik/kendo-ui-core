---
title: Export Multiple Grids
page_title: jQuery Grid Documentation | Export Multiple Grids | Kendo UI
description: "Get started with the jQuery Grid by Kendo UI and learn how to export two Grids in the same Excel document."
previous_url: /controls/data-management/grid/how-to/excel/multiple-grid-export
slug: howto_export_excel_multiple_grids_grid
---

# Export Multiple Grids

The following example demonstrates how to export two Grids in the same Excel document.

Each Grid is exported in a separate Excel sheet. For additional information about how Excel documents work, refer to the [introductory help topic on Excel](/framework/excel/introduction#create-excel-document).

###### Example

```dojo
<button id="export" class="k-button"><span class="k-icon k-i-excel"></span>Export to Excel</button>
<div id="products"></div>
<div id="orders"></div>
<script>
  // used to sync the exports
  var promises = [
    $.Deferred(),
    $.Deferred()
  ];

  $("#export").click(function(e){
    // trigger export of the products grid
    $("#products").data("kendoGrid").saveAsExcel();
    // trigger export of the orders grid
    $("#orders").data("kendoGrid").saveAsExcel();
    // wait for both exports to finish
    $.when.apply(null, promises)
     .then(function(productsWorkbook, ordersWorkbook) {

      // create a new workbook using the sheets of the products and orders workbooks
      var sheets = [
        productsWorkbook.sheets[0],
        ordersWorkbook.sheets[0]
      ];

      sheets[0].title = "Products";
      sheets[1].title = "Orders";

      var workbook = new kendo.ooxml.Workbook({
        sheets: sheets
      });

      // save the new workbook,b
      kendo.saveAs({
        dataURI: workbook.toDataURL(),
        fileName: "ProductsAndOrders.xlsx"
      })
    });
  });

  $("#products").kendoGrid({
    dataSource: {
      transport: {
        read: {
          url: "https://demos.telerik.com/kendo-ui/service/Products",
          dataType: "jsonp"
        }
      },
      pageSize: 20
    },
    height: 550,
    pageable: true,
    excelExport: function(e) {
      e.preventDefault();

      promises[0].resolve(e.workbook);
    }
  });

  $("#orders").kendoGrid({
    dataSource: {
      type: "odata",
      transport: {
        read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
      },
      pageSize: 20,
      serverPaging: true
    },
    height: 550,
    pageable: true,
    columns: [
      { field:"OrderID" },
      { field: "ShipName", title: "Ship Name" },
      { field: "ShipCity", title: "Ship City" }
    ],
    excelExport: function(e) {
      e.preventDefault();

      promises[1].resolve(e.workbook);
    }
  });
</script>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid/configuration/excel)
* [How to Align Footer Cells]({% slug howto_alignfootercells_grid %})
* [How to Configure Color for Alternating Rows]({% slug howto_configure_color_alternating_rows_grid %})
* [How to Export Detail Grids]({% slug howto_exportto_excel_masterand_detail_grid %})
* [How to Export Checked Columns Only]({% slug howto_export_checked_columns_only_grid %})
* [How to Format Cell Values]({% slug howto_format_cell_values_grid %})
* [How to Use Column Template]({% slug howto_use_column_template_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_adjust_row_heights_template_locked_columns_grid %}).
