---
title: ForeignKey Column
page_title: ForeignKey Column
description: "Get started with the Telerik UI Grid HtmlHelper for {{ site.framework }} and learn how to set up the ForeignKey column."
slug: foreignkeycolumn_aspnetcore_grid
position: 10
---

# ForeignKey Column

The ForeignKey column functionality of the Telerik UI Grid HtmlHelper for {{ site.framework }} is primarily used for matching the value of a bound property to a desired text field from an external for the grid collection. It follows the convention of the SQL ForeignKey functionality that is used for linking two tables based on a foreign key.

The foreign values for the columns of the grid could be supplied in two ways:

* [Binding to a local collection](#binding-to-a-local-collection)
* [Binding to a remote collection](#binding-to-a-remote-collection)

## Binding to a Local Collection

Binding the column to a local collection of items can be done by passing a valid IEnumerable collection to the ForeignKey column configuration

```
    columns.ForeignKey(p => p.CategoryID, (System.Collections.IEnumerable)ViewData["categories"], "CategoryID", "CategoryName")
            .Title("Category").Width(200);
```

## Binding to a Remote Collection

In order to bind the column to a remote collection of items, supply a URL Action instead of a static collection. It is mandatory to supply the DataValueField and DataTextField options in order to ensure that the column values will be bound to the correct foreign value. 

```
    columns.ForeignKey(p => p.CategoryID, ds=> ds.Read(r => r.Action("Categories", "Grid")), "CategoryID", "CategoryName")
            .Title("Category").Width(200);
```

## See Also

* [Foreign Key Column Local Binding (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/foreignkeycolumn)
* [Foreign Key Column Remote Binding (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/foreignkeycolumnbinding)
* [Server-Side API](/api/grid)
