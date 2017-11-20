---
title: Open Gantt Task Editor on Treelist Click
description: An example on how to show the task Editor when a task in the treelist section of the Kendo UI Gantt is clicked.
type: how-to
page_title: Show Editor on task selection in the treelist | Kendo UI Gantt
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

How can I show the Gantt's Editor when I select tasks in the treelist?

## Solution

Attach a click handler to the rows in the Gantt's treelist. Call the Gantt's `editTask` method, passing the selected task's dataItem as a parameter.

```html
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
