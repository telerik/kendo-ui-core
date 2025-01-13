---
title: Removing Previously Selected Items in the Grid
description: How can I mark an item as deleted but remove it after the changes are saved in the {{ site.product }} Grid? Find the solution in the Knowledge Base section of the {{ site.product }} documentation.
type: how-to
page_title: Removing Previously Selected Items in the Grid
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

I have a Grid where custom buttons are implemented per row. When a custom button in a row is clicked, the row should be marked as deleted, but the removal should be applied when clicking a custom **Delete** button outside of the Grid.

## Solution

To achieve the desired behavior, use the following approach:

1. Add a custom Command button for every row.
1. Handle the click of the custom button.
1. The button stands for a row, so when clicked, add it to a global scope variable (array).
1. You can add some styles to the clicked row—this allows you to show that this row will be removed.
1. For the removal, add a new custom button outside of the Grid or in its Toolbar.
1. In the [`Click`](https://docs.telerik.com/kendo-ui/api/javascript/ui/button/events/click) event handler of the button from step 5, remove all the rows saved in the global scope variable. You can achieve this with the help of the [`removeRow`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/removerow) method.

The following example represents the steps described above.

```
// In the Grid, add the custom button.
columns.Command(command => command.Custom("DeleteRow").Click("deleteRow")).Width(180);

// The click of a DeleteRow button (and the global scope variable)
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
