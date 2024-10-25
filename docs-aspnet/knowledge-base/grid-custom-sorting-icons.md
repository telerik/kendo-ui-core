---
title: Customizing the Grid Column Sorting Icons
description: An example on how to change the default column sorting icons when using the Telerik UI for {{ site.framework }} Grid.
type: how-to
page_title: Customizing the Grid Column Sorting Icons
slug: grid-custom-sorting-icons
tags: grid, sorting, icons, columns, header, template
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
  <td>Created with the 2023.3.1010 version</td>
 </tr>
</table>

## Description
How can I change the default sorting icons of the Grid columns?

## Solution
To set custom ascending and descending sorting icons when a specified Grid column is sorted and display a double arrow icon when the column is not sorted, follow these steps:

1. Add the following CSS style to hide the default sorting icons:
```css
#grid .k-grid-header .k-cell-inner .k-link .k-sort-icon {
    display: none;
}
```

2. Handle the `DataBound` event of the Grid that triggers each time a specified column is sorted (the sorting data operation is performed on the server (`ServerOperation(true)`).
```HtmlHelper
@(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
    .Name("grid")
    .Sortable(sortable => sortable
        .AllowUnsort(true)
        .SortMode(GridSortMode.Mixed)
        .ShowIndexes(true))
    .Events(ev => ev.DataBound("onDataBound"))
    // other grid configuration
)
```
{% if site.core %}
```TagHelper
  @addTagHelper *, Kendo.Mvc

    <kendo-grid name="grid" on-data-bound="onDataBound">
            <sortable enabled="true" allow-unsort="true" mode="mixed" show-indexes="true" />
            <!-- Other configuration -->
    </kendo-grid>
 ```
{% endif %}

3. Within the `DataBound` event handler, define the desired SVG icons as explained in the [SVG Icons section in the documentation](https://docs.telerik.com/{{ site.platform }}/styles-and-layout/sass-themes/svg-icons#setting-svg-icons-from-client). Then, access the currently sorted fields through the [`sort()`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/methods/sort) method of the DataSource and append the respective icon (ascending or descending).

```javascript
<script>
function onDataBound(e) {
    let grid = this;
    let sorts = grid.dataSource.sort(); // Get the currently sorted fields.

    var nonSortableIcon = kendo.ui.icon({ icon: 'caret-alt-expand', type: 'svg' }); // Specify the desired SVG icon for the non-sorted columns.
    var descSortIcon = kendo.ui.icon({ icon: 'caret-alt-down', type: 'svg' }); // Specify the desired SVG icon for descending order.
    var ascSortIcon = kendo.ui.icon({ icon: 'caret-alt-up', type: 'svg' }); // Specify the desired SVG icon for ascending order.

    if(sorts == undefined) { // Check if the Grid is sorted initially.
        grid.thead.find("th .k-cell-inner .k-link").each(function(){  // Loop through the Grid column headers.
            $(this).append(nonSortableIcon); // Add the "nonSortableIcon " icon on all column headers.
        });
    } else {
        // Reset the sort icons.
        grid.thead.find("th .k-cell-inner .k-link").each(function(){ 
            if($(this).find("span.k-svg-i-caret-alt-expand").length == 0) {
                $(this).find("span.k-icon").remove(); // Remove the "descSortIcon"/"ascSortIcon" icon.
                $(this).append(nonSortableIcon); // Add the default icon.
            }
        });

        $.each(sorts, function(i,value) { // Loop through the sorted fields.
            let colHeader = grid.thead.find(`th[data-field='${value.field}']`); // Get the column header of the sorted column.
            if(colHeader) {
                colHeader.find(".k-link span.k-icon").remove(); // Remove the default icon.
                if(value.dir == "asc") {
                    colHeader.find(".k-link").append(ascSortIcon); //Append the custom "ascSortIcon".
                }
                if(value.dir == "desc") {
                    colHeader.find(".k-link").append(descSortIcon); //Append the custom "descSortIcon".
                }
            }
        });
    }
}
</script>
```
{% if site.core %}
For a runnable example based on the code above, refer to the following REPL samples:

* [Sample code with the Grid HtmlHelper](https://netcorerepl.telerik.com/cyYvlVFq13LOju7R01)
* [Sample code with the Grid TagHelper](https://netcorerepl.telerik.com/QSaPFLPq2056hwO401)
{% else %}
For a runnable example based on the code above, refer to the [REPL example on customizing the default sorting icons of the Grid columns](https://netcorerepl.telerik.com/cyYvlVFq13LOju7R01).
{% endif %}

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

* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
{% if site.core %}
* [Server-Side TagHelper API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/taghelpers/grid)
{% endif %}
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
