---
title: Removing Set Column Position option from Grid Column Menu
description: Learn how to remove the Column Reordering option from the column menu of the Kendo UI Grid.
type: how-to
page_title: How to Disable Column Reordering in Kendo UI Grid Column Menu
slug: disable-column-reordering-kendo-ui-grid
tags: kendo-ui, grid, column-menu, column-reordering, javascript, set-column-position
res_type: kb
components: ["grid"]
ticketid: 1660343
---

## Environment
<table>
<tbody>
<tr>
<td>Product</td>
<td>Grid for Progress® Kendo UI®</td>
</tr>
<tr>
<td>Version</td>
<td>2024.3.806</td>
</tr>
</tbody>
</table>

## Description
I need to remove the Column Reordering functionality from the column menu in the Kendo UI Grid. This KB article also answers the following questions:
- How to hide Column Reordering from the Grid's column menu?
- How to customize the column menu in the Kendo UI Grid?
- How to disable specific options in the Grid's column menu?

## Solution
To remove the Column Reordering option from the column menu in the Kendo UI Grid, utilize the [`columnMenuInit`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/columnmenuinit) event. This event allows you to customize the column menu after it is initialized. By targeting the specific menu item for Column Reordering, you can hide or remove it from the menu.

Follow these steps to achieve the desired outcome:

1. Define the `columnMenuInit` event in the Grid's configuration.
2. In the event handler function, find the menu item for Column Reordering.
3. Hide the menu item to remove it from the column menu.

Here is a JavaScript example demonstrating how to implement this:

```javascript
$("#grid").kendoGrid({
    // Grid configuration...
    columnMenuInit: function(e) {
        // Target the Column Reordering menu item
        let positionItem = $(e.container).find("ul").children("li").eq(1);
        // Hide the menu item
        positionItem.hide();
    }
    // Other grid options...
});
```

For a practical demonstration, refer to the below Dojo demo.

```dojo
<div id="grid"></div>
<script>
  $("#grid").kendoGrid({
    columns: [
      { field: "name" },
      { field: "age" }
    ],
    reorderable: true,
    columnMenu: true,
    dataSource: [
      { name: "Jane Doe", age: 30 },
      { name: "John Doe", age: 33 }
    ],
    columnMenuInit: function(e) {
      let positionItem = $(e.container).find("ul").children("li").eq(1);
      positionItem.hide();
    }
  });
</script>
```

## See Also
- [Grid Column Menu Documentation](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columnmenu)
- [ColumnMenuInit Event of Grid](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/columnmenuinit)
- [Kendo UI Grid Overview](https://docs.telerik.com/kendo-ui/controls/data-management/grid/overview)
