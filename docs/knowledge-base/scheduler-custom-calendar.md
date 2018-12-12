---
title: Configure Custom Template for the Dates in the Embedded Calendar
description: An example on how to customize the rendering of the dates in the toolbar calendar of the Kendo UI Scheduler.
type: how-to
page_title: Customize the Toolbar Calendar | Kendo UI Scheduler
slug: scheduler-custom-calendar
tags: kendo, kendo-ui, scheduler, calendar, custom-calendar, calendar-template
ticketid: 1143694
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Scheduler</td>
 </tr>
</table>

## Description

How can I customize the Calendar that is present in the toolbar of the Scheduler and display some of the dates with red dots depending on the response from the server?

## Solution

1. Handle the [`dataBound`](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler/events/databound) event of the Scheduler.
1. Handle the popup button click of the Calendar so that the embedded widget becomes available for editing.

```dojo
<div id="scheduler"></div>
<script>
	$(function() {
	  function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

	  $("#scheduler").kendoScheduler({
		dataBound: function(e) {
		  // The dataBound event will be fired on each navigation
		  var button = $('.k-nav-current a[role="button"]');
		  // Unbind previously bound clicks
		  button.unbind('click');

		  // Bind again click handler
		  button.on('click', function() {
			// Send AJAX to retrieve the data for the Calendar template from the remote
			$.ajax({
			  url: "https://demos.telerik.com/kendo-ui/service/Products",
			  success: function(data) {
				// Assign the doted days to the calendar. Here are generated random dots
				var events = [];

				for(var i = 0; i < 10; i++) {
				  var date = +new Date(2013, 5, getRandomInt(1, 30));
				  events.push(date);
				}

				var calendar = $('.k-scheduler-calendar').getKendoCalendar();
				calendar.setOptions({
				  dates: events,
				  month: {
					// template for dates in month view
					content: '# if ($.inArray(+data.date, data.dates) != -1) { #' +
					'<span class="dot custom"></span>' +
					'# } #' +
					'#= data.value #',
				  }
				});
			  },
			  dataType: "JSONP"
			});
		  });
		},
		date: new Date("2013/6/13"),
		startTime: new Date("2013/6/13 07:00 AM"),
		height: 600,
		views: [
		  "week",
		  "month"
		],
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
<style>
  .k-scheduler-calendar.k-calendar {
    width: 20em;
  }

  .dot {
    display: inline-block;
    background: red;
    height: 10px;
    width: 10px;
    border-radius: 5px;
  }
</style>
```

## See Also

* [API Reference of the Scheduler](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler)
