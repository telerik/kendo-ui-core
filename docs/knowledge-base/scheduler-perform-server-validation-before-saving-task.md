---
title: Retrieve Information on the Server before Saving Events
description: An example on how to perform server validation before saving a new or edited Kendo UI Scheduler task or event.
type: how-to
page_title: Perform Server Validation before Saving New or Edited Tasks | Kendo UI Scheduler
slug: scheduler-perform-server-validation-before-saving-task
tags: kendo, scheduler, server-validation, save-task
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

How can I perform a server check (validation) before a new or edited task or event is saved in the Kendo UI Scheduler?

## Solution

1. Handle the `save` event and prevent the default action.
1. Send an AJAX request to the server.
1. Depending on the response, manually save the task in the Scheduler.

```dojo
	<div id="scheduler"></div>

	<script>
		$("#scheduler").kendoScheduler({
			date: new Date("2013/6/6"),
			views: [ "day", "month" ],
			dataSource: [{
				id: 1,
				start: new Date("2013/6/6 08:00 AM"),
				end: new Date("2013/6/6 09:00 AM"),
				title: "Interview"
			}],
			save: function(e) {
				e.preventDefault();

				var eventId = e.event.id;
				var dataSource = e.sender.dataSource;

				$.ajax({
					url: "https://demos.telerik.com/kendo-ui/service/Products",
					dataType: 'jsonp',
					data: JSON.stringify(e.event),
					success: function(response) {
						// Perform the required check / validation.
						// Depending on the response do or do not save the task / event
						// In this case the check compares a random number to the returned response length
						var randomNumber = Math.floor((Math.random() * 150) + 0);

						if (response.length > randomNumber ) {
							// Manually save the task / event
							var dataItem = dataSource.get(eventId);

							if (dataItem) {
								dataItem = e.event;
							} else {
								dataSource.add(e.event);
							}

							dataSource.sync();
						} else {
							// Alert, that the validation has failed
							alert('This change is not allowed!');
						}
					}
				});
			}
		});
	</script>
```

## See Also

* [API Reference of the Scheduler](http://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler)
