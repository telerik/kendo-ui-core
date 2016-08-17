---
title: Select Multiple Rows with Checkboxes
page_title:  Select Multiple Rows with Checkboxes | Kendo UI Grid
description: "Learn how to select multiple rows with checkboxes in the Kendo UI Grid widget."
slug: howto_select_multiple_rowswith_checkboxes_grid
---

# Select Multiple Rows with Checkboxes

The example below demonstrates how to select multiple rows using the checkbox template in the Kendo UI Grid widget.

###### Example

```html
  <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        dataSource: {
          data: [
            {id: 1, foo: "item1", bar: "name1"},
            {id: 2, foo: "item2", bar: "name2"},
            {id: 3, foo: "item3", bar: "name3"},
            {id: 4, foo: "item4", bar: "name4"},
            {id: 5, foo: "item5", bar: "name5"},
            {id: 6, foo: "item6", bar: "name6"},
            {id: 7, foo: "item7", bar: "name7"},
            {id: 8, foo: "item8", bar: "name8"},
            {id: 9, foo: "item9", bar: "name9"}
          ]
        },
        columns: [{
          title: "select",
          template: '<input class="checkbox" type="checkbox" />'
        },
                  { field: "id" },
                  { field: "foo" },
                  { field: "bar" }],
        dataBound: function () {
          $(".checkbox").bind("change", function (e) {
            $(e.target).closest("tr").toggleClass("k-state-selected");
          });
        }
      })
    </script>
```

## See Also

Other articles on the Kendo UI Grid and how-to examples on the selection functionality:

* [JavaScript API Reference](/api/javascript/ui/grid)
* [How to Make Selection with Checkbox Column]({% slug howto_make_selection_checkbox_column_grid %})
* [How to Persist Row Selection while Paging, Sorting, and Filtering]({% slug howto_persist_row_selection_paging_sorting_filtering_grid %})
* [How to Prevent Selection for Checkbox Cells]({% slug howto_prevent_selection_checkbox_cells_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_create_custom_editors_grid %}).
