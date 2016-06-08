---
title: Use Draggable Elements with Multiselection Enabled
page_title: Use Draggable Elements with Multiselection Enabled | Kendo UI Grid
description: "Learn how to use draggable components in a Kendo UI Grid widget with enabled multiselection."
slug: howto_use_draggable_elements_multiselection_enabled_grid
---

# Use Draggable Elements with Multiselection Enabled

The example below demonstrates how to use draggable components in Kendo UI Grid with enabled multiselection.

###### Example

```html
  <div id="example">

    <div class="demo-section k-content wide">
      <h4>Grid with multiple row selection enabled</h4>
      <div id="rowSelection"></div>
    </div>

    <script>
      kendo.UserEvents.defaultThreshold(0); //globally change the default defaultThreshold
      $(document).ready(function () {
        var boxes = [{
          ID : 1,
          Name : "Box 1",
          Color: "red"
        }, {
          ID : 2,
          Name : "Box 2",
          Color: "green"
        }, {
          ID : 3,
          Name : "Box 3",
          Color: "blue"
        }];

        $("#rowSelection").kendoGrid({
          dataSource: {
            data: boxes
          },
          selectable: "multiple",
          scrollable: false,
          navigatable: true,
          columns: [
            {
              field: "ID",
              width: 300
            },
            {
              field: "Name",
              width: 300
            },
            {
              title: "Box Draggable",
              template: '<div class="box" style="background-color: #= Color #; cursor: move; width: 20px; height: 20px; text-align: center; color: white;">#= ID #</div>'
            }
          ]
        });

        $(".box").kendoDraggable({
          hint: function(element) {
            return element.clone();
          }
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
