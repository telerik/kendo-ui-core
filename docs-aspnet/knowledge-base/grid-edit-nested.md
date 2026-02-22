---
title: Edit Nested Grids
page_title: Edit Nested Grids
description: "Edit nested {{ site.product }} Grids in ASP.NET MVC applications."
previous_url: /helpers/data-management/grid/how-to/editing/edit-nested-grids, /html-helpers/data-management/grid/how-to/editing/edit-nested-grids
slug: howto_editnestedgrids_gridaspnetmvc
component: grid
type: how-to
res_type: kb
components: ["general"]
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

How can I edit a nested Grid using a Popup editor template?

## Solution

You can achieve this requirement using the following implementation:

1. Define the main Grid and specify a column that binds to a `List<TerritoryViewModel>` collection. Also, set a column template to display the records in the collection as an unordered list in each column cell.

    ```HtmlHelper
    <script type="text/kendo" id="territoriesTemplate">
    <ul>
        #for(var i = 0; i< data.length; i++){#
            <li>#:data[i].TerritoryDescription#</li>
        #}#
    </ul>
    </script>

    <script type="text/javascript">
        var territoriesTemplate = kendo.template($("#territoriesTemplate").html(), { useWithBlock: false });
    </script>

    @(Html.Kendo().Grid<EmployeeViewModel>()
    .Name("grid")
    .Columns(columns =>
    {
        columns.Command(comm =>
        {
            comm.Edit();
        });
        ... // Additional columns.
        columns.Bound(e => e.Territories).ClientTemplate("#=territoriesTemplate(Territories)#");
    })
    .Editable(ed=>ed.Mode(GridEditMode.PopUp))
    ... // Additional configuration.
    )
    ```

1. Create a custom Poup editor template, which contains a nested InCell editable Grid. This Grid will be used for editing the **Territories** collection.

    ```Razor EmployeeViewModel.cshtml
    @model EmployeeViewModel

    <div>
        @Html.LabelFor(m => m.FirstName)
        @Html.EditorFor(m => m.FirstName)
    </div>
    <div>
        @Html.LabelFor(m => m.LastName)
        @Html.EditorFor(m => m.LastName)
    </div>
    <div>
        @Html.LabelFor(m => m.Title)
        @Html.EditorFor(m => m.Title)
    </div>
    <div>
        @Html.LabelFor(m => m.HireDate)
        @Html.EditorFor(m => m.HireDate)
    </div>
    <hr />
    @(Html.Kendo().Grid<TerritoryViewModel>()
        .Name("TerritoryGrid")
        .Columns(cols =>
        {
            cols.Bound(b => b.TerritoryID);
            cols.Bound(b => b.TerritoryDescription);
        })
        .Editable(ed=>ed.Mode(GridEditMode.InCell))
        .AutoBind(false)
        .DataSource(ds => ds
            .Ajax()
            .Model(mo => {
                mo.Id(m => m.TerritoryID);
                mo.Field(f => f.TerritoryID).Editable(false);
            })
        )
        .ToClientTemplate()
    )
    ```

1. Handle the `Edit` event of the main Grid that triggers when the Popup editor template opens. Get a reference to the nested Grid and load its data using the underlying **Territories** data collection.

    ```JS
    function onEdit(e) {
        $('#TerritoryGrid').data().kendoGrid.dataSource.data(e.model.Territories);
    }
    ```

1. Handle the `Change` event of the main Grid's DataSource and set the `dirty` flag of the edited data item to `true` when the **Territories** field contains changes.

    ```JS
    function onDsChange(e) {
        if (e.field == 'Territories' && e.items) {
            var model = e.items[0].parent().parent();
            model.dirty = true;
        }
    }
    ```

To review the complete example, refer to the [project on how to edit a nested Grid in ASP.NET MVC applications](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/GridEditingPopUpNestedGrid).

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
