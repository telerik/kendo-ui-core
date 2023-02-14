---
title: Sort the Grid MultiCheck Filter Items
description: An example on how to sort the MultiCheck filter items in the {{ site.product }} Grid.
type: how-to
page_title: Sort MultiCheck Filter DataSource in the Grid.
slug: grid-sort-multi-check-filter
tags: grid, filter, multi, multi-filter, multi-checkbox, checkbox, not sorted
ticketid: 1579381
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product Version</td>
  <td>2022.3.913</td>
 </tr>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Grid</td>
 </tr>
</table>

## Description

How can I sort the multi-check items in the column filter menu of the {{ site.product }} Grid?

## Solution

1. Specify a [DataSource](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/GridBoundColumnFilterableBuilder#datasourcesystemaction) in the Filterable configuration of the Grid column.
1. Configure the sort option of the DataSource and set the desired order.

```HtmlHelper
  columns.Bound(p => p.Details).Filterable(ftb =>
  {
    ftb.Multi(true);
    ftb.Search(true);
    ftb.CheckAll(true);
    ftb.DataSource(dataSource => dataSource
      .Custom()
      .Transport(t => t.Read("ReadFilterMenuItems", "Grid"))
      .Sort(sort => {
          sort.Add("Details").Descending();
      })
    );
  });
```
```GridController
  public ActionResult ReadFilterMenuItems()
  {
    var result = gridDataCollection.GroupBy(p => p.Details).Select(grp => grp.FirstOrDefault());
    return Json(result);
  }

```

## See Also

* [Filter Checkboxes by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/filter-multi-checkboxes)
* [Server-Side API](/api/grid)