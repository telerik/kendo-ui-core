---
title: Create Grids with Dynamic Columns and Data Types
page_title: Create Grids with Dynamic Columns and Data Types | Kendo UI Grid
description: "Learn how to create a Kendo UI Grid with column and data fields information which is retrieved during runtime."
previous_url: /controls/data-management/grid/how-to/create-with-dynamic-columns-and-data-types
slug: howto_createdynamiccolumnsdatatypes_grid
---

# Create Grids with Dynamic Columns and Data Types

The example below demonstrates how to create a Kendo UI Grid with column and data-field information that is retrieved during runtime.

###### Example

```html

    <div id="grid" style="width:1000px;"></div>

    <script>
      var isDateField =[];
      $.ajax({
        url: "http://www.mocky.io/v2/5835e736110000020e0c003c",
        dataType: "json",
        success: function(result) {
          generateGrid(result);
        }
      });

      function generateGrid(response) {
        var model = generateModel(response);
        var columns = generateColumns(response);

        var grid = $("#grid").kendoGrid({
          dataSource: {
            transport:{
              read:  function(options){
                options.success(response.data);
              }
            },
            pageSize: 5,
            schema: {
              model: model
            }
          },
          columns: columns,
          pageable: true,
          editable:true  
        });
      }

      function generateColumns(response){
        var columnNames = response["columns"];
        return columnNames.map(function(name){
          return { field: name, format: (isDateField[name] ? "{0:D}" : "") };
        })
      }

      function generateModel(response) {

        var sampleDataItem = response["data"][0];

        var model = {};
        var fields = {};
        for (var property in sampleDataItem) {
          if(property.indexOf("ID") !== -1){
            model["id"] = property;
          }
          var propType = typeof sampleDataItem[property];

          if (propType === "number" ) {
            fields[property] = {
              type: "number",
              validation: {
                required: true
              }
            };
            if(model.id === property){
              fields[property].editable = false;
              fields[property].validation.required = false;
            }
          } else if (propType === "boolean") {
            fields[property] = {
              type: "boolean"
            };
          } else if (propType === "string") {
            var parsedDate = kendo.parseDate(sampleDataItem[property]);
            if (parsedDate) {
              fields[property] = {
                type: "date",
                validation: {
                  required: true
                }
              };
              isDateField[property] = true;
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
