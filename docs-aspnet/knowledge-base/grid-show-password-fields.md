---
title: Showing Password fields in the Grid
page_title: Showing Password fields in the Grid
description: "Learn how to show textual password content when working with the Telerik UI for {{ site.framework }} Grid."
slug: grid-show-password-fields
tags: grid, all, password, field, symbols, core, mvc, telerik
component: grid
res_type: kb
---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Progress {{ site.product }} Grid</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2023.2.718 version</td>
 </tr>
</table>


## Description

How can I show textual password fields in a safe manner in the boundaries of a {{ site.product }} Grid?

## Solution

To achieve the desired scenario:

1. Create a common function that will be responsible for altering each of the characters for the required field.
1. Utilize the [`Columns.Bound.ClientTemplate()`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/gridboundcolumnbuilder#clienttemplatesystemstring) configuration method of the Grid and utilize the conventional hash Syntax that is accustomed for the [`Kendo Templating`](https://docs.telerik.com/kendo-ui/framework/templates/overview) mechanism.

```Index.cshtml
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.EmployeeViewModel>()
            .Name("grid")
            .Columns(columns =>
            {
                columns.Bound(e => e.FirstName).Width(110);
                columns.Bound(e => e.LastName).Width(110);
                columns.Bound(e => e.Country).Title("Password").ClientTemplate("#=replaceString(Country)#").Width(110);
                columns.Bound(e => e.City).Width(110);
                columns.Bound(e => e.Title);

            })
            .Sortable()
            .Pageable()
            .DataSource(dataSource => dataSource
                .Ajax()
                .PageSize(5)
                .Read(read => read.Action("HierarchyBinding_Employees", "Grid"))
            )
    )
```
```Script.js
    <script>
        function replaceString(value){
            value = value.split('').map(function(character){
                return '*';
            }).toString().replace(/,/g , '');

            return value;
        }
    </script>
```


For the complete implementation of the suggested approach, refer to the [Telerik REPL example on showing all password fields in the Grid](https://netcorerepl.telerik.com/QHkBwbFx28JNZxtL00).

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

* [Client-Side API Reference of the Grid  for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid  for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik REPL: Show Password fields in the Grid](https://netcorerepl.telerik.com/QHkBwbFx28JNZxtL00)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)