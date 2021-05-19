---
title: Export to Excel Grids with Multiple Column Templates and Arbitrary Template Content
description: An example on how to export multiple column templates that might contain additional HTML.
type: how-to
page_title: Export to Excel Grids with Many Template Columns and HTML Content in Their Templates | Kendo UI Grid for jQuery
slug: grid-export-arbitrary-column-templates
tags: grid, export, excel, templates
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
</table>

## Description

I am exporting a Grid with one and two template columns by using the approach from the [column template article]({% slug howto_use_column_template_grid %}). However, I have Grids with dynamic columns and multiple template columns and to use hard-coded field names and indexes is not possible. Additionally, each template column contains different type of templates&mdash;from HTML strings to special character values.

How can I export my Kendo UI Grid with multiple template columns with arbitrary HTML template content to Excel?

## Solution

1. Traverse the exported content of the Grid in the `excelExport` event.
1. Replace the cell content for template columns.

> The following example produces text-only content in the exported Excel file. The Grid is able to export only data values to Excel.

```dojo
    <div id="grid"></div>
    <script>
      $(document).ready(function() {
        $("#grid").kendoGrid({
          dataSource: {
            type: "odata",
            transport: {
              read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
            },
            schema: {
              model : {
                fields: {
                  OrderDate: {type: "date"}
                }
              }
            },
            pageSize: 20,
            serverPaging: true
          },
          height: 550,
          toolbar: ["excel"],
          excel: {
            allPages: true
          },
          excelExport: exportGridWithTemplatesContent,
          pageable: true,
          columns: [
            {
              field: "Freight",
              hidden: true
            },
            {
              field:"OrderID",
              filterable: false
            },
            {
              field: "OrderDate",
              title: "Order Date",
              template: "<em>#:kendo.toString(OrderDate, 'd')#</em>"
            }, {
              field: "ShipName",
              title: "Ship Name",
              template: "#:ShipName.toUpperCase()#"
            }, {
              field: "ShipCity",
              title: "Ship City",
              template: "<span style='color: green'>#:ShipCity#, #:ShipCountry#</span>"
            }
          ],
          columnMenu: true
        });
      });

      function exportGridWithTemplatesContent(e){
        var data = e.data;
        var gridColumns = e.sender.columns;
        var sheet = e.workbook.sheets[0];
        var visibleGridColumns = [];
        var columnTemplates = [];
        var dataItem;
        // Create element to generate templates in.
        var elem = document.createElement('div');

        // Get a list of visible columns
        for (var i = 0; i < gridColumns.length; i++) {
          if (!gridColumns[i].hidden) {
            visibleGridColumns.push(gridColumns[i]);
          }
        }

        // Create a collection of the column templates, together with the current column index
        for (var i = 0; i < visibleGridColumns.length; i++) {
          if (visibleGridColumns[i].template) {
            columnTemplates.push({ cellIndex: i, template: kendo.template(visibleGridColumns[i].template) });
          }
        }

        // Traverse all exported rows.
        for (var i = 1; i < sheet.rows.length; i++) {
          var row = sheet.rows[i];
          // Traverse the column templates and apply them for each row at the stored column position.

          // Get the data item corresponding to the current row.
          var dataItem = data[i - 1];
          for (var j = 0; j < columnTemplates.length; j++) {
            var columnTemplate = columnTemplates[j];
            // Generate the template content for the current cell.
            elem.innerHTML = columnTemplate.template(dataItem);
            if (row.cells[columnTemplate.cellIndex] != undefined)
              // Output the text content of the templated cell into the exported cell.
              row.cells[columnTemplate.cellIndex].value = elem.textContent || elem.innerText || "";
          }
        }
      }
    </script>
```

## See Also

* [Exporting Only Text from the Header and Footer Cells of the Grid]({% slug export-only-the-text-from-the-grid-cell-which-contains-html %})
