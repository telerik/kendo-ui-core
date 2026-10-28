---
title: Column Menu
page_title: Column Menu
description: "Learn how to enable and configure the {{ site.product_short }} Grid Column Menu, including global options, sorting, grouping, and types."
components: ["grid"]
slug: columnmenu_aspnet_grid
position: 6
---

# Column Menu

The Grid column menu provides quick access to column operations such as sorting, filtering, and visibility.

Enable the column menu with the `ColumnMenu(true)` method. When enabled, each column header renders a menu that lets users sort, filter, or change column visibility. The menu also respects disabled operations in the column definition and does not render their related UI. For a runnable example, refer to the [Grid Column Menu demo](https://demos.telerik.com/{{site.platform}}/grid/column-menu).

>note
> Starting with R3 2022, you can disable the column menu for a specific column by using `.ColumnMenu(false)`.

## Global Column Menu

Starting with {{ site.product }} R1 2024, you can display the column menu in the Grid [Toolbar]({% slug htmlhelpers_grid_aspnetcore_toolbar%}) instead of in each column header. The global column menu lets you control column visibility and clear all Grid filters through a single button.

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

Starting with {{ site.product }} R2 SP1 2023, the Grid column menu provides options to change the target column position by using the **Move next** and **Move previous** buttons. This functionality requires enabled column reordering.

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

Starting with {{ site.product }} R2 SP1 2023, the Grid column menu provides an option that lets users group or ungroup the Grid by the target column. To display this option in the column menu, enable grouping through the [`Groupable`](/api/kendo.mvc.ui.fluent/gridbuilder#groupable) configuration.

## Column Title Sorting

The column menu allows you to control the visibility of each Grid column. For this purpose, the column menu renders a child column menu with a checkbox for each Grid column.
By default, the Grid column titles in the child column menu are not sorted. They have the same order as the columns in the Grid. To sort the column titles in the child menu, use the `ColumnMenu()` method.

The following example demonstrates how to sort the column titles in the child menu in ascending order:

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

## Column Title Grouping

The `ColumnMenu()` method accepts a `GridColumnMenuSettingsBuilder` that enables column grouping in the child menu. The `Columns()` group method expects a collection of model properties. The menu automatically uses Grid column titles when they are defined.

The following example demonstrates how to group columns by providing the model fields in a list of strings:

```HtmlHelper
    .ColumnMenu(menu=>
           menu.Columns(columns => {
               columns.Groups(groups =>
               {
                   groups.Add().Title("Company Info").Columns(new List<string> { "CompanyName", "Country" });
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
```
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
            .Name("grid")
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

{% if site.core %}
* [ASP.NET Core DataGrid Homepage](https://www.telerik.com/aspnet-core-ui/grid)
{% endif %}
* [Column Menu by the Grid (Demo)](https://demos.telerik.com/{{site.platform}}/grid/column-menu)
