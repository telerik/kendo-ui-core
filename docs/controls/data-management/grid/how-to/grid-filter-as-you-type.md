---
title: Filter Grid as You Type
page_title: Filter Grid as You Type | Kendo UI Grid
description: "Learn how to filter Kendo UI Grid on the fly, as the user types in the filter row textbox."
slug: howto_filter_gridas_you_type_grid
---

# Filter Grid as You Type

To filter the Grid as the user types, you must provide for the following requirements:

* Enable the [row filtering mode](/api/javascript/ui/grid#configuration-filterable.mode).
* Use a custom [filter cell template](/api/javascript/ui/grid#configuration-columns.filterable.cell.template) for the desired Grid column.
* The purpose of the filter cell template is to attach a `keydown` or `keypress` event handler to the textbox (`args.element`) and, within this handler, to trigger the `change` event of the textbox. The `change` event will trigger the filtering functionality of the Grid.
* [Change the default `"eq"` operator](/api/javascript/ui/grid#configuration-columns.filterable.cell.operator) of the column with `"contains"`, `"startswith"` or any other [supported operator](/api/javascript/data/datasource#configuration-filter.operator).

The example below demonstrates how to filter Kendo UI Grid on the fly, as the user types in the filter row textbox.

###### Example

```html
    <div id="grid"></div>

    <script>

      $(function(){
        $("#grid").kendoGrid({
          dataSource: products,
          filterable: {
            mode: "row"
          },
          height: 400,
          columns: [{
            field: "ProductName",
            title: "Product Name",
            filterable: {
              cell: {
                operator: "contains",
                template: function (args) {
                  args.element.css("width", "90%").addClass("k-textbox").keydown(function(e){
                    setTimeout(function(){
                      $(e.target).trigger("change");
                    });
                  });                	
                },
                showOperators: false
              }
            }
          }]
        });
      });

      var products = new kendo.data.DataSource({
        schema: {
          model: {
            id: "ProductID",
            fields: {
              ProductName: { type: "string" }
            }
          }
        },
        transport: {
          read: {
            url: "//demos.telerik.com/kendo-ui/service/products",
            dataType: "jsonp"
          }
        }
      });

    </script>
```

## See Also

Other articles on the Kendo UI Grid and how-to examples:

* [JavaScript API Reference](/api/javascript/ui/grid)
* [How to Add Cascading DropDownList Editors]({% slug howto_add_cascading_dropdown_list_editors_grid %})
* [How to Copy Data from Excel]({% slug howto_copy_datafrom_excel_grid %})
* [How to Drag and Drop Rows between Grids]({% slug howto_dragand_drop_rows_between_twogrids_grid %})
* [How to Enable ForeignKey Column Sorting by Text]({% slug howto_enable_foreignkey_sotringby_text_grid %})
* [How to Filter Array Columns Using MultiSelect]({% slug howto_filetr_array_columns_using_multiselect_grid %})
* [How to Implement Stable Sort in Chrome]({% slug howto_implement_stable_sortin_chrome_grid %})
* [How to Initialize Data Attribute with Detail Template]({% slug howto_initialize_data_attributewith_detail_template_grid %})
* [How to Load and Append More Records While Scrolling Down]({% slug howto_loadand_append_morerecords_while_scrollingdown_grid %})
* [How to Perform CRUD Operations with Local Storage Data]({% slug howto_perform_crud_operationswith_local_storage_data_grid %})
* [How to Persist Expanded Rows after Refresh]({% slug howto_persist_expanded_rows_afetrrefresh_grid %})
* [How to Set Cell Color Based on ForeignKey Values]({% slug howto_set_cell_color_basedon_foreignkey_values_grid %})
* [How to Show Tooltip for Column Records]({% slug howto_show_tooltipfor_column_records_grid %})
* [How to Update Toolbar Content Using MVVM Binding]({% slug howto_update_toolbar_content_using_mvvmbinding_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_create_custom_editors_grid %}).
