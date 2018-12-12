---
title: Display the Event Title in the Delete Confirm Prompt
description: An example on how to display the title of the task or event in the Delete confirmation dialog of the Kendo UI Scheduler.
type: how-to
page_title: Inject the Task Title for Display in the Delete Confirm Dialog | Kendo UI Scheduler
slug: scheduler-inject-task-title-in-the-confirm-delete-prompt
tags: kendo, scheduler, delete-task, delete-prompt
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

How can I display the task title in the **Delete** confirmation dialog of the Kendo UI Scheduler?

## Solution

Handle the `dataBound` event and attach a `click` event handler to the `k-event-delete` `<a>` element.

```dojo
	<div id="scheduler"></div>

    <script>
		$(function() {
			var handleDeleteClick = function(e) {
				var targetEvent = $(e.target.closest('.k-event'));
				var eventText = targetEvent.find('.k-event-template:not(.k-event-time)').text();
				var recurrenceEventIcon = targetEvent.find('.k-event-actions .k-i-reload');

				setTimeout(function() {
					var messageElement = $('.k-popup-message');
					var currentText = messageElement.text();
					var newText;

					if (recurrenceEventIcon.length === 0) {
						// Set the text if the event is not recurring
						newText = currentText.replace('this', '"' + eventText + '"');
					} else {
						// Set the text if the event is recurring
						newText = currentText.replace('event occurrence', 'occurrence of the "' + eventText + '" event');
					}

					messageElement.text(newText);
				}, 0);
			}

			$("#scheduler").kendoScheduler({
				dataBound: function(e) {
					$('.k-event-delete').on('click', handleDeleteClick);
				},
				date: new Date("2013/6/13"),
				startTime: new Date("2013/6/13 07:00 AM"),
				height: 600,
				views: [ "workWeek" ],
				timezone: "Etc/UTC",
				dataSource: {
					batch: true,
					transport: {
						read: {
							url: "https://demos.telerik.com/kendo-ui/service/tasks",
							dataType: "jsonp"
						},
						update: {
							url: "https://demos.telerik.com/kendo-ui/service/tasks/update",
							dataType: "jsonp"
						},
						create: {
							url: "https://demos.telerik.com/kendo-ui/service/tasks/create",
							dataType: "jsonp"
						},
						destroy: {
							url: "https://demos.telerik.com/kendo-ui/service/tasks/destroy",
							dataType: "jsonp"
						},
						parameterMap: function(options, operation) {
							if (operation !== "read" && options.models) {
								return {models: kendo.stringify(options.models)};
							}
						}
					},
					schema: {
						model: {
							id: "taskId",
							fields: {
								taskId: { from: "TaskID", type: "number" },
								title: { from: "Title", defaultValue: "No title", validation: { required: true } },
								start: { type: "date", from: "Start" },
								end: { type: "date", from: "End" },
								startTimezone: { from: "StartTimezone" },
								endTimezone: { from: "EndTimezone" },
								description: { from: "Description" },
								recurrenceId: { from: "RecurrenceID" },
								recurrenceRule: { from: "RecurrenceRule" },
								recurrenceException: { from: "RecurrenceException" },
								ownerId: { from: "OwnerID", defaultValue: 1 },
								isAllDay: { type: "boolean", from: "IsAllDay" }
							}
						}
					}
				}
			});
		});
    </script>
```

## See Also

* [API Reference of the Scheduler](http://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler)
