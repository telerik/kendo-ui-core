---
title: Create and Set ObservableArray Events
page_title: Create and Set ObservableArray Events | Kendo UI Scheduler
description: "Learn how to create and set events using Kendo UI ObservableArray and AngularJS while working with the Kendo UI Scheduler widget."
slug: howto_createand_set_observablearray_events_angularjs_scheduler
---

# Create and Set ObservableArray Events

The example below demonstrates how to create events using Kendo UI `ObservableArray`, set them using AngularJS, and switch between timezones.

###### Example

```html
    <div id="example" ng-app="KendoDemos">
      <div ng-controller="MyCtrl">
        <div kendo-scheduler="scheduler" k-options="schedulerOptions" class=""></div>
      </div>
    </div>

    <script>
      angular.module("KendoDemos", [ "kendo.directives" ])
        .controller("MyCtrl", function($scope){

        var events = new kendo.data.ObservableArray([]);

        $scope.ds = new kendo.data.SchedulerDataSource({
          data: events,
          schema: {
            model: {
              id: "taskId",
              fields: {
                taskId: { from: "id", type: "number" },
                title: { from: "title", defaultValue: "No title", validation: { required: true } },
                start: { type: "date", from: "start" },
                end: { type: "date", from: "end" },
                description: { from: "description" },
                recurrenceId: { from: "recurrenceID" },
                recurrenceRule: { from: "recurrenceRule" },
                recurrenceException: { from: "recurrenceException" },
                isAllDay: { type: "boolean", from: "isAllDay" },
              }
            }
          }
        });

        $scope.schedulerOptions = {
          date: new Date("2014/09/08"),
          views: [
            { type: "day",  workWeekStart: 1, workWeekEnd: 7 },
            { type: "week", selected: true,workWeekStart: 1, workWeekEnd: 7 }
          ],
          timezone: "Etc/UTC",
          eventTemplate: "<span class='custom-event'>{{dataItem.title}} -- {{dataItem.title}}</span>",

          allDayEventTemplate: "<div class='custom-all-day-event'>{{dataItem.title}} *</div>",
          dataSource: $scope.ds
        };

        function fill() {
          var response = [
            {
              "description": "BH",
              "end": new Date("2014-09-08T04:30:00+0000"),
              "id": 26877083371,
              "isAllDay": false,
              "recurrenceException": null,
              "recurrenceId": 26825796528,
              "recurrenceRule": null,
              "start": new Date("2014-09-08T04:15:00+0000"),
              "title": "Event 1"

            }, {
              "description": "BH",
              "end": new Date("2014-09-08T04:00:00+0000"),
              "id": 26876983371,
              "isAllDay": false,
              "recurrenceException": null,
              "recurrenceId": 26825796525,
              "recurrenceRule": null,
              "start": new Date("2014-09-08T03:45:00+0000"),
              "title": "Event 2"
            }
          ];

          var event;
          var timezone = $scope.schedulerOptions.timezone;

          for (var i = 0; i < response.length; i++) {
            event = response[i];
            event.start = convertDate(event.start, timezone);
            event.end = convertDate(event.end, timezone);

            events.push(new kendo.data.SchedulerEvent(event));
          }

        };

        function convertDate(date, timezone) {
          return kendo.timezone.convert(date, date.getTimezoneOffset(), timezone);
        }

        setTimeout(function () {
          fill();
        }, 1000);
      });
    </script>
```

## See Also

Other how-to examples on the Kendo UI Scheduler in AngularJS:

* [How to Customize Edit and Event Templates]({% slug howto_createand_set_observablearray_events_angularjs_scheduler %})
* [How to Set Initial Data Manually]({% slug howto_set_intial_data_manually_angularjs_scheduler %})

Other articles and how-to examples on the Kendo UI Scheduler:

* [Scheduler JavaScript API Reference](/api/javascript/ui/scheduler)
* [How to Add Events Programmatically]({% slug howto_add_events_programatically_scheduler %})
* [How to Customize Edit and Events Templates]({% slug howto_customize_editand_event_templates_scheduler %})
* [How to Expand Scheduler to 100% Width and Height]({% slug howto_expand_scheduler_to100percent_widthandheight_scheduler %})
* [How to Filter Events by Resource Using MultiSelect]({% slug howto_filter_eventsby_resourceusing_multiselect_scheduler %})
* [How to Get Reference to the Built-In Validator]({% slug howto_get_referencetothe_builtin_validator_scheduler %})
* [How to Nest Editors inside Event Templates]({% slug howto_nest_editorsinside_event_templates_scheduler %})

For more runnable examples on the Kendo UI Scheduler, browse its [**How To** documentation folder]({% slug howto_add_controlsto_custom_event_editor_scheduler %}).
