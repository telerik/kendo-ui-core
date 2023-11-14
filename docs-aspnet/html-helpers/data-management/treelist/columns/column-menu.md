---
title: Column Menu
page_title: Column Menu
description: "Get started with the Telerik UI TreeList component for {{ site.framework }} and get to know how to enable the column menu."
slug: htmlhelpers_treelist_aspnetcore_column_menu
position: 2
---

# Column Menu

The TreeList provides a built-in option for triggering column operations through a menu.

To enable the column-menu implementation, set `.ColumnMenu()`. As a result, the column headers of the TreeList will render a column menu which allows the user to sort, filter, or change the visibility of the column. The column menu also detects when a specific column operation is disabled through the column definition and excludes the corresponding UI from its rendering.

> When the `ColumnMenu` configuration is enabled, the TreeList fires the client-side [`columnMenuInit`](/api/javascript/ui/treelist/events/columnmenuinit) and [`columnMenuOpen`](/api/javascript/ui/treelist/events/columnmenuopen) events instead of [`filterMenuInit`](/api/javascript/ui/treelist/events/filtermenuinit) and [`filterMenuOpen`](/api/javascript/ui/treelist/events/filtermenuopen).

```HtmlHelper
    @(Html.Kendo().TreeList<Kendo.Mvc.Examples.Models.TreeList.EmployeeDirectoryModel>()
        .Name("treelist")
        .ColumnMenu()
        /* Other configuration. */
    )
```
{% if site.core %}
```TagHelper
    <kendo-treelist name="treelist">
        <column-menu enabled="true"/>
        <!-- Other configuration. -->
    </kendo-treelist>
```
{% endif %}

For a runnable example, refer to the [demo on implementing a column menu in the TreeList](https://demos.telerik.com/{{ site.platform }}/treelist/column-menu).

## Column Reordering

As of {{site.product}} UI R2 SP1 2023, the TreeList's Column Menu provides an option to change the position of the target column by using **Move next** and **Move previous** buttons. Make sure the reordering functionality is also enabled:

```HtmlHelper
    @(Html.Kendo().TreeList<Kendo.Mvc.Examples.Models.TreeList.EmployeeDirectoryModel>()
        .Name("treelist")
        .ColumnMenu()
        .Reorderable()
        /* Other configuration. */
    )
```
{% if site.core %}
```TagHelper
    <kendo-treelist name="treelist">
        <column-menu enabled="true"/>
        <reorderable enabled="true"/>
        <!-- Other configuration. -->
    </kendo-treelist>
```
{% endif %}

## See Also

* [Column Menu by the TreeList HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/treelist/column-menu)
* [Server-Side API](/api/treelist)
