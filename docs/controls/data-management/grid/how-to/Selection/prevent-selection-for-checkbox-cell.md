---
title: Prevent Selection for Checkbox Cells
page_title:  jQuery Grid Documentation | Prevent Selection for Checkbox Cells | Kendo UI
description: "Get started with the jQuery Grid by Kendo UI and learn how to prevent selection for checkbox cells. "
slug: howto_prevent_selection_checkbox_cells_grid
---

# Prevent Selection for Checkbox Cells

The following example demonstrates how to prevent the cell-selection functionality for a checkbox or any cell.

###### Example

```dojo
    <div id="grid"></div>
    <script>
      $(function() {

        var grid = $("#grid").kendoGrid({
          dataSource: {
            data: [{foo:1}, {foo:2}]
          },
          columns: [
            {
              template: '<input type="checkbox" />'
            },
            "foo"
          ],
          selectable: "multiple cell"
        }).on(kendo.support.pointers ? "pointerup" : "mouseup", ".k-grid-content tr > td:first-child", function () {

          grid.selectable.one("select", function(e) {
            e.preventDefault();
          });

        }).data("kendoGrid");
      });
    </script>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
* [How to Make Selection with Checkbox Column]({% slug howto_make_selection_checkbox_column_grid %})
* [How to Persist Row Selection while Paging, Sorting, and Filtering]({% slug howto_persist_row_selection_paging_sorting_filtering_grid %})
* [How to Select Multiple Rows with Checkboxes]({% slug howto_select_multiple_rowswith_checkboxes_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_adjust_row_heights_template_locked_columns_grid %}).
