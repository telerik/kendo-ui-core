---
title: Row Resizing
page_title: Row Resizing
description: "Learn all about the Row Resizing feature of the Grid."
slug: rowresize_kendoui_grid
position: 14
---

# Row Resizing

The Row Resizing functionality for the Grid enables you to resize one or more table rows.

For a runnable example, refer to the [demo on Row Resizing in the Grid](https://demos.telerik.com/{{ site.platform }}/grid/row-resizing).

## Getting Started

To enable the row resizing functionality set the `.Resizable()` configuration:

```HtmlHelper
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
        .Name("Grid")
        .Resizable(r => r.Rows(true))
        .Columns(columns =>
        {
            columns.Bound(p => p.ShipName).Title("Ship Name");
        })
        .DataSource(dataSource => dataSource
            .Ajax()
            .PageSize(10)
            .Read(read => read.Action("Orders_Read", "Grid"))
        )
        ...
    )
```
{% if site.core %}
```TagHelper
    <kendo-grid name="grid" height="550" selectable="multiple, row">
        <datasource type="DataSourceTagHelperType.Custom" custom-type="odata" page-size="20">
            <transport>
                <read url="https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders" />
            </transport>
        </datasource>
        <resizable rows="true"/>
        <pageable button-count="5" refresh="true" page-sizes="new int[] { 5, 10, 20 }"></pageable>
        <columns>
            <column field="ShipName" title="Ship Name"/>
        </columns>
    </kendo-grid>
````
{% endif %}

## Multiple Rows

The user can resize more than one row at the same time. To do so, set the `Selectable` configuration to enable multiple rows selection. Once the user has made multiple selections, they can drag the resize handle on one of the rows and the resize will affect the rest of the selected elements automatically.

```HtmlHelper
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
        .Name("Grid")
        .Selectable(selectable => selectable
            .Mode(GridSelectionMode.Multiple)
            .Type(GridSelectionType.Cell))
        .Resizable(r => r.Rows(true))
        .Columns(columns =>
        {
            columns.Bound(p => p.ShipName).Title("Ship Name");
        })
        .DataSource(dataSource => dataSource
            .Ajax()
            .PageSize(10)
            .Read(read => read.Action("Orders_Read", "Grid"))
        )
        ...
    )
```
{% if site.core %}
```TagHelper
    <kendo-grid name="grid" height="550" selectable="multiple, row">
        <datasource type="DataSourceTagHelperType.Custom" custom-type="odata" page-size="20">
            <transport>
                <read url="https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders" />
            </transport>
        </datasource>
        <resizable rows="true"/>
        <pageable button-count="5" refresh="true" page-sizes="new int[] { 5, 10, 20 }"></pageable>
        <columns>
            <column field="ShipName" title="Ship Name"/>
        </columns>
    </kendo-grid>
````
{% endif %}

## RowResize Event

The `RowResize` event fires when the user resizes one or more rows. You can subscribe to the event and use it to further customize the behavior of the Grid.

## Known Limitations

* The row resize feature does not work with the [drag & drop]({% slug htmlhelpers_row_drag_drop_grid %}) functionality of the Grid. You can use only one of the two features at the same time.
* In a [Hierarchical]({% slug hierarchy_grid_htmlhelper_aspnetcore %}) scenario, only the innermost child Grid(s) can have resizable rows. The row resizing feature must be disabled for all the parent Grid components.
* The row resizing functionality is not supported with [virtual scrolling]({% slug virtual_scrolling_aspnetcore_grid %}) as the virtual scrolling relies on calculating the average row height based on already loaded data. Having a large variance of row heights or an unknown number of rows that are not bound to data (such as group headers) can cause unexpected behavior.

## See Also

* [Row Resizing in the {{ site.product }} Grid](https://demos.telerik.com/{{ site.platform }}/grid/row-resizing)
* [Grid events]({% slug grid_events %})
* [Server-side API](/api/grid)
* [Client-side API of the Grid](/api/javascript/ui/grid)
