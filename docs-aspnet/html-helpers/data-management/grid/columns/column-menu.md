---
title: Column Menu
page_title: Column Menu
description: "Get started with the {{ site.product_short }} Grid by Kendo UI and learn how to enable its column menu."
slug: columnmenu_aspnet_grid
position: 6
---

# Column Menu

The column menu allows users to quickly access column-related operations like sorting and filtering.

To enable the column menu, use the `ColumnMenu(true)` method. As a result, the column headers of the Grid render a column menu, which allows the user to sort, filter, or change the visibility of a column. The column menu also detects when a specific column operation is disabled through the column definition and excludes the corresponding UI from rendering. For a runnable example, refer to the [demo on implementing a column menu in the Grid](https://demos.telerik.com/{{site.platform}}/grid/column-menu).

> As of the R3 2022 release, you can disable the column menu for a specific column by using `.ColumnMenu(false)`.

## Global Column Menu

As of {{ site.product }} R1 2024, you can display the column menu in the Grid's [Toolbar]({% slug htmlhelpers_grid_aspnetcore_toolbar%}) instead of in each column's header. The global column menu allows you to control the columns' visibility and clear all filters applied to the Grid through a single button.

The following example shows how to set up the global column menu and enable the clear-all-filters button.

```HtmlHelper
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
        .Name("grid")
        .ToolBar(toolbar => toolbar.Columns())
        .ColumnMenu(menu =>
        {
            menu.ClearAllFilters(true);
        })
        ...
    )
```
{% if site.core %}
```TagHelper
    <kendo-grid name="grid">
        <toolbar>
        <toolbar-button name="columns"></toolbar-button></toolbar>
        <column-menu clear-all-filters="true"></column-menu>
        <!--Other configuration-->
    </kendo-grid>
```
{% endif %}

For a runnable example with the global column menu, see the [Grid Global Column Menu demo](https://demos.telerik.com/{{site.platform}}/grid/toolbar-columns-menu).

## Column Reordering

As of {{ site.product }} R2 SP1 2023, the Grid's Column Menu provides an option to change the position of the target column by using **Move next** and **Move previous** buttons. The functionality requires that reordering for the columns is enabled.

```HtmlHelper
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
        .Name("grid")
        .Reorderable(reorder => reorder.Columns(true))
    )
```
{% if site.core %}
```TagHelper
    <kendo-grid name="grid">
        <reorderable enabled="true" columns="true"/>
    </kendo-grid>
```
{% endif %}

To see this functionality in action, check the [Grid Column Menu demo](https://demos.telerik.com/{{site.platform}}/grid/column-menu).

## Column Grouping

As of {{ site.product }} R2 SP1 2023, the Grid's Column Menu provides an option that allows users to select the target column for grouping or ungrouping the Grid. To display the option item in the Column Menu, enable grouping via the [`Groupable`](/api/kendo.mvc.ui.fluent/gridbuilder#groupable) configuration.
## Sort

The column menu allows you to control the visibility of each Grid column. For this purpose, the column menu renders a child column menu with a checkbox for each Grid column.
By default, the Grid column titles in the child column menu are not sorted. They have the same order as the columns in the Grid. To sort the column titles in the child menu, use the `ColumnMenu()` method.

The below example demonstrates how to sort the column titles in the child menu in ascending order:

```HtmlHelper
    .ColumnMenu(menu=>
           menu.Columns(columns => columns.Sort("asc"))
    )
```
{% if site.core %}
```TagHelper
    <column-menu>
        <column-menu-columns sort="asc">

        </column-menu-columns>
    </column-menu>
```
{% endif %}

## Group

The `ColumnMenu()` method accepts a `GridColumnMenuSettingsBuilder` that enables grouping of the columns in the child menu. The `Columns()` group method expects a collection of the model properties. The menu will automatically use the title of the grid columns if such is defined

The following example demonstrates how to group columns by providing the model fields in a list of strings:

```HtmlHelper
    .ColumnMenu(menu=>
           menu.Columns(columns => {
               columns.Groups(groups =>
               {
                   groups.Add().Title("Company Info").Columns(new List<string> { "CompanyName", "Country" }); ;
                   groups.Add().Title("Contact Info").Columns(new List<string> { "ContactName", "ContactTitle" });
               });
           })
    )
```
{% if site.core %}
```TagHelper
    <column-menu>
        <column-menu-columns sort="asc">
            <column-menu-columns-groups>
                <column-menu-columns-group title="Company Info" columns='new string[] { "CompanyName", "Country" }' />
                <column-menu-columns-group title="Contact Info" columns='new string[] { "ContactName", "ContactTitle" }' />
            </column-menu-columns-groups>
        </column-menu-columns>
    </column-menu>
````
{% endif %}

## Column Menu Types

The Telerik UI for {{ site.framework }} Grid provides the following Column Menu component types:

| Column Menu Type  | Description |
| ----              | ----        |
| `classic`         | The default rendering mode of the Grid's Column Menu |
| `modern`          | Introduced with R1 2021 version of the Telerik UI for {{ site.framework }} suite. The `modern` rendering mode aims to deliver a fresh look and feel to the Grid's Column Menu |
| `tabbed`          | Introduced with R3 SP1 2023 version of the Telerik UI for {{ site.framework }} suite. The `tabbed` component type delivers a more compact view without sacrificing the available space. The tabbed interface provides a neat way to organize items into related groups. |

By default, the column menu of the Grid is initialized in the `classic` render mode. To set it to `modern` or `tabbed`, configure the `ColumnMenu.ComponentType` option of the {{ site.product }} Grid as demonstrated below:

```HtmlHelper
    @(Html.Kendo().Grid()
            .Name("datePicker")
            .ColumnMenu(m=>{
               m.ComponentType("tabbed");
            })
    )
```
{% if site.core %}
```TagHelper
<kendo-grid name="grid">
    <column-menu component-type="tabbed">

    </column-menu>
</kendo-grid>
```
{% endif %}

## See Also

* [Column Menu by the Grid (Demo)](https://demos.telerik.com/{{site.platform}}/grid/column-menu)
