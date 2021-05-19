---
title: Remove 'None' option in DropdownList of Kendo UI Scheduler Popup Editor
description: Learn how to hide 'None' as an option and as a default value in the DropdownList of the Popup Editor Form in the Kendo UI Scheduler.
type: how-to
page_title: Hide the built-in option from the Editor | Kendo UI Scheduler 
slug: scheduler-assign-default-value-editor
position: 
tags: scheduler, assign, default, value, dropdownlist, popup, editor, form, none, remove, hide, nullable, defaultvalue, schema, model
ticketid: 1426081
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>2019.2.619</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>Scheduler for Progress® Kendo UI®</td>
		</tr>
	</tbody>
</table>

## Description

How can I prevent having 'None' as an option and as a default value in the DropdownList of the Scheduler Popup Editor Form?

## Solution

1. Hide the 'None' option by setting the *display* to **none** for the selector '**div.k-list-optionlabel**'.

	```css
		div.k-list-optionlabel {
		  display: none;
		}
	```

1. Set the 'defaultValue' in the [schema.model.fields.fieldName](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/configuration/schema#schemamodel).

	```javascript
		schema: {
		  fields: {
		    roomId: { from: "RoomID", defaultValue: 1 }
		  }
		}
	```


1. By default, the 'nullable' parameter is set to false as seen in the [Model.define](https://docs.telerik.com/kendo-ui/api/javascript/data/model/methods/define) method. You can also set the 'nullable' parameter to false.

	```javascript
		schema: {
		  fields: {
		    roomId: { from: "RoomID", nullable: false }
		  }
		}
	```
#### Example

```dojo
	<style>
	    div.k-list-optionlabel {
	      display: none;
	    }
	</style>

	<div id="example" class="k-content">
	    <div id="scheduler"></div>
	</div>

	<script>
	$(function() {
	    $("#scheduler").kendoScheduler({
		date: new Date("2013/6/13"),
		startTime: new Date("2013/6/13 07:00 AM"),
		height: 600,
		views: [
		    "day",
		    { type: "week", selected: true },
		    "month",
		    "agenda",
		    "timeline"
		],
		timezone: "Etc/UTC",
		dataSource: {
		    batch: true,
		    transport: {
			read: {
			    url: "https://demos.telerik.com/kendo-ui/service/meetings",
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
				roomId: { from: "RoomID", defaultValue: 1 },
				attendees: { from: "Attendees", nullable: true },
				isAllDay: { type: "boolean", from: "IsAllDay" }
			    }
			}
		    }
		},
		resources: [
		    {
			field: "roomId",
			dataSource: [
			    { text: "Meeting Room 101", value: 1, color: "#6eb3fa" },
			    { text: "Meeting Room 201", value: 2, color: "#f58a8a" }
			],
			title: "Room"
		    }
		] 
	    });
	});
	</script>
```

## See Also

- [schema.model - Documentation and API Reference](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/configuration/schema#schemamodel)
- [Model.define - Documentation and API Reference](https://docs.telerik.com/kendo-ui/api/javascript/data/model/methods/define)
