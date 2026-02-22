---
title: Colorize Gantt Tasks
page_title: Add Color to the Gantt Tasks
description: "Learn how to colorize tasks in the Kendo UI for jQuery Gantt component."
slug: howto_colorize_tasks_gantt
previous_url: /controls/scheduling/gantt/how-to/colorizing-tasks
tags: telerik, kendo, jquery, gantt, colorize, tasks
type: how-to
res_type: kb
components: ["gantt"]
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Gantt for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio Version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I colorize each task based on a condition in the Kendo UI for jQuery Gantt?

## Solution

The following example demonstrates how to achieve the desired behavior.

```dojo
     <div id="gantt"></div>

    <script>
      function onDataBound() {
        var gantt = this;

        gantt.element.find(".k-task").each(function (e) {
          var dataItem = gantt.dataSource.getByUid($(this).attr("data-uid"));

          // Colorize the task per business requirement.
          if (dataItem.percentComplete < 0.5) {
            this.style.backgroundColor = "#f99";
          } else {
            this.style.backgroundColor = "#9f9";
          }
        });
      }

      $(document).ready(function () {
        var tasksDataSource = new kendo.data.GanttDataSource({
          batch: false,
          transport: {
            read: {
              url: "https://demos.telerik.com/service/v2/core/GanttTasks",
            },
            update: {
              url: "https://demos.telerik.com/service/v2/core/GanttTasks/Update",
              type: "POST",
              contentType: "application/json",
              timeout: 5000,
            },
            destroy: {
              url: "https://demos.telerik.com/service/v2/core/GanttTasks/Destroy",
              type: "POST",
              contentType: "application/json",
              timeout: 5000,
            },
            create: {
              url: "https://demos.telerik.com/service/v2/core/GanttTasks/Create",
              type: "POST",
              contentType: "application/json",
              timeout: 5000,
            },
            parameterMap: function (options, operation) {
              if (operation !== "read") {
                return kendo.stringify(options.models || [options]);
              }
            },
          },
          schema: {
            model: {
              id: "id",
              fields: {
                id: { from: "ID", type: "number" },
                orderId: {
                  from: "OrderID",
                  type: "number",
                  validation: { required: true },
                },
                parentId: {
                  from: "ParentID",
                  type: "number",
                  defaultValue: null,
                },
                start: { from: "Start", type: "date" },
                end: { from: "End", type: "date" },
                title: { from: "Title", defaultValue: "", type: "string" },
                percentComplete: { from: "PercentComplete", type: "number" },
                summary: { from: "Summary", type: "boolean" },
                expanded: {
                  from: "Expanded",
                  type: "boolean",
                  defaultValue: true,
                },
              },
            },
          },
        });

        var dependenciesDataSource = new kendo.data.GanttDependencyDataSource({
          transport: {
            read: {
              url: "https://demos.telerik.com/service/v2/core/GanttDependencies",
            },
            update: {
              url: "https://demos.telerik.com/service/v2/core/GanttDependencies/Update",
              type: "POST",
              contentType: "application/json",
            },
            destroy: {
              url: "https://demos.telerik.com/service/v2/core/GanttDependencies/Destroy",
              type: "POST",
              contentType: "application/json",
            },
            create: {
              url: "https://demos.telerik.com/service/v2/core/GanttDependencies/Create",
              type: "POST",
              contentType: "application/json",
            },
            parameterMap: function (options, operation) {
              if (operation !== "read") {
                return kendo.stringify(options.models || [options]);
              }
            },
          },
          schema: {
            model: {
              id: "id",
              fields: {
                id: { from: "ID", type: "number" },
                predecessorId: { from: "PredecessorID", type: "number" },
                successorId: { from: "SuccessorID", type: "number" },
                type: { from: "Type", type: "number" },
              },
            },
          },
        });

        $("#gantt").kendoGantt({
          dataSource: tasksDataSource,
          dependencies: dependenciesDataSource,
          views: ["day", { type: "week", selected: true }, "month"],
          columns: [
            { field: "id", title: "ID", width: 50 },
            { field: "title", title: "Title", editable: true, sortable: true },
            {
              field: "start",
              title: "Start Time",
              format: "{0:MM/dd/yyyy}",
              width: 100,
              editable: true,
              sortable: true,
            },
            {
              field: "end",
              title: "End Time",
              format: "{0:MM/dd/yyyy}",
              width: 100,
              editable: true,
              sortable: true,
            },
          ],
          height: 700,

          showWorkHours: false,
          showWorkDays: false,

          snap: false,

          dataBound: onDataBound,
        });
      });
    </script>
```

## See Also

* [Basic Usage of the Gantt (Demo)](https://demos.telerik.com/kendo-ui/gantt/index)
* [JavaScript API Reference of the Gantt](/api/javascript/ui/gantt)
