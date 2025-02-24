---
title: Disabling Kendo UI for jQuery Grid Along with Navigation
description: Learn how to disable interaction with the Kendo UI for jQuery Grid and its navigation through a button click event.
type: how-to
page_title: How to Disable Kendo UI for jQuery Grid and Its Navigation
slug: disable-kendo-ui-grid-navigation
tags: kendo, ui, grid, disable, navigation, jquery
res_type: kb
---

## Description

In some cases, it's necessary to disable a [Kendo UI for jQuery Grid](https://demos.telerik.com/kendo-ui/grid/index) along with its navigation and selection capabilities. This might be required to prevent user interaction with the grid under certain conditions. The goal is to make the grid appear greyed out and non-operable, ensuring that items cannot be selected or navigated using the keyboard.

This knowledge base article also answers the following questions:
- How can I disable user interaction with a Kendo UI for jQuery Grid?
- How to grey out a Kendo UI for jQuery Grid to indicate it's disabled?
- Is it possible to disable selection and keyboard navigation in a Kendo UI for jQuery Grid?

## Solution

To achieve the desired behavior of disabling the Kendo UI for jQuery Grid, along with its navigation and selection, follow these steps:

1. Use the `setOptions` method to dynamically change the grid's `navigatable` and `selectable` options to `false`. This action disables keyboard navigation and selection in the grid.
2. Add a CSS class, such as `k-disabled`, to the grid element to visually indicate that the grid is disabled. This class can set the `opacity` to a lower value and change the `background-color` to grey, mimicking the appearance of a disabled control.

Here is an example code snippet demonstrating these steps:

```javascript
$("#disable").click(function(){
  $("#grid").addClass("k-disabled"); // Adds a visual cue to indicate the grid is disabled
  grid.setOptions({
    navigatable: false,
    selectable: false
  });
});
``

This approach ensures that once a button is clicked, the Kendo UI for jQuery Grid appears greyed out and does not respond to user interactions such as selection and keyboard navigation. 

Here is a runnable example to demonstrate the approach:

```dojo
    <button id="disable">Disable</button>
    <div id="grid"></div>
    <script>
      var grid = $("#grid").kendoGrid({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ],
        navigatable: true,
        selectable: true
      }).data("kendoGrid");

      $("#disable").click(function(){
        $("#grid").addClass("k-disabled")
        grid.setOptions({
          navigatable: false,
          selectable: false
        })
      })
    </script>
```

## See Also

- [Kendo UI for jQuery Grid Overview](https://docs.telerik.com/kendo-ui/controls/grid/overview)
- [Grid API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
