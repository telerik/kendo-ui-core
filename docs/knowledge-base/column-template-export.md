---
title: Use Column Template
page_title: Column Template Export | Kendo UI Grid for jQuery
description: "An example on how to use column template as the value of a corresponding cell in the Excel document while exporting the Kendo UI Grid for jQuery."
previous_url: /mvc/controls/data-management/grid/how-to/excel/column-template-export, /controls/data-management/grid/how-to/excel/column-template-export
slug: howto_use_column_template_grid
tags: grid, use, column, template
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>


## Description

How can I use a column template as the value of a corresponding cell in the Excel document while exporting the Kendo UI Grid for jQuery?

## Solution

The following example demonstrates how to use the column template as the value of a corresponding cell in the Excel document while exporting the Grid.

For more information on how Excel documents work, refer to the [introductory help topic on Excel](/framework/excel/introduction#create-excel-document).

```dojo
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
        url: "https://demos.telerik.com/kendo-ui/service/products",
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

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
