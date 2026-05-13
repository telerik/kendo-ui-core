---
title: Row Pinning
page_title: Row Pinning
description: "Learn how to use the Row Pinning feature in the Telerik UI Grid for {{ site.framework }} to keep specific rows visible while the user scrolls through the data."
components: ["grid"]
slug: row_pinning_grid_htmlhelper_aspnetcore
position: 22
---

# Row Pinning

The {{ site.product }} Grid supports row pinning that keeps specific rows visible at the top or bottom of the Grid while the user scrolls through the data. Pinned rows remain in place regardless of sorting, filtering, or paging, making them ideal for monitoring critical data entries such as out-of-stock items, high-priority orders, or key performance indicators.

## Prerequisites

Before enabling row pinning, ensure the following requirements are met:

* The DataSource schema model `Id` field must be set. The Grid uses this identifier to track pinned rows across data operations.
* The Grid must be [scrollable]({% slug htmlhelpers_grid_aspnetcore_scrolling %})&mdash;Row pinning depends on scrollable Grid content to keep the pinned rows anchored at the top or bottom while the remaining rows scroll. Scrolling is enabled by default and can be configured through the `.Scrollable()` option.

## Getting Started

To enable row pinning, use the `.Pinnable()` configuration. The available values for the pin row location are:

* `both`&mdash;Allows pinning rows to both the top and bottom of the Grid.
* `top`&mdash;Allows pinning rows to the top of the Grid only.
* `bottom`&mdash;Allows pinning rows to the bottom of the Grid only.

The following example enables pinning to both the top and bottom of the Grid.

```HtmlHelper
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
        .Name("grid")
        .Pinnable()
        .Columns(columns =>
        {
            columns.Pin().Width(40);
            columns.Bound(p => p.ShipName).Title("Ship Name");
            columns.Bound(p => p.Freight);
        })
        .DataSource(dataSource => dataSource
            .Ajax()
            .PageSize(10)
            .Model(model =>
            {
                model.Id(r => r.OrderId);
            })
            .Read(read => read.Action("Orders_Read", "Grid"))
        )
    )
```
{% if site.core %}
```TagHelper
    <kendo-grid name="grid">
        <datasource type="DataSourceTagHelperType.Ajax" page-size="10">
        <schema>
            <model id="OrderId">
            </model>
        </schema>
            <transport>
                <read url="@Url.Action("Orders_Read","Grid")" />
            </transport>
        </datasource>
        <pinnable enabled="true" />
        <columns>
            <column field="ShipName" title="Ship Name"/>
            <column field="Freight"/>
        </columns>
    </kendo-grid>
```
{% endif %}

## Pinning with a Pin Column

To provide a dedicated UI for pinning and unpinning rows, add a pin column by enabling `Pinnable()` on a column definition. The pin icon in the column allows the user to pin each row directly from the Grid.

```HtmlHelper
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
        .Name("grid")
        .Pinnable(p => p.Enabled(true))
        .Columns(columns =>
        {
            columns.Pinnable().Width(40);
            columns.Bound(p => p.ShipName).Title("Ship Name");
            columns.Bound(p => p.Freight);
        })
        .DataSource(dataSource => dataSource
            .Ajax()
            .PageSize(10)
            .Model(model =>
            {
                model.Id(r => r.OrderId);
            })
            .Read(read => read.Action("Orders_Read", "Grid"))
        )
    )
```
{% if site.core %}
```TagHelper
    <kendo-grid name="grid">
        <datasource type="DataSourceTagHelperType.Ajax" page-size="10">        <schema>
            <model id="OrderId">
            </model>
        </schema>            
            <transport>
                <read url="@Url.Action("Orders_Read","Grid")" />
            </transport>
        </datasource>
        <pinnable enabled="true" />
        <columns>
            <column pinnable="true" width="40"/>
            <column field="ShipName" title="Ship Name"/>
            <column field="Freight"/>
        </columns>
    </kendo-grid>
```
{% endif %}

## Initially Pinned Rows

To pin rows on initial load, populate the `Top` and `Bottom` collections of the `Pinnable` configuration with the IDs of the data items before the Grid renders. This is useful for scenarios where you need to surface critical data immediately, such as out-of-stock inventory items or overstock alerts.

```HtmlHelper
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
        .Name("grid")
        .Pinnable(p => p
            .Enabled(true)
            .Top(new[] { 10248 })
            .Bottom(new[] { 10249 })
        )
        .Columns(columns =>
        {
            columns.Bound(p => p.ShipName).Title("Ship Name");
            columns.Bound(p => p.Freight);
        })
        .DataSource(dataSource => dataSource
            .Ajax()
            .PageSize(10)
            .Model(model =>
            {
                model.Id(r => r.OrderId);
            })
            .Read(read => read.Action("Orders_Read", "Grid"))
        )
    )
```
{% if site.core %}
```TagHelper
    <kendo-grid name="grid">
        <datasource type="DataSourceTagHelperType.Ajax" page-size="10">
        <schema>
            <model id="OrderId">
            </model>
        </schema>
            <transport>
                <read url="@Url.Action("Orders_Read","Grid")" />
            </transport>
        </datasource>
        <pinnable enabled="true" top="new[] { 10248 }" bottom="new[] { 10249 }" />
        <columns>
            <column field="ShipName" title="Ship Name"/>
            <column field="Freight"/>
        </columns>
    </kendo-grid>
```
{% endif %}

## Controlling Pinnable Rows

The `IsRowPinnable` handler allows you to restrict which rows can be pinned. The handler receives the row data item and returns a boolean that determines whether the row displays the pin action.

The following example allows pinning only for orders with a Freight value greater than 30.

```HtmlHelper
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
        .Name("grid")
        .Pinnable(p => p
            .Enabled(true)
            .IsRowPinnable("isRowPinnable")
        )
        .Columns(columns =>
        {
            columns.Pinnable().Width(40);
            columns.Bound(p => p.ShipName).Title("Ship Name");
            columns.Bound(p => p.Freight);
        })
        .DataSource(dataSource => dataSource
            .Ajax()
            .PageSize(10)
            .Model(model =>
            {
                model.Id(r => r.OrderId);
            })
            .Read(read => read.Action("Orders_Read", "Grid"))
        )
    )
```
{% if site.core %}
```TagHelper
    <kendo-grid name="grid">
        <datasource type="DataSourceTagHelperType.Ajax" page-size="10">
        <schema>
            <model id="OrderId">
            </model>
        </schema>
            <transport>
                <read url="@Url.Action("Orders_Read","Grid")" />
            </transport>
        </datasource>
        <pinnable enabled="true" is-row-pinnable="isRowPinnable" />
        <columns>
            <column pinnable="true" width="40"/>
            <column field="ShipName" title="Ship Name"/>
            <column field="Freight"/>
        </columns>
    </kendo-grid>
```
{% endif %}
```JavaScript
    function isRowPinnable(context) {
        return context.dataItem.Freight > 30;
    }
```

## Customizing Pinned Row Appearance

The `PinnedRowTemplate` option accepts a JavaScript function that customizes the rendering of pinned rows. The function receives an object with two fields: `dataItem` (the data item for the row) and `row` (the default HTML string for the row), and must return an HTML string. If not set, pinned rows use the same template as regular rows.

```HtmlHelper
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
        .Name("grid")
        .Pinnable(p => p
            .Enabled(true)
            .Top(new[] { 10248 })
        )
        .PinnedRowTemplate("pinnedRowTemplate")
        .Columns(columns =>
        {
            columns.Bound(p => p.ShipName).Title("Ship Name");
            columns.Bound(p => p.Freight);
        })
        .DataSource(dataSource => dataSource
            .Ajax()
            .PageSize(10)
            .Model(model =>
            {
                model.Id(r => r.OrderId);
            })
            .Read(read => read.Action("Orders_Read", "Grid"))
        )
    )
```
{% if site.core %}
```TagHelper
    <kendo-grid name="grid" pinned-row-template="pinnedRowTemplate">
        <datasource type="DataSourceTagHelperType.Ajax" page-size="10">        <schema>
            <model id="OrderId">
            </model>
        </schema>            <transport>
                <read url="@Url.Action("Orders_Read","Grid")" />
            </transport>
        </datasource>
        <pinnable enabled="true" top="new[] { 10248 }" />
        <columns>
            <column field="ShipName" title="Ship Name"/>
            <column field="Freight"/>
        </columns>
    </kendo-grid>
```
{% endif %}
```JavaScript
    function pinnedRowTemplate(data) {
        return data.row.replace("<tr", '<tr style="background-color: #ffe0e0;"');
    }
```

## Pinning with a Context Menu

As an alternative to the built-in pin column, you can use the built-in context menu to offer row pinning actions. Enable both `.Pinnable()` and `.ContextMenu()` on the Grid.

```HtmlHelper
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
        .Name("grid")
        .Pinnable()
        .ContextMenu()
        .Columns(columns =>
        {
            columns.Bound(p => p.ShipName).Title("Ship Name");
            columns.Bound(p => p.Freight);
        })
        .DataSource(dataSource => dataSource
            .Ajax()
            .PageSize(10)
            .Model(model =>
            {
                model.Id(r => r.OrderId);
            })
            .Read(read => read.Action("Orders_Read", "Grid"))
        )
    )
```
{% if site.core %}
```TagHelper
    <kendo-grid name="grid">
        <datasource type="DataSourceTagHelperType.Ajax" page-size="10">
        <schema>
            <model id="OrderId">
            </model>
        </schema>
            <transport>
                <read url="@Url.Action("Orders_Read","Grid")" />
            </transport>
        </datasource>
        <pinnable enabled="true" />
        <context-menu enabled="true" />
        <columns>
            <column field="ShipName" title="Ship Name"/>
            <column field="Freight"/>
        </columns>
    </kendo-grid>
```
{% endif %}

## See Also

{% if site.core %}
* [ASP.NET Core DataGrid Homepage](https://www.telerik.com/aspnet-core-ui/grid)
{% endif %}
* [Row Pinning in the {{ site.product }} Grid (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/row-pinning)
* [Grid Events]({% slug grid_events %})
* [Server-side API](/api/grid)
* [Client-side API of the Grid](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
