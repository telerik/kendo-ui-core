---
title: Rendering Icons for Boolean Columns in the Grid
description: "Learn how to render icons for a Boolean column in the Telerik UI for {{ site.framework }} Grid."
type: how-to
page_title: Rendering an Icon for a Boolean Column in the Data Grid
slug: grid-render-icons-boolean-column
tags: grid, template, icons, boolean, columns, telerik, core, mvc
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Grid</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2023.1.117 version</td>
 </tr>
</table>


## Description

How can I render icons for a Boolean column in the Telerik UI for {{ site.framework }} Grid?

## Solution

To achieve the desired scenario:

1. Specify a column template for the Boolean column by using the [`ClientTemplate()`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/gridboundcolumnbuilder#clienttemplatesystemstring) configuration method and provide a function handler.
1. Within the handler, replace the default `true` and `false` values by using the conventional [Kendo UI Web Font Icons](https://docs.telerik.com/kendo-ui/styles-and-layout/sass-themes/font-icons).


```Index.cshtml
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.ProductViewModel>()
        .Name("Grid")
        .Columns(columns => {
            columns.Bound(p => p.ProductName);
            columns.Bound(p => p.UnitPrice).Width(140);
            columns.Bound(p => p.UnitsInStock).Width(140);
            columns.Bound(p => p.Discontinued).ClientTemplate("#=discTemplate(data)#").Width(100); // Use the template syntax to invoke the function whilst passing the data object of the current model.
            columns.Command(command => command.Destroy()).Width(150);
        })
        .ToolBar(toolbar => {
            toolbar.Create();
            toolbar.Save();
        })
        .Editable(editable => editable.Mode(GridEditMode.InCell))
        .Pageable()
        .Navigatable()
        .Sortable()
        .Scrollable()
        .DataSource(dataSource => dataSource
            .Ajax()
            .Batch(true)
            .PageSize(20)
            .ServerOperation(false)
            .Model(model => model.Id(p => p.ProductID))
            .Create("Editing_Create", "Grid")
            .Read("Editing_Read", "Grid")
            .Update("Editing_Update", "Grid")
            .Destroy("Editing_Destroy", "Grid")
        )
    )
```
```Script.js
    <script type="text/javascript">
       function discTemplate(data) { // Render an icon based on a ternary operator evaluation.
             return data.Discontinued ? "<span class='k-icon k-i-check'></span>" : "<span class='k-icon k-i-x'></span>"
       }
    </script>
```

For the complete implementation of the suggested approach, refer to the [Telerik REPL example on rendering icons for a Boolean column in the Grid](https://netcorerepl.telerik.com/wHOGOmcP35B0GUWz10).

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

* [Telerik REPL: Rendering Icons for a Boolean Column in the Data Grid](https://netcorerepl.telerik.com/wHOGOmcP35B0GUWz10)
* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
