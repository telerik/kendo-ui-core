---
title: Persist All Changes with One Request
page_title: Persist All Changes with One Request | Kendo UI Scheduler
description: "Learn how to persist all changes in a Kendo UI Scheduler with a single request."
slug: howto_persist_all_changes_with_a_single_request_scheduler
---

# Persist All Changes with One Request

The example below demonstrates how to persist all changes in a Kendo UI Scheduler with a single request.

###### Example

```html
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
              url: "http://demos.kendoui.com/service/meetings",
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
          url: "http://demos.kendoui.com/service/meetings/update",
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

                //create fake id for new events - needs additional handling
                //the ID generation below is just for demo purposes, consider using kendo.guid() instead
                //for example:
                //1) after custom save to the server is completed to refresh the scheduler data.
                // or
                //2) after custom save is completed to manualy find the new records and update their ids.
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

Other articles and how-to examples on the Kendo UI Scheduler:

* [Scheduler JavaScript API Reference](/api/javascript/ui/scheduler)
* [How to Add Controls to Custom Editor]({% slug howto_add_controlsto_custom_event_editor_scheduler %})
* [How to Add Events Programmatically]({% slug howto_add_events_programatically_scheduler %})
* [How to Calculate Scheduler Height Dynamically]({% slug howto_calculate_scheduler_height_dunamically_scheduler %})
* [How to Calculate Scheduler Height Dynamically on Mobile]({% slug howto_calculate_scheduler_height_dunamically_onmobile_scheduler %})
* [How to Create Custom Views Inheriting Built-In Views]({% slug howto_create_custom_view_inheriting_builtinview_scheduler %})
* [How to Expand Scheduler to 100% Width and Height]({% slug howto_expand_scheduler_to100percent_widthandheight_scheduler %})
* [How to Filter Events by Resource Using MultiSelect]({% slug howto_filter_eventsby_resourceusing_multiselect_scheduler %})
* [How to Get Reference to the Built-In Validator]({% slug howto_get_referencetothe_builtin_validator_scheduler %})
* [How to Hide Edit Buttons]({% slug howto_hidethe_editbutons_scheduler %})
* [How to Nest Editors inside Event Templates]({% slug howto_nest_editorsinside_event_templates_scheduler %})
* [How to Use Custom Event Template with Specific Background Color]({% slug howto_use_custom_event_templatewith_specific_background_color_scheduler %})

How-to examples on the Kendo UI Scheduler in AngularJS:

* [How to Edit Using ContextMenu]({% slug howto_edit_using_contectmenu_angularjs_scheduler %})
* [How to Set Initial Data Manually]({% slug howto_set_intial_data_manually_angularjs_scheduler %})
* [How to Wrap Scheduler in Custom Directives]({% slug howto_wrap_schedulerin_custom_directives_angularjs_scheduler %})

For more runnable examples on the Kendo UI Scheduler, browse its [**How To** documentation folder]({% slug howto_add_controlsto_custom_event_editor_scheduler %}).
