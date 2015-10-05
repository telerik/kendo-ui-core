---
title: Editors inside event template
page_title: Editors inside event template
description: Editors inside event template
---

# Editors inside event template

The example below demonstrates how to nest editors inside event templates and update the underlying model.

#### Example:

```html
    <div id="scheduler"></div>
    <script id="event-template" type="text/x-kendo-template">
        <div>
            <label style="font-size: 10pt;font-style: italic; color: \#FF3385">
                <input type="checkbox" onchange='onCheckboxChange(this)' #=data.cancelled ? checked='checked' : ''#></input>cancelled event
            </label>
        </div>
        <hr />
        <div>#=title#</div>
    </script>
    
    <script>
      function onCheckboxChange(checkbox) {
        var scheduler =  checkbox.closest('[data-role=scheduler]').data("kendoScheduler");
        
        checkbox = $(checkbox);
    
        var uid = checkbox.closest("[data-uid]").data("uid");
        
        //get event instance using scheduler API:
        var event = scheduler.occurrenceByUid(uid);
        
        //update the underlying model:
        event.set("cancelled", checkbox.is(":checked"));
      }
    
      $(function() {
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
          eventTemplate: $('#event-template').html(),
          timezone: "Etc/UTC",
          dataSource: {
            batch: true,
            transport: {
              read: {
                url: "//demos.telerik.com/kendo-ui/service/tasks",
                dataType: "jsonp"
              },
              update: {
                url: "//demos.telerik.com/kendo-ui/service/tasks/update",
                dataType: "jsonp"
              },
              create: {
                url: "//demos.telerik.com/kendo-ui/service/tasks/create",
                dataType: "jsonp"
              },
              destroy: {
                url: "//demos.telerik.com/kendo-ui/service/tasks/destroy",
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
                  isAllDay: { type: "boolean", from: "IsAllDay" },
                  cancelled: { type: "boolean", from: "Cancelled" }
                }
              }
            }
          }
        });
      });
    </script>
```
