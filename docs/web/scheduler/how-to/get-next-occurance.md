---
title: Get next occurance
page_title: Get next occurance
description: Get next occurance
---

# Get next occurance

The example below demonstrates how to get next occurance of Kendo UI SchedulerEvent

#### Example:

```html
    <script>
    var event = new kendo.data.SchedulerEvent({
      title: "Event1",
      start: new Date(2014, 10, 10, 10),
      end: new Date(2014, 10, 10, 11),
      recurrenceRule: "FREQ=WEEKLY"
    });
    
    //add count for the occurrences
    event.recurrenceRule += ";COUNT=2";
    
    //generate occurrences
    var nextOccurrence = event.expand(event.start, new Date(2999, 0, 1), "Etc/UTC")[1];
    
    //log occurrence
    console.log(nextOccurrence);
    </script>
```
