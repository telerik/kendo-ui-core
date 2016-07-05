---
title: Create Scheduler on the Client and Sync with Batch
page_title: Create Scheduler on the Client and Sync with Batch | Kendo UI Scheduler
description: "Learn how to create a Kendo UI Scheduler widget on the client and then sync the changes with the batch mode turned on."
slug: howto_create_a_scheduler_on_the_client_and_sync_with_batch_scheduler
---

# Create Scheduler on the Client and Sync with Batch

The example below demonstrates how to create a Kendo UI Scheduler widget on the client and then sync the changes with the batch mode turned on.

###### Example

```html
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

Other articles and how-to examples on the Kendo UI Scheduler:

* [Scheduler JavaScript API Reference](/api/javascript/ui/scheduler)
* [How to Add Controls to Custom Editor]({% slug howto_add_controlsto_custom_event_editor_scheduler %})
* [How to Add Events Programmatically]({% slug howto_add_events_programatically_scheduler %})
* [How to Calculate Scheduler Height Dynamically]({% slug howto_calculate_scheduler_height_dunamically_scheduler %})
* [How to Calculate Scheduler Height Dynamically on Mobile]({% slug howto_calculate_scheduler_height_dunamically_onmobile_scheduler %})
* [How to Create Custom Restrictions]({% slug howto_create_custom_restrivtions_scheduler %})
* [How to Hide Edit Buttons]({% slug howto_hidethe_editbutons_scheduler %})
* [How to Implement Custom Editing in `agenda` View]({% slug howto_implement_custom_editing_inagenda_view_scheduler %})
* [How to Nest Editors inside Event Templates]({% slug howto_nest_editorsinside_event_templates_scheduler %})
* [How to Use Custom Event Template with Specific Background Color]({% slug howto_use_custom_event_templatewith_specific_background_color_scheduler %})

How-to examples on the Kendo UI Scheduler in AngularJS:

* [How to Edit Using ContextMenu]({% slug howto_edit_using_contectmenu_angularjs_scheduler %})
* [How to Set Initial Data Manually]({% slug howto_set_intial_data_manually_angularjs_scheduler %})
* [How to Wrap Scheduler in Custom Directives]({% slug howto_wrap_schedulerin_custom_directives_angularjs_scheduler %})

For more runnable examples on the Kendo UI Scheduler, browse its [**How To** documentation folder]({% slug howto_add_controlsto_custom_event_editor_scheduler %}).
