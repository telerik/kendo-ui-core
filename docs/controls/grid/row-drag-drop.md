---
title: Row Drag & Drop
page_title: jQuery Grid Documentation - Row Drag & Drop
description: "Get started with the jQuery Grid by Kendo UI and learn all about the Row Drag & Drop feature."
slug: draganddrop_kendoui_grid_widget
position: 13
---

# Row Click-Move-Click

As of Kendo UI R2 SP1 2023, users can reorder the Grid's rows by using the click-move-click functionality provided by the [clickMoveClick](/api/javascript/ui/grid/configuration/reorderable.rows.clickmoveclick) option. To start moving the row, users can click the drag icon, and then click again to place the row in its new position.

```dojo
    <div id="grid"></div>
    <script>
        $("#grid").kendoGrid({
            columns: [
                { draggable: true, width: "40px" },
                { field: "name" },
                { field: "age" }
            ],
            dataSource: [
                { id:1, name: "Jane Doe", age: 30 },
                { id:2, name: "John Doe", age: 33 }
            ],
            reorderable: {
                rows: {
                    clickMoveClick: true
                }
            }
        });
    </script>
```

# Row Drag and Drop

The Drag and Drop functionality for the Grid rows allows you to move a single row or multitude rows between different parents in the same Grid or between different Kendo UI Grid instances.

For a runnable example, refer to the [demo on Row Drag & Drop in the Grid](https://demos.telerik.com/kendo-ui/grid/drag-drop).


## Getting Started

To enable the Drag and Drop functionality, set the `reorderable.rows` property to `true`.

> * The Drag & Drop functionality requires defining the `id` field of the data items in [`schema.model`](/api/javascript/data/datasource/configuration/schema.model). This ensures the correct reordering of the data items.

    $("#grid").kendoGrid({
        dataSource: {
            schema: {
                model: {
                    id: "ProductID"
                    }
                }
        }
        reorderable: {
            rows: true
        },
        // Other configuration.
     });

## Drag handle

You can render a drag handle and the user could reorder the rows by dragging the row through its drag handle. To enable the drag handle, add the `draggable: true` property in the columns configuration.

    $("#grid").kendoGrid({
        columns: [
            { draggable: true },
            { field: "ProductName", title: "Product Name", width: "200px" },
        ],
        // Other configuration.
     });

## RowReorder Event

The [`rowReorder`](/api/javascript/ui/grid/events/rowReorder) event fires when the user drops a row into a new location. It allows you to manipulate your data collection based on where the user dropped the element.

    $("#grid").kendoGrid({
        dataSource: {
            schema: {
                model: {
                    id: "ProductID"
                    }
                }
        }
        reorderable: {
            rows: true
        },
        rowReorder(ev) {
            // Custom logic
        }
        // Other configuration.
     });

## Keyboard Navigation

The Grid supports its keyboard navigation functionality through the `navigatable` option.  Once enabled, the user will be able to reorder rows by using the following key combination:

`Ctrl` + `Up Arrow / Down Arrow`

When [`multiple selection`](/controls/grid/selection#multi-row-selection) is enabled for the Grid rows the user can drag and drop the selected rows with the following combination:

`Ctrl` + `Mouse left-click`

## Known Limitations

* The Row Drag & Drop does not work in a combination with data sources that involve rendering rows in an order different than their natural one, such as [`sorting`](/controls/grid/sorting), [`filtering`](/controls/grid/filtering) and [`grouping`](/controls/grid/grouping/overview).
* The Drag & Drop functionality in combination with [`Selection`](https://demos.telerik.com/kendo-ui/grid/selection) is not supported in Microsoft Internet Explorer.

## See Also

* [Drag & Drop in the KendoUI Grid (Demo)](https://demos.telerik.com/kendo-ui/grid/drag-drop)
* [JavaScript API Reference of the KendoUI Grid](/api/javascript/ui/grid)

