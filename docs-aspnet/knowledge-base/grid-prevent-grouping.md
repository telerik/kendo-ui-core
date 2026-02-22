---
title: Preventing the User from Removing the Initial Groups, Changing their Order, or Adding New Groups
description: An example on how to prevent the user from removing the initial groups, changing their order, or adding new groups of the Telerik UI for {{ site.framework }} Grid.
type: how-to
page_title: Preventing the User from Removing the Initial Grid Groups, Changing their Order, or Adding New Groups
slug: grid-prevent-grouping
tags: grid, prevent, initial, groups, order, remove, telerik, core, mvc
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
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2023.3.1010 version</td>
 </tr>
</table>

## Description

How can I prevent the user from moving the initially added groups of the Grid, changing their order, or adding new groups?

## Solution

1. Create a Grid with initial groups.
1. Handle the [`Group`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/grideventbuilder#groupsystemstring) event of the Grid.
1. Within the `Group` event handler, get the current Grid groups by using the [`group()`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/methods/group) method of the DataSource.
1. Check if the number of initial groups matches the number of current groups and if the first initial group matches the current first group and prevent the default event action if this condition is not met.

    ```HtmlHelper
        @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.ProductViewModel>()
            .Name("grid")
            .Groupable()
            .Events(ev => ev.Group("onGroup"))
            .DataSource(dataSource => dataSource
                .Ajax()
                .Group(groups => 
                {
                    groups.Add(p => p.UnitsInStock);
                    groups.Add(p => p.UnitsOnOrder);
                })
                ...
            )
            ...
        )
    ```
    {% if site.core %}
    ```TagHelper
        @addTagHelper *, Kendo.Mvc

        <kendo-grid name="grid" on-group="onGroup">
            <datasource type="DataSourceTagHelperType.Ajax">
                <groups>
                    <group field="UnitsInStock"></group>
                    <group field="UnitsOnOrder"></group>
                </groups>
                <!-- Other configuration -->
            </datasource>
            <groupable enabled="true" />
            <!-- Other configuration -->
        </kendo-grid>
    ```
    {% endif %}
    ```JS script
        <script>
            function onGroup(e) {
                var currentGroups = e.sender.dataSource.group(); // Get the current groups.
                if(currentGroups.length > 0) {
                    if((currentGroups.length != e.groups.length) || (currentGroups[0].field != e.groups[0].field)) { 
                        // Prevent the Group event.
                        e.preventDefault();
                    }
                }
            }
        </script>
    ```

{% if site.core %}
For a runnable example based on the code above, refer to the following REPL samples:

* [Sample code with the Grid HtmlHelper](https://netcorerepl.telerik.com/wRlkcZkj4397B7E313)
* [Sample code with the Grid TagHelper](https://netcorerepl.telerik.com/GnPkwDYX46fijaD254)
{% else %}
For a runnable example based on the code above, refer to the [REPL example on preventing the user from removing or rendering the initial Grid groups or adding new groups](https://netcorerepl.telerik.com/wRlkcZkj4397B7E313).
{% endif %}

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
{% if site.core %}
* [Server-Side TagHelper API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/taghelpers/grid)
{% endif %}
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)

