---
title: Prevent Sorting with Checkbox in Header
description: An example on how to implement a sortable column with a checkbox in the {{ site.product }} Grid header.
type: how-to
page_title: Implement Sortable Columns with Checkboxes in the Headers {{ site.product }} Grid
slug: grid-sort-column-checkbox-header
tags: grid, sort, header, checkbox, template, prevent, enable
ticketid: 1579856
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress {{ site.product }} Grid</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2022.3.913 version</td>
 </tr>
</table>


## Description

My Grid has a header template, which contains a checkbox, for a column. When I click the checkbox, the column gets sorted.

How can I prevent the sorting of the column which uses a header template and has a checkbox in its header of a {{ site.product }} Grid?

## Solution

{% if site.core %}
1. To integrate a checkbox within a Grid column's header, use the [`.ClientHeaderTemplate()`](https://docs.telerik.com/aspnet-core/api/kendo.mvc.ui.fluent/gridboundcolumnbuilder#clientheadertemplatesystemstring) configuration option.
{% else %}
1. To integrate a checkbox within a Grid column's header, use the [`.ClientHeaderColumnTemplate()`](https://docs.telerik.com/aspnet-mvc/api/kendo.mvc.ui.fluent/gridboundcolumnbuilder#groupheadercolumntemplatesystemaction) configuration option.
{% endif %}
1. To allow the selection and deselection of the checkbox only, handle the `click` event of the checkboxes.
1. To prevent the sorting of the column upon clicking a checkbox, use the conventional [`.stopPropagation()`](https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation) method for the event object.

```Index.cshtml
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.ProductViewModel>()
        .Name("grid")
        .Columns(columns =>
        {
                columns.Bound(p => p.ProductName).Width(70);
                columns.Bound(p => p.UnitPrice).Width(70);
                columns.Bound(p => p.UnitsInStock).Width(70);
                columns.Bound(p => p.Discontinued).Width(200).ClientHeaderTemplate("<input type='checkbox' onclick='onClick();'><span>&nbsp; Discontinued</span>").Width(170);
                columns.Command(command => { command.Edit(); command.Destroy(); }).Width(70);
        })
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
        function onClick(){
            event.stopPropagation();
            // Add custom logic.
        }
    </script>
```

For the complete implementation of the suggested approach, refer to this [Telerik REPL Example](https://netcorerepl.telerik.com/wmaDmAvR194a6niJ25).

* [DataSource Sort API](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/ajaxdatasourcebuilder#sortsystemaction)


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

* [Telerik REPL: Prevent Sorting with CheckBox in Header](https://netcorerepl.telerik.com/wmaDmAvR194a6niJ25)
* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
