---
title: Create Grids with Dynamic Columns and Data Types
page_title: Create Grids with Dynamic Columns and Data Types | Kendo UI Grid
description: "Learn how to create a Kendo UI Grid with column and data fields information which is retrieved during runtime."
slug: howto_createdynamiccolumnsdatatypes_grid
---

# Create Grids with Dynamic Columns and Data Types

The example below demonstrates how to create a Kendo UI Grid with column and data fields information which is retrieved during runtime.

###### Example

```html

    <div id="grid" style="width:600px;"></div>

    <script>
        var dateFields = [];
        $.ajax({
          url: "http://demos.telerik.com/kendo-ui/service/products",
          dataType: "jsonp",
          success: function(result) {
            generateGrid(result)
          }
        });

        function generateGrid(gridData) {

          var model = generateModel(gridData[0]);
          var parseFunction;

          //
          var grid = $("#grid").kendoGrid({
            dataSource: {
              data: gridData,
              pageSize: 5
            },
            toolbar: ["create", "save"],
            editable: true,
            sortable: true,
            pageable: true
          });
        }

        function generateModel(gridData) {
          var model = {};
          model.id = "ID";
          var fields = {};
          for (var property in gridData) {
            var propType = typeof gridData[property];

            if (propType == "number") {
              fields[property] = {
                type: "number",
                validation: {
                  required: true
                }
              };
            } else if (propType == "boolean") {
              fields[property] = {
                type: "boolean",
                validation: {
                  required: true
                }
              };
            } else if (propType == "string") {
              var parsedDate = kendo.parseDate(gridData[property]);
              if (parsedDate) {
                fields[property] = {
                  type: "date",
                  validation: {
                    required: true
                  }
                };
                dateFields.push(property);
              } else {
                fields[property] = {
                  validation: {
                    required: true
                  }
                };
              }
            } else {
              fields[property] = {
                validation: {
                  required: true
                }
              };
            }

          }
          model.fields = fields;

          return model;
        }
      </script>
```

## See Also

Other articles on the Kendo UI Grid and how-to examples:

* [JavaScript API Reference](/api/javascript/ui/grid)
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

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_create_custom_editors_grid %}).
