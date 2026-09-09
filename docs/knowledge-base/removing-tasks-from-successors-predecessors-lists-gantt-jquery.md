---
title: Removing Tasks from Successors/Predecessors Lists in Gantt Popup Editor
description: Learn how to filter tasks, excluding summary tasks, in the Successors/Predecessors tabs of the Kendo UI for jQuery Gantt popup editor.
type: how-to
page_title: Filter Tasks in Successors/Predecessors Tabs in Gantt Popup Editor
meta_title: Filter Tasks in Successors/Predecessors Tabs in Gantt Popup Editor
slug: removing-tasks-from-successors-predecessors-lists-gantt-jquery
tags: gantt,kendo-ui-for-jquery, predecessors, successors,popup-editor, customization
res_type: kb
ticketid: 1716133
---

## Environment

<table>
<tbody>
<tr>
<td> Product </td>
<td>
Gantt for Kendo UI for jQuery
</td>
</tr>
<tr>
<td> Version </td>
<td>
2026.2.520
</td>
</tr>
</tbody>
</table>

## Description

In Kendo UI for jQuery Gantt, the popup editor for the Successors and Predecessors tabs does not provide a built-in option to filter tasks. To prevent users from creating dependencies with summary tasks, you can customize the pop-up editor to remove summary tasks from the available list.

This knowledge base article also answers the following questions:
- How do I filter summary tasks in the Gantt popup editor?
- How can I remove summary tasks from the Successors/Predecessors tabs in Kendo Gantt?
- How to restrict dependencies with summary tasks in Kendo UI for jQuery Gantt?

## Solution

To remove summary tasks from the Successors and Predecessors tabs in the Gantt popup editor, follow these steps:

1. Use the [`edit`](/api/ui/gantt/events/edit) event of the Gantt widget to access the popup editor when it opens.

2. Collect the IDs of all tasks marked as `summary: true` from the main Gantt data source.

3. Access the Kendo UI Grid instances used in the Predecessors and Successors tabs. Filter out rows referencing summary tasks and assign the filtered data back to the grid.

Here is the implementation:

```javascript
$("#gantt").kendoGantt({
  dataSource: ganttDataSource,
  dependencies: ganttDependencies,
  columns: [...],
  edit: function(e) {
    // Collect IDs of summary tasks
    var summaryIds = e.sender.dataSource.data()
      .filter(function(task) { return task.summary === true; })
      .map(function(task) { return task.id; });

    // Access the Predecessors tab grid
    var predecessorsGrid = e.container.find(".k-predecessors .k-grid").data("kendoGrid");
    if (predecessorsGrid) {
      var filteredPredecessors = predecessorsGrid.dataSource.data().filter(function(dependency) {
        return summaryIds.indexOf(dependency.predecessorId) === -1;
      });
      predecessorsGrid.dataSource.data(filteredPredecessors);
    }

    // Access the Successors tab grid
    var successorsGrid = e.container.find(".k-successors .k-grid").data("kendoGrid");
    if (successorsGrid) {
      var filteredSuccessors = successorsGrid.dataSource.data().filter(function(dependency) {
        return summaryIds.indexOf(dependency.successorId) === -1;
      });
      successorsGrid.dataSource.data(filteredSuccessors);
    }
  }
});
```

### Example:

```dojo
<div id="gantt"></div>
    <script>
      function filterDependencyGrid(selector, fieldName, summaryIds) {
        var grid = $(selector).data("kendoGrid");
        var rows;

        if (!grid) {
          return;
        }

        rows = grid.dataSource
          .data()
          .toJSON()
          .filter(function (item) {
            return summaryIds.indexOf(item[fieldName]) === -1;
          });

        grid.dataSource.data(rows);
      }

      $("#gantt").kendoGantt({
        views: ["day", { type: "week", selected: true }],
        columns: [
          {
            field: "id",
            title: "ID",
            sortable: true,
            editable: false,
            width: 30,
          },
          {
            field: "title",
            title: "Title",
            sortable: true,
            editable: true,
            width: 150,
          },
          {
            field: "start",
            title: "Start Time",
            sortable: true,
            editable: true,
            format: "{0:MM/dd/yyyy HH:mm}",
            width: 100,
          },
          {
            field: "end",
            title: "End Time",
            sortable: true,
            editable: true,
            format: "{0:MM/dd/yyyy HH:mm}",
            width: 100,
          },
        ],
        showWorkHours: false,
        showWorkDays: false,
        listWidth: "30%",
        dataSource: [
          {
            id: 1,
            title: "Planning Summary",
            summary: true,
            percentComplete: 0.4,
            start: new Date("2026/6/17 9:00"),
            end: new Date("2026/6/20 17:00"),
          },
          {
            id: 2,
            title: "Requirements",
            percentComplete: 0.6,
            start: new Date("2026/6/17 9:00"),
            end: new Date("2026/6/19 17:00"),
          },
          {
            id: 3,
            title: "Design",
            percentComplete: 0.45,
            start: new Date("2026/6/18 9:00"),
            end: new Date("2026/6/20 12:00"),
          },
          {
            id: 4,
            title: "Implementation Summary",
            summary: true,
            percentComplete: 0.3,
            start: new Date("2026/6/20 9:00"),
            end: new Date("2026/6/24 17:00"),
          },
          {
            id: 5,
            title: "API Build",
            percentComplete: 0.65,
            start: new Date("2026/6/20 8:00"),
            end: new Date("2026/6/23 18:00"),
          },
          {
            id: 6,
            title: "UI Build",
            percentComplete: 0.75,
            start: new Date("2026/6/21 8:00"),
            end: new Date("2026/6/24 11:00"),
          },
          {
            id: 7,
            title: "QA Summary",
            summary: true,
            percentComplete: 0.2,
            start: new Date("2026/6/24 9:00"),
            end: new Date("2026/6/27 17:00"),
          },
          {
            id: 8,
            title: "Regression Testing",
            percentComplete: 0.5,
            start: new Date("2026/6/24 8:00"),
            end: new Date("2026/6/26 18:00"),
          },
          {
            id: 9,
            title: "Release",
            percentComplete: 0.9,
            start: new Date("2026/6/26 10:00"),
            end: new Date("2026/6/28 18:00"),
          },
        ],
        dependencies: {
          data: [
            { id: 1, predecessorId: 1, successorId: 3, type: 1 },
            { id: 2, predecessorId: 2, successorId: 3, type: 1 },
            { id: 3, predecessorId: 3, successorId: 4, type: 1 },
            { id: 4, predecessorId: 3, successorId: 5, type: 1 },
            { id: 5, predecessorId: 4, successorId: 6, type: 1 },
            { id: 6, predecessorId: 5, successorId: 6, type: 1 },
            { id: 7, predecessorId: 6, successorId: 7, type: 1 },
            { id: 8, predecessorId: 6, successorId: 8, type: 1 },
            { id: 9, predecessorId: 7, successorId: 9, type: 1 },
            { id: 10, predecessorId: 8, successorId: 9, type: 1 },
          ],
        },
        edit: function (e) {
          var summaryIds = e.sender.dataSource
            .data()
            .filter(function (task) {
              return task.summary === true;
            })
            .map(function (task) {
              return task.id;
            });

          if (!summaryIds.length) {
            return;
          }

          setTimeout(function () {
            filterDependencyGrid(
              ".k-gantt-predecessors.k-grid",
              "predecessorId",
              summaryIds,
            );
            filterDependencyGrid(
              ".k-gantt-successors.k-grid",
              "successorId",
              summaryIds,
            );
          }, 0);
        },
      });
    </script>
```

## See Also

- [Kendo UI for jQuery Gantt Documentation](https://www.telerik.com/kendo-jquery-ui/documentation/controls/gantt/overview)
- [Kendo UI for jQuery Gantt API](https://www.telerik.com/kendo-jquery-ui/documentation/api/ui/gantt)
- [Kendo UI Grid Documentation](https://www.telerik.com/kendo-jquery-ui/documentation/controls/grid/overview)
```
