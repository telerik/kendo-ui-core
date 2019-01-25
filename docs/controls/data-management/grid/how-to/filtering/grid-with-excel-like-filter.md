---
title: Implement Excel-Like Filter Menus
page_title: jQuery Grid Documentation | AutoComplete for Current Filter | Kendo UI
description: "Learn how to filter the jQuery Grid by Kendo UI by using AutoComplete and by showing results from the current Grid filter."
slug: howto_gridfiltering_excellike_grid
---

# Implement Excel-Like Filter Menus

The following example demonstrates how to set the Grid with an Excel-like filter that has sorted and unique items.

To set a single Data Source for all filter menus, the example uses the [`columns.filterable.dataSource`](/api/javascript/ui/grid/configuration/columns.filterable.datasource) property of the Grid.

To observe this behavior:

1. Filter the **Product Name** column.
2. Open the **Unit Price** column. Note that the values are filtered based on the currently applied filter on the **Product Name** column.

###### Example

```dojo
   <script src="https://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>
    <div id="example">
      <div id="grid"></div>

      <script>
        $(document).ready(function() {

          function removeDuplicates(items, field) {
            var getter = function(item){return item[field]},
                result = [],
                index = 0,
                seen = {};

            while (index < items.length) {
              var item = items[index++],
                  text = getter(item);

              if(text !== undefined && text !== null && !seen.hasOwnProperty(text)){
                result.push(item);
                seen[text] = true;
              }
            }

            return result;
          }

          var filterSource = new kendo.data.DataSource({
            data: products
          });

          $("#grid").kendoGrid({
            dataSource: {
              data: products,
              schema: {
                model: {
                  fields: {
                    ProductName: { type: "string"},
                    UnitPrice: { type: "number" },
                    UnitsInStock: { type: "number" },
                    Discontinued: { type: "boolean" }
                  }
                }
              },
              pageSize: 20,
              change: function(e) {
                filterSource.data(e.items);
              },
            },
            height: 550,
            scrollable: true,
            sortable: true,
            pageable: {
              input: true,
              numeric: false
            },
            filterable: true,
            filterMenuInit: function (e){
              var grid = e.sender;
              e.container.data("kendoPopup").bind("open", function() {
                filterSource.sort({field: e.field, dir: "asc"});
                var uniqueDsResult = removeDuplicates(grid.dataSource.view(), e.field);
                filterSource.data(uniqueDsResult);
              })
            },
            columns: [
              {field: "ProductName", filterable: {
                multi: true,
                dataSource: filterSource
              }
              },
              { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "130px",filterable: {
                multi: true,
                dataSource: filterSource
              } },
              { field: "UnitsInStock", title: "Units In Stock", width: "130px",filterable: {
                multi: true,
                dataSource: filterSource
              } },
              { field: "Discontinued", width: "130px"}
            ]
          });
        });
      </script>
    </div>
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
