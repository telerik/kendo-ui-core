---
title: Calculate Scheduler Height Dynamically on Mobile
page_title: Calculate Scheduler Height Dynamically on Mobile 
description: "Learn how to dynamically calculate the height of the Kendo UI for jQuery Scheduler on mobile."
previous_url: /controls/scheduling/scheduler/how-to/dynamic-calc-of-height-in-mobile, /controls/scheduling/scheduler/how-to/appearance/dynamic-calc-of-height-in-mobile
slug: howto_calculate_scheduler_height_dunamically_onmobile_scheduler
tags: telerik, kendo, jquery, scheduler, calculate, height, dynamically, on, mobile 
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
  <td>Visual Studio Version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I dynamically calculate the height of the Kendo UI for jQuery Scheduler widget on a mobile device?

## Solution

The following example demonstrates how to achieve the desired scenario.

```dojo
<div data-init="initLoginView" data-role="view" id="login"  data-stretch="true">
<header data-role="header">
  <div data-role="navbar">
    <div>TEST</div>
   </div>
</header>
<div data-role="content">
  <div id="scheduler"></div>
<footer data-role="footer">
  <div>footer</div>
</footer>
</div>

<script type="text/javascript">
    var kendoMobileApp = new kendo.mobile.Application($(document.body), {
      skin: "flat"
    });

    function initLoginView(e) {
      $("#scheduler").kendoScheduler({
          date: new Date(),
          height: 100,
          views: [
              {type: "day"},
              {type: "month", selected: true},
              {type: "agenda", selectedDateFormat: "{0:ddd, M/dd/yyyy} - {1:ddd, M/dd/yyyy}"},
          ],
          mobile: "phone",
          timezone: "Etc/UTC",
          dataSource: {
              batch: true,
              transport: {
                  read: {
                      url: "https://demos.telerik.com/kendo-ui/service/tasks",
                      dataType: "jsonp"
                  },
                  update: {
                      url: "https://demos.telerik.com/kendo-ui/service/tasks/update",
                      dataType: "jsonp"
                  },
                  create: {
                      url: "https://demos.telerik.com/kendo-ui/service/tasks/create",
                      dataType: "jsonp"
                  },
                  destroy: {
                      url: "https://demos.telerik.com/kendo-ui/service/tasks/destroy",
                      dataType: "jsonp"
                  },
                  parameterMap: function(options, operation) {
                      if (operation !== "read" && options.models) {
                          return {models: kendo.stringify(options.models)};
                      }
                  }
              },
              schema: {
                  model: {
                      id: "taskId",
                      fields: {
                          taskId: { from: "TaskID", type: "number" },
                          title: { from: "Title", defaultValue: "No title", validation: { required: true } },
                          start: { type: "date", from: "Start" },
                          end: { type: "date", from: "End" },
                          startTimezone: { from: "StartTimezone" },
                          endTimezone: { from: "EndTimezone" },
                          description: { from: "Description" },
                          recurrenceId: { from: "RecurrenceID" },
                          recurrenceRule: { from: "RecurrenceRule" },
                          recurrenceException: { from: "RecurrenceException" },
                          ownerId: { from: "OwnerID", defaultValue: 1 },
                          isAllDay: { type: "boolean", from: "IsAllDay" }
                      }
                  }
              }
          },
          resources: [
              {
                  field: "ownerId",
                  title: "Owner",
                  dataSource: [
                      { text: "Alex", value: 1, color: "#f8a398" },
                      { text: "Bob", value: 2, color: "#51a0ed" },
                      { text: "Charlie", value: 3, color: "#56ca85" }
                  ]
              }
          ]
      });

      function fitWidget() {
        var widget = $("#scheduler").data("kendoScheduler");
        var height = $(".km-content").height();

        height = (height * 80) / 100;

        //size widget to take the whole view
        widget.element.height(height);
        widget.element.closest(".km-pane-wrapper").height(height);

        widget.resize(true);
      }

      $(window).resize(function() {
        fitWidget();
      });

      fitWidget();
    }
</script>
```

## See Also

* [Basic Usage of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/index)
* [Using the API of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/api)
* [JavaScript API Reference of the Scheduler](/api/javascript/ui/scheduler)
