---
title: Color Coding Recurring Appointments in Kendo UI Scheduler
description: Learn how to color code recurring appointments in the Kendo UI Scheduler by overriding the default rendering behavior.
type: how-to
page_title: Implementing Color Coding for Recurring Events in Kendo UI Scheduler
slug: color-coding-recurring-appointments-kendo-ui-scheduler
tags: kendo-ui,scheduler,recurring-events,color-coding,eventtemplate,occurrencesinrange
res_type: kb
components: ["scheduler"]
ticketid: 1686851
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Kendo UI Scheduler</td>
</tr>
<tr>
<td>Version</td>
<td>2025.1.227</td>
</tr>
</tbody>
</table>

## Description

When color coding appointments in the [Kendo UI Scheduler](https://docs.telerik.com/kendo-ui/controls/scheduler/overview), recurring appointments often default to the scheduler's default color (e.g., grey) instead of the custom colors specified. This happens because occurrences of recurring events are generated on the client side by the Scheduler component and are not part of the original data source. The challenge is to apply custom colors to these recurring appointments.

This knowledge base article also answers the following questions:
- How to apply custom colors to recurring events in Kendo UI Scheduler?
- How to override the default color for recurring appointments in Kendo Scheduler?
- How to use the occurrencesInRange method for recurring event customization?

## Solution

To color code recurring appointments, use the [`occurrencesInRange`](/api/javascript/ui/scheduler/methods/occurrencesinrange) method to retrieve recurring events within the current view and apply custom styling to their elements.

### Implementation Using `occurrencesInRange`

The following example demonstrates how to retrieve recurring events using the `occurrencesInRange` method and apply custom colors:

```javascript
dataBound: function (e) {
    var scheduler = $("#scheduler").data("kendoScheduler");
    var view = scheduler.view();

    // Get the current view's start and end dates
    var start = view.startDate();
    var end = view.endDate();
    var endView = new Date(end);
    endView.setHours(23); // Adjust end time to include the full day

    // Retrieve all occurrences within the current range
    var elements = scheduler.occurrencesInRange(start, endView);

    // Apply custom colors to recurring events
    for (var i = 0; i < elements.length; i++) {
        var booking = elements[i];
        var ele = $('.k-event[data-uid="' + booking.uid + '"]');

        if (booking) {
            if (booking.color !== "" && booking.color !== null) {
                ele.css("background-color", booking.color); // Set background color
            }
        }
    }
}
```

Below is a runnable example:

```dojo
 <div id="scheduler"></div>
    <script>
      $("#scheduler").kendoScheduler({
        date: new Date("2025/6/6"),
        dataBound: function (e) {
          var scheduler = $("#scheduler").data("kendoScheduler");
          var view = scheduler.view();

          var start = view.startDate();
          var end = view.endDate();
          var endView = new Date(end);
          endView.setHours(23);
          var elements = scheduler.occurrencesInRange(start, endView);
         
          for (var i = 0; i < elements.length; i++) {
            var booking = elements[i];
            var ele = $('.k-event[data-uid="' + booking.uid + '"]');

            if (booking) {
              if (booking.color !== "" && booking.color !== null) {
                ele.css("background-color", booking.color);
              }
            }
          }
        },
        showWorkHours: true,
        views: [
          { type: "day", selected: true },
          { type: "week" },
          { type: "month" },
        ],
        dataSource: [
          {
            id: 1,
            start: new Date("2025/6/2 08:00 AM"),
            end: new Date("2025/6/2 09:00 AM"),
            title: "Interview",
            color: "green",
            recurrenceRule: "FREQ=DAILY",
          },
          {
            id: 2,
            start: new Date("2025/6/4 08:00 AM"),
            end: new Date("2025/6/4 09:00 AM"),
            title: "Meeting",
            color: "mediumpurple",
            recurrenceRule: "FREQ=WEEKLY",
          },
        ],
      });
    </script>
```

### Alternative Approach Using Templates

You can also use the [`eventTemplate`](/api/javascript/ui/scheduler/configuration/eventtemplate) configuration to define custom templates for events, including recurring ones. This approach ensures consistent styling for all events.

Example using `eventTemplate`:

```javascript
eventTemplate: "<div style='background-color: #: color #; color: white;'>#: title #</div>"
```


- [EventTemplate Example]

```dojo
 <style>
      .custom-green{
        background-color: green;
        color: lightgreen
      }

      .custom-mediumpurple{
        background-color: mediumpurple;
        color: purple
      }
      
    </style>
    <script id="event-template" type="text/x-kendo-template">
      <div class="#: color #"> #: title #</div>
    </script>

    <div id="scheduler"></div> 
    <script>
      $("#scheduler").kendoScheduler({
        date: new Date("2025/6/6"),
        dataBound: function(){
          $('.green').closest('.k-event').addClass('custom-green')
          $('.mediumpurple').closest('.k-event').addClass('custom-mediumpurple')
        },
        eventTemplate: $("#event-template").html(),
        showWorkHours: true,
        views: [
          { type: "day"  },
          { type: "week", selected: true },
          { type: "month" },
        ],
        dataSource: [
          {
            id: 1,
            start: new Date("2025/6/2 08:00 AM"),
            end: new Date("2025/6/2 09:00 AM"),
            title: "Interview",
            color: "green",
            recurrenceRule: "FREQ=DAILY",
          },
          {
            id: 2,
            start: new Date("2025/6/4 08:00 AM"),
            end: new Date("2025/6/4 09:00 AM"),
            title: "Meeting",
            color: "mediumpurple",
            recurrenceRule: "FREQ=WEEKLY",
          },
        ],
      });
    </script>
```

## See Also

- [Kendo UI Scheduler Overview](https://docs.telerik.com/kendo-ui/controls/scheduler/overview)
- [Scheduler API](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler)
