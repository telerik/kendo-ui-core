---
title: Calculate Scheduler Height Dynamically
page_title: Calculate Scheduler Height Dynamically
description: "Learn how to dynamically calculate the height of a Kendo UI for jQuery Scheduler widget."
previous_url: /controls/scheduling/scheduler/how-to/dynamic-calc-of-height, /controls/scheduling/scheduler/how-to/appearance/dynamic-calc-of-height
slug: howto_calculate_scheduler_height_dunamically_scheduler
tags: telerik, kendo, jquery, scheduler, calculate, height, dynamically 
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

How can I dynamically calculate the height of the Kendo UI for jQuery Scheduler widget?

## Solution

The following example demonstrates how to achieve the desired scenario.

```dojo
<div id="scheduler"></div>
<script type="text/javascript">
$(function() {
    $("#scheduler").kendoScheduler({
        height: 100,
        views: [
            {type: "day"},
            {type: "week", selected: true}
        ],
        timezone: "Etc/UTC",
        date: kendo.date.today(),
        dataSource: [],
        editable: false
    });

    function fitWidget() {
      var widget = $("#scheduler").data("kendoScheduler");
      var height = $(window).outerHeight();

      // Size the widget to take the whole view.
      widget.element.height(height);
      widget.resize(true);
    }

    $(window).resize(function() {
      clearTimeout(window._resizeId);

      window._resizeId = setTimeout(function() {
        console.log("resize");
        fitWidget();
      }, 500);
    });

    fitWidget();
  });
</script>
```

## See Also

* [Basic Usage of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/index)
* [Using the API of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/api)
* [JavaScript API Reference of the Scheduler](/api/javascript/ui/scheduler)
