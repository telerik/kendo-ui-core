---
title: Adjusting Drop Hint Line Width in Kendo UI for jQuery Grid
description: Learn how to make the drop hint line span the entire width of the grid in Kendo UI for jQuery Grid when using Drag and Drop functionality.
type: how-to
page_title: How to Adjust Drop Hint Line in Kendo UI for jQuery Grid
meta_title: Adjust Drop Hint Line Width in Kendo UI for jQuery Grid
slug: adjust-drop-hint-line-width-kendo-jquery-grid
tags: kendo-ui-for-jquery, grid, drag-and-drop, drop-hint
res_type: kb
ticketid: 1716958
---

## Environment

<table>
<tbody>
<tr>
<td> Product </td>
<td> Kendo UI for jQuery Grid </td>
</tr>
<tr>
<td> Version </td>
<td> 2026.2.520</td>
</tr>
</tbody>
</table>

## Description

When dragging and dropping rows in a [Kendo UI for jQuery Grid](https://www.telerik.com/kendo-jquery-ui/documentation/controls/grid/overview) with many columns, the drop hint line may not span the full width of the grid. This can make it difficult for users to identify the drop location, especially with large datasets or grids with horizontal scrolling. Adjusting the width of the drop hint line to match the grid's visible area resolves this issue.

This knowledge base article also answers the following questions:
- How to make the drop hint line visible across all columns in Kendo UI for jQuery Grid?
- How to customize the drop hint line in Kendo UI for jQuery Grid?
- How to prevent horizontal scrolling caused by drop hint line adjustments in Kendo UI for jQuery Grid?

## Solution

To make the drop hint line span the entire grid width without introducing unwanted horizontal scrolling, follow these steps:

1. Attach event listeners for `mousemove` and `mousedown` events on the grid element.
2. When the `.k-drop-hint` element is present during a row drag, set its width to match the visible width of the grid container using JavaScript.

Here is the implementation:

```javascript
$("#grid").on("mousemove mousedown", function() {   
    var $hint = $(".k-drop-hint");
    if ($hint.length) {
        $hint.css("width", $("#grid").width() + "px");
    }
});
```

This approach ensures the drop hint line dynamically adjusts to the visible container width of the grid. It prevents horizontal scrolling and keeps the drop hint line visible and aligned with the grid.

Below is a runnable example:
```dojo
<style>
      .k-drop-hint {
        border-color: red !important;
        color: purple !important;
        border-width: 4px !important;
        box-shadow: 0 0 8px red;
      }
    </style>
    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          { field: "name", width: 200 },
          { field: "age", width: 300 },
          { field: "name", width: 200 },
          { field: "age", width: 300 },
          { field: "name", width: 200 },
          { field: "age", width: 300 },
          { field: "name", width: 200 },
          { field: "age", width: 300 },
          { field: "name", width: 200 },
          { field: "age", width: 300 },
          { field: "name", width: 200 },
          { field: "age", width: 300 },
          { field: "name", width: 200 },
          { field: "age", width: 300 },
          { field: "name", width: 200 },
          { field: "age", width: 300 },
          { field: "name", width: 200 },
          { field: "age", width: 300 },
          { field: "name", width: 200 },
          { field: "age", width: 300 },
          { field: "name", width: 200 },
          { field: "age", width: 300 },
          { field: "name", width: 200 },
          { field: "age", width: 300 },
        ],
        reorderable: {
          rows: true,
        },
        dataSource: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe 1", age: 33 },
          { name: "Jane Doe 2", age: 30 },
          { name: "John Doe 3", age: 33 },
          { name: "Jane Doe 4", age: 30 },
          { name: "John Doe 5", age: 33 },
        ],
      });

      $("#grid").on("mousemove mousedown", function () {
        var $hint = $(".k-drop-hint");
        if ($hint.length) {
          $hint.css("width", $("#grid").width() + "px");
        }
      });
    </script>
```

## See Also

- [Kendo UI for jQuery Grid Overview](https://www.telerik.com/kendo-jquery-ui/documentation/controls/grid/overview)
- [Kendo UI for jQuery Grid API](/api/javascript/ui/grid)
