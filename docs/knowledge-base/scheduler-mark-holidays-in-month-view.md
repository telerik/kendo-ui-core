---
title: Mark holidays in month view
description: Apply different styling on national holidays
type: how-to
page_title: Custom styling on holiday time-slots
slug: scheduler-mark-holidays-in-month-view
position: 0
tags: kendo, scheduler, month-view, holidays, slots
teampulseid:
ticketid: 1116454
pitsid:

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Scheduler for Progress® Kendo UI®</td>
 </tr>
</table>


## Description
How to apply custom styling to a holiday (no weekend day) in the Scheduler month view?

## Solution
You could achieve the desired by implementing a [dataBound](http://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler#events-dataBound) event handler. In that handler, you could iterate over all the sloths available on the screen and alter the styling for the required dates:  

###### Example

````html
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
````

## Notes
