---
title: Mark Holidays in Month View
description: An example on how to apply different styling on national-holiday time-slots in the Kendo UI Scheduler.
type: how-to
page_title: Apply Custom Styling to Holiday Time-Slots | Kendo UI Scheduler
slug: scheduler-mark-holidays-in-month-view
tags: kendo, scheduler, month-view, holidays, slots
ticketid: 1116454
res_type: kb
component: scheduler
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Scheduler</td>
 </tr>
</table>

## Description

How can I apply custom styling to a holiday time-slot in the Scheduler month view?

## Solution

Implement a [`dataBound`](http://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler/events/databound) event handler. In the handler, iterate over all the sloths that are available on the screen and alter the styling for the required dates, use the following approach:  

```dojo
	<div id="scheduler"></div>
	<script>
		function onDataBound(e) {
			var scheduler = e.sender;
			var slots = $('.k-scheduler-content td[role=gridcell]');

			for (var i = 0; i < slots.length; i += 1) {
				var currentSlot = $(slots[i]);
				var slotData = scheduler.slotByElement(currentSlot);

				if (slotData.startDate.getTime() === new Date("2013/6/8").getTime()) {
					currentSlot.css('background-color', 'red');
				}
			}
		}

		$("#scheduler").kendoScheduler({
			date: new Date("2013/6/6"),
			views: [ "month" ],
			dataBound: onDataBound,
			dataSource: [{
				id: 1,
				start: new Date("2013/6/6 08:00 AM"),
				end: new Date("2013/6/6 09:00 AM"),
				title: "Interview"
			},{
				id: 2,
				start: new Date("2013/6/6 08:00 AM"),
				end: new Date("2013/6/6 09:00 AM"),
				title: "Meeting"
			}]
		});
  </script>
```
