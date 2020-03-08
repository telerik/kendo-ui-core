---
title: Open Gantt Task Editor on Treelist Click
description: An example on how to show the task editor when a task in the Treelist section of the Kendo UI Gantt is clicked.
type: how-to
page_title: Show Editor on Task Selection in the Treelist | Kendo UI Gantt for jQuery
slug: gantt-open-editor-on-treelist-click
tags: gantt, open, show, task, select, editor, treelist, click
ticketid: 1139636
res_type: kb
component: gantt
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Gantt</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I show the editor of the Gantt when I select tasks in the tree-list?

## Solution

1. Attach a click handler to the rows in the tree-list of the Gantt.
1. Call the `editTask` method of the Gantt and pass the dataItem of the selected task as a parameter.

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
        },
        {
          id: 2,
          orderId: 1,
          parentId: null,
          title: "Task2",
          start: new Date("2014/6/17 12:00"),
          end: new Date("2014/6/17 14:00")
        }
      ]
    });
    </script>
	<script>
		$(document).ready(function() {
		  $(".k-gantt").delegate(".k-gantt-treelist .k-grid-content tr", "click", function(e) {
        var gantt = $("#gantt").data("kendoGantt");
        var task = gantt.dataItem(this);
        gantt.editTask(task);
		  });
		});
	</script>
```
