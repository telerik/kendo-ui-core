---
title: Prevent Selection for Checkbox Cells
page_title:  Prevent Selection for Checkbox Cells | Kendo UI Grid
description: "Learn how to prevent selection for checkbox cells in Kendo UI Grid."
slug: howto_prevent_selection_checkbox_cells_grid
---

# Prevent Selection for Checkbox Cells

The example below demonstrates how to prevent the cell selection functionality for checkbox or any cells.

###### Example

```html
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
        }).on(kendo.support.msPointers ? "pointerup" : "mouseup", ".k-grid-content tr > td:first-child", function () {

          grid.selectable.one("select", function(e) {
            e.preventDefault();
          });

        }).data("kendoGrid");
      });
    </script>
```

## See Also

Other articles on the Kendo UI Grid and how-to examples on the selection functionality:

* [JavaScript API Reference](/api/javascript/ui/grid)
* [How to Make Selection with Checkbox Column]({% slug howto_make_selection_checkbox_column_grid %})
* [How to Persist Row Selection while Paging, Sorting, and Filtering]({% slug howto_persist_row_selection_paging_sorting_filtering_grid %})
* [How to Select Multiple Rows with Checkboxes]({% slug howto_select_multiple_rowswith_checkboxes_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_create_custom_editors_grid %}).
