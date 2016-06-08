---
title: Use MultiSelect for Column Filtering
page_title: Use MultiSelect for Column Filtering | Kendo UI Grid
description: "Learn how to use Kendo UI MultiSelect for column filtering in the Kendo UI Grid widget."
slug: howto_use_multiselect_forcolumn_filtering_grid
---

# Use MultiSelect for Column Filtering

The example below demonstrates how to use Kendo UI MultiSelect as a column filter for the Grid.

###### Example

```html
    <script src="http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore-min.js"></script>
    <div id="grid"></div>
    <script>
      var data = [
        { id: 1, name: "Fred", key: 1, value: "Green" },
        { id: 2, name: "Jed", key: 11, value: "Jorgensen" },
        { id: 3, name: "Red", key: 2, value: "Blah" },
        { id: 4, name: "Ted", key: 23, value: "Bleh" },
        { id: 5, name: "Ed", key: 3, value: "Toast" },
        { id: 6, name: "Zed", key: 4, value: "Smith" },
        { id: 7, name: "Ed", key: 41, value: "Johnson" }
      ];

      $(function() {
        var names = _.sortBy(_.uniq(_.pluck(data, "name")), function(n) { return n; });

        function createMultiSelect(element) {
          element.removeAttr("data-bind");

          element.kendoMultiSelect({
            dataSource: names,
            change: function(e) {
              var filter = { logic: "or", filters: [] };
              var values = this.value();
              $.each(values, function(i, v) {
                filter.filters.push({field: "name", operator: "eq", value: v });
              });
              console.log(this.dataSource.data());
              dataSource.filter(filter);
            }
          });
        }

        var dataSource = new kendo.data.DataSource({
          data: data,
          schema: {
            model: {
              fields: {
                id: { type: "number" },
                name: { type: "string" },
                key: { type: "number" },
                value: { type: "string" }
              }
            }
          }
        });

        var grid = $("#grid").kendoGrid({
          dataSource: dataSource,
          sortable: true,
          filterable: true,
          columns: [
            {field: "id", title: "Id"},
            {
              field: "name",
              title: "Name",
              filterable: {
                ui : createMultiSelect,
                extra: false
              }
            },
            {field: "key", title: "Key"},
            { field: "value", title: "Value"}
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
