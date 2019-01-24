---
title: Select Multiple Rows with Checkboxes
page_title:  jQuery Grid Documentation | Multiple Rows with Checkboxes | Kendo UI
description: "Get started with the jQuery Grid by Kendo UI and learn how to select multiple rows with checkboxes."
slug: howto_select_multiple_rowswith_checkboxes_grid
---

# Select Multiple Rows with Checkboxes

The following example demonstrates how to select multiple rows by using the checkbox template in the Grid.

###### Example

```dojo
   <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        selectable:"multiple, row",
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
        change: function(e) {
          $('tr').find('[type=checkbox]').prop('checked', false);
          $('tr.k-state-selected').find('[type=checkbox]').prop('checked', true);
        },
        columns: [{
            title: "select",
            template: '<input class="checkbox" type="checkbox" />'
          },
          { field: "id" },
          { field: "foo" },
          { field: "bar" }
        ],
        dataBound: function (e) {
          $(".checkbox").bind("click", function (e) {
            e.stopPropagation();
            $(e.target).closest("tr").toggleClass("k-state-selected");
          });
          
          var rows = e.sender.element.find("tr");
          rows.each(function(e){
            $(this).children().first().on("click", onFirstTDClick);
          })
        }
      });
      
      function onFirstTDClick(e){
        e.stopPropagation();
        var tr = $(e.target).closest("tr");

        tr.find('[type=checkbox]').prop('checked', !tr.hasClass("k-state-selected"));
        tr.toggleClass("k-state-selected");
      }
    </script>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
* [How to Make Selection with Checkbox Column]({% slug howto_make_selection_checkbox_column_grid %})
* [How to Persist Row Selection while Paging, Sorting, and Filtering]({% slug howto_persist_row_selection_paging_sorting_filtering_grid %})
* [How to Prevent Selection for Checkbox Cells]({% slug howto_prevent_selection_checkbox_cells_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_adjust_row_heights_template_locked_columns_grid %}).
