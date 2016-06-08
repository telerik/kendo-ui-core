---
title: Use Nested Model Properties
page_title: Use Nested Model Properties | Kendo UI Grid
description: "Learn how to use use nested model properties in the Kendo UI Grid widget."
slug: howto_use_nested_model_properties_grid
---

# Use Nested Model Properties

The example below demonstrates how to use nested model properties. CRUD operations are not fully configured.

###### Example

```html
    <div id="grid"></div>
    <script>
      function getData(length, delay) {
        var data = [];
        var sampleDate = new Date();
        for (var j = 1; j <= length; j++) {
          data[j - 1] = {
            id: j
          };
          data[j - 1].person = {
            fname: "First Name " + j,
            lname: "Last Name " + j,
            bdate: new Date(sampleDate.getTime() - j * 1000 * 60 * 60 * 24)
          }
        }
        return {
          json: JSON.stringify({
            data: data
          }),
          delay: delay
        };
      }

      $("#grid").kendoGrid({
        dataSource: {
          transport: {
            read: {
              url: "/echo/json/",
              type: "post",
              data: getData(10, 1)
            }
          },
          schema: {
            data: "data",
            model: {
              id: "id",
              fields: {
                id: {
                  type: "int"
                },
                fname: {
                  from: "person.fname"
                },
                lname: {
                  from: "person.lname"
                },
                bdate: {
                  type: "date",
                  from: "person.bdate"
                }
              }
            }
          }
        },
        sortable: true,
        editable: {
          mode: "inline"
        },
        columns: [{
          field: "id",
          title: "ID"
        }, {
          field: "fname",
          title: "First Name"
        }, {
          field: "lname",
          title: "Last Name"
        }, {
          field: "bdate",
          title: "Birth Date",
          format: "{0:yyyy-MM-dd}"
        }, {
          command: ["edit", "destroy"],
          title: "&nbsp;"
        }]
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
