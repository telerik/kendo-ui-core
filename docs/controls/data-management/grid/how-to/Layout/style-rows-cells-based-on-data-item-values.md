---
title: Customize Rows and Cells Based on Data Item Values
page_title: Customize Rows and Cells Based on Data Item Values | Kendo UI Grid
description: "Learn how to customize kendo UI Grid cells and rows, based on data items values."
previous_url: /controls/data-management/grid/how-to/style-rows-cells-based-on-data-item-values, /controls/data-management/grid/how-to/style-rows-cells-based-on-data-item-values, /asp-mvc/controls/data-management/grid/how-to/style-rows-cells-based-on-data-item-values
slug: howto_customize_rowsand_cells_basedon_dataitem_values_grid
---

# Customize Rows and Cells Based on Data Item Values

The examples below demonstrate how to customize the cells and rows of the Grid based on the values of the data items. The demo applies custom CSS classes, but its approach is still suitable even if you apply inline styles or other HTML attributes.

Three different options to achieve the customization are listed in the following sections.

## Use a row template

This approach is suitable if you do not intend to apply hierarchy, grouping, editing, and frozen columns to the Grid, because these features are not supported when row templates are used. With this approach, you directly add template expressions in the `rowTemplate` and `altRowTemplate` definitions to determine which custom CSS classes should be applied to a given row/cell.

###### Example

```html
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


## Use a dataBound handler and iterate the table rows

This approach is suitable if you intend to customize all rows of the Grid. It loops through all Grid rows and determines what custom class names should be applied to them, based on the values that they contain.

###### Example

```html
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

            // iterate the data items and apply row styles where necessary
            var dataItems = e.sender.dataSource.view();
            for (var j = 0; j < dataItems.length; j++) {
              var units = dataItems[j].get("UnitsInStock");
              var discontinued = dataItems[j].get("Discontinued");

              var row = e.sender.tbody.find("[data-uid='" + dataItems[j].uid + "']");
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

## Use a dataBound handler and iterate the data items
This approach is suitable if you intend to customize only part of the Grid rows. It loops through all Grid data items and accesses only the rows that match certain conditions.

###### Example

```html
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

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
* [How to Add Cascading DropDownList Editors]({% slug howto_add_cascading_dropdown_list_editors_grid %})
* [How to Copy Data from Excel]({% slug howto_copy_datafrom_excel_grid %})
* [How to Drag and Drop Rows between Grids]({% slug howto_dragand_drop_rows_between_twogrids_grid %})
* [How to Enable ForeignKey Column Sorting by Text]({% slug howto_enable_foreignkey_sotringby_text_grid %})
* [How to Implement Stable Sort in Chrome]({% slug howto_implement_stable_sortin_chrome_grid %})
* [How to Initialize Data Attribute with Detail Template]({% slug howto_initialize_data_attributewith_detail_template_grid %})
* [How to Load and Append More Records While Scrolling Down]({% slug howto_loadand_append_morerecords_while_scrollingdown_grid %})
* [How to Perform CRUD Operations with Local Storage Data]({% slug howto_perform_crud_operationswith_local_storage_data_grid %})
* [How to Persist Expanded Rows after Refresh]({% slug howto_persist_expanded_rows_afetrrefresh_grid %})
* [How to Set Cell Color Based on ForeignKey Values]({% slug howto_set_cell_color_basedon_foreignkey_values_grid %})
* [How to Show Tooltip for Column Records]({% slug howto_show_tooltipfor_column_records_grid %})
* [How to Update Toolbar Content Using MVVM Binding]({% slug howto_update_toolbar_content_using_mvvmbinding_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_adjust_row_heights_template_locked_columns_grid %}).
