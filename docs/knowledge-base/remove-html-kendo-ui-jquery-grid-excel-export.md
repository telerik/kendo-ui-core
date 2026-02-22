---
title: Exporting Kendo UI for jQuery Grid with Templates to Excel Without HTML
description: Learn how to customize the Excel export of the Kendo UI for jQuery Grid to remove HTML tags from template cells.
type: how-to
page_title: Remove HTML from Exported Templates in Kendo UI for jQuery Grid Excel Export
meta_title: Remove HTML from Exported Templates in Kendo UI for jQuery Grid Excel Export
slug: remove-html-kendo-ui-jquery-grid-excel-export
tags: kendo-ui-for-jquery, grid, excelexport, templates, html-removal
res_type: kb
ticketid: 1665557
---

## Environment

<table>
  <tbody>
    <tr>
      <td>Product</td>
      <td>Kendo UI for jQuery Grid</td>
    </tr>
    <tr>
      <td>Version</td>
      <td>2025.4.1217</td>
    </tr>
  </tbody>
</table>

## Description

When exporting the [Kendo UI for jQuery Grid](https://www.telerik.com/kendo-jquery-ui/documentation/controls/grid/overview) with templates, the exported Excel file may include HTML tags from the templates. This issue occurs because the Grid templates render HTML content, which gets included in the Excel export. Removing these HTML tags improves the readability of the exported Excel file.

This knowledge base article also answers the following questions:
- How to remove HTML tags from Excel export in Kendo UI for jQuery Grid?
- How to handle templates in Excel export for Kendo UI for jQuery Grid?
- How to customize Excel export for Kendo UI for jQuery Grid templates?

## Solution

To remove HTML tags during the Grid export to Excel, use the `excelExport` event. In this event, access the workbook object and apply custom logic to clean the HTML content.

1. Initialize the Grid and define the [`excelExport`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/grid/events/excelexport) event.
2. Iterate through the workbook sheets and rows to process the cells.
3. Decode HTML content in the cells using a custom function.
4. Optionally, apply formatting such as making footer rows bold.

Here is the complete implementation:

```Dojo
<div id="grid"></div>
<script>
  $("#grid").kendoGrid({
    toolbar: ["excel"],
    excelExport: function (e) {
      var sheet = e.workbook.sheets[0];
      
      sheet.rows.forEach(row => {
        if (!row.cells) return;
        
        row.cells.forEach(cell => {
          let isHtml = typeof cell.value === "string" && cell.value.includes("<");
          
          // Decode HTML content for template cells
          if (isHtml) {
            cell.value = simpleHtmlDecode(cell.value);
          }
          
          // Bold footer rows regardless of HTML content
          if (row.type === "footer" || row.type === "group-footer") {
            cell.bold = true;
          }
        });
      });
    },
    excel: {
      fileName: "Kendo UI Grid Export.xlsx",
      proxyURL: "https://demos.telerik.com/service/v2/core/export",
      filterable: true
    },
    dataSource: {
      transport: {
        read: "https://demos.telerik.com/service/v2/core/Products"
      },
      schema: {
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
        field: "UnitsInStock",
        aggregates: [
          { field: "ProductName", aggregate: "count" },
          { field: "UnitPrice", aggregate: "sum" },
          { field: "UnitsOnOrder", aggregate: "average" },
          { field: "UnitsInStock", aggregate: "count" }
        ]
      },
      aggregate: [
        { field: "ProductName", aggregate: "count" },
        { field: "UnitPrice", aggregate: "sum" },
        { field: "UnitsOnOrder", aggregate: "average" },
        { field: "UnitsInStock", aggregate: "min" },
        { field: "UnitsInStock", aggregate: "max" }
      ]
    },
    sortable: true,
    pageable: true,
    groupable: true,
    filterable: true,
    columnMenu: true,
    reorderable: true,
    resizable: true,
    columns: [
      { 
        field: "ProductName",
        template: ({ ProductName }) => `<div>${ProductName} this is template</div>`,
        title: "Product Name",
        aggregates: ["count"],
        footerTemplate: "Total Count: #=count#",
        groupFooterTemplate: "Count: #=count#" 
      },
      { field: "UnitPrice", title: "Unit Price", aggregates: ["sum"] },
      { 
        field: "UnitsOnOrder",
        title: "Units On Order",
        aggregates: ["average"],
        footerTemplate: "Average: #=average#",
        groupFooterTemplate: "<div>Average: #=average# this is template</div>",
        exportable: true 
      },
      { 
        field: "UnitsInStock",
        title: "Units In Stock",
        aggregates: ["min", "max", "count"],
        footerTemplate: "<div>Min: #= min # Max: #= max #</div>",
        groupHeaderTemplate: "Units In Stock: #= value # (Count: #= count#)" 
      }
    ]
  });

  // Function to decode HTML content
  function simpleHtmlDecode(encodedStr) {
    return $(encodedStr).text();
  }
</script>
```

## See Also

- [Kendo UI for jQuery Grid Documentation](https://www.telerik.com/kendo-jquery-ui/documentation/controls/grid/overview)
- [Excel Export Event](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/grid/events/excelexport)
- [Excel Appearance Customization](https://www.telerik.com/kendo-jquery-ui/documentation/framework/excel/appearance)
