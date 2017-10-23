---
title: How to Add a Control to the Scheduler Toolbar.
description: Example of how to add a DropDownList or other control to the Scheduler toolbar.
type: how-to
page_title: How to Add a Control to the Scheduler Toolbar.
slug: scheduler-add-control-to-toolbar
tags: add, control, scheduler, toolbar, dropdownlist, template
ticketid: 1133588
res_type: kb

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Scheduler for Progress® Kendo UI®</td>
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

I'm working on a Scheduler and would like to add a DropDownList to its toolbar, but unlike the Grid, there is no `toolbar.template` property in the API.

## Solution

Although there is no property in the API that allows for a template to be added in the Toolbar, we can implement this functionality by using jQuery:

````html
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
````


## See Also

* [Kendo UI Scheduler API](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler).