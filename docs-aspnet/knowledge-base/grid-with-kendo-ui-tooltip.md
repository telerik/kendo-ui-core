---
title: Show Tooltip for Column Records
page_title: Show Tooltip for Column Records 
description: "An example on how to show a Tooltip for the Telerik UI Grid for {{ site.framework }}."
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