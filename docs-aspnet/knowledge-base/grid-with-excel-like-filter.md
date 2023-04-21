---
title: Implement Excel-Like Filter Menus
page_title: AutoComplete for Current Filter
description: "Learn how to filter the Telerik UI Grid for {{ site.framework }} by using AutoComplete and by showing results from the current Grid filter."
slug: grid-with-excel-like-filter
tags: grid, similar, excel, filter, menus, using, autocomplete, showing, results, current, filtering
component: grid
type: how-to
res_type: kb
ticked-id: 1544703
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Telerik {{ site.product_short }} Grid</td>
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

How can I filter the Kendo UI Grid {{ site.framework }} UI by using AutoComplete and by showing results from the current Grid filter?

## Solution

The following example demonstrates how to set the Grid with an **Excel-like** filter that has sorted and unique items.

* Initialize a common DataSource for all the filter menus.

```
    @(Html.Kendo().DataSource<Kendo.Mvc.Examples.Models.ProductViewModel>()
        .Name("dataSourceShared")
        .Ajax(dataSource => dataSource
           .Read(read => read.Action("EditingInline_Read", "Grid"))
           .ServerOperation(false)
        )
    )
```
* Set the commmon DataSource for the columns that will be filtered through the [`Filterable`](https://docs.telerik.com/aspnet-core/api/kendo.mvc.ui.fluent/gridboundcolumnfilterablebuilder#kendomvcuifluentgridboundcolumnfilterablebuilder) configuration method.

```
    .Columns(columns =>
    {
        columns.Bound(p => p.ProductName).Filterable(ftb => ftb.Multi(true).DataSource("dataSourceShared"));
        columns.Bound(p => p.UnitPrice).Filterable(ftb => ftb.Multi(true).DataSource("dataSourceShared")).Width(100);
        columns.Bound(p => p.UnitsInStock).Filterable(ftb => ftb.Multi(true).DataSource("dataSourceShared")).Width(100);
        columns.Bound(p => p.Discontinued).Width(100);
        columns.Command(command => { command.Edit(); command.Destroy(); }).Width(172);
    })
```
* Initialize a function to remove the duplicate data items from the shared dataSource when filtering.

```
    function removeDuplicates(items, field) {
         var getter = function (item) { return item[field] },
             result = [],
             index = 0,
             seen = {};
         while (index < items.length) {
             var item = items[index++],
                 text = getter(item);
             if (text !== undefined && text !== null && !seen.hasOwnProperty(text)) {
                 result.push(item);
                 seen[text] = true;
             }
         }
         return result;
    }
```
* Sort and set unique items in the [`FilterMenuInit`](https://docs.telerik.com/aspnet-core/api/kendo.mvc.ui.fluent/grideventbuilder#filtermenuinitsystemstring) event whilst removing the duplicate data items.

```
    .Events(events => events.FilterMenuInit("onFilterMenuInit"))
    
    function onFilterMenuInit(e) {
        var grid = e.sender;
        e.container.data("kendoPopup").bind("open", function () {
            dataSourceShared.sort({ field: e.field, dir: "asc" }); //sort the fields
            var uniqueDsResult = removeDuplicates(grid.dataSource.view(), e.field); //get the unique results only
            dataSourceShared.data(uniqueDsResult); //set the unique result in the shared dataSource for the filter menus
        })
    }
```
* Update the data items by subscribing to the [`Change`](https://docs.telerik.com/aspnet-core/api/kendo.mvc.ui.fluent/datasourceeventbuilder#changesystemstring) event of the DataSource.
```
    function onChange(e) {
            dataSourceShared.data(e.items);
    }
```
To observe this behavior, refer to the following [Telerik REPL](https://netcorerepl.telerik.com/wvPmkPvy30Ei9kbn39) and:

1. Filter the **Product Name** column.
2. Open the **Unit Price** column. Note that the values are filtered based on the currently applied filter on the **Product Name** column.
