---
title: Group Scheduler by Multiple Groups, Hide First Group and Highlight first Row
description: Learn how to hide a one of the groups in Scheduler and highlight the first row Kendo UI Scheduler.
type: how-to
page_title: Group Scheduler by Multiple Groups, Hide First Group and Highlight first Row - Kendo UI Scheduler for jQuery
slug: scheduler-hide-group-highlight-row
tags: kendo, kendo-ui, scheduler
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Scheduler for jQuery</td>
 </tr>
</table>

## Description

I want to group the Scheduler by multiple groups, but to hide the first one displayed in the most left column. 
I also want to highlight the slots rendered in the first row of each group.
How can I do that?

## Solution

1. Handle the [`databound`](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler/events/databound) event of the Scheduler.
1. Find each third cell in the first column and hide it.
1. Find each third row in the Scheduler content and change its background color.

```dojo
	<div id="example" class="k-content">
	<div id="scheduler"></div>
	</div>
	<script>
	$(function () {
		$("#scheduler").kendoScheduler({
		date: new Date("2025/6/13"),
		startTime: new Date("2025/6/13 07:00 AM"),
		eventHeight: 50,
		majorTick: 60,
		views: [ "timeline", "timelineWeek", "timelineWorkWeek", {
			type: "timelineMonth",
			startTime: new Date("2025/6/13 00:00 AM"),
			majorTick: 1440
		}],
		dataBound: function(){
			$('.k-scheduler-times:eq(1) tr:nth-child(3n+1) th:first-child').hide(); //hides the cell containing the first group infromation
			$('.k-scheduler-times:eq(1) tr:nth-child(3n+1)').css('background-color', 'yellow') //change the background of the first row in the group
			$('.k-scheduler-content tr:nth-child(3n+1)').css('background-color', 'yellow') // change the background color for the first and every third row afterwards
			$('.k-scheduler-content tr:nth-child(3n+1) .k-nonwork-hour').css('background-color', 'yellow') // change the background color for the non working hours cells 
		},
		timezone: "Etc/UTC",
		dataSource: {
			batch: true,
			transport: {
			read: {
				url: "https://demos.telerik.com/service/v2/core/meetings"
			},
			update: {
				url: "https://demos.telerik.com/service/v2/core/meetings/update",
				type: "POST",
                contentType: "application/json"
			},
			create: {
				url: "https://demos.telerik.com/service/v2/core/meetings/create",
				type: "POST",
                contentType: "application/json"
			},
			destroy: {
				url: "https://demos.telerik.com/service/v2/core/meetings/destroy",
				type: "POST",
                contentType: "application/json"
			},
			parameterMap: function (options, operation) {
				if (operation !== "read" && options.models) {
				return kendo.stringify(options.models);
				}
			}
			},
			schema: {
			model: {
				id: "meetingID",
				fields: {
				meetingID: { from: "MeetingID", type: "number" },
				title: { from: "Title", defaultValue: "No title", validation: { required: true } },
				start: { type: "date", from: "Start" },
				end: { type: "date", from: "End" },
				startTimezone: { from: "StartTimezone" },
				endTimezone: { from: "EndTimezone" },
				description: { from: "Description" },
				recurrenceId: { from: "RecurrenceID" },
				recurrenceRule: { from: "RecurrenceRule" },
				recurrenceException: { from: "RecurrenceException" },
				roomId: { from: "RoomID", nullable: true },
				attendees: { from: "Attendees", nullable: true },
				isAllDay: { type: "boolean", from: "IsAllDay" }
				}
			}
			}
		},
		group: {
			resources: ["Rooms", "Attendees"],
			orientation: "vertical"
		},
		resources: [
			{
			field: "roomId",
			name: "Rooms",
			dataSource: [
				{ text: "Meeting Room 101", value: 1, color: "#6eb3fa" },
				{ text: "Meeting Room 201", value: 2, color: "#f58a8a" }
			],
			title: "Room"
			},
			{
			field: "attendees",
			name: "Attendees",
			dataSource: [
				{ text: "Alex", value: 1, color: "#f8a398" },
				{ text: "Bob", value: 2, color: "#51a0ed" },
				{ text: "Charlie", value: 3, color: "#56ca85" }
			],
			multiple: true,
			title: "Attendees"
			}
		]
		});
	});
	</script>
```

## See Also

* [API Reference of the Scheduler](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler)
