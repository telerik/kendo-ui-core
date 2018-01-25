---
title: Change MVC Gantt Resources Depending on the Edited Task
description: An example on how dynamically change the resources loaded in the Telerik UI for ASP.NET MVC Gantt assignments edit dialog.
type: how-to
page_title: Populate Assignments Edit Dialog Based on the StartDate and EndDate of the Selected Task | Telerik UI for ASP.NET MVC Gantt
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

I have a requirement to populate the assignments edit dialog based on the StartDate and EndDate of the edited task. The dialog should be populated after checking from the server which are the resources available for the selected date and time. Only the available resources will be loaded in the dialog box for selection as a assignees.

## Solution

The required could be achieved by handling the Gantt chart [`edit` event](https://docs.telerik.com/kendo-ui/api/javascript/ui/gantt#events-edit). In that event you could retrieve and store in global variables the start and end date and trigger the [`read()`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource#methods-read) call on the Resources DataSource:

```JavaScript
function onEdit(e) {
  var task = e.task;
  var gantt = e.sender;
   
  window.start = task.start;
  window.end = task.end;
   
  gantt.resources.dataSource.read();
}
```

Then, a [`Data()`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource#configuration-transport.read.data) function for the Resources Read action should be configured:

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

and:

```JavaScript
function onResourcesRead() {
  return {
    start: window.start,
    end: window.end
  }
}
```

This will allow you to filter on the server the returned Resources based on the start and end time of the Task.

## See Also

* [API Reference of the Spreadsheet](https://docs.telerik.com/kendo-ui/api/javascript/ui/gantt)
