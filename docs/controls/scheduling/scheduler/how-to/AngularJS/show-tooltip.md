---
title: Show Тooltip on hover
page_title: Show Тooltip on hover | Kendo UI Scheduler
description: "Learn how to add a tooltip that opens upon a hover event to the Kendo UI Scheduler widget."
slug: howto_show_tooltipon_hover_angularjs_scheduler
---

# Show Тooltip on hover

The example below demonstrates how to add a tooltip that opens upon a `hover` event and shows additional metadata when using Kendo UI Scheduler in AngularJS.

###### Example

```html
<div id="example" ng-app="KendoDemos">
    <div ng-controller="MyCtrl">
        <div kendo-tooltip k-content="theContent" k-filter="'.k-event'" class="k-group">
          <div kendo-scheduler k-options="schedulerOptions">
              <span k-event-template class='custom-event'>{{dataItem.title}}</span>
              <div k-all-day-event-template class='custom-all-day-event'>{{dataItem.title}}</div>
          </div>
        </div>
    </div>
</div>

<script id="template" type="text/x-kendo-template">
    #var uid = target.attr("data-uid");#
    #var scheduler = target.closest("[data-role=scheduler]").data("kendoScheduler");#
    #if (scheduler) {#
      #var model = scheduler.occurrenceByUid(uid);#

      #if(model) {#
          <strong>event start:</strong> #=kendo.format('{0:d}',model.start)#<br />
          <strong>event end:</strong> #=kendo.format('{0:d}',model.end)#<br />
          <strong>event description:</strong> #=model.description#<br />
      #} else {#
          <strong>No event data is available</strong>
      #}#
    #}#
</script>
<script>
  angular.module("KendoDemos", [ "kendo.directives" ])
    .controller("MyCtrl", function($scope){
            $scope.theContent = kendo.template($("#template").html());
        $scope.schedulerOptions = {
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
```

## See Also

Other how-to examples on the Kendo UI Scheduler in AngularJS:

* [How to Create and Set ObservableArray Events]({% slug howto_createand_set_observablearray_events_angularjs_scheduler %})
* [How to Wrap Scheduler in Custom Directives]({% slug howto_wrap_schedulerin_custom_directives_angularjs_scheduler %})

Other articles and how-to examples on the Kendo UI Scheduler:

* [Scheduler JavaScript API Reference](/api/javascript/ui/scheduler)
* [How to Add Events Programmatically]({% slug howto_add_events_programatically_scheduler %})
* [How to Calculate Scheduler Height Dynamically]({% slug howto_calculate_scheduler_height_dunamically_scheduler %})
* [How to Create External Editor Form]({% slug howto_create_external_editor_form_scheduler %})
* [How to Edit Using ContextMenu]({% slug howto_edit_using_kendouicontextmenu_scheduler %})
* [How to Filter Events by Resource Using MultiSelect]({% slug howto_filter_eventsby_resourceusing_multiselect_scheduler %})
* [How to Get Reference to the Built-In Validator]({% slug howto_get_referencetothe_builtin_validator_scheduler %})
* [How to Use Custom Event Template with Specific Background Color]({% slug howto_use_custom_event_templatewith_specific_background_color_scheduler %})

For more runnable examples on the Kendo UI Scheduler, browse its [**How To** documentation folder]({% slug howto_add_controlsto_custom_event_editor_scheduler %}).
