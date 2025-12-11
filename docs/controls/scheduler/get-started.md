---
title: Getting Started
page_title: jQuery Scheduler Documentation - Getting Started with the Scheduler
description: "Get started with the jQuery Scheduler by Kendo UI and learn how to create and initialize the component."
components: ["scheduler"]
slug: getting_started_kendoui_scheduler_widget
position: 1
---

# Getting Started with the Scheduler

This guide demonstrates how to get up and running with the Kendo UI for jQuery Scheduler.

After the completion of this guide, you will be able to achieve the following end result:

```dojo
    <div id="scheduler"></div>

    <script id="event-template" type="text/x-kendo-template">
        <div>Title: #: title #</div>
        <div>Atendees:
            # for (var i = 0; i < resources.length; i++) { #
                #: resources[i].text #
            # } #
        </div>
    </script>
    <script>
        $("#scheduler").kendoScheduler({
            date: new Date("2013/6/6"),
            eventTemplate: $("#event-template").html(),
            dataSource: [
                {
                    id: 1,
                    start: new Date("2013/6/6 08:00 AM"),
                    end: new Date("2013/6/6 09:00 AM"),
                    title: "Interview",
                    attendees: [1,2]
                }
            ],
            resources: [
                {
                    field: "attendees",
                    title:"Attendees",
                    dataSource: [
                        { value: 1, text: "Alex" },
                        { value: 2, text: "Bob" }
                    ],
                    multiple: true
                }
            ]
        });
    </script>
```

## 1. Create an Empty div Element

First, create an empty `<div>` element on the page that will serve as the main container of the Scheduler component.

```html
<div id="scheduler"></div>
```

## 2. Initialize the Scheduler

In this step, you will initialize the Scheduler from the empty `<div>` element. When you initialize the component from an empty `div`, all settings of the Scheduler will be provided in the initialization script statement and you have to describe its layout and configuration in JavaScript.

```html
<div id="scheduler"></div>

<script>
    // Target the div element by using jQuery and then call the kendoScheduler() method.
    $("#scheduler").kendoScheduler();
</script>
```

## 3. Bind the Scheduler to Data

Once the basic initialization is completed, you can start adding additional configurations to the Scheduler. The first and most important configuration is the [`dataSource`]({% slug overview_kendoui_datasourcecomponent %}).

```html
<div id="scheduler"></div>

<script>
    
  $("#scheduler").kendoScheduler({
    dataSource: [
        {
            id: 1,
            start: new Date("2023/8/23 08:00 AM"),
            end: new Date("2023/8/23 09:00 AM"),
            title: "Interview",
            attendees: [1,2]
        }
    ]
  });
</script>
```

## 4. Set the Current Date

The Scheduler allows you to configure the initially displayed date.

```html
<div id="scheduler"></div>

<script>
    
  $("#scheduler").kendoScheduler({
    date: new Date("2023/8/23"),
    dataSource: [
        {
            id: 1,
            start: new Date("2023/8/23 08:00 AM"),
            end: new Date("2023/8/23 09:00 AM"),
            title: "Interview",
            attendees: [1,2]
        }
    ]
  });
</script>
```

## 5. Add Resources for the Events

The Scheduler allows you to assign predefined resources to the events.

```html
<div id="scheduler"></div>

<script>
    $("#scheduler").kendoScheduler({
        date: new Date("2013/6/6"),
        dataSource: [
            {
                id: 1,
                start: new Date("2013/6/6 08:00 AM"),
                end: new Date("2013/6/6 09:00 AM"),
                title: "Interview",
                attendees: [1,2]
            }
        ],
        resources: [
            {
                field: "attendees",
                title:"Attendees",
                dataSource: [
                    { value: 1, text: "Alex" },
                    { value: 2, text: "Bob" }
                ],
                multiple: true
            }
        ]
    });
</script>
```

## 6. Add Event Template

To customize the appearance of the events, use the [`eventTemplate`](/api/javascript/ui/scheduler/configuration/eventtemplate) option of the Scheduler.

```html
<div id="scheduler"></div>

<script id="event-template" type="text/x-kendo-template">
    <div>Title: #: title #</div>
    <div>Atendees:
        # for (var i = 0; i < resources.length; i++) { #
            #: resources[i].text #
        # } #
    </div>
</script>
<script>
    $("#scheduler").kendoScheduler({
        date: new Date("2013/6/6"),
        eventTemplate: $("#event-template").html(),
        dataSource: [
            {
                id: 1,
                start: new Date("2013/6/6 08:00 AM"),
                end: new Date("2013/6/6 09:00 AM"),
                title: "Interview",
                attendees: [1,2]
            }
        ],
        resources: [
            {
                field: "attendees",
                title:"Attendees",
                dataSource: [
                    { value: 1, text: "Alex" },
                    { value: 2, text: "Bob" }
                ],
                multiple: true
            }
        ]
    });
</script>
```

## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Demo Page for the Kendo UI for jQuery Scheduler](https://demos.telerik.com/kendo-ui/scheduler/index)

## See Also

* [JavaScript API Reference of the jQuery Scheduler](/api/javascript/ui/scheduler)
* [Knowledge Base Section](/knowledge-base)


