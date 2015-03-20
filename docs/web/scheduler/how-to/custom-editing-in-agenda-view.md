---
title: Custom editing in Agenda view
page_title: Custom editing in Agenda view
description: Custom editing in Agenda view
---

# Custom editing in Agenda view

The example below demonstrates how to implement custom editing in Agenda view.

#### Example:

```html
    <div id="example">
      <div id="team-schedule">
        <div id="people">
        </div>
      </div>
      <div id="scheduler"></div>
    </div>
    <script id="event-template" type="text/x-kendo-template">
	<div>#: title #</div>
    <button class="edit-event">Edit</button>
    </script>
    <script>
      $(function() {
        var scheduler = $("#scheduler").kendoScheduler({
          date: new Date("2013/6/13"),
          startTime: new Date("2013/6/13 07:00 AM"),
          height: 600,
          views: [
            {
              type: "agenda",
              eventTemplate: $("#event-template").html()
            }
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
            },
            filter: {
              logic: "or",
              filters: [
                { field: "ownerId", operator: "eq", value: 1 },
                { field: "ownerId", operator: "eq", value: 2 }
              ]
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
        }).data("kendoScheduler");

        scheduler.wrapper.on("click", ".edit-event", function(e) {
          var uid = $(e.currentTarget).closest(".k-task").data("uid");
          var event = scheduler.occurrenceByUid(uid);

          scheduler.editEvent(event);
        });
      });
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
