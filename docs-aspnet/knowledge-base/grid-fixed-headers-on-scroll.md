---
title: Create Fixed Headers on Scroll
description: How can create fixed headers on scroll for the Telerik UI Grid.
type: how-to
page_title: Create Fixed Headers on Scroll
slug: grid-fixed-headers-on-scroll
tags: aspnet, mvc, grid, fixed, headers, on, scroll
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Telerik® UI for {{ site.product_short }} </td>
 </tr>
</table>

## Description

How can I create fixed headers on scroll in the Grid for {{ site.product_short }}.

## Solution 

In order to create fixed headers on scroll, apply the following CSS rule :

```style.css
<style>
    #second > table > thead,
    #first > table > thead {
        position: sticky;
        top: 0;
    }
</style>
```
```Index.cshtml
    @(Html.Kendo().Grid<GridFixedHeaders.Models.OrderViewModel>()
        .Name("first")
        .Columns(columns => {
            columns.Bound(p => p.OrderDate);
            columns.Bound(o => o.ShipName).Width(200);
            columns.Bound(p => p.Freight).Width(200);
            columns.Bound(p => p.OrderDate).Format("{0:dd/MM/yyyy}");
        })
        .Pageable(pageable => pageable.ButtonCount(5))
        .Selectable(selectable => selectable
            .Mode(GridSelectionMode.Multiple))
        .PersistSelection(true)
        .Navigatable()
        .DataSource(dataSource => dataSource
            .Ajax()
            .PageSize(20)
            .Model(model => model.Id(p => p.OrderID))
            .Read(read => read.Action("Orders_Read", "Grid"))
        )
    )

    <br />
    <br />

    @(Html.Kendo().Grid<GridFixedHeaders.Models.OrderViewModel>()
        .Name("second")
        .Columns(columns => {
            columns.Bound(p => p.OrderDate);
            columns.Bound(p => p.Freight).Width(200);
            columns.Bound(o => o.ShipName).Width(200);
            columns.Bound(p => p.OrderDate).Format("{0:dd/MM/yyyy}");
        })
        .Pageable(pageable => pageable.ButtonCount(5))
        .Selectable(selectable => selectable
            .Mode(GridSelectionMode.Multiple)
            .Type(GridSelectionType.Cell))
        .Navigatable()
        .DataSource(dataSource => dataSource
            .Ajax()
            .PageSize(20)
            .Read(read => read.Action("Orders_Read", "Grid"))
        )
    )
```