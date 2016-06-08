---
title: Adaptive Rendering
page_title: Adaptive Rendering | Kendo UI Grid
description: "Learn how to apply the adaptive rendering feature of the Kendo UI Grid widget."
slug: adaptive_rendering_kendoui_grid_widget
position: 6
---

# Adaptive Rendering

As of the Kendo UI Q3 2013 release, the Grid widget supports adaptive enhancements, such as changes in styling and behavior, to provide consistency to the client device experience. For instance, when filtering or editing data on a mobile device, Kendo UI slides in a new screen for the user, which is a departure from the more desktop-like inline and popup behaviors. To see those features in action, check the [adaptive rendering demos](http://demos.telerik.com/kendo-ui/m/index#grid/adaptive).

## Getting Started

### Enable Adaptive Rendering

To enable the adaptive rendering feature, set the [`mobile`](/api/javascript/ui/grid#configuration-mobile) property to `true`, `phone`, or `tablet`.

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

The mobile pane in which the adaptive Grid is placed does not automatically expand its height. To add an adaptive Grid to a kendo UI mobile application, set the `stretch` configuration of the respective view to `true`, or explicitly define the height of the widget.

### Use the stretch Option

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
            mobile: "phone"
        };

        function onInit() {
            $("#grid").kendoGrid(gridConfig);
        }

        var app = new kendo.mobile.Application();
    </script>

### Use the height Option    

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

### Resize Columns

The column resizing feature on touch screen devices is triggered when the user holds a finger on the respective column header. When the resizing icon appears, the user is able to resize the column by dragging.

**Figure 1. Grid with resizable columns on a mobile device**

![](/controls/data-management/grid/adaptive-resizing-icon.png)

## Grid Specifics

### Apply Height and Position Styles to Parent Grid Elements

This section applies to the following cases:

* When multiple adaptive Grids are used on the same page.
* When the Grid is not the only content on the page.

Each adaptive Grid is rendered inside a separate mobile pane. Since the position of the panes is absolute, the panes overlap. To avoid this issue, wrap each Grid inside a `<div>` container that is relatively positioned and has a set height. The absolute position is required for the transition between main and edit views to work correctly.

The example below demonstrates how to add multiple adaptive Grids to the same page.

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

### Destroy the Adaptive Grid

When in adaptive mode, the Grid generates some auxiliary markup, which needs to be removed if the widget is to be [destroyed]({% slug destroywidgets_kendoui_gettingstarted %}) manually.

The recommended approach is to call [`kendo.destroy()`](/api/javascript/kendo#methods-destroy) over the closest `.km-pane-wrapper` ancestor of the Grid, which is created around the Grid widget. Then, remove the whole `.km-pane-wrapper` element from the DOM. To recreate the Grid, insert a new `<div>` at the same place where the previous Grid `<div>` was placed initially.

## See Also

Other articles on the Kendo UI Grid:

* [Blog Post for Building An Adaptive Grid and Scheduler for Kendo UI](http://blogs.telerik.com/kendoui/posts/13-10-10/building-an-adaptive-grid-and-scheduler-for-kendo-ui)
* [Grid JavaScript API Reference](/api/javascript/ui/grid)
* [Walkthrough of the Grid]({% slug walkthrough_kendoui_grid_widget %})
* [Editing Functionality]({% slug editing_kendoui_grid_widget %})
* [Appearance of the Grid]({% slug appearance_kendoui_grid_widget %})
* [Remote Data Binding]({% slug remote_data_binding_grid %})
* [Localization of Messages]({% slug localization_kendoui_grid_widget %})
* [Export the Grid to Excel]({% slug exporting_excel_kendoui_grid_widget %})
* [Export the Grid in PDF]({% slug exporting_pdf_kendoui_grid_widget %})
* [Print the Grid]({% slug exporting_pdf_kendoui_grid_widget %})

For how-to examples on the Kendo UI Grid widget, browse its [**How To** documentation folder]({% slug howto_bindto_telerik_backend_services_grid %}).
