---
title: Use Checkboxes inside Column Menus
page_title: Checkboxes Inside Column Menus | Kendo UI Grid for jQuery
description: "An example on how to use checkboxes inside the column menu of the Kendo UI Grid for jQuery."
previous_url: /controls/data-management/grid/how-to/column-menu-using-checkboxes, /controls/data-management/grid/how-to/various/column-menu-using-checkboxes
slug: howto_use_checkboxes_inside_column_menu_grid
tags: grid, checkbox, inside, column, menu
component: grid
type: how-to
res_type: kb
---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I use checkboxes inside the column menu of the Kendo UI Grid for jQuery?

## Solution

The following example demonstrates how to use checkboxes inside the column menu of a Grid.

```dojo
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

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
