---
title: Use Local Observable Data Object
page_title: Use Local Observable Data Object | Kendo UI Scheduler
description: "Learn how to bind the Kendo UI Scheduler to a local observableObject and change the properties during runtime."
previous_url: /controls/scheduling/scheduler/how-to/using-local-observable-data-object
slug: howto_uselocalobservable_dataobject_scheduler
---

# Use Local Observable Data Object

The following example demonstrates how to bind the Scheduler to a local `observableObject` and change the properties during runtime.

```dojo
    <div id="example">
      <button id="update">Update</button>
      <div id="scheduler"></div>
    </div>
    <script>
      $(function() {
        var data = [{
          title: "Test",
          start: new Date(2013, 5, 13, 10),
          end: new Date(2013, 5, 13, 11)
        }];

        var observableData = new kendo.data.ObservableArray(data);

        $("#scheduler").kendoScheduler({
          date: new Date("2013/6/13"),
          startTime: new Date("2013/6/13 07:00 AM"),
          height: 600,
          views: [
            "day"
          ],
          dataSource: observableData
        });

        $("#update").click(function(e) {
          observableData[0].set("end", new Date(2013, 5, 13, 13));
        });
      });
    </script>
```

## See Also

* [Basic Usage of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/index)
* [Using the API of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/api)
* [JavaScript API Reference of the Scheduler](/api/javascript/ui/scheduler)
