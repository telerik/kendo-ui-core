---
title: Column Menu
page_title: Column Menu
description: "Get started with the {{ site.product_short }} Grid by Kendo UI and learn how to enable its column menu."
slug: columnmenu_aspnet_grid
position: 6
---

# Column Menu

The Grid provides a built-in option for triggering column operations through a menu.

To enable the column-menu implementation, use the `ColumnMenu(true)` method. As a result, the column headers of the Grid render a column menu which allows the user to sort, filter, or change the visibility of the column. The column menu also detects when a specific column operation is disabled through the column definition and excludes the corresponding UI from its rendering. For a runnable example, refer to the [demo on implementing a column menu in the Grid](https://demos.telerik.com/{{site.platform}}/grid/column-menu).

## Configuration

The `ColumnMenu()` method accepts a `GridColumnMenuSettingsBuilder` that enables grouping of the columns in the menu. The `Sort()` method can be used to sort the columns by passing `asc` or `desc` as a parameter. The columns are not sorted by default, they have the same order as the columns in the grid.

The `Columns()` group method expects a collection of the model properties. The menu will automatically use the title from the grid columns if such is defined.


```
    .ColumnMenu(menu=>
           menu.Columns(columns => {
               columns
               .Sort("asc")
               .Groups(groups =>
               {
                   groups.Add().Title("Order ID").Columns(new List<string> { "OrderID" }); ;
                   groups.Add().Title("Address").Columns(new List<string> { "ShipCountry", "ShipName", "ShipAddress"});
               });
           })
    )
```

## See Also

* [Column Menu by the Grid (Demo)](https://demos.telerik.com/{{site.platform}}/grid/column-menu)
