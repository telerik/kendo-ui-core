---
title: Persist the State of the Grid Automatically
description: Learn how to persist the state of the {{ site.product }} Grid on page close.
type: how-to
page_title: Persist State Automatically - {{ site.product }} Data Grid
slug: grid-automatically-persist-state
tags: grid, state, persisting, persist, automatic, leave, page, save, restore, changes, options, keep, recreate, retain, load
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® {{ site.product }} Grid</td> 
 </tr>
</table>


## Description

How can I automatically persist the sort, filter, and group Grid options when the user leaves the page and keep the look of the Grid the same as the user closed the tab?

## Solution

The state of the Grid is persisted in the [`beforeunload`](https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onbeforeunload) event handler. This way, any operation which the user performs before leaving the page is persisted. To restore the Grid state, use the [`document.ready`](https://learn.jquery.com/using-jquery-core/document-ready/) event.

```View
@(Html.Kendo().Grid<TelerikMvcApp9.Models.OrderViewModel>()
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
            .Groupable()
            .HtmlAttributes(new { style = "height:550px;" })
            .DataSource(dataSource => dataSource
                .Ajax()
                .PageSize(20)
                .Read(read => read.Action("Orders_Read", "Grid"))
            )
        )
```
```JavaScript
<script>
$(document).ready(function () {
    var options = localStorage["grid-options"];

    var grid = $("#grid").data("kendoGrid");

    if (options) {
        grid.setOptions(JSON.parse(options));
    }

    window.onbeforeunload = function() {
        localStorage["grid-options"] = kendo.stringify(grid.getOptions());

        return;
    }
});
</script>
```
