---
title: Toggle Grid Editable Mode On And Off
description: An example demonstrating how to toggle the editable mode of the {{ site.product }} Grid by using a ToolBar button.
type: how-to
page_title: Toggle the Editable Mode of the Grid
slug: grid-toggle-editable-mode
tags: aspnet, core, kendo, kendo-ui, grid, edit, toggle, editable
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Grid</td>
 </tr>
</table>

## Description

How can I toggle the editable mode of the Grid by using a button in the ToolBar of the  {{ site.product }} Grid?

## Solution

The {{ site.product }} Grid options can be modified through the [`setOptions`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/setoptions) method.

1. Create a custom button in the Grid's toolbar.
1. Inside the Grid's `dataBound` event, obtain a reference to the button.
1. Use the `setOptions` method to set the editable mode of the Grid when the button is clicked.
1. Change the text of the button to reflect the current state of the Grid.
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
        commands && !editable ? commands.addClass("k-disabled") : commands.removeClass("k-disabled");
    }
</script>
```

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})

* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)

{% if site.core %}
* [{{ site.framework }} DataGrid Product Page](https://www.telerik.com/aspnet-core-ui/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-mvc/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
