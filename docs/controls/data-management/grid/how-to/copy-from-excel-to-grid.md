---
title: Copy Data from Excel
page_title: Copy Data from Excel | Kendo UI Grid
description: "Learn how to copy data from Excel in a Kendo UI Grid."
slug: howto_copy_datafrom_excel_grid
---

# Copy Data from Excel

The example below demonstrates how to create a Kendo UI Grid that supports pasting from Excel.

###### Example

```html
     <div id="grid" tabindex="0"></div>
    <script>
      $("#grid").kendoGrid({
        // the column fields should match the excel columns
        columns: [
          { field: "Name" },
          { field: "Age" }
        ],
        dataSource: [
          { Name: "John Doe", Age: 33 }
        ]
      }).on('focusin', function(e) {
        // get the grid position
        var offset = $(this).offset();
        // crete a textarea element which will act as a clipboard
        var textarea = $("<textarea>");
        // position the textarea on top of the grid and make it transparent
        textarea.css({
          position: 'absolute',
          opacity: 0,
          top: offset.top,
          left: offset.left,
          border: 'none',
          width: $(this).width(),
          height: $(this).height()
        })
        .appendTo('body')
        .on('paste', function() {
          // handle the paste event
          setTimeout(function() {
            // the the pasted content
            var value = $.trim(textarea.val());
            // get instance to the grid
            var grid = $("#grid").data("kendoGrid");
            // get the pasted rows - split the text by new line
            var rows = value.split('\n');

            var data = [];

            for (var i = 0; i < rows.length; i++) {
              // get the cells - split by tab
              var cells = rows[i].split('\t');
              // add a new item in the grid
              grid.dataSource.add({
                Name: cells[0],
                Age: cells[1]
              });
            }
          });
        }).on('focusout', function() {
          // remove the textarea when it loses focus
          $(this).remove();
        });
        // focus the textarea
        setTimeout(function() {
          textarea.focus();
        });
      });
    </script>
```

## See Also

Other articles on the Kendo UI Grid and how-to examples:

* [JavaScript API Reference](/api/javascript/ui/grid)
* [How to Add Cascading DropDownList Editors]({% slug howto_add_cascading_dropdown_list_editors_grid %})
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
