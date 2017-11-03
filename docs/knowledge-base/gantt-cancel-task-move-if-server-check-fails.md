---
title: Cancel Gantt Task Move if the New Start and End Does Not Pass Server Validation
description: Perform server validation on Gantt task move. If it fails, cancel the new start and end
type: how-to
page_title: Save Moved Gantt Task Position Only After Server Validation
slug: gantt-cancel-task-move-if-server-check-fails
position: 0
tags: kendo, kendoui, gantt, validation, move-task, cancel-move
ticketid: 1138180
res_type: kb

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Gantt</td>
 </tr>
</table>


## Description

On move (drag and drop) of a Gantt task, we need to validate if the new start and end dates are valid based on server validation logic. The validation will be called with an AJAX request. If the validation fails, we need to keep the initial start and end date for that task.

## Solution
  
You could perform a custom check on the server in the *[moveEnd](https://docs.telerik.com/kendo-ui/api/javascript/ui/gantt#events-moveEnd)* Gantt event. The default change should be prevented and if the validation passes, the new *start* and *end* dates should be saved for that task:  

````html
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
````

## See Also

* [Kendo Gantt API Reference](http://docs.telerik.com/kendo-ui/api/javascript/ui/gantt)
