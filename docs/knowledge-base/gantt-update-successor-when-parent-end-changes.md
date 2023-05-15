---
title: How to Update All Successor Tasks When Updating the Parent Task
description: Learn how to update all the successor tasks when updating the parent task end time in the Kendo UI Gantt.
type: how-to
page_title: Update Dependencies When The Parent Task End is Changed - Kendo UI Gantt for jQuery
slug: gantt-update-successor-when-parent-end-changes
tags: kendo, kendoui, gantt, successor, dependencies, update
ticketid: 1606594 
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Gantt for jQuery</td>
 </tr>
</table>


## Description

In some scenarios the start of one task is dependent on the end of another task. In such a case, if the end of the initial task changes, the start of the dependent task should also change automatically.
How can I achieve this?

## Solution

1. Handle the [`save`](https://docs.telerik.com/kendo-ui/api/javascript/ui/gantt/events/save) event of the Gantt component.
1. Find the time gap between the previous and the new end time of the updated task.
1. Filter the dependencies of the updated tasks and update the start and end time accordignly.


```dojo
    <div id="gantt"></div>
    <script>
      $("#gantt").kendoGantt({
        dataSource: [
          {
            id: 1,
            orderId: 0,
            parentId: null,
            title: "Task1",
            start: new Date("2014/6/17 9:00"),
            end: new Date("2014/6/17 10:00")
          },
          {
            id: 2,
            orderId: 1,
            parentId: null,
            title: "Task2",
            start: new Date("2014/6/17 9:40"),
            end: new Date("2014/6/17 11:00")
          },
          {
            id: 3,
            orderId: 2,
            parentId: null,
            title: "Task3",
            start: new Date("2014/6/17 11:00"),
            end: new Date("2014/6/17 12:30")
          },
          {
            id: 4,
            orderId: 3,
            parentId: null,
            title: "Task4",
            start: new Date("2014/6/17 9:00"),
            end: new Date("2014/6/17 11:00")
          },
          {
            id: 5,
            orderId: 4,
            parentId: null,
            title: "Task5",
            start: new Date("2014/6/17 11:00"),
            end: new Date("2014/6/17 12:00")
          },
          {
            id: 6,
            orderId: 5,
            parentId: null,
            title: "Task 6",
            start: new Date("2014/6/17 13:30"),
            end: new Date("2014/6/17 15:00")
          }
        ],
        dependencies: [
          {
            id: 1,
            predecessorId: 1,
            successorId: 2,
            type: 1
          },
          {
            id: 2,
            predecessorId: 2,
            successorId: 3,
            type: 1
          },
          {
            id: 3,
            predecessorId: 4,
            successorId: 5,
            type: 1
          },
          {
            id: 4,
            predecessorId: 3,
            successorId: 6,
            type: 1
          },
        ],
        save: function(e) {
          var task = e.task;

          if (!e.values.end) {
            return; 
          }         

          var startDelta = e.values.end - e.task.end;         

          moveTask(e.sender, task, startDelta)         

          e.sender.dependencies.filter(null);
          e.sender.dataSource.sync();
        }
      });

      function moveTask(gantt, task, startDelta){

        var t = gantt.dependencies.filter({
          field: "predecessorId",
          operator: "equals",
          value: task.id
        });       


        $(gantt.dependencies.view()).each(function(index, dependency) {    

          var dependentTask = gantt.dataSource.get(dependency.successorId); 
          var dependentTaskStart = dependentTask.get("start");
          var dependentTaskEnd = dependentTask.get("end");

          dependentTask.set("start", new Date(dependentTaskStart.getTime() + startDelta));
          dependentTask.set("end", new Date(dependentTaskEnd.getTime() + startDelta));

          gantt.dependencies.filter(null); 

          var nextTask = gantt.dataSource.get(dependentTask.id);

          moveTask(gantt, nextTask, startDelta)

        });
      }
</script>
```
