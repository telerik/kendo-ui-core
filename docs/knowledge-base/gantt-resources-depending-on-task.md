---
title: Change MVC Gantt Resources Depending on the Edited Task
description: An example on how dynamically change the resources that are loaded in the assignments edit dialog of the Telerik UI for ASP.NET MVC Gantt.
type: how-to
page_title: Populate the Assignments Edit Dialog Based on StartDate and EndDate of Selected Tasks | Telerik UI for ASP.NET MVC
slug: gantt-resources-depending-on-task
tags: kendo, kendoui, gantt, resources, assignments, dynamic, task-specific
ticketid: 1146251
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Telerik UI for ASP.NET MVC Gantt</td>
 </tr>
</table>


## Description

How can I populate the **Assignments** edit dialog based on the `StartDate` and `EndDate` of the edited task after checking from the server which are the resources that are available for the selected date and time?

## Solution

1. Handle the [`edit`](https://docs.telerik.com/kendo-ui/api/javascript/ui/gantt/events/edit) event of the Gantt.
1. In the `edit` event, retrieve and store the start and end date in global variables.
1. Trigger the [`read()`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/methods/read) call on the Resources DataSource.

    ```JavaScript
    function onEdit(e) {
      var task = e.task;
      var gantt = e.sender;

      window.start = task.start;
      window.end = task.end;

      gantt.resources.dataSource.read();
    }
    ```

1. Configure a [`Data()`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/configuration/transport.read.data) function for the Resources Read action. As a result, you will be able to filter the returned Resources based on the start and end time of the task on the server.

    ```C#
    .Resources(r => r
        .Field("resources")
        .DataColorField("Color")
        .DataTextField("Name")
        .DataSource(d => d
            .Custom()
            .Schema(s => s
                .Model(m => m.Id("ID"))
                .Data("Data")
            )
            .Transport(t =>
            {
                t.Read("ReadResources", "Gantt").Data("onResourcesRead");
            })
        )
    )
    ```


    ```JavaScript
    function onResourcesRead() {
      return {
        start: window.start,
        end: window.end
      }
    }
    ```

## See Also

* [API Reference of the Gantt](https://docs.telerik.com/kendo-ui/api/javascript/ui/gantt)
