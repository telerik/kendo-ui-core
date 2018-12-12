---
title: Show Gantt Task Progress Handle When Using Task Template
description: An example on how to display a progress drag handle for the Kendo UI Gantt tasks when a taskTemplate is set.
type: how-to
page_title: Display Task Progress Drag Handle When taskTemplate Is Used | Kendo UI Gantt
slug: gantt-task-progress-drag-handle
tags: gantt, task, progress, drag, handle, template
ticketid: 1107725
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

How can I display a task progress drag handle when I set a `taskTemplate` for the Gantt?

## Solution

For the full implementation of the approach, refer to [this Dojo example](http://dojo.telerik.com/OmONA).

1. Show the task progress by adding a `div` with the `progress` class in the template.  

    ```dojo
    	<script id="task-template" type="text/x-kendo-template">
    		# if (resources[0]) { #
    		<div class="template" style="background-color: #= resources[0].color #;">
    			<img class="resource-img" src="../content/web/gantt/resources/#:resources[0].id#.jpg" alt="#: resources[0].id #" />
    			<div class="wrapper">
    				<strong class="title">#= title # </strong>
    				<span class="resource">#= resources[0].name #</span>
    			</div>
    			<div class="progress" style="width:#= (100 * parseFloat(percentComplete)) #%"> </div>
    		</div>
    		# } else { #
    		<div class="template">
    			<div class="wrapper">
    				<strong class="title">#= title # </strong>
    				<span class="resource">no resource assigned</span>
    			</div>
    			<div class="progress" style="width:#= (100 * parseFloat(percentComplete)) #%"> </div>
    		</div>
    		# } #
    	</script>
    ```

2. In the `dataBound` event handler of the Gantt, append a `div` with the `k-task-draghandle` class to the element which wraps the task.

    ```dojo
    	<script>
    		var handleIsAppended = false;

    		function onDataBound(e) {
    			if(!handleIsAppended) {
    				$(".k-task-wrap").append("<div class='k-task-draghandle'></div>");
    				handleIsAppended = true;
    			}
    		}
    	</script>
    ```
