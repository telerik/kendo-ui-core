---
title: Row Drag and Drop
page_title: Row Drag and Drop
description: "Learn how to enable the drag and drop functionality of the Telerik UI Grid for {{ site.framework }}."
slug: htmlhelpers_row_drag_drop_grid
position: 12
---

# Row Drag and Drop

The Drag and Drop functionality allows you to reorder single or multiple Grid rows by dragging. Additionally, you can move rows between different Grids.

The {{site.prouct}} Grid supports two interaction modes:

- [Drag and Drop](#getting-started) - The user can click to drag a row and release the dragged row in the desired location.
- [Click-Move-Click](#row-click-move-click) - The user can click to initiate the dragging interaction, move the pointer to the desired location and click again to release the dragged item.

## Getting Started

To enable the Drag and Drop feature:

1. Set the row reordering to "true" through the `Reorderable()` method.
1. Add a draggable column by using the `Draggable` option. As a result, the Grid will render a drag handle on each row and will make the rows draggable.

    ```HtmlHelper
        @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
            .Name("Grid")
            .Reorderable(reorder => reorder.Rows(true))
            .Columns(columns =>
            {
                columns.Template("").Draggable(true);
                columns.Bound(p => p.ShipName).Title("Order");
            })
            .DataSource(dataSource => dataSource
                .Ajax()
                .PageSize(10)
                .Model(m => m.Id("OrderID")) //Ensure that the Model identifier ("Id") is defined.
                .Read(read => read.Action("Orders_Read", "Grid"))
            )
            ...
        )
    ```
    {% if site.core %}
    ```TagHelper
        <kendo-grid name="grid" height="550">
            <datasource type="DataSourceTagHelperType.Custom" custom-type="odata" page-size="20">
                <transport>
                    <read url="https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders" />
                </transport>
                <schema>
                    <model id="OrderID"> <!--Ensure that the Model identifier ("id") is defined.-->
                    </model>
                </schema>
            </datasource>
            <reorderable rows="true"/>
            <pageable button-count="5" refresh="true" page-sizes="new int[] { 5, 10, 20 }"></pageable>
            <columns>
                <column template="" draggable="true" />
                <column field="ShipName" title="Ship Name"/>
            </columns>
        </kendo-grid>
    ```
    {% endif %}

## Drag and Drop Multiple Rows in the same Grid

To drag and drop multiple Grid rows, set the selection mode to `Multiple` through the `Selectable()` configurator. In this case, only the selected rows will be draggable. If the user drags selected rows, the current row selection will be cleared on row drop.
Additionally, the row drag clue will be `N items selected` where `N` is the number of the selected rows.

```HtmlHelper
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
        .Name("Grid")
        .Reorderable(reorder => reorder.Rows(true))
        .Selectable(select => select.Mode(GridSelectionMode.Multiple))
        .Columns(columns =>
        {
            columns.Template("").Draggable(true);
            columns.Bound(p => p.ShipName).Title("Order");
        })
        .DataSource(dataSource => dataSource
            .Ajax()
            .PageSize(10)
            .Model(m => m.Id("OrderID")) //Ensure that the Model identifier ("Id") is defined.
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
            <schema>
                <model id="OrderID"> <!--Ensure that the Model identifier ("id") is defined.-->
                </model>
            </schema>
        </datasource>
        <reorderable rows="true"/>
        <pageable button-count="5" refresh="true" page-sizes="new int[] { 5, 10, 20 }"></pageable>
        <columns>
            <column template="" draggable="true" />
            <column field="ShipName" title="Ship Name"/>
        </columns>
    </kendo-grid>
````
{% endif %}

## Drag and Drop Rows between Grids

You can move items from one instance of the Grid to another by handling the [`RowReorder` event](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/rowreorder) of the Grid. It fires on reordering for both Grid instances and allows you to access and modify their data sources. Both Grids must be bound to the same model.

For a runnable example, refer to the [demo on drag and drop by the Grid](https://demos.telerik.com/{{ site.platform }}/grid/drag-drop).

## Row Click-Move-Click

As of {{site.product}} R2 SP1 2023, users can reorder the Grid's rows by using the click-move-click functionality provided by the `ClickMoveClick` option. To start moving the row, users can click the drag icon, and then click again to place the row in its new position.

{% if site.core %}
```HtmlHelper
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.ProductViewModel>()
        .Name("grid")
        .Columns(columns =>
        {
            columns.Template("").Draggable(true).Width(100);
            columns.Bound(p => p.ProductName).Title("Product").Width(200);
            columns.Bound(p => p.UnitPrice).Title("Price").Width(140);
            columns.Bound(p => p.Discontinued)
            .Title("In Stock")
            .ClientTemplate("<span class='k-badge k-badge-solid k-badge-solid-success k-badge-md k-rounded-md k-badge-inline'>Available</span>")
            .Width(130);
        })
        .Pageable()
        .Scrollable()
        .Sortable()
        .Navigatable()
        .Reorderable(reorder => reorder
            .Rows(rows => rows.ClickMoveClick(true))
            .Columns(true)
        )
        .HtmlAttributes(new { style = "height:430px;" })
        .DataSource(dataSource => dataSource
            .Ajax()
            .PageSize(20)
            .Model(m => m.Id("ProductID"))
            .Read(read => read.Action("Drag_Drop_Active_Read", "Grid"))
        )
    )
```
```TagHelper
    <kendo-grid name="grid" navigatable="true" style="height:430px;" width="550">
        <columns>
            <column template="" draggable="true">
            </column>
            <column field="ProductName" title="Product">
            </column>
            <column field="UnitPrice" title="Price">
            </column>
            <column field="Discontinued" title="In Stock" template="<span class='k-badge k-badge-solid k-badge-solid-success k-badge-md k-rounded-md k-badge-inline'>Available</span>">
            </column>
        </columns>
        <pageable enabled="true" />
        <scrollable enabled="true" />
        <sortable enabled="true" />
        <reorderable columns="true" >
            <rows click-move-click="true" />
        </reorderable>
        <datasource page="0" type="DataSourceTagHelperType.Ajax" page-size="20">
            <schema data="Data" total="Total" errors="Errors">
                <model id="ProductID">
                </model>
            </schema>
            <transport>
                <read url="@Url.Action("Drag_Drop_Active_Read","Grid")" />
            </transport>
        </datasource>
    </kendo-grid>
````
{% else %}
```HtmlHelper
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.ProductViewModel>()
        .Name("activeProductsGrid")
        .Columns(columns =>
        {
            columns.Template(@<text> </text>).Draggable(true).Width(100);
            columns.Bound(p => p.ProductName).Title("Product").Width(200);
            columns.Bound(p => p.UnitPrice).Title("Price").Width(140);
            columns.Bound(p => p.Discontinued)
                .Title("In Stock")
                .ClientTemplate("<span class='k-badge k-badge-solid k-badge-solid-success k-badge-md k-rounded-md k-badge-inline'>Available</span>")
                .Width(130);
        })
        .Pageable()
        .Scrollable()
        .Sortable()
        .Navigatable()
        .Reorderable(reorder => reorder
            .Rows(rows=>rows.ClickMoveClick(true))
            .Columns(true)
            )
        .HtmlAttributes(new { style = "height:430px;" })
        .DataSource(dataSource => dataSource
            .Ajax()
            .PageSize(20)
            .Model(m => m.Id("ProductID"))
            .Read(read => read.Action("Drag_Drop_Active_Read", "Grid"))
            )
    )
```
{% endif %}


## Drag Handle

You can allow the user to reorder the Grid rows by dragging the row through a drag handle. To enable the drag handle, add a draggable column:

{% if site.core %}
```HtmlHelper
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.ProductViewModel>()
        .Name("grid")
        .Columns(columns =>
        {
            columns.Template("").Draggable(true).Width(100);
            columns.Bound(p => p.ProductName).Title("Product").Width(200);
        })
    )
```
```TagHelper
    <kendo-grid name="grid" navigatable="true" style="height:430px;" width="550">
        <columns>
            <column template="" draggable="true"></column>
            <column field="ProductName" title="Product"></column>
        </columns>
    </kendo-grid>
````
{% else %}
```HtmlHelper
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.ProductViewModel>()
        .Name("activeProductsGrid")
        .Columns(columns =>
        {
            columns.Template(@<text> </text>).Draggable(true).Width(100);
            columns.Bound(p => p.ProductName).Title("Product").Width(200);
        })
    )
```
{% endif %}

## RowReorder Event

The {{site.product}} Grid exposes a [RowReorder](/api/kendo.mvc.ui.fluent/grideventbuilder#rowreordersystemstring) event. The event fires when the user drops a row into a new location. It allows you to manipulate your data collection based on where the user dropped the element.

## Keyboard Navigation

You can reorder the rows through the keyboard when the `Navigatable()` method is enabled.

The example below demonstrates how to drag and drop the Grid rows by using the keys `Ctrl + Up/Down`.

```HtmlHelper
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
        .Name("Grid")
        .Reorderable(reorder => reorder.Rows(true))
        .Navigatable()
        .Columns(columns =>
        {
            columns.Template("").Draggable(true);
            columns.Bound(p => p.ShipName).Title("Order");
        })
        .DataSource(dataSource => dataSource
            .Ajax()
            .PageSize(10)
            .Model(m => m.Id("OrderID")) //Ensure that the Model identifier ("Id") is defined.
            .Read(read => read.Action("Orders_Read", "Grid"))
        )
        ...
    )
```
{% if site.core %}
```TagHelper
    <kendo-grid name="grid" height="550" navigatable="true">
        <datasource type="DataSourceTagHelperType.Custom" custom-type="odata" page-size="20">
            <transport>
                <read url="https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders" />
            </transport>
            <schema>
                <model id="OrderID"> <!--Ensure that the Model identifier ("id") is defined.-->
                </model>
            </schema>
        </datasource>
        <reorderable rows="true"/>
        <pageable button-count="5" refresh="true" page-sizes="new int[] { 5, 10, 20 }"></pageable>
        <columns>
            <column template="" draggable="true" />
            <column field="ShipName" title="Ship Name"/>
        </columns>
    </kendo-grid>
````
{% endif %}

## Known Limitations

* Any DataSource operations (for example, sorting, filtering, grouping, and so on) that involve rendering rows in a different order than their natural one are not supported.

## See Also

* [Row Drag and Drop by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/row-drag-drop)
* [Grid Events]({% slug grid_events %})
* [Server-Side API](/api/grid)
* [Grid Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
