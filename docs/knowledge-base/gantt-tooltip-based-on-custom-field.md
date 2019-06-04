---
title: Show Different Gantt Task Tooltip Based on a Field in the DataSource
description: An example on how to display different tooltip content on hovering Kendo UI Gantt tasks based on the value of a custom field.
type: how-to
page_title: Show Tooltip Content Based on Custom Task Field Value | Kendo UI Gantt for jQuery
slug: gantt-tooltip-based-on-custom-field
tags: gantt, show, tooltip, different, task, field, custom, datasource
ticketid: 1142071
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

How can I display a different tooltip for Gantt tasks that have different custom field values?

## Solution

1. Set the `tooltip.template` configuration option of the Gantt.
1. In the template, access the custom field value of the task that the tooltip will depend on.
1. Based on the custom field value, conditionally load different template content.

```dojo
	<div id="gantt"></div>

	<script type="text/x-kendo-template" id="myTemplate">
		#if(task.customField == "type1"){#
			<div style="background-color: lightgreen;">Type 1 tooltip template</div>
			<div>#: task.title #</div>
		#}else{#
			<div style="background-color: lightblue;"><strong>Type 2 tooltip template</strong></div>
			<div>#: task.title #</div>
		#}#
	</script>

	<script>
		$("#gantt").kendoGantt({
			tooltip: {
				visible: true,
				template: kendo.template($("#myTemplate").html())
			},
			dataSource: [
				{
				id: 1,
				orderId: 0,
				parentId: null,
				title: "Task1",
				customField: "type1",
				start: new Date("2014/6/17 9:00"),
				end: new Date("2014/6/17 11:00")
				},
				{
				id: 2,
				orderId: 1,
				parentId: null,
				customField: "type2",
				title: "Task2",
				start: new Date("2014/6/17 11:00"),
				end: new Date("2014/6/17 12:00")
				}
			]
		});
	</script>
```
