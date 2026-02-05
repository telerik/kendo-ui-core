---
title: Fixing Scroll to Hour Issue After Programmatic Data Refresh in Kendo UI for jQuery Scheduler
description: Learn how to resolve the issue where the scrollToHour function fails after a programmatic scheduler.dataSource.read() in Kendo UI for jQuery Scheduler.
type: how-to
page_title: Resolving Scroll to Hour Issue in Kendo UI for jQuery Scheduler After scheduler.dataSource.read()
meta_title: Resolving Scroll to Hour Issue in Kendo UI for jQuery Scheduler After scheduler.dataSource.read()
slug: scroll-to-hour-scheduler-data-refresh
tags: scheduler, kendo-ui-for-jquery, datasource, scrolltohour, major-tick, minor-tick-count
res_type: kb
components: ["scheduler"]
ticketid: 1698589
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Kendo UI for jQuery Scheduler</td>
</tr>
<tr>
<td>Version</td>
<td>2025.4.1217</td>
</tr>
</tbody>
</table>

## Description

In Kendo UI for jQuery [Scheduler](https://www.telerik.com/kendo-jquery-ui/documentation/controls/scheduler/overview), the `scrollToHour` function may fail to scroll to the correct time slot after a programmatic `scheduler.dataSource.read()` refresh. This issue occurs due to differences in slot rendering between data refreshes and view switches, especially on high-DPI monitors with display scaling. The issue is more prominent when using intervals smaller than 60 minutes, such as 30, 15, or 10 minutes.

This knowledge base article also answers the following questions:
- How to fix scrollToHour not working after [`scheduler.dataSource.read()`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/data/datasource/methods/read)?
- How to calculate the correct scroll position for different time slot intervals in Kendo Scheduler?
- Why does scrollToHour behave inconsistently after data refresh in Kendo Scheduler?

## Solution

Follow these steps to fix the scrollToHour functionality.

### Updated scrollToHour Function

Use the following updated `scrollToHour` function to calculate the correct scroll position based on [`majorTick`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/scheduler/configuration/majortick) and [`minorTickCount`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/scheduler/configuration/minortickcount) options.

```javascript
function scrollToHour(targetHour) {
    var scheduler = $("#scheduler").data("kendoScheduler");
    var view = scheduler.view();
    var contentDiv = scheduler.element.find(".k-scheduler-content");
    var timeRows = scheduler.element.find(".k-scheduler-times tr");
    if (!timeRows.length) return;

    // Get majorTick and minorTickCount from the current view
    var majorTick = view.options.majorTick || 60;
    var minorTickCount = view.options.minorTickCount || 1;
    var slotsPerHour = (60 / majorTick) * minorTickCount;

    var startHour = scheduler.options.startTime.getHours();
    var slotIndex = Math.round((targetHour - startHour) * slotsPerHour);

    // Clamp slotIndex to available rows
    slotIndex = Math.max(0, Math.min(slotIndex, timeRows.length - 1));

    var slotHeight = timeRows.first().outerHeight();
    var scrollTop = slotIndex * slotHeight;

    contentDiv.scrollTop(scrollTop);
}
```

### Implementation Steps

1. Replace the existing `scrollToHour` function in your codebase with the updated one.
2. Call the `scrollToHour` function after the `scheduler.dataSource.read()` refresh to ensure it scrolls to the correct time slot.

### Example Usage

```javascript
$("#readBtn").on("click", function () {
    var scheduler = $("#scheduler").data("kendoScheduler");
    scheduler.dataSource.read().done(function () {
        scrollToHour(11); // Scroll to 11:00 AM
    });
});
```

Full example

```dojo
<button id="readBtn" type="button" class="k-button k-button-primary">Read</button>
<br>
<br>
<div id="scheduler"></div>
<script>
    $(function () {
      isViewSupported = function (scheduler) {
            var viewType = scheduler.view().name;
            var supportedViews = [
                "day",
                "week"
            ];
            return supportedViews.includes(viewType);
        }

		  function scrollToHour(targetHour) {
		      var scheduler = $("#scheduler").data("kendoScheduler");
		      var view = scheduler.view();
		      var contentDiv = scheduler.element.find(".k-scheduler-content");
		      var timeRows = scheduler.element.find(".k-scheduler-times tr");
		      if (!timeRows.length) return;

		      // Get majorTick and minorTickCount from the current view
		      var majorTick = view.options.majorTick || 60;
		      var minorTickCount = view.options.minorTickCount || 1;
		      var slotsPerHour = (60 / majorTick) * minorTickCount;

		      var startHour = scheduler.options.startTime.getHours();
		      var slotIndex = Math.round((targetHour - startHour) * slotsPerHour);

		      // Clamp slotIndex to available rows
		      slotIndex = Math.max(0, Math.min(slotIndex, timeRows.length - 1));

		      var slotHeight = timeRows.first().outerHeight();
		      var scrollTop = slotIndex * slotHeight;

		      contentDiv.scrollTop(scrollTop);
		  }

          var scheduler = $("#scheduler").kendoScheduler({
            date: new Date("2025/6/24"),
            startTime: new Date("2025/6/14 07:00 AM"),
            height: 600,
            views: [
                "day",
              	"week",
            ],
            timezone: "Etc/UTC",
            dataSource: {
                batch: true,
                transport: {
                    read: {
                        url: "https://demos.telerik.com/service/v2/core/tasks"
                    },
                    update: {
                        url: "https://demos.telerik.com/service/v2/core/tasks/update",
                        type: "POST",
                        contentType: "application/json"
                    },
                    create: {
                        url: "https://demos.telerik.com/service/v2/core/tasks/create",
                        type: "POST",
                        contentType: "application/json"
                    },
                    destroy: {
                        url: "https://demos.telerik.com/service/v2/core/tasks/destroy",
                        type: "POST",
                        contentType: "application/json"
                    },
                    parameterMap: function (options, operation) {
                        if (operation !== "read" && options.models) {
                            return kendo.stringify(options.models);
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
            },
            dataBound: function (e) {
                // View has timeslots?
                if (isViewSupported(scheduler)) {
                    var view = scheduler.view();
                    var start = view.startDate();
                    var endDate = view.endDate();
                    var end = new Date(endDate);
                    end.setHours(23, 59, 59, 999);

                    elements = scheduler.occurrencesInRange(start, end);
                  console.log("elements", elements)
                    var hour = 24;

                    for (var i = 0; i < elements.length; i++) {
                        var booking = elements[i];
                        if (!booking.isAllDay && booking.start.getHours() < hour) {
                            hour = booking.start.getHours();
                          console.log("hour", hour)
                        }

                    }
                    console.log("dataBound scrollToTop hour", hour)
                    scrollToHour(hour);

                }
            },
        }).data("kendoScheduler");

        $("#readBtn").on("click", function (e) {
           scheduler.dataSource.read();
        });
    });
</script>
```

### Explanation

- **slotsPerHour Calculation**: This accounts for the number of slots per hour based on the `majorTick` duration and `minorTickCount` divisions.
- **Clamp slotIndex**: Ensures the calculated index is within the valid range of rows.
- **Scroll Calculation**: Computes the scroll position using the slot index and height of each slot.

### Key Notes

- Ensure the Scheduler is in a time-based view (e.g., Day, Week, or WorkWeek).
- If you dynamically change `majorTick` or `minorTickCount`, verify the values are updated correctly in the function.

## See Also

- [Kendo UI Scheduler Documentation](https://www.telerik.com/kendo-jquery-ui/documentation/controls/scheduler/overview)
- [Scheduler Configuration Options](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/scheduler#configuration)
- [Scheduler View Options](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/scheduler)
