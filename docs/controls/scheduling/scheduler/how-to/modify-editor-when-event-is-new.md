---
title: Modify Editor Template upon New Events
page_title: Modify Editor Template upon New Events | Kendo UI Scheduler
description: "Learn how to show or hide different parts of the editor template based on the event state in a Kendo UI Scheduler widget."
slug: howto_modifyeditortemplate_wheneventisnew_scheduler
---

# Modify Editor Template upon New Events

The example below demonstrates how to show/hide different parts of the editor template based on the event state, namely, it hides the `Title` field if the event is not new and displays a message.

###### Example

```html
<div id="example">
  <div id="scheduler"></div>
</div>
<script id="customEditorTemplate" type="text/x-kendo-template">
<!-- notice how the Title is hidden if the event is new -->
<div data-bind="visible: isNew">
  <div class="k-edit-label"><label for="title">Title</label></div>
  <div data-container-for="title" class="k-edit-field">
      <input type="text" class="k-input k-textbox" name="title" required="required" data-bind="value:title">
  </div>
</div>
<div data-bind="invisible: isNew">
    <h4>The 'Title' field is hiddne, because event is not new</h4>
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
<script>
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
        "agenda"
      ],
      editable: {
        template: $("#customEditorTemplate").html(),
      },
      eventTemplate: $("#event-template").html(),
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
    });
  });
</script>
```

## See Also

Other articles and how-to examples on the Kendo UI Scheduler:

* [Scheduler JavaScript API Reference](/api/javascript/ui/scheduler)
* [How to Create Recurrence Editor Using Mobile Editor]({% slug howto_createrecurrenceeditor_byusingmobileeditor_scheduler %})
* [How to Export to iCal]({% slug howto_exportto_ical_scheduler %})
* [How to Hide Header and Footer in Adaptive Rendering]({% slug howto_hideheaderandfooter_inadaptiverebdering_scheduler %})
* [How to Hide Time Headers]({% slug howto_hide_time_headers_scheduler %})
* [How to Modify Event Styling on databound]({% slug howto_modifyeventstyling_ondatabound_scheduler %})
* [How to Persist Resource Values on move]({% slug howto_persistresourcevalues_onamoveevent_scheduler %})
* [How to Prevent Moving AllDay Events outside the AllDay Header]({% slug howto_preventmovingalldayevents_fromalldayheader_scheduler %})
* [How to Work with Scheduler Offline]({% slug howto_setupthewidget_toworkoffline_scheduler %})
* [How to Use Remote Validation]({% slug howto_useremotevalidation_scheduler %})

How-to examples on the Kendo UI Scheduler in AngularJS:

* [How to Create and Set ObservableArray Events]({% slug howto_createand_set_observablearray_events_angularjs_scheduler %})
* [How to Edit Using ContextMenu]({% slug howto_edit_using_contectmenu_angularjs_scheduler %})
* [How to Set Initial Data Manually]({% slug howto_set_intial_data_manually_angularjs_scheduler %})
* [How to Show Тooltip on hover]({% slug howto_show_tooltipon_hover_angularjs_scheduler %})
* [How to Wrap Scheduler in Custom Directives]({% slug howto_wrap_schedulerin_custom_directives_angularjs_scheduler %})

For more runnable examples on the Kendo UI Scheduler, browse its [**How To** documentation folder]({% slug howto_add_controlsto_custom_event_editor_scheduler %}).
