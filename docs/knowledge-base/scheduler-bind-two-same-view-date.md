---
title: Bind Two Schedulers Together to Display the Same View and Date
description: An example on how to bind two Schedulers together so that they always display the same view and date.
type: how-to
page_title: Bind Two Schedulers Together to Display Same View and Date | Kendo UI Scheduler
slug: scheduler-bind-two-same-view-date
tags: scheduler, bind, two, same, view, date
ticketid: 1156354
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Scheduler for Progress® Kendo UI®</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>All</td>
 </tr>
</table>

## Description

My application displays two Kendo UI Schedulers on the same page. How can I bind them in such a way that if I change the view type or the date in any of them, the other will change too?

## Solution

1. Subscribe to the `navigate` event of the Scheduler.
1. Depending on whether the date or the view type is changed, trigger the `date` or `view` methods of the same API.

```dojo
<div id="example">
  <div id="team-schedule">
    <div id="people">
      <input checked type="checkbox" id="alex" aria-label="Alex" value="1">
      <input checked type="checkbox" id="bob" aria-label="Bob" value="2">
      <input type="checkbox" id="charlie" aria-label="Charlie" value="3">
    </div>
  </div>
  <div id="scheduler"></div>
  <div id="schedulerTwo"></div>
</div>
<script>
  $(function() {
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/13"),
      startTime: new Date("2013/6/13 07:00 AM"),
      height: 600,
      views: [
        "day",
        {
          type: "workWeek",
          selected: true
        },
        "week",
        "month",
        "agenda",
        {
          type: "timeline",
          eventHeight: 50
        }
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
              return {
                models: kendo.stringify(options.models)
              };
            }
          }
        },
        schema: {
          model: {
            id: "taskId",
            fields: {
              taskId: {
                from: "TaskID",
                type: "number"
              },
              title: {
                from: "Title",
                defaultValue: "No title",
                validation: {
                  required: true
                }
              },
              start: {
                type: "date",
                from: "Start"
              },
              end: {
                type: "date",
                from: "End"
              },
              startTimezone: {
                from: "StartTimezone"
              },
              endTimezone: {
                from: "EndTimezone"
              },
              description: {
                from: "Description"
              },
              recurrenceId: {
                from: "RecurrenceID"
              },
              recurrenceRule: {
                from: "RecurrenceRule"
              },
              recurrenceException: {
                from: "RecurrenceException"
              },
              ownerId: {
                from: "OwnerID",
                defaultValue: 1
              },
              isAllDay: {
                type: "boolean",
                from: "IsAllDay"
              }
            }
          }
        },
        filter: {
          logic: "or",
          filters: [{
              field: "ownerId",
              operator: "eq",
              value: 1
            },
            {
              field: "ownerId",
              operator: "eq",
              value: 2
            }
          ]
        }
      },
      resources: [{
        field: "ownerId",
        title: "Owner",
        dataSource: [{
            text: "Alex",
            value: 1,
            color: "#f8a398"
          },
          {
            text: "Bob",
            value: 2,
            color: "#51a0ed"
          },
          {
            text: "Charlie",
            value: 3,
            color: "#56ca85"
          }
        ]
      }],
      navigate: function(e) {
        if (e.action == "changeView") {
          var schedulerTwo = $("#schedulerTwo").data("kendoScheduler");
          schedulerTwo.view(e.view);
        } else if (e.action == "next" || e.action == "today" || e.action == "previous" || e.action == "changeDate") {
          var schedulerTwo = $("#schedulerTwo").data("kendoScheduler");
          schedulerTwo.date(e.date);
        }
      }
    });

    $("#schedulerTwo").kendoScheduler({
      date: new Date("2013/6/13"),
      startTime: new Date("2013/6/13 07:00 AM"),
      height: 600,
      views: [
        "day",
        {
          type: "workWeek",
          selected: true
        },
        "week",
        "month",
        "agenda",
        {
          type: "timeline",
          eventHeight: 50
        }
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
              return {
                models: kendo.stringify(options.models)
              };
            }
          }
        },
        schema: {
          model: {
            id: "taskId",
            fields: {
              taskId: {
                from: "TaskID",
                type: "number"
              },
              title: {
                from: "Title",
                defaultValue: "No title",
                validation: {
                  required: true
                }
              },
              start: {
                type: "date",
                from: "Start"
              },
              end: {
                type: "date",
                from: "End"
              },
              startTimezone: {
                from: "StartTimezone"
              },
              endTimezone: {
                from: "EndTimezone"
              },
              description: {
                from: "Description"
              },
              recurrenceId: {
                from: "RecurrenceID"
              },
              recurrenceRule: {
                from: "RecurrenceRule"
              },
              recurrenceException: {
                from: "RecurrenceException"
              },
              ownerId: {
                from: "OwnerID",
                defaultValue: 1
              },
              isAllDay: {
                type: "boolean",
                from: "IsAllDay"
              }
            }
          }
        },
        filter: {
          logic: "or",
          filters: [{
              field: "ownerId",
              operator: "eq",
              value: 1
            },
            {
              field: "ownerId",
              operator: "eq",
              value: 2
            }
          ]
        }
      },
      resources: [{
        field: "ownerId",
        title: "Owner",
        dataSource: [{
            text: "Alex",
            value: 1,
            color: "#f8a398"
          },
          {
            text: "Bob",
            value: 2,
            color: "#51a0ed"
          },
          {
            text: "Charlie",
            value: 3,
            color: "#56ca85"
          }
        ]
      }],
      navigate: function(e) {
        if (e.action == "changeView") {
          var scheduler = $("#scheduler").data("kendoScheduler");
          scheduler.view(e.view);
        } else if (e.action == "next" || e.action == "today" || e.action == "previous" || e.action == "changeDate") {
          var scheduler = $("#scheduler").data("kendoScheduler");
          scheduler.date(e.date);
        }
      }
    });

    $("#people :checkbox").change(function(e) {
      var checked = $.map($("#people :checked"), function(checkbox) {
        return parseInt($(checkbox).val());
      });

      var scheduler = $("#scheduler").data("kendoScheduler");

      scheduler.dataSource.filter({
        operator: function(task) {
          return $.inArray(task.ownerId, checked) >= 0;
        }
      });

      var schedulerTwo = $("#schedulerTwo").data("kendoScheduler");

      schedulerTwo.dataSource.filter({
        operator: function(task) {
          return $.inArray(task.ownerId, checked) >= 0;
        }
      });
    });
  });
</script>
<style>
  .k-nav-current>.k-link span+span {
    max-width: 200px;
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

* [API Reference of the navigate Event](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler/events/navigate)
* [API Reference of the view Method](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler/methods/view)
* [API Reference of the date Method](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler/methods/date)
