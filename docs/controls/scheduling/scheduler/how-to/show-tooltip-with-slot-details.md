---
title: Show Tooltip with Slot Details
page_title: Show Tooltip with Slot Details | Kendo UI Scheduler
description: "Learn how to use the Kendo UI Tooltip to show slot details in a Kendo UI Scheduler widget."
slug: howto_showtooltipwith_additionalinformation_overslots_scheduler
---

# Show Tooltip with Slot Details

The example below demonstrates how to use the Kendo UI Tooltip to show slot details in a Kendo UI Scheduler widget.

###### Example

```html
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
                      url: "http://demos.telerik.com/kendo-ui/service/tasks",
                      dataType: "jsonp"
                  },
                  update: {
                      url: "http://demos.telerik.com/kendo-ui/service/tasks/update",
                      dataType: "jsonp"
                  },
                  create: {
                      url: "http://demos.telerik.com/kendo-ui/service/tasks/create",
                      dataType: "jsonp"
                  },
                  destroy: {
                      url: "http://demos.telerik.com/kendo-ui/service/tasks/destroy",
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
          filter: ".k-scheduler-content td[role=gridcell]",
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

Other articles and how-to examples on the Kendo UI Scheduler:

* [Scheduler JavaScript API Reference](/api/javascript/ui/scheduler)
* [How to Create Recurrence Editor Using Mobile Editor]({% slug howto_createrecurrenceeditor_byusingmobileeditor_scheduler %})
* [How to Export to iCal]({% slug howto_exportto_ical_scheduler %})
* [How to Hide Header and Footer in Adaptive Rendering]({% slug howto_hideheaderandfooter_inadaptiverebdering_scheduler %})
* [How to Hide Time Headers]({% slug howto_hide_time_headers_scheduler %})
* [How to Modify Editor Template upon New Events]({% slug howto_modifyeditortemplate_wheneventisnew_scheduler %})
* [How to Prevent Moving AllDay Events outside the AllDay Header]({% slug howto_preventmovingalldayevents_fromalldayheader_scheduler %})
* [How to Retrieve Current View Date Range]({% slug howto_retrievecurrent_viewdaterange_scheduler %})
* [How to Set Different Start Weekday]({% slug howto_setdifferent_startweekday_scheduler %})

How-to examples on the Kendo UI Scheduler in AngularJS:

* [How to Create and Set ObservableArray Events]({% slug howto_createand_set_observablearray_events_angularjs_scheduler %})
* [How to Edit Using ContextMenu]({% slug howto_edit_using_contectmenu_angularjs_scheduler %})

For more runnable examples on the Kendo UI Scheduler, browse its [**How To** documentation folder]({% slug howto_add_controlsto_custom_event_editor_scheduler %}).
