---
title: Sticky Groups
page_title: Sticky Groups
description: "Learn how to enable sticky group headers and footers in the Telerik UI Grid for {{ site.framework }} to keep group context visible while scrolling."
components: ["grid"]
slug: htmlhelpers_grid_aspnetcore_sticky_groups
position: 4
---

# Sticky Groups

The Telerik UI Grid for {{ site.framework }} supports sticky group headers and footers. When the user scrolls through grouped data, the sticky group headers remain visible at the top of the Grid and the sticky group footers remain visible at the bottom, providing continuous context about which group the currently visible rows belong to.

## Getting Started

To enable sticky group headers, use the `StickyHeaders()` method of the `Groupable` configuration. To enable sticky group footers, use the `StickyFooters()` method. The Grid must have the `Scrollable` option enabled and a `Height` set for the sticky behavior to work.

```HtmlHelper
    @(Html.Kendo().Grid<ProductViewModel>()
        .Name("grid")
        .Height(400)
        .Scrollable()
        .Groupable(g => g
            .StickyHeaders(true)
            .StickyFooters(true)
        )
        .Columns(columns =>
        {
            columns.Bound(p => p.ProductName).GroupFooterTemplate("Count: #=count#");
            columns.Bound(p => p.Category);
            columns.Bound(p => p.UnitPrice).Format("{0:c}");
        })
        .DataSource(dataSource => dataSource
            .Ajax()
            .Group(groups => groups.Add(p => p.Category))
            .Aggregates(aggregates =>
            {
                aggregates.Add(p => p.ProductName).Count();
            })
            .Read(read => read.Action("Products_Read", "Grid"))
        )
    )
```
{% if site.core %}
```TagHelper
    <kendo-grid name="grid" height="400">
        <scrollable enabled="true" />
        <groupable enabled="true" sticky-headers="true" sticky-footers="true" />
        <columns>
            <column field="ProductName" group-footer-template="Count: #=count#" />
            <column field="Category" />
            <column field="UnitPrice" format="{0:c}" />
        </columns>
        <datasource type="DataSourceTagHelperType.Ajax">
            <groups>
                <group field="Category" />
            </groups>
            <aggregates>
                <aggregate field="ProductName" aggregate="count" />
            </aggregates>
            <transport>
                <read url="@Url.Action("Products_Read", "Grid")" />
            </transport>
        </datasource>
    </kendo-grid>
```
{% endif %}

> Sticky group footers require the columns to have a `GroupFooterTemplate` defined and the DataSource to have `Aggregates` configured.

## Features

The sticky groups functionality works with:

* **Nested groups**&mdash;When the Grid is grouped by multiple fields, sticky headers and footers are rendered for each grouping level.
* **Locked (frozen) columns**&mdash;Sticky group rows span both the locked and scrollable sections of the Grid.
* **Virtual scrolling**&mdash;Sticky headers and footers are supported when the Grid uses virtual scrolling.
* **Keyboard navigation**&mdash;When the Grid is `Navigatable`, the sticky group headers and footers can be focused and navigated with the keyboard.

## See Also

* [Sticky Groups by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/sticky-groups)
* [Grouping Overview]({% slug htmlhelpers_grid_aspnetcore_grouping %})
* [Grouping with Aggregates by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/aggregates)
* [Server-Side API](/api/grid)
