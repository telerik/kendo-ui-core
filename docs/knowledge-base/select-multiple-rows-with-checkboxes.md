---
title: Select Multiple Rows with Checkboxes
page_title:  Multiple Rows with Checkboxes | Kendo UI Grid for jQuery
description: "An example on how to select multiple rows with checkboxes in the Kendo UI Grid for jQuery."
previous_url: /controls/data-management/grid/how-to/Selection/select-multiple-rows-with-checkboxes
slug: howto_select_multiple_rowswith_checkboxes_grid
tags: select, multiple, rows, checkboxes, grid
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>All</td>
 </tr>
</table>

## Description

How can I select multiple rows with checkboxes in the Kendo UI Grid for jQuery?

## Solution

The following example demonstrates how to select multiple rows by using the checkbox template in the Grid.

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
