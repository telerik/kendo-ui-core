---
title: Showing a Tooltip for Column Records
page_title: Showing a Tooltip for Column Records 
description: Learn how to show a Tooltip for the Telerik UI Grid for {{ site.framework }}. Find the solution in the Knowledge Base section of the {{ site.product }} documentation.
slug: grid-with-kendo-ui-tooltip
tags: grid, show, display, tooltip, column, records
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Telerik {{site.product_short}} Grid</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>All</td>
 </tr>
</table>

## Description

How can I show a Tooltip for the Telerik UI Grid for {{ site.framework }}?

## Solution

* Initialize the Tooltip for the Grid.

```
   @(Html.Kendo().Tooltip()
        .For("#grid")
        .Position(TooltipPosition.Right)
        .Width(250)
    )
```
* Specify a selector for elements, which the Tooltip will display within the grid, through the [`Filter`](https://docs.telerik.com/aspnet-core/api/kendo.mvc.ui.fluent/tooltipbuilderbase#filtersystemstring) configuration method.

```
    .Filter("td:nth-child(3), th:nth-child(3)")
```
* Provide a content handler for the Tooltip by using the [`ContentHandler`](https://docs.telerik.com/aspnet-core/api/kendo.mvc.ui.fluent/tooltipbuilderbase#contenthandlersystemstring) configuration method.

```
    .ContentHandler("contentHandler")

    function contentHandler(e) {
        // If the element is the header, return the text of the cell.
        if (e.target.is("th")) {
            return e.target.text();
        }

        var dataItem = $("#grid").data("kendoGrid").dataItem(e.target.closest("tr"));
        var content = dataItem.QuantityPerUnit;
        return content;
    }
```

For more information on how to implement the suggested approach, refer to the following [Telerik REPL](https://netcorerepl.telerik.com/wbFwPSOU598jCogS44) example.

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

* [Telerik REPL: Showing a Tooltip for Column Records](https://netcorerepl.telerik.com/wbFwPSOU598jCogS44)
* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
