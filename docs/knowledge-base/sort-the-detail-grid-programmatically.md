---
title: Access the Detail Grid Programmatically
description: An example on how to access and sort the detail Kendo UI Grid programmatically.
type: how-to
page_title: Access and Sort the Detail Grid Programmatically | Kendo UI Grid
slug: sort-the-detail-grid-programmatically
ticketid: 1116825
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress Kendo UI</td>
 </tr>
</table>

## Description

I access the Grid by using `$("\#grid").data("kendoGrid")` but the approach does not work in my project. I have a grid with two pages, 10 rows each. Each master row has a details row (`.k-detail-row`) below. I want to export the data of the Grid with all the sorters applied. For the main columns it is simple and I can get the data by a `json` with `length` set to `20` and the sorter `grid.dataSource.sort()`, and then use `kendo.data.Query` to do the sorting. However, this only works for the main grid and the data of the inner grid is still unsorted.

How can I access the details row programmatically?

## Solution

[This Dojo example](http://dojo.telerik.com/iSAKi) demonstrates how to programmatically access a detail Grid and apply sorting to its dataSource.
