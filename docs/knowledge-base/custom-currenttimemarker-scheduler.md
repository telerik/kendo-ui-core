---
title: Customizing the Current Time Marker in Scheduler
description: Learn how to set a custom time marker in the Scheduler component using JavaScript or jQuery.
type: how-to
page_title: How to Set a Custom Time for the CurrentTimeMarker in Scheduler
slug: custom-currenttimemarker-scheduler
tags: scheduler, currenttimemarker, customization, javascript, jquery
res_type: kb
components: ["scheduler"]
ticketid: 1643757
---

## Environment
<table>
<tbody>
<tr>
<td>Product</td>
<td>Scheduler for Progress® Kendo UI®</td>
</tr>
<tr>
<td>Version</td>
<td>2024.4.1112</td>
</tr>
</tbody>
</table>

## Description
Setting a custom time for the `currentTimeMarker` in the Scheduler component involves specifying a time different from the actual current time. The objective is to display a line across the Scheduler indicating a specified time to the user. Additionally, extending this line to appear in the time column enhances its visibility and utility. This KB article also answers the following questions:
- How can I display a custom time marker in the Scheduler?
- Is it possible to adjust the `currentTimeMarker` to a specific time instead of the real-time?
- Can the custom time marker line extend into the time column?

## Solution
To customize the [`currentTimeMarker`](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler/configuration/currenttimemarker) in the Scheduler, you need to implement custom logic within the [`dataBound`](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler/events/databound) event handler. The following steps guide you through creating and positioning a custom time marker:

1. Define a custom function to be executed on the Scheduler's `dataBound` event. This function calculates the position for the custom time marker based on a specified time.

2. Append a custom marker element to the Scheduler's view. This involves creating a new element and positioning it at the calculated top position corresponding to the specified time.

3. To extend the marker line over the time column, append a second line with similar styling and position.

Here is a runnable Dojo demo demonstrating these steps:

```dojo
    <div id="scheduler"></div>
    <script>
      $("#scheduler").kendoScheduler({
        date: new Date(),
        currentTimeMarker: false,
        views: [
          "day", "week", "workWeek"
        ],
        dataBound: function(e){
          var specifiedTime = new Date();
          specifiedTime.setHours(specifiedTime.getHours() - 3);
                    
          appendCustomTimeMarker(e.sender, specifiedTime);
        }
      });

      function appendCustomTimeMarker(scheduler, date) {
        var BORDER_SIZE_COEFF = 0.866;
        var marker = $('<div class="k-current-time-arrow-right"></div>').prependTo(scheduler.view().times);
        
        var markerContent = $('<div></div>').prependTo(scheduler.view().content);
        
        var timeMarkerContent = $('<div></div>').prependTo(scheduler.view().times);
        
        var groups = scheduler.view().groups[0];
        var utcTime = kendo.date.toUtcTime(date);
        var range = groups.timeSlotRanges(utcTime, utcTime + 1)[0];
        var markerTopPos = Math.round(range.innerRect(date, new Date(date.getTime() + 1), false).top);
        var markerWidth = scheduler.view().content[0].width;
        marker.css({
          top: markerTopPos - (marker.outerWidth() * BORDER_SIZE_COEFF / 2),
          position: "absolute"
        });
        
        timeMarkerContent.css({
          top: markerTopPos,
          position: "absolute",
          backgroundColor: "red",
          height: "2px",
          right: 0,
          width: markerWidth,
          left: 0
        });
        
        markerContent.css({
          top: markerTopPos,
          position: "absolute",
          backgroundColor: "red",
          height: "2px",
          right: 0,
          width: markerWidth,
          left: 0
        });
      }
    </script>
```

## See Also
- [Scheduler DataBound Event Documentation](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler/events/databound)
- [Scheduler Overview](https://docs.telerik.com/kendo-ui/controls/scheduling/scheduler/overview)
- [Scheduler API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler)
