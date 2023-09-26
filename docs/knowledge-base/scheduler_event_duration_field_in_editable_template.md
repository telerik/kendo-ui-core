---
title: Add Duration Field in Editable Template for Scheduler Events
page_title: Add Duration Field in the Editable Template for Scheduler Events- Kendo UI for jQuery Scheduler
description: "Learn how to add a duration field in the editable template for the events of the Kendo UI Scheduler for jQuery."
slug: scheduler_event_duration_field_in_editable_template
tags: scheduler, duration, event, editable, template
component: scheduler
type: how-to
ticketid: 1613931
res_type: kb
---

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Scheduler for jQuery</td>
 </tr>
</table>

## Description

How can I add a duration field in the editable template for the events of the Scheduler?

## Solution

* Use the SchedulerEvent [`duration()`](/api/javascript/data/schedulerevent/methods/duration) method to retrieve the event duration and display it as a custom element in the template for the editor. 

```js
<script id="editor" type="text/x-kendo-template">
   	...
   	<p>
   		<label>Balance: <div id="balance"> #= data.duration() /1000 / 60 / 60 # h</div>
    </p>
</script>
```

*  In the [`edit`](/api/javascript/ui/scheduler/events/edit) event handler of the Scheduler, bind the [`change`](/api/javascript/ui/datetimepicker/events/change) event handlers to the DateTimePicker components, in which match up the duration value once the value in the start and end DateTimePickers is changed.

```js
edit: function(e){
    e.container.find('[name="start"]').data('kendoDateTimePicker').bind('change', onChangeDates);
    e.container.find('[name="end"]').data('kendoDateTimePicker').bind('change', onChangeDates)
},
```

* Send the value of the custom balance field when the event is edited and the duration is changed, by handling the [`save`](/api/javascript/ui/scheduler/events/save) event of the Scheduler and setting the value of the balance field.

```js
save: function(e){
    e.event.balance = e.event.duration()/1000/60/60
},
```
The following example demonstrates a full implementation of the described approach:
```dojo
<div id="example">   
    <div id="scheduler"></div>
</div>

<script id="editor" type="text/x-kendo-template">
   	<h3>Edit meeting</h3>
   	<p>
   	    <label>Title: <input name="title" /></label>
    </p>
    <p>
   		<label>Start: <input data-role="datetimepicker" name="start" /></label>
    </p>
   	<p>
   		<label>End: <input data-role="datetimepicker" name="end" /></label>
    </p>
   	<p>
   		<label>Balance: <div id="balance"> #= data.duration() /1000 / 60 / 60 # h</div>
    </p>
</script>

<script>
    function onChangeDates(ev){
        var start = $('.k-scheduler-edit-form').find('[name="start"]').data('kendoDateTimePicker').value()
        var end = $('.k-scheduler-edit-form').find('[name="end"]').data('kendoDateTimePicker').value()
        var duration = (end - start)/1000/60/60

        $('#balance').text(duration)
    }

    $(function() {
        $("#scheduler").kendoScheduler({
            date: new Date("2022/6/13"),
            startTime: new Date("2022/6/13 07:00 AM"),
            height: 600,
            views: [
                "day",          
                { name:"week", selected: true },
                "month"
            ],
            timezone: "Etc/UTC",
            editable: {
                template: $("#editor").html()
            },
            edit: function(e){
                e.container.find('[name="start"]').data('kendoDateTimePicker').bind('change', onChangeDates);
                e.container.find('[name="end"]').data('kendoDateTimePicker').bind('change', onChangeDates)
            },
            save: function(e){
                e.event.balance = e.event.duration()/1000/60/60
            },
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
                            balance: { type: "number"},
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
* [JavaScript API Reference of the Scheduler](/api/javascript/ui/scheduler)