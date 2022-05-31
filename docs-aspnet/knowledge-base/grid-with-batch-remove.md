---
title: Grid Removing Previously Selected Items
description: How to mark item as deleted but remove it after save changes in MVC
type: how-to
page_title: Grid batch remove
slug: grid-with-batch-remove
tags: aspnet, mvc, kendo-ui, grid, datasource, model, batch, edit
res_type: kb
ticketid: 1564276
component: grid, datasource
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Telerik® UI for ASP.NET MVC</td>
 </tr>
</table>

## Description

I have a grid where custom buttons are implemented per row. When a custom button in a row is clicked, the row should be marked as deleted, but the removal should be applied when clicking a custom Delete button outside of the Grid.

## Solution

In order to achieve the desired behavior, use the following approach:

1. Add a custom Command button for every row.
1. Handle the click of the custom button.
1. The button stands for a row, so when clicked - add it to a global scope variable(array).
1. To the clicked row could be added some style for representing that it is a row that will be removed.
1. For the removal, add a new custom button outside of the Grid or in its Toolbar.
1. In the ["Click"](https://docs.telerik.com/kendo-ui/api/javascript/ui/button/events/click) Event handler of the button from point 5 - remove all the rows saved in the global scope variable. This could be achieved with the help of the ["removeRow"](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/removerow) method.
1. Here is an example:

```
// In the Grid add the custom button:
columns.Command(command => command.Custom("DeleteRow").Click("deleteRow")).Width(180);

// The click of a DeleteRow button(and the global scope variable):
    var rowsToDelete = [];

    function deleteRow(e) {
        var currRow = $(e.currentTarget).closest('tr')[0];

        //Adding a custom style for the rows that will be removed
        $(currRow).css("background-color", "red");

        rowsToDelete.push(currRow);
    }

// The Click Event handler of the button in step 5
    var rowsToDelete = [];

    function deleteRow(e) {
        var currRow = $(e.currentTarget).closest('tr')[0];

        //Adding a custom style for the rows that will be removed
        $(currRow).css("background-color", "red");

        rowsToDelete.push(currRow);
    }
```

## See Also

* [API Reference of the Grid](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [API Reference of the DataSource](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource)
