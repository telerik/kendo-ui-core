---
title: Access the Detail Grid Programmatically
description: An example on how to access and sort the detail Kendo UI Grid programmatically.
type: how-to
page_title: Access and Sort the Detail Grid Programmatically | Kendo UI Grid
previous_url: /knowledge-base/how-to-sort-the-detail-grid-programmatically
slug: sort-the-detail-grid-programmatically
ticketid: 1116825
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
</table>

## Description

I have a Grid with two pages, 10 rows each. Each master row has a details row (`.k-detail-row`). I want to export the data of the Grid with all the sorters that are applied. For the main columns I get the data by a `json` with `length` set to `20` and the `grid.dataSource.sort()` sorter. Then, I use `kendo.data.Query` to do the sorting. I access the Grid by using `$("\#grid").data("kendoGrid")` but the described approach only works for the main Grid while the data of the inner Grid is still unsorted.

How can I programmatically access the details row in a Grid?

## Solution

To programmatically access a detail Grid and apply sorting to its dataSource, refer to [this Dojo example](http://dojo.telerik.com/iSAKi).
