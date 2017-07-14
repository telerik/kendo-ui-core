---
title: Reload DropDownList Options in Scheduler Edit Form
description: How to change the items that are available in a resource DropDownList on Scheduler edit form
type: how-to
page_title: Alter the data in available in the Kendo UI DropDownList placed on Scheduler edit form
slug: dropdownlist-reloading-options-in-scheduler-edit-form
position: 0
tags: kendoui, kendo, dropdownlist, scheduler, edit, data, options, change
teampulseid:
ticketid: 1118178
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
I need to reload the data of a Kendo UI DropDownList in a Scheduler edit form. I have two resources DropDownLists. When the user choose the value in the first DLL, I need to reload the second one.

Can you help me to get the instance of the second drop-down, in order to reload the data?

## Solution
The below sample implements the described scenario. You will notice, that an event handler for the Scheduler [*edit event*](http://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler#events-edit) has been implemented. This function adds a [*change event*](http://docs.telerik.com/kendo-ui/api/javascript/ui/dropdownlist#events-change) handler to the first of the two DropDownLists.  

This change handler successfully [changes the available options](http://docs.telerik.com/kendo-ui/api/javascript/ui/dropdownlist#methods-setDataSource) in the second drop-down, by altering its DataSource. 

````html
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
````

## See Also

* [DropDownList Events in JavaScript API Reference](http://docs.telerik.com/kendo-ui/api/javascript/ui/dropdownlist#events)
* [Scheduler Events in JavaScript API demo](http://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler#events)

