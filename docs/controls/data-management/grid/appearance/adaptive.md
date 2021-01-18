---
title: Adaptive Rendering
page_title: jQuery Grid Documentation | Adaptive Rendering
description: "Get started with the jQuery Grid by Kendo UI which provides consistency to the customer experience on any device by supporting adaptive rendering."
previous_url: /controls/data-management/grid/adaptive
slug: adaptive_rendering_kendoui_grid_widget
position: 5
---

# Adaptive Rendering

The Kendo UI Grid for jQuery provides consistency to the customer experience on any device by supporting adaptive enhancements.

For example, when you filter or edit data on mobile, Kendo UI slides in a new screen for the user, which is a departure from the desktop-like inline and popup behaviors. To see these features in action, refer to the [adaptive rendering demo](https://demos.telerik.com/kendo-ui/grid/adaptive-rendering).

## Enabling Responsive Design

To enable the adaptive rendering feature, set the [`mobile`](/api/javascript/ui/grid/configuration/mobile) property to `true` or `"phone"`:

* If set to `true`, the widget will use adaptive rendering when viewed on a mobile browser.
* If set to `"phone"`, the widget will be forced to use adaptive rendering regardless of the browser type.

> Important: With the mobile rendering, we recommend to set up the `height` option as well. Without setting an explicit height, every view of the grid might have a different height.

```dojo
<div id="grid"></div>

<script>
    $("#grid").kendoGrid({
        columns: [
            { field: "name" },
            { field: "age" },
            { command: "destroy" }
        ],
        dataSource: [
            { name: "Jane Doe", age: 30 },
            { name: "John Doe", age: 33 }
        ],
        filterable: true,
        editable: true,
        columnMenu: true,
        height: 550,
        mobile: "phone"
    });
</script>
```

## Configuring Panes on Mobile

The mobile pane in which the adaptive Grid is placed does not automatically expand its height. To add an adaptive Grid to a Kendo UI mobile application, set the `stretch` configuration of the respective view to `true` and apply `100%` height to the Grid. Alternatively, define an explicit pixel Grid height and omit the pane `stretch` option.

> Important: When the Adaptive Rendering of the Grid is used in a Kendo mobile Application, apply one of our [Less-based themes]({% slug themesandappearnce_kendoui_desktopwidgets %}).

The following example demonstrates how to apply the `stretch` option.

```
<div id="foo" data-role="view" data-init="onInit" data-stretch="true">
    <div id="grid"></div>
</div>

<script>
    var gridConfig = {
        columns: [
            { field: "name" },
            { field: "age" },
            { command: "destroy" }
        ],
        dataSource: [
            { name: "Jane Doe", age: 30 },
            { name: "John Doe", age: 33 }
        ],
        filterable: true,
        columnMenu: true,
        mobile: "phone",
        height: "100%"
    };

    function onInit() {
        $("#grid").kendoGrid(gridConfig);
    }

    var app = new kendo.mobile.Application();
</script>
```

The following example demonstrates how to apply the `height` option.

```
<div id="foo" data-role="view" data-init="onInit">
    <div id="grid"></div>
</div>

<script>
    var gridConfig = {
        columns: [
            { field: "name" },
            { field: "age" },
            { command: "destroy" }
        ],
        dataSource: [
            { name: "Jane Doe", age: 30 },
            { name: "John Doe", age: 33 }
        ],
        filterable: true,
        columnMenu: true,
        mobile: "phone",
        height: "140px" //grid will be 140px height
    };

    $("#grid").kendoGrid(gridConfig);
</script>
```

### Resizing of Columns

The column resizing feature on touch screen devices is triggered when the user holds a finger on the respective column header. When the resizing icon appears, the user can resize the column by dragging.

**Figure 1: A Grid with resizable columns on a mobile device**

![Grid Resizable Columns on Mobile](adaptive-resizing-icon.png)

## Destroying Adaptive Grids

When in adaptive mode, the Grid generates auxiliary markup which needs to be removed if the widget is to be [destroyed]({% slug destroywidgets_kendoui_gettingstarted %}) manually.

To manually destroy the Grid:

1. Call [`kendo.destroy()`](/api/javascript/kendo/methods/destroy) over the closest `.k-pane-wrapper` ancestor which is created around the Grid widget.
1. Remove the whole `.k-pane-wrapper` element from the DOM.

To re-create the Grid, insert a new `<div>` at the same place where the previous Grid `<div>` was initially placed.

## See Also

* [Implementing Responsive Columns in the Grid (Demo)](https://demos.telerik.com/kendo-ui/grid/responsive-columns)
* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
* [Knowledge Base Section](/knowledge-base)
