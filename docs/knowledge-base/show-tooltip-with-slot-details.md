---
title: Show a Tooltip with Scheduler Slot Details
page_title: Show a Tooltip with Scheduler Slot Details
description: "Learn how to use the Kendo UI for jQuery Tooltip to show slot details in a Kendo UI Scheduler."
previous_url: /controls/scheduling/scheduler/how-to/show-tooltip-with-slot-details, /controls/scheduling/scheduler/how-to/appearance/show-tooltip-with-additional-information-over-events
slug: howto_showtooltipwith_additionalinformation_overslots_scheduler
tags: telerik, kendo, jquery, scheduler, show, a, tooltip, with, slot, details 
component: scheduler
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Scheduler for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I use the Kendo UI Tooltip to show slot details in a Kendo UI Scheduler?

## Solution

The following example demonstrates how to achieve the desired scenario.

```dojo
<div id="example">

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
              { type: "workWeek" },
              "week",
            	{type: "month", selected: true},
              "agenda"
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

          },
          resources: [
              {
                  field: "ownerId",
                  title: "Owner",
                  dataSource: [
                      { text: "Alex", value: 1, color: "#f8a398" },
                      { text: "Bob", value: 2, color: "#51a0ed" },
                      { text: "Charlie", value: 3, color: "#56ca85" }
                  ]
              }
          ]
      });


  });


  $(function () {
      $("#scheduler").kendoTooltip({
          filter: ".k-event > div",
          position: "top",
          width: 250,
          content: kendo.template($('#template').html())
      });

    $("#scheduler").kendoTooltip({
          filter: ".k-scheduler-content td",
          position: "top",
          width: 250,
          content: kendo.template($('#slotTemplate').html())
      });
  });

  </script>


  <script id="template" type="text/x-kendo-template">
      #var uid = target.parent().attr("data-uid");#
      #var scheduler = target.closest("[data-role=scheduler]").data("kendoScheduler");#
      #var model = scheduler.occurrenceByUid(uid);#

      #if(model) {#
          <strong>event start:</strong> #=kendo.format('{0:d}',model.start)#<br />
          <strong>event end:</strong> #=kendo.format('{0:d}',model.end)#<br />
          <strong>event description:</strong> #=model.description#<br />
      #} else {#
          <strong>No event data is available</strong>
      #}#
  </script>

 	<script id="slotTemplate" type="text/x-kendo-template">

      #var scheduler = target.closest("[data-role=scheduler]").data("kendoScheduler");#
      #var slot = scheduler.slotByElement(target);#
#console.log(slot);#
      #if(slot) {#
          <strong>slot start:</strong> #=kendo.format('{0:d}',slot.startDate)#<br />
          <strong>slot end:</strong> #=kendo.format('{0:d}',slot.endDate)#<br />
          <strong>slot group index:</strong> #=slot.groupIndex#<br />
          <strong>slot isDay:</strong> #=slot.isDaySlot#<br />
      #} else {#
          <strong>No slot data is available</strong>
      #}#
  </script>

  <style scoped>

  .k-nav-current > .k-link span + span {
      max-width: 200px;
      display: inline-block;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      vertical-align: top;
  }

  #team-schedule {
      background: url('../content/web/scheduler/team-schedule.png') transparent no-repeat;
      height: 115px;
      position: relative;
  }

  #people {
      background: url('../content/web/scheduler/scheduler-people.png') no-repeat;
      width: 345px;
      height: 115px;
      position: absolute;
      right: 0;
  }
  #alex {
      position: absolute;
      left: 4px;
      top: 81px;
  }
  #bob {
      position: absolute;
      left: 119px;
      top: 81px;
  }
  #charlie {
      position: absolute;
      left: 234px;
      top: 81px;
  }
  </style>

```

## See Also

* [Basic Usage of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/index)
* [Using the API of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/api)
* [JavaScript API Reference of the Scheduler](/api/javascript/ui/scheduler)
