---
title: Column Template
description: Use the column template in the output Excel document
---

# Column Template Export

This example shows how to use the column template as the value of corresponding cell in the output Excel document.
For additional info check [Create Excel Documents](/framework/excel/introduction#create-excel-document).

#### Example - column template export

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
