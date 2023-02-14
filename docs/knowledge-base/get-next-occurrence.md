---
title: Get the Next Scheduler Event Occurrence
page_title: Get the Next Scheduler Event Occurrence
description: "Learn how to get a next occurrence of the Kendo UI SchedulerEvent in the Kendo UI for jQuery Scheduler."
previous_url: /controls/scheduling/scheduler/how-to/get-next-occurance, /controls/scheduling/scheduler/how-to/get-next-occurrence, /controls/scheduling/scheduler/how-to/various/get-next-occurrence
slug: howto_getthe_next_occurance_scheduler
tags: telerik, kendo, jquery, scheduler, get, the, next, event, occurrence 
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

How can I get `nextOccurrence` of the Kendo UI `SchedulerEvent` in the Scheduler?

## Solution

The following example demonstrates how to achieve the desired scenario.

```dojo
    <script>
    var event = new kendo.data.SchedulerEvent({
      title: "Event1",
      start: new Date(2014, 10, 10, 10),
      end: new Date(2014, 10, 10, 11),
      recurrenceRule: "FREQ=WEEKLY"
    });

    // Add the count for the occurrences.
    event.recurrenceRule += ";COUNT=2";

    // Generate the occurrences.
    var nextOccurrence = event.expand(event.start, new Date(2999, 0, 1), "Etc/UTC")[1];

    // Log the occurrence.
    console.log(nextOccurrence);
    </script>
```

## See Also

* [Basic Usage of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/index)
* [Using the API of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/api)
* [JavaScript API Reference of the Scheduler](/api/javascript/ui/scheduler)
