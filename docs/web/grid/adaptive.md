---
title: Adaptive Rendering
page_title: Adaptive Rendering | Kendo UI Grid Widget
description: "Learn how to apply the adaptive rendering feature of the Kendo UI Grid widget."
slug: adaptive_rendering_kendoui_grid_widget
position: 6
---

# Adaptive Rendering

From Kendo UI Q3 2013 release onwards, the Grid widget supports "adaptive" enhancements like changes in styling and behavior in order to remain consistent with the client device experience. For instance, when filtering or editing data on a mobile device, Kendo UI slides in a new screen for the user, which is a departure from the more desktop-like inline and popup behaviors. To see those features in action, check the [adaptive rendering demos](http://demos.telerik.com/kendo-ui/m/index#grid/adaptive).

## Enable Adaptive Rendering

To enable the adaptive rendering feature, set the [`mobile`](/api/javascript/ui/grid#configuration-mobile) propery to `true`, `phone` or `tablet`.

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

## Add Multiple Grids to a Page

Each adaptive Grid is rendered inside a separate mobile Pane. Since the position of the Panes is absolute, the Panes overlap. To avoid this issue, wrap each grid inside a `<div>` container that is relatively positioned and has a set height. The absolute position is required for the transition between main and edit views to work correctly.

###### Example - add multiple adaptive Grids to the same page

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

## Add to Mobile Applications

The mobile pane in which the adaptive Grid is placed will not automatically expand in height. To add an adaptive Grid to a kendo UI mobile aplication, set the `stretch` configuration of the respective view to `true`, or explicitly define the height of the widget.

###### Example - use the `stretch` option

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
            mobile: "phone"
        };

        function onInit() {
            $("#grid").kendoGrid(gridConfig);
        }

        var app = new kendo.mobile.Application();
    </script>

###### Example - use the `height` option

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

## Column Resize on Mobile Devices

The column resizing feature on touch screen devices is triggered when the user holds a finger on the respective column header. When the resizing icon appears, the user will be able to resize the column by dragging.

![](/web/grid/adaptive-resizing-icon.png)

## See Also

Other articles on Kendo UI Grid:

* [Blog Post for Building An Adaptive Grid and Scheduler for Kendo UI](http://blogs.telerik.com/kendoui/posts/13-10-10/building-an-adaptive-grid-and-scheduler-for-kendo-ui)
* [JavaScript API Reference](/api/javascript/ui/grid)
* [Walkthrough of the Grid]({% slug walkthrough_kendoui_grid_widget %})
* [Remote Data Binding]({% slug remote_data_binding_grid %})
* [Editing Functionality]({% slug editing_kendoui_grid_widget %})
* [Localization of Messages]({% slug localization_kendoui_grid_widget %})
* [Exporting Content to Excel]({% slug exporting_excel_kendoui_grid_widget %})
* [Printing Your Grid]({% slug printing_kendoui_grid %})