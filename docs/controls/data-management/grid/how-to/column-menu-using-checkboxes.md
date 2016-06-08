---
title: Use Checkboxes inside Column Menus
page_title: Use Checkboxes inside Column Menus | Kendo UI Grid
description: "Learn how to use checkboxes inside a Kendo UI Grid column menu."
slug: howto_use_checkboxes_inside_column_menu_grid
---

# Use Checkboxes inside Column Menus

The example below demonstrates how to use checkboxes inside a Kendo UI Grid column menu.

###### Example

```html
     <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          { field: "id", menu: false },
          { field: "name", menu: false },
          { field: "age" }
        ],
        columnMenu: true,
        dataSource: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33 }
        ],
        columnMenuInit:function(e){    
          var menu = e.container.children().data("kendoMenu");
          var handler = $.proxy(enableCheckbox, menu);

          menu.bind("open", handler).bind("select", handler);    
        }
      });

      function enableCheckbox() {
        this.element.find(".k-columns-item :checkbox").prop("disabled", false);
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
