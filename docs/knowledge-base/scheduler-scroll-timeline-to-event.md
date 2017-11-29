---
title: Scroll to and Select a Scheduler Event
description: An example on how to scroll the Scheduler Timeline vertically and horizontally to an event and select it.
type: how-to
page_title: Scroll Scheduler Timeline to an Event and Select It
slug: scheduler-scroll-timeline-to-event
position:
tags: kendo, kendoui, scheduler, timeline, scroll, select, event
ticketid: 1141944
res_type: kb

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Scheduler for Progress® Kendo UI®</td>
 </tr>
</table>


## Description

How to scroll vertically and horizontally and focus an event placed on a Scheduler Timeline view?

## Solution
  
To achieve the desired you should first find the `<div>` which renders the event, calculate its position according to the Scheduler content element and scroll the scheduler view to that position. You could also `select` the event in question using the [`select`](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler#methods-select) method:  

````html
<div id="example" class="k-content">
  <input type="button" value="Click to select the Event with ID 3" id="btn" class="k-button"/>
  <div id="scheduler"></div>
</div>

<script>
  $(function () {
    $('#btn').on('click', function() {
      var id = 3;
      var scheduler = $("#scheduler").getKendoScheduler();
      var event = scheduler.dataSource.get(id);
	  var isTimelineView = scheduler.view().name.indexOf("timeline") > -1;
      
      // No event with ID 3 is present
      if (!event) {
        return;
      }
			
      var contentDiv = scheduler.element.find("div.k-scheduler-content");
      var contentDivPosition = contentDiv.position();
      var eventUID = event.uid;
      var eventDiv = $(".k-event[data-uid=" + eventUID  + "]");
      var eventDivOffset = eventDiv.offset();
	  
      if (isTimelineView) {
        // Scroll to the div with given data-uid attribute            
        contentDiv.scrollLeft(eventDivOffset.left + contentDiv.scrollLeft() - contentDivPosition.left);
        contentDiv.scrollTop(eventDivOffset.top + contentDiv.scrollTop() - contentDivPosition.top);
        
        // Select the Event in question
        scheduler.select([event.uid]);
      }
    });
    
    $("#scheduler").kendoScheduler({
      height: 300,
      selectable: true,
      date: new Date("2013/6/13"),
      startTime: new Date("2013/6/13 07:00 AM"),
      eventHeight: 50,
      majorTick: 60,
      views: [ "timelineWeek" ],
      timezone: "Etc/UTC",
      dataSource: {
        batch: true,
        transport: {
          read: {
            url: "https://demos.telerik.com/kendo-ui/service/meetings",
            dataType: "jsonp"
          }
        },
        schema: {
          model: {
            id: "meetingID",
            fields: {
              meetingID: { from: "MeetingID", type: "number" },
              title: { from: "Title", defaultValue: "No title", validation: { required: true } },
              start: { type: "date", from: "Start" },
              end: { type: "date", from: "End" },
              startTimezone: { from: "StartTimezone" },
              endTimezone: { from: "EndTimezone" },
              description: { from: "Description" },
              recurrenceId: { from: "RecurrenceID" },
              recurrenceRule: { from: "RecurrenceRule" },
              recurrenceException: { from: "RecurrenceException" },
              roomId: { from: "RoomID", nullable: true },
              attendees: { from: "Attendees", nullable: true },
              isAllDay: { type: "boolean", from: "IsAllDay" }
            }
          }
        }
      },
      group: {
        resources: ["Rooms"],
        orientation: "vertical"
      },
      resources: [
        {
          field: "roomId",
          name: "Rooms",
          dataSource: [
            { text: "Meeting Room 203", value: 3, color: "#f58a8a" },
            { text: "Meeting Room 204", value: 4, color: "#f58a8a" },
            { text: "Meeting Room 205", value: 5, color: "#f58a8a" },
            { text: "Meeting Room 101", value: 1, color: "#6eb3fa" },
            { text: "Meeting Room 201", value: 2, color: "#f58a8a" },
            { text: "Meeting Room 206", value: 6, color: "#f58a8a" },
            { text: "Meeting Room 207", value: 7, color: "#f58a8a" }
          ],
          title: "Room"
        }
      ]
    });
  });
</script>
````

## See Also

* [API Reference of the Scheduler](http://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler)
