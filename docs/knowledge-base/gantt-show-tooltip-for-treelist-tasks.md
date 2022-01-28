---
title: Show Tooltip for Tasks in Gantt Treelist
description: An example on how to show a tooltip when a task in the treelist section of the Kendo UI Gantt is hovered.
type: how-to
page_title: Show Tooltip on Hovering Tasks in the Treelist | Kendo UI Gantt for jQuery
slug: gantt-show-tooltip-for-treelist-tasks
tags: gantt, show, display, tooltip, hover, task, treelist
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

How can I show a tooltip with the task data when I hover a task in the treelist of the Gantt?

## Solution

1. Set the `filter` configuration option of the Kendo UI Tooltip. As a result, the widget will be displayed when a row from the Gantt treelist is hovered.
1. In the `content` option of the Tooltip, pass the hovered task data as its content.

For the full implementation of the approach, refer to [this Dojo example](https://dojo.telerik.com/OmuWaC).

```dojo
	<script>
		$("#target").kendoTooltip({
			filter: ".k-gantt-treelist .k-grid-content tr",
			content: function(e) {
				// the element for which the tooltip is shown
				var target = e.target;
				var gantt = $("#gantt").data("kendoGantt");
				var task = gantt.dataItem(target);

				var title = task.title;
				var start = task.start;
				var end = task.end;

				// pass the task data as content for the Tooltip
				return "<strong>" + title + "</strong></br><p>Start: " + kendo.toString(start, "HH:mm ddd, MMM d") + "</p><p>End: " + kendo.toString(end, "HH:mm ddd, MMM d") + "</p>"
			},
			width: 200,
		    height: 100,
		    position: "bottom"
		});
	</script>
```
