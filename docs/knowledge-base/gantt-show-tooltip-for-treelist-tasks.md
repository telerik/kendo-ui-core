---
title: Show Tooltip for Tasks in Gantt Treelist
description: An example on how to show tooltip when a task in the treelist section of the Kendo UI Gantt is hovered.
type: how-to
page_title: Show Tooltip on hovering a task in the treelist | Kendo UI Gantt
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

How can I show a tooltip with the task data when I hover a task in the Gantt's treelist?

## Solution

Use the Kendo UI Tooltip and set its `filter` configuration option so that the widget can be displayed when a row in the Gantt's treelist is hovered. Pass the hovered task data as content of the Tooltip in its `content` option.

```html
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
				 
				// pass the task data as content of the Tooltip
				return "<strong>" + title + "</strong></br><p>Start: " + kendo.toString(start, "HH:mm ddd, MMM d") + "</p><p>End: " + kendo.toString(end, "HH:mm ddd, MMM d") + "</p>"
			},
			width: 200,
		    height: 100,
		    position: "bottom"
		});
	</script>
```

For the full implementation of the approach, refer to [this Dojo example](https://dojo.telerik.com/OmuWaC).
