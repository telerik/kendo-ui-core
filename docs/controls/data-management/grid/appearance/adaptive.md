---
title: Adaptive Rendering
page_title: Adaptive Rendering | Kendo UI Grid
description: "Learn how to apply the adaptive rendering feature of the Kendo UI Grid for jQuery."
previous_url: /controls/data-management/grid/adaptive
slug: adaptive_rendering_kendoui_grid_widget
position: 7
---

# Adaptive Rendering

The Kendo UI Grid for jQuery provides consistency to the customer experience on any device by supporting adaptive enhancements.

For example, when you filter or edit data on mobile, Kendo UI slides in a new screen for the user, which is a departure from the desktop-like inline and popup behaviors. To see these features in action, refer to the [adaptive rendering demos](http://demos.telerik.com/kendo-ui/m/index#grid/adaptive).

## Getting Started

### Prerequisites

The Kendo UI adaptive mode requires scripts, which are normally part of the Kendo UI Mobile (Hybrid) library (`kendo.mobile.min.js`). However, these scripts are also included in `kendo.web.min.js` and `kendo.all.min.js`. If you are using [individual widget scripts]({% slug include_only_what_you_need_kendoui_installation %}#individual-widget-scripts) or a [custom combined script]({% slug include_only_what_you_need_kendoui_installation %}#employ-download-builder), make sure the relevant scripts are included.

### Enabling Adaptive Rendering

To enable the adaptive rendering feature, set the [`mobile`](/api/javascript/ui/grid/configuration/mobile) property to `true`, `phone`, or `tablet`.

###### Example

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
       columnMenu: true,
       mobile: true
    });
    </script>

## Pane Configuration

The mobile pane in which the adaptive Grid is placed does not automatically expand its height. To add an adaptive Grid to a Kendo UI mobile application, set the `stretch` configuration of the respective view to `true` and apply an `auto` height to the Grid. Alternatively, define an explicit pixel Grid height and omit the pane `stretch` option.

### Stretching

The following example demonstrates how to apply the `stretch` option.

###### Example

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
            height: "auto"
        };

        function onInit() {
            $("#grid").kendoGrid(gridConfig);
        }

        var app = new kendo.mobile.Application();
    </script>

### Setting the Height

The following example demonstrates how to apply the `height` option.

###### Example

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

        function onInit() {
            $("#grid").kendoGrid(gridConfig);
        }

        var app = new kendo.mobile.Application();
    </script>

### Resizing Columns

The column resizing feature on touch screen devices is triggered when the user holds a finger on the respective column header. When the resizing icon appears, the user is able to resize the column by dragging.

**Figure 1: Grid with resizable columns on a mobile device**

![Grid Resizable Columns on Mobile](adaptive-resizing-icon.png)

## Grid Specifics

### Applying Styles to Parent Grid Elements

When you apply the height and position styles to parent Grid elements, note that this section applies to the following cases:

* When multiple adaptive Grids are used on the same page.
* When the Grid is not the only content on the page.

Each adaptive Grid is rendered inside a separate mobile pane. Because the position of the panes is absolute, the panes overlap. To avoid this behavior, wrap each Grid inside a `<div>` container that is relatively positioned and has a set height. The absolute position is required for the transition between main and edit views to work correctly.

The following example demonstrates how to add multiple adaptive Grids to the same page.

###### Example

    <div class="adaptive-grid-wrapper">
        <div id="grid1"></div>
    </div>

    <div class="adaptive-grid-wrapper">
        <div id="grid2"></div>
    </div>
    <style>
        .adaptive-grid-wrapper {
            position: relative;
            height: 130px;
         }
    </style>
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
            mobile: "phone"
        };

        $("#grid1").kendoGrid(gridConfig);
        $("#grid2").kendoGrid(gridConfig);
    </script>

### Destroying Adaptive Grids

When in adaptive mode, the Grid generates some auxiliary markup, which needs to be removed if the widget is to be [destroyed]({% slug destroywidgets_kendoui_gettingstarted %}) manually.

The recommended approach is to call [`kendo.destroy()`](/api/javascript/kendo/methods/destroy) over the closest `.km-pane-wrapper` ancestor of the Grid, which is created around the Grid widget. Then, remove the whole `.km-pane-wrapper` element from the DOM. To recreate the Grid, insert a new `<div>` at the same place where the previous Grid `<div>` was placed initially.

## See Also

* [Grid JavaScript API Reference](/api/javascript/ui/grid)
* [Kendo UI Knowledge Base](/knowledge-base)
