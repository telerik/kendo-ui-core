---
title: Add a Control to the Toolbar of the Scheduler
description: An example on how to add a DropDownList or other control to the toolbar of the Kendo UI Scheduler.
type: how-to
page_title: Add a Control to the Toolbar | Kendo UI Scheduler
slug: scheduler-add-control-to-toolbar
tags: add, control, scheduler, toolbar, dropdownlist, template
ticketid: 1133588
res_type: kb
component: scheduler
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Scheduler</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>All</td>
 </tr>
</table>


## Description

I want to add a DropDownList to the toolbar of the Scheduler, but unlike the Grid, it does not feature a `toolbar.template` API property.

How can I add a specific control to the Scheduler toolbar?

## Solution

To implement the scenario, use jQuery.

```dojo
<div id="scheduler"></div>

<script>
  var scheduler = $("#scheduler").kendoScheduler({
    date: new Date("2017/6/6"),
    dataSource: [
      {
        id: 1,
        start: new Date("2017/6/6 08:00 AM"),
        end: new Date("2017/6/6 09:00 AM"),
        title: "Interview"
      }
    ]
  }).getKendoScheduler();

  var dropDown = $("<input id='products'/>");
  $(scheduler.toolbar).prepend(dropDown);

  $("#products").kendoDropDownList({
    dataTextField: "ProductName",
    dataValueField: "ProductID",
    dataSource: {
      transport: {
        read: {
          dataType: "jsonp",
          url: "https://demos.telerik.com/kendo-ui/service/Products",
        }
      }
    }
  });  
</script>
```

## See Also

* [API Reference of the Scheduler](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler).
