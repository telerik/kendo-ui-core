---
title: Resources
page_title: Resources | Kendo UI Scheduler
description: "Learn how to use resources with the Kendo UI Scheduler widget."
slug: resources_kendoui_scheduler_widget
position: 2
---

# Resources

[Kendo UI Scheduler](http://demos.telerik.com/kendo-ui/scheduler/index) allows you to assign Scheduler events to a set of predefined resources. The widget supports multiple resources. Multiple instances of the same resource type can be assigned to a single Scheduler event. The Scheduler provides you with the option to assign resources via the Scheduler event edit form.

## Instance Resources

### Single Instance Resources

A single instance resource is a resource of which only one instance can be assigned to a Scheduler event. A typical example is a Scheduler displaying a list of meetings (Scheduler events), which are held in two rooms (resources). Since a meeting can be held in one room it can be considered a single resource.

The example below demonstrates how to use a single instance resource.

###### Example

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 11:00 AM"),
          end: new Date("2013/6/6 1:00 PM"),
          title: "Meeting with investors",
          roomId: 1 // The unique identifier of the first room (Meeting Room 101)
        },
        {
          id: 2,
          start: new Date("2013/6/6 10:15 AM"),
          end: new Date("2013/6/6 12:30 PM"),
          title: "Job Interview",
          roomId: 2 // The unique identifier of the second room (Meeting Room 102)
        }
      ],
      resources: [
        {
          field: "roomId", // The field of the scheduler event which contains the resource identifier
          title: "Room", // The label displayed in the scheduler edit form for this resource
          dataSource: [
             {
                text: "Meeting Room 101", // Text of the resource instance
                value: 1, // Identifier of the resource instance, use that value to assign an event to this instance.
                color: "#1c9ec4" // Used as the background of events assigned to this resource.
             },
             { text: "Meeting Room 102", value: 2, color: "#ff7663" }
          ]
        }
      ]
    });
    </script>

If a resource instance has its `color` field set, the Scheduler will use this value as background for all events assigned to that instance.

### Multiple Instance Resources

A multiple instance resource is a resource of which more than one instance can be assigned to a scheduler event. A typical example is a Scheduler displaying a list of meetings and the meeting attendees. Since more than one attendee can participate in a meeting, it can be considered a multiple instance resource.

The example below demonstrates how to use multiple instance resources.

###### Example

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 11:00 AM"),
          end: new Date("2013/6/6 1:00 PM"),
          title: "Meeting with investors",
          attendees: [2, 3] // Bob (value: 2) and Charlie (value: 3)
        },
        {
          id: 2,
          start: new Date("2013/6/6 10:15 AM"),
          end: new Date("2013/6/6 12:30 PM"),
          title: "Job Interview",
          attendees: [1, 2] // Alex (value: 1) and Bob (value: 2)
        }
      ],
      resources: [
        {
          field: "attendees", // The field of the scheduler event which contains the resource identifier
          title: "Attendees", // The label displayed in the scheduler edit form for this resource
          dataSource: [
            {
                text: "Alex", // Text of the resource instance
                value: 1, // Identifier of the resource instance, use that value to assign an event to this instance.
                color: "#ef701d" // Used as the background of events assigned to this resource.
            },
            { text: "Bob", value: 2, color: "#5fb1f7" },
            { text: "Charlie", value: 3, color: "#35a964" }
          ],
          multiple: true // Indicate the this is a multiple instance resource
         }
      ]
    });
    </script>

The scheduler will use the `color` of the first resource instance as background for the Scheduler events.

## Resource Types

### Multiple Resource Types

Kendo UI Scheduler supports unlimited resource types. For instance, you are able to combine the single and multiple resource examples in one, as demonstrated in the example below.

###### Example

    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 11:00 AM"),
          end: new Date("2013/6/6 1:00 PM"),
          title: "Meeting with investors",
          roomId: 1, // Meeting Room 101 (value: 1)
          attendees: [2, 3] // Bob (value: 2) and Charlie (value: 3)
        },
        {
          id: 2,
          start: new Date("2013/6/6 10:15 AM"),
          end: new Date("2013/6/6 12:30 PM"),
          title: "Job Interview",
          roomId: 2, // Meeting Room 102 (value: 2)
          attendees: [1, 2] // Alex (value: 1) and Bob (value: 2)
        }
      ],
      resources: [
        // First resource type definition
        {
          field: "roomId", // The field of the scheduler event which contains the resource identifier
          title: "Room", // The label displayed in the scheduler edit form for this resource
          dataSource: [
             {
                text: "Meeting Room 101", // Text of the resource instance
                value: 1, // Identifier of the resource instance, use that value to assign an event to this instance.
                color: "#1c9ec4" // Used as the background of events assigned to this resource.
             },
             { text: "Meeting Room 102", value: 2, color: "#ff7663" }
          ]
        },
        // Second resource type definition
        {
          field: "attendees", // The field of the scheduler event which contains the resource identifier
          title: "Attendees", // The label displayed in the scheduler edit form for this resource
          dataSource: [
            {
                text: "Alex", // Text of the resource instance
                value: 1, // Identifier of the resource instance, use that value to assign an event to this instance.
                color: "#ef701d" // Used as the background of events assigned to this resource.
            },
            { text: "Bob", value: 2, color: "#5fb1f7" },
            { text: "Charlie", value: 3, color: "#35a964" }
          ],
          multiple: true // Indicate the this is a multiple instance resource
         }
      ]
    });
    </script>

## Further Reading

For more information on how to configure Kendo UI resources, see [this article](/api/web/scheduler#configuration-resources).

To build a better understanding of resources, see the [online demo](http://demos.telerik.com/kendo-ui/web/scheduler/resources.html).

## See  Also

Other articles and how-to examples on the Kendo UI Scheduler:

* [Scheduler JavaScript API Reference](/api/javascript/ui/scheduler)
* [Overview of the Scheduler Widget]({% slug overview_kendoui_scheduler_widget %})
* [Timezones]({% slug timezones_kendoui_scheduler_widget %})
* [How to Filter Events by Resource Using MultiSelect]({% slug howto_filter_eventsby_resourceusing_multiselect_scheduler %})
* [How to Persist Resource Values on `move`]({% slug howto_persistresourcevalues_onamoveevent_scheduler %})

For how-to examples on the Kendo UI Scheduler, browse its [**How To** documentation folder]({% slug howto_add_controlsto_custom_event_editor_scheduler %}).
