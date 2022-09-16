---
title: Select Task On Click of Expand or Collapse Icon
description: An example on how to implement a functionality to select the task when clicking on the expand or collapse icon.
type: how-to
page_title: Implement Task Selection on Click of Expand or Collapse icon | Kendo UI Gantt for jQuery
slug: select-gantt-task-on-expand-collapse
tags: kendo, kendoui, gantt, select, expand, collapse, task, icon, click
ticketid: 1483656
res_type: kb
---

## Environment

<table>
    <tr>
        <td>Product</td>
        <td>Progress Kendo UI Gantt</td>
    </tr>
    <tr>
        <td>Product Version</td>
        <td>2020.3.1021</td>
    </tr>
</table>


## Description

I want to be able to click on the expand/collapse icon of the parent task and select the current row.

## Solution

1. [Attach an event handler](/api/javascript/data/model/methods/bind) to the [expand](/api/javascript/ui/treelist/methods/expand) and [collapse](/api/javascript/ui/treelist/methods/collapse) events of the built-in TreeList.
1. Get a reference to the current row.
1. Use the Gantt [select method](https://docs.telerik.com/kendo-ui/api/javascript/ui/gantt/methods/select) to select the current row.

```
    gantt.list.bind('expand',function(e){
        gantt.select(this.element.find('[data-uid="'+e.model.uid+'"]'));
    });

    gantt.list.bind('collapse',function(e){
        gantt.select(this.element.find('[data-uid="'+e.model.uid+'"]'));
    });
```

## Example

```dojo

    <div id="gantt"></div>

    <script>
        $(document).ready(function() {
            var serviceRoot = "https://demos.telerik.com/kendo-ui/service";
            var tasksDataSource = new kendo.data.GanttDataSource({
            transport: {
                read: {
                url: serviceRoot + "/GanttTasks",
                dataType: "jsonp"
                },
                update: {
                url: serviceRoot + "/GanttTasks/Update",
                dataType: "jsonp"
                },
                destroy: {
                url: serviceRoot + "/GanttTasks/Destroy",
                dataType: "jsonp"
                },
                create: {
                url: serviceRoot + "/GanttTasks/Create",
                dataType: "jsonp"
                },
                parameterMap: function(options, operation) {
                if (operation !== "read") {
                    return { models: kendo.stringify(options.models || [options]) };
                }
                }
            },
            schema: {
                model: {
                id: "id",
                fields: {
                    id: { from: "ID", type: "number" },
                    orderId: { from: "OrderID", type: "number", validation: { required: true } },
                    parentId: { from: "ParentID", type: "number", defaultValue: null, validation: { required: true } },
                    start: { from: "Start", type: "date" },
                    end: { from: "End", type: "date" },
                    title: { from: "Title", defaultValue: "", type: "string" },
                    percentComplete: { from: "PercentComplete", type: "number" },
                    summary: { from: "Summary", type: "boolean" },
                    expanded: { from: "Expanded", type: "boolean", defaultValue: true }
                }
                }
            }
        });

        var dependenciesDataSource = new kendo.data.GanttDependencyDataSource({
            transport: {
                read: {
                url: serviceRoot + "/GanttDependencies",
                dataType: "jsonp"
                },
                update: {
                url: serviceRoot + "/GanttDependencies/Update",
                dataType: "jsonp"
                },
                destroy: {
                url: serviceRoot + "/GanttDependencies/Destroy",
                dataType: "jsonp"
                },
                create: {
                url: serviceRoot + "/GanttDependencies/Create",
                dataType: "jsonp"
                },
                parameterMap: function(options, operation) {
                if (operation !== "read") {
                    return { models: kendo.stringify(options.models || [options]) };
                }
                }
            },
            schema: {
                model: {
                id: "id",
                fields: {
                    id: { from: "ID", type: "number" },
                    predecessorId: { from: "PredecessorID", type: "number" },
                    successorId: { from: "SuccessorID", type: "number" },
                    type: { from: "Type", type: "number" }
                }
                }
            }
            });

            var gantt = $("#gantt").kendoGantt({
            dataSource: tasksDataSource,
            dependencies: dependenciesDataSource,
            views: [
                "day",
                { type: "week", selected: true },
                "month"
            ],
            columns: [
                { field: "id", title: "ID", width: 60 },
                { field: "title", title: "Title", editable: true, sortable: true },
                { field: "start", title: "Start Time", format: "{0:MM/dd/yyyy}", width: 100, editable: true, sortable: true },
                { field: "end", title: "End Time", format: "{0:MM/dd/yyyy}", width: 100, editable: true, sortable: true }
            ],
            height: 700,
            showWorkHours: false,
            showWorkDays: false,
            snap: false
            }).data("kendoGantt");


            gantt.list.bind('expand',function(e){
                gantt.select(this.element.find('[data-uid="'+e.model.uid+'"]'));
            });

            gantt.list.bind('collapse',function(e){
                gantt.select(this.element.find('[data-uid="'+e.model.uid+'"]'));
            });
        });
    </script>
```
