---
title: Export Grid with Multiple Column Templates and Arbitrary Template Content
description: An example showing how to export N column templates that might contain additional HTML.
type: how-to
page_title: How to Export to Excel Grid with Many Template Columns that contain HTML in Their Templates | Kendo UI Grid
slug: grid-export-arbitrary-column-templates
tags: grid, export, excel, templates
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
</table>

## Description

Exporting a Grid with one or two template columns is simple and can be handled using the [Column Template Example]({% slug howto_use_column_template_grid %}) approach. However, if you have a Grid with dynamic columns or a big number of template columns using hard-coded field names and indexes is not possible. Additionally, each template column could contain different type of templates—from HTML strings to special character values. The following example shows how to handle such scenarios.

## Solution

The following example shows how to traverse the exported content of the Grid in the `excelExport` event and replace the cell content for template columns. Check the comments for better understanding of the code.

> This example produces text-only content in the exported Excel file. Kendo UI Grid can export only data values to Excel.

```html
    <div id="example">
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
              pageSize: 20
            },
            height: 550,
            toolbar: ["excel"],
            excel: {
              allPages: true
            },
            excelExport: function (e) {
              var dataSource = e.sender.dataSource;
              var gridColumns = e.sender.columns;
              var sheet = e.workbook.sheets[0];
              var columnTemplates = [];
              var dataItem;
              // Create element to generate templates in.
              var elem = document.createElement('div');

              // Create a collection of the column templates, together with the current column index
              for (var i = 0; i < gridColumns.length; i++) {
                if (gridColumns[i].template) {
                  columnTemplates.push({ cellIndex: i, template: kendo.template(gridColumns[i].template) });
                }
              }

              // Traverse all exported rows.
              for (var i = 1; i < sheet.rows.length; i++) {
                var row = sheet.rows[i];
                // Traverse the column templates and apply them for each row at the stored column position.

                // Get the data item corresponding to the current row.
                var dataItem = dataSource.at(i - 1);
                for (var j = 0; j < columnTemplates.length; j++) {
                  var columnTemplate = columnTemplates[j];
                  // Generate the template content for the current cell.
                  elem.innerHTML = columnTemplate.template(dataItem);
                  if (row.cells[columnTemplate.cellIndex] != undefined)
                    // Output the text content of the templated cell into the exported cell.
                    row.cells[columnTemplate.cellIndex].value = elem.textContent || elem.innerText || "";
                }
              }
            },
            pageable: true,
            columns: [
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
            ]
          });
        });
      </script>
    </div>
```

## See Also

* [Export Only Text From Grid Header and Footer Cells which Contain HTML]({% slug export-only-the-text-from-the-grid-cell-which-contains-html %})