---
title: Grid Toggle Editable Mode On And Off
description: An example demonstrating how to toggle the editable mode of the Kendo UI Grid for ASP.NET Core using a ToolBar button
type: how-to
page_title: Toggle Grid's editable mode | Kendo UI Grid for ASP.NET Core
slug: grid-toggle-editable-mode
tags: aspnet, core, kendo, kendo-ui, grid, edit, toggle, editable
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Telerik® UI for ASP.NET Core</td>
 </tr>
</table>

## Description

How can I toggle the editable mode of the Grid using a button in the ToolBar?

## Solution

The Kendo UI Grid's options can be modified through the [`setOptions`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/setoptions) method.

1. Create a custom button in the grid's toolbar.
1. Inside the grid's `dataBound` event obtain a reference to the button.
1. Use the `setOptions` method to set the editable mode of the grid when the button is clicked.
1. Change the text of the button to reflect the current state of the grid.
1. (Optional) If the grid has a command column, disable all of the commands when editable is false.

```
.Columns(columns =>
    {
        columns.Bound(c => c.Id);
        columns.Bound(c => c.Property);
        columns.Command(c => c.Edit());
    })
.Editable(editable => editable.Mode(GridEditMode.InLine))
.Events(events => events.DataBound("dataBound"))
.ToolBar(t =>
{
    t.Custom().Name("toggleEditable").Text("Toggle Readonly");
})

<script>
    function dataBound(ev) {
        let grid = this,
            commands = grid.content.find(".k-command-cell").children("a"),
            editable = grid.options.editable,
            toggleButton = $(".k-grid-toggleEditable");

        toggleButton.click(function (e) {
            e.preventDefault();

            if (editable) {
                // Disable edit mode if the grid is currently editable.
                grid.setOptions({ editable: false });
            } else {
                // Enable editing. Available options: inline, incell, popup. 
                grid.setOptions({ editable: "inline" });
            }
        });

        // Change the text of the button depending on the grid state.
        editable ? toggleButton.text("Toggle Readonly") : toggleButton.text("Toggle Editable");
        // If the grid is not editable disable the column commands.
        commands && !editable ? commands.addClass("k-state-disabled") : commands.removeClass("k-state-disabled");
    }
</script>
```

## See Also

* [API Reference of the Grid](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)