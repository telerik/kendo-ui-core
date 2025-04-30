---
title: Delete Multiple Grid Rows at Once
page_title: Delete Multiple Grid Rows at Once
description: "Select and delete multiple rows at once when using {{ site.product }} InCell editable Grid."
previous_url: /helpers/data-management/grid/how-to/editing/edit-batch-mode-mutliselect-delete, /html-helpers/data-management/grid/how-to/editing/edit-batch-mode-mutliselect-delete
slug: howto_deletemultiplerowsatonce_gridaspnetmv
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

How can I delete all selected rows at once in an [InCell editable Grid]({% slug batchediting_grid_aspnetcore %})?

## Solution

The following example demonstrates how to create a custom toolbar command that removes all currently selected rows in the Grid.

1. Create an InCell editable the Grid, define a custom **Delete selection** command in its toolbar, and disable the default delete-confirmation dialog:

    ```HtmlHelper
    @(Html.Kendo().Grid<Telerik.Examples.Mvc.Models.Person>()
        .Name("persons")
        .DataSource(dataSource => dataSource
            .Ajax()
            .Model(model=>model.Id(m=>m.PersonID))
                .Read(read => read.Action("GetPersons", "Home"))
                .Update(up=>up.Action("UpdatePerson", "Home"))
                .Destroy(d => d.Action("DeletePersons", "Home"))
        )
        .Columns(columns =>
        {
            columns.Bound(c => c.PersonID);
            columns.Bound(c => c.Name);
            columns.Bound(c => c.BirthDate).Format("{0: MM/dd/yyyy}");
            columns.Command(command => command.Destroy()).Width(110);
        })
        .ToolBar(toolbar =>
        {
            toolbar.Create();
            toolbar.Save();
            toolbar.Custom().Text("Delete selection")
                .HtmlAttributes(new { onclick = "deleteSelection(event)" });
        })
        .Pageable()
        .Sortable()
        .Selectable(selectable => selectable.Mode(GridSelectionMode.Multiple))
        .Editable(editing => editing.Mode(GridEditMode.InCell).DisplayDeleteConfirmation(false))
    )
    ```

1. Handle the `click` event of the custom toolbar command and add a custom JavaScript logic that removes all currently selected Grid rows:

    ```JS
    function deleteSelection(e) {
        // Prevent refresh.
        e.preventDefault();
        var grid = $("#persons").data("kendoGrid");
        grid.select().each(function () { // Loop through the selected rows.
            grid.removeRow($(this)); // Remove the row.
        });
    }
    ```

To review the complete example, refer to the [project on how to delete all selected rows at once in an InCell editable Grid](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/GridEditingBatchMultiSelectionDelete) in ASP.NET MVC applications.

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
