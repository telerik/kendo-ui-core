---
title: Resources
page_title: Resources and the Kendo UI Scheduler widget
description: How to use resources with Kendo UI Scheduler.
---

# Scheduler Resources

Kendo UI Scheduler supports assigning scheduler events to a set of predefined resources. The scheduler widget supports more than one kind of resource. Multiple instances of the same resource type
can be assigned to a scheduler event.

The scheduler widget allows the user to assign resources via the scheduler event edit form.



## Single instance resource

A single instance resource is a resource of which only one instance can be assigned to a scheduler event. A typical example is a scheduler displaying a list of meetings (scheduler events) which are held in two rooms (resources).
Since a meeting can be held in one room it can be considered as a "single" resource.

### Example - single single resources

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

If a resource instance has its `color` field set the scheduler will use this value as the background of all events assigned to that instance.

## Multiple resource instances

A multiple resource instance is a resource of which more than one instance can be assigned to a scheduler event. A typical example is a scheduler displaying a list of meetings and the meeting atendees. Since more than one atendee
can participate in a meeting it can be considered a "multiple" instance resource.

### Example - multiple instance resources

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
          atendees: [2, 3] // Bob (value: 2) and Charlie (value: 3)
        },
        {
          id: 2,
          start: new Date("2013/6/6 10:15 AM"),
          end: new Date("2013/6/6 12:30 PM"),
          title: "Job Interview",
          atendees: [1, 2] // Alex (value: 1) and Bob (value: 2)
        }
      ],
      resources: [
        {
          field: "atendees", // The field of the scheduler event which contains the resource identifier
          title: "Atendees", // The label displayed in the scheduler edit form for this resource
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

The scheduler will use the `color` of the first resource instance as the background of the scheduler events.

## Multiple resource types

Kendo UI Scheduler supports unlimited resource types. For example we can combine the single and multiple resource examples in a single one.

### Example - multiple resource types

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
          atendees: [2, 3] // Bob (value: 2) and Charlie (value: 3)
        },
        {
          id: 2,
          start: new Date("2013/6/6 10:15 AM"),
          end: new Date("2013/6/6 12:30 PM"),
          title: "Job Interview",
          roomId: 2, // Meeting Room 102 (value: 2)
          atendees: [1, 2] // Alex (value: 1) and Bob (value: 2)
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
          field: "atendees", // The field of the scheduler event which contains the resource identifier
          title: "Atendees", // The label displayed in the scheduler edit form for this resource
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

## Further reading

Additional information about Kendo UI resources can be found in the documentation of the [resources](/api/web/scheduler#configuration-resources) option.

In addition you can check the [Resources](http://demos.telerik.com/kendo-ui/web/scheduler/resources.html) online demo.
