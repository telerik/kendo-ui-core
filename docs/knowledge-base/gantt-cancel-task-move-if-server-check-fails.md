---
title: Cancel Gantt Task Move If the New Start and End Do Not Pass Server Validation
description: An example on how to perform server validation on the Kendo UI Gantt task move and cancel the new start and end if it fails.
type: how-to
page_title: Save Moved Task Position Only After Server Validation | Kendo UI Gantt for jQuery
slug: gantt-cancel-task-move-if-server-check-fails
tags: kendo, kendoui, gantt, validation, move-task, cancel-move
ticketid: 1138180
res_type: kb
component: gantt
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Gantt</td>
 </tr>
</table>


## Description

On moving (drag and drop) a Gantt task and based on server validation logic, I want to validate if the new start and end dates are valid.

How can I call the validation an AJAX request and, if the validation fails, to keep the initial start and end date for that task?

## Solution

Perform a custom check on the server in the [`moveEnd`](https://docs.telerik.com/kendo-ui/api/javascript/ui/gantt/events/moveend) event of the Gantt. As a result, the default change is prevented and if the validation passes, the new start and end dates are saved for that task.  

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
        end: new Date("2014/6/17 11:00")
      }
    ],
    moveEnd: function(e) {
      e.preventDefault();
      var gantt = e.sender;
      var task = e.task;
      var start = e.start;
      var end = e.end;
      $.get("https://demos.telerik.com/kendo-ui/service/GanttTasks", function(data) {
        var randomNumber = Math.floor(Math.random() * 2) + 1;

        // If validation passes save the updated task
        if (randomNumber === 1) {
          task.set('start', start);
          task.set('end', end);
          gantt.dataSource.sync();
        }
      }, "jsonp");
    }
  });
</script>
```

## See Also

* [API Reference of the Gantt](https://docs.telerik.com/kendo-ui/api/javascript/ui/gantt)
