---
title: Adaptive rendering
page_title: Detailed documentation for Kendo UI Grid Adaptive rendering
description: This help article explains the specifications of Grid's adaptive rendering feature
position: 5
---

# Grid adaptive rendering

With the Q3 release, Kendo Grid supports "adaptive" enhancements like changes in styling and behavior in order to remain consistent with a device experience. 
For instance, when filtering or editing data on a mobile device, Kendo UI will slide in a new screen for the user, which is a departure from the more desktop-like inline and popup behaviors. 
In order to see those features in action please check the [adaptive rendering demos](http://demos.telerik.com/kendo-ui/grid/adaptive).

## Enabling the adaptive rendering feature

To enable the adaptive rendering feature the developer should set [mobile](/api/web/grid#configuration-mobile) propery to `true`, `phone` or `tablet`.

#### Example
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

## Adding multiple adaptive Grids to the same page

Each adaptive grid is rendered inside a separate mobile Pane. Since the pane's are absolutely positioned they do overlap.
The solution in this case is to wrap each grid inside a `<div>` container that is **relatively positioned** and **have a set height**.
As a general information, the absolute position is required in order transitions between main and edit views to work correctly.

#### Example - adding multiple adaptive Grids on the same page
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

## Adding adaptive Grid to Kendo UI Mobile application

The mobile pane in which adaptive Grid is placed will **not** expand in height automatically. The developer should set the `stretch` configuration of the respective View to true or to define explicitly the widget's height.

#### Example - using the stretch option
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

#### Example - using the height option
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

## Using the column resize feature of the Grid on mobile device

Column resizing feature on touch screen devices is triggered when the user holds a finger on the respective column header. When the resizing icon appears the user will be able to resize the column with dragging.

![](/web/grid/adaptive-resizing-icon.png)


## Further reading

- Blog post: [Building An Adaptive Grid and Scheduler for Kendo UI](http://blogs.telerik.com/kendoui/posts/13-10-10/building-an-adaptive-grid-and-scheduler-for-kendo-ui)
