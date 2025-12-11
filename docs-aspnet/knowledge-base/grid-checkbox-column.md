---
title: Configuring Editable Checkbox Columns in the Grid
description: "Learn how to bind a Boolean field to a checkbox column in the {{ site.product }} Data Grid component."
type: how-to
page_title: Binding and Editing Boolean Checkbox {{ site.product }} Grid Columns
slug: grid-checkbox-column
tags: grid, chechbox, inputs, column, always, editable, dataItem, boolean, row
res_type: kb
components: ["general"]
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Data Grid</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2023.1.117 version</td>
 </tr>
</table>

## Description

In my Data Grid, I have a Boolean field bound to a column. How can I show an always active checkbox input to enable the user to check or uncheck it without triggering the `edit` event of the Grid?

## Solution

To bind a Boolean field of the `Model` to a Grid column with always active checkboxes:

1. Use the [`ClientTemplate`](https://docs.telerik.com/aspnet-core/api/kendo.mvc.ui.fluent/gridboundcolumnbuilder#clienttemplatesystemstring) property of the column to configure a checkbox input that is checked based on the value of the column.
2. Handle the `click` event of the input.
3. In the handler, get the HTML parent row of the clicked input and pass it to the [`dataItem` method](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/dataitem) to access the `dataItem` of the row.
3. Utilize the [`set` method](https://docs.telerik.com/kendo-ui/api/javascript/data/model/methods/set) of the [`kendo.data.Model`](https://docs.telerik.com/kendo-ui/api/javascript/data/model) to programmatically change the value of the `dataItem` Boolean field.

  > If in the `Model` configuration of the DataSource the field is configured to be non-editable, the `set` method won't have effect.

4. To prevent double editing, configure a JavaScript function to disable the editing of the column and pass it at the [`Editable` configuration](https://docs.telerik.com/aspnet-core/api/kendo.mvc.ui.fluent/gridboundcolumnbuilder#editablesystemstring) of the column.


```HtmlHelper
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.DetailProductViewModel>()
    .Name("grid")
    .Columns(columns =>
    {
        columns.Bound(p => p.ProductName);
        columns.Bound(p => p.Discontinued).Title("Discontinued").Width(130)
                            .ClientTemplate("<input id='instock_#=data.ProductID#' type='checkbox' #=Discontinued?'checked':''# onclick='setValue(this)' />").Editable("returnFalse");
    })
    .ToolBar(toolbar =>
    {
        toolbar.Save();
    })
    .Height(700)
    .Editable(editable => editable.Mode(GridEditMode.InCell))
    .DataSource(dataSource => dataSource
        .Ajax()
        .Batch(true)
        .PageSize(20)
        .ServerOperation(false)
        .Events(events => events.Error("error_handler"))
        .Model(model =>
        {
            model.Id(p => p.ProductID);
            model.Field(p => p.ProductID).Editable(false);
            model.Field(p => p.Discontinued);
            model.Field(p => p.TotalSales).Editable(false);

        })
        .Create("DetailProducts_Create", "Grid")
        .Read("DetailProducts_Read", "Grid")
        .Update("DetailProducts_Update", "Grid")
        .Destroy("DetailProducts_Destroy", "Grid")
    )
)
```
```JavaScript
    function setValue(input){
        var grid = $("#grid").data("kendoGrid");
        var dataItem = grid.dataItem($(input).closest("tr"));
        var checked = $(input)[0].checked;
        dataItem.set("Discontinued",checked);
    }
    function returnFalse() {
        return false;
    }
```

To explore the complete behavior, see the Telerik REPL example on how to [display a message upon a server response to the `Update`, `Create`, and `Destroy` requests performed by the Data Grid](https://netcorerepl.telerik.com/QduQkAlP18HPzzFR26).

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
