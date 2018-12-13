---
title: Reload DropDownList Options in Scheduler Edit Form
description: An example on how to change the items that are available in a resource DropDownList on a Scheduler edit form.
type: how-to
page_title: Alter Available Data Placed on Scheduler Edit Form | Kendo UI DropDownList
slug: dropdownlist-reloading-options-in-scheduler-edit-form
tags: kendoui, kendo, dropdownlist, scheduler, edit, data, options, change
ticketid: 1118178
res_type: kb
component: dropdownlist
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Scheduler</td>
 </tr>
</table>

## Description

I have two resource DropDownLists. When the user chooses the value in the first one, I want to reload the second one.

How can I get the instance of the second DropDownList to reload the data of the DropDownList in a Scheduler edit form?

## Solution

Implement an event handler for the [`edit`](http://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler/events/edit) event of the Scheduler. This function adds a [`change`](http://docs.telerik.com/kendo-ui/api/javascript/ui/dropdownlist/events/change) event handler to the first of the two DropDownLists. This `change` event handler successfully [changes the available options](http://docs.telerik.com/kendo-ui/api/javascript/ui/dropdownlist/methods/setdatasource) in the second DropDownList by altering its DataSource.

```dojo
  <div id="example">
     <div id="scheduler"></div>
  </div>
  <script>
  	$(function() {
  		function reloadLocationSelect(e) {
  		  var newDataSource = new kendo.data.DataSource({
  			data: [
  				{ text: "Changed one", value: 5, color: "#f8a398" },
  				{ text: "Changed two", value: 6, color: "#51a0ed" },
  				{ text: "Changed three", value: 7, color: "#56ca85" }
  			]
  		  });

  		  var attendeesDropDown = $("select[data-bind='value:attendees']").getKendoDropDownList();

  		  attendeesDropDown.setDataSource(newDataSource);
  		}

  		$("#scheduler").kendoScheduler({
  			date: new Date("2013/6/13"),
  			startTime: new Date("2013/6/13 07:00 AM"),
  			height: 600,
  			views: [
  				"day",
  				{ type: "workWeek", selected: true },
  				"week",
  				"month",
  				"agenda",
  				{ type: "timeline", eventHeight: 50}
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
  						url: "https://demos.telerik.com/kendo-ui/service/meetings/update",
  						dataType: "jsonp"
  					},
  					create: {
  						url: "https://demos.telerik.com/kendo-ui/service/meetings/create",
  						dataType: "jsonp"
  					},
  					destroy: {
  						url: "https://demos.telerik.com/kendo-ui/service/meetings/destroy",
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
  							roomId: { from: "RoomID", defaultValue: 1 },
  							attendees: { from: "Attendees", defaultValue: 1 },
  							isAllDay: { type: "boolean", from: "IsAllDay" }
  						}
  					}
  				}
  			},
  			resources: [{
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
  					title: "Attendees"
  				}],
  			edit: function (e) {
  				var roomDropDown = $("select[data-bind='value:roomId']").getKendoDropDownList();
  				roomDropDown.bind('change', reloadLocationSelect);
  			}
  		});
  	});
  </script>
```

## See Also

* [JavaScript API Reference of the DropDownList Events](http://docs.telerik.com/kendo-ui/api/javascript/ui/dropdownlist#events)
* [JavaScript API Demo of the Scheduler Events](http://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler#events)
