---
title: Capturing Row Hover Event оf Grid Row and Getting Data Item
description: Learn how to handle the "mouseenter" event of the row element and access the current data item when using {{ site.product }} Grid.
type: how-to
page_title: Handle Row Hover Event and Access Data Item in Grid
slug: grid-hover-row-get-dataitem
tags: grid, hover, event, datagrid, row-hover, databound, mouseenter, dataitem, core, mvc
res_type: kb
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Grid for ASP.NET {{ site.framework}}</td>
</tr>
<tr>
<td>Version</td>
<td>2024.2.514</td>
</tr>
</tbody>
</table>

## Description

How to capture the hover event of a row in the Grid and access the corresponding data item object? 

## Solution

To achieve row hover functionality and retrieve column object values, follow these steps:

1. Subscribe to the [`DataBound`](/api/kendo.mvc.ui.fluent/grideventbuilder#databoundsystemstring) event of the Grid.
2. Within the event handler, bind the jQuery [`mouseenter`](https://api.jquery.com/mouseenter/) event to the table rows.
3. Use the [`dataItem()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/dataitem) client-side method of the Grid to get the data item associated with the hovered row.

{% if site.core %}
```TagHelper
    <kendo-grid name="grid" on-data-bound="onDataBound">
      <!-- Additional configuration. -->
    </kendo-grid>
```
{% endif %}

```HtmlHelper
    .Events(e => e.DataBound("onDataBound"))
```

```JavaScript
    
    // Define the DataBound event handler:
    function onDataBound() {
        var grid = this; // Reference to the Grid instance.
    
        // Bind "mouseenter" event to table rows.
        $(".k-master-row").on("mouseenter", function() {
            var currentRow = this; // Access the hovered row element.
            var dataItem = grid.dataItem(currentRow); // Get the data item of the row.
    
            // Log the data item object in the browser console or perform the desired action.
            console.log(dataItem);
        });
    }
```

### REPL Example
{% if site.core %}
For a runnable example based on the code above, refer to the following REPL samples:
* [Sample code with the Grid HtmlHelper](https://netcorerepl.telerik.com/wzOTmxOf4452tsp840)
* [Sample code with the Grid TagHelper](https://netcorerepl.telerik.com/mpYpmsFd29MHNCUn29)
{% else %}
You can test this example using the following REPL sample: [Row Hover Event Example](https://netcorerepl.telerik.com/wzOTmxOf4452tsp840).
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
* [Server-Side API Reference of the Grid for {{ site.framework }}](/api/grid)
{% if site.core %}* [Server-Side TagHelper API Reference of the Grid for {{ site.framework }}](/api/taghelpers/grid) {% endif %}
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
