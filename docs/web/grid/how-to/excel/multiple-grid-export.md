---
title: Multiple Grid Export
description: Export more than one Kendo UI grid to Excel
---

# Multiple Grid Export

This example shows how to export two Kendo UI grids in the same Excel document. Each grid is exported in a separate Excel sheet.
For additional info check [Create Excel Documents](/framework/excel/introduction#create-excel-document).

#### Example - multiple grid Excel export

```html
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
          url: "http://demos.telerik.com/kendo-ui/service/Products",
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
        read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
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
