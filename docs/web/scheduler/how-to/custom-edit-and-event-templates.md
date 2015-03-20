---
title: Custom edit and event templates
page_title: Custom edit and event templates
description: Custom edit and event templates
---

# Custom edit and event templates

The example below demonstrates how to create and use custom templates for the Kendo UI Scheduler events and edit window.

#### Example:

```html
    <div id="example">
      <div id="team-schedule">
        <div id="people">
          <input checked type="checkbox" id="alex" value="1">
          <input checked type="checkbox" id="bob" value="2">
          <input type="checkbox" id="charlie" value="3">
        </div>
      </div>
      <div id="scheduler"></div>
    </div>
    <script id="event-template" type="text/x-kendo-template">
    <div class="movie-template">
      <p>
          #: kendo.toString(start, "hh:mm") # - #: kendo.toString(end, "hh:mm") #
      </p>
      <h3>#: title #</h3>
      <p>#: description #</p>
      </div>
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
          <!--<option value="1">Alex</option>
          <option value="2">Bob</option>
          <option value="3">Charlie</option>-->
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
          ],
          edit: function(e) {
            var ownerId = e.container.find("#ownerId").data("kendoDropDownList");

            //bind the widget to the resouces
            ownerId.dataSource.data(e.sender.resources[0].dataSource.data());
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
