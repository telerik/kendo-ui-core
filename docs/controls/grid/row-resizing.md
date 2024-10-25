---
title: Row Resizing
page_title: jQuery Grid Documentation - Row Resizing
description: "Get started with the jQuery Grid by Kendo UI and learn all about the Row Resizing feature."
slug: rowresize_kendoui_grid
position: 15
---

# Row Row Resizing

The Row Resizing functionality for the Grid enables you to resize one or more table rows.

For a runnable example, refer to the [demo on Row Resizing in the Grid](https://demos.telerik.com/kendo-ui/grid/row-resizing).

## Getting Started

To enable the Drag and Drop functionality, set the `resizable.rows` property to `true`.

    $("#grid").kendoGrid({
        resizable: {
            rows: true
        },
        // Other configuration.
     });

## Multiple Rows

The user can resize more than one row at the same time. To do so, set the [`selectable`](/api/javascript/ui/grid/cofiguration/selectable) property to `multiple row`. Once the user has made multiple selections, they can drag the resize handle on one of the rows and the resize will affect the rest of the selected elements automatically.

    $("#grid").kendoGrid({
        resizable: {
            rows: true
        },
        selectable: "multiple row",
        // Other configuration.
     });

## Row Resize Event

The [`rowResize`](/api/javascript/ui/grid/events/rowResize) event fires when the user resizes one or more rows.

    $("#grid").kendoGrid({
        resizable: {
            rows: true
        },
        selectable: "multiple row",
        rowResize: function(e) {
            // Execute logic when the user resizes a row.
        },
        // Other configuration.
     });

## Known Limitations

 * The row resize feature does not work with the [drag & drop]({% slug draganddrop_kendoui_grid_widget %}) functionality of the Grid. You can use only one of the two features at the same time.
 * In a [Hierarchical]({% slug hierarchy_kendoui_grid_widget %}) scenario, only the innermost child Grid(s) can have resizable rows. The row resizing feature must be disabled for all the parent Grid components.

## See Also

* [Row Resizing in the Kendo UI for jQuery Grid (Demo)](https://demos.telerik.com/kendo-ui/grid/row-resizing)
* [JavaScript API Reference of the Kendo UI for jQuery Grid](/api/javascript/ui/grid)

