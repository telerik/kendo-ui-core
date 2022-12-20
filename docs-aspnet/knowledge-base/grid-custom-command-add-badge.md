---
title: Adding a Badge to a Custom Command in the Grid
page_title: Adding a Badge to a Custom Command in the Grid
description: "An example on how to add a badge to a custom command in the {{ site.product }} Grid."
slug: grid-custom-command-add-badge
tags: telerik, grid, custom, command, add, badge
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
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2022.3.1109 version</td>
 </tr>
</table>

## Description

How can I integrate a Badge inside a custom command for a given row in the {{ site.product }} Grid component? The Badge must be based on the row's column value.


## Solution

To achieve the desired scenario:

1. Specify a custom class for the custom command by using the [`.HtmlAttributes()`](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/GridActionColumnBuilder?#htmlattributessystemobject) configuration option.
1. To traverse through each of the rows, handle the [`DataBound`](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/GridEventBuilder?#databoundsystemstring) event of the Grid.
1. Within the handler, obtain the currently traversed row's data item instance by using the client-side [`.dataItem()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/dataitem) method the Grid provides. To get the respective custom command button for the associated row, use the previously specified custom class.
1. Provide a unique id for the badges that you will create.
1. Based on the value of a data item field, append a child element inside the Button. From the Button, initialize a Badge control. 

```Index.cshtml
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.ProductViewModel>()
        .Name("grid")
        .Columns(columns =>
        {
            columns.Bound(p => p.ProductName);
            columns.Bound(p => p.UnitPrice).Width(100);
            columns.Bound(p => p.UnitsInStock).Width(100);
            columns.Bound(p => p.Discontinued).Width(100);
            columns.Command(command => command.Custom(" ").HtmlAttributes(new {@class = "myCommand"}).IconClass("k-icon k-i-comment").  Click("showDetails"));
        })
        .ToolBar(toolbar => toolbar.Create())
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
```
```Script.js
    <script type="text/javascript">
        function onDataBound(e){
            var grid = $("#grid").data("kendoGrid");
            var gridRows = grid.tbody.find("tr");  // Get the present table rows from the Grid.
            gridRows.each(function (e) { // Traverse through each of the Grid rows.
                var rowItem = grid.dataItem($(this)); // Get the current data item instance.
                var id = `badge${rowItem.ProductID}`; // Create a unique id for the badge that will be created.
                var command = $(this).find(".myCommand"); // Obtain a reference of the custom command button for the respective row.
                
                if(rowItem.Discontinued == true){ // Check for a given field's value.
                     $(command).append($(`<span id='${id}'>5</span>`)); // Append a child element.

                     $("#"+id).kendoBadge({ // Initialize the badge widget to the previously appended child while passing the unique id.
                        themeColor: 'primary',
                        position:'edge',
                        size:'small',
                        align: 'top end',
                        rounded: 'full'
                     });
                }
            });
        }
    </script>
```

For the complete implementation of the suggested approach, refer to the [Telerik REPL example on adding a Badge to a custom command in the Grid](https://netcorerepl.telerik.com/cGlQvqvR164D3E7V21).

## See Also

* [Client-Side API Reference of the Grid](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik REPL: Add Badge to a custom command in the Grid](https://netcorerepl.telerik.com/cGlQvqvR164D3E7V21)