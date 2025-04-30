---
title: Edit Grids with Checkboxes in Batch Edit Mode
page_title: Edit Grids with Checkboxes in Batch Edit Mode
description: "Create a template column with a checkbox that updates the underlying model when its state is changed in a {{ site.product }} Grid in ASP.NET MVC applications."
previous_url: /helpers/data-management/grid/how-to/editing/checkboxes-batch-editing, /html-helpers/data-management/grid/how-to/editing/checkboxes-batch-editing
slug: howto_docheckboxesbatchediting_gridaspnetmvc
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

How can I edit boolean fields using checkboxes in batch editable Grids?

## Solution

You can achieve this requirement using the following implementation:

1. Define a template column that contains a checkbox element and set its `checked` attribute based on the value of the **IsAdmin** field:

    ```Razor
    @(Html.Kendo().Grid<Person>()
        .Name("persons")
        .Columns(columns =>
        {
            columns.Template(@<text></text>)
            .ClientTemplate("<input type='checkbox' #= IsAdmin ? checked='checked':'' # class='chkbx' />")
            .HeaderTemplate("<input type='checkbox' id='masterCheckBox' onclick='checkAll(this)'/>")
            .Width(200);
        })
        .Editable(ed => ed.Mode(GridEditMode.InCell))
        .ToolBar(tb => tb.Save())
        ... // Additional configuration.
    )
    ```

1. Handle the `click` event of the checkboxes and update the **IsAdmin** field based on the respective checkbox state:

    ```JS
        $(function () {
            $('#persons').on('click', '.chkbx', function () {
                var checked = $(this).is(':checked');
                var grid = $('#persons').data().kendoGrid;
                var dataItem = grid.dataItem($(this).closest('tr'));
                dataItem.set('IsAdmin', checked);
            });
        });

        function checkAll(ele) {
            var state = $(ele).is(':checked');
            var grid = $('#persons').data().kendoGrid;
            $.each(grid.dataSource.view(), function () {
                if (this['IsAdmin'] != state)
                    this.dirty = true;
                this['IsAdmin'] = state;
            });
            grid.refresh();
        }
    ```

To review the complete example, refer to the [project on how to create a template Grid column with a checkbox that updates the underlying model when its state is changed](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/GridEditingBatchWithCheckboxes).

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
