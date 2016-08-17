---
title: Customize Edit and Events Templates
page_title: Customize Edit and Events Templates | Kendo UI Scheduler
description: "Learn how to create and use custom templates for the events and edit window of the Kendo UI Scheduler widget in AngularJS."
slug: howto_customize_editand_events_templates_angularjs_scheduler
---

# Customize Edit and Events Templates

The example below demonstrates how to create and use custom templates for the events and edit window of the Kendo UI Scheduler widget in AngularJS.

###### Example

```html
<div id="example" ng-app="KendoDemos">
    <div ng-controller="MyCtrl">
        <div kendo-scheduler k-options="schedulerOptions">
            <div k-event-template class="movie-template">
                <h5>{{ dataItem.title }}</h5>
                <p>{{ dataItem.description }}</p>
            </div>
        </div>
    </div>
</div>

<script>
  angular.module("KendoDemos", [ "kendo.directives" ])
    .controller("MyCtrl", function($scope){
        $scope.schedulerOptions = {
            editable: {
              template: $("#customEditorTemplate").html()
            },
            date: new Date("2013/6/13"),
            startTime: new Date("2013/6/13 07:00 AM"),
            height: 600,
            views: [
                "day",
                { type: "workWeek", selected: true },
                "week",
                "month",
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
        };
      })
  </script>
  <script id="customEditorTemplate" type="text/x-kendo-template">
    <div class="k-edit-label"><label for="title">Title</label></div>
    <div data-container-for="title" class="k-edit-field">
        <input type="text" class="k-input k-textbox" name="title" required="required" data-bind="value:title">
      </div>
    <div class="k-edit-label">
        <label for="start">Start</label>
      </div>
    <div data-container-for="start" class="k-edit-field">
        <input type="text"
               data-role="datetimepicker"
               data-interval="15"
               data-type="date"
               data-bind="value:start,invisible:isAllDay"
               name="start"/>
        <input type="text" data-type="date" data-role="datepicker" data-bind="value:start,visible:isAllDay" name="start" />
        <span data-bind="text: startTimezone"></span>
        <span data-for="start" class="k-invalid-msg" style="display: none;"></span>
      </div>
    <div class="k-edit-label"><label for="end">End</label></div>
    <div data-container-for="end" class="k-edit-field">
        <input type="text" data-type="date" data-role="datetimepicker" data-bind="value:end,invisible:isAllDay" name="end" data-datecompare-msg="End date should be greater than or equal to the start date" />
        <input type="text" data-type="date" data-role="datepicker" data-bind="value:end,visible:isAllDay" name="end" data-datecompare-msg="End date should be greater than or equal to the start date" />
        <span data-bind="text: endTimezone"></span>
        <span data-bind="text: startTimezone, invisible: endTimezone"></span>
        <span data-for="end" class="k-invalid-msg" style="display: none;"></span>
      </div>
    <div class="k-edit-label"><label for="isAllDay">All day event</label></div>
    <div data-container-for="isAllDay" class="k-edit-field">
        <input type="checkbox" name="isAllDay" data-type="boolean" data-bind="checked:isAllDay">
      </div>
    <div class="k-edit-label"><label for="recurrenceRule">Repeat</label></div>
    <div data-container-for="recurrenceRule" class="k-edit-field">
        <div data-bind="value:recurrenceRule" name="recurrenceRule" data-role="recurrenceeditor"></div>
      </div>
    <div class="k-edit-label"><label for="description">Description</label></div>
    <div data-container-for="description" class="k-edit-field">
        <textarea name="description" class="k-textbox" data-bind="value:description"></textarea>
      </div>
    <div class="k-edit-label"><label for="ownerId">Owner</label></div>
    <div data-container-for="ownerId" class="k-edit-field">
        <select id="ownerId" data-bind="value:ownerId" data-role="dropdownlist"
                        data-value-field="value" data-text-field="text">
          <option value="1">Alex</option>
          <option value="2">Bob</option>
          <option value="3">Charlie</option>
      </select>
      </div>
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

Other how-to examples on the Kendo UI Scheduler in AngularJS:

* [How to Create and Set ObservableArray Events]({% slug howto_createand_set_observablearray_events_angularjs_scheduler %})
* [How to Show Тooltip on hover]({% slug howto_show_tooltipon_hover_angularjs_scheduler %})

Other articles and how-to examples on the Kendo UI Scheduler:

* [Scheduler JavaScript API Reference](/api/javascript/ui/scheduler)
* [How to Add Events Programmatically]({% slug howto_add_events_programatically_scheduler %})
* [How to Calculate Scheduler Height Dynamically on Mobile]({% slug howto_calculate_scheduler_height_dunamically_onmobile_scheduler %})
* [How to Customize Edit and Events Templates]({% slug howto_customize_editand_event_templates_scheduler %})
* [How to Expand Scheduler to 100% Width and Height]({% slug howto_expand_scheduler_to100percent_widthandheight_scheduler %})
* [How to Filter Events by Resource Using MultiSelect]({% slug howto_filter_eventsby_resourceusing_multiselect_scheduler %})
* [How to Get Reference to the Built-In Validator]({% slug howto_get_referencetothe_builtin_validator_scheduler %})
* [How to Hide Edit Buttons]({% slug howto_hidethe_editbutons_scheduler %})
* [How to Nest Editors inside Event Templates]({% slug howto_nest_editorsinside_event_templates_scheduler %})

For more runnable examples on the Kendo UI Scheduler, browse its [**How To** documentation folder]({% slug howto_add_controlsto_custom_event_editor_scheduler %}).
