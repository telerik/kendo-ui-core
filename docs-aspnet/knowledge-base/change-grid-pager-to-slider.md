---
title: Changing the Grid Pager to а Slider
page_title: Changing the Pager in the Data Grid to а Slider
description: "Learn how to change the default paging to a slider in the Telerik UI for {{ site.framework }} Grid."
slug: change-grid-pager-to-slider
tags: grid, pager, slider, core, mvc, telerik
component: grid
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
  <td>Created with the 2023.1.117 version</td>
 </tr>
</table>


## Description

How can I change the default pager of the Telerik UI for {{ site.framework }} Grid to a slider?


## Solution

To achieve the desired result:

1. Handle the [`DataBound`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/grideventbuilder#databoundsystemstring) event in order to remove the default pager buttons.
1. To substitute the default pager, create a Kendo UI Slider widget instance in its place.
1. To prevent the Kendo UI Slider from creating numerous times, declare a flag variable.
1. Change the page of the Grid DataSource by handling the [`Change`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/slidereventbuilder#changesystemstring) event of the Slider.

> When you apply this approach, the [`page`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/methods/page) method of the Grid's DataSource will not fire.

```Index.cshtml
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.ProductViewModel>()
        .Name("grid")
        .Columns(columns =>
        {
            columns.Bound(p => p.ProductName);
            columns.Bound(p => p.UnitPrice).Width(100);
            columns.Bound(p => p.UnitsInStock).Width(100);
            columns.Bound(p => p.Discontinued).Width(100);
            columns.Command(command => { command.Edit(); command.Destroy(); }).Width(200);
        })
        .Events(events => events.DataBound("onDataBound"))
        .ToolBar(toolbar => toolbar.Create())
        .Editable(editable => editable.Mode(GridEditMode.InLine))
        .Pageable()
        .Sortable()
        .Scrollable()
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
       var sliderCreated = false; // Flag variable.
    
       function onChange(e){
          var grid = $("#grid").data("kendoGrid"); // Obtain the Grid's reference.
          grid.dataSource.page(e.value); // Change the DataSource's page.
       }

       function onDataBound(e){
        if(!sliderCreated){ // Assert if the Slider is created.
          sliderCreated = true; // Change the flag variable.
          var max = e.sender.dataSource.totalPages(); // Get the total number of pages.


          $(".k-grid-pager").find("a, ul").each(function(i) { // Find the Grid's pager and remove it.
            $(this).remove()
          });

          $(".k-grid-pager").prepend($("<input id='slider' />")); // Create the Slider.
          $("#slider").kendoSlider({
            min: 1,
            max: max,
            tickPlacement: "none",
            change: onChange
          });
        }
      }
    </script>
```

For the complete implementation of the suggested approach, refer to the [Telerik REPL example on changing the Grid pager to a slider](https://netcorerepl.telerik.com/cnOGGPlA21RzEjkG12).

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

* [Client-Side API Reference of the Grid  for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid  for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik REPL: Change the Grid Pager to a Slider](https://netcorerepl.telerik.com/cnOGGPlA21RzEjkG12)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)