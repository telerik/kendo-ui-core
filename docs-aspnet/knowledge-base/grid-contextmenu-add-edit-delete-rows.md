---
title: Using Context Menu to Perform Actions on Grid Rows
description: Learn how to Add, Edit, or Remove Rows through the ContextMenu in the {{ site.product }} Grid. Follow the steps in the Knowledge Base section of the {{ site.product }} components.
type: how-to
page_title: Add, Edit, or Remove Rows with the ContextMenu
slug: grid-contextmenu-add-edit-delete-rows
tags: grid, add, edit, delete, contextmenu
ticketid: 1142072
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Grid</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2022.1.412 version</td>
 </tr>
</table>

## Description

How can I use the ContextMenu to Add, Edit, or Remove rows in the Grid?

## Solution

1. Create a {{ site.product }} ContextMenu that will have the `add`, `edit`, and `delete` actions whilst providing handlers.
1. Set the [`Filter`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/contextmenubuilder#filtersystemstring) of the contextmenu to the table data element (`td`).
1. Store the currently selected row through the [`DataBound`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/grideventbuilder#databoundsystemstring) event of the Grid.
1. Invoke the appropriate [client-side Grid methods](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid#methods) within the item handlers of the ContextMenu.

```Index.cshtml
// Grid
@(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.ProductViewModel>()
    .Name("grid")
    .Columns(columns =>
    {
        columns.Bound(p => p.ProductName);
        columns.Bound(p => p.UnitPrice).Width(100);
        columns.Bound(p => p.UnitsInStock).Width(100);
        columns.Bound(p => p.Discontinued).Width(100);
        columns.Command(command =>
        {
            command.Edit();
            command.Destroy();
        });
    })
    .Editable(editable => editable.Mode(GridEditMode.InLine))
    .Pageable()
    .Sortable()
    .Scrollable()
    .Events(e => e.DataBound("onDataBound"))
    .HtmlAttributes(new { style = "height:430px;" })
    .DataSource(dataSource => dataSource
        .Ajax()
        .PageSize(20)
        .Model(model => model.Id(p => p.ProductID))
        .Create(update => update.Action("EditingInline_Create", "Grid"))
        .Read(read => read.Action("EditingInline_Read", "Grid"))
        .Update(update => update.Action("EditingInline_Update", "Grid"))
        .Destroy(update => update.Action("EditingInline_Destroy", "Grid"))
    )
)
// Context Menu
@(Html.Kendo().ContextMenu()
    .Name("GridMenu")
    .Target("#grid")
    .Filter("td")
    .Orientation(ContextMenuOrientation.Vertical)
    .Animation(ani =>
    {
        ani.Open(op =>
        {
            op.Fade(FadeDirection.In);
            op.Duration(500);
        });
    })
    .Items(item =>
    {
        item.Add().Text("Add Row to Grid").HtmlAttributes(new { @onclick = "addItem();" });
        item.Add().Text("Edit Row to Grid").HtmlAttributes(new { @onclick = "editItem();" });
        item.Add().Text("Delete Row").HtmlAttributes(new { @onclick = "deleteItem();" });
    })
)
```
```Script.js
    <script type="text/javascript">
        var clickedRow; //store the currently clicked row into a flag variable
        
        function onDataBound(e) {
            $("tr").off("contextmenu")
            $("tr").on("contextmenu", function (e) {
                clickedRow = e.currentTarget; //get the currently clicked row
            })
        }
        function addItem(){
            var grid = $("#grid").data("kendoGrid"); //get the reference of the grid
            grid.addRow();
        }
        function editItem() {
            var grid = $("#grid").data("kendoGrid");
            grid.editRow(clickedRow);
        }
        function deleteItem(){
            var grid = $("#grid").data("kendoGrid");
            grid.removeRow(clickedRow);
        }
    </script>
```

For the complete implementation of the suggested approach, refer to the following [Telerik REPL](https://netcorerepl.telerik.com/ccYeQKvJ376K12kZ27) example.

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})

* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)

{% if site.core %}
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-core-ui/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-mvc/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Telerik REPL: Using Context Menu to Perform Actions on Grid Rows](https://netcorerepl.telerik.com/ccYeQKvJ376K12kZ27)
* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
