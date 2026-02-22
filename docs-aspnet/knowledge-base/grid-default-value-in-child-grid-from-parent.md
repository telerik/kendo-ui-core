---
title: Passing Default Date Value from Parent to Child Grid
description: An example on how to assign a default date value from a parent grid to a child Grid when working with {{ site.product }}.
type: how-to
page_title: Setting the Default Date Value in a Hierarchy Grid Child
slug: grid-default-value-in-child-grid-from-parent
tags: aspnet, core, dotnet-core, mvc, kendo, kendo-ui, grid, child, Hierarchy, default, date, value, property, assign, pass
ticketid: 1457037
res_type: kb
components: ["general"]
component: grid, datasource
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Telerik® {{ site.product_short }}</td>
 </tr>
 <tr>
  <td>Product</td>
  <td>DataSource for Progress® Telerik® {{ site.product_short }}</td>
 </tr>
</table>

## Description

I have a hierarchy Grid where I need to set the default value in the child's Grid to values from the parent, but I get an error. The value I need to set is a date. Here is my code:

```Razor
    .Model(model => {
        model.Field(m => m.TestDate).DefaultValue("#= kendo.toString(TestDate,'dd/MM/yyyy') #");
    })
```

When I try to set the default value, I get the following error:

```
    Object of type 'System.String' cannot be converted to type 'System.Nullable'1[System.DateTime]'
```

I also tried with a non-nullable `DateTime` but got the same error except for the `System.Nullable` part. 

## Solution

The behavior you describe is expected because the Razor syntax expects a date type and such is not provided. The detail grids are evaluated on the client so the date cannot be passed via C# as it is not available at the time the child grid is created, it only becomes available once expanded.

I would suggest you use the `Edit()` event handler to find the master grid and master row and set the value to the new model programmatically instead:

```Razor
    .Events(e=>e.Edit("addDefaultDate")).Events(e=>e.Edit("addDefaultDate"))

    function addDefaultDate(e) {
        if (e.model.isNew()) {
            var grid = this;
            var masterRow = grid.element.closest(".k-detail-row").prev();
            var masterGrid = $("#masterGridID").data("kendoGrid");
            var masterDataItem = masterGrid.dataItem(masterRow);
            e.model.set("TestDate" , masterDataItem.TestDate);
        }        
    }
```

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
