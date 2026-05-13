---
title: Row Pinning
page_title: jQuery Grid Documentation - Row Pinning
description: "Learn how to use the Row Pinning feature in the Kendo UI for jQuery Grid to keep specific rows visible at the top or bottom while the user scrolls through the data."
components: ["grid"]
slug: row_pinning_kendoui_grid
position: 18
---

# Row Pinning

The Kendo UI for jQuery Grid supports row pinning that keeps specific rows visible at the top or bottom of the Grid while the user scrolls through the data. Pinned rows remain in place regardless of sorting, filtering, or paging, making them ideal for monitoring critical data entries such as out-of-stock items, high-priority orders, or key performance indicators.

## Prerequisites

Before enabling row pinning, ensure the following requirements are met:

* The DataSource [`schema model id`](/api/javascript/data/datasource/configuration/schema#schemamodel) field must be set. The Grid uses this identifier to track pinned rows across data operations.
* The Grid must be [scrollable]({% slug scrolling_kendoui_grid_widget %})&mdash;Row pinning depends on scrollable Grid content to keep the pinned rows anchored at the top or bottom while the remaining rows scroll. Scrolling is enabled by default and can be configured through the [`scrollable`](/api/javascript/ui/grid/configuration/scrollable) option.

## Getting Started

To enable row pinning, set the [`pinnable.pinRowLocation`](/api/javascript/ui/grid/configuration/pinnable.pinrowlocation) option. The available values are:

* `true`&mdash;Allows pinning rows to both the top and bottom of the Grid.
* `"top"`&mdash;Allows pinning rows to the top of the Grid only.
* `"bottom"`&mdash;Allows pinning rows to the bottom of the Grid only.

The following example enables pinning to both the top and bottom of the Grid.

```dojo
    <div id="grid"></div>
    <script>
        $("#grid").kendoGrid({
            pinnable: true,
            columns: [
                { pinnable: true, width: 40 },
                { field: "name" },
                { field: "age" }
            ],
            dataSource: {
                data: [
                    { name: "Jane Doe", age: 30 },
                    { name: "John Doe", age: 33 },
                    { id: 3, name: "Jim Doe", age: 25 },
                    { id: 4, name: "Anne Smith", age: 35 }
                ],
                schema: {
                    model: { id: "id" }
                }
            }
        });
    </script>
```

## Initially Pinned Rows

To pin rows on initial load, populate the [`pinnable.top`](/api/javascript/ui/grid/configuration/pinnable.top) and [`pinnable.bottom`](/api/javascript/ui/grid/configuration/pinnable.bottom) arrays with data items before the Grid renders. This is useful for scenarios where you need to surface critical data immediately, such as out-of-stock inventory items or overstock alerts.

```dojo
<div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33 },
          { id: 3, name: "Jim Doe", age: 25 },
          { id: 4, name: "Anne Smith", age: 35 }
        ],
        schema: {
          model: { id: "id" }
        }
      },
      pinnable: {
        top: [1],
        bottom: [2]
      }
    });
    </script>
```

## Controlling Pinnable Rows

The [`isRowPinnable`](/api/javascript/ui/grid/configuration/pinnable.isrowpinnable) callback allows you to restrict which rows can be pinned. The callback receives the row data item and its index, and returns a boolean that determines whether the row displays the pin action.

The following example allows pinning only for items with age greater than 30.

```dojo
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { pinnable: true, width: 40 },
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33 },
          { id: 3, name: "Jim Doe", age: 25 }
        ],
        schema: {
          model: { id: "id" }
        }
      },
      pinnable: {
        isRowPinnable: function(context) {
          return context.dataItem.age > 30;
        }
      }
    });
    </script>
```

## Customizing Pinned Row Appearance

The [`pinnedRowTemplate`](/api/javascript/ui/grid/configuration/pinnedrowtemplate) option accepts a function that customizes the rendering of pinned rows. The function receives an object with two fields: `dataItem` (the data item for the row) and `row` (the default HTML string for the row), and must return an HTML string. If not set, pinned rows use the same template as regular rows.

```dojo
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33 },
          { id: 3, name: "Jim Doe", age: 25 }
        ],
        schema: {
          model: { id: "id" }
        }
      },
      pinnable: {
        top: [1]
      },
      pinnedRowTemplate: function(data) {
        return data.row.replace("<tr", '<tr style="background-color: #ffe0e0;"');
      }
    });
    </script>
```

## Pinning with a Pin Column

To provide a dedicated UI for pinning and unpinning rows, add a pin column by setting `pinnable: true` on a column definition. The pin icon in the column allows the user to pin each row directly from the Grid.

```dojo
    <div id="grid"></div>
    <script>
        $("#grid").kendoGrid({
            pinnable: true,
            columns: [
                { pinnable: true, width: 40 },
                { field: "name" },
                { field: "age" }
            ],
            dataSource: {
                data: [
                    { name: "Jane Doe", age: 30 },
                    { name: "John Doe", age: 33 },
                    { id: 3, name: "Jim Doe", age: 25 },
                    { id: 4, name: "Anne Smith", age: 35 }
                ],
                schema: {
                    model: { id: "id" }
                }
            }
        });
    </script>
```

## Pinning with a Context Menu

As an alternative to the built-in pin column, you can use a context menu to offer row pinning actions. This approach provides a cleaner Grid layout while still enabling full pinning functionality.

To implement context-menu-based pinning:

1. Enable the [`pinnable`](/api/javascript/ui/grid/configuration/pinnable) Grid option.
1. Enable the [`contextMenu`](/api/javascript/ui/grid/configuration/contextmenu) option of the Grid.


```dojo
    <div id="grid"></div>
    <script>
        $("#grid").kendoGrid({
            pinnable: true,
            contextMenu: true,
            columns: [
                { field: "name" },
                { field: "age" }
            ],
            dataSource: {
                data: [
                    { name: "Jane Doe", age: 30 },
                    { name: "John Doe", age: 33 },
                    { id: 3, name: "Jim Doe", age: 25 },
                    { id: 4, name: "Anne Smith", age: 35 }
                ],
                schema: {
                    model: { id: "id" }
                }
            }
        });
    </script>
```

## See Also

* [JavaScript API Reference of the Kendo UI for jQuery Grid](/api/javascript/ui/grid)
* [Row Pinning (Demo)](https://demos.telerik.com/kendo-ui/row-pinning)
* [Row Drag & Drop (Demo)](https://demos.telerik.com/kendo-ui/grid/drag-drop)
* [Row Resizing (Demo)](https://demos.telerik.com/kendo-ui/grid/row-resizing)
