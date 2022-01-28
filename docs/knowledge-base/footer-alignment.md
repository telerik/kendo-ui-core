---
title: Align Footer Cells
page_title: Align Footer Cells | Kendo UI Grid for jQuery
description: "An example on how to align the footer cells during Excel export in a Kendo UI Grid for jQuery."
previous_url: /controls/data-management/grid/how-to/excel/footer-alignment
slug: howto_alignfootercells_grid
tags: grid, align, footer, cells, excel, export
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

How can I align the footer cells during Excel export in a Kendo UI Grid for jQuery?

## Solution

The following example demonstrates how to align the footer cells during Excel export.

Normally, to achieve this behavior, you can use HTML and CSS. However, Excel does not supported these options. To set the alignment, the demo uses the [`hAlign`](/api/javascript/ooxml/workbook/configuration/sheets.rows.cells.halign) option of the cell. For more information on how Excel documents work, refer to the [introductory article on Excel]({% slug introduction_excelexport_kendoui %}).

```dojo
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
          read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
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

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
