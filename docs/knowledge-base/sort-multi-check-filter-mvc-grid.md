---
title: Sort MultiCheck Filter
description: An example on how to sort the dataSource of the MultiCheck filter in Kendo UI Grid for ASP.NET for MVC.
type: how-to
page_title: How to Sort MultiCheck Filter DataSource in UI for ASP.NET for MVC Grid
slug: sort-multi-check-filter-mvc-grid
position: 0
tags: grid,ASP.NET MVC,filter, multi, multi-filter, multi-checkbox, checkbox, not sorted
teampulseid:
ticketid: 1116585
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid for ASP.NET MVC</td>
 </tr>
</table>

## Description

How can I sort the values in a multiple select filter in a Grid for ASP.NET MVC. 

## Solution  

If otherwise not provided, the built-in behavior uses the data source of the Grid as is.

To provide a separate, [custom data source](http://docs.telerik.com/aspnet-mvc/getting-started/custom-datasource#initial-setup) which can be sorted in the desired sort order, use the following approach:  

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

* [How to Sort on FilterMenuInit() or FilterMenuOpen() in Grid](http://docs.telerik.com/kendo-ui/controls/data-management/grid/how-to/filtering/sort-multi-checkbox-filter)  
