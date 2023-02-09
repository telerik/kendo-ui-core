---
title: Create Scheduler on the Client and Sync with Batch
page_title: Create Scheduler on the Client and Sync with Batch
description: "Learn how to create a Kendo UI for jQuery Scheduler on the client and then sync the changes with the batch mode turned on."
previous_url: /controls/scheduling/scheduler/how-to/sync-with-batch, /controls/scheduling/scheduler/how-to/binding/sync-with-batch
slug: howto_create_a_scheduler_on_the_client_and_sync_with_batch_scheduler
tags: telerik, kendo, jquery, scheduler, create, on, the, client, and, sync, with, batch  
component: scheduler
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Scheduler for jQuery</td>
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

How can I create a Kendo UI for jQuery Scheduler on the client and then sync the changes with the batch mode turned on?

## Solution

The following example demonstrates how to achieve the desired scenario.

```dojo
  <div id="example" class="k-content">
      <button id="sync">Sync</button>
      <div id="scheduler"></div>
      <div id="overlay" class="k-overlay" style="display:none"></div>
  </div>
<script>
$(function() {
      var remoteDataSource = new kendo.data.SchedulerDataSource({
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
      });

  	var nextIdx = 10000;

    var scheduler = $("#scheduler").kendoScheduler({
        date: new Date("2013/6/13"),
        startTime: new Date("2013/6/13 07:00 AM"),
        height: 600,
        views: [
            "day",
            { type: "week", selected: true },
            "month",
            "agenda"
        ],
        timezone: "Etc/UTC",
        dataSource: {
            batch: true,
            transport: {
                read: function (options) {
                  remoteDataSource.one("change", function() {
                    options.success(this.data());
                  });

                  remoteDataSource.read();
                },
                update: function (options) {
                    options.success(true);
                },
                destroy: function (options) {
                    options.success(true);
                },
                create: function (options) {
                  	var event = options.data.models[0];

                  	event.local = true;
                    event.taskId = nextIdx;
                  	nextIdx += 1;

                    options.success(event);
                }
            },
            schema: {
                model: {
                    id: "taskId",
                    fields: {
                        taskId: { type: "number" },
                        title: { defaultValue: "No title", validation: { required: true } },
                        start: { type: "date" },
                        end: { type: "date" },
                      	local: { type: "boolean" }
                    }
                }
            }
        }
    }).data("kendoScheduler");

  	$("#sync").click(function() {
      var overlay = $("#overlay").show();
      var dataSource = scheduler.dataSource;

      var eventQuery = new kendo.data.Query(dataSource.data()).filter({
        field: "local",
        operator: "eq",
        value: true
      });

      var events = eventQuery.data;
      var event;

      if (!events[0]) {
        return;
      }

      for (var idx = 0, length = events.length; idx < length; idx++) {
        events[idx].update({
          id: 0,
          taskId: 0,
          locale: false
        });
      }

      remoteDataSource.one("change", function() {
        dataSource.data(remoteDataSource.data());
     		overlay.hide();   
      });

      remoteDataSource.sync();
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

#people {
    background: url('../../content/web/scheduler/team-schedule.png') transparent no-repeat;
    height: 115px;
    position: relative;
}
#alex {
    position: absolute;
    left: 630px;
    top: 81px;
}
#bob {
    position: absolute;
    left: 745px;
    top: 81px;
}
#charlie {
    position: absolute;
    left: 860px;
    top: 81px;
}
</style>

```

## See Also

* [Basic Usage of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/index)
* [Using the API of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/api)
* [JavaScript API Reference of the Scheduler](/api/javascript/ui/scheduler)
