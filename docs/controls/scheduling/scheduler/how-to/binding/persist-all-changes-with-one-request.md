---
title: Persist All Changes with One Request
page_title: Persist All Changes with One Request | Kendo UI Scheduler
description: "Learn how to persist all changes in a Kendo UI Scheduler with a single request."
previous_url: /controls/scheduling/scheduler/how-to/persist-all-changes-with-one-request
slug: howto_persist_all_changes_with_a_single_request_scheduler
---

# Persist All Changes with One Request

The following example demonstrates how to persist all changes with a single request in the Scheduler.

```dojo
<div id="example">

      <div id="scheduler"></div>
    </div>
    <script>
      var remoteDataSource;
      var scheduler;

      var created = [];
      var updated = [];
      var destroyed = [];

      $(function() {
        remoteDataSource = new kendo.data.SchedulerDataSource({
          batch: true,
          transport: {
            read: {
              url: "https://demos.telerik.com/kendo-ui/service/meetings",
              dataType: "jsonp"
            }
          }
        });

        remoteDataSource.one("change", function() {
          scheduler = initScheduler(this);
        })

        remoteDataSource.read();

      })

      function syncAllChanges() {
        var dataForSync = {};
        if (created.length) {
        	dataForSync.created = created;
        }

        if (updated.length) {
        	dataForSync.updated = updated;
        }

        if (destroyed.length) {
        	dataForSync.destroyed = destroyed;
        }

        $.ajax({
          url: "https://demos.telerik.com/kendo-ui/service/meetings/update",
          data: dataForSync,
          success: function (e) {
          	destroyed = [];
            updated = [];
            created = [];
          }
        })

      }

      function initScheduler(remoteDataSource) {
        return $("#scheduler").kendoScheduler({
          date: new Date("2013/6/13"),
          startTime: new Date("2013/6/13 07:00 AM"),
          height: 600,
          views: [
            "day", {
              type: "week",
              selected: true
            },
            "month",
            "agenda"
          ],
          save: function() {
            setTimeout(function () {
              syncAllChanges();
            })
          },
          timezone: "Etc/UTC",
          dataSource: {
            batch: true,
            transport: {
              read: function(e) {
                var data = remoteDataSource.data().toJSON();
                e.success(data);
              },
              update: function(e) {
                var model = e.data.models[0];
                updated.push(model);

                e.success("");
              },
              create: function(e) {
                var model = e.data.models[0];
                created.push(model);

                // Create a fake id for new events which needs additional handling.
                // The ID generation below is just for demo purposes. Consider using kendo.guid() instead.
                // For example:
                // 1) After the custom save to the server is completed to refresh the Scheduler data.
                // or
                // 2) After the custom save is completed to manually find the new records and update their ids.
                model.meetingID = Math.ceil(Math.random() * 1000);

                e.success([model]);
              },
              destroy: function(e) {
                var model = e.data.models[0];
                destroyed.push(model);

                e.success("");
              }
            },
            schema: {
              model: {
                id: "meetingID",
                fields: {
                  meetingID: {
                    from: "MeetingID",
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
                  roomId: {
                    from: "RoomID",
                    nullable: true
                  },
                  atendees: {
                    from: "Attendees",
                    nullable: true
                  },
                  isAllDay: {
                    type: "boolean",
                    from: "IsAllDay"
                  }
                }
              }
            }
          },
          resources: [{
            field: "roomId",
            dataSource: [{
              text: "Meeting Room 101",
              value: 1,
              color: "#6eb3fa"
            }, {
              text: "Meeting Room 201",
              value: 2,
              color: "#f58a8a"
            }],
            title: "Room"
          }, {
            field: "atendees",
            dataSource: [{
              text: "Alex",
              value: 1,
              color: "#f8a398"
            }, {
              text: "Bob",
              value: 2,
              color: "#51a0ed"
            }, {
              text: "Charlie",
              value: 3,
              color: "#56ca85"
            }],
            multiple: true,
            title: "Atendees"
          }]
        }).data("kendoScheduler");
      }

    </script>
```

## See Also

* [Basic Usage of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/index)
* [Using the API of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/api)
* [JavaScript API Reference of the Scheduler](/api/javascript/ui/scheduler)
