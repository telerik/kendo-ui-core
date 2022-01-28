---
title: Style Grid Table Rows and Cells Based on Values
page_title: Style Grid Table Rows and Cells by Data Item Values
description: "An example on how to customize the tables cells and rows styles of the Kendo UI Grid for jQuery based on data items values."
previous_url: /controls/data-management/grid/how-to/style-rows-cells-based-on-data-item-values, /controls/data-management/grid/how-to/style-rows-cells-based-on-data-item-values, /asp-mvc/controls/data-management/grid/how-to/style-rows-cells-based-on-data-item-values, /controls/data-management/grid/how-to/Layout/style-rows-cells-based-on-data-item-values
slug: howto_customize_rowsand_cells_basedon_dataitem_values_grid
tags: customize, grid, rows, cells, basedon, data, item, value
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>All</td>
 </tr>
</table>

## Description

How can I customize the cells and rows of the Kendo UI Grid for jQuery based on data items values?

## Solution

Grid templates enable you to customize and style the content *inside* the table cells. However, your project might require the customization of the tables cells or rows of the Grid. Naturally, the custom styling is likely based on the values of the data items.

Although the demos apply custom CSS classes, you can still use the demonstrated approaches even if you apply inline styles or other HTML attributes.

To customize the rows and cells based on the values of the data items, utilize any of the following approaches:
* [Iterate the table rows](#iterating-the-table-rows)
* [Iterate the data items](#iterating-the-data-items)
* [Use a row template](#using-a-row-template)

## Iterate the Table Rows

The usage of the `dataBound` handler and the iteration of the table rows is suitable only if you intend to customize all Grid rows. The approach loops through all Grid rows and, based on the values they contain, determines which custom-class names will be applied to them.

```dojo
    <style>
      .k-grid {
        width: 500px;
      }

      .discontinued {
        font-weight: bold;
        color: #f00;
      }
      .critical {
        background-color: #fdd;
      }

      .warning {
        background-color: #fda;
      }

      .ok {
        background-color: #ced;
      }

    </style>

    <div id="grid-databound-dataitems"></div>
    <script>
      // sample datasource
      var products = [
        { ID: 1, ProductName: "Foo", UnitsInStock: 9, Discontinued: false },
        { ID: 2, ProductName: "Bar", UnitsInStock: 16, Discontinued: false },
        { ID: 3, ProductName: "Baz", UnitsInStock: 3, Discontinued: true }
      ];

      function getUnitsInStockClass(units) {
        if (units < 5) {
          return "critical";
        } else if (units < 10) {
          return "warning";
        } else {
          return "ok";
        }
      }

      $(document).ready(function () {
        $("#grid-databound-dataitems").kendoGrid({
          dataSource: {
            data: products,
            schema: {
              model: {
                id: "ID",
                fields: {
                  ID: { type: "number" },
                  ProductName: { },
                  UnitsInStock: { type: "number" },
                  Discontinued: { type: "boolean" }
                }
              }
            }
          },
          sortable: true,
          columns: [
            { field: "ProductName", title: "Product Name" },
            { field: "UnitsInStock", title:"Units In Stock", width: "120px" },
            { field: "Discontinued", width: "120px" }
          ],
          dataBound: function(e) {
            // get the index of the UnitsInStock cell
            var columns = e.sender.columns;
            var columnIndex = this.wrapper.find(".k-grid-header [data-field=" + "UnitsInStock" + "]").index();

            // iterate the table rows and apply custom row and cell styling
            var rows = e.sender.tbody.children();
            for (var j = 0; j < rows.length; j++) {
              var row = $(rows[j]);
              var dataItem = e.sender.dataItem(row);

              var units = dataItem.get("UnitsInStock");
              var discontinued = dataItem.get("Discontinued");

              if (discontinued) {
                row.addClass("discontinued");
              }

              var cell = row.children().eq(columnIndex);
              cell.addClass(getUnitsInStockClass(units));
            }
          }
        });
      });
    </script>
```

## Iterate the Data Items

The usage of the `dataBound` handler and the iteration of the data items is suitable only if you intend to customize part of the Grid rows. The approach loops through all data items of the Grid and accesses just the rows which match certain conditions.

```dojo
    <style>
    .k-grid {
        width: 500px;
    }

    .discontinued {
        font-weight: bold;
        color: #f00;
    }
    </style>
     <div id="grid-databound-dataitems"></div>

    <script>
      // sample datasource
      var products = [
        { ID: 1, ProductName: "Foo", UnitsInStock: 9, Discontinued: false },
        { ID: 2, ProductName: "Bar", UnitsInStock: 16, Discontinued: false },
        { ID: 3, ProductName: "Baz", UnitsInStock: 3, Discontinued: true }
      ];

      $(document).ready(function () {
        $("#grid-databound-dataitems").kendoGrid({
          dataSource: {
            data: products,
            schema: {
              model: {
                id: "ID",
                fields: {
                  ID: { type: "number" },
                  ProductName: { },
                  UnitsInStock: { type: "number" },
                  Discontinued: { type: "boolean" }
                }
              }
            }
          },
          sortable: true,
          columns: [
            { field: "ProductName", title: "Product Name" },
            { field: "UnitsInStock", title:"Units In Stock", width: "120px" },
            { field: "Discontinued", width: "120px" }
          ],
          dataBound: function(e) {
            // get the index of the UnitsInStock cell
            var columns = e.sender.columns;
            var columnIndex = this.wrapper.find(".k-grid-header [data-field=" + "UnitsInStock" + "]").index();

            // iterate the data items and apply row styles where necessary
            var dataItems = e.sender.dataSource.view();
            for (var j = 0; j < dataItems.length; j++) {
              var discontinued = dataItems[j].get("Discontinued");

              var row = e.sender.tbody.find("[data-uid='" + dataItems[j].uid + "']");
              if (discontinued) {
                row.addClass("discontinued");
              }
            }
          }
        });
      });
    </script>

```

## Use a Row Template

The usage of a row template is suitable only if you do not intend to use hierarchy, grouping, editing, and frozen columns&mdash;the Grid does not support the simultaneous application of these features and row templates. The approach directly adds template expressions to the `rowTemplate` and `altRowTemplate` definitions and determines which custom CSS classes will be applied to a given row or cell.

```dojo
    <style>
      .k-grid {
        width: 500px;
      }

      .discontinued {
        font-weight: bold;
        color: #f00;
      }
      .critical {
        background-color: #fdd;
      }

      .warning {
        background-color: #fda;
      }

      .ok {
        background-color: #ced;
      }

    </style>


    <div id="grid-rowtemplate"></div>
    <script>
      // sample datasource
      var products = [
        { ID: 1, ProductName: "Foo", UnitsInStock: 9, Discontinued: false },
        { ID: 2, ProductName: "Bar", UnitsInStock: 16, Discontinued: false },
        { ID: 3, ProductName: "Baz", UnitsInStock: 3, Discontinued: true }
      ];


      var rowTemplateString = '<tr class="#: Discontinued ? "discontinued" : "" #" data-uid="#: uid #">' +
          '<td>#: ProductName #</td>' +
          '<td class="#: getUnitsInStockClass(UnitsInStock) #">#: UnitsInStock #</td>' +
          '<td>#: Discontinued #</td>' +
          '</tr>';

      var altRowTemplateString = rowTemplateString.replace('tr class="', 'tr class="k-alt ');

      function getUnitsInStockClass(units) {
        if (units < 5) {
          return "critical";
        } else if (units < 10) {
          return "warning";
        } else {
          return "ok";
        }
      }

      $(document).ready(function () {
        $("#grid-rowtemplate").kendoGrid({
          dataSource: {
            data: products,
            schema: {
              model: {
                id: "ID",
                fields: {
                  ID: { type: "number" },
                  ProductName: { },
                  UnitsInStock: { type: "number" },
                  Discontinued: { type: "boolean" }
                }
              }
            }
          },
          sortable: true,
          columns: [
            { field: "ProductName", title: "Product Name" },
            { field: "UnitsInStock", title:"Units In Stock", width: "120px" },
            { field: "Discontinued", width: "120px" }
          ],
          rowTemplate: rowTemplateString,
          altRowTemplate: altRowTemplateString
        });
      });
    </script>
```

## See Also

* [Dynamic User defined row styles]({% slug grid-user-defined-row-styles %})
* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
