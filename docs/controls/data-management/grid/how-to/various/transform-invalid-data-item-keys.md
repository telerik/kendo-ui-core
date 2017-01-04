---
title: Transform Invalid Data Item Keys into Valid Ones
page_title: Transform Invalid Data Item Keys into Valid Ones | Kendo UI Grid
description: "Learn how to use the `schema.parse()` method to replace the non-supported keys with supported ones in the Kendo UI Grid."
previous_url: /controls/data-management/grid/how-to/transform-invalid-data-item-keys
slug: howto_transforminvaliddataitemkety_grid
---

# Transform Invalid Data Item Keys into Valid Ones

Sometimes the received remote data contains fields that are not valid JavaScript identifiers. To manipulate the received data and transform it so that it can be processed by the Kendo UI DataSource, use the `schema.parse()` method to replace the non-supported keys with supported ones.

The example below demonstrates how to use the `schema.parse()` method to transform invalid data item keys into valid ones.

###### Example

```html
    <div id="grid"></div>
    <script>
          $(document).ready(function () {
              var d = [{id: 1,
                  "As Of Date": new Date("01/01/1991")
              }, {id:2,
                  "As Of Date": new Date("01/01/1990")
              }];

              $("#grid").kendoGrid({
                  editable: "popup",
                  dataSource: {
                      transport: {
                          read: function (e) {
                              // on success
                              e.success(d);
                              // on failure
                              //e.error("XHR response", "status code", "error message");
                          },
                          update: function (e) {
                              // persist the new data
                              d = e.data;

                              e.success();
                          }
                      },
                      schema: {
                          parse: function (response) {
                              // transform the objects so that they do not contain "illegal" identifiers
                              response.forEach(function (item) {
                                  item.field1 = item["As Of Date"];
                                  delete item['As Of Date'];
                              });

                              return response;
                          },
                          model: {
                              fields: {
                                  "id": "id",
                                  "field1": {
                                      type: "date",
                                  }
                              }
                          }
                      }
                  },
                  columns: [
                    {
                        command: [{ name: "edit" }]
                    },
                          { field: "field1", format: "{0:MM/dd/yyyy}", title: "As Of Date" }
                  ]
              });
          });
      </script>
```

## See Also

Other articles on the Kendo UI Grid and how-to examples:

* [JavaScript API Reference](/api/javascript/ui/grid)
* [How to Add Cascading DropDownList Editors]({% slug howto_add_cascading_dropdown_list_editors_grid %})
* [How to Copy Data from Excel]({% slug howto_copy_datafrom_excel_grid %})
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
