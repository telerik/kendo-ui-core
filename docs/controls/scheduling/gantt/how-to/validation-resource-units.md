---
title: Change Validation Options of Resource Units
page_title: Change Validation Options of Resource Units | Kendo UI Gantt
description: "Learn how to change validation options of resource units in the Kendo UI Gantt widget."
slug: howto_validation_resource_units_gantt
---

# Change Validation Options of Resource Units

The example below demonstrates how to configure the validation options of the resource units in the Kendo UI Gantt.

###### Example

```dojo
     <div id="gantt"></div>
    <script>
      $("#gantt").kendoGantt({
        dataSource: [
          {
            id: 0,
            orderId: 0,
            parentId: null,
            title: "Task1",
            start: new Date("2014/6/17 9:00"),
            end: new Date("2014/7/01 11:00")
          },
          {
            id: 1,
            orderId: 1,
            parentId: null,
            title: "Task2",
            start: new Date("2014/6/20 12:00"),
            end: new Date("2014/7/02 14:00")
          }],
        resources: {
          dataSource: [
            { id: 0, name: "Resource 1", color: "green", format: "p0" },
            { id: 1, name: "Resource 2", color: "#32cd32", format: "p0" }
          ]
        },
        assignments: {
          dataSource: {
            data: [
              { TaskID: 0, ResourceID: 0, Units: 5 },
              { TaskID: 0, ResourceID: 1, Units: 1 },
              { TaskID: 1, ResourceID: 1, Units: 1 }
            ],
            schema: {
              model: {
                id: "ID",
                fields: {
                  ID: { type: "number" },
                  ResourceID: { type: "number" },
                  Units: { type: "number", validation: { step: 0.2, max: 1 } },
                  TaskID: { type: "number" }
                }
              }
            }
          }
        },
        views: ["week"],
        columns: [
          { field: "title", title: "Title" },
          { field: "resources", title: "Task Resources" }
        ]
      });
    </script>
```

## See Also

* [Gantt JavaScript API Reference](/api/javascript/ui/gantt)
* [How to Colorize Tasks]({% slug howto_colorize_tasks_gantt %})
* [How to Create Custom Views]({% slug howto_create_custom_views_gantt %})
