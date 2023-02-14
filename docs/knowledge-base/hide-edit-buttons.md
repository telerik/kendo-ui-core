---
title: Hide the Edit Buttons in the Scheduler
page_title: Hide the Edit Buttons in the Scheduler
description: "Learn how to hide the Edit buttons of the Kendo UI for jQuery Scheduler widget."
previous_url: /controls/scheduling/scheduler/how-to/hide-edit-buttons, /controls/scheduling/scheduler/how-to/appearance/hide-edit-buttons
slug: howto_hidethe_editbutons_scheduler
tags: telerik, kendo, jquery, scheduler, hide, the, edit, buttons 
component: scheduler
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Scheduler for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I hide the **Edit** button of the Kendo UI for jQuery Scheduler?

## Solution

The following example demonstrates how to achieve the desired scenario.

```dojo
    <div id="scheduler"></div>
    <script>
      $("#scheduler").kendoScheduler({
        date: new Date("2013/6/6"),
        views: [ "day", "month" ],
        dataSource: [
          {
            id: 1,
            start: new Date("2013/6/6 08:00 AM"),
            end: new Date("2013/6/6 09:00 AM"),
            title: "Interview"
          }
        ],
        edit: function(e) {
          var buttonsContainer = e.container.find(".k-edit-buttons");
          var cancelButton = buttonsContainer.find(".k-scheduler-cancel");
          cancelButton.text("Delete");
        }
      });
    </script>
```

## See Also

* [Basic Usage of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/index)
* [Using the API of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/api)
* [JavaScript API Reference of the Scheduler](/api/javascript/ui/scheduler)
