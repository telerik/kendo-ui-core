---
title: Sort MultiCheck Filter
description: An example on how to sort the dataSource of the MultiCheck filter in a Kendo UI Grid for MVC.
type: how-to
page_title: Sort MultiCheck Filter DataSource in Kenod UI Grid for ASP.NET MVC | Kendo UI Grid for ASP.NET MVC
slug: sort-multi-check-filter-mvc-grid
tags: grid, ASP.NET MVC, filter, multi, multi-filter, multi-checkbox, checkbox, not sorted
ticketid: 1116585
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid for ASP.NET MVC</td>
 </tr>
</table>

## Description

How can I sort the values in a multiple select filter in a Kendo UI Grid for MVC? 

## Suggested Workarounds

By default, the data source of the Grid is used as is. However, you can still work around this issue.

Provide a separate, [custom data source](https://docs.telerik.com/aspnet-mvc/getting-started/custom-datasource#initial-setup) which can be sorted in the desired sort order.

```
columns.Bound(p => p.Details).Filterable(ftb =>
{
  ftb.Multi(true);
  ftb.Search(true);
  ftb.DataSource(dataSource => dataSource
    .Custom()
    .Transport(t => t.Read("ReadGridItems", "Grid"))
    .Schema(schema => schema
    .Data("Data"))
    .Sort(sort => {
        sort.Add("Details").Descending();
    })
  );
});
```

## See Also

* [Sort FilterMenuInit() or FilterMenuOpen() in Grid](https://docs.telerik.com/kendo-ui/controls/data-management/grid/how-to/filtering/sort-multi-checkbox-filter)  
