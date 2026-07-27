---
title: Customizing the Appearance of the Drop Hint Line in Kendo UI for jQuery Grid
description: Learn how to change the appearance of the drop hint line (.k-drop-hint) when using the reorderable.rows feature in the Kendo UI for jQuery Grid.
type: how-to
page_title: Changing the Drop Hint Line Style in Kendo UI for jQuery Grid
meta_title: Customize Drop Hint Line in Kendo UI for jQuery Grid
slug: customizing-drop-hint-line-kendo-jquery-grid
tags: kendo-ui-for-jquery, grid, reorderable, drop-hint, drag-and-drop
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
<td> 2026.2.520 </td>
</tr>
</tbody>
</table>

## Description

I want to customize the appearance of the drop hint line (`.k-drop-hint`) when reordering rows in a [Kendo UI for jQuery Grid](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/reorderable.rows). The default drop hint line can sometimes be hard to see, especially in wide grids with horizontal scrolling enabled, where it may go out of view. 

This knowledge base article also answers the following questions:
- How to style the drop hint line in Kendo UI for jQuery Grid?
- How to change the color of the drop hint line for reorderable rows?
- How to enhance the visibility of the drop hint line in Kendo UI Grid?

## Solution

To customize the appearance of the drop hint line when using the `reorderable.rows` feature in the Kendo UI for jQuery Grid, use custom CSS. You can target the `.k-drop-hint`, `.k-drop-hint-start`, and `.k-drop-hint-line` classes to apply your desired styles.

1. Add the following CSS to your page to modify the drop hint's appearance:

```css
/* Customize the main drop hint box */
.k-drop-hint {
    border-color: red !important;
    color: purple !important;
    border-width: 4px !important;
    box-shadow: 0 0 8px red;
}

/* Customize the drop hint pointer */
.k-drop-hint-h .k-drop-hint-start {
    border-inline-start-width: 10px;
    border-inline-start-color: orchid;
}

/* Customize the drop hint line */
.k-drop-hint-line {
    background-color: violet !important;
    height: 3px !important;
}
```

2. The above styles will:
   - Change the border color and width of the drop hint box.
   - Add a shadow to highlight the drop hint.
   - Adjust the thickness and color of the drop hint line.
   - Customize the pointer's style.

3. Below is a working example:

```dojo
<style>
      .k-drop-hint {
        border-color: red !important;
        color: purple !important;
        border-width: 4px !important;
        box-shadow: 0 0 8px red;
      }

      .k-drop-hint-h .k-drop-hint-start {
        border-inline-start-width: 10px;
        border-inline-start-color: orchid;
      }
      .k-drop-hint-line {
        background-color: violet !important;
        height: 3px !important;
      }
    </style>
    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [{ field: "name" }, { field: "age" }],
        rowReorder: function () {
          debugger;
        },
        dataSource: [
          { id: 1, name: "Jane Doe", age: 20 },
          { id: 2, name: "John Doe", age: 33 },
          { id: 3, name: "Alex", age: 34 },
          { id: 4, name: "Peter", age: 43 },
          { id: 5, name: "Mark", age: 30 },
        ],
        reorderable: {
          rows: true,
        },
      });
    </script>
```

If the drop hint line is still out of view or not properly spanning the grid due to the grid's layout or features like virtual scrolling, further adjustments may be needed. Ensure that the CSS matches your specific grid configuration.

## See Also

- [Kendo UI for jQuery Grid Overview](https://www.telerik.com/kendo-jquery-ui/documentation/controls/grid/overview)
- [Reorderable Rows in Kendo UI Grid](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/reorderable.rows)
