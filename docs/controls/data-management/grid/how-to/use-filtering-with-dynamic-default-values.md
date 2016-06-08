---
title: Use Grid Filtering with Dynamic Default Values
page_title: Use Grid Filtering with Dynamic Default Values | Kendo UI Grid Widget
description: "Learn how to use dynamic default field values in a Kendo UI Grid when filtering is applied."
slug: howto_gridfiltering_dynamicdefaultvalues_grid
---

# Use Grid Filtering with Dynamic Default Values

The example below demonstrates how to use dynamic default field values in a Kendo UI Grid when filtering is applied.

This approach comes in handy when you want the Grid to:
* Display the filtered filed value as the default one when a new record is being added.
* Show the new record added to the Grid.

To see how the example below functions, follow these steps:

1. Filter the Grid by its **Category** column to be equal to a given value.
2. Click **Add new record**.

As a result, the default category of the new record matches the current (filtered) one and a new row is added to the Grid.

###### Example

```html
      <script src="http://demos.telerik.com/kendo-ui/content/shared/js/products.js" type="text/javascript"></script>
      <div id="example">
        <div id="grid"></div>

        <script>
          var categories = [{
            "value": 1,
            "text": "Beverages"
          },{
            "value": 2,
            "text": "Condiments"
          },{
            "value": 3,
            "text": "Confections"
          },{
            "value": 4,
            "text": "Dairy Products"
          },{
            "value": 5,
            "text": "Grains/Cereals"
          },{
            "value": 6,
            "text": "Meat/Poultry"
          },{
            "value": 7,
            "text": "Produce"
          },{
            "value": 8,
            "text": "Seafood"
          }];

          $(document).ready(function () {
            var dataSource = new kendo.data.DataSource({
              pageSize: 20,
              data: products,
              schema: {
                model: {
                  id: "ProductID",
                  fields: {
                    ProductID: { editable: false, nullable: true },
                    ProductName: { validation: { required: true} },
                    CategoryID: {
                      field: "CategoryID",
                      type: "number",
                      defaultValue: function(e) {
                        if(typeof this.CategoryID === "function") {
                          var grid = $("#grid").data("kendoGrid");
                          var ds = grid.dataSource;
                          var filter = ds.filter();

                          if(filter && filter.filters[0].field === "CategoryID") {
                            return filter.filters[0].value;
                          } else {
                            return 1;
                          }
                        }
                      }
                    },
                    UnitPrice: { type: "number", validation: { required: true, min: 1} }
                  }
                }
              }
            });

            $("#grid").kendoGrid({
              dataSource: dataSource,
              filterable: true,
              groupable: true,
              pageable: true,
              height: 540,
              toolbar: ["create"],
              columns: [
                { field: "ProductName", title: "Product Name", filterable: false },
                { field: "CategoryID", width: "200px", values: categories, title: "Category" },
                { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "200px" , filterable: false},
                { command: "destroy", title: " ", width: "110px"}],
              editable: "popup"
            });
          });
        </script>
          </div>
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
