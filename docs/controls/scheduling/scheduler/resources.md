---
title: Resources
page_title: jQuery Scheduler Documentation | Resources
description: "Get started with the jQuery Scheduler by Kendo UI and learn how to use its resources."
slug: resources_kendoui_scheduler_widget
position: 4
---

# Resources

The Scheduler allows you to assign events to a set of predefined resources.

The widget supports multiple resources. Multiple instances of the same resource type can be assigned to a single Scheduler event. The Scheduler provides you with the option to assign resources through the Scheduler event edit form.

## Single Instance Resources

A single instance resource is a resource of which only one instance can be assigned to a Scheduler event, for example, a Scheduler which displays a list of meetings (Scheduler events) which are held in two rooms (resources). Since a meeting can be held in one room, it can be considered a single resource.

The following example demonstrates how to use a single instance resource. If a resource instance has its `color` field set, the Scheduler will use this value as a background for all events that are assigned to that instance.

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
          roomId: 1 // The unique identifier of the first room (Meeting Room 101).
        },
        {
          id: 2,
          start: new Date("2013/6/6 10:15 AM"),
          end: new Date("2013/6/6 12:30 PM"),
          title: "Job Interview",
          roomId: 2 // The unique identifier of the second room (Meeting Room 102).
        }
      ],
      resources: [
        {
          field: "roomId", // The field of the Scheduler event which contains the resource identifier.
          title: "Room", // The label that is displayed in the Scheduler edit form for this resource.
          dataSource: [
             {
                text: "Meeting Room 101", // The text of the resource instance.
                value: 1, // The identifier of the resource instance. Use that value to assign an event to this instance.
                color: "#1c9ec4" // Used as the background of events that are assigned to this resource.
             },
             { text: "Meeting Room 102", value: 2, color: "#ff7663" }
          ]
        }
      ]
    });
    </script>

## Multiple Instance Resources

A multiple instance resource is a resource of which more than one instance can be assigned to a Scheduler event, for example, a Scheduler which displays a list of meetings and meeting attendees. Since more than one attendee can participate in a meeting, it can be considered a multiple instance resource.

The following example demonstrates how to use multiple instance resources. The Scheduler will use the `color` of the first resource instance as a background for the Scheduler events.

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
          field: "attendees", // The field of the Scheduler event which contains the resource identifier.
          title: "Attendees", // The label that is displayed in the Scheduler edit form for this resource.
          dataSource: [
            {
                text: "Alex", // The text of the resource instance.
                value: 1, // The identifier of the resource instance. Use that value to assign an event to this instance.
                color: "#ef701d" // Used as the background of events assigned to this resource.
            },
            { text: "Bob", value: 2, color: "#5fb1f7" },
            { text: "Charlie", value: 3, color: "#35a964" }
          ],
          multiple: true // Indicate that this is a multiple instance resource.
         }
      ]
    });
    </script>

## Multiple Resource Types

The Scheduler supports unlimited resource types. For instance, you can combine the single and multiple resource examples in one.

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
          field: "roomId", // The field of the Scheduler event which contains the resource identifier.
          title: "Room", // The label displayed in the Scheduler edit form for this resource.
          dataSource: [
             {
                text: "Meeting Room 101", // The text of the resource instance.
                value: 1, // The identifier of the resource instance. Use that value to assign an event to this instance.
                color: "#1c9ec4" // Used as the background of events assigned to this resource.
             },
             { text: "Meeting Room 102", value: 2, color: "#ff7663" }
          ]
        },
        // The second resource type definition.
        {
          field: "attendees", // The field of the Scheduler event which contains the resource identifier.
          title: "Attendees", // The label displayed in the Scheduler edit form for this resource.
          dataSource: [
            {
                text: "Alex", // The text of the resource instance.
                value: 1, // The identifier of the resource instance. Use that value to assign an event to this instance.
                color: "#ef701d" // Used as the background of events assigned to this resource.
            },
            { text: "Bob", value: 2, color: "#5fb1f7" },
            { text: "Charlie", value: 3, color: "#35a964" }
          ],
          multiple: true // Indicate that this is a multiple instance resource.
         }
      ]
    });
    </script>

## See  Also

* [Basic Usage of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/index)
* [Using the API of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/api)
* [JavaScript API Reference of the Scheduler](/api/javascript/ui/scheduler)
