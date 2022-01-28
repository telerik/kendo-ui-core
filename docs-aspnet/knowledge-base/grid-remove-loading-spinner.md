---
title: Hide the Grid Loading Spinner
description: How can I remove the loading spinner from the Kendo UI Grid? 
type: how-to
page_title: Hide the Grid Loading Spinner
slug: grid-remove-loading-spinner
tags: grid, remove, loading, spinner
res_type: kb
---

## Environment

<table>
	<tbody>
        <tr>
			<td>Product</td>
			<td>Grid for Progress® Telerik® {{ site.product_short }}</td>
		</tr>
	</tbody>
</table>

## Description

How can I remove the loading spinner from the Kendo UI Grid?

## Solution

1. Configure handler for the [RequestStart](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/events/requeststart) event.
2. Use a jQuery selector to get the div with the **k-loading-image** class.
3. Use the [hide](https://api.jquery.com/hide/) jQuery method.

Example: 

```Index.cshtml
@(Html.Kendo().Grid<GridRemoveLoading.Models.OrderViewModel>()
    .Name("grid")
    .Columns(columns =>
    {
        columns.Bound(p => p.OrderID).Filterable(false);
        columns.Bound(p => p.Freight);
        columns.Bound(p => p.OrderDate).Format("{0:MM/dd/yyyy}");
        columns.Bound(p => p.ShipName);
        columns.Bound(p => p.ShipCity);
    })
    .Pageable()
    .Sortable()
    .Scrollable()
    .Filterable()
    .HtmlAttributes(new { style = "height:550px;" })
    .DataSource(dataSource => dataSource
        .Ajax()
        .Events(ev=>ev.RequestStart("onRequestStart"))
        .PageSize(20)
        .Read(read => read.Action("Orders_Read", "Grid"))
    )
)
```
```script.js
   function onRequestStart(e) {
        setTimeout(function (e) {
            $(".k-loading-image").hide();
        })
    }
```