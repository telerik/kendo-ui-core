---
title: Edit Hierarchical Grids with Checkboxes
page_title: Edit Hierarchical Grids with Checkboxes
description: "Edit a hierarchical {{ site.product }} Grid with checkboxes in ASP.NET MVC applications."
previous_url: /helpers/data-management/grid/how-to/editing/edit-hierarchical-grids-with-checkboxes,  /html-helpers/data-management/grid/how-to/editing/edit-hierarchical-grids-with-checkboxes
slug: howto_edithierarchicalwithchecboxes_gridaspnetmvc
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Grid</td>
 </tr>
 <tr>
  <td>Product version</td>
  <td>2025.1.227</td>
 </tr>
</table>

## Description

How can I edit boolean fields using checkboxes in hierarchical Grids?

## Solution

You can achieve this requirement using the following implementation:

1. Define a template column in the detail Grid that contains a checkbox element and set its `checked` attribute based on the value of the **IsCompleted** field:

    ```HtmlHelper
    columns.Template(t => { })
    .ClientTemplate("<input type='checkbox' \\#= IsCompleted ? checked='checked':'' \\# class='chkbx' />")
    .HeaderTemplate("<input type='checkbox' id='masterCheckBox' onclick='checkAll(this)'/>").Width(200);
    ```

1. Handle the `click` event of the checkboxes and update the **IsCompleted** field based on the respective checkbox state:

    ```JS
    $(function () {
        $('\\#Orders_#=EmployeeID#').on('click', '.chkbx', function () {
            var checked = $(this).is(':checked');
            var grid = $('\\#Orders_#=EmployeeID#').data().kendoGrid;
            var dataItem = grid.dataItem($(this).closest('tr'));
            dataItem.set('IsCompleted', checked);
        });
    });

    function checkAll(ele) {
        var state = $(ele).is(':checked');
        var grid = $('\\#Orders_#=EmployeeID#').data().kendoGrid;
        $.each(grid.dataSource.view(), function () {
            if (this['IsCompleted'] != state)
                this.dirty=true;
            this['IsCompleted'] = state;
        });
        grid.refresh();
    }
    ```

To review the complete example, refer to the [project on how to create a template column with a checkbox that updates the underlying model when its state is changed in a hierarchical Grid](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/GridHierarchyEditingWithCheckboxes).

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})
* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-mvc/grid)
* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})
* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)

## See Also

* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
