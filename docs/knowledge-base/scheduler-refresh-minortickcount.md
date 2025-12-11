---
title: Changing MinorTickCount at Runtime in Kendo jQuery Scheduler 
description: Learn how to update the `minorTickCount` property dynamically using the `.view()` method in Scheduler.
type: how-to
page_title: Modify minorTickCount in Kendo Scheduler
slug: scheduler-refresh-minortickcount
tags: scheduler, view, minorTickCount, setOptions, kendo ui
res_type: kb
components: ["scheduler"]
ticketid: 1689609
---

## Environment
<table>
<tbody>
<tr>
<td>Product</td>
<td>
Scheduler for Progress® Kendo UI®
</td>
</tr>
<tr>
<td>Version</td>
<td>2025.2.520</td>
</tr>
</tbody>
</table>

## Description

When changing the `minorTickCount` property of the Scheduler using the `setOptions` method and attempting to reload the view with `scheduler.view("day")`, the Scheduler may not redraw correctly to reflect the updated `minorTickCount`. This issue can occur because the changes are not applied directly to the current view configuration.

This knowledge base article also answers the following questions:
- How to refresh Kendo UI Scheduler after modifying minorTickCount?
- Why is the Scheduler view not updating after changing minorTickCount?
- How can I apply minorTickCount changes to the current Scheduler view?

## Solution

To ensure the Scheduler view updates correctly after changing the `minorTickCount`, use the following approach:

### Applying `minorTickCount` to a Specific View

If the `minorTickCount` is set per view, update the view configuration and refresh the view using the `.view()` method:

```javascript
$("#scheduler").data("kendoScheduler").views["day"].minorTickCount = 5;
$("#scheduler").data("kendoScheduler").view("day");
```

### Applying `minorTickCount` to the Current View

To apply the change to the current view dynamically, retrieve the current view name and refresh it:

```javascript
$("#scheduler").data("kendoScheduler").views[scheduler.viewName()].minorTickCount = 5;
$("#scheduler").data("kendoScheduler").view(scheduler.viewName());
```

### Example

```dojo
    <script src="../content/shared/js/schedulerTasks.js"></script>

    <div id="example">
      <div id="scheduler"></div>
      <button id="updateMinorTickCountButton">Update minor tick count</button>
    </div>

    <script id="event-template" type="text/x-kendo-template">
      <div class="template-container">
          # if (image != "") { #
          <img alt="Kendo UI for jQuery Scheduler #:title #" src="#= image #" style="height:25px; width: 25px;">
          # } #
          <h3 class="template-title-#= resources[0].value #">#: title #</h3>
      </div>
    </script>

    <script>
      var sampleDataNextID = schedulerTasks.length + 1;

      function getIndexById(id) {
        var idx,
          l = schedulerTasks.length;

        for (var j = 0; j < l; j++) {
          if (schedulerTasks[j].id == id) {
            return j;
          }
        }
        return null;
      }

      $(function () {
        var dataSource = new kendo.data.SchedulerDataSource({
          transport: {
            read: function (e) {
              e.success(schedulerTasks);
            },
            create: function (e) {
              e.data.id = sampleDataNextID++;
              schedulerTasks.push(e.data);
              e.success(e.data);
            },
            update: function (e) {
              schedulerTasks[getIndexById(e.data.id)] = e.data;
              e.success();
            },
            destroy: function (e) {
              schedulerTasks.splice(getIndexById(e.data.id), 1);
              e.success();
            },
          },
          error: function (e) {
            alert("Status: " + e.status + "; Error message: " + e.errorThrown);
          },
          batch: false,
          schema: {
            model: {
              id: "id",
              fields: {
                id: { type: "number" },
                title: {
                  field: "title",
                  defaultValue: "No title",
                  validation: { required: true },
                },
                start: { type: "date", field: "start" },
                end: { type: "date", field: "end" },
                description: { field: "description" },
                recurrenceRule: { from: "recurrenceRule" },
                recurrenceException: { from: "recurrenceException" },
                attendee: { field: "attendee", defaultValue: 1 },
                isAllDay: { type: "boolean", field: "isAllDay" },
                image: { from: "image", defaultValue: "" },
              },
            },
          },
        });

        $("#scheduler").kendoScheduler({
          date: new Date("2020/10/4"),
          startTime: new Date("2020/10/4 7:00"),
          endTime: new Date("2020/10/4 20:00"),
          height: 600,
          views: [
            { type: "day", minorTickCount: 2 },
            { type: "week", selected: true },
            "workWeek",
            "month",
            "agenda",
          ],
          timezone: "Etc/UTC",
          eventTemplate: $("#event-template").html(),
          dataSource: dataSource,
          resources: [
            {
              field: "attendee",
              dataSource: [
                { text: "Jason", value: 1, color: "#eaf8ff" },
                { text: "Maddie", value: 2, color: "#fdfdf4" },
              ],
            },
          ],
        });

        $("#updateMinorTickCountButton").click(function () {
          const Scheduler = $("#scheduler").data("kendoScheduler");

          alert(
            "current minor tick count " +
              Scheduler.options.views[0].minorTickCount,
          );

          Scheduler.setOptions({
            views: [
              { type: "day", minorTickCount: 5 },
              { type: "week", selected: true },
              "workWeek",
              "month",
              "agenda",
            ],
          });

          alert(
            "current minor tick count " +
              Scheduler.options.views[0].minorTickCount,
          );

          $("#scheduler").data("kendoScheduler").views["day"].minorTickCount =
            5;
          $("#scheduler").data("kendoScheduler").view(Scheduler.viewName());
        });
      });
    </script>

    <style>
      .template-container {
        margin-top: -8px;
      }

      .template-container img {
        float: left;
        margin: 0 4px;
        margin-right: 10px;
      }

      .template-container h3 {
        padding: 0 4px 4px;
        font-size: 12px;
        font-weight: 400;
        margin-right: 14px;
      }

      .template-title-1 {
        color: #65ccff;
      }

      .template-title-2 {
        color: #d0d03b;
      }

      .k-event .k-i-reload,
      .k-event .k-i-non-recurrence {
        display: none;
      }
    </style>
```

## See Also

- [Scheduler Documentation](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler)
- [Scheduler View Configuration](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler/configuration/views)
- [Scheduler minorTickCount API](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler#configuration-views.minorTickCount)
