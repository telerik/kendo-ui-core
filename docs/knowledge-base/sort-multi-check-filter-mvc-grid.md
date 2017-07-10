---
title: Multi-select filter not sorting
description: how to sort multicheck filter data source
type: how-to
page_title: How to Sort MultiCheck Filter DataSource in UI for ASP.NET for MVC Grid
slug:sort-multi-check-filter-mvc-grid
position: 0
tags:grid,ASP.NET MVC,filter, multi, multi-filter, multi-checkbox, checkbox, not sorted
teampulseid:
ticketid: 1116585
pitsid:

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for ASP.NET MVC</td>
 </tr>
</table>

 
## Description
I need to sort the values in a multiple select filter for MVC Grid. 

## Solution  
The built-in behaviour uses the Kendo UI Grid data source as is if one is not provided. There is an option to provide a separate [custom data source](http://docs.telerik.com/aspnet-mvc/getting-started/custom-datasource#initial-setup) which can be sorted in the desired sort order. The custom multi-check filter for Grid for UI for ASP.NET MVC should resemble the below configuration:  
  

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

## Suggested Workarounds

[Sort on FilterMenuInit()/FilterMenuOpen()](http://docs.telerik.com/kendo-ui/controls/data-management/grid/how-to/filtering/sort-multi-checkbox-filter)  
