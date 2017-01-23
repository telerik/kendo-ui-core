---
title: Implement Stable Sorting for Grouped Data in Chrome
page_title: Implement Stable Sorting for Grouped Data in Chrome | Kendo UI Grid
description: "Learn how to implement a stable sort for grouped data in Google Chrome when using the Kendo UI Grid widget."
slug: howto_implement_stable_sortwithgroupingin_chrome_grid
---

# Implement Stable Sorting in Chrome

The implementation of the built-in sorting algorithm in Google Chrome [is not guaranteed to be stable](https://bugs.chromium.org/p/v8/issues/detail?id=90). A [non-stable sorting algorithm](https://en.wikipedia.org/wiki/Sorting_algorithm#Stability) might cause items with the same sorting order to change places.

When the Grid is grouped by a given field, you can use the [`sort`](/api/javascript/data/datasource#methods-sort) method in the [`group`](/api/javascript/ui/grid#events-group) event handler of the Grid to programmatically sort the items within each group in the preferred order.

The following example demonstrates how to apply a stable sort function by using a position field in the Grid.

###### Example

```html
<div id="grid"></div>

    <script>
      $("#grid").kendoGrid({
        dataSource: [
          { "Name": "Group1", "Value": 1 },
          { "Name": "Group1", "Value": 2 },
          { "Name": "Group1", "Value": 3 },
          { "Name": "Group1", "Value": 4 },
          { "Name": "Group1", "Value": 5 },
          { "Name": "Group1", "Value": 6 },
          { "Name": "Group1", "Value": 7 },
          { "Name": "Group1", "Value": 8 },
          { "Name": "Group2", "Value": 1 },
          { "Name": "Group2", "Value": 2 },
          { "Name": "Group2", "Value": 3 }
        ],
        height: 600,
        group: function(e){
          var groupedByName = false;
          e.groups.forEach(function(item){
            if(item.field === 'Name'){
              groupedByName = true;
              return;
            }
          })

          if(groupedByName){
            e.sender.dataSource.sort({
              field: 'Name',
              dir: 'asc',
              compare: function(a, b) {
                if(a.Name !== b.Name) {
                  return a.Name.localeCompare(b.Name);
                }

                return a.Value - b.Value;
              }
            });
          }
        },
        groupable: true,
        columns: ['Name', 'Value']
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
* [How to Initialize Data Attribute with Detail Template]({% slug howto_initialize_data_attributewith_detail_template_grid %})
* [How to Load and Append More Records While Scrolling Down]({% slug howto_loadand_append_morerecords_while_scrollingdown_grid %})
* [How to Perform CRUD Operations with Local Storage Data]({% slug howto_perform_crud_operationswith_local_storage_data_grid %})
* [How to Persist Expanded Rows after Refresh]({% slug howto_persist_expanded_rows_afetrrefresh_grid %})
* [How to Set Cell Color Based on ForeignKey Values]({% slug howto_set_cell_color_basedon_foreignkey_values_grid %})
* [How to Show Tooltip for Column Records]({% slug howto_show_tooltipfor_column_records_grid %})
* [How to Update Toolbar Content Using MVVM Binding]({% slug howto_update_toolbar_content_using_mvvmbinding_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_create_custom_editors_grid %}).
