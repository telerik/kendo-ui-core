---
title: Making Delete Key Trigger Dependency Line Deletion Dialog in Kendo UI for jQuery Gantt
description: Learn how to configure the Delete key to trigger the dependency line deletion dialog in Kendo UI for jQuery Gantt after upgrading to version 2024.3.1015.
type: how-to
page_title: Triggering Dependency Line Deletion Dialog with Delete Key in Kendo UI for jQuery Gantt
meta_title: Triggering Dependency Line Deletion Dialog with Delete Key in Kendo UI for jQuery Gantt
slug: delete-key-trigger-dependency-line-dialog-kendo-ui-jquery-gantt
tags: gantt, kendo-ui-for-jquery, dependencyDestroy, delete-key, keyboard-navigation
res_type: kb
components: ["gantt"]
ticketid: 1684404
---

## Environment

<table>
<tbody>
<tr>
<td> Product </td>
<td>
Kendo UI for jQuery Gantt
</td>
</tr>
<tr>
<td> Version </td>
<td> 2023.2.718 and later</td>
</tr>
</tbody>
</table>

## Description

After upgrading Kendo UI for jQuery Gantt, pressing the Delete key on a selected dependency line no longer triggers the deletion dialog, even when the [`dependencyDestroy`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/gantt/configuration/editable.dependencydestroy) option is set to true. 

This knowledge base article also answers the following questions:
- How to enable dependency line deletion dialog triggered by the Delete key in Kendo UI for jQuery Gantt?
- Why does pressing Delete on a dependency line not work in newer versions of Kendo UI for jQuery?
- How to fix Delete key behavior for dependency line deletion in Kendo UI for jQuery Gantt?

## Solution

The behavior change is due to the Enhanced ARIA and Keyboard Navigation support introduced in Kendo UI R2 2023 SP1 (version 2023.2.718). To restore the previous Delete key functionality for dependency lines, use the workaround provided below.

### Steps to Implement Workaround

1. Attach a custom event listener to the Gantt widget's keyboard actions.
2. Detect the Delete key press and the selection of a dependency line.
3. Use the [`removeDependency`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/gantt/methods/removedependency) method to trigger the removal of the selected dependency line.

Here is an example implementation using the latest version:

```dojo

    <div id="example">
      <div id="gantt"></div>

      <script>
        function tabIndex(target) {
          target = target;

          var element = target,
            TABINDEX = "tabindex",
            tabindex = target.attr(TABINDEX) || element.attr(TABINDEX);

          element.removeAttr(TABINDEX);
          target.attr(TABINDEX, !isNaN(tabindex) ? tabindex : 0);
        }

        $(document).ready(function () {
          var serviceRoot = "https://demos.telerik.com/service/v2/core";
          var tasksDataSource = new kendo.data.GanttDataSource({
            transport: {
              read: {
                url: serviceRoot + "/GanttTasks",
              },
              update: {
                url: serviceRoot + "/GanttTasks/Update",
                type: "POST",
                contentType: "application/json",
                timeout: 5000,
              },
              destroy: {
                url: serviceRoot + "/GanttTasks/Destroy",
                type: "POST",
                contentType: "application/json",
                timeout: 5000,
              },
              create: {
                url: serviceRoot + "/GanttTasks/Create",
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
                    nullable: true,
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
            error: function (ev) {
              ev.sender.cancelChanges();
              kendo.alert(
                "Task was not Created, Updated or Destroyed properly!</br></br>" +
                  "If you are using this service for local demo or in dojo consider <a href='https://github.com/telerik/kendo-ui-demos-service/tree/master/demos-and-odata-v3'>downloading and running the service locally</a>.</br>" +
                  "And make sure to set the <a href='https://github.com/telerik/kendo-ui-demos-service/blob/master/demos-and-odata-v3/KendoCRUDService/Models/Gantt/GanttTaskRepository.cs#L12'>UpdateDatabase</a> flag to true.",
              );
            },
          });

          var dependenciesDataSource = new kendo.data.GanttDependencyDataSource(
            {
              transport: {
                read: {
                  url: serviceRoot + "/GanttDependencies",
                },
                update: {
                  url: serviceRoot + "/GanttDependencies/Update",
                  type: "POST",
                  contentType: "application/json",
                },
                destroy: {
                  url: serviceRoot + "/GanttDependencies/Destroy",
                  type: "POST",
                  contentType: "application/json",
                },
                create: {
                  url: serviceRoot + "/GanttDependencies/Create",
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
            },
          );

          var gantt = $("#gantt")
            .kendoGantt({
              dataSource: tasksDataSource,
              dependencies: dependenciesDataSource,
              views: ["day", { type: "week", selected: true }, "month"],
              columns: [
                { field: "id", title: "ID", width: 60 },
                {
                  field: "title",
                  title: "Title",
                  editable: true,
                  sortable: true,
                },
                {
                  title: "Timings",
                  columns: [
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
                },
              ],
              height: 700,
              showWorkHours: false,
              showWorkDays: false,
              snap: false,
            })
            .data("kendoGantt");

          tabIndex($(".k-gantt-timeline"));

          $(document).bind("kendo:skinChange", function () {
            gantt.refresh();
          });
        });
      </script>
    </div>
```


## See Also

- [Kendo UI for jQuery Gantt Documentation](https://www.telerik.com/kendo-jquery-ui/documentation/controls/gantt/overview)
- [Kendo UI Gantt Dependencies API](https://docs.telerik.com/kendo-ui/api/javascript/ui/gantt)
