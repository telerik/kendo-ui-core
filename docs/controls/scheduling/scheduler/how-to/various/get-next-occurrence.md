---
title: Get Next Occurrence
page_title: Get Next Occurrence | Kendo UI Scheduler
description: "Learn how to get a next occurrence of the Kendo UI SchedulerEvent in the Kendo UI Scheduler."
previous_url: /controls/scheduling/scheduler/how-to/get-next-occurance, /controls/scheduling/scheduler/how-to/get-next-occurrence
slug: howto_getthe_next_occurance_scheduler
---

# Get Next Occurrence

The following example demonstrates how to get `nextOccurrence` of the Kendo UI `SchedulerEvent` in the Scheduler.

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
