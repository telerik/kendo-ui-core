---
title: Planned vs Actual
page_title: jQuery Gantt Documentation | Planned vs Actual
description: "Get started with the jQuery Gantt by Kendo UI and learn more about how it displays planned and actual dates."
slug: planned_vs_actual_kendoui_gantt
position: 5
---

# Planned vs Actual

The `Planned vs Actual` functionality of the Gantt allows you to compare actual `start` and `end` dates to originaly planned dates. If the actual completion date of a task matches the planned end time date, the default task appearance is used. In the scenarios listed below, when there is a difference between an actual and a planned date, the Gantt visualizes it by changing the appearance of the task:

* The actual `end` date of the task is before the planned `end` date - the task is colored green.
* The actual `end` date of the task is after the planned `end` date - a hatched bar that marks the delay is rendered in the task. 
* The actual `start` date of the task is after the planned `end` date - the task is colored red.

For a full example of the Planned vs Actual functionality, refer to the [Planned vs Actual Demo](https://demos.telerik.com/kendo-ui/gantt/planned-vs-actual)

## Configuration

The example below demonstrates how to configure the Gantt to display planned and actual dates.

    <div id="gantt"></div>
    <script>
      var gantt = $("#gantt").kendoGantt({
        dataSource: tasksDataSource,
        views: [
            "day",
            { type: "week", selected: true },
            "month"
        ],
        columns: [
            { field: "title", title: "Title", editable: true, sortable: true, width: 200 },
            { field: "start", title: "Actual Start Date", format: "{0:M/d/yyyy}", width: 85 },
            { field: "end", title: "Actual End Date", format: "{0:M/d/yyyy}", width: 85 },
            { field: "plannedStart", title: "Planned Start Date", format: "{0:M/d/yyyy}", width: 85 },
            { field: "plannedEnd", title: "Planned End Date", format: "{0:M/d/yyyy}", width: 85 },
        ],
        showPlannedTasks: true,
        toolbar: [
            "plannedTasks"
        ],
        editable: { plannedTasks: true },
        snap: false
      }).data("kendoGantt");
    </script>

The `plannedTasks` tool set in the `toolbar` option enables a switch in the toolbar of the Gantt that allows toggling the `Planned vs Actual` functionality. 

The `showPlannedTasks` configuration controls whether planned dates will be shown initially.

Through the `editable` configuration, you can allow or prevent editing of planned tasks.

## See Also

* [Gantt Data Binding]({% slug databinding_kendoui_gantt %})
* [Planned vs Actual (Demo)](https://demos.telerik.com/kendo-ui/gantt/planned-vs-actual)
* [JavaScript API Reference of the Gantt](/api/javascript/ui/gantt)
