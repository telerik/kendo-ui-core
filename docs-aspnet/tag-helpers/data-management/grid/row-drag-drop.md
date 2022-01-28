---
title: Row Drag and Drop
page_title: Row Drag and Drop
description: "Learn how to enable the drag and drop functionality of the Telerik UI Grid TagHelper for {{ site.framework }}."
slug: taghelpers_row_drag_drop_grid
position: 7
---

# Row Drag and Drop

The Drag and Drop functionality allows you to reorder single or multiple Grid rows by dragging. Additionally, you can move rows between different Grids.

## Getting Started

To enable the Drag and Drop feature:

1. Set the `rows` attribute to "true" through the `reorderable` tag.
1. Add a draggable column by using the `draggable` attribute. As a result, the Grid will render a drag handle on each row and will make the rows draggable.

    ```tagHelper

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
    ```cshtml

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

## Drag and Drop Multiple Rows in the same Grid

To drag and drop multiple Grid rows, set the `selectable` attribute to `multiple, row`. In this case, only the selected rows will be draggable. If the user drags selected rows, the current row selection will be cleared on row drop.
Additionally, the row drag clue will be `N items selected` where `N` is the number of the selected rows.

```tagHelper

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

```
```cshtml

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

## Drag and Drop Rows between Grids

You can move items from one instance of the Grid to another by handling the [`RowReorder` event](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/rowreorder) of the Grid. It fires on reordering for both Grid instances and allows you to access and modify their data sources. Both Grids must be bound to the same model.

For a runnable example, refer to the [demo on drag and drop by the Grid](https://demos.telerik.com/{{ site.platform }}/grid/drag-drop).

## Keyboard Navigation

You can reorder the rows through the keyboard when the `navigatable` property is enabled.

The example below demonstrates how to drag and drop the Grid rows by using the keys `Ctrl + Up/Down`.

```tagHelper

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

```
```cshtml

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

## Known Limitations

* Any DataSource operations (for example, sorting, filtering, grouping, and so on) that involve rendering rows in a different order than their natural one are not supported.

## See Also

* [Basic Usage of the Grid TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/grid/tag-helper)
* [Server-Side API](/api/grid)
* [Grid Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
