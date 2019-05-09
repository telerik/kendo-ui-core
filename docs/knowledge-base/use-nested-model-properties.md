---
title: Use Nested Model Properties
page_title: jQuery Grid Documentation | Use Nested Model Properties | Kendo UI
description: "Get started with the jQuery Grid by Kendo UI and learn how to use nested model properties in the widget."
previous_url: /controls/data-management/grid/how-to/use-nested-model-properties, /controls/data-management/grid/how-to/binding/use-nested-model-properties
slug: howto_use_nested_model_properties_grid
---

# Use Nested Model Properties

When you use `from` together with CRUD operations and add new rows, you also have to define in `schema.model.fields` the original field or the sequence of nested fields which are used inside `from`.

The reason is that during updates and creates, the Kendo UI DataSource tries to construct a data item object which matches the original (server-side) data-item structure. For new data items, such a structure does not exist and needs to be defined explicitly, as demonstrated in the following example.

```
    myClientField1: { from: "myServerField1.foo" },
    myServerField1: { defaultValue: {} },

    myClientField2: { from: "myServerField2[0].bar" },
    myServerField2: { defaultValue: [{}] },

    myClientField3: { from: "myServerField3.myServerField4.baz" },
    myServerField3: { defaultValue: { myServerField4: {} } },
```

The following example demonstrates how to use nested model properties. The CRUD operations are not fully configured.

###### Example

```dojo
    <div id="grid"></div>
    <script>
      function getData(length) {
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
        return data;
      }

      $("#grid").kendoGrid({
        dataSource: {
          data: getData(10),
          schema: {
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
                // A default value is needed for person to be defined to support additions
                person: { defaultValue: {} },
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
        toolbar: ["create"],
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
