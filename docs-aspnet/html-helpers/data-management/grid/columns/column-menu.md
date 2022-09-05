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

The Grid also provides the option to set this property on individual Column level. You can disable the menu for a specific column by setting it to `.ColumnMenu(false)`.

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

As of R1 2021 version of the Telerik UI for {{ site.framework }} suite, the Grid component introduces the `modern` render mode that aims to deliver a fresh look and feel.

By default, the column menu of the Grid is initialized in the `classic` render mode. To set it to `modern`, configure the options of the widget as follows:

```HtmlHelper
    @(Html.Kendo().Grid()
            .Name("datePicker")
            .ColumnMenu(m=>{
               m.ComponentType("modern"); 
            })
    )
```
{% if site.core %}
```TagHelper
<kendo-grid name="grid">
    <column-menu component-type="modern">
        
    </column-menu>
</kendo-grid>
```
{% endif %}

## See Also

* [Column Menu by the Grid (Demo)](https://demos.telerik.com/{{site.platform}}/grid/column-menu)
